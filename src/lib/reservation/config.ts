/**
 * Où va le bouton « Book now ».
 *
 * Le tunnel WooCommerce reste armé en repli sur `book.alpsskitransfers.com`
 * jusqu'à ce que le moteur maison ait encaissé des réservations réelles sans
 * incident. La bascule se fait par variable d'environnement, **sans
 * redéploiement du code** : `NEXT_PUBLIC_MOTEUR_RESERVATION` vaut `interne` ou
 * `wordpress`.
 *
 * La variable est `NEXT_PUBLIC_` parce que les liens sont rendus dans des pages
 * statiques : elle est donc lue au build. Changer la valeur sur Vercel déclenche
 * un redéploiement des pages, pas une modification du dépôt.
 */

export const CHEMIN_TUNNEL = "/booking/";

/** L'ancienne page éditoriale de réservation, conservée et indexée. */
export const CHEMIN_PAGE_RESERVATION = "/book-ski-transfer-tickets/";

export function moteurInterne(): boolean {
  return process.env.NEXT_PUBLIC_MOTEUR_RESERVATION === "interne";
}

export interface PreRemplissage {
  /** Slug d'aéroport de départ. */
  airport?: string;
  /** Slug de station d'arrivée. */
  resort?: string;
  /** Départ de l'aller, au format `YYYY-MM-DDTHH:mm`. */
  quand?: string;
  passagers?: number;
}

/**
 * Le lien de réservation, pré-rempli quand la page sait déjà d'où l'on part et
 * où l'on va — une page de trajet le sait, c'est tout l'intérêt de l'y poser.
 *
 * En mode repli, les paramètres sont ignorés : le tunnel WooCommerce ne sait pas
 * les lire, et lui en passer donnerait une URL bancale.
 */
export function lienReservation(pre: PreRemplissage = {}): string {
  if (!moteurInterne()) {
    return process.env.NEXT_PUBLIC_URL_RESERVATION_REPLI || CHEMIN_PAGE_RESERVATION;
  }

  const parametres = new URLSearchParams();
  if (pre.airport) parametres.set("from", pre.airport);
  if (pre.resort) parametres.set("to", pre.resort);
  if (pre.quand) parametres.set("when", pre.quand);
  if (pre.passagers) parametres.set("passengers", String(pre.passagers));

  const requete = parametres.toString();
  return requete ? `${CHEMIN_TUNNEL}?${requete}` : CHEMIN_TUNNEL;
}
