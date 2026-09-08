import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/zurich-to-ischgl-transfer/ (WordPress, 402 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const zurichAirportToIschgl: Transfer = {
  airport: "zurich-airport",
  resort: "ischgl",

  metaTitre: "Zurich to Ischgl Transfer | Fast & Reliable Ski Ride",
  metaDescription: "Book your Zurich to Ischgl transfer today! Enjoy a stress-free ride with private or shared options. Secure your ski transfer now for the best price!",
  h1: "Zurich to Interlaken Transfers",
  chapo: "Looking for a Zurich to Ischgl transfer that guarantees a smooth, reliable, and comfortable journey? Whether you're traveling solo, with family, or in a group, we provide private and shared transfer options to suit your needs. Avoid the hassle of renting a car or dealing with unpredictable public transport—our service ensures a stress-free trip straight to your accommodation in Ischgl.",

  contenu: [
    { type: "paragraphe", texte: "With our door-to-door transfer service, you’ll be picked up directly at Zurich Airport or your hotel and driven in a modern, well-equipped vehicle. Our professional drivers are experienced in navigating the Alpine roads, ensuring a safe and efficient journey, whatever the weather conditions." },
    { type: "paragraphe", texte: "Sit back, relax, and enjoy the breathtaking scenery as you leave behind the bustling city of Zurich and head towards the world-renowned ski resort of Ischgl. Book your Zurich to Ischgl transfer today and enjoy a seamless ski holiday experience without the stress of driving or waiting for public transportation." },
    { type: "titre2", texte: "Zurich to Ischgl Transfer – Route & Pricing" },
    { type: "paragraphe", texte: "The journey from Zurich to Ischgl covers approximately 200 km and takes around 2 hours and 45 minutes, depending on weather and road conditions. The route takes you through beautiful Swiss and Austrian landscapes, passing by scenic lakes and charming Alpine villages." },
    { type: "liste", items: ["Starting Point: Zurich Airport (ZRH) or city center", "Via: A3 and A12 highways, crossing the Swiss-Austrian border", "Arrival: Your accommodation in Ischgl"] },
    { type: "titre3", texte: "Estimated Prices:" },
    { type: "paragraphe", texte: "💰 Shared Transfer: Starting from €75 per person🚖 Private Transfer: From €350 per vehicle" },
    { type: "paragraphe", texte: "Our pricing is competitive and transparent, with no hidden fees. Whether you prefer a cost-effective shared transfer or a luxurious private ride, we ensure affordable and high-quality service." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Zurich to Ischgl" },
    { type: "paragraphe", texte: "Booking your Zurich to Ischgl transfer is quick and easy. Just follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Choose Your Transfer Type – Select between shared or private transfer options." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your pick-up location, time, and group size." },
    { type: "paragraphe", texte: "✅ 3. Get Instant Confirmation – Receive a booking confirmation and driver details immediately." },
    { type: "paragraphe", texte: "✅ 4. Enjoy a Hassle-Free Transfer – Meet your driver at Zurich Airport or city center and relax on your way to Ischgl." },
    { type: "paragraphe", texte: "Ready to book? Secure your Zurich to Ischgl transfer now and enjoy a comfortable, stress-free ride to the slopes!" },
  ],

  faq: [

  ],
};
