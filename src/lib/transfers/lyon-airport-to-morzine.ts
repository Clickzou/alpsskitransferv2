import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-morzine-transfers/ (WordPress, 420 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToMorzine: Transfer = {
  airport: "lyon-airport",
  resort: "morzine",

  metaTitre: "Lyon to Morzine Transfers | Private & Shared Ski Transfers",
  metaDescription: "Book your Lyon to Morzine transfers now! Private & shared options available. Fast, reliable service to your ski resort. Secure your transfer today!",
  h1: "Lyon to Morzine Transfers",
  chapo: "Planning your ski holiday and looking for Lyon to Morzine transfers? Whether you need a private transfer for ultimate comfort or a shared transfer for a budget-friendly ride, we’ve got you covered. Our service ensures a smooth, hassle-free journey from Lyon Airport (LYS) or Lyon city center directly to Morzine, one of the most popular ski resorts in the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Our professional drivers provide a door-to-door transfer service, ensuring you reach your accommodation safely and comfortably. No waiting, no detours – just a direct and efficient transfer to the heart of Morzine. With options for small groups, families, and solo travelers, you can relax knowing that your ski transfer is taken care of." },
    { type: "paragraphe", texte: "Booking in advance guarantees availability at the best rates, especially during peak ski season. Choose between our luxury private transfers for a premium experience or opt for a cost-effective shared transfer. Get ready for your ski adventure – book your Lyon to Morzine transfer today!" },
    { type: "titre2", texte: "Route & Estimated Prices for Lyon to Morzine Transfers" },
    { type: "paragraphe", texte: "The journey from Lyon to Morzine covers approximately 210 km and takes around 2 hours 30 minutes in normal weather conditions. The route follows a scenic drive through the French Alps, passing through picturesque mountain landscapes and charming alpine villages." },
    { type: "titre3", texte: "Estimated Pricing for Lyon to Morzine Transfers" },
    { type: "liste", items: ["Lyon to Morzine Private Transfer Price: Starting from €280 per vehicle.", "Lyon to Morzine Shared Transfer Price: Starting from €60 per person."] },
    { type: "paragraphe", texte: "Prices vary depending on the season, group size, and vehicle type. Booking early ensures the best rates and guarantees your preferred transfer option." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Morzine" },
    { type: "paragraphe", texte: "Booking your Lyon to Morzine transfer is easy and takes just a few minutes!" },
    { type: "paragraphe", texte: "✅ 1. Select Your Transfer Type – Choose between a private or shared transfer based on your budget and travel preferences." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your pick-up location, flight details (if applicable), and drop-off address in Morzine." },
    { type: "paragraphe", texte: "✅ 3. Get an Instant Quote – See real-time pricing for your transfer, with no hidden fees." },
    { type: "paragraphe", texte: "✅ 4. Confirm & Secure Your Booking – Complete your reservation online with instant confirmation." },
    { type: "paragraphe", texte: "Your driver will be waiting for you at the designated pick-up point, ready to take you directly to Morzine." },
    { type: "paragraphe", texte: "Don’t wait – secure your ski transfer today for a stress-free arrival in Morzine!" },
  ],

  faq: [

  ],
};
