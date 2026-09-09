import type { Transfer } from "./types";

/**
 * Genève → Courmayeur — rédigé à la main.
 *
 * L'une des 15 liaisons au départ de Genève que l'audit signale comme absentes
 * du site actuel. Distances et durées : `src/data/distances.ts`.
 */
export const genevaAirportToCourmayeur: Transfer = {
  airport: "geneva-airport",
  resort: "courmayeur",

  metaTitre: "Geneva to Courmayeur Transfers | 102 km, 1 h 40",
  metaDescription:
    "Private transfers from Geneva Airport to Courmayeur through the Mont Blanc tunnel: 102 km, about 1 h 40. Fixed price per vehicle, tolls included.",
  h1: "Geneva to Courmayeur Transfers",
  chapo:
    "Courmayeur is 102 km from Geneva Airport, about 1 hour 40 minutes — and the journey goes under Mont Blanc rather than around it. The route runs up the Arve valley to Chamonix, through the 11.6 km Mont Blanc tunnel, and down into the Aosta valley on the Italian side. It is one of the shortest international transfers in the Alps: you land in Switzerland, drive through France, and arrive in Italy in under two hours. The price is fixed per vehicle, tunnel toll included, and quoted before you book. Ski and board bags travel free, child seats are provided, and your driver tracks your flight.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Courmayeur runs 102 km and takes about 1 h 36 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in Italy. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Geneva to Courmayeur" },
    { type: "paragraphe", texte: "1 h 36 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Courmayeur?" },
    { type: "paragraphe", texte: "Yes, on driving time: Geneva is the closest of the 3 airports we serve Courmayeur from. The next is Chambéry-Savoie, 15 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Geneva — 102 km, 1 h 36 (this route)", "Chambéry-Savoie — 151 km, 1 h 51", "Turin — 158 km, 1 h 59"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Courmayeur?", reponse: "About 1 h 36 for 102 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Courmayeur cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Courmayeur?", reponse: "Geneva, at 1 h 36 for 102 km. That is this route. We serve Courmayeur from 3 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
