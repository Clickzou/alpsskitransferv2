import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/salzburg-to-kitzbuhel/ (WordPress, 417 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const salzburgAirportToKitzbuhel: Transfer = {
  airport: "salzburg-airport",
  resort: "kitzbuhel",

  metaTitre: "Salzburg to Kitzbuhel Transfers | Book Your Ride Now",
  metaDescription: "Book your Salzburg to Kitzbuhel transfer now! Choose a private or shared transfer, enjoy a smooth ride & arrive stress-free at your ski resort.",
  h1: "Salzburg to Kitzbuhel Transfers",
  chapo: "Looking for a Salzburg to Kitzbuhel transfer that is comfortable, reliable, and stress-free? Whether you prefer a shared or private transfer, we provide efficient and affordable transport from Salzburg Airport or Salzburg city center directly to Kitzbühel ski resort. Skip the hassle of waiting for public transport or dealing with multiple stops—our door-to-door transfer service ensures you reach your destination quickly and safely.",

  contenu: [
    { type: "paragraphe", texte: "With a private transfer, you get a luxury vehicle with plenty of space for passengers and ski equipment, plus flexible departure times. If you're looking for a budget-friendly option, our shared transfer is a great choice, offering a cost-effective ride with other travelers heading to Kitzbühel." },
    { type: "paragraphe", texte: "Our experienced drivers know the best routes through the Austrian Alps, ensuring a smooth and comfortable journey. Whether you're traveling solo, with family, or in a group, we guarantee a high-quality service that gets you to the slopes on time. Book your Salzburg to Kitzbuhel transfer today and enjoy a stress-free start to your ski holiday!" },
    { type: "titre2", texte: "Scenic Route & Estimated Transfer Cost" },
    { type: "paragraphe", texte: "The journey from Salzburg to Kitzbuhel covers approximately 80 km (50 miles) and takes around 1 hour 15 minutes, depending on weather and road conditions. The scenic route passes through picturesque Austrian villages and stunning Alpine landscapes, making the drive as enjoyable as the destination itself." },
    { type: "liste", items: ["Private transfer price range: €150 – €250 per vehicle", "Shared transfer price range: €40 – €70 per passenger"] },
    { type: "paragraphe", texte: "Transfers are available 24/7, ensuring you reach Kitzbühel at your preferred time. Book in advance for the best availability and prices!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Salzburg to Kitzbuhel" },
    { type: "paragraphe", texte: "Booking your Salzburg to Kitzbuhel transfer is quick and easy:" },
    { type: "paragraphe", texte: "✅ 1. Enter Your Details – Select Salzburg Airport or Salzburg city as your pick-up location and choose Kitzbühel as your destination.✅ 2. Choose Your Transfer Type – Select between a private or shared transfer based on your budget and preference.✅ 3. Confirm & Pay Securely – Get an instant price quote, confirm your booking, and complete your secure payment online.✅ 4. Meet Your Driver & Enjoy the Ride – Your driver will meet you at the airport or city pick-up point and ensure a smooth journey to your ski resort." },
    { type: "paragraphe", texte: "Ready to travel? Book your Salzburg to Kitzbuhel transfer today and start your ski holiday with ease!" },
  ],

  faq: [

  ],
};
