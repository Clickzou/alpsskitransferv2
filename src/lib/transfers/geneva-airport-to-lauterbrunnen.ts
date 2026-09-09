import type { Transfer } from "./types";

/** Genève → Lauterbrunnen — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToLauterbrunnen: Transfer = {
  airport: "geneva-airport",
  resort: "lauterbrunnen",

  metaTitre: "Geneva to Lauterbrunnen Transfers | 226 km, 2 h 50",
  metaDescription:
    "Private transfers from Geneva Airport to Lauterbrunnen, gateway to Wengen and Mürren: 226 km, about 2 h 50. Fixed price per vehicle, vignette included.",
  h1: "Geneva to Lauterbrunnen Transfers",
  chapo:
    "Lauterbrunnen is 226 km from Geneva Airport, about 2 hours 50 minutes, on motorway through Bern and Interlaken and then 12 km up the valley. It is the road head of the Jungfrau region: the last village a vehicle reaches, and the station from which the cog railway climbs to Wengen and the cable cars to Mürren. If your hotel is in one of those two, this is the transfer you need. Price fixed per vehicle, Swiss vignette and tolls included, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Lauterbrunnen runs 226 km and takes about 2 h 51 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Geneva to Lauterbrunnen" },
    { type: "paragraphe", texte: "2 h 51 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Lauterbrunnen?" },
    { type: "paragraphe", texte: "Yes, on driving time: Geneva is the closest of the 2 airports we serve Lauterbrunnen from. The next is Bergamo, 1 h 24 further. Flights often decide the rest — a cheaper fare into a slightly longer road can still be the better trip." },
    { type: "liste", items: ["Geneva — 226 km, 2 h 51 (this route)", "Bergamo — 317 km, 4 h 15"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Lauterbrunnen?", reponse: "About 2 h 51 for 226 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Lauterbrunnen cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Lauterbrunnen?", reponse: "Geneva, at 2 h 51 for 226 km. That is this route. We serve Lauterbrunnen from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
