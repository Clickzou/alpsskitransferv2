import type { Lang, LangueSecondaire } from "@/lib/i18n";

/**
 * Les libellés de l'interface, dans les quatre langues.
 *
 * Jusqu'ici chaque composant portait un `const fr = lang === "fr"` et deux
 * variantes en ligne. À deux langues cela tenait ; à quatre, chaque libellé
 * devient une échelle de ternaires et la moindre correction se fait quatre fois
 * — donc trois fois sur quatre elle s'oublie. Ici les mots vivent au même
 * endroit, le composant n'a plus qu'un `T(lang)`.
 *
 * **Ce ne sont pas des traductions automatiques.** L'allemand et l'italien sont
 * écrits pour leur marché : un Autrichien lit « Flughafentransfer », pas
 * « Transfer vom Flughafen », et un Italien cherche « trasferimento aeroporto »
 * avant « transfer privato ». Les mots-clés du marché passent avant la fidélité
 * à la version française.
 */
export interface TextesUI {
  /* ------------------------------------------------------------- navigation */
  accueil: string;
  allerAuContenu: string;
  navPrincipale: string;
  navCompacte: string;
  logoAccueil: string;
  langue: string;
  changerDeLangue: string;
  reserver: string;
  demanderPrix: string;
  panier: string;
  panierVide: string;
  transfert: string;
  transferts: string;

  /* ------------------------------------------------------------ pied de page */
  pied: {
    accroche: string;
    accrocheSuite: string;
    aPropos: string;
    reservation: string;
    services: string;
    ressources: string;
    paysDesservis: string;
    nousEcrire: string;
    droits: string;
  };

  /* ------------------------------------------------------------- gabarits */
  pretAReserver: string;
  pretAReserverTexte: string;
  votreTrajet: string;
  depart: string;
  arrivee: string;
  distance: string;
  tempsDeRoute: string;
  prix: string;
  prixFixe: string;
  aeroportDe: (nom: string) => string;
  tousLesTransfertsVers: (station: string) => string;
  questionsFrequentes: string;
  aide: string;
  faqStation: (station: string) => string;
  faqTrajet: (aeroport: string, station: string) => string;
  reservezVers: (station: string) => string;
  reservezTrajet: (aeroport: string, station: string) => string;
  reservezAlpes: string;
  devisImmediat: string;
  devisImmediatChauffeur: string;
  inclusCourt: string;

  /* --------------------------------------------------------------- listes */
  stations: string;
  trajets: string;
  transfertsVers: (station: string) => string;
  mesureNote: string;
  voirCeTrajet: string;
  voirLesTransferts: string;
  trajetsDepuis: (nombre: number, aeroports: string) => string;

  /* ----------------------------------------------------------------- blog */
  blogTitre: string;
  blogChapo: string;
  lireLeGuide: string;
  minutesLecture: (n: number) => string;
  publieLe: string;
  aLire: string;
  stationsCitees: string;
}

const EN: TextesUI = {
  accueil: "Home",
  allerAuContenu: "Skip to content",
  navPrincipale: "Main",
  navCompacte: "Main, compact",
  logoAccueil: "Alps Ski Transfers, home",
  langue: "Language",
  changerDeLangue: "Change language",
  reserver: "Book now",
  demanderPrix: "Get a price",
  panier: "Your transfers",
  panierVide: "empty",
  transfert: "transfer",
  transferts: "transfers",

  pied: {
    accroche: "A firm price, before you commit",
    accrocheSuite: "Ski bags, child seats, tolls and flight tracking included.",
    aPropos: "About Transfers",
    reservation: "Booking",
    services: "Services",
    ressources: "Resources",
    paysDesservis: "Countries served",
    nousEcrire: "Get in touch",
    droits: "All rights reserved.",
  },

  pretAReserver: "Ready to book?",
  pretAReserverTexte:
    "One price per vehicle, flight tracking, and a driver waiting for you even if your flight is late.",
  votreTrajet: "Your journey",
  depart: "From",
  arrivee: "To",
  distance: "Distance",
  tempsDeRoute: "Drive time",
  prix: "Price",
  prixFixe: "Fixed, per vehicle",
  aeroportDe: (nom) => `${nom} Airport`,
  tousLesTransfertsVers: (station) => `All transfers to ${station}`,
  questionsFrequentes: "Frequently asked questions",
  aide: "Help",
  faqStation: (station) => `Frequently asked questions — ${station}`,
  faqTrajet: (aeroport, station) => `Frequently asked questions — ${aeroport} to ${station}`,
  reservezVers: (station) => `Book your transfer to ${station}`,
  reservezTrajet: (aeroport, station) => `Book your transfer from ${aeroport} to ${station}`,
  reservezAlpes: "Book your airport ski transfer",
  devisImmediat:
    "An instant quote, confirmation by email, and a driver at the agreed meeting point.",
  devisImmediatChauffeur:
    "An instant quote, confirmation by email, and a driver waiting on arrival.",
  inclusCourt: "Fixed price per vehicle, ski bags and child seats included, flight tracked.",

  stations: "Resorts",
  trajets: "Routes",
  transfertsVers: (station) => `Transfers to ${station}`,
  mesureNote:
    "Distances and drive times measured on the road network, outside traffic. Allow more on a peak-season Saturday.",
  voirCeTrajet: "See this route",
  voirLesTransferts: "See the transfers",
  trajetsDepuis: (nombre, aeroports) =>
    `${nombre} route${nombre > 1 ? "s" : ""} from ${aeroports}`,

  blogTitre: "Ski transfer guides",
  blogChapo:
    "Which airport to fly into, how car-free resorts actually work, what to check before you pay.",
  lireLeGuide: "Read the guide →",
  minutesLecture: (n) => `${n} min read`,
  publieLe: "Published",
  aLire: "More guides",
  stationsCitees: "Resorts mentioned",
};

const FR: TextesUI = {
  accueil: "Accueil",
  allerAuContenu: "Aller au contenu",
  navPrincipale: "Principal",
  navCompacte: "Principal, compact",
  logoAccueil: "Alps Ski Transfers, accueil",
  langue: "Langue",
  changerDeLangue: "Changer de langue",
  reserver: "Réserver",
  demanderPrix: "Demander un prix",
  panier: "Vos transferts",
  panierVide: "vide",
  transfert: "transfert",
  transferts: "transferts",

  pied: {
    accroche: "Un prix ferme, avant de vous engager",
    accrocheSuite: "Skis, sièges enfants, péages et suivi du vol compris.",
    aPropos: "À propos",
    reservation: "Réservation",
    services: "Services",
    ressources: "Ressources",
    paysDesservis: "Pays desservis",
    nousEcrire: "Nous écrire",
    droits: "Tous droits réservés.",
  },

  pretAReserver: "Prêt à réserver ?",
  pretAReserverTexte:
    "Prix fixe par véhicule, suivi du vol, et un chauffeur qui vous attend même si l’avion a du retard.",
  votreTrajet: "Votre trajet",
  depart: "Départ",
  arrivee: "Arrivée",
  distance: "Distance",
  tempsDeRoute: "Temps de route",
  prix: "Prix",
  prixFixe: "Fixe, par véhicule",
  aeroportDe: (nom) => `Aéroport de ${nom}`,
  tousLesTransfertsVers: (station) => `Tous les transferts vers ${station}`,
  questionsFrequentes: "Questions fréquentes",
  aide: "Aide",
  faqStation: (station) => `Questions fréquentes — ${station}`,
  faqTrajet: (aeroport, station) => `Questions fréquentes — ${aeroport} ${station}`,
  reservezVers: (station) => `Réservez votre transfert vers ${station}`,
  reservezTrajet: (aeroport, station) => `Réservez votre transfert ${aeroport} → ${station}`,
  reservezAlpes: "Réservez votre transfert vers les Alpes",
  devisImmediat:
    "Devis immédiat, confirmation par e-mail, chauffeur au point de rendez-vous convenu.",
  devisImmediatChauffeur: "Devis immédiat, confirmation par e-mail, chauffeur à l’arrivée.",
  inclusCourt: "Prix fixe par véhicule, skis et sièges enfants compris, suivi du vol.",

  stations: "Stations",
  trajets: "Trajets",
  transfertsVers: (station) => `Transferts vers ${station}`,
  mesureNote:
    "Distances et durées mesurées sur le réseau routier, hors trafic. Comptez davantage un samedi de haute saison.",
  voirCeTrajet: "Voir ce trajet",
  voirLesTransferts: "Voir les transferts",
  trajetsDepuis: (nombre, aeroports) =>
    `${nombre} trajet${nombre > 1 ? "s" : ""} au départ de ${aeroports}`,

  blogTitre: "Guides du transfert vers les Alpes",
  blogChapo:
    "Quel aéroport choisir, comment fonctionnent vraiment les stations sans voiture, ce qu’il faut vérifier avant de payer.",
  lireLeGuide: "Lire le guide →",
  minutesLecture: (n) => `${n} min de lecture`,
  publieLe: "Publié le",
  aLire: "Autres guides",
  stationsCitees: "Stations citées",
};

/**
 * Allemand.
 *
 * Le vocabulaire est celui du marché autrichien et suisse alémanique :
 * « Flughafentransfer » plutôt que « Transfer vom Flughafen », « Skiort » pour
 * la station, « Fahrzeit » pour le temps de route. « Privattransfer » est le
 * terme que les concurrents allemands emploient et celui que le voyageur tape.
 */
const DE: TextesUI = {
  accueil: "Startseite",
  allerAuContenu: "Zum Inhalt springen",
  navPrincipale: "Hauptnavigation",
  navCompacte: "Hauptnavigation, kompakt",
  logoAccueil: "Alps Ski Transfers, Startseite",
  langue: "Sprache",
  changerDeLangue: "Sprache wechseln",
  reserver: "Jetzt buchen",
  demanderPrix: "Preis anfragen",
  panier: "Ihre Transfers",
  panierVide: "leer",
  transfert: "Transfer",
  transferts: "Transfers",

  pied: {
    accroche: "Ein Festpreis, bevor Sie sich binden",
    accrocheSuite: "Skisäcke, Kindersitze, Maut und Flugüberwachung inklusive.",
    aPropos: "Über uns",
    reservation: "Buchung",
    services: "Leistungen",
    ressources: "Rechtliches",
    paysDesservis: "Zielländer",
    nousEcrire: "Schreiben Sie uns",
    droits: "Alle Rechte vorbehalten.",
  },

  pretAReserver: "Bereit zum Buchen?",
  pretAReserverTexte:
    "Festpreis pro Fahrzeug, Flugüberwachung, und ein Fahrer, der auch bei Verspätung auf Sie wartet.",
  votreTrajet: "Ihre Fahrt",
  depart: "Von",
  arrivee: "Nach",
  distance: "Entfernung",
  tempsDeRoute: "Fahrzeit",
  prix: "Preis",
  prixFixe: "Festpreis pro Fahrzeug",
  aeroportDe: (nom) => `Flughafen ${nom}`,
  tousLesTransfertsVers: (station) => `Alle Transfers nach ${station}`,
  questionsFrequentes: "Häufige Fragen",
  aide: "Hilfe",
  faqStation: (station) => `Häufige Fragen — ${station}`,
  faqTrajet: (aeroport, station) => `Häufige Fragen — ${aeroport} nach ${station}`,
  reservezVers: (station) => `Buchen Sie Ihren Transfer nach ${station}`,
  reservezTrajet: (aeroport, station) => `Buchen Sie Ihren Transfer ${aeroport} → ${station}`,
  reservezAlpes: "Buchen Sie Ihren Flughafentransfer in die Alpen",
  devisImmediat:
    "Sofortangebot, Bestätigung per E-Mail, Fahrer am vereinbarten Treffpunkt.",
  devisImmediatChauffeur: "Sofortangebot, Bestätigung per E-Mail, Fahrer bei der Ankunft.",
  inclusCourt: "Festpreis pro Fahrzeug, Skisäcke und Kindersitze inklusive, Flug überwacht.",

  stations: "Skiorte",
  trajets: "Strecken",
  transfertsVers: (station) => `Transfers nach ${station}`,
  mesureNote:
    "Entfernungen und Fahrzeiten sind auf dem realen Straßennetz gemessen, ohne Verkehr. An einem Samstag in der Hochsaison rechnen Sie mehr ein.",
  voirCeTrajet: "Diese Strecke ansehen",
  voirLesTransferts: "Transfers ansehen",
  trajetsDepuis: (nombre, aeroports) =>
    `${nombre} Strecke${nombre > 1 ? "n" : ""} ab ${aeroports}`,

  blogTitre: "Ratgeber zum Skitransfer",
  blogChapo:
    "Welcher Flughafen sich lohnt, wie autofreie Orte wirklich funktionieren, worauf Sie vor der Zahlung achten.",
  lireLeGuide: "Zum Ratgeber →",
  minutesLecture: (n) => `${n} Min. Lesezeit`,
  publieLe: "Veröffentlicht am",
  aLire: "Weitere Ratgeber",
  stationsCitees: "Erwähnte Skiorte",
};

/**
 * Italien.
 *
 * « Trasferimento aeroporto » est la requête, « transfer » le mot d'usage : les
 * deux cohabitent dans le marché et dans nos textes, comme chez les
 * transporteurs italiens. « Località sciistica » pour la station, « comprensorio »
 * pour le domaine.
 */
const IT: TextesUI = {
  accueil: "Home",
  allerAuContenu: "Vai al contenuto",
  navPrincipale: "Principale",
  navCompacte: "Principale, compatta",
  logoAccueil: "Alps Ski Transfers, home",
  langue: "Lingua",
  changerDeLangue: "Cambia lingua",
  reserver: "Prenota",
  demanderPrix: "Chiedi un preventivo",
  panier: "I tuoi trasferimenti",
  panierVide: "vuoto",
  transfert: "trasferimento",
  transferts: "trasferimenti",

  pied: {
    accroche: "Un prezzo fermo, prima di impegnarti",
    accrocheSuite: "Sacche da sci, seggiolini, pedaggi e monitoraggio del volo inclusi.",
    aPropos: "Chi siamo",
    reservation: "Prenotazione",
    services: "Servizi",
    ressources: "Informazioni legali",
    paysDesservis: "Paesi serviti",
    nousEcrire: "Scrivici",
    droits: "Tutti i diritti riservati.",
  },

  pretAReserver: "Pronto a prenotare?",
  pretAReserverTexte:
    "Prezzo fisso per veicolo, volo monitorato, e un autista che ti aspetta anche se l’aereo è in ritardo.",
  votreTrajet: "Il tuo tragitto",
  depart: "Partenza",
  arrivee: "Arrivo",
  distance: "Distanza",
  tempsDeRoute: "Tempo di percorrenza",
  prix: "Prezzo",
  prixFixe: "Fisso, per veicolo",
  aeroportDe: (nom) => `Aeroporto di ${nom}`,
  tousLesTransfertsVers: (station) => `Tutti i trasferimenti per ${station}`,
  questionsFrequentes: "Domande frequenti",
  aide: "Assistenza",
  faqStation: (station) => `Domande frequenti — ${station}`,
  faqTrajet: (aeroport, station) => `Domande frequenti — ${aeroport} ${station}`,
  reservezVers: (station) => `Prenota il tuo trasferimento per ${station}`,
  reservezTrajet: (aeroport, station) => `Prenota il trasferimento ${aeroport} → ${station}`,
  reservezAlpes: "Prenota il tuo trasferimento aeroporto per le Alpi",
  devisImmediat:
    "Preventivo immediato, conferma via e-mail, autista al punto d’incontro concordato.",
  devisImmediatChauffeur: "Preventivo immediato, conferma via e-mail, autista all’arrivo.",
  inclusCourt: "Prezzo fisso per veicolo, sci e seggiolini inclusi, volo monitorato.",

  stations: "Località",
  trajets: "Tragitti",
  transfertsVers: (station) => `Trasferimenti per ${station}`,
  mesureNote:
    "Distanze e tempi misurati sulla rete stradale reale, senza traffico. Il sabato di alta stagione conta di più.",
  voirCeTrajet: "Vedi il tragitto",
  voirLesTransferts: "Vedi i trasferimenti",
  trajetsDepuis: (nombre, aeroports) =>
    `${nombre} tragitt${nombre > 1 ? "i" : "o"} da ${aeroports}`,

  blogTitre: "Guide ai trasferimenti sulla neve",
  blogChapo:
    "Quale aeroporto scegliere, come funzionano davvero le località senza auto, cosa verificare prima di pagare.",
  lireLeGuide: "Leggi la guida →",
  minutesLecture: (n) => `${n} min di lettura`,
  publieLe: "Pubblicato il",
  aLire: "Altre guide",
  stationsCitees: "Località citate",
};

const TABLE: Record<Lang, TextesUI> = { en: EN, fr: FR, de: DE, it: IT };

/** Les libellés d'une langue. */
export function T(lang: Lang): TextesUI {
  return TABLE[lang];
}

/**
 * Le slug de la page de réservation, par langue.
 *
 * Il est dans l'URL, donc dans le mot-clé : `buchen` et `prenota` sont les
 * verbes que ces marchés tapent, `reserver` celui du marché français.
 */
export const SLUG_RESERVATION: Record<LangueSecondaire, string> = {
  fr: "reserver",
  de: "buchen",
  it: "prenota",
};

/** Le chemin du tunnel de réservation, dans une langue donnée. */
export function lienReserver(lang: LangueSecondaire): string {
  return `/${lang}/${SLUG_RESERVATION[lang]}/`;
}
