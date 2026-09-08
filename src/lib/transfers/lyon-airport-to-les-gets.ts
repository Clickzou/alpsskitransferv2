import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-les-gets-transfers/ (WordPress, 335 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToLesGets: Transfer = {
  airport: "lyon-airport",
  resort: "les-gets",

  metaTitre: "Lyon to Les Gets Transfers | Book Now & Travel Comfortably",
  metaDescription: "Book your Lyon to Les Gets transfer today! Fast, reliable, and comfortable transfers to your ski resort. Private & shared options available.",
  h1: "Lyon to Les Gets Transfers",
  chapo: "Planning a ski trip from Lyon to Les Gets? Our Lyon to Les Gets transfers provide a reliable, stress-free, and efficient way to reach this popular ski resort in the French Alps. Whether you choose a private transfer for a direct, exclusive ride or a shared transfer for a budget-friendly option, we ensure a comfortable journey tailored to your needs.",

  contenu: [
    { type: "paragraphe", texte: "With our door-to-door service, you avoid the hassle of public transport and long waiting times. Our professional, English-speaking drivers monitor your flight to adjust for any delays, ensuring a smooth and safe journey to Les Gets. Our modern fleet includes luxury sedans, spacious minivans, and eco-friendly vehicles, all designed for maximum comfort in winter conditions. Book in advance to secure the best prices and guaranteed availability for your ski holiday!" },
    { type: "titre2", texte: "Lyon to Les Gets: Distance, Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Lyon Airport to Les Gets covers approximately 190 km and takes around 2 hours and 30 minutes, depending on traffic and weather conditions. The route follows the A40 motorway, passing through scenic Alpine landscapes before reaching the Portes du Soleil ski area." },
    { type: "titre3", texte: "Transfer Prices:" },
    { type: "liste", items: ["Shared transfers: Starting from €45 per person", "Private transfers: Starting from €220 per vehicle"] },
    { type: "paragraphe", texte: "All transfers include luggage space for ski equipment, ensuring a hassle-free arrival at your accommodation in Les Gets." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Les Gets" },
    { type: "paragraphe", texte: "Booking your Lyon to Les Gets transfer is simple and fast:" },
    { type: "paragraphe", texte: "✅ 1. Select your transfer type – Choose between private or shared options.✅ 2. Enter your details – Provide your pick-up location, destination, and travel date.✅ 3. Confirm and pay securely – Get instant booking confirmation.✅ 4. Meet your driver – Your professional chauffeur will be waiting at the arrival terminal." },
    { type: "paragraphe", texte: "Ready to book? Secure your Lyon to Les Gets transfer today and travel stress-free!" },
  ],

  faq: [

  ],
};
