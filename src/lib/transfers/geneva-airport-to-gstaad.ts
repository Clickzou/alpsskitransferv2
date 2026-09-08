import type { Transfer } from "./types";

/** Genève → Gstaad — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToGstaad: Transfer = {
  airport: "geneva-airport",
  resort: "gstaad",

  metaTitre: "Geneva to Gstaad Transfers | 151 km, about 2 h 10",
  metaDescription:
    "Private transfers from Geneva Airport to Gstaad: 151 km, about 2 h 10 through the Pays-d’Enhaut. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Gstaad Transfers",
  chapo:
    "Gstaad is 151 km from Geneva Airport, about 2 hours 10 minutes: motorway along Lake Geneva to Montreux, then the Pays-d’Enhaut road over the Col des Mosses or through Château-d’Œx to the Saanenland. The village sits at 1,050 m and the drive is one of the prettier ones in Switzerland — narrow valleys, wooden chalets, no motorway for the last hour. Price fixed per vehicle, vignette and tolls included, quoted before you book, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "The motorway follows the lake to Montreux, then the road climbs into the Pays-d’Enhaut — either over the Col des Mosses at 1,445 m or by Château-d’Œx, depending on conditions — and drops into the Saanenland at Saanen, a couple of kilometres from Gstaad.",
    },
    {
      type: "paragraphe",
      texte:
        "The last hour is a mountain road rather than a motorway: two lanes, villages, and a col that is kept open all winter but occasionally closed for snow clearance. Your driver takes whichever way is running on the day.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "2 h 10 on a clear road, and this is a route where weather matters more than traffic: the Mosses in a snowstorm is slow going, and the alternative through Château-d’Œx adds twenty minutes. Winter tyres and chains are on board, and the Swiss vignette and tolls are in your price.",
    },

    { type: "titre2", texte: "Gstaad and the villages around it" },
    {
      type: "paragraphe",
      texte:
        "The Gstaad ski area spreads over ten villages and 200 km of piste: Saanenmöser and Schönried above the valley, Rougemont and Château-d’Œx to the west, Zweisimmen and the Glacier 3000 at Les Diablerets. Almost all of them are on our approach — tell us the exact address and it is quoted as one transfer.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Gstaad, Saanen, Schönried, Saanenmöser or Rougemont.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Gstaad transfer?",
      reponse:
        "About 2 hours 10 minutes for 151 km. The last hour is a mountain road rather than motorway, so allow more in heavy snow.",
    },
    {
      question: "Which way does the driver go?",
      reponse:
        "Over the Col des Mosses, or through Château-d’Œx when the col is being cleared — about twenty minutes longer. Your driver takes whichever is running on the day.",
    },
    {
      question: "Do you serve Saanen, Schönried and Rougemont?",
      reponse:
        "Yes, all are in the same valley and on the Gstaad lift pass. Give us the exact address when you book.",
    },
    {
      question: "Are the vignette and tolls included?",
      reponse:
        "Yes, with ski bags and child seats. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
