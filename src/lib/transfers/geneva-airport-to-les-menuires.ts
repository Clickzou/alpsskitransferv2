import type { Transfer } from "./types";

/** Genève → Les Menuires — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToLesMenuires: Transfer = {
  airport: "geneva-airport",
  resort: "les-menuires",

  metaTitre: "Geneva to Les Menuires Transfers | 153 km, 2 h 45",
  metaDescription:
    "Private transfers from Geneva Airport to Les Menuires: 153 km, about 2 h 45 through the Tarentaise. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Les Menuires Transfers",
  chapo:
    "Les Menuires is 153 km from Geneva Airport and about 2 hours 45 minutes by road — further in time than in distance, because the route runs down the motorway to Albertville before turning up the Tarentaise and climbing 27 km of hairpins from Moûtiers. Chambéry is closer, but Geneva has flights every day of the week, which is why most of our Belleville valley passengers land here. The price is fixed per vehicle, tolls and ski bags included, and quoted before you book. Your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway from the airport past Annecy to Albertville, then the Tarentaise road up the valley to Moûtiers at 480 m. From there the climb: 27 km of hairpins through Saint-Martin-de-Belleville to Les Menuires at 1,850 m, with Val Thorens a further 8 km above.",
    },
    {
      type: "paragraphe",
      texte:
        "The whole of the Three Valleys arrives this way, which is what makes the timing on a Saturday so different from the timing on a Tuesday.",
    },

    { type: "titre2", texte: "Saturday, and everything else" },
    {
      type: "paragraphe",
      texte:
        "2 hours 45 minutes is the clear-road time. On a February Saturday, when Val Thorens, Les Menuires, Méribel and Courchevel all change over on the same morning, the Tarentaise between Albertville and Moûtiers slows to a crawl: allow an extra hour, and plan the flight accordingly if you can.",
    },
    {
      type: "paragraphe",
      texte:
        "Fresh snow slows the climb rather than closing it — the road is gritted daily — and the resort access can shut briefly for avalanche control after heavy snowfall. Winter tyres and chains are legally required in Savoie from 1 November to 31 March; our vehicles carry both.",
    },

    { type: "titre2", texte: "Which address in the valley?" },
    {
      type: "liste",
      items: [
        "La Croisette — the main front de neige and most of the apartments.",
        "Reberty 1850 and 2000, and Les Bruyères — ski-in, ski-out above the main resort.",
        "Preyerand, at the lower entrance to the resort.",
        "Saint-Martin-de-Belleville, 8 km below, the traditional village on the same lift network.",
        "Val Thorens, 8 km above, on the same road — a common second stop on the same transfer.",
      ],
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "paragraphe",
      texte:
        "Motorway tolls, ski and snowboard bags, child and booster seats fitted before departure, flight tracking and waiting time. The vehicle is chosen for the equipment you declare, not just the head count — six people with six ski bags and six boot bags is a bigger van than six people with cabin luggage.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "For a family or a group of four and up, the private price per vehicle usually beats individual seats — and after a long day’s travel and a 27 km climb, arriving without three intermediate stops is worth something. A shared transfer costs less per person if your timings are flexible. Book as soon as your flights are confirmed: the Belleville valley is taken weeks ahead for the February half-terms.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Les Menuires transfer?",
      reponse:
        "About 2 hours 45 minutes for 153 km, without traffic. On a Saturday in high season, allow an hour more: the whole Three Valleys changes over on the same morning.",
    },
    {
      question: "Is Chambéry a better airport for Les Menuires?",
      reponse:
        "It is closer — 114 km and about 1 h 40 — but its winter timetable is concentrated at weekends. Geneva flies all week, which is why most passengers use it.",
    },
    {
      question: "Can you drop us in Saint-Martin-de-Belleville or Val Thorens?",
      reponse:
        "Yes, both are on the same road, 8 km below and 8 km above. Give us the exact address when you book.",
    },
    {
      question: "Are tolls and ski bags included?",
      reponse:
        "Yes — motorway tolls, ski and board bags and child seats are all in the quoted price. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
