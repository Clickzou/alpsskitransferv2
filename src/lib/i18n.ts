/**
 * Les langues du site.
 *
 * L'anglais couvre l'intégralité du site et vit à la racine — c'est la forme
 * indexée aujourd'hui, on n'y touche pas. Les autres langues vivent sous leur
 * préfixe et ne sont générées que pour les entités qui portent une traduction
 * complète.
 *
 * **Règle non négociable, et c'est le constat n°1 de l'audit :** le site actuel
 * annonce EN / ES / DE / IT dans son menu alors qu'aucune version n'existe —
 * `/es/` est en 404, `/de/`, `/it/` et `/fr/` redirigent vers des pages sans
 * rapport — et il ne déclare aucun hreflang. Ici, un `hreflang` n'est émis QUE
 * sur une paire réellement existante, et le sélecteur de langue n'affiche une
 * langue que là où la page existe. Une langue vide ne s'annonce pas.
 *
 * ## Pourquoi l'allemand et l'italien, et pas l'espagnol
 *
 * Choix arrêté le 10 septembre 2026, sur les données de l'audit. La clientèle du
 * transfert alpin est UK, néerlandaise, belge et allemande ; l'allemand est même
 * le marché le plus prometteur après l'anglais — Innsbruck, Salzbourg et Zurich
 * sont desservis, l'Autriche et la Suisse alémanique ont un fort pouvoir
 * d'achat, et le site y est déjà classé, mal. L'italien suit, porté par Cervinia,
 * Courmayeur, Sestriere et la Voie Lactée. L'espagnol et le portugais ne sont
 * pas des marchés du ski alpin : même coût de traduction, trafic quasi nul.
 */
export const LANGS = ["en", "fr", "de", "it"] as const;
export type Lang = (typeof LANGS)[number];

export const LOCALES: Record<Lang, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
};

/**
 * Les langues qui vivent sous un préfixe, c'est-à-dire toutes sauf l'anglais.
 *
 * Le type existe pour que les registres de traduction soient indexés par langue
 * plutôt que d'ajouter une clé `fr`, puis `de`, puis `it` : ajouter une langue
 * doit être une ligne de données, jamais une branche de code de plus.
 */
export const LANGS_SECONDAIRES = ["fr", "de", "it"] as const;
export type LangueSecondaire = (typeof LANGS_SECONDAIRES)[number];

/** Le nom de la langue, dans sa propre langue — c'est ainsi qu'on la reconnaît. */
export const NOMS_LANGUES: Record<Lang, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

/** Préfixe d'URL de la langue. L'anglais n'en a pas : il est à la racine. */
export function prefixe(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

/**
 * Segment du silo des stations, par langue.
 *
 * L'anglais garde le pattern des 40 pages existantes — ce sont elles qui portent
 * l'antériorité. Les autres langues n'ont rien à préserver : elles prennent la
 * forme la plus lisible dans leur propre langue, et le mot-clé du segment y est
 * celui que le marché tape réellement.
 */
export const SEGMENT_STATIONS: Record<LangueSecondaire, string> = {
  fr: "transferts-ski",
  de: "skitransfer",
  it: "trasferimenti-sci",
};

/**
 * Racine du silo des stations, par langue.
 * EN : `/{country}-ski-transfers/{resort}/`
 * FR : `/fr/transferts-ski/{station}/`
 * DE : `/de/skitransfer/{station}/`
 * IT : `/it/trasferimenti-sci/{station}/`
 */
export function racineSilo(lang: Lang, countrySlug: string): string {
  return lang === "en" ? `/${countrySlug}` : `/${lang}/${SEGMENT_STATIONS[lang]}`;
}

/** Une page qui existe dans une autre langue. */
export interface Alternative {
  lang: Lang;
  path: string;
}
