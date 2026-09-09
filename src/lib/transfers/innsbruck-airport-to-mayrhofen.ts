import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/innsbruck-to-mayrhofen/ (WordPress, 382 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const innsbruckAirportToMayrhofen: Transfer = {
  airport: "innsbruck-airport",
  resort: "mayrhofen",

  metaTitre: "Innsbruck to Mayrhofen Transfers | Private Options",
  metaDescription: "Book your Innsbruck to Mayrhofen transfers now! Choose private transport for a seamless, comfortable journey. Reserve today!",
  h1: "Innsbruck to Mayrhofen Transfers",
  chapo: "Looking for reliable Innsbruck to Mayrhofen transfers? We have the perfect solution for your ski trip. Our professional door-to-door service ensures a stress-free journey from Innsbruck Airport or Innsbruck city center straight to your accommodation in Mayrhofen.",

  contenu: [
    { type: "paragraphe", texte: "The road from Innsbruck Airport to Mayrhofen runs 75 km and takes about 1 h 10 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Innsbruck to Mayrhofen" },
    { type: "paragraphe", texte: "At 1 h 10, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Innsbruck Airport to Mayrhofen?", reponse: "About 1 h 10 for 75 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Innsbruck to Mayrhofen cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
