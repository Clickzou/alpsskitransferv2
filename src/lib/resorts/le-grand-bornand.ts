import type { Resort } from "./types";

/** Le Grand-Bornand — rédigée à la main ; le trajet depuis Genève attendait cette page mère. */
export const leGrandBornand: Resort = {
  slug: "le-grand-bornand",
  name: "Le Grand-Bornand",
  country: "FR",
  status: "migre",

  metaTitre: "Le Grand-Bornand Transfers | Geneva Airport, 1 h 10",
  metaDescription:
    "Private transfers to Le Grand-Bornand from Geneva (56 km, 1 h 10), Annecy, Chambéry and Lyon. Fixed price per vehicle, ski bags included.",
  h1: "Le Grand-Bornand Ski Transfers – Private Airport Transfers to the Aravis",
  chapo:
    "Le Grand-Bornand is 56 km from Geneva, about 1 hour 10 minutes by road, which makes it one of the closest resorts to an international airport anywhere in the Alps. Annecy is 34 km away (40 minutes) but flies little in winter; Chambéry is 83 km (1 h 10) and Lyon 160 km (2 h). The village sits at 950 m in the Vallée du Bouchet, with the resort area at Le Chinaillon 6 km above it — a detail worth getting right when you book, because the two are a ten-minute drive apart. We drive door to door, at a price fixed per vehicle and quoted before you book, ski bags included.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport", "annecy-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Le Grand-Bornand is a farming village that became a ski resort without giving up the farming: some 400 chalets are scattered across the slopes, the Reblochon is still made in the valley, and the Thursday market has been running since the fifteenth century. It hosts a round of the biathlon World Cup most winters, which fills the village in December and empties it again by mid-January.",
    },
    {
      type: "paragraphe",
      texte:
        "The skiing is above the village at Le Chinaillon, on the flank of the Aravis chain, with runs coming back down towards the valley. It is a family mountain with real terrain at the top — the sort of place where beginners and strong skiers can share a lift pass without either being bored.",
    },

    { type: "titre2", texte: "Which airport for Le Grand-Bornand?" },
    { type: "titre3", texte: "Geneva (GVA) — 56 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "The obvious choice: flights every day of the week, motorway towards Annecy, then the valley road through Saint-Jean-de-Sixt. An hour and ten minutes from the terminal to the chalet, on a good day.",
    },
    { type: "titre3", texte: "Annecy (NCY) — 34 km, about 40 minutes" },
    {
      type: "paragraphe",
      texte:
        "The nearest airport by far, and the shortest transfer — but its winter schedule carries very few scheduled flights. Worth a look, rarely worth planning around.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 83 km, about 1 h 10" },
    {
      type: "paragraphe",
      texte:
        "The same drive time as Geneva, with a winter timetable built around weekend charters from the UK.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 160 km, about 2 h" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights, more airlines, motorway most of the way. The alternative when Geneva is full or expensive.",
    },

    { type: "titre2", texte: "Village or Chinaillon? Tell us which" },
    {
      type: "paragraphe",
      texte:
        "Le Grand-Bornand has two centres. The village, at 950 m, is where the shops, the market and most of the chalets are. Le Chinaillon, 6 km and 350 m higher, is the ski-in ski-out side at the foot of the lifts. A free bus links them in season, but at 11 p.m. with luggage and children it is not the same arrival — so give us the exact address at booking and the driver takes you there, not to the other one.",
    },

    { type: "titre2", texte: "Le Grand-Bornand at a glance" },
    {
      type: "liste",
      items: [
        "Village at 950 m, Le Chinaillon at 1,300 m, skiing to 2,100 m on the Aravis flank.",
        "Around 90 km of piste, with the Mont Lachat sector holding the steeper runs.",
        "Shares its valley with La Clusaz, 12 km away — the two are often booked as a single transfer.",
        "One of the last French resorts where working farms sit inside the ski area; the Reblochon cooperative is in the village.",
        "Hosts a biathlon World Cup round most seasons, in mid-December.",
      ],
    },

    { type: "titre2", texte: "Arriving in winter" },
    {
      type: "paragraphe",
      texte:
        "The approach follows valley roads at low altitude, cleared and gritted daily; the only climb is the 6 km up to Le Chinaillon, which is short and treated as a priority road. Winter tyres and chains are legally required in Haute-Savoie from 1 November to 31 March and our vehicles carry both. Saturday mornings in February are slow on the last stretch — allow half an hour more.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to what you declare. Child and booster seats are free and fitted before departure, as French law requires under 10. Book as soon as your flights are set: with Geneva an hour away, this valley fills fast for the school holidays.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Le Grand-Bornand?",
      reponse:
        "About 1 hour 10 minutes for 56 km, without traffic — one of the shortest airport transfers in the Alps. Allow half an hour more on a February Saturday.",
    },
    {
      question: "Should we be dropped in the village or at Le Chinaillon?",
      reponse:
        "Whichever your accommodation is: they are 6 km apart and 350 m of altitude away. Give us the exact address when you book and the driver goes straight there.",
    },
    {
      question: "Can you combine a drop in La Clusaz on the same journey?",
      reponse:
        "La Clusaz is 12 km away on the same road. Tell us at booking and it is quoted as one transfer.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare the number of ski or board bags and the ages of any children when you book.",
    },
    {
      question: "What if my flight lands late?",
      reponse:
        "Your driver tracks the flight and moves the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
