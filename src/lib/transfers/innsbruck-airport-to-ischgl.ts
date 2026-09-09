import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/innsbruck-to-ischgl-transfers/ (WordPress, 486 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const innsbruckAirportToIschgl: Transfer = {
  airport: "innsbruck-airport",
  resort: "ischgl",

  metaTitre: "Innsbruck to Ischgl Transfer | Fast & Easy Ski Transport",
  metaDescription: "Book your Innsbruck to Ischgl Transfer now! Fixed prices per vehicle, door-to-door service. Secure your ride today!",
  h1: "Innsbruck to Ischgl Transfer",
  chapo: "Looking for a reliable Innsbruck to Ischgl transfer? Our service ensures a smooth, stress-free journey to your destination. Avoid the hassle of public transport and enjoy a door-to-door service from Innsbruck Airport to Ischgl, one of Austria’s most prestigious ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "The road from Innsbruck Airport to Ischgl runs 100 km and takes about 1 h 25 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Innsbruck to Ischgl" },
    { type: "paragraphe", texte: "At 1 h 25, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Innsbruck the best airport for Ischgl?" },
    { type: "paragraphe", texte: "Yes, on driving time: Innsbruck is the closest of the 3 airports we serve Ischgl from. The next is Salzburg, 1 h 59 further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Innsbruck — 100 km, 1 h 25 (this route)", "Salzburg — 280 km, 3 h 24", "Zurich — 228 km, 3 h 27"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Innsbruck Airport to Ischgl?", reponse: "About 1 h 25 for 100 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Innsbruck to Ischgl cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Ischgl?", reponse: "Innsbruck, at 1 h 25 for 100 km. That is this route. We serve Ischgl from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
