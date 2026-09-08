import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-courchevel-transfers/ (WordPress, 489 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToCourchevel: Transfer = {
  airport: "geneva-airport",
  resort: "courchevel",

  metaTitre: "Geneva to Courchevel Transfer | Book Now & Travel Easy",
  metaDescription: "Book your Geneva to Courchevel Transfer today! Private & shared ski transfers with expert drivers. Fast, reliable & stress-free. Get a quote !",
  h1: "Geneva to Courchevel Transfers",
  chapo: "Looking for a Geneva to Courchevel Transfer that gets you to your destination quickly, safely, and hassle-free? Whether you prefer a private transfer for exclusive comfort or a shared transfer for a budget-friendly option, we provide seamless airport transfers from Geneva Airport to Courchevel, ensuring a stress-free travel experience. Our professional drivers offer a door-to-door service, so you don’t have to worry about waiting for taxis or navigating public transport.",

  contenu: [
    { type: "paragraphe", texte: "With our Geneva to Courchevel Transfer, you can relax in a luxury vehicle equipped for winter conditions, ensuring a smooth and efficient ride. Our service is designed for families, groups, and solo travelers, with child seats available on request and plenty of luggage space for your ski gear. Enjoy a punctual and reliable transfer straight to your Courchevel accommodation, whether in Courchevel 1850, Courchevel 1650, or Courchevel 1550." },
    { type: "paragraphe", texte: "Avoid the stress of arranging last-minute transport and secure your Geneva to Courchevel transfer today. With affordable prices, experienced drivers, and 24/7 customer support, we make sure your journey to the slopes is as enjoyable as your time on them!" },
    { type: "titre2", texte: "The Geneva to Courchevel Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Geneva Airport (GVA) to Courchevel covers approximately 140 km, taking about 2 hours and 30 minutes, depending on weather and road conditions. The route follows the A41 highway, passing through scenic Alpine landscapes and the Tarentaise Valley, offering stunning mountain views as you approach the Three Valleys ski area." },
    { type: "paragraphe", texte: "For those traveling in winter, our vehicles are fully equipped for snowy roads, ensuring a safe and smooth journey even in the harshest weather conditions. We monitor road conditions in real-time, allowing us to adjust routes for the quickest possible arrival." },
    { type: "titre3", texte: "Estimated Pricing for Geneva to Courchevel Transfers" },
    { type: "liste", items: ["Shared transfer: From €80 per person", "Private transfer: Starting at €390 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Prices may vary depending on availability, season, and group size. Booking in advance ensures the best rates and guaranteed availability." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Courchevel" },
    { type: "paragraphe", texte: "Booking your Geneva to Courchevel Transfer is easy! Follow these simple steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your details in our online booking system to see real-time availability and pricing.✅ 2. Choose Your Transfer – Select between a shared or private transfer, based on your budget and preferences.✅ 3. Confirm & Pay Securely – Complete your reservation with instant confirmation and secure online payment.✅ 4. Meet Your Driver – Your professional driver will be waiting for you at Geneva Airport, ready to take you straight to Courchevel." },
    { type: "paragraphe", texte: "Ready to book? Don’t wait! Secure your Geneva to Courchevel Transfer now and enjoy a stress-free ride to the slopes." },
  ],

  faq: [

  ],
};
