import type { Resort } from "./types";

/** Engelberg — rédigée à la main ; la station suisse la plus proche de Zurich. */
export const engelberg: Resort = {
  slug: "engelberg",
  name: "Engelberg",
  country: "CH",
  status: "migre",

  metaTitre: "Engelberg Ski Transfers | Zurich Airport, 107 km",
  metaDescription:
    "Private transfers to Engelberg from Zurich (107 km, 1 h 50), Bern, Basel and Milan. Titlis glacier skiing. Fixed price per vehicle, ski bags included.",
  h1: "Engelberg Ski Transfers – Private Airport Transfers to the Titlis",
  chapo:
    "Engelberg is the closest serious ski resort to Zurich: 107 km, about 1 hour 50 minutes by road, on motorway most of the way. Bern is 158 km away (2 h 05), Basel around 145 km (2 h) and Milan Malpensa 220 km (3 h) through the Gotthard. The village sits at 1,000 m in a closed valley below the Titlis glacier, and the road in is a valley road with a single climb at the end. We drive door to door at a price fixed per vehicle and quoted before you book, ski and board bags included, with your flight tracked.",

  airports: ["zurich-airport", "berne-airport", "milan-malpensa-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Engelberg grew around a Benedictine monastery founded in 1120, and the abbey is still there in the middle of the village — which is unusual company for a resort known internationally as one of the best freeride mountains in the Alps. The Titlis rises to 3,020 m above it, with a glacier that keeps snow into May and, in the Laub and the Galtiberg, two of the longest continuous off-piste descents in Switzerland.",
    },
    {
      type: "paragraphe",
      texte:
        "For a transfer, the useful fact is proximity: under two hours from Zurich puts Engelberg within reach of a morning arrival and an afternoon on the mountain, which very few resorts of this calibre manage.",
    },

    { type: "titre2", texte: "Which airport for Engelberg?" },
    { type: "titre3", texte: "Zurich (ZRH) — 107 km, about 1 h 50" },
    {
      type: "paragraphe",
      texte:
        "The main gateway: flights all week, long-haul connections, motorway to Stans and then 20 km up the valley. The shortest transfer to any major Swiss resort from an international airport.",
    },
    { type: "titre3", texte: "Bern (BRN) — 158 km, about 2 h 05" },
    {
      type: "paragraphe",
      texte:
        "Closer to the middle of Switzerland but with a thin timetable; check the flights before planning around it.",
    },
    { type: "titre3", texte: "Basel Mulhouse (BSL) — about 145 km, 2 hours" },
    {
      type: "paragraphe",
      texte:
        "The northern option, well served from the UK and Germany, on motorway through Lucerne.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 220 km, about 3 hours" },
    {
      type: "paragraphe",
      texte:
        "From the south through the Gotthard tunnel — a long tunnel that can queue badly at weekends and holidays. Worth it for the fare, not for the drive.",
    },

    { type: "titre2", texte: "Engelberg at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,000 m, skiing to 3,020 m on the Titlis glacier — the highest lift-served point in central Switzerland.",
        "Around 82 km of marked piste, and a freeride reputation out of all proportion to that number.",
        "The Laub, a 1,000 m open face, and the Galtiberg, which runs from the glacier to the valley — both terrain for guided skiers, not for the marked-run map.",
        "A Benedictine abbey in the village centre, in continuous use since 1120.",
        "Season into May on the glacier, when the valley resorts have closed.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The approach is motorway and a valley road, cleared through the season; the altitude is gained by the lifts rather than by the transfer. Our vehicles carry winter tyres and chains. Ski and board bags travel free — declare touring kit, splitboards and airbag packs, this is a valley where people bring them. Child and booster seats are included. Book early for the powder weeks: Engelberg fills from Zurich the moment it snows.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Engelberg?",
      reponse:
        "About 1 hour 50 minutes for 107 km, motorway most of the way — the shortest transfer to a major Swiss resort from an international airport.",
    },
    {
      question: "Is Engelberg good for beginners?",
      reponse:
        "It has 82 km of marked piste and a nursery area at Gerschnialp, but its reputation is built on off-piste. Beginners are better served in resorts with more intermediate terrain.",
    },
    {
      question: "How late does the season run?",
      reponse:
        "The Titlis glacier usually holds skiing into May, well after the valley resorts close.",
    },
    {
      question: "Are ski bags and touring equipment included?",
      reponse:
        "Yes, at no extra charge. Declare skis, boards, splitboards and airbag packs when booking so the vehicle has room.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
