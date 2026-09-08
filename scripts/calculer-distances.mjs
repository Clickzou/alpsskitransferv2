/**
 * Calcule les distances routières aéroport → station, sans clé d'API.
 *
 * Deux services publics OpenStreetMap, tous deux gratuits et sans compte :
 *   · **Nominatim** géocode les 31 aéroports et 68 stations (une requête par lieu,
 *     une par seconde — c'est la règle d'usage du service).
 *   · **OSRM** calcule les distances routières réelles par matrice : une requête
 *     par aéroport vers toutes les stations, soit 31 requêtes pour ~2 100 paires.
 *
 * Le résultat est figé dans `src/data/distances.ts` : **le site n'appelle aucune
 * API au runtime**, il lit une table. Une clé Google Maps ne devient utile que le
 * jour où l'on veut du porte-à-porte à l'adresse près ; pour un tarif aéroport →
 * station, ceci suffit et ne coûte rien.
 *
 * Le fichier de cache `wp-export/coordonnees.json` évite de re-géocoder à chaque
 * exécution. Le supprimer force un nouveau géocodage.
 *
 * Usage : npm run distances:calculer
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RACINE = process.cwd();
const CACHE = path.join(RACINE, "wp-export", "coordonnees.json");
const AGENT = "clickzou-alpsskitransfers/1.0 (migration SEO, contact via clickzou.fr)";

const PAYS = { AT: "Austria", CH: "Switzerland", DE: "Germany", FR: "France", IT: "Italy" };
const CODES_PAYS = { AT: "at", CH: "ch", DE: "de", FR: "fr", IT: "it" };

/**
 * Boîte englobant l'arc alpin. Sans elle, Nominatim renvoyait « Les Arcs » dans le
 * Var — 546 km de Genève au lieu de 150 — et le tarif suivait. Les stations sont
 * cherchées dans cette zone uniquement ; les aéroports non, car Paris CDG et Orly
 * sont légitimement en dehors.
 */
const ZONE_ALPINE = { ouest: 4.5, sud: 43.6, est: 16.5, nord: 48.6 };

/**
 * Coordonnées posées à la main, pour les lieux que Nominatim ne rend pas de façon
 * fiable. Paris-CDG est le seul cas : ses libellés varient et la recherche
 * plein texte y renvoie des terminaux plutôt que l'aéroport.
 */
const COORDONNEES_FIXES = {
  "paris-charles-de-gaulle-airport": { lat: 49.0097, lon: 2.5479, nom: "Aéroport Paris-Charles-de-Gaulle" },
};

/** Noms trop ambigus pour Nominatim : on lui donne la vallée ou le massif. */
const REQUETES_PRECISES = {
  "les-arcs": "Les Arcs 1800, Bourg-Saint-Maurice, Savoie, France",
  // Sans précision, Nominatim renvoyait une « route de Méribel » à Sallanches,
  // soit 67 km de Genève au lieu de 150.
  meribel: "Méribel, Les Allues, Savoie, France",
  "paris-charles-de-gaulle-airport": "Aéroport Paris-Charles-de-Gaulle, Roissy, France",
  chamrousse: "Chamrousse, Isère, France",
  // Sans précision, Nominatim renvoyait « Saint-Gervais » près de Grenoble —
  // un hameau de l'Isère à 30 km de l'aéroport, et non la station du Mont-Blanc.
  "saint-gervais": "Saint-Gervais-les-Bains, Haute-Savoie, France",
  "les-carroz-grand-massif": "Les Carroz d'Arâches, Haute-Savoie, France",
  "val-di-fiemme": "Cavalese, Val di Fiemme, Trentino, Italy",
  gressoney: "Gressoney-la-Trinité, Aosta Valley, Italy",
  cortina: "Cortina d'Ampezzo, Veneto, Italy",
  "st-moritz": "St. Moritz, Graubünden, Switzerland",
  tasch: "Täsch, Valais, Switzerland",
};

const registreAeroports = await readFile(
  path.join(RACINE, "src", "lib", "airports", "registry.ts"),
  "utf8",
);
const registreStations = await readFile(
  path.join(RACINE, "src", "lib", "resorts", "registry.ts"),
  "utf8",
);

const AEROPORTS = [
  ...registreAeroports.matchAll(
    /slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*iata:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})"/g,
  ),
].map((m) => ({ slug: m[1], nom: m[2], iata: m[3], pays: m[4] }));

const STATIONS = [
  ...registreStations.matchAll(
    /slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*country:\s*"([A-Z]{2})"/g,
  ),
].map((m) => ({ slug: m[1], nom: m[2], pays: m[3] }));

let coordonnees = {};
try {
  coordonnees = JSON.parse(await readFile(CACHE, "utf8"));
} catch {
  // premier passage
}

const attendre = (ms) => new Promise((r) => setTimeout(r, ms));

/** Géocodage Nominatim. Renvoie null plutôt que de lever : un lieu introuvable
 *  doit être signalé, pas faire échouer les 98 autres. */
async function geocoder(requete, { code, alpin } = {}) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", requete);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  if (code) url.searchParams.set("countrycodes", code);
  if (alpin) {
    url.searchParams.set(
      "viewbox",
      `${ZONE_ALPINE.ouest},${ZONE_ALPINE.nord},${ZONE_ALPINE.est},${ZONE_ALPINE.sud}`,
    );
    url.searchParams.set("bounded", "1");
  }
  try {
    const reponse = await fetch(url, { headers: { "User-Agent": AGENT } });
    if (!reponse.ok) return null;
    const [premier] = await reponse.json();
    if (!premier) return null;
    return { lat: Number(premier.lat), lon: Number(premier.lon), nom: premier.display_name };
  } catch {
    return null;
  }
}

const introuvables = [];
const lieux = [
  ...AEROPORTS.map((a) => ({
    cle: a.slug,
    requete: REQUETES_PRECISES[a.slug] ?? `${a.nom}, ${PAYS[a.pays]}`,
    code: CODES_PAYS[a.pays],
    alpin: false,
  })),
  ...STATIONS.map((s) => ({
    cle: s.slug,
    requete: REQUETES_PRECISES[s.slug] ?? `${s.nom}, ${PAYS[s.pays]}`,
    code: CODES_PAYS[s.pays],
    alpin: true,
  })),
];

let geocodes = 0;
for (const lieu of lieux) {
  if (coordonnees[lieu.cle]) continue;
  if (COORDONNEES_FIXES[lieu.cle]) {
    coordonnees[lieu.cle] = COORDONNEES_FIXES[lieu.cle];
    continue;
  }
  const resultat = await geocoder(lieu.requete, { code: lieu.code, alpin: lieu.alpin });
  if (resultat) {
    coordonnees[lieu.cle] = resultat;
    geocodes += 1;
  } else {
    introuvables.push(lieu);
  }
  await attendre(1100); // règle d'usage de Nominatim : une requête par seconde
}
await writeFile(CACHE, JSON.stringify(coordonnees, null, 2), "utf8");
console.log(`\n  ${geocodes} lieux géocodés (${Object.keys(coordonnees).length} en cache).`);
if (introuvables.length > 0) {
  console.log(`  ${introuvables.length} introuvables : ${introuvables.map((l) => l.cle).join(", ")}`);
}

/**
 * Matrice OSRM : une requête par aéroport vers toutes les stations.
 * `annotations=distance,duration` demande explicitement les deux ; sans cela le
 * service ne renvoie que les durées.
 */
async function matrice(origine, destinations) {
  const points = [origine, ...destinations].map((p) => `${p.lon},${p.lat}`).join(";");
  const url = `https://router.project-osrm.org/table/v1/driving/${points}?sources=0&annotations=distance,duration`;
  try {
    const reponse = await fetch(url, { headers: { "User-Agent": AGENT } });
    if (!reponse.ok) return null;
    const donnees = await reponse.json();
    if (donnees.code !== "Ok") return null;
    return {
      distances: donnees.distances?.[0]?.slice(1) ?? [],
      durees: donnees.durations?.[0]?.slice(1) ?? [],
    };
  } catch {
    return null;
  }
}

const stationsGeocodees = STATIONS.filter((s) => coordonnees[s.slug]);
const lignes = [];
const echecs = [];

for (const aeroport of AEROPORTS) {
  const depart = coordonnees[aeroport.slug];
  if (!depart) continue;

  const resultat = await matrice(
    depart,
    stationsGeocodees.map((s) => coordonnees[s.slug]),
  );
  if (!resultat) {
    echecs.push(aeroport.slug);
    await attendre(1200);
    continue;
  }

  stationsGeocodees.forEach((station, i) => {
    const metres = resultat.distances[i];
    const secondes = resultat.durees[i];
    if (!metres || !Number.isFinite(metres)) return;
    lignes.push({
      airport: aeroport.slug,
      resort: station.slug,
      km: Math.round(metres / 1000),
      minutes: Math.round(secondes / 60),
    });
  });
  await attendre(1200); // on ne martèle pas un service public gratuit
}

/**
 * Contrôle de vraisemblance. En montagne, une route fait couramment 2,5 à 3 fois
 * la distance à vol d'oiseau — vallées, cols, lacets : c'est normal pour Val
 * Thorens ou Zermatt. Au-delà de 3,5, en revanche, c'est presque toujours un
 * mauvais géocodage. C'est ce ratio qui a permis de repérer « Les Arcs » rendu
 * dans le Var, à 546 km de Genève au lieu de 150.
 */
function volDoiseau(a, b) {
  const R = 6371;
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(h));
}

const suspectes = lignes.filter((l) => {
  const depart = coordonnees[l.airport];
  const arrivee = coordonnees[l.resort];
  if (!depart || !arrivee) return false;
  const direct = volDoiseau(depart, arrivee);
  return direct > 5 && l.km / direct > 3.5;
});

lignes.sort((a, b) => `${a.airport}${a.resort}`.localeCompare(`${b.airport}${b.resort}`));

const ts = `/**
 * DISTANCES ROUTIÈRES — calculées, pas estimées.
 *
 * Générées par \`npm run distances:calculer\` avec OpenStreetMap : géocodage
 * Nominatim puis routage OSRM. Aucune clé d'API, aucun coût, et **aucun appel
 * réseau au runtime** — le site lit cette table.
 *
 * Ce sont des distances aéroport → centre de station, ce qui suffit à établir un
 * tarif. Une clé Google Maps ne deviendra utile que pour du porte-à-porte à
 * l'adresse exacte.
 *
 * ${lignes.length} liaisons, calculées le ${new Date().toISOString().slice(0, 10)}.
 */
export interface DistanceRoutiere {
  airport: string;
  resort: string;
  /** Distance routière en kilomètres. */
  km: number;
  /** Durée sans trafic, en minutes. Une route de col en janvier prend davantage. */
  minutes: number;
}

export const DISTANCES: DistanceRoutiere[] = [
${lignes
  .map(
    (l) =>
      `  { airport: "${l.airport}", resort: "${l.resort}", km: ${l.km}, minutes: ${l.minutes} },`,
  )
  .join("\n")}
];

export function distanceRoutiere(airport: string, resort: string) {
  return DISTANCES.find((d) => d.airport === airport && d.resort === resort) ?? null;
}
`;

await writeFile(path.join(RACINE, "src", "data", "distances.ts"), ts, "utf8");

console.log(`  ${lignes.length} liaisons calculées → src/data/distances.ts`);
if (echecs.length > 0) console.log(`  ${echecs.length} aéroports en échec : ${echecs.join(", ")}`);
if (suspectes.length > 0) {
  const stations = [...new Set(suspectes.map((s) => s.resort))];
  console.log(
    `  ${suspectes.length} liaisons peu vraisemblables (route > 3,5 × vol d'oiseau) sur : ${stations.join(", ")}`,
  );
  console.log("    → géocodage à préciser dans REQUETES_PRECISES.");
}
console.log();
