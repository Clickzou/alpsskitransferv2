import type { Resort } from "./types";

/**
 * Repris de /france-ski-transfers/val-disere/ (WordPress, 1072 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const valDisere: Resort = {
  slug: "val-disere",
  name: "Val d’Isère",
  country: "FR",
  status: "migre",

  metaTitre: "Val d'Isère Ski Transfers | Private, Door to Door",
  metaDescription: "Book your Val d'Isère ski transfer from Geneva, Lyon & Grenoble. Private transfers with door-to-door service. Fast, reliable & stress-free!",
  h1: "Val d'Isère Ski Transfers – Fast, Reliable & Comfortable",
  chapo: "Looking for a seamless journey to one of the most renowned ski destinations in the French Alps? Our Val d'Isère Ski Transfers offer a quick, reliable, and stress-free service from major airports, ensuring you reach the slopes in total comfort. Whether you're arriving at Geneva Airport, Lyon Airport, Grenoble Airport, or Chambéry Airport, we provide door-to-door transport, taking you directly to your accommodation in Val d’Isère.",

  airports: ["geneva-airport", "lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"],

  contenu: [
    { type: "paragraphe", texte: "Avoid the inconvenience of public transport or the unpredictability of local taxis. With our private transfer service, you can enjoy a safe, direct and flexible journey. Our experienced drivers are trained for mountain driving, guaranteeing a smooth and secure ride through the snowy Alpine roads. Our fleet includes luxury sedans, spacious minivans, and premium vehicles designed to handle winter conditions." },
    { type: "paragraphe", texte: "Booking your Val d'Isère ski transfer is simple—compare options, book online, and save money on your journey. Our competitive prices ensure the best value for both solo travelers and groups. Whether you prioritize affordability, comfort, or exclusivity, we have the ideal transfer service to meet your needs. Book now and start your ski holiday stress-free!" },
    { type: "titre2", texte: "Val d’Isère: A Premier Ski Destination in the French Alps" },
    { type: "paragraphe", texte: "Nestled in the Tarentaise Valley, Val d’Isère is one of the most prestigious and sought-after ski resorts in the world. Located at 1,850 meters of altitude, it is part of the famous Espace Killy ski area, offering over 300 km of ski slopes shared with its neighboring resort, Tignes." },
    { type: "paragraphe", texte: "Val d’Isère is a paradise for skiers of all levels, from gentle beginner slopes to legendary off-piste terrains. Advanced skiers can test their skills on the Face de Bellevarde, a challenging black run used for World Cup races. Snowfall is exceptional, with a long ski season from November to May, ensuring fantastic conditions throughout the winter." },
    { type: "paragraphe", texte: "Beyond skiing, Val d’Isère boasts a charming alpine village with traditional wooden chalets, luxury hotels, and vibrant après-ski scenes. From gourmet dining to lively bars and spas, the resort caters to all tastes. Whether you're coming for a weekend getaway or an extended stay, Val d’Isère ski transfers ensure you arrive in comfort and style, ready to hit the slopes." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "Why Choose Our Val d’Isère Ski Transfers?" },
    { type: "titre3", texte: "1️⃣ Fast & Stress-Free Transfers" },
    { type: "liste", items: ["Direct, door-to-door service with no unnecessary stops.", "Experienced drivers trained for Alpine conditions.", "Luxury vehicles, minivans, and private coach options available."] },
    { type: "titre3", texte: "2️⃣ Flexible & Reliable Services" },
    { type: "liste", items: ["Book your airport transfer online in advance.", "Flight tracking & flexible pick-up times in case of delays.", "Multiple options to fit different group sizes and budgets."] },
    { type: "titre3", texte: "3️⃣ Competitive Prices & Exceptional Value" },
    { type: "liste", items: ["Affordable transfers without compromising on quality.", "Best value ski transfer options for individuals and groups.", "No hidden fees – transparent pricing."] },
    { type: "liste", items: ["Geneva Airport (GVA) – 3h transfer time", "Lyon Airport (LYS) – 3h transfer time", "Grenoble Airport (GNB) – 2h45 transfer time", "Chambéry Airport (CMF) – 2h15 transfer time"] },
    { type: "paragraphe", texte: "With transfers from Geneva, Lyon, Grenoble, and Chambéry, we provide the most efficient routes to ensure you reach Val d’Isère as quickly and comfortably as possible." },
    { type: "titre3", texte: "Top Ski Resorts in France for Private Transfers" },
    { type: "titre2", texte: "FAQ about Val d'Isère Ski Transfers" },
    { type: "titre3", texte: "How to Book Your Val d’Isère Ski Transfer?" },
    { type: "titre3", texte: "Easy Steps to Secure Your Transfer:" },
    { type: "liste", items: ["Choose your airport – Select from Geneva, Lyon, Grenoble, or Chambéry.", "Pick your vehicle – Standard, Business or Premium.", "Book online – Get instant confirmation.", "Meet your driver at the airport – No waiting, no hassle.", "Enjoy a comfortable ride to Val d’Isère."] },
    { type: "paragraphe", texte: "With our trusted ski transfer service, you can relax and focus on enjoying your ski holiday from the moment you land." },
    { type: "liste", items: ["Geneva Airport: Approximately 2.5 to 3 hours", "Lyon Airport: Approximately 2.5 to 3 hours", "Chambéry Airport: Approximately 2 hours", "Grenoble Airport: Approximately 2.5 hours"] },
    { type: "paragraphe", texte: "These times can vary depending on weather and traffic conditions." },
  ],

  faq: [
    { question: "Airport Transfers to Val d’Isère – Which Airport is Best?", reponse: "Our Val d’Isère ski transfer services operate from the main airports serving the French Alps:" },
    { question: "What are the transfer options available to Val d'Isère?", reponse: "Every transfer to Val d’Isère is private: direct, door to door, with the vehicle to yourselves and a pick-up time that follows your flight. Transfers run from Geneva, Lyon, Grenoble and Chambéry, and the vehicle category is yours to choose according to your group and your luggage." },
    { question: "How long does it take to get to Val d'Isère from nearby airports?", reponse: "Approximate transfer times to Val d’Isère are as follows:" },
    { question: "Are child seats available in transfer vehicles?", reponse: "Yes, many transfer services offer child seats upon request. It’s important to inform the transfer company of your requirements during the booking process to ensure they can accommodate your needs." },
    { question: "What is the cost of a ski transfer to Val d'Isère?", reponse: "The cost of a transfer to Val d’Isère depends on the airport, the vehicle category and the time of year. It is quoted per vehicle and not per seat, so it does not change with the number of passengers. Enter your journey to see your price before you book." },
    { question: "Can I book last-minute transfers to Val d'Isère?", reponse: "While some companies may accommodate last-minute bookings, it’s advisable to book your transfer in advance to ensure availability, especially during the busy ski season. Advance booking also allows you to secure better rates and ensures that your specific requirements, such as child seats or additional luggage space, can be met." },
    { question: "Are there eco-friendly transfer options available to Val d'Isère?", reponse: "Yes, certain transfer providers offer eco-friendly options, such as electric or hybrid vehicles, for those looking to reduce their carbon footprint. If sustainability is a priority for you, inquire with transfer companies about the availability of environmentally friendly vehicles. These FAQs aim to provide essential information for travelers planning their journey to Val d’Isère. For more detailed information, it’s recommended to contact transfer providers directly or visit their official websites." },
  ],
};
