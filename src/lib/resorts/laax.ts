import type { Resort } from "./types";

/** Laax — rédigée à la main ; station des Grisons, base freestyle de la Suisse. */
export const laax: Resort = {
  slug: "laax",
  name: "Laax",
  country: "CH",
  status: "migre",

  metaTitre: "Laax Ski Transfers | Zurich Airport to Laax and Flims",
  metaDescription:
    "Private transfers to Laax and Flims from Zurich (159 km, 2 h 20), Friedrichshafen and Milan. Fixed price per vehicle, ski and board bags included.",
  h1: "Laax Ski Transfers – Private Airport Transfers to Flims Laax Falera",
  chapo:
    "Laax is 159 km from Zurich, about 2 hours 20 minutes, motorway almost the whole way up the Rhine valley before a short climb. Friedrichshafen is 147 km away (1 h 50), Milan Malpensa 260 km (3 h 20) through the San Bernardino, and Lugano 151 km (2 h 10). The resort is really three villages — Flims, Laax and Falera — spread across a terrace at 1,100 m, so the drop-off address matters. We drive door to door with winter tyres and chains on board, at a price fixed per vehicle and quoted before you book, ski and board bags included.",

  airports: ["zurich-airport", "friedrichshafen-airport", "milan-malpensa-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Laax has been the snowboarding capital of Europe for thirty years, and it shows in the mountain: four parks, the largest halfpipe in the world, an indoor freestyle hall for the days when the weather closes in, and a lift system rebuilt around getting people back to the top quickly. The Laax Open, a World Cup event, brings the whole scene here each January.",
    },
    {
      type: "paragraphe",
      texte:
        "None of which stops it being a serious ski mountain: 224 km of piste rising to the Vorab glacier at 3,018 m, above the Rhine gorge — the Ruinaulta — that gives this part of Graubünden its landscape.",
    },

    { type: "titre2", texte: "Which airport for Laax?" },
    { type: "titre3", texte: "Zurich (ZRH) — 159 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "The main gateway, with flights all week and long-haul connections. Motorway to Chur, then up towards Flims — an easy drive with one short climb at the end.",
    },
    { type: "titre3", texte: "Friedrichshafen (FDH) — 147 km, about 1 h 50" },
    {
      type: "paragraphe",
      texte:
        "The quickest route on paper, from Lake Constance through Liechtenstein and up the Rhine. A thin timetable, but cheap flights from Germany and the UK when it fits.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — about 260 km, 3 h 20" },
    {
      type: "paragraphe",
      texte:
        "From the south through the San Bernardino tunnel. A long drive, and a real option when Italian fares are much lower.",
    },

    { type: "titre2", texte: "Flims, Laax or Falera?" },
    {
      type: "paragraphe",
      texte:
        "The three villages share one lift pass and one mountain but are several kilometres apart. Flims is the largest and the oldest, with hotels and shops. Laax is split between the old village and Laax Murschetg, the modern base at the main gondola. Falera is the smallest and quietest, on the sunny side. Tell us which when you book — at midnight in February, the difference is real.",
    },

    { type: "titre2", texte: "Laax at a glance" },
    {
      type: "liste",
      items: [
        "Villages at 1,100 m, skiing to 3,018 m on the Vorab glacier.",
        "224 km of piste, four snow parks and the largest halfpipe in the world.",
        "The Freestyle Academy at Laax Murschetg — an indoor training hall with trampolines and foam pits.",
        "The Ruinaulta, the Rhine gorge below the resort, is the geological set piece of the region.",
        "Chur, 25 km away, is the oldest town in Switzerland and the nearest railway hub.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The Rhine valley motorway is cleared and gritted all winter, and the climb to the terrace is short — one of the easier Swiss arrivals. Our vehicles carry winter tyres and chains. Ski and board bags travel free, and declare snowboard bags and park kit so the vehicle is sized for them. Child and booster seats are included. Book early for the Laax Open week in January, when the resort is full.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Laax?",
      reponse:
        "About 2 hours 20 minutes for 159 km, motorway most of the way. Friedrichshafen is closer in time at about 1 h 50 for 147 km.",
    },
    {
      question: "Should we be dropped in Flims, Laax or Falera?",
      reponse:
        "Whichever your accommodation is in — they are separate villages a few kilometres apart on one lift pass. Give us the exact address when you book.",
    },
    {
      question: "Is Laax only for snowboarders?",
      reponse:
        "No. It has 224 km of piste and glacier skiing to 3,018 m; the freestyle reputation comes from its parks and its halfpipe, not from a lack of pistes.",
    },
    {
      question: "Are ski and snowboard bags included?",
      reponse:
        "Yes, at no extra charge. Declare them when booking so the vehicle sent has room.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
