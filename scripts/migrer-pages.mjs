/**
 * Migre les pages fonctionnelles conservées depuis la base WordPress.
 *
 * Le plan de migration garde 14 URL telles quelles — contact, conditions, aide,
 * FAQ, et deux pages de fond de 2 157 et 1 374 mots. Sans cette reprise, elles
 * tomberaient en 404 le jour de la bascule alors que leur URL est réputée
 * conservée.
 *
 * Usage :
 *   node scripts/migrer-pages.mjs --apercu contact
 *   node scripts/migrer-pages.mjs
 */
import { createReadStream } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
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

/** Pages servies mais hors index : elles n'ont rien à faire dans les résultats. */
const NOINDEX = new Set(["thanks-for-your-inquiry", "cookie-policy-uk", "privacy"]);

/**
 * Pages refondues à la main, que ce script ne doit plus écraser.
 *
 * `book-ski-transfer-tickets` est la page de conversion du silo,
 * `private-airport-transfers-to-alps-ski-resort` sa page de service : chacune a
 * son gabarit et son contenu structuré dans `data/`. Leur module de `lib/pages/`
 * ne porte plus que les metas, le H1 et la FAQ, réécrits — les régénérer depuis
 * le WordPress y réintroduirait les mentions de transfert partagé, que le site ne
 * vend pas, et pour la seconde le bloc d'aéroports publié deux fois.
 */
const REFONDUES = new Set([
  "book-ski-transfer-tickets",
  "private-airport-transfers-to-alps-ski-resort",
  // La politique de cookies reprise faisait trois mots : il n'y a rien à
  // reprendre, et la réécrire depuis le WordPress effacerait le texte RGPD.
  "cookie-policy-uk",
  // L'index des destinations : sa liste est générée depuis le registre des
  // stations, pas reprise du WordPress qui n'en montrait que onze sur soixante-huit.
  "ski-resort-transfers",
  // Groupes et professionnels : le mot-clé du WordPress — « special inquiry
  // ski transfer » — n'existe pas dans les moteurs de recherche.
  "inquiry",
  // La FAQ : ses questions vivaient dans des accordéons Elementor, donc hors
  // du texte repris. Les régénérer redonnerait des réponses sans questions.
  "general-questions",
  // Les conditions de vente, les conditions générales et la confidentialité :
  // corrigées le 11 septembre 2026 — délai de modification, annulation, tarif
  // d'attente, e-mail de contact. Le WordPress contredisait le site.
  "ticketing-conditions",
  "terms-conditions-alps-ski-transfers",
  "privacy",
]);

const migration = await readFile(
  path.join(RACINE, "src", "data", "redirections-migration.ts"),
  "utf8",
);
const bloc = migration.slice(migration.indexOf("URL_CONSERVEES"));
const CONSERVEES = [...bloc.matchAll(/"\/([^"]+)\/"/g)].map((m) => m[1]);

const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);
const parSlug = new Map(
  CONSERVEES.map((slug) => [slug, inventaire.find((e) => e.url === `/${slug}/`)]).filter(
    ([, page]) => page,
  ),
);

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
    if (parSlug.has(nom) && !contenus.has(nom)) contenus.set(nom, contenu ?? "");
  }
}

function moduleTs(slug, page, donnees) {
  return `import type { PageFonctionnelle } from "./types";

/**
 * Repris de /${slug}/ (WordPress, ${page.mots} mots) par \`npm run migrer:pages\`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const ${nomVariable(slug)}: PageFonctionnelle = {
  slug: "${slug}",
  metaTitre: "${echappe(decoder(page.metaTitre) || page.titre)}",
  metaDescription: "${echappe(decoder(page.metaDescription))}",
  h1: "${echappe(donnees.h1)}",
  chapo: "${echappe(donnees.chapo)}",
${NOINDEX.has(slug) ? "  noindex: true,\n" : ""}
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

for (const [slug, page] of parSlug) {
  const html = contenus.get(slug);
  if (!html) {
    sansContenu.push(slug);
    continue;
  }
  const blocs = assembler(extraire(html));
  const { corps, faq } = separerFaq(blocs);
  const titreRedige = blocs.find((b) => b.type === "titre1");
  const premierParagraphe = corps.find((b) => b.type === "paragraphe");

  resultats.push({
    slug,
    page,
    donnees: {
      h1: titreRedige?.texte || page.titre || slug,
      chapo: premierParagraphe?.texte ?? "",
      corps: corps.filter((b) => b !== premierParagraphe && b.type !== "titre1"),
      faq,
    },
  });
}

if (apercu) {
  const r = resultats.find((x) => x.slug === apercu);
  if (!r) {
    console.error(`Page « ${apercu} » introuvable. Disponibles : ${resultats.map((x) => x.slug).join(", ")}`);
    process.exit(1);
  }
  console.log(moduleTs(r.slug, r.page, r.donnees).slice(0, 2500));
  process.exit(0);
}

for (const r of resultats) {
  if (REFONDUES.has(r.slug)) continue;
  await writeFile(
    path.join(RACINE, "src", "lib", "pages", `${r.slug}.ts`),
    moduleTs(r.slug, r.page, r.donnees),
    "utf8",
  );
}

/**
 * L'index se construit sur le CONTENU DU DOSSIER, pas sur les seules pages
 * reprises : `contact.ts` est écrit à la main — la page WordPress était vide —
 * et doit survivre à une réexécution du script.
 */
const modules = (await readdir(path.join(RACINE, "src", "lib", "pages")))
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(/\.ts$/, ""))
  .sort();

const imports = modules
  .map((slug) => `import { ${nomVariable(slug)} } from "./${slug}";`)
  .join("\n");
const liste = modules.map((slug) => `  ${nomVariable(slug)},`).join("\n");

await writeFile(
  path.join(RACINE, "src", "lib", "pages", "index.ts"),
  `${imports}
import type { PageFonctionnelle } from "./types";

export type { PageFonctionnelle } from "./types";

/**
 * Les pages fonctionnelles conservées, reprises du WordPress par
 * \`npm run migrer:pages\`. Leur URL est réputée conservée par le plan de
 * migration : la déplacer créerait une 404 que rien ne rattrape.
 */
export const PAGES: PageFonctionnelle[] = [
${liste}
];

export function pageParSlug(slug: string) {
  return PAGES.find((p) => p.slug === slug);
}
`,
  "utf8",
);

console.log(`\n  ${resultats.length} pages fonctionnelles migrées.`);
const maigres = resultats.filter((r) => r.donnees.corps.length < 2);
if (maigres.length > 0) {
  console.log(`  ${maigres.length} quasi vides, à réécrire : ${maigres.map((r) => r.slug).join(", ")}`);
}
if (sansContenu.length > 0) console.log(`  ${sansContenu.length} sans contenu : ${sansContenu.join(", ")}`);
console.log();
