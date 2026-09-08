import type { Resort } from "./types";

/** Crans-Montana — rédigée à la main ; le trajet depuis Zurich attendait cette page mère. */
export const cransMontana: Resort = {
  slug: "crans-montana",
  name: "Crans-Montana",
  country: "CH",
  status: "migre",

  metaTitre: "Crans-Montana Transfers | Geneva & Zurich to Valais",
  metaDescription:
    "Private transfers to Crans-Montana from Geneva (183 km, 2 h 25), Zurich, Milan and Sion. Fixed price per vehicle, ski and board bags included.",
  h1: "Crans-Montana Ski Transfers – Private Airport Transfers to the Valais",
  chapo:
    "Crans-Montana sits on a sunny terrace at 1,500 m above the Rhône valley, reached by a 15 km climb from Sierre. Geneva is 183 km away, about 2 hours 25 minutes; Zurich around 280 km and 3 h 15; Milan Malpensa 206 km and 3 h 10 through the Simplon; Sion, in the valley below, only 28 km and 35 minutes. We drive all of them door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, ski bags included, and a driver who tracks your flight so a delay costs you nothing.",

  airports: ["geneva-airport", "zurich-airport", "milan-malpensa-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Crans-Montana is two villages that grew into one resort on a south-facing shelf 1,000 m above the Rhône. The position is the whole point: the terrace gets sun all day and looks straight across at the Matterhorn and the Weisshorn, and the skiing above it climbs to the Plaine Morte glacier at 3,000 m.",
    },
    {
      type: "paragraphe",
      texte:
        "It is also a resort with a town’s services — banks, clinics, a golf course under the snow, and shops that stay open through the year. For a transfer, the practical fact is the climb: 15 km of hairpins from Sierre, cleared daily but genuinely mountainous.",
    },

    { type: "titre2", texte: "Which airport for Crans-Montana?" },
    { type: "titre3", texte: "Geneva (GVA) — 183 km, about 2 h 25" },
    {
      type: "paragraphe",
      texte:
        "The usual choice: motorway along Lake Geneva and up the Rhône valley to Sierre, then the climb. Flights all week from most European cities.",
    },
    { type: "titre3", texte: "Sion (SIR) — 28 km, about 35 minutes" },
    {
      type: "paragraphe",
      texte:
        "The valley airport, twenty minutes below the climb — the shortest transfer of any Valais resort, but with almost no scheduled flights. Private aviation only, in practice.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — about 280 km, 3 h 15" },
    {
      type: "paragraphe",
      texte:
        "The main Swiss hub, with long-haul connections. Longer by road than Geneva, and worth it mostly for the flight rather than the drive.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 206 km, about 3 h 10" },
    {
      type: "paragraphe",
      texte:
        "Through the Simplon pass, or the Simplon rail shuttle when the pass is closed. Often the cheapest fares from southern Europe.",
    },

    { type: "titre2", texte: "The climb from Sierre" },
    {
      type: "paragraphe",
      texte:
        "The road climbs about 950 m in 15 km of hairpins from Sierre, on a well-maintained cantonal road that is cleared and gritted daily through the season. Heavy snow slows it; it rarely closes. A funicular also runs from Sierre to Montana, which is the fallback the locals use when the road is at its worst. Our vehicles carry winter tyres and chains.",
    },

    { type: "titre2", texte: "Crans-Montana at a glance" },
    {
      type: "liste",
      items: [
        "Resort at 1,500 m, skiing to 3,000 m on the Plaine Morte glacier.",
        "Around 140 km of piste, mostly south-facing and sunny, with the glacier holding the higher, colder snow.",
        "A resort split between two villages — Crans and Montana — a couple of kilometres apart on the same terrace.",
        "Hosts a Ladies’ World Cup downhill most seasons, and a well-known golf course in summer.",
        "Views the length of the Valais: the Matterhorn, the Weisshorn and the Dent Blanche across the valley.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free, and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. Book as soon as your flights are confirmed: the Valais fills for Christmas and the February half-terms, and long transfers from Geneva are taken first.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Crans-Montana?",
      reponse:
        "About 2 hours 25 minutes for 183 km, including the 15 km climb from Sierre. Allow more on a Saturday in high season or after heavy snowfall.",
    },
    {
      question: "Which village should we be dropped at, Crans or Montana?",
      reponse:
        "Whichever your accommodation is in — they are a couple of kilometres apart on the same terrace, with one lift pass. Give us the exact address when you book.",
    },
    {
      question: "Is Sion airport useful for Crans-Montana?",
      reponse:
        "It is only 28 km away, about 35 minutes, but carries almost no scheduled flights. For private aviation it is the obvious choice; otherwise fly to Geneva.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. Waiting time is included.",
    },
  ],
};
