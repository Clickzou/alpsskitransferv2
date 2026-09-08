import type { Transfer } from "./types";

/** Genève → Saint-Gervais — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToSaintGervais: Transfer = {
  airport: "geneva-airport",
  resort: "saint-gervais",

  metaTitre: "Geneva to Saint-Gervais Transfers | 77 km, 1 h 15",
  metaDescription:
    "Private transfers from Geneva Airport to Saint-Gervais-les-Bains: 77 km, about 1 h 15. Fixed price per vehicle, ski bags and child seats included.",
  h1: "Geneva to Saint-Gervais Transfers",
  chapo:
    "Saint-Gervais-les-Bains is 77 km from Geneva Airport, about 1 hour 15 minutes — one of the shortest transfers to a Mont Blanc resort, and shorter than Chamonix by twenty minutes. The route is motorway to Le Fayet, at the foot of the village, with only a short climb at the end. The price is fixed per vehicle and quoted before you book, motorway tolls, ski bags and child seats included, and your driver tracks your flight so a delayed landing costs you nothing.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "From the airport the A40 runs south-east through Annemasse, Bonneville and Sallanches to Le Fayet, at 580 m, where the Mont Blanc tramway and the thermal baths are. Saint-Gervais village is 3 km and 250 m above it, on a short climb. Saint-Nicolas-de-Véroce, higher again on the Megève side, adds another fifteen minutes on a narrower road.",
    },
    {
      type: "paragraphe",
      texte:
        "It is the same motorway as for Chamonix, without the last 20 km up the valley — which is why this transfer is consistently quicker than its more famous neighbour.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "1 hour 15 minutes holds midweek and in the evening. The exception is Saturday morning in February, when the A40 carries the whole Mont Blanc valley’s changeover: allow 45 minutes more, and let us have your flight number so the pick-up follows the actual landing rather than a plan.",
    },
    {
      type: "paragraphe",
      texte:
        "The road is a cleared main road at low altitude, so heavy snow slows this transfer rather than threatening it. Our vehicles carry winter tyres and chains, as Haute-Savoie requires from 1 November to 31 March.",
    },

    { type: "titre2", texte: "Where exactly we drop you" },
    {
      type: "liste",
      items: [
        "Le Fayet, 580 m — the station, the thermal baths and the Tramway du Mont-Blanc.",
        "Saint-Gervais village, 850 m — the centre, the Bettex gondola and most hotels.",
        "Saint-Nicolas-de-Véroce, 1,100 m — a hamlet on a narrow road, 8 km further.",
        "Le Bettex, on the ski area itself, when the road is open.",
        "Combloux and Megève, on the same approach, if you are staying on the Evasion Mont-Blanc pass.",
      ],
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "paragraphe",
      texte:
        "Motorway tolls, ski and snowboard bags, child and booster seats, flight tracking and waiting time. The vehicle is sized to the equipment you declare rather than to the number of seats, so a family of five with five ski bags gets a van rather than a car with the boot lid tied down.",
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "On a transfer this short, a private vehicle is often barely more than the equivalent seats, and it leaves the moment you land. A shared transfer is cheaper per person with flexible timings. Book as soon as your flights are set — the Mont Blanc valley fills from Christmas to March.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Saint-Gervais transfer?",
      reponse:
        "About 1 hour 15 minutes for 77 km, motorway most of the way. Allow up to 45 minutes more on a Saturday in February.",
    },
    {
      question: "Is Saint-Gervais quicker to reach than Chamonix?",
      reponse:
        "Yes, by about twenty minutes: the two share the same motorway, but Chamonix is a further 20 km up the valley.",
    },
    {
      question: "Can you drop us at Saint-Nicolas-de-Véroce?",
      reponse:
        "Yes. It is 8 km above the village on a narrower road and adds about fifteen minutes — tell us at booking so the right vehicle is sent.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare your bags and the ages of any children when booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
