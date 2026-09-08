import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-meribel-transfers/ (WordPress, 375 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToMeribel: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "meribel",

  metaTitre: "Chambéry to Meribel transfers | Book Now & Save!",
  metaDescription: "Book your Chambéry to Meribel transfers now! Fast, reliable ski transfers with private & shared options. Secure your ride today!",
  h1: "Chambéry to Meribel Transfers",
  chapo: "Planning your trip to the French Alps? Our Chambéry to Meribel transfers offer a fast, reliable, and hassle-free way to reach your ski resort. Whether you prefer a shared or private transfer, we ensure comfortable travel with professional drivers who navigate the mountain roads with ease. Avoid the hassle of waiting for public transport and enjoy a door-to-door service straight to your accommodation.",

  contenu: [
    { type: "paragraphe", texte: "Our transfers from Chambéry Airport to Meribel operate throughout the ski season, offering competitive prices and efficient travel options for individuals, families, and groups. With plenty of space for ski equipment, luggage, and extra passengers, you can relax and focus on your ski holiday. Book your Chambéry to Meribel transfer today and enjoy a smooth ride to one of the most popular ski resorts in the French Alps." },
    { type: "titre2", texte: "The Route from Chambéry to Meribel & Estimated Costs" },
    { type: "paragraphe", texte: "The journey from Chambéry Airport to Meribel takes approximately 1 hour and 30 minutes, covering 102 km of picturesque alpine roads. The route follows the A43 motorway before winding through the scenic Tarentaise Valley, offering breathtaking views of the snow-covered mountains." },
    { type: "titre3", texte: "Estimated Prices:" },
    { type: "liste", items: ["Shared Transfer: From €50 per person", "Private Transfer: From €250 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Prices vary based on the season, availability, and vehicle type, so we recommend booking early to secure the best rates." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Meribel" },
    { type: "paragraphe", texte: "Booking your ski transfer is quick and easy! Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel dates and group size to check real-time availability." },
    { type: "paragraphe", texte: "✅ 2. Choose Your Transfer Type – Select between a shared or private transfer, based on your needs and budget." },
    { type: "paragraphe", texte: "✅ 3. Confirm Your Booking – Secure your ride online with instant confirmation." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver – Upon arrival at Chambéry Airport, your professional driver will be waiting for you at the designated meeting point." },
    { type: "paragraphe", texte: "✅ 5. Enjoy a Stress-Free Journey – Sit back, relax, and travel comfortably to Meribel, ready to hit the slopes!" },
    { type: "paragraphe", texte: "Book your Chambéry to Meribel transfer today and start your ski holiday hassle-free!" },
  ],

  faq: [

  ],
};
