/**
 * Les libellés du tunnel de réservation, dans les quatre langues.
 *
 * Le moteur est le même partout : un seul composant, un seul calcul, un seul
 * comportement, un seul re-chiffrage côté serveur. Seuls les mots changent.
 * Dupliquer le tunnel pour le traduire aurait garanti que les versions divergent
 * au premier correctif — et sur un tunnel de paiement, une divergence se compte
 * en euros.
 */

import type { Lang } from "@/lib/i18n";

export type LangueTunnel = Lang;

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

  /**
   * Allemand. « Abholung » plutôt que « Abfahrt » pour la prise en charge :
   * c'est le mot des transferts, pas celui des horaires de train. Le vouvoiement
   * est de rigueur sur un site commercial en allemand.
   */
  de: {
    etapes: ["Fahrt", "Fahrzeug und Preis", "Kontaktdaten"],
    devise: "Währung",
    de: "Von",
    vers: "Nach",
    deIndice: "Flughafen, Skiort oder Adresse",
    versIndice: "Skiort, Flughafen oder Adresse",
    inverser: "Abholung und Ziel tauschen",
    arrivee: "Ankunftsdatum und -zeit",
    passagers: "Personen",
    bagages: "Koffer",
    housses: "Skisäcke",
    noteBagages:
      "Das Gepäck bestimmt das Fahrzeug: Wir fragen davor danach, nicht danach.",
    retour: "Rückfahrt",
    retourCase: "Ich brauche auch die Rückfahrt",
    retourQuand: "Abholung für die Rückfahrt",
    retourAilleurs: "Meine Rückfahrt startet oder endet woanders",
    retourDe: "Rückfahrt ab",
    retourVers: "Rückfahrt nach",
    voirPrix: "Preise anzeigen",
    calculEnCours: "Wird berechnet …",
    parVehicule: "pro Fahrzeug",
    parVehiculeAllerRetour: "Hin- und Rückfahrt, pro Fahrzeug",
    remiseRetour: "Rabatt für Hin- und Rückfahrt",
    jusqua: "Bis zu",
    pieces: "Gepäckstücke",
    noteInclus:
      "Die Preise gelten pro Fahrzeug und nicht pro Person — Skisäcke, Kindersitze, Maut, Flugüberwachung und Wartezeit inklusive.",
    noteDevise: (code) =>
      ` Beträge in ${code} sind Richtwerte — abgerechnet wird in Euro.`,
    nom: "Hauptreisender",
    email: "E-Mail",
    telephone: "Mobiltelefon",
    vol: "Flugnummer",
    adresse: "Adresse im Skiort",
    adresseIndice: "Chalet, Hotel oder Appartement",
    enfants: "Alter der Kinder, für die richtigen Sitze",
    enfantsIndice: "zum Beispiel 3 und 7",
    message: "Sonstige Hinweise",
    sansPaiement:
      "Wir bestätigen diesen Transfer per E-Mail, statt online abzubuchen: Sie erhalten den Preis schriftlich, und vor Ihrer Zustimmung wird nichts belastet.",
    payer: (prix) => `${prix} zahlen und bestätigen`,
    demander: "Diesen Transfer anfragen",
    envoiEnCours: "Wird gesendet …",
    modifier: "Ändern",
    recuTitre: "Anfrage eingegangen",
    recuTexte: (de, vers) =>
      `Ihre Fahrt von ${de} nach ${vers} liegt uns vor. Wir bestätigen per E-Mail, in der Regel innerhalb weniger Stunden.`,
    reference: "Ihre Referenz",
    retourSite: "Zurück zur Website",
    erreurReseau: "Netzwerkfehler — bitte erneut versuchen.",
    erreurPrix: "Wir konnten diese Fahrt nicht berechnen.",
    erreurEnvoi: "Wir konnten Ihre Anfrage nicht speichern.",
    demandeDevis: "Fragen Sie uns nach einem Angebot",
  },

  /**
   * Italien. Le tutoiement est l'usage sur les sites de voyage italiens, y
   * compris commerciaux — le vouvoiement y sonne administratif.
   */
  it: {
    etapes: ["Tragitto", "Veicolo e prezzo", "Dati di contatto"],
    devise: "Valuta",
    de: "Partenza",
    vers: "Arrivo",
    deIndice: "Aeroporto, località o indirizzo",
    versIndice: "Località, aeroporto o indirizzo",
    inverser: "Inverti partenza e arrivo",
    arrivee: "Data e ora di arrivo",
    passagers: "Passeggeri",
    bagages: "Valigie",
    housses: "Sacche da sci",
    noteBagages:
      "È il bagaglio a decidere il veicolo: lo chiediamo prima del preventivo, non dopo.",
    retour: "Ritorno",
    retourCase: "Mi serve anche il ritorno",
    retourQuand: "Presa in carico per il ritorno",
    retourAilleurs: "Il ritorno parte o arriva altrove",
    retourDe: "Ritorno da",
    retourVers: "Ritorno verso",
    voirPrix: "Vedi i prezzi",
    calculEnCours: "Calcolo in corso…",
    parVehicule: "per veicolo",
    parVehiculeAllerRetour: "andata e ritorno, per veicolo",
    remiseRetour: "sconto andata e ritorno",
    jusqua: "Fino a",
    pieces: "colli",
    noteInclus:
      "I prezzi sono per veicolo e non per persona: sacche da sci, seggiolini, pedaggi, monitoraggio del volo e tempo di attesa inclusi.",
    noteDevise: (code) =>
      ` Gli importi in ${code} sono indicativi — la fattura è in euro.`,
    nom: "Passeggero principale",
    email: "E-mail",
    telephone: "Cellulare",
    vol: "Numero del volo",
    adresse: "Indirizzo in località",
    adresseIndice: "Chalet, hotel o residence",
    enfants: "Età dei bambini, per i seggiolini giusti",
    enfantsIndice: "per esempio 3 e 7",
    message: "Altro da segnalarci",
    sansPaiement:
      "Confermiamo questo trasferimento via e-mail invece di incassare online: avrai il prezzo per iscritto, e nulla viene addebitato prima del tuo accordo.",
    payer: (prix) => `Paga ${prix} e conferma`,
    demander: "Richiedi questo trasferimento",
    envoiEnCours: "Invio…",
    modifier: "Modifica",
    recuTitre: "Richiesta ricevuta",
    recuTexte: (de, vers) =>
      `Abbiamo il tuo tragitto da ${de} a ${vers} e ti confermiamo via e-mail, di solito entro poche ore.`,
    reference: "Il tuo riferimento",
    retourSite: "Torna al sito",
    erreurReseau: "Errore di rete — riprova.",
    erreurPrix: "Non siamo riusciti a calcolare questo tragitto.",
    erreurEnvoi: "Non siamo riusciti a registrare la tua richiesta.",
    demandeDevis: "Chiedici un preventivo",
  },
};
