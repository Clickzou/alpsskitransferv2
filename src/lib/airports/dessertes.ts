import { DISTANCES } from "@/data/distances";
import { AIRPORTS } from "@/lib/airports";
import { RESORTS_MIGRES, SLUG_PAYS } from "@/lib/resorts";
import { TRANSFERS, segmentTrajet } from "@/lib/transfers";

/**
 * Ce qu'un aéroport dessert — la matière de son hub.
 *
 * Le hub d'aéroport (`/switzerland-ski-transfers/geneva-airport/`) reprend les
 * 31 anciennes pages `/destination/{pays}/{aéroport}/`, qui ne faisaient que
 * 230 mots. Il a de quoi faire mieux : la liste des stations desservies, leur
 * distance et leur durée de route, et un lien vers chaque page de trajet.
 *
 * Genève est le cas qui compte : c'est la première porte d'entrée des Alpes, et
 * le site n'y est positionné sur aucune requête.
 */

export interface Desserte {
  resort: string;
  nom: string;
  /** Chemin de la page de station. */
  cheminStation: string;
  /** Chemin de la page de trajet, quand elle existe. */
  cheminTrajet: string | null;
  km: number | null;
  minutes: number | null;
}

export function dessertes(airportSlug: string): Desserte[] {
  return RESORTS_MIGRES.map((station) => {
    const distance = DISTANCES.find(
      (d) => d.airport === airportSlug && d.resort === station.slug,
    );
    const cheminStation = `/${SLUG_PAYS[station.country]}/${station.slug}/`;
    const trajet = TRANSFERS.find(
      (t) => t.airport === airportSlug && t.resort === station.slug,
    );
    return {
      resort: station.slug,
      nom: station.name,
      cheminStation,
      cheminTrajet: trajet ? `${cheminStation}${segmentTrajet(airportSlug)}/` : null,
      km: distance?.km ?? null,
      minutes: distance?.minutes ?? null,
    };
  })
    .filter((d) => d.km !== null)
    .sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
}

/** Formate une durée en minutes : « 1 h 45 ». */
export function duree(minutes: number | null): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

/**
 * Comment on atteint une station : l'aéroport le plus rapide qui a une page de
 * trajet, le temps de route, et combien de liaisons la desservent.
 *
 * C'est ce qu'attend l'index des stations. Le WordPress y annonçait onze
 * stations avec des durées écrites à la main, dont plusieurs fausses — Zermatt
 * était donné à « 3h30 from Zurich » pour 4 h 17 réelles. Ici la valeur sort des
 * itinéraires calculés, comme partout ailleurs sur le site.
 */
export interface AccesStation {
  /** Nom de l'aéroport le plus rapide, quand une page de trajet existe. */
  aeroport: string | null;
  minutes: number | null;
  /** Nombre de pages de trajet qui mènent à cette station. */
  trajets: number;
}

export function accesStation(resort: string): AccesStation {
  const liaisons = TRANSFERS.filter((t) => t.resort === resort);

  const chiffrees = liaisons
    .map((t) => {
      const distance = DISTANCES.find(
        (d) => d.airport === t.airport && d.resort === resort,
      );
      const aeroport = AIRPORTS.find((a) => a.slug === t.airport);
      return distance && aeroport
        ? { nom: aeroport.name.replace(" Airport", ""), minutes: distance.minutes }
        : null;
    })
    .filter((x): x is { nom: string; minutes: number } => x !== null)
    .sort((a, b) => a.minutes - b.minutes);

  return {
    aeroport: chiffrees[0]?.nom ?? null,
    minutes: chiffrees[0]?.minutes ?? null,
    trajets: liaisons.length,
  };
}
