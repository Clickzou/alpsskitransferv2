import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-val-thorens-transfers/ (WordPress, 400 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToValThorens: Transfer = {
  airport: "geneva-airport",
  resort: "val-thorens",

  metaTitre: "Geneva to Val Thorens Transfer | Fast & Reliable Service",
  metaDescription: "Book your Geneva to Val Thorens Transfer now! Shared or private transfers, best prices, and hassle-free booking. Travel comfortably & stress-free.",
  h1: "Geneva to Val Thorens Transfers",
  chapo: "Planning your ski trip? Our Geneva to Val Thorens Transfer ensures a smooth, comfortable, and hassle-free journey to one of the most popular ski resorts in the French Alps. Whether you choose a private transfer for exclusivity or a shared transfer for a budget-friendly option, we provide a professional, door-to-door service with experienced drivers.",

  contenu: [
    { type: "paragraphe", texte: "The transfer from Geneva Airport to Val Thorens takes approximately 2 hours and 45 minutes, covering scenic alpine roads with breathtaking mountain views. Our modern, spacious vehicles guarantee a safe and reliable trip, even in harsh winter conditions." },
    { type: "paragraphe", texte: "Our service includes real-time flight tracking, ensuring on-time pickups, even in case of flight delays. Child seats are available, and there’s plenty of room for your ski equipment. With transparent pricing, you can book with confidence, knowing you’ll get the best value for money." },
    { type: "paragraphe", texte: "Secure your Geneva to Val Thorens transfer today and start your ski adventure stress-free." },
    { type: "titre2", texte: "Route Information & Pricing" },
    { type: "paragraphe", texte: "The journey from Geneva to Val Thorens covers approximately 150 km (93 miles) and takes around 2h45, depending on weather and road conditions. The route follows the A41 motorway, passing through stunning alpine landscapes before reaching the Three Valleys ski area, home to Val Thorens, Courchevel, and Méribel." },
    { type: "titre3", texte: "💰 Pricing" },
    { type: "liste", items: ["Private Transfer Price Range: €350 – €600 per vehicle (1-8 passengers)", "Shared Transfer Price Range: €60 – €120 per person"] },
    { type: "paragraphe", texte: "During peak ski season, early booking is recommended to secure the best rates and availability." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Val Thorens" },
    { type: "paragraphe", texte: "Booking your transfer is quick and easy! Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Enter your details – Choose Geneva Airport as your pick-up location and Val Thorens as your destination.✅ 2. Select your transfer type – Choose between private or shared transfer based on your budget and preferences.✅ 3. Confirm your booking – Secure your Geneva to Val Thorens transfer with instant confirmation.✅ 4. Meet your driver – Our professional, English-speaking driver will greet you at the airport.✅ 5. Enjoy your trip – Relax and take in the beautiful alpine views as we take you safely to your accommodation." },
    { type: "paragraphe", texte: "Book your Geneva to Val Thorens Transfer now and travel stress-free!" },
  ],

  faq: [

  ],
};
