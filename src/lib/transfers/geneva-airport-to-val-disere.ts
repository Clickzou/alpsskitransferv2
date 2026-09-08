import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-val-disere-transfers/ (WordPress, 444 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToValDisere: Transfer = {
  airport: "geneva-airport",
  resort: "val-disere",

  metaTitre: "Geneva to Val d’Isere Transfer | Fast & Reliable Transport",
  metaDescription: "Book your Geneva to Val d’Isere Transfer today! Choose private or shared options for a smooth, comfortable journey. Best prices & easy online booking.",
  h1: "Geneva to Val d’Isere Transfers",
  chapo: "Looking for a Geneva to Val d’Isere Transfer that guarantees a smooth, reliable, and stress-free journey? Whether you're traveling solo, as a couple, or in a group, we offer private and shared transfer options tailored to your needs. Our service ensures door-to-door transport, so you can relax from the moment you land at Geneva Airport (GVA) until you arrive at your accommodation in Val d’Isere.",

  contenu: [
    { type: "paragraphe", texte: "With professional drivers, modern vehicles, and competitive pricing, our Geneva to Val d’Isere transfer service ensures maximum comfort and efficiency. Forget the hassle of renting a car, navigating snowy roads, or waiting for public transport. Choose a shared transfer for an affordable solution or opt for a private vehicle for flexibility and luxury." },
    { type: "paragraphe", texte: "Booking your ski transfer in advance guarantees the best availability and pricing, especially during peak ski season. Enjoy a safe, scenic journey through the French Alps, with experienced drivers handling the winter roads. Secure your transfer today and start your ski trip stress-free!" },
    { type: "titre2", texte: "Geneva to Val d’Isere: Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Geneva to Val d’Isere covers approximately 220 km and takes around 3 to 3.5 hours, depending on weather and traffic conditions. The route follows a picturesque drive through the French Alps, passing through Annecy, Albertville, and Bourg-Saint-Maurice, offering breathtaking mountain views." },
    { type: "paragraphe", texte: "During peak winter months, road conditions can be snowy and icy, but our experienced drivers ensure a safe and comfortable transfer. We monitor traffic and weather in real-time to adjust your journey for optimal travel times." },
    { type: "titre3", texte: "💰 Estimated Prices:" },
    { type: "liste", items: ["Shared Transfer: From €70 per person", "Private Transfer: From €320 per vehicle"] },
    { type: "paragraphe", texte: "For larger groups, VIP vehicles, or additional services, customized pricing is available. Get a real-time quote when you book online!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Val d’Isere" },
    { type: "paragraphe", texte: "Booking your Geneva to Val d’Isere transfer is simple and takes just a few minutes:" },
    { type: "paragraphe", texte: "✅ 1. Select your transfer type – Choose between a shared or private transfer based on your budget and preferences." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up time, flight details, and accommodation address in Val d’Isere." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Secure your spot with instant confirmation and flexible cancellation policies." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver & enjoy your ride – Our professional driver will be waiting for you at Geneva Airport, ready to take you directly to your ski resort." },
    { type: "paragraphe", texte: "Don’t wait until the last minute—book your Geneva to Val d’Isere transfer today to guarantee the best price and availability!" },
  ],

  faq: [

  ],
};
