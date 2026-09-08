import type { Resort } from "./types";

/**
 * Repris de /italy-ski-transfers/cortina/ (WordPress, 963 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const cortina: Resort = {
  slug: "cortina",
  name: "Cortina",
  country: "IT",
  status: "migre",

  metaTitre: "Cortina Ski Transfers | Book Your Ride to the Dolomites",
  metaDescription: "Book your Cortina ski transfer now! Fast, reliable & direct transport from major airports to the Dolomites. Secure your spot today!",
  h1: "Cortina Ski Transfers – Fast, Reliable & Comfortable Transport to the Dolomites",
  chapo: "Looking for Cortina Ski Transfers that provide a fast, comfortable, and stress-free journey to the heart of the Dolomites? Our private and shared ski transfers ensure a direct and seamless connection between major airports and Cortina d'Ampezzo, one of Italy’s most iconic ski resorts. Whether you're landing at Venice Marco Polo Airport, Treviso Airport, Innsbruck Airport, Verona Airport, or Milan Airport, we offer door-to-door ski transfers to get you to the slopes quickly and hassle-free.",

  airports: ["venice-airport", "innsbruck-airport", "verona-airport", "milan-linate-airport", "milan-malpensa-airport"],

  contenu: [
    { type: "paragraphe", texte: "Avoid the complexities of public transport or long waits for taxis—our ski transfer service ensures a smooth and reliable ride, with experienced drivers navigating the mountain roads safely. With options ranging from luxury vehicles to budget-friendly shared transfers, we cater to solo travelers, families, and groups looking for a comfortable and convenient way to reach Cortina d'Ampezzo." },
    { type: "paragraphe", texte: "By booking your ski transfer in advance, you can secure the best rates and ensure availability during peak ski season. Compare options, book online, and save money while enjoying the best value for Cortina ski transfers. Your winter holiday starts with a smooth ride—book now and experience top-tier service." },
    { type: "titre2", texte: "Cortina d'Ampezzo – Discover the Queen of the Dolomites" },
    { type: "paragraphe", texte: "Nestled in the heart of the Italian Dolomites, Cortina d'Ampezzo is often referred to as the Queen of the Dolomites, offering a prestigious skiing experience combined with breathtaking scenery. Located in northern Italy’s Veneto region, Cortina is renowned for its pristine slopes, luxury accommodations, and lively après-ski culture. It has hosted the Winter Olympics and is set to welcome the 2026 Winter Games, solidifying its reputation as a world-class ski destination." },
    { type: "paragraphe", texte: "With over 120 km of ski slopes, modern ski lifts, and access to the Dolomiti Superski area, Cortina provides an exceptional skiing experience for all levels. Whether you're a beginner looking for gentle slopes or an expert seeking thrilling descents, Cortina has something for everyone. Beyond skiing, visitors can enjoy snowshoeing, cross-country skiing, and high-altitude dining with spectacular mountain views." },
    { type: "paragraphe", texte: "Cortina is not just about the slopes—it’s also a haven for luxury travelers, with high-end boutiques, gourmet restaurants, and stylish hotels that attract an international clientele. Its unique blend of Italian elegance and Alpine charm makes it an unforgettable winter destination." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "Why Choose Our Cortina Ski Transfers?" },
    { type: "liste", items: ["Fast & Direct Service – No unnecessary stops, direct door-to-door transfers.", "Experienced Drivers – Navigate mountain roads safely and efficiently.", "Comfortable Vehicles – Choose between luxury sedans, spacious minivans, and shared transfers.", "Flexible Booking – Easily modify your transfer to match your flight schedule.", "Competitive Prices – Affordable ski transfers with no hidden fees."] },
    { type: "titre3", texte: "Top Ski Resorts in Italy for Private & Shared Transfers" },
    { type: "titre2", texte: "FAQ about Cortina Ski Transfers" },
    { type: "titre3", texte: "How to Book Your Cortina Ski Transfer?" },
    { type: "titre3", texte: "Follow These Easy Steps:" },
    { type: "liste", items: ["Book online by selecting your airport and Cortina ski transfer option.", "Compare prices between private and shared transfers.", "Secure your transfer with instant confirmation.", "Meet your driver at the airport.", "Enjoy a smooth, direct ride to Cortina d’Ampezzo."] },
    { type: "paragraphe", texte: "Book your ski transfer today and ensure a hassle-free start to your winter holiday!" },
    { type: "liste", items: ["Airport of arrival (Venice, Treviso, Innsbruck, Verona, Milan).", "Private or shared transfer.", "Time of booking (early booking ensures the best rates)."] },
    { type: "paragraphe", texte: "We offer competitive and affordable pricing, with options to suit every budget. Check our online booking tool for a personalized quote based on your travel details." },
    { type: "titre3", texte: "What Are the Benefits of Private Cortina Ski Transfers?" },
    { type: "liste", items: ["Private transfer category premium – Travel in luxury vehicles with premium service.", "Reliable and professional drivers – Experienced in navigating Alpine roads safely.", "Door-to-door service – Get dropped off directly at your accommodation.", "Flexibility – Choose your departure time and make additional stops if needed.", "No waiting times – Travel immediately upon arrival."] },
    { type: "paragraphe", texte: "A private transfer ensures comfort, convenience, and exclusivity, making it the best choice for families, groups, and VIP travelers." },
    { type: "titre3", texte: "Why Choose Our Selva Val Gardena Ski Transfers?" },
  ],

  faq: [
    { question: "Which Airports Offer Cortina Ski Transfers?", reponse: "We provide ski transfers to Cortina d'Ampezzo from all major airports in Italy and Austria: ✅ Venice Marco Polo Airport (VCE) – 2h 15min✅ Treviso Airport (TSF) – 2h 10min✅ Innsbruck Airport (INN) – 2h 45min✅ Verona Airport (VRN) – 3h✅ Milan Malpensa Airport (MXP) – 4h 30min Arriving at Venice or Treviso Airport is the most convenient option, with the shortest transfer time to Cortina. If you’re flying into Innsbruck or Verona, we ensure a comfortable journey with plenty of luggage space for ski equipment." },
    { question: "Private or Shared Cortina Ski Transfers ?", reponse: "For those seeking a luxury experience, our private ski transfers offer a personalized, stress-free journey to Cortina. With premium vehicles, professional drivers, and flexible pick-up times, you can travel at your own pace with no additional stops. Looking for an affordable transfer to Cortina? Our shared ski transfers allow you to save money while still enjoying a comfortable and efficient service. Ideal for solo travelers and small groups, this option provides a cost-effective alternative while maintaining high-quality service." },
    { question: "What Are the Costs of Cortina Ski Transfers?", reponse: "The cost of a ski transfer to Cortina depends on several factors, including:" },
  ],
};
