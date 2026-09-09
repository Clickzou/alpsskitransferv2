import type { LangueSecondaire } from "@/lib/i18n";
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
  /**
   * Les traductions du trajet, par langue. Une page de trajet traduite n'existe
   * que si **trois** conditions sont réunies : cette traduction, celle de sa
   * station, et un segment d'URL pour l'aéroport dans cette langue. Il manque
   * l'un des trois et la page n'est pas générée — l'URL n'aurait pas de forme,
   * ou la page fille n'aurait pas de mère.
   */
  traductions?: Partial<Record<LangueSecondaire, TraductionTrajet>>;
}

/** Un trajet dans une autre langue. Pas de `slug` : l'URL vient de la station
 * et du segment d'aéroport, tous deux définis ailleurs. */
export interface TraductionTrajet {
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
}
