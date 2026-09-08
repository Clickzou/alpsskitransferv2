import type { Resort } from "./types";

/** Les Menuires — rédigée à la main ; deux pages de trajet attendaient cette page mère. */
export const lesMenuires: Resort = {
  slug: "les-menuires",
  name: "Les Menuires",
  country: "FR",
  status: "migre",

  metaTitre: "Les Menuires Ski Transfers | Airport to Three Valleys",
  metaDescription:
    "Private transfers to Les Menuires from Chambéry (114 km), Geneva, Grenoble and Lyon. Fixed price per vehicle, flight tracking, ski bags included.",
  h1: "Les Menuires Ski Transfers – Private Airport Transfers to the Three Valleys",
  chapo:
    "Les Menuires sits at 1,850 m in the Belleville valley, on the same road as Val Thorens and 8 km below it. Chambéry is the closest airport at 114 km (1 h 40), then Grenoble at 180 km (2 h 25), Lyon at 192 km (2 h 30) and Geneva at 153 km but 2 h 45 by road. Every route ends the same way: the climb from Moûtiers, 27 km of hairpins from the valley floor. We drive all four airports door to door, with winter tyres and chains on board, a price fixed per vehicle and quoted before you book, and ski bags included. Saturday is changeover day across the Three Valleys — allow extra time and book early.",

  airports: [
    "chambery-savoie-airport",
    "geneva-airport",
    "grenoble-isere-airport",
    "lyon-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Les Menuires is the practical member of the Three Valleys family. It has the same lift pass as Courchevel and Méribel, the same 600 km of linked piste, and prices for accommodation that have never pretended to match them. The resort was built in the 1960s across the slope at La Croisette, and successive rebuilds — Reberty, Les Bruyères, Preyerand — have softened the original concrete with wood and stone.",
    },
    {
      type: "paragraphe",
      texte:
        "What it keeps from the original design is the thing that matters after a long journey: almost every building is on the snow. You arrive, you unload, and the lift is a walk away rather than a bus ride.",
    },

    { type: "titre2", texte: "Which airport for Les Menuires?" },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 114 km, about 1 h 40" },
    {
      type: "paragraphe",
      texte:
        "The closest airport and the shortest transfer. Its winter timetable is concentrated at weekends, with UK charters — ideal for a Saturday-to-Saturday week, less so for a midweek arrival.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 153 km, about 2 h 45" },
    {
      type: "paragraphe",
      texte:
        "Further in time than in distance, because the route runs down the motorway to Albertville before turning up the Tarentaise. In exchange you get flights every day of the week from most European cities, which is why many groups still choose it.",
    },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 180 km, about 2 h 25" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport with weekend charters and often lower fares; the drive is longer in kilometres than from Chambéry but mostly motorway.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 192 km, about 2 h 30" },
    {
      type: "paragraphe",
      texte:
        "Year-round flights and the widest airline choice, on a straightforward motorway run to Albertville. The usual answer when Geneva prices climb in February.",
    },

    { type: "titre2", texte: "The climb from Moûtiers" },
    {
      type: "paragraphe",
      texte:
        "All four routes meet at Moûtiers, at 480 m in the bottom of the Tarentaise, and climb from there: 27 km of hairpins through Saint-Martin-de-Belleville to Les Menuires, then 8 km more if you carry on to Val Thorens. The road is cleared and gritted through the season, and winter tyres and chains are legally required in Savoie from 1 November to 31 March — our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "On a February Saturday the whole Three Valleys changes over at once and the Tarentaise slows between Albertville and Moûtiers. Add an hour to the times above on those mornings. Flying home, we set the departure so you reach the terminal with time in hand rather than to the theoretical minimum.",
    },

    { type: "titre2", texte: "Les Menuires at a glance" },
    {
      type: "liste",
      items: [
        "Resort at 1,850 m, skiing from 1,800 m to 3,200 m via the Pointe de la Masse and the link to Val Thorens.",
        "Part of Les 3 Vallées, the largest linked ski area in the world — the same pass covers Val Thorens, Méribel and Courchevel.",
        "Ski-in, ski-out across most of the resort: La Croisette, Reberty 1850 and 2000, Les Bruyères.",
        "The Pointe de la Masse side faces the rest of the valley and is where the resort keeps its quieter, longer runs.",
        "Saint-Martin-de-Belleville, 8 km below, is the traditional village end of the same lift network — and a common drop-off on the same transfer.",
      ],
    },

    { type: "titre2", texte: "Skis, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free. The vehicle is sized to the equipment you declare, not to the seat count — a group of six with six ski bags gets the van that takes six ski bags.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free, fitted before we leave the airport, as French law requires for every child under 10. Give us the ages when you book.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "A private transfer leaves when you land and is priced per vehicle: from four people up it usually costs less than buying seats, and it is the only sensible choice for an evening arrival with children before a 27 km climb. A shared transfer costs less per person, with a wait at the airport and stops at Saint-Martin or Val Thorens on the way.",
    },
    {
      type: "paragraphe",
      texte:
        "Book as soon as your flights are confirmed. The Belleville valley fills for Christmas, New Year and both February half-terms, and vehicles are taken weeks in advance.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Chambéry to Les Menuires?",
      reponse:
        "About 1 hour 40 minutes for 114 km, without traffic — the shortest of the four airport routes. On a Saturday in high season, allow an hour more.",
    },
    {
      question: "Which airport is best for Les Menuires?",
      reponse:
        "Chambéry is closest at 114 km, but flies mainly at weekends. Geneva is 153 km and about 2 h 45 with flights all week; Lyon and Grenoble sit between the two. Choose on the flight timetable rather than the distance.",
    },
    {
      question: "Can you drop us in Saint-Martin-de-Belleville or Val Thorens?",
      reponse:
        "Yes — both are on the same road, one below Les Menuires and one above. Give us the exact address when you book and it is quoted as a single journey.",
    },
    {
      question: "Are ski bags included in the price?",
      reponse:
        "Yes, ski and board bags travel free. Declare them when booking so the vehicle sent has room for them.",
    },
    {
      question: "Is the road up the Belleville valley difficult in winter?",
      reponse:
        "It is a mountain road that climbs 27 km from Moûtiers at 480 m to the resort at 1,850 m, cleared and gritted daily. Our vehicles carry winter tyres and chains, required in Savoie from 1 November to 31 March.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Your driver tracks it and adjusts the pick-up to the actual landing time; waiting time is included and there is no surcharge.",
    },
  ],
};
