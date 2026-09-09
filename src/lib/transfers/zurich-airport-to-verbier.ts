import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-verbier-transfers/ (WordPress, 516 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToVerbier: Transfer = {
  airport: "zurich-airport",
  resort: "verbier",

  metaTitre: "Zurich to Verbier Transfers | Book Now & Travel Comfortably",
  metaDescription: "Book your Zurich to Verbier transfers today! Choose private transport for a smooth, comfortable, and direct journey to the Swiss Alps.",
  h1: "Zurich to St Moritz Transfers",
  chapo: "Looking for Zurich to Verbier transfers that guarantee a smooth, comfortable, and stress-free journey? We provide the best door-to-door transport solutions for your ski trip. Departing from Zurich Airport or the city center, our professional drivers ensure a safe, timely, and relaxed journey to Verbier, one of Switzerland’s most exclusive ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "The road from Zurich Airport to Verbier runs 288 km and takes about 3 h 48 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Zurich to Verbier" },
    { type: "paragraphe", texte: "At 3 h 48, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Zurich the best airport for Verbier?" },
    { type: "paragraphe", texte: "Not the closest: Geneva reaches Verbier in 2 h 09, 1 h 39 less than from Zurich. That said, Zurich carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Geneva — 163 km, 2 h 09", "Zurich — 288 km, 3 h 48 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Zurich Airport to Verbier?", reponse: "About 3 h 48 for 288 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Zurich to Verbier cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Verbier?", reponse: "Geneva, at 2 h 09 for 163 km. From Zurich it is 3 h 48. We serve Verbier from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
