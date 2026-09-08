import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-les-deux-alpes-transfers/ (WordPress, 447 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLesDeuxAlpes: Transfer = {
  airport: "geneva-airport",
  resort: "les-deux-alpes",

  metaTitre: "Geneva to Les Deux Alpes Transfer | Book Your Ride Today",
  metaDescription: "Book your Geneva to Les Deux Alpes transfer now! Private & shared options, best prices, and reliable service. Secure your ski transfer today!",
  h1: "Geneva to Les Deux Alpes Transfers",
  chapo: "Traveling from Geneva to Les Deux Alpes? Our private and shared transfers offer a stress-free, comfortable, and reliable way to reach your ski resort. Whether you're arriving at Geneva Airport alone, with family, or in a group, we provide door-to-door transfers tailored to your needs. Avoid the hassle of public transport, long waits, and complicated connections—our professional ski transfer service ensures you arrive at Les Deux Alpes smoothly and on time.",

  contenu: [
    { type: "paragraphe", texte: "With modern, spacious vehicles, experienced English-speaking drivers, and a commitment to safety, we provide the best value ski transfers between Geneva and Les Deux Alpes. Travel in comfort, with plenty of space for your luggage and ski equipment, and enjoy a scenic journey through the French Alps. Our services include flight monitoring, ensuring we adjust for delays at no extra charge. Competitive prices, an easy online booking system, and 24/7 customer support make us the ideal choice for your Geneva to Les Deux Alpes transfer." },
    { type: "titre2", texte: "Geneva to Les Deux Alpes: Route & Estimated Prices" },
    { type: "paragraphe", texte: "The transfer from Geneva to Les Deux Alpes covers approximately 210 km, taking around 3 hours and 15 minutes under normal road conditions. The journey offers stunning alpine views, passing through Chambéry and the Oisans region, with breathtaking landscapes along the way." },
    { type: "titre3", texte: "💰 Pricing :" },
    { type: "liste", items: ["Private transfer: Prices start from €350 for a standard car (1-3 passengers) and up to €500+ for larger vehicles.", "Shared transfer: More budget-friendly, with rates starting from €80 per person, depending on availability and schedule."] },
    { type: "paragraphe", texte: "Whether you prefer the privacy of a direct transfer or the affordability of a shared service, we have options suited to all budgets." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Les Deux Alpes" },
    { type: "paragraphe", texte: "Booking your Geneva to Les Deux Alpes transfer is simple and takes just a few minutes. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote: Enter your travel details on our online booking system to see real-time availability and pricing.✅ 2. Choose Your Transfer: Select between private or shared transfers based on your preferences and budget.✅ 3. Secure Your Booking: Confirm your reservation with instant online payment and receive immediate confirmation.✅ 4. Meet Your Driver: Upon arrival at Geneva Airport, your driver will be waiting at the designated meeting point.✅ 5. Enjoy Your Journey: Sit back, relax, and enjoy a smooth ride to Les Deux Alpes." },
    { type: "paragraphe", texte: "Don't wait—book your Geneva to Les Deux Alpes transfer today for a stress-free start to your ski trip!" },
  ],

  faq: [

  ],
};
