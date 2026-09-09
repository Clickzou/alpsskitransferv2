import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-la-plagne-transfers/ (WordPress, 417 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLaPlagne: Transfer = {
  airport: "lyon-airport",
  resort: "la-plagne",

  metaTitre: "Lyon to La Plagne Transfers | Book Your Ride Now",
  metaDescription: "Lyon to La Plagne transfers – Fast, safe & affordable. Private, door to door. Book now for the best price and stress-free travel!",
  h1: "Lyon to La Plagne Transfers",
  chapo: "Looking for the best Lyon to La Plagne transfers? Whether you prefer a crowded shuttle or a private ski transfer, we offer fast, stress-free transport from Lyon Airport (LYS) or Lyon city center to your accommodation in La Plagne. Avoid the hassle of renting a car, navigating snowy roads, or waiting for unreliable public transport. Our door-to-door transfers ensure a comfortable and efficient journey directly to your ski resort.",

  contenu: [
    { type: "paragraphe", texte: "The road from Lyon Airport to La Plagne runs 199 km and takes about 2 h 33 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Lyon to La Plagne" },
    { type: "paragraphe", texte: "2 h 33 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Lyon the best airport for La Plagne?" },
    { type: "paragraphe", texte: "Not the closest: Chambéry-Savoie reaches La Plagne in 1 h 41, 52 min less than from Lyon. That said, Lyon carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Chambéry-Savoie — 121 km, 1 h 41", "Grenoble-Isère — 187 km, 2 h 26", "Lyon — 199 km, 2 h 33 (this route)", "Geneva — 160 km, 2 h 44"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Lyon Airport to La Plagne?", reponse: "About 2 h 33 for 199 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Lyon to La Plagne cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to La Plagne?", reponse: "Chambéry-Savoie, at 1 h 41 for 121 km. From Lyon it is 2 h 33. We serve La Plagne from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
