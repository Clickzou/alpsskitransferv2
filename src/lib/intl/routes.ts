import type { Metadata } from "next";
import { articlesPublies } from "@/lib/articles";
import type { LangueSecondaire } from "@/lib/i18n";
import { ACCUEIL } from "./accueil";
import {
  alternativesAccueil,
  alternativesArticle,
  alternativesIndexBlog,
  alternativesPageIntl,
  alternativesStation,
  alternativesTrajet,
  cheminStation,
  cheminTrajet,
} from "./liens";
import { T } from "./textes";
import { pageIntlParSlug, pagesDeLaLangue } from "@/lib/pages/intl";
import { resortParSlugTraduit, resortsTraduits } from "@/lib/resorts";
import { pageMetadata } from "@/lib/seo";
import {
  SEGMENTS_AEROPORT,
  aeroportDepuisSegment,
  transferParSlugs,
  trajetsTraduits,
} from "@/lib/transfers";

/**
 * Ce que chaque route traduite a besoin de savoir : quelles pages générer, et
 * quelles metadonnées leur donner.
 *
 * Next impose un segment statique par langue — `/fr/`, `/de/`, `/it/` — donc
 * trois arborescences de fichiers. Ce module fait que ces fichiers ne
 * contiennent aucune logique : ils appellent la fonction correspondante avec
 * leur langue, et c'est tout. Sans cela, la moindre correction de `hreflang`
 * serait à faire trois fois, et se ferait deux fois.
 */

/* ------------------------------------------------------------------ home */

export function metadataAccueil(lang: LangueSecondaire): Metadata {
  const contenu = ACCUEIL[lang];
  return pageMetadata({
    title: contenu.metaTitre,
    description: contenu.metaDescription,
    path: `/${lang}/`,
    lang,
    alternatives: alternativesAccueil(lang),
  });
}

/* -------------------------------------------------- pages de conversion */

export function paramsPages(lang: LangueSecondaire) {
  return pagesDeLaLangue(lang).map((p) => ({ page: p.slug }));
}

export function metadataPage(lang: LangueSecondaire, slug: string): Metadata {
  const page = pageIntlParSlug(lang, slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitre,
    description: page.metaDescription,
    path: `/${lang}/${page.slug}/`,
    lang,
    alternatives: alternativesPageIntl(lang, page.equivalentEn),
  });
}

/* --------------------------------------------------------------- station */

export function paramsStations(lang: LangueSecondaire) {
  return resortsTraduits(lang).map((r) => ({ station: r.traductions![lang]!.slug }));
}

export function metadataStation(lang: LangueSecondaire, slug: string): Metadata {
  const resort = resortParSlugTraduit(lang, slug);
  if (!resort) return {};
  const traduction = resort.traductions![lang]!;
  return pageMetadata({
    title: traduction.metaTitre,
    description: traduction.metaDescription,
    path: cheminStation(resort, lang)!,
    lang,
    alternatives: alternativesStation(resort, lang),
  });
}

/* ---------------------------------------------------------------- trajet */

export function paramsTrajets(lang: LangueSecondaire) {
  return trajetsTraduits(lang).flatMap((trajet) => {
    const station = resortsTraduits(lang).find((r) => r.slug === trajet.resort);
    if (!station) return [];
    return [
      {
        station: station.traductions![lang]!.slug,
        aeroport: SEGMENTS_AEROPORT[lang][trajet.airport].segment,
      },
    ];
  });
}

/**
 * Résout un couple `(station, aéroport)` traduit vers ses données.
 *
 * Renvoie `null` dès qu'une des trois briques manque — station traduite,
 * segment d'aéroport connu, trajet traduit. Une page fille sans page mère
 * n'est pas générée : `dynamicParams = false` la ferme en 404 propre.
 */
export function resoudreTrajet(
  lang: LangueSecondaire,
  slugStation: string,
  segment: string,
) {
  const resort = resortParSlugTraduit(lang, slugStation);
  const airport = aeroportDepuisSegment(lang, segment);
  if (!resort || !airport) return null;
  const trajet = transferParSlugs(airport, resort.slug);
  if (!trajet?.traductions?.[lang]) return null;
  return { resort, trajet };
}

export function metadataTrajet(
  lang: LangueSecondaire,
  slugStation: string,
  segment: string,
): Metadata {
  const donnees = resoudreTrajet(lang, slugStation, segment);
  if (!donnees) return {};
  const traduction = donnees.trajet.traductions![lang]!;
  return pageMetadata({
    title: traduction.metaTitre,
    description: traduction.metaDescription,
    path: cheminTrajet(donnees.resort, donnees.trajet.airport, lang)!,
    lang,
    alternatives: alternativesTrajet(donnees.trajet, donnees.resort, lang),
  });
}

/* ------------------------------------------------------------------ blog */

export function articlesDeLaLangue(lang: LangueSecondaire) {
  return articlesPublies().filter((a) => a.traductions?.[lang]);
}

export function paramsArticles(lang: LangueSecondaire) {
  return articlesDeLaLangue(lang).map((a) => ({ slug: a.traductions![lang]!.slug }));
}

export function articleParSlugTraduit(lang: LangueSecondaire, slug: string) {
  return articlesDeLaLangue(lang).find((a) => a.traductions![lang]!.slug === slug);
}

export function metadataIndexBlog(lang: LangueSecondaire): Metadata {
  const t = T(lang);
  return pageMetadata({
    title: t.blogTitre,
    description: t.blogChapo,
    path: `/${lang}/blog/`,
    lang,
    alternatives: alternativesIndexBlog(articlesPublies(), lang),
  });
}

export function metadataArticle(lang: LangueSecondaire, slug: string): Metadata {
  const article = articleParSlugTraduit(lang, slug);
  if (!article) return {};
  const traduction = article.traductions![lang]!;
  return pageMetadata({
    title: traduction.metaTitre,
    description: traduction.metaDescription,
    path: `/${lang}/blog/${traduction.slug}/`,
    lang,
    alternatives: alternativesArticle(article, lang),
    image: article.image?.src,
  });
}
