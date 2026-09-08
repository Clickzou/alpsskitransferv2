import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-meribel-transfers/ (WordPress, 460 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToMeribel: Transfer = {
  airport: "lyon-airport",
  resort: "meribel",

  metaTitre: "Lyon to Meribel Transfers | Book Your Ski Transfer Today",
  metaDescription: "Looking for Lyon to Meribel transfers? Book your private or shared ski transfer for a smooth, direct ride. Best prices & reliable service. Reserve now!",
  h1: "Lyon to Meribel Transfers",
  chapo: "Planning your ski trip and need a Lyon to Meribel transfer? We provide private and shared transfers for a stress-free, door-to-door journey from Lyon Airport or Lyon city center to Meribel, one of the most sought-after ski resorts in the French Alps. Whether you're traveling solo, with family, or in a group, our ski transfer service ensures a safe, comfortable, and hassle-free experience.",

  contenu: [
    { type: "paragraphe", texte: "Forget the complications of rental cars, winter driving, or multiple connections with public transport. Our professional drivers are experts in Alpine routes, ensuring you reach your destination efficiently and comfortably. Plus, with options for private ski transfers and shared transfers, you can choose the best solution for your budget and travel preferences." },
    { type: "paragraphe", texte: "Our vehicles are equipped for winter conditions, with ample space for luggage and ski equipment. Enjoy a smooth ride through the scenic mountains, avoiding the stress of navigating snowy roads. Book now and arrive in Meribel relaxed and ready to hit the slopes!" },
    { type: "titre2", texte: "Lyon to Meribel: Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Lyon to Meribel covers approximately 180 km, with an estimated travel time of 2h30 to 3h, depending on weather and road conditions. The route takes you through breathtaking Alpine landscapes, passing through Chambéry and Albertville before reaching the Three Valleys ski area." },
    { type: "paragraphe", texte: "The road is well-maintained, but during peak ski season, traffic and snowfall can add to the journey time. Our experienced drivers monitor conditions in real-time to ensure the fastest and safest transfer possible." },
    { type: "titre3", texte: "Estimated Pricing for Lyon to Meribel Transfers:" },
    { type: "liste", items: ["Shared Transfers: From €60 per person (based on availability and group size).", "Private Transfers: Starting at €320 per vehicle (for up to 4 passengers).", "Luxury Transfers & Large Groups: Prices available on request."] },
    { type: "paragraphe", texte: "Book early to secure the best rates, especially during high season and weekends." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Meribel" },
    { type: "paragraphe", texte: "Booking your Lyon to Meribel transfer is simple and quick. Follow these easy steps:" },
    { type: "paragraphe", texte: "✅ 1. Enter Your Travel Details – Choose between a private or shared transfer, select your pick-up location (Lyon Airport or city center), and set your travel date." },
    { type: "paragraphe", texte: "✅ 2. Get an Instant Quote – See real-time availability and competitive prices for your transfer." },
    { type: "paragraphe", texte: "✅ 3. Secure Your Booking Online – Confirm your ski transfer with a secure payment method." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver & Enjoy the Ride – Your driver will be waiting at your pick-up location, ready to take you to Meribel hassle-free." },
    { type: "paragraphe", texte: "Ready to book? Don’t wait until the last minute—secure your Lyon to Meribel transfer today and enjoy a stress-free start to your ski holiday!" },
  ],

  faq: [

  ],
};
