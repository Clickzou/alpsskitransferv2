import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/salzburg-to-solden/ (WordPress, 478 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const salzburgAirportToSolden: Transfer = {
  airport: "salzburg-airport",
  resort: "solden",

  metaTitre: "Salzburg to Sölden Transfers | Book Now & Save Money",
  metaDescription: "Book your Salzburg to Sölden transfers now! Private & shared options, best prices, door-to-door service. Secure your ski transfer today!",
  h1: "Salzburg to Solden Transfers",
  chapo: "Looking for the most comfortable and efficient Salzburg to Sölden transfers? Whether you prefer a private transfer for an exclusive, direct journey or a shared transfer for a more budget-friendly option, we have the perfect solution for you. Our door-to-door ski transfers ensure a stress-free travel experience, allowing you to sit back, relax, and enjoy the ride through the Austrian Alps.",

  contenu: [
    { type: "paragraphe", texte: "Departing from Salzburg Airport or city center, our professional drivers will take you directly to Sölden, one of Austria’s most popular ski resorts. No waiting for public transport, no hassle of carrying ski equipment through multiple connections – just a smooth, reliable transfer tailored to your schedule. With our fixed, transparent pricing, you can book with confidence, knowing you’ll receive the best value for your Salzburg to Sölden transfer." },
    { type: "paragraphe", texte: "Book now and choose between a private, direct transfer for maximum comfort or a shared transfer for a cost-effective way to reach the slopes. Either way, you’ll be on your way to an unforgettable ski adventure in Sölden, famous for its world-class slopes and après-ski scene." },
    { type: "titre2", texte: "The Journey from Salzburg to Sölden" },
    { type: "paragraphe", texte: "The route from Salzburg to Sölden covers approximately 250 km and takes around 3 hours under normal conditions. The journey offers breathtaking alpine scenery, passing through Innsbruck, where you can admire the stunning mountain landscapes." },
    { type: "paragraphe", texte: "During peak ski season, some routes may experience heavier traffic, so we always recommend early booking to secure your preferred travel time. Our Salzburg to Sölden transfers provide a safe, efficient, and comfortable journey, ensuring you arrive at your destination on time and ready to hit the slopes." },
    { type: "titre3", texte: "Price Range for Salzburg to Sölden Transfers" },
    { type: "liste", items: ["Shared transfer: From €75 per person", "Private transfer: Starting at €290 per vehicle (up to 4 passengers)"] },
    { type: "paragraphe", texte: "Our pricing is transparent, with no hidden fees. Whether you are traveling solo, with family, or in a group, we offer the best value for your ski transfer needs." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Salzburg to Sölden" },
    { type: "paragraphe", texte: "Booking your Salzburg to Sölden transfer is quick and easy. Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select a private transfer for a direct, personalized experience or a shared transfer for a cost-effective option." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up location (Salzburg Airport or city), drop-off location (your Sölden accommodation), and travel date." },
    { type: "paragraphe", texte: "✅ 3. Get an instant quote – Our system will show you the best available prices for your selected transfer type." },
    { type: "paragraphe", texte: "✅ 4. Confirm and book – Secure your transfer online in minutes, with instant confirmation and no hidden costs." },
    { type: "paragraphe", texte: "By booking in advance, you guarantee the best rates and availability, avoiding last-minute price surges during peak ski season." },
  ],

  faq: [

  ],
};
