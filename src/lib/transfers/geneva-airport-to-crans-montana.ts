import type { Transfer } from "./types";

/** Genève → Crans-Montana — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToCransMontana: Transfer = {
  airport: "geneva-airport",
  resort: "crans-montana",

  metaTitre: "Geneva to Crans-Montana Transfers | 183 km, 2 h 25",
  metaDescription:
    "Private transfers from Geneva Airport to Crans-Montana: 183 km, about 2 h 25 up the Rhône valley. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Crans-Montana Transfers",
  chapo:
    "Crans-Montana is 183 km from Geneva Airport, about 2 hours 25 minutes: motorway along Lake Geneva and up the Rhône valley to Sierre, then 15 km of hairpins climbing 950 m to the terrace the resort sits on. It is the classic Valais approach — flat, fast and Swiss for two hours, then a genuine mountain road for twenty minutes. The price is fixed per vehicle, vignette and tolls included, quoted before you book, with ski bags and child seats included and your flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "From the airport the motorway runs along the north shore of Lake Geneva through Lausanne and Montreux, then turns up the Rhône valley past Martigny and Sion to Sierre at 530 m. The climb starts there: 15 km of well-engineered hairpins to Montana and Crans at 1,500 m, with the valley opening out behind you.",
    },
    {
      type: "paragraphe",
      texte:
        "A funicular also runs from Sierre to Montana in twelve minutes. It is the fallback the locals use when the road is at its worst, and we will put you on it with your luggage rather than sit in a closure.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "2 hours 25 minutes is the clear-road time and it holds most days: the Rhône valley motorway is cleared and gritted as routine. The climb from Sierre is the variable — heavy snow slows it, and it is the part of the journey that needs winter tyres and chains, which our vehicles carry.",
    },
    {
      type: "paragraphe",
      texte:
        "Allow half an hour more on a Saturday in high season, and give us your flight number so the pick-up follows the actual landing.",
    },

    { type: "titre2", texte: "Crans or Montana?" },
    {
      type: "paragraphe",
      texte:
        "The resort is two villages a couple of kilometres apart on the same terrace, sharing one lift pass: Crans to the west, Montana to the east, with Bluche, Aminona and Mollens further along the same road. They are not interchangeable at midnight with luggage — give us the exact address at booking.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "Swiss motorway vignette and all tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Crans, Montana, Bluche or Aminona.",
      ],
    },

    { type: "titre2", texte: "Private or shared, and when to book" },
    {
      type: "paragraphe",
      texte:
        "A private vehicle leaves on your landing and is priced per vehicle — from four people up, usually the cheaper option as well as the faster one. Book as soon as your flights are set: the Valais fills for Christmas and the February half-terms, and the long Geneva runs go first.",
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Crans-Montana transfer?",
      reponse:
        "About 2 hours 25 minutes for 183 km, including the 15 km climb from Sierre. Allow half an hour more on a busy Saturday or after heavy snow.",
    },
    {
      question: "Should we be dropped in Crans or in Montana?",
      reponse:
        "Whichever your accommodation is in — they are two villages a couple of kilometres apart on the same terrace and the same lift pass. Give us the exact address.",
    },
    {
      question: "What happens if the road from Sierre is closed?",
      reponse:
        "The funicular from Sierre to Montana takes twelve minutes and runs through the day. If the road is closed we put you on it with your luggage rather than wait it out.",
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
