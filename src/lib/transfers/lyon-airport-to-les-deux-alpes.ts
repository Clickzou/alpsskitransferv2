import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-les-deux-alpes-transfers/ (WordPress, 422 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLesDeuxAlpes: Transfer = {
  airport: "lyon-airport",
  resort: "les-deux-alpes",

  metaTitre: "Lyon to Les Deux Alpes Transfers | Book Your Ski Ride Now",
  metaDescription: "Book your Lyon to Les Deux Alpes transfer now! Private, door to door, comfortable and direct. Secure your ski transfer today!",
  h1: "Lyon to Les Deux Alpes Transfers",
  chapo: "If you’re looking for Lyon to Les Deux Alpes transfers, we offer private transfers to suit your needs. Whether you’re traveling solo, with family, or in a group, our transfer service ensures a comfortable, stress-free journey to one of the most popular ski resorts in the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "The road from Lyon Airport to Les Deux Alpes runs 158 km and takes about 2 h 14 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Lyon to Les Deux Alpes" },
    { type: "paragraphe", texte: "2 h 14 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Lyon the best airport for Les Deux Alpes?" },
    { type: "paragraphe", texte: "Not the closest: Grenoble-Isère reaches Les Deux Alpes in 1 h 42, 32 min less than from Lyon. That said, Lyon carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Grenoble-Isère — 110 km, 1 h 42", "Chambéry-Savoie — 135 km, 1 h 59", "Lyon — 158 km, 2 h 14 (this route)", "Geneva — 220 km, 3 h 04"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Lyon Airport to Les Deux Alpes?", reponse: "About 2 h 14 for 158 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Lyon to Les Deux Alpes cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Les Deux Alpes?", reponse: "Grenoble-Isère, at 1 h 42 for 110 km. From Lyon it is 2 h 14. We serve Les Deux Alpes from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
