import type { Article } from "./types";
import { quelAeroportAlpes } from "./quel-aeroport-alpes";
import { reserverTransfertSki } from "./reserver-transfert-ski";
import { stationsSansVoitures } from "./stations-sans-voitures";
import { chamberyAirportSkiTransfers } from "./chamberyAirportSkiTransfers";
import { chamonixMorzineLesGetsFromGeneva } from "./chamonixMorzineLesGetsFromGeneva";
import { closestSkiResortsToGeneva } from "./closestSkiResortsToGeneva";
import { familySkiTransfersChildren } from "./familySkiTransfersChildren";
import { flightDelayedSkiTransfer } from "./flightDelayedSkiTransfer";
import { genevaOrLyonThreeValleys } from "./genevaOrLyonThreeValleys";
import { genevaToChamonix } from "./genevaToChamonix";
import { genevaToZermatt } from "./genevaToZermatt";
import { grenobleAirportSkiResorts } from "./grenobleAirportSkiResorts";
import { groupCorporateSkiTransfers } from "./groupCorporateSkiTransfers";
import { howSkiTransferPricesWork } from "./howSkiTransferPricesWork";
import { privateOrSharedSkiTransfer } from "./privateOrSharedSkiTransfer";
import { saturdayChangeoverDayAlps } from "./saturdayChangeoverDayAlps";
import { skisSnowboardsTransfer } from "./skisSnowboardsTransfer";
import { snowChainsWinterTyresAlps } from "./snowChainsWinterTyresAlps";
import { transferTrainOrRentalCarAlps } from "./transferTrainOrRentalCarAlps";
import { turinAirportSkiResorts } from "./turinAirportSkiResorts";
import { verbierCransMontanaTransfers } from "./verbierCransMontanaTransfers";
import { zurichOrGenevaSwissResorts } from "./zurichOrGenevaSwissResorts";

export type { Article } from "./types";

/**
 * Les 3 articles de démarrage du 8 septembre 2026, et les 17 du 15 septembre
 * (demande de JC : au moins une vingtaine).
 *
 * Les sujets du 15 suivent l'analyse des SERP concurrentes du 14 septembre
 * (`docs/concurrence/`, hors dépôt) : uniquement des sujets de **transfert** —
 * quel aéroport, comment venir, bagages, familles, samedi, prix —, jamais de
 * comparatif de stations, que Google donne aux forums et aux offices de
 * tourisme. Deux articles écrits restent en brouillon : « Chamonix, Morzine ou
 * Les Gets » (remplacé par « Genève → Chamonix ») et « groupes », qui aurait
 * concurrencé la page Groupes.
 *
 * Chaque article maille vers ses stations (`stationsLiees`) et surtout vers ses
 * pages de trajet (`trajetsLies`) ; les pages de station et de trajet affichent
 * en retour les articles qui les citent.
 */
export const ARTICLES: Article[] = [
  quelAeroportAlpes,
  stationsSansVoitures,
  reserverTransfertSki,
  genevaOrLyonThreeValleys,
  zurichOrGenevaSwissResorts,
  turinAirportSkiResorts,
  grenobleAirportSkiResorts,
  chamberyAirportSkiTransfers,
  closestSkiResortsToGeneva,
  genevaToChamonix,
  genevaToZermatt,
  verbierCransMontanaTransfers,
  flightDelayedSkiTransfer,
  saturdayChangeoverDayAlps,
  skisSnowboardsTransfer,
  familySkiTransfersChildren,
  snowChainsWinterTyresAlps,
  privateOrSharedSkiTransfer,
  transferTrainOrRentalCarAlps,
  howSkiTransferPricesWork,
  chamonixMorzineLesGetsFromGeneva,
  groupCorporateSkiTransfers,
];

export function articlesPublies() {
  return ARTICLES.filter((a) => !a.brouillon).sort((a, b) =>
    b.datePublication.localeCompare(a.datePublication),
  );
}

/** Les cartes par page de l’index du blog ; la page 1 y ajoute l’article à la une. */
export const PAR_PAGE_BLOG = 12;

/** Le nombre de pages de l’index : l’article à la une et 12 cartes en page 1, 12 cartes ensuite. */
export function nombrePagesBlog(): number {
  const n = articlesPublies().length;
  return n <= 1 + PAR_PAGE_BLOG ? 1 : 1 + Math.ceil((n - 1 - PAR_PAGE_BLOG) / PAR_PAGE_BLOG);
}

export function articleParSlug(slug: string) {
  return articlesPublies().find((a) => a.slug === slug);
}

/**
 * L'article précédent et le suivant, dans l'ordre du blog — demande de JC,
 * 15 septembre 2026. La chaîne relie chaque article à deux autres : aucun ne
 * reste orphelin, un robot parcourt tout le blog de proche en proche, et le
 * lecteur enchaîne. Le dernier renvoie au premier, pour que la chaîne boucle.
 */
export function articlesVoisins(slug: string) {
  const liste = articlesPublies();
  const i = liste.findIndex((a) => a.slug === slug);
  if (i === -1 || liste.length < 2) return { precedent: null, suivant: null };
  return {
    precedent: liste[(i - 1 + liste.length) % liste.length],
    suivant: liste[(i + 1) % liste.length],
  };
}

/** Articles qui mentionnent une station — maillage retour vers les pages de station. */
export function articlesDeLaStation(slugStation: string) {
  return articlesPublies().filter((a) => a.stationsLiees?.includes(slugStation));
}

/**
 * Articles qui servent un trajet — maillage retour vers les pages de trajet,
 * celles qui vendent. Ceux qui citent le trajet exact passent devant ceux qui
 * ne citent que sa station.
 */
export function articlesDuTrajet(airport: string, resort: string, limite = 3) {
  const exacts = articlesPublies().filter((a) =>
    a.trajetsLies?.some((t) => t.airport === airport && t.resort === resort),
  );
  const parStation = articlesDeLaStation(resort).filter((a) => !exacts.includes(a));
  return [...exacts, ...parStation].slice(0, limite);
}

/**
 * Les articles liés, calculés : ceux qui partagent le plus de trajets et de
 * stations avec celui-ci. Un lien entre deux articles qui parlent des mêmes
 * lieux sert le lecteur ; un lien au hasard ne sert personne.
 */
export function articlesLies(article: Article, limite = 3) {
  const trajets = new Set((article.trajetsLies ?? []).map((t) => `${t.airport}|${t.resort}`));
  const stations = new Set(article.stationsLiees ?? []);
  return articlesPublies()
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      a,
      score:
        (a.trajetsLies ?? []).filter((t) => trajets.has(`${t.airport}|${t.resort}`)).length * 2 +
        (a.stationsLiees ?? []).filter((s) => stations.has(s)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.datePublication.localeCompare(x.a.datePublication))
    .slice(0, limite)
    .map((x) => x.a);
}
