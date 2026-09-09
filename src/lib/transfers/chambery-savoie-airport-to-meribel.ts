import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-meribel-transfers/ (WordPress, 375 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToMeribel: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "meribel",

  metaTitre: "Chambéry to Meribel transfers | Book Now & Save!",
  metaDescription: "Book your Chambéry to Meribel transfers now! Fast, reliable private ski transfers. Secure your ride today!",
  h1: "Chambéry to Meribel Transfers",
  chapo: "Planning your trip to the French Alps? Our Chambéry to Meribel transfers offer a fast, reliable, and hassle-free way to reach your ski resort. We ensure comfortable travel with professional drivers who navigate the mountain roads with ease. Avoid the hassle of waiting for public transport and enjoy a door-to-door service straight to your accommodation.",

  contenu: [
    { type: "paragraphe", texte: "The road from Chambéry-Savoie Airport to Méribel runs 103 km and takes about 1 h 21 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Chambéry-Savoie to Méribel" },
    { type: "paragraphe", texte: "At 1 h 21, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Chambéry-Savoie the best airport for Méribel?" },
    { type: "paragraphe", texte: "Yes, on driving time: Chambéry-Savoie is the closest of the 4 airports we serve Méribel from. The next is Grenoble-Isère, 46 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Chambéry-Savoie — 103 km, 1 h 21 (this route)", "Grenoble-Isère — 169 km, 2 h 07", "Lyon — 181 km, 2 h 13", "Geneva — 142 km, 2 h 25"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Chambéry-Savoie Airport to Méribel?", reponse: "About 1 h 21 for 103 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Chambéry-Savoie to Méribel cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Méribel?", reponse: "Chambéry-Savoie, at 1 h 21 for 103 km. That is this route. We serve Méribel from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
