import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-wengen-transfers/ (WordPress, 451 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToWengen: Transfer = {
  airport: "zurich-airport",
  resort: "wengen",

  metaTitre: "Zurich to Wengen Transfers | Private & Shared Rides",
  metaDescription: "Book your Zurich to Wengen transfers now! Private & shared options, reliable service, and competitive prices. Secure your ski transfer today!",
  h1: "Zurich to Wengen Transfers",
  chapo: "Looking for the best Zurich to Wengen transfers? Whether you need a private ride for maximum comfort or a shared transfer for a budget-friendly option, we provide a stress-free, reliable service to ensure a smooth journey to your ski destination. Our transfers offer a door-to-door experience, taking you directly from Zurich Airport or Zurich city center to the stunning Swiss ski resort of Wengen.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the hassle of public transport and multiple connections. With our Zurich to Wengen transfers, you can relax in a comfortable vehicle, knowing that an experienced driver will handle your journey through the breathtaking Swiss Alps. Our fleet includes modern, well-equipped vehicles designed for snowy conditions, ensuring a safe and seamless ride. Whether you are a solo traveler, a family, or a group of friends, we have the right option for you." },
    { type: "paragraphe", texte: "With competitive pricing and no hidden fees, you get the best value for money. Secure your spot now and enjoy a smooth, hassle-free transfer from Zurich to Wengen." },
    { type: "titre2", texte: "Scenic Route & Pricing for Zurich to Wengen Transfers" },
    { type: "paragraphe", texte: "The journey from Zurich to Wengen is a picturesque experience, passing through stunning Swiss landscapes with breathtaking views of the Alps, valleys, and charming villages. The transfer covers approximately 130 km, with a total travel time of 2h 30min to 3h, depending on weather conditions." },
    { type: "paragraphe", texte: "Since Wengen is a car-free ski resort, the transfer will take you to Lauterbrunnen, where you’ll board the scenic Wengernalpbahn train for the final ascent to Wengen. Our service ensures a seamless transition, with assistance for your luggage and ski equipment." },
    { type: "titre3", texte: "Pricing Information" },
    { type: "liste", items: ["Shared Transfer: Starting from €65 per person", "Private Transfer: Starting from €290 per vehicle"] },
    { type: "paragraphe", texte: "Rates vary depending on the season and availability. Book early to secure the best price!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Wengen" },
    { type: "paragraphe", texte: "Booking your Zurich to Wengen transfer is simple and quick. Follow these easy steps:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select between private or shared transfers based on your budget and group size." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up location (Zurich Airport or city), drop-off point (Lauterbrunnen station), and desired transfer time." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Get instant confirmation and secure payment options." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver & enjoy the ride – Your professional driver will be waiting at your chosen location to provide a smooth and stress-free journey." },
    { type: "paragraphe", texte: "Don’t wait until the last minute – book your Zurich to Wengen transfer today for a hassle-free and comfortable ski trip!" },
  ],

  faq: [

  ],
};
