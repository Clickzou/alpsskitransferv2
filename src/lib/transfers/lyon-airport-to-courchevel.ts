import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-courchevel-transfers/ (WordPress, 436 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToCourchevel: Transfer = {
  airport: "lyon-airport",
  resort: "courchevel",

  metaTitre: "Lyon to Courchevel Transfers | Private & Shared Rides",
  metaDescription: "Book your Lyon to Courchevel transfers today! Private & shared options available. Fast, comfortable, & reliable service. Get your quote now!",
  h1: "Lyon to Courchevel Transfers",
  chapo: "Looking for the best Lyon to Courchevel transfers? Whether you need a private transfer for a seamless, door-to-door experience or a shared transfer for a cost-effective option, we have the perfect solution for you. Our airport transfers operate from Lyon-Saint Exupéry Airport (LYS) and Lyon city center, ensuring a smooth and stress-free journey to Courchevel.",

  contenu: [
    { type: "paragraphe", texte: "With our Lyon to Courchevel transfers, you can expect punctual, comfortable, and professional service. Our fleet includes luxury sedans, spacious minivans, and larger vehicles for groups. We ensure that all transfers are tailored to your needs, whether you're traveling solo, with family, or in a group." },
    { type: "paragraphe", texte: "Avoid the hassle of public transport and long waits for taxis—our transfers provide a direct and efficient ride to your ski resort. Enjoy a stress-free journey with professional drivers who know the mountain roads and ensure your safety and comfort at all times. Book now and secure the best price for your transfer!" },
    { type: "titre2", texte: "Lyon to Courchevel: Route & Estimated Prices" },
    { type: "paragraphe", texte: "The journey from Lyon to Courchevel covers approximately 186 km (115 miles) and takes around 2h30 to 3h depending on road conditions, weather, and traffic. The route follows the A43 motorway towards Chambéry before winding through scenic mountain roads leading to the Courchevel ski resort in the French Alps." },
    { type: "paragraphe", texte: "Winter conditions can sometimes cause delays, but our experienced drivers ensure a safe and smooth ride, equipped with snow tires and chains when necessary." },
    { type: "titre2", texte: "Estimated Transfer Prices" },
    { type: "liste", items: ["Shared transfer: Starting from €70 per person", "Private transfer (up to 3 passengers): From €390 per vehicle", "Private minivan (4-8 passengers): From €490 per vehicle"] },
    { type: "paragraphe", texte: "Prices vary based on availability, booking time, and seasonality. Early booking is recommended to secure the best rates." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Courchevel" },
    { type: "paragraphe", texte: "Booking your Lyon to Courchevel transfer is quick and easy! Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details, including pick-up location, drop-off point, and number of passengers." },
    { type: "paragraphe", texte: "✅ 2. Choose Your Transfer Type – Select between a private transfer for ultimate comfort or a shared transfer for a budget-friendly option." },
    { type: "paragraphe", texte: "✅ 3. Confirm & Pay Securely – Complete your booking with a secure online payment and receive instant confirmation." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver & Enjoy the Ride – On the day of travel, your professional driver will meet you at the designated location for a smooth journey to Courchevel." },
    { type: "paragraphe", texte: "Book now to secure your spot! Early reservations ensure the best rates and availability." },
  ],

  faq: [

  ],
};
