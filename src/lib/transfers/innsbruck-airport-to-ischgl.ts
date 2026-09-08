import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/innsbruck-to-ischgl-transfers/ (WordPress, 486 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const innsbruckAirportToIschgl: Transfer = {
  airport: "innsbruck-airport",
  resort: "ischgl",

  metaTitre: "Innsbruck to Ischgl Transfer | Fast & Easy Ski Transport",
  metaDescription: "Book your Innsbruck to Ischgl Transfer now! Private & shared options, best prices, door-to-door service. Secure your ride today!",
  h1: "Innsbruck to Ischgl Transfer",
  chapo: "Looking for a reliable Innsbruck to Ischgl transfer? Whether you need a private transfer for a luxurious experience or a shared transfer to save money, our service ensures a smooth, stress-free journey to your destination. Avoid the hassle of public transport and enjoy a door-to-door service from Innsbruck Airport to Ischgl, one of Austria’s most prestigious ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "Our Innsbruck to Ischgl transfers are designed to accommodate all types of travelers, from solo skiers to large groups. With our modern fleet, including comfortable minivans and luxury SUVs, we guarantee safe and efficient road transport even in winter conditions. Your professional driver will meet you at the airport and ensure a quick and direct trip, allowing you to relax and enjoy the scenic Alpine landscapes." },
    { type: "paragraphe", texte: "Book your Innsbruck to Ischgl transfer online today and secure the best price with no hidden fees. Whether you’re traveling for a weekend ski getaway or a long holiday, our transfer service offers affordable and premium options tailored to your needs. Compare prices, book now, and enjoy a seamless start to your ski adventure!" },
    { type: "titre2", texte: "Scenic Route & Transfer Details" },
    { type: "paragraphe", texte: "The Innsbruck to Ischgl transfer covers approximately 100 km, with an average journey time of 1h30 under normal weather conditions. The route takes you through picturesque Austrian landscapes, passing lush valleys, snow-capped peaks, and charming Alpine villages before arriving in the Silvretta Arena, home to Ischgl’s world-class ski slopes." },
    { type: "paragraphe", texte: "During the transfer, you’ll follow the A12 motorway, heading west through Zams and then taking the B188 road through the Paznaun Valley. This scenic drive offers breathtaking views of the Austrian Alps, making your journey as enjoyable as your destination." },
    { type: "titre2", texte: "Innsbruck to Ischgl Transfer Prices" },
    { type: "liste", items: ["Shared transfer: €45 - €70 per person", "Private transfer: €180 - €290 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Prices vary depending on the season, vehicle type, and group size. Booking in advance allows you to secure the best deals and ensure availability, especially during peak ski season." },
    { type: "paragraphe", texte: "Book your Innsbruck to Ischgl transfer today and experience comfortable, hassle-free travel to one of Austria’s top ski resorts!" },
    { type: "titre3", texte: "Our vehicles" },
  ],

  faq: [
    { question: "How to Book your Ski Transfer from Innsbruck to Ischgl ?", reponse: "✅ 1. Enter Your Travel Details – Choose your pick-up location (Innsbruck Airport, Innsbruck city, or a hotel) and destination (Ischgl ski resort or accommodation). ✅ 2. Select Your Transfer Type – Choose between a shared transfer (budget-friendly) or a private transfer (direct and exclusive). ✅ 3. Confirm Pricing & Availability – Instantly see real-time availability and transparent pricing. ✅ 4. Complete Your Booking – Secure your transfer online with instant confirmation. ✅ 5. Meet Your Driver & Enjoy Your Trip – Your professional driver will be waiting at your pick-up point, ready to take you directly to Ischgl." },
  ],
};
