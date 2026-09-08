import type { Article } from "./types";
import { quelAeroportAlpes } from "./quel-aeroport-alpes";
import { reserverTransfertSki } from "./reserver-transfert-ski";
import { stationsSansVoitures } from "./stations-sans-voitures";

export type { Article } from "./types";

/**
 * Les 3 articles de démarrage prévus au devis, écrits le 8 septembre 2026. La
 * suite relève de l'accompagnement mensuel : un blog livré puis laissé vide ne
 * produit rien.
 *
 * Chacun maille vers les stations qu'il cite (`stationsLiees`), et chaque page de
 * station affiche en retour les articles qui la mentionnent.
 */
export const ARTICLES: Article[] = [
  quelAeroportAlpes,
  stationsSansVoitures,
  reserverTransfertSki,
];

export function articlesPublies() {
  return ARTICLES.filter((a) => !a.brouillon).sort((a, b) =>
    b.datePublication.localeCompare(a.datePublication),
  );
}

export function articleParSlug(slug: string) {
  return articlesPublies().find((a) => a.slug === slug);
}

/** Articles qui mentionnent une station — maillage retour vers les pages de station. */
export function articlesDeLaStation(slugStation: string) {
  return articlesPublies().filter((a) => a.stationsLiees?.includes(slugStation));
}
