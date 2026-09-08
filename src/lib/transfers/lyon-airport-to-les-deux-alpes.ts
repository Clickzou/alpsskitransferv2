import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-les-deux-alpes-transfers/ (WordPress, 422 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLesDeuxAlpes: Transfer = {
  airport: "lyon-airport",
  resort: "les-deux-alpes",

  metaTitre: "Lyon to Les Deux Alpes Transfers | Book Your Ski Ride Now",
  metaDescription: "Book your Lyon to Les Deux Alpes transfers now! Shared & private options available. Comfortable, direct & affordable. Secure your ski transfer today!",
  h1: "Lyon to Les Deux Alpes Transfers",
  chapo: "If you’re looking for Lyon to Les Deux Alpes transfers, we offer both private and shared transfers to suit your needs. Whether you’re traveling solo, with family, or in a group, our transfer service ensures a comfortable, stress-free journey to one of the most popular ski resorts in the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the hassle of public transport and enjoy a direct, door-to-door transfer from Lyon Airport or Lyon city center to Les Deux Alpes. Our fleet includes modern, spacious vehicles, ensuring a smooth ride with plenty of room for ski equipment and luggage. Our professional, experienced drivers monitor traffic and weather conditions, guaranteeing the safest route." },
    { type: "paragraphe", texte: "With our Lyon to Les Deux Alpes transfers, you can sit back, relax, and enjoy the stunning mountain landscapes as we take you straight to your accommodation. We offer flexible departure times to align with your flight schedule, ensuring a seamless start to your ski holiday." },
    { type: "titre2", texte: "The Route: Lyon to Les Deux Alpes" },
    { type: "paragraphe", texte: "The transfer from Lyon to Les Deux Alpes covers approximately 160 km (99 miles) and takes around 2 hours and 30 minutes, depending on traffic and weather conditions." },
    { type: "paragraphe", texte: "The journey starts from Lyon Airport (LYS) or your accommodation in Lyon, heading southeast via the A48 and D1091, passing through scenic mountain landscapes, including Grenoble, before reaching Les Deux Alpes. The final stretch involves winding alpine roads, offering spectacular views of the Écrins National Park." },
    { type: "titre3", texte: "Transfer Pricing:" },
    { type: "liste", items: ["Shared transfer: Starting from €50 per person (one way).", "Private transfer: Prices start at €260 per vehicle, depending on the group size and vehicle type."] },
    { type: "paragraphe", texte: "For the best rates, we recommend booking your Lyon to Les Deux Alpes transfers in advance, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Les Deux Alpes" },
    { type: "paragraphe", texte: "Booking your Lyon to Les Deux Alpes transfers is simple and fast. Follow these easy steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Free Quote – Enter your travel details on our website for an instant price.✅ 2. Choose Your Transfer – Select between a shared or private transfer, depending on your preferences.✅ 3. Confirm & Pay Securely – Secure your booking online with an instant confirmation.✅ 4. Meet Your Driver – On the day of travel, your driver will be waiting for you at the airport or your hotel." },
    { type: "paragraphe", texte: "Ready to book? Secure your transfer now and travel stress-free!" },
  ],

  faq: [

  ],
};
