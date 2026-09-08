import type { Transfer } from "./types";

/**
 * Repris de /airport-ski-transfers/swiss/geneva-to-megeve-transfers/ (WordPress, 467 mots) par
 * `npm run migrer:trajets`. Contenu d'origine conservé ; à étoffer vers
 * 900-1 400 mots (master §6) — les pages de trajet sont les plus maigres du site.
 */
export const genevaAirportToMegeve: Transfer = {
  airport: "geneva-airport",
  resort: "megeve",

  metaTitre: "Geneva to Megève Transfer | Fast & Reliable Ski Transport",
  metaDescription: "Book your Geneva to Megève transfer now! Private & shared options available. Fast, comfortable, & stress-free ski transport. Reserve today!",
  h1: "Geneva to Megève Transfers",
  chapo: "Looking for a Geneva to Megève Transfer that is fast, reliable, and stress-free? Whether you choose a private transfer for exclusive comfort or a shared transfer for a cost-effective option, we provide premium airport transfers directly to your ski resort. Avoid the hassle of public transport and travel in a modern, spacious vehicle with an experienced driver, ensuring a smooth ride through the French Alps.",

  contenu: [
    { type: "paragraphe", texte: "Our Geneva to Megève transfers offer door-to-door service, so you can relax from the moment you land at Geneva Airport (GVA) until you reach your chalet or hotel in Megève. No waiting for taxis, no long bus rides—just a seamless journey designed for skiers, families, and groups. Plus, all transfers include ski equipment transport at no extra cost." },
    { type: "paragraphe", texte: "With our flexible transfer options, you can travel on your schedule, enjoy fixed pricing, and have peace of mind knowing that flight delays are monitored. Experience a comfortable and hassle-free transfer from Geneva to one of France’s most luxurious ski resorts. Book your transfer now and get ready for a smooth journey to the slopes!" },
    { type: "titre2", texte: "The Route from Geneva to Megève & Transfer Prices" },
    { type: "paragraphe", texte: "The journey from Geneva to Megève covers approximately 70 km, with a transfer time of about 1 hour and 15 minutes, depending on weather and traffic conditions. The route takes you through picturesque Alpine roads, passing Lake Geneva before ascending into the stunning Haute-Savoie region, where Megève's charming ski village awaits." },
    { type: "titre3", texte: "💰 Princing" },
    { type: "paragraphe", texte: "Our shared transfers start at €45 per person, while private transfers range from €180 to €320 per vehicle, depending on the group size and vehicle type. We provide luxury sedans, minivans, and spacious coaches, ensuring you travel in comfort and safety." },
    { type: "paragraphe", texte: "With our competitive pricing, you receive exceptional service at the best value, whether you're traveling solo, with family, or as a group. Reserve your Geneva to Megève transfer today and experience a smooth, scenic ride to the slopes!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "How to Book Your Ski Transfer from Geneva to Megève" },
    { type: "paragraphe", texte: "Booking your Geneva to Megève transfer is quick and easy. Follow these simple steps to secure your ride:" },
    { type: "paragraphe", texte: "✅ 1. Get a Quote – Enter your travel details on our online booking platform.✅ 2. Choose Your Transfer Type – Select between a private or shared transfer.✅ 3. Confirm Your Booking – Secure your reservation with instant confirmation.✅ 4. Meet Your Driver – Our professional driver will be waiting at Geneva Airport to take you directly to Megève." },
    { type: "paragraphe", texte: "Book your transfer now and enjoy a stress-free journey to one of the most prestigious ski resorts in the Alps!" },
  ],

  faq: [

  ],
};
