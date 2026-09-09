import type { TraductionTrajet } from "./types";

/**
 * Traduzioni italiane delle pagine di trasferimento.
 *
 * Clé : `{aéroport}|{station}`, en slugs anglais. Périmètre italien : Turin,
 * Milan Malpensa, Bergame et Genève vers les stations italiennes et valdôtaines.
 */
export const TRADUCTIONS_TRAJETS_IT: Record<string, TraductionTrajet> = {};
