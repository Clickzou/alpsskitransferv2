import type { Transfer } from "./types";

/** Genève → Saint-Gervais — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToSaintGervais: Transfer = {
  airport: "geneva-airport",
  resort: "saint-gervais",

  metaTitre: "Geneva to Saint-Gervais Transfers | 77 km, 1 h 15",
  metaDescription:
    "Private transfers from Geneva Airport to Saint-Gervais-les-Bains: 77 km, about 1 h 15. Fixed price per vehicle, ski bags and child seats included.",
  h1: "Geneva to Saint-Gervais Transfers",
  chapo:
    "Saint-Gervais-les-Bains is 77 km from Geneva Airport, about 1 hour 15 minutes — one of the shortest transfers to a Mont Blanc resort, and shorter than Chamonix by twenty minutes. The route is motorway to Le Fayet, at the foot of the village, with only a short climb at the end. The price is fixed per vehicle and quoted before you book, motorway tolls, ski bags and child seats included, and your driver tracks your flight so a delayed landing costs you nothing.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Saint-Gervais runs 77 km and takes about 1 h 16 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in France. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Geneva to Saint-Gervais" },
    { type: "paragraphe", texte: "At 1 h 16, this is one of the shorter alpine transfers — short enough that a morning landing still leaves you half a day on the slopes. The last stretch is mountain road, so the time depends more on conditions than on distance." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Saint-Gervais?" },
    { type: "paragraphe", texte: "Yes, on driving time: Geneva is the closest of the 2 airports we serve Saint-Gervais from. The next is Chambéry-Savoie, 13 min further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Geneva — 77 km, 1 h 16 (this route)", "Chambéry-Savoie — 104 km, 1 h 29"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Saint-Gervais?", reponse: "About 1 h 16 for 77 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Saint-Gervais cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Saint-Gervais?", reponse: "Geneva, at 1 h 16 for 77 km. That is this route. We serve Saint-Gervais from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
