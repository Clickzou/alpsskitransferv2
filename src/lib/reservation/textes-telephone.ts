import type { Lang } from "@/lib/i18n";

/**
 * L'e-mail envoyé au client quand l'exploitant a saisi sa réservation au
 * téléphone — et la mention de virement portée sur sa facture.
 *
 * Il part dans la langue choisie par l'exploitant pendant l'appel. Il redit ce
 * qui a été convenu, puis comment payer : un lien pour la carte, ou l'IBAN, la
 * référence à indiquer et l'échéance pour un virement. Il finit par le lien
 * « gérer ma réservation » : l'adresse en station s'y donne, comme pour une
 * réservation faite sur le site.
 */

export interface DetailsTelephone {
  nom: string;
  reference: string;
  /** Le récapitulatif déjà écrit dans la langue du client (`recapDemande`). */
  recap: string;
  mode: "carte" | "virement";
  /** Le lien de paiement par carte — `null` s'il n'a pas pu être créé. */
  lienPaiement: string | null;
  /** Les coordonnées bancaires de l'exploitant (`IBAN_VIREMENT`). */
  iban: string | null;
  /** L'échéance du virement, déjà formatée dans la langue du client. */
  echeance: string | null;
  /** La facture, quand la facturation est allumée. */
  facture: string | null;
  lienGestion: string | null;
}

export interface TextesTelephone {
  sujet: (reference: string, trajet: string) => string;
  corps: (d: DetailsTelephone) => string;
  /** La mention portée sur la facture d'un virement. */
  mentionVirement: (iban: string, reference: string, echeance: string) => string;
}

const joindre = (lignes: (string | null | false)[]) =>
  lignes.filter((l): l is string => typeof l === "string").join("\n");

export const TEXTES_TELEPHONE: Record<Lang, TextesTelephone> = {
  en: {
    sujet: (reference, trajet) => `Your transfer ${reference} — ${trajet}`,
    corps: (d) =>
      joindre([
        `Hello ${d.nom},`,
        "",
        "Thank you for booking your transfer with us by phone. Here is what we agreed:",
        "",
        d.recap,
        "",
        ...(d.mode === "carte"
          ? d.lienPaiement
            ? ["To confirm your booking, please pay online — it takes a minute:", d.lienPaiement]
            : ["We will send you a payment link shortly."]
          : d.iban
            ? [
                `To confirm your booking, please pay by bank transfer${d.echeance ? ` before ${d.echeance}` : ""}:`,
                d.iban,
                `Reference to quote with your transfer: ${d.reference}`,
              ]
            : ["We will send you our bank details shortly."]),
        d.facture ? "" : false,
        d.facture ? `Your invoice: ${d.facture}` : false,
        d.lienGestion ? "" : false,
        d.lienGestion ? "Your booking — your address in resort, or a new pick-up time:" : false,
        d.lienGestion,
      ]),
    mentionVirement: (iban, reference, echeance) =>
      `Payment by bank transfer before ${echeance} — ${iban} — reference ${reference}`,
  },

  fr: {
    sujet: (reference, trajet) => `Votre transfert ${reference} — ${trajet}`,
    corps: (d) =>
      joindre([
        `Bonjour ${d.nom},`,
        "",
        "Merci d’avoir réservé votre transfert avec nous par téléphone. Voici ce que nous avons convenu :",
        "",
        d.recap,
        "",
        ...(d.mode === "carte"
          ? d.lienPaiement
            ? ["Pour confirmer votre réservation, réglez-la en ligne — c’est l’affaire d’une minute :", d.lienPaiement]
            : ["Nous vous envoyons un lien de paiement très vite."]
          : d.iban
            ? [
                `Pour confirmer votre réservation, réglez-la par virement${d.echeance ? ` avant le ${d.echeance}` : ""} :`,
                d.iban,
                `Référence à indiquer avec votre virement : ${d.reference}`,
              ]
            : ["Nous vous envoyons nos coordonnées bancaires très vite."]),
        d.facture ? "" : false,
        d.facture ? `Votre facture : ${d.facture}` : false,
        d.lienGestion ? "" : false,
        d.lienGestion
          ? "Votre réservation — votre adresse en station, ou un autre horaire :"
          : false,
        d.lienGestion,
      ]),
    mentionVirement: (iban, reference, echeance) =>
      `Paiement par virement avant le ${echeance} — ${iban} — référence ${reference}`,
  },

  de: {
    sujet: (reference, trajet) => `Ihr Transfer ${reference} — ${trajet}`,
    corps: (d) =>
      joindre([
        `Guten Tag ${d.nom},`,
        "",
        "Vielen Dank, dass Sie Ihren Transfer telefonisch bei uns gebucht haben. Das haben wir vereinbart:",
        "",
        d.recap,
        "",
        ...(d.mode === "carte"
          ? d.lienPaiement
            ? ["Um Ihre Buchung zu bestätigen, bezahlen Sie bitte online — es dauert eine Minute:", d.lienPaiement]
            : ["Wir senden Ihnen in Kürze einen Zahlungslink."]
          : d.iban
            ? [
                `Um Ihre Buchung zu bestätigen, überweisen Sie bitte den Betrag${d.echeance ? ` bis ${d.echeance}` : ""}:`,
                d.iban,
                `Verwendungszweck: ${d.reference}`,
              ]
            : ["Wir senden Ihnen in Kürze unsere Bankverbindung."]),
        d.facture ? "" : false,
        d.facture ? `Ihre Rechnung: ${d.facture}` : false,
        d.lienGestion ? "" : false,
        d.lienGestion ? "Ihre Buchung — Ihre Adresse im Skiort oder eine andere Abholzeit:" : false,
        d.lienGestion,
      ]),
    mentionVirement: (iban, reference, echeance) =>
      `Zahlung per Überweisung bis ${echeance} — ${iban} — Verwendungszweck ${reference}`,
  },

  it: {
    sujet: (reference, trajet) => `Il tuo transfer ${reference} — ${trajet}`,
    corps: (d) =>
      joindre([
        `Buongiorno ${d.nom},`,
        "",
        "Grazie per aver prenotato il tuo transfer con noi al telefono. Ecco cosa abbiamo concordato:",
        "",
        d.recap,
        "",
        ...(d.mode === "carte"
          ? d.lienPaiement
            ? ["Per confermare la prenotazione, paga online — ci vuole un minuto:", d.lienPaiement]
            : ["Ti inviamo a breve un link di pagamento."]
          : d.iban
            ? [
                `Per confermare la prenotazione, paga con bonifico${d.echeance ? ` entro il ${d.echeance}` : ""}:`,
                d.iban,
                `Causale da indicare nel bonifico: ${d.reference}`,
              ]
            : ["Ti inviamo a breve le nostre coordinate bancarie."]),
        d.facture ? "" : false,
        d.facture ? `La tua fattura: ${d.facture}` : false,
        d.lienGestion ? "" : false,
        d.lienGestion ? "La tua prenotazione — il tuo indirizzo in località, o un altro orario:" : false,
        d.lienGestion,
      ]),
    mentionVirement: (iban, reference, echeance) =>
      `Pagamento con bonifico entro il ${echeance} — ${iban} — causale ${reference}`,
  },
};

/** Les textes d'une langue, l'anglais si elle est inconnue. */
export function textesTelephone(langue: string | null | undefined): TextesTelephone {
  return TEXTES_TELEPHONE[(langue ?? "en") as Lang] ?? TEXTES_TELEPHONE.en;
}
