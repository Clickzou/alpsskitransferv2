import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/italy/bergamo-to-zermatt-tasch-transfers/ (WordPress, 443 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const bergamoAirportToZermatt: Transfer = {
  airport: "bergamo-airport",
  resort: "zermatt",

  metaTitre: "Bergamo to Zermatt-Tasch Transfers – Book Now",
  metaDescription: "Book your Bergamo to Zermatt-Tasch transfer today! Private & shared options available. Safe, fast & comfortable ski transfers. Reserve now!",
  h1: "Bergamo to Zermatt-Tasch Transfers",
  chapo: "Looking for a Bergamo to Zermatt-Tasch transfer that guarantees a smooth, reliable, and stress-free journey to your ski destination? Whether you prefer a private or shared transfer, we provide a seamless travel experience, ensuring a comfortable and direct ride to the Swiss Alps.",

  contenu: [
    { type: "paragraphe", texte: "Departing from Bergamo Airport (BGY), our door-to-door transfers take you straight to Täsch, the gateway to Zermatt. As Zermatt is a car-free ski resort, all travelers must reach Täsch before taking a train or electric taxi to their final accommodation. Avoid the hassle of coordinating multiple transport options – with our Bergamo to Zermatt-Tasch transfers, you’ll enjoy a stress-free journey with plenty of space for your luggage and ski equipment." },
    { type: "paragraphe", texte: "Our professional, English-speaking drivers ensure a safe and comfortable ride through picturesque Alpine roads. Whether you're traveling solo, with family, or in a group, our shared and private ski transfers offer the best value for money, combining affordability and premium service. Book in advance to secure the best price and guarantee availability during the peak ski season." },
    { type: "titre2", texte: "The Route from Bergamo to Zermatt-Tasch & Pricing" },
    { type: "paragraphe", texte: "The Bergamo to Zermatt-Tasch journey covers approximately 230 km, taking around 3h30 to 4h depending on weather and road conditions. The route includes breathtaking Alpine landscapes, passing through northern Italy and into Switzerland, offering stunning views of the Matterhorn region." },
    { type: "liste", items: ["Departure: Bergamo Airport (BGY) or Bergamo city center.", "Route Highlights: Milan, Domodossola, and the scenic Simplon Pass into Switzerland.", "Arrival: Täsch, where all vehicles stop before reaching Zermatt."] },
    { type: "titre3", texte: "💰 Pricing:" },
    { type: "liste", items: ["Shared Transfers: Starting from €95 per person (one way).", "Private Transfers: Prices range from €420 to €650 per vehicle, depending on group size and vehicle type."] },
    { type: "paragraphe", texte: "Booking early ensures the best rates, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Bergamo to Zermatt-Tasch" },
    { type: "paragraphe", texte: "Booking your Bergamo to Zermatt-Tasch transfer is simple and takes just a few minutes. Follow these easy steps:" },
    { type: "paragraphe", texte: "1️⃣ Enter your details – Select your pick-up point (Bergamo Airport or city center) and drop-off location (Täsch).2️⃣ Choose your transfer type – Opt for a private or shared ski transfer based on your budget and group size.3️⃣ Confirm your booking – Secure your transfer with real-time availability and instant confirmation.4️⃣ Meet your driver – Your professional driver will be waiting for you at your designated location.5️⃣ Enjoy a smooth ride – Sit back and relax as we take you directly to your destination." },
    { type: "paragraphe", texte: "Book early to guarantee the best price and availability!" },
  ],

  faq: [

  ],
};
