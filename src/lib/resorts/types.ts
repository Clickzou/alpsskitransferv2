import type { CodePays } from "@/lib/airports/types";
import type { LangueSecondaire } from "@/lib/i18n";

export type StatutMigration = "a-migrer" | "migre" | "a-reecrire";

/** Entrée du registre : ce que l'on sait d'une station avant migration. */
export interface ResortStub {
  slug: string;
  name: string;
  country: CodePays;
  status: StatutMigration;
}

export interface Faq {
  question: string;
  reponse: string;
}

export type BlocContenu =
  | { type: "titre2"; texte: string }
  | { type: "titre3"; texte: string }
  | { type: "paragraphe"; texte: string }
  | { type: "liste"; items: string[] };

/**
 * Page de station — page mère du silo.
 *
 * Le contenu de ces pages (≈ 1 100 mots utiles, H1 unique, H2 structurants,
 * comparatif d'aéroports, FAQ) est le bon contenu du site actuel : il se REPREND,
 * il ne se réécrit pas. Les `metaTitre` / `metaDescription` aussi — ils sont
 * rédigés à la main et bien calibrés.
 */
export interface Resort extends ResortStub {
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  /** Slugs des aéroports qui font une page de trajet vers cette station. */
  airports: string[];
  contenu: BlocContenu[];
  faq: Faq[];
  /**
   * Les traductions de la page, par langue. Une langue absente = pas de page
   * dans cette langue, et pas de `hreflang` : c'est la règle n°5 du projet, et
   * c'est ce qui distingue ce site de l'ancien, qui annonçait quatre langues
   * pour zéro traduction.
   */
  traductions?: Partial<Record<LangueSecondaire, TraductionStation>>;
}

/**
 * Une page de station dans une autre langue.
 *
 * Le `slug` est propre à la langue — `val-disere` en français, `soelden` en
 * allemand — parce que l'URL est un mot-clé avant d'être un identifiant. Le slug
 * anglais reste la clé qui relie les versions entre elles.
 */
export interface TraductionStation {
  slug: string;
  /**
   * Le nom de la station dans cette langue, quand il diffère.
   *
   * Rare mais réel : Montgenèvre est « Monginevro » en italien, et c'est sous
   * ce nom qu'un Italien la cherche. Absent, on retombe sur `Resort.name`, qui
   * porte déjà les accents et les tréma corrects.
   */
  nom?: string;
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  contenu: BlocContenu[];
  faq: Faq[];
}
