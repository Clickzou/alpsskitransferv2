import type { Resort } from "./types";

/** Montgenèvre — rédigée à la main ; le trajet depuis Turin attendait cette page mère. */
export const montgenevre: Resort = {
  slug: "montgenevre",
  name: "Montgenèvre",
  country: "FR",
  status: "migre",

  metaTitre: "Montgenèvre Ski Transfers | Turin Airport, 1 h 40",
  metaDescription:
    "Private transfers to Montgenèvre from Turin (105 km, 1 h 40), Chambéry, Grenoble and Marseille. Fixed price per vehicle, ski bags included.",
  h1: "Montgenèvre Ski Transfers – Private Airport Transfers to the Voie Lactée",
  chapo:
    "Montgenèvre sits on the French-Italian border at 1,860 m, and its nearest airport is Italian: Turin is 105 km away, about 1 hour 40 minutes, against 156 km and 2 h 10 from Chambéry and 170 km and 2 h 40 from Grenoble. The Italian approach climbs the Susa valley and crosses the col at the village itself — no tunnel, no long detour. We drive all of them door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, and ski and board bags included. Your driver tracks your flight, so a late landing costs you nothing.",

  airports: [
    "turin-airport",
    "chambery-savoie-airport",
    "grenoble-isere-airport",
    "marseille-provence-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Montgenèvre is a border village on a col that has been a crossing point since Roman times — Hannibal is one of the candidates for having come through here, and Napoleon had the road built. Today the border runs through the ski area: the lifts climb out of France and the pistes come down into Italy, on the Milky Way circuit shared with Claviere, Cesana, Sansicario, Sestriere and Sauze d’Oulx.",
    },
    {
      type: "paragraphe",
      texte:
        "That position explains the transfer. Turin is the closest airport not because Italy is nearer but because the road from it is a valley climb to the col, while every French route crosses higher ground first.",
    },

    { type: "titre2", texte: "Which airport for Montgenèvre?" },
    { type: "titre3", texte: "Turin (TRN) — 105 km, about 1 h 40" },
    {
      type: "paragraphe",
      texte:
        "The shortest transfer, and often the cheapest flight. Motorway west from Turin to Oulx, then the climb through Cesana and Claviere to the col. Winter flights from the UK and northern Europe are frequent.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 156 km, about 2 h 10" },
    {
      type: "paragraphe",
      texte:
        "The nearest French airport in time, with a weekend-heavy winter timetable. The route runs down the Maurienne and over towards Briançon.",
    },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 170 km, about 2 h 40" },
    {
      type: "paragraphe",
      texte:
        "Weekend charters through the season; the road crosses the Col du Lautaret at 2,058 m, which is kept open but can close briefly in heavy snow.",
    },
    { type: "titre3", texte: "Marseille Provence (MRS) — 268 km, about 3 h 30" },
    {
      type: "paragraphe",
      texte:
        "The southern approach up the Durance valley, avoiding every high pass. Worth comparing for flights from southern Europe.",
    },

    { type: "titre2", texte: "Crossing the border" },
    {
      type: "paragraphe",
      texte:
        "France and Italy are both in the Schengen area, so there is no routine border check on this road — but bring your passport or identity card: spot checks happen, and you will need identification for your flight home in any case. Our vehicles are insured and equipped for both countries.",
    },
    {
      type: "paragraphe",
      texte:
        "The col at Montgenèvre is the highest point of the drive from Turin and the road is kept open through the season; the Hautes-Alpes require winter tyres and chains from 1 November to 31 March, and Italy applies the same rule on this route. Our vehicles carry both.",
    },

    { type: "titre2", texte: "Montgenèvre at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,860 m — one of the highest resort villages in France, with snow cover that reflects it.",
        "Part of the Voie Lactée / Via Lattea: around 400 km of piste linked across the border with Claviere, Cesana, Sansicario, Sestriere and Sauze d’Oulx.",
        "Skiing on both sides of the village, north-facing to the Chalvet and south-facing to the Gondrans.",
        "Briançon, 12 km down the French side, is the UNESCO-listed Vauban town and the nearest place with a hospital and a station.",
        "The lift pass choice — local, Voie Lactée or Grand Serre Che — is worth making before you arrive.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to the equipment you declare rather than to the seat count. Child and booster seats are included and fitted before departure. Book as soon as your flights are confirmed: cross-border vehicles are the first to go for the February half-terms.",
    },
  ],

  faq: [
    {
      question: "Which airport is closest to Montgenèvre?",
      reponse:
        "Turin, at 105 km and about 1 hour 40 minutes. Chambéry is the nearest French airport at 156 km and 2 h 10, and Grenoble is 170 km and about 2 h 40 over the Col du Lautaret.",
    },
    {
      question: "Do we need a passport for a transfer from Turin?",
      reponse:
        "There is no routine border check between France and Italy in the Schengen area, but carry your passport or identity card: spot checks happen and you will need identification for your return flight.",
    },
    {
      question: "Can you drop us in Claviere, Cesana or Briançon?",
      reponse:
        "Yes — Claviere is 3 km over the border, Cesana 10 km below it and Briançon 12 km down the French side. All are on the same road; give us the exact address at booking.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when you book.",
    },
    {
      question: "What if my flight lands late in Turin?",
      reponse:
        "Your driver tracks the flight and moves the pick-up to the actual landing time. Waiting time is included, with no surcharge.",
    },
  ],
};
