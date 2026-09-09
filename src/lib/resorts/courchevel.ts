import type { Resort } from "./types";

/**
 * Repris de /france-ski-transfers/courchevel/ (WordPress, 1219 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const courchevel: Resort = {
  slug: "courchevel",
  name: "Courchevel",
  country: "FR",
  status: "migre",

  metaTitre: "Courchevel Ski Transfers | Book Now for a Hassle-Free Ride!",
  metaDescription: "Secure your Courchevel ski transfer! Fast, direct & reliable from Geneva, Lyon, Grenoble & Chambéry. Private, door to door. Book your ride now!",
  h1: "Courchevel Ski Transfers – Fast, Reliable & Comfortable Transport",
  chapo: "Looking for a Courchevel Ski Transfer that ensures a comfortable, reliable, and direct journey to this world-class ski destination? Whether arriving from Geneva Airport, Lyon Airport, Grenoble Airport, or Chambéry Airport, our private transfers provide a door-to-door service, getting you to Courchevel hassle-free.",

  airports: ["geneva-airport", "lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"],

  contenu: [
    { type: "paragraphe", texte: "Avoid the inconvenience of public transport and enjoy a smooth, comfortable transfer with an experienced driver. Our ski transfers guarantee direct travel with no unnecessary delays, allowing you to maximize your time on the slopes. Whether you are travelling as a couple or as a group of eight, there is a vehicle category that fits, at a price fixed before you book." },
    { type: "paragraphe", texte: "With our Courchevel ski transfers, you can compare transfer options, book online, and save money while traveling with a trusted provider. Our fleet of modern vehicles is designed to handle winter road conditions, ensuring a safe journey even in snowy weather. Book your Courchevel transfer today and enjoy a quick, seamless trip to one of the most prestigious ski resorts in the French Alps." },
    { type: "titre2", texte: "Discover Courchevel – The Jewel of the Three Valleys" },
    { type: "paragraphe", texte: "Located in the heart of the Three Valleys, Courchevel is one of the most exclusive ski resorts in the world, attracting skiers from across the globe. Known for its luxurious accommodations, Michelin-star restaurants, and impeccable ski slopes, it offers a premium ski experience like no other." },
    { type: "paragraphe", texte: "Courchevel consists of multiple altitude villages:" },
    { type: "liste", items: ["Courchevel 1850 – The most prestigious, offering luxury chalets, fine dining, and high-end boutiques.", "Courchevel 1650 (Moriond) – A lively, family-friendly area with excellent ski-in, ski-out accommodations.", "Courchevel 1550 – A quieter, more affordable option, perfect for families and those seeking a relaxed atmosphere.", "Courchevel 1300 (Le Praz) – A charming, traditional village with authentic Savoyard character."] },
    { type: "paragraphe", texte: "With over 600 km of ski slopes, Courchevel is a paradise for all levels of skiers, from beginners to professionals. Whether you’re looking for high-altitude skiing, off-piste adventures, or a luxurious après-ski experience, Courchevel offers it all." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre3", texte: "Private Ski Transfers" },
    { type: "liste", items: ["Direct, door-to-door service.", "No waiting time – Your driver is ready upon arrival.", "Luxury vehicle options available for a high-end experience."] },
    { type: "titre3", texte: "Top Ski Resorts in France for Private Transfers" },
    { type: "titre2", texte: "FAQ about Courchevel ski transfers" },
    { type: "titre3", texte: "Steps to Book" },
    { type: "liste", items: ["Compare vehicle categories and pick the one that fits your group.", "Book online with instant confirmation.", "Save money by booking early.", "Meet your driver at the airport.", "Enjoy a smooth ride directly to Courchevel."] },
    { type: "paragraphe", texte: "With competitive prices, reliable service, and a commitment to quality, our ski transfers ensure you arrive in Courchevel relaxed and ready to ski." },
    { type: "titre3", texte: "Why Choose Our Courchevel Ski Transfers?" },
    { type: "liste", items: ["Professional, experienced drivers who know the mountain roads.", "Modern, winter-equipped vehicles for safe travel.", "Flexible options for individuals, families, and groups.", "24/7 customer support for assistance at any time."] },
    { type: "paragraphe", texte: "🚖 Ready to book your Courchevel ski transfer? Secure your spot today and enjoy a fast, comfortable ride to one of the world’s most prestigious ski resorts." },
    { type: "liste", items: ["Chambéry Airport (CMF): Approximately 1 to 1.5 hours.", "Geneva Airport (GVA): Around 2 to 2.5 hours.", "Lyon Airport (LYS): About 2 to 2.5 hours.", "Grenoble Airport (GNB): Roughly 2 to 2.5 hours."] },
    { type: "paragraphe", texte: "Please note that these times can vary based on traffic and weather conditions." },
  ],

  faq: [
    { question: "Which vehicle should I book for Courchevel?", reponse: "It depends on your group and your luggage. The Standard takes up to 8 passengers, the Business up to 7 in more comfort, and the Premium saloon up to 4. In winter the boot decides before the seats do — eight passengers rarely travel with eight suitcases and eight pairs of skis — so tell us how many bags and ski carriers you have when you book, and we send a vehicle that fits." },
    { question: "Which Airports Offer Courchevel Ski Transfers?", reponse: "We provide Courchevel ski transfers from the following major airports: ✅ Geneva Airport (GVA) – 2h30 transfer time.✅ Lyon Airport (LYS) – 2h30 transfer time.✅ Grenoble Airport (GNB) – 2h15 transfer time.✅ Chambéry Airport (CMF) – Closest option at 1h30. Our ski transfers from Geneva, Lyon, Grenoble, and Chambéry run as private transfers, ensuring you get to Courchevel with comfort and ease." },
    { question: "How to Book Your Courchevel Ski Transfer?", reponse: "Booking your Courchevel ski transfer is quick and simple." },
    { question: "What are the available transfer options to Courchevel?", reponse: "Every transfer to Courchevel is private: the vehicle is yours alone, from the arrivals hall to your chalet or hotel door. There is no waiting for other passengers and no stop on the way. What you choose is the vehicle category — Standard, Business or Premium — according to the size of your group and the amount of luggage, and the pick-up time, which follows your flight." },
    { question: "How long does it take to get to Courchevel from nearby airports?", reponse: "Transfer durations vary depending on the airport of arrival:" },
    { question: "Are child seats available during the transfer?", reponse: "Yes, most transfer companies provide child seats and booster seats at no extra charge. It’s important to request these when making your booking to ensure they are available and properly installed for your journey." },
    { question: "What if my flight is delayed?", reponse: "Reputable transfer services monitor flight arrivals to accommodate delays. However, it’s crucial to inform your transfer provider as soon as possible if you anticipate any delays. Policies may vary, so checking the specific terms regarding delays with your chosen company is recommended." },
    { question: "Can I make a stop during the transfer, for example, at a supermarket?", reponse: "Some private transfer services may allow stops en route, such as at supermarkets, especially if arranged in advance. It’s best to discuss any specific requests with the transfer company when booking to confirm if such stops can be accommodated." },
    { question: "Is it necessary to book transfers in advance?", reponse: "While some services may accept last-minute bookings, it’s highly recommended to book your transfer in advance. This ensures availability, secures your preferred pick-up times, and can often result in better pricing. During peak seasons, transfer services can become fully booked quickly." },
    { question: "Do transfer services operate at all times of the day?", reponse: "Many transfer companies offer services that accommodate various flight arrival times, including early morning and late evening. However, availability can vary, and some providers may charge additional fees for services outside regular operating hours. It’s advisable to check with your chosen transfer company regarding their operating hours and any potential extra charges." },
    { question: "What types of vehicles are used for transfers?", reponse: "Transfer companies typically use modern, well-maintained vehicles suitable for alpine conditions. Depending on the service and group size, options may include standard cars, minibuses, or larger coaches. Luxury vehicle options may also be available for private transfers." },
    { question: "Are there any additional charges for ski equipment?", reponse: "Most transfer services include the transport of standard luggage and ski equipment in their pricing. However, it’s important to inform the company about any oversized items or excess baggage at the time of booking to ensure appropriate arrangements are made. For the most accurate and up-to-date information, it’s recommended to contact your chosen transfer provider directly or visit their official website." },
  ],
};
