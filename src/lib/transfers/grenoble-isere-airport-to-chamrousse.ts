import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/grenoble-to-chamrousse-transfers/ (WordPress, 424 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const grenobleIsereAirportToChamrousse: Transfer = {
  airport: "grenoble-isere-airport",
  resort: "chamrousse",

  metaTitre: "Grenoble to Chamrousse Transfers | Fast & Easy Booking",
  metaDescription: "Book your Grenoble to Chamrousse transfers now! Private transfers, door to door. Reliable, fast & affordable ski transport. Get your quote today!",
  h1: "Grenoble to Chamrousse Transfers",
  chapo: "Planning your ski trip and looking for the best Grenoble to Chamrousse transfers? We offer private transfers, ensuring a comfortable, efficient, and stress-free journey to the slopes. Whether you’re traveling solo, with family, or in a group, our ski transfers provide the perfect solution to reach Chamrousse quickly and hassle-free.",

  contenu: [
    { type: "paragraphe", texte: "The road from Grenoble-Isère Airport to Chamrousse runs 78 km and takes about 1 h 11 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Grenoble-Isère to Chamrousse" },
    { type: "paragraphe", texte: "At 1 h 11, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Grenoble-Isère the best airport for Chamrousse?" },
    { type: "paragraphe", texte: "Yes, on driving time: Grenoble-Isère is the closest of the 4 airports we serve Chamrousse from. The next is Chambéry-Savoie, 6 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Grenoble-Isère — 78 km, 1 h 11 (this route)", "Chambéry-Savoie — 89 km, 1 h 17", "Lyon — 126 km, 1 h 42", "Geneva — 174 km, 2 h 22"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Grenoble-Isère Airport to Chamrousse?", reponse: "About 1 h 11 for 78 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Grenoble-Isère to Chamrousse cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Chamrousse?", reponse: "Grenoble-Isère, at 1 h 11 for 78 km. That is this route. We serve Chamrousse from 4 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
