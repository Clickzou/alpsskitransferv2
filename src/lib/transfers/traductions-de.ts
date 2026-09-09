import type { TraductionTrajet } from "./types";

/**
 * Deutsche Übersetzungen der Transferseiten.
 *
 * Clé : `{aéroport}|{station}`, en slugs anglais — c'est la clé qui relie les
 * versions d'un même trajet. Le périmètre suit celui des stations allemandes :
 * Innsbruck, Salzbourg, Zurich et Munich vers l'Autriche et la Suisse alémanique.
 */
export const TRADUCTIONS_TRAJETS_DE: Record<string, TraductionTrajet> = {};
