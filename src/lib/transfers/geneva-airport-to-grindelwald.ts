import type { Transfer } from "./types";

/** Genève → Grindelwald — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToGrindelwald: Transfer = {
  airport: "geneva-airport",
  resort: "grindelwald",

  metaTitre: "Geneva to Grindelwald Transfers | 233 km, 3 hours",
  metaDescription:
    "Private transfers from Geneva Airport to Grindelwald: 233 km, about 3 hours through Bern and Interlaken. Fixed price per vehicle, ski bags included.",
  h1: "Geneva to Grindelwald Transfers",
  chapo:
    "Grindelwald is 233 km from Geneva Airport, about 3 hours by road, on motorway through Lausanne and Bern to Interlaken and then 20 km up the valley to the village at 1,034 m. Zurich is closer to the Bernese Oberland, but Geneva has the widest European flight choice — and this drive is one of the easiest long transfers in the Alps, with no pass to cross. The price is fixed per vehicle, Swiss motorway vignette and tolls included, and quoted before you book. Ski bags and child seats are included, and your driver tracks your flight.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Grindelwald runs 233 km and takes about 3 h without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "titre2", texte: "The drive from Geneva to Grindelwald" },
    { type: "paragraphe", texte: "At 3 h, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Grindelwald?" },
    { type: "paragraphe", texte: "Not the closest: Zurich reaches Grindelwald in 2 h 38, 22 min less than from Geneva. That said, Geneva carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Zurich — 157 km, 2 h 38", "Geneva — 233 km, 3 h (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Grindelwald?", reponse: "About 3 h for 233 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Grindelwald cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Grindelwald?", reponse: "Zurich, at 2 h 38 for 157 km. From Geneva it is 3 h. We serve Grindelwald from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
