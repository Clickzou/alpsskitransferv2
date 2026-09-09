import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/salzburg-to-obergurgl/ (WordPress, 440 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const salzburgAirportToObergurgl: Transfer = {
  airport: "salzburg-airport",
  resort: "obergurgl",

  metaTitre: "Salzburg to Obergurgl Transfers | Book Now & Save",
  metaDescription: "Book your Salzburg to Obergurgl transfer now! Fixed prices per vehicle, and door-to-door service. Secure your ride today!",
  h1: "Salzburg to Obergurgl Transfers",
  chapo: "Planning your ski trip and need a Salzburg to Obergurgl transfer? We offer fast, safe, and reliable transportation to this stunning Austrian ski resort. Avoid the hassle of public transport, multiple stops, and heavy luggage handling—our Salzburg to Obergurgl transfers provide a seamless experience, taking you directly from Salzburg Airport or city center to your accommodation in Obergurgl.",

  contenu: [
    { type: "paragraphe", texte: "The road from Salzburg Airport to Obergurgl runs 277 km and takes about 3 h 26 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Salzburg to Obergurgl" },
    { type: "paragraphe", texte: "At 3 h 26, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Salzburg the best airport for Obergurgl?" },
    { type: "paragraphe", texte: "Not the closest: Innsbruck reaches Obergurgl in 1 h 27, 1 h 59 less than from Salzburg. That said, Salzburg carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Innsbruck — 98 km, 1 h 27", "Salzburg — 277 km, 3 h 26 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Salzburg Airport to Obergurgl?", reponse: "About 3 h 26 for 277 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Salzburg to Obergurgl cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Obergurgl?", reponse: "Innsbruck, at 1 h 27 for 98 km. From Salzburg it is 3 h 26. We serve Obergurgl from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
