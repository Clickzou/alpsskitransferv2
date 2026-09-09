import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-flaine-transfers/ (WordPress, 444 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToFlaine: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "flaine",

  metaTitre: "Chambéry to Flaine Transfers | Private Options",
  metaDescription: "Book your Chambéry to Flaine transfer today! Private transfers, door to door. Secure the best price & enjoy a stress-free ride to your ski resort!",
  h1: "Chambéry to Flaine transfers Transfers",
  chapo: "Looking for Chambéry to Flaine transfers that ensure a stress-free, comfortable, and efficient journey? We provide the best solution to get you from Chambéry Airport to Flaine hassle-free. Our door-to-door service guarantees that you arrive at your ski resort without the inconvenience of waiting for taxis or navigating public transport.",

  contenu: [
    { type: "paragraphe", texte: "The road from Chambéry-Savoie Airport to Flaine runs 129 km and takes about 1 h 43 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Chambéry-Savoie to Flaine" },
    { type: "paragraphe", texte: "1 h 43 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Chambéry-Savoie the best airport for Flaine?" },
    { type: "paragraphe", texte: "Not the closest: Geneva reaches Flaine in 1 h 29, 14 min less than from Chambéry-Savoie. That said, Chambéry-Savoie carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Geneva — 80 km, 1 h 29", "Chambéry-Savoie — 129 km, 1 h 43 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Chambéry-Savoie Airport to Flaine?", reponse: "About 1 h 43 for 129 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Chambéry-Savoie to Flaine cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Flaine?", reponse: "Geneva, at 1 h 29 for 80 km. From Chambéry-Savoie it is 1 h 43. We serve Flaine from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
