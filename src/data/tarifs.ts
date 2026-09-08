/**
 * GRILLE TARIFAIRE — PROPOSITION, PAS ENCORE VALIDÉE PAR LE CLIENT.
 *
 * Générée par `npm run tarifs:extraire` depuis le texte des pages de trajet, faute
 * de mieux : la base WooCommerce ne contient aucune grille (4 lignes de
 * disponibilité, 10 commandes sur un produit générique). Ce sont donc les prix
 * *publiés* sur le site, pas des prix issus d'un catalogue.
 *
 * `valide: false` tant que le client n'a pas confirmé, et le moteur de
 * réservation doit refuser de vendre un trajet non validé.
 *
 * 89 trajets, générés le 2026-09-07.
 */
export interface Tarif {
  /** Slug d'aéroport. */
  airport: string;
  /** Slug de station. */
  resort: string;
  /** Prix par véhicule, transfert privé. */
  prive: number | null;
  /** Prix par personne, transfert partagé. */
  partage: number | null;
  /** Devise citée sur la page d'origine. */
  devise: "EUR" | "GBP" | "USD";
  /** Distance en kilomètres, telle qu'annoncée. */
  km: number | null;
  /** Durée en minutes, telle qu'annoncée. */
  duree: number | null;
  /** Passe à true quand le client a confirmé le tarif. */
  valide: boolean;
}

export const TARIFS: Tarif[] = [
  { airport: "bergamo-airport", resort: "lauterbrunnen", prive: 420, partage: 85, devise: "EUR", km: 280, duree: 270, valide: false },
  { airport: "bergamo-airport", resort: "zermatt", prive: 420, partage: 95, devise: "EUR", km: 230, duree: 210, valide: false },
  { airport: "chambery-savoie-airport", resort: "chamonix", prive: 220, partage: 50, devise: "EUR", km: 130, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "courchevel", prive: 250, partage: 50, devise: "EUR", km: 110, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "flaine", prive: 240, partage: 45, devise: "EUR", km: 120, duree: 90, valide: false },
  { airport: "chambery-savoie-airport", resort: "la-plagne", prive: 220, partage: 50, devise: "EUR", km: 110, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "les-arcs", prive: 250, partage: 50, devise: "EUR", km: 125, duree: 135, valide: false },
  { airport: "chambery-savoie-airport", resort: "les-gets", prive: 220, partage: 45, devise: "EUR", km: 110, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "les-menuires", prive: 250, partage: 50, devise: "EUR", km: 110, duree: 105, valide: false },
  { airport: "chambery-savoie-airport", resort: "megeve", prive: 180, partage: 45, devise: "EUR", km: 90, duree: 90, valide: false },
  { airport: "chambery-savoie-airport", resort: "meribel", prive: 250, partage: 50, devise: "EUR", km: 102, duree: 90, valide: false },
  { airport: "chambery-savoie-airport", resort: "morzine", prive: 260, partage: 45, devise: "EUR", km: 120, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "samoens", prive: 240, partage: 50, devise: "EUR", km: 120, duree: 60, valide: false },
  { airport: "chambery-savoie-airport", resort: "val-disere", prive: 290, partage: 60, devise: "EUR", km: 140, duree: 150, valide: false },
  { airport: "chambery-savoie-airport", resort: "val-thorens", prive: 220, partage: 45, devise: "EUR", km: 120, duree: 105, valide: false },
  { airport: "geneva-airport", resort: "alpe-dhuez", prive: 350, partage: 80, devise: "EUR", km: 210, duree: 195, valide: false },
  { airport: "geneva-airport", resort: "argentiere", prive: 180, partage: 35, devise: "EUR", km: 100, duree: 90, valide: false },
  { airport: "geneva-airport", resort: "avoriaz", prive: 250, partage: 50, devise: "EUR", km: 80, duree: 60, valide: false },
  { airport: "geneva-airport", resort: "cervinia", prive: 290, partage: 50, devise: "EUR", km: 180, duree: 165, valide: false },
  { airport: "geneva-airport", resort: "chamonix", prive: 180, partage: 35, devise: "EUR", km: 88, duree: 75, valide: false },
  { airport: "geneva-airport", resort: "courchevel", prive: 390, partage: 80, devise: "EUR", km: 140, duree: 150, valide: false },
  { airport: "geneva-airport", resort: "flaine", prive: 190, partage: 40, devise: "EUR", km: 75, duree: 90, valide: false },
  { airport: "geneva-airport", resort: "la-clusaz", prive: 140, partage: 40, devise: "EUR", km: 65, duree: 75, valide: false },
  { airport: "geneva-airport", resort: "la-plagne", prive: 290, partage: 55, devise: "EUR", km: 150, duree: 120, valide: false },
  { airport: "geneva-airport", resort: "le-grand-bornand", prive: 140, partage: 35, devise: "EUR", km: 65, duree: 70, valide: false },
  { airport: "geneva-airport", resort: "les-arcs", prive: 280, partage: 55, devise: "EUR", km: 150, duree: 120, valide: false },
  { airport: "geneva-airport", resort: "les-carroz-grand-massif", prive: 180, partage: 45, devise: "EUR", km: 55, duree: 70, valide: false },
  { airport: "geneva-airport", resort: "les-deux-alpes", prive: 350, partage: 80, devise: "EUR", km: 210, duree: 195, valide: false },
  { airport: "geneva-airport", resort: "les-gets", prive: 150, partage: 40, devise: "EUR", km: 65, duree: 75, valide: false },
  { airport: "geneva-airport", resort: "megeve", prive: 180, partage: 45, devise: "EUR", km: 70, duree: 75, valide: false },
  { airport: "geneva-airport", resort: "meribel", prive: 290, partage: 65, devise: "EUR", km: 135, duree: 150, valide: false },
  { airport: "geneva-airport", resort: "morzine", prive: 180, partage: 40, devise: "EUR", km: 80, duree: 90, valide: false },
  { airport: "geneva-airport", resort: "samoens", prive: 160, partage: 40, devise: "EUR", km: 70, duree: 75, valide: false },
  { airport: "geneva-airport", resort: "tignes", prive: 350, partage: 75, devise: "EUR", km: 180, duree: 300, valide: false },
  { airport: "geneva-airport", resort: "val-disere", prive: 320, partage: 70, devise: "EUR", km: 220, duree: 300, valide: false },
  { airport: "geneva-airport", resort: "val-thorens", prive: 350, partage: 60, devise: "EUR", km: 150, duree: 165, valide: false },
  { airport: "geneva-airport", resort: "verbier", prive: 380, partage: 50, devise: "EUR", km: 160, duree: 60, valide: false },
  { airport: "geneva-airport", resort: "zermatt", prive: 450, partage: 95, devise: "EUR", km: 230, duree: 210, valide: false },
  { airport: "grenoble-isere-airport", resort: "alpe-dhuez", prive: 180, partage: 45, devise: "EUR", km: 65, duree: 90, valide: false },
  { airport: "grenoble-isere-airport", resort: "chamonix", prive: 320, partage: 55, devise: "EUR", km: 220, duree: 150, valide: false },
  { airport: "grenoble-isere-airport", resort: "chamrousse", prive: 90, partage: 30, devise: "EUR", km: 35, duree: 50, valide: false },
  { airport: "grenoble-isere-airport", resort: "courchevel", prive: 290, partage: 60, devise: "EUR", km: null, duree: 135, valide: false },
  { airport: "grenoble-isere-airport", resort: "la-plagne", prive: 300, partage: 50, devise: "EUR", km: 170, duree: 150, valide: false },
  { airport: "grenoble-isere-airport", resort: "les-arcs", prive: 290, partage: 60, devise: "EUR", km: 190, duree: 165, valide: false },
  { airport: "grenoble-isere-airport", resort: "les-deux-alpes", prive: 180, partage: 45, devise: "EUR", km: 110, duree: 60, valide: false },
  { airport: "grenoble-isere-airport", resort: "les-menuires", prive: 250, partage: 55, devise: "EUR", km: 170, duree: 150, valide: false },
  { airport: "grenoble-isere-airport", resort: "meribel", prive: null, partage: 250, devise: "EUR", km: 150, duree: 120, valide: false },
  { airport: "grenoble-isere-airport", resort: "serre-chevalier", prive: 250, partage: 50, devise: "EUR", km: 120, duree: 135, valide: false },
  { airport: "grenoble-isere-airport", resort: "tignes", prive: 280, partage: 55, devise: "EUR", km: 180, duree: 120, valide: false },
  { airport: "grenoble-isere-airport", resort: "val-thorens", prive: 320, partage: 60, devise: "EUR", km: 180, duree: 165, valide: false },
  { airport: "innsbruck-airport", resort: "ischgl", prive: 180, partage: 45, devise: "EUR", km: 100, duree: 90, valide: false },
  { airport: "innsbruck-airport", resort: "kitzbuhel", prive: 140, partage: 35, devise: "EUR", km: 95, duree: 90, valide: false },
  { airport: "innsbruck-airport", resort: "mayrhofen", prive: 140, partage: 45, devise: "EUR", km: 70, duree: 60, valide: false },
  { airport: "innsbruck-airport", resort: "serfaus", prive: 180, partage: 45, devise: "EUR", km: 100, duree: 60, valide: false },
  { airport: "innsbruck-airport", resort: "solden", prive: 150, partage: 35, devise: "EUR", km: 85, duree: 60, valide: false },
  { airport: "innsbruck-airport", resort: "st-anton-am-arlberg", prive: 180, partage: 45, devise: "EUR", km: 100, duree: 75, valide: false },
  { airport: "lyon-airport", resort: "alpe-dhuez", prive: 250, partage: 45, devise: "EUR", km: 150, duree: 120, valide: false },
  { airport: "lyon-airport", resort: "courchevel", prive: null, partage: 70, devise: "EUR", km: 186, duree: 150, valide: false },
  { airport: "lyon-airport", resort: "la-plagne", prive: 290, partage: 60, devise: "EUR", km: 190, duree: 150, valide: false },
  { airport: "lyon-airport", resort: "les-deux-alpes", prive: 260, partage: 50, devise: "EUR", km: 160, duree: 150, valide: false },
  { airport: "lyon-airport", resort: "les-gets", prive: 220, partage: 45, devise: "EUR", km: 190, duree: 150, valide: false },
  { airport: "lyon-airport", resort: "meribel", prive: 320, partage: 60, devise: "EUR", km: 180, duree: 150, valide: false },
  { airport: "lyon-airport", resort: "morzine", prive: 280, partage: 60, devise: "EUR", km: 210, duree: 120, valide: false },
  { airport: "lyon-airport", resort: "val-disere", prive: 350, partage: 75, devise: "EUR", km: 220, duree: 300, valide: false },
  { airport: "lyon-airport", resort: "val-thorens", prive: 320, partage: 80, devise: "EUR", km: 200, duree: 300, valide: false },
  { airport: "salzburg-airport", resort: "bad-gastein", prive: 160, partage: 35, devise: "EUR", km: 95, duree: 60, valide: false },
  { airport: "salzburg-airport", resort: "ischgl", prive: 290, partage: 65, devise: "EUR", km: 250, duree: 120, valide: false },
  { airport: "salzburg-airport", resort: "kitzbuhel", prive: 150, partage: 40, devise: "EUR", km: 80, duree: 60, valide: false },
  { airport: "salzburg-airport", resort: "obergurgl", prive: 320, partage: 65, devise: "EUR", km: 250, duree: 240, valide: false },
  { airport: "salzburg-airport", resort: "solden", prive: 290, partage: 75, devise: "EUR", km: 250, duree: 180, valide: false },
  { airport: "salzburg-airport", resort: "zell-am-see", prive: 160, partage: 45, devise: "EUR", km: 85, duree: 90, valide: false },
  { airport: "turin-airport", resort: "cervinia", prive: 180, partage: 45, devise: "EUR", km: 120, duree: 105, valide: false },
  { airport: "turin-airport", resort: "montgenevre", prive: 190, partage: 45, devise: "EUR", km: 98, duree: 90, valide: false },
  { airport: "turin-airport", resort: "serre-chevalier", prive: 220, partage: 50, devise: "EUR", km: 110, duree: 120, valide: false },
  { airport: "turin-airport", resort: "sestriere", prive: 180, partage: 45, devise: "EUR", km: 100, duree: 60, valide: false },
  { airport: "turin-airport", resort: "val-thorens", prive: 350, partage: 65, devise: "EUR", km: 190, duree: 210, valide: false },
  { airport: "zurich-airport", resort: "champery", prive: 320, partage: 85, devise: "EUR", km: 180, duree: 150, valide: false },
  { airport: "zurich-airport", resort: "crans-montana", prive: 350, partage: 90, devise: "EUR", km: 270, duree: 195, valide: false },
  { airport: "zurich-airport", resort: "davos", prive: 320, partage: 65, devise: "EUR", km: 150, duree: null, valide: false },
  { airport: "zurich-airport", resort: "grindelwald", prive: 290, partage: 55, devise: "EUR", km: 140, duree: 105, valide: false },
  { airport: "zurich-airport", resort: "interlaken", prive: 250, partage: 50, devise: "EUR", km: 120, duree: 105, valide: false },
  { airport: "zurich-airport", resort: "ischgl", prive: 350, partage: 75, devise: "EUR", km: 200, duree: 165, valide: false },
  { airport: "zurich-airport", resort: "lech", prive: 320, partage: 85, devise: "EUR", km: null, duree: 150, valide: false },
  { airport: "zurich-airport", resort: "solden", prive: 320, partage: 75, devise: "EUR", km: 260, duree: 240, valide: false },
  { airport: "zurich-airport", resort: "st-anton-am-arlberg", prive: 320, partage: 65, devise: "EUR", km: 195, duree: null, valide: false },
  { airport: "zurich-airport", resort: "st-moritz", prive: 390, partage: 85, devise: "EUR", km: 200, duree: null, valide: false },
  { airport: "zurich-airport", resort: "verbier", prive: 450, partage: 450, devise: "EUR", km: 170, duree: 150, valide: false },
  { airport: "zurich-airport", resort: "wengen", prive: 290, partage: 65, devise: "EUR", km: 130, duree: null, valide: false },
  { airport: "zurich-airport", resort: "zermatt", prive: 490, partage: 95, devise: "EUR", km: 200, duree: 210, valide: false },
];

export function tarif(airport: string, resort: string) {
  return TARIFS.find((t) => t.airport === airport && t.resort === resort);
}

/** Les trajets réellement vendables : tarif présent ET validé par le client. */
export function tarifsVendables() {
  return TARIFS.filter((t) => t.valide && t.prive !== null);
}
