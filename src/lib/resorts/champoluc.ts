import type { Resort } from "./types";

/** Champoluc — rédigée à la main ; Val d'Ayas, Monterosa Ski. */
export const champoluc: Resort = {
  slug: "champoluc",
  name: "Champoluc",
  country: "IT",
  status: "migre",

  metaTitre: "Champoluc Ski Transfers | Turin Airport to Monterosa",
  metaDescription:
    "Private transfers to Champoluc from Turin (109 km, 1 h 30), Milan Malpensa and Geneva. Monterosa Ski, Aosta Valley. Fixed price per vehicle.",
  h1: "Champoluc Ski Transfers – Private Airport Transfers to Monterosa Ski",
  chapo:
    "Champoluc is 109 km from Turin, about 1 hour 30 minutes, and 169 km from Milan Malpensa (2 h 10). Geneva is 207 km away (3 h 05) through the Mont Blanc tunnel. The village sits at 1,570 m at the head of the Val d’Ayas, one of three valleys linked by the Monterosa Ski lifts under Monte Rosa itself. The approach is a motorway run down the Aosta valley and then 30 km up a side valley — straightforward in winter. We drive door to door at a price fixed per vehicle, ski bags included, with your flight tracked.",

  airports: ["turin-airport", "milan-malpensa-airport", "geneva-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Champoluc is the Italian answer to the crowded French megaresorts: three valleys — Ayas, Gressoney and Alagna — linked by lifts under the second-highest massif in the Alps, with a fraction of the traffic. The Monterosa Ski area covers about 180 km of marked piste, but its reputation rests on what lies between the pistes: long, high, north-facing off-piste descents that draw guided groups from across Europe.",
    },
    {
      type: "paragraphe",
      texte:
        "The village itself is a Walser settlement — the German-speaking communities who crossed the Monte Rosa passes in the Middle Ages — with dark timber houses and stone roofs, at the end of a valley rather than on a through road.",
    },

    { type: "titre2", texte: "Which airport for Champoluc?" },
    { type: "titre3", texte: "Turin (TRN) — 109 km, about 1 h 30" },
    {
      type: "paragraphe",
      texte:
        "The closest and the simplest: motorway north to Verrès, then 30 km up the Val d’Ayas. Winter flights from the UK and northern Europe are frequent.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 169 km, about 2 h 10" },
    {
      type: "paragraphe",
      texte:
        "The biggest airport within reach, with flights from everywhere and often the lowest fares. Motorway the whole way to Verrès.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 207 km, about 3 h 05" },
    {
      type: "paragraphe",
      texte:
        "Through the Mont Blanc tunnel and down the Aosta valley. Worth it when Geneva has the flight and Italy does not — and note the tunnel toll and its queues at weekends.",
    },

    { type: "titre2", texte: "Champoluc at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,570 m, skiing to 3,275 m at Punta Indren, under Monte Rosa (4,634 m).",
        "Monterosa Ski: about 180 km of piste linking the Ayas, Gressoney and Alagna valleys on one pass.",
        "A Walser village — the German-speaking settlers of the Monte Rosa valleys — with timber and stone architecture.",
        "Freeride terrain that draws guided groups from across the Alps; the lift-served descents from Punta Indren are the reason.",
        "Antagnod and Brusson, further down the same valley, are quieter bases on the same road.",
      ],
    },

    { type: "titre2", texte: "Winter on the road" },
    {
      type: "paragraphe",
      texte:
        "The Aosta valley motorway is cleared and gritted through the season, and the 30 km up the Val d’Ayas is a well-maintained regional road. Italy requires winter tyres or chains on board on Alpine roads from mid-November to mid-April, and our vehicles carry both. Snowfall slows this approach; it rarely blocks it.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to what you declare — declare touring and freeride kit, this valley attracts it. Child and booster seats are included and fitted before departure. Book as soon as your flights are confirmed: Monterosa has fewer beds than its ski area suggests.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Turin to Champoluc?",
      reponse:
        "About 1 hour 30 minutes for 109 km, motorway then 30 km up the Val d’Ayas. From Milan Malpensa it is around 2 h 10.",
    },
    {
      question: "Can we ski across to Gressoney and Alagna?",
      reponse:
        "Yes — the three valleys are linked by the Monterosa Ski lifts on one pass, about 180 km of piste in total.",
    },
    {
      question: "Is Geneva a sensible airport for Champoluc?",
      reponse:
        "It is 207 km and about 3 hours through the Mont Blanc tunnel. Turin and Milan are closer and usually cheaper; Geneva makes sense when it has the flight you need.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
