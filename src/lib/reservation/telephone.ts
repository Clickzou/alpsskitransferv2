/**
 * Les réservations prises au téléphone — demande de JC, 11 septembre 2026.
 *
 * L'exploitant saisit la course dans le back-office, champ par champ comme le
 * client sur le site, puis choisit comment elle se paie : un lien de paiement
 * par carte, ou un virement. La facture suit dans les deux cas — émise tout de
 * suite pour un virement, avec l'IBAN et une échéance ; elle passe à « payée »
 * quand l'exploitant clique « virement reçu ».
 *
 * Ce module porte les règles sans accès réseau, pour être testées.
 */

import { randomUUID } from "node:crypto";

const JOUR = 24 * 3600 * 1000;

export type ModePaiement = "carte" | "virement";

/** Une référence lisible au téléphone — le format des réservations du site : AST-4F7K2Q. */
export function nouvelleReference(): string {
  return `AST-${randomUUID().replace(/-/g, "").toUpperCase().slice(0, 6)}`;
}

/**
 * L'échéance d'un virement : sept jours, ramenés à deux jours avant la prise
 * en charge quand la course est plus proche — l'exploitant sait qu'il est payé
 * avant de rouler. Jamais avant demain : une échéance passée ne se paie pas.
 */
export function echeanceVirement(aller: Date, maintenant = new Date()): Date {
  const septJours = maintenant.getTime() + 7 * JOUR;
  const avantDepart = aller.getTime() - 2 * JOUR;
  const demain = maintenant.getTime() + JOUR;
  return new Date(Math.max(demain, Math.min(septJours, avantDepart)));
}

/** Le délai de paiement en jours entiers, tel que Stripe le demande — au moins un. */
export function joursJusqua(echeance: Date, maintenant = new Date()): number {
  return Math.max(1, Math.ceil((echeance.getTime() - maintenant.getTime()) / JOUR));
}
