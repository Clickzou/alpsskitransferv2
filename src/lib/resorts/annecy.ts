import type { Resort } from "./types";

/**
 * Annecy — cas particulier assumé.
 *
 * Annecy n'est pas une station de ski : c'est une ville, un lac et un aéroport.
 * Elle est pourtant dans le registre parce que l'ancien site publiait
 * `/destination/ski-resorts-in-france/annecy/`, dont la 301 doit aboutir quelque
 * part. Plutôt que de faire semblant, cette page dit ce qu'Annecy est vraiment
 * pour un transfert : un point de départ, un point d'arrivée, et la porte des
 * Aravis.
 */
export const annecy: Resort = {
  slug: "annecy",
  name: "Annecy",
  country: "FR",
  status: "migre",

  metaTitre: "Annecy Transfers | Airport, Town and the Aravis Resorts",
  metaDescription:
    "Private transfers to and from Annecy: 54 km from Geneva, 50 km from Chambéry. The gateway to La Clusaz, Le Grand-Bornand and the Aravis.",
  h1: "Annecy Transfers – Private Airport Transfers to Annecy and the Aravis",
  chapo:
    "Annecy is a town of 130,000 on a lake, not a ski resort — but it is where a great many ski trips begin and end. Geneva is 54 km away, about 55 minutes; Chambéry 50 km and 40 minutes; Lyon 127 km and 1 h 30; Grenoble 130 km and 1 h 25. Its own airport, 7 km from the centre, handles very few scheduled winter flights. From Annecy, La Clusaz and Le Grand-Bornand are 34 km and about 40 minutes away, which makes the town a practical base for a week in the Aravis. We drive door to door at a price fixed per vehicle, ski bags included, with your flight tracked.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport", "annecy-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Let us be straight about it: nobody skis in Annecy. The town sits at 450 m at the end of its lake, and the snow is in the mountains around it. What Annecy offers a winter traveller is everything else — hotels at town prices rather than resort prices, restaurants open in April, a station on the main line from Paris, and half an hour of driving between it and two good ski areas.",
    },
    {
      type: "paragraphe",
      texte:
        "That is why it appears on this site: people ask for transfers to Annecy, from Annecy, and between Annecy and the Aravis, and all three are journeys we run.",
    },

    { type: "titre2", texte: "Getting to Annecy" },
    { type: "titre3", texte: "Geneva (GVA) — 54 km, about 55 minutes" },
    {
      type: "paragraphe",
      texte:
        "The obvious airport: motorway the whole way, flights all week from most European cities. Under an hour from the terminal to the old town.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 50 km, about 40 minutes" },
    {
      type: "paragraphe",
      texte:
        "Closer still, and quicker, but its winter timetable is built around weekend ski charters.",
    },
    { type: "titre3", texte: "Annecy Haute-Savoie (NCY) — 7 km, about 15 minutes" },
    {
      type: "paragraphe",
      texte:
        "The town’s own airport, at Meythet. It handles very little scheduled traffic, so most arrivals come through Geneva — but if you are flying privately, this is the one.",
    },
    { type: "titre3", texte: "Lyon (LYS) — 127 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and the widest airline choice, an easy motorway run.",
    },

    { type: "titre2", texte: "Skiing from Annecy" },
    {
      type: "liste",
      items: [
        "La Clusaz — 34 km, about 40 minutes: 125 km of piste in the Aravis, the biggest area within reach.",
        "Le Grand-Bornand — 34 km, about 40 minutes: 90 km of piste, and the quieter of the two.",
        "Le Semnoz — 18 km, about 30 minutes: the town’s own small area above the lake, good for a first day on skis.",
        "Megève — 80 km, about 1 h 05, on the Evasion Mont-Blanc pass.",
        "Flaine, Les Carroz and Samoëns — between 66 and 81 km, roughly an hour, in the Grand Massif.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Staying in Annecy and driving up each morning is a real option for a mixed group — one that skis, one that does not — and it is how a good number of French families do their season. We quote those daily runs as transfers like any other.",
    },

    { type: "titre2", texte: "Annecy at a glance" },
    {
      type: "liste",
      items: [
        "Town at 450 m at the head of Lake Annecy, 40 minutes from the Aravis resorts.",
        "A medieval old town on canals, with the Palais de l’Isle at the centre of it.",
        "Hotels, restaurants and shops open all year, at prices well below resort level.",
        "TGV station with direct trains from Paris, and a bus network to the resorts.",
        "The lake is reputed to be among the cleanest in Europe — the reason the town is as busy in July as in February.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The roads to Annecy are motorway and valley roads at low altitude, cleared through the season: this is one of the least weather-dependent arrivals we run. Our vehicles still carry winter tyres and chains for the runs up to the Aravis. Ski and board bags travel free, child and booster seats are included, and your driver tracks the flight so a late landing costs you nothing.",
    },
  ],

  faq: [
    {
      question: "Is there skiing in Annecy itself?",
      reponse:
        "No. Annecy is a town at 450 m on a lake. The nearest skiing is Le Semnoz, 18 km above the town, and the main areas are La Clusaz and Le Grand-Bornand, both 34 km and about 40 minutes away.",
    },
    {
      question: "How long is the transfer from Geneva to Annecy?",
      reponse:
        "About 55 minutes for 54 km, motorway the whole way. From Chambéry it is around 40 minutes.",
    },
    {
      question: "Can you drive us from Annecy up to the resorts each day?",
      reponse:
        "Yes. La Clusaz and Le Grand-Bornand are about 40 minutes away, Megève around an hour. We quote those runs like any other transfer — tell us the days and times.",
    },
    {
      question: "Does Annecy airport have scheduled flights?",
      reponse:
        "Very few. It is 7 km from the centre and useful mainly for private aviation; most passengers arrive through Geneva, 54 km away.",
    },
    {
      question: "Are ski bags included?",
      reponse:
        "Yes, ski and board bags travel free. Declare them when booking so the vehicle sent has the space.",
    },
  ],
};
