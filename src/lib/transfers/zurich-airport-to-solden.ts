import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-solden-transfers/ (WordPress, 408 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToSolden: Transfer = {
  airport: "zurich-airport",
  resort: "solden",

  metaTitre: "Zurich to Solden Transfer | Book Your Ride Now",
  metaDescription: "Book your Zurich to Solden transfer today! Private & shared options available, best prices, and 24/7 service. Secure your ski transfer now",
  h1: "Zurich to Solden Transfers",
  chapo: "Looking for a Zurich to Sölden transfer that guarantees comfort, efficiency, and reliability? Whether you're heading to Sölden for its world-class skiing or breathtaking Alpine scenery, our transfer service ensures a smooth journey from Zurich Airport or city center straight to your accommodation. Avoid the hassle of renting a car or dealing with public transport—we offer both private and shared transfer options, providing door-to-door service at the best rates.",

  contenu: [
    { type: "paragraphe", texte: "With professional drivers, modern vehicles, and competitive pricing, your journey will be stress-free and tailored to your needs. Our Zurich to Sölden transfer is available 24/7, ensuring you reach the slopes quickly and safely. Enjoy spacious seating, extra luggage capacity for ski equipment, and a relaxing ride through the stunning Austrian Alps." },
    { type: "paragraphe", texte: "Book your transfer today and experience a hassle-free, premium ski transfer. Whether you’re traveling solo, as a couple, or with a group, we ensure your journey from Zurich to Sölden is smooth and enjoyable." },
    { type: "titre2", texte: "Zurich to Sölden: Scenic Alpine Route & Pricing" },
    { type: "paragraphe", texte: "The transfer from Zurich to Sölden covers approximately 260 km, taking around 3.5 to 4 hours, depending on weather and traffic conditions. The route follows scenic Alpine roads, passing through Liechtenstein and Austria, offering breathtaking mountain landscapes. You'll travel via the A3 and A12 highways, passing Innsbruck before reaching the renowned Sölden ski resort, known for its glacier skiing and vibrant après-ski scene." },
    { type: "titre3", texte: "Price Range for a Zurich to Sölden Transfer" },
    { type: "liste", items: ["Shared Transfer: Starting from €75 per person", "Private Transfer: Starting from €320 per vehicle"] },
    { type: "paragraphe", texte: "Prices vary based on season, availability, and vehicle type. Early booking is recommended for the best rates." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Sölden" },
    { type: "paragraphe", texte: "Booking your Zurich to Sölden transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details online to check pricing and availability.✅ 2. Choose Your Transfer – Select between a private or shared option, depending on your needs.✅ 3. Secure Your Booking – Confirm your transfer with a safe, online payment.✅ 4. Meet Your Driver – Your professional driver will pick you up at the airport or city center, ensuring a smooth journey to Sölden." },
    { type: "paragraphe", texte: "Book your Zurich to Sölden transfer now and enjoy a stress-free trip to the slopes!" },
  ],

  faq: [

  ],
};
