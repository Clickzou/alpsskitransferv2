import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { LOCALES, type Lang } from "@/lib/i18n";

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
   * Chemin de la version dans l'autre langue, S'IL EXISTE VRAIMENT.
   * Laisser vide sinon : un hreflang vers une page inexistante est exactement
   * ce que fait le site actuel, et c'est un défaut, pas une couverture.
   */
  alternate?: { lang: Lang; path: string };
  noindex?: boolean;
  image?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  lang,
  alternate,
  noindex = false,
  image,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? { ...OG_IMAGE, url: `${SITE.url}${image}` } : OG_IMAGE;

  const languages: Record<string, string> = { [LOCALES[lang]]: url };
  if (alternate) {
    languages[LOCALES[alternate.lang]] = absoluteUrl(alternate.path);
    // x-default pointe sur l'anglais, langue de référence du site.
    languages["x-default"] = lang === "en" ? url : absoluteUrl(alternate.path);
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages: alternate ? languages : undefined },
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
