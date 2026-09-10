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
import { laPlagne } from "./la-plagne";
import { laThuile } from "./la-thuile";
import { lesArcs } from "./les-arcs";
import { lesDeuxAlpes } from "./les-deux-alpes";
import { livigno } from "./livigno";
import { meribel } from "./meribel";
import { morzine } from "./morzine";
import { sauzeDoulx } from "./sauze-doulx";
import { selvaValGardena } from "./selva-val-gardena";
import { sestriere } from "./sestriere";
import { stMoritz } from "./st-moritz";
import { tasch } from "./tasch";
import { tignes } from "./tignes";
import { valDisere } from "./val-disere";
import { verbier } from "./verbier";
import { villarsSurOllon } from "./villars-sur-ollon";
import { RESORTS_REDIGES } from "./rediges";
import { TRADUCTIONS_FR } from "./traductions-fr";
import { TRADUCTIONS_DE } from "./traductions-de";
import { TRADUCTIONS_IT } from "./traductions-it";
import type { Resort, TraductionStation } from "./types";
import { LANGS_SECONDAIRES, type LangueSecondaire } from "@/lib/i18n";

export type {
  Resort,
  ResortStub,
  BlocContenu,
  Faq,
  StatutMigration,
  TraductionStation,
} from "./types";
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
  laPlagne,
  laThuile,
  lesArcs,
  lesDeuxAlpes,
  livigno,
  meribel,
  morzine,
  sauzeDoulx,
  selvaValGardena,
  sestriere,
  stMoritz,
  tasch,
  tignes,
  valDisere,
  verbier,
  villarsSurOllon,
];

/** Les registres de traduction, par langue — la clé est le slug anglais. */
const REGISTRES: Record<LangueSecondaire, Record<string, TraductionStation>> = {
  fr: TRADUCTIONS_FR,
  de: TRADUCTIONS_DE,
  it: TRADUCTIONS_IT,
};

/**
 * Les stations qui ont réellement une page : celles reprises du WordPress et
 * celles rédigées à la main. Une station qui n'est pas ici n'a pas de page —
 * pas de page vide en ligne, jamais.
 */
export const RESORTS_MIGRES: Resort[] = [...STATIONS_MIGREES, ...RESORTS_REDIGES]
  // Les traductions vivent à part pour survivre à `migrer:stations`, qui réécrit
  // les modules repris du WordPress. On les recolle ici.
  .map((station) => {
    const traductions: Partial<Record<LangueSecondaire, TraductionStation>> = {};
    for (const lang of LANGS_SECONDAIRES) {
      const traduction = REGISTRES[lang][station.slug];
      if (traduction) traductions[lang] = traduction;
    }
    return Object.keys(traductions).length > 0 ? { ...station, traductions } : station;
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function resortParSlug(slug: string) {
  return RESORTS_MIGRES.find((r) => r.slug === slug);
}

/** Les stations qui portent une traduction complète dans cette langue. */
export function resortsTraduits(lang: LangueSecondaire) {
  return RESORTS_MIGRES.filter((r) => r.traductions?.[lang]);
}

/**
 * La station qui porte ce slug **dans cette langue**.
 *
 * Le slug traduit est propre à la langue — `soelden` en allemand contre
 * `solden` en anglais — donc on ne peut pas chercher sur le slug canonique.
 */
export function resortParSlugTraduit(lang: LangueSecondaire, slug: string) {
  return RESORTS_MIGRES.find((r) => r.traductions?.[lang]?.slug === slug);
}

/** Slug de pays utilisé dans l'URL anglaise : `/france-ski-transfers/…`. */
export const SLUG_PAYS: Record<string, string> = {
  AT: "austria-ski-transfers",
  CH: "switzerland-ski-transfers",
  DE: "germany-ski-transfers",
  FR: "france-ski-transfers",
  IT: "italy-ski-transfers",
};
