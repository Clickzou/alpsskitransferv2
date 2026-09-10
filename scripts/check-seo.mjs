/**
 * Contrôles SEO de prebuild — le build échoue si une règle est violée.
 *
 * Chacune de ces règles correspond à un défaut réellement constaté sur le
 * WordPress actuel lors de l'audit du 4 septembre 2026 : titles trop longs,
 * double H1 sur les pages /destination/, pages du tunnel de commande en
 * `index, follow`, hreflang absents alors que quatre langues sont annoncées.
 *
 * Usage : npm run seo:check
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const APP = path.join(RACINE, "src", "app");
const LIB = path.join(RACINE, "src", "lib");

const MAX_TITRE = 60;
const MAX_DESCRIPTION = 155;

const erreurs = [];
const avertissements = [];

async function fichiers(dossier, filtre, acc = []) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) await fichiers(chemin, filtre, acc);
    else if (filtre(entree.name)) acc.push(chemin);
  }
  return acc;
}

const relatif = (p) => path.relative(RACINE, p).replace(/\\/g, "/");

// --- 1. Longueur des metaTitre / metaDescription des registres ---------------
for (const fichier of await fichiers(LIB, (n) => n.endsWith(".ts"))) {
  const source = await readFile(fichier, "utf8");

  for (const m of source.matchAll(/metaTitre:\s*\n?\s*"([^"]+)"/g)) {
    if (m[1].length > MAX_TITRE) {
      erreurs.push(`${relatif(fichier)} — title de ${m[1].length}/${MAX_TITRE} : « ${m[1]} »`);
    }
  }
  for (const m of source.matchAll(/metaDescription:\s*\n?\s*"([^"]+)"/g)) {
    if (m[1].length > MAX_DESCRIPTION) {
      erreurs.push(
        `${relatif(fichier)} — description de ${m[1].length}/${MAX_DESCRIPTION}`,
      );
    }
  }
}

// --- 2. Un seul H1 par page --------------------------------------------------
/**
 * Le H1 peut vivre dans un composant dédié plutôt que dans le fichier de route :
 * une route qui sert deux types de page (station et hub d'aéroport) délègue à
 * deux composants d'un H1 chacun. On suit donc les composants importés avant de
 * conclure — sans quoi le contrôle refuserait une structure correcte.
 *
 * La descente est **récursive**. Elle ne l'était pas, et le contrôle ne voyait
 * donc rien au-delà du premier composant : le jour où la home traduite a délégué
 * son bandeau — donc son H1 — au composant `Hero`, les trois pages d'accueil ont
 * été déclarées sans H1 alors qu'elles en avaient un. Un contrôle bloquant qui
 * se trompe est pire qu'un contrôle absent : il pousse à contourner.
 */
async function compterH1(source, vus = new Set()) {
  let total = (source.match(/<h1[\s>]/g) ?? []).length;
  // Le chemin peut contenir des sous-dossiers : "@/components/accueil/Hero".
  const importes = [...source.matchAll(/from "@\/components\/([A-Za-z0-9/]+)"/g)].map((m) => m[1]);
  for (const nom of importes) {
    if (vus.has(nom)) continue;
    vus.add(nom);
    try {
      const composant = await readFile(
        path.join(RACINE, "src", "components", `${nom}.tsx`),
        "utf8",
      );
      total += await compterH1(composant, vus);
    } catch {
      // composant introuvable : ignoré, le typecheck s'en charge
    }
  }
  return total;
}

/*
 * L'état de l'indexation, à chaque build.
 *
 * Le défaut est « fermée » et c'est voulu — mais un défaut silencieux est un
 * piège le jour de la mise en ligne. Cette ligne est là pour qu'on ne
 * découvre pas trois semaines plus tard que le site en production est resté
 * invisible aux moteurs.
 */
const indexation = process.env.NEXT_PUBLIC_INDEXATION === "ouverte";
console.log(
  indexation
    ? "[seo] indexation OUVERTE — le site est explorable et indexable."
    : "[seo] indexation FERMÉE (préproduction) — robots.txt en Disallow, noindex sur toutes les pages. Poser NEXT_PUBLIC_INDEXATION=ouverte le jour de la bascule.",
);

const pages = await fichiers(APP, (n) => n === "page.tsx");
for (const page of pages) {
  const source = await readFile(page, "utf8");
  const h1 = await compterH1(source);
  if (h1 === 0) {
    erreurs.push(`${relatif(page)} — aucun H1.`);
  } else if (h1 > 1 && !/notFound\(\)/.test(source)) {
    // Une route qui aiguille entre plusieurs rendus (elle appelle notFound sur le
    // cas inconnu) porte légitimement plusieurs H1 dans ses composants.
    erreurs.push(`${relatif(page)} — ${h1} H1 (les pages /destination/ actuelles en ont deux).`);
  }

  // --- 3. Métadonnées obligatoires ------------------------------------------
  if (!/export const metadata|export async function generateMetadata/.test(source)) {
    erreurs.push(`${relatif(page)} — ni metadata ni generateMetadata.`);
  }
}

// --- 4. Contenu de remplissage encore en place -------------------------------
for (const fichier of [...pages, ...(await fichiers(LIB, (n) => n.endsWith(".ts")))]) {
  const source = await readFile(fichier, "utf8");
  const marqueurs = (source.match(/\[À REMPLACER/g) ?? []).length;
  if (marqueurs > 0) {
    avertissements.push(`${relatif(fichier)} — ${marqueurs} bloc(s) de contenu à reprendre.`);
  }
}

// --- 5. Données structurées : pas de champ vide ------------------------------
const site = await readFile(path.join(RACINE, "src", "data", "site.ts"), "utf8");
for (const champ of ["telephone", "email"]) {
  // Ancré en début de ligne : sans cela le contrôle se déclenchait sur le
  // `telephone: ""` cité dans le commentaire du fichier, et signalait vide un
  // champ qui ne l'était plus.
  if (new RegExp(`^\\s*${champ}:\\s*""`, "m").test(site)) {
    avertissements.push(
      `data/site.ts — ${champ} vide : le schéma TaxiService ne l'émettra pas (voulu tant que le client n'a pas répondu).`,
    );
  }
}

for (const a of avertissements) console.warn(`[seo] ${a}`);
for (const e of erreurs) console.error(`[seo] ERREUR ${e}`);

if (erreurs.length > 0) {
  console.error(`\n${erreurs.length} erreur(s) — build interrompu.`);
  process.exit(1);
}
console.log(`[seo] ${pages.length} pages contrôlées — OK.`);
