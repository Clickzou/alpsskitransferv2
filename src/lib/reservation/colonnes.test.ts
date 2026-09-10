import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Les colonnes écrites existent-elles vraiment ?
 *
 * Ce test naît d'une panne silencieuse. La ligne insérée dans `reservations`
 * portait `passagersRetour`, quand la colonne s'appelle `passagers_retour` :
 * PostgREST refusait la ligne **entière** — « Could not find the
 * 'passagersRetour' column » — et `inserer` renvoyait `null` après avoir écrit
 * l'erreur dans un journal que personne ne lit. Le tunnel, lui, continuait :
 * la session Stripe partait, le client payait, et la course n'existait dans
 * aucune base. Le webhook cherchait ensuite une référence introuvable.
 *
 * Une faute de frappe dans un nom de colonne ne se voit ni à la compilation —
 * l'objet inséré est un littéral libre — ni à l'exécution d'un test unitaire
 * classique, puisqu'il faudrait une base. On compare donc les deux textes :
 * ce que le code écrit, et ce que le schéma déclare. C'est grossier, et c'est
 * exactement le contrôle qui manquait.
 */

const racine = join(import.meta.dirname, "..", "..", "..");

/** Les colonnes déclarées par `create table <nom> (…)` dans le schéma. */
function colonnesDuSchema(sql: string, table: string): Set<string> {
  const debut = sql.indexOf(`create table if not exists ${table} (`);
  if (debut === -1) throw new Error(`table ${table} absente du schéma`);
  const ouverture = sql.indexOf("(", debut);
  const fermeture = sql.indexOf("\n);", ouverture);
  const corps = sql.slice(ouverture + 1, fermeture);

  const noms = new Set<string>();
  for (const ligne of corps.split("\n")) {
    // Une déclaration de colonne commence la ligne ; les contraintes de
    // continuation (« check (…) ») sont indentées plus loin et ignorées.
    const m = ligne.match(/^ {2}([a-z_]+) +[a-z]/);
    if (m) noms.add(m[1]);
  }
  return noms;
}

/**
 * Les clés des objets passés à `inserer("<table>", …)` et `mettreAJour`.
 *
 * On lit le littéral qui suit la déclaration `const <nom> = {` repérée par le
 * nom de variable passé à l'appel — la forme utilisée dans les deux routes.
 */
function clesEcrites(source: string, variable: string): string[] {
  const debut = source.indexOf(`const ${variable} = {`);
  if (debut === -1) throw new Error(`objet ${variable} introuvable`);
  const ouverture = source.indexOf("{", debut);

  let profondeur = 0;
  let fin = ouverture;
  for (let i = ouverture; i < source.length; i += 1) {
    if (source[i] === "{") profondeur += 1;
    if (source[i] === "}") {
      profondeur -= 1;
      if (profondeur === 0) {
        fin = i;
        break;
      }
    }
  }

  /*
    Les clés du premier niveau seulement : celles de l'objet lui-même, pas
    celles d'un objet imbriqué. Leur indentation est celle de la déclaration
    plus deux espaces — `ligne` vit au premier niveau de la fonction,
    `ligneSurMesure` dans un `if`, d'où le calcul plutôt qu'une constante.
  */
  const marge = debut - source.lastIndexOf("\n", debut) + 1;
  const corps = source.slice(ouverture + 1, fin);
  const cles: string[] = [];
  for (const ligne of corps.split("\n")) {
    const m = ligne.match(new RegExp(`^ {${marge}}([A-Za-z_][A-Za-z0-9_]*):`));
    if (m) cles.push(m[1]);
  }
  return cles;
}

const schema = readFileSync(join(racine, "docs", "supabase-schema.sql"), "utf8");
const routeReservation = readFileSync(
  join(racine, "src", "app", "api", "reservation", "route.ts"),
  "utf8",
);

describe("les colonnes écrites existent au schéma", () => {
  const colonnes = colonnesDuSchema(schema, "reservations");

  it("le schéma est bien lu", () => {
    expect(colonnes.has("passagers_retour")).toBe(true);
    expect(colonnes.has("client_email")).toBe(true);
    expect(colonnes.size).toBeGreaterThan(15);
  });

  it("la réservation chiffrée n'écrit que des colonnes connues", () => {
    const cles = clesEcrites(routeReservation, "ligne");
    expect(cles.length).toBeGreaterThan(10);
    expect(cles.filter((cle) => !colonnes.has(cle))).toEqual([]);
  });

  it("la demande sur mesure n'écrit que des colonnes connues", () => {
    const cles = clesEcrites(routeReservation, "ligneSurMesure");
    expect(cles.length).toBeGreaterThan(10);
    expect(cles.filter((cle) => !colonnes.has(cle))).toEqual([]);
  });

  it("aucune clé écrite n'est en casse camel", () => {
    const toutes = [
      ...clesEcrites(routeReservation, "ligne"),
      ...clesEcrites(routeReservation, "ligneSurMesure"),
    ];
    expect(toutes.filter((cle) => /[A-Z]/.test(cle))).toEqual([]);
  });
});
