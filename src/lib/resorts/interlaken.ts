import type { Resort } from "./types";

/** Interlaken — rédigée à la main ; base du Jungfrau, pas station de ski elle-même. */
export const interlaken: Resort = {
  slug: "interlaken",
  name: "Interlaken",
  country: "CH",
  status: "migre",

  metaTitre: "Interlaken Transfers | Zurich & Bern Airport to Interlaken",
  metaDescription:
    "Private transfers to Interlaken from Zurich (139 km, 2 h 20), Bern, Basel, Geneva and Milan. Fixed price per vehicle, ski and board bags included.",
  h1: "Interlaken Ski Transfers – Private Airport Transfers to the Bernese Oberland",
  chapo:
    "Interlaken is the base of the Bernese Oberland rather than a ski resort itself: a town of 5,000 between two lakes, from which the railways climb to Grindelwald, Wengen, Mürren and the Jungfraujoch. Bern is 51 km away, about 50 minutes; Zurich 139 km and 2 h 20; Basel about 170 km and 2 h; Geneva 216 km and 2 h 40; Milan Malpensa 251 km and 3 h 35. We drive door to door at a price fixed per vehicle, quoted before you book, with ski and board bags included and your flight tracked — and we can take you on to the resort villages that a road actually reaches.",

  airports: ["zurich-airport", "berne-airport", "geneva-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Interlaken sits at 566 m on the flat strip between Lake Thun and Lake Brienz, with the Eiger, Mönch and Jungfrau filling the view south. It is the transport hub of the region: two stations, boats on both lakes, and trains every half-hour into the mountains. People stay here for the price, the choice of hotels and the ease of moving around — not for skiing out of the door.",
    },
    {
      type: "paragraphe",
      texte:
        "For a winter trip, that makes it a practical base: Grindelwald is 20 km by road, Lauterbrunnen 12 km, Wengen and Mürren a train ride above them, and Adelboden and Gstaad within an hour’s drive.",
    },

    { type: "titre2", texte: "Which airport for Interlaken?" },
    { type: "titre3", texte: "Bern (BRN) — 51 km, about 50 minutes" },
    {
      type: "paragraphe",
      texte:
        "The closest airport by a wide margin, on a motorway that follows Lake Thun. Its scheduled timetable is thin, so check the flights before you plan around it.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — 139 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "The main Swiss hub: flights all week, long-haul connections, motorway the whole way through Bern.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 216 km, about 2 h 40" },
    {
      type: "paragraphe",
      texte:
        "The widest European choice. Longer, but frequently cheaper, and the drive along the lakes is an easy one.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 251 km, about 3 h 35" },
    {
      type: "paragraphe",
      texte:
        "Through the Simplon or by the rail shuttle at Kandersteg, depending on conditions. Worth comparing for flights from southern Europe.",
    },

    { type: "titre2", texte: "Where you can ski from Interlaken" },
    {
      type: "liste",
      items: [
        "Grindelwald — 20 km by road, about 30 minutes; the biggest of the Jungfrau area villages.",
        "Lauterbrunnen — 12 km, and the station for Wengen and Mürren, neither of which has a road.",
        "Mürren-Schilthorn — cable car from Stechelberg, 20 km up the valley.",
        "Adelboden and Lenk — about an hour west, on their own pass.",
        "Gstaad — about an hour and a quarter, over the Saanen side.",
      ],
    },

    { type: "titre2", texte: "Interlaken at a glance" },
    {
      type: "liste",
      items: [
        "Town at 566 m between Lake Thun and Lake Brienz, on the Jungfrau railway network.",
        "The Jungfraujoch, at 3,454 m, is the highest railway station in Europe and starts from this valley.",
        "A year-round destination: skiing in winter, paragliding and lake boats in summer, which keeps hotels and restaurants open all season.",
        "Hotel prices are generally lower than in the car-free villages above.",
        "Two stations — Interlaken Ost is the one for the mountain railways.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The approach is motorway and lakeside road at low altitude, cleared through the season: this is one of the easier arrivals in the Alps in bad weather. Our vehicles carry winter tyres and chains. Ski and board bags travel free, child and booster seats are included and fitted before departure, and we take you on to the villages above if that is where you are staying — tell us the address when you book.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Interlaken?",
      reponse:
        "About 2 hours 20 minutes for 139 km, motorway most of the way. From Bern it is around 50 minutes, from Geneva about 2 h 40.",
    },
    {
      question: "Can you ski in Interlaken itself?",
      reponse:
        "No — Interlaken is the base, at 566 m. The skiing is above it: Grindelwald and Lauterbrunnen by road, Wengen and Mürren by rail and cable car, Adelboden and Gstaad within an hour.",
    },
    {
      question: "Can you drive us on to Grindelwald or Lauterbrunnen?",
      reponse:
        "Yes, both are reached by road — 20 km and 12 km. Wengen and Mürren have no road, so those transfers end at the station or cable car below them.",
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
