/**
 * Audit SEO comparé : le WordPress actuel contre le site refait.
 *
 * L'ancien site est mesuré depuis `wp-export/inventaire.json` — les 261 URL
 * réellement publiées, avec leurs metas Rank Math, leur volume et leur directive
 * robots. Le nouveau est mesuré en le **crawlant vraiment** : on lit le HTML
 * servi, pas le code source, parce que ce que voit Google est le HTML.
 *
 * Aucune des deux colonnes n'est déclarative : les deux sont comptées.
 *
 * Usage :
 *   npm run build && npx next start -p 3003
 *   node scripts/audit-seo.mjs [--json <fichier>]
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const BASE = process.env.AUDIT_BASE ?? "http://localhost:3003";
const args = process.argv.slice(2);
const sortieJson = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;

const MAX_TITRE = 60;
const MAX_DESCRIPTION = 155;

/* ------------------------------------------------------------------ avant */

const inventaire = JSON.parse(
  await readFile(path.join(RACINE, "wp-export", "inventaire.json"), "utf8"),
);

const silo = (url) => {
  if (url.startsWith("/destination/")) return "/destination/";
  if (url.startsWith("/airport-ski-transfers/")) return "/airport-ski-transfers/";
  if (/^\/[a-z]+-ski-transfers\//.test(url)) return "/{pays}-ski-transfers/";
  return "autres";
};

const avant = {
  urls: inventaire.length,
  sansTitre: inventaire.filter((e) => !e.metaTitre).length,
  sansDescription: inventaire.filter((e) => !e.metaDescription).length,
  titresTropLongs: inventaire.filter((e) => (e.metaTitre?.length ?? 0) > MAX_TITRE).length,
  descriptionsTropLongues: inventaire.filter(
    (e) => (e.metaDescription?.length ?? 0) > MAX_DESCRIPTION,
  ).length,
  noindex: inventaire.filter((e) => /noindex/i.test(e.robots ?? "")).length,
  mots: inventaire.reduce((s, e) => s + (e.mots ?? 0), 0),
  motsMoyens: Math.round(
    inventaire.reduce((s, e) => s + (e.mots ?? 0), 0) / Math.max(1, inventaire.length),
  ),
  pagesMaigres: inventaire.filter((e) => (e.mots ?? 0) < 300).length,
  silos: {},
  titresDupliques: 0,
};

for (const e of inventaire) {
  const s = silo(e.url);
  avant.silos[s] = (avant.silos[s] ?? 0) + 1;
}

const titresVus = new Map();
for (const e of inventaire) {
  const t = (e.metaTitre ?? e.titre ?? "").trim().toLowerCase();
  if (!t) continue;
  titresVus.set(t, (titresVus.get(t) ?? 0) + 1);
}
avant.titresDupliques = [...titresVus.values()].filter((n) => n > 1).length;

/* ------------------------------------------------------------------ après */

/** Le sitemap est la liste des pages que le site déclare vouloir faire indexer. */
async function urlsDuSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );
}

/**
 * Les entites HTML faussent toute mesure de longueur : « & » s'ecrit `&amp;`
 * dans le source et compte pour un caractere dans un resultat de recherche.
 * Sans ce decodage, l'audit declare trop longs des titles qui ne le sont pas.
 */
const decoder = (t) =>
  (t ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));

const entre = (html, ouvrant, fermant) => {
  const i = html.indexOf(ouvrant);
  if (i === -1) return null;
  const j = html.indexOf(fermant, i + ouvrant.length);
  return j === -1 ? null : html.slice(i + ouvrant.length, j);
};

const attribut = (balise, nom) => balise?.match(new RegExp(`${nom}="([^"]*)"`))?.[1] ?? null;

function analyser(html) {
  const titre = decoder(entre(html, "<title>", "</title>"));
  const description = decoder(
    attribut(html.match(/<meta name="description"[^>]*>/)?.[0], "content"),
  );
  const robots = attribut(html.match(/<meta name="robots"[^>]*>/)?.[0], "content");
  const canonical = attribut(
    html.match(/<link rel="canonical"[^>]*>/)?.[0],
    "href",
  );
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  const h2 = [...html.matchAll(/<h2[^>]*>/g)].length;
  const hreflang = [...html.matchAll(/hrefLang="([^"]+)"/gi)].map((m) => m[1]);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = jsonLd.flatMap((m) => {
    try {
      const donnees = JSON.parse(m[1]);
      const graphe = donnees["@graph"] ?? [donnees];
      return graphe.map((n) => n["@type"]).filter(Boolean);
    } catch {
      return [];
    }
  });

  // Texte du <main>, sans scripts ni styles : c'est le contenu réel de la page.
  const main = entre(html, "<main", "</main>") ?? "";
  const texte = main
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const liens = [...main.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  const tousLiens = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);
  const images = [...html.matchAll(/<img[^>]*>/g)];
  const imagesSansAlt = images.filter((m) => !/alt="[^"]+"/.test(m[0])).length;

  return {
    titre,
    description,
    robots,
    canonical,
    h1,
    h2,
    hreflang,
    typesJsonLd: types,
    mots: texte.split(" ").filter(Boolean).length,
    liensInternes: [...new Set(liens)],
    tousLiens: [...new Set(tousLiens)],
    images: images.length,
    imagesSansAlt,
    poids: Buffer.byteLength(html, "utf8"),
  };
}

const urls = await urlsDuSitemap();
// Les pages du tunnel ne sont pas au sitemap (noindex voulu) : on les mesure quand même.
const supplementaires = ["/booking/", "/booking/confirmed/"];
const aCrawler = [...urls, ...supplementaires];

const pages = [];
const lot = 12;
for (let i = 0; i < aCrawler.length; i += lot) {
  const groupe = aCrawler.slice(i, i + lot);
  const resultats = await Promise.all(
    groupe.map(async (url) => {
      const reponse = await fetch(`${BASE}${url}`);
      const html = await reponse.text();
      return { url, statut: reponse.status, ...analyser(html) };
    }),
  );
  pages.push(...resultats);
}

const indexables = pages.filter((p) => !/noindex/i.test(p.robots ?? ""));
const typePage = (url) => {
  if (url === "/" || url === "/fr/") return "accueil";
  if (url.startsWith("/blog") || url.startsWith("/fr/blog")) return "blog";
  if (url.startsWith("/fr/transferts-ski/")) return url.split("/").filter(Boolean).length === 3 ? "station-fr" : "trajet-fr";
  const seg = url.split("/").filter(Boolean);
  if (seg.length === 1 && seg[0].endsWith("-ski-transfers")) return "hub-pays";
  if (seg.length === 2 && seg[1].endsWith("-airport")) return "hub-aeroport";
  if (seg.length === 2) return "station";
  if (seg.length === 3) return "trajet";
  return "fonctionnelle";
};

const parType = {};
for (const p of pages) {
  const t = typePage(p.url);
  (parType[t] ??= []).push(p);
}

const titresApres = new Map();
for (const p of indexables) {
  const t = (p.titre ?? "").trim().toLowerCase();
  if (!t) continue;
  titresApres.set(t, (titresApres.get(t) ?? 0) + 1);
}

const cible = new Set(pages.map((p) => p.url.replace(/\/$/, "")));
const liees = new Set();
for (const p of pages) for (const l of p.tousLiens) liees.add(l.replace(/\/$/, ""));
const orphelines = [...cible].filter((u) => u !== "" && !liees.has(u));

const apres = {
  urls: pages.length,
  indexables: indexables.length,
  noindex: pages.length - indexables.length,
  erreurs: pages.filter((p) => p.statut !== 200).length,
  sansTitre: pages.filter((p) => !p.titre).length,
  sansDescription: pages.filter((p) => !p.description).length,
  titresTropLongs: pages.filter((p) => (p.titre?.length ?? 0) > MAX_TITRE).length,
  descriptionsTropLongues: pages.filter((p) => (p.description?.length ?? 0) > MAX_DESCRIPTION).length,
  titresDupliques: [...titresApres.values()].filter((n) => n > 1).length,
  sansH1: pages.filter((p) => p.h1.length === 0).length,
  h1Multiples: pages.filter((p) => p.h1.length > 1).length,
  sansCanonical: pages.filter((p) => !p.canonical).length,
  avecHreflang: pages.filter((p) => p.hreflang.length > 0).length,
  avecJsonLd: pages.filter((p) => p.typesJsonLd.length > 0).length,
  imagesSansAlt: pages.reduce((s, p) => s + p.imagesSansAlt, 0),
  mots: pages.reduce((s, p) => s + p.mots, 0),
  motsMoyens: Math.round(pages.reduce((s, p) => s + p.mots, 0) / Math.max(1, pages.length)),
  pagesMaigres: indexables.filter((p) => p.mots < 300).length,
  liensMoyens: Math.round(
    pages.reduce((s, p) => s + p.liensInternes.length, 0) / Math.max(1, pages.length),
  ),
  orphelines: orphelines.length,
  poidsMoyen: Math.round(pages.reduce((s, p) => s + p.poids, 0) / Math.max(1, pages.length) / 1024),
};

/* ------------------------------------------------------------------ sortie */

const ligne = (libelle, a, b, sens = "bas") => {
  const mieux = sens === "bas" ? Number(b) <= Number(a) : Number(b) >= Number(a);
  const marque = a === b ? "=" : mieux ? "✓" : "✗";
  console.log(
    `  ${libelle.padEnd(38)} ${String(a).padStart(9)} ${String(b).padStart(9)}   ${marque}`,
  );
};

console.log(`\n  AUDIT SEO — WordPress actuel contre site refait`);
console.log(`  ${"─".repeat(72)}`);
console.log(`  ${"".padEnd(38)} ${"avant".padStart(9)} ${"après".padStart(9)}`);
console.log(`  ${"─".repeat(72)}`);
console.log(`  COUVERTURE`);
ligne("URL publiées", avant.urls, apres.urls, "haut");
ligne("Pages indexables", avant.urls - avant.noindex, apres.indexables, "haut");
ligne("Pages en noindex", avant.noindex, apres.noindex, "haut");
ligne("Erreurs HTTP au crawl", "n/d", apres.erreurs);
console.log(`  MÉTADONNÉES`);
ligne("Sans title", avant.sansTitre, apres.sansTitre);
ligne("Sans meta description", avant.sansDescription, apres.sansDescription);
ligne(`Titles > ${MAX_TITRE} caractères`, avant.titresTropLongs, apres.titresTropLongs);
ligne(`Descriptions > ${MAX_DESCRIPTION}`, avant.descriptionsTropLongues, apres.descriptionsTropLongues);
ligne("Titles dupliqués", avant.titresDupliques, apres.titresDupliques);
console.log(`  STRUCTURE`);
ligne("Pages sans H1", "n/d", apres.sansH1);
ligne("Pages à plusieurs H1", "≥ 91", apres.h1Multiples);
ligne("Pages sans canonical", "n/d", apres.sansCanonical);
console.log(`  CONTENU`);
ligne("Mots au total", avant.mots, apres.mots, "haut");
ligne("Mots par page", avant.motsMoyens, apres.motsMoyens, "haut");
ligne("Pages de moins de 300 mots", avant.pagesMaigres, apres.pagesMaigres);
console.log(`  MAILLAGE ET TECHNIQUE`);
ligne("Liens internes par page", "n/d", apres.liensMoyens, "haut");
ligne("Pages orphelines", "n/d", apres.orphelines);
ligne("Pages avec données structurées", "0", apres.avecJsonLd, "haut");
ligne("Pages avec hreflang", 0, apres.avecHreflang, "haut");
ligne("Images sans alt", "n/d", apres.imagesSansAlt);
ligne("Poids HTML moyen (Ko)", "n/d", apres.poidsMoyen);
console.log(`  ${"─".repeat(72)}`);
console.log(`  Silos de l'ancien site : ${Object.entries(avant.silos).map(([k, v]) => `${k} ${v}`).join(", ")}`);
console.log(`  Types de pages du nouveau : ${Object.entries(parType).map(([k, v]) => `${k} ${v.length}`).join(", ")}`);
console.log();

if (sortieJson) {
  await writeFile(
    sortieJson,
    JSON.stringify({ avant, apres, parType: Object.fromEntries(Object.entries(parType).map(([k, v]) => [k, v.length])), pages }, null, 2),
    "utf8",
  );
  console.log(`  Détail écrit dans ${sortieJson}\n`);
}
