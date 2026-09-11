import { modifiableEnLigne } from "@/lib/reservation/gestion";

/**
 * Les adresses en station, demandées après le paiement.
 *
 * Décision de JC, 11 septembre 2026 : l'adresse est obligatoire — sans elle,
 * le chauffeur ne sait ni où déposer le client ni où venir le chercher — mais
 * la demander avant l'achat alourdit le tunnel. Le client la donne juste
 * après, depuis la page de confirmation ou l'e-mail, par son lien de gestion.
 *
 * À ne pas confondre avec `adresses.ts`, qui suggère des adresses réelles
 * pendant la saisie du trajet.
 */

/** Une adresse saisie, nettoyée — ou `null` si elle ne dit rien. */
export function adressePropre(valeur: unknown): string | null {
  if (typeof valeur !== "string") return null;
  const adresse = valeur.replace(/\s+/g, " ").trim().slice(0, 200);
  return adresse.length >= 3 ? adresse : null;
}

/**
 * Le client peut-il encore saisir ou corriger l'adresse de ce trajet ?
 *
 * Manquante, elle se complète jusqu'à la prise en charge : mieux vaut tard que
 * jamais, et c'est justement la veille qu'on s'aperçoit qu'on l'a oubliée.
 * Connue, elle ne se change plus à moins de vingt-quatre heures : la déplacer
 * au dernier moment défait la journée du chauffeur — cela passe par le
 * téléphone, comme les heures.
 */
export function adresseModifiable(
  prise: Date | null,
  actuelle: string | null | undefined,
  maintenant = new Date(),
): boolean {
  if (!prise || prise.getTime() <= maintenant.getTime()) return false;
  return !actuelle || modifiableEnLigne(prise, maintenant);
}
