import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-solden-transfers/ (WordPress, 408 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToSolden: Transfer = {
  airport: "zurich-airport",
  resort: "solden",

  metaTitre: "Zurich to Solden Transfer | Book Your Ride Now",
  metaDescription: "Book your Zurich to Solden transfer today! Private transfers, best prices, and 24/7 service. Secure your ski transfer now",
  h1: "Zurich to Solden Transfers",
  chapo: "Looking for a Zurich to Sölden transfer that guarantees comfort, efficiency, and reliability? Whether you're heading to Sölden for its world-class skiing or breathtaking Alpine scenery, our transfer service ensures a smooth journey from Zurich Airport or city center straight to your accommodation. Avoid the hassle of renting a car or dealing with public transport—we offer private transfers in three vehicle categories, providing door-to-door service at the best rates.",

  contenu: [
    { type: "paragraphe", texte: "The road from Zurich Airport to Sölden runs 272 km and takes about 3 h 59 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in Austria. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Zurich to Sölden" },
    { type: "paragraphe", texte: "At 3 h 59, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Zurich the best airport for Sölden?" },
    { type: "paragraphe", texte: "Not the closest: Innsbruck reaches Sölden in 1 h 13, 2 h 46 less than from Zurich. That said, Zurich carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Innsbruck — 84 km, 1 h 13", "Salzburg — 263 km, 3 h 12", "Zurich — 272 km, 3 h 59 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Zurich Airport to Sölden?", reponse: "About 3 h 59 for 272 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Zurich to Sölden cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Sölden?", reponse: "Innsbruck, at 1 h 13 for 84 km. From Zurich it is 3 h 59. We serve Sölden from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
