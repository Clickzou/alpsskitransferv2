/**
 * Les libellés du tunnel de réservation, en anglais et en français.
 *
 * Le moteur est le même des deux côtés : un seul composant, un seul calcul, un
 * seul comportement. Seuls les mots changent. Dupliquer le tunnel pour le
 * traduire aurait garanti que les deux versions divergent au premier correctif.
 */

export type LangueTunnel = "en" | "fr";

export interface TextesTunnel {
  etapes: [string, string, string];
  devise: string;
  de: string;
  vers: string;
  deIndice: string;
  versIndice: string;
  inverser: string;
  arrivee: string;
  passagers: string;
  bagages: string;
  housses: string;
  noteBagages: string;
  retour: string;
  retourCase: string;
  retourQuand: string;
  retourAilleurs: string;
  retourDe: string;
  retourVers: string;
  voirPrix: string;
  calculEnCours: string;
  parVehicule: string;
  parVehiculeAllerRetour: string;
  remiseRetour: string;
  jusqua: string;
  pieces: string;
  noteInclus: string;
  noteDevise: (code: string) => string;
  nom: string;
  email: string;
  telephone: string;
  vol: string;
  adresse: string;
  adresseIndice: string;
  enfants: string;
  enfantsIndice: string;
  message: string;
  sansPaiement: string;
  payer: (prix: string) => string;
  demander: string;
  envoiEnCours: string;
  modifier: string;
  recuTitre: string;
  recuTexte: (de: string, vers: string) => string;
  reference: string;
  retourSite: string;
  erreurReseau: string;
  erreurPrix: string;
  erreurEnvoi: string;
  demandeDevis: string;
}

export const TEXTES: Record<LangueTunnel, TextesTunnel> = {
  en: {
    etapes: ["Journey", "Vehicle and price", "Details"],
    devise: "Currency",
    de: "From",
    vers: "To",
    deIndice: "Airport, resort or address",
    versIndice: "Resort, airport or address",
    inverser: "Swap pick-up and drop-off",
    arrivee: "Arrival date and time",
    passagers: "Passengers",
    bagages: "Bags",
    housses: "Ski bags",
    noteBagages:
      "Bags and ski bags decide the vehicle, so we ask before quoting rather than after.",
    retour: "Return",
    retourCase: "I also need a transfer back",
    retourQuand: "Return pick-up",
    retourAilleurs: "My return starts or ends somewhere else",
    retourDe: "Return from",
    retourVers: "Return to",
    voirPrix: "See prices",
    calculEnCours: "Pricing your journey…",
    parVehicule: "per vehicle",
    parVehiculeAllerRetour: "both ways, per vehicle",
    remiseRetour: "return discount",
    jusqua: "Up to",
    pieces: "pieces of luggage",
    noteInclus:
      "Prices are per vehicle, not per person, and include ski and snowboard bags, child seats, tolls, flight tracking and waiting time.",
    noteDevise: (code) => ` Amounts in ${code} are indicative — the charge is made in euros.`,
    nom: "Lead passenger",
    email: "Email",
    telephone: "Mobile number",
    vol: "Flight number",
    adresse: "Address in resort",
    adresseIndice: "Chalet, hotel or residence",
    enfants: "Children’s ages, for the right seats",
    enfantsIndice: "e.g. 3 and 7",
    message: "Anything else we should know",
    sansPaiement:
      "We confirm this transfer by email rather than taking payment online: you will have the price in writing, and nothing is charged until you accept it.",
    payer: (prix) => `Pay ${prix} and confirm`,
    demander: "Request this transfer",
    envoiEnCours: "Sending…",
    modifier: "Change",
    recuTitre: "Request received",
    recuTexte: (de, vers) =>
      `We have your journey from ${de} to ${vers} and will confirm by email, usually within a few hours.`,
    reference: "Your reference",
    retourSite: "Back to the site",
    erreurReseau: "Network error — please try again.",
    erreurPrix: "We could not price this journey.",
    erreurEnvoi: "We could not record your request.",
    demandeDevis: "Ask us for a quote",
  },

  fr: {
    etapes: ["Trajet", "Véhicule et prix", "Coordonnées"],
    devise: "Devise",
    de: "Départ",
    vers: "Arrivée",
    deIndice: "Aéroport, station ou adresse",
    versIndice: "Station, aéroport ou adresse",
    inverser: "Inverser le départ et l’arrivée",
    arrivee: "Date et heure d’arrivée",
    passagers: "Passagers",
    bagages: "Valises",
    housses: "Housses à skis",
    noteBagages:
      "Les bagages déterminent le véhicule : nous les demandons avant de chiffrer, pas après.",
    retour: "Retour",
    retourCase: "J’ai aussi besoin du trajet retour",
    retourQuand: "Prise en charge du retour",
    retourAilleurs: "Mon retour part ou arrive ailleurs",
    retourDe: "Retour depuis",
    retourVers: "Retour vers",
    voirPrix: "Voir les prix",
    calculEnCours: "Calcul en cours…",
    parVehicule: "par véhicule",
    parVehiculeAllerRetour: "aller-retour, par véhicule",
    remiseRetour: "remise aller-retour",
    jusqua: "Jusqu’à",
    pieces: "pièces de bagage",
    noteInclus:
      "Les prix sont par véhicule et non par personne, housses à skis, sièges enfants, péages, suivi du vol et temps d’attente compris.",
    noteDevise: (code) =>
      ` Les montants en ${code} sont indicatifs — la facturation se fait en euros.`,
    nom: "Passager principal",
    email: "E-mail",
    telephone: "Téléphone mobile",
    vol: "Numéro de vol",
    adresse: "Adresse en station",
    adresseIndice: "Chalet, hôtel ou résidence",
    enfants: "Âge des enfants, pour les bons sièges",
    enfantsIndice: "par exemple 3 et 7",
    message: "Autre chose à nous signaler",
    sansPaiement:
      "Nous confirmons ce transfert par e-mail plutôt que d’encaisser en ligne : vous aurez le prix par écrit, et rien n’est débité avant votre accord.",
    payer: (prix) => `Payer ${prix} et confirmer`,
    demander: "Demander ce transfert",
    envoiEnCours: "Envoi…",
    modifier: "Modifier",
    recuTitre: "Demande reçue",
    recuTexte: (de, vers) =>
      `Nous avons votre trajet de ${de} à ${vers} et vous confirmons par e-mail, en général dans les heures qui suivent.`,
    reference: "Votre référence",
    retourSite: "Retour au site",
    erreurReseau: "Erreur réseau — merci de réessayer.",
    erreurPrix: "Nous n’avons pas pu chiffrer ce trajet.",
    erreurEnvoi: "Nous n’avons pas pu enregistrer votre demande.",
    demandeDevis: "Demandez-nous un devis",
  },
};
