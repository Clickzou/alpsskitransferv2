import { COORDONNEES } from "@/data/coordonnees";
import { airportParSlug } from "@/lib/airports";
import { LIEUX, normaliser } from "@/lib/reservation/lieux";
import { resortParSlug } from "@/lib/resorts";
import { distanceApi, distanceCalculee, distancePubliee } from "@/lib/tarification/distance";

/**
 * Mesurer un trajet qui passe par une adresse — demande de JC, 15 septembre
 * 2026 : « je veux qu'il puisse calculer le tarif tout seul », au téléphone
 * comme sur le site.
 *
 * Jusque-là, seule une liaison aéroport → station de la table avait un prix ;
 * une adresse partait en devis. Le barème est pourtant au kilomètre : il ne
 * manquait que la distance. Ce module la trouve, en trois temps :
 *
 * 1. **Situer chaque point.** Un aéroport ou une station connus : leurs
 *    coordonnées (`data/coordonnees.ts`). Une adresse : la Base Adresse
 *    Nationale pour la France, Photon (OpenStreetMap) ailleurs — les mêmes
 *    services que les suggestions du formulaire, qui ont produit le libellé.
 * 2. **Mesurer la route.** Entre un aéroport et une station connus, la table
 *    fait foi, dans un sens comme dans l'autre : le prix ne doit pas changer
 *    selon qu'on part ou qu'on rentre. Sinon OSRM, le calcul d'itinéraire
 *    public d'OpenStreetMap — celui qui a produit la table ; Google en repli si
 *    une clé est posée.
 * 3. **Choisir le coefficient.** Celui de la station du trajet ; pour une
 *    adresse, celui de la station à moins de 15 km. Sans cela, taper l'adresse
 *    d'un chalet de Val Thorens coûterait moins cher que choisir « Val
 *    Thorens » — la montée finale est la même.
 *
 * Tout échec rend `null`, jamais une estimation : l'appelant retombe alors sur
 * la demande de devis, comme avant.
 */

export interface Mesure {
  km: number;
  minutes: number | null;
  /** La station dont le coefficient s'applique, ou `null` (coefficient 1). */
  station: string | null;
  source: "table" | "route";
}

interface Point {
  lat: number;
  lon: number;
  slug: string | null;
  type: "aeroport" | "station" | "adresse";
}

/** Au-delà, ce n'est plus un transfert : un devis, à la main. */
const KM_MAXIMUM = 1500;
/** Une adresse à moins de cette distance d'une station en prend le coefficient. */
const RAYON_STATION_KM = 15;
const DELAI_MS = 4500;
const AGENT = "alpsskitransfers.com (bookings@alpsskitransfers.com)";

/** Distance à vol d'oiseau, en kilomètres. */
export function volOiseau(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

/** La station la plus proche d'un point, si elle est à moins de 15 km. */
export function stationProche(point: { lat: number; lon: number }): string | null {
  let meilleure: { slug: string; km: number } | null = null;
  for (const [slug, [lat, lon]] of Object.entries(COORDONNEES)) {
    if (!resortParSlug(slug)) continue;
    const km = volOiseau(point, { lat, lon });
    if (km <= RAYON_STATION_KM && (!meilleure || km < meilleure.km)) meilleure = { slug, km };
  }
  return meilleure?.slug ?? null;
}

/** Un nom de la liste tapé en entier vaut le lieu du registre. */
function slugConnu(valeur: string): string | null {
  if (airportParSlug(valeur) || resortParSlug(valeur)) return valeur;
  const cible = normaliser(valeur);
  if (!cible) return null;
  return LIEUX.find((l) => l.slug && (normaliser(l.nom) === cible || l.cles.includes(cible)))?.slug ?? null;
}

async function lireJson(url: URL | string): Promise<unknown> {
  const reponse = await fetch(url, {
    headers: { "User-Agent": AGENT, Accept: "application/json" },
    signal: AbortSignal.timeout(DELAI_MS),
    next: { revalidate: 60 * 60 * 24 * 30 },
  });
  if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
  return reponse.json();
}

/** Base Adresse Nationale : une adresse française, à la porte près. */
async function geocoderBan(texte: string): Promise<{ lat: number; lon: number } | null> {
  const url = new URL("https://api-adresse.data.gouv.fr/search/");
  url.searchParams.set("q", texte.slice(0, 200));
  url.searchParams.set("limit", "1");
  const donnees = (await lireJson(url)) as {
    features?: { geometry: { coordinates: [number, number] }; properties: { score: number } }[];
  };
  const f = donnees.features?.[0];
  // Sous 0,6, la BAN a trouvé « quelque chose » : une rue homonyme, une autre commune.
  if (!f || f.properties.score < 0.6) return null;
  return { lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] };
}

/** Photon : la Suisse, l'Italie, et les hôtels et chalets que la BAN ignore. */
async function geocoderPhoton(texte: string): Promise<{ lat: number; lon: number } | null> {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", texte.slice(0, 200));
  url.searchParams.set("limit", "1");
  // L'Europe de l'Ouest, comme les suggestions : pas d'homonyme d'un autre continent.
  url.searchParams.set("bbox", "-6,35,20,55");
  const donnees = (await lireJson(url)) as { features?: { geometry: { coordinates: [number, number] } }[] };
  const f = donnees.features?.[0];
  return f ? { lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] } : null;
}

const points = new Map<string, Point | null>();

async function situer(valeur: string): Promise<Point | null> {
  const slug = slugConnu(valeur);
  if (slug) {
    const c = COORDONNEES[slug];
    return c
      ? { lat: c[0], lon: c[1], slug, type: airportParSlug(slug) ? "aeroport" : "station" }
      : null;
  }

  const cle = normaliser(valeur);
  if (points.has(cle)) return points.get(cle)!;

  let trouve: { lat: number; lon: number } | null = null;
  // Une adresse qui porte un code postal français passe d'abord par la BAN.
  const francaise = /\b\d{5}\b/.test(valeur) || /france/i.test(valeur);
  const essais = francaise ? [geocoderBan, geocoderPhoton] : [geocoderPhoton, geocoderBan];
  for (const essai of essais) {
    try {
      trouve = await essai(valeur);
    } catch {
      trouve = null;
    }
    if (trouve) break;
  }

  const point: Point | null = trouve ? { ...trouve, slug: null, type: "adresse" } : null;
  // Un échec réseau ne se garde pas en cache : la tentative suivante peut réussir.
  if (point) points.set(cle, point);
  return point;
}

/** La route d'OSRM, en kilomètres et en minutes. */
async function routeOsrm(a: Point, b: Point): Promise<{ km: number; minutes: number } | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`;
  try {
    const donnees = (await lireJson(url)) as { code: string; routes?: { distance: number; duration: number }[] };
    const r = donnees.code === "Ok" ? donnees.routes?.[0] : undefined;
    return r ? { km: Math.round(r.distance / 1000), minutes: Math.round(r.duration / 60) } : null;
  } catch {
    return null;
  }
}

const mesures = new Map<string, Mesure>();

/**
 * La distance et le coefficient d'un trajet quelconque — aéroport, station ou
 * adresse, dans n'importe quel ordre. `null` quand un point est introuvable ou
 * que la route ne répond pas.
 */
export async function mesurer(depart: string, arrivee: string): Promise<Mesure | null> {
  const cle = `${normaliser(depart)}→${normaliser(arrivee)}`;
  if (mesures.has(cle)) return mesures.get(cle)!;

  const [a, b] = await Promise.all([situer(depart), situer(arrivee)]);
  if (!a || !b) return null;

  const station =
    (b.type === "station" ? b.slug : null) ??
    (a.type === "station" ? a.slug : null) ??
    (b.type === "adresse" ? stationProche(b) : null) ??
    (a.type === "adresse" ? stationProche(a) : null);

  // Aéroport et station connus : la table, dans un sens comme dans l'autre.
  const aeroport = a.type === "aeroport" ? a.slug : b.type === "aeroport" ? b.slug : null;
  const stationConnue = a.type === "station" ? a.slug : b.type === "station" ? b.slug : null;
  if (aeroport && stationConnue) {
    const trajet = { origine: aeroport, destination: stationConnue };
    const table = distanceCalculee(trajet) ?? distancePubliee(trajet);
    if (table) {
      const mesure: Mesure = { km: table.km, minutes: table.minutes, station: stationConnue, source: "table" };
      mesures.set(cle, mesure);
      return mesure;
    }
  }

  const route =
    (await routeOsrm(a, b)) ??
    (await distanceApi({ origine: `${a.lat},${a.lon}`, destination: `${b.lat},${b.lon}` }));
  if (!route || route.km < 1 || route.km > KM_MAXIMUM) return null;

  const mesure: Mesure = { km: route.km, minutes: route.minutes, station, source: "route" };
  mesures.set(cle, mesure);
  return mesure;
}
