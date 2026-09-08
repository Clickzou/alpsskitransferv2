import type { BlocContenu } from "@/lib/resorts/types";

/**
 * Article de blog.
 *
 * Le site n'a aucun blog aujourd'hui — `/blog/` et `/news/` sont en 404 — alors
 * que les six concurrents relevés en ont tous un. C'est la brique éditoriale qui
 * alimente le maillage interne vers les pages de station et de trajet.
 */
export interface Article {
  slug: string;
  titre: string;
  metaTitre: string;
  metaDescription: string;
  chapo: string;
  datePublication: string; // ISO
  dateModification?: string;
  auteur: string;
  image?: { src: string; alt: string };
  contenu: BlocContenu[];
  /**
   * Maillage sortant explicite : slugs de stations et de trajets que l'article
   * doit lier. C'est ce qui fait travailler le blog pour la réservation et pas
   * seulement pour l'audience.
   */
  stationsLiees?: string[];
  brouillon?: boolean;
  fr?: {
    slug: string;
    titre: string;
    metaTitre: string;
    metaDescription: string;
    chapo: string;
    contenu: BlocContenu[];
  };
}
