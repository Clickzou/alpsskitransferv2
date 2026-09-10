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
  retourPassagers: string;
  retourDe: string;
  retourVers: string;
  voirPrix: string;
  calculEnCours: string;
  /* L'ecran du choix du vehicule : un titre, et ce que le clic fait. */
  titreVehicule: string;
  sousTitreVehicule: string;
  /* Un aller-retour se choisit sens par sens : deux listes, deux titres. */
  titreVehiculeDeuxSens: string;
  sousTitreVehiculeDeuxSens: string;
  vehiculeAller: string;
  vehiculeRetour: string;
  choisi: string;
  totalDeuxSens: string;
  continuerVehicule: string;
  choisirRetour: string;
  aller: string;
  recapPassagers: (n: number) => string;
  recapBagages: (sacs: number, housses: number) => string;
  ajouterListe: string;
  ajoutFait: string;
  ajoutDeja: string;
  ajoutPlein: string;
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
  /* Ce qu'on doit remplir, et ce qu'on peut laisser vide. */
  obligatoire: string;
  facultatif: string;
  adresse: string;
  adresseIndice: string;
  enfants: string;
  enfantsIndice: string;
  precisions: string;
  detailAttente: string;
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
    retourPassagers: "People on the return",
    retourDe: "Return from",
    retourVers: "Return to",
    voirPrix: "See prices",
    calculEnCours: "Pricing your journey…",
    titreVehicule: "Choose your vehicle",
    sousTitreVehicule: "One price for the whole vehicle, not per seat. Tap a vehicle to continue.",
    titreVehiculeDeuxSens: "Choose a vehicle for each journey",
    sousTitreVehiculeDeuxSens:
      "One price for the whole vehicle, not per seat. The two journeys are priced separately, so a smaller group on one of them pays for a smaller vehicle.",
    vehiculeAller: "Vehicle for the outbound journey",
    vehiculeRetour: "Vehicle for the return journey",
    choisi: "Selected",
    totalDeuxSens: "Total for both journeys",
    continuerVehicule: "Continue",
    choisirRetour: "Now choose the vehicle for your return.",
    aller: "Outbound",
    recapPassagers: (n) => `${n} passenger${n > 1 ? "s" : ""}`,
    recapBagages: (sacs, housses) =>
      `${sacs} bag${sacs > 1 ? "s" : ""}, ${housses} ski bag${housses > 1 ? "s" : ""}`,
    ajouterListe: "Booking more than one journey? Add this one to my list",
    ajoutFait: "Added — your list is in the menu.",
    ajoutDeja: "Already in your list.",
    ajoutPlein: "Your list is full.",
    parVehicule: "per vehicle",
    parVehiculeAllerRetour: "both ways, per vehicle",
    remiseRetour: "return discount",
    jusqua: "Up to",
    pieces: "pieces of luggage",
    noteInclus:
      "Prices are per vehicle, not per person, and include ski and snowboard bags, child seats, tolls and flight tracking. One hour of waiting is included — from the actual landing time if your flight is delayed; beyond that, €25 per quarter of an hour started.",
    noteDevise: (code) => ` Amounts in ${code} are indicative — the charge is made in euros.`,
    nom: "Lead passenger",
    email: "Email",
    telephone: "Mobile number",
    vol: "Flight number",
    obligatoire: "required",
    facultatif: "optional",
    adresse: "Address in resort",
    adresseIndice: "Chalet, hotel or residence",
    enfants: "Children’s ages, for the right seats",
    enfantsIndice: "e.g. 3 and 7",
    precisions: "Add child seats or a note (optional)",
    detailAttente: "Read the full waiting rule",
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
    retourPassagers: "Personnes au retour",
    retourDe: "Retour depuis",
    retourVers: "Retour vers",
    voirPrix: "Voir les prix",
    calculEnCours: "Calcul en cours…",
    titreVehicule: "Choisissez votre véhicule",
    sousTitreVehicule:
      "Un prix pour le véhicule entier, pas par place. Cliquez sur un véhicule pour continuer.",
    titreVehiculeDeuxSens: "Choisissez un véhicule pour chaque trajet",
    sousTitreVehiculeDeuxSens:
      "Un prix pour le véhicule entier, pas par place. Les deux trajets sont chiffrés séparément : un groupe plus petit sur l'un des deux paie un véhicule plus petit.",
    vehiculeAller: "Véhicule pour l'aller",
    vehiculeRetour: "Véhicule pour le retour",
    choisi: "Choisi",
    totalDeuxSens: "Total pour les deux trajets",
    continuerVehicule: "Continuer",
    choisirRetour: "Choisissez maintenant le véhicule du retour.",
    aller: "Aller",
    recapPassagers: (n) => `${n} passager${n > 1 ? "s" : ""}`,
    recapBagages: (sacs, housses) =>
      `${sacs} bagage${sacs > 1 ? "s" : ""}, ${housses} housse${housses > 1 ? "s" : ""} à skis`,
    ajouterListe: "Vous réservez plusieurs trajets ? Ajouter celui-ci à ma liste",
    ajoutFait: "Ajouté — votre liste est dans le menu.",
    ajoutDeja: "Déjà dans votre liste.",
    ajoutPlein: "Votre liste est pleine.",
    parVehicule: "par véhicule",
    parVehiculeAllerRetour: "aller-retour, par véhicule",
    remiseRetour: "remise aller-retour",
    jusqua: "Jusqu’à",
    pieces: "pièces de bagage",
    noteInclus:
      "Les prix sont par véhicule et non par personne : housses à skis, sièges enfants, péages et suivi du vol compris. Une heure d’attente est comprise — décomptée de l’atterrissage réel si votre vol a du retard ; au-delà, 25 € par quart d’heure entamé.",
    noteDevise: (code) =>
      ` Les montants en ${code} sont indicatifs — la facturation se fait en euros.`,
    nom: "Passager principal",
    email: "E-mail",
    telephone: "Téléphone mobile",
    vol: "Numéro de vol",
    obligatoire: "obligatoire",
    facultatif: "facultatif",
    adresse: "Adresse en station",
    adresseIndice: "Chalet, hôtel ou résidence",
    enfants: "Âge des enfants, pour les bons sièges",
    enfantsIndice: "par exemple 3 et 7",
    precisions: "Ajouter des sièges enfants ou une précision (facultatif)",
    detailAttente: "Lire la règle d’attente en entier",
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
    retourPassagers: "Personen auf der Rückfahrt",
    retourDe: "Rückfahrt ab",
    retourVers: "Rückfahrt nach",
    voirPrix: "Preise anzeigen",
    calculEnCours: "Wird berechnet …",
    titreVehicule: "Wählen Sie Ihr Fahrzeug",
    sousTitreVehicule:
      "Ein Preis für das ganze Fahrzeug, nicht pro Sitzplatz. Fahrzeug antippen, um fortzufahren.",
    titreVehiculeDeuxSens: "Wählen Sie ein Fahrzeug für jede Fahrt",
    sousTitreVehiculeDeuxSens:
      "Ein Preis für das ganze Fahrzeug, nicht pro Sitzplatz. Beide Fahrten werden getrennt berechnet: Für eine kleinere Gruppe genügt ein kleineres Fahrzeug.",
    vehiculeAller: "Fahrzeug für die Hinfahrt",
    vehiculeRetour: "Fahrzeug für die Rückfahrt",
    choisi: "Gewählt",
    totalDeuxSens: "Gesamt für beide Fahrten",
    continuerVehicule: "Weiter",
    choisirRetour: "Wählen Sie nun das Fahrzeug für die Rückfahrt.",
    aller: "Hinfahrt",
    recapPassagers: (n) => `${n} Person${n > 1 ? "en" : ""}`,
    recapBagages: (sacs, housses) =>
      `${sacs} Gepäckstück${sacs > 1 ? "e" : ""}, ${housses} ${housses > 1 ? "Skisäcke" : "Skisack"}`,
    ajouterListe: "Mehrere Fahrten? Diese zu meiner Liste hinzufügen",
    ajoutFait: "Hinzugefügt — Ihre Liste steht im Menü.",
    ajoutDeja: "Schon in Ihrer Liste.",
    ajoutPlein: "Ihre Liste ist voll.",
    parVehicule: "pro Fahrzeug",
    parVehiculeAllerRetour: "Hin- und Rückfahrt, pro Fahrzeug",
    remiseRetour: "Rabatt für Hin- und Rückfahrt",
    jusqua: "Bis zu",
    pieces: "Gepäckstücke",
    noteInclus:
      "Die Preise gelten pro Fahrzeug und nicht pro Person — Skisäcke, Kindersitze, Maut und Flugüberwachung inklusive. Eine Stunde Wartezeit ist enthalten — bei Verspätung ab der tatsächlichen Landung; danach 25 € je angefangene Viertelstunde.",
    noteDevise: (code) =>
      ` Beträge in ${code} sind Richtwerte — abgerechnet wird in Euro.`,
    nom: "Hauptreisender",
    email: "E-Mail",
    telephone: "Mobiltelefon",
    vol: "Flugnummer",
    obligatoire: "Pflichtfeld",
    facultatif: "optional",
    adresse: "Adresse im Skiort",
    adresseIndice: "Chalet, Hotel oder Appartement",
    enfants: "Alter der Kinder, für die richtigen Sitze",
    enfantsIndice: "zum Beispiel 3 und 7",
    precisions: "Kindersitze oder Hinweis hinzufügen (optional)",
    detailAttente: "Die vollständige Warteregel lesen",
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
    retourPassagers: "Persone al ritorno",
    retourDe: "Ritorno da",
    retourVers: "Ritorno verso",
    voirPrix: "Vedi i prezzi",
    calculEnCours: "Calcolo in corso…",
    titreVehicule: "Scegli il tuo veicolo",
    sousTitreVehicule:
      "Un prezzo per l'intero veicolo, non a posto. Tocca un veicolo per continuare.",
    titreVehiculeDeuxSens: "Scegli un veicolo per ogni tragitto",
    sousTitreVehiculeDeuxSens:
      "Un prezzo per l'intero veicolo, non a posto. I due tragitti sono calcolati separatamente: un gruppo più piccolo su uno dei due paga un veicolo più piccolo.",
    vehiculeAller: "Veicolo per l'andata",
    vehiculeRetour: "Veicolo per il ritorno",
    choisi: "Scelto",
    totalDeuxSens: "Totale per entrambi i tragitti",
    continuerVehicule: "Continua",
    choisirRetour: "Ora scegli il veicolo del ritorno.",
    aller: "Andata",
    recapPassagers: (n) => `${n} passegger${n > 1 ? "i" : "o"}`,
    recapBagages: (sacs, housses) =>
      `${sacs} ${sacs > 1 ? "bagagli" : "bagaglio"}, ${housses} ${housses > 1 ? "sacche" : "sacca"} da sci`,
    ajouterListe: "Prenoti più tragitti? Aggiungi questo alla mia lista",
    ajoutFait: "Aggiunto — la tua lista è nel menu.",
    ajoutDeja: "Già nella tua lista.",
    ajoutPlein: "La tua lista è piena.",
    parVehicule: "per veicolo",
    parVehiculeAllerRetour: "andata e ritorno, per veicolo",
    remiseRetour: "sconto andata e ritorno",
    jusqua: "Fino a",
    pieces: "colli",
    noteInclus:
      "I prezzi sono per veicolo e non per persona: sacche da sci, seggiolini, pedaggi e monitoraggio del volo inclusi. È inclusa un’ora di attesa — dall’atterraggio effettivo se il volo è in ritardo; oltre, 25 € per ogni quarto d’ora iniziato.",
    noteDevise: (code) =>
      ` Gli importi in ${code} sono indicativi — la fattura è in euro.`,
    nom: "Passeggero principale",
    email: "E-mail",
    telephone: "Cellulare",
    vol: "Numero del volo",
    obligatoire: "obbligatorio",
    facultatif: "facoltativo",
    adresse: "Indirizzo in località",
    adresseIndice: "Chalet, hotel o residence",
    enfants: "Età dei bambini, per i seggiolini giusti",
    enfantsIndice: "per esempio 3 e 7",
    precisions: "Aggiungi seggiolini o una nota (facoltativo)",
    detailAttente: "Leggere per intero la regola di attesa",
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
  /* Le retour, déplié seulement quand l'aller-retour est choisi. */
  retourTitre: string;
  retourQuand: string;
  retourAilleurs: string;
  retourDepart: string;
  retourArrivee: string;
  retourPassagers: string;
  retourPassagersIndice: string;
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
    retourTitre: "Your return journey",
    retourQuand: "Return date and time",
    retourAilleurs: "The return starts somewhere else",
    retourDepart: "Return pick-up",
    retourArrivee: "Return drop-off",
    retourPassagers: "People on the return",
    retourPassagersIndice: "Leave as is if the group is the same.",
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
    retourTitre: "Votre retour",
    retourQuand: "Date et heure du retour",
    retourAilleurs: "Le retour part d’un autre endroit",
    retourDepart: "Prise en charge au retour",
    retourArrivee: "Dépose au retour",
    retourPassagers: "Personnes au retour",
    retourPassagersIndice: "À laisser tel quel si le groupe ne change pas.",
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
    retourTitre: "Ihre Rückfahrt",
    retourQuand: "Datum und Uhrzeit der Rückfahrt",
    retourAilleurs: "Die Rückfahrt startet woanders",
    retourDepart: "Abholort der Rückfahrt",
    retourArrivee: "Zielort der Rückfahrt",
    retourPassagers: "Personen auf der Rückfahrt",
    retourPassagersIndice: "Unverändert lassen, wenn die Gruppe gleich bleibt.",
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
    retourTitre: "Il tuo ritorno",
    retourQuand: "Data e ora del ritorno",
    retourAilleurs: "Il ritorno parte da un altro luogo",
    retourDepart: "Presa in carico al ritorno",
    retourArrivee: "Arrivo al ritorno",
    retourPassagers: "Persone al ritorno",
    retourPassagersIndice: "Da lasciare invariato se il gruppo non cambia.",
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

/* ------------------------------------------------- e-mail de confirmation */

/**
 * L'e-mail envoyé au client quand son paiement est confirmé.
 *
 * Il était en anglais pour tout le monde, écrit en dur dans le webhook : un
 * client italien réservait en italien, payait en italien, et recevait sa
 * confirmation en anglais. C'est le message le plus lu de tout le parcours —
 * celui qu'on ressort à l'aéroport.
 *
 * La langue voyage depuis le tunnel jusqu'ici, par les métadonnées de la
 * session Stripe : le webhook ne connaît rien d'autre de la commande.
 */
export interface TextesEmail {
  sujet: (reference: string) => string;
  corps: (details: { reference: string; trajet?: string; montant?: string }) => string;
}

export const TEXTES_EMAIL: Record<Lang, TextesEmail> = {
  en: {
    sujet: (reference) => `Your transfer is confirmed — ${reference}`,
    corps: ({ reference, trajet, montant }) =>
      [
        "Your transfer is booked and paid.",
        "",
        `Reference: ${reference}`,
        trajet ? `Journey: ${trajet}` : null,
        montant ? `Amount paid: ${montant}` : null,
        "",
        "Your driver tracks your flight and will be there when you land. They will",
        "meet you in arrivals with your name. One hour of waiting is included,",
        "then €25 per quarter of an hour started.",
        "",
        "If anything changes — a new flight, an extra passenger, a different",
        "address in resort — tell us as early as you can.",
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  fr: {
    sujet: (reference) => `Votre transfert est confirmé — ${reference}`,
    corps: ({ reference, trajet, montant }) =>
      [
        "Votre transfert est réservé et payé.",
        "",
        `Référence : ${reference}`,
        trajet ? `Trajet : ${trajet}` : null,
        montant ? `Montant réglé : ${montant}` : null,
        "",
        "Votre chauffeur suit votre vol et sait quand vous atterrissez. Il vous",
        "attend à la sortie des bagages avec votre nom. Une heure d’attente est",
        "comprise, puis 25 € par quart d’heure entamé.",
        "",
        "Si quelque chose change — un autre vol, un passager de plus, une autre",
        "adresse en station — dites-le-nous le plus tôt possible.",
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  de: {
    sujet: (reference) => `Ihr Transfer ist bestätigt — ${reference}`,
    corps: ({ reference, trajet, montant }) =>
      [
        "Ihr Transfer ist gebucht und bezahlt.",
        "",
        `Referenz: ${reference}`,
        trajet ? `Strecke: ${trajet}` : null,
        montant ? `Bezahlter Betrag: ${montant}` : null,
        "",
        "Ihr Fahrer verfolgt Ihren Flug und weiß, wann Sie landen. Er",
        "erwartet Sie an der Gepäckausgabe mit Ihrem Namen. Eine Stunde Wartezeit",
        "ist inklusive, danach 25 € je angefangene Viertelstunde.",
        "",
        "Ändert sich etwas — ein anderer Flug, eine Person mehr, eine andere",
        "Adresse im Skiort —, sagen Sie uns so früh wie möglich Bescheid.",
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  it: {
    sujet: (reference) => `Il tuo transfer è confermato — ${reference}`,
    corps: ({ reference, trajet, montant }) =>
      [
        "Il tuo transfer è prenotato e pagato.",
        "",
        `Riferimento: ${reference}`,
        trajet ? `Tragitto: ${trajet}` : null,
        montant ? `Importo pagato: ${montant}` : null,
        "",
        "Il tuo autista segue il volo e sa quando atterri. Ti aspetta",
        "all’uscita dei bagagli con il tuo nome. È inclusa un’ora di attesa,",
        "poi 25 € per ogni quarto d’ora iniziato.",
        "",
        "Se qualcosa cambia — un altro volo, un passeggero in più, un altro",
        "indirizzo in località — diccelo il prima possibile.",
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },
};

/** Les textes d'e-mail d'une langue, l'anglais si elle est inconnue. */
export function textesEmail(langue: string | undefined): TextesEmail {
  return TEXTES_EMAIL[(langue ?? "en") as Lang] ?? TEXTES_EMAIL.en;
}

/* -------------------------------------------- avis de course à l'exploitant */

/**
 * Ce que l'exploitant reçoit quand une course tombe.
 *
 * **En français, et dans son ordre de lecture.** L'exploitant est francophone,
 * et sa question à sept heures du matin n'est pas « quelle référence » : c'est
 * quand, où, et à quel numéro joindre le client. La référence vient en dernier,
 * là où on la cherche quand on répond à un e-mail — pas en premier, là où elle
 * repousse l'essentiel sous la ligne de flottaison d'un écran de téléphone.
 *
 * C'est la même demande que celle qui a dicté l'ordre des colonnes du
 * back-office, le 10 septembre 2026 : « avec l'ancien logiciel on ne voyait pas
 * la destination de la course ».
 */
export interface CourseAvis {
  reference: string;
  trajet: string;
  aller: string;
  retour?: string | null;
  /** Le trajet du retour, seulement s'il ne reprend pas l'aller inversé. */
  trajetRetour?: string | null;
  adresse: string;
  client: { nom: string; email: string; telephone: string };
  vehicule: string;
  /** Le véhicule du retour quand il diffère — `null` s'il est le même. */
  vehiculeRetour?: string | null;
  passagers: number;
  /** Le groupe du retour quand il diffère : le chauffeur prépare sa journée avec. */
  passagersRetour?: number | null;
  vol?: string | null;
  bagagesSki?: number | null;
  enfants?: string | null;
  message?: string | null;
  montant?: number | null;
  paye: boolean;
}

export function sujetAvis(course: CourseAvis): string {
  const etat = course.paye ? "Course payée" : "Nouvelle demande";
  /* L'aller-retour se voit dès la liste des messages : il occupe deux créneaux. */
  const forme = course.retour ? " A/R" : "";
  return `${etat}${forme} — ${course.aller} · ${course.trajet}`;
}

/**
 * L'avis de course, tel qu'on le lit sur un téléphone.
 *
 * Écrit d'abord comme une suite d'étiquettes — prise en charge, trajet, adresse,
 * téléphone, puis passager, véhicule, retour — il obligeait à recomposer la
 * course de tête : le nom du client se perdait au milieu, son téléphone était
 * quatre lignes plus haut, et un aller-retour ne se distinguait d'un aller
 * simple que par une ligne « Retour » sans point de prise en charge.
 *
 * Il est maintenant rangé par ce qu'on en fait : ce qu'il faut conduire — un
 * bloc par sens, chacun complet et exécutable seul —, puis qui appeler, puis le
 * reste. Le chauffeur qui ouvre ce message sur le parking doit pouvoir partir
 * sans rien ouvrir d'autre.
 */
export function corpsAvis(course: CourseAvis): string {
  const lignes: (string | null)[] = [
    `${course.paye ? "COURSE PAYÉE" : "DEMANDE À CONFIRMER"}${
      course.montant != null ? ` — ${course.montant} €` : ""
    }`,
    "",
    course.retour ? "ALLER" : "PRISE EN CHARGE",
    `  ${course.aller}`,
    `  ${course.trajet}`,
    /*
      L'adresse en station est facultative : quand elle manque, on l'écrit. Une
      ligne vide se lit comme un défaut d'affichage ; « À OBTENIR PAR TÉLÉPHONE »
      se lit comme une chose à faire.
    */
    course.adresse ? `  ${course.adresse}` : "  ADRESSE À OBTENIR PAR TÉLÉPHONE",
    `  ${course.passagers} passager(s) · ${course.vehicule}`,
    course.vol ? `  Vol ${course.vol}` : null,
  ];

  if (course.retour) {
    lignes.push(
      "",
      "RETOUR",
      `  ${course.retour}`,
      /*
        Le trajet du retour n'est écrit que s'il diffère ; sinon on le rappelle
        inversé, plutôt que de laisser deviner. Dans les deux cas, le bloc dit
        où aller — c'est tout l'objet de la refonte de cet avis.
      */
      `  ${course.trajetRetour ?? inverse(course.trajet)}`,
      `  ${course.passagersRetour ?? course.passagers} passager(s)${
        course.vehiculeRetour && course.vehiculeRetour !== course.vehicule
          ? ` · ${course.vehiculeRetour}`
          : ` · ${course.vehicule}`
      }`,
    );
  }

  lignes.push(
    "",
    "CLIENT",
    `  ${course.client.nom}`,
    `  ${course.client.telephone}`,
    `  ${course.client.email}`,
  );

  const complements = [
    course.bagagesSki ? `Housses à skis : ${course.bagagesSki}` : null,
    course.enfants ? `Enfants : ${course.enfants} (sièges à prévoir)` : null,
  ].filter((l) => l !== null);
  if (complements.length > 0) lignes.push("", ...complements);

  if (course.message) lignes.push("", "MESSAGE DU CLIENT", `  ${course.message}`);

  lignes.push("", `Référence : ${course.reference}`);

  return lignes.filter((l) => l !== null).join("\n");
}

/** « Geneva Airport → Les Gets » devient « Les Gets → Geneva Airport ». */
function inverse(trajet: string): string {
  const parts = trajet.split("→").map((p) => p.trim());
  return parts.length === 2 ? `${parts[1]} → ${parts[0]}` : trajet;
}

/* ------------------------------------------------------- temps d'attente */

/**
 * La règle d'attente, écrite une fois pour tout le site.
 *
 * Une heure comprise, puis 25 € par quart d'heure entamé — soit 90 € de
 * l'heure. Le point de départ est la prise en charge **réelle** : le vol étant
 * suivi, le créneau se décale avec l'avion. Dit dans cet ordre, les deux
 * promesses se tiennent ; dans l'autre, elles se contredisent.
 *
 * Le site affirmait « temps d'attente compris » sans limite, sur une centaine de
 * pages. Une promesse sans borne face à une facturation horaire, c'est un litige
 * au premier vol très retardé — et un avis négatif qui coûte plus que l'heure
 * facturée.
 */
export const ATTENTE = {
  heuresIncluses: 1,
  prixQuartHeure: 25,
  prixHeure: 100,
} as const;

export const TEXTES_ATTENTE: Record<Lang, { court: string; resume: string; long: string }> = {
  en: {
    court: "one hour of waiting time included",
    resume: "One hour of waiting is included — then €25 per quarter of an hour started.",
    long:
      "One hour of waiting is included. If your flight is delayed, the hour starts " +
      "from the actual landing time — a delay is not your doing and costs you nothing. " +
      "Beyond that hour, waiting is charged at €25 per quarter of an hour started " +
      "(€100 an hour). If you want to change the pick-up time yourself, tell us at " +
      "least 24 hours ahead so the driver can rearrange the day.",
  },
  fr: {
    court: "une heure d’attente comprise",
    resume: "Une heure d’attente comprise — ensuite 25 € par quart d’heure entamé.",
    long:
      "Une heure d’attente est comprise. Si votre vol a du retard, cette heure court " +
      "à partir de l’atterrissage réel : le retard n’est pas de votre fait et ne vous " +
      "coûte rien. Au-delà, l’attente est facturée 25 € par quart d’heure entamé " +
      "(100 € l’heure). Pour changer vous-même l’heure de prise en charge, prévenez-nous " +
      "au moins 24 heures à l’avance, le temps que le chauffeur réorganise sa journée.",
  },
  de: {
    court: "eine Stunde Wartezeit inklusive",
    resume: "Eine Stunde Wartezeit inklusive — danach 25 € je angefangene Viertelstunde.",
    long:
      "Eine Stunde Wartezeit ist inklusive. Bei Flugverspätung beginnt diese Stunde mit " +
      "der tatsächlichen Landung — die Verspätung ist nicht Ihr Verschulden und kostet " +
      "Sie nichts. Danach werden 25 € je angefangene Viertelstunde berechnet (100 € pro " +
      "Stunde). Möchten Sie die Abholzeit selbst ändern, sagen Sie uns mindestens " +
      "24 Stunden vorher Bescheid, damit der Fahrer seinen Tag umplanen kann.",
  },
  it: {
    court: "un’ora di attesa inclusa",
    resume: "Un’ora di attesa inclusa — poi 25 € per ogni quarto d’ora iniziato.",
    long:
      "È inclusa un’ora di attesa. Se il volo è in ritardo, l’ora decorre dall’atterraggio " +
      "effettivo: il ritardo non dipende da te e non ti costa nulla. Oltre, l’attesa è " +
      "fatturata 25 € per ogni quarto d’ora iniziato (100 € l’ora). Per cambiare tu stesso " +
      "l’orario di presa in carico, avvisaci almeno 24 ore prima, così l’autista può " +
      "riorganizzare la giornata.",
  },
};

/* --------------------------------------------------- départ très proche */

/**
 * L'avertissement affiché quand la prise en charge est dans moins de quatre
 * heures.
 *
 * Il ne bloque rien : le client réserve s'il le souhaite. Il dit seulement ce
 * qu'on ne peut pas promettre à cette échéance, et donne le numéro — parce que
 * la réponse tient en trente secondes au téléphone et en plusieurs heures par
 * e-mail.
 */
export const TEXTES_IMMINENT: Record<Lang, { titre: string; texte: string }> = {
  en: {
    titre: "Less than an hour ahead — please call us",
    texte:
      "Online booking closes one hour before pick-up: at that notice we cannot " +
      "confirm from the website that a driver is free. Call us and we will tell you " +
      "in thirty seconds — we often can, but we will not take your money before we know.",
  },
  fr: {
    titre: "Moins d’une heure — appelez-nous",
    texte:
      "La réservation en ligne ferme une heure avant la prise en charge : à cette " +
      "échéance, le site ne peut pas confirmer qu’un chauffeur est libre. Appelez-nous, " +
      "la réponse tient en trente secondes — c’est souvent possible, mais nous " +
      "n’encaissons pas avant d’en être sûrs.",
  },
  de: {
    titre: "Weniger als eine Stunde — bitte rufen Sie an",
    texte:
      "Die Online-Buchung schließt eine Stunde vor der Abholung: so kurzfristig kann " +
      "die Website nicht bestätigen, dass ein Fahrer frei ist. Rufen Sie uns an, die " +
      "Antwort dauert dreißig Sekunden — oft geht es, aber wir kassieren nicht, bevor " +
      "wir es wissen.",
  },
  it: {
    titre: "Meno di un’ora — chiamaci",
    texte:
      "La prenotazione online chiude un’ora prima della presa in carico: con questo " +
      "preavviso il sito non può confermare che un autista sia libero. Chiamaci, la " +
      "risposta arriva in trenta secondi — spesso si può fare, ma non incassiamo prima " +
      "di esserne certi.",
  },
};
