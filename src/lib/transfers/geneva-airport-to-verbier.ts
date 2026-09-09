import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-verbier-transfers/ (WordPress, 436 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToVerbier: Transfer = {
  airport: "geneva-airport",
  resort: "verbier",

  metaTitre: "Geneva to Verbier Transfer | Fast & Reliable Ski Transfers",
  metaDescription: "Book your Geneva to Verbier Transfer today! Private transfers, door to door. Safe & comfortable service. Get your quote & travel stress-free!",
  h1: "Geneva to Verbier Transfers",
  chapo: "Looking for a Geneva to Verbier Transfer that guarantees a smooth, reliable, and stress-free journey? We ensure a direct, comfortable ride from Geneva Airport to Verbier. Our professional drivers provide a door-to-door service, so you can relax and enjoy the breathtaking Swiss Alps scenery.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Verbier runs 163 km and takes about 2 h 09 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Geneva to Verbier" },
    { type: "paragraphe", texte: "2 h 09 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Verbier?" },
    { type: "paragraphe", texte: "Yes, on driving time: Geneva is the closest of the 2 airports we serve Verbier from. The next is Zurich, 1 h 39 further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Geneva — 163 km, 2 h 09 (this route)", "Zurich — 288 km, 3 h 48"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Verbier?", reponse: "About 2 h 09 for 163 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Verbier cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Verbier?", reponse: "Geneva, at 2 h 09 for 163 km. That is this route. We serve Verbier from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
