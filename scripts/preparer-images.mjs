/**
 * Prépare les images du site depuis le dossier `pHOTOS/` du projet.
 *
 * L'ancien site sert des JPEG pleine taille : le budget page dépasse 3 Mo. Ici,
 * chaque image est redimensionnée à la largeur où elle est réellement affichée
 * puis encodée en WebP et en AVIF. Le nom de fichier reste explicite — c'est
 * aussi un signal SEO.
 *
 * Usage : npm run images:preparer
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RACINE = process.cwd();
const SOURCE = path.join(RACINE, "..", "pHOTOS");
const SORTIE = path.join(RACINE, "public", "images");

/**
 * Ce que le site utilise, et à quelle largeur. Une image de fond de section n'a
 * pas besoin des mêmes pixels qu'une vignette de carte.
 */
const IMAGES = [
  // Le hero est l'image LCP : c'est la seule que le visiteur attend, elle doit
  // rester sous les 200 Ko du budget page.
  { source: "alps-ski-transfers.jpg", nom: "hero-alps-ski-transfers", largeur: 1600, qualite: 68 },
  /*
   * Le bandeau de présentation occupe la moitié gauche de l'écran, à fond
   * perdu : sur un écran large, cette image est affichée à près de 1 000 px de
   * côté, d'où sa largeur. La route en lacets reprend le propos de la section
   * de l'ancien site — c'est le trajet, pas la station, qu'elle raconte.
   */
  {
    source: "ski-transfer-from-airport-to-alpine-peaks.jpg",
    nom: "route-alpine",
    largeur: 1400,
    // Une photo de nuit, très détaillée : sans baisser la qualité elle dépasse
    // seule le budget de 200 Ko fixé pour une image de page.
    qualite: 68,
  },
  { source: "alps-ski-resorts-transfer.jpg", nom: "station-alpes", largeur: 1200 },
  /*
   * Les trois catégories de véhicule, **rognées**.
   *
   * Les trois fichiers sources sont des détourages, mais avec des marges vides
   * très différentes : la berline touche presque le bord, les deux vans flottent
   * au milieu de leur cadre. Affichées côte à côte, les voitures paraissaient
   * alors de tailles différentes alors qu'elles occupent le même cadre. Rogner
   * le vide rend les trois comparables — ce qui est le propos de la section.
   */
  { source: "volkswagen-caravelle-noir.png", nom: "vehicule-standard", largeur: 640, rogner: true },
  { source: "mercedes-classe-v-transfer.png", nom: "vehicule-business", largeur: 640, rogner: true },
  { source: "mercedes-classe-e.jpg", nom: "vehicule-premium", largeur: 640, rogner: true },
  // Les trois familles d'aéroports mises en avant.
  { source: "lyon-airport.jpg", nom: "aeroport-lyon-grenoble-chambery", largeur: 800 },
  { source: "geneve-airport.jpg", nom: "aeroport-geneve", largeur: 800 },
  { source: "alps-ski-transfers-from-paris.jpg", nom: "aeroport-paris-milan-turin", largeur: 800 },
  { source: "frequently-asked-questions-alps-ski-transfers.jpg", nom: "faq", largeur: 800 },
  /*
   * L'illustration de l'introduction de `/book-ski-transfer-tickets/`. Elle
   * occupe une colonne d'environ 500 px sur écran large, jamais la pleine
   * largeur : 1 000 px suffisent pour la servir nette en écran dense.
   */
  {
    source: "popular-alps-ski-transfer.jpg",
    nom: "popular-alps-ski-transfer",
    largeur: 1000,
  },
  /* Le bandeau de `/private-airport-transfers-to-alps-ski-resort/`, à fond perdu. */
  {
    source: "private-airport-ski-transfer.jpg",
    nom: "transfert-prive",
    largeur: 1400,
    qualite: 68,
  },
  /* L'illustration de son introduction, en colonne. */
  {
    source: "private-ski-transfers.jpg",
    nom: "transfert-prive-detail",
    largeur: 1000,
  },
  /* L'illustration de l'introduction de l'index des destinations. */
  {
    source: "ski-resort-transfers.jpg",
    nom: "stations-index",
    largeur: 1000,
  },
  /*
   * Route enneigée et pneu hiver, pour la page des groupes. Le visuel que le
   * WordPress y employait — une limousine Hummer de mariage immatriculée en
   * Russie — ne montrait rien de la flotte réelle : une photo qui ment sur le
   * service vaut moins que pas de photo du tout.
   */
  {
    source: "compare-ski-transfers.jpg",
    nom: "route-hiver",
    largeur: 1000,
  },
  /*
   * Un visuel par hub pays, à droite de son introduction. Chaque pays a le sien :
   * illustrer la France avec une photo autrichienne serait le genre de mensonge
   * visuel que le registre des stations s'interdit déjà.
   */
  { source: "french-ski-resort.jpg", nom: "pays-france", largeur: 1000 },
  { source: "swiss-ski-resorts.jpg", nom: "pays-switzerland", largeur: 1000 },
  { source: "italy-ski-resorts.jpg", nom: "pays-italy", largeur: 1000 },
  { source: "austria-ski-resorts.jpg", nom: "pays-austria", largeur: 1000 },
];

/**
 * Les visuels par station, rangés par pays dans `pHOTOS/Ski destinations/`.
 *
 * Trente-six des soixante-huit stations en ont un. Les autres gardent le visuel
 * générique : une photo de montagne quelconque sur une page de station vaut mieux
 * qu'une photo d'une autre station, qui serait un mensonge visuel.
 *
 * Le nom de sortie suit le slug du registre — `station-val-thorens` — pour que la
 * page de station trouve son image sans table de correspondance.
 */
const VISUELS_STATIONS = {
  FRANCE: {
    "alpe-dhuez": "alpe-duez-ski-transfer.jpg",
    avoriaz: "avoriaz-ski-transfer.jpg",
    chamonix: "chamonix-ski-transfer.jpg",
    courchevel: "courchevel-ski-transfer.jpg",
    "la-plagne": "la-plagne-ski-transfer.jpg",
    "les-arcs": "les-arcs-ski-transfer.jpg",
    "les-deux-alpes": "les-deux-alpes-ski-transfer.jpg",
    meribel: "meribel-ski-transfer.jpg",
    morzine: "morzine-ski-transfer.jpg",
    tignes: "tignes-ski-transfer.jpg",
    "val-disere": "val-disere-ski-transfer.jpg",
    "val-thorens": "val-thorens-ski-transfer.jpg",
  },
  ITALY: {
    cervinia: "cervinia-ski-transfer.jpg",
    cortina: "cortina-ski-transfer.jpg",
    courmayeur: "courmayeur-ski-transfer.jpg",
    "la-thuile": "la-thuile-ski-transfer.jpg",
    livigno: "livigno-ski-transfer.jpg",
    "sauze-doulx": "sauze-d-oulx-ski-transfer.jpg",
    "selva-val-gardena": "selva-val-gardena-ski-transfer.jpg",
    sestriere: "sestriere-ski-transfer.jpg",
  },
  SWISS: {
    andermatt: "andermatt-ski-transfer.jpg",
    davos: "davos-ski-transfer.jpg",
    grindelwald: "grindelwald-ski-transfer.jpg",
    gstaad: "gstaad-ski-transfer.jpg",
    "st-moritz": "st-moritz-ski-transfer.jpg",
    tasch: "tasch-ski-transfer.jpg",
    verbier: "verbier-ski-transfer.jpg",
    "villars-sur-ollon": "villars-sur-ollon-ski-transfer.jpg",
  },
};

/** Les stations autrichiennes sont à la racine de `Ski destinations/`. */
const VISUELS_AUTRICHE = {
  ischgl: "ski-transfers-airport-Ischgl.jpg",
  kitzbuhel: "ski-transfers-airport-Kitzb\u00fchel.jpg",
  mayrhofen: "ski-transfers-airport-Mayrhofen.jpg",
  obergurgl: "ski-transfers-airport-Obergurgl.jpg",
  serfaus: "ski-transfers-airport-Serfaus.jpg",
  "st-anton-am-arlberg": "ski-transfers-airport-St-Anton-am-Arlberg.jpg",
  solden: "ski-transfers-airport-S\u00f6lden.jpg",
  "zell-am-see": "ski-transfers-airport-Zell-am-See.jpg",
};

/** Les aéroports qui ont leur propre photo, plutôt qu'une image de famille. */
const VISUELS_AEROPORTS = {
  "geneva-airport": "geneve-airport.jpg",
  "lyon-airport": "lyon-airport.jpg",
  "chambery-savoie-airport": "alps-ski-transfers-from-chambery.jpg",
  "grenoble-isere-airport": "alps-ski-transfers-from-grenoble.jpg",
  "turin-airport": "alps-ski-transfers-from-torino.jpg",
  "zurich-airport": "alps-ski-transfers-from-zurich.jpg",
  "salzburg-airport": "alps-ski-transfers-from-salzburg.jpg",
  "milan-malpensa-airport": "alps-ski-transfers-from-milano.jpg",
  "nice-airport": "alps-ski-transfers-from-nice.jpg",
  "paris-charles-de-gaulle-airport": "alps-ski-transfers-from-paris.jpg",
};

const DESTINATIONS = path.join(SOURCE, "Ski destinations");

// Les visuels de station et d'aéroport rejoignent la liste principale : même
// traitement, même budget de poids, mêmes dimensions écrites au JSON.
for (const [dossier, stations] of Object.entries(VISUELS_STATIONS)) {
  for (const [slug, fichier] of Object.entries(stations)) {
    IMAGES.push({
      source: path.join("Ski destinations", dossier, fichier),
      nom: `station-${slug}`,
      largeur: 1200,
    });
  }
}
for (const [slug, fichier] of Object.entries(VISUELS_AUTRICHE)) {
  IMAGES.push({
    source: path.join("Ski destinations", fichier),
    nom: `station-${slug}`,
    largeur: 1200,
  });
}
for (const [slug, fichier] of Object.entries(VISUELS_AEROPORTS)) {
  IMAGES.push({ source: fichier, nom: `aeroport-${slug}`, largeur: 1200 });
}
void DESTINATIONS;

await mkdir(SORTIE, { recursive: true });

const manquantes = [];
const produites = [];

/** Les sources vivent maintenant dans des sous-dossiers : on teste le fichier. */
async function existe(chemin) {
  try {
    await stat(chemin);
    return true;
  } catch {
    return false;
  }
}

for (const image of IMAGES) {
  const entreePossible = path.join(SOURCE, image.source);
  if (!(await existe(entreePossible))) {
    manquantes.push(image.source);
    continue;
  }
  const entree = path.join(SOURCE, image.source);
  /*
   * `trim` retire la bordure uniforme en partant de la couleur du coin
   * supérieur gauche : le blanc d'un JPEG détouré comme la transparence d'un
   * PNG. Le seuil laisse passer les compressions un peu sales — un blanc à
   * 253 reste du blanc.
   */
  const source = image.rogner ? sharp(entree).trim({ threshold: 12 }) : sharp(entree);
  const base = source.resize({ width: image.largeur, withoutEnlargement: true });

  const webp = path.join(SORTIE, `${image.nom}.webp`);
  const avif = path.join(SORTIE, `${image.nom}.avif`);
  await base.clone().webp({ quality: image.qualite ?? 78 }).toFile(webp);
  await base.clone().avif({ quality: image.qualite ? image.qualite - 15 : 55 }).toFile(avif);

  const { width, height } = await sharp(webp).metadata();
  const poids = (await stat(webp)).size;
  produites.push({ nom: image.nom, width, height, poids });
}

// Les dimensions sont écrites à côté des images : `next/image` en a besoin pour
// réserver la place et éviter le décalage de mise en page (CLS).
await writeFile(
  path.join(SORTIE, "dimensions.json"),
  JSON.stringify(
    Object.fromEntries(produites.map((p) => [p.nom, { width: p.width, height: p.height }])),
    null,
    2,
  ),
  "utf8",
);

console.log(`\n  ${produites.length} images préparées en WebP et AVIF :`);
for (const p of produites) {
  console.log(
    `    ${p.nom.padEnd(34)} ${String(p.width).padStart(4)}×${String(p.height).padEnd(4)} ${(p.poids / 1024).toFixed(0)} Ko`,
  );
}
if (manquantes.length > 0) {
  console.log(`\n  ${manquantes.length} sources introuvables : ${manquantes.join(", ")}`);
}
const lourdes = produites.filter((p) => p.poids > 200 * 1024);
if (lourdes.length > 0) {
  console.log(`  ${lourdes.length} dépassent 200 Ko : ${lourdes.map((p) => p.nom).join(", ")}`);
}
console.log();
