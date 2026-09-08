import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-morzine-transfers/ (WordPress, 383 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToMorzine: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "morzine",

  metaTitre: "Chambéry to Morzine Transfers | Book Your Ride Today",
  metaDescription: "Chambéry to Morzine transfers with private or shared options. Secure your ski transfer today for a direct, hassle-free trip to Morzine. Book now!",
  h1: "Chambéry to Morzine Transfers",
  chapo: "Looking for a Chambéry to Morzine transfer that is fast, reliable, and comfortable? Whether you prefer a private transfer for convenience or a shared transfer to save costs, we offer door-to-door transport to ensure a smooth journey to your ski destination. Avoid the hassle of public transport and travel directly from Chambéry Airport to Morzine, one of the most popular ski resorts in the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Our Chambéry to Morzine transfers are operated by professional, experienced drivers who ensure a safe and efficient ride through snowy mountain roads. With spacious vehicles, extra luggage options, and child seats included, we cater to solo travelers, families, and large groups. Book your ski transfer in advance to secure the best prices and enjoy a stress-free start to your holiday." },
    { type: "titre2", texte: "The Route from Chambéry to Morzine – Distance, Duration & Prices" },
    { type: "paragraphe", texte: "The journey from Chambéry Airport to Morzine covers approximately 120 km and takes around 1 hour 45 minutes, depending on road and weather conditions. The route passes through stunning Alpine landscapes, including sections of the A41 motorway and scenic mountain roads leading up to the Portes du Soleil ski area." },
    { type: "titre3", texte: "Price Range:" },
    { type: "liste", items: ["Private Transfers: Starting from €260 per vehicle, ideal for comfort and flexibility.", "Shared Transfers: More budget-friendly, starting at €45 per person, with fixed schedules."] },
    { type: "paragraphe", texte: "Booking your Chambéry to Morzine transfer early ensures availability and competitive pricing, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Morzine" },
    { type: "paragraphe", texte: "Booking your Chambéry to Morzine transfer is quick and easy. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Select Your Transfer Type – Choose between private or shared transfers based on your needs and budget." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your arrival time, flight details, and destination address in Morzine." },
    { type: "paragraphe", texte: "✅ 3. Confirm & Pay Securely – Receive instant confirmation with a fixed price, no hidden fees." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver & Enjoy the Ride – Your professional driver will be waiting at Chambéry Airport, ready to take you directly to your accommodation in Morzine." },
    { type: "paragraphe", texte: "Ready to book? Secure your Chambéry to Morzine transfer today and enjoy a hassle-free journey to the Alps!" },
  ],

  faq: [

  ],
};
