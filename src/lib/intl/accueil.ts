import type { LangueSecondaire } from "@/lib/i18n";
import type { NomVisuel } from "@/components/Visuel";

/**
 * L'accueil de chaque langue.
 *
 * Ce n'est pas la home anglaise traduite : chaque marché arrive par une porte
 * différente et n'a pas les mêmes questions. Le francophone part de Genève ou
 * de Lyon et compare des prix ; le germanophone part d'Innsbruck, de Salzbourg,
 * de Zurich ou de Munich et se demande surtout si le véhicule est équipé pour
 * l'hiver autrichien ; l'italophone part de Turin ou de Milan et pense tunnel,
 * péage et frontière. Les trois textes le disent chacun à leur façon.
 *
 * `titre` est le H1 : il porte le mot-clé du marché, pas la traduction littérale
 * du H1 anglais.
 */
/**
 * Les trois catégories de véhicule, dans la langue.
 *
 * Les modèles ne se traduisent pas — un Volkswagen Transporter est un
 * Volkswagen Transporter partout — mais la capacité et l'intitulé de section,
 * si. Les clés sont celles de `VEHICULES.categories`, pas leur rang.
 */
export interface VehiculesTraduits {
  surtitre: string;
  titre: string;
  capacites: Record<"standard" | "business" | "premium", string>;
  /**
   * Le texte alternatif de chaque photo.
   *
   * Les trois véhicules gardaient leur `alt` anglais sur les homes traduites —
   * « Black Volkswagen Transporter minibus » au milieu d'une page allemande.
   * Un lecteur d'écran allemand lisait donc de l'anglais, et Google recevait un
   * texte dans une langue que la page ne déclare pas. La photo est la même, les
   * mots non.
   */
  alts: Record<"standard" | "business" | "premium", string>;
}

/**
 * L'habillage de la section des avis.
 *
 * **Les témoignages eux-mêmes ne sont pas traduits.** Ce sont des propos de
 * clients, signés d'un nom et d'une ville : les réécrire en allemand
 * fabriquerait une preuve sociale que personne n'a écrite. Ils restent donc
 * dans leur langue d'origine, sous un intitulé qui, lui, est traduit — et le
 * jour où la fiche Google est branchée, les avis arrivent dans la langue où ils
 * ont été laissés, ce qui est le même principe.
 */
export interface AvisTraduits {
  surtitre: string;
  titre: string;
  surtitreGoogle: string;
  nombreSurGoogle: (total: number) => string;
  noteSur5: (note: number) => string;
}

export interface ContenuAccueil {
  metaTitre: string;
  metaDescription: string;
  h1: string;
  chapo: string;
  visuel: { nom: NomVisuel; alt: string };
  /**
   * Le visuel du bandeau de présentation — celui qui porte le texte sur le bleu
   * nuit, à mi-page. Distinct de `visuel`, qui est le fond du bandeau d'accueil :
   * la même photo deux fois sur une page se remarque.
   *
   * **Il suit le périmètre de la langue, pas le hasard.** Les quatre langues ont
   * d'abord partagé la même route alpine : ce n'était pas une faute de
   * référencement — Google ne pénalise pas une image réutilisée d'une page à
   * l'autre, et un fichier partagé arrive même déjà en cache — mais une photo
   * générique ne dit rien du massif qu'on vend. L'allemand ne vend plus que la
   * Suisse, l'italien le Piémont et la Vallée d'Aoste : la photo le dit
   * maintenant, et l'`alt` avec elle.
   */
  visuelPresentation: { nom: NomVisuel; alt: string };
  reperes: { libelle: string; valeur: string }[];
  sections: { titre: string; paragraphes: string[] }[];
  vehicules: VehiculesTraduits;
  avis: AvisTraduits;
  listeStations: { surtitre: string; titre: string; chapo: string };
  listeTrajets: { surtitre: string; titre: string; chapo: string };
  appel: { titre: string; texte: string; lienContact: { texte: string; chemin: string } };
}

export const ACCUEIL: Record<LangueSecondaire, ContenuAccueil> = {
  fr: {
    metaTitre: "Transferts aéroport vers les stations des Alpes",
    metaDescription:
      "Transferts privés depuis Genève, Lyon, Chambéry et Grenoble vers les stations des Alpes. Prix fixe par véhicule, suivi des vols, skis inclus.",
    h1: "Transferts aéroport vers les stations des Alpes",
    chapo:
      "Un chauffeur vous attend à la sortie des bagages, votre vol est suivi, et le prix est fixé par véhicule avant la réservation — skis, snowboards et sièges enfants compris. Nous desservons les Alpes françaises, suisses et italiennes depuis Genève, Lyon, Chambéry et Grenoble.",
    visuel: {
      nom: "hero-alps-ski-transfers",
      alt: "Skieurs dans la poudreuse au-dessus d'une station des Alpes",
    },
    visuelPresentation: {
      nom: "pays-france",
      alt: "Station des Alpes françaises au-dessus de la limite des arbres",
    },
    reperes: [
      { libelle: "Stations desservies", valeur: "68" },
      { libelle: "Aéroports", valeur: "34" },
      { libelle: "Prix", valeur: "Fixe, par véhicule" },
    ],
    sections: [
      {
        titre: "Un véhicule pour vous seuls, de la porte à la porte",
        paragraphes: [
          "Le véhicule part à l’heure où vous atterrissez vraiment — le chauffeur suit le numéro de vol — et vous dépose à l’adresse de votre logement, sans arrêt intermédiaire. Sur une route de montagne en février, un trajet direct se compte en heures gagnées, pas en minutes.",
          "Le prix est annoncé par véhicule et non par personne : à deux comme à huit, c’est le même montant. Les skis, les sièges enfants et les péages y sont déjà, et il ne bouge pas après la réservation.",
        ],
      },
      {
        titre: "Ce qui est inclus, et qui ne se rajoute pas à l’arrivée",
        paragraphes: [
          "Les housses à skis et à snowboard voyagent gratuitement, et le véhicule est choisi en fonction du matériel que vous déclarez, pas seulement du nombre de sièges. Les sièges enfants et rehausseurs sont fournis et installés avant le départ, comme la loi française l’exige jusqu’à 10 ans. Les péages, tunnels et vignettes suisses sont dans le prix.",
          "Nos véhicules sont équipés pour l’hiver — pneus et chaînes — sur des routes où les équipements sont obligatoires du 1ᵉʳ novembre au 31 mars.",
        ],
      },
    ],
    vehicules: {
      surtitre: "Nos véhicules",
      titre: "De la porte à la porte, dans un véhicule prévu pour la montagne",
      capacites: {
        standard: "Jusqu’à 8 passagers",
        business: "Jusqu’à 7 passagers",
        premium: "Jusqu’à 4 passagers",
      },
      alts: {
        standard: "Minibus Volkswagen Transporter noir",
        business: "Monospace Mercedes Classe V noir",
        premium: "Berline Mercedes Classe E noire",
      },
    },
    avis: {
      surtitre: "Avis clients",
      titre: "Ce que disent les passagers",
      surtitreGoogle: "Avis Google",
      nombreSurGoogle: (total) => `${total} avis sur Google`,
      noteSur5: (note) => `${note} sur 5`,
    },
    listeStations: {
      surtitre: "Stations",
      titre: "Les stations desservies, page par page",
      chapo:
        "Chaque page indique les aéroports qui desservent la station, la distance réelle et le temps de route.",
    },
    listeTrajets: {
      surtitre: "Trajets",
      titre: "Les liaisons les plus demandées",
      chapo:
        "Distances et durées mesurées sur le réseau routier, hors trafic. Comptez davantage un samedi de haute saison.",
    },
    appel: {
      titre: "Réservez votre transfert vers les Alpes",
      texte:
        "Devis immédiat, confirmation par e-mail, chauffeur au point de rendez-vous convenu. Pour un groupe, un séminaire ou une demande sur mesure,",
      lienContact: { texte: "écrivez-nous", chemin: "/fr/contact/" },
    },
  },

  de: {
    metaTitre: "Skitransfer in die Schweizer Alpen | Festpreis pro Fahrzeug",
    metaDescription:
      "Privater Transfer ab Zürich und Genf nach Zermatt, Davos und St. Moritz. Festpreis pro Fahrzeug, Vignette und Maut inklusive, Ski und Kindersitze frei.",
    h1: "Flughafentransfer in die Schweizer Skiorte",
    chapo:
      "Ihr Fahrer wartet an der Gepäckausgabe, Ihr Flug wird überwacht, und der Preis steht vor der Buchung fest — pro Fahrzeug, mit Skisäcken, Kindersitzen, Maut und Vignette. Wir fahren ab Zürich und Genf nach Zermatt, Davos und St. Moritz.",
    visuel: {
      nom: "hero-alps-ski-transfers",
      alt: "Skifahrer im Tiefschnee oberhalb eines Skiorts in den Alpen",
    },
    visuelPresentation: {
      nom: "pays-switzerland",
      alt: "Schweizer Skiort unterhalb der Gipfel",
    },
    reperes: [
      { libelle: "Skiorte", valeur: "68" },
      { libelle: "Flughäfen", valeur: "34" },
      { libelle: "Preis", valeur: "Fest, pro Fahrzeug" },
    ],
    sections: [
      {
        titre: "Ein Fahrzeug nur für Sie, von Tür zu Tür",
        paragraphes: [
          "Das Fahrzeug fährt los, wenn Sie tatsächlich landen — der Fahrer verfolgt Ihre Flugnummer — und bringt Sie ohne Zwischenstopp bis vor Ihre Unterkunft. Auf einer Bergstraße im Februar zählt eine direkte Fahrt in gewonnenen Stunden, nicht in Minuten.",
          "Der Preis gilt pro Fahrzeug, nicht pro Person: zu zweit wie zu acht ist es derselbe Betrag. Skisäcke, Kindersitze, Maut und die Schweizer Vignette sind bereits enthalten, und nach der Buchung ändert er sich nicht.",
        ],
      },
      {
        titre: "Wo die Straße endet, sagen wir es vorher",
        paragraphes: [
          "Zermatt ist autofrei. Der Transfer endet in Täsch, und die letzten fünf Kilometer fährt der Zug im Zwanzig-Minuten-Takt: wir legen die Ankunft auf eine Abfahrt, statt Sie am Bahnhof rechnen zu lassen. Davos und St. Moritz erreichen Sie dagegen direkt vor der Unterkunft — 166 beziehungsweise 221 Kilometer ab Zürich, zweieinhalb bis dreieinhalb Stunden je nach Straßenzustand.",
          "In der Schweiz entscheidet nicht das Datum über die Winterausrüstung, sondern der Zustand der Straße. Unsere Fahrzeuge fahren die ganze Saison mit Winterreifen und führen Ketten mit, und die Autobahnvignette ist im Preis enthalten — ein Angebot, das sie ausklammert, ist kein Angebot, sondern eine Schätzung.",
        ],
      },
    ],
    listeStations: {
      surtitre: "Skiorte",
      titre: "Die Skiorte, Seite für Seite",
      chapo:
        "Jede Seite nennt die Flughäfen, die den Ort bedienen, die reale Entfernung und die Fahrzeit.",
    },
    listeTrajets: {
      surtitre: "Strecken",
      titre: "Die meistgefragten Verbindungen",
      chapo:
        "Entfernungen und Fahrzeiten auf dem realen Straßennetz gemessen, ohne Verkehr. An einem Samstag in der Hochsaison rechnen Sie mehr ein.",
    },
    vehicules: {
      surtitre: "Unsere Fahrzeuge",
      titre: "Von Tür zu Tür, in einem Fahrzeug für den Bergwinter",
      capacites: {
        standard: "Bis zu 8 Personen",
        business: "Bis zu 7 Personen",
        premium: "Bis zu 4 Personen",
      },
      alts: {
        standard: "Schwarzer Volkswagen Transporter Kleinbus",
        business: "Schwarzer Mercedes V-Klasse Van",
        premium: "Schwarze Mercedes E-Klasse Limousine",
      },
    },
    avis: {
      surtitre: "Kundenstimmen",
      titre: "Was unsere Fahrgäste sagen",
      surtitreGoogle: "Google-Bewertungen",
      nombreSurGoogle: (total) => `${total} Bewertungen bei Google`,
      noteSur5: (note) => `${note} von 5`,
    },
    appel: {
      titre: "Buchen Sie Ihren Transfer in die Alpen",
      texte:
        "Sofortangebot, Bestätigung per E-Mail, Fahrer am vereinbarten Treffpunkt. Für Gruppen, Seminare oder Sonderwünsche",
      lienContact: { texte: "schreiben Sie uns", chemin: "/de/kontakt/" },
    },
  },

  it: {
    metaTitre: "Trasferimenti aeroporto per le Alpi | Prezzo per veicolo",
    metaDescription:
      "Transfer privato da Torino, Milano Malpensa, Bergamo e Ginevra verso le località sciistiche delle Alpi. Prezzo fisso per veicolo, sci e pedaggi inclusi.",
    h1: "Trasferimenti aeroporto per le località sciistiche delle Alpi",
    chapo:
      "Un autista ti aspetta all’uscita dei bagagli, il volo è monitorato, e il prezzo è fissato per veicolo prima della prenotazione — sci, seggiolini e pedaggi compresi. Serviamo la Valle d’Aosta, il Piemonte e le Alpi da Torino, Milano Malpensa, Bergamo e Ginevra.",
    visuel: {
      nom: "hero-alps-ski-transfers",
      alt: "Sciatori nella neve fresca sopra una località sciistica delle Alpi",
    },
    visuelPresentation: {
      nom: "pays-italy",
      alt: "Località sciistica delle Alpi italiane in una giornata di sole",
    },
    reperes: [
      { libelle: "Località servite", valeur: "68" },
      { libelle: "Aeroporti", valeur: "34" },
      { libelle: "Prezzo", valeur: "Fisso, per veicolo" },
    ],
    sections: [
      {
        titre: "Un veicolo solo per voi, porta a porta",
        paragraphes: [
          "Il veicolo parte all’ora in cui atterri davvero — l’autista segue il numero del volo — e ti lascia all’indirizzo del tuo alloggio, senza fermate intermedie. Su una strada di montagna a febbraio, un tragitto diretto si misura in ore guadagnate, non in minuti.",
          "Il prezzo è per veicolo e non per persona: in due come in otto, l’importo è lo stesso. Sci, seggiolini e pedaggi sono già dentro, e dopo la prenotazione non cambia.",
        ],
      },
      {
        titre: "Tunnel, pedaggi e frontiere: già nel prezzo",
        paragraphes: [
          "Il traforo del Monte Bianco e quello del Fréjus costano una cifra seria per un minibus, e il vignette svizzero è annuale. Sono nel preventivo che ti diamo, come tutti i pedaggi autostradali del percorso: un preventivo che li esclude non è un preventivo, è una stima.",
          "Francia, Italia e Svizzera sono tutte nello spazio Schengen, quindi il passaggio di frontiera è di routine — porta comunque un documento. I nostri veicoli sono assicurati e attrezzati per ogni Paese attraversato, con pneumatici invernali e catene a bordo.",
        ],
      },
    ],
    vehicules: {
      surtitre: "I nostri veicoli",
      titre: "Porta a porta, con un veicolo attrezzato per la montagna",
      capacites: {
        standard: "Fino a 8 passeggeri",
        business: "Fino a 7 passeggeri",
        premium: "Fino a 4 passeggeri",
      },
      alts: {
        standard: "Minibus Volkswagen Transporter nero",
        business: "Monovolume Mercedes Classe V nero",
        premium: "Berlina Mercedes Classe E nera",
      },
    },
    avis: {
      surtitre: "Recensioni dei clienti",
      titre: "Che cosa dicono i passeggeri",
      surtitreGoogle: "Recensioni Google",
      nombreSurGoogle: (total) => `${total} recensioni su Google`,
      noteSur5: (note) => `${note} su 5`,
    },
    listeStations: {
      surtitre: "Località",
      titre: "Le località servite, pagina per pagina",
      chapo:
        "Ogni pagina indica gli aeroporti che servono la località, la distanza reale e il tempo di percorrenza.",
    },
    listeTrajets: {
      surtitre: "Tragitti",
      titre: "I collegamenti più richiesti",
      chapo:
        "Distanze e tempi misurati sulla rete stradale reale, senza traffico. Il sabato di alta stagione conta di più.",
    },
    appel: {
      titre: "Prenota il tuo trasferimento per le Alpi",
      texte:
        "Preventivo immediato, conferma via e-mail, autista al punto d’incontro concordato. Per gruppi, seminari o richieste su misura",
      lienContact: { texte: "scrivici", chemin: "/it/contatti/" },
    },
  },
};
