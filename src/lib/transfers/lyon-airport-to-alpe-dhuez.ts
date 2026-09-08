import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/france/lyon-to-alpe-dhuez-transfers/ (WordPress, 435 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const lyonAirportToAlpeDhuez: Transfer = {
  airport: "lyon-airport",
  resort: "alpe-dhuez",

  metaTitre: "Lyon to Alpe d’Huez Transfers | Book Your Ride Now",
  metaDescription: "Book your Lyon to Alpe d’Huez transfer today! Private & shared options available. Secure a stress-free, direct ride to the Alps. Reserve now!",
  h1: "Lyon to Alpe d’Huez Transfers",
  chapo: "Traveling from Lyon to Alpe d’Huez? Our private and shared ski transfers provide a comfortable, stress-free way to reach your ski resort without hassle. Whether you're arriving at Lyon Airport or a city location, we offer door-to-door service, ensuring you arrive at Alpe d’Huez quickly and comfortably.",

  contenu: [
    { type: "paragraphe", texte: "Forget the complications of public transport or car rentals. With our Lyon to Alpe d’Huez transfers, you benefit from professional drivers, luxury vehicles, and flexible schedules. Our fleet includes minivans for families, private cars for couples, and larger vehicles for groups. You can travel at your own pace, with a direct transfer that eliminates the need for multiple connections." },
    { type: "paragraphe", texte: "Booking your Lyon to Alpe d’Huez transfer guarantees a seamless journey, avoiding long waits and unnecessary stress. We offer competitive pricing, ensuring you receive the best value for money while enjoying a smooth and efficient ride to the heart of the French Alps. Secure your transfer today and experience a comfortable ride to Alpe d’Huez!" },
    { type: "titre2", texte: "The Route from Lyon to Alpe d’Huez – Distance, Duration & Prices" },
    { type: "paragraphe", texte: "The journey from Lyon to Alpe d’Huez covers approximately 150 km (93 miles) and takes around 2 hours 30 minutes, depending on traffic and weather conditions. The route includes a mix of highways and scenic mountain roads, offering breathtaking views of the French Alps." },
    { type: "paragraphe", texte: "Departing from Lyon, you will follow the A43 motorway before transitioning onto smaller mountain roads as you ascend towards Alpe d’Huez. During winter, snow-covered landscapes create a spectacular journey, and our drivers are trained to handle snowy conditions, ensuring a safe and smooth ride." },
    { type: "titre3", texte: "Estimated Pricing for Lyon to Alpe d’Huez Transfers:" },
    { type: "liste", items: ["Shared transfer: from €45 per person", "Private transfer: from €250 per vehicle"] },
    { type: "paragraphe", texte: "Prices may vary based on seasonal demand, number of passengers, and vehicle type. Book in advance to secure the best rates for your transfer!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Lyon to Alpe d’Huez" },
    { type: "paragraphe", texte: "Booking your Lyon to Alpe d’Huez transfer is quick and simple. Follow these steps:" },
    { type: "paragraphe", texte: "✅ 1. Select Your Transfer Type – Choose between a shared or private transfer." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide pick-up location, date, and time." },
    { type: "paragraphe", texte: "✅ 3. Confirm Your Booking – Get an instant confirmation via email." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver – Our professional driver will be ready for your door-to-door pickup." },
    { type: "paragraphe", texte: "Secure your transfer today and enjoy a stress-free journey from Lyon to Alpe d’Huez!" },
  ],

  faq: [

  ],
};
