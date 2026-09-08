import type { Resort } from "./types";

/** Grimentz — rédigée à la main ; village du val d'Anniviers, au-dessus de Sierre. */
export const grimentz: Resort = {
  slug: "grimentz",
  name: "Grimentz",
  country: "CH",
  status: "migre",

  metaTitre: "Grimentz Ski Transfers | Geneva to the Val d’Anniviers",
  metaDescription:
    "Private transfers to Grimentz and Zinal from Geneva (197 km, 2 h 35), Zurich, Milan and Sion. Fixed price per vehicle, ski and board bags included.",
  h1: "Grimentz Ski Transfers – Private Airport Transfers to the Val d’Anniviers",
  chapo:
    "Grimentz sits at 1,570 m in the Val d’Anniviers, above Sierre in the Valais. Geneva is 197 km away, about 2 hours 35 minutes; Zurich around 290 km and 3 h 20; Milan Malpensa 210 km and 3 h 15 through the Simplon; Sion, in the valley below, only 42 km and 45 minutes but with almost no scheduled flights. The last 25 km climb from the Rhône valley into the side valley — the part of the journey that decides the timing in winter. We drive door to door with winter tyres and chains, at a price fixed per vehicle and quoted before you book.",

  airports: ["geneva-airport", "zurich-airport", "milan-malpensa-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Grimentz is one of the best-preserved villages in the Valais: black larch chalets, some of them five centuries old, geraniums in summer and snow to the eaves in winter. It is a working village that took to skiing rather than a resort built for it, and it retains a communal wine cellar where the vin du glacier is still kept.",
    },
    {
      type: "paragraphe",
      texte:
        "Since 2013 a cable car has connected it to Zinal, at the head of the same valley, giving one area of about 100 km of piste rising to 2,900 m — with the Corne de Sorebois looking straight at the Weisshorn and the Zinalrothorn.",
    },

    { type: "titre2", texte: "Which airport for Grimentz?" },
    { type: "titre3", texte: "Geneva (GVA) — 197 km, about 2 h 35" },
    {
      type: "paragraphe",
      texte:
        "The practical choice: motorway along the lake and up the Rhône valley to Sierre, then the climb into the Anniviers. Flights all week from most of Europe.",
    },
    { type: "titre3", texte: "Sion (SIR) — 42 km, about 45 minutes" },
    {
      type: "paragraphe",
      texte:
        "The valley airport, three-quarters of an hour away, but with almost no scheduled service — relevant for private aviation.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — about 290 km, 3 h 20" },
    {
      type: "paragraphe",
      texte:
        "Long-haul connections and flights all week, at the price of a longer drive across the country.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 210 km, about 3 h 15" },
    {
      type: "paragraphe",
      texte:
        "Through the Simplon pass or the rail shuttle beneath it. Often the cheapest fares from southern Europe.",
    },

    { type: "titre2", texte: "The climb into the Anniviers" },
    {
      type: "paragraphe",
      texte:
        "From Sierre at 530 m the road climbs 25 km into the side valley, gaining more than 1,000 m through a series of galleries and hairpins. It is a cantonal road, cleared and gritted daily through the season, and one of the more spectacular approaches in the Valais. Our vehicles carry winter tyres and chains; this is not a road for summer tyres and optimism.",
    },

    { type: "titre2", texte: "Grimentz at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,570 m, skiing to 2,900 m at Sorebois, linked to Zinal since 2013.",
        "Around 100 km of piste on the Grimentz-Zinal pass, and a valley pass covering St-Luc, Chandolin and Vercorin.",
        "One of the best-preserved larch-chalet villages in Switzerland, parts of it five hundred years old.",
        "Serious off-piste terrain on the Sorebois side, and a long tradition of ski touring from the valley.",
        "Zinal, 10 km up the valley, sits under the Couronne Impériale — five peaks above 4,000 m.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to the equipment you declare — bring touring kit and say so. Child and booster seats are included and fitted before departure. Book early for the February half-terms: the Anniviers has fewer beds than the big Valais resorts, and the transfers that serve it are a smaller pool.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Grimentz?",
      reponse:
        "About 2 hours 35 minutes for 197 km, including the 25 km climb from Sierre into the Val d’Anniviers.",
    },
    {
      question: "Do you also serve Zinal, St-Luc and Chandolin?",
      reponse:
        "Yes, all are in the same valley and on the valley lift pass. Give us the exact address when you book — the villages are 10 to 15 km apart on mountain roads.",
    },
    {
      question: "Is Sion airport worth considering?",
      reponse:
        "It is only 42 km away, about 45 minutes, but carries almost no scheduled flights. It is the obvious choice for private aviation and irrelevant otherwise.",
    },
    {
      question: "Are ski bags and touring equipment included?",
      reponse:
        "Yes, at no extra charge. Declare skis, boards, splitboards and airbag packs when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
