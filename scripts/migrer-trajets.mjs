/**
 * Migre les 96 pages de trajet depuis la base WordPress.
 *
 * Ces pages plafonnent à ~455 mots : elles sont reprises telles quelles pour ne
 * rien perdre, mais elles sont à étoffer (cible 900-1 400 mots, cf. le master §6).
 * Un trajet dont la station n'est pas encore migrée est écrit quand même : il
 * s'activera tout seul le jour où sa page mère existe, `generateStaticParams`
 * le filtrant d'ici là.
 *
 * Usage :
 *   node scripts/migrer-trajets.mjs --apercu geneva-airport-to-chamonix
 *   node scripts/migrer-trajets.mjs
 */
import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import {
  assembler,
  decoder,
  echappe,
  extraire,
  nomVariable,
  rendreBlocs,
  rendreFaq,
  separerFaq,
  tuples,
} from "./_wordpress.mjs";

const RACINE = process.cwd();
const PREFIXE = "SERVMASK_PREFIX_";
const args = process.argv.slice(2);
const apercu = args.includes("--apercu") ? args[args.indexOf("--apercu") + 1] : null;

// --- Registres ---------------------------------------------------------------
const registreStations = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "registry.ts"),
  "utf8",
);
const registreAeroports = await readFile(
  path.join(RACINE, "src", "lib", "airports", "registry.ts"),
  "utf8",
);
const STATIONS = [
  ...registreStations.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})"/g),
].map((m) => ({ slug: m[1], nom: m[2], pays: m[3] }));
const AEROPORTS = [
  ...registreAeroports.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g),
].map((m) => ({ slug: m[1], nom: m[2] }));

/** Mêmes variantes de nommage que dans le plan de redirections. */
const ALIAS_STATIONS = {
  "st-anton": "st-anton-am-arlberg",
  "lech-am-arlberg": "lech",
  "deux-alpes": "les-deux-alpes",
  "val-thorens-3-valleys": "val-thorens",
  "les-menuires-3-valleys": "les-menuires",
  "les-arcs-1950-2000-paradiski": "les-arcs",
  "ischgl-transfer": "ischgl",
  "zermatt-tasch": "zermatt",
};

const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);

/** Résout un slug WordPress de trajet en couple (aéroport, station). */
function resoudre(slugWordpress) {
  const [prefixe, brut] = slugWordpress.replace(/-transfers$/, "").split("-to-");
  if (!brut) return null;
  const station = STATIONS.find((s) => s.slug === (ALIAS_STATIONS[brut] ?? brut));
  const candidats = AEROPORTS.filter((a) => a.slug.startsWith(`${prefixe}-`) || a.slug === prefixe);
  // Aéroport ambigu (Milan, Paris) : la page de trajet n'est pas reprise, la
  // redirection envoie déjà ces URL sur la page de station.
  if (!station || candidats.length !== 1) return null;
  return { station, aeroport: candidats[0] };
}

const PAGES_TRAJET = inventaire.filter(
  (e) => /^\/airport-ski-transfers\/[^/]+\/[^/]+\/$/.test(e.url),
);

const cibles = new Map(); // slug WordPress -> { page, station, aeroport }
const nonResolus = [];
for (const page of PAGES_TRAJET) {
  const slug = page.url.split("/").filter(Boolean)[2];
  const resolu = resoudre(slug);
  if (!resolu) {
    nonResolus.push(page.url);
    continue;
  }
  cibles.set(slug, { page, ...resolu });
}

// --- Contenus ----------------------------------------------------------------
const contenus = new Map();
const flux = readline.createInterface({
  input: createReadStream(path.join(RACINE, "wp-export", "database.sql"), { encoding: "utf8" }),
  crlfDelay: Infinity,
});
for await (const ligne of flux) {
  if (!ligne.startsWith(`INSERT INTO \`${PREFIXE}posts\``)) continue;
  for (const t of tuples(ligne)) {
    const [, , , , contenu, , , statut, , , , nom, , , , , , , , , type] = t;
    if (statut !== "publish" || type !== "page" || !nom) continue;
    if (cibles.has(nom) && !contenus.has(nom)) contenus.set(nom, contenu ?? "");
  }
}

function moduleTs(cible, donnees) {
  const { page, station, aeroport } = cible;
  const variable = nomVariable(`${aeroport.slug}-to-${station.slug}`);
  return `import type { Transfer } from "./types";

/**
 * Repris de ${page.url} (WordPress, ${page.mots} mots) par
 * \`npm run migrer:trajets\`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const ${variable}: Transfer = {
  airport: "${aeroport.slug}",
  resort: "${station.slug}",

  metaTitre: "${echappe(decoder(page.metaTitre) || `${aeroport.nom} to ${station.nom} Transfers`)}",
  metaDescription: "${echappe(decoder(page.metaDescription))}",
  h1: "${echappe(donnees.h1)}",
  chapo: "${echappe(donnees.chapo)}",

  contenu: [
${rendreBlocs(donnees.corps)}
  ],

  faq: [
${rendreFaq(donnees.faq)}
  ],
};
`;
}

const resultats = [];
const sansContenu = [];

for (const [slug, cible] of cibles) {
  const html = contenus.get(slug);
  if (!html) {
    sansContenu.push(cible.page.url);
    continue;
  }
  const blocs = assembler(extraire(html));
  const { corps, faq } = separerFaq(blocs);
  const titreRedige = blocs.find((b) => b.type === "titre1");
  const premierParagraphe = corps.find((b) => b.type === "paragraphe");

  resultats.push({
    cible,
    fichier: `${cible.aeroport.slug}-to-${cible.station.slug}`,
    donnees: {
      h1:
        titreRedige?.texte ||
        cible.page.titre ||
        `${cible.aeroport.nom} to ${cible.station.nom}`,
      chapo: premierParagraphe?.texte ?? "",
      corps: corps.filter((b) => b !== premierParagraphe && b.type !== "titre1"),
      faq,
    },
  });
}

if (apercu) {
  const r = resultats.find((x) => x.fichier === apercu);
  if (!r) {
    console.error(`Trajet « ${apercu} » introuvable. Exemples :`);
    for (const x of resultats.slice(0, 5)) console.error(`  ${x.fichier}`);
    process.exit(1);
  }
  console.log(moduleTs(r.cible, r.donnees).slice(0, 3000));
  process.exit(0);
}

for (const r of resultats) {
  await writeFile(
    path.join(RACINE, "src", "lib", "transfers", `${r.fichier}.ts`),
    moduleTs(r.cible, r.donnees),
    "utf8",
  );
}

// --- index.ts ----------------------------------------------------------------
const index = await readFile(path.join(RACINE, "src", "lib", "transfers", "index.ts"), "utf8");
const imports = resultats
  .map((r) => `import { ${nomVariable(r.fichier)} } from "./${r.fichier}";`)
  .sort()
  .join("\n");
const liste = resultats
  .map((r) => `  ${nomVariable(r.fichier)},`)
  .sort()
  .join("\n");

/**
 * Seul le bloc généré est réécrit. Les trajets rédigés à la main vivent dans
 * `rediges.ts`, importé par `index.ts` : la regex ne retire que les imports des
 * modules générés — variable à minuscule initiale — sans quoi la migration
 * suivante effacerait les liaisons Genève écrites à la main.
 */
const nouvelIndex = index
  .replace(/import \{ [a-z][a-zA-Z0-9]* \} from "\.\/(?!types)[a-z0-9-]+";\n/g, "")
  .replace(
    'import { TRANSFERS_REDIGES } from "./rediges";',
    `${imports}\nimport { TRANSFERS_REDIGES } from "./rediges";`,
  )
  .replace(
    /const TRAJETS_MIGRES: Transfer\[\] = \[[\s\S]*?\];/,
    `const TRAJETS_MIGRES: Transfer[] = [\n${liste}\n];`,
  );
await writeFile(path.join(RACINE, "src", "lib", "transfers", "index.ts"), nouvelIndex, "utf8");

// Un trajet dont la station n'est pas encore migrée est inerte : il n'a pas de
// page mère, donc pas de page. Le signaler évite de croire le silo complet.
const stationsMigrees = new Set(
  (await readFile(path.join(RACINE, "src", "lib", "resorts", "index.ts"), "utf8"))
    .matchAll(/from "\.\/([a-z0-9-]+)";/g)
    .map((m) => m[1]),
);
const enAttente = resultats.filter((r) => !stationsMigrees.has(r.cible.station.slug));

console.log(`\n  ${resultats.length} trajets migrés.`);
if (enAttente.length > 0) {
  const stations = [...new Set(enAttente.map((r) => r.cible.station.slug))].sort();
  console.log(
    `  ${enAttente.length} restent inertes tant que leur station n'est pas migrée : ${stations.join(", ")}`,
  );
}
if (nonResolus.length > 0) {
  console.log(`\n  ${nonResolus.length} non résolus (aéroport ambigu ou hub) :`);
  for (const u of nonResolus.slice(0, 8)) console.log(`    ${u}`);
  if (nonResolus.length > 8) console.log(`    … et ${nonResolus.length - 8} autres`);
}
if (sansContenu.length > 0) console.log(`\n  ${sansContenu.length} sans contenu trouvé en base.`);
console.log();
