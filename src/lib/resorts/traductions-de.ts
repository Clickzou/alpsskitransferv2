import type { TraductionStation } from "./types";

/**
 * Deutsche Übersetzungen der Skiort-Seiten.
 *
 * À part des modules de station, comme le français, pour survivre à
 * `npm run migrer:stations` qui réécrit les fichiers repris du WordPress.
 *
 * **Périmètre allemand — décision du 9 septembre 2026.** Il ne recopie pas le
 * périmètre français, il suit son marché : l'Autriche et la Suisse alémanique,
 * au départ d'Innsbruck, Salzbourg, Zurich et Munich. Un germanophone qui part
 * skier ne cherche pas Val Thorens depuis Lyon ; il cherche Ischgl depuis
 * Innsbruck, Sölden depuis Munich, Zermatt depuis Zurich. Ce sont aussi les
 * seules liaisons où nous avons quelque chose à dire de précis.
 *
 * Les slugs sont allemands : `soelden`, `zuerich`, `st-anton-am-arlberg`. Le
 * slug anglais reste la clé de ce registre — c'est lui qui relie les versions.
 */
export const TRADUCTIONS_DE: Record<string, TraductionStation> = {};
