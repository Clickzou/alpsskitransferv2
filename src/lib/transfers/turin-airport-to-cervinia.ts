import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/italy/turin-to-cervinia-transfers/ (WordPress, 435 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const turinAirportToCervinia: Transfer = {
  airport: "turin-airport",
  resort: "cervinia",

  metaTitre: "Turin to Cervinia Transfers | Fast & Reliable Ski Transport",
  metaDescription: "Book your Turin to Cervinia transfer now. Fast, comfortable and reliable, with no hidden fees. Get an instant quote and secure your ride today!",
  h1: "Turin to Cervinia Transfers",
  chapo: "Looking for Turin to Cervinia transfers that are reliable, fast, and hassle-free? Whether you’re traveling alone, with family, or in a group, our ski transfers provide a stress-free journey from Turin Airport (TRN) or the city center directly to the slopes of Breuil-Cervinia. Avoid the long waits and discomfort of public transport—our door-to-door transfer service ensures you arrive on time and in comfort.",

  contenu: [
    { type: "paragraphe", texte: "Our private and shared transfers are operated by experienced drivers who know the Alpine roads well, ensuring a safe and smooth ride. With options for luxury vehicles, minivans, and group shuttles, you can choose the best way to reach Cervinia. No waiting, no hassle—just a direct ride to your ski resort." },
    { type: "paragraphe", texte: "Enjoy a comfortable transfer with extra space for your luggage and ski equipment. Whether you’re coming for a weekend or an extended ski holiday, our transfers from Turin to Cervinia guarantee the best value for money with fixed, transparent pricing and no hidden fees." },
    { type: "titre2", texte: "The Route from Turin to Cervinia & Estimated Pricing" },
    { type: "paragraphe", texte: "The distance from Turin to Cervinia is approximately 120 km, with a travel time of around 1h45 to 2h, depending on road and weather conditions. The journey takes you through the scenic Aosta Valley, offering breathtaking views of the Alpine landscapes as you approach one of Italy’s best ski resorts." },
    { type: "liste", items: ["Turin Airport (TRN) to Cervinia: Around 1h45 via the A5 motorway.", "Turin City Center to Cervinia: Estimated travel time 2h, depending on traffic."] },
    { type: "titre3", texte: "Estimated Transfer Prices" },
    { type: "liste", items: ["Shared Transfer: Starting from €45 per person.", "Private Transfer: Prices range from €180 to €350 per vehicle, depending on the size and type of car."] },
    { type: "paragraphe", texte: "For an exact price, enter your travel details in our online booking system and get an instant quote." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Turin to Cervinia" },
    { type: "paragraphe", texte: "Booking your Turin to Cervinia transfer is quick and easy. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Select Your Transfer Type – Choose between private or shared transfers.✅ 2. Enter Your Travel Details – Pick-up/drop-off location, date, and number of passengers.✅ 3. Get an Instant Quote – See transparent pricing with no hidden fees.✅ 4. Confirm & Pay Securely – Complete your booking online in a few clicks.✅ 5. Meet Your Driver – On arrival, your driver will be waiting at the designated spot." },
    { type: "paragraphe", texte: "Ready to book? Get your quote today and secure the best price for your ski transfer!" },
  ],

  faq: [

  ],
};
