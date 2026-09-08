import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-grindelwald-transfers/ (WordPress, 483 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToGrindelwald: Transfer = {
  airport: "zurich-airport",
  resort: "grindelwald",

  metaTitre: "Zurich to Grindelwald Transfer | Private & Shared Rides",
  metaDescription: "Book your Zurich to Grindelwald transfer now! Private & shared options, door-to-door service, competitive prices. Secure your ski transfer today!",
  h1: "Zurich to Grindelwald Transfers",
  chapo: "Looking for a Zurich to Grindelwald transfer that guarantees comfort, efficiency, and reliability? Whether you're heading to Grindelwald for a ski holiday or a scenic retreat in the Swiss Alps, our private and shared transfer services ensure a hassle-free journey. Avoid the inconvenience of public transport and enjoy a direct, door-to-door transfer from Zurich Airport or city center straight to your accommodation in Grindelwald.",

  contenu: [
    { type: "paragraphe", texte: "Our fleet includes luxury vehicles, spacious minivans, and comfortable shared shuttles, providing safe and reliable transport for solo travelers, families, and groups. With professional English-speaking drivers, we monitor flight arrivals to accommodate delays at no extra charge. Travel in warmth and comfort, with plenty of space for ski equipment and luggage." },
    { type: "paragraphe", texte: "Booking a Zurich to Grindelwald transfer in advance allows you to secure the best prices, avoid last-minute stress, and enjoy a relaxed trip to the mountains. Whether you're coming for a weekend getaway or an extended ski adventure, our shared and private transfers ensure a smooth and pleasant journey from start to finish." },
    { type: "titre2", texte: "Zurich to Grindelwald: Scenic Alpine Journey & Pricing" },
    { type: "paragraphe", texte: "The Zurich to Grindelwald route is a stunning 140 km drive through breathtaking Swiss landscapes, taking approximately 1h45 to 2h depending on traffic and weather conditions. The journey starts from Zurich, passing Lake Zurich, before heading into the Bernese Oberland, where snowy peaks and alpine villages create an unforgettable backdrop." },
    { type: "paragraphe", texte: "Along the way, you'll see picturesque towns such as Interlaken, nestled between Lake Thun and Lake Brienz, before reaching Grindelwald, one of Switzerland’s most popular ski and hiking destinations. Known for its stunning views of the Eiger North Face, this village is a prime location for winter sports, mountaineering, and breathtaking sightseeing." },
    { type: "titre3", texte: "Estimated Transfer Prices:" },
    { type: "liste", items: ["Shared transfer: From €55-€80 per person", "Private transfer: From €290-€450 per vehicle (depending on group size)"] },
    { type: "paragraphe", texte: "Booking early ensures the best rates and availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Grindelwald" },
    { type: "paragraphe", texte: "Booking your Zurich to Grindelwald transfer is quick and easy. Secure your ride in just a few steps:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select a shared shuttle or private vehicle based on your budget and group size." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up location (Zurich Airport or city), destination (Grindelwald), and preferred time." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Get instant confirmation with all transfer details sent to your email." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver – Upon arrival, your professional driver will be waiting for you, assisting with luggage and ensuring a smooth ride." },
    { type: "paragraphe", texte: "Ready to book your Zurich to Grindelwald transfer? Secure your ride today and enjoy a stress-free journey to the Swiss Alps!" },
  ],

  faq: [

  ],
};
