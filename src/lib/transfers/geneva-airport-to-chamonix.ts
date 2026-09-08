import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-chamonix-transfers/ (WordPress, 397 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToChamonix: Transfer = {
  airport: "geneva-airport",
  resort: "chamonix",

  metaTitre: "Geneva to Chamonix Transfer | Book Your Ride Now",
  metaDescription: "Book your Geneva to Chamonix transfer now! Fast, affordable shared & private transfers. Secure your ride today for a hassle-free ski trip.",
  h1: "Geneva to Chamonix Transfers",
  chapo: "Looking for a Geneva to Chamonix transfer that is fast, affordable, and stress-free? Whether you need a private transfer for ultimate comfort or a shared transfer for a budget-friendly ride, we have the perfect solution for your journey. Our door-to-door service ensures a seamless travel experience, taking you directly from Geneva Airport or downtown Geneva to your accommodation in Chamonix.",

  contenu: [
    { type: "paragraphe", texte: "With a travel time of just 1 hour and 15 minutes, our Geneva to Chamonix transfer is one of the quickest ways to reach the slopes of Mont Blanc. Avoid the hassle of public transport or long waits, and enjoy a comfortable ride in a well-equipped vehicle. Whether you're traveling alone, as a couple, with friends, or as a group, our shared and private transfer options cater to all needs. Book in advance to secure the best prices and guarantee availability for your ski holiday." },
    { type: "titre2", texte: "The Route from Geneva to Chamonix & Estimated Prices" },
    { type: "paragraphe", texte: "The journey from Geneva to Chamonix takes you through stunning Alpine landscapes, following the A40 highway, also known as the Autoroute Blanche. This scenic route offers breathtaking views of snow-covered peaks and picturesque mountain villages." },
    { type: "liste", items: ["Distance: Approx. 88 km (55 miles)", "Travel Time: Around 1h15 (depending on weather and traffic conditions)", "Price Range:Shared transfer: From €35 per person", "Private transfer: From €180 per vehicle"] },
    { type: "paragraphe", texte: "Whether you choose a shared or private transfer, our Geneva to Chamonix transfer ensures a smooth and safe ride." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Chamonix" },
    { type: "paragraphe", texte: "Booking your Geneva to Chamonix transfer is easy and takes just a few minutes. Follow these simple steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Enter Your Details – Select your pick-up location (Geneva Airport or city) and drop-off location (Chamonix)." },
    { type: "paragraphe", texte: "✅ 2. Choose Your Transfer Type – Select a shared transfer for a budget-friendly option or a private transfer for more comfort and flexibility." },
    { type: "paragraphe", texte: "✅ 3. Confirm Your Booking – Get instant confirmation and secure payment online." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver – On your travel day, your professional driver will be waiting at your chosen location, ready to take you to Chamonix." },
    { type: "paragraphe", texte: "Avoid the stress of last-minute arrangements – book now and enjoy a hassle-free ride from Geneva to Chamonix!" },
  ],

  faq: [

  ],
};
