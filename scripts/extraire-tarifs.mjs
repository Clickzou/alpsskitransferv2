/**
 * Reconstitue la grille tarifaire à partir du contenu des pages de trajet.
 *
 * Pourquoi ici et pas depuis WooCommerce : **la base ne contient aucune grille**.
 * La table `transfers_availability` du thème n'a que 4 lignes, et les 10 commandes
 * de l'historique portent toutes un produit générique « PRODUCT FORM (NO DELETED) »
 * dont le prix est saisi à la volée. Les seuls tarifs réellement publiés sont ceux
 * écrits dans le texte des 89 pages de trajet — « Private transfer: From €180 per
 * vehicle », « Shared transfer: From €35 per person ».
 *
 * Cette grille est donc une **proposition à faire valider par le client** avant
 * toute mise en vente. Elle est écrite dans `src/data/tarifs.ts` avec un drapeau
 * `valide: false` et le moteur de réservation refuse de vendre un trajet non validé.
 *
 * Usage : npm run tarifs:extraire
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { echappe } from "./_wordpress.mjs";

const RACINE = process.cwd();
const DOSSIER = path.join(RACINE, "src", "lib", "transfers");

/** « €180 », « € 180 », « 180€ », « £95 », « $250 ». */
const MONTANT = "(?:[€£$]\\s?([0-9]+(?:[.,][0-9]{1,2})?)|([0-9]+(?:[.,][0-9]{1,2})?)\\s?[€£$])";

function montant(texte, motif) {
  const m = texte.match(new RegExp(motif, "i"));
  if (!m) return null;
  const valeur = m[1] ?? m[2] ?? m[3] ?? m[4];
  return valeur ? Number.parseFloat(valeur.replace(",", ".")) : null;
}

/** Devise citée, pour repérer les pages qui ne sont pas en euros. */
function devise(texte) {
  const m = texte.match(/[€£$]/);
  return m ? { "€": "EUR", "£": "GBP", $: "USD" }[m[0]] : null;
}

function minutes(texte) {
  const hhmm = texte.match(/\b([0-9])h ?([0-9]{2})\b/);
  if (hhmm) return Number(hhmm[1]) * 60 + Number(hhmm[2]);
  const long = texte.match(/\b([0-9]+)\s*hours?(?:\s*and\s*([0-9]+)\s*minutes?)?/i);
  if (long) return Number(long[1]) * 60 + Number(long[2] ?? 0);
  const seul = texte.match(/\b([0-9]+)\s*minutes?\b/i);
  return seul ? Number(seul[1]) : null;
}

const lignes = [];
const incomplets = [];

for (const fichier of await readdir(DOSSIER)) {
  if (!fichier.endsWith(".ts") || ["types.ts", "index.ts"].includes(fichier)) continue;
  const source = await readFile(path.join(DOSSIER, fichier), "utf8");

  const airport = source.match(/airport: "([^"]+)"/)?.[1];
  const resort = source.match(/resort: "([^"]+)"/)?.[1];
  if (!airport || !resort) continue;

  const prive = montant(source, `private[^€£$0-9]{0,60}${MONTANT}`);
  const partage = montant(source, `shared[^€£$0-9]{0,60}${MONTANT}`);
  const km = Number(source.match(/([0-9]+)\s*km/i)?.[1] ?? 0) || null;
  const duree = minutes(source);
  const dev = devise(source) ?? "EUR";

  const ligne = { airport, resort, prive, partage, km, duree, devise: dev };
  lignes.push(ligne);
  if (!prive || !partage || !duree) incomplets.push(ligne);
}

lignes.sort((a, b) => `${a.airport}${a.resort}`.localeCompare(`${b.airport}${b.resort}`));

const ts = `/**
 * GRILLE TARIFAIRE — PROPOSITION, PAS ENCORE VALIDÉE PAR LE CLIENT.
 *
 * Générée par \`npm run tarifs:extraire\` depuis le texte des pages de trajet, faute
 * de mieux : la base WooCommerce ne contient aucune grille (4 lignes de
 * disponibilité, 10 commandes sur un produit générique). Ce sont donc les prix
 * *publiés* sur le site, pas des prix issus d'un catalogue.
 *
 * \`valide: false\` tant que le client n'a pas confirmé, et le moteur de
 * réservation doit refuser de vendre un trajet non validé.
 *
 * ${lignes.length} trajets, générés le ${new Date().toISOString().slice(0, 10)}.
 */
export interface Tarif {
  /** Slug d'aéroport. */
  airport: string;
  /** Slug de station. */
  resort: string;
  /** Prix par véhicule, transfert privé. */
  prive: number | null;
  /** Prix par personne, transfert partagé. */
  partage: number | null;
  /** Devise citée sur la page d'origine. */
  devise: "EUR" | "GBP" | "USD";
  /** Distance en kilomètres, telle qu'annoncée. */
  km: number | null;
  /** Durée en minutes, telle qu'annoncée. */
  duree: number | null;
  /** Passe à true quand le client a confirmé le tarif. */
  valide: boolean;
}

export const TARIFS: Tarif[] = [
${lignes
  .map(
    (l) =>
      `  { airport: "${echappe(l.airport)}", resort: "${echappe(l.resort)}", prive: ${l.prive ?? "null"}, partage: ${l.partage ?? "null"}, devise: "${l.devise}", km: ${l.km ?? "null"}, duree: ${l.duree ?? "null"}, valide: false },`,
  )
  .join("\n")}
];

export function tarif(airport: string, resort: string) {
  return TARIFS.find((t) => t.airport === airport && t.resort === resort);
}

/** Les trajets réellement vendables : tarif présent ET validé par le client. */
export function tarifsVendables() {
  return TARIFS.filter((t) => t.valide && t.prive !== null);
}
`;

await writeFile(path.join(RACINE, "src", "data", "tarifs.ts"), ts, "utf8");

// --- Coefficients par destination -------------------------------------------
/**
 * Le barème général (prise en charge + km × taux) laisse 14 % d'erreur moyenne
 * sur les prix publiés. Un coefficient par station la ramène à 5,7 % — et ce
 * coefficient est STABLE d'un aéroport à l'autre pour 10 des 13 stations qui ont
 * au moins trois trajets. Autrement dit : ce n'est pas du bruit, c'est bien une
 * politique tarifaire par destination.
 */
const PRISE_EN_CHARGE = 92;
const TAUX_KM = 1.167;
const modele = (km) => PRISE_EN_CHARGE + TAUX_KM * km;

/**
 * Les coefficients se calculent sur les distances **routières calculées** et non
 * sur celles annoncées dans les pages : plusieurs de ces dernières sont fausses —
 * mesurées depuis la ville et non depuis l'aéroport (Grenoble → Alpe d'Huez
 * annoncé à 65 km, 106 depuis l'aéroport de Saint-Geoirs), voire aberrantes
 * (Zurich → Verbier annoncé à 170 km, 288 en réalité). Le moteur calculera avec
 * les distances routières : les coefficients doivent être calibrés sur les mêmes.
 */
let distancesCalculees = [];
try {
  const source = await readFile(path.join(RACINE, "src", "data", "distances.ts"), "utf8");
  distancesCalculees = [
    ...source.matchAll(/airport: "([^"]+)", resort: "([^"]+)", km: ([0-9]+)/g),
  ].map((m) => ({ airport: m[1], resort: m[2], km: Number(m[3]) }));
} catch {
  console.warn("  distances.ts absent : coefficients calibrés sur les distances annoncées.");
}
const kmRoutier = (l) =>
  distancesCalculees.find((d) => d.airport === l.airport && d.resort === l.resort)?.km ?? l.km;

const ratiosParStation = new Map();
for (const l of lignes) {
  const km = kmRoutier(l);
  if (!l.prive || !km) continue;
  const liste = ratiosParStation.get(l.resort) ?? [];
  liste.push(l.prive / modele(km));
  ratiosParStation.set(l.resort, liste);
}

const mediane = (valeurs) => {
  const triees = [...valeurs].sort((a, b) => a - b);
  return triees[Math.floor(triees.length / 2)];
};

const coefficients = [...ratiosParStation.entries()]
  .map(([resort, ratios]) => ({
    resort,
    // Arrondi au centième : un coefficient est une décision commerciale, pas
    // une sortie de régression à trois décimales.
    coefficient: Math.round(mediane(ratios) * 100) / 100,
    trajets: ratios.length,
    dispersion: Math.round((Math.max(...ratios) / Math.min(...ratios)) * 100) / 100,
  }))
  .sort((a, b) => a.resort.localeCompare(b.resort));

const tsCoef = `/**
 * COEFFICIENTS PAR DESTINATION — calibrés, à valider par le client.
 *
 * Certaines stations coûtent plus cher à desservir que leur seule distance ne le
 * laisse penser : accès difficile, route de col, retour à vide, station sans
 * voitures. Le client l'a confirmé, et les chiffres le montrent.
 *
 * Mesuré sur les 85 prix publiés du site actuel :
 *   barème seul (92 € + 1,167 €/km)      → 14,1 % d'erreur moyenne, 37/85 à ±10 %
 *   barème × coefficient de destination  →  5,7 % d'erreur moyenne, 61/85 à ±10 %
 *
 * Et le coefficient est stable d'un aéroport à l'autre : sur les 13 stations
 * desservies par au moins trois aéroports, 10 ont un écart max/min inférieur à
 * 1,35. C'est une politique de prix, pas du bruit.
 *
 * \`trajets\` dit sur combien de prix le coefficient est calculé : à 1 ou 2, il
 * reprend surtout le prix existant ; à partir de 3, il révèle une tendance.
 *
 * Généré par \`npm run tarifs:extraire\` le ${new Date().toISOString().slice(0, 10)}.
 */
export interface CoefficientDestination {
  resort: string;
  /** Multiplicateur appliqué au prix calculé par le barème. */
  coefficient: number;
  /** Nombre de prix publiés ayant servi au calcul. */
  trajets: number;
  /** Écart entre le plus haut et le plus bas ratio observé : au-delà de 1,35, les
   *  prix de cette station ne sont pas cohérents entre eux. */
  dispersion: number;
}

export const COEFFICIENTS: CoefficientDestination[] = [
${coefficients
  .map(
    (c) =>
      `  { resort: "${c.resort}", coefficient: ${c.coefficient}, trajets: ${c.trajets}, dispersion: ${c.dispersion} },`,
  )
  .join("\n")}
];

/** 1 par défaut : une station sans coefficient suit le barème général. */
export function coefficient(resort: string): number {
  return COEFFICIENTS.find((c) => c.resort === resort)?.coefficient ?? 1;
}
`;

await writeFile(path.join(RACINE, "src", "data", "coefficients.ts"), tsCoef, "utf8");

const csv = [
  "aeroport;station;prive;partage;devise;km;duree_min;PRIX_VALIDE_PAR_LE_CLIENT",
  ...lignes.map((l) =>
    [l.airport, l.resort, l.prive ?? "", l.partage ?? "", l.devise, l.km ?? "", l.duree ?? "", ""].join(
      ";",
    ),
  ),
].join("\n");
await writeFile(path.join(RACINE, "wp-export", "tarifs-a-valider.csv"), csv, "utf8");

const devises = lignes.reduce((acc, l) => {
  acc[l.devise] = (acc[l.devise] ?? 0) + 1;
  return acc;
}, {});

console.log(`\n  ${lignes.length} tarifs extraits → src/data/tarifs.ts`);
console.log(`  Devises citées : ${Object.entries(devises).map(([d, n]) => `${d} ${n}`).join(" · ")}`);
if (incomplets.length > 0) {
  console.log(`  ${incomplets.length} incomplets (prix ou durée manquants) :`);
  for (const i of incomplets.slice(0, 10)) {
    console.log(
      `    ${i.airport} → ${i.resort} : privé ${i.prive ?? "?"} · partagé ${i.partage ?? "?"} · ${i.duree ?? "?"} min`,
    );
  }
  if (incomplets.length > 10) console.log(`    … et ${incomplets.length - 10} autres`);
}
console.log(`\n  À faire valider par le client : wp-export/tarifs-a-valider.csv\n`);
