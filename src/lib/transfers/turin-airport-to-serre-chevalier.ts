import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/italy/turin-to-serre-chevalier-transfers/ (WordPress, 386 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const turinAirportToSerreChevalier: Transfer = {
  airport: "turin-airport",
  resort: "serre-chevalier",

  metaTitre: "Turin to Serre Chevalier Transfers | Book Now!",
  metaDescription: "Need a Turin to Serre Chevalier transfer? Book now for private transfers at the best price. Hassle-free ski transfers—reserve today!",
  h1: "Turin to Serre Chevalier Transfers",
  chapo: "Looking for Turin to Serre Chevalier transfers that guarantee a comfortable, stress-free journey? Whether you're traveling solo, as a group, or with family, we offer private transfers tailored to your needs. Our door-to-door service ensures a smooth ride from Turin Airport (TRN) or the city center directly to your ski accommodation in Serre Chevalier, so you can start your ski trip without delays.",

  contenu: [
    { type: "paragraphe", texte: "The road from Turin Airport to Serre Chevalier runs 131 km and takes about 2 h 44 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Italy and finish in France. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Turin to Serre Chevalier" },
    { type: "paragraphe", texte: "2 h 44 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Turin the best airport for Serre Chevalier?" },
    { type: "paragraphe", texte: "Yes, on driving time: Turin is the closest of the 2 airports we serve Serre Chevalier from. The next is Grenoble-Isère, 13 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Turin — 131 km, 2 h 44 (this route)", "Grenoble-Isère — 155 km, 2 h 57"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Turin Airport to Serre Chevalier?", reponse: "About 2 h 44 for 131 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Turin to Serre Chevalier cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Serre Chevalier?", reponse: "Turin, at 2 h 44 for 131 km. That is this route. We serve Serre Chevalier from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
