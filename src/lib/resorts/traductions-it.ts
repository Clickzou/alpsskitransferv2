import type { TraductionStation } from "./types";

/**
 * Traduzioni italiane delle pagine delle località sciistiche.
 *
 * À part des modules de station, comme le français et l'allemand, pour survivre
 * à `npm run migrer:stations`.
 *
 * **Périmètre italien — décision du 9 septembre 2026.** Les stations italiennes
 * et valdôtaines, au départ de Turin, Milan Malpensa, Bergame et Genève. C'est
 * le marché intérieur du ski italien, et c'est aussi le seul endroit où l'on
 * peut dire quelque chose d'utile sur le tunnel du Mont-Blanc, la montée de la
 * Valtournenche ou la Via Lattea.
 *
 * Les slugs sont italiens : `cervinia`, `courmayeur`, `sestriere`. Le slug
 * anglais reste la clé de ce registre.
 */
export const TRADUCTIONS_IT: Record<string, TraductionStation> = {};
