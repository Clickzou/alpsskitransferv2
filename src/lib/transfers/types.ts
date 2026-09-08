import type { BlocContenu, Faq } from "@/lib/resorts/types";

/**
 * Page de trajet — page fille du silo, sous sa page de station.
 *
 * Le site actuel range les mêmes trajets dans trois arborescences à la fois
 * (`/airport-ski-transfers/{pays}/{trajet}/`, `/destination/{pays}/{aéroport}/`,
 * `/{pays}-ski-transfers/{station}/`), ce qui fait exister Val Thorens sur
 * 7 URL et Chamonix sur 5. Ici, un trajet a exactement une URL.
 */
export interface Transfer {
  airport: string; // slug d'aéroport
  resort: string; // slug de station
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
  fr?: {
    metaTitre: string;
    metaDescription: string;
    h1: string;
    chapo: string;
    contenu: BlocContenu[];
    faq: Faq[];
  };
}
