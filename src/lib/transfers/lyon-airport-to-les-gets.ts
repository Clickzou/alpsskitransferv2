import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-les-gets-transfers/ (WordPress, 335 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLesGets: Transfer = {
  airport: "lyon-airport",
  resort: "les-gets",

  metaTitre: "Lyon to Les Gets Transfers | Book Now & Travel Comfortably",
  metaDescription: "Book your Lyon to Les Gets transfer today! Fast, reliable, and comfortable transfers to your ski resort. Private transfers, door to door.",
  h1: "Lyon to Les Gets Transfers",
  chapo: "Planning a ski trip from Lyon to Les Gets? Our Lyon to Les Gets transfers provide a reliable, stress-free, and efficient way to reach this popular ski resort in the French Alps. We ensure a comfortable journey tailored to your needs.",

  contenu: [
    { type: "paragraphe", texte: "The road from Lyon Airport to Les Gets runs 195 km and takes about 2 h 23 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Lyon to Les Gets" },
    { type: "paragraphe", texte: "2 h 23 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Lyon the best airport for Les Gets?" },
    { type: "paragraphe", texte: "Not the closest: Geneva reaches Les Gets in 1 h 19, 1 h 04 less than from Lyon. That said, Lyon carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Geneva — 69 km, 1 h 19", "Chambéry-Savoie — 118 km, 1 h 34", "Lyon — 195 km, 2 h 23 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Lyon Airport to Les Gets?", reponse: "About 2 h 23 for 195 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Lyon to Les Gets cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Les Gets?", reponse: "Geneva, at 1 h 19 for 69 km. From Lyon it is 2 h 23. We serve Les Gets from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
