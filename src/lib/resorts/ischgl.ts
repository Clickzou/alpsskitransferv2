import type { Resort } from "./types";

/**
 * Repris de /austria-ski-transfers/ischgl/ (WordPress, 783 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const ischgl: Resort = {
  slug: "ischgl",
  name: "Ischgl",
  country: "AT",
  status: "migre",

  metaTitre: "Ischgl Ski Transfers – Fast & Reliable Airport Rides",
  metaDescription: "Book your Ischgl ski transfer for a fast, comfortable ride from Innsbruck, Munich, Zurich & Salzburg airports. Private & shared options available!",
  h1: "Ischgl Ski Transfers – Fast, Comfortable & Stress-Free Travel",
  chapo: "Looking for Ischgl Ski Transfers that offer fast, comfortable, and hassle-free travel to one of Austria’s most popular ski resorts? Whether you're arriving at Innsbruck, Munich, Zurich, or Salzburg airports, we provide private and shared transfers directly to Ischgl, ensuring a smooth, door-to-door service with professional drivers.",

  airports: ["innsbruck-airport", "munich-airport", "zurich-airport", "salzburg-airport"],

  contenu: [
    { type: "paragraphe", texte: "Avoid the stress of public transport and multiple stops. With our reliable ski transfers, you reach Ischgl safely and comfortably, enjoying the ultimate flexibility for your ski holiday. Book your transfer today and experience a stress-free ride to the slopes." },
    { type: "titre2", texte: "Discover Ischgl – A Premier Ski Destination" },
    { type: "paragraphe", texte: "Nestled in the Austrian Alps, Ischgl is one of Europe’s top ski destinations, known for its high-altitude slopes, lively après-ski scene, and world-class ski infrastructure. Situated in the Tyrolean region, it offers an impressive 239 km of skiable terrain, making it a paradise for skiers and snowboarders of all levels." },
    { type: "liste", items: ["Guaranteed snow – Thanks to its high-altitude slopes, the resort offers a long ski season from November to May.", "The Silvretta Arena – One of the largest interconnected ski areas linking Austria and Switzerland.", "Lively après-ski – Ischgl is famous for its vibrant nightlife, concerts, and luxury entertainment.", "Modern ski lifts – The resort boasts state-of-the-art ski lifts, ensuring minimal waiting times."] },
    { type: "paragraphe", texte: "Whether you're visiting for high-performance skiing or a luxury alpine escape, Ischgl delivers an unforgettable experience." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre3", texte: "Comfortable & Reliable Transfers" },
    { type: "liste", items: ["Direct door-to-door service – No detours or unnecessary stops.", "Professional drivers with experience navigating snowy alpine roads.", "Spacious, modern vehicles designed for winter conditions."] },
    { type: "titre3", texte: "Flexible Pick-up & Drop-off Locations" },
    { type: "paragraphe", texte: "We provide transfers from all major airports near Ischgl, including:" },
    { type: "paragraphe", texte: "No matter where you arrive, we ensure a stress-free and seamless connection to Ischgl." },
    { type: "titre3", texte: "Top Ski Resorts in Austria for Private & Shared Transfers" },
    { type: "titre2", texte: "Frequently asked questions Obergurgl-Hochgurgl Ski Transfer Service" },
    { type: "liste", items: ["Choose your airport – Select Innsbruck, Munich, Zurich, or Salzburg.", "Pick your transfer type – Select from private or shared transfer options.", "Enter your details – Provide flight information and accommodation address.", "Confirm your booking – Secure your transfer with instant confirmation.", "Meet your driver – Enjoy a smooth and comfortable journey to Ischgl."] },
    { type: "paragraphe", texte: "With our competitive prices and easy booking process, you can relax and focus on your ski adventure." },
    { type: "liste", items: ["Innsbruck Airport (INN) – Closest airport, 1h30 transfer.", "Munich Airport (MUC) – Great for international arrivals, 3h transfer.", "Zurich Airport (ZRH) – Popular for skiers traveling from Switzerland, 2h45 transfer.", "Salzburg Airport (SZG) – A good alternative, 2h50 transfer."] },
    { type: "paragraphe", texte: "No matter where you land, our Ischgl ski transfers ensure a reliable and stress-free start to your holiday." },
    { type: "titre3", texte: "Why Ischgl is a Top Ski Destination?" },
    { type: "liste", items: ["Interconnected ski terrain – Linked with Samnaun in Switzerland for cross-border skiing.", "Advanced lift system – Modern ski lifts reduce waiting time.", "Après-ski like no other – Famous for its nightlife, concerts, and events.", "Luxury & convenience – High-end accommodations and Michelin-starred restaurants."] },
    { type: "paragraphe", texte: "Ischgl is more than just a ski resort – it’s an experience." },
    { type: "liste", items: ["Safe and comfortable seating for all age groups.", "Extra luggage space for family travel needs.", "Customizable seating arrangements to meet passenger requirements."] },
    { type: "paragraphe", texte: "Simply request a child seat when booking your Ischgl ski transfer, and we’ll ensure your family travels safely and comfortably." },
  ],

  faq: [
    { question: "Why Choose Our Ischgl Ski Transfers?", reponse: "We offer premium Ischgl ski transfers with a focus on comfort, reliability, and efficiency." },
    { question: "Which Airports Offer Transfers to Ischgl?", reponse: "We provide direct transfers from the following airports: ✅ Innsbruck Airport (INN) – Closest airport, 1h30 transfer.✅Munich Airport (MUC) – Great for international arrivals, 3h transfer.✅Zurich Airport (ZRH) – Popular for skiers traveling from Switzerland, 2h45 transfer.✅Salzburg Airport (SZG) – A good alternative, 2h50 transfer. No matter where you land, our Ischgl ski transfers ensure a reliable and stress-free start to your holiday." },
    { question: "How to Book Your Ischgl Ski Transfer?", reponse: "Booking your transfer is quick and simple:" },
    { question: "Which Airports Offer Transfers to Ischgl?", reponse: "We provide direct transfers from the following airports:" },
    { question: "Are Child Seats Available in Transfers?", reponse: "Yes! We offer child seats included at no extra charge for families traveling with young passengers." },
  ],
};
