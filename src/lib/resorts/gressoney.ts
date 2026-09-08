import type { Resort } from "./types";

/** Gressoney — rédigée à la main ; vallée du Lys, cœur du domaine Monterosa. */
export const gressoney: Resort = {
  slug: "gressoney",
  name: "Gressoney",
  country: "IT",
  status: "migre",

  metaTitre: "Gressoney Ski Transfers | Turin Airport to Monterosa",
  metaDescription:
    "Private transfers to Gressoney-La-Trinité and Saint-Jean from Turin (108 km, 1 h 40), Milan Malpensa and Geneva. Fixed price per vehicle.",
  h1: "Gressoney Ski Transfers – Private Airport Transfers to the Lys Valley",
  chapo:
    "Gressoney is the middle valley of the Monterosa ski area, and the one most skiers choose as a base. Turin is 108 km away, about 1 hour 40 minutes; Milan Malpensa 168 km (2 h 20); Milan Linate 182 km (2 h 35); Geneva around 210 km (3 h 05) through the Mont Blanc tunnel. Two villages share the valley — Gressoney-Saint-Jean at 1,385 m and Gressoney-La-Trinité at 1,635 m, 8 km apart — so tell us which when you book. We drive door to door with winter equipment on board, at a price fixed per vehicle and quoted before you book.",

  airports: ["turin-airport", "milan-malpensa-airport", "bergamo-airport", "geneva-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "The Lys valley is Walser country: German-speaking families crossed the Monte Rosa passes from the Valais in the thirteenth century and settled here, and their dialect, their timber houses and their place names survive at the head of the valley. Gressoney-La-Trinité, the higher of the two villages, is where the lifts into the Monterosa system start.",
    },
    {
      type: "paragraphe",
      texte:
        "From there the pass covers three valleys — Gressoney, Ayas and Alagna — about 180 km of piste beneath the second-highest massif in the Alps, and the freeride terrain that has made the area’s name.",
    },

    { type: "titre2", texte: "Which airport for Gressoney?" },
    { type: "titre3", texte: "Turin (TRN) — 108 km, about 1 h 40" },
    {
      type: "paragraphe",
      texte:
        "The closest, with frequent winter flights from the UK and northern Europe. Motorway to Pont-Saint-Martin, then some 30 km up the Lys valley.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 168 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "The largest airport in reach, with flights from across Europe and often the lowest fares.",
    },
    { type: "titre3", texte: "Milan Linate (LIN) — 182 km, about 2 h 35" },
    {
      type: "paragraphe",
      texte:
        "Closer to central Milan, useful for domestic and short-haul European flights.",
    },
    { type: "titre3", texte: "Geneva (GVA) — about 210 km, 3 h 05" },
    {
      type: "paragraphe",
      texte:
        "Through the Mont Blanc tunnel. The longest option, and the one to check when Italian flights do not fit your dates.",
    },

    { type: "titre2", texte: "Saint-Jean or La Trinité?" },
    {
      type: "paragraphe",
      texte:
        "Gressoney-Saint-Jean, at 1,385 m, is the larger village with more shops and a lake at its edge; the skiing there is a small local area. Gressoney-La-Trinité, 8 km higher at 1,635 m, is smaller and sits at the foot of the Monterosa lifts. If you are here to ski the linked area, La Trinité is where you want to wake up — and either way, give us the address.",
    },

    { type: "titre2", texte: "Gressoney at a glance" },
    {
      type: "liste",
      items: [
        "Two villages: Saint-Jean at 1,385 m and La Trinité at 1,635 m, 8 km apart.",
        "Monterosa Ski: about 180 km of piste linking Gressoney with Champoluc and Alagna on one pass.",
        "Skiing to 3,275 m at Punta Indren, under Monte Rosa (4,634 m).",
        "Walser villages, German-speaking since the thirteenth century, with timber and stone architecture at the valley head.",
        "One of the best-known freeride areas in the Alps — guided terrain rather than marked runs.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The motorway and the valley road are cleared and gritted through the season; Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and our vehicles carry both. Ski and board bags travel free — declare touring and freeride kit — and child and booster seats are included. Book early: the valley has fewer beds than its ski area suggests.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Turin to Gressoney?",
      reponse:
        "About 1 hour 40 minutes for 108 km, motorway then some 30 km up the Lys valley. From Milan Malpensa it is around 2 h 20.",
    },
    {
      question: "Which village should we stay in?",
      reponse:
        "Gressoney-La-Trinité, at 1,635 m, is at the foot of the Monterosa lifts. Gressoney-Saint-Jean, 8 km lower, is bigger and has more shops but only a small local ski area.",
    },
    {
      question: "Can we ski to Champoluc and Alagna?",
      reponse:
        "Yes, all three valleys are linked on the Monterosa Ski pass — around 180 km of piste in total.",
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
