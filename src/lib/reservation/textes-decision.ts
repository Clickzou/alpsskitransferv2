import type { Lang } from "@/lib/i18n";

/**
 * Les e-mails qui répondent au client quand l'exploitant a tranché sa demande
 * de changement d'horaire.
 *
 * Ils partent dans la langue de la page d'où la demande a été faite — c'est la
 * langue que le client a choisie, et la seule que la base connaisse de lui.
 *
 * Le refus n'est pas une impasse : il redit l'heure qui tient, et donne le
 * numéro à appeler pour en trouver une autre. Un client qui apprend qu'on ne
 * peut pas venir à 16 h doit savoir, dans le même message, quand on vient.
 */

export interface DetailsDecision {
  reference: string;
  trajet: string;
  /** L'heure qui tient désormais, déjà formatée dans la langue du client. */
  aller: string;
  retour: string | null;
  /** Le lien signé « gérer ma réservation », quand il peut être fabriqué. */
  lien: string | null;
  telephone: string;
}

export interface TextesDecision {
  sujetValidee: (reference: string) => string;
  corpsValidee: (d: DetailsDecision) => string;
  sujetRefusee: (reference: string) => string;
  corpsRefusee: (d: DetailsDecision) => string;
}

const joindre = (lignes: (string | null)[]) =>
  lignes.filter((l): l is string => l !== null).join("\n");

export const TEXTES_DECISION: Record<Lang, TextesDecision> = {
  en: {
    sujetValidee: (reference) => `Your new pick-up time is confirmed — ${reference}`,
    corpsValidee: (d) =>
      joindre([
        "The operator has confirmed your new pick-up time.",
        "",
        `Reference: ${d.reference}`,
        `Journey: ${d.trajet}`,
        `Pick-up: ${d.aller}`,
        d.retour ? `Return: ${d.retour}` : null,
        "",
        "Nothing else has changed, and there is nothing more to pay.",
        ...(d.lien ? ["", "Your booking:", d.lien] : []),
      ]),
    sujetRefusee: (reference) => `About your change request — ${reference}`,
    corpsRefusee: (d) =>
      joindre([
        "The operator could not confirm the new time you asked for, so your booking stands as booked:",
        "",
        `Reference: ${d.reference}`,
        `Journey: ${d.trajet}`,
        `Pick-up: ${d.aller}`,
        d.retour ? `Return: ${d.retour}` : null,
        "",
        `Call us on ${d.telephone} and we will find another time with you.`,
        ...(d.lien ? ["", "Your booking:", d.lien] : []),
      ]),
  },

  fr: {
    sujetValidee: (reference) => `Votre nouvel horaire est confirmé — ${reference}`,
    corpsValidee: (d) =>
      joindre([
        "L’exploitant a confirmé votre nouvel horaire de prise en charge.",
        "",
        `Référence : ${d.reference}`,
        `Trajet : ${d.trajet}`,
        `Prise en charge : ${d.aller}`,
        d.retour ? `Retour : ${d.retour}` : null,
        "",
        "Rien d’autre n’a changé, et il n’y a rien de plus à payer.",
        ...(d.lien ? ["", "Votre réservation :", d.lien] : []),
      ]),
    sujetRefusee: (reference) => `Votre demande de changement — ${reference}`,
    corpsRefusee: (d) =>
      joindre([
        "L’exploitant n’a pas pu confirmer l’horaire demandé : votre réservation reste telle que réservée.",
        "",
        `Référence : ${d.reference}`,
        `Trajet : ${d.trajet}`,
        `Prise en charge : ${d.aller}`,
        d.retour ? `Retour : ${d.retour}` : null,
        "",
        `Appelez-nous au ${d.telephone}, nous trouverons un autre horaire avec vous.`,
        ...(d.lien ? ["", "Votre réservation :", d.lien] : []),
      ]),
  },

  de: {
    sujetValidee: (reference) => `Ihre neue Abholzeit ist bestätigt — ${reference}`,
    corpsValidee: (d) =>
      joindre([
        "Der Betreiber hat Ihre neue Abholzeit bestätigt.",
        "",
        `Referenz: ${d.reference}`,
        `Strecke: ${d.trajet}`,
        `Abholung: ${d.aller}`,
        d.retour ? `Rückfahrt: ${d.retour}` : null,
        "",
        "Sonst hat sich nichts geändert, und es ist nichts nachzuzahlen.",
        ...(d.lien ? ["", "Ihre Buchung:", d.lien] : []),
      ]),
    sujetRefusee: (reference) => `Ihre Änderungsanfrage — ${reference}`,
    corpsRefusee: (d) =>
      joindre([
        "Der Betreiber konnte die gewünschte Zeit leider nicht bestätigen. Ihre Buchung bleibt, wie sie gebucht wurde:",
        "",
        `Referenz: ${d.reference}`,
        `Strecke: ${d.trajet}`,
        `Abholung: ${d.aller}`,
        d.retour ? `Rückfahrt: ${d.retour}` : null,
        "",
        `Rufen Sie uns unter ${d.telephone} an — wir finden mit Ihnen eine andere Zeit.`,
        ...(d.lien ? ["", "Ihre Buchung:", d.lien] : []),
      ]),
  },

  it: {
    sujetValidee: (reference) => `Il tuo nuovo orario è confermato — ${reference}`,
    corpsValidee: (d) =>
      joindre([
        "L’operatore ha confermato il nuovo orario di presa in carico.",
        "",
        `Riferimento: ${d.reference}`,
        `Tragitto: ${d.trajet}`,
        `Presa in carico: ${d.aller}`,
        d.retour ? `Ritorno: ${d.retour}` : null,
        "",
        "Il resto non cambia e non c’è nulla da pagare in più.",
        ...(d.lien ? ["", "La tua prenotazione:", d.lien] : []),
      ]),
    sujetRefusee: (reference) => `La tua richiesta di modifica — ${reference}`,
    corpsRefusee: (d) =>
      joindre([
        "L’operatore non ha potuto confermare l’orario richiesto: la prenotazione resta com’era.",
        "",
        `Riferimento: ${d.reference}`,
        `Tragitto: ${d.trajet}`,
        `Presa in carico: ${d.aller}`,
        d.retour ? `Ritorno: ${d.retour}` : null,
        "",
        `Chiamaci al ${d.telephone}: troviamo insieme un altro orario.`,
        ...(d.lien ? ["", "La tua prenotazione:", d.lien] : []),
      ]),
  },
};

/** Les textes d'une langue, l'anglais si elle est inconnue. */
export function textesDecision(langue: string | null | undefined): TextesDecision {
  return TEXTES_DECISION[(langue ?? "en") as Lang] ?? TEXTES_DECISION.en;
}
