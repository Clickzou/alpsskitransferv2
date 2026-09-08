import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-chamonix-transfers/ (WordPress, 463 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToChamonix: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "chamonix",

  metaTitre: "Chambéry to Chamonix Transfers | Private & Shared Rides",
  metaDescription: "Book your Chambéry to Chamonix transfer today! Private & shared transfers with door-to-door service. Comfortable, reliable & affordable. Reserve now!",
  h1: "Chambéry to Chamonix Transfers",
  chapo: "Looking for a stress-free way to get from Chambéry to Chamonix? Our private and shared transfers offer the most convenient, reliable, and comfortable transport between these two ski destinations. Whether you’re traveling solo, with family, or in a group, we have the perfect transfer option to suit your needs.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the hassle of renting a car or waiting for unreliable public transport. Our Chambéry to Chamonix transfers provide a door-to-door service, ensuring you reach your ski resort quickly and comfortably. With professional, English-speaking drivers, spacious vehicles, and a commitment to safety, we make sure your journey is smooth and enjoyable." },
    { type: "paragraphe", texte: "We offer both private ski transfers for a personalized experience and shared transfers for a budget-friendly alternative. No matter your preference, our fleet includes luxury sedans, spacious minivans, and even larger vehicles for bigger groups. Plus, with flexible pick-up times and real-time flight monitoring, we adjust to your schedule, so you never have to worry about delays." },
    { type: "paragraphe", texte: "Book your Chambéry to Chamonix transfer today and enjoy a stress-free start to your ski trip!" },
    { type: "titre2", texte: "The Route from Chambéry to Chamonix & Pricing" },
    { type: "paragraphe", texte: "The Chambéry to Chamonix route covers approximately 130 km, with a journey time of around 1 hour 45 minutes under normal traffic conditions. The drive takes you through picturesque Alpine scenery, passing through valleys and alongside breathtaking mountain views. The journey primarily follows the A41 and A40 motorways, ensuring a smooth and direct transfer to your destination." },
    { type: "paragraphe", texte: "Winter weather conditions can sometimes affect travel times, but our experienced drivers ensure a safe and efficient ride, adapting to road conditions when necessary." },
    { type: "titre3", texte: "Pricing for Chambéry to Chamonix Transfers" },
    { type: "liste", items: ["Shared transfers: Starting from €50 per person", "Private transfers: Ranging from €220 to €350 per vehicle, depending on the group size and vehicle type"] },
    { type: "paragraphe", texte: "Our prices are competitive and transparent, with no hidden fees. Get a quote instantly and secure your Chambéry to Chamonix transfer at the best rate." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Chamonix" },
    { type: "paragraphe", texte: "Booking your Chambéry to Chamonix transfer is quick and easy. Follow these simple steps to secure your ride:" },
    { type: "paragraphe", texte: "1. Get an Instant Quote – Enter your travel details on our booking platform to see available transfer options." },
    { type: "paragraphe", texte: "2. Choose Your Transfer Type – Select between a private or shared transfer, depending on your needs and budget." },
    { type: "paragraphe", texte: "3. Confirm & Pay Securely – Complete your reservation with our easy and secure payment system." },
    { type: "paragraphe", texte: "4. Meet Your Driver – Upon arrival, your driver will be waiting at the designated meeting point, ready to take you directly to Chamonix." },
    { type: "paragraphe", texte: "Book now to ensure availability and the best price for your Chambéry to Chamonix transfer!" },
  ],

  faq: [

  ],
};
