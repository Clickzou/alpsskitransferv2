import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { LOCALES, type Alternative, type Lang } from "@/lib/i18n";

export const LIMITE_TITLE = 60;
export const LIMITE_DESCRIPTION = 155;

export const OG_IMAGE = {
  url: `${SITE.url}/images/og-alpsskitransfers.jpg`,
  width: 1200,
  height: 630,
  alt: "Alps Ski Transfers — airport transfers to the Alps",
};

/** URL absolue, toujours avec trailing slash (forme canonique du site). */
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE.url}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  /**
   * Les autres langues dans lesquelles CETTE page existe vraiment.
   *
   * Vide = aucune annonce. Un `hreflang` vers une page inexistante est
   * précisément ce que fait l'ancien site — il annonce quatre langues dont
   * aucune n'a de contenu — et c'est un défaut, pas une couverture.
   *
   * Le tableau remplace l'ancien `alternate` unique : avec quatre langues, une
   * page peut avoir jusqu'à trois voisines, et n'en déclarer qu'une reviendrait
   * à cacher les autres à Google.
   */
  alternatives?: Alternative[];
  noindex?: boolean;
  image?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  lang,
  alternatives = [],
  noindex = false,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? { ...OG_IMAGE, url: `${SITE.url}${image}` } : OG_IMAGE;

  /*
    Le groupe hreflang doit être complet et réciproque : chaque page du groupe
    déclare toutes les autres ET elle-même. Une page qui s'omet du groupe qu'elle
    annonce est ignorée par Google.
  */
  const languages: Record<string, string> = { [LOCALES[lang]]: url };
  for (const autre of alternatives) {
    languages[LOCALES[autre.lang]] = absoluteUrl(autre.path);
  }

  if (alternatives.length > 0) {
    // x-default pointe sur l'anglais, langue de référence du site — et sur la
    // page courante si c'est elle qui est anglaise.
    const anglaise = lang === "en" ? url : alternatives.find((a) => a.lang === "en")?.path;
    languages["x-default"] = anglaise ? absoluteUrl(anglaise) : url;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternatives.length > 0 ? languages : undefined,
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      locale: LOCALES[lang],
      siteName: SITE.nom,
      title,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
