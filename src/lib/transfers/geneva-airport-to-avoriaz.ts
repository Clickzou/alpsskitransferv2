import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-avoriaz-transfers/ (WordPress, 469 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToAvoriaz: Transfer = {
  airport: "geneva-airport",
  resort: "avoriaz",

  metaTitre: "Geneva to Avoriaz Transfer | Book Your Ski Ride Today",
  metaDescription: "Book your Geneva to Avoriaz Transfer now! Private & shared options, competitive prices, and hassle-free travel. Secure your ride today!",
  h1: "Geneva to Avoriaz Transfers",
  chapo: "Looking for a Geneva to Avoriaz Transfer that ensures a smooth, hassle-free journey to the slopes? Whether you're traveling solo, with family, or in a group, we offer both private and shared transfers to match your needs and budget. Say goodbye to the stress of navigating public transport or waiting in long taxi lines—our door-to-door service guarantees a reliable and efficient ride straight to your accommodation in Avoriaz.",

  contenu: [
    { type: "paragraphe", texte: "With our professional, English-speaking drivers, you'll enjoy a comfortable journey through the stunning Alpine landscape. Our fleet includes luxury vehicles, spacious minivans, and eco-friendly options, ensuring you travel in style and safety. Whether you're arriving for a weekend getaway or a full ski holiday, our Geneva to Avoriaz ski transfer gets you to the slopes quickly and comfortably." },
    { type: "paragraphe", texte: "Avoid the uncertainty of last-minute bookings and secure your transfer in advance—with fixed pricing, no hidden fees, and flexible cancellation policies, we make ski travel easy. Ready to start your trip? Book now and enjoy a seamless Geneva to Avoriaz transfer!" },
    { type: "titre2", texte: "The Geneva to Avoriaz Route & Estimated Prices" },
    { type: "paragraphe", texte: "The journey from Geneva Airport to Avoriaz covers approximately 80 km, taking around 1 hour 45 minutes depending on weather and traffic conditions. The route takes you through scenic Alpine roads, passing through picturesque villages like Les Gets and Morzine, before reaching the high-altitude, car-free ski resort of Avoriaz." },
    { type: "paragraphe", texte: "Our transfer service ensures a smooth and safe journey, even in winter conditions. Equipped with 4x4 vehicles and snow tires, we guarantee safe travel, even in heavy snow." },
    { type: "titre3", texte: "💰 Estimated Transfer Prices:" },
    { type: "liste", items: ["Shared Transfer: From €50 per person (each way)", "Private Transfer: From €250 per vehicle (each way)"] },
    { type: "paragraphe", texte: "Booking early ensures the best rates and guaranteed availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Avoriaz" },
    { type: "paragraphe", texte: "Booking your Geneva to Avoriaz Transfer is simple and takes just a few minutes. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Choose Your Transfer Type – Select between a private or shared transfer, based on your budget and group size." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your flight details, pick-up location (Geneva Airport), and drop-off point (Avoriaz accommodation)." },
    { type: "paragraphe", texte: "✅ 3. Secure Your Booking Online – Get instant confirmation with fixed pricing and no hidden fees." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver – Upon arrival, your professional driver will be waiting at the airport to escort you to your vehicle." },
    { type: "paragraphe", texte: "✅ 5. Enjoy a Smooth Ride – Sit back, relax, and take in the Alpine views as you head straight to the slopes of Avoriaz!" },
    { type: "paragraphe", texte: "Book your Geneva to Avoriaz Transfer today and travel with comfort, reliability, and ease!" },
  ],

  faq: [

  ],
};
