import { RESORTS } from "./registry";
import { alpeDhuez } from "./alpe-dhuez";
import { andermatt } from "./andermatt";
import { avoriaz } from "./avoriaz";
import { cervinia } from "./cervinia";
import { chamonix } from "./chamonix";
import { cortina } from "./cortina";
import { courchevel } from "./courchevel";
import { courmayeur } from "./courmayeur";
import { davos } from "./davos";
import { grindelwald } from "./grindelwald";
import { gstaad } from "./gstaad";
import { ischgl } from "./ischgl";
import { kitzbuhel } from "./kitzbuhel";
import { laPlagne } from "./la-plagne";
import { laThuile } from "./la-thuile";
import { lesArcs } from "./les-arcs";
import { lesDeuxAlpes } from "./les-deux-alpes";
import { livigno } from "./livigno";
import { mayrhofen } from "./mayrhofen";
import { meribel } from "./meribel";
import { morzine } from "./morzine";
import { obergurgl } from "./obergurgl";
import { sauzeDoulx } from "./sauze-doulx";
import { selvaValGardena } from "./selva-val-gardena";
import { serfaus } from "./serfaus";
import { sestriere } from "./sestriere";
import { solden } from "./solden";
import { stAntonAmArlberg } from "./st-anton-am-arlberg";
import { stMoritz } from "./st-moritz";
import { tasch } from "./tasch";
import { tignes } from "./tignes";
import { valDisere } from "./val-disere";
import { verbier } from "./verbier";
import { villarsSurOllon } from "./villars-sur-ollon";
import { zellAmSee } from "./zell-am-see";
import { RESORTS_REDIGES } from "./rediges";
import { TRADUCTIONS_FR } from "./traductions-fr";
import type { Resort } from "./types";

export type { Resort, ResortStub, BlocContenu, Faq, StatutMigration } from "./types";
export { RESORTS, RESORTS_REDIGES };

/**
 * Les stations reprises du WordPress. **Bloc régénéré** à chaque
 * `npm run migrer:stations` : ne rien y ajouter à la main, ce serait effacé.
 */
const STATIONS_MIGREES: Resort[] = [
  alpeDhuez,
  andermatt,
  avoriaz,
  cervinia,
  chamonix,
  cortina,
  courchevel,
  courmayeur,
  davos,
  grindelwald,
  gstaad,
  ischgl,
  kitzbuhel,
  laPlagne,
  laThuile,
  lesArcs,
  lesDeuxAlpes,
  livigno,
  mayrhofen,
  meribel,
  morzine,
  obergurgl,
  sauzeDoulx,
  selvaValGardena,
  serfaus,
  sestriere,
  solden,
  stAntonAmArlberg,
  stMoritz,
  tasch,
  tignes,
  valDisere,
  verbier,
  villarsSurOllon,
  zellAmSee,
];

/**
 * Les stations qui ont réellement une page : celles reprises du WordPress et
 * celles rédigées à la main. Une station qui n'est pas ici n'a pas de page —
 * pas de page vide en ligne, jamais.
 */
export const RESORTS_MIGRES: Resort[] = [...STATIONS_MIGREES, ...RESORTS_REDIGES]
  // Les traductions vivent à part pour survivre à `migrer:stations`, qui réécrit
  // les modules repris du WordPress. On les recolle ici.
  .map((station) =>
    TRADUCTIONS_FR[station.slug] ? { ...station, fr: TRADUCTIONS_FR[station.slug] } : station,
  )
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function resortParSlug(slug: string) {
  return RESORTS_MIGRES.find((r) => r.slug === slug);
}

/** Les stations qui portent une traduction française complète. */
export function resortsFr() {
  return RESORTS_MIGRES.filter((r) => r.fr);
}

/** Slug de pays utilisé dans l'URL anglaise : `/france-ski-transfers/…`. */
export const SLUG_PAYS: Record<string, string> = {
  AT: "austria-ski-transfers",
  CH: "switzerland-ski-transfers",
  DE: "germany-ski-transfers",
  FR: "france-ski-transfers",
  IT: "italy-ski-transfers",
};
