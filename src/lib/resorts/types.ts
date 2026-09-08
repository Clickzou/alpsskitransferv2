import type { CodePays } from "@/lib/airports/types";

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
  /** Traduction française. Absente = pas de page FR, pas de hreflang. */
  fr?: {
    slug: string;
    metaTitre: string;
    metaDescription: string;
    h1: string;
    chapo: string;
    contenu: BlocContenu[];
    faq: Faq[];
  };
}
