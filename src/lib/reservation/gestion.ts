import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Le lien « Gérer ma réservation », envoyé dans l'e-mail de confirmation.
 *
 * ## Pourquoi un lien plutôt qu'un compte
 *
 * Un espace client demanderait une inscription, un mot de passe, une
 * réinitialisation à minuit et des données personnelles de plus à protéger —
 * pour un service qu'on utilise une à deux fois par an. Le lien signé fait le
 * même travail : le client clique depuis sa confirmation et modifie son heure.
 * C'est ce que font Ryanair, Booking et la SNCF, pour la même raison.
 *
 * ## Comment il tient sans rien stocker
 *
 * Le jeton est un HMAC de la référence, calculé avec un secret qui ne quitte
 * jamais le serveur. Rien à écrire en base, rien à faire expirer : le lien vaut
 * tant que le secret vaut, et changer le secret révoque tous les liens d'un
 * coup. La référence seule ne suffit pas — `AST-4F7K2Q` se devine par essais
 * successifs, le HMAC non.
 *
 * La comparaison se fait en temps constant : une comparaison naïve fuit, octet
 * par octet, l'information qui permet de reconstruire un jeton valide.
 *
 * ## Ce que ce lien ne donne pas
 *
 * Il ouvre **une** réservation, jamais un compte : pas d'historique, pas de
 * liste, pas d'accès aux autres courses. Une fuite de lien expose une course,
 * pas un client.
 */

function secret(): string | null {
  return process.env.SECRET_GESTION?.trim() || null;
}

/** Vrai quand les liens de gestion sont configurés sur cet environnement. */
export function gestionConfiguree(): boolean {
  return secret() !== null;
}

/** Le jeton d'une réservation — 32 caractères hexadécimaux, non devinables. */
export function jetonGestion(reference: string): string | null {
  const cle = secret();
  if (!cle) return null;
  return createHmac("sha256", cle).update(reference, "utf8").digest("hex").slice(0, 32);
}

/**
 * Vérifie un jeton. Renvoie faux si la gestion n'est pas configurée : mieux
 * vaut refuser l'accès que l'ouvrir par défaut d'installation.
 */
export function jetonValide(reference: string, jeton: string | null | undefined): boolean {
  if (!jeton) return false;
  const attendu = jetonGestion(reference);
  if (!attendu) return false;

  const a = Buffer.from(attendu, "utf8");
  const b = Buffer.from(jeton, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Le chemin de la page de gestion, par langue — le slug est un mot du marché. */
export const CHEMIN_GESTION: Record<string, string> = {
  en: "/manage-booking/",
  fr: "/fr/gerer-ma-reservation/",
  de: "/de/buchung-verwalten/",
  it: "/it/gestisci-prenotazione/",
};

/** Le lien complet à mettre dans un e-mail, ou `null` si la gestion est fermée. */
export function lienGestion(
  origine: string,
  reference: string,
  langue: string | undefined,
): string | null {
  const jeton = jetonGestion(reference);
  if (!jeton) return null;
  const chemin = CHEMIN_GESTION[langue ?? "en"] ?? CHEMIN_GESTION.en;
  return `${origine}${chemin}?ref=${encodeURIComponent(reference)}&j=${jeton}`;
}

/**
 * Le délai en deçà duquel une modification ne se fait plus toute seule.
 *
 * Vingt-quatre heures, parce que c'est le préavis dont le chauffeur a besoin
 * pour refaire sa journée — décision de l'exploitant, 10 septembre 2026. En
 * dessous, la page renvoie au téléphone : un changement tardif se négocie, il
 * ne se valide pas dans un formulaire.
 */
export const PREAVIS_HEURES = 24;

/** Vrai quand la course est encore assez loin pour être modifiée en ligne. */
export function modifiableEnLigne(aller: Date, maintenant = new Date()): boolean {
  return aller.getTime() - maintenant.getTime() >= PREAVIS_HEURES * 3600 * 1000;
}

/**
 * Ce que le client peut encore déplacer lui-même, sens par sens.
 *
 * Chaque sens a son propre préavis. La règle ne regardait que l'aller : le
 * client déjà en station, qui décale son retour parce que son vol a changé —
 * le cas le plus courant — lisait « ce trajet a déjà eu lieu ». Le retour se
 * juge sur sa propre date, et la course n'est passée que quand il l'est aussi.
 */
export function modifiabilite(
  aller: Date,
  retour: Date | null,
  maintenant = new Date(),
): { aller: boolean; retour: boolean; aVenir: boolean } {
  return {
    aller: modifiableEnLigne(aller, maintenant),
    retour: retour !== null && modifiableEnLigne(retour, maintenant),
    aVenir:
      aller.getTime() > maintenant.getTime() ||
      (retour !== null && retour.getTime() > maintenant.getTime()),
  };
}

/**
 * En deçà de ce délai, la réservation en ligne est fermée.
 *
 * Une heure, décision de l'exploitant du 10 septembre 2026 : en dessous, aucun
 * chauffeur ne peut être garanti, et le site ne doit pas encaisser ce qu'il ne
 * peut pas tenir. Le client est renvoyé au téléphone, où la réponse tient en
 * trente secondes.
 *
 * Le seuil est volontairement bas : il ne s'agit pas de décourager les
 * réservations tardives — elles se font, et souvent — mais d'écarter celles
 * qu'on ne peut honorer dans aucun cas. Un transfert non honoré coûte plus
 * cher qu'une course refusée.
 */
export const DELAI_APPEL_HEURES = 1;

/**
 * Vrai quand la prise en charge est trop proche pour être garantie sans appel.
 *
 * **Une heure déjà passée compte aussi.** L'ancienne borne `ecart > 0` la
 * laissait filer : le formulaire s'ouvrant sur l'heure courante, il suffisait
 * d'attendre une minute avant de valider pour réserver une course dont l'heure
 * était révolue — sans avertissement, et jusqu'au paiement. Ce n'était pas un
 * cas tordu, c'était le cas normal d'un visiteur qui réfléchit.
 */
export function departImminent(aller: Date, maintenant = new Date()): boolean {
  return aller.getTime() - maintenant.getTime() < DELAI_APPEL_HEURES * 3600 * 1000;
}
