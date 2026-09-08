import type { Resort } from "./types";

/** Argentière — rédigée à la main ; le trajet depuis Genève attendait cette page mère. */
export const argentiere: Resort = {
  slug: "argentiere",
  name: "Argentière",
  country: "FR",
  status: "migre",

  metaTitre: "Argentière Ski Transfers | Geneva to the Grands Montets",
  metaDescription:
    "Private transfers to Argentière from Geneva (100 km, 1 h 40), Chambéry, Lyon and Sion. Fixed price per vehicle, ski and board bags included.",
  h1: "Argentière Ski Transfers – Private Airport Transfers to the Grands Montets",
  chapo:
    "Argentière is 100 km from Geneva, about 1 hour 40 minutes by road — the last village in the Chamonix valley before the Swiss border, at 1,240 m. Chambéry is 149 km away (1 h 50) and Lyon 218 km (2 h 40); Sion, on the Swiss side of the Col des Montets, is only 60 km away but has almost no scheduled flights. The approach is the Chamonix valley road, which stays open through the winter and carries every transfer, bus and delivery in the valley. We drive it door to door at a price fixed per vehicle, ski bags included, with a driver who tracks your flight.",

  airports: ["geneva-airport", "chambery-savoie-airport", "lyon-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Argentière is where serious skiers stay when they come to Chamonix. It is 8 km up the valley from the town, quieter, colder, and it sits at the foot of the Grands Montets — the lift that made the valley’s reputation for steep, high, off-piste terrain rising to 3,275 m.",
    },
    {
      type: "paragraphe",
      texte:
        "The village itself is small: one main street, a church, a handful of bars that fill at four in the afternoon and empty by ten. People come here for the mountain, and the transfer question is really about how quickly you reach it.",
    },

    { type: "titre2", texte: "Which airport for Argentière?" },
    { type: "titre3", texte: "Geneva (GVA) — 100 km, about 1 h 40" },
    {
      type: "paragraphe",
      texte:
        "The route everyone uses: motorway to Le Fayet, then the valley road up through Les Houches, Chamonix and Les Praz. Flights run all week, and the drive is a single road with no col.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 149 km, about 1 h 50" },
    {
      type: "paragraphe",
      texte:
        "Weekend-heavy winter timetable with UK charters; ten minutes more driving than Geneva for a flight that is often cheaper.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 218 km, about 2 h 40" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and the widest airline choice, an hour more on the motorway.",
    },
    { type: "titre3", texte: "Sion (SIR) — 60 km, about 55 minutes" },
    {
      type: "paragraphe",
      texte:
        "The closest airport on paper, over the Col des Montets and down the Swiss side — but Sion handles very few scheduled flights, and the col can close in heavy snow. Interesting for private aviation, not for a scheduled arrival.",
    },

    { type: "titre2", texte: "Argentière at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,240 m, at the foot of the Grands Montets, which rises to 3,275 m.",
        "Part of the Chamonix valley lift pass: Grands Montets, Brévent-Flégère, Les Houches, Balme and the Aiguille du Midi.",
        "Le Tour and Vallorcine, at the head of the valley, are 5 and 12 km further on — the sunny, gentler end of the same pass.",
        "The Argentière glacier basin above the village is one of the best-known off-piste amphitheatres in the Alps: guides, not guesswork.",
        "Chamonix town, 8 km down the valley, is where the shops, the station and the late-night restaurants are.",
      ],
    },

    { type: "titre2", texte: "Arriving in winter" },
    {
      type: "paragraphe",
      texte:
        "The Chamonix valley road is a main road, cleared and gritted around the clock in season — it serves a valley of 13,000 residents and the Mont Blanc tunnel. Snow slows it, it rarely stops it. Winter tyres and chains are required in Haute-Savoie from 1 November to 31 March and our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "The predictable slowdown is the A40 between Geneva and Le Fayet on Saturday mornings in February. Allow 45 minutes more on those days, and give us your flight number so the pick-up follows the real landing time.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and we size the vehicle to what you declare — this is a valley where people arrive with touring kit, splitboards and airbag packs, so tell us. Child and booster seats are included, fitted before departure. Book as soon as your flights are set: Chamonix and Argentière fill from Christmas to the end of March.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Geneva to Argentière?",
      reponse:
        "About 1 hour 40 minutes for 100 km, without traffic — roughly 15 minutes more than to Chamonix town. Allow 45 minutes more on a February Saturday.",
    },
    {
      question: "Can you drop us in Chamonix, Les Praz, Le Tour or Vallorcine?",
      reponse:
        "Yes, all are on the same valley road and share the lift pass. Give us the exact address when you book and it is quoted as a single journey.",
    },
    {
      question: "Is Sion airport a realistic option?",
      reponse:
        "Only for private aviation. Sion is 60 km away over the Col des Montets, but carries very few scheduled flights, and the col can close briefly in heavy snow.",
    },
    {
      question: "Are ski bags and touring equipment included?",
      reponse:
        "Yes, at no extra charge. Declare skis, boards, splitboards and boot bags when you book so the vehicle sent has the space.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. Waiting time is included.",
    },
  ],
};
