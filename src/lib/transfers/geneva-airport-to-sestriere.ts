import type { Transfer } from "./types";

/** Genève → Sestriere — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToSestriere: Transfer = {
  airport: "geneva-airport",
  resort: "sestriere",

  metaTitre: "Geneva to Sestriere Transfers | 242 km, about 3 h 10",
  metaDescription:
    "Private transfers from Geneva Airport to Sestriere: 242 km, about 3 h 10 through the Fréjus tunnel. Fixed price per vehicle, tunnel toll included.",
  h1: "Geneva to Sestriere Transfers",
  chapo:
    "Sestriere is 242 km from Geneva Airport, about 3 hours 10 minutes: down the Maurienne, through the Fréjus tunnel, then up from Oulx to the pass the resort is built on, at 2,035 m. It is the highest village of the Milky Way and one of the highest in Italy — an Olympic resort with snow to match. Turin is closer, but Geneva flies all week. Price fixed per vehicle with the tunnel toll included, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway past Annecy and Chambéry, up the Maurienne to Modane, and through the 12.9 km Fréjus tunnel to Bardonecchia. From Oulx the road climbs 20 km to the Sestriere pass at 2,035 m — the last stretch is a mountain road, cleared and gritted, and the reason a proper vehicle matters on this run.",
    },
    {
      type: "paragraphe",
      texte:
        "The Fréjus toll is included in the price we quote, as are all motorway tolls on both sides of the border.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "3 h 10 on a clear road, and up to 45 minutes more on a February Saturday when the Maurienne and the tunnel are busy. Sestriere’s altitude means the last climb holds snow: winter tyres and chains are on board, as both French and Italian law require.",
    },

    { type: "titre2", texte: "Sestriere and the Milky Way" },
    {
      type: "paragraphe",
      texte:
        "Sestriere was built in the 1930s by the Agnelli family as Italy’s first purpose-built ski resort, and it hosted the alpine events of the 2006 Turin Olympics. It sits at the centre of the Via Lattea — around 400 km of piste linked with Sauze d’Oulx, Sansicario, Cesana, Claviere and Montgenèvre across the French border, all on one pass.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "The Fréjus tunnel toll and all motorway tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Sestriere, Borgata, Sansicario or Cesana.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Sestriere transfer?",
      reponse:
        "About 3 hours 10 minutes for 242 km through the Fréjus tunnel, including the 20 km climb from Oulx. Allow 45 minutes more on a busy Saturday.",
    },
    {
      question: "Would Turin be quicker?",
      reponse:
        "Yes — around an hour and a half. Geneva is the alternative when Turin has no flight that suits your dates.",
    },
    {
      question: "Can we ski to Montgenèvre from Sestriere?",
      reponse:
        "Yes, on the Via Lattea pass — around 400 km of piste linked across the French-Italian border, including Sauze d’Oulx, Cesana and Claviere.",
    },
    {
      question: "Are the tunnel toll and ski bags included?",
      reponse:
        "Both, along with child seats and all motorway tolls. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
