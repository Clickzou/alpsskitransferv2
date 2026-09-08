import type { Resort } from "./types";

/** Madonna di Campiglio — rédigée à la main ; Dolomites de Brenta, Trentin. */
export const madonnaDiCampiglio: Resort = {
  slug: "madonna-di-campiglio",
  name: "Madonna di Campiglio",
  country: "IT",
  status: "migre",

  metaTitre: "Madonna di Campiglio Transfers | Verona & Milan Airports",
  metaDescription:
    "Private transfers to Madonna di Campiglio from Verona (152 km, 2 h 25), Brescia, Bergamo and Milan. Fixed price per vehicle, ski bags included.",
  h1: "Madonna di Campiglio Ski Transfers – Private Airport Transfers to the Brenta",
  chapo:
    "Madonna di Campiglio sits at 1,550 m between the Brenta Dolomites and the Adamello, in the Trentino. Brescia is 124 km away, about 2 hours; Verona 152 km (2 h 25); Bergamo 173 km (2 h 35); Milan Linate 222 km (3 h 05); Innsbruck 225 km (3 h 15). The approach climbs the Val Rendena from Trento or from the lakes, and the last stretch is a mountain road. We drive all of them door to door, with winter tyres and chains on board, at a price fixed per vehicle and quoted before you book, ski and board bags included.",

  airports: [
    "verona-airport",
    "brescia-montichiari-airport",
    "bergamo-airport",
    "milan-linate-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Madonna di Campiglio was made fashionable by the Habsburgs — the Empress Elisabeth stayed here in the 1890s, and the resort still holds a costumed Habsburg carnival each winter. It has kept that register: a pedestrian centre of hotels and shops, and skiing that is more about long groomed runs than about extreme terrain.",
    },
    {
      type: "paragraphe",
      texte:
        "The setting is what sets it apart. The Brenta group, on one side, is the only part of the Dolomites west of the Adige — vertical limestone towers above a pine forest — while the Adamello-Presanella glaciers rise on the other.",
    },

    { type: "titre2", texte: "Which airport for Madonna di Campiglio?" },
    { type: "titre3", texte: "Brescia Montichiari (VBS) — 124 km, about 2 hours" },
    {
      type: "paragraphe",
      texte:
        "The closest airport, though its scheduled traffic is limited. Motorway to the lakes, then up the valley.",
    },
    { type: "titre3", texte: "Verona (VRN) — 152 km, about 2 h 25" },
    {
      type: "paragraphe",
      texte:
        "The airport most British and northern European visitors use for the Trentino, with winter flights through the season.",
    },
    { type: "titre3", texte: "Bergamo Orio al Serio (BGY) — 173 km, about 2 h 35" },
    {
      type: "paragraphe",
      texte:
        "The low-cost hub for the region, with flights from across Europe — often the cheapest way in.",
    },
    { type: "titre3", texte: "Milan Linate (LIN) — 222 km, about 3 h 05" },
    {
      type: "paragraphe",
      texte:
        "Closer to central Milan and useful for domestic connections, at the price of an hour more driving.",
    },

    { type: "titre2", texte: "Madonna di Campiglio at a glance" },
    {
      type: "liste",
      items: [
        "Resort at 1,550 m, skiing to 2,500 m, between the Brenta Dolomites and the Adamello.",
        "Around 150 km of piste locally, and about 380 km on the Skiarea Campiglio Dolomiti pass with Pinzolo and Folgarida-Marilleva.",
        "The 3-Tre downhill, on the Canalone Miramonti above the village, hosts a night slalom World Cup race each December.",
        "A pedestrian centre — the resort keeps traffic out of the middle in season.",
        "Pinzolo, 15 km down the valley, is linked by lift and generally cheaper to stay in.",
      ],
    },

    { type: "titre2", texte: "Winter on the Val Rendena road" },
    {
      type: "paragraphe",
      texte:
        "The valley road is a well-maintained regional road, cleared and gritted through the season. From the north, the Campo Carlo Magno pass just above the village links to Folgarida and is kept open; from the south, the approach is a long valley climb with no col. Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and our vehicles carry both.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. Book early for the December World Cup week and the Italian holiday weeks, when the valley fills.",
    },
  ],

  faq: [
    {
      question: "Which airport is best for Madonna di Campiglio?",
      reponse:
        "Verona for scheduled winter flights (152 km, about 2 h 25), Bergamo for low-cost fares (173 km, 2 h 35), Brescia when it has a flight (124 km, about 2 hours).",
    },
    {
      question: "Can we ski to Pinzolo and Folgarida?",
      reponse:
        "Yes — both are linked to Madonna di Campiglio, giving about 380 km of piste on the Skiarea Campiglio Dolomiti pass.",
    },
    {
      question: "Is Innsbruck a reasonable option?",
      reponse:
        "It is 225 km and about 3 h 15 over the Brenner. Worth it only when an Austrian flight suits your dates better than an Italian one.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare them when booking so the right vehicle and seats are sent.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
