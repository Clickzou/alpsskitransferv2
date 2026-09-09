import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/grenoble-to-alpe-dhuez-transfers/ (WordPress, 455 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const grenobleIsereAirportToAlpeDhuez: Transfer = {
  airport: "grenoble-isere-airport",
  resort: "alpe-dhuez",

  metaTitre: "Grenoble to Alpe d’Huez Transfers | Book Now",
  metaDescription: "Book your Grenoble to Alpe d’Huez transfer today! Private transfers, best prices, door-to-door service. Secure your ride now!",
  h1: "Grenoble to Alpe d’Huez Transfers",
  chapo: "Looking for a seamless Grenoble to Alpe d’Huez transfer? We offer private transfers, ensuring a comfortable, stress-free journey to your ski resort. Whether you're traveling solo, with family, or in a group, our door-to-door transfer service guarantees a smooth ride from Grenoble Airport or Grenoble city center straight to Alpe d’Huez.",

  contenu: [
    { type: "paragraphe", texte: "The road from Grenoble-Isère Airport to Alpe d’Huez runs 106 km and takes about 1 h 38 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Grenoble-Isère to Alpe d’Huez" },
    { type: "paragraphe", texte: "1 h 38 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Grenoble-Isère the best airport for Alpe d’Huez?" },
    { type: "paragraphe", texte: "Yes, on driving time: Grenoble-Isère is the closest of the 4 airports we serve Alpe d’Huez from. The next is Chambéry-Savoie, 17 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Grenoble-Isère — 106 km, 1 h 38 (this route)", "Chambéry-Savoie — 131 km, 1 h 55", "Lyon — 155 km, 2 h 10", "Geneva — 216 km, 3 h"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Grenoble-Isère Airport to Alpe d’Huez?", reponse: "About 1 h 38 for 106 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Grenoble-Isère to Alpe d’Huez cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Alpe d’Huez?", reponse: "Grenoble-Isère, at 1 h 38 for 106 km. That is this route. We serve Alpe d’Huez from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
