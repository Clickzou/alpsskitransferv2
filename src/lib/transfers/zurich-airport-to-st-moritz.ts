import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-st-moritz-transfers/ (WordPress, 406 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToStMoritz: Transfer = {
  airport: "zurich-airport",
  resort: "st-moritz",

  metaTitre: "Zurich to St Moritz Transfers | Book Your Ride Now",
  metaDescription: "Book your Zurich to St Moritz transfers today! Choose a private or shared transfer for a hassle-free, scenic journey. Secure your spot now!",
  h1: "Zurich to St Moritz Transfers",
  chapo: "Traveling from Zurich to St Moritz? Our reliable transfer service ensures a smooth and stress-free journey to one of Switzerland’s most exclusive ski resorts. Whether you prefer a private or shared transfer, we provide door-to-door service from Zurich Airport or the city center, ensuring you arrive in comfort and style.",

  contenu: [
    { type: "paragraphe", texte: "The route from Zurich to St Moritz is as breathtaking as the destination itself. Our professional drivers ensure a safe and efficient trip through the scenic Swiss Alps, allowing you to relax and take in the stunning mountain landscapes. Avoid the hassle of public transport and enjoy a direct transfer with plenty of space for your luggage and ski equipment." },
    { type: "paragraphe", texte: "Booking your Zurich to St Moritz transfer is quick and easy. With competitive prices and flexible options, we cater to solo travelers, families, and groups. Secure your spot today and start your ski holiday stress-free!" },
    { type: "titre2", texte: "Zurich to St Moritz: Scenic Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Zurich to St Moritz takes approximately 2h 45m to 3h 15m, covering around 200 km of picturesque Swiss roads. Your transfer begins in the vibrant city of Zurich, passing through stunning alpine landscapes, charming villages, and breathtaking mountain passes, including the Julier Pass, known for its spectacular views." },
    { type: "titre3", texte: "Estimated Pricing:" },
    { type: "liste", items: ["Shared Transfers: Starting from €85 per person", "Private Transfers: Starting from €390 per vehicle"] },
    { type: "paragraphe", texte: "Our Zurich to St Moritz transfer service ensures a comfortable ride, whether you're traveling alone or with a group. No need to worry about changing trains or carrying heavy luggage—simply sit back and enjoy the journey." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to St Moritz" },
    { type: "paragraphe", texte: "Booking your Zurich to St Moritz transfer is simple and hassle-free. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Choose Your Transfer Type – Select between a shared or private transfer based on your needs." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your pick-up location, drop-off destination, and preferred time." },
    { type: "paragraphe", texte: "✅ 3. Confirm Pricing & Availability – Get an instant quote with transparent pricing and no hidden fees." },
    { type: "paragraphe", texte: "✅ 4. Secure Your Booking – Complete your reservation online in just a few clicks." },
    { type: "paragraphe", texte: "Ready to book? Secure your Zurich to St Moritz transfer today and enjoy a comfortable, stress-free journey to the heart of the Swiss Alps!" },
  ],

  faq: [

  ],
};
