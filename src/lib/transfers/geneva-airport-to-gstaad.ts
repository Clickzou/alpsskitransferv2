import type { Transfer } from "./types";

/** Genève → Gstaad — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToGstaad: Transfer = {
  airport: "geneva-airport",
  resort: "gstaad",

  metaTitre: "Geneva to Gstaad Transfers | 151 km, about 2 h 10",
  metaDescription:
    "Private transfers from Geneva Airport to Gstaad: 151 km, about 2 h 10 through the Pays-d’Enhaut. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Gstaad Transfers",
  chapo:
    "Gstaad is 151 km from Geneva Airport, about 2 hours 10 minutes: motorway along Lake Geneva to Montreux, then the Pays-d’Enhaut road over the Col des Mosses or through Château-d’Œx to the Saanenland. The village sits at 1,050 m and the drive is one of the prettier ones in Switzerland — narrow valleys, wooden chalets, no motorway for the last hour. Price fixed per vehicle, vignette and tolls included, quoted before you book, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Gstaad runs 151 km and takes about 2 h 10 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Geneva to Gstaad" },
    { type: "paragraphe", texte: "2 h 10 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Gstaad?", reponse: "About 2 h 10 for 151 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Gstaad cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
