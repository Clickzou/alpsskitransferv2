import type { Resort } from "./types";

/** Alagna Valsesia — rédigée à la main ; troisième vallée du domaine Monterosa. */
export const alagnaValsesia: Resort = {
  slug: "alagna-valsesia",
  name: "Alagna Valsesia",
  country: "IT",
  status: "migre",

  metaTitre: "Alagna Valsesia Transfers | Milan Malpensa, 110 km",
  metaDescription:
    "Private transfers to Alagna Valsesia from Milan Malpensa (110 km, 1 h 50), Turin and Milan Linate. Freeride in Monterosa Ski. Fixed price per vehicle.",
  h1: "Alagna Valsesia Ski Transfers – Private Airport Transfers to Monterosa",
  chapo:
    "Alagna Valsesia is 110 km from Milan Malpensa, about 1 hour 50 minutes, and 170 km from Turin (2 h 20). Milan Linate is 155 km away (2 h 20). The village sits at 1,190 m at the head of the Valsesia, on the Piedmont side of Monte Rosa, and the road in is a valley road — the last 25 km with the massif filling the windscreen. We drive door to door, with winter tyres and chains on board, at a price fixed per vehicle and quoted before you book, ski and board bags included, and your driver tracks the flight.",

  airports: ["milan-malpensa-airport", "turin-airport", "milan-linate-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Alagna is a place with a particular reputation. For twenty years it was the freeride capital of Italy, a village at the end of a valley with a cable car, no pistes worth the name, and 2,000 m of open mountain to descend. The link into Monterosa Ski changed the first part of that description without changing the second: there are marked runs now, and the terrain between them is still why people come.",
    },
    {
      type: "paragraphe",
      texte:
        "The village is Walser, like Gressoney and Macugnaga: German-speaking settlers from the Valais, timber houses on stone bases, and a museum in one of them. It sits directly under the east face of Monte Rosa — a 2,600 m wall, the largest in the Alps.",
    },

    { type: "titre2", texte: "Which airport for Alagna?" },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 110 km, about 1 h 50" },
    {
      type: "paragraphe",
      texte:
        "The closest and the best served: flights from across Europe, motorway north to Varallo, then the Valsesia road. Under two hours from the terminal to the village.",
    },
    { type: "titre3", texte: "Turin (TRN) — 170 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "Frequent winter charters from the UK, and a straightforward motorway run round through Vercelli.",
    },
    { type: "titre3", texte: "Milan Linate (LIN) — 155 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "Closer to central Milan; useful for domestic and short-haul flights.",
    },

    { type: "titre2", texte: "Alagna at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,190 m, skiing to 3,275 m at Punta Indren.",
        "Part of Monterosa Ski — about 180 km of piste linked with Gressoney and Champoluc on one pass.",
        "The east face of Monte Rosa, 2,600 m high, rises directly above the valley — the biggest wall in the Alps.",
        "A Walser village with a museum in one of its original timber houses.",
        "Freeride terrain that made the resort’s name, best skied with a guide: this is glacier country.",
      ],
    },

    { type: "titre2", texte: "Winter on the Valsesia road" },
    {
      type: "paragraphe",
      texte:
        "The valley road from Varallo is a regional road, cleared and gritted through the season, running at valley level with no pass to cross. It is a cul-de-sac: the only way out is back down, or over the mountain on skis. Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and our vehicles carry both.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to what you declare — this valley sees more touring kit and airbag packs than most, so tell us. Child and booster seats are included and fitted before departure. Book early for powder weeks: Alagna fills from Milan within a day of a big snowfall.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Milan Malpensa to Alagna?",
      reponse:
        "About 1 hour 50 minutes for 110 km, motorway then the Valsesia valley road. From Turin it is around 2 h 20.",
    },
    {
      question: "Is Alagna suitable for beginners?",
      reponse:
        "Not really. It is on the Monterosa pass with 180 km of piste across three valleys, but the terrain above Alagna itself is steep and much of it unpisted. Champoluc or Gressoney suit mixed groups better.",
    },
    {
      question: "Can we ski across to Gressoney and Champoluc?",
      reponse:
        "Yes, the three valleys are linked by the Monterosa Ski lifts on one pass.",
    },
    {
      question: "Are ski bags and touring equipment included?",
      reponse:
        "Yes, at no extra charge. Declare skis, splitboards and airbag packs when booking so the vehicle has room.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
