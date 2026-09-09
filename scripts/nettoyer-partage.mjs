/**
 * Applique la table de `_sans-partage.mjs` aux modules déjà générés.
 *
 * Le script ne devine rien : il substitue les fragments exacts de la table,
 * retire les textes qui ne parlent que du partagé, puis **liste ce qu'il n'a pas
 * su traiter**. Ces restes se corrigent à la main — c'est la leçon de la
 * première tentative, qui réécrivait par motifs et produisait des phrases
 * fausses, du type « transfert privé à horaires fixes avec arrêts multiples ».
 *
 * Usage :
 *   node scripts/nettoyer-partage.mjs           — écrit, puis liste les restes
 *   node scripts/nettoyer-partage.mjs --essai   — n'écrit rien
 *   node scripts/nettoyer-partage.mjs --restes  — liste seulement, sans écrire
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { estItemPartage, sansPartage, sansSegmentsPartage } from "./_sans-partage.mjs";

const RACINE = process.cwd();
const DOSSIERS = ["src/lib/resorts", "src/lib/transfers", "src/lib/pages", "src/lib/articles"];
const args = process.argv.slice(2);
const essai = args.includes("--essai") || args.includes("--restes");
const listerRestes = args.includes("--restes") || !essai;

/**
 * Les chaînes littérales d'un module.
 *
 * L'analyse est volontairement littérale — on suit les guillemets doubles en
 * tenant compte des échappements. Un vrai parseur serait plus juste, mais ces
 * modules sont produits par un script : ni gabarits, ni concaténations.
 */
function chaines(source) {
  const trouvees = [];
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] !== '"') continue;
    let j = i + 1;
    while (j < source.length) {
      if (source[j] === "\\") {
        j += 2;
        continue;
      }
      if (source[j] === '"') break;
      j += 1;
    }
    trouvees.push({ texte: source.slice(i + 1, j) });
    i = j;
  }
  return trouvees;
}

/**
 * Supprime les blocs que le retrait a vidés.
 *
 * `{ type: "titre3", texte:  },` est du TypeScript invalide. Quand le texte d'un
 * bloc était entièrement consacré au partagé — un titre « Shared Ski Transfers »,
 * un paragraphe de tarifs par personne — c'est le bloc entier qui doit partir,
 * pas seulement sa chaîne.
 */
function retirerBlocsVides(source) {
  const ligneVide = (motif) => new RegExp("^[ \\t]*" + motif + ",?\\r?\\n", "gm");
  return source
    .replace(ligneVide('\\{ type: "(?:paragraphe|titre2|titre3)", texte:\\s*\\}'), "")
    .replace(ligneVide('\\{ type: "liste", items: \\[\\s*\\] \\}'), "")
    .replace(ligneVide('\\{ question: "[^"]*", reponse:\\s*\\}'), "")
    .replace(/items: \[, /g, "items: [")
    .replace(/, \] \}/g, "] }");
}

let fichiersTouches = 0;
let substitutions = 0;
const restes = [];

for (const dossier of DOSSIERS) {
  for (const nom of await readdir(path.join(RACINE, dossier))) {
    if (!nom.endsWith(".ts") || nom === "types.ts" || nom.endsWith(".test.ts")) continue;
    const fichier = path.join(RACINE, dossier, nom);
    const avant = await readFile(fichier, "utf8");
    if (!/shared/i.test(avant)) continue;

    let apres = avant;
    let n = 0;
    for (const { texte } of chaines(avant)) {
      if (!/shared/i.test(texte)) continue;

      /*
       * Un texte entièrement consacré au partagé disparaît avec sa virgule : il
       * n'y a rien à y sauver, et son prix par personne n'a jamais été validé.
       * La forme avec virgule passe d'abord, pour ne pas laisser de séparateur
       * orphelin dans le tableau ; `retirerBlocsVides` s'occupe ensuite des
       * blocs dont c'était l'unique contenu.
       */
      if (estItemPartage(texte)) {
        const avantRetrait = apres;
        apres = apres
          .split(`, "${texte}"`)
          .join("")
          .split(`"${texte}", `)
          .join("")
          .split(`"${texte}"`)
          .join("");
        if (apres !== avantRetrait) n += 1;
        continue;
      }

      // D'abord les segments à puce internes, puis la table sur ce qui reste.
      const propre = sansPartage(sansSegmentsPartage(texte));
      if (propre !== texte) {
        apres = apres.split(texte).join(propre);
        n += 1;
      }
    }

    apres = retirerBlocsVides(apres);

    if (apres !== avant) {
      fichiersTouches += 1;
      substitutions += n;
      if (!essai) await writeFile(fichier, apres, "utf8");
    }

    // Ce qui subsiste : à juger à la main.
    for (const { texte } of chaines(apres)) {
      if (/shared/i.test(texte)) restes.push({ fichier: `${dossier}/${nom}`, texte });
    }
  }
}

console.log(
  `[partage] ${fichiersTouches} fichiers · ${substitutions} substitutions${essai ? " (essai)" : ""}`,
);

if (listerRestes) {
  const parFichier = new Map();
  for (const r of restes) {
    if (!parFichier.has(r.fichier)) parFichier.set(r.fichier, []);
    parFichier.get(r.fichier).push(r.texte);
  }
  console.log(`\n[partage] ${restes.length} chaînes à juger, dans ${parFichier.size} fichiers :\n`);
  for (const [fichier, textes] of parFichier) {
    console.log(`--- ${fichier}`);
    for (const t of textes) console.log(`    ${t}`);
  }
}
