/**
 * Que contiennent réellement les 91 pages `/destination/` ?
 *
 * Le plan de migration les fait toutes disparaître en 301 : elles doublonnent les
 * pages de station et de trajet, avec 200 à 260 mots chacune. Avant de jeter, on
 * regarde — parce que « fusionner leur matière dans les pages de trajet » ne veut
 * rien dire tant qu'on n'a pas mesuré ce qu'il y a dedans.
 *
 * Ce script sort, pour chaque page : son volume réel, la part de son texte qui se
 * retrouve déjà dans le contenu migré, et les phrases qui n'existent nulle part
 * ailleurs. C'est cette dernière colonne qui décide.
 *
 * Usage : node scripts/analyser-destination.mjs [--detail <slug>]
 */
import { createReadStream } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";

const RACINE = process.cwd();
const PREFIXE = "SERVMASK_PREFIX_";
const args = process.argv.slice(2);
const detail = args.includes("--detail") ? args[args.indexOf("--detail") + 1] : null;

const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);
const PAGES = inventaire.filter((e) => e.url.startsWith("/destination/"));
const slugsVoulus = new Set(PAGES.map((e) => e.url.split("/").filter(Boolean).at(-1)));

/** Découpe les tuples SQL (même parseur que les scripts de migration). */
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

const contenus = new Map();
const flux = readline.createInterface({
  input: createReadStream(path.join(RACINE, "wp-export", "database.sql"), { encoding: "utf8" }),
  crlfDelay: Infinity,
});
for await (const ligne of flux) {
  if (!ligne.startsWith(`INSERT INTO \`${PREFIXE}posts\``)) continue;
  for (const t of tuples(ligne)) {
    const [, , , , contenu, , , statut, , , , nom, , , , , , , , , type] = t;
    if (statut !== "publish" || !nom) continue;
    if (slugsVoulus.has(nom) && !contenus.has(nom)) contenus.set(nom, contenu ?? "");
  }
}

/** HTML → texte brut, blocs de navigation du thème retirés. */
function texte(html) {
  return (html ?? "")
    .replace(/\[\/?[a-z_]+[^\]]*\]/gi, " ") // shortcodes du thème
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** Phrases significatives : au moins six mots, ponctuation nettoyée. */
function phrases(t) {
  return t
    .split(/(?<=[.!?])\s+/)
    .map((p) => p.trim())
    .filter((p) => p.split(/\s+/).length >= 6);
}

const normaliser = (p) =>
  p
    .toLowerCase()
    .replace(/[^a-z0-9àâäéèêëîïôöùûüç ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Empreintes de huit mots glissants.
 *
 * Comparer des phrases entieres ne vaut rien ici : le HTML du theme colle les
 * titres aux paragraphes, donc la meme phrase ne se decoupe pas pareil des deux
 * cotes et ressort faussement « inedite ». Les n-grammes mesurent le
 * recouvrement reel du texte.
 */
function empreintes(t, n = 8) {
  const mots = normaliser(t).split(" ").filter(Boolean);
  const jeu = new Set();
  for (let i = 0; i + n <= mots.length; i++) jeu.add(mots.slice(i, i + n).join(" "));
  return jeu;
}

// --- Le corpus déjà en ligne : stations, trajets, pages fonctionnelles -------
const corpus = new Set();
const corpusEmpreintes = new Set();
for (const dossier of ["resorts", "transfers", "pages"]) {
  const chemin = path.join(RACINE, "src", "lib", dossier);
  for (const fichier of await readdir(chemin)) {
    if (!fichier.endsWith(".ts")) continue;
    const source = await readFile(path.join(chemin, fichier), "utf8");
    for (const m of source.matchAll(/"((?:[^"\\]|\\.){20,})"/g)) {
      for (const p of phrases(m[1])) corpus.add(normaliser(p));
      for (const e of empreintes(m[1])) corpusEmpreintes.add(e);
    }
  }
}

// --- Analyse -----------------------------------------------------------------
const resultats = [];
for (const page of PAGES) {
  const slug = page.url.split("/").filter(Boolean).at(-1);
  const brut = texte(contenus.get(slug));
  const liste = phrases(brut);
  const inedites = liste.filter((p) => !corpus.has(normaliser(p)));
  const emp = [...empreintes(brut)];
  const connues = emp.filter((e) => corpusEmpreintes.has(e)).length;
  resultats.push({
    url: page.url,
    slug,
    mots: brut.split(/\s+/).filter(Boolean).length,
    phrases: liste.length,
    inedites,
    // Part du texte que l'on retrouve mot pour mot dans le contenu deja migre.
    recouvrement: emp.length > 0 ? connues / emp.length : 0,
  });
}

if (detail) {
  const r = resultats.find((x) => x.slug === detail || x.url.includes(detail));
  if (!r) {
    console.log(`Aucune page /destination/ ne correspond à « ${detail} ».`);
    process.exit(1);
  }
  console.log(`\n${r.url} — ${r.mots} mots, ${r.phrases} phrases`);
  console.log(`${r.inedites.length} phrase(s) absente(s) du contenu déjà migré :\n`);
  for (const p of r.inedites) console.log(`  · ${p}`);
  console.log();
  process.exit(0);
}

const totalMots = resultats.reduce((s, r) => s + r.mots, 0);
const totalPhrases = resultats.reduce((s, r) => s + r.phrases, 0);
const totalInedites = resultats.reduce((s, r) => s + r.inedites.length, 0);
const vides = resultats.filter((r) => r.mots === 0);

console.log(`\n  Pages /destination/ — ce qu'elles contiennent\n  ${"─".repeat(52)}`);
console.log(`  Pages analysées            ${resultats.length}`);
console.log(`  Sans contenu récupérable   ${vides.length}`);
console.log(`  Mots au total              ${totalMots} (moyenne ${Math.round(totalMots / resultats.length)})`);
console.log(`  Phrases au total           ${totalPhrases}`);
console.log(
  `  Phrases inédites          ${totalInedites} (${Math.round((totalInedites / Math.max(1, totalPhrases)) * 100)} %)`,
);
console.log(`  ${"─".repeat(52)}`);

const moyenneRecouvrement =
  resultats.reduce((s, r) => s + r.recouvrement, 0) / Math.max(1, resultats.length);
console.log(
  `  Texte deja publie ailleurs ${Math.round(moyenneRecouvrement * 100)} % en moyenne (n-grammes de 8 mots)`,
);
console.log(`  ${"─".repeat(52)}`);

const parRecouvrement = [...resultats].sort((a, b) => a.recouvrement - b.recouvrement);
console.log(`  Les 12 pages les moins couvertes par le contenu deja migre :`);
for (const r of parRecouvrement.slice(0, 12)) {
  console.log(
    `    ${String(Math.round(r.recouvrement * 100)).padStart(3)} %  ${String(r.mots).padStart(5)} mots  ${r.url}`,
  );
}
console.log(
  `\n  Détail d'une page : node scripts/analyser-destination.mjs --detail <slug>\n`,
);
