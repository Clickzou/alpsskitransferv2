import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-la-plagne-transfers/ (WordPress, 417 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLaPlagne: Transfer = {
  airport: "lyon-airport",
  resort: "la-plagne",

  metaTitre: "Lyon to La Plagne Transfers | Book Your Ride Now",
  metaDescription: "Lyon to La Plagne transfers – Fast, safe & affordable. Private & shared options. Book now for the best price and stress-free travel!",
  h1: "Lyon to La Plagne Transfers",
  chapo: "Looking for the best Lyon to La Plagne transfers? Whether you prefer a shared shuttle or a private ski transfer, we offer fast, stress-free transport from Lyon Airport (LYS) or Lyon city center to your accommodation in La Plagne. Avoid the hassle of renting a car, navigating snowy roads, or waiting for unreliable public transport. Our door-to-door transfers ensure a comfortable and efficient journey directly to your ski resort.",

  contenu: [
    { type: "paragraphe", texte: "Our Lyon to La Plagne transfers are designed to provide maximum convenience, with professional, English-speaking drivers and a fleet of modern, well-equipped vehicles. Whether you're traveling solo, with family, or in a large group, we have flexible options to suit every budget. Enjoy a safe and smooth ride through the scenic Alpine landscapes, with plenty of space for luggage and ski equipment. Book now to secure your transfer at the best price and start your ski holiday stress-free!" },
    { type: "titre2", texte: "Lyon to La Plagne – Route & Transfer Prices" },
    { type: "paragraphe", texte: "The distance between Lyon and La Plagne is approximately 190 km, with an average journey time of 2h30 to 3h depending on weather and traffic conditions. The route takes you through picturesque Alpine valleys, passing key locations such as Chambéry and Albertville before reaching the Tarentaise Valley, home to some of the most famous ski resorts in the French Alps." },
    { type: "liste", items: ["Shared Transfer: Starting from €60 per person.", "Private Transfer: Prices range from €290 to €450 per vehicle, depending on group size and vehicle type."] },
    { type: "paragraphe", texte: "With our Lyon to La Plagne transfers, you get a safe, reliable, and competitively priced service, ensuring a stress-free start to your ski trip." },
    { type: "titre3", texte: "Our vehicles" },
  ],

  faq: [
    { question: "How to Book Your Ski Transfer from Lyon to La Plagne?", reponse: "Booking your Lyon to La Plagne transfer is simple and quick: ✅ 1. Get a Quote – Enter your travel details and choose between a private or shared transfer.✅ 2. Select Your Option – Pick the vehicle that best fits your needs and budget.✅ 3. Confirm & Pay Securely – Complete your booking online with instant confirmation.✅ 4. Meet Your Driver & Enjoy the Ride – Your driver will be waiting at Lyon Airport or your hotel, ready to take you directly to La Plagne. Book your Lyon to La Plagne transfer now for the best rates and a stress-free start to your ski holiday!" },
  ],
};
