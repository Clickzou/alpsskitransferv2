import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-st-anton-am-arlberg-transfers/ (WordPress, 436 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToStAntonAmArlberg: Transfer = {
  airport: "zurich-airport",
  resort: "st-anton-am-arlberg",

  metaTitre: "Zurich to St Anton am Arlberg Transfers – Book Now",
  metaDescription: "Need a Zurich to St Anton am Arlberg transfer? Book a private ride now for a fast, safe & direct journey to your ski resort!",
  h1: "Zurich to St Anton am Arlberg Transfers",
  chapo: "Looking for a Zurich to St Anton am Arlberg transfer that guarantees comfort, reliability, and convenience? Whether you're traveling solo, as a family, or in a group, we offer private transfers to suit your needs. Skip the hassle of public transport and enjoy a direct, door-to-door service with professional drivers who ensure a stress-free journey from Zurich Airport to St Anton am Arlberg.",

  contenu: [
    { type: "paragraphe", texte: "The road from Zurich Airport to St. Anton am Arlberg runs 190 km and takes about 2 h 51 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in Austria. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Zurich to St. Anton am Arlberg" },
    { type: "paragraphe", texte: "2 h 51 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Zurich the best airport for St. Anton am Arlberg?" },
    { type: "paragraphe", texte: "Not the closest: Innsbruck reaches St. Anton am Arlberg in 1 h 15, 1 h 36 less than from Zurich. That said, Zurich carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Innsbruck — 96 km, 1 h 15", "Zurich — 190 km, 2 h 51 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Zurich Airport to St. Anton am Arlberg?", reponse: "About 2 h 51 for 190 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Zurich to St. Anton am Arlberg cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to St. Anton am Arlberg?", reponse: "Innsbruck, at 1 h 15 for 96 km. From Zurich it is 2 h 51. We serve St. Anton am Arlberg from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
