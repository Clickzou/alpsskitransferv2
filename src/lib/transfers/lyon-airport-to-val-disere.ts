import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-val-disere-transfers/ (WordPress, 445 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToValDisere: Transfer = {
  airport: "lyon-airport",
  resort: "val-disere",

  metaTitre: "Lyon to Val d’Isère Transfers | Fast & Easy Ski Transport",
  metaDescription: "Book your Lyon to Val d’Isère transfers today! Private & shared options, best prices & hassle-free travel. Secure your ride now!",
  h1: "Lyon to Val d’Isère Transfers",
  chapo: "Looking for a Lyon to Val d’Isère transfer that’s fast, comfortable, and reliable? Whether you prefer a private ski transfer for exclusive convenience or a shared transfer for a budget-friendly option, we’ve got you covered. Avoid the hassle of public transport, multiple stops, and long waits, and enjoy a stress-free journey from Lyon Airport (LYS) or Lyon city center directly to Val d’Isère.",

  contenu: [
    { type: "paragraphe", texte: "With our door-to-door service, you can relax knowing that your transfer is fully taken care of, whether you’re traveling solo, as a couple, with family, or in a large group. Our professional drivers, experienced in navigating winter roads, ensure a safe and smooth ride so you arrive ready to hit the slopes. Enjoy spacious, ski-friendly vehicles, flight monitoring, and flexible pick-up times. Book your Lyon to Val d’Isère transfer today and travel with ease!" },
    { type: "titre2", texte: "Lyon to Val d’Isère – Scenic Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Lyon to Val d’Isère covers approximately 220 km, with a travel time of around 3 to 3.5 hours, depending on weather and road conditions. Departing from Lyon Airport or the city center, your transfer will take you along the A43 highway, passing through Chambéry and Albertville, before heading into the scenic Tarentaise Valley. As you ascend towards Val d’Isère, you’ll be treated to breathtaking views of snow-capped peaks and winding alpine roads." },
    { type: "titre3", texte: "Our pricing is designed to offer great value:" },
    { type: "liste", items: ["Shared transfers start from €75 per person, perfect for solo travelers or small groups.", "Private transfers range between €350 and €550 per vehicle, ideal for families or those looking for a more personalized experience."] },
    { type: "paragraphe", texte: "For a reliable, comfortable, and cost-effective transfer, book in advance to secure the best rates." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Val d’Isère" },
    { type: "paragraphe", texte: "Booking your Lyon to Val d’Isère transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select a private or shared transfer that suits your budget and group size." },
    { type: "paragraphe", texte: "✅ 2. Enter your travel details – Provide your pick-up location (Lyon Airport or city center), drop-off in Val d’Isère, and flight details (if applicable)." },
    { type: "paragraphe", texte: "✅ 3. Get an instant quote & confirm – Receive a transparent price, no hidden fees, and complete your secure online payment." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver & enjoy the ride – Your professional driver will be waiting for you at the designated meeting point for a seamless journey." },
    { type: "paragraphe", texte: "Book your transfer today and travel to Val d’Isère stress-free!" },
  ],

  faq: [

  ],
};
