/**
 * Prépare le logo et les icônes du site depuis le dossier `Logo/` du projet.
 *
 * Le logo livré est un aplat sur fond blanc cassé, avec de larges marges. Ce
 * script en tire ce dont le site a besoin, et rien de plus :
 *
 * - `public/logo-alpsskitransfers.png` — l'en-tête, sur fond clair. Détouré,
 *   rogné au contenu, servi au double de sa taille d'affichage pour rester net
 *   sur un écran à haute densité.
 * - `public/logo-alpsskitransfers-blanc.png` — le pied de page et tout fond
 *   sombre. Le lettrage bleu nuit y serait invisible : il est reblanchi, l'or
 *   de la route et de « TRANSFERS » est conservé.
 * - `src/app/icon.png` et `src/app/apple-icon.png` — le favicon, que Next sert
 *   automatiquement depuis ces deux noms. Il ne reprend que le monogramme —
 *   la montagne et la route — car un lettrage complet dans un carré de 32 px
 *   n'est plus qu'une tache.
 *
 * Le PNG est conservé plutôt que converti en AVIF : un logo plat à
 * transparence, de petite taille, ne gagne rien au changement de format et
 * perdrait en netteté sur les bords du lettrage.
 *
 * Usage : npm run logo:preparer
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RACINE = process.cwd();
const SOURCE = path.join(RACINE, "..", "Logo", "logo-alpsskitransfers-2026.png");
const PUBLIC = path.join(RACINE, "public");
const APP = path.join(RACINE, "src", "app");

/** Hauteur d'affichage dans l'en-tête, en pixels CSS. Le fichier fait le double. */
const HAUTEUR_ENTETE = 46;

/**
 * Détoure le fond blanc en transparence.
 *
 * Un seuil net laisserait un liseré blanc autour des lettres : l'aplat est
 * anticrénelé, ses bords sont des gris clairs. L'opacité suit donc une rampe
 * sur la luminance — noir opaque, blanc transparent, et le dégradé entre les
 * deux — ce qui redonne exactement le lissage d'origine.
 */
function detourer(données, largeur, hauteur) {
  const sortie = Buffer.from(données);
  for (let i = 0; i < largeur * hauteur * 4; i += 4) {
    const luminance = 0.299 * sortie[i] + 0.587 * sortie[i + 1] + 0.114 * sortie[i + 2];
    if (luminance >= 248) sortie[i + 3] = 0;
    else if (luminance > 208) sortie[i + 3] = Math.round(((248 - luminance) / 40) * 255);
  }
  return sortie;
}

/** Un pixel de l'or du logo — la route, et le mot « TRANSFERS ». */
const estOr = (r, g, b) => r > b + 25 && r > 120;

/** Reblanchit le bleu nuit sans toucher à l'or. */
function blanchirLeBleu(données, largeur, hauteur) {
  const sortie = Buffer.from(données);
  for (let i = 0; i < largeur * hauteur * 4; i += 4) {
    if (sortie[i + 3] < 8) continue;
    if (estOr(sortie[i], sortie[i + 1], sortie[i + 2])) continue;
    sortie[i] = 255;
    sortie[i + 1] = 255;
    sortie[i + 2] = 255;
  }
  return sortie;
}

/**
 * Où finit le monogramme.
 *
 * Entre la montagne et le lettrage il y a une bande entièrement transparente ;
 * la première assez large est la coupure. La mesurer vaut mieux que de la
 * deviner en pourcentage : le jour où le logo est retouché, le calcul suit.
 */
function finDuMonogramme(données, largeur, hauteur) {
  const vide = (x) => {
    for (let y = 0; y < hauteur; y++) if (données[(y * largeur + x) * 4 + 3] > 24) return false;
    return true;
  };
  let debutContenu = 0;
  while (debutContenu < largeur && vide(debutContenu)) debutContenu++;

  const minimum = Math.round(largeur * 0.015);
  let x = debutContenu;
  while (x < largeur) {
    if (!vide(x)) { x++; continue; }
    let fin = x;
    while (fin < largeur && vide(fin)) fin++;
    if (fin - x >= minimum) return { debut: debutContenu, fin: x };
    x = fin;
  }
  return { debut: debutContenu, fin: largeur };
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });

  // 1. Rognage des marges, mise à l'échelle, détourage.
  const rogne = sharp(SOURCE).trim({ threshold: 10 });
  const { data, info } = await rogne
    .clone()
    .resize({ height: HAUTEUR_ENTETE * 2, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const detoure = detourer(data, width, height);
  const brut = { raw: { width, height, channels: 4 } };

  await sharp(detoure, brut)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "logo-alpsskitransfers.png"));

  await sharp(blanchirLeBleu(detoure, width, height), brut)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "logo-alpsskitransfers-blanc.png"));

  // 2. Le monogramme, en pleine résolution, pour les icônes.
  const grand = await rogne
    .clone()
    .resize({ height: 512, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const gd = detourer(grand.data, grand.info.width, grand.info.height);
  const { debut, fin } = finDuMonogramme(gd, grand.info.width, grand.info.height);
  const monogramme = sharp(gd, {
    raw: { width: grand.info.width, height: grand.info.height, channels: 4 },
  }).extract({ left: debut, top: 0, width: fin - debut, height: grand.info.height });

  const carre = await monogramme.clone().trim({ threshold: 1 }).png().toBuffer();

  await sharp(carre)
    .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP, "icon.png"));

  // L'icône iOS n'accepte pas la transparence : elle serait rendue en noir.
  await sharp(carre)
    .resize(150, 150, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .flatten({ background: "#FFFFFF" })
    .extend({ top: 25, bottom: 25, left: 25, right: 25, background: "#FFFFFF" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(APP, "apple-icon.png"));

  await writeFile(
    path.join(PUBLIC, "logo-dimensions.json"),
    JSON.stringify({ largeur: width, hauteur: height, hauteurAffichee: HAUTEUR_ENTETE }, null, 2) + "\n",
    "utf8",
  );

  console.log(
    `[logo] ${width}×${height} px — monogramme découpé de ${debut} à ${fin} sur ${grand.info.width}.`,
  );
}

main().catch((erreur) => {
  console.error(erreur);
  process.exit(1);
});
