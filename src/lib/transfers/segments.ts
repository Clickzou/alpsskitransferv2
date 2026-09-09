import type { LangueSecondaire } from "@/lib/i18n";

/** Nom d'usage d'un aéroport dans une langue, et segment d'URL correspondant. */
export interface SegmentAeroport {
  nom: string;
  segment: string;
}

/**
 * Les aéroports nommés dans chaque langue, avec leur segment d'URL.
 *
 * Deux règles ici, et elles se répondent :
 *
 * 1. **Le nom est celui du marché, pas sa traduction littérale.** Un Allemand
 *    cherche « Transfer Zürich Ischgl », pas « Zurich » ; un Italien cherche
 *    « Torino », pas « Turin ». C'est le mot-clé, il vit dans l'URL, dans le H1
 *    et dans le title.
 * 2. **Un aéroport absent d'une langue ferme le trajet.** Sans segment, pas
 *    d'URL, donc pas de page — même si la traduction du trajet existe. C'est le
 *    filtre qui empêche de publier un trajet Grenoble → Chamrousse en italien
 *    au motif que le texte serait traduisible.
 *
 * Le périmètre suit le marché de chaque langue : l'allemand part d'Innsbruck,
 * Salzbourg, Zurich et Munich ; l'italien de Turin, Milan, Bergame et Genève ;
 * le français des quatre aéroports français et suisse romand.
 */
export const SEGMENTS_AEROPORT: Record<
  LangueSecondaire,
  Record<string, SegmentAeroport>
> = {
  fr: {
    "geneva-airport": { nom: "Genève", segment: "geneve" },
    "lyon-airport": { nom: "Lyon", segment: "lyon" },
    "chambery-savoie-airport": { nom: "Chambéry", segment: "chambery" },
    "grenoble-isere-airport": { nom: "Grenoble", segment: "grenoble" },
  },
  de: {
    "innsbruck-airport": { nom: "Innsbruck", segment: "innsbruck" },
    "salzburg-airport": { nom: "Salzburg", segment: "salzburg" },
    "zurich-airport": { nom: "Zürich", segment: "zuerich" },
    "munich-airport": { nom: "München", segment: "muenchen" },
    "geneva-airport": { nom: "Genf", segment: "genf" },
  },
  it: {
    "turin-airport": { nom: "Torino", segment: "torino" },
    "milan-malpensa-airport": { nom: "Milano Malpensa", segment: "milano-malpensa" },
    "bergamo-airport": { nom: "Bergamo", segment: "bergamo" },
    "geneva-airport": { nom: "Ginevra", segment: "ginevra" },
    "innsbruck-airport": { nom: "Innsbruck", segment: "innsbruck" },
  },
};

/** Le segment d'un aéroport dans une langue, s'il y est desservi. */
export function segmentAeroport(
  lang: LangueSecondaire,
  airport: string,
): SegmentAeroport | undefined {
  return SEGMENTS_AEROPORT[lang][airport];
}

/** Slug d'aéroport correspondant à un segment d'URL, dans une langue donnée. */
export function aeroportDepuisSegment(
  lang: LangueSecondaire,
  segment: string,
): string | undefined {
  return Object.entries(SEGMENTS_AEROPORT[lang]).find(([, v]) => v.segment === segment)?.[0];
}
