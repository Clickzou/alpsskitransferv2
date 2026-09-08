/**
 * Migre les pages de station depuis la base WordPress vers des modules TypeScript.
 *
 * Le contenu de ces 40 pages est le meilleur actif du site — environ 1 030 mots
 * utiles chacune, un comparatif d'aéroports, une FAQ. Il se REPREND fidèlement,
 * il ne se réécrit pas. Le faire à la main pour 40 pages, dans le délai d'un mois,
 * n'est pas tenable ; d'où cette reprise automatique, relue ensuite.
 *
 * Le `post_content` du thème contient aussi ses blocs de navigation (grilles de
 * vignettes de stations, fils d'Ariane, encarts). Le script ne garde que la
 * matière rédigée : titres, paragraphes et listes du corps.
 *
 * Usage :
 *   node scripts/migrer-stations.mjs --apercu val-thorens   (affiche, n'écrit rien)
 *   node scripts/migrer-stations.mjs                        (écrit les 40 modules)
 */
import { createReadStream } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

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
  ...registreAeroports.matchAll(/slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*iata:\s*"([^"]+)"/g),
].map((m) => ({ slug: m[1], nom: m[2], iata: m[3] }));

const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);

/** Les pages de station : `/{pays}-ski-transfers/{station}/`, profondeur 2. */
const PAGES_STATION = inventaire.filter(
  (e) =>
    /^\/[a-z]+-ski-transfers\/[^/]+\/$/.test(e.url) && !e.url.startsWith("/airport-ski-transfers/"),
);

/**
 * Slugs WordPress à corriger : doublons recyclés dont la page d'origine a été
 * supprimée, WordPress ayant suffixé la nouvelle.
 *
 * `val-thorens-2` n'est PAS dans cette table, et c'est important : sa vérification
 * confirme le constat de l'audit. Son titre WordPress dit « Val Thorens », mais son
 * contenu ET ses métadonnées parlent de Courchevel — Trois Vallées, Courchevel 1850,
 * 1650, Le Praz. C'est un doublon intégral de `/france-ski-transfers/courchevel/`.
 * Il part donc en 301 vers Courchevel, et **Val Thorens n'a aujourd'hui aucune
 * page** : la station la plus recherchée des Alpes françaises est à écrire.
 */
const SLUGS_CORRIGES = {
  "sestriere-2": "sestriere",
  "courmayeur-ski-transfers": "courmayeur",
};

const parSlug = new Map(
  PAGES_STATION.map((e) => {
    const brut = e.url.split("/").filter(Boolean)[1];
    return [SLUGS_CORRIGES[brut] ?? brut, e];
  }),
);

// --- Lecture des contenus ----------------------------------------------------
/** Découpe les tuples SQL (même parseur que scripts/analyse-wordpress.mjs). */
function tuples(ligne) {
  const debut = ligne.indexOf(" VALUES ");
  if (debut === -1) return [];
  const resultats = [];
  let i = debut + 8;
  const n = ligne.length;
  while (i < n) {
    while (i < n && ligne[i] !== "(") i++;
    if (i >= n) break;
    i++;
    const valeurs = [];
    let courant = "";
    let dansChaine = false;
    let estNull = true;
    while (i < n) {
      const c = ligne[i];
      if (dansChaine) {
        if (c === "\\") {
          const s = ligne[i + 1];
          courant += s === "n" ? "\n" : s === "r" ? "\r" : s === "t" ? "\t" : s;
          i += 2;
          continue;
        }
        if (c === "'") {
          if (ligne[i + 1] === "'") {
            courant += "'";
            i += 2;
            continue;
          }
          dansChaine = false;
          i++;
          continue;
        }
        courant += c;
        i++;
        continue;
      }
      if (c === "'") {
        dansChaine = true;
        estNull = false;
        i++;
        continue;
      }
      if (c === ",") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        courant = "";
        estNull = true;
        i++;
        continue;
      }
      if (c === ")") {
        valeurs.push(estNull && courant.trim() === "NULL" ? null : courant.trim());
        i++;
        break;
      }
      courant += c;
      i++;
    }
    resultats.push(valeurs);
  }
  return resultats;
}

const contenus = new Map(); // slug -> html

const flux = readline.createInterface({
  input: createReadStream(path.join(RACINE, "wp-export", "database.sql"), { encoding: "utf8" }),
  crlfDelay: Infinity,
});
for await (const ligne of flux) {
  if (!ligne.startsWith(`INSERT INTO \`${PREFIXE}posts\``)) continue;
  for (const t of tuples(ligne)) {
    const [, , , , contenu, , , statut, , , , nom, , , , , , , , , type] = t;
    if (statut !== "publish" || type !== "page" || !nom) continue;
    const slug = SLUGS_CORRIGES[nom] ?? nom;
    if (parSlug.has(slug) && !contenus.has(slug)) contenus.set(slug, contenu ?? "");
  }
}

// --- Extraction du contenu rédigé -------------------------------------------
const ENTITES = {
  "&amp;": "&",
  "&nbsp;": " ",
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8220;": "“",
  "&#8221;": "”",
  "&quot;": '"',
  "&#039;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&eacute;": "é",
  "&egrave;": "è",
};

function texte(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITES[e] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Ne garde que la matière rédigée. Les grilles de vignettes du thème sont des
 * suites de `<a>` et d'`<img>` sans paragraphe : elles disparaissent d'elles-mêmes
 * puisqu'on ne lit que h1-h3, p et li. Restent à écarter les fragments trop
 * courts, qui sont des libellés d'interface et non du contenu.
 */
function extraire(html) {
  const blocs = [];
  const motif = /<(h1|h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = motif.exec(html))) {
    const balise = m[1].toLowerCase();
    const contenu = texte(m[2]);
    if (!contenu) continue;
    if (balise === "li" && contenu.length < 25) continue; // éléments de menu
    if (balise === "p" && contenu.length < 40) continue; // légendes, boutons
    blocs.push({ balise, texte: contenu });
  }
  return blocs;
}

/** Regroupe les <li> consécutifs en une seule liste. */
function assembler(blocs) {
  const sortie = [];
  let liste = null;
  for (const b of blocs) {
    if (b.balise === "li") {
      liste = liste ?? { type: "liste", items: [] };
      liste.items.push(b.texte);
      continue;
    }
    if (liste) {
      sortie.push(liste);
      liste = null;
    }
    sortie.push({
      type:
        b.balise === "h1"
          ? "titre1"
          : b.balise === "h2"
            ? "titre2"
            : b.balise === "h3"
              ? "titre3"
              : "paragraphe",
      texte: b.texte,
    });
  }
  if (liste) sortie.push(liste);
  return sortie;
}

/** Sépare la FAQ du corps : un titre interrogatif et le texte qui le suit. */
function separerFaq(blocs) {
  const corps = [];
  const faq = [];
  for (let i = 0; i < blocs.length; i++) {
    const b = blocs[i];
    const estQuestion =
      (b.type === "titre2" || b.type === "titre3") && b.texte.trim().endsWith("?");
    if (!estQuestion) {
      corps.push(b);
      continue;
    }
    const reponses = [];
    let j = i + 1;
    while (j < blocs.length && blocs[j].type === "paragraphe") {
      reponses.push(blocs[j].texte);
      j++;
    }
    if (reponses.length > 0) {
      faq.push({ question: b.texte, reponse: reponses.join(" ") });
      i = j - 1;
    } else {
      corps.push(b);
    }
  }
  return { corps, faq };
}

/** Aéroports cités dans la page, dans leur ordre d'apparition. */
/**
 * Aéroports cités dans la page, dans leur ordre d'apparition.
 * Recherche sur limite de mot : sans elle, « Sion » se trouvait dans « occasion »
 * et l'aéroport de Sion apparaissait sur des pages françaises.
 */
function aeroportsCites(html) {
  const brut = texte(html).toLowerCase();
  const trouves = [];
  for (const a of AEROPORTS) {
    const ville = a.nom
      .replace(/ Airport$/, "")
      .split(/[-\s]/)[0]
      .toLowerCase();
    const position = brut.search(new RegExp(`\\b${ville}\\b`));
    if (position !== -1) trouves.push({ slug: a.slug, position });
  }
  return trouves.sort((x, y) => x.position - y.position).map((a) => a.slug);
}

const echappe = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/** Décode les entités des metas Rank Math, stockées encodées en base. */
function decoder(s) {
  return (s ?? "").replace(/&[a-z#0-9]+;/gi, (e) => ENTITES[e] ?? e);
}

function moduleTs(station, page, donnees) {
  const { h1, chapo, corps, faq, airports, mots } = donnees;
  const blocs = corps
    .map((b) =>
      b.type === "liste"
        ? `    { type: "liste", items: [${b.items.map((i) => `"${echappe(i)}"`).join(", ")}] },`
        : `    { type: "${b.type}", texte: "${echappe(b.texte)}" },`,
    )
    .join("\n");
  const faqTs = faq
    .map(
      (f) =>
        `    { question: "${echappe(f.question)}", reponse: "${echappe(f.reponse)}" },`,
    )
    .join("\n");

  return `import type { Resort } from "./types";

/**
 * Repris de ${page.url} (WordPress, ${mots} mots) par
 * \`npm run migrer:stations\`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const ${station.slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}: Resort = {
  slug: "${station.slug}",
  name: "${echappe(station.nom)}",
  country: "${station.pays}",
  status: "migre",

  metaTitre: "${echappe(decoder(page.metaTitre))}",
  metaDescription: "${echappe(decoder(page.metaDescription))}",
  h1: "${echappe(h1)}",
  chapo: "${echappe(chapo)}",

  airports: [${airports.map((a) => `"${a}"`).join(", ")}],

  contenu: [
${blocs}
  ],

  faq: [
${faqTs}
  ],
};
`;
}

// --- Traitement --------------------------------------------------------------
const resultats = [];
const ignorees = [];

for (const [slug, page] of parSlug) {
  const html = contenus.get(slug);
  const station = STATIONS.find((s) => s.slug === slug);
  if (!html || !station) {
    ignorees.push({ slug, raison: !station ? "absente du registre" : "contenu introuvable" });
    continue;
  }

  const blocs = assembler(extraire(html));
  const { corps, faq } = separerFaq(blocs);

  // Le H1 rédigé dans la page vaut mieux que le titre WordPress, qui n'est
  // souvent que le nom de la station (« Courchevel ») : le H1 porte la requête
  // (« Courchevel Ski Transfers — Fast, Reliable & Comfortable Transport »).
  const titreRedige = blocs.find((b) => b.type === "titre1");
  const premierParagraphe = corps.find((b) => b.type === "paragraphe");
  const h1 = titreRedige?.texte || page.titre || `Ski transfers to ${station.nom}`;
  const chapo = premierParagraphe?.texte ?? "";

  // Ni le H1 ni le chapô ne doivent rester en double dans le corps.
  const corpsSansChapo = corps.filter(
    (b) => b !== premierParagraphe && b.type !== "titre1",
  );

  resultats.push({
    station,
    page,
    donnees: {
      h1,
      chapo,
      corps: corpsSansChapo,
      faq,
      airports: aeroportsCites(html),
      mots: page.mots,
    },
  });
}

if (apercu) {
  const r = resultats.find((x) => x.station.slug === apercu);
  if (!r) {
    console.error(`Station « ${apercu} » introuvable.`);
    process.exit(1);
  }
  console.log(moduleTs(r.station, r.page, r.donnees).slice(0, 4000));
  console.log(
    `\n--- ${r.donnees.corps.length} blocs, ${r.donnees.faq.length} questions, aéroports : ${r.donnees.airports.join(", ")}`,
  );
  process.exit(0);
}

for (const r of resultats) {
  await writeFile(
    path.join(RACINE, "src", "lib", "resorts", `${r.station.slug}.ts`),
    moduleTs(r.station, r.page, r.donnees),
    "utf8",
  );
}

// --- index.ts ----------------------------------------------------------------
const nomVariable = (slug) => slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const imports = resultats
  .map((r) => `import { ${nomVariable(r.station.slug)} } from "./${r.station.slug}";`)
  .sort()
  .join("\n");
const liste = resultats
  .map((r) => `  ${nomVariable(r.station.slug)},`)
  .sort()
  .join("\n");

/**
 * Seul le bloc généré est réécrit. Les stations rédigées à la main vivent dans
 * `rediges.ts`, importé par `index.ts` : la regex ne retire que les imports des
 * modules générés — nom de variable à minuscule initiale — sans quoi la migration
 * suivante effacerait Val Thorens de l'index, et sa page avec elle.
 */
const index = await readFile(path.join(RACINE, "src", "lib", "resorts", "index.ts"), "utf8");
const nouvelIndex = index
  .replace(/import \{ [a-z][a-zA-Z]* \} from "\.\/[a-z-]+";\n/g, "")
  .replace('import { RESORTS } from "./registry";', `import { RESORTS } from "./registry";\n${imports}`)
  .replace(
    /const STATIONS_MIGREES: Resort\[\] = \[[\s\S]*?\];/,
    `const STATIONS_MIGREES: Resort[] = [\n${liste}\n];`,
  );
await writeFile(path.join(RACINE, "src", "lib", "resorts", "index.ts"), nouvelIndex, "utf8");

// --- registry.ts : statut ----------------------------------------------------
let registre = registreStations;
for (const r of resultats) {
  registre = registre.replace(
    new RegExp(`(slug: "${r.station.slug}",[^}]*status: )"a-migrer"`),
    '$1"migre"',
  );
}
await writeFile(path.join(RACINE, "src", "lib", "resorts", "registry.ts"), registre, "utf8");

const sansFaq = resultats.filter((r) => r.donnees.faq.length === 0);
const courtes = resultats.filter((r) => r.donnees.corps.length < 6);

console.log(`\n  ${resultats.length} stations migrées.`);
if (ignorees.length > 0) {
  console.log(`  ${ignorees.length} ignorées :`);
  for (const i of ignorees) console.log(`    ${i.slug} — ${i.raison}`);
}
if (sansFaq.length > 0) {
  console.log(`\n  ${sansFaq.length} sans FAQ détectée : ${sansFaq.map((r) => r.station.slug).join(", ")}`);
}
if (courtes.length > 0) {
  console.log(
    `  ${courtes.length} avec moins de 6 blocs (à relire en priorité) : ${courtes.map((r) => r.station.slug).join(", ")}`,
  );
}
console.log();
