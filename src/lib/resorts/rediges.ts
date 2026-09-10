import type { Resort } from "./types";
import { alagnaValsesia } from "./alagna-valsesia";
import { annecy } from "./annecy";
import { arosa } from "./arosa";
import { champoluc } from "./champoluc";
import { engelberg } from "./engelberg";
import { gressoney } from "./gressoney";
import { grimentz } from "./grimentz";
import { isola2000 } from "./isola-2000";
import { laax } from "./laax";
import { madonnaDiCampiglio } from "./madonna-di-campiglio";
import { saintGervais } from "./saint-gervais";
import { valDiFiemme } from "./val-di-fiemme";
import { argentiere } from "./argentiere";
import { champery } from "./champery";
import { cransMontana } from "./crans-montana";
import { chamrousse } from "./chamrousse";
import { flaine } from "./flaine";
import { interlaken } from "./interlaken";
import { laClusaz } from "./la-clusaz";
import { lauterbrunnen } from "./lauterbrunnen";
import { leGrandBornand } from "./le-grand-bornand";
import { lesCarrozGrandMassif } from "./les-carroz-grand-massif";
import { lesGets } from "./les-gets";
import { lesMenuires } from "./les-menuires";
import { megeve } from "./megeve";
import { montgenevre } from "./montgenevre";
import { samoens } from "./samoens";
import { serreChevalier } from "./serre-chevalier";
import { valThorens } from "./val-thorens";
import { wengen } from "./wengen";
import { zermatt } from "./zermatt";

/**
 * Les stations **rédigées à la main**, par opposition à celles reprises du
 * WordPress par `npm run migrer:stations`.
 *
 * Elles vivent dans ce fichier séparé pour une raison précise : le script de
 * migration réécrit le bloc généré de `index.ts` à chaque exécution. Une station
 * écrite à la main ajoutée dans ce bloc disparaîtrait à la migration suivante, et
 * sa page avec elle. Ici, elle survit.
 *
 * Une station n'entre ici que si elle n'existe pas dans la base WordPress ou si
 * son contenu WordPress est inexploitable — c'est le cas de Val Thorens, dont
 * l'URL `val-thorens-2` porte en réalité le contenu de Courchevel.
 */
export const RESORTS_REDIGES: Resort[] = [
  alagnaValsesia,
  annecy,
  argentiere,
  arosa,
  champery,
  champoluc,
  chamrousse,
  cransMontana,
  engelberg,
  flaine,
  gressoney,
  grimentz,
  interlaken,
  isola2000,
  laax,
  laClusaz,
  lauterbrunnen,
  leGrandBornand,
  lesCarrozGrandMassif,
  lesGets,
  lesMenuires,
  madonnaDiCampiglio,
  megeve,
  montgenevre,
  saintGervais,
  samoens,
  serreChevalier,
  valDiFiemme,
  valThorens,
  wengen,
  zermatt,
];
