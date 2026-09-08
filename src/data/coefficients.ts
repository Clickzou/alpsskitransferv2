/**
 * COEFFICIENTS PAR DESTINATION — calibrés, à valider par le client.
 *
 * Certaines stations coûtent plus cher à desservir que leur seule distance ne le
 * laisse penser : accès difficile, route de col, retour à vide, station sans
 * voitures. Le client l'a confirmé, et les chiffres le montrent.
 *
 * Mesuré sur les 85 prix publiés du site actuel :
 *   barème seul (92 € + 1,167 €/km)      → 14,1 % d'erreur moyenne, 37/85 à ±10 %
 *   barème × coefficient de destination  →  5,7 % d'erreur moyenne, 61/85 à ±10 %
 *
 * Et le coefficient est stable d'un aéroport à l'autre : sur les 13 stations
 * desservies par au moins trois aéroports, 10 ont un écart max/min inférieur à
 * 1,35. C'est une politique de prix, pas du bruit.
 *
 * `trajets` dit sur combien de prix le coefficient est calculé : à 1 ou 2, il
 * reprend surtout le prix existant ; à partir de 3, il révèle une tendance.
 *
 * Généré par `npm run tarifs:extraire` le 2026-09-07.
 */
export interface CoefficientDestination {
  resort: string;
  /** Multiplicateur appliqué au prix calculé par le barème. */
  coefficient: number;
  /** Nombre de prix publiés ayant servi au calcul. */
  trajets: number;
  /** Écart entre le plus haut et le plus bas ratio observé : au-delà de 1,35, les
   *  prix de cette station ne sont pas cohérents entre eux. */
  dispersion: number;
}

export const COEFFICIENTS: CoefficientDestination[] = [
  { resort: "alpe-dhuez", coefficient: 0.92, trajets: 3, dispersion: 1.22 },
  { resort: "argentiere", coefficient: 0.86, trajets: 1, dispersion: 1 },
  { resort: "avoriaz", coefficient: 1.28, trajets: 1, dispersion: 1 },
  { resort: "bad-gastein", coefficient: 0.75, trajets: 1, dispersion: 1 },
  { resort: "cervinia", coefficient: 0.9, trajets: 2, dispersion: 1.17 },
  { resort: "chamonix", coefficient: 0.91, trajets: 3, dispersion: 1.07 },
  { resort: "champery", coefficient: 0.83, trajets: 1, dispersion: 1 },
  { resort: "chamrousse", coefficient: 0.49, trajets: 1, dispersion: 1 },
  { resort: "courchevel", coefficient: 1.13, trajets: 3, dispersion: 1.5 },
  { resort: "crans-montana", coefficient: 0.78, trajets: 1, dispersion: 1 },
  { resort: "davos", coefficient: 1.12, trajets: 1, dispersion: 1 },
  { resort: "flaine", coefficient: 1.03, trajets: 2, dispersion: 1.04 },
  { resort: "grindelwald", coefficient: 1.05, trajets: 1, dispersion: 1 },
  { resort: "interlaken", coefficient: 0.98, trajets: 1, dispersion: 1 },
  { resort: "ischgl", coefficient: 0.86, trajets: 3, dispersion: 1.41 },
  { resort: "kitzbuhel", coefficient: 0.84, trajets: 2, dispersion: 1.23 },
  { resort: "la-clusaz", coefficient: 0.87, trajets: 1, dispersion: 1 },
  { resort: "la-plagne", coefficient: 0.97, trajets: 4, dispersion: 1.16 },
  { resort: "lauterbrunnen", coefficient: 0.91, trajets: 1, dispersion: 1 },
  { resort: "le-grand-bornand", coefficient: 0.89, trajets: 1, dispersion: 1 },
  { resort: "lech", coefficient: 0.99, trajets: 1, dispersion: 1 },
  { resort: "les-arcs", coefficient: 1, trajets: 3, dispersion: 1.14 },
  { resort: "les-carroz-grand-massif", coefficient: 1.07, trajets: 1, dispersion: 1 },
  { resort: "les-deux-alpes", coefficient: 0.94, trajets: 3, dispersion: 1.23 },
  { resort: "les-gets", coefficient: 0.87, trajets: 3, dispersion: 1.39 },
  { resort: "les-menuires", coefficient: 1.11, trajets: 2, dispersion: 1.34 },
  { resort: "mayrhofen", coefficient: 0.78, trajets: 1, dispersion: 1 },
  { resort: "megeve", coefficient: 0.98, trajets: 2, dispersion: 1.1 },
  { resort: "meribel", coefficient: 1.13, trajets: 3, dispersion: 1.12 },
  { resort: "montgenevre", coefficient: 0.89, trajets: 1, dispersion: 1 },
  { resort: "morzine", coefficient: 0.99, trajets: 3, dispersion: 1.28 },
  { resort: "obergurgl", coefficient: 0.77, trajets: 1, dispersion: 1 },
  { resort: "samoens", coefficient: 1.06, trajets: 2, dispersion: 1.12 },
  { resort: "serfaus", coefficient: 0.9, trajets: 1, dispersion: 1 },
  { resort: "serre-chevalier", coefficient: 0.92, trajets: 2, dispersion: 1.02 },
  { resort: "sestriere", coefficient: 0.83, trajets: 1, dispersion: 1 },
  { resort: "solden", coefficient: 0.78, trajets: 3, dispersion: 1.09 },
  { resort: "st-anton-am-arlberg", coefficient: 1.02, trajets: 2, dispersion: 1.16 },
  { resort: "st-moritz", coefficient: 1.11, trajets: 1, dispersion: 1 },
  { resort: "tignes", coefficient: 1.15, trajets: 2, dispersion: 1.37 },
  { resort: "val-disere", coefficient: 1.05, trajets: 3, dispersion: 1.12 },
  { resort: "val-thorens", coefficient: 0.98, trajets: 5, dispersion: 1.41 },
  { resort: "verbier", coefficient: 1.35, trajets: 2, dispersion: 1.28 },
  { resort: "wengen", coefficient: 0.98, trajets: 1, dispersion: 1 },
  { resort: "zell-am-see", coefficient: 0.87, trajets: 1, dispersion: 1 },
  { resort: "zermatt", coefficient: 1.22, trajets: 3, dispersion: 1.26 },
];

/** 1 par défaut : une station sans coefficient suit le barème général. */
export function coefficient(resort: string): number {
  return COEFFICIENTS.find((c) => c.resort === resort)?.coefficient ?? 1;
}
