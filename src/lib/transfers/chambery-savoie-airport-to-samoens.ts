import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-samoens-transfers/ (WordPress, 344 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToSamoens: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "samoens",

  metaTitre: "Chambéry to Samoëns Transfers | Book Your Ride Now",
  metaDescription: "Book your Chambéry to Samoëns transfer now! Private & shared options available. Comfortable, reliable, and best prices. Secure your spot today!",
  h1: "Chambéry to Samoens Transfers",
  chapo: "Looking for a Chambéry to Samoëns transfer that ensures a smooth, hassle-free journey? Whether you prefer a shared transfer or a private ride, our services provide comfortable, reliable, and affordable options for getting from Chambéry Airport to Samoëns. Avoid the stress of public transport and travel directly to your ski resort with our professional drivers.",

  contenu: [
    { type: "paragraphe", texte: "Our door-to-door ski transfer service operates throughout the season, offering safe and efficient transport tailored to your needs. Whether you’re traveling solo, with family, or in a group, we offer the best way to reach Samoëns from Chambéry. With experienced drivers, spacious vehicles for ski equipment, and punctual service, you can sit back and enjoy the journey. Book now to secure the best price and availability for your ski transfer from Chambéry to Samoëns." },
    { type: "titre2", texte: "Scenic Route & Pricing for Chambéry to Samoëns Transfers" },
    { type: "paragraphe", texte: "The journey from Chambéry Airport to Samoëns covers approximately 120 km, with a typical travel time of 1 hour 45 minutes, depending on road and weather conditions. The route takes you through stunning alpine landscapes, winding roads, and scenic mountain passes, making your ride as enjoyable as it is convenient." },
    { type: "titre3", texte: "We offer both shared and private transfers, with pricing starting at:" },
    { type: "liste", items: ["Shared transfer: from €50 per person", "Private transfer: from €240 per vehicle"] },
    { type: "paragraphe", texte: "Our competitive pricing ensures you get the best value while enjoying a stress-free journey to your ski destination." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Samoëns" },
    { type: "paragraphe", texte: "Booking your Chambéry to Samoëns transfer is simple and secure:" },
    { type: "paragraphe", texte: "✅ 1. Select your transfer type – Choose between a shared or private ski transfer.✅ 2. Enter your details – Provide your flight information, number of passengers, and luggage details.✅ 3. Get an instant quote – Check real-time availability and pricing.✅ 4. Confirm your booking – Secure your transfer online in just a few clicks." },
    { type: "paragraphe", texte: "Book now and enjoy a stress-free ride from Chambéry to Samoëns!" },
  ],

  faq: [

  ],
};
