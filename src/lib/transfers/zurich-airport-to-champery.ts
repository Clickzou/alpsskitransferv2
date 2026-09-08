import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-champery-transfers/ (WordPress, 417 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToChampery: Transfer = {
  airport: "zurich-airport",
  resort: "champery",

  metaTitre: "Zurich to Champery Transfer | Book Now & Travel Easy",
  metaDescription: "Book your Zurich to Champery transfer today! Private & shared options, door-to-door service. Fast, reliable & stress-free ski transfers.",
  h1: "Zurich to Champery Transfers",
  chapo: "Planning your Zurich to Champery transfer? Whether you choose a private transfer for ultimate comfort or a shared transfer for a budget-friendly option, we ensure a seamless journey to Champery, one of Switzerland’s most charming ski resorts. Skip the hassle of public transport and enjoy a stress-free, door-to-door service with our professional drivers.",

  contenu: [
    { type: "paragraphe", texte: "Departing from Zurich Airport or city center, your journey to Champery is smooth and efficient, with options for luxury vehicles, minibuses, and shared shuttles. Our Zurich to Champery transfers include flight tracking, so we adjust to delays at no extra cost. Need space for ski equipment? We provide spacious, comfortable vehicles with room for luggage and skis at no additional charge. Whether you're traveling alone, with family, or in a group, we have a tailored transfer solution to fit your needs." },
    { type: "paragraphe", texte: "Book in advance to secure the best price and ensure availability, especially during peak ski season. With fixed, competitive rates, your journey from Zurich to Champery is guaranteed to be comfortable, efficient, and affordable." },
    { type: "titre2", texte: "Zurich to Champery Transfer Route & Pricing" },
    { type: "paragraphe", texte: "The transfer from Zurich to Champery covers approximately 180 km and takes around 2 hours and 30 minutes, depending on traffic and weather conditions. The route takes you through the scenic Swiss countryside, passing Lake Geneva and the stunning mountain landscapes of the Valais region." },
    { type: "titre3", texte: "The pricing for a Zurich to Champery transfer varies based on the service you choose:" },
    { type: "liste", items: ["Shared transfer: Starting from €85 per person", "Private transfer: From €320 per vehicle (up to 4 passengers)", "Luxury or group transfers: Available on request"] },
    { type: "paragraphe", texte: "Booking in advance ensures the best rates and guarantees availability, especially during the ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Champery" },
    { type: "paragraphe", texte: "Booking your Zurich to Champery transfer is simple and quick:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details and choose between private or shared transfer options.✅ 2. Select Your Service – Pick the vehicle that suits your needs, whether budget-friendly or premium.✅ 3. Confirm & Pay Securely – Complete your booking online with a safe and secure payment system.✅ 4. Meet Your Driver – Upon arrival in Zurich, your driver will be waiting to take you directly to Champery." },
    { type: "paragraphe", texte: "Secure your Zurich to Champery transfer today for a stress-free start to your ski holiday!" },
  ],

  faq: [

  ],
};
