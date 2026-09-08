export type CodePays = "AT" | "CH" | "DE" | "FR" | "IT";

export interface Airport {
  slug: string;
  name: string;
  /** Code IATA — utile pour les requêtes du type « GVA to Val Thorens ». */
  iata: string;
  country: CodePays;
  /** Nom français, quand la page FR du trajet existe. */
  nomFr?: string;
}
