import type { Resort } from "./types";

/** Chamrousse — rédigée à la main ; le trajet depuis Grenoble attendait cette page mère. */
export const chamrousse: Resort = {
  slug: "chamrousse",
  name: "Chamrousse",
  country: "FR",
  status: "migre",

  metaTitre: "Chamrousse Ski Transfers | Grenoble Airport, 78 km",
  metaDescription:
    "Private transfers to Chamrousse from Grenoble (78 km, 1 h 10), Chambéry, Lyon and Geneva. Fixed price per vehicle, ski and board bags included.",
  h1: "Chamrousse Ski Transfers – Private Airport Transfers to the Belledonne",
  chapo:
    "Chamrousse is 78 km from Grenoble Alpes-Isère airport, about 1 hour 10 minutes by road, and 89 km from Chambéry (1 h 20). Lyon is 126 km away (1 h 45) and Geneva 174 km (2 h 20). The resort sits at 1,700 m on the Belledonne range directly above Grenoble, reached by a climb of some 30 km from the Isère valley — the part of the journey that decides the timing in winter. We drive all four airports door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, and ski bags included.",

  airports: [
    "grenoble-isere-airport",
    "chambery-savoie-airport",
    "lyon-airport",
    "geneva-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Chamrousse is the mountain Grenoble skis on. It held the alpine events of the 1968 Winter Olympics — Jean-Claude Killy’s three gold medals were won on these slopes — and it has kept the character that gave it: a compact resort on a shoulder of the Belledonne, with the whole Grésivaudan valley below and the Vercors opposite.",
    },
    {
      type: "paragraphe",
      texte:
        "It is laid out in three parts, and the difference matters at midnight with luggage: Recoin at 1,650 m, Roche-Béranger at 1,750 m, and Le Bachat between them. Give us the exact address at booking.",
    },

    { type: "titre2", texte: "Which airport for Chamrousse?" },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 78 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "The closest airport and the shortest transfer, with a winter timetable built on weekend charters from the UK and northern Europe. Motorway to Grenoble, then the climb through Uriage.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 89 km, about 1 h 20" },
    {
      type: "paragraphe",
      texte:
        "Ten minutes further, also weekend-heavy in winter. Useful when the Grenoble schedule does not match your dates.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 126 km, about 1 h 45" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights, the widest airline choice, and a straight motorway run down to Grenoble. Often the practical answer for a midweek arrival.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 174 km, about 2 h 20" },
    {
      type: "paragraphe",
      texte:
        "The longest of the four, but with flights from everywhere at all hours. Worth it when the fare difference is real.",
    },

    { type: "titre2", texte: "The climb from the Isère valley" },
    {
      type: "paragraphe",
      texte:
        "From Grenoble the road climbs about 1,400 m in 30 km, through Uriage-les-Bains and a long series of forest hairpins. It is a well-maintained departmental road, cleared and gritted daily through the season, but it is a genuine mountain climb and it is slow in fresh snow. Winter tyres and chains are legally required in Isère from 1 November to 31 March; our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "Because Chamrousse is Grenoble’s local mountain, its traffic peaks are different from the big Tarentaise resorts: the pinch is Saturday and Sunday mornings with day-trippers from the city, rather than a weekly changeover.",
    },

    { type: "titre2", texte: "Chamrousse at a glance" },
    {
      type: "liste",
      items: [
        "Resort at 1,650–1,750 m, skiing to 2,250 m at the Croix de Chamrousse.",
        "Around 90 km of piste on the Belledonne range, with views over Grenoble, the Vercors and the Chartreuse.",
        "Site of the alpine events of the 1968 Grenoble Winter Olympics.",
        "Three linked centres: Recoin, Le Bachat and Roche-Béranger — one lift pass, three addresses.",
        "Close enough to Grenoble that the resort lives on day visitors: quieter midweek than most resorts of its size.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free and the vehicle is sized to what you declare rather than to the seat count. Child and booster seats are included and fitted before departure, as French law requires for every child under 10. Book once your flights are confirmed — Grenoble and Chambéry sell their winter capacity on the same Saturdays as everyone else.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Grenoble airport to Chamrousse?",
      reponse:
        "About 1 hour 10 minutes for 78 km, including some 30 km of climb from the Isère valley. Allow more after fresh snow.",
    },
    {
      question: "Which part of Chamrousse should we be dropped at?",
      reponse:
        "Recoin (1,650 m), Le Bachat or Roche-Béranger (1,750 m) — they are separate centres on the same lift pass. Give us the exact address when you book.",
    },
    {
      question: "Is Lyon a reasonable alternative to Grenoble?",
      reponse:
        "Yes. Lyon is 126 km away, about 1 h 45, and has year-round flights from far more destinations. Grenoble is closer but flies mainly at weekends in winter.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the real landing time; waiting time is included.",
    },
  ],
};
