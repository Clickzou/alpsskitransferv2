/**
 * Où en est la migration — 51 stations, 260 URL, une saison pour tenir.
 *
 * Usage : npm run migration:status
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();

const registre = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "registry.ts"),
  "utf8",
);
const transfers = await readFile(
  path.join(RACINE, "src", "lib", "transfers", "index.ts"),
  "utf8",
);
const transfersRediges = await readFile(
  path.join(RACINE, "src", "lib", "transfers", "rediges.ts"),
  "utf8",
);
const traductionsStations = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "traductions-fr.ts"),
  "utf8",
);
const traductionsTrajets = await readFile(
  path.join(RACINE, "src", "lib", "transfers", "traductions-fr.ts"),
  "utf8",
);
const redirections = [
  await readFile(path.join(RACINE, "src", "data", "redirections.ts"), "utf8"),
  await readFile(path.join(RACINE, "src", "data", "redirections-migration.ts"), "utf8"),
].join("\n");

const stations = [...registre.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})",\s*status:\s*"([^"]+)"/g)].map(
  (m) => ({ slug: m[1], nom: m[2], pays: m[3], statut: m[4] }),
);

// Une station a une page quand elle a son propre fichier de contenu — qu'il soit
// repris du WordPress ou rédigé à la main (`rediges.ts` n'est qu'un index).
const nbMigres = (await readdir(path.join(RACINE, "src", "lib", "resorts"))).filter(
  (f) =>
    f.endsWith(".ts") &&
    !["types.ts", "index.ts", "registry.ts", "rediges.ts", "traductions-fr.ts"].includes(f),
).length;

// Les trajets repris vivent dans le bloc genere de `index.ts`, ceux ecrits a la
// main dans `rediges.ts` : les deux comptent.
const compterImports = (source) =>
  [...source.matchAll(/from "\.\/[a-z0-9-]+-airport-to-[a-z0-9-]+"/g)].length;
const nbTrajets = compterImports(transfers) + compterImports(transfersRediges);

/** Pages francaises : une station ou un trajet n'en a une que s'il est traduit. */
const nbStationsFr = [...traductionsStations.matchAll(/^ {2}"?[a-z0-9-]+"?: \{$/gm)].length;
const nbTrajetsFr = [...traductionsTrajets.matchAll(/^ {2}"[a-z-]+\|[a-z0-9-]+": \{$/gm)].length;

const nbRedirections = [
  ...redirections
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g),
].length;

const parPays = stations.reduce((acc, s) => {
  acc[s.pays] = (acc[s.pays] ?? 0) + 1;
  return acc;
}, {});

console.log("\n  Migration alpsskitransfers\n  " + "─".repeat(44));
console.log(`  Stations au registre       ${stations.length}`);
for (const [pays, n] of Object.entries(parPays)) console.log(`    ${pays}                       ${n}`);
console.log(`  Stations migrées           ${nbMigres} / ${stations.length}`);
console.log(`  Trajets migrés             ${nbTrajets}`);
console.log(`  Pages françaises           ${nbStationsFr} stations, ${nbTrajetsFr} trajets`);
console.log(`  Redirections en place      ${nbRedirections}`);
console.log(`  Couverture des 261 URL     vérifiée au build (npm run redirects:check)`);
console.log("  " + "─".repeat(44));
console.log("  Rappels de l'audit :");
console.log("    · Les 15 liaisons Genève de l'audit sont écrites (8 septembre 2026).");
console.log("    · Les 91 pages /destination/ fusionnent, elles ne se migrent pas.");
console.log("    · Mise en ligne septembre-octobre. Novembre serait une faute.\n");
