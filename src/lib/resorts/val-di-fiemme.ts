import type { Resort } from "./types";

/**
 * Val di Fiemme — rédigée à la main. C'est une vallée, pas un village unique :
 * Cavalese en est le chef-lieu, et le géocodage y est calé.
 */
export const valDiFiemme: Resort = {
  slug: "val-di-fiemme",
  name: "Val di Fiemme",
  country: "IT",
  status: "migre",

  metaTitre: "Val di Fiemme Transfers | Verona & Innsbruck to Cavalese",
  metaDescription:
    "Private transfers to Val di Fiemme and Cavalese from Verona (165 km, 2 h 05), Innsbruck, Venice and Bergamo. Fixed price per vehicle, ski bags included.",
  h1: "Val di Fiemme Ski Transfers – Private Airport Transfers to Cavalese and the Dolomites",
  chapo:
    "Val di Fiemme is a valley of villages rather than a single resort: Cavalese, Predazzo, Tesero, Ziano and Panchià, in the Trentino Dolomites. Verona is 165 km away, about 2 hours 05; Innsbruck 156 km (2 h 15) over the Brenner; Venice 176 km (3 h); Bergamo 245 km (2 h 55). The approach is motorway then the Val di Fiemme road, without a high pass on the main route. We drive door to door — tell us the village — at a price fixed per vehicle and quoted before you book, ski and board bags included.",

  airports: ["verona-airport", "innsbruck-airport", "venice-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "The Val di Fiemme is where the Dolomites are lived in rather than looked at. Its villages have run their forests communally for eight centuries through the Magnifica Comunità, whose spruce has been made into violins — Stradivari sourced here — and its cross-country trails have hosted three Nordic World Championships.",
    },
    {
      type: "paragraphe",
      texte:
        "For downhill skiing, the valley gives access to Alpe Cermis above Cavalese, to Bellamonte and Alpe Lusia towards Predazzo, and, through the Dolomiti Superski pass, to the whole of the Dolomites — twelve areas and 1,200 km of piste on one ticket.",
    },

    { type: "titre2", texte: "Which airport for Val di Fiemme?" },
    { type: "titre3", texte: "Verona (VRN) — 165 km, about 2 h 05" },
    {
      type: "paragraphe",
      texte:
        "The usual choice for the Trentino, with winter flights from the UK and northern Europe. Motorway up the Adige to Ora, then the valley road.",
    },
    { type: "titre3", texte: "Innsbruck (INN) — 156 km, about 2 h 15" },
    {
      type: "paragraphe",
      texte:
        "The northern approach over the Brenner — the lowest of the great Alpine passes, on a motorway kept open year-round.",
    },
    { type: "titre3", texte: "Venice (VCE) — 176 km, about 3 hours" },
    {
      type: "paragraphe",
      texte:
        "Flights from across Europe, and the longest of the three drives; a good option when Verona has nothing.",
    },
    { type: "titre3", texte: "Bergamo Orio al Serio (BGY) — 245 km, about 2 h 55" },
    {
      type: "paragraphe",
      texte:
        "The low-cost hub. Further away, frequently cheaper, and motorway most of the way.",
    },

    { type: "titre2", texte: "Which village?" },
    {
      type: "paragraphe",
      texte:
        "Cavalese, at 1,000 m, is the main town of the valley and the base of the Alpe Cermis cable car. Predazzo, 15 km up the valley, is closer to Alpe Lusia and to the Val di Fassa. Tesero, Ziano and Panchià lie between them, on the Nordic trails. They are all on the same road and within twenty minutes of each other — but they are not the same address, so give us yours.",
    },

    { type: "titre2", texte: "Val di Fiemme at a glance" },
    {
      type: "liste",
      items: [
        "A valley at 1,000 m, with Alpe Cermis rising to 2,250 m above Cavalese.",
        "On the Dolomiti Superski pass: twelve areas and about 1,200 km of piste on one ticket.",
        "One of the great Nordic centres of Europe — the Marcialonga, a 70 km cross-country race, runs down this valley each January.",
        "The Magnifica Comunità di Fiemme has managed the valley’s forests communally since 1111.",
        "Predazzo and Tesero hold the ski jumping and cross-country stadiums used at three World Championships.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The main approach avoids high passes: motorway up the Adige, then a valley road cleared and gritted through the season. Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and our vehicles carry both. Ski and board bags travel free, cross-country skis included, and child and booster seats are provided. Book early for the Marcialonga weekend in late January, when every bed in the valley is taken.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Verona to Val di Fiemme?",
      reponse:
        "About 2 hours 05 minutes for 165 km to Cavalese, motorway then the valley road. Innsbruck is 156 km and around 2 h 15 over the Brenner.",
    },
    {
      question: "Which village should we be dropped at?",
      reponse:
        "Cavalese, Predazzo, Tesero, Ziano or Panchià — they are within twenty minutes of each other on the same road. Give us the exact address when you book.",
    },
    {
      question: "Does the lift pass cover the whole Dolomites?",
      reponse:
        "The Dolomiti Superski pass covers twelve areas and about 1,200 km of piste, including the local Alpe Cermis and Alpe Lusia and the neighbouring Val di Fassa.",
    },
    {
      question: "Can you carry cross-country skis?",
      reponse:
        "Yes, at no extra charge — this is one of the great Nordic valleys and we carry the equipment regularly. Declare it when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
