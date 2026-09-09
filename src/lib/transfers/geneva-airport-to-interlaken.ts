import type { Transfer } from "./types";

/** Genève → Interlaken — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToInterlaken: Transfer = {
  airport: "geneva-airport",
  resort: "interlaken",

  metaTitre: "Geneva to Interlaken Transfers | 216 km, 2 h 40",
  metaDescription:
    "Private transfers from Geneva Airport to Interlaken: 216 km, about 2 h 40 by motorway through Bern. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Interlaken Transfers",
  chapo:
    "Interlaken is 216 km from Geneva Airport, about 2 hours 40 minutes, on motorway through Lausanne and Bern with the lakes for company most of the way. It is the base of the Bernese Oberland — the point from which the railways climb to Grindelwald, Wengen, Mürren and the Jungfraujoch — and the drive has no pass, no tunnel toll and no border. Price fixed per vehicle, Swiss vignette and tolls included, ski bags and child seats included, and your driver tracks your flight.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Interlaken runs 216 km and takes about 2 h 42 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Geneva to Interlaken" },
    { type: "paragraphe", texte: "2 h 42 is the drive on clear roads. Most of it is motorway, and the final climb into the resort is where the time is really spent — that section does not get faster, whatever the traffic below." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Interlaken?" },
    { type: "paragraphe", texte: "Not the closest: Zurich reaches Interlaken in 2 h 20, 22 min less than from Geneva. That said, Geneva carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Zurich — 139 km, 2 h 20", "Geneva — 216 km, 2 h 42 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Interlaken?", reponse: "About 2 h 42 for 216 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Interlaken cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Interlaken?", reponse: "Zurich, at 2 h 20 for 139 km. From Geneva it is 2 h 42. We serve Interlaken from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
