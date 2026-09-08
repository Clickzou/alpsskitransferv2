import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-la-plagne-transfers/ (WordPress, 416 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLaPlagne: Transfer = {
  airport: "geneva-airport",
  resort: "la-plagne",

  metaTitre: "Geneva to La Plagne Transfer | Book Now & Travel Easy",
  metaDescription: "Book your Geneva to La Plagne transfer now! Private & shared ski transfers available. Safe, reliable & comfortable transport. Get a quote today!",
  h1: "Geneva to La Plagne Transfers",
  chapo: "Looking for a Geneva to La Plagne transfer that ensures a comfortable, stress-free journey to the slopes? Whether you prefer a private transfer for exclusive travel or a shared transfer for an affordable option, we provide safe and convenient airport transfers. Departing from Geneva Airport, our service guarantees door-to-door transport to your La Plagne accommodation, so you can skip the hassle of public transport and start your ski holiday smoothly.",

  contenu: [
    { type: "paragraphe", texte: "With professional, experienced drivers, our Geneva to La Plagne ski transfers are equipped to handle winter road conditions, ensuring a reliable and efficient journey. Whether you’re traveling solo, with family, or in a group, we offer luxury vehicles, spacious minivans, and budget-friendly shared options. Our pricing is transparent, competitive, and flexible, catering to all types of travelers. Book your transfer online today and arrive relaxed and ready to hit the slopes!" },
    { type: "titre2", texte: "Route & Pricing for Your Geneva to La Plagne Transfer" },
    { type: "paragraphe", texte: "The Geneva to La Plagne transfer covers approximately 150 km and takes around 2 hours 45 minutes to 3 hours 30 minutes, depending on traffic and weather conditions. The route follows scenic Alpine roads, offering stunning mountain views as you ascend towards the resort. During peak ski season, the journey may take slightly longer, but our expert drivers ensure a smooth and comfortable experience." },
    { type: "titre3", texte: "Pricing:" },
    { type: "liste", items: ["Shared transfer: Starting from €55 per person.", "Private transfer: Ranging from €290 to €450 per vehicle, depending on the number of passengers and vehicle type."] },
    { type: "paragraphe", texte: "Our ski transfers include luggage space for ski equipment, optional child seats, and flexible departure times to match your flight schedule." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to La Plagne" },
    { type: "paragraphe", texte: "Booking your Geneva to La Plagne transfer is quick and easy. Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your pick-up location (Geneva Airport) and destination (La Plagne) in our booking system." },
    { type: "paragraphe", texte: "✅ 2. Choose Your Transfer Type – Select between a private transfer for luxury and exclusivity or a shared transfer for a budget-friendly option." },
    { type: "paragraphe", texte: "✅ 3. Confirm Your Details – Add your passenger information, flight details, and special requirements (e.g., child seats, extra luggage)." },
    { type: "paragraphe", texte: "✅ 4. Secure Your Booking – Complete your payment online and receive an instant confirmation with driver details." },
    { type: "paragraphe", texte: "Book your transfer today and enjoy a seamless journey from Geneva to La Plagne!" },
  ],

  faq: [

  ],
};
