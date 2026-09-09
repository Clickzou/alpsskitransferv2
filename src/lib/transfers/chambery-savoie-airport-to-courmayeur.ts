import type { Transfer } from "./types";

/**
 * Page de trajet créée par `npm run trajets:creer` : cette liaison n'existait
 * pas sur le WordPress, alors qu'elle est courte (1 h 51) et part d'un
 * aéroport majeur. Metas et chapô générés ; le corps et la FAQ viennent de
 * `npm run trajets:rediger`, depuis les distances mesurées.
 */
export const chamberySavoieAirportToCourmayeur: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "courmayeur",

  metaTitre: "Chambéry-Savoie to Courmayeur Ski Transfers | Fixed Price",
  metaDescription: "Private transfer from Chambéry-Savoie Airport to Courmayeur: 151 km, about 1 h 51. Fixed price per vehicle, flight tracking and ski carriage included.",
  h1: "Chambéry-Savoie to Courmayeur Transfers",
  chapo: "A private transfer from Chambéry-Savoie Airport to Courmayeur covers 151 km in about 1 h 51. Your driver meets you in the arrivals hall and takes you straight to your accommodation, at a price fixed before you book.",

  contenu: [
    { type: "paragraphe", texte: "The road from Chambéry-Savoie Airport to Courmayeur runs 151 km and takes about 1 h 51 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in France and finish in Italy. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Chambéry-Savoie to Courmayeur" },
    { type: "paragraphe", texte: "1 h 51 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Chambéry-Savoie the best airport for Courmayeur?" },
    { type: "paragraphe", texte: "Not the closest: Geneva reaches Courmayeur in 1 h 36, 15 min less than from Chambéry-Savoie. That said, Chambéry-Savoie carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Geneva — 102 km, 1 h 36", "Chambéry-Savoie — 151 km, 1 h 51 (this route)", "Turin — 158 km, 1 h 59"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Chambéry-Savoie Airport to Courmayeur?", reponse: "About 1 h 51 for 151 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Chambéry-Savoie to Courmayeur cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Courmayeur?", reponse: "Geneva, at 1 h 36 for 102 km. From Chambéry-Savoie it is 1 h 51. We serve Courmayeur from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
