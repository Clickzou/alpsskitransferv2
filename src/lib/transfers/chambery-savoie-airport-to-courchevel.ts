import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-courchevel-transfers/ (WordPress, 383 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToCourchevel: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "courchevel",

  metaTitre: "Chambéry to Courchevel Transfers | Fast & Reliable Rides",
  metaDescription: "Book your Chambéry to Courchevel transfers now! Private & shared options, best prices, and hassle-free booking. Get to the slopes quickly !",
  h1: "Chambéry to Courchevel Transfers",
  chapo: "Planning a ski trip? Our Chambéry to Courchevel transfers provide a fast, reliable, and stress-free way to reach the world-famous Courchevel ski resort. Whether you choose a private or shared transfer, we ensure a comfortable and direct journey from Chambéry Airport to the heart of the Three Valleys ski area. Avoid the hassle of renting a car or navigating public transport—our professional drivers take care of everything.",

  contenu: [
    { type: "paragraphe", texte: "Arriving at Chambéry Airport means you’re already close to the slopes. Our transfers are door-to-door, ensuring you arrive at your accommodation without stress. Whether you’re traveling solo, with family, or in a group, we provide budget-friendly shared transfers and luxury private rides. Enjoy a seamless experience with luggage assistance, ski equipment transport, and flexible pick-up times. Book your transfer today and start your ski holiday the right way!" },
    { type: "titre2", texte: "Scenic Route & Pricing for Chambéry to Courchevel Transfers" },
    { type: "paragraphe", texte: "The journey from Chambéry Airport to Courchevel covers approximately 110 km, taking around 1 hour 30 minutes, depending on weather and traffic conditions. The route passes through the stunning Tarentaise Valley, offering breathtaking views of the snow-covered peaks and charming alpine villages." },
    { type: "paragraphe", texte: "As you ascend towards Courchevel, you’ll experience winding mountain roads, ensuring an exciting and scenic ride. Our drivers are highly experienced in winter driving conditions, ensuring a safe and smooth journey." },
    { type: "titre3", texte: "Price Range:" },
    { type: "liste", items: ["Shared Transfers: From €50 per person", "Private Transfers: From €250 per vehicle"] },
    { type: "paragraphe", texte: "Prices vary based on availability, season, and group size. Early booking is recommended for the best rates!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Courchevel" },
    { type: "paragraphe", texte: "Booking your Chambéry to Courchevel transfer is simple and quick! Follow these easy steps:" },
    { type: "paragraphe", texte: "✅ 1. Enter your details – Choose your pick-up location, drop-off in Courchevel, and travel date.✅ 2. Select your transfer type – Choose between a private transfer or a shared shuttle.✅ 3. Confirm your booking – Secure your ride with instant confirmation and transparent pricing.✅ 4. Meet your driver & enjoy the ride – Relax as our professional driver takes you directly to your ski resort." },
    { type: "paragraphe", texte: "Book your transfer now and enjoy a hassle-free journey to Courchevel!" },
  ],

  faq: [

  ],
};
