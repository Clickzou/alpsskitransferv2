/**
 * Prépare le logo et les icônes du site depuis le dossier `Logo/` du projet.
 *
 * Trois sorties, pour trois usages :
 *
 * - `public/logo-alps-ski-transfers.png` — l'en-tête, sur fond blanc. Servi au
 *   double de sa taille d'affichage pour rester net sur un écran à haute densité.
 * - `public/logo-alps-ski-transfers-blanc.png` — le pied de page et tout fond
 *   sombre. Le lettrage d'origine est bleu nuit : il disparaît sur le bleu nuit
 *   du footer. Seul le lettrage est reblanchi, le pictogramme garde son vert.
 * - `src/app/icon.png` et `src/app/apple-icon.png` — le favicon, que Next sert
 *   automatiquement depuis ces deux noms de fichier. Le site n'en avait aucun.
 *
 * Le PNG est conservé tel quel plutôt que converti en AVIF : un logo à
 * transparence, plat et de petite taille, ne gagne rien au changement de format
 * et perdrait en netteté sur les bords du lettrage.
 *
 * Usage : npm run logo:preparer
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RACINE = process.cwd();
const SOURCE = path.join(RACINE, "..", "Logo");
const PUBLIC = path.join(RACINE, "public");
const APP = path.join(RACINE, "src", "app");

/** Hauteur d'affichage dans l'en-tête, en pixels CSS. Le fichier fait le double. */
const HAUTEUR_ENTETE = 44;

/**
 * Reblanchit le lettrage sans toucher au pictogramme.
 *
 * Le bleu nuit du lettrage (#0F2038 environ) et le vert du pictogramme sont
 * suffisamment éloignés pour être séparés par un simple seuil : tout pixel
 * opaque dont le vert domine peu et qui est sombre devient blanc.
 */
function blanchirLettrage(données, largeur, hauteur) {
  const sortie = Buffer.from(données);
  for (let i = 0; i < largeur * hauteur * 4; i += 4) {
    const [r, v, b, a] = [sortie[i], sortie[i + 1], sortie[i + 2], sortie[i + 3]];
    if (a < 8) continue;
    const vert = v > r + 30 && v > b + 30;
    if (!vert && r + v + b < 300) {
      sortie[i] = 255;
      sortie[i + 1] = 255;
      sortie[i + 2] = 255;
    }
  }
  return sortie;
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });

  const source = path.join(SOURCE, "logo-alps-ski-transfers.png");
  const base = sharp(source).resize({ height: HAUTEUR_ENTETE * 2, withoutEnlargement: true });
  const { width, height } = await base.clone().png().toBuffer({ resolveWithObject: true }).then((r) => r.info);

  // 1. Le logo de l'en-tête.
  await base.clone().png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, "logo-alps-ski-transfers.png"));

  // 2. La variante claire, pour les fonds sombres.
  const brut = await base.clone().ensureAlpha().raw().toBuffer();
  await sharp(blanchirLettrage(brut, width, height), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "logo-alps-ski-transfers-blanc.png"));

  // 3. Les icônes. Next les sert depuis `src/app/icon.png` et `apple-icon.png`.
  const icone = path.join(SOURCE, "favicon-alps-ski-transfers.png");
  await sharp(icone).resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP, "icon.png"));
  // L'icône iOS n'accepte pas la transparence : elle serait rendue en noir.
  await sharp(icone)
    .resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: "#FFFFFF" })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: "#FFFFFF" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP, "apple-icon.png"));

  // 4. Les dimensions, pour que l'en-tête réserve la place et n'induise pas de
  //    décalage de mise en page au chargement.
  await writeFile(
    path.join(PUBLIC, "logo-dimensions.json"),
    JSON.stringify({ largeur: width, hauteur: height, hauteurAffichee: HAUTEUR_ENTETE }, null, 2) + "\n",
    "utf8",
  );

  console.log(`[logo] ${width}×${height} px — en-tête, variante claire, icône et icône iOS écrites.`);
}

main().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
