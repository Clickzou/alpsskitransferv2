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
  /**
   * Ce que le prix affiché couvre.
   *
   * Il disait « per vehicle », et il y avait deux variantes : « per vehicle » et
   * « both ways, per vehicle », selon qu'on chiffrait un sens ou les deux. Sous
   * un montant, « par véhicule » se lit comme une unité à multiplier — combien
   * de véhicules ? — alors qu'il voulait dire l'inverse : le prix ne dépend pas
   * du nombre de passagers. Cet argument est déjà porté par le sous-titre de
   * l'écran ; ce qui manquait ici, c'est ce que le montant paie. Depuis que
   * chaque sens a sa liste et son prix, la réponse est toujours la même : ce
   * trajet-là. Le total des deux sens est annoncé à part, en bas de l'écran.
   */
  parVehicule: string;
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
  /**
   * Les enfants, en deux questions.
   *
   * Le tunnel ne demandait que les âges, en texte libre. C'est l'information qui
   * décide du type de siège — nacelle, siège-auto, rehausseur — mais pas de
   * leur nombre : « 3 et 7 » se lit vite, « 3, 3 et 7 » se lit mal, et une
   * réponse comme « petits » n'en donne aucun. Le chauffeur charge pourtant un
   * siège par enfant, et il les emporte avant de partir.
   */
  enfantsNombre: string;
  enfantsNombreIndice: string;
  /**
   * Les enfants du retour, quand le groupe change d'un sens à l'autre.
   *
   * Un seul champ ne pouvait pas les décrire : sur un aller à deux et un retour
   * à sept, « sept enfants » est vrai du retour et faux de l'aller. On avait
   * d'abord posé un avertissement, puis une boîte de dialogue avant le
   * paiement ; c'était traiter le symptôme. Chaque sens a son compte, borné par
   * son propre groupe, et l'incohérence n'existe plus.
   */
  enfantsNombreRetour: string;
  /**
   * Pourquoi la liste s'arrête là, et quoi faire pour aller plus loin.
   *
   * Chaque compte est borné par le groupe de son trajet, ce qui rend
   * l'incohérence impossible à saisir. Mais une liste qui s'arrête sans rien
   * dire est un mur : le visiteur qui voyage avec trois enfants et n'en trouve
   * que deux dans la liste ne devine pas qu'il a réservé pour deux personnes,
   * ni qu'il doit remonter à l'étape du trajet pour le corriger. On le lui dit,
   * et on l'y ramène d'un clic.
   */
  enfantsBorne: (places: number) => string;
  enfantsChangerGroupe: string;
  /**
   * Le plafond d'un véhicule, et où va celui qui le dépasse.
   *
   * Au-delà de huit personnes, le moteur répondait « Passengers must be between
   * 1 and 8 » et s'arrêtait là. C'est vrai, et c'est un client perdu : un groupe
   * de dix se transporte très bien, en deux véhicules, et c'est précisément ce
   * que la page des groupes existe pour organiser. Le plafond est annoncé avant
   * qu'on le heurte, avec le chemin d'à côté.
   */
  /**
   * Pourquoi la liste des véhicules est plus courte qu'ailleurs.
   *
   * Les catégories trop petites pour le groupe — ou pour ses bagages — sont
   * écartées du devis, et elles disparaissaient sans un mot : à six personnes,
   * on ne voyait plus que deux véhicules sur trois, et rien ne disait que le
   * troisième existait. Le visiteur qui accepterait de voyager à quatre ne
   * pouvait pas le découvrir. On dit ce qui manque, et on ramène au champ qui
   * le décide.
   */
  /**
   * Le bouton qui ramène au champ en cause, quand le serveur a refusé.
   *
   * Un refus s'affichait seul, avec pour seule issue « demandez un devis » : le
   * visiteur dont le groupe dépassait de une personne n'avait pas de chemin
   * pour le corriger, alors que c'était une saisie à changer. Le serveur nomme
   * le champ fautif, le tunnel y ramène le curseur.
   */
  corrigerSaisie: string;
  vehiculesEcartes: (places: number) => string;
  vehiculesEcartesAction: string;
  capaciteBorne: (places: number) => string;
  capaciteGroupe: string;
  /** Où mène « demandez un devis groupe », selon la langue. */
  capaciteGroupeLien: string;
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
    parVehicule: "for this journey",
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
    enfantsNombre: "How many children",
    enfantsNombreIndice: "Car seats are included",
    enfantsNombreRetour: "Children on the return",
    enfantsBorne: (places) =>
      `The list stops at ${places} because this journey is booked for ${places} people, children included. Travelling with more?`,
    enfantsChangerGroupe: "Change the number of passengers",
    capaciteBorne: (places) =>
      `${places} people is the most one vehicle takes.`,
    capaciteGroupe: "More of you? Ask us for a group quote.",
    capaciteGroupeLien: "/inquiry/",
    vehiculesEcartes: (places) =>
      `Some vehicles are not shown because they do not seat ${places} people or their luggage.`,
    vehiculesEcartesAction: "Change the journey",
    corrigerSaisie: "Go back and change it",
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
    parVehicule: "pour ce trajet",
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
    enfantsNombre: "Combien d'enfants",
    enfantsNombreIndice: "Les sièges sont compris",
    enfantsNombreRetour: "Enfants au retour",
    enfantsBorne: (places) =>
      `La liste s'arrête à ${places} parce que ce trajet est réservé pour ${places} personnes, enfants compris. Vous êtes plus nombreux ?`,
    enfantsChangerGroupe: "Modifier le nombre de passagers",
    capaciteBorne: (places) =>
      `${places} personnes, c'est le maximum d'un véhicule.`,
    capaciteGroupe: "Vous êtes plus nombreux ? Demandez un devis groupe.",
    capaciteGroupeLien: "/fr/agences-et-professionnels/",
    vehiculesEcartes: (places) =>
      `Certains véhicules ne sont pas proposés : ils ne prennent pas ${places} personnes, ou leurs bagages.`,
    vehiculesEcartesAction: "Modifier le trajet",
    corrigerSaisie: "Revenir et le modifier",
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
    parVehicule: "für diese Fahrt",
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
    enfantsNombre: "Wie viele Kinder",
    enfantsNombreIndice: "Kindersitze sind inbegriffen",
    enfantsNombreRetour: "Kinder auf der Rückfahrt",
    enfantsBorne: (places) =>
      `Die Liste endet bei ${places}, weil diese Fahrt für ${places} Personen gebucht ist, Kinder eingeschlossen. Sind Sie mehr?`,
    enfantsChangerGroupe: "Personenzahl ändern",
    capaciteBorne: (places) =>
      `${places} Personen sind das Maximum für ein Fahrzeug.`,
    capaciteGroupe: "Sind Sie mehr? Fordern Sie ein Gruppenangebot an.",
    capaciteGroupeLien: "/de/agenturen-und-firmen/",
    vehiculesEcartes: (places) =>
      `Einige Fahrzeuge fehlen: Sie fassen keine ${places} Personen oder deren Gepäck.`,
    vehiculesEcartesAction: "Fahrt ändern",
    corrigerSaisie: "Zurück und ändern",
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
    parVehicule: "per questo tragitto",
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
    enfantsNombre: "Quanti bambini",
    enfantsNombreIndice: "I seggiolini sono inclusi",
    enfantsNombreRetour: "Bambini al ritorno",
    enfantsBorne: (places) =>
      `L'elenco si ferma a ${places} perché questo tragitto è prenotato per ${places} persone, bambini compresi. Siete di più?`,
    enfantsChangerGroupe: "Modifica il numero di passeggeri",
    capaciteBorne: (places) =>
      `${places} persone sono il massimo per un veicolo.`,
    capaciteGroupe: "Siete di più? Chiedeteci un preventivo per gruppi.",
    capaciteGroupeLien: "/it/agenzie-e-aziende/",
    vehiculesEcartes: (places) =>
      `Alcuni veicoli non compaiono: non portano ${places} persone o i loro bagagli.`,
    vehiculesEcartesAction: "Modifica il tragitto",
    corrigerSaisie: "Torna e modifica",
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
  /**
   * `lien` est le lien signé « gérer ma réservation ».
   *
   * Il n'est pas toujours là : sans `SECRET_GESTION`, il ne peut pas être
   * fabriqué, et un e-mail qui annoncerait une page inaccessible serait pire
   * que le silence. L'absence se voit donc ici, pas dans le webhook.
   */
  corps: (details: {
    reference: string;
    trajet?: string;
    montant?: string;
    lien?: string;
  }) => string;
}

export const TEXTES_EMAIL: Record<Lang, TextesEmail> = {
  en: {
    sujet: (reference) => `Your transfer is confirmed — ${reference}`,
    corps: ({ reference, trajet, montant, lien }) =>
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
        ...(lien
          ? ["", "To ask for a new pick-up time, up to 24 hours before:", lien]
          : []),
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  fr: {
    sujet: (reference) => `Votre transfert est confirmé — ${reference}`,
    corps: ({ reference, trajet, montant, lien }) =>
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
        ...(lien
          ? [
              "",
              "Pour demander un autre horaire de prise en charge,",
              "jusqu’à 24 heures avant :",
              lien,
            ]
          : []),
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  de: {
    sujet: (reference) => `Ihr Transfer ist bestätigt — ${reference}`,
    corps: ({ reference, trajet, montant, lien }) =>
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
        ...(lien
          ? [
              "",
              "Eine andere Abholzeit können Sie bis 24 Stunden vorher anfragen:",
              lien,
            ]
          : []),
      ]
        .filter((l) => l !== null)
        .join("\n"),
  },

  it: {
    sujet: (reference) => `Il tuo transfer è confermato — ${reference}`,
    corps: ({ reference, trajet, montant, lien }) =>
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
        ...(lien
          ? [
              "",
              "Per chiedere un altro orario di presa in carico, fino a 24 ore prima:",
              lien,
            ]
          : []),
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
    course.enfants ? `Enfants : ${course.enfants} · sièges à prévoir` : null,
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

/* ------------------------------------------------ « gérer ma réservation » */

/**
 * La page qu'on ouvre depuis son e-mail de confirmation.
 *
 * Elle ne fait qu'**une** chose — déplacer l'heure de prise en charge et
 * corriger le numéro de vol — et elle le dit d'entrée. Tout le reste (véhicule,
 * trajet, passagers) change le prix : ce n'est plus une modification, c'est une
 * autre réservation, et cela passe par nous.
 *
 * Les mots sont ceux du client, pas ceux du métier : « votre réservation », pas
 * « votre dossier ». Et quand la réponse est non — lien périmé, course passée,
 * départ dans moins de vingt-quatre heures — la page donne le téléphone plutôt
 * qu'un mur.
 */
export interface TextesGestion {
  titre: string;
  bouton: string;
  fil: string;
  chapo: string;
  metaDescription: string;

  /* Le dossier relu en base. */
  reference: string;
  aller: string;
  retour: string;
  vehicule: string;
  passagers: (n: number) => string;
  vol: string;
  sansVol: string;
  montant: string;
  paye: string;
  aRegler: string;

  /* Les cas où il n'y a rien à modifier. */
  lienInvalideTitre: string;
  lienInvalideTexte: string;
  introuvableTitre: string;
  introuvableTexte: string;
  annuleeTitre: string;
  annuleeTexte: string;
  passeeTitre: string;
  passeeTexte: string;
  indisponibleTitre: string;
  indisponibleTexte: string;

  /* Le formulaire. */
  modifierTitre: string;
  modifierTexte: string;
  nouvelHoraire: string;
  nouvelHoraireIndice: string;
  /* Le retour se prend en station, et se juge sur sa propre date. */
  nouvelHoraireRetour: string;
  nouvelHoraireRetourIndice: string;
  /* L'aller trop proche ou déjà fait : le champ n'est plus proposé, on dit pourquoi. */
  allerVerrouille: string;
  numeroVol: string;
  facultatif: string;
  enregistrer: string;
  enregistrement: string;

  /* Moins de vingt-quatre heures : on signale, on ne modifie plus. */
  tardifTitre: string;
  tardifTexte: string;
  votreDemande: string;
  votreDemandeIndice: string;
  envoyer: string;
  appeler: string;

  /* Ce qui s'affiche après. */
  faitTitre: string;
  /* Seul le vol s'applique tout de suite ; les heures passent par l'exploitant. */
  faitTexte: string;
  /* La demande d'horaire, en attente de l'exploitant (décision du 11 septembre 2026). */
  demandeTitre: string;
  demandeTexte: string;
  demandeEnAttente: (quand: string) => string;
  demandeRemplace: string;
  transmisTitre: string;
  transmisTexte: string;
  nonTransmisTexte: string;

  /* Les refus du serveur, dans les mots de la page. */
  erreurTropProche: string;
  erreurRetourAvantAller: string;
  erreurDate: string;
  erreurLien: string;
  erreurReseau: string;
  erreurEnregistrement: string;

  autreChangement: string;
  ecrire: string;
  retourSite: string;
}

export const TEXTES_GESTION: Record<Lang, TextesGestion> = {
  en: {
    titre: "Your booking",
    bouton: "Manage my booking",
    fil: "Manage my booking",
    chapo:
      "Ask for a new pick-up time or correct your flight number — the operator confirms the new time by email.",
    metaDescription: "Change the pick-up time of your airport ski transfer.",

    reference: "Reference",
    aller: "Pick-up",
    retour: "Return",
    vehicule: "Vehicle",
    passagers: (n) => (n > 1 ? `${n} passengers` : "1 passenger"),
    vol: "Flight",
    sansVol: "not given",
    montant: "Amount",
    paye: "paid",
    aRegler: "to pay",

    lienInvalideTitre: "This link no longer works",
    lienInvalideTexte:
      "It has to be opened from your confirmation email, exactly as it was sent — the address gets cut short when it is copied by hand. Write to us with your reference and we will make the change for you.",
    introuvableTitre: "We cannot find this booking",
    introuvableTexte:
      "It may have been made under another reference. Send us the confirmation email and we will sort it out.",
    annuleeTitre: "This booking has been cancelled",
    annuleeTexte:
      "Nothing more can be changed here. If that is a mistake, tell us today — a driver is easier to call back than to find twice.",
    passeeTitre: "This journey has already taken place",
    passeeTexte:
      "There is nothing left to change. If you need a receipt or another transfer, we are one message away.",
    indisponibleTitre: "We cannot reach your booking right now",
    indisponibleTexte:
      "Try again in a few minutes. If it is urgent — you are travelling today or tomorrow — call us rather than wait.",

    modifierTitre: "Ask for a new pick-up time",
    modifierTexte:
      "The time and the flight number, and nothing else: the vehicle, the journey and the number of passengers all change the price, so those go through us. What you have paid does not move.",
    nouvelHoraire: "New pick-up time at the airport",
    nouvelHoraireIndice: "Local time, at least 24 hours from now.",
    nouvelHoraireRetour: "New pick-up time in the resort",
    nouvelHoraireRetourIndice:
      "For your return. Local time, at least 24 hours from now, and after the outbound journey.",
    allerVerrouille:
      "The pick-up at the airport can no longer be moved here — it is less than 24 hours away, or already done. Call us if it needs to change:",
    numeroVol: "Flight number",
    facultatif: "(optional)",
    enregistrer: "Send the request",
    enregistrement: "Saving…",

    tardifTitre: "Less than 24 hours to go — tell us and we will call you",
    tardifTexte:
      "At this notice the change is not made from the website: your driver's day is already built around this journey. Write what you need below and the operator has it straight away — or call, which is faster.",
    votreDemande: "What needs to change",
    votreDemandeIndice:
      "A new landing time, a cancelled flight, one passenger more — say it plainly.",
    envoyer: "Send this to the operator",
    appeler: "Call us",

    faitTitre: "Your flight number is updated",
    faitTexte: "Your driver has it. Nothing else has moved, and there is nothing more to pay.",
    demandeTitre: "Your request is with the operator",
    demandeTexte:
      "Your new pick-up time applies once the operator confirms it — you will receive an email. Until then, your booking stands as booked.",
    demandeEnAttente: (quand) => `Requested: ${quand} — awaiting confirmation`,
    demandeRemplace:
      "A request is already awaiting confirmation. Sending a new one replaces it.",
    transmisTitre: "Your message is with the operator",
    transmisTexte:
      "They will call you back on the number you gave. Your booking has not been changed in the meantime — they confirm it with you first.",
    nonTransmisTexte:
      "We could not deliver it. Please call us — at this notice, do not rely on an email.",

    erreurTropProche:
      "That time is less than 24 hours away. Pick a later one, or tell us below and we will arrange it.",
    erreurRetourAvantAller: "The return has to come after the outbound journey. Check both dates.",
    erreurDate: "That date could not be read. Please check the day and the time.",
    erreurLien: "This link is no longer valid. Open it again from your confirmation email.",
    erreurReseau: "The connection dropped. Try again.",
    erreurEnregistrement: "We could not save the change. Try again, or call us.",

    autreChangement:
      "Anything else — another vehicle, another resort, one passenger more — is a new price, so it goes through us.",
    ecrire: "Write to us",
    retourSite: "Back to the site",
  },

  fr: {
    titre: "Votre réservation",
    bouton: "Gérer ma réservation",
    fil: "Gérer ma réservation",
    chapo:
      "Demandez un autre horaire de prise en charge ou corrigez votre numéro de vol — l’exploitant vous confirme le nouvel horaire par e-mail.",
    metaDescription: "Modifiez l’heure de prise en charge de votre transfert.",

    reference: "Référence",
    aller: "Prise en charge",
    retour: "Retour",
    vehicule: "Véhicule",
    passagers: (n) => (n > 1 ? `${n} passagers` : "1 passager"),
    vol: "Vol",
    sansVol: "non renseigné",
    montant: "Montant",
    paye: "réglé",
    aRegler: "à régler",

    lienInvalideTitre: "Ce lien ne fonctionne plus",
    lienInvalideTexte:
      "Il s’ouvre depuis votre e-mail de confirmation, tel qu’il vous a été envoyé — l’adresse se coupe quand on la recopie à la main. Écrivez-nous avec votre référence, nous ferons la modification pour vous.",
    introuvableTitre: "Nous ne retrouvons pas cette réservation",
    introuvableTexte:
      "Elle a peut-être été faite sous une autre référence. Transmettez-nous l’e-mail de confirmation, nous nous en occupons.",
    annuleeTitre: "Cette réservation est annulée",
    annuleeTexte:
      "Il n’y a plus rien à modifier ici. Si c’est une erreur, dites-le-nous aujourd’hui : un chauffeur se rappelle plus facilement qu’il ne se trouve deux fois.",
    passeeTitre: "Ce trajet a déjà eu lieu",
    passeeTexte:
      "Il n’y a plus rien à changer. Pour un justificatif ou un nouveau transfert, écrivez-nous.",
    indisponibleTitre: "Votre réservation est momentanément inaccessible",
    indisponibleTexte:
      "Réessayez dans quelques minutes. Si c’est urgent — vous partez aujourd’hui ou demain — appelez-nous plutôt que d’attendre.",

    modifierTitre: "Demander un autre horaire",
    modifierTexte:
      "L’heure et le numéro de vol, rien d’autre : le véhicule, le trajet et le nombre de passagers changent le prix, ils passent donc par nous. Ce que vous avez réglé ne bouge pas.",
    nouvelHoraire: "Nouvelle heure de prise en charge à l’aéroport",
    nouvelHoraireIndice: "Heure locale, au moins 24 heures à partir de maintenant.",
    nouvelHoraireRetour: "Nouvelle heure de prise en charge en station",
    nouvelHoraireRetourIndice:
      "Pour votre retour. Heure locale, au moins 24 heures à partir de maintenant, et après l’aller.",
    allerVerrouille:
      "La prise en charge à l’aéroport ne se déplace plus d’ici — elle est à moins de 24 heures, ou déjà faite. Appelez-nous s’il faut la changer au",
    numeroVol: "Numéro de vol",
    facultatif: "(facultatif)",
    enregistrer: "Envoyer la demande",
    enregistrement: "Enregistrement…",

    tardifTitre: "Moins de 24 heures — dites-le-nous, nous vous rappelons",
    tardifTexte:
      "À cette échéance, la modification ne se fait pas depuis le site : la journée de votre chauffeur est déjà construite autour de ce trajet. Écrivez ce dont vous avez besoin, l’exploitant le reçoit immédiatement — ou appelez, c’est plus rapide.",
    votreDemande: "Ce qui doit changer",
    votreDemandeIndice:
      "Une autre heure d’atterrissage, un vol annulé, un passager de plus — dites-le simplement.",
    envoyer: "Transmettre à l’exploitant",
    appeler: "Nous appeler",

    faitTitre: "Votre numéro de vol est mis à jour",
    faitTexte: "Votre chauffeur l’a. Rien d’autre n’a bougé, et il n’y a rien de plus à payer.",
    demandeTitre: "Votre demande est chez l’exploitant",
    demandeTexte:
      "Le nouvel horaire s’applique dès que l’exploitant l’a confirmé — vous recevrez un e-mail. D’ici là, votre réservation reste telle quelle.",
    demandeEnAttente: (quand) => `Demandé : ${quand} — en attente de confirmation`,
    demandeRemplace:
      "Une demande attend déjà confirmation. En envoyer une nouvelle la remplace.",
    transmisTitre: "Votre message est arrivé chez l’exploitant",
    transmisTexte:
      "Il vous rappelle au numéro que vous avez donné. Votre réservation n’a pas été modifiée entre-temps : il la confirme d’abord avec vous.",
    nonTransmisTexte:
      "Nous n’avons pas pu le transmettre. Appelez-nous — à cette échéance, ne comptez pas sur un e-mail.",

    erreurTropProche:
      "Cette heure est à moins de 24 heures. Choisissez-en une plus tardive, ou dites-le-nous ci-dessous : nous nous en occupons.",
    erreurRetourAvantAller: "Le retour doit venir après l’aller. Vérifiez les deux dates.",
    erreurDate: "Cette date n’a pas pu être lue. Vérifiez le jour et l’heure.",
    erreurLien: "Ce lien n’est plus valable. Rouvrez-le depuis votre e-mail de confirmation.",
    erreurReseau: "La connexion s’est interrompue. Réessayez.",
    erreurEnregistrement:
      "Nous n’avons pas pu enregistrer la modification. Réessayez, ou appelez-nous.",

    autreChangement:
      "Tout le reste — un autre véhicule, une autre station, un passager de plus — change le prix : cela passe par nous.",
    ecrire: "Nous écrire",
    retourSite: "Retour au site",
  },

  de: {
    titre: "Ihre Buchung",
    bouton: "Buchung verwalten",
    fil: "Buchung verwalten",
    chapo:
      "Fragen Sie eine andere Abholzeit an oder korrigieren Sie Ihre Flugnummer — der Betreiber bestätigt die neue Zeit per E-Mail.",
    metaDescription: "Ändern Sie die Abholzeit Ihres Flughafentransfers.",

    reference: "Referenz",
    aller: "Abholung",
    retour: "Rückfahrt",
    vehicule: "Fahrzeug",
    passagers: (n) => (n > 1 ? `${n} Personen` : "1 Person"),
    vol: "Flug",
    sansVol: "nicht angegeben",
    montant: "Betrag",
    paye: "bezahlt",
    aRegler: "zu zahlen",

    lienInvalideTitre: "Dieser Link funktioniert nicht mehr",
    lienInvalideTexte:
      "Er öffnet sich aus Ihrer Bestätigungs-E-Mail heraus, genau so, wie er versendet wurde — von Hand abgetippt wird die Adresse abgeschnitten. Schreiben Sie uns mit Ihrer Referenz, wir ändern es für Sie.",
    introuvableTitre: "Wir finden diese Buchung nicht",
    introuvableTexte:
      "Vielleicht wurde sie unter einer anderen Referenz angelegt. Leiten Sie uns die Bestätigungs-E-Mail weiter, wir kümmern uns darum.",
    annuleeTitre: "Diese Buchung ist storniert",
    annuleeTexte:
      "Hier lässt sich nichts mehr ändern. Ist das ein Irrtum, sagen Sie es uns noch heute: ein Fahrer lässt sich leichter zurückholen als ein zweites Mal finden.",
    passeeTitre: "Diese Fahrt hat bereits stattgefunden",
    passeeTexte:
      "Es gibt nichts mehr zu ändern. Für einen Beleg oder einen weiteren Transfer schreiben Sie uns einfach.",
    indisponibleTitre: "Ihre Buchung ist gerade nicht erreichbar",
    indisponibleTexte:
      "Versuchen Sie es in einigen Minuten erneut. Wird es dringend — Sie fahren heute oder morgen —, rufen Sie uns lieber an.",

    modifierTitre: "Andere Abholzeit anfragen",
    modifierTexte:
      "Die Uhrzeit und die Flugnummer, sonst nichts: Fahrzeug, Strecke und Personenzahl ändern den Preis und laufen deshalb über uns. Der bezahlte Betrag bleibt, wie er ist.",
    nouvelHoraire: "Neue Abholzeit am Flughafen",
    nouvelHoraireIndice: "Ortszeit, mindestens 24 Stunden ab jetzt.",
    nouvelHoraireRetour: "Neue Abholzeit im Skiort",
    nouvelHoraireRetourIndice:
      "Für Ihre Rückfahrt. Ortszeit, mindestens 24 Stunden ab jetzt und nach der Hinfahrt.",
    allerVerrouille:
      "Die Abholung am Flughafen lässt sich hier nicht mehr verschieben — sie liegt weniger als 24 Stunden entfernt oder ist schon erfolgt. Rufen Sie uns an, wenn sie sich ändern muss:",
    numeroVol: "Flugnummer",
    facultatif: "(optional)",
    enregistrer: "Anfrage senden",
    enregistrement: "Wird gespeichert…",

    tardifTitre: "Weniger als 24 Stunden — sagen Sie es uns, wir rufen zurück",
    tardifTexte:
      "So kurzfristig wird die Änderung nicht über die Website gemacht: der Tag Ihres Fahrers ist bereits um diese Fahrt herum geplant. Schreiben Sie unten, was Sie brauchen — der Betreiber bekommt es sofort. Ein Anruf geht schneller.",
    votreDemande: "Was sich ändern soll",
    votreDemandeIndice:
      "Eine andere Landezeit, ein gestrichener Flug, eine Person mehr — sagen Sie es einfach.",
    envoyer: "An den Betreiber senden",
    appeler: "Rufen Sie uns an",

    faitTitre: "Ihre Flugnummer ist aktualisiert",
    faitTexte: "Ihr Fahrer hat sie. Sonst bleibt alles gleich, und es ist nichts nachzuzahlen.",
    demandeTitre: "Ihre Anfrage ist beim Betreiber",
    demandeTexte:
      "Die neue Abholzeit gilt, sobald der Betreiber sie bestätigt — Sie erhalten eine E-Mail. Bis dahin bleibt Ihre Buchung, wie sie ist.",
    demandeEnAttente: (quand) => `Angefragt: ${quand} — wartet auf Bestätigung`,
    demandeRemplace:
      "Eine Anfrage wartet bereits auf Bestätigung. Eine neue Anfrage ersetzt sie.",
    transmisTitre: "Ihre Nachricht ist beim Betreiber",
    transmisTexte:
      "Er ruft Sie unter der angegebenen Nummer zurück. Ihre Buchung wurde vorerst nicht geändert — er bestätigt sie zuerst mit Ihnen.",
    nonTransmisTexte:
      "Wir konnten sie nicht zustellen. Bitte rufen Sie an — so kurzfristig ist eine E-Mail kein Verlass.",

    erreurTropProche:
      "Diese Zeit liegt weniger als 24 Stunden entfernt. Wählen Sie eine spätere, oder sagen Sie es uns unten — wir regeln das.",
    erreurRetourAvantAller:
      "Die Rückfahrt muss nach der Hinfahrt liegen. Bitte prüfen Sie beide Daten.",
    erreurDate: "Dieses Datum war nicht lesbar. Bitte prüfen Sie Tag und Uhrzeit.",
    erreurLien:
      "Dieser Link ist nicht mehr gültig. Öffnen Sie ihn erneut aus Ihrer Bestätigungs-E-Mail.",
    erreurReseau: "Die Verbindung ist abgebrochen. Versuchen Sie es erneut.",
    erreurEnregistrement:
      "Wir konnten die Änderung nicht speichern. Versuchen Sie es erneut oder rufen Sie an.",

    autreChangement:
      "Alles andere — ein anderes Fahrzeug, ein anderer Skiort, eine Person mehr — ergibt einen neuen Preis und läuft über uns.",
    ecrire: "Schreiben Sie uns",
    retourSite: "Zurück zur Website",
  },

  it: {
    titre: "La tua prenotazione",
    bouton: "Gestisci la prenotazione",
    fil: "Gestisci la prenotazione",
    chapo:
      "Chiedi un altro orario di presa in carico o correggi il numero del volo — l’operatore ti conferma il nuovo orario via e-mail.",
    metaDescription: "Modifica l’orario di presa in carico del tuo transfer.",

    reference: "Riferimento",
    aller: "Presa in carico",
    retour: "Ritorno",
    vehicule: "Veicolo",
    passagers: (n) => (n > 1 ? `${n} passeggeri` : "1 passeggero"),
    vol: "Volo",
    sansVol: "non indicato",
    montant: "Importo",
    paye: "pagato",
    aRegler: "da pagare",

    lienInvalideTitre: "Questo link non funziona più",
    lienInvalideTexte:
      "Va aperto dalla tua e-mail di conferma, così com’è stato inviato: ricopiandolo a mano l’indirizzo si tronca. Scrivici con il tuo riferimento e facciamo noi la modifica.",
    introuvableTitre: "Non troviamo questa prenotazione",
    introuvableTexte:
      "Potrebbe essere stata fatta con un altro riferimento. Inoltraci l’e-mail di conferma e ce ne occupiamo.",
    annuleeTitre: "Questa prenotazione è annullata",
    annuleeTexte:
      "Qui non c’è più nulla da modificare. Se è un errore, diccelo oggi stesso: un autista si richiama più facilmente di quanto non si trovi due volte.",
    passeeTitre: "Questo tragitto è già avvenuto",
    passeeTexte: "Non c’è più nulla da cambiare. Per una ricevuta o un altro transfer, scrivici.",
    indisponibleTitre: "La tua prenotazione non è raggiungibile in questo momento",
    indisponibleTexte:
      "Riprova tra qualche minuto. Se è urgente — parti oggi o domani — chiamaci invece di aspettare.",

    modifierTitre: "Chiedi un altro orario",
    modifierTexte:
      "L’orario e il numero del volo, nient’altro: veicolo, tragitto e numero di passeggeri cambiano il prezzo, quindi passano da noi. Quello che hai pagato resta lo stesso.",
    nouvelHoraire: "Nuovo orario di presa in carico in aeroporto",
    nouvelHoraireIndice: "Ora locale, almeno 24 ore da adesso.",
    nouvelHoraireRetour: "Nuovo orario di presa in carico in località",
    nouvelHoraireRetourIndice:
      "Per il ritorno. Ora locale, almeno 24 ore da adesso e dopo l’andata.",
    allerVerrouille:
      "La presa in carico in aeroporto non si può più spostare da qui — è a meno di 24 ore, o è già avvenuta. Chiamaci se deve cambiare:",
    numeroVol: "Numero del volo",
    facultatif: "(facoltativo)",
    enregistrer: "Invia la richiesta",
    enregistrement: "Salvataggio…",

    tardifTitre: "Meno di 24 ore — diccelo, ti richiamiamo",
    tardifTexte:
      "Con questo preavviso la modifica non si fa dal sito: la giornata del tuo autista è già costruita attorno a questo tragitto. Scrivi qui sotto di cosa hai bisogno, l’operatore lo riceve subito — oppure chiama, è più rapido.",
    votreDemande: "Che cosa deve cambiare",
    votreDemandeIndice:
      "Un altro orario di atterraggio, un volo cancellato, un passeggero in più — dillo semplicemente.",
    envoyer: "Invia all’operatore",
    appeler: "Chiamaci",

    faitTitre: "Il numero del volo è aggiornato",
    faitTexte: "Il tuo autista ce l’ha. Il resto non cambia e non c’è nulla da pagare in più.",
    demandeTitre: "La tua richiesta è arrivata all’operatore",
    demandeTexte:
      "Il nuovo orario vale non appena l’operatore lo conferma — riceverai un’e-mail. Fino ad allora la prenotazione resta com’è.",
    demandeEnAttente: (quand) => `Richiesto: ${quand} — in attesa di conferma`,
    demandeRemplace:
      "Una richiesta attende già conferma. Inviarne una nuova la sostituisce.",
    transmisTitre: "Il tuo messaggio è arrivato all’operatore",
    transmisTexte:
      "Ti richiama al numero che hai indicato. Nel frattempo la prenotazione non è stata modificata: prima la conferma con te.",
    nonTransmisTexte:
      "Non siamo riusciti a consegnarlo. Chiamaci — con questo preavviso, non affidarti a un’e-mail.",

    erreurTropProche:
      "Questo orario è a meno di 24 ore. Scegline uno più tardi, oppure diccelo qui sotto: ci pensiamo noi.",
    erreurRetourAvantAller: "Il ritorno deve essere dopo l’andata. Controlla le due date.",
    erreurDate: "Questa data non è leggibile. Controlla il giorno e l’ora.",
    erreurLien: "Questo link non è più valido. Riaprilo dalla tua e-mail di conferma.",
    erreurReseau: "La connessione si è interrotta. Riprova.",
    erreurEnregistrement: "Non siamo riusciti a salvare la modifica. Riprova, oppure chiamaci.",

    autreChangement:
      "Tutto il resto — un altro veicolo, un’altra località, un passeggero in più — è un prezzo nuovo: passa da noi.",
    ecrire: "Scrivici",
    retourSite: "Torna al sito",
  },
};
