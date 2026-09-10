import type { Article } from "@/lib/articles/types";
import {
  LANGS,
  LANGS_SECONDAIRES,
  SEGMENT_AEROPORTS,
  SEGMENT_STATIONS,
  type Alternative,
  type Lang,
  type LangueSecondaire,
} from "@/lib/i18n";
import { traductionsDeLaPageEn } from "@/lib/pages/intl";
import { HUBS_PAYS, type HubPaysIntl } from "@/lib/pays-intl";
import { SLUG_PAYS, resortsTraduits, type Resort } from "@/lib/resorts";
import { SEGMENTS_AEROPORT, segmentTrajet, type Transfer } from "@/lib/transfers";

/**
 * Les liens entre versions linguistiques d'une même page.
 *
 * Un seul endroit calcule ces paires, et il en découle deux choses qui doivent
 * rester vraies partout : le `hreflang` des metadonnées et le sélecteur de
 * langue de l'en-tête montrent **exactement le même groupe**. Les faire diriger
 * par deux calculs séparés, c'est se garantir qu'ils divergeront — et un
 * sélecteur qui propose une langue que le hreflang ne déclare pas est le même
 * défaut que celui relevé sur l'ancien site, en plus discret.
 *
 * Toutes ces fonctions renvoient les **autres** langues, jamais la courante :
 * c'est ce dont le sélecteur a besoin. `pageMetadata` remet la courante dans le
 * groupe hreflang, où elle doit figurer.
 */

/* ------------------------------------------------------------------ home */

/**
 * L'accueil existe dans les quatre langues, c'est le seul cas où la paire est
 * garantie sans vérification.
 */
export function alternativesAccueil(courante: Lang): Alternative[] {
  return LANGS.filter((l) => l !== courante).map((lang) => ({
    lang,
    path: lang === "en" ? "/" : `/${lang}/`,
  }));
}

/* --------------------------------------------------------------- station */

export function cheminStation(resort: Resort, lang: Lang): string | undefined {
  if (lang === "en") return `/${SLUG_PAYS[resort.country]}/${resort.slug}/`;
  const traduction = resort.traductions?.[lang];
  if (!traduction) return undefined;
  return `/${lang}/${SEGMENT_STATIONS[lang]}/${traduction.slug}/`;
}

export function alternativesStation(resort: Resort, courante: Lang): Alternative[] {
  return LANGS.flatMap((lang) => {
    if (lang === courante) return [];
    const path = cheminStation(resort, lang);
    return path ? [{ lang, path }] : [];
  });
}

/* ---------------------------------------------------------------- trajet */

export function cheminTrajet(resort: Resort, airport: string, lang: Lang): string | undefined {
  if (lang === "en") {
    return `/${SLUG_PAYS[resort.country]}/${resort.slug}/${segmentTrajet(airport)}/`;
  }
  const station = resort.traductions?.[lang];
  const aeroport = SEGMENTS_AEROPORT[lang][airport];
  if (!station || !aeroport) return undefined;
  return `/${lang}/${SEGMENT_STATIONS[lang]}/${station.slug}/${aeroport.segment}/`;
}

/**
 * Les autres langues d'une page de trajet.
 *
 * Un trajet n'a de version dans une langue que si les trois briques sont là :
 * le texte du trajet, la station mère traduite, et un segment d'URL pour
 * l'aéroport. Manque l'une, la page n'existe pas — et ne s'annonce donc pas.
 */
export function alternativesTrajet(
  trajet: Transfer,
  resort: Resort,
  courante: Lang,
): Alternative[] {
  return LANGS.flatMap((lang) => {
    if (lang === courante) return [];
    if (lang !== "en" && !trajet.traductions?.[lang]) return [];
    const path = cheminTrajet(resort, trajet.airport, lang);
    return path ? [{ lang, path }] : [];
  });
}

/* ------------------------------------------------- page de conversion */

/**
 * Les autres langues d'une page de conversion traduite.
 *
 * La correspondance passe par `equivalentEn`, écrit une seule fois dans le
 * registre de chaque langue. Deux pages traduites qui pointent la même page
 * anglaise sont donc, par construction, sœurs entre elles.
 */
export function alternativesPageIntl(
  courante: LangueSecondaire,
  equivalentEn: string | undefined,
): Alternative[] {
  if (!equivalentEn) return [];
  return [
    { lang: "en" as Lang, path: equivalentEn },
    ...traductionsDeLaPageEn(equivalentEn)
      .filter((p) => p.lang !== courante)
      .map((p) => ({ lang: p.lang as Lang, path: p.path })),
  ];
}

/** Les autres langues d'une page anglaise, vues depuis l'anglais. */
export function alternativesPageEn(pathEn: string): Alternative[] {
  return traductionsDeLaPageEn(pathEn).map((p) => ({ lang: p.lang as Lang, path: p.path }));
}

/* ------------------------------------------------------------------ blog */

export function cheminArticle(article: Article, lang: Lang): string | undefined {
  if (lang === "en") return `/blog/${article.slug}/`;
  const traduction = article.traductions?.[lang];
  return traduction ? `/${lang}/blog/${traduction.slug}/` : undefined;
}

export function alternativesArticle(article: Article, courante: Lang): Alternative[] {
  return LANGS.flatMap((lang) => {
    if (lang === courante) return [];
    const path = cheminArticle(article, lang);
    return path ? [{ lang, path }] : [];
  });
}

/**
 * Les autres langues de l'index du blog.
 *
 * `/xx/blog/` n'existe que si cette langue a au moins un article : un index
 * vide n'est pas une page, c'est une promesse non tenue.
 */
export function alternativesIndexBlog(articles: Article[], courante: Lang): Alternative[] {
  const avecArticles = LANGS_SECONDAIRES.filter((lang) =>
    articles.some((a) => a.traductions?.[lang]),
  );
  return [
    ...(courante === "en" ? [] : [{ lang: "en" as Lang, path: "/blog/" }]),
    ...avecArticles
      .filter((lang) => lang !== courante)
      .map((lang) => ({ lang: lang as Lang, path: `/${lang}/blog/` })),
  ];
}

/* -------------------------------------------------------- hub pays traduit */

/** Le chemin d'un hub pays dans sa langue. */
export function cheminHubPays(lang: LangueSecondaire, slug: string): string {
  return `/${lang}/${SEGMENT_STATIONS[lang]}/${slug}/`;
}

/**
 * Les autres langues d'un hub pays traduit.
 *
 * La correspondance passe par `equivalentEn` : deux hubs qui pointent le même
 * hub anglais sont sœurs entre elles. C'est le mécanisme des pages de
 * conversion, appliqué au silo — écrire la correspondance deux fois serait
 * s'assurer qu'elle diverge.
 */
export function alternativesHubPays(
  courante: LangueSecondaire,
  hub: HubPaysIntl,
): Alternative[] {
  return [
    { lang: "en" as Lang, path: hub.equivalentEn },
    ...(Object.keys(HUBS_PAYS) as LangueSecondaire[]).flatMap((lang) =>
      lang === courante
        ? []
        : HUBS_PAYS[lang]
            .filter((autre) => autre.equivalentEn === hub.equivalentEn)
            .map((autre) => ({ lang: lang as Lang, path: cheminHubPays(lang, autre.slug) })),
    ),
  ];
}

/** Les langues où ce hub pays anglais a une version traduite. */
export function alternativesHubPaysEn(siloEn: string): Alternative[] {
  return (Object.keys(HUBS_PAYS) as LangueSecondaire[]).flatMap((lang) =>
    HUBS_PAYS[lang]
      .filter((hub) => hub.equivalentEn === `/${siloEn}/`)
      .map((hub) => ({ lang: lang as Lang, path: cheminHubPays(lang, hub.slug) })),
  );
}

/* ------------------------------------------------------------------ index */

/** L'index des stations d'une langue — la racine de son silo. */
export function cheminIndexStations(lang: LangueSecondaire): string {
  return `/${lang}/${SEGMENT_STATIONS[lang]}/`;
}

/** L'index des aéroports d'une langue. */
export function cheminIndexAeroports(lang: LangueSecondaire): string {
  return `/${lang}/${SEGMENT_AEROPORTS[lang]}/`;
}

/**
 * Les langues qui ont un index — c'est-à-dire au moins une station traduite.
 *
 * Un index vide n'est pas une page : c'est la même règle que pour l'index du
 * blog, et elle vaut ici pour la même raison.
 */
function languesAvecSilo(): LangueSecondaire[] {
  return LANGS_SECONDAIRES.filter((lang) => resortsTraduits(lang).length > 0);
}

export function alternativesIndexStations(courante: Lang): Alternative[] {
  return [
    ...(courante === "en" ? [] : [{ lang: "en" as Lang, path: "/ski-resort-transfers/" }]),
    ...languesAvecSilo()
      .filter((lang) => lang !== courante)
      .map((lang) => ({ lang: lang as Lang, path: cheminIndexStations(lang) })),
  ];
}

export function alternativesIndexAeroports(courante: Lang): Alternative[] {
  return [
    ...(courante === "en" ? [] : [{ lang: "en" as Lang, path: "/airport-ski-transfers/" }]),
    ...languesAvecSilo()
      .filter((lang) => lang !== courante)
      .map((lang) => ({ lang: lang as Lang, path: cheminIndexAeroports(lang) })),
  ];
}

/**
 * Les traductions d'une page fonctionnelle anglaise, quelle que soit leur forme.
 *
 * Trois cas, un seul point d'appel : les deux index du silo, dont le pendant
 * traduit est une page dérivée et non une entrée de registre, et tout le reste,
 * qui passe par `equivalentEn`.
 *
 * Sans cette fonction, le `hreflang` restait **unilatéral** : les pages
 * traduites déclaraient l'anglais, l'anglais ne déclarait rien. Google demande
 * la réciprocité — une déclaration qui ne revient pas est ignorée, et les
 * traductions ne comptaient donc pas.
 */
export function alternativesPageFonctionnelleEn(slug: string): Alternative[] {
  if (slug === "ski-resort-transfers") return alternativesIndexStations("en");
  if (slug === "airport-ski-transfers") return alternativesIndexAeroports("en");
  return alternativesPageEn(`/${slug}/`);
}
