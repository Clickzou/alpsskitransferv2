import type { Transfer } from "./types";

/** Genève → Sauze d'Oulx — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToSauzeDoulx: Transfer = {
  airport: "geneva-airport",
  resort: "sauze-doulx",

  metaTitre: "Geneva to Sauze d’Oulx Transfers | 227 km, about 3 h",
  metaDescription:
    "Private transfers from Geneva Airport to Sauze d’Oulx in the Milky Way: 227 km, about 3 hours through the Fréjus tunnel. Tolls included.",
  h1: "Geneva to Sauze d’Oulx Transfers",
  chapo:
    "Sauze d’Oulx is 227 km from Geneva Airport, about 3 hours: motorway south through Chambéry and down the Maurienne, through the Fréjus tunnel into Italy, and up the last 6 km from Oulx to the village at 1,509 m. Turin is much closer, but Geneva flies all week from across Europe — and this is the route to take when the Turin timetable does not fit. Price fixed per vehicle with the Fréjus toll included, quoted before you book, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "titre2", texte: "The route" },
    {
      type: "paragraphe",
      texte:
        "Motorway from the airport past Annecy and Chambéry, then up the Maurienne valley to Modane and the Fréjus road tunnel — 12.9 km under the border, with an enforced speed limit and a compulsory gap between vehicles. You come out at Bardonecchia in Italy, and Oulx is fifteen minutes further; the village sits 6 km above it.",
    },
    {
      type: "paragraphe",
      texte:
        "The Fréjus toll is included in what we quote. On a minibus it is a significant sum, and it belongs in the price rather than as an extra at the end.",
    },

    { type: "titre2", texte: "Is Geneva the right airport?" },
    {
      type: "paragraphe",
      texte:
        "Turin is 85 km from Sauze d’Oulx, a little over an hour, and usually the cheaper flight from the UK. Geneva makes sense when your dates, your airline or a combined trip point that way — and it avoids the Turin ring road on a Saturday, which is not nothing.",
    },

    { type: "titre2", texte: "Winter timings and the border" },
    {
      type: "paragraphe",
      texte:
        "3 hours on a clear road; add 45 minutes on a February Saturday, when both the Maurienne and the tunnel queue. France and Italy are both in the Schengen area so there are no routine checks, but carry your passport or identity card — spot checks happen at the tunnel. Our vehicles are insured for both countries and carry winter tyres and chains.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "The Fréjus tunnel toll and all motorway tolls.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door in Sauze d’Oulx, Oulx, Sportinia or Jouvenceaux.",
      ],
    },
  ],

  faq: [
    {
      question: "How long is the Geneva to Sauze d’Oulx transfer?",
      reponse:
        "About 3 hours for 227 km through the Fréjus tunnel. Allow 45 minutes more on a Saturday in February.",
    },
    {
      question: "Would Turin be quicker?",
      reponse:
        "Considerably — around an hour and a quarter for 85 km. Geneva is the alternative when Turin has no flight on your dates.",
    },
    {
      question: "Is the Fréjus tunnel toll included?",
      reponse:
        "Yes, along with all motorway tolls. Nothing is payable on the day.",
    },
    {
      question: "Can you drop us in Sestriere or Claviere on the same run?",
      reponse:
        "Yes — both are on the Milky Way circuit and within half an hour of Oulx. Tell us the address at booking.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
