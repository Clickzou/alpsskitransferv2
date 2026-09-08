/**
 * Contrôle du plan de redirections — exécuté au prebuild, bloque le build.
 *
 * La refonte déplace 260 URL. Une redirection cassée, une chaîne à deux sauts ou
 * une boucle ne se voient pas en développement : elles se voient en production,
 * trois semaines plus tard, dans la Search Console, quand le trafic est déjà
 * parti. D'où ces contrôles au build.
 *
 * Usage : npm run redirects:check
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const FICHIER = path.join(RACINE, "src", "data", "redirections.ts");

const erreurs = [];
const avertissements = [];

// Le plan vit dans deux fichiers : les règles générées depuis l'inventaire
// WordPress, et les règles écrites à la main qui les complètent.
const source = [
  await readFile(FICHIER, "utf8"),
  await readFile(path.join(RACINE, "src", "data", "redirections-migration.ts"), "utf8"),
].join("\n");

/** Extrait le corps d'une constante objet ou tableau, commentaires compris. */
function bloc(nom, ouvrant, fermant) {
  // On vise la DÉCLARATION, pas la première occurrence du nom : `redirections.ts`
  // importe puis étale `REDIRECTIONS_MIGRATION`, et partir de l'import ferait
  // lire le bloc d'import à la place de la table.
  const debut = source.indexOf(`const ${nom}`);
  if (debut === -1) return "";
  // On part du « = » de l'affectation : sinon l'annotation de type `string[]`
  // fournit un crochet ouvrant vide qui court-circuite la lecture.
  const egal = source.indexOf("=", debut);
  const ouvre = source.indexOf(ouvrant, egal);
  let profondeur = 0;
  for (let i = ouvre; i < source.length; i++) {
    if (source[i] === ouvrant) profondeur++;
    else if (source[i] === fermant) {
      profondeur--;
      if (profondeur === 0) return source.slice(ouvre + 1, i);
    }
  }
  return "";
}

const corps301 = [
  bloc("REDIRECTIONS_301", "{", "}"),
  bloc("REDIRECTIONS_MIGRATION", "{", "}"),
].join("\n");
const corps410 = bloc("GONE_MIGRATION", "[", "]");

// Les commentaires contiennent des exemples d'URL : on les retire avant de lire.
const sansCommentaires = corps301
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");

const paires = [...sansCommentaires.matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g)].map((m) => ({
  de: m[1],
  vers: m[2],
}));

// GONE_MIGRATION contient des chemins complets ; ne rien re-préfixer.
const supprimees = [...corps410.replace(/^\s*\/\/.*$/gm, "").matchAll(/"([^"]+)"/g)].map((m) =>
  m[1].startsWith("/") ? m[1] : `/${m[1]}`,
);

const sources = new Set();

for (const { de, vers } of paires) {
  if (sources.has(de)) erreurs.push(`Clé en double : ${de}`);
  sources.add(de);

  if (de !== de.toLowerCase()) {
    erreurs.push(`Clé en majuscules (le proxy compare en minuscules) : ${de}`);
  }
  if (de.length > 1 && de.endsWith("/")) {
    erreurs.push(`Clé avec slash final (le proxy normalise sans) : ${de}`);
  }
  if (!de.startsWith("/")) {
    erreurs.push(`Clé sans slash initial : ${de}`);
  }
  if (!vers.startsWith("/") && !vers.startsWith("http")) {
    erreurs.push(`Destination relative invalide : ${de} → ${vers}`);
  }
  if (vers.startsWith("/") && !vers.endsWith("/")) {
    erreurs.push(
      `Destination sans slash final : ${de} → ${vers} (chaîne à deux sauts avec trailingSlash)`,
    );
  }
  if (de === vers.replace(/\/$/, "")) {
    erreurs.push(`Boucle de redirection : ${de} → ${vers}`);
  }
  if (supprimees.includes(vers.replace(/\/$/, ""))) {
    erreurs.push(`Destination en 410 : ${de} → ${vers}`);
  }
}

// Chaîne à deux sauts : une destination qui est elle-même une clé de la table.
for (const { de, vers } of paires) {
  const cible = vers.replace(/\/$/, "");
  if (sources.has(cible)) {
    erreurs.push(`Chaîne à deux sauts : ${de} → ${vers} → ${paires.find((p) => p.de === cible).vers}`);
  }
}

// Destination qui pointe vers une page pas encore migrée : la redirection est
// juste, mais elle tombe en 404 tant que la page n'existe pas. Avertissement et
// non erreur — sinon le plan ne pourrait pas être écrit avant la migration.
const registre = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "registry.ts"),
  "utf8",
);
// Le second segment du silo est soit une station, soit un hub d'aéroport
// (`/switzerland-ski-transfers/geneva-airport/`) : les deux registres comptent.
const registreAeroports = await readFile(
  path.join(RACINE, "src", "lib", "airports", "registry.ts"),
  "utf8",
);
const slugsConnus = [
  ...[...registre.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]),
  ...[...registreAeroports.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]),
];
// Une station a une page quand elle a son propre fichier de contenu — reprise du
// WordPress ou rédigée à la main. Les **hubs d'aéroport** partagent le même
// segment d'URL mais n'ont pas de fichier : ils sont générés pour chaque entrée
// du registre des aéroports, donc ils existent tous. Les compter ici évite
// 31 faux avertissements qui masqueraient les vrais.
const slugsMigres = [
  ...(await readdir(path.join(RACINE, "src", "lib", "resorts")))
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        !["types.ts", "index.ts", "registry.ts", "rediges.ts"].includes(f),
    )
    .map((f) => f.replace(/\.ts$/, "")),
  ...[...registreAeroports.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]),
];

for (const { de, vers } of paires) {
  const m = vers.match(/^\/[a-z]+-ski-transfers\/([^/]+)\//);
  if (!m) continue;
  if (!slugsConnus.includes(m[1])) {
    erreurs.push(`Destination inconnue du registre des stations : ${de} → ${vers}`);
  } else if (!slugsMigres.includes(m[1])) {
    avertissements.push(`Destination pas encore migrée (404 aujourd'hui) : ${de} → ${vers}`);
  }
}

/**
 * Couverture réelle : chaque URL publiée par l'ancien site doit avoir un sort.
 * C'est le contrôle qui compte avant la bascule — une URL oubliée, c'est une 404
 * qui se découvre trois semaines plus tard dans la Search Console.
 */
const cheminInventaire = path.join(RACINE, "wp-export", "inventaire.json");
try {
  const inventaire = JSON.parse(await readFile(cheminInventaire, "utf8"));
  const migration = await readFile(
    path.join(RACINE, "src", "data", "redirections-migration.ts"),
    "utf8",
  );
  const listee = (nom) =>
    new Set(
      [...bloc(nom, "[", "]").matchAll(/"([^"]+)"/g)].map((m) => m[1].replace(/\/$/, "")),
    );
  const tunnelSet = listee("TUNNEL_MIGRATION");
  const conserveesSet = listee("URL_CONSERVEES");
  const goneSet = new Set(supprimees.map((c) => c.replace(/\/$/, "")));
  void migration;

  const orphelines = inventaire
    .map((e) => e.url.replace(/\/$/, ""))
    .filter(
      (u) =>
        !sources.has(u) &&
        !tunnelSet.has(u) &&
        !conserveesSet.has(u) &&
        !goneSet.has(u) &&
        // Le silo conservé garde ses URL : rien à faire pour lui.
        !/^\/(?!airport-)[a-z]+-ski-transfers(\/|$)/.test(u),
    );

  if (orphelines.length > 0) {
    avertissements.push(
      `${orphelines.length} URL de l'ancien site sans sort défini (404 après la bascule) :`,
    );
    for (const u of orphelines.slice(0, 10)) avertissements.push(`    ${u}`);
    if (orphelines.length > 10) avertissements.push(`    … et ${orphelines.length - 10} autres`);
  } else {
    console.log(
      `[redirections] couverture complète : les ${inventaire.length} URL de l'ancien site ont un sort.`,
    );
  }
} catch {
  avertissements.push(
    "wp-export/inventaire.json absent : couverture non vérifiée (npm run wp:analyse).",
  );
}

for (const a of avertissements) console.warn(`[redirections] ${a}`);
for (const e of erreurs) console.error(`[redirections] ERREUR ${e}`);

if (erreurs.length > 0) {
  console.error(`\n${erreurs.length} erreur(s) — build interrompu.`);
  process.exit(1);
}
console.log(`[redirections] ${paires.length} règles 301, ${supprimees.length} pages en 410 — OK.`);
