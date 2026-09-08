/**
 * Bilinguisme : anglais d'abord, français page par page.
 *
 * L'anglais couvre l'intégralité du site et vit à la racine — c'est la forme
 * indexée aujourd'hui, on n'y touche pas. Le français vit sous `/fr/` et n'est
 * généré que pour les entités qui portent une traduction complète.
 *
 * Règle non négociable (constat de l'audit) : le site actuel annonce EN / ES /
 * DE / IT dans son menu alors qu'aucune version n'existe — `/es/` est en 404 et
 * `/de/`, `/it/`, `/fr/` redirigent vers des pages sans rapport — et ne déclare
 * aucun hreflang. Ici, un `hreflang` n'est émis QUE sur une paire réellement
 * existante, et le sélecteur de langue n'affiche le français que là où il existe.
 */
export const LANGS = ["en", "fr"] as const;
export type Lang = (typeof LANGS)[number];

export const LOCALES: Record<Lang, string> = {
  en: "en-GB",
  fr: "fr-FR",
};

/** Préfixe d'URL de la langue. L'anglais n'en a pas : il est à la racine. */
export function prefixe(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

/**
 * Racine du silo des stations, par langue.
 * EN : `/{country}-ski-transfers/{resort}/` — conservée du site actuel, ces
 * 40 URL portent l'antériorité et le meilleur contenu du site.
 * FR : `/fr/transferts-ski/{station}/` — aucune antériorité à préserver côté
 * français, donc une forme plus courte et lisible.
 */
export function racineSilo(lang: Lang, countrySlug: string): string {
  return lang === "en" ? `/${countrySlug}` : "/fr/transferts-ski";
}
