import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-val-thorens-3-valleys-transfers/ (WordPress, 439 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToValThorens: Transfer = {
  airport: "lyon-airport",
  resort: "val-thorens",

  metaTitre: "Lyon to Val Thorens 3 Valleys Transfers – Book Now!",
  metaDescription: "Book your Lyon to Val Thorens 3 Valleys transfer today! Shared & private ski transfers available. Reliable, fast & comfortable. Reserve now!",
  h1: "Lyon to Val Thorens 3 Valleys Transfers",
  chapo: "Looking for a Lyon to Val Thorens 3 Valleys transfer that guarantees a smooth, stress-free journey? Whether you’re traveling solo, as a family, or with a group, we offer both shared and private ski transfers to take you directly from Lyon Airport or Lyon city center to Val Thorens, the highest resort in the 3 Valleys ski area. Avoid the hassle of public transport, long waits, and multiple stops—our door-to-door transfer service ensures a comfortable, reliable ride straight to your accommodation.",

  contenu: [
    { type: "paragraphe", texte: "With our Lyon to Val Thorens 3 Valleys transfers, you can enjoy a safe, comfortable, and direct journey through the beautiful French Alps. Our experienced drivers handle winter road conditions with ease, and our fleet includes luxury sedans, minivans, and larger vehicles to accommodate all travel needs. We track flight arrivals to adjust for any delays, ensuring your ski transfer is seamless from start to finish. Book in advance for the best rates, with transparent pricing and no hidden fees. Whether you need an early morning pickup or a late-night arrival, we’ve got you covered for a stress-free ski holiday in Val Thorens." },
    { type: "titre2", texte: "The Route from Lyon to Val Thorens & Pricing" },
    { type: "paragraphe", texte: "The journey from Lyon to Val Thorens covers approximately 200 km, with a travel time of 3 to 3.5 hours, depending on traffic and weather conditions. The route takes you through scenic alpine landscapes, passing Chambéry and Albertville, before heading up the winding mountain roads to reach Val Thorens at 2,300m altitude." },
    { type: "titre3", texte: "Estimated Prices:" },
    { type: "liste", items: ["Shared Transfers: Starting from €80 per person (one way).", "Private Transfers: Starting from €320 per vehicle (one way, up to 4 passengers).", "Luxury Vehicles & Large Groups: Custom pricing available upon request."] },
    { type: "paragraphe", texte: "Booking your Lyon to Val Thorens 3 Valleys transfer early ensures the best availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Val Thorens" },
    { type: "paragraphe", texte: "Booking your Lyon to Val Thorens 3 Valleys transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Choose Your Transfer Type – Select between shared or private transfer options.✅ 2. Enter Your Travel Details – Provide your pickup location, date, and number of passengers.✅ 3. Get Instant Confirmation – Receive a booking confirmation with all the transfer details.✅ 4. Meet Your Driver – Your driver will be waiting at the specified location, ready to take you to Val Thorens." },
    { type: "paragraphe", texte: "Book your Lyon to Val Thorens ski transfer today and enjoy a reliable, stress-free journey to the 3 Valleys!" },
  ],

  faq: [

  ],
};
