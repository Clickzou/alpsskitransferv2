/**
 * Les demandes sur mesure en français, en allemand et en italien.
 *
 * ## Pourquoi trois traductions et pas une
 *
 * Décision de JC, 22 septembre 2026. La page anglaise laissait la barre sans
 * sélecteur de langue — une page qui n'existe que dans une langue ne peut en
 * proposer aucune autre, c'est la règle du projet — mais surtout, le marché
 * visé n'est pas anglophone par nature :
 *
 *  · **le français** porte Courchevel, Megève et Val d'Isère, les mariages en
 *    Savoie et les agences événementielles parisiennes ;
 *  · **l'allemand** porte la Suisse alémanique, Zermatt et St. Moritz, où la
 *    clientèle d'affaires arrive par Zurich et Sion ;
 *  · **l'italien** porte la Vallée d'Aoste et le Piémont, Courmayeur, Cervinia
 *    et Cortina, avec Milan et Turin comme portes d'entrée.
 *
 * ## Les mots-clés ne se traduisent pas — ils se relèvent
 *
 * Première version, le 22 septembre 2026 : « transferts de luxe »,
 * « Luxus-Transfer », « transfer di lusso ». Trois calques de l'anglais, et
 * trois expressions que personne ne tape. JC l'a vu tout de suite. Relevé de ce
 * que les concurrents mettent réellement dans leurs titres, marché par marché :
 *
 *  · **français — « chauffeur privé », « VTC ».** « Chauffeur Privé Courchevel
 *    – VTC Aéroport & Transfert Stations de Ski », « VTC Genève – Chauffeur
 *    privé aéroport ». Pas une occurrence de « transfert de luxe ».
 *  · **allemand — « Limousinenservice », « Chauffeurservice ».** Le terme est
 *    si établi que des sites entiers s'appellent « Limousinenservice Sankt
 *    Moritz » ou « Chauffeurservice St. Moritz ». « Luxus-Transfer » n'existe
 *    pas comme requête.
 *  · **italien — « NCC »**, pour *noleggio con conducente*. C'est le mot du
 *    métier **et** celui du public : « NCC Cervinia », « NCC Transfer Torino »,
 *    et un concurrent dont le domaine est littéralement `nccautodilusso.com`.
 *  · **anglais — « chauffeur service »**, à côté de « luxury ski transfer ».
 *    L'URL anglaise ne bouge pas, « luxury ski transfers » étant le terme du
 *    secteur côté transferts, mais le title porte désormais les deux.
 *
 * D'où les slugs : `chauffeur-prive`, `limousinenservice`, `ncc-di-lusso`. Le
 * slug est un mot-clé et il vit dans l'URL — c'est la règle du projet, encore
 * fallait-il que ce soit le bon mot. Chaque introduction pose le terme dans sa
 * première phrase utile : c'est ce que le visiteur vient de taper, il doit le
 * retrouver dans le texte.
 *
 * **À retenir pour les prochaines traductions** : traduire le contenu, oui ;
 * traduire le mot-clé, jamais. Un marché se relève, il ne se déduit pas.
 *
 * ## Ce ne sont pas des miroirs
 *
 * La structure est commune — c'est le même gabarit et le même formulaire — mais
 * les exemples suivent le périmètre de chaque langue. Le hub allemand ne cite ni
 * Courchevel ni Megève, qu'il ne dessert pas en allemand ; l'italien parle de
 * Milan, de Turin et de l'altiport de Courmayeur plutôt que d'Annecy. Traduire
 * mot à mot aurait produit trois pages qui parlent du marché français dans trois
 * langues.
 *
 * **La réserve sur l'air est reprise à l'identique dans les trois** : les vols
 * sont affrétés auprès d'opérateurs agréés, et l'exploitant n'en exploite aucun.
 * C'est une limite juridique, pas une tournure rédactionnelle — voir l'en-tête
 * de `page-premium.ts`.
 */

import type { LangueSecondaire } from "@/lib/i18n";
import type { ContenuPremium } from "./page-premium";

/** Les slugs sont des mots-clés : ils vivent dans l'URL, comme ailleurs sur le site. */
export const SLUGS_PREMIUM: Record<LangueSecondaire, string> = {
  fr: "chauffeur-prive",
  de: "limousinenservice",
  it: "ncc-di-lusso",
};

const FR: ContenuPremium = {
  motCle: "chauffeur privé Alpes",
  filAriane: "Chauffeur privé",
  nomService: "Chauffeur privé et VTC de luxe dans les Alpes",

  heroImage: {
    nom: "vehicule-premium",
    alt: "Berline haut de gamme à l'arrivée d'une station des Alpes",
  },
  introImage: {
    nom: "premium-helicoptere",
    alt: "Hélicoptère privé posé sur une hélisurface enneigée au crépuscule, une berline attend à côté",
  },

  reperes: [
    { libelle: "À l'heure ou à la semaine", valeur: "Voiture et chauffeur à vous" },
    { libelle: "Par les airs", valeur: "Hélicoptère et jet privé" },
    { libelle: "Proposition écrite", valeur: "Sous 24 heures" },
  ],

  intro: [
    "Certains déplacements ne sont pas des transferts. Une voiture et un chauffeur retenus pour la semaine, une arrivée en jet privé à Chambéry, le dernier tronçon vers Courchevel en hélicoptère un samedi où la route est saturée, un mariage dont les invités atterrissent sur deux jours : rien de tout cela n'entre dans un formulaire de réservation, et rien de tout cela ne doit être chiffré par un formulaire.",
    "Cette page est faite pour ces demandes. C'est du chauffeur privé au sens strict — un VTC retenu pour vous, pas une course — et tout ce qui va avec. Vous décrivez le séjour tel qu'il sera ; nous revenons vers vous par écrit — les véhicules, les horaires, l'opérateur pour ce qui vole, et un prix. Rien n'est facturé, rien n'est engagé, avant que vous ayez lu la proposition.",
  ],

  renvoiGroupes: {
    avant: "Vous voyagez en groupe nombreux plutôt qu'en privé ? La page ",
    lien: "agences et professionnels",
    apres: " couvre les convois de plusieurs véhicules chiffrés comme un seul trajet.",
    chemin: "/fr/agences-et-professionnels/",
  },

  actions: {
    envoyer: "Envoyer votre demande",
    appeler: "ou appelez le",
    commencer: "Commencer votre demande",
  },

  prestations: {
    surtitre: "Ce que nous organisons",
    titre: "Quatre demandes qui reviennent chaque hiver",
    chapo:
      "Toutes partent du même point : un programme plutôt qu'un trajet, et un seul interlocuteur qui en répond.",
    cartes: [
      {
        titre: "Chauffeur à disposition",
        texte:
          "Le véhicule ne repart pas après le transfert : il reste avec vous. Une demi-journée, une journée, ou toute la durée du séjour — le chauffeur est à vous, et les heures aussi. C'est ce que demandent la plupart des clients une fois en station, et ce que presque personne ne vend en ligne : un formulaire n'a pas de case pour « où nous déciderons d'aller à dix-huit heures ».",
        points: [
          "Demi-journée, journée entière ou séjour complet",
          "Le même chauffeur du début à la fin : rien à réexpliquer",
          "L'attente est comprise dans le prix, pas facturée en supplément",
          "Restaurants, remontées, spa, dépose et reprise sur les pistes",
        ],
        image: {
          nom: "premium-chauffeur",
          alt: "Chauffeur ouvrant la portière arrière d'une berline devant un chalet alpin éclairé",
        },
      },
      {
        titre: "Transferts en hélicoptère",
        texte:
          "Les samedis de rotation, c'est la route qui décide de l'heure d'arrivée, pas la distance. Un tronçon aérien supprime la question : de Genève à l'altiport d'une station, le trajet se compte en minutes et non en heures. Nous affrétons le vol auprès d'opérateurs agréés et assurons les deux bouts — la conduite jusqu'à l'aire de départ, puis de l'hélisurface jusqu'à la porte.",
        points: [
          "Départs de Genève, Annecy, Sion et Chambéry",
          "Altiport de Courchevel, Megève, Zermatt et les hélisurfaces des stations",
          "Vols opérés par des opérateurs agréés ; les tronçons routiers sont les nôtres",
          "La météo reste la seule inconnue : un plan par la route accompagne chaque devis",
        ],
        image: {
          nom: "premium-helicoptere-vol",
          alt: "Hélicoptère en vol au-dessus des sommets enneigés par un matin d'hiver clair",
        },
      },
      {
        titre: "Arrivées en jet privé",
        texte:
          "Genève, Chambéry, Annecy et Sion accueillent l'aviation d'affaires, chacun avec ses propres règles d'assistance. Nous venons au plus près de l'appareil quand l'exploitant l'autorise, à la porte du terminal d'aviation d'affaires sinon, avec l'attente déjà comprise : un jet se pose quand il se pose, et un chauffeur absent est pire qu'inutile.",
        points: [
          "Accueil au terminal d'aviation d'affaires, ou au pied de l'appareil si l'assistance le permet",
          "Bagages et matériel de ski emportés sans second voyage",
          "Transferts d'équipage et repositionnements assurés le soir même",
          "Un créneau qui change ne coûte rien : prévenez-nous, le chauffeur suit",
        ],
        image: {
          nom: "premium-jet",
          alt: "Jet privé sur un tarmac enneigé à l'aube, van haut de gamme au pied de la passerelle",
        },
      },
      {
        titre: "Mariages, événements de marque et tournages",
        texte:
          "Un mariage en montagne, ce sont cinquante arrivées sur trois aéroports en deux jours, puis un créneau de départ le dimanche. Un événement de marque, c'est une flotte au bon endroit sans que personne ne la remarque. Un tournage, c'est une équipe, du matériel et une feuille de service qui bouge. Trois fois le même métier : un horaire, pas une réservation.",
        points: [
          "Un coordinateur pour tout l'événement, identifié et joignable",
          "Navettes des invités sur plusieurs aéroports et plusieurs jours",
          "Véhicules maintenus sur place entre deux mouvements",
          "Une seule facture, à l'entreprise, à l'agence ou à la production",
        ],
        image: {
          nom: "premium-evenement",
          alt: "Trois véhicules noirs alignés devant un lieu de réception alpin un soir d'hiver",
        },
      },
    ],
  },

  occasions: {
    surtitre: "Pour qui",
    titre: "Ceux qui nous appellent pour ça",
    chapo:
      "Rarement le voyageur seul. Le plus souvent quelqu'un qui organise pour lui, et qui répondra si cela se passe mal.",
    points: [
      {
        titre: "Maisons de luxe et marques",
        texte:
          "Événements d'hiver, accueil de clients, journées presse, lancements. L'exigence n'est presque jamais la voiture : c'est que trente mouvements se déroulent à l'heure et qu'aucun ne devienne une histoire.",
      },
      {
        titre: "Hôtels, chalets et conciergeries",
        texte:
          "Hôtels cinq étoiles, exploitants de chalets et conciergeries qui ont besoin d'un prestataire qui répond un samedi. Un contact, un compte, et des chauffeurs qui savent déjà où se trouve l'entrée de service.",
      },
      {
        titre: "Mariages en montagne",
        texte:
          "Des invités qui atterrissent à Genève, Lyon et Chambéry sur deux jours, une navette entre la cérémonie et la réception, et ce créneau de départ du dimanche matin auquel personne ne veut penser le jour même.",
      },
      {
        titre: "Production, tournages et shootings",
        texte:
          "Équipe, talents et matériel, sur une feuille de service qui change. Les véhicules restent avec la production au lieu de repartir à vide, et la facture part là où se trouve le budget.",
      },
      {
        titre: "Familles accompagnées",
        texte:
          "Une nounou, un moniteur, un second véhicule pour les bagages et le matériel. Les sièges enfants installés avant votre arrivée, et le même chauffeur toute la semaine pour que les habitudes se prennent.",
      },
      {
        titre: "Assistants et bureaux privés",
        texte:
          "Vous envoyez l'itinéraire, nous renvoyons ce qu'il coûte et qui conduit. Les changements passent par une seule personne, à toute heure du séjour, sans avoir à énoncer un numéro de dossier.",
      },
    ],
  },

  discretion: {
    surtitre: "Discrétion",
    titre: "Ce que « premium » veut dire ici",
    chapo:
      "Pas un écusson sur une portière. Un ensemble d'habitudes qui rendent un trajet parfaitement ordinaire — c'est tout l'objet.",
    points: [
      "Aucun nom sur une pancarte si vous préférez qu'il n'y en ait pas : un numéro de vol suffit à se retrouver.",
      "Un accord de confidentialité signé avant le devis si votre événement l'exige, le vôtre ou le nôtre.",
      "Rien n'est publié d'un trajet : ni photo, ni nom, ni publication « nous avons conduit ».",
      "Les chauffeurs reçoivent l'itinéraire avant le jour J : le programme ne se discute jamais devant vos invités.",
      "Facturation à l'entité qui paie — société, agence, production ou bureau familial — sous une référence unique.",
      "Un seul numéro pour tout le séjour, décroché par quelqu'un qui connaît déjà votre dossier.",
    ],
  },

  fonctionnement: {
    surtitre: "Comment ça se passe",
    titre: "De quelques lignes à un chauffeur devant la porte",
    chapo:
      "Une demande sur mesure ne se chiffre pas par un formulaire : elle se lit, se calcule et vous revient par écrit.",
    etapes: [
      {
        titre: "Envoyez les grandes lignes",
        texte:
          "Dates, aéroports, station, nombre de personnes, et ce à quoi doit ressembler le séjour. La version approximative suffit pour commencer.",
      },
      {
        titre: "Nous répondons par écrit",
        texte:
          "Sous 24 heures, le plus souvent le jour même : les véhicules, les heures retenues, l'opérateur pour un tronçon aérien, et un prix sans rien à découvrir ensuite.",
      },
      {
        titre: "Vous confirmez une fois",
        texte:
          "Une seule confirmation couvre tout le programme. Les noms des passagers, les numéros de vol et les horaires peuvent suivre plus tard.",
      },
      {
        titre: "Un coordinateur du début à la fin",
        texte:
          "Un nom et un numéro, joignables pendant toute la durée du séjour. Les changements passent par cette personne, pas par un formulaire.",
      },
    ],
    conclusion: {
      avant:
        "S'il vous faut simplement un véhicule d'un aéroport à une station, le formulaire de réservation est plus rapide et donne un prix ferme immédiatement — aucune demande à remplir :",
      lien: "Réserver un transfert",
    },
  },

  formulaire: {
    surtitre: "Votre demande",
    titre: "Dites-nous à quoi ressemble le séjour",
    chapo:
      "Plus cela ressemble à un programme et moins à une réservation, plus la réponse vous sera utile. Rien ici ne vous engage.",
  },

  encartTelephone: {
    titre: "Vous préférez en parler ?",
    texte:
      "Un programme complexe se décrit souvent plus vite à l'oral qu'au clavier. Appelez, nous prenons les grandes lignes en note pour vous.",
  },

  encartReservation: {
    titre: "Juste un transfert d'aéroport ?",
    texte:
      "Un véhicule d'un aéroport à une station se chiffre instantanément par le formulaire de réservation — sans demande ni attente.",
    bouton: "Obtenir un prix",
  },

  faq: {
    surtitre: "Bon à savoir",
    titre: "Questions fréquentes sur les transferts de luxe",
  },

  champs: {
    nom: "Votre nom",
    email: "E-mail",
    telephone: "Téléphone",
    societe: "Société, marque ou agence",
    type: "Ce dont vous avez besoin",
    du: "Du",
    au: "Au",
    arrivee: "Arrivée à",
    destination: "Destination",
    passagers: "Passagers",
    budget: "Budget envisagé",
    details: "À quoi ressemble le séjour",
    facultatif: "(facultatif)",
    placeholders: {
      arrivee: "Genève, Chambéry, un terminal d'aviation d'affaires…",
      destination: "Courchevel, Megève, l'adresse d'un chalet…",
      budget: "Un ordre de grandeur suffit",
      details:
        "Le programme tel que vous le voyez : les arrivées, les heures où vous voulez une voiture disponible, un événement et son déroulé, ce qui doit rester discret.",
    },
    types: {
      disposal: "Chauffeur à disposition",
      helicopter: "Transfert en hélicoptère",
      jet: "Arrivée en jet privé",
      wedding: "Mariage",
      event: "Événement de marque ou d'entreprise",
      production: "Tournage ou shooting",
      other: "Autre chose",
    },
    envoyer: "Envoyer votre demande",
    envoiEnCours: "Envoi…",
    succes: {
      titre: "Demande reçue",
      texte:
        "Merci. Chaque demande est lue personnellement et reçoit une réponse écrite — sous 24 heures, le plus souvent le jour même. Si les dates sont proches, appelez-nous : nous nous y mettons tout de suite.",
      relancer: "Envoyer une autre demande",
    },
    erreurChamps: "Merci de vérifier les champs obligatoires.",
    erreurGenerale: {
      avant: "Nous n'avons pas pu transmettre votre demande. Écrivez à ",
      entre: " ou appelez le ",
      apres: ".",
    },
    mentionBas:
      "Vos coordonnées servent uniquement à vous répondre. Rien n'est conservé sur ce site et rien n'est transmis à des tiers. Les vols sont affrétés auprès d'opérateurs agréés ; le transport routier est assuré par",
    piege: "Laissez ce champ vide",
  },
};

const DE: ContenuPremium = {
  motCle: "Limousinenservice Alpen",
  filAriane: "Limousinenservice",
  nomService: "Limousinen- und Chauffeurservice in den Alpen",

  heroImage: {
    nom: "vehicule-premium",
    alt: "Oberklasse-Limousine am Fuß eines Alpenorts",
  },
  introImage: {
    nom: "premium-helicoptere",
    alt: "Privathelikopter auf verschneitem Landeplatz in der Dämmerung, daneben wartet eine Limousine",
  },

  reperes: [
    { libelle: "Stundenweise oder wochenweise", valeur: "Wagen und Fahrer für Sie" },
    { libelle: "In der Luft", valeur: "Helikopter und Privatjet" },
    { libelle: "Schriftliches Angebot", valeur: "Innerhalb von 24 Stunden" },
  ],

  intro: [
    "Manche Fahrten sind kein Transfer. Ein Wagen samt Fahrer, der eine Woche lang bereitsteht, eine Ankunft im Privatjet in Sion, die letzte Etappe nach Zermatt per Helikopter an einem Samstag, an dem die Straße dichtmacht, eine Hochzeit, deren Gäste über zwei Tage verteilt landen: nichts davon passt in ein Buchungsformular, und nichts davon sollte von einem Formular berechnet werden.",
    "Für solche Anfragen ist diese Seite da. Es ist Limousinenservice im engeren Sinn — ein Chauffeurservice, der Ihnen gehört, keine einzelne Fahrt — und alles, was dazugehört. Sie beschreiben, wie der Aufenthalt tatsächlich aussieht; wir antworten schriftlich — mit den Fahrzeugen, den Zeiten, dem Operator für alles, was fliegt, und einem Preis. Nichts wird berechnet und nichts ist verbindlich, bevor Sie das Angebot gelesen haben.",
  ],

  renvoiGroupes: {
    avant: "Sie reisen als große Gruppe statt privat? Die Seite ",
    lien: "Agenturen und Firmen",
    apres: " deckt mehrere Fahrzeuge ab, die als eine einzige Fahrt kalkuliert werden.",
    chemin: "/de/agenturen-und-firmen/",
  },

  actions: {
    envoyer: "Anfrage senden",
    appeler: "oder rufen Sie an:",
    commencer: "Anfrage starten",
  },

  prestations: {
    surtitre: "Was wir organisieren",
    titre: "Vier Anfragen, die jeden Winter wiederkehren",
    chapo:
      "Alle beginnen am selben Punkt: ein Ablauf statt einer Fahrt, und ein Ansprechpartner, der für das Ganze geradesteht.",
    cartes: [
      {
        titre: "Fahrer zur freien Verfügung",
        texte:
          "Der Wagen fährt nach dem Flughafentransfer nicht weg — er bleibt bei Ihnen. Einen halben Tag, einen ganzen Tag oder den gesamten Aufenthalt: der Fahrer gehört Ihnen, und die Stunden ebenso. Das wünschen sich die meisten Gäste vor Ort, und fast niemand verkauft es online: ein Formular hat kein Feld für „wohin wir um sechs entscheiden“.",
        points: [
          "Halber Tag, ganzer Tag oder der ganze Aufenthalt",
          "Derselbe Fahrer durchgehend — nichts muss zweimal erklärt werden",
          "Wartezeit ist im Preis enthalten, kein Zuschlag",
          "Restaurants, Bergbahnen, Spa, die Fahrt zur Piste und zurück",
        ],
        image: {
          nom: "premium-chauffeur",
          alt: "Chauffeur öffnet die hintere Wagentür einer Limousine vor einem beleuchteten Alpenchalet",
        },
      },
      {
        titre: "Helikopter-Transfers",
        texte:
          "An Anreisesamstagen bestimmt die Straße die Ankunftszeit, nicht die Entfernung. Eine Flugetappe nimmt diese Frage heraus: von Zürich oder Sion in den Bergort rechnet man in Minuten statt in Stunden. Wir chartern den Flug bei zugelassenen Operatoren und fahren beide Enden — zum Abflugplatz und vom Landeplatz bis vor die Tür.",
        points: [
          "Abflug ab Zürich, Sion, Genf und Bern",
          "Zermatt, St. Moritz, Davos und die Landeplätze der Orte",
          "Geflogen von zugelassenen Operatoren; die Straßenetappen sind unsere",
          "Das Wetter bleibt die einzige Unbekannte — zu jedem Angebot gehört ein Plan über die Straße",
        ],
        image: {
          nom: "premium-helicoptere-vol",
          alt: "Helikopter im Flug über verschneiten Alpengipfeln an einem klaren Wintermorgen",
        },
      },
      {
        titre: "Ankunft im Privatjet",
        texte:
          "Zürich, Genf, Sion und Bern nehmen Geschäftsluftfahrt an, jeder mit eigenen Abfertigungsregeln. Wir kommen so nah an das Flugzeug, wie der Betreiber es zulässt, sonst an die Tür des Business-Terminals — die Wartezeit ist bereits eingerechnet: ein Jet landet, wann er landet, und ein Fahrer, der nicht da ist, ist schlimmer als keiner.",
        points: [
          "Empfang im Business-Terminal oder am Flugzeug, wo die Abfertigung es erlaubt",
          "Gepäck und Skiausrüstung ohne zweite Fahrt",
          "Crew-Transfers und Überführungen noch am selben Abend",
          "Ein geänderter Slot kostet nichts: sagen Sie Bescheid, der Fahrer verschiebt sich",
        ],
        image: {
          nom: "premium-jet",
          alt: "Privatjet auf verschneitem Vorfeld im Morgengrauen, Premium-Van an der Gangway",
        },
      },
      {
        titre: "Hochzeiten, Markenevents und Drehs",
        texte:
          "Eine Berghochzeit sind fünfzig Ankünfte an drei Flughäfen über zwei Tage und ein Abreisefenster am Sonntag. Ein Markenevent ist eine Flotte, die am richtigen Ort steht, ohne dass jemand sie bemerkt. Ein Dreh sind Crew, Equipment und ein Ablaufplan, der sich ändert. Dreimal dieselbe Aufgabe: ein Fahrplan, keine Buchung.",
        points: [
          "Ein Koordinator für die gesamte Veranstaltung, namentlich und erreichbar",
          "Gäste-Shuttles über mehrere Flughäfen und Anreisetage",
          "Fahrzeuge bleiben zwischen den Bewegungen vor Ort",
          "Eine Rechnung an die Firma, die Agentur oder die Produktion",
        ],
        image: {
          nom: "premium-evenement",
          alt: "Drei schwarze Fahrzeuge vor einer beleuchteten alpinen Eventlocation an einem Winterabend",
        },
      },
    ],
  },

  occasions: {
    surtitre: "Für wen",
    titre: "Wer uns dafür anruft",
    chapo:
      "Selten der Reisende selbst. Meist jemand, der für ihn organisiert — und geradesteht, wenn etwas schiefgeht.",
    points: [
      {
        titre: "Luxusmarken und Maisons",
        texte:
          "Winterevents, Kundenbetreuung, Pressetage, Produktlaunches. Verlangt wird fast nie das Auto, sondern dass dreißig Bewegungen pünktlich stattfinden und keine davon zur Geschichte wird.",
      },
      {
        titre: "Hotels, Chalets und Concierges",
        texte:
          "Fünf-Sterne-Häuser, Chalet-Betreiber und Concierge-Desks, die einen Dienstleister brauchen, der samstags antwortet. Ein Ansprechpartner, ein Konto, und Fahrer, die den Lieferanteneingang bereits kennen.",
      },
      {
        titre: "Hochzeiten in den Bergen",
        texte:
          "Gäste, die über zwei Tage in Zürich, Genf und Sion landen, ein Shuttle zwischen Trauung und Empfang, und dieses Abreisefenster am Sonntagmorgen, an das am Tag selbst niemand denken möchte.",
      },
      {
        titre: "Film, Foto und Werbeproduktion",
        texte:
          "Crew, Talents und Equipment auf einem Ablaufplan, der sich ändert. Die Fahrzeuge bleiben bei der Produktion, statt leer zurückzufahren, und die Rechnung geht dorthin, wo das Budget liegt.",
      },
      {
        titre: "Familien mit Begleitung",
        texte:
          "Ein Kindermädchen, ein Skilehrer, ein zweites Fahrzeug für Gepäck und Ausrüstung. Kindersitze vor Ihrer Ankunft montiert, und eine Woche lang derselbe Fahrer, damit sich der Ablauf einspielt.",
      },
      {
        titre: "Assistenz und Family Offices",
        texte:
          "Sie schicken das Programm, wir schicken zurück, was es kostet und wer fährt. Änderungen laufen über eine Person, zu jeder Stunde des Aufenthalts, ohne dass eine Buchungsnummer vorgelesen wird.",
      },
    ],
  },

  discretion: {
    surtitre: "Diskretion",
    titre: "Was „premium“ hier tatsächlich heißt",
    chapo:
      "Kein Emblem an der Tür, sondern Gewohnheiten, die eine Fahrt völlig unauffällig machen — genau darum geht es.",
    points: [
      "Kein Name auf einem Schild, wenn Ihnen das lieber ist: eine Flugnummer genügt, um sich zu finden.",
      "Eine Vertraulichkeitsvereinbarung vor dem Angebot, wenn Ihre Veranstaltung das verlangt — Ihre oder unsere.",
      "Über eine Fahrt wird nichts veröffentlicht: keine Fotos, keine Namen, keine Beiträge über gefahrene Gäste.",
      "Fahrer erhalten das Programm vorab, damit der Ablauf nie vor Ihren Gästen besprochen wird.",
      "Rechnung an die zahlende Stelle — Firma, Agentur, Produktion oder Family Office — unter einer einzigen Referenz.",
      "Eine Nummer für den gesamten Aufenthalt, abgenommen von jemandem, der Ihren Vorgang bereits kennt.",
    ],
  },

  fonctionnement: {
    surtitre: "So läuft es ab",
    titre: "Von ein paar Zeilen bis zum Fahrer vor der Tür",
    chapo:
      "Eine Sonderanfrage lässt sich nicht per Formular berechnen. Sie wird gelesen, kalkuliert und Ihnen schriftlich beantwortet.",
    etapes: [
      {
        titre: "Schicken Sie die Eckdaten",
        texte:
          "Daten, Flughäfen, Ort, Personenzahl und wie der Aufenthalt aussehen soll. Die grobe Fassung genügt für den Anfang.",
      },
      {
        titre: "Wir antworten schriftlich",
        texte:
          "Innerhalb von 24 Stunden, meist noch am selben Tag: die Fahrzeuge, die gebuchten Stunden, der Operator für eine Flugetappe und ein Preis, bei dem nichts nachkommt.",
      },
      {
        titre: "Sie bestätigen einmal",
        texte:
          "Eine Bestätigung deckt das gesamte Programm ab. Passagiernamen, Flugnummern und Zeiten können später folgen.",
      },
      {
        titre: "Ein Koordinator durchgehend",
        texte:
          "Ein Name und eine Nummer, erreichbar für die Dauer des Aufenthalts. Änderungen gehen an diese Person, nicht an ein Formular.",
      },
    ],
    conclusion: {
      avant:
        "Wenn Sie einfach ein Fahrzeug vom Flughafen in den Skiort brauchen, ist das Buchungsformular schneller und nennt sofort einen Festpreis — ganz ohne Anfrage:",
      lien: "Transfer buchen",
    },
  },

  formulaire: {
    surtitre: "Ihre Anfrage",
    titre: "Beschreiben Sie uns den Aufenthalt",
    chapo:
      "Je mehr es nach Ablaufplan und je weniger nach Buchung klingt, desto brauchbarer die Antwort. Nichts davon verpflichtet Sie zu etwas.",
  },

  encartTelephone: {
    titre: "Lieber persönlich besprechen?",
    texte:
      "Komplexe Programme sind oft schneller erzählt als getippt. Rufen Sie an — wir notieren die Eckdaten für Sie.",
  },

  encartReservation: {
    titre: "Nur eine Flughafenfahrt?",
    texte:
      "Ein Fahrzeug vom Flughafen in den Skiort berechnet das Buchungsformular sofort — ohne Anfrage und ohne Wartezeit.",
    bouton: "Preis berechnen",
  },

  faq: {
    surtitre: "Gut zu wissen",
    titre: "Häufige Fragen zu Luxus-Skitransfers",
  },

  champs: {
    nom: "Ihr Name",
    email: "E-Mail",
    telephone: "Telefon",
    societe: "Firma, Marke oder Agentur",
    type: "Worum geht es",
    du: "Von",
    au: "Bis",
    arrivee: "Ankunft in",
    destination: "Ziel",
    passagers: "Personen",
    budget: "Budgetrahmen",
    details: "Wie der Aufenthalt aussieht",
    facultatif: "(optional)",
    placeholders: {
      arrivee: "Zürich, Genf, ein Business-Terminal…",
      destination: "Zermatt, St. Moritz, eine Chalet-Adresse…",
      budget: "Eine Größenordnung genügt",
      details:
        "Das Programm, wie Sie es sehen: Ankünfte, die Stunden, in denen ein Wagen bereitstehen soll, eine Veranstaltung und ihr Ablauf, alles, was diskret bleiben muss.",
    },
    types: {
      disposal: "Fahrer zur freien Verfügung",
      helicopter: "Helikopter-Transfer",
      jet: "Ankunft im Privatjet",
      wedding: "Hochzeit",
      event: "Marken- oder Firmenevent",
      production: "Film- oder Fotoproduktion",
      other: "Etwas anderes",
    },
    envoyer: "Anfrage senden",
    envoiEnCours: "Wird gesendet…",
    succes: {
      titre: "Anfrage eingegangen",
      texte:
        "Vielen Dank. Jede Anfrage wird persönlich gelesen und schriftlich beantwortet — innerhalb von 24 Stunden, meist noch am selben Tag. Wenn die Termine nah sind, rufen Sie an: dann beginnen wir sofort.",
      relancer: "Weitere Anfrage senden",
    },
    erreurChamps: "Bitte prüfen Sie die Pflichtfelder.",
    erreurGenerale: {
      avant: "Ihre Anfrage konnte nicht übermittelt werden. Schreiben Sie an ",
      entre: " oder rufen Sie an: ",
      apres: ".",
    },
    mentionBas:
      "Ihre Angaben dienen ausschließlich der Beantwortung. Auf dieser Website wird nichts gespeichert und nichts an Dritte weitergegeben. Flüge werden bei zugelassenen Operatoren gechartert; die Straßenbeförderung erbringt",
    piege: "Dieses Feld bitte leer lassen",
  },
};

const IT: ContenuPremium = {
  motCle: "NCC di lusso Alpi",
  filAriane: "NCC di lusso",
  nomService: "NCC di lusso e auto con autista nelle Alpi",

  heroImage: {
    nom: "vehicule-premium",
    alt: "Berlina di alta gamma all'arrivo in una località alpina",
  },
  introImage: {
    nom: "premium-helicoptere",
    alt: "Elicottero privato su piazzola innevata al crepuscolo, una berlina attende a fianco",
  },

  reperes: [
    { libelle: "A ore o a settimana", valeur: "Auto e autista a disposizione" },
    { libelle: "Dal cielo", valeur: "Elicottero e jet privato" },
    { libelle: "Proposta scritta", valeur: "Entro 24 ore" },
  ],

  intro: [
    "Certi spostamenti non sono un transfer. Un'auto con autista a disposizione per una settimana, un arrivo in jet privato a Torino, l'ultimo tratto verso Courmayeur in elicottero in un sabato in cui la strada è bloccata, un matrimonio i cui invitati atterrano su due giorni: niente di tutto questo entra in un modulo di prenotazione, e niente di tutto questo va calcolato da un modulo.",
    "Questa pagina serve a quelle richieste. È NCC in senso stretto — un'auto con autista riservata a lei, non una singola corsa — e tutto ciò che ne consegue. Lei descrive com'è davvero il soggiorno; noi rispondiamo per iscritto — i veicoli, gli orari, l'operatore per ciò che vola e un prezzo unico. Nulla viene addebitato e nulla è impegnativo prima che abbia letto la proposta.",
  ],

  renvoiGroupes: {
    avant: "Viaggiate in gruppo numeroso più che in privato? La pagina ",
    lien: "agenzie e aziende",
    apres: " copre i convogli di più veicoli, quotati come un unico viaggio.",
    chemin: "/it/agenzie-e-aziende/",
  },

  actions: {
    envoyer: "Invia la richiesta",
    appeler: "oppure chiami il",
    commencer: "Inizia la richiesta",
  },

  prestations: {
    surtitre: "Che cosa organizziamo",
    titre: "Quattro richieste che tornano ogni inverno",
    chapo:
      "Partono tutte dallo stesso punto: un programma invece di un viaggio, e una sola persona che ne risponde.",
    cartes: [
      {
        titre: "Autista a disposizione",
        texte:
          "Il veicolo non riparte dopo il transfert: resta con lei. Mezza giornata, una giornata intera o tutto il soggiorno — l'autista è suo, e le ore anche. È ciò che chiede la maggior parte degli ospiti una volta in località, e ciò che quasi nessuno vende online: un modulo non ha una casella per « dove decideremo di andare alle sei ».",
        points: [
          "Mezza giornata, giornata intera o soggiorno completo",
          "Lo stesso autista dall'inizio alla fine: nulla da rispiegare",
          "L'attesa è compresa nel prezzo, non è un supplemento",
          "Ristoranti, impianti, spa, andata e ritorno dalle piste",
        ],
        image: {
          nom: "premium-chauffeur",
          alt: "Autista apre la portiera posteriore di una berlina davanti a uno chalet alpino illuminato",
        },
      },
      {
        titre: "Transfer in elicottero",
        texte:
          "Nei sabati di cambio turno è la strada a decidere l'ora di arrivo, non la distanza. Una tratta aerea elimina il problema: da Torino o Milano alla località si contano minuti, non ore. Noleggiamo il volo presso operatori autorizzati e copriamo entrambe le estremità — fino alla piazzola di partenza e dall'elisuperficie fino alla porta.",
        points: [
          "Partenze da Torino, Milano, Ginevra e Aosta",
          "Courmayeur, Cervinia, Cortina e le elisuperfici delle località",
          "Voli operati da operatori autorizzati; le tratte su strada sono nostre",
          "Il meteo resta l'unica incognita: a ogni preventivo si affianca un piano via strada",
        ],
        image: {
          nom: "premium-helicoptere-vol",
          alt: "Elicottero in volo sopra le cime innevate in una limpida mattina invernale",
        },
      },
      {
        titre: "Arrivi in jet privato",
        texte:
          "Torino, Milano, Ginevra e Aosta accolgono l'aviazione d'affari, ognuno con le proprie regole di handling. Andiamo il più vicino possibile all'aeromobile quando l'operatore lo consente, altrimenti alla porta del terminal business, con l'attesa già inclusa: un jet atterra quando atterra, e un autista assente è peggio che inutile.",
        points: [
          "Accoglienza al terminal business o sottobordo dove l'handling lo permette",
          "Bagagli e attrezzatura da sci senza un secondo viaggio",
          "Transfer equipaggi e riposizionamenti gestiti in serata",
          "Uno slot che cambia non costa nulla: ci avvisi e l'autista si sposta",
        ],
        image: {
          nom: "premium-jet",
          alt: "Jet privato su piazzale innevato all'alba, minivan di alta gamma ai piedi della scaletta",
        },
      },
      {
        titre: "Matrimoni, eventi di marca e produzioni",
        texte:
          "Un matrimonio in montagna sono cinquanta arrivi su tre aeroporti in due giorni, poi una finestra di partenza la domenica. Un evento di marca è una flotta al posto giusto senza che nessuno la noti. Un set sono troupe, materiali e un piano di lavorazione che cambia. Tre volte lo stesso mestiere: un orario, non una prenotazione.",
        points: [
          "Un coordinatore per tutto l'evento, con nome e numero",
          "Navette per gli invitati su più aeroporti e più giorni di arrivo",
          "Veicoli fermi in loco tra un movimento e l'altro",
          "Una sola fattura, all'azienda, all'agenzia o alla produzione",
        ],
        image: {
          nom: "premium-evenement",
          alt: "Tre veicoli neri allineati davanti a una struttura alpina illuminata in una sera d'inverno",
        },
      },
    ],
  },

  occasions: {
    surtitre: "Per chi",
    titre: "Chi ci chiama per questo",
    chapo:
      "Raramente il viaggiatore da solo. Più spesso chi organizza per lui, e che ne risponde se qualcosa va storto.",
    points: [
      {
        titre: "Maison e marchi del lusso",
        texte:
          "Eventi invernali, ospitalità clienti, giornate stampa, lanci di prodotto. Ciò che si chiede non è quasi mai l'auto: è che trenta movimenti avvengano in orario e che nessuno diventi un caso.",
      },
      {
        titre: "Hotel, chalet e concierge",
        texte:
          "Cinque stelle, gestori di chalet e servizi di concierge che hanno bisogno di un fornitore che risponda di sabato. Un referente, un conto, e autisti che sanno già dov'è l'ingresso di servizio.",
      },
      {
        titre: "Matrimoni in montagna",
        texte:
          "Invitati che atterrano a Torino, Milano e Ginevra su due giorni, una navetta tra cerimonia e ricevimento, e quella finestra di partenza della domenica mattina a cui nessuno vuole pensare il giorno stesso.",
      },
      {
        titre: "Produzioni cinematografiche e fotografiche",
        texte:
          "Troupe, talent e attrezzature, su un piano di lavorazione che cambia. I veicoli restano con la produzione invece di tornare vuoti, e la fattura va dove sta il budget.",
      },
      {
        titre: "Famiglie con personale al seguito",
        texte:
          "Una tata, un maestro di sci, un secondo veicolo per bagagli e attrezzatura. Seggiolini montati prima del suo arrivo, e lo stesso autista per tutta la settimana perché le abitudini si consolidino.",
      },
      {
        titre: "Assistenti e uffici privati",
        texte:
          "Lei manda l'itinerario, noi rimandiamo quanto costa e chi guida. Le modifiche passano da una sola persona, a qualsiasi ora del soggiorno, senza dover dettare un numero di pratica.",
      },
    ],
  },

  discretion: {
    surtitre: "Discrezione",
    titre: "Che cosa significa davvero « premium » qui",
    chapo:
      "Non uno stemma sulla portiera, ma un insieme di abitudini che rendono un viaggio del tutto ordinario — ed è esattamente il punto.",
    points: [
      "Nessun nome sul cartello se preferisce che non ci sia: un numero di volo basta per trovarsi.",
      "Un accordo di riservatezza firmato prima del preventivo, se il suo evento lo richiede: il suo o il nostro.",
      "Di un viaggio non si pubblica nulla: né foto, né nomi, né post su chi è stato accompagnato.",
      "Gli autisti ricevono l'itinerario prima del giorno stesso: il programma non si discute mai davanti agli ospiti.",
      "Fatturazione all'entità che paga — azienda, agenzia, produzione o ufficio di famiglia — con un unico riferimento.",
      "Un solo numero per tutto il soggiorno, al quale risponde chi conosce già la sua pratica.",
    ],
  },

  fonctionnement: {
    surtitre: "Come funziona",
    titre: "Da poche righe a un autista davanti alla porta",
    chapo:
      "Una richiesta su misura non si quota con un modulo: si legge, si calcola e le torna per iscritto.",
    etapes: [
      {
        titre: "Ci mandi le linee generali",
        texte:
          "Date, aeroporti, località, quante persone e come deve essere il soggiorno. La versione approssimativa basta per cominciare.",
      },
      {
        titre: "Rispondiamo per iscritto",
        texte:
          "Entro 24 ore, spesso in giornata: i veicoli, le ore impegnate, l'operatore per un'eventuale tratta aerea e un prezzo senza sorprese successive.",
      },
      {
        titre: "Conferma una sola volta",
        texte:
          "Una conferma copre l'intero programma. Nomi dei passeggeri, numeri di volo e orari possono seguire in un secondo momento.",
      },
      {
        titre: "Un coordinatore per tutto",
        texte:
          "Un nome e un numero, raggiungibili per tutta la durata del soggiorno. Le modifiche passano da quella persona, non da un modulo.",
      },
    ],
    conclusion: {
      avant:
        "Se le serve semplicemente un veicolo da un aeroporto a una località, il modulo di prenotazione è più rapido e dà subito un prezzo fisso — nessuna richiesta da compilare:",
      lien: "Prenota un transfer",
    },
  },

  formulaire: {
    surtitre: "La sua richiesta",
    titre: "Ci racconti com'è il soggiorno",
    chapo:
      "Più assomiglia a un programma e meno a una prenotazione, più la risposta le sarà utile. Nulla di tutto questo la impegna.",
  },

  encartTelephone: {
    titre: "Preferisce parlarne?",
    texte:
      "Un programma complesso si racconta spesso più in fretta a voce che scrivendolo. Ci chiami: prendiamo noi nota delle linee generali.",
  },

  encartReservation: {
    titre: "Solo un transfer dall'aeroporto?",
    texte:
      "Un veicolo da un aeroporto a una località viene quotato all'istante dal modulo di prenotazione — senza richiesta e senza attesa.",
    bouton: "Ottieni un prezzo",
  },

  faq: {
    surtitre: "Utile sapere",
    titre: "Domande frequenti sui transfer di lusso",
  },

  champs: {
    nom: "Il suo nome",
    email: "E-mail",
    telephone: "Telefono",
    societe: "Azienda, marchio o agenzia",
    type: "Di che cosa ha bisogno",
    du: "Dal",
    au: "Al",
    arrivee: "Arrivo a",
    destination: "Destinazione",
    passagers: "Passeggeri",
    budget: "Budget indicativo",
    details: "Com'è il soggiorno",
    facultatif: "(facoltativo)",
    placeholders: {
      arrivee: "Torino, Milano, un terminal business…",
      destination: "Courmayeur, Cervinia, l'indirizzo di uno chalet…",
      budget: "Basta un ordine di grandezza",
      details:
        "Il programma come lo vede lei: gli arrivi, le ore in cui vuole un'auto disponibile, un evento e il suo svolgimento, tutto ciò che deve restare riservato.",
    },
    types: {
      disposal: "Autista a disposizione",
      helicopter: "Transfer in elicottero",
      jet: "Arrivo in jet privato",
      wedding: "Matrimonio",
      event: "Evento di marca o aziendale",
      production: "Produzione cine-fotografica",
      other: "Altro",
    },
    envoyer: "Invia la richiesta",
    envoiEnCours: "Invio in corso…",
    succes: {
      titre: "Richiesta ricevuta",
      texte:
        "Grazie. Ogni richiesta viene letta personalmente e riceve una risposta scritta — entro 24 ore, spesso in giornata. Se le date sono vicine, ci chiami: ci mettiamo al lavoro subito.",
      relancer: "Invia un'altra richiesta",
    },
    erreurChamps: "Controlli i campi obbligatori.",
    erreurGenerale: {
      avant: "Non siamo riusciti a inviare la sua richiesta. Scriva a ",
      entre: " oppure chiami il ",
      apres: ".",
    },
    mentionBas:
      "I suoi dati servono soltanto a risponderle. Su questo sito non viene conservato nulla e nulla viene trasmesso a terzi. I voli sono noleggiati presso operatori autorizzati; il trasporto su strada è effettuato da",
    piege: "Lasci vuoto questo campo",
  },
};

export const PAGES_PREMIUM: Record<LangueSecondaire, ContenuPremium> = { fr: FR, de: DE, it: IT };
