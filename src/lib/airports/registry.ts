import type { Airport } from "./types";

/**
 * Les 31 aéroports desservis, extraits du catalogue WooCommerce du site actuel
 * (`Prix tarnsfers/woocommerce_ski_transfers_updated (1).csv`).
 *
 * Le catalogue d'origine est un produit cartésien 82 × 82 : il déclare des
 * transferts aéroport → aéroport et station → station qui ne correspondent à
 * aucune offre réelle. Seules les paires listées dans `resorts/*.ts`
 * (`airports`) font une page. Les tarifs ne sont PAS repris d'ici : la colonne
 * Price du CSV est très majoritairement vide ou à « ENTER PRICE ».
 */
export const AIRPORTS: Airport[] = [
  { slug: "innsbruck-airport", name: "Innsbruck Airport", iata: "INN", country: "AT" },
  { slug: "klagenfurt-airport", name: "Klagenfurt Airport", iata: "KLU", country: "AT" },
  { slug: "salzburg-airport", name: "Salzburg Airport", iata: "SZG", country: "AT" },
  { slug: "vienna-airport", name: "Vienna Airport", iata: "VIE", country: "AT" },
  { slug: "annecy-airport", name: "Annecy Airport", iata: "NCY", country: "FR" },
  { slug: "chambery-savoie-airport", name: "Chambéry-Savoie Airport", iata: "CMF", country: "FR" },
  { slug: "grenoble-isere-airport", name: "Grenoble-Isère Airport", iata: "GNB", country: "FR" },
  { slug: "lyon-airport", name: "Lyon Airport", iata: "LYS", country: "FR" },
  { slug: "marseille-provence-airport", name: "Marseille Provence Airport", iata: "MRS", country: "FR" },
  { slug: "montpellier-mediterranee-airport", name: "Montpellier-Méditerranée Airport", iata: "MPL", country: "FR" },
  { slug: "nice-airport", name: "Nice Airport", iata: "NCE", country: "FR" },
  { slug: "paris-charles-de-gaulle-airport", name: "Paris Charles de Gaulle Airport", iata: "CDG", country: "FR" },
  { slug: "paris-orly-airport", name: "Paris Orly Airport", iata: "ORY", country: "FR" },
  { slug: "friedrichshafen-airport", name: "Friedrichshafen Airport", iata: "FDH", country: "DE" },
  { slug: "memmingen-airport", name: "Memmingen Airport", iata: "FMM", country: "DE" },
  { slug: "munich-airport", name: "Munich Airport", iata: "MUC", country: "DE" },
  { slug: "stuttgart-airport", name: "Stuttgart Airport", iata: "STR", country: "DE" },
  { slug: "bergamo-airport", name: "Bergamo Airport", iata: "BGY", country: "IT" },
  { slug: "bologna-airport", name: "Bologna Airport", iata: "BLQ", country: "IT" },
  { slug: "brescia-montichiari-airport", name: "Brescia-Montichiari Airport", iata: "VBS", country: "IT" },
  { slug: "genoa-airport", name: "Genoa Airport", iata: "GOA", country: "IT" },
  { slug: "milan-linate-airport", name: "Milan-Linate Airport", iata: "LIN", country: "IT" },
  { slug: "milan-malpensa-airport", name: "Milan-Malpensa Airport", iata: "MXP", country: "IT" },
  { slug: "turin-airport", name: "Turin Airport", iata: "TRN", country: "IT" },
  { slug: "venice-airport", name: "Venice Airport", iata: "VCE", country: "IT" },
  { slug: "verona-airport", name: "Verona Airport", iata: "VRN", country: "IT" },
  { slug: "berne-airport", name: "Berne Airport", iata: "BRN", country: "CH" },
  { slug: "geneva-airport", name: "Geneva Airport", iata: "GVA", country: "CH" },
  { slug: "lugano-airport", name: "Lugano Airport", iata: "LUG", country: "CH" },
  { slug: "sion-airport", name: "Sion Airport", iata: "SIR", country: "CH" },
  { slug: "zurich-airport", name: "Zurich Airport", iata: "ZRH", country: "CH" },
];
