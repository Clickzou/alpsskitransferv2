import type { NomVisuel } from "@/components/Visuel";
import type { LangueSecondaire } from "@/lib/i18n";
import type { BlocContenu, Faq } from "@/lib/resorts/types";
import { PAGES_FR } from "./fr";
import { PAGES_DE } from "./de";
import { PAGES_IT } from "./it";

/**
 * Une page de conversion dans une langue autre que l'anglais.
 *
 * Périmètre arrêté le 8 septembre 2026 pour le français, étendu le 9 septembre
 * à l'allemand et à l'italien, et la logique est la même dans les trois : on
 * traduit **les pages de conversion**, pas le catalogue. Le comparable est
 * alps2alps, qui sur 1 946 URL n'en a que 31 en français — réserver, FAQ,
 * contact, transferts privés, agences — et aucune page de station traduite.
 *
 * Les pages juridiques (CGV, conditions de vente, confidentialité) restent en
 * anglais : les traduire sans validation juridique créerait deux versions
 * potentiellement divergentes d'un même engagement. Le pied de page le signale
 * par un `(EN)`.
 */
export interface PageIntl {
  slug: string;
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
  /**
   * Le visuel de tête.
   *
   * Les pages de conversion traduites ouvraient sur un aplat bleu nu quand les
   * stations, les trajets et les hubs portaient une photo — un écart qui se
   * voyait d'autant plus qu'elles sont les pages qui vendent. L'`alt` est
   * rédigé dans la langue de la page : c'est le texte que lit un lecteur
   * d'écran, et celui que Google associe à l'image.
   *
   * Les pages juridiques n'en ont pas : elles sont en `noindex`, on y vient
   * pour lire une mention, pas pour se projeter en montagne.
   */
  visuel?: { nom: NomVisuel; alt: string };
  /**
   * Une page locale : elle vise une ville, pas un massif.
   *
   * Sa présence fait émettre un `TaxiService` dont la zone desservie est ce
   * bassin de vie. Sans elle, la page n'a que le nœud national, qui ne dit rien
   * à une requête du type « VTC Chambéry ».
   */
  zoneLocale?: {
    /** Suffixe de l'`@id` du nœud : « vtc-chambery ». */
    id: string;
    /** Nom du service tel qu'il est rendu : « VTC et taxi à Chambéry ». */
    nom: string;
    communes: string[];
    departement?: string;
  };
  /**
   * Servie et suivie, mais hors index — mentions légales, politique de cookies.
   * Ces pages ne captent aucune requête et diluent le silo ; leurs liens, eux,
   * restent suivis, d'où `noindex` et non `noindex, nofollow`.
   */
  noindex?: boolean;
  /**
   * Chemin de la page anglaise équivalente, pour le `hreflang`.
   *
   * Absent = pas de paire, donc pas d'annonce. Une page de conversion écrite
   * pour un marché n'a pas toujours d'équivalent anglais, et en inventer un
   * ferait exactement le faux hreflang que ce projet corrige.
   */
  equivalentEn?: string;
}

const REGISTRES: Record<LangueSecondaire, PageIntl[]> = {
  fr: PAGES_FR,
  de: PAGES_DE,
  it: PAGES_IT,
};

/** Les pages de conversion publiées dans cette langue. */
export function pagesDeLaLangue(lang: LangueSecondaire): PageIntl[] {
  return REGISTRES[lang];
}

export function pageIntlParSlug(lang: LangueSecondaire, slug: string): PageIntl | undefined {
  return REGISTRES[lang].find((p) => p.slug === slug);
}

/**
 * Les langues dans lesquelles cette page anglaise a un équivalent.
 *
 * Sert au `hreflang` **depuis l'anglais** : c'est la seule façon d'annoncer une
 * paire dans les deux sens sans écrire la correspondance deux fois.
 */
export function traductionsDeLaPageEn(pathEn: string): { lang: LangueSecondaire; path: string }[] {
  const trouvees: { lang: LangueSecondaire; path: string }[] = [];
  for (const lang of Object.keys(REGISTRES) as LangueSecondaire[]) {
    const page = REGISTRES[lang].find((p) => p.equivalentEn === pathEn);
    if (page) trouvees.push({ lang, path: `/${lang}/${page.slug}/` });
  }
  return trouvees;
}
