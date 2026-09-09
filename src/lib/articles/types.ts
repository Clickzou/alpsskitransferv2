import type { NomVisuel } from "@/components/Visuel";
import type { LangueSecondaire } from "@/lib/i18n";
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
  /**
   * Visuel de tête, préparé par `npm run images:preparer`.
   *
   * Distinct de `image`, qui sert l'aperçu des réseaux sociaux : celui-ci est
   * affiché par le site, en AVIF avec ses dimensions, donc sans décalage de
   * mise en page. Un article sans visuel reste lisible — la carte tombe alors
   * sur une composition typographique.
   */
  visuel?: { nom: NomVisuel; alt: string };
  contenu: BlocContenu[];
  /**
   * Maillage sortant explicite : slugs de stations et de trajets que l'article
   * doit lier. C'est ce qui fait travailler le blog pour la réservation et pas
   * seulement pour l'audience.
   */
  stationsLiees?: string[];
  brouillon?: boolean;
  /** Les traductions de l'article, par langue. Absente = pas de version. */
  traductions?: Partial<Record<LangueSecondaire, TraductionArticle>>;
}

/** Un article dans une autre langue. */
export interface TraductionArticle {
  slug: string;
  titre: string;
  metaTitre: string;
  metaDescription: string;
  chapo: string;
  contenu: BlocContenu[];
  /**
   * Le texte alternatif du visuel, dans cette langue.
   *
   * L'image est la même — c'est la même montagne — mais son `alt` est rédigé en
   * anglais dans l'article d'origine. Le laisser tel quel ferait lire de
   * l'anglais à un lecteur d'écran allemand, et donnerait à Google un texte dans
   * une langue que la page ne déclare pas. Absent, on retombe sur l'anglais.
   */
  altVisuel?: string;
  /**
   * Le maillage sortant propre à cette langue.
   *
   * Il ne peut pas être partagé : un article allemand sur les aéroports du
   * Tyrol n'a rien à dire de Val Thorens, et la liste anglaise, filtrée sur les
   * stations traduites en allemand, tomberait à zéro. Absent, on retombe sur
   * `stationsLiees` — ce qui convient quand le sujet est le même des deux côtés.
   */
  stationsLiees?: string[];
}
