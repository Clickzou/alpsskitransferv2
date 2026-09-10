import type { Metadata } from "next";
import { articlesPublies } from "@/lib/articles";
import type { LangueSecondaire } from "@/lib/i18n";
import { ACCUEIL } from "./accueil";
import {
  alternativesAccueil,
  alternativesArticle,
  alternativesHubPays,
  alternativesIndexAeroports,
  alternativesIndexBlog,
  alternativesIndexStations,
  alternativesPageIntl,
  alternativesStation,
  alternativesTrajet,
  cheminHubPays,
  cheminIndexAeroports,
  cheminIndexStations,
  cheminStation,
  cheminTrajet,
} from "./liens";
import { hubPaysParSlug, hubsPaysDeLaLangue } from "@/lib/pays-intl";
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
    noindex: page.noindex,
    alternatives: alternativesPageIntl(lang, page.equivalentEn),
  });
}

/* --------------------------------------------------------------- station */

/**
 * Les slugs servis par le segment `[station]` : les stations traduites **et**
 * les hubs pays de la langue.
 *
 * Next n'accepte qu'un segment dynamique par niveau, et le silo traduit a besoin
 * des deux — c'est le même aiguillage que `[silo]/[resort]` côté anglais, qui
 * sert les stations et les hubs d'aéroport. Le contrôle de collision est fait
 * ici : un hub dont le slug serait aussi celui d'une station masquerait la
 * station, et la faute passerait inaperçue jusqu'à ce qu'un visiteur tombe sur
 * la mauvaise page.
 */
export function paramsStations(lang: LangueSecondaire) {
  const stations = resortsTraduits(lang).map((r) => r.traductions![lang]!.slug);
  const hubs = hubsPaysDeLaLangue(lang).map((h) => h.slug);

  const collision = hubs.find((slug) => stations.includes(slug));
  if (collision) {
    throw new Error(
      `[${lang}] le hub pays « ${collision} » porte le slug d'une station : l'un des deux ne serait jamais servi.`,
    );
  }

  return [...stations, ...hubs].map((station) => ({ station }));
}

export function metadataStation(lang: LangueSecondaire, slug: string): Metadata {
  // Le segment sert aussi les hubs pays : ils passent en premier, ils sont peu
  // nombreux et leur slug est réservé.
  const hub = hubPaysParSlug(lang, slug);
  if (hub) {
    return pageMetadata({
      title: hub.metaTitre,
      description: hub.metaDescription,
      path: cheminHubPays(lang, hub.slug),
      lang,
      alternatives: alternativesHubPays(lang, hub),
    });
  }

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

/* ------------------------------------------------------------------ index */

export function metadataIndexStations(lang: LangueSecondaire): Metadata {
  const t = T(lang);
  return pageMetadata({
    title: t.index.stationsMeta,
    description: t.index.stationsMetaDescription,
    path: cheminIndexStations(lang),
    lang,
    alternatives: alternativesIndexStations(lang),
  });
}

export function metadataIndexAeroports(lang: LangueSecondaire): Metadata {
  const t = T(lang);
  return pageMetadata({
    title: t.index.aeroportsMeta,
    description: t.index.aeroportsMetaDescription,
    path: cheminIndexAeroports(lang),
    lang,
    alternatives: alternativesIndexAeroports(lang),
  });
}
