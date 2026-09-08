import type { Resort } from "./types";

/**
 * Les Carroz — rédigée à la main. Le slug garde la forme du registre WooCommerce
 * (`les-carroz-grand-massif`), qui est celle des URL existantes.
 */
export const lesCarrozGrandMassif: Resort = {
  slug: "les-carroz-grand-massif",
  name: "Les Carroz",
  country: "FR",
  status: "migre",

  metaTitre: "Les Carroz Ski Transfers | Geneva Airport, 65 km",
  metaDescription:
    "Private transfers to Les Carroz d’Arâches from Geneva (65 km, 1 h 10), Chambéry and Lyon. Fixed price per vehicle, ski and board bags included.",
  h1: "Les Carroz Ski Transfers – Private Airport Transfers to the Grand Massif",
  chapo:
    "Les Carroz d’Arâches is 65 km from Geneva, about 1 hour 10 minutes by road, and the first Grand Massif village you reach on the climb from Cluses — 14 km below Flaine on the same road. Chambéry is 114 km away (1 h 25) and Lyon 191 km (2 h 15). The village sits at 1,140 m, high enough to ski from and low enough to keep its trees and its shops. We drive door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, ski bags included, and a driver who follows your flight.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Les Carroz is the Grand Massif village that people who have skied Flaine end up moving to. It has the same lift network — the Kédeuze gondola links straight into the area — but a south-facing plateau, a village square with cafés on it, and buildings made of wood rather than the concrete of the 1960s plan higher up.",
    },
    {
      type: "paragraphe",
      texte:
        "For a transfer, its position on the road matters: it is halfway up the climb from Cluses, so the last stretch is 8 km of hairpins rather than 20. In heavy snow, that difference shows.",
    },

    { type: "titre2", texte: "Which airport for Les Carroz?" },
    { type: "titre3", texte: "Geneva (GVA) — 65 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "Flights all week, motorway to Cluses, then the climb through Arâches. One of the shortest transfers to any resort with 265 km of piste behind it.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 114 km, about 1 h 25" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport with weekend charters from the UK; a quarter of an hour more driving than from Geneva.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 191 km, about 2 h 15" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights, more airlines, an hour more on the motorway. Useful when Geneva prices spike at half-term.",
    },

    { type: "titre2", texte: "Les Carroz at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,140 m, on the Grand Massif — around 265 km of piste linked with Flaine, Morillon, Samoëns and Sixt.",
        "The Kédeuze gondola runs from the village into the ski area; the return run comes back to the village when cover allows.",
        "A south-facing plateau with sun on the terraces, and skiing that faces north above it.",
        "Flaine is 14 km further up the same road, Samoëns 25 km round the valley — both on the same lift pass.",
        "A village with a permanent population and a school, not a purpose-built station.",
      ],
    },

    { type: "titre2", texte: "The climb from Cluses" },
    {
      type: "paragraphe",
      texte:
        "The road leaves the Arve valley at 480 m and climbs through Arâches to 1,140 m — about 8 km of hairpins, gritted daily through the season. Winter tyres and chains are required in Haute-Savoie from 1 November to 31 March, and our vehicles carry both. On February Saturdays, the queue is in the valley rather than on the mountain: allow 45 minutes more.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free and the vehicle is sized to the equipment you declare, not the seat count. Child and booster seats are included and fitted before departure, as French law requires for every child under 10. Book as soon as your flights are confirmed — the whole Arve valley fills for the February half-terms.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Les Carroz?",
      reponse:
        "About 1 hour 10 minutes for 65 km, without traffic. Allow up to 45 minutes more on a Saturday in February, when the Arve valley is busy.",
    },
    {
      question: "Is Les Carroz easier to reach than Flaine?",
      reponse:
        "Slightly. Les Carroz is 14 km lower down the same road, so the climb from Cluses is about 8 km rather than 20. Both are cleared through the season.",
    },
    {
      question: "Can you drop us at Flaine, Morillon or Samoëns instead?",
      reponse:
        "Yes — all are in the Grand Massif and on the same approach. Give us the exact address at booking and the journey is quoted as one transfer.",
    },
    {
      question: "Are ski bags included?",
      reponse:
        "Yes, ski and board bags travel free. Declare them when you book so the vehicle sent has the room.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks it and adjusts the pick-up to the actual landing time, at no extra charge.",
    },
  ],
};
