import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/grenoble-to-val-thorens-3-valleys-transfers/ (WordPress, 419 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const grenobleIsereAirportToValThorens: Transfer = {
  airport: "grenoble-isere-airport",
  resort: "val-thorens",

  metaTitre: "Grenoble to Val Thorens 3 Valleys Transfers | Book Now",
  metaDescription: "Book your Grenoble to Val Thorens 3 Valleys transfer today! Fast, reliable private ski transfers. Get the best price & travel stress-free.",
  h1: "Grenoble to Val Thorens 3 Valleys Transfers",
  chapo: "Looking for a Grenoble to Val Thorens 3 Valleys transfer that guarantees a fast, comfortable, and hassle-free journey to your ski resort? Our private transfers provide a door-to-door service, ensuring you reach your destination without delays or unnecessary stops. Whether you’re traveling solo, with family, or in a group, we offer flexible transfer options to suit your needs.",

  contenu: [
    { type: "paragraphe", texte: "The road from Grenoble-Isère Airport to Val Thorens runs 188 km and takes about 2 h 26 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Grenoble-Isère to Val Thorens" },
    { type: "paragraphe", texte: "2 h 26 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Grenoble-Isère the best airport for Val Thorens?" },
    { type: "paragraphe", texte: "Not the closest: Chambéry-Savoie reaches Val Thorens in 1 h 40, 46 min less than from Grenoble-Isère. That said, Grenoble-Isère carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Chambéry-Savoie — 122 km, 1 h 40", "Grenoble-Isère — 188 km, 2 h 26 (this route)", "Lyon — 200 km, 2 h 33", "Geneva — 161 km, 2 h 44", "Turin — 260 km, 3 h 27"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Grenoble-Isère Airport to Val Thorens?", reponse: "About 2 h 26 for 188 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Grenoble-Isère to Val Thorens cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Val Thorens?", reponse: "Chambéry-Savoie, at 1 h 40 for 122 km. From Grenoble-Isère it is 2 h 26. We serve Val Thorens from 5 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
