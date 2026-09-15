import type { Lang } from "@/lib/i18n";

/**
 * L'e-mail qui annonce un remboursement au client, dans sa langue.
 *
 * Il dit le montant, d'où il revient (la carte, ou le compte bancaire pour un
 * virement), le délai de la banque, et si la course est annulée ou maintenue :
 * un remboursement partiel — un retard, un geste — ne veut pas dire que le
 * chauffeur ne viendra pas.
 */

export interface DetailsRemboursement {
  reference: string;
  trajet: string;
  /** Déjà formaté, « 578,93 € ». */
  montant: string;
  moyen: "carte" | "virement";
  annulee: boolean;
  telephone: string;
  /** Le PDF de l’avoir Stripe — `null` tant que la facturation est éteinte. */
  avoir: string | null;
}

export interface TextesRemboursement {
  sujet: (reference: string) => string;
  corps: (d: DetailsRemboursement) => string;
}

const joindre = (lignes: (string | null)[]) => lignes.filter((l): l is string => l !== null).join("\n");

export const TEXTES_REMBOURSEMENT: Record<Lang, TextesRemboursement> = {
  en: {
    sujet: (reference) => `Your refund — ${reference}`,
    corps: (d) =>
      joindre([
        `We have refunded ${d.montant} for your booking.`,
        "",
        `Reference: ${d.reference}`,
        `Journey: ${d.trajet}`,
        "",
        d.moyen === "carte"
          ? "The amount goes back to the card you paid with. Banks usually take 5 to 10 business days to show it."
          : "The amount is sent by bank transfer. Banks usually take a few business days to show it.",
        d.annulee ? "Your transfer is cancelled." : "Your transfer is still booked — nothing else changes.",
        d.avoir ? "" : null,
        d.avoir ? `Your credit note (PDF): ${d.avoir}` : null,
        "",
        `Any question: ${d.telephone}.`,
      ]),
  },
  fr: {
    sujet: (reference) => `Votre remboursement — ${reference}`,
    corps: (d) =>
      joindre([
        `Nous vous avons remboursé ${d.montant} sur votre réservation.`,
        "",
        `Référence : ${d.reference}`,
        `Trajet : ${d.trajet}`,
        "",
        d.moyen === "carte"
          ? "Le montant revient sur la carte utilisée pour payer. Les banques mettent en général 5 à 10 jours ouvrés à l’afficher."
          : "Le montant vous est versé par virement. Les banques mettent en général quelques jours ouvrés à l’afficher.",
        d.annulee ? "Votre transfert est annulé." : "Votre transfert reste réservé : rien d’autre ne change.",
        d.avoir ? "" : null,
        d.avoir ? `Votre avoir (PDF) : ${d.avoir}` : null,
        "",
        `Une question : ${d.telephone}.`,
      ]),
  },
  de: {
    sujet: (reference) => `Ihre Rückerstattung — ${reference}`,
    corps: (d) =>
      joindre([
        `Wir haben Ihnen ${d.montant} für Ihre Buchung erstattet.`,
        "",
        `Referenz: ${d.reference}`,
        `Strecke: ${d.trajet}`,
        "",
        d.moyen === "carte"
          ? "Der Betrag geht auf die Karte zurück, mit der Sie bezahlt haben. Banken zeigen ihn meist nach 5 bis 10 Werktagen an."
          : "Der Betrag wird per Überweisung erstattet. Banken zeigen ihn meist nach einigen Werktagen an.",
        d.annulee ? "Ihr Transfer ist storniert." : "Ihr Transfer bleibt gebucht — sonst ändert sich nichts.",
        d.avoir ? "" : null,
        d.avoir ? `Ihre Gutschrift (PDF): ${d.avoir}` : null,
        "",
        `Bei Fragen: ${d.telephone}.`,
      ]),
  },
  it: {
    sujet: (reference) => `Il tuo rimborso — ${reference}`,
    corps: (d) =>
      joindre([
        `Ti abbiamo rimborsato ${d.montant} sulla tua prenotazione.`,
        "",
        `Riferimento: ${d.reference}`,
        `Tragitto: ${d.trajet}`,
        "",
        d.moyen === "carte"
          ? "L’importo torna sulla carta usata per pagare. Le banche impiegano di solito da 5 a 10 giorni lavorativi a mostrarlo."
          : "L’importo ti viene inviato con bonifico. Le banche impiegano di solito alcuni giorni lavorativi a mostrarlo.",
        d.annulee ? "Il tuo transfer è annullato." : "Il tuo transfer resta prenotato: non cambia nient’altro.",
        d.avoir ? "" : null,
        d.avoir ? `La tua nota di credito (PDF): ${d.avoir}` : null,
        "",
        `Per qualsiasi domanda: ${d.telephone}.`,
      ]),
  },
};

export function textesRemboursement(langue: string | null | undefined): TextesRemboursement {
  return TEXTES_REMBOURSEMENT[(langue ?? "en") as Lang] ?? TEXTES_REMBOURSEMENT.en;
}
