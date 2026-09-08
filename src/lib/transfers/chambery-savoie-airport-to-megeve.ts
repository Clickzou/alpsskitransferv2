import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/chambery-to-megeve-transfers/ (WordPress, 425 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const chamberySavoieAirportToMegeve: Transfer = {
  airport: "chambery-savoie-airport",
  resort: "megeve",

  metaTitre: "Chambéry to Megève Transfers | Book Now & Travel Easy",
  metaDescription: "Book your Chambéry to Megève transfer now! Choose private or shared options for a fast, reliable ski transfer. Secure your ride today!",
  h1: "Chambéry to Megève Transfers",
  chapo: "Looking for a Chambéry to Megève transfer that ensures a comfortable, stress-free journey? Whether you choose a private transfer for exclusive comfort or a shared transfer for an affordable option, we guarantee door-to-door service with professional drivers. Avoid the hassle of public transport and enjoy a direct transfer from Chambéry Airport to Megève, taking you straight to your accommodation.",

  contenu: [
    { type: "paragraphe", texte: "Our ski transfer service is designed for skiers, families, and groups who want to start their holiday without delays. We provide modern, well-equipped vehicles with ample space for ski equipment and luggage. Our team of experienced drivers ensures a safe, smooth journey, adapting to winter conditions for your peace of mind." },
    { type: "paragraphe", texte: "With our Chambéry to Megève transfers, you can expect flexibility, reliability, and competitive pricing. Whether arriving alone or with a group, our services cater to all needs, making your ski trip seamless. Book now and secure your hassle-free transfer to Megève!" },
    { type: "titre2", texte: "Scenic Route & Pricing for Chambéry to Megève Transfers" },
    { type: "paragraphe", texte: "The journey from Chambéry to Megève covers approximately 90 km, taking around 1 hour and 30 minutes, depending on weather and traffic conditions. The route follows a scenic drive through the French Alps, passing through breathtaking mountain landscapes, charming alpine villages, and well-maintained roads ensuring a smooth and safe ride." },
    { type: "titre3", texte: "Our pricing is transparent and competitive, with no hidden fees:" },
    { type: "liste", items: ["Shared transfers: Starting from €45 per person.", "Private transfers: Prices range from €180 to €290 per vehicle, depending on the size and level of comfort."] },
    { type: "paragraphe", texte: "We offer fully insured, modern vehicles with experienced drivers who monitor traffic and weather conditions to guarantee a safe and timely arrival in Megève." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Chambéry to Megève" },
    { type: "paragraphe", texte: "Booking your Chambéry to Megève transfer is simple and quick. Follow these easy steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Get an instant quote – Enter your pick-up and drop-off locations and choose your preferred transfer type.✅ 2. Select your vehicle – Pick from our shared or private transfer options, ensuring the best fit for your group and luggage.✅ 3. Confirm your booking – Secure your transfer with instant confirmation and no hidden fees.✅ 4. Meet your driver – Upon arrival at Chambéry Airport, your professional driver will be waiting to take you directly to Megève." },
    { type: "paragraphe", texte: "Book online now to guarantee availability and get the best Chambéry to Megève transfer rates!" },
  ],

  faq: [

  ],
};
