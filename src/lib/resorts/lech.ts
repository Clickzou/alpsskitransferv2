import type { Resort } from "./types";

/** Lech — rédigée à la main ; le trajet depuis Zurich attendait cette page mère. */
export const lech: Resort = {
  slug: "lech",
  name: "Lech",
  country: "AT",
  status: "migre",

  metaTitre: "Lech Ski Transfers | Zurich & Innsbruck to Lech am Arlberg",
  metaDescription:
    "Private transfers to Lech am Arlberg from Zurich (199 km), Innsbruck, Friedrichshafen and Munich. Fixed price per vehicle, ski and board bags included.",
  h1: "Lech Ski Transfers – Private Airport Transfers to Lech am Arlberg",
  chapo:
    "Lech sits at 1,450 m on the Vorarlberg side of the Arlberg, reached by the Flexen road that climbs from Warth or from the Arlberg pass. Innsbruck is 127 km away, about 2 hours 15 minutes; Friedrichshafen 138 km and 2 h 20; Memmingen 181 km and 2 h 40; Zurich 199 km and around 3 h 25; Munich 257 km and 3 h 55. We drive all of them door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, ski bags included, and a driver who tracks your flight — useful on a road that occasionally closes for avalanche control.",

  airports: [
    "zurich-airport",
    "innsbruck-airport",
    "friedrichshafen-airport",
    "munich-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Lech and Zürs are the western half of the Arlberg, the area where Alpine skiing was more or less invented and where the Ski Club Arlberg has been teaching since 1901. Since the Flexenbahn opened, the whole Arlberg is linked on one pass — Lech, Zürs, Warth-Schröcken, St. Anton, St. Christoph and Stuben — around 300 km of piste and the largest connected area in Austria.",
    },
    {
      type: "paragraphe",
      texte:
        "Lech itself is a village of wooden farmhouses along a river, quieter and more expensive than St. Anton on the other side of the pass, and famous for the amount of snow that falls on it: this is one of the snowiest inhabited valleys in the Alps.",
    },

    { type: "titre2", texte: "Which airport for Lech?" },
    { type: "titre3", texte: "Innsbruck (INN) — 127 km, about 2 h 15" },
    {
      type: "paragraphe",
      texte:
        "The closest airport, with winter flights from the UK and northern Europe concentrated at weekends. The route runs west along the Inn valley and over or through the Arlberg.",
    },
    { type: "titre3", texte: "Friedrichshafen (FDH) — 138 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "On Lake Constance, and the German option: a short drive through the Rhine valley and up the Klostertal. A thin timetable, but cheap when it matches.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — 199 km, about 3 h 25" },
    {
      type: "paragraphe",
      texte:
        "The airport most international visitors use: flights all week, long-haul connections, and a motorway run through the Rhine valley before the climb.",
    },
    { type: "titre3", texte: "Munich (MUC) — 257 km, about 3 h 55" },
    {
      type: "paragraphe",
      texte:
        "A major hub with flights from everywhere, at the cost of the longest drive of the four.",
    },

    { type: "titre2", texte: "The Flexen road, and why the timing matters" },
    {
      type: "paragraphe",
      texte:
        "Lech is reached by the Flexenpass road, a spectacular piece of engineering of galleries and avalanche shelters above Zürs. It is kept open through the winter, but after heavy snowfall the authorities close it for controlled avalanche blasting, sometimes for a few hours. When that happens there is no alternative road: the valley simply waits.",
    },
    {
      type: "paragraphe",
      texte:
        "It is rare, and it is the reason we track your flight and watch the road status on the day rather than working to a fixed timetable. Winter tyres are compulsory in Austria from 1 November to 15 April in wintry conditions; our vehicles carry them and chains.",
    },

    { type: "titre2", texte: "Lech at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,450 m, skiing to 2,450 m, with Zürs 5 km up the pass at 1,720 m.",
        "Part of the Arlberg — around 300 km of linked piste with St. Anton, Stuben and Warth-Schröcken, on one pass.",
        "One of the snowiest villages in the Alps; the Weiße Ring circuit, 22 km around the valley, is skied as a race each January.",
        "Oberlech, above the village, is car-free and reached by cable car — tell us if that is where you are staying.",
        "The Flexenbahn links Zürs to Stuben and St. Anton without driving over the pass.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. Book early: Lech is small, its beds are taken months ahead for the high season, and the vehicles that make the Zurich and Innsbruck runs go with them.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Lech?",
      reponse:
        "About 3 hours 25 minutes for 199 km. Innsbruck is closer at 127 km and about 2 h 15, and Friedrichshafen is 138 km and around 2 h 20.",
    },
    {
      question: "Can the road to Lech close in winter?",
      reponse:
        "Occasionally, yes. The Flexen road is kept open but is closed for controlled avalanche blasting after heavy snowfall, sometimes for a few hours, and there is no alternative route. We watch the road status on the day.",
    },
    {
      question: "Do you also serve Zürs, Oberlech and Warth?",
      reponse:
        "Yes. Zürs is 5 km up the pass and Warth 12 km the other way; Oberlech is car-free and reached by cable car, so we drop at the valley station. Give us the exact address at booking.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare them when you book so the right vehicle and seats are sent.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
