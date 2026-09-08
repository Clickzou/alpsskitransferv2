import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-val-disere-transfers/ (WordPress, 402 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToValDisere: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "val-disere",

  metaTitre: "Chambéry to Val d’Isère Transfers – Book Now",
  metaDescription: "Book your Chambéry to Val d’Isère transfer now! Private & shared options, fast & reliable service. Avoid delays & travel stress-free!",
  h1: "Chambéry to Val d’Isère Transfers",
  chapo: "Looking for a Chambéry to Val d’Isère transfer that ensures a comfortable, stress-free journey to one of the most famous ski resorts in the French Alps? Whether you need a private transfer for a luxury experience or a shared transfer for a cost-effective solution, we have the perfect option for you. Avoid the hassle of public transport and enjoy a direct, door-to-door transfer with experienced drivers who ensure your ride is smooth and safe.",

  contenu: [
    { type: "paragraphe", texte: "Our Chambéry to Val d’Isère transfers operate daily throughout the ski season, with convenient pick-ups at Chambéry Airport or any location within the city. The service is available for solo travelers, families, or larger groups, with vehicles adapted to all passenger needs, including child seats, extra luggage space, and ski equipment storage. Book now to secure the best availability and get to Val d’Isère quickly and comfortably!" },
    { type: "titre2", texte: "Chambéry to Val d’Isère: A Scenic Alpine Journey" },
    { type: "paragraphe", texte: "The transfer from Chambéry to Val d’Isère covers approximately 140 km (87 miles) and takes around 2h30 in normal weather conditions. The journey follows a picturesque route through the Tarentaise Valley, passing charming Alpine villages before ascending into the Espace Killy ski area, home to Val d’Isère and Tignes." },
    { type: "paragraphe", texte: "During peak winter months, snowy conditions may extend travel time, but rest assured that our professional drivers are trained for winter road conditions, ensuring a safe and smooth ride." },
    { type: "titre3", texte: "Estimated Price Range:" },
    { type: "liste", items: ["Shared Transfers: Starting from €60 per person", "Private Transfers: Starting from €290 per vehicle"] },
    { type: "paragraphe", texte: "For groups or luxury private transfers, we offer premium vehicles with added comfort and flexibility." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Val d’Isère" },
    { type: "paragraphe", texte: "Booking your Chambéry to Val d’Isère transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Enter Your Travel Details – Choose your pick-up and drop-off location, along with the number of passengers.✅ 2. Select Your Transfer Type – Choose between a shared or private transfer based on your budget and preferences.✅ 3. Secure Your Booking – Complete your reservation online with instant confirmation.✅ 4. Meet Your Driver – Your driver will track your flight and be waiting at the designated meeting point for a seamless departure." },
    { type: "paragraphe", texte: "Ready to travel? Book your transfer today and enjoy a worry-free ride to Val d’Isère!" },
  ],

  faq: [

  ],
};
