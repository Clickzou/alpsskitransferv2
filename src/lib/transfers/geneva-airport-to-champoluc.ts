import type { Transfer } from "./types";

/** Genève → Champoluc — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToChampoluc: Transfer = {
  airport: "geneva-airport",
  resort: "champoluc",

  metaTitre: "Geneva to Champoluc Transfers | 207 km, 3 h 05",
  metaDescription:
    "Private transfers from Geneva Airport to Champoluc and Monterosa Ski: 207 km, about 3 h 05 through the Mont Blanc tunnel. Tunnel toll included.",
  h1: "Geneva to Champoluc Transfers",
  chapo:
    "Champoluc is 207 km from Geneva Airport, about 3 hours 05 minutes: the Chamonix road, the Mont Blanc tunnel, then the length of the Aosta valley before turning 30 km up the Val d’Ayas. It is the long way into Monterosa Ski — Turin and Milan are closer — but it is the route to take when Geneva has the flight and Italy does not. The price is fixed per vehicle with the tunnel toll included, quoted before you book, ski bags and child seats included, and your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway to Le Fayet, the valley up to Chamonix, the 11.6 km tunnel under Mont Blanc, then the Aosta valley motorway east past Aosta itself to Verrès. From there the road turns north up the Val d’Ayas for 30 km to Champoluc at 1,570 m.",
    },
    {
      type: "paragraphe",
      texte:
        "The tunnel toll is included in what we quote — on a minibus it is a substantial sum, and it belongs in the price rather than in a surprise at the end.",
    },

    { type: "titre2", texte: "Is Geneva the right airport?" },
    {
      type: "paragraphe",
      texte:
        "Honestly, often not. Turin is 109 km from Champoluc, about 1 h 30, and Milan Malpensa 169 km, about 2 h 10 — both shorter and usually cheaper. Geneva earns its place when your flight times, your airline or your onward plans point that way, or when you are combining Monterosa with a few days in Chamonix.",
    },
    {
      type: "paragraphe",
      texte:
        "We run all three, so the comparison is worth making before you book the flight rather than after.",
    },

    { type: "titre2", texte: "Winter timings" },
    {
      type: "paragraphe",
      texte:
        "3 h 05 on a clear road. The A40 and the tunnel both queue on February Saturdays — allow 45 minutes more. Our vehicles are insured for all three countries and carry winter tyres and chains, as Italy requires on Alpine roads from mid-November to mid-April.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "The Mont Blanc tunnel toll and all motorway tolls.",
        "Ski and snowboard bags, and freeride or touring kit — declare it, this valley attracts it.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time.",
        "Door-to-door in Champoluc, Antagnod, Brusson or Saint-Jacques.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Champoluc transfer?",
      reponse:
        "About 3 hours 05 minutes for 207 km through the Mont Blanc tunnel and down the Aosta valley. Allow 45 minutes more on a busy Saturday.",
    },
    {
      question: "Would Turin or Milan be quicker?",
      reponse:
        "Yes. Turin is about 1 h 30 away and Milan Malpensa about 2 h 10, both usually with cheaper fares. Geneva makes sense when its flights suit you better.",
    },
    {
      question: "Is the Mont Blanc tunnel toll included?",
      reponse:
        "Yes, along with all motorway tolls. Nothing is payable on the day.",
    },
    {
      question: "Can you drop us in Gressoney or Alagna instead?",
      reponse:
        "Yes — they are the other two valleys of Monterosa Ski, reached by different roads off the same motorway. Tell us which at booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
