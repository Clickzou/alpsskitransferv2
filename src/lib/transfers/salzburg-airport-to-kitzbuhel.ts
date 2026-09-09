import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/salzburg-to-kitzbuhel/ (WordPress, 417 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const salzburgAirportToKitzbuhel: Transfer = {
  airport: "salzburg-airport",
  resort: "kitzbuhel",

  metaTitre: "Salzburg to Kitzbuhel Transfers | Book Your Ride Now",
  metaDescription: "Book your Salzburg to Kitzbuhel transfer now! Choose a private transfer, enjoy a smooth ride & arrive stress-free at your ski resort.",
  h1: "Salzburg to Kitzbuhel Transfers",
  chapo: "Looking for a Salzburg to Kitzbuhel transfer that is comfortable, reliable, and stress-free? We provide efficient and affordable transport from Salzburg Airport or Salzburg city center directly to Kitzbühel ski resort. Skip the hassle of waiting for public transport or dealing with multiple stops—our door-to-door transfer service ensures you reach your destination quickly and safely.",

  contenu: [
    { type: "paragraphe", texte: "The road from Salzburg Airport to Kitzbühel runs 75 km and takes about 1 h 20 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Salzburg to Kitzbühel" },
    { type: "paragraphe", texte: "At 1 h 20, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Salzburg the best airport for Kitzbühel?" },
    { type: "paragraphe", texte: "Yes, on driving time: Salzburg is the closest of the 2 airports we serve Kitzbühel from. The next is Innsbruck, 11 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Salzburg — 75 km, 1 h 20 (this route)", "Innsbruck — 98 km, 1 h 31"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Salzburg Airport to Kitzbühel?", reponse: "About 1 h 20 for 75 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Salzburg to Kitzbühel cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Kitzbühel?", reponse: "Salzburg, at 1 h 20 for 75 km. That is this route. We serve Kitzbühel from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
