import type { Transfer } from "./types";

/** Genève → La Thuile — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToLaThuile: Transfer = {
  airport: "geneva-airport",
  resort: "la-thuile",

  metaTitre: "Geneva to La Thuile Transfers | 133 km via Mont Blanc",
  metaDescription:
    "Private transfers from Geneva Airport to La Thuile through the Mont Blanc tunnel: 133 km, about 2 h 30. Fixed price per vehicle, tunnel toll included.",
  h1: "Geneva to La Thuile Transfers",
  chapo:
    "La Thuile is 133 km from Geneva Airport, about 2 hours 30 minutes through the Mont Blanc tunnel and down the Aosta valley. The village sits at 1,441 m at the foot of the Petit-Saint-Bernard pass, on the Italian side of the border it shares with La Rosière — the two are linked on skis by the Espace San Bernardo. The price is fixed per vehicle with the tunnel toll included, quoted before you book, ski bags and child seats included, and your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "The first hour is the Chamonix road, then the Mont Blanc tunnel — 11.6 km at an enforced 70 km/h — and out at Entrèves in Italy. From there the Aosta valley motorway runs down to Morgex, and the last 15 km climb to La Thuile at 1,441 m.",
    },
    {
      type: "paragraphe",
      texte:
        "The tunnel toll is included in what we quote. It is a real cost on a minibus, and the kind of extra that turns up at the end of a cheaper-looking booking made elsewhere.",
    },

    { type: "titre2", texte: "Winter timings and the pass that closes" },
    {
      type: "paragraphe",
      texte:
        "2 h 30 is the clear-road time. Add 45 minutes on a February Saturday, when the A40 to the tunnel and the tunnel itself both queue. The Petit-Saint-Bernard pass, above the village, is closed all winter — so there is no shortcut from the French side, and a transfer from Bourg-Saint-Maurice, 30 km away as the crow flies, is a three-hour drive round.",
    },
    {
      type: "paragraphe",
      texte:
        "Our vehicles are insured for France, Italy and Switzerland, and carry winter tyres and chains as all three require.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "The Mont Blanc tunnel toll and all motorway tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in La Thuile village, Entrèves or Pré-Saint-Didier.",
      ],
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "On a cross-border run with a tunnel, the per-vehicle price is the honest comparison — and it is usually the cheaper one from four people up. Book early: cross-border vehicles are the first taken on the February Saturdays.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to La Thuile transfer?",
      reponse:
        "About 2 hours 30 minutes for 133 km through the Mont Blanc tunnel. Allow 45 minutes more on a Saturday in February.",
    },
    {
      question: "Is the tunnel toll included?",
      reponse:
        "Yes, the Mont Blanc tunnel toll and all motorway tolls are in the quoted price.",
    },
    {
      question: "Can we reach La Thuile from the French side over the pass?",
      reponse:
        "Not in winter. The Petit-Saint-Bernard pass is closed from autumn to late spring; the only way in is through the Mont Blanc tunnel and the Aosta valley.",
    },
    {
      question: "Can we ski across to La Rosière?",
      reponse:
        "Yes — the Espace San Bernardo links the two resorts across the border on one pass. Crossing on skis takes a morning; crossing by road takes three hours.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
