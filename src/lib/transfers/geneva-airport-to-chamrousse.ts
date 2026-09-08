import type { Transfer } from "./types";

/** Genève → Chamrousse — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToChamrousse: Transfer = {
  airport: "geneva-airport",
  resort: "chamrousse",

  metaTitre: "Geneva to Chamrousse Transfers | 174 km, 2 h 20",
  metaDescription:
    "Private transfers from Geneva Airport to Chamrousse: 174 km, about 2 h 20 via Grenoble. Fixed price per vehicle, ski bags and child seats included.",
  h1: "Geneva to Chamrousse Transfers",
  chapo:
    "Chamrousse is 174 km from Geneva Airport, about 2 hours 20 minutes: motorway south past Chambéry to Grenoble, then some 30 km of climb through Uriage to the resort at 1,700 m. Grenoble’s own airport is closer, but it flies mainly at weekends in winter, and Geneva has flights every day — which is why this route exists. The price is fixed per vehicle, tolls included, quoted before you book, with ski bags and child seats included and your flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway from the airport past Annecy and Chambéry to Grenoble at 210 m, then the climb: about 30 km and 1,400 m of ascent through Uriage-les-Bains and a long series of forest hairpins to Recoin and Roche-Béranger.",
    },
    {
      type: "paragraphe",
      texte:
        "The first hour and a half are fast; the last 45 minutes are a genuine mountain road, gritted daily but slow after fresh snow.",
    },

    { type: "titre2", texte: "Is Geneva the right airport?" },
    {
      type: "paragraphe",
      texte:
        "Grenoble Alpes-Isère is 78 km away, about 1 h 10, and Lyon 126 km, about 1 h 45 — both shorter. Geneva earns its place on flight choice: it flies all week from most European cities, while Grenoble and Chambéry concentrate their winter traffic on Saturdays. If your dates are midweek, Geneva is often the only sensible answer.",
    },

    { type: "titre2", texte: "Which part of Chamrousse?" },
    {
      type: "paragraphe",
      texte:
        "The resort has three centres — Recoin at 1,650 m, Le Bachat, and Roche-Béranger at 1,750 m — a few minutes apart on the same road and the same lift pass. Give us the exact address at booking; at midnight in February the difference matters.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "All motorway tolls on the route.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Recoin, Le Bachat or Roche-Béranger.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Chamrousse transfer?",
      reponse:
        "About 2 hours 20 minutes for 174 km, of which the last 30 km climb 1,400 m from the Isère valley. Allow more after fresh snow.",
    },
    {
      question: "Would Grenoble or Lyon be quicker?",
      reponse:
        "Yes — Grenoble is about 1 h 10 and Lyon about 1 h 45. Geneva is the answer when their weekend-heavy winter timetables do not match your dates.",
    },
    {
      question: "Which part of the resort will we be dropped at?",
      reponse:
        "Recoin, Le Bachat or Roche-Béranger, whichever your accommodation is in. Give us the exact address at booking.",
    },
    {
      question: "Are tolls and ski bags included?",
      reponse:
        "Yes, along with child seats. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
