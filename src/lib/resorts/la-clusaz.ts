import type { Resort } from "./types";

/** La Clusaz — rédigée à la main ; le trajet depuis Genève attendait cette page mère. */
export const laClusaz: Resort = {
  slug: "la-clusaz",
  name: "La Clusaz",
  country: "FR",
  status: "migre",

  metaTitre: "La Clusaz Ski Transfers | Geneva Airport to La Clusaz",
  metaDescription:
    "Private transfers to La Clusaz from Geneva (59 km, 1 h 10), Annecy, Chambéry and Lyon. Fixed price per vehicle, flight tracking, ski bags included.",
  h1: "La Clusaz Ski Transfers – Private Airport Transfers to the Aravis",
  chapo:
    "La Clusaz is 59 km from Geneva, about 1 hour 10 minutes by road — one of the shortest airport transfers in the Alps. Annecy is closer still at 34 km (40 minutes) but has few winter flights; Chambéry is 83 km away (1 h 10) and Lyon 160 km (2 h). The village sits at 1,100 m at the foot of the Aravis range, reached by a valley road from Annecy rather than by a long climb. We drive all of them door to door, with a price fixed per vehicle and quoted before you book, ski and board bags included, and a driver who tracks your flight so a delay costs you nothing.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport", "annecy-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "La Clusaz is a Savoyard village that took to skiing early and never stopped being a village: a church at the centre, a cheese cooperative selling the Reblochon made in the valley, and five ski areas rising directly from it. It has produced a long line of French champions, which tells you something about the terrain — it is not a gentle mountain, and the local skiing culture shows on the slopes.",
    },
    {
      type: "paragraphe",
      texte:
        "For a transfer, the useful fact is the approach. The road from Annecy follows the Fier and the Nom valleys, climbing gently to 1,100 m without a col. It is one of the more dependable arrivals in the Alps when the weather turns.",
    },

    { type: "titre2", texte: "Which airport for La Clusaz?" },
    { type: "titre3", texte: "Geneva (GVA) — 59 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "The practical choice: flights all week from most European cities, motorway to Annecy, then 30 km of valley road. Very few resorts of this size are an hour from an international airport.",
    },
    { type: "titre3", texte: "Annecy (NCY) — 34 km, about 40 minutes" },
    {
      type: "paragraphe",
      texte:
        "The closest airport by a distance, and the shortest transfer we run to La Clusaz — but the winter schedule is thin, with few scheduled flights. Check it, then book Geneva.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 83 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "The same drive time as Geneva. Chambéry’s winter flights are concentrated at weekends, which suits a Saturday-to-Saturday week.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 160 km, about 2 h" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and a wider airline choice, on motorway most of the way. The fallback when Geneva fares climb in February.",
    },

    { type: "titre2", texte: "La Clusaz at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,100 m, skiing to 2,600 m across five linked sectors: Beauregard, l’Étale, l’Aiguille, la Balme and Manigod.",
        "La Balme is the serious end of the mountain — steep, north-facing, and the reason strong skiers keep coming back.",
        "Around 125 km of piste, shared with Manigod on the same pass, and lift-linked walking distance from the village centre.",
        "A working village: the Reblochon cooperative, the Monday market, restaurants that are not only open in season.",
        "Le Grand-Bornand, its neighbour, is 12 km away on the same road and often booked as the same transfer.",
      ],
    },

    { type: "titre2", texte: "Arriving in winter" },
    {
      type: "paragraphe",
      texte:
        "The road from Annecy is a main road, cleared and gritted daily, and the resort sits low enough that heavy snow slows the journey rather than stopping it. Winter tyres and chains are legally required in Haute-Savoie from 1 November to 31 March and our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "The only real bottleneck is Saturday morning in February, when the whole Aravis changes over at once and the last 15 km queue. Add half an hour on those days, and give us your flight number so the pick-up follows the actual landing.",
    },

    { type: "titre2", texte: "Skis, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free, and the vehicle is sized to the equipment you declare rather than to the head count. Child and booster seats are free too, fitted before departure — French law requires an approved restraint for every child under 10.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "On a transfer this short, a private vehicle is often barely more than the seats it replaces, and it leaves the moment you land. A shared transfer is cheaper per person with flexible timings. Book as soon as your flights are confirmed: the Aravis fill for the French and Belgian school holidays, and vehicles go early.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to La Clusaz?",
      reponse:
        "About 1 hour 10 minutes for 59 km, without traffic. It is one of the shortest airport transfers in the Alps. Allow half an hour more on a Saturday in February.",
    },
    {
      question: "Can we fly into Annecy instead?",
      reponse:
        "Annecy is only 34 km away, around 40 minutes, and we drive it — but its winter timetable carries very few scheduled flights. Most passengers fly to Geneva.",
    },
    {
      question: "Do you also serve Le Grand-Bornand and Manigod?",
      reponse:
        "Yes. Le Grand-Bornand is 12 km away and Manigod shares the lift pass; both are on the same approach. Give us the exact address when you book.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your ski or board bags and the ages of any children when booking so the right vehicle and seats are sent.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the real landing time. Waiting time is included and there is no surcharge.",
    },
  ],
};
