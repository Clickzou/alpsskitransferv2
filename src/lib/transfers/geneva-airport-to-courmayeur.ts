import type { Transfer } from "./types";

/**
 * Genève → Courmayeur — rédigé à la main.
 *
 * L'une des 15 liaisons au départ de Genève que l'audit signale comme absentes
 * du site actuel. Distances et durées : `src/data/distances.ts`.
 */
export const genevaAirportToCourmayeur: Transfer = {
  airport: "geneva-airport",
  resort: "courmayeur",

  metaTitre: "Geneva to Courmayeur Transfers | 102 km, 1 h 40",
  metaDescription:
    "Private transfers from Geneva Airport to Courmayeur through the Mont Blanc tunnel: 102 km, about 1 h 40. Fixed price per vehicle, tolls included.",
  h1: "Geneva to Courmayeur Transfers",
  chapo:
    "Courmayeur is 102 km from Geneva Airport, about 1 hour 40 minutes — and the journey goes under Mont Blanc rather than around it. The route runs up the Arve valley to Chamonix, through the 11.6 km Mont Blanc tunnel, and down into the Aosta valley on the Italian side. It is one of the shortest international transfers in the Alps: you land in Switzerland, drive through France, and arrive in Italy in under two hours. The price is fixed per vehicle, tunnel toll included, and quoted before you book. Ski and board bags travel free, child seats are provided, and your driver tracks your flight.",

  contenu: [
    { type: "titre2", texte: "The route: Geneva, Chamonix, and under Mont Blanc" },
    {
      type: "paragraphe",
      texte:
        "The first hour is the Chamonix road: motorway to Le Fayet, then the valley up past Les Houches and Chamonix to the tunnel entrance at 1,274 m. The tunnel itself takes about ten minutes at the enforced 70 km/h, with the mandatory 150 m gap between vehicles, and comes out at Entrèves — a couple of kilometres from Courmayeur.",
    },
    {
      type: "paragraphe",
      texte:
        "The tunnel toll is included in the price we quote. It is not a small sum for a minibus, and it is exactly the kind of extra that appears at the end of a journey booked elsewhere.",
    },

    { type: "titre2", texte: "How long it really takes in winter" },
    {
      type: "paragraphe",
      texte:
        "1 hour 40 minutes is the clear-road time, and it holds midweek. Two things stretch it. The A40 between Geneva and Le Fayet is the artery for the whole Mont Blanc area and slows badly on Saturday mornings in February — allow 45 minutes more. And the tunnel itself queues at peak times, particularly Saturday afternoons going south and Sunday evenings coming north.",
    },
    {
      type: "paragraphe",
      texte:
        "The tunnel also closes occasionally for maintenance, always announced in advance. When it does, the alternative is the Grand-Saint-Bernard tunnel via Martigny, which adds about an hour and a half. Your driver knows the day’s status before you land.",
    },

    { type: "titre2", texte: "Border, documents and vehicles" },
    {
      type: "paragraphe",
      texte:
        "You cross two borders on this run — Switzerland to France, France to Italy — and all three countries are in the Schengen area, so there are no routine checks. Carry your passport or identity card even so: spot checks happen at the tunnel, and you need identification for your flight home.",
    },
    {
      type: "paragraphe",
      texte:
        "Our vehicles are insured and equipped for all three countries, with winter tyres and chains as French, Italian and Swiss law require through the season.",
    },

    { type: "titre2", texte: "What the price includes" },
    {
      type: "liste",
      items: [
        "The Mont Blanc tunnel toll and all motorway tolls on the route.",
        "Ski and snowboard bags, at no extra charge.",
        "Child and booster seats, fitted before departure.",
        "Flight tracking and waiting time if you land late.",
        "Door-to-door service: Courmayeur, Entrèves, Dolonne, La Palud or Val Ferret.",
      ],
    },

    { type: "titre2", texte: "Private or shared" },
    {
      type: "paragraphe",
      texte:
        "A private transfer leaves when you land and is priced per vehicle, which from four people up usually beats buying individual seats — and on a route with a tunnel toll, the per-vehicle price is the honest comparison. A shared transfer costs less per person if your timings are flexible.",
    },

    { type: "titre2", texte: "Booking ahead" },
    {
      type: "paragraphe",
      texte:
        "Book as soon as your flights are confirmed. Courmayeur fills for Christmas, New Year and the Italian and British half-terms, and cross-border vehicles are the first to be taken on those Saturdays.",
    },
  ],

  faq: [
    {
      question: "How long does the Geneva to Courmayeur transfer take?",
      reponse:
        "About 1 hour 40 minutes for 102 km through the Mont Blanc tunnel, without traffic. On a February Saturday, allow up to 45 minutes more on the A40 and at the tunnel.",
    },
    {
      question: "Is the Mont Blanc tunnel toll included?",
      reponse:
        "Yes. The tunnel toll and all motorway tolls are in the price we quote — there is nothing to pay on the day.",
    },
    {
      question: "What happens if the tunnel is closed?",
      reponse:
        "Closures are announced in advance. The alternative is the Grand-Saint-Bernard tunnel via Martigny, about an hour and a half longer; your driver checks the day’s status before you land.",
    },
    {
      question: "Do we need passports for this transfer?",
      reponse:
        "There are no routine border checks in the Schengen area, but carry your passport or identity card: spot checks happen at the tunnel and you need identification for your return flight.",
    },
    {
      question: "Can you drop us in Entrèves, Dolonne or Val Ferret?",
      reponse:
        "Yes, all are within a few kilometres of Courmayeur and part of the same transfer. Give us the exact address when you book.",
    },
  ],
};
