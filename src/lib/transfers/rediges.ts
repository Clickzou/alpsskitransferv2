import type { Transfer } from "./types";
import { genevaAirportToChampery } from "./geneva-airport-to-champery";
import { genevaAirportToChampoluc } from "./geneva-airport-to-champoluc";
import { genevaAirportToChamrousse } from "./geneva-airport-to-chamrousse";
import { genevaAirportToCourmayeur } from "./geneva-airport-to-courmayeur";
import { genevaAirportToCransMontana } from "./geneva-airport-to-crans-montana";
import { genevaAirportToGrindelwald } from "./geneva-airport-to-grindelwald";
import { genevaAirportToGstaad } from "./geneva-airport-to-gstaad";
import { genevaAirportToInterlaken } from "./geneva-airport-to-interlaken";
import { genevaAirportToLaThuile } from "./geneva-airport-to-la-thuile";
import { genevaAirportToLauterbrunnen } from "./geneva-airport-to-lauterbrunnen";
import { genevaAirportToLesMenuires } from "./geneva-airport-to-les-menuires";
import { genevaAirportToSaintGervais } from "./geneva-airport-to-saint-gervais";
import { genevaAirportToSauzeDoulx } from "./geneva-airport-to-sauze-doulx";
import { genevaAirportToSestriere } from "./geneva-airport-to-sestriere";
import { genevaAirportToVillarsSurOllon } from "./geneva-airport-to-villars-sur-ollon";

/**
 * Les trajets **rédigés à la main**, par opposition à ceux repris du WordPress
 * par `npm run migrer:trajets`.
 *
 * Même dispositif que pour les stations : le script réécrit le bloc généré de
 * `index.ts` à chaque exécution, et un trajet écrit à la main ajouté dans ce bloc
 * disparaîtrait à la migration suivante. Ici, il survit.
 *
 * Ce sont d'abord les liaisons au départ de Genève que l'audit signale comme
 * absentes : première porte d'entrée des Alpes, et le site n'y était positionné
 * sur aucune requête.
 */
export const TRANSFERS_REDIGES: Transfer[] = [
  genevaAirportToChampery,
  genevaAirportToChampoluc,
  genevaAirportToChamrousse,
  genevaAirportToCourmayeur,
  genevaAirportToCransMontana,
  genevaAirportToGrindelwald,
  genevaAirportToGstaad,
  genevaAirportToInterlaken,
  genevaAirportToLaThuile,
  genevaAirportToLauterbrunnen,
  genevaAirportToLesMenuires,
  genevaAirportToSaintGervais,
  genevaAirportToSauzeDoulx,
  genevaAirportToSestriere,
  genevaAirportToVillarsSurOllon,
];
