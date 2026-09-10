import { SITE } from "@/data/site";

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

/**
 * Le tunnel et la page éditoriale sont **la même page** depuis le 9 septembre
 * 2026 : le formulaire de réservation vit sur `/book-ski-transfer-tickets/`,
 * sous l'ancre `#reserver`. Décision du client — « tout doit se faire sur la
 * même page ». `/booking/` redirige vers elle.
 *
 * Ce qu'on y gagne : une seule URL à faire connaître, l'antériorité et le
 * mot-clé au même endroit, et un visiteur qui n'a pas à saisir sa recherche deux
 * fois. Ce qu'il faut surveiller : la page reste **statique et indexée**, donc
 * le pré-remplissage se lit côté navigateur (`TunnelAutonome`).
 */
export const CHEMIN_TUNNEL = "/book-ski-transfer-tickets/";

/** L'ancre du formulaire sur la page de réservation. */
export const ANCRE_TUNNEL = "#reserver";

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
/**
 * Où va « Book now » **depuis la page de réservation elle-même**.
 *
 * `lienReservation` retombe sur `/book-ski-transfer-tickets/` tant que le moteur
 * maison n'est pas armé — ce qui est le bon comportement partout, sauf sur cette
 * page : elle s'y renverrait à elle-même, et le bouton ne ferait que recharger
 * ce que le visiteur a déjà sous les yeux. Ici le repli est le tunnel externe
 * quand il est configuré, et le tunnel interne sinon.
 */
export function lienTunnel(pre: PreRemplissage = {}): string {
  if (!moteurInterne()) {
    return process.env.NEXT_PUBLIC_URL_RESERVATION_REPLI || CHEMIN_TUNNEL;
  }
  return lienReservation(pre);
}

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
  return requete
    ? `${CHEMIN_TUNNEL}?${requete}${ANCRE_TUNNEL}`
    : `${CHEMIN_TUNNEL}${ANCRE_TUNNEL}`;
}

/**
 * L'adresse à laquelle ce site est **réellement** servi.
 *
 * Stripe a besoin d'une URL absolue pour ramener le client après le paiement.
 * Elle était construite sur `SITE.url` — le domaine définitif — ce qui donnait
 * un résultat absurde partout ailleurs : après un paiement de test en local, le
 * client atterrissait sur `alpsskitransfers.com/booking/confirmed/`, c'est-à-dire
 * sur le WordPress encore en ligne, qui répond 404. Le paiement était pourtant
 * bien passé : seul le retour se perdait.
 *
 * **On ne lit pas l'en-tête `Origin` ni `Host` en production.** Ils viennent du
 * client et se falsifient : une requête forgée ferait rediriger un vrai payeur
 * vers le domaine de son choix, juste après avoir saisi sa carte. L'ordre est
 * donc : une variable d'environnement explicite, puis l'URL que Vercel fournit
 * lui-même, puis le domaine du registre — et l'origine de la requête seulement
 * en développement, où il n'y a rien à voler.
 */
export function origineSite(requete?: Request): string {
  const explicite = process.env.NEXT_PUBLIC_URL_BASE?.trim();
  if (explicite) return explicite.replace(/\/$/, "");

  if (process.env.NODE_ENV !== "production" && requete) {
    return new URL(requete.url).origin;
  }

  /*
    Posées par Vercel, hors de portée du client : elles valent pour la
    préproduction, où le domaine définitif ne répond pas encore.

    L'ordre compte, et il a coûté un test. `VERCEL_URL` désigne le **déploiement**
    — `nom-9uj8frsvc-projets.vercel.app` — une adresse qui change à chaque mise
    en ligne et que la protection Vercel garde derrière un écran de connexion. Le
    payeur de test y a été renvoyé après avoir réglé sa course : le paiement
    était pris, la confirmation inatteignable. `VERCEL_PROJECT_PRODUCTION_URL`
    désigne le **projet**, stable et ouverte, et passe donc devant.
  */
  const stable =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (stable) return `https://${stable}`;

  return SITE.url;
}

/**
 * La page de retour après paiement, dans la langue du client.
 *
 * Le slug est un mot de la langue, comme le reste du silo : personne ne revient
 * d'un paiement sur une URL anglaise quand tout le parcours était en italien.
 */
export const CHEMIN_CONFIRMATION: Record<string, string> = {
  en: "/booking/confirmed/",
  fr: "/fr/reservation-confirmee/",
  de: "/de/buchung-bestaetigt/",
  it: "/it/prenotazione-confermata/",
};

/** Le chemin de confirmation d'une langue, l'anglais si elle est inconnue. */
export function cheminConfirmation(langue: string | undefined): string {
  return CHEMIN_CONFIRMATION[langue ?? "en"] ?? CHEMIN_CONFIRMATION.en;
}
