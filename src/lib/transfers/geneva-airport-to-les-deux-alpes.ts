import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-les-deux-alpes-transfers/ (WordPress, 447 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLesDeuxAlpes: Transfer = {
  airport: "geneva-airport",
  resort: "les-deux-alpes",

  metaTitre: "Geneva to Les Deux Alpes Transfer | Book Your Ride Today",
  metaDescription: "Book your Geneva to Les Deux Alpes transfer now! Fixed prices per vehicle, and reliable service. Secure your ski transfer today!",
  h1: "Geneva to Les Deux Alpes Transfers",
  chapo: "Traveling from Geneva to Les Deux Alpes? Our private transfers offer a stress-free, comfortable, and reliable way to reach your ski resort. Whether you're arriving at Geneva Airport alone, with family, or in a group, we provide door-to-door transfers tailored to your needs. Avoid the hassle of public transport, long waits, and complicated connections—our professional ski transfer service ensures you arrive at Les Deux Alpes smoothly and on time.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Les Deux Alpes runs 220 km and takes about 3 h 04 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in France. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Geneva to Les Deux Alpes" },
    { type: "paragraphe", texte: "At 3 h 04, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Les Deux Alpes?" },
    { type: "paragraphe", texte: "Not the closest: Grenoble-Isère reaches Les Deux Alpes in 1 h 42, 1 h 22 less than from Geneva. That said, Geneva carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Grenoble-Isère — 110 km, 1 h 42", "Chambéry-Savoie — 135 km, 1 h 59", "Lyon — 158 km, 2 h 14", "Geneva — 220 km, 3 h 04 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Les Deux Alpes?", reponse: "About 3 h 04 for 220 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Les Deux Alpes cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Les Deux Alpes?", reponse: "Grenoble-Isère, at 1 h 42 for 110 km. From Geneva it is 3 h 04. We serve Les Deux Alpes from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
