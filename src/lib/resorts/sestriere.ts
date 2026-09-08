import type { Resort } from "./types";

/**
 * Repris de /italy-ski-transfers/sestriere-2/ (WordPress, 816 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const sestriere: Resort = {
  slug: "sestriere",
  name: "Sestriere",
  country: "IT",
  status: "migre",

  metaTitre: "Sestriere Ski Transfers | Book Your Ride Now & Save",
  metaDescription: "Book your Sestriere ski transfer today! Fast, reliable, and stress-free airport transfers from Turin, Milan, Lyon & Geneva. Reserve now!",
  h1: "Sestriere Ski Transfers – Fast, Reliable & Comfortable Transfers to the Italian Alps",
  chapo: "Looking for a Sestriere ski transfer that guarantees a comfortable, direct, and stress-free journey? Whether you're flying into Turin Airport, Milan Malpensa, Geneva, or Lyon, our private and shared transfers ensure a smooth ride to this stunning Italian Alps ski resort. Avoid the long waits, crowded buses, and complicated travel logistics—our Sestriere ski transfers provide a door-to-door service designed for skiers, snowboarders, and winter sports enthusiasts.",

  airports: ["turin-airport", "milan-linate-airport", "milan-malpensa-airport", "geneva-airport", "lyon-airport"],

  contenu: [
    { type: "paragraphe", texte: "our professional drivers and luxury vehicles, you’ll travel in comfort, ensuring that your trip to the Sestriere ski resort is as relaxing as possible. No need to worry about luggage, ski equipment, or unexpected delays—our team monitors flights and road conditions in real time to provide a punctual and safe transfer experience. Whether you’re traveling solo, with family, or in a group, we offer affordable, efficient, and premium ski transfers to Sestriere. Book your Sestriere ski transfer online today to secure the best price and start your ski holiday stress-free." },
    { type: "titre2", texte: "Discover Sestriere – A Premier Ski Destination in the Italian Alps" },
    { type: "paragraphe", texte: "Nestled in the Italian Alps, Sestriere is one of Italy’s most famous ski resorts and a key destination within the Via Lattea (Milky Way) ski area. Known for its high-altitude slopes, excellent snow conditions, and breathtaking mountain scenery, Sestriere attracts skiers and snowboarders from around the world." },
    { type: "paragraphe", texte: "With elevations reaching 2,035 meters, Sestriere offers a diverse range of slopes, catering to beginners, intermediates, and advanced skiers alike. The resort boasts over 400 km of interconnected pistes, linking to nearby resorts such as Sauze d’Oulx, Claviere, Cesana, Pragelato, and Montgenèvre in France. Whether you’re looking for fast-paced downhill runs, scenic blue trails, or extensive off-piste opportunities, Sestriere has something for everyone." },
    { type: "paragraphe", texte: "Apart from skiing, Sestriere also offers night skiing, snowshoeing, and high-altitude dining, making it a perfect destination for a well-rounded winter holiday. With a lively après-ski scene and charming Italian hospitality, this resort provides an unforgettable Alpine experience." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre3", texte: "Convenience & Comfort" },
    { type: "liste", items: ["Door-to-door transfers – No need for extra transport from the airport to your accommodation.", "Reliable service – Flight monitoring ensures your driver is always on time.", "Professional, English-speaking drivers – Experienced in winter road conditions."] },
    { type: "titre3", texte: "Fast & Direct Transfers from Major Airports" },
    { type: "liste", items: ["Turin Airport (TRN) → Sestriere – 1h30", "Milan Malpensa (MXP) → Sestriere – 2h45", "Lyon Airport (LYS) → Sestriere – 3h30", "Geneva Airport (GVA) → Sestriere – 3h45"] },
    { type: "titre3", texte: "Top Ski Resorts in Italy for Private & Shared Transfers" },
    { type: "titre2", texte: "FAQ about Sestriere Ski Transfers" },
    { type: "titre3", texte: "Private vs Shared Sestriere Ski Transfers – Which One to Choose?" },
    { type: "liste", items: ["Direct, door-to-door service – No waiting for other passengers.", "Luxury vehicles – Travel in comfort with extra space for luggage and ski gear.", "Flexible pick-up times – Adjust based on your flight schedule.", "Budget-friendly option – More affordable than private transfers.", "Scheduled departures – Travel with other skiers heading to the same resort.", "Great for solo travelers – Share the journey and meet fellow ski enthusiasts."] },
    { type: "paragraphe", texte: "No matter your preference, our Sestriere ski transfers provide safe, reliable, and efficient transport options." },
    { type: "titre3", texte: "What Makes Our Sestriere Ski Transfers Stand Out?" },
    { type: "liste", items: ["Trusted service – Years of experience in Alpine transfers.", "Comfortable vehicles – Spacious, modern, and fully equipped for winter travel.", "No hidden fees – Transparent pricing with competitive rates.", "Customer support – 24/7 assistance for any travel concerns."] },
  ],

  faq: [
    { question: "Why Choose Our Sestriere Ski Transfers?", reponse: "When traveling to Sestriere, booking a private or shared ski transfer ensures efficiency, comfort, and affordability." },
    { question: "Which Airports Offer Sestriere Ski Transfers?", reponse: "Our Sestriere ski transfers operate from the following international airports: ✅ Turin Airport (TRN) – The closest and most convenient airport for Sestriere.✅ Milan Malpensa (MXP) – A great option for international travelers.✅ Lyon Airport (LYS) – Ideal for skiers coming from France.✅ Geneva Airport (GVA) – An alternative for those flying into Switzerland. We ensure comfortable and efficient transfers from these airports directly to Sestriere ski resort." },
    { question: "How do I book my Sestriere ski transfer?", reponse: "You can book online in just a few clicks. Enter your airport and ski resort details, choose your transfer type, and receive an instant booking confirmation." },
    { question: "What is the cost of a ski transfer to Sestriere?", reponse: "Prices depend on your departure airport, transfer type, and group size. We offer competitive rates for both private and shared ski transfers." },
    { question: "Are child seats available?", reponse: "Yes! Child seats are included in all transfers upon request. Let us know your passenger requirements when booking." },
  ],
};
