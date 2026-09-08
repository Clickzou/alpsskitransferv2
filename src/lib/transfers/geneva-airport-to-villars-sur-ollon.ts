import type { Transfer } from "./types";

/** Genève → Villars-sur-Ollon — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToVillarsSurOllon: Transfer = {
  airport: "geneva-airport",
  resort: "villars-sur-ollon",

  metaTitre: "Geneva to Villars-sur-Ollon Transfers | 123 km, 1 h 45",
  metaDescription:
    "Private transfers from Geneva Airport to Villars-sur-Ollon: 123 km, about 1 h 45 along Lake Geneva. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Villars-sur-Ollon Transfers",
  chapo:
    "Villars-sur-Ollon is 123 km from Geneva Airport, about 1 hour 45 minutes — one of the shortest transfers to a Swiss resort from an international airport. The route is motorway along Lake Geneva to Aigle, then a 10 km climb to the village at 1,300 m, on its terrace above the Rhône valley. The price is fixed per vehicle, vignette and tolls included, quoted before you book, with ski bags and child seats included and your flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway from the airport along the north shore of the lake through Lausanne, Vevey and Montreux to Aigle at 400 m — an hour and a quarter of easy Swiss motorway with the lake beside it. The climb from Aigle is 10 km of hairpins to Villars at 1,300 m, and continues to Bretaye by rack railway.",
    },
    {
      type: "paragraphe",
      texte:
        "It is a short, well-maintained climb, cleared and gritted daily, and one of the more dependable Swiss arrivals in bad weather.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "1 h 45 holds most days. Add half an hour on a Saturday in high season. Our vehicles carry winter tyres, chains and the Swiss motorway vignette, and the vignette and tolls are in your price.",
    },

    { type: "titre2", texte: "Villars, Gryon and Les Diablerets" },
    {
      type: "paragraphe",
      texte:
        "Villars shares its lift network with Gryon, 4 km away, and with Les Diablerets over the Col de la Croix — the Villars-Gryon-Diablerets pass covers about 125 km of piste and the Glacier 3000. All three are on our route; give us the exact address at booking, because Les Diablerets is reached by a different valley in winter when the col is closed.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Villars, Gryon, Chesières or Arveyes.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Villars transfer?",
      reponse:
        "About 1 hour 45 minutes for 123 km, motorway along the lake then a 10 km climb from Aigle. Allow half an hour more on a busy Saturday.",
    },
    {
      question: "Do you also serve Gryon and Les Diablerets?",
      reponse:
        "Yes. Gryon is 4 km from Villars on the same road; Les Diablerets shares the lift pass but is reached by another valley in winter, when the Col de la Croix is closed.",
    },
    {
      question: "Is the Swiss vignette included?",
      reponse:
        "Yes, along with all tolls, ski bags and child seats. Nothing is payable on the day.",
    },
    {
      question: "Is the road up from Aigle difficult in winter?",
      reponse:
        "It is 10 km of hairpins, cleared and gritted daily, and short by Alpine standards. Our vehicles carry winter tyres and chains.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
