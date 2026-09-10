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

/* ------------------------------------------------------- champ de lieu */

/**
 * Les libellés du champ de lieu, partagés par le tunnel et par le formulaire de
 * recherche de la home.
 *
 * Ils vivaient en ternaire `langue === "fr" ? … : …` dans `ChampLieu` : un
 * Allemand qui tapait une adresse non reconnue se voyait donc réclamer un
 * « Postcode » en anglais au milieu d'un formulaire allemand. Quatre langues,
 * quatre entrées, et le composant n'a plus de mots à lui.
 */
export interface TextesLieu {
  nonReconnue: string;
  codePostal: string;
  ville: string;
}

export const TEXTES_LIEU: Record<Lang, TextesLieu> = {
  en: {
    nonReconnue: "Address not recognised — tell us the town:",
    codePostal: "Postcode",
    ville: "Town",
  },
  fr: {
    nonReconnue: "Adresse non reconnue — précisez la commune :",
    codePostal: "Code postal",
    ville: "Ville",
  },
  de: {
    nonReconnue: "Adresse nicht erkannt — nennen Sie uns den Ort:",
    codePostal: "PLZ",
    ville: "Ort",
  },
  it: {
    nonReconnue: "Indirizzo non riconosciuto — indica il comune:",
    codePostal: "CAP",
    ville: "Città",
  },
};

/* ------------------------------------------------ recherche de la home */

/**
 * Les libellés du formulaire de recherche du bandeau d'accueil.
 *
 * Distincts de ceux du tunnel : ce formulaire pose quatre questions, pas
 * quinze, et ses mots sont ceux d'une recherche — « Get my price » — quand ceux
 * du tunnel sont ceux d'une commande. Les partager aurait obligé à choisir un
 * seul ton pour les deux.
 */
export interface TextesRecherche {
  titreAccessible: string;
  quand: string;
  depart: string;
  departIndice: string;
  arrivee: string;
  arriveeIndice: string;
  passagers: string;
  typeTrajet: string;
  allerRetour: string;
  allerSimple: string;
  action: string;
}

export const TEXTES_RECHERCHE: Record<Lang, TextesRecherche> = {
  en: {
    titreAccessible: "Search for a transfer",
    quand: "Departure date and time",
    depart: "Pick-up location",
    departIndice: "Airport, resort, or address with postcode",
    arrivee: "Drop-off location",
    arriveeIndice: "Resort, or address with postcode and town",
    passagers: "How many people (including children)",
    typeTrajet: "Trip type",
    allerRetour: "Return",
    allerSimple: "One-way",
    action: "Get my price",
  },
  fr: {
    titreAccessible: "Rechercher un transfert",
    quand: "Date et heure de départ",
    depart: "Lieu de prise en charge",
    departIndice: "Aéroport, station, ou adresse avec code postal",
    arrivee: "Lieu de dépose",
    arriveeIndice: "Station, ou adresse avec code postal et commune",
    passagers: "Combien de personnes (enfants compris)",
    typeTrajet: "Type de trajet",
    allerRetour: "Aller-retour",
    allerSimple: "Aller simple",
    action: "Voir mon prix",
  },
  de: {
    titreAccessible: "Transfer suchen",
    quand: "Datum und Uhrzeit der Abholung",
    depart: "Abholort",
    departIndice: "Flughafen, Skiort oder Adresse mit PLZ",
    arrivee: "Zielort",
    arriveeIndice: "Skiort oder Adresse mit PLZ und Ort",
    passagers: "Wie viele Personen (Kinder eingeschlossen)",
    typeTrajet: "Fahrtart",
    allerRetour: "Hin und zurück",
    allerSimple: "Nur Hinfahrt",
    action: "Preis anzeigen",
  },
  it: {
    titreAccessible: "Cerca un trasferimento",
    quand: "Data e ora di partenza",
    depart: "Luogo di partenza",
    departIndice: "Aeroporto, località o indirizzo con CAP",
    arrivee: "Luogo di arrivo",
    arriveeIndice: "Località o indirizzo con CAP e comune",
    passagers: "Quante persone (bambini compresi)",
    typeTrajet: "Tipo di tragitto",
    allerRetour: "Andata e ritorno",
    allerSimple: "Solo andata",
    action: "Vedi il prezzo",
  },
};

/* ------------------------------------------------------------------ panier */

/**
 * Les libellés du panier.
 *
 * Le panier n'existait qu'en anglais : son icône était masquée partout ailleurs
 * — « le panier vit avec le tunnel anglais », disait le commentaire de l'en-tête
 * — si bien qu'un visiteur français pouvait mettre un transfert de côté depuis
 * une page de trajet, puis ne plus trouver où le retrouver en changeant de page.
 * Un panier invisible est un panier perdu, et une réservation avec.
 *
 * Le composant est le même dans les quatre langues, et le re-chiffrage côté
 * serveur aussi : seuls les mots changent. C'est la règle du tunnel, pour la
 * même raison — deux paniers, c'est deux fois le risque qu'un montant diverge.
 */
export interface TextesPanier {
  titre: string;
  fil: string;
  chapo: string;
  metaDescription: string;
  vide: string;
  videTexte: string;
  trouverTransfert: string;
  passager: (n: number) => string;
  calculEnCours: string;
  retirer: string;
  vider: string;
  ecartPrix: (avant: string, apres: string) => string;
  total: string;
  lignesEtInclus: (n: number) => string;
  devisNecessaire: string;
  continuer: string;
  demander: string;
  nom: string;
  email: string;
  telephone: string;
  optionnel: string;
  envoiEnCours: string;
  payer: string;
  envoyer: string;
  noteRecalcul: string;
  ajouterUnAutre: string;
  devisSurDemande: string;
  prixIndisponible: string;
  erreurCoordonnees: string;
  erreurTraitement: string;
  erreurReseau: string;
  recuTitre: string;
  recuTexte: (reference: string) => string;
}

export const TEXTES_PANIER: Record<Lang, TextesPanier> = {
  en: {
    titre: "Your transfers",
    fil: "Your transfers",
    chapo: "The transfers you have set aside, priced together and booked in one go.",
    metaDescription: "The transfers you have selected, ready to book together.",
    vide: "Your list is empty",
    videTexte:
      "Add a transfer and it stays here while you plan the rest of the trip — the outbound and the return are paid together.",
    trouverTransfert: "Find a transfer",
    passager: (n) => (n > 1 ? `${n} passengers` : "1 passenger"),
    calculEnCours: "Checking…",
    retirer: "Remove",
    vider: "Empty the list",
    ecartPrix: (avant, apres) =>
      `The price has changed since you added this journey: ${avant} → ${apres}. The figure above is the one that applies.`,
    total: "Total",
    lignesEtInclus: (n) =>
      `${n} ${n > 1 ? "transfers" : "transfer"} · tolls and ski carriage included`,
    devisNecessaire:
      "One of these journeys needs a quote by hand. Send it to us and we price the whole list together.",
    continuer: "Continue to booking",
    demander: "Request these transfers",
    nom: "Your name",
    email: "Email",
    telephone: "Phone",
    optionnel: "(optional)",
    envoiEnCours: "One moment…",
    payer: "Pay for these transfers",
    envoyer: "Send the request",
    noteRecalcul:
      "The total is recalculated by our system before payment — the figure above is what you will be charged.",
    ajouterUnAutre: "Add another transfer",
    devisSurDemande: "Quote on request",
    prixIndisponible: "Price unavailable",
    erreurCoordonnees: "Please check your name and email address.",
    erreurTraitement: "We could not process this list. Please try again.",
    erreurReseau: "We could not reach our booking system. Please try again in a moment.",
    recuTitre: "Request received",
    recuTexte: (reference) =>
      `We have your list and will confirm by email, usually within a few hours. Your reference is ${reference}.`,
  },

  fr: {
    titre: "Vos transferts",
    fil: "Vos transferts",
    chapo: "Les transferts que vous avez mis de côté, chiffrés ensemble et réservés en une fois.",
    metaDescription: "Les transferts que vous avez retenus, prêts à être réservés ensemble.",
    vide: "Votre liste est vide",
    videTexte:
      "Ajoutez un transfert : il vous attend ici pendant que vous organisez le reste du voyage — l’aller et le retour se règlent ensemble.",
    trouverTransfert: "Trouver un transfert",
    passager: (n) => (n > 1 ? `${n} passagers` : "1 passager"),
    calculEnCours: "Calcul…",
    retirer: "Retirer",
    vider: "Vider la liste",
    ecartPrix: (avant, apres) =>
      `Le prix a changé depuis l’ajout de ce trajet : ${avant} → ${apres}. C’est le montant ci-dessus qui s’applique.`,
    total: "Total",
    lignesEtInclus: (n) =>
      `${n} transfert${n > 1 ? "s" : ""} · péages et housses à skis compris`,
    devisNecessaire:
      "L’un de ces trajets demande un devis à la main. Envoyez-le-nous et nous chiffrons la liste entière ensemble.",
    continuer: "Passer à la réservation",
    demander: "Demander ces transferts",
    nom: "Votre nom",
    email: "E-mail",
    telephone: "Téléphone",
    optionnel: "(facultatif)",
    envoiEnCours: "Un instant…",
    payer: "Payer ces transferts",
    envoyer: "Envoyer la demande",
    noteRecalcul:
      "Le total est recalculé par notre système avant le paiement — le montant ci-dessus est celui qui sera débité.",
    ajouterUnAutre: "Ajouter un autre transfert",
    devisSurDemande: "Devis sur demande",
    prixIndisponible: "Prix indisponible",
    erreurCoordonnees: "Vérifiez votre nom et votre adresse e-mail.",
    erreurTraitement: "Nous n’avons pas pu traiter cette liste. Merci de réessayer.",
    erreurReseau: "Nous n’avons pas pu joindre notre système de réservation. Réessayez dans un instant.",
    recuTitre: "Demande reçue",
    recuTexte: (reference) =>
      `Nous avons votre liste et vous confirmons par e-mail, en général dans les heures qui suivent. Votre référence est ${reference}.`,
  },

  de: {
    titre: "Ihre Transfers",
    fil: "Ihre Transfers",
    chapo: "Die Transfers, die Sie vorgemerkt haben — gemeinsam berechnet und in einem Zug gebucht.",
    metaDescription: "Die von Ihnen ausgewählten Transfers, bereit zur gemeinsamen Buchung.",
    vide: "Ihre Liste ist leer",
    videTexte:
      "Legen Sie einen Transfer ab: er bleibt hier, während Sie den Rest der Reise planen — Hin- und Rückfahrt werden zusammen bezahlt.",
    trouverTransfert: "Transfer finden",
    passager: (n) => (n > 1 ? `${n} Personen` : "1 Person"),
    calculEnCours: "Wird berechnet…",
    retirer: "Entfernen",
    vider: "Liste leeren",
    ecartPrix: (avant, apres) =>
      `Der Preis hat sich seit dem Hinzufügen geändert: ${avant} → ${apres}. Es gilt der Betrag oben.`,
    total: "Gesamt",
    lignesEtInclus: (n) =>
      `${n} Transfer${n > 1 ? "s" : ""} · Maut und Skitransport inklusive`,
    devisNecessaire:
      "Eine dieser Fahrten braucht ein Angebot von Hand. Schicken Sie sie uns, wir berechnen die ganze Liste gemeinsam.",
    continuer: "Weiter zur Buchung",
    demander: "Diese Transfers anfragen",
    nom: "Ihr Name",
    email: "E-Mail",
    telephone: "Telefon",
    optionnel: "(optional)",
    envoiEnCours: "Einen Moment…",
    payer: "Diese Transfers bezahlen",
    envoyer: "Anfrage senden",
    noteRecalcul:
      "Die Summe wird vor der Zahlung von unserem System neu berechnet — der Betrag oben ist der, der abgebucht wird.",
    ajouterUnAutre: "Weiteren Transfer hinzufügen",
    devisSurDemande: "Angebot auf Anfrage",
    prixIndisponible: "Preis nicht verfügbar",
    erreurCoordonnees: "Bitte prüfen Sie Name und E-Mail-Adresse.",
    erreurTraitement: "Wir konnten diese Liste nicht verarbeiten. Bitte versuchen Sie es erneut.",
    erreurReseau: "Wir konnten unser Buchungssystem nicht erreichen. Bitte gleich noch einmal versuchen.",
    recuTitre: "Anfrage erhalten",
    recuTexte: (reference) =>
      `Wir haben Ihre Liste und bestätigen per E-Mail, in der Regel innerhalb weniger Stunden. Ihre Referenz lautet ${reference}.`,
  },

  it: {
    titre: "I tuoi transfer",
    fil: "I tuoi transfer",
    chapo: "I transfer che hai messo da parte, calcolati insieme e prenotati in una volta sola.",
    metaDescription: "I transfer che hai selezionato, pronti per essere prenotati insieme.",
    vide: "La tua lista è vuota",
    videTexte:
      "Aggiungi un transfer: resta qui mentre organizzi il resto del viaggio — andata e ritorno si pagano insieme.",
    trouverTransfert: "Trova un transfer",
    passager: (n) => (n > 1 ? `${n} passeggeri` : "1 passeggero"),
    calculEnCours: "Calcolo…",
    retirer: "Rimuovi",
    vider: "Svuota la lista",
    ecartPrix: (avant, apres) =>
      `Il prezzo è cambiato da quando hai aggiunto questo tragitto: ${avant} → ${apres}. Vale l’importo qui sopra.`,
    total: "Totale",
    lignesEtInclus: (n) =>
      `${n} transfer · pedaggi e trasporto sci inclusi`,
    devisNecessaire:
      "Uno di questi tragitti richiede un preventivo a mano. Inviacelo e calcoliamo l’intera lista insieme.",
    continuer: "Vai alla prenotazione",
    demander: "Richiedi questi transfer",
    nom: "Il tuo nome",
    email: "E-mail",
    telephone: "Telefono",
    optionnel: "(facoltativo)",
    envoiEnCours: "Un attimo…",
    payer: "Paga questi transfer",
    envoyer: "Invia la richiesta",
    noteRecalcul:
      "Il totale viene ricalcolato dal nostro sistema prima del pagamento — l’importo qui sopra è quello che verrà addebitato.",
    ajouterUnAutre: "Aggiungi un altro transfer",
    devisSurDemande: "Preventivo su richiesta",
    prixIndisponible: "Prezzo non disponibile",
    erreurCoordonnees: "Controlla nome e indirizzo e-mail.",
    erreurTraitement: "Non siamo riusciti a elaborare questa lista. Riprova.",
    erreurReseau: "Non siamo riusciti a raggiungere il sistema di prenotazione. Riprova tra un istante.",
    recuTitre: "Richiesta ricevuta",
    recuTexte: (reference) =>
      `Abbiamo la tua lista e ti confermiamo via e-mail, di solito entro poche ore. Il tuo riferimento è ${reference}.`,
  },
};

/**
 * Le chemin du panier, par langue.
 *
 * Le slug est un mot du marché, comme celui de la réservation : « warenkorb »
 * et « carrello » sont ce que ces visiteurs cherchent. L'anglais garde `/cart/`,
 * l'URL du panier WooCommerce, déjà sortie de l'index par le proxy.
 */
export const CHEMIN_PANIER: Record<Lang, string> = {
  en: "/cart/",
  fr: "/fr/panier/",
  de: "/de/warenkorb/",
  it: "/it/carrello/",
};
