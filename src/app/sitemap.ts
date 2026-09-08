import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { CHEMINS_NOINDEX } from "@/data/redirections";
import { AIRPORTS } from "@/lib/airports";
import { articlesPublies } from "@/lib/articles";
import { PAGES } from "@/lib/pages";
import { PAGES_FR } from "@/lib/pages/fr";
import { PAYS } from "@/lib/pays";
import { RESORTS_MIGRES, SLUG_PAYS, resortsFr } from "@/lib/resorts";
import { SEGMENTS_FR, segmentTrajet, TRANSFERS, trajetsFr } from "@/lib/transfers";
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

  // Français : uniquement les pages qui existent réellement.
  const francais = [
    ...(resortsFr().length > 0
      ? [
          {
            url: absoluteUrl("/fr/"),
            lastModified: modifie,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    // Les pages de conversion francaises.
    ...PAGES_FR.map((page) => ({
      url: absoluteUrl(`/fr/${page.slug}/`),
      lastModified: modifie,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    // La liste du blog francais : elle n'existe que s'il y a des articles traduits.
    ...(articlesPublies().some((a) => a.fr)
      ? [
          {
            url: absoluteUrl("/fr/blog/"),
            lastModified: modifie,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...resortsFr().map((r) => ({
      url: absoluteUrl(`/fr/transferts-ski/${r.fr!.slug}/`),
      lastModified: modifie,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Trajets francais : uniquement ceux dont la station ET le trajet sont traduits.
    ...trajetsFr().flatMap((trajet) => {
      const station = resortsFr().find((r) => r.slug === trajet.resort);
      if (!station) return [];
      return [
        {
          url: absoluteUrl(
            `/fr/transferts-ski/${station.fr!.slug}/${SEGMENTS_FR[trajet.airport].segment}/`,
          ),
          lastModified: modifie,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      ];
    }),
    ...articlesPublies()
      .filter((a) => a.fr)
      .map((a) => ({
        url: absoluteUrl(`/fr/blog/${a.fr!.slug}/`),
        lastModified: new Date(a.dateModification ?? a.datePublication),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
  ];

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
    ...francais,
  ];
}
