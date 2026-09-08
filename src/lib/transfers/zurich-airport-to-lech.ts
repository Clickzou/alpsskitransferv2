import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-lech-am-arlberg-transfers/ (WordPress, 365 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToLech: Transfer = {
  airport: "zurich-airport",
  resort: "lech",

  metaTitre: "Zurich to Lech am Arlberg Transfer | Book Now",
  metaDescription: "Book your Zurich to Lech am Arlberg transfer now! Private & shared transfers. Safe, comfortable & direct to your ski resort. Secure your ride!",
  h1: "Zurich to Lech am Arlberg Transfers",
  chapo: "Looking for a Zurich to Lech am Arlberg transfer that ensures a smooth, hassle-free journey? Whether you're traveling solo, with family, or in a group, we provide both private and shared ski transfers tailored to your needs. Departing from Zurich Airport or city center, our professional drivers will take you directly to your accommodation in Lech am Arlberg, one of Austria’s most prestigious ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "Forget about waiting for public transport or car rental hassles—our door-to-door ski transfer service ensures maximum comfort and efficiency. With luggage space for ski equipment, comfortable seating, and a punctual service, we make your Zurich to Lech am Arlberg transfer a stress-free start to your ski holiday. The journey takes approximately 2h30 to 3h, depending on traffic and weather conditions. Book now to secure your transfer at the best price!" },
    { type: "titre2", texte: "Zurich to Lech am Arlberg – Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Zurich to Lech am Arlberg is as scenic as it is comfortable. Leaving Zurich Airport or the city center, you’ll travel on the A1 highway towards St. Gallen, passing through picturesque Austrian landscapes and Alpine villages. The route continues via the Arlberg Expressway (S16), which offers breathtaking mountain views before reaching Lech am Arlberg." },
    { type: "titre3", texte: "Our transfer prices vary based on the season and the type of service selected:" },
    { type: "liste", items: ["Shared transfer: From €85 per person", "Private transfer: Starting at €320 per vehicle"] },
    { type: "paragraphe", texte: "Book early to secure the best rates and availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Lech am Arlberg" },
    { type: "paragraphe", texte: "Booking your Zurich to Lech am Arlberg transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details to see real-time prices.✅ 2. Select Your Transfer Type – Choose between a shared or private transfer.✅ 3. Confirm & Pay Securely – Complete your online booking with instant confirmation.✅ 4. Meet Your Driver – Upon arrival, your driver will be waiting at the designated pick-up point." },
    { type: "paragraphe", texte: "Book now for a stress-free transfer to Lech am Arlberg!" },
  ],

  faq: [

  ],
};
