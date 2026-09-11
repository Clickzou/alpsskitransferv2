/**
 * Qui a le droit d'entrer dans le back-office.
 *
 * ## Pourquoi une liste, en plus du mot de passe
 *
 * Supabase Auth dit **qui** est connecté ; il ne dit pas qui a le droit
 * d'entrer. Le 11 septembre 2026, l'inscription libre était ouverte sur le
 * projet : la clé publique étant dans le site, n'importe qui pouvait se créer
 * un compte avec sa propre adresse, le confirmer, et lire toutes les
 * réservations — noms, téléphones, e-mails. Et l'adresse du back-office est
 * dans le dépôt GitHub, qui est public.
 *
 * Fermer l'inscription dans Supabase règle le problème ; cette liste l'empêche
 * de revenir le jour où quelqu'un rouvre le réglage sans y penser.
 *
 * ## Fermé par défaut
 *
 * `ADMIN_EMAILS`, des adresses séparées par des virgules. Absente ou vide,
 * **personne n'entre** — c'est le sens qui compte : un oubli doit fermer la
 * porte, jamais l'ouvrir. La même règle que l'indexation du site.
 */
export function emailAutorise(
  email: string | null | undefined,
  liste: string | undefined = process.env.ADMIN_EMAILS,
): boolean {
  if (!email) return false;
  const autorises = (liste ?? "")
    .split(",")
    .map((adresse) => adresse.trim().toLowerCase())
    .filter(Boolean);
  return autorises.includes(email.trim().toLowerCase());
}
