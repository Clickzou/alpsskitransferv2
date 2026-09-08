import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-davos-transfers/ (WordPress, 458 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToDavos: Transfer = {
  airport: "zurich-airport",
  resort: "davos",

  metaTitre: "Zurich to Davos Transfer | Book Now for Best Prices",
  metaDescription: "Secure your Zurich to Davos transfer today! Private & shared options available. Fast, reliable, and comfortable ski transfers – Book now!",
  h1: "Zurich to Davos Transfers",
  chapo: "Planning your Zurich to Davos transfer? Whether you choose a private or shared transfer, we ensure a smooth, stress-free journey from Zurich Airport or city center to Davos, one of Switzerland’s most prestigious ski resorts. Our door-to-door transfer service guarantees comfort and reliability, taking you directly to your ski accommodation without hassle.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the complications of public transport and long waits at the train station. Our Zurich to Davos transfers offer flexible departure times, spacious vehicles, and the convenience of luggage space for ski equipment. With professional English-speaking drivers, real-time flight tracking, and a commitment to safety, we ensure your trip is efficient and relaxing. Whether you are traveling solo, as a family, or in a group, our Zurich to Davos ski transfer is designed to meet your needs." },
    { type: "paragraphe", texte: "Booking in advance allows you to secure the best price, avoid last-minute availability issues, and enjoy a premium travel experience tailored to your schedule. Choose between affordable shared shuttles or luxury private transfers, and let us handle the logistics while you focus on your ski adventure in Davos." },
    { type: "titre2", texte: "Zurich to Davos – Route Details & Pricing" },
    { type: "paragraphe", texte: "The Zurich to Davos route covers approximately 150 km, with a travel time of 1h 50min to 2h 15min, depending on weather and traffic conditions. The drive takes you through the picturesque Swiss countryside, passing through scenic valleys and Alpine landscapes before reaching the world-famous ski resort of Davos." },
    { type: "paragraphe", texte: "Our Zurich to Davos transfers provide safe, direct transportation, navigating through Switzerland’s well-maintained mountain roads. Unlike trains or public transport, our transfers eliminate the need for multiple connections, ensuring a comfortable journey in winter conditions." },
    { type: "titre3", texte: "💰 Price Range:" },
    { type: "liste", items: ["Shared Transfer: Starting from €65 per person", "Private Transfer: Starting from €320 per vehicle (up to 4 passengers)"] },
    { type: "paragraphe", texte: "For larger groups or VIP options, contact us for a custom quote." },
    { type: "titre3", texte: "Our vehicles" },
  ],

  faq: [
    { question: "How to Book Your Ski Transfer from Zurich to Davos?", reponse: "Booking your Zurich to Davos transfer is simple and ensures a hassle-free start to your ski trip. Follow these steps to secure your ride: ✅ 1. Enter your travel details – Select your pick-up point (Zurich Airport or Zurich city) and Davos accommodation. ✅ 2. Choose your transfer type – Pick between a shared shuttle or a private transfer for your group. ✅ 3. Confirm your booking – Get instant confirmation and secure payment options. ✅ 4. Meet your driver – Your professional driver will be waiting at the designated spot for a seamless pickup. Book early to secure the best price and guarantee availability during peak ski season!" },
  ],
};
