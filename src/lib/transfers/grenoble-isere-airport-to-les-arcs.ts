import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/grenoble-to-les-arcs-1950-2000-paradiski-transfers/ (WordPress, 385 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const grenobleIsereAirportToLesArcs: Transfer = {
  airport: "grenoble-isere-airport",
  resort: "les-arcs",

  metaTitre: "Grenoble to Les Arcs 1950-2000 Paradiski Transfers",
  metaDescription: "Book your Grenoble to Les Arcs 1950-2000 Paradiski transfers now! Private & shared options, best prices, stress-free travel. Secure your ride today!",
  h1: "Grenoble to Les Arcs 1950-2000 Paradiski Transfers",
  chapo: "Looking for a reliable and comfortable transfer from Grenoble to Les Arcs 1950-2000 Paradiski? Whether you choose a private or shared transfer, we ensure a stress-free journey to your ski destination. Our door-to-door service guarantees that you’ll be picked up directly from Grenoble Airport or city center and taken straight to your accommodation in Les Arcs 1950 or Les Arcs 2000.",

  contenu: [
    { type: "paragraphe", texte: "Skip the hassle of public transport or multiple connections—our professional drivers handle everything, from snowy roads to airport pick-ups, so you can sit back and enjoy the ride. With competitive pricing and flexible scheduling, we cater to solo travelers, families, and large groups. Secure your transfer today and start your ski trip with a smooth and hassle-free ride from Grenoble to Les Arcs Paradiski!" },
    { type: "titre2", texte: "Grenoble to Les Arcs: Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Grenoble to Les Arcs 1950-2000 covers approximately 190 km, taking around 2 hours and 45 minutes, depending on traffic and weather conditions. The route follows the A41 and A43 highways, passing through stunning alpine landscapes, before reaching the scenic mountain roads leading up to Les Arcs Paradiski." },
    { type: "titre3", texte: "Our shared transfers offer a budget-friendly option, while private transfers provide a personalized and direct experience" },
    { type: "liste", items: ["Shared Transfer: €60-€90 per person", "Private Transfer: €290-€450 per vehicle"] },
    { type: "paragraphe", texte: "Prices may vary based on availability, peak season demand, and booking time, so it's best to book early for the best rates!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Grenoble to Les Arcs 1950-2000" },
    { type: "paragraphe", texte: "Booking your Grenoble to Les Arcs Paradiski transfer is simple and secure:" },
    { type: "paragraphe", texte: "✅ Choose your transfer type – Select a shared or private transfer based on your needs." },
    { type: "paragraphe", texte: "✅ Enter your details – Provide your pick-up location, drop-off at Les Arcs 1950 or 2000, and travel date." },
    { type: "paragraphe", texte: "✅ Confirm & pay securely – Get an instant confirmation and secure your ride." },
    { type: "paragraphe", texte: "✅ Meet your driver & enjoy – Your professional driver will be waiting at Grenoble Airport or your hotel, ready to take you to your ski destination!" },
    { type: "paragraphe", texte: "Book now to secure the best rates and a hassle-free start to your ski adventure in Les Arcs Paradiski!" },
  ],

  faq: [

  ],
};
