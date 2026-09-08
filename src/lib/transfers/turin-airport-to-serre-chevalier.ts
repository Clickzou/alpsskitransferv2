import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/italy/turin-to-serre-chevalier-transfers/ (WordPress, 386 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const turinAirportToSerreChevalier: Transfer = {
  airport: "turin-airport",
  resort: "serre-chevalier",

  metaTitre: "Turin to Serre Chevalier Transfers | Book Now!",
  metaDescription: "Need a Turin to Serre Chevalier transfer? Book now for private or shared transfers at the best price. Hassle-free ski transfers—reserve today!",
  h1: "Turin to Serre Chevalier Transfers",
  chapo: "Looking for Turin to Serre Chevalier transfers that guarantee a comfortable, stress-free journey? Whether you're traveling solo, as a group, or with family, we offer both private and shared transfers tailored to your needs. Our door-to-door service ensures a smooth ride from Turin Airport (TRN) or the city center directly to your ski accommodation in Serre Chevalier, so you can start your ski trip without delays.",

  contenu: [
    { type: "paragraphe", texte: "With a professional English-speaking driver, our ski transfers provide a safe and efficient journey through the stunning Alps. Avoid the hassle of public transport and enjoy a direct transfer in a comfortable vehicle with space for ski equipment and luggage. No waiting, no crowded buses—just a seamless experience getting from Turin to Serre Chevalier." },
    { type: "paragraphe", texte: "Book now to secure your Turin to Serre Chevalier transfer at the best price and enjoy a hassle-free start to your ski holiday!" },
    { type: "titre2", texte: "Turin to Serre Chevalier: Route & Transfer Prices" },
    { type: "paragraphe", texte: "The distance from Turin to Serre Chevalier is approximately 110 km, with an average travel time of 2 hours, depending on weather and road conditions. The journey takes you through scenic Alpine landscapes, passing Oulx and the famous Col du Montgenèvre, one of the most picturesque mountain passes in the region." },
    { type: "titre3", texte: "Estimated Transfer Prices:" },
    { type: "liste", items: ["Shared Transfer: From €50 per person", "Private Transfer: From €220 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Our transfers ensure a comfortable and convenient ride, allowing you to relax and enjoy the views as you head to one of France’s top ski destinations." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Turin to Serre Chevalier" },
    { type: "paragraphe", texte: "Booking your Turin to Serre Chevalier transfer is quick and easy. Follow these steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details online and select your preferred transfer option.✅ 2. Choose Your Transfer – Pick between private or shared transfer based on your group size and budget.✅ 3. Confirm Your Booking – Secure your transfer with instant confirmation and flexible payment options.✅ 4. Meet Your Driver – Your professional driver will be waiting at Turin Airport or your chosen pick-up location." },
    { type: "paragraphe", texte: "Book your ski transfer today and enjoy a stress-free ride from Turin to Serre Chevalier!" },
  ],

  faq: [

  ],
};
