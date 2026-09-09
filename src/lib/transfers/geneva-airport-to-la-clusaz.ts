import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-la-clusaz-transfers/ (WordPress, 401 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLaClusaz: Transfer = {
  airport: "geneva-airport",
  resort: "la-clusaz",

  metaTitre: "Geneva to La Clusaz Transfer – Fast & Affordable Ride",
  metaDescription: "Book your Geneva to La Clusaz transfer today! Fast, reliable & affordable private transfers. Secure your ski transfer now!",
  h1: "Geneva to La Clusaz Transfers",
  chapo: "Looking for a Geneva to La Clusaz Transfer? We ensure a comfortable, stress-free journey from Geneva Airport to La Clusaz, one of the most charming ski resorts in the French Alps. Avoid the hassle of public transport, long waiting times, or multiple stops—our service guarantees door-to-door convenience. With our professional drivers and modern fleet, you’ll reach La Clusaz quickly and safely, ready to enjoy your ski holiday.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to La Clusaz runs 59 km and takes about 1 h 12 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in France. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Geneva to La Clusaz" },
    { type: "paragraphe", texte: "At 1 h 12, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for La Clusaz?" },
    { type: "paragraphe", texte: "Not the closest: Chambéry-Savoie reaches La Clusaz in 1 h 11, 1 min less than from Geneva. That said, Geneva carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Chambéry-Savoie — 83 km, 1 h 11", "Geneva — 59 km, 1 h 12 (this route)", "Grenoble-Isère — 162 km, 1 h 59"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to La Clusaz?", reponse: "About 1 h 12 for 59 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to La Clusaz cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to La Clusaz?", reponse: "Chambéry-Savoie, at 1 h 11 for 83 km. From Geneva it is 1 h 12. We serve La Clusaz from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
