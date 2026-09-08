import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/austria/innsbruck-to-kitzbuhel/ (WordPress, 406 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const innsbruckAirportToKitzbuhel: Transfer = {
  airport: "innsbruck-airport",
  resort: "kitzbuhel",

  metaTitre: "Innsbruck to Kitzbuhel Transfer | Book Your Ski Transfer Now",
  metaDescription: "Travel from Innsbruck to Kitzbuhel hassle-free! Book your private or shared ski transfer today for a fast, comfortable, and affordable ride.",
  h1: "Innsbruck to Kitzbuhel Transfer",
  chapo: "Planning your ski trip from Innsbruck to Kitzbuhel? Whether you’re traveling solo, with family, or in a group, our shared and private ski transfers provide a stress-free and affordable way to reach your destination. Avoid the hassle of public transport and enjoy a direct, door-to-door transfer with professional drivers and comfortable, spacious vehicles.",

  contenu: [
    { type: "paragraphe", texte: "Our transfers ensure a seamless journey from Innsbruck Airport or city center to the heart of Kitzbühel, one of Austria’s most famous ski resorts. With a reliable, on-time service, you’ll reach your accommodation quickly and safely without worrying about changing buses or carrying heavy ski equipment. Our vehicles are equipped for winter conditions, and we monitor flights to adjust for any delays." },
    { type: "paragraphe", texte: "Book your ski transfer from Innsbruck to Kitzbühel today and enjoy a smooth, efficient ride to the slopes. Whether you’re looking for an affordable shared transfer or a luxury private ride, we have the perfect solution for you!" },
    { type: "titre2", texte: "Scenic Route & Estimated Transfer Costs" },
    { type: "paragraphe", texte: "The Innsbruck to Kitzbühel route offers a breathtaking drive through the Austrian Alps, covering approximately 95 km. The journey takes around 1 hour and 30 minutes, depending on weather and traffic conditions." },
    { type: "paragraphe", texte: "Travelers will pass through picturesque alpine landscapes, charming villages, and winding mountain roads, making the transfer an experience in itself. The road is well-maintained and fully equipped for winter travel, ensuring a safe and smooth ride even in snowy conditions." },
    { type: "titre2", texte: "Estimated Prices:" },
    { type: "liste", items: ["Shared Transfer: Starting from €35 per person", "Private Transfer: Starting from €140 per vehicle"] },
    { type: "paragraphe", texte: "Our pricing is transparent, with no hidden costs. Booking in advance guarantees you the best rates and availability, especially during peak ski season." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Innsbruck to Kitzbühel" },
    { type: "paragraphe", texte: "Booking your ski transfer from Innsbruck to Kitzbühel is quick and easy. Follow these simple steps:" },
    { type: "paragraphe", texte: "✅ 1. Select Your Transfer Type – Choose between a shared or private transfer based on your budget and travel preferences." },
    { type: "paragraphe", texte: "✅ 2. Enter Your Travel Details – Provide your pick-up location, drop-off destination, date, and time." },
    { type: "paragraphe", texte: "✅ 3. Confirm Your Booking – Secure your spot instantly with a fast and secure online payment." },
    { type: "paragraphe", texte: "✅ 4. Meet Your Driver & Enjoy the Ride – Your professional driver will be waiting for you at the designated pick-up point, ready to take you directly to Kitzbühel." },
  ],

  faq: [

  ],
};
