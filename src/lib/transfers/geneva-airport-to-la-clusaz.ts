import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-la-clusaz-transfers/ (WordPress, 401 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLaClusaz: Transfer = {
  airport: "geneva-airport",
  resort: "la-clusaz",

  metaTitre: "Geneva to La Clusaz Transfer – Fast & Affordable Ride",
  metaDescription: "Book your Geneva to La Clusaz transfer today! Fast, reliable & affordable private or shared transfers. Secure your ski transfer now!",
  h1: "Geneva to La Clusaz Transfers",
  chapo: "Looking for a Geneva to La Clusaz Transfer? Whether you choose a private or shared transfer, we ensure a comfortable, stress-free journey from Geneva Airport to La Clusaz, one of the most charming ski resorts in the French Alps. Avoid the hassle of public transport, long waiting times, or multiple stops—our service guarantees door-to-door convenience. With our professional drivers and modern fleet, you’ll reach La Clusaz quickly and safely, ready to enjoy your ski holiday.",

  contenu: [
    { type: "paragraphe", texte: "Our ski transfers from Geneva to La Clusaz cater to individual travelers, families, and large groups. Vehicles are equipped for winter conditions, offering ample space for ski equipment and luggage. Whether you're heading for a weekend ski trip or a full holiday, our competitive pricing and flexible options make booking your transfer from Geneva to La Clusaz effortless. Book today and start your ski holiday with ease!" },
    { type: "titre2", texte: "The Route from Geneva to La Clusaz & Pricing" },
    { type: "paragraphe", texte: "The journey from Geneva Airport to La Clusaz covers approximately 65 km and takes around 1h15, depending on weather and traffic conditions. The scenic drive takes you through the picturesque Aravis mountain range, offering stunning Alpine landscapes as you approach this renowned ski destination." },
    { type: "paragraphe", texte: "We offer shared and private transfers, allowing you to select the best option for your budget and convenience. Pricing varies based on seasonality and vehicle choice:" },
    { type: "titre3", texte: "Estimated Pricing :" },
    { type: "liste", items: ["Shared transfer: starting from €40 per person", "Private transfer: starting from €140 per vehicle"] },
    { type: "paragraphe", texte: "With fixed pricing, no hidden fees, and the possibility to pre-book online, securing your Geneva to La Clusaz transfer is simple and stress-free." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to La Clusaz" },
    { type: "paragraphe", texte: "Booking your ski transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details and check availability.✅ 2. Choose Your Transfer – Select between a shared or private transfer.✅ 3. Confirm Your Booking – Secure your transfer with instant confirmation.✅ 4. Meet Your Driver – Our professional driver will be waiting for you at Geneva Airport.✅ 5. Enjoy Your Ride – Relax in a comfortable vehicle and arrive hassle-free." },
    { type: "paragraphe", texte: "Ready to book your transfer? Secure your spot now and travel effortlessly from Geneva to La Clusaz!" },
  ],

  faq: [

  ],
};
