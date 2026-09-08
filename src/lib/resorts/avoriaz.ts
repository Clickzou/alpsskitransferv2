import type { Resort } from "./types";

/**
 * Repris de /france-ski-transfers/avoriaz/ (WordPress, 829 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const avoriaz: Resort = {
  slug: "avoriaz",
  name: "Avoriaz",
  country: "FR",
  status: "migre",

  metaTitre: "Avoriaz Ski Transfers | Fast, Direct & Stress-Free",
  metaDescription: "Avoriaz Ski Transfers from Geneva, Lyon & more. Fast, direct, door-to-door service. Secure your ride now & hit the slopes stress-free!",
  h1: "Avoriaz Ski Transfers – Fast, Comfortable & Reliable Transfers to the French Alps",
  chapo: "Looking for a stress-free and comfortable way to reach Avoriaz? Our Avoriaz Ski Transfers provide a fast, direct, and reliable transport solution from major airports like Geneva Airport, Lyon Airport, Grenoble Airport, and Chambéry Airport to your ski resort. Whether you're traveling solo, as a couple, or with a group, we ensure a seamless door-to-door experience, avoiding the hassle of public transport and long waiting times.",

  airports: ["geneva-airport", "lyon-airport", "grenoble-isere-airport", "chambery-savoie-airport"],

  contenu: [
    { type: "paragraphe", texte: "With our Avoriaz Ski Transfers, you get the choice between private and shared options, ensuring the best balance between affordability and convenience. Our professional drivers will meet you at the airport, assist with luggage and ski equipment, and transport you safely through the breathtaking Alpine landscapes. We offer flexible pick-up times to match your flight schedule, competitive rates, and luxury vehicles to guarantee a comfortable journey. Whether you're coming from Geneva Airport for a quick 1h45 transfer or need a longer ride from Lyon, Grenoble, or Chambéry, we have the perfect solution for your trip." },
    { type: "paragraphe", texte: "Don’t waste time organizing complicated connections—book your Avoriaz Ski Transfer today and start your ski holiday without stress!" },
    { type: "titre2", texte: "Avoriaz – A Unique Ski Resort in the Heart of the French Alps" },
    { type: "paragraphe", texte: "Perched at 1,800 meters above sea level, Avoriaz is one of the most iconic ski resorts in France, known for its snow-covered wooden chalets, car-free streets, and ski-in/ski-out accommodations. Located in the heart of the Portes du Soleil ski area, it offers over 650 km of slopes, making it a paradise for skiers and snowboarders of all levels." },
    { type: "paragraphe", texte: "One of Avoriaz’s unique features is its fully pedestrianized village, where skiers glide through the resort instead of walking. Horse-drawn sledges replace cars, adding to the magical atmosphere. With an exceptional snow record, varied terrain, and world-class après-ski options, Avoriaz is perfect for both families and thrill-seekers." },
    { type: "paragraphe", texte: "Beyond skiing, Avoriaz boasts Europe’s largest snow park, the famous La Chapelle snow park, and the Aquariaz water park, a tropical paradise in the mountains. Whether you’re looking for extreme off-piste adventures or a cozy winter retreat, Avoriaz delivers an unforgettable experience." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "Why Choose Our Avoriaz Ski Transfers?" },
    { type: "liste", items: ["Door-to-door service – No waiting, no hassle, just seamless travel.", "Comfortable & spacious vehicles – Plenty of room for passengers and ski equipment.", "Flexible pick-up times – Adjusted to match your flight schedule.", "Professional, English-speaking drivers – Ensuring a safe and pleasant journey.", "Affordable rates & luxury options – Choose between shared or private transfers."] },
    { type: "titre2", texte: "Transfers to Avoriaz from Major Airports" },
    { type: "titre3", texte: "✅ Geneva Airport to Avoriaz Ski Transfers" },
    { type: "titre3", texte: "✅ Lyon Airport to Avoriaz Ski Transfers" },
    { type: "titre3", texte: "✅ Grenoble Airport to Avoriaz Ski Transfers" },
    { type: "titre3", texte: "✅ Chambéry Airport to Avoriaz Ski Transfers" },
    { type: "paragraphe", texte: "Wherever you land, our Avoriaz Ski Transfers provide direct, reliable, and comfortable transport to ensure a smooth start to your ski holiday." },
    { type: "titre3", texte: "Top Ski Resorts in France for Private & Shared Transfers" },
    { type: "titre2", texte: "Everything You Need to Know About Avoriaz Ski Transfers" },
    { type: "titre3", texte: "How to Book Your Avoriaz Ski Transfer?" },
    { type: "liste", items: ["Choose your transfer type – Private or shared options available.", "Select your pick-up location – Geneva, Lyon, Grenoble, or Chambéry Airport.", "Book online – Secure your transfer instantly with real-time availability.", "Meet your driver – Your professional chauffeur will be waiting for you upon arrival.", "Enjoy a stress-free ride – Sit back and relax while we take you directly to Avoriaz."] },
    { type: "paragraphe", texte: "Book early to save money and guarantee your seat, especially during peak ski season!" },
    { type: "titre3", texte: "How long does the transfer to Avoriaz take?" },
    { type: "liste", items: ["From Geneva Airport, expect a 1h45 journey.", "From Lyon Airport, it takes about 2h30.", "Grenoble and Chambéry transfers take around 2 to 2h45, depending on conditions."] },
    { type: "titre3", texte: "What is included in the transfer?" },
    { type: "liste", items: ["Door-to-door service from the airport to your accommodation.", "Luggage and ski equipment transport at no extra charge.", "Private and shared transfer options available."] },
  ],

  faq: [
    { question: "Is Avoriaz suitable for families?", reponse: "Absolutely! Avoriaz is one of the most family-friendly ski resorts in the French Alps, featuring car-free streets, ski-in/ski-out chalets, a top-rated ski school, and great kids’ activities." },
    { question: "Can I book a last-minute transfer?", reponse: "Yes, but availability is limited during peak season. We recommend booking in advance to secure the best prices and flexibility." },
    { question: "Are child seats available?", reponse: "Yes! Child seats are included upon request at no extra cost." },
  ],
};
