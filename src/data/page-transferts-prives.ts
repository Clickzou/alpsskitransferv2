/**
 * `/private-airport-transfers-to-alps-ski-resort/` — la page de service du silo.
 *
 * ## Mot-clé et intention
 *
 * **Mot-clé propriétaire : « private airport ski transfer »** — intention
 * commerciale, milieu de tunnel : le visiteur sait qu'il lui faut un transfert,
 * il veut comprendre ce qu'il achète et combien de temps dure la route. C'est
 * l'intention que le plan SEO réservait à une « page de service à créer » ; elle
 * existait déjà, mal exploitée, sur cette URL de 2 157 mots.
 *
 * Le partage des rôles avec les autres pages de conversion tient en une ligne :
 *  · `/` — « alps ski transfers », la marque et la requête générique ;
 *  · `/book-ski-transfer-tickets/` — « book ski transfer tickets », **réserver** ;
 *  · **ici** — « private airport ski transfer », **le service et les temps de route** ;
 *  · les pages de station et de trajet — une destination, une liaison.
 *
 * Requêtes secondaires portées par les H2 : « transfer time from {airport} to
 * {resort} », « private vs public transport to ski resort », « child seat ski
 * transfer », « ski equipment transfer ».
 *
 * ## Pourquoi le contenu est refondu et pas reconduit
 *
 * La reprise WordPress était inexploitable, et pas seulement mal mise en page :
 *
 * - **Le bloc des dix aéroports figurait deux fois**, à l'identique — dix
 *   paragraphes et dix listes en double dans la même page.
 * - **Les listes de stations étaient tronquées** : Genève n'annonçait qu'une
 *   seule destination, « Tignes & Val d'Isère – 3h ».
 * - **Les réponses de la FAQ avaient perdu leurs listes**, restées dans le corps
 *   de page : « Are child seats available? » se terminait sur « Yes! We ensure
 *   safe and comfortable travel for families by providing : » et rien après.
 * - Sept mentions de **transfert partagé**, que le site ne vend pas.
 *
 * Les durées sont donc reprises des **2 108 itinéraires calculés**
 * (`data/distances.ts`) et non du texte d'origine, dont plusieurs valeurs étaient
 * fausses — Genève-Chamonix y était annoncé à « 1 hour » pour 1 h 25 réelles.
 * Le propos, lui, est celui du WordPress.
 */

export interface PointService {
  titre: string;
  texte: string;
}

/** Un aéroport mis en avant et les stations dont on annonce le temps de route. */
export interface DepartAeroport {
  airport: string;
  /** Ce que la page dit de cet aéroport, repris du WordPress. */
  texte: string;
  resorts: string[];
}

export const PAGE_TRANSFERTS_PRIVES = {
  motCle: "private airport ski transfer",

  heroImage: {
    nom: "transfert-prive",
    alt: "Private transfer vehicle on a snow-covered road to an Alpine ski resort",
  },
  introImage: {
    nom: "transfert-prive-detail",
    alt: "Driver loading ski equipment into a private transfer vehicle",
  },

  intro: [
    "With a private transfer you avoid the hassle of public transport and enjoy a safe, comfortable and stress-free journey. Our experienced drivers provide direct transport from Geneva, Lyon, Grenoble and Chambéry airports to the most popular ski resorts, including Val Thorens, Tignes, Chamonix and Morzine.",
    "Our transfer service includes child seats, room for ski equipment and flexible pick-up times. Whether you are travelling as a family, as a group or on your own, there is a vehicle category that fits. Book your airport transfer online today and see your price before you commit.",
  ],

  pourquoi: {
    surtitre: "Why private",
    titre: "Comfort, flexibility and time saved",
    chapo:
      "A private transfer is the most direct way to reach your resort. The vehicle is yours: it leaves when you land, and it stops where you are staying.",
    points: [
      {
        titre: "No waiting time",
        texte:
          "Your driver is there when you land, and waits if your flight is late. Nobody else's flight decides when you leave the airport.",
      },
      {
        titre: "A direct route",
        texte:
          "One journey, no stops at other resorts, no change of vehicle. The drive time you are given is the drive time you get.",
      },
      {
        titre: "Room for skis and boards",
        texte:
          "Vehicles sized for winter luggage: skis, snowboards and boot bags travel with you rather than being left behind.",
      },
      {
        titre: "Transparent pricing",
        texte:
          "One fixed price per vehicle, tolls included, given before you book. No hidden fees and no surge pricing on changeover Saturdays.",
      },
    ] as PointService[],
  },

  vehicules: {
    surtitre: "Our fleet",
    titre: "Three vehicle categories, one price per vehicle",
    chapo:
      "The whole vehicle is yours, so the price does not change with the number of passengers. What decides the category is the group and the luggage — and in winter the boot fills up before the seats do.",
  },

  aeroports: {
    surtitre: "Drive times",
    titre: "How long is the transfer from each airport?",
    chapo:
      "Road distances and drive times measured on the real routes, without traffic. Allow more on a Saturday in high season and in poor weather on mountain roads. Every airport below has its own page, and so does each of these transfers.",
    /*
     * L'ordre suit l'importance réelle : Genève d'abord — première porte d'entrée
     * des Alpes, et la priorité absolue du plan SEO — puis les trois aéroports
     * français, puis les portes italienne, suisse et autrichienne. Les stations
     * de chaque liste sont celles que la page WordPress citait, complétées des
     * majeures qui manquaient : ses listes s'arrêtaient souvent à une ligne.
     */
    selection: [
      {
        airport: "geneva-airport",
        texte:
          "Geneva is the most popular choice for travellers heading to the French Alps, thanks to its proximity to the major resorts.",
        resorts: [
          "chamonix",
          "morzine",
          "avoriaz",
          "meribel",
          "val-thorens",
          "courchevel",
          "tignes",
          "val-disere",
        ],
      },
      {
        airport: "chambery-savoie-airport",
        texte:
          "Chambéry is the closest airport to the Three Valleys, and the shortest road for anyone heading to Courchevel, Méribel or Val Thorens.",
        resorts: ["courchevel", "meribel", "la-plagne", "val-thorens", "les-arcs", "val-disere"],
      },
      {
        airport: "lyon-airport",
        texte:
          "Lyon is the alternative to Geneva for the French Alps, with more long-haul connections and a quieter terminal on changeover days.",
        resorts: [
          "alpe-dhuez",
          "les-deux-alpes",
          "courchevel",
          "meribel",
          "val-thorens",
          "val-disere",
        ],
      },
      {
        airport: "grenoble-isere-airport",
        texte:
          "Grenoble is the budget-friendly gateway, and the closest airport to the resorts of the Isère valley.",
        resorts: [
          "alpe-dhuez",
          "les-deux-alpes",
          "serre-chevalier",
          "courchevel",
          "meribel",
          "tignes",
        ],
      },
      {
        airport: "turin-airport",
        texte:
          "Turin is the closest airport to the Italian Alps, and a short road to the French resorts of the Montgenèvre pass.",
        resorts: [
          "sestriere",
          "sauze-doulx",
          "montgenevre",
          "serre-chevalier",
          "cervinia",
          "courmayeur",
        ],
      },
      {
        airport: "milan-malpensa-airport",
        texte:
          "Milan opens both the Italian resorts and the Aosta valley, with fast motorway access most of the way.",
        resorts: ["cervinia", "courmayeur", "sestriere", "livigno"],
      },
      {
        airport: "zurich-airport",
        texte:
          "Zurich serves the Swiss resorts and the Arlberg, with a motorway network that keeps the drive times short for the distance.",
        resorts: ["verbier", "zermatt", "davos", "st-moritz", "st-anton-am-arlberg", "ischgl"],
      },
      {
        airport: "salzburg-airport",
        texte:
          "Salzburg is the quickest way into the Austrian Alps: several of the best resorts are within ninety minutes.",
        resorts: ["zell-am-see", "kitzbuhel", "bad-gastein", "solden", "obergurgl", "ischgl"],
      },
      {
        airport: "paris-charles-de-gaulle-airport",
        texte:
          "For travellers arriving from outside Europe, Paris connects to the Alps by road or by high-speed train. These are long transfers — worth planning around an overnight stop.",
        resorts: ["chamonix", "val-thorens", "tignes"],
      },
      {
        airport: "nice-airport",
        texte:
          "Nice is the southern gateway, useful for the southern Alps and for anyone combining the coast with the mountains.",
        resorts: ["serre-chevalier", "montgenevre", "sestriere"],
      },
    ] as DepartAeroport[],
  },

  surDemande: {
    surtitre: "On request",
    titre: "What you can ask for when you book",
    chapo:
      "Tell us when you book rather than on the day: everything below is arranged in advance, and none of it is charged as an extra.",
    points: [
      {
        titre: "Child and booster seats",
        texte:
          "Available on request at no extra charge. Give us the ages when you book so the right seats are fitted before your driver leaves.",
      },
      {
        titre: "Ski and snowboard carriage",
        texte:
          "Skis, boards and boot bags are carried at no extra charge. Tell us how many so the vehicle category matches the load.",
      },
      {
        titre: "Flexible pick-up times",
        texte:
          "Your pick-up follows your flight. If your schedule changes before departure, the booking moves with it.",
      },
      {
        titre: "A stop on the way",
        texte:
          "A supermarket stop before the resort, or a break on a long drive — ask, and your driver plans the journey around it.",
      },
    ] as PointService[],
  },

  etapes: {
    surtitre: "Booking process",
    titre: "How to book your private airport ski transfer",
    chapo:
      "Booking takes a few minutes, and the price is fixed from the moment you confirm.",
    etapes: [
      {
        titre: "Enter your journey",
        texte: "Your airport, your resort or accommodation address, and your arrival time.",
      },
      {
        titre: "Choose your vehicle",
        texte: "Pick the category that fits your group and your luggage, and see your price.",
      },
      {
        titre: "Confirm your booking",
        texte: "You receive your confirmation and your driver's details by email.",
      },
      {
        titre: "Meet your driver",
        texte: "Your driver is waiting in the arrivals hall, whatever time you actually land.",
      },
    ],
    conclusion:
      "Anything out of the ordinary — a group, an agency booking, an unusual pick-up point — goes through a special inquiry instead.",
  },
} as const;
