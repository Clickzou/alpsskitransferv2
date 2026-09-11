import { LOCALES, type Lang } from "@/lib/i18n";
import { formaterAlpes } from "@/lib/temps";

/**
 * Les deux e-mails qu'un client reçoit quand sa demande est enregistrée sans
 * paiement en ligne : le devis sur mesure (un lieu hors catalogue), et la
 * réservation que le site ne peut pas encore encaisser.
 *
 * Ils étaient écrits en anglais, en dur, pour tout le monde — relevé par JC
 * le 11 septembre 2026, en vérifiant que chaque message au client partait
 * dans sa langue. Ils suivent désormais la langue du tunnel, comme la
 * confirmation de paiement : les dates, les montants et la ponctuation aussi.
 */

export interface RecapDemande {
  reference: string;
  trajet: string;
  /** Déjà formatée dans la langue du client (`dateClient`). */
  aller: string;
  retour: string | null;
  trajetRetour: string | null;
  vehicule: string | null;
  vehiculeRetour: string | null;
  passagers: number;
  passagersRetour: number | null;
  bagages: number | null;
  skis: number;
  adresse: string | null;
  vol: string | null;
  message: string | null;
  /** Déjà formaté (`montantClient`) — absent pour un devis sur mesure. */
  total: string | null;
}

interface Libelles {
  reference: string;
  trajet: string;
  aller: string;
  retour: string;
  vehicule: string;
  vehiculeRetour: string;
  groupe: string;
  groupeRetour: string;
  adresse: string;
  adresseAConfirmer: string;
  vol: string;
  remarques: string;
  total: string;
  deuxTrajets: string;
  effectif: (passagers: number, bagages: number | null, skis: number) => string;
}

export interface TextesDemande {
  sujetSurMesure: (reference: string) => string;
  corpsSurMesure: (nom: string) => string[];
  sujetSansPaiement: (reference: string, trajet: string) => string;
  corpsSansPaiement: (nom: string) => string[];
  /** « : » précédé d'une espace en français, collé ailleurs. */
  deuxPoints: string;
  libelles: Libelles;
}

export const TEXTES_DEMANDE: Record<Lang, TextesDemande> = {
  en: {
    sujetSurMesure: (reference) => `Your transfer request ${reference}`,
    corpsSurMesure: (nom) => [
      `Thank you, ${nom}.`,
      "",
      "This journey is quoted by hand rather than online — we will come back to you by email with a fixed price. Nothing has been charged.",
    ],
    sujetSansPaiement: (reference, trajet) => `Your transfer request ${reference} — ${trajet}`,
    corpsSansPaiement: (nom) => [
      `Thank you, ${nom}.`,
      "",
      "We have your transfer request and will confirm it by email shortly.",
      "Nothing has been charged.",
    ],
    deuxPoints: ": ",
    libelles: {
      reference: "Reference",
      trajet: "Journey",
      aller: "Outbound",
      retour: "Return",
      vehicule: "Vehicle",
      vehiculeRetour: "Return vehicle",
      groupe: "Group",
      groupeRetour: "Return group",
      adresse: "Address in resort",
      adresseAConfirmer: "to be confirmed",
      vol: "Flight",
      remarques: "Notes",
      total: "Total",
      deuxTrajets: " for both journeys",
      effectif: (p, b, s) =>
        `${p} passenger${p > 1 ? "s" : ""}` +
        (b !== null ? `, ${b} bag${b > 1 ? "s" : ""}` : "") +
        (s > 0 ? `, ${s} ski bag${s > 1 ? "s" : ""}` : ""),
    },
  },

  fr: {
    sujetSurMesure: (reference) => `Votre demande de transfert ${reference}`,
    corpsSurMesure: (nom) => [
      `Merci, ${nom}.`,
      "",
      "Ce trajet se chiffre à la main plutôt qu’en ligne : nous revenons vers vous par e-mail avec un prix ferme. Rien n’a été débité.",
    ],
    sujetSansPaiement: (reference, trajet) => `Votre demande de transfert ${reference} — ${trajet}`,
    corpsSansPaiement: (nom) => [
      `Merci, ${nom}.`,
      "",
      "Nous avons bien votre demande de transfert, et nous vous la confirmons très vite par e-mail.",
      "Rien n’a été débité.",
    ],
    deuxPoints: " : ",
    libelles: {
      reference: "Référence",
      trajet: "Trajet",
      aller: "Aller",
      retour: "Retour",
      vehicule: "Véhicule",
      vehiculeRetour: "Véhicule au retour",
      groupe: "Groupe",
      groupeRetour: "Groupe au retour",
      adresse: "Adresse en station",
      adresseAConfirmer: "à confirmer",
      vol: "Vol",
      remarques: "Remarques",
      total: "Total",
      deuxTrajets: " pour les deux trajets",
      effectif: (p, b, s) =>
        `${p} passager${p > 1 ? "s" : ""}` +
        (b !== null ? `, ${b} bagage${b > 1 ? "s" : ""}` : "") +
        (s > 0 ? `, ${s} housse${s > 1 ? "s" : ""} à skis` : ""),
    },
  },

  de: {
    sujetSurMesure: (reference) => `Ihre Transferanfrage ${reference}`,
    corpsSurMesure: (nom) => [
      `Vielen Dank, ${nom}.`,
      "",
      "Diese Strecke wird von Hand kalkuliert, nicht online — wir melden uns per E-Mail mit einem Festpreis. Es wurde nichts abgebucht.",
    ],
    sujetSansPaiement: (reference, trajet) => `Ihre Transferanfrage ${reference} — ${trajet}`,
    corpsSansPaiement: (nom) => [
      `Vielen Dank, ${nom}.`,
      "",
      "Wir haben Ihre Transferanfrage erhalten und bestätigen sie in Kürze per E-Mail.",
      "Es wurde nichts abgebucht.",
    ],
    deuxPoints: ": ",
    libelles: {
      reference: "Referenz",
      trajet: "Strecke",
      aller: "Hinfahrt",
      retour: "Rückfahrt",
      vehicule: "Fahrzeug",
      vehiculeRetour: "Fahrzeug Rückfahrt",
      groupe: "Gruppe",
      groupeRetour: "Gruppe Rückfahrt",
      adresse: "Adresse im Skiort",
      adresseAConfirmer: "wird noch bestätigt",
      vol: "Flug",
      remarques: "Hinweise",
      total: "Gesamt",
      deuxTrajets: " für beide Fahrten",
      effectif: (p, b, s) =>
        `${p} ${p > 1 ? "Personen" : "Person"}` +
        (b !== null ? `, ${b} Gepäckstück${b > 1 ? "e" : ""}` : "") +
        (s > 0 ? `, ${s} Skitasche${s > 1 ? "n" : ""}` : ""),
    },
  },

  it: {
    sujetSurMesure: (reference) => `La tua richiesta di transfer ${reference}`,
    corpsSurMesure: (nom) => [
      `Grazie, ${nom}.`,
      "",
      "Questo tragitto si quota a mano, non online: ti rispondiamo via e-mail con un prezzo fisso. Non è stato addebitato nulla.",
    ],
    sujetSansPaiement: (reference, trajet) =>
      `La tua richiesta di transfer ${reference} — ${trajet}`,
    corpsSansPaiement: (nom) => [
      `Grazie, ${nom}.`,
      "",
      "Abbiamo ricevuto la tua richiesta di transfer e te la confermiamo a breve via e-mail.",
      "Non è stato addebitato nulla.",
    ],
    deuxPoints: ": ",
    libelles: {
      reference: "Riferimento",
      trajet: "Tragitto",
      aller: "Andata",
      retour: "Ritorno",
      vehicule: "Veicolo",
      vehiculeRetour: "Veicolo al ritorno",
      groupe: "Gruppo",
      groupeRetour: "Gruppo al ritorno",
      adresse: "Indirizzo in località",
      adresseAConfirmer: "da confermare",
      vol: "Volo",
      remarques: "Note",
      total: "Totale",
      deuxTrajets: " per entrambi i tragitti",
      effectif: (p, b, s) =>
        `${p} passegger${p > 1 ? "i" : "o"}` +
        (b !== null ? `, ${b} bagagl${b > 1 ? "i" : "io"}` : "") +
        (s > 0 ? `, ${s} sacc${s > 1 ? "he" : "a"} da sci` : ""),
    },
  },
};

/** Les textes d'une langue, l'anglais si elle est inconnue. */
export function textesDemande(langue: string | null | undefined): TextesDemande {
  return TEXTES_DEMANDE[(langue ?? "en") as Lang] ?? TEXTES_DEMANDE.en;
}

function locale(langue: string): string {
  return LOCALES[langue as Lang] ?? LOCALES.en;
}

/** Une date de prise en charge, à l'heure des Alpes, dite dans la langue du client. */
export function dateClient(langue: string, date: Date): string {
  return formaterAlpes(date, locale(langue), {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** « 610 € » en français, « €610 » en anglais — et « pour les deux trajets » s'il y a lieu. */
export function montantClient(langue: string, montant: number, allerRetour: boolean): string {
  const prix = new Intl.NumberFormat(locale(langue), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(montant);
  return allerRetour ? `${prix}${textesDemande(langue).libelles.deuxTrajets}` : prix;
}

/** Le récapitulatif de la demande, ligne à ligne, dans la langue du client. */
export function recapDemande(langue: string, r: RecapDemande): string {
  const { libelles: L, deuxPoints } = textesDemande(langue);
  const ligne = (libelle: string, valeur: string) => `${libelle}${deuxPoints}${valeur}`;
  const categorie = (v: string) => v.charAt(0).toUpperCase() + v.slice(1);

  return [
    ligne(L.reference, r.reference),
    ligne(L.trajet, r.trajet),
    ligne(L.aller, r.aller),
    r.retour ? ligne(L.retour, r.trajetRetour ? `${r.retour} — ${r.trajetRetour}` : r.retour) : null,
    r.vehicule ? ligne(L.vehicule, categorie(r.vehicule)) : null,
    r.vehiculeRetour ? ligne(L.vehiculeRetour, categorie(r.vehiculeRetour)) : null,
    ligne(L.groupe, L.effectif(r.passagers, r.bagages, r.skis)),
    r.passagersRetour ? ligne(L.groupeRetour, L.effectif(r.passagersRetour, null, 0)) : null,
    ligne(L.adresse, r.adresse || L.adresseAConfirmer),
    r.vol ? ligne(L.vol, r.vol) : null,
    r.message ? ligne(L.remarques, r.message) : null,
    r.total ? ligne(L.total, r.total) : null,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}
