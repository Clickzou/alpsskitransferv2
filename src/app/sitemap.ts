import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { CHEMINS_NOINDEX } from "@/data/redirections";
import { AIRPORTS } from "@/lib/airports";
import { articlesPublies } from "@/lib/articles";
import { PAGES } from "@/lib/pages";
import { pagesDeLaLangue } from "@/lib/pages/intl";
import { PAYS } from "@/lib/pays";
import { LANGS_SECONDAIRES } from "@/lib/i18n";
import {
  cheminHubPays,
  cheminIndexAeroports,
  cheminIndexStations,
  cheminStation,
  cheminTrajet,
} from "@/lib/intl/liens";
import { hubsPaysDeLaLangue } from "@/lib/pays-intl";
import { RESORTS_MIGRES, SLUG_PAYS, resortsTraduits } from "@/lib/resorts";
import { segmentTrajet, TRANSFERS, trajetsTraduits } from "@/lib/transfers";
import { resortParSlug } from "@/lib/resorts";

/**
 * Sitemap dérivé des registres, jamais écrit à la main.
 *
 * Règle : aucune page noindex, aucune page non migrée, aucune page française
 * inexistante. Le sitemap du site actuel liste des pages en 404 et des pages du
 * tunnel de commande — c'est ce qu'on évite ici en dérivant tout de la donnée.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const modifie = new Date();

  const racines = [
    { path: "/", priorite: 1.0, frequence: "weekly" as const },
    { path: "/blog/", priorite: 0.7, frequence: "weekly" as const },
  ];

  // Hubs pays : têtes de silo, cibles de 13 redirections. Un pays sans station ni
  // aéroport n'a rien à montrer et ne rentre pas dans le sitemap.
  const hubsPays = Object.entries(PAYS)
    .filter(
      ([, pays]) =>
        RESORTS_MIGRES.some((r) => r.country === pays.code) ||
        AIRPORTS.some((a) => a.country === pays.code),
    )
    .map(([slug]) => ({
      url: absoluteUrl(`/${slug}/`),
      lastModified: modifie,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const hubsAeroport = AIRPORTS.map((a) => ({
    url: absoluteUrl(`/${SLUG_PAYS[a.country]}/${a.slug}/`),
    lastModified: modifie,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages fonctionnelles conservées du WordPress, sauf celles en noindex : le
  // sitemap du site actuel liste au contraire son panier et sa page de commande.
  const fonctionnelles = PAGES.filter((page) => !page.noindex).map((page) => ({
    url: absoluteUrl(`/${page.slug}/`),
    lastModified: modifie,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const stations = RESORTS_MIGRES.map((r) => ({
    url: absoluteUrl(`/${SLUG_PAYS[r.country]}/${r.slug}/`),
    lastModified: modifie,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const trajets = TRANSFERS.flatMap((t) => {
    const station = resortParSlug(t.resort);
    if (!station) return [];
    return [
      {
        url: absoluteUrl(
          `/${SLUG_PAYS[station.country]}/${station.slug}/${segmentTrajet(t.airport)}/`,
        ),
        lastModified: modifie,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ];
  });

  const articles = articlesPublies().map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}/`),
    lastModified: new Date(a.dateModification ?? a.datePublication),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  /*
    Les langues traduites : uniquement les pages qui existent réellement.

    Tout est dérivé des registres, y compris la présence de l'accueil et de
    l'index du blog. Une langue dont aucune station n'est traduite n'apparaît
    pas ici — et le sitemap du site actuel, qui liste des 404 et des pages de
    tunnel, est précisément ce que cette dérivation empêche.
  */
  const traduites = LANGS_SECONDAIRES.flatMap((lang) => {
    const stationsTraduites = resortsTraduits(lang);
    const articlesTraduits = articlesPublies().filter((a) => a.traductions?.[lang]);
    const pagesTraduites = pagesDeLaLangue(lang);

    // Une langue sans aucune page n'a pas d'accueil à annoncer.
    if (
      stationsTraduites.length === 0 &&
      pagesTraduites.length === 0 &&
      articlesTraduits.length === 0
    ) {
      return [];
    }

    return [
      {
        url: absoluteUrl(`/${lang}/`),
        lastModified: modifie,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      // Même règle que côté anglais : une page en noindex n'entre pas au sitemap.
      ...pagesTraduites
        .filter((page) => !page.noindex)
        .map((page) => ({
          url: absoluteUrl(`/${lang}/${page.slug}/`),
          lastModified: modifie,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })),
      // L'index du blog n'existe que s'il y a au moins un article traduit.
      ...(articlesTraduits.length > 0
        ? [
            {
              url: absoluteUrl(`/${lang}/blog/`),
              lastModified: modifie,
              changeFrequency: "weekly" as const,
              priority: 0.6,
            },
          ]
        : []),
      /*
        Les deux index et les hubs pays de la langue : la tête du silo traduit.
        Ils n'existent que si la langue a des stations — la condition est déjà
        posée plus haut, un index vide n'entrerait pas ici.
      */
      ...(stationsTraduites.length > 0
        ? [
            {
              url: absoluteUrl(cheminIndexStations(lang)),
              lastModified: modifie,
              changeFrequency: "weekly" as const,
              priority: 0.8,
            },
            {
              url: absoluteUrl(cheminIndexAeroports(lang)),
              lastModified: modifie,
              changeFrequency: "weekly" as const,
              priority: 0.7,
            },
          ]
        : []),
      ...hubsPaysDeLaLangue(lang)
        // Un hub dont le pays n'a aucune station traduite n'a rien à montrer.
        .filter((hub) => stationsTraduites.some((r) => r.country === hub.code))
        .map((hub) => ({
          url: absoluteUrl(cheminHubPays(lang, hub.slug)),
          lastModified: modifie,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ...stationsTraduites.map((r) => ({
        url: absoluteUrl(cheminStation(r, lang)!),
        lastModified: modifie,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      // Trajets : uniquement ceux dont la station ET le trajet sont traduits.
      ...trajetsTraduits(lang).flatMap((trajet) => {
        const station = stationsTraduites.find((r) => r.slug === trajet.resort);
        if (!station) return [];
        return [
          {
            url: absoluteUrl(cheminTrajet(station, trajet.airport, lang)!),
            lastModified: modifie,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ];
      }),
      ...articlesTraduits.map((a) => ({
        url: absoluteUrl(`/${lang}/blog/${a.traductions![lang]!.slug}/`),
        lastModified: new Date(a.dateModification ?? a.datePublication),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    ];
  });

  const pages = racines
    .filter((p) => !CHEMINS_NOINDEX.includes(p.path.replace(/\/$/, "")))
    .map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: modifie,
      changeFrequency: p.frequence,
      priority: p.priorite,
    }));

  return [
    ...pages,
    ...hubsPays,
    ...stations,
    ...trajets,
    ...hubsAeroport,
    ...fonctionnelles,
    ...articles,
    ...traduites,
  ];
}
