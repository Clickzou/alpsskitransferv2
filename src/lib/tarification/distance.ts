import { DISTANCES } from "@/data/distances";
import { TARIFS } from "@/data/tarifs";

/**
 * Distance routière entre un aéroport et une station.
 *
 * Trois sources, dans cet ordre, et c'est l'ordre qui compte :
 *
 * 1. **La table calculée** (`data/distances.ts`) — 2 108 liaisons aéroport → station
 *    obtenues par routage OpenStreetMap, figées dans le dépôt. Aucun appel réseau,
 *    aucune clé, aucun coût.
 * 2. **Les distances annoncées** sur les anciennes pages (`data/tarifs.ts`), en
 *    repli. Attention : plusieurs sont fausses — mesurées depuis la ville et non
 *    depuis l'aéroport — d'où leur rang.
 * 3. **L'API de calcul d'itinéraire**, seulement pour ce que la table ne couvre
 *    pas : une adresse précise en station, une liaison nouvelle. Sans clé, cette
 *    étape est simplement sautée.
 *
 * Le site actuel n'avait aucune de ces sources : sa clé Google Maps était vide,
 * donc son calcul par distance ne pouvait pas fonctionner.
 */

export interface Trajet {
  /** Point de départ : slug d'aéroport, ou adresse libre. */
  origine: string;
  /** Point d'arrivée : slug de station, ou adresse libre. */
  destination: string;
}

export interface Distance {
  km: number;
  /** Durée estimée en minutes, quand la source la fournit. */
  minutes: number | null;
  source: "table" | "publiee" | "api";
}

/** Cache de distances. L'implémentation Supabase est branchée au démarrage. */
export interface CacheDistances {
  lire(cle: string): Promise<Distance | null>;
  ecrire(cle: string, distance: Distance): Promise<void>;
}

const cleCache = (t: Trajet) => `${t.origine}→${t.destination}`.toLowerCase();

/** Distance routière calculée, pour une liaison aéroport → station connue. */
export function distanceCalculee(trajet: Trajet): Distance | null {
  const ligne = DISTANCES.find(
    (d) => d.airport === trajet.origine && d.resort === trajet.destination,
  );
  return ligne ? { km: ligne.km, minutes: ligne.minutes, source: "table" } : null;
}

/** Distance annoncée sur l'ancienne page de trajet, s'il y en a une. */
export function distancePubliee(trajet: Trajet): Distance | null {
  const tarif = TARIFS.find(
    (t) => t.airport === trajet.origine && t.resort === trajet.destination,
  );
  if (!tarif?.km) return null;
  return { km: tarif.km, minutes: tarif.duree, source: "publiee" };
}

/**
 * Interroge l'API Google Distance Matrix.
 * Renvoie `null` plutôt que de lever : une distance indisponible doit dégrader le
 * parcours vers une demande de devis, jamais casser la page.
 */
export async function distanceApi(trajet: Trajet): Promise<Distance | null> {
  const cle = process.env.GOOGLE_MAPS_API_KEY;
  if (!cle) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json");
  url.searchParams.set("origins", trajet.origine);
  url.searchParams.set("destinations", trajet.destination);
  url.searchParams.set("units", "metric");
  url.searchParams.set("key", cle);

  try {
    const reponse = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
    if (!reponse.ok) return null;
    const donnees = await reponse.json();
    const element = donnees?.rows?.[0]?.elements?.[0];
    if (element?.status !== "OK") return null;
    return {
      km: Math.round(element.distance.value / 1000),
      minutes: Math.round(element.duration.value / 60),
      source: "api",
    };
  } catch {
    return null;
  }
}

export async function distance(
  trajet: Trajet,
  cache?: CacheDistances,
): Promise<Distance | null> {
  const cle = cleCache(trajet);

  if (cache) {
    const enCache = await cache.lire(cle);
    if (enCache) return enCache;
  }

  const calculee = distanceCalculee(trajet);
  if (calculee) {
    await cache?.ecrire(cle, calculee);
    return calculee;
  }

  const publiee = distancePubliee(trajet);
  if (publiee) {
    await cache?.ecrire(cle, publiee);
    return publiee;
  }

  const api = await distanceApi(trajet);
  if (api) await cache?.ecrire(cle, api);
  return api;
}
