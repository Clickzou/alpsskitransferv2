import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-alpe-dhuez-transfers/ (WordPress, 438 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToAlpeDhuez: Transfer = {
  airport: "geneva-airport",
  resort: "alpe-dhuez",

  metaTitre: "Geneva to Alpe d’Huez Transfers | Private & Shared Rides",
  metaDescription: "Book your Geneva to Alpe d’Huez Transfers now! Private & shared options available. Reliable, comfortable, and direct service. Get your quote today!",
  h1: "Geneva to Alpe d’Huez Transfers",
  chapo: "Looking for a seamless Geneva to Alpe d’Huez transfer? Whether you need a private ride for maximum comfort or a shared transfer for budget-friendly travel, we offer door-to-door services to get you to your ski resort hassle-free. Our professional drivers ensure a safe and smooth journey from Geneva Airport (GVA) to Alpe d’Huez, one of the most popular French Alps ski resorts.",

  contenu: [
    { type: "paragraphe", texte: "Avoid the stress of public transport or multiple stops with our direct transfers, ensuring you arrive on time and ready to hit the slopes. With flexible pick-up options, plenty of luggage space for ski equipment, and comfortable vehicles, our service guarantees a stress-free start to your ski holiday." },
    { type: "paragraphe", texte: "Booking your Geneva to Alpe d’Huez transfer in advance means you get the best availability at the most competitive prices. Don’t wait – secure your ride today and enjoy a premium travel experience in the French Alps." },
    { type: "titre2", texte: "The Route from Geneva to Alpe d’Huez & Transfer Prices" },
    { type: "paragraphe", texte: "The journey from Geneva Airport to Alpe d’Huez covers approximately 210 km and takes around 3h15 under normal conditions. The scenic route passes through breathtaking Alpine landscapes, including valleys, mountain roads, and snow-covered peaks." },
    { type: "paragraphe", texte: "Your transfer will take you along the A41 and A43 highways, passing Chambéry before climbing towards Alpe d’Huez, offering stunning views of the surrounding mountains. Our drivers are experienced in winter conditions, ensuring a safe and efficient transfer even in snowy weather." },
    { type: "titre2", texte: "Estimated Price Range for Geneva to Alpe d’Huez Transfers:" },
    { type: "liste", items: ["Shared Transfer: Starting from €80 per person", "Private Transfer: Starting from €350 per vehicle (up to 8 passengers)"] },
    { type: "paragraphe", texte: "Prices vary depending on seasonality, availability, and group size. Book early to secure the best rates!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Alpe d’Huez" },
    { type: "paragraphe", texte: "Booking your Geneva to Alpe d’Huez transfer is easy and takes just a few minutes. Follow these steps to secure your ride:" },
    { type: "paragraphe", texte: "🟢 1. Get a Quote – Enter your travel details (date, time, passengers) to see available options.🟢 2. Choose Your Transfer – Select between a private or shared transfer based on your budget and preferences.🟢 3. Confirm & Pay Securely – Complete your booking with our easy and secure payment system.🟢 4. Meet Your Driver & Enjoy the Ride – Your professional driver will be waiting at Geneva Airport to take you directly to Alpe d’Huez." },
    { type: "paragraphe", texte: "Ready to book? Don’t wait – secure your Geneva to Alpe d’Huez transfer today and travel stress-free!" },
  ],

  faq: [

  ],
};
