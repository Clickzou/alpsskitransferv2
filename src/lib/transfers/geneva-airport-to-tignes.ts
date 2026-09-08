import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-tignes-transfers/ (WordPress, 463 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToTignes: Transfer = {
  airport: "geneva-airport",
  resort: "tignes",

  metaTitre: "Geneva to Tignes Transfer | Fast & Affordable Ski Transport",
  metaDescription: "Book your Geneva to Tignes Transfer today! Shared & private options available. Secure your ride for a hassle-free ski trip. Get your quote now!",
  h1: "Geneva to Tignes Transfers",
  chapo: "Planning a ski trip and need a Geneva to Tignes Transfer? We offer both private and shared transfer options, ensuring a stress-free journey from Geneva Airport to Tignes. Whether you are a solo traveler, a family, or a large group, our service guarantees a comfortable and efficient ride to one of the most popular ski resorts in the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the hassle of public transport and long waiting times. With our door-to-door service, you’ll be picked up directly at Geneva Airport and taken straight to your accommodation in Tignes, with no unnecessary stops. Our experienced drivers ensure a safe, smooth journey, even in snowy conditions. Plus, all our transfers include luggage and ski equipment transport at no extra cost." },
    { type: "paragraphe", texte: "Booking your ski transfer from Geneva to Tignes is simple. Secure your spot in advance and enjoy competitive prices on reliable and efficient transport. Choose between a cost-effective shared transfer or a premium private transfer tailored to your schedule. Book now and travel hassle-free to the slopes of Tignes!" },
    { type: "titre2", texte: "The Route from Geneva to Tignes & Pricing" },
    { type: "paragraphe", texte: "The Geneva to Tignes transfer covers approximately 180 km, with an estimated travel time of 3 to 3.5 hours, depending on traffic and weather conditions. The journey takes you through picturesque Alpine landscapes, passing Lake Annecy before climbing into the Tarentaise Valley, offering breathtaking views along the way." },
    { type: "paragraphe", texte: "During peak ski season, roads can get busy, especially on Saturdays. However, our professional drivers monitor traffic in real time to ensure the fastest route. We prioritize your safety and comfort, providing modern, well-maintained vehicles equipped for winter driving conditions." },
    { type: "titre3", texte: "💰 Pricing" },
    { type: "liste", items: ["Shared Transfer: Starting from €75 per person", "Private Transfer: Prices range from €350 to €650 per vehicle, depending on group size and vehicle type"] },
    { type: "paragraphe", texte: "Book early to secure the best rates and guarantee your preferred transfer option!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Tignes" },
    { type: "paragraphe", texte: "Booking your Geneva to Tignes transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your details to see pricing for shared or private transfers.✅ 2. Choose Your Option – Select the best transfer based on your budget and schedule.✅ 3. Confirm Your Booking – Secure your transfer online with instant confirmation.✅ 4. Meet Your Driver – Upon arrival at Geneva Airport, your driver will be waiting for you.✅ 5. Enjoy a Smooth Ride – Relax and take in the stunning Alpine scenery on your way to Tignes." },
    { type: "paragraphe", texte: "Ready to book? Secure your Geneva to Tignes transfer today! Get your free quote now and travel stress-free to your ski holiday!" },
  ],

  faq: [

  ],
};
