import type { Resort } from "./types";

/** Lauterbrunnen — rédigée à la main ; c'est aussi la gare d'arrivée de Wengen et de Mürren. */
export const lauterbrunnen: Resort = {
  slug: "lauterbrunnen",
  name: "Lauterbrunnen",
  country: "CH",
  status: "migre",

  metaTitre: "Lauterbrunnen Transfers | Airport to the Jungfrau Region",
  metaDescription:
    "Private transfers to Lauterbrunnen from Zurich (149 km), Bern, Geneva, Basel and Milan. Gateway to Wengen and Mürren. Fixed price per vehicle.",
  h1: "Lauterbrunnen Ski Transfers – Private Airport Transfers to the Jungfrau Region",
  chapo:
    "Lauterbrunnen is the road head of the Jungfrau region: the last village a vehicle reaches, and the station from which the railways climb to Wengen and the cable cars to Mürren. Bern is 61 km away, about 55 minutes; Zurich 149 km and 2 h 30; Basel around 190 km and 2 h 20; Geneva 226 km and 2 h 50; Milan Malpensa 261 km and 3 h 45 through the Simplon. We drive door to door in the village, and to the platform when your bed is higher up. Price fixed per vehicle, quoted before you book, ski and board bags included, and your driver tracks the flight.",

  airports: ["zurich-airport", "berne-airport", "geneva-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Lauterbrunnen lies in a valley so straight-sided it looks engineered: vertical limestone walls, 72 waterfalls, and the Staubbach falling 300 m past the church. Tolkien walked here in 1911 and the valley is generally credited with becoming Rivendell. It is also, practically, the hub of the whole Jungfrau region — the point where roads stop and railways take over.",
    },
    {
      type: "paragraphe",
      texte:
        "If you are staying in Lauterbrunnen itself, your transfer ends at the door. If you are staying in Wengen or Mürren, it ends at the station or the cable car below them, because neither village has a road.",
    },

    { type: "titre2", texte: "Which airport for Lauterbrunnen?" },
    { type: "titre3", texte: "Bern (BRN) — 61 km, about 55 minutes" },
    {
      type: "paragraphe",
      texte:
        "The closest airport, and a genuinely short transfer — but its scheduled timetable is thin. Check it first, then look at Zurich.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — 149 km, about 2 h 30" },
    {
      type: "paragraphe",
      texte:
        "The main Swiss hub: flights all week, long-haul connections, and a motorway run through Bern to Interlaken before the valley road.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 226 km, about 2 h 50" },
    {
      type: "paragraphe",
      texte:
        "The widest choice of European flights, along the lake and through Bern. Longer, but often cheaper.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 261 km, about 3 h 45" },
    {
      type: "paragraphe",
      texte:
        "The southern approach through the Simplon. Worth comparing for flights from Italy and southern Europe.",
    },

    { type: "titre2", texte: "Where the road stops" },
    {
      type: "liste",
      items: [
        "Lauterbrunnen village: we drive to the door.",
        "Wengen: we drop at Lauterbrunnen station; the cog railway takes about 15 minutes, roughly every half-hour.",
        "Mürren: we drop at the station for the funicular via Grütschalp, or at Stechelberg for the cable car — tell us which your hotel recommends.",
        "Grindelwald: reached by road over the other side of the ridge, about 30 minutes from Lauterbrunnen.",
        "Skis and luggage travel with you on all of these; the stations have trolleys.",
      ],
    },

    { type: "titre2", texte: "Lauterbrunnen at a glance" },
    {
      type: "liste",
      items: [
        "Village at 796 m, at the foot of the cliffs, on the Jungfrau ski pass.",
        "Around 200 km of piste in the Jungfrau region: Wengen, Grindelwald, Kleine Scheidegg and Mürren-Schilthorn.",
        "The Jungfraujoch railway, the highest in Europe at 3,454 m, starts from this valley.",
        "Seventy-two waterfalls in the valley, the Staubbach the tallest of them.",
        "Cheaper beds than the car-free villages above, and the trains run late.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "The valley road from Interlaken is a cleared main road at low altitude — the climbing is done by railway, which is why this is one of the more weather-proof arrivals in the Alps. Our vehicles carry winter tyres and chains. Ski and board bags travel free, child and booster seats are included, and we set the drop-off against a train time rather than leaving you on a platform. Book early for the January Lauberhorn race week, when the whole valley fills.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Lauterbrunnen?",
      reponse:
        "About 2 hours 30 minutes for 149 km. From Bern it is around 55 minutes, from Geneva about 2 h 50, and from Milan Malpensa about 3 h 45 through the Simplon.",
    },
    {
      question: "Can you take us on to Wengen or Mürren?",
      reponse:
        "By road, no — neither has one. We drop you at Lauterbrunnen station for the Wengen cog railway, or at the funicular or the Stechelberg cable car for Mürren, and help you and your skis onto the platform.",
    },
    {
      question: "Is Lauterbrunnen a good base for skiing?",
      reponse:
        "It is on the Jungfrau pass with trains to Wengen, Kleine Scheidegg and Mürren, generally at lower prices than the car-free villages. The trade-off is a train ride at each end of the day.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when you book.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
