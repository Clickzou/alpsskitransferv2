import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/grenoble-to-serre-chevalier-transfers/ (WordPress, 400 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const grenobleIsereAirportToSerreChevalier: Transfer = {
  airport: "grenoble-isere-airport",
  resort: "serre-chevalier",

  metaTitre: "Grenoble to Serre Chevalier Transfers | Book Now",
  metaDescription: "Book your Grenoble to Serre Chevalier transfer now! Private & shared options available. Fast, reliable, and comfortable ski transfers.",
  h1: "Grenoble to Serre Chevalier Transfers",
  chapo: "Looking for a Grenoble to Serre Chevalier transfer that guarantees a smooth, stress-free journey to your ski resort? Whether you're traveling alone, with family, or in a group, we offer both private and shared ski transfers tailored to your needs. Our door-to-door service ensures maximum comfort and reliability, taking you from Grenoble Airport or Grenoble city center directly to your accommodation in Serre Chevalier.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the hassle of public transport, long waits, and multiple stops. Our professional drivers ensure a safe and efficient transfer, navigating the Alpine roads with expertise. With modern, spacious vehicles equipped for winter conditions, you can sit back and relax while we take care of your travel needs. Book your transfer now and experience the easiest way to reach Serre Chevalier from Grenoble." },
    { type: "titre2", texte: "The Route from Grenoble to Serre Chevalier" },
    { type: "paragraphe", texte: "The journey from Grenoble to Serre Chevalier covers approximately 120 km and takes around 2 hours and 15 minutes, depending on weather and traffic conditions. The route follows the A51 highway before transitioning to scenic mountain roads, offering breathtaking views of the French Alps." },
    { type: "paragraphe", texte: "Serre Chevalier is one of the most famous ski resorts in the Hautes-Alpes region, known for its extensive ski terrain and charming alpine villages. Whether you're heading to Briançon, Chantemerle, Villeneuve, or Le Monêtier-les-Bains, our transfers provide a smooth, direct service to your exact location." },
    { type: "titre3", texte: "Price Range:" },
    { type: "liste", items: ["Shared Transfers: From €50 per person", "Private Transfers: Starting at €250 per vehicle"] },
    { type: "paragraphe", texte: "For the best rates, we recommend booking in advance to secure your preferred transfer option." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Grenoble to Serre Chevalier" },
    { type: "paragraphe", texte: "Booking your transfer is quick and easy! Just follow these steps:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select between a private or shared transfer based on your preference and budget." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up location, drop-off destination, and travel date." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Secure your transfer instantly with our safe online payment system." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver & enjoy the ride – Our professional driver will be waiting for you at the agreed location, ready to take you directly to Serre Chevalier." },
    { type: "paragraphe", texte: "Book now for a hassle-free Grenoble to Serre Chevalier transfer and start your ski holiday the right way!" },
  ],

  faq: [

  ],
};
