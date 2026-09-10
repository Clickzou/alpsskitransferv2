import type { NomVisuel } from "@/components/Visuel";
import type { BlocContenu, Faq } from "@/lib/resorts/types";

/**
 * Page fonctionnelle reprise du WordPress : contact, conditions, aide, FAQ…
 *
 * Ces 14 URL sont **conservées telles quelles** par le plan de migration : elles
 * ont des liens entrants et parfois du contenu de fond — la page « private airport
 * transfers to alps ski resort » fait 2 157 mots. Les perdre serait une régression
 * gratuite.
 */
export interface PageFonctionnelle {
  /** Segment racine de l'URL, sans les slashs : « contact », « privacy »… */
  slug: string;
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
  /** Pages de remerciement, de confirmation : servies, mais hors index. */
  noindex?: boolean;
  /**
   * Visuel de tête. Les pages juridiques et le panier n'en ont pas : elles sont
   * en `noindex` et on y vient pour lire, pas pour se projeter en montagne.
   */
  visuel?: { nom: NomVisuel; alt: string };
}
