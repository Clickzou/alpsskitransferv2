import type { Resort } from "./types";

/** Bad Gastein — rédigée à la main ; le trajet depuis Salzbourg attendait cette page mère. */
export const badGastein: Resort = {
  slug: "bad-gastein",
  name: "Bad Gastein",
  country: "AT",
  status: "migre",

  metaTitre: "Bad Gastein Ski Transfers | Salzburg Airport, 104 km",
  metaDescription:
    "Private transfers to Bad Gastein from Salzburg (104 km, about 2 h), Munich, Innsbruck and Klagenfurt. Fixed price per vehicle, ski bags included.",
  h1: "Bad Gastein Ski Transfers – Private Airport Transfers to the Gastein Valley",
  chapo:
    "Bad Gastein is 104 km from Salzburg, the closest airport by a wide margin, with Munich at 274 km, Klagenfurt at 219 km and Innsbruck at 203 km. The road follows the Salzach south then turns up the Gasteinertal, a dead-end valley that climbs to the resort at 1,000 m. We drive all of them door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, ski and board bags included, and a driver who tracks your flight. Saturday is changeover day across the Salzburgerland — allow extra time and book early.",

  airports: ["salzburg-airport", "munich-airport", "innsbruck-airport", "klagenfurt-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Bad Gastein is unlike any other Alpine resort to arrive in: a Belle Époque spa town built in tiers down a gorge, with a waterfall running through the middle of it and grand hotels from the 1890s stacked against the rock. It was a destination for European royalty before it was a ski resort, and the thermal springs that brought them are still the reason many people come.",
    },
    {
      type: "paragraphe",
      texte:
        "The skiing spreads across four areas in the valley — Stubnerkogel and Graukogel above the town, Schlossalm above Bad Hofgastein, Sportgastein at the head of the valley — about 200 km of piste on one pass.",
    },

    { type: "titre2", texte: "Which airport for Bad Gastein?" },
    { type: "titre3", texte: "Salzburg (SZG) — 104 km, about 2 hours" },
    {
      type: "paragraphe",
      texte:
        "The obvious choice, and the one nearly all our Gastein passengers use. Winter flights from the UK and northern Europe are frequent, especially at weekends, and the route is motorway to Bischofshofen then the valley road south.",
    },
    { type: "titre3", texte: "Munich (MUC) — 274 km, about 4 hours" },
    {
      type: "paragraphe",
      texte:
        "A major hub with flights from everywhere, at the cost of a four-hour drive through Bavaria and the Tauern. Worth it when Salzburg has nothing on your dates.",
    },
    { type: "titre3", texte: "Klagenfurt (KLU) — 219 km, about 3 h 45" },
    {
      type: "paragraphe",
      texte:
        "The approach from Carinthia, on the south side of the Tauern. A thin timetable, but a real option for flights from the east.",
    },
    { type: "titre3", texte: "Innsbruck (INN) — 203 km, about 4 hours" },
    {
      type: "paragraphe",
      texte:
        "Further in time than in distance: the road crosses the Tauern or runs round it. Useful mainly when combined with another Tyrolean stop.",
    },

    { type: "titre2", texte: "The valley, the tunnel and the train" },
    {
      type: "paragraphe",
      texte:
        "The Gasteinertal is a cul-de-sac for cars: the road ends above Sportgastein and the only way south is the Tauern rail tunnel, where vehicles are loaded onto a shuttle train at Böckstein and carried to Mallnitz. It is a normal part of local life and it matters for transfers from Klagenfurt, where the shuttle can be faster than driving around.",
    },
    {
      type: "paragraphe",
      texte:
        "The valley road itself is a cleared Austrian main road. Winter tyres are compulsory in Austria from 1 November to 15 April in wintry conditions, and our vehicles carry them along with chains.",
    },

    { type: "titre2", texte: "Bad Gastein at a glance" },
    {
      type: "liste",
      items: [
        "Spa town at 1,000 m, built in tiers around a waterfall in a gorge.",
        "Around 200 km of piste across four areas: Stubnerkogel, Graukogel, Schlossalm-Angertal and Sportgastein at 2,700 m.",
        "Thermal springs used since Roman times, feeding the spas and the Felsentherme.",
        "Bad Hofgastein, 7 km down the valley, is the flatter, family-oriented sister resort on the same pass.",
        "A railway station in the middle of town, on the main line between Salzburg and Villach.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free, and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. Book as soon as your flights are confirmed: Salzburg’s winter capacity is weekend-heavy, and so is the demand for vehicles on those Saturdays.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Salzburg to Bad Gastein?",
      reponse:
        "About 2 hours for 104 km, motorway then valley road. Allow more on a Saturday in high season, when the whole Salzburgerland changes over.",
    },
    {
      question: "Do you also serve Bad Hofgastein and Sportgastein?",
      reponse:
        "Yes — both are in the same valley, 7 km and 12 km from Bad Gastein, on the same lift pass. Give us the exact address when you book.",
    },
    {
      question: "Is Munich a reasonable alternative to Salzburg?",
      reponse:
        "It is 274 km and about four hours, against two hours from Salzburg. Worth it only when Munich has a flight that suits and Salzburg does not.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. Waiting time is included.",
    },
  ],
};
