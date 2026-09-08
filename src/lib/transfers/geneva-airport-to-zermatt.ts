import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-zermatt-transfers/ (WordPress, 457 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToZermatt: Transfer = {
  airport: "geneva-airport",
  resort: "zermatt",

  metaTitre: "Geneva to Zermatt Transfer | Private & Shared Options",
  metaDescription: "Book your Geneva to Zermatt Transfer now! Private & shared transfers available. Safe, reliable & comfortable journey. Get your quote today!",
  h1: "Geneva to Zermatt Transfers",
  chapo: "Looking for a Geneva to Zermatt Transfer that guarantees a smooth, hassle-free journey to your ski destination? Whether you choose a private or shared transfer, we provide a safe, reliable, and comfortable service tailored to your needs. Departing from Geneva Airport or city center, our professional drivers ensure a seamless journey to Zermatt, one of Switzerland’s most prestigious ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "With a private transfer, you’ll enjoy door-to-door service, while our shared transfer option offers a cost-effective way to reach the mountains. Our fleet includes luxury sedans, spacious minivans, and comfortable shuttles, all equipped for winter conditions. We also provide extra luggage space for ski equipment and child seats upon request." },
    { type: "paragraphe", texte: "Avoid the stress of public transport and train connections—our direct Geneva to Zermatt transfers let you sit back, relax, and enjoy the stunning Swiss scenery. Whether traveling solo, with family, or in a group, we ensure a fast, efficient, and stress-free experience. Book now to secure the best rates!" },
    { type: "titre2", texte: "Scenic Route & Estimated Prices for Geneva to Zermatt Transfer" },
    { type: "paragraphe", texte: "The journey from Geneva to Zermatt covers approximately 230 km (143 miles) and takes around 3h30 to 4h by road. As Zermatt is a car-free resort, transfers will drop you off in Täsch, the closest accessible point. From there, you can take the shuttle train (12 minutes) or a private electric taxi to reach your accommodation." },
    { type: "titre3", texte: "Highlights of the Geneva to Zermatt Route:" },
    { type: "liste", items: ["Drive along the shores of Lake Geneva, passing Montreux’s scenic vineyards.", "Experience breathtaking views of the Rhône Valley as you enter the Swiss Alps.", "Arrive in Täsch, where you can transfer to Zermatt’s electric shuttles."] },
    { type: "titre3", texte: "💰 Estimated Price Range:" },
    { type: "liste", items: ["Shared Transfer: Starting from €95 per person", "Private Transfer: Prices range from €450 to €700 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Book early to secure the best rates for your Geneva to Zermatt transfer during peak ski season!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Zermatt" },
    { type: "paragraphe", texte: "Booking your Geneva to Zermatt transfer is quick and easy. Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel date, pick-up location, and group size.✅ 2. Choose Your Transfer – Select between private or shared transfer options.✅ 3. Confirm Your Booking – Secure your ride with instant confirmation.✅ 4. Meet Your Driver – Your professional, English-speaking driver will be ready at the airport or your hotel.✅ 5. Enjoy a Stress-Free Journey – Relax and take in the stunning Alpine scenery on your way to Zermatt!" },
    { type: "paragraphe", texte: "Ready to book your Geneva to Zermatt transfer? Get your quote today and travel in comfort and style!" },
  ],

  faq: [

  ],
};
