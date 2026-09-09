/**
 * Crée les modules des pages de trajet qui manquent, pour les liaisons qui les
 * méritent.
 *
 * ## Le filtre, et pourquoi il est serré
 *
 * 2 108 paires aéroport → station ont une distance calculée. Les publier toutes
 * serait une faute : la plupart n'ont aucun volume de recherche, plusieurs ne
 * correspondent à aucune offre réelle — Genève-Ischgl fait 509 km — et deux
 * mille pages bâties sur un même gabarit sont exactement ce que Google traite
 * comme des pages tunnel.
 *
 * On ne crée donc que ce qui est **vendable et cherché** :
 *  · un aéroport majeur, celui d'où les gens arrivent réellement ;
 *  · une durée sous le seuil (2 h par défaut) — au-delà, un transfert se
 *    négocie plutôt qu'il ne se réserve ;
 *  · une station qui a sa page, sans quoi le maillage tomberait dans le vide.
 *
 * Le lot se mesure ensuite dans la Search Console avant d'être élargi. C'est la
 * raison du `--max` : on avance par paliers, pas par la totalité.
 *
 * Ce script n'écrit que le **squelette** — metas, H1, chapô, tableaux vides.
 * `npm run trajets:rediger` remplit ensuite le corps et la FAQ depuis les
 * distances mesurées, exactement comme pour les pages reprises.
 *
 * Usage :
 *   node scripts/creer-trajets.mjs --essai
 *   node scripts/creer-trajets.mjs --max 150
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const args = process.argv.slice(2);
const essai = args.includes("--essai");
const maxMinutes = args.includes("--max") ? Number(args[args.indexOf("--max") + 1]) : 120;

/** Les aéroports d'où les voyageurs arrivent réellement. */
const MAJEURS = new Set([
  "geneva-airport",
  "lyon-airport",
  "chambery-savoie-airport",
  "grenoble-isere-airport",
  "turin-airport",
  "zurich-airport",
  "salzburg-airport",
  "innsbruck-airport",
  "milan-malpensa-airport",
  "nice-airport",
  "paris-charles-de-gaulle-airport",
]);

/* ------------------------------------------------------------- les données */

const lire = async (p) => readFile(path.join(RACINE, p), "utf8");

const DISTANCES = [
  ...(await lire("src/data/distances.ts")).matchAll(
    /\{ airport: "([^"]+)", resort: "([^"]+)", km: (\d+), minutes: (\d+) \}/g,
  ),
].map((m) => ({ airport: m[1], resort: m[2], km: Number(m[3]), minutes: Number(m[4]) }));

const AIRPORTS = [
  ...(await lire("src/lib/airports/registry.ts")).matchAll(
    /\{ slug: "([^"]+)", name: "([^"]+)", iata: "([^"]+)", country: "([A-Z]{2})" \}/g,
  ),
].map((m) => ({ slug: m[1], name: m[2], iata: m[3], country: m[4] }));

const RESORTS = [];
for (const nom of await readdir(path.join(RACINE, "src/lib/resorts"))) {
  if (!nom.endsWith(".ts") || nom === "index.ts" || nom === "types.ts") continue;
  const source = await lire(`src/lib/resorts/${nom}`);
  const slug = source.match(/\n\s*slug: "([^"]+)"/)?.[1];
  const name = source.match(/\n\s*name: "([^"]+)"/)?.[1];
  if (slug && name) RESORTS.push({ slug, name });
}

/** Les paires qui ont déjà leur page. */
const dossier = path.join(RACINE, "src/lib/transfers");
const fichiers = await readdir(dossier);
const existantes = new Set();
for (const nom of fichiers) {
  if (!nom.includes("-to-") || !nom.endsWith(".ts")) continue;
  const source = await lire(`src/lib/transfers/${nom}`);
  const a = source.match(/\n\s*airport: "([^"]+)"/)?.[1];
  const r = source.match(/\n\s*resort: "([^"]+)"/)?.[1];
  if (a && r) existantes.add(`${a}|${r}`);
}

/* ------------------------------------------------------------- la rédaction */

const duree = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
};

const court = (aeroport) => aeroport.name.replace(" Airport", "");

/** Camel case du nom de variable, depuis le nom de fichier. */
const nomVariable = (slug) =>
  slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase());

/**
 * Le title, sous 60 caractères.
 *
 * Trois formes de plus en plus courtes : « Paris Charles de Gaulle » ne laisse
 * pas la place au même habillage que « Lyon ». Mieux vaut un titre nu qu'un
 * titre tronqué par Google au milieu d'un mot.
 */
function metaTitre(a, r) {
  for (const forme of [
    `${court(a)} to ${r.name} Transfers | Private Ski Transfer`,
    `${court(a)} to ${r.name} Ski Transfers | Fixed Price`,
    `${court(a)} to ${r.name} Ski Transfers`,
    `${court(a)} to ${r.name} Transfers`,
  ]) {
    if (forme.length <= 60) return forme;
  }
  return `${court(a)} to ${r.name}`.slice(0, 60);
}

function metaDescription(a, r, d) {
  for (const forme of [
    `Private transfer from ${a.name} to ${r.name}: ${d.km} km, about ${duree(d.minutes)}. Fixed price per vehicle, flight tracking and ski carriage included.`,
    `Private transfer from ${court(a)} to ${r.name}: ${d.km} km, about ${duree(d.minutes)}. Fixed price per vehicle, flight tracking included.`,
    `Private ${court(a)} to ${r.name} transfer: ${d.km} km, ${duree(d.minutes)}. Fixed price per vehicle, door to door.`,
  ]) {
    if (forme.length <= 155) return forme;
  }
  return `Private transfer from ${court(a)} to ${r.name}, door to door.`.slice(0, 155);
}

const echapper = (t) => t.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

function moduleTs(a, r, d, variable) {
  return `import type { Transfer } from "./types";

/**
 * Page de trajet créée par \`npm run trajets:creer\` : cette liaison n'existait
 * pas sur le WordPress, alors qu'elle est courte (${duree(d.minutes)}) et part d'un
 * aéroport majeur. Metas et chapô générés ; le corps et la FAQ viennent de
 * \`npm run trajets:rediger\`, depuis les distances mesurées.
 */
export const ${variable}: Transfer = {
  airport: "${a.slug}",
  resort: "${r.slug}",

  metaTitre: "${echapper(metaTitre(a, r))}",
  metaDescription: "${echapper(metaDescription(a, r, d))}",
  h1: "${echapper(`${court(a)} to ${r.name} Transfers`)}",
  chapo: "${echapper(`A private transfer from ${a.name} to ${r.name} covers ${d.km} km in about ${duree(d.minutes)}. Your driver meets you in the arrivals hall and takes you straight to your accommodation, at a price fixed before you book.`)}",

  contenu: [
  ],

  faq: [
  ],
};
`;
}

/* --------------------------------------------------------------- la boucle */

const candidates = DISTANCES.filter((d) => {
  if (!MAJEURS.has(d.airport)) return false;
  if (d.minutes > maxMinutes) return false;
  if (existantes.has(`${d.airport}|${d.resort}`)) return false;
  return RESORTS.some((r) => r.slug === d.resort) && AIRPORTS.some((a) => a.slug === d.airport);
}).sort((x, y) => x.minutes - y.minutes);

console.log(
  `[trajets] ${candidates.length} pages à créer (aéroport majeur, ≤ ${duree(maxMinutes)})`,
);

const crees = [];
for (const d of candidates) {
  const a = AIRPORTS.find((x) => x.slug === d.airport);
  const r = RESORTS.find((x) => x.slug === d.resort);
  const slug = `${a.slug}-to-${r.slug}`;
  const variable = nomVariable(slug);

  console.log(`  ${a.name} → ${r.name} — ${d.km} km, ${duree(d.minutes)}`);
  if (!essai) {
    await writeFile(path.join(dossier, `${slug}.ts`), moduleTs(a, r, d, variable), "utf8");
  }
  crees.push({ slug, variable });
}

/* ------------------------------------------------ l'index, tenu à la main */

if (!essai && crees.length > 0) {
  const chemin = path.join(dossier, "index.ts");
  let index = await readFile(chemin, "utf8");

  const imports = crees
    .filter((c) => !index.includes(`from "./${c.slug}"`))
    .map((c) => `import { ${c.variable} } from "./${c.slug}";`)
    .join("\n");

  if (imports) {
    // Les imports en tête, l'entrée dans le tableau des trajets repris : c'est
    // celui que `TRANSFERS` concatène avec les trajets rédigés à la main.
    index = `${imports}\n${index}`;
    index = index.replace(
      /(const TRAJETS_MIGRES: Transfer\[\] = \[\n)/,
      `$1${crees.map((c) => `  ${c.variable},`).join("\n")}\n`,
    );
    await writeFile(chemin, index, "utf8");
  }
}

console.log(`[trajets] ${crees.length} modules ${essai ? "à créer (essai)" : "créés"}.`);
