import type { Resort } from "./types";

/** Isola 2000 — rédigée à la main : la station la plus méridionale du registre. */
export const isola2000: Resort = {
  slug: "isola-2000",
  name: "Isola 2000",
  country: "FR",
  status: "migre",

  metaTitre: "Isola 2000 Ski Transfers | Nice Airport, 87 km",
  metaDescription:
    "Private transfers to Isola 2000 from Nice (87 km, 1 h 30), Turin and Marseille. Ski the Southern Alps 90 minutes from the Mediterranean coast.",
  h1: "Isola 2000 Ski Transfers – Private Airport Transfers from Nice",
  chapo:
    "Isola 2000 is the resort you reach from the Mediterranean: Nice airport is 87 km away, about 1 hour 30 minutes, which makes it the only ski area in Europe within ninety minutes of a beach. Turin is 181 km (2 h 55) and Marseille 278 km (3 h 40). The road climbs the Tinée valley from the coast to 2,000 m, and the last 16 km from Isola village are a proper mountain climb. We drive it door to door with winter tyres and chains on board, at a price fixed per vehicle and quoted before you book, ski bags included, and a driver who tracks your flight.",

  airports: ["nice-airport", "turin-airport", "marseille-provence-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Isola 2000 was built in the 1970s at the head of the Chastillon valley, at 2,000 m, in the Mercantour massif behind Nice. Its altitude and its position — cold air from the north, moisture from the Mediterranean — give it the most snow of any resort in the Southern Alps, and the light of the Côte d’Azur on top of it.",
    },
    {
      type: "paragraphe",
      texte:
        "The transfer is the resort’s defining feature: you land beside the sea, and ninety minutes later you are at 2,000 m. Few journeys in the Alps change the scenery so completely, and none this quickly.",
    },

    { type: "titre2", texte: "Which airport for Isola 2000?" },
    { type: "titre3", texte: "Nice Côte d’Azur (NCE) — 87 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "The obvious one, and one of France’s biggest airports: flights all week from across Europe, all year. The route follows the Var and then the Tinée valley before the climb to the resort.",
    },
    { type: "titre3", texte: "Turin (TRN) — 181 km, about 2 h 55" },
    {
      type: "paragraphe",
      texte:
        "The Italian approach, over the Col de Larche or round through Cuneo depending on the season — the direct mountain passes above Isola are closed in winter.",
    },
    { type: "titre3", texte: "Marseille Provence (MRS) — 278 km, about 3 h 40" },
    {
      type: "paragraphe",
      texte:
        "The long way along the coast. Worth comparing only when the fare difference is substantial.",
    },

    { type: "titre2", texte: "The climb from the Tinée" },
    {
      type: "paragraphe",
      texte:
        "From Nice the road runs inland along the Var, then up the Tinée valley to Isola village at 870 m. The last 16 km climb 1,130 m to the resort in a series of hairpins — a mountain road, cleared and gritted through the season, and occasionally closed briefly for avalanche control after heavy snowfall.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter tyres and chains are required in the Alpes-Maritimes from 1 November to 31 March, and our vehicles carry both. This is not a drive to attempt in a hire car with summer tyres because it started sunny at the airport.",
    },

    { type: "titre2", texte: "Isola 2000 at a glance" },
    {
      type: "liste",
      items: [
        "Resort at 2,000 m, skiing to 2,610 m at the Cime de Sistron, in the Mercantour.",
        "Around 120 km of piste, with the most reliable snow cover in the Southern Alps.",
        "Ski-in, ski-out: the resort is a single compact front-de-neige, built for it.",
        "Nice, the sea and the old town are 90 minutes away — a genuine option for a bad-weather day.",
        "Auron and Saint-Étienne-de-Tinée, on the same valley road, are within 30 minutes and on a joint pass.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure, as French law requires under 10. Book as soon as your flights are confirmed: Nice is busy year-round and the vehicles equipped for the Tinée climb are a smaller pool than the ones doing airport runs on the coast.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Nice to Isola 2000?",
      reponse:
        "About 1 hour 30 minutes for 87 km, including the final 16 km of climb from Isola village. Allow more after heavy snowfall.",
    },
    {
      question: "Can you really ski and see the sea on the same day?",
      reponse:
        "Yes — that is the point of Isola. Nice is 90 minutes away by road, and plenty of visitors spend a bad-weather day on the coast.",
    },
    {
      question: "Do you also serve Auron and Saint-Étienne-de-Tinée?",
      reponse:
        "Yes, both are on the same valley road, within about 30 minutes of Isola. Give us the exact address when you book.",
    },
    {
      question: "Is the road to Isola 2000 difficult in winter?",
      reponse:
        "The last 16 km climb 1,130 m in hairpins. It is cleared and gritted, and closed only briefly for avalanche control after heavy snow. Our vehicles carry winter tyres and chains, as the Alpes-Maritimes require from 1 November to 31 March.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
