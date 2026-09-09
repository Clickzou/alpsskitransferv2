import type { Transfer } from "./types";

/** Genève → Sestriere — rédigé à la main (liaison manquante de l'audit). */
export const genevaAirportToSestriere: Transfer = {
  airport: "geneva-airport",
  resort: "sestriere",

  metaTitre: "Geneva to Sestriere Transfers | 242 km, about 3 h 10",
  metaDescription:
    "Private transfers from Geneva Airport to Sestriere: 242 km, about 3 h 10 through the Fréjus tunnel. Fixed price per vehicle, tunnel toll included.",
  h1: "Geneva to Sestriere Transfers",
  chapo:
    "Sestriere is 242 km from Geneva Airport, about 3 hours 10 minutes: down the Maurienne, through the Fréjus tunnel, then up from Oulx to the pass the resort is built on, at 2,035 m. It is the highest village of the Milky Way and one of the highest in Italy — an Olympic resort with snow to match. Turin is closer, but Geneva flies all week. Price fixed per vehicle with the tunnel toll included, ski bags and child seats included, flight tracked.",

  contenu: [
    { type: "paragraphe", texte: "The road from Geneva Airport to Sestriere runs 242 km and takes about 3 h 11 without traffic. Your driver meets you in the arrivals hall, takes you straight to your accommodation, and the price is fixed per vehicle before you book." },
    { type: "paragraphe", texte: "This transfer crosses a border: you land in Switzerland and finish in Italy. There is nothing for you to arrange — our vehicles carry what each country requires in winter, and the crossing itself rarely costs more than a few minutes." },
    { type: "titre2", texte: "The drive from Geneva to Sestriere" },
    { type: "paragraphe", texte: "At 3 h 11, this is a long transfer. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we build the journey around them. Motorway covers most of it; the climb at the end is the slow part." },
    { type: "paragraphe", texte: "Three things lengthen it: snow, chain controls, and Saturday. Saturday is changeover day across the Alps and the busiest of the week on every mountain road — in February it can add an hour to this journey. We track your flight and plan for the day you actually travel." },
    { type: "titre2", texte: "Is Geneva the best airport for Sestriere?" },
    { type: "paragraphe", texte: "Not the closest: Turin reaches Sestriere in 1 h 38, 1 h 33 less than from Geneva. That said, Geneva carries more flights on many routes, and an earlier arrival with a longer drive often beats a late landing with a short one." },
    { type: "liste", items: ["Turin — 107 km, 1 h 38", "Geneva — 242 km, 3 h 11 (this route)"] },
    { type: "titre2", texte: "What the price includes" },
    { type: "liste", items: ["One fixed price for the whole vehicle, tolls and motorway fees included — it does not change with the number of passengers.", "Flight tracking: a delayed landing moves your pick-up, at no extra cost and with nothing for you to do.", "Winter tyres and snow chains on board all season, as the law requires in the Alps.", "Skis, snowboards and boot bags carried at no extra charge.", "Child and booster seats on request, fitted before your driver leaves for the airport."] },
    { type: "titre2", texte: "When to book" },
    { type: "paragraphe", texte: "As early as you can. Availability on this route tightens as the school holidays approach, and the February weeks go first. Booking early also keeps the vehicle category you want free — which matters more than it sounds when you travel with skis." },
  ],

  faq: [
    { question: "How long is the transfer from Geneva Airport to Sestriere?", reponse: "About 3 h 11 for 242 km on clear roads. Snow, chain controls and Saturday changeover traffic add to it — in high season a Saturday transfer can take an hour longer than the same drive midweek. Your driver plans for the day you travel." },
    { question: "How much does a transfer from Geneva to Sestriere cost?", reponse: "The price depends on the vehicle category and the time of year, and it is quoted per vehicle rather than per seat — a group of six pays what a couple pays. Enter your journey to see your price before you book: tolls are included and nothing is added on arrival." },
    { question: "Which airport is closest to Sestriere?", reponse: "Turin, at 1 h 38 for 107 km. From Geneva it is 3 h 11. We serve Sestriere from 2 airports in all, so the right one is usually decided by the flights available on your dates." },
    { question: "What happens if my flight is delayed?", reponse: "Nothing you need to do. We track your flight number and move the pick-up to your actual landing time. Your driver waits for you in the arrivals hall, and a delay does not change the price you were quoted." },
    { question: "Can you take our ski equipment?", reponse: "Yes, at no extra charge. Tell us how many bags and ski or board carriers you have when you book: in winter the boot fills up before the seats do, and the count is what decides the vehicle category we send." },
  ],
};
