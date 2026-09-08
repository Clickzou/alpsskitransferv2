import type { Transfer } from "./types";

/** Genève → Champéry — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToChampery: Transfer = {
  airport: "geneva-airport",
  resort: "champery",

  metaTitre: "Geneva to Champéry Transfers | 128 km, 1 h 45",
  metaDescription:
    "Private transfers from Geneva Airport to Champéry, Swiss Portes du Soleil: 128 km, about 1 h 45. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Champéry Transfers",
  chapo:
    "Champéry is 128 km from Geneva Airport, about 1 hour 45 minutes: motorway around the lake to Monthey, then 15 km up the Val-d’Illiez to the village at 1,050 m. It is the Swiss gateway to the Portes du Soleil, the twelve-resort circuit that runs across the border to Morzine, Avoriaz and Châtel — and the approach has no pass to cross, which makes it one of the steadier arrivals in bad weather. Price fixed per vehicle, vignette and tolls included, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "The motorway follows the lake through Lausanne and Montreux, then turns up the Rhône valley to Monthey at 400 m. The last 15 km climb the Val-d’Illiez past Troistorrents and Val-d’Illiez village to Champéry, at the end of the valley under the Dents du Midi.",
    },
    {
      type: "paragraphe",
      texte:
        "You cross one border, at Geneva, and stay in Switzerland the rest of the way — so the Swiss vignette and Swiss winter rules apply, both covered by our vehicles and included in the price.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "1 h 45 on a clear road. The Portes du Soleil changes over on Saturday like everywhere else — allow half an hour more on those mornings in February. The valley road is cleared and gritted daily and the climb is gentle; snow slows this transfer rather than threatening it.",
    },

    { type: "titre2", texte: "The Swiss side of the Portes du Soleil" },
    {
      type: "paragraphe",
      texte:
        "Champéry’s cable car climbs to Planachaux and into the circuit, from where you can ski to Avoriaz and Morzine in France on the same pass. Les Crosets, Champoussin and Morgins — the other Swiss villages of the circuit — are within twenty minutes by road, and we serve all of them on this transfer.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Champéry, Les Crosets, Champoussin or Morgins.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Champéry transfer?",
      reponse:
        "About 1 hour 45 minutes for 128 km, motorway then a valley road with no high pass. Allow half an hour more on a February Saturday.",
    },
    {
      question: "Can we ski from Champéry to Avoriaz and Morzine?",
      reponse:
        "Yes — Champéry is on the Portes du Soleil pass, which covers twelve resorts on both sides of the border. The cable car from the village takes you into the circuit.",
    },
    {
      question: "Do you serve Les Crosets, Champoussin and Morgins?",
      reponse:
        "All of them, on the same transfer. They are within about twenty minutes of Champéry; give us the exact address at booking.",
    },
    {
      question: "Are the vignette and tolls included?",
      reponse:
        "Yes, along with ski bags and child seats. Nothing is payable on the day.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
