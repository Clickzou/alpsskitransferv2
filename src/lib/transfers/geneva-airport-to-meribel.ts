import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-meribel-transfers/ (WordPress, 445 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToMeribel: Transfer = {
  airport: "geneva-airport",
  resort: "meribel",

  metaTitre: "Geneva to Meribel Transfer – Book Your Ski Ride Now",
  metaDescription: "Book your Geneva to Meribel transfer today! Private & shared ski transfers available. Comfortable, reliable & affordable. Reserve now!",
  h1: "Geneva to Meribel Transfers",
  chapo: "Looking for a Geneva to Meribel Transfer that’s both efficient and comfortable? Whether you prefer a private or shared transfer, we provide door-to-door service from Geneva Airport straight to your accommodation in Meribel. Avoid the hassle of public transport and enjoy a stress-free journey with our experienced, professional drivers.",

  contenu: [
    { type: "paragraphe", texte: "Our ski transfers are designed for skiers, families, and groups, ensuring plenty of space for ski equipment, luggage, and child seats at no extra cost. Whether you’re traveling solo or with a large group, we have the right vehicle to suit your needs. Our fleet includes luxury sedans, spacious minivans, and premium shuttle buses, offering comfort and reliability throughout the trip." },
    { type: "paragraphe", texte: "With a journey time of around 2 hours and 30 minutes, we guarantee a safe and efficient ride through the stunning French Alps. Our flexible booking options allow you to choose between a shared or private transfer, depending on your budget and preferences. Book your Geneva to Meribel transfer today and start your ski trip without stress!" },
    { type: "titre2", texte: "The Route: Geneva to Meribel – Scenic & Comfortable" },
    { type: "paragraphe", texte: "The journey from Geneva to Meribel spans approximately 135 km, offering breathtaking Alpine landscapes along the way. After departing from Geneva Airport, you’ll travel through picturesque valleys, charming mountain villages, and winding alpine roads before reaching the Three Valleys ski area, home to Meribel, Courchevel, and Val Thorens." },
    { type: "paragraphe", texte: "The road conditions are generally well-maintained, but during heavy snowfall, our winter-ready vehicles ensure a safe and smooth ride. Our professional drivers are trained for mountain driving, giving you peace of mind throughout the transfer." },
    { type: "titre3", texte: "💰 Price range:" },
    { type: "liste", items: ["Shared transfers: From €65 per person (one way).", "Private transfers: Starting from €290 per vehicle, depending on the number of passengers."] },
    { type: "paragraphe", texte: "Early booking ensures the best rates and availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Meribel" },
    { type: "paragraphe", texte: "Booking your Geneva to Meribel transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Choose your transfer type – Select a private or shared transfer." },
    { type: "paragraphe", texte: "✅ 2. Enter your details – Provide your arrival time, number of passengers, and luggage requirements." },
    { type: "paragraphe", texte: "✅ 3. Confirm your booking – Secure your spot with instant confirmation and no hidden fees." },
    { type: "paragraphe", texte: "✅ 4. Meet your driver – Your professional driver will greet you at Geneva Airport and assist you with your luggage." },
    { type: "paragraphe", texte: "✅ 5. Enjoy a hassle-free ride – Sit back, relax, and take in the stunning views on your way to Meribel." },
    { type: "paragraphe", texte: "Book your Geneva to Meribel transfer now and travel in comfort!" },
  ],

  faq: [

  ],
};
