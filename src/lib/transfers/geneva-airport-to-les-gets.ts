import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-les-gets-transfers/ (WordPress, 464 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToLesGets: Transfer = {
  airport: "geneva-airport",
  resort: "les-gets",

  metaTitre: "Geneva to Les Gets Transfer | Book Now & Save!",
  metaDescription: "Book your Geneva to Les Gets Transfer now! Private & shared options available. Safe, reliable & direct transport. Reserve your ride today!",
  h1: "Geneva to Les Gets Transfers",
  chapo: "Looking for a Geneva to Les Gets Transfer that is fast, comfortable, and hassle-free? Whether you're traveling solo, with family, or in a group, our private and shared transfers ensure a smooth, stress-free journey to the heart of the Portes du Soleil ski area. With door-to-door service, experienced drivers, and modern vehicles, you can sit back, relax, and enjoy the ride through the stunning French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Les Gets is one of the most popular ski resorts in France, known for its family-friendly atmosphere, excellent slopes, and traditional Alpine charm. Avoid the inconvenience of public transport and long waits for taxis—our airport transfer service provides a direct and comfortable connection between Geneva Airport and Les Gets." },
    { type: "paragraphe", texte: "Booking your Geneva to Les Gets Transfer in advance guarantees the best price, flexible scheduling, and a stress-free start to your ski trip. Whether you need extra space for luggage, child seats, or a group transfer, we tailor our services to meet your needs. Secure your ski transfer today and arrive at your resort with ease!" },
    { type: "titre2", texte: "Geneva to Les Gets: Route & Transfer Prices" },
    { type: "paragraphe", texte: "The journey from Geneva Airport to Les Gets covers approximately 65 km and takes around 1 hour and 15 minutes, depending on traffic and weather conditions. The route follows major highways before entering scenic mountain roads, offering breathtaking views of the French Alps as you ascend towards the resort." },
    { type: "titre3", texte: "💰 Pricing from Geneva to Les Gets" },
    { type: "liste", items: ["Private transfers: Starting from €150 to €250 per vehicle, depending on the number of passengers and vehicle type.", "Shared transfers: More budget-friendly, with prices from €40 to €70 per person, offering a cost-effective way to reach Les Gets."] },
    { type: "paragraphe", texte: "Our transfers from Geneva to Les Gets ensure a safe and smooth journey, with professional drivers experienced in winter conditions. We monitor flight arrivals to adjust pick-up times, ensuring minimal waiting at the airport." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Les Gets" },
    { type: "paragraphe", texte: "Booking your Geneva to Les Gets transfer is simple and quick! Follow these easy steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Select your transfer type – Choose between private or shared transfer options to suit your needs and budget." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up date, time, and flight information for a seamless arrival." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Secure your Geneva to Les Gets transfer with instant confirmation and transparent pricing." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver & enjoy the ride – Upon arrival, your professional driver will be waiting to take you directly to Les Gets." },
    { type: "paragraphe", texte: "Book now and ensure a comfortable, reliable transfer from Geneva to Les Gets!" },
  ],

  faq: [

  ],
};
