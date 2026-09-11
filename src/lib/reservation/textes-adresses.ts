import type { Lang } from "@/lib/i18n";

/**
 * Les mots de l'encadré « votre adresse en station », et de l'invitation qui y
 * mène depuis la page de confirmation.
 *
 * Le ton est celui d'une étape qui reste, pas d'une erreur : le client vient
 * de payer, tout va bien — il nous manque seulement de quoi le trouver. Et le
 * pourquoi est dit à chaque fois : un champ obligatoire sans raison se remplit
 * de n'importe quoi, un champ dont on comprend l'usage se remplit juste.
 */
export interface TextesAdresses {
  titre: string;
  manque: string;
  complet: string;
  adresseAller: (station: string) => string;
  adresseRetour: (station: string) => string;
  indice: string;
  memeAdresse: string;
  volRetour: string;
  facultatif: string;
  enregistrer: string;
  enregistrement: string;
  enregistre: string;
  verrouille: string;
  requise: string;
  erreur: string;
  lienInvalide: string;
  /** Sur la page de confirmation, juste après le paiement. */
  chapoConfirmation: string;
  boutonConfirmation: string;
}

export const TEXTES_ADRESSES: Record<Lang, TextesAdresses> = {
  en: {
    titre: "Your address in resort",
    manque:
      "We still need your address in resort — your driver needs it to drop you off and to pick you up.",
    complet:
      "Your driver has these addresses. You can correct them up to 24 hours before each pick-up.",
    adresseAller: (station) => `Drop-off address · ${station}`,
    adresseRetour: (station) => `Pick-up address for the return · ${station}`,
    indice: "Chalet, hotel or residence — with the street if you have it.",
    memeAdresse: "Same address for the return",
    volRetour: "Return flight number",
    facultatif: "(optional)",
    enregistrer: "Save",
    enregistrement: "Saving…",
    enregistre: "Saved — your driver has it.",
    verrouille: "Less than 24 hours before this pick-up: to change this address, call us.",
    requise: "Please enter the address — the driver cannot find you without it.",
    erreur: "We could not save it. Try again, or call us.",
    lienInvalide: "This link is no longer valid. Open it again from your confirmation email.",
    chapoConfirmation:
      "One step left: tell us your address in resort, so your driver knows where to drop you off and pick you up.",
    boutonConfirmation: "Add my address",
  },

  fr: {
    titre: "Votre adresse en station",
    manque:
      "Il nous manque votre adresse en station — votre chauffeur en a besoin pour vous déposer et venir vous chercher.",
    complet:
      "Votre chauffeur a ces adresses. Vous pouvez les corriger jusqu’à 24 heures avant chaque prise en charge.",
    adresseAller: (station) => `Adresse de dépose · ${station}`,
    adresseRetour: (station) => `Adresse de prise en charge au retour · ${station}`,
    indice: "Chalet, hôtel ou résidence — avec la rue si vous l’avez.",
    memeAdresse: "Même adresse pour le retour",
    volRetour: "Numéro du vol retour",
    facultatif: "(facultatif)",
    enregistrer: "Enregistrer",
    enregistrement: "Enregistrement…",
    enregistre: "C’est enregistré — votre chauffeur l’a.",
    verrouille:
      "Moins de 24 heures avant cette prise en charge : pour changer l’adresse, appelez-nous.",
    requise: "Indiquez l’adresse — sans elle, le chauffeur ne peut pas vous trouver.",
    erreur: "Nous n’avons pas pu l’enregistrer. Réessayez, ou appelez-nous.",
    lienInvalide: "Ce lien n’est plus valable. Rouvrez-le depuis votre e-mail de confirmation.",
    chapoConfirmation:
      "Il reste une étape : votre adresse en station, pour que votre chauffeur sache où vous déposer et où venir vous chercher.",
    boutonConfirmation: "Indiquer mon adresse",
  },

  de: {
    titre: "Ihre Adresse im Skiort",
    manque:
      "Uns fehlt noch Ihre Adresse im Skiort — Ihr Fahrer braucht sie, um Sie abzusetzen und wieder abzuholen.",
    complet:
      "Ihr Fahrer hat diese Adressen. Sie können sie bis 24 Stunden vor jeder Abholung korrigieren.",
    adresseAller: (station) => `Adresse bei der Ankunft · ${station}`,
    adresseRetour: (station) => `Abholadresse für die Rückfahrt · ${station}`,
    indice: "Chalet, Hotel oder Appartement — mit Straße, wenn Sie sie haben.",
    memeAdresse: "Gleiche Adresse für die Rückfahrt",
    volRetour: "Flugnummer der Rückreise",
    facultatif: "(optional)",
    enregistrer: "Speichern",
    enregistrement: "Wird gespeichert…",
    enregistre: "Gespeichert — Ihr Fahrer hat sie.",
    verrouille:
      "Weniger als 24 Stunden vor dieser Abholung: Um die Adresse zu ändern, rufen Sie uns an.",
    requise: "Bitte geben Sie die Adresse an — ohne sie findet der Fahrer Sie nicht.",
    erreur: "Wir konnten sie nicht speichern. Versuchen Sie es erneut oder rufen Sie an.",
    lienInvalide:
      "Dieser Link ist nicht mehr gültig. Öffnen Sie ihn erneut aus Ihrer Bestätigungs-E-Mail.",
    chapoConfirmation:
      "Ein Schritt fehlt noch: Ihre Adresse im Skiort, damit Ihr Fahrer weiß, wo er Sie absetzt und wieder abholt.",
    boutonConfirmation: "Meine Adresse angeben",
  },

  it: {
    titre: "Il tuo indirizzo in località",
    manque:
      "Ci manca ancora il tuo indirizzo in località — il tuo autista ne ha bisogno per lasciarti e per venirti a prendere.",
    complet:
      "Il tuo autista ha questi indirizzi. Puoi correggerli fino a 24 ore prima di ogni presa in carico.",
    adresseAller: (station) => `Indirizzo di arrivo · ${station}`,
    adresseRetour: (station) => `Indirizzo di partenza per il ritorno · ${station}`,
    indice: "Chalet, hotel o residence — con la via, se ce l’hai.",
    memeAdresse: "Stesso indirizzo per il ritorno",
    volRetour: "Numero del volo di ritorno",
    facultatif: "(facoltativo)",
    enregistrer: "Salva",
    enregistrement: "Salvataggio…",
    enregistre: "Salvato — il tuo autista ce l’ha.",
    verrouille:
      "Meno di 24 ore prima di questa presa in carico: per cambiare l’indirizzo, chiamaci.",
    requise: "Indica l’indirizzo — senza, l’autista non può trovarti.",
    erreur: "Non siamo riusciti a salvarlo. Riprova, oppure chiamaci.",
    lienInvalide: "Questo link non è più valido. Riaprilo dalla tua e-mail di conferma.",
    chapoConfirmation:
      "Manca un ultimo passo: il tuo indirizzo in località, perché l’autista sappia dove lasciarti e dove venirti a prendere.",
    boutonConfirmation: "Indica il mio indirizzo",
  },
};
