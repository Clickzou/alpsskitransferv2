import type { Resort } from "./types";

/** Champéry — rédigée à la main ; le trajet depuis Zurich attendait cette page mère. */
export const champery: Resort = {
  slug: "champery",
  name: "Champéry",
  country: "CH",
  status: "migre",

  metaTitre: "Champéry Ski Transfers | Geneva Airport to Champéry",
  metaDescription:
    "Private transfers to Champéry from Geneva (128 km, 1 h 45), Zurich, Sion and Milan. Swiss side of the Portes du Soleil. Fixed price per vehicle.",
  h1: "Champéry Ski Transfers – Private Airport Transfers to the Portes du Soleil",
  chapo:
    "Champéry is the Swiss gateway to the Portes du Soleil, at 1,050 m at the head of the Val-d’Illiez. Geneva is 128 km away, about 1 hour 45 minutes; Sion 58 km and under an hour but with almost no scheduled flights; Zurich around 300 km and 3 h 30. The approach leaves the Rhône motorway at Monthey and climbs a valley road — no high pass, and a crossing of the French border only if you choose to make it. We drive door to door at a price fixed per vehicle and quoted before you book, ski bags included, with your flight tracked.",

  airports: ["geneva-airport", "zurich-airport", "milan-malpensa-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Champéry is a single long street of wooden chalets under the Dents du Midi, and it has been receiving visitors since the nineteenth century — long enough that the village looks the same in photographs from 1900. It is the Swiss end of the Portes du Soleil, the twelve-resort circuit that runs across the border to Morzine, Avoriaz and Châtel.",
    },
    {
      type: "paragraphe",
      texte:
        "The skiing is reached by a cable car from the village to Planachaux, and from there the circuit opens up — including the Swiss Wall at Chavanette, the run that most people photograph and fewer people ski.",
    },

    { type: "titre2", texte: "Which airport for Champéry?" },
    { type: "titre3", texte: "Geneva (GVA) — 128 km, about 1 h 45" },
    {
      type: "paragraphe",
      texte:
        "The natural choice: motorway around the lake to Monthey, then 15 km up the Val-d’Illiez. Flights all week from most European cities, and a drive with no col at any point.",
    },
    { type: "titre3", texte: "Sion (SIR) — 58 km, about 50 minutes" },
    {
      type: "paragraphe",
      texte:
        "Much closer, and a genuinely short transfer, but with almost no scheduled service. Private aviation only, in practice.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — about 300 km, 3 h 30" },
    {
      type: "paragraphe",
      texte:
        "Long-haul connections and flights all week, at the cost of a three-and-a-half-hour drive across the country.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — about 230 km, 3 h" },
    {
      type: "paragraphe",
      texte:
        "Through the Simplon and down the Rhône valley. Worth comparing for flights from Italy and southern Europe.",
    },

    { type: "titre2", texte: "Champéry at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,050 m under the Dents du Midi, with a cable car to Planachaux at 1,800 m.",
        "Part of the Portes du Soleil — around 600 km of piste across twelve French and Swiss resorts on one pass.",
        "The Swiss Wall at Chavanette, on the link to Avoriaz, is one of the steepest marked runs in the Alps; there is a gondola beside it for everyone else.",
        "Morgins, Champoussin and Les Crosets are the other Swiss villages on the circuit, all within 20 minutes by road.",
        "A village with a railway station: the Aigle–Champéry line runs to the Rhône valley main line.",
      ],
    },

    { type: "titre2", texte: "Crossing the border, or not" },
    {
      type: "paragraphe",
      texte:
        "Champéry is in Switzerland; Morzine, Avoriaz and Châtel are in France, on the same lift pass. Skiing across is routine and needs nothing beyond the pass. Driving across is also straightforward — both countries are in the Schengen area — but carry your passport or identity card, and remember that Switzerland requires a motorway vignette, which our vehicles carry.",
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The valley road is a cleared cantonal road with no pass, which makes Champéry one of the more reliable Swiss arrivals in bad weather; our vehicles carry winter tyres and chains regardless. Ski and board bags travel free, child and booster seats are included and fitted before departure. Book early for the February half-terms, when the whole Portes du Soleil fills on the same Saturdays.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Champéry?",
      reponse:
        "About 1 hour 45 minutes for 128 km, on motorway then a valley road with no high pass. Allow more on a Saturday in February.",
    },
    {
      question: "Is Champéry a good base for the Portes du Soleil?",
      reponse:
        "It is the main Swiss gateway, with a cable car into the circuit and a lift pass covering all twelve resorts, including Morzine, Avoriaz and Châtel on the French side.",
    },
    {
      question: "Do you also serve Les Crosets, Champoussin and Morgins?",
      reponse:
        "Yes, all are within about 20 minutes of Champéry on the same approach. Give us the exact address when you book.",
    },
    {
      question: "Do we need a passport if we cross into France on the skis?",
      reponse:
        "Not for the skiing itself, but carry your passport or identity card: both countries are in the Schengen area, and spot checks do happen on the roads.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the real landing time; waiting time is included.",
    },
  ],
};
