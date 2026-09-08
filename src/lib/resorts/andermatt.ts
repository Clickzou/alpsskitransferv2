import type { Resort } from "./types";

/**
 * Repris de /switzerland-ski-transfers/andermatt/ (WordPress, 1000 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const andermatt: Resort = {
  slug: "andermatt",
  name: "Andermatt",
  country: "CH",
  status: "migre",

  metaTitre: "Andermatt Ski Transfers | Book Your Ride Now",
  metaDescription: "Book your Andermatt ski transfer now! Fast, reliable, and comfortable service from major airports. Secure your ride today!",
  h1: "Andermatt Ski Transfers – Private & Shared Transfers to the Swiss Alps",
  chapo: "Looking for a reliable Andermatt ski transfer to reach the slopes effortlessly? Whether you're landing at Zurich Airport, Milan Airport, or Geneva Airport, our private and shared transfers provide a comfortable, safe, and direct journey to this breathtaking Swiss ski resort. Avoid the hassle of public transport, long waiting times, or multiple connections—our door-to-door ski transfers ensure a stress-free experience with professional drivers, luxury vehicles, and guaranteed on-time service.",

  airports: ["zurich-airport", "milan-linate-airport", "milan-malpensa-airport", "geneva-airport", "lugano-airport"],

  contenu: [
    { type: "paragraphe", texte: "With our Andermatt ski transfers, you get the flexibility to choose between private and shared transport, depending on your budget and preferences. Our vehicles are equipped to handle snowy conditions, and our drivers are experienced in Alpine routes, ensuring a smooth ride through the Swiss mountains. Enjoy the convenience of luggage space for your ski equipment, child seats upon request, and the flexibility to schedule transfers that fit your arrival and departure times." },
    { type: "paragraphe", texte: "Book your Andermatt ski transfer online today and secure the best rates for your trip to one of Switzerland’s most renowned ski destinations. Compare options, save money, and start your ski holiday with a seamless and comfortable transfer experience." },
    { type: "titre2", texte: "Andermatt: A Hidden Gem in the Swiss Alps" },
    { type: "paragraphe", texte: "Nestled in the heart of the Swiss Alps, Andermatt is an alpine paradise that has gained international recognition for its pristine slopes, luxury accommodations, and breathtaking mountain scenery. Located at an altitude of 1,447 meters, Andermatt is part of the SkiArena Andermatt-Sedrun, offering more than 120 kilometers of ski slopes catering to all levels, from beginners to expert skiers." },
    { type: "paragraphe", texte: "One of the highlights of skiing in Andermatt is the Gemsstock Mountain, which is famous for its steep descents, off-piste opportunities, and deep powder snow. Meanwhile, the Nätschen-Sedrun ski area is perfect for families and intermediate skiers, offering wide, sunny slopes and breathtaking panoramic views." },
    { type: "paragraphe", texte: "Beyond skiing, Andermatt is a charming Swiss village that combines traditional Alpine architecture with modern luxury. Visitors can enjoy high-end hotels, gourmet dining, and a relaxing après-ski experience. Whether you want to explore the historic streets of Andermatt, relax in a spa, or embark on a scenic train journey on the Glacier Express, this resort offers a unique blend of adventure and relaxation." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre3", texte: "The Benefits of Our Ski Transfers" },
    { type: "liste", items: ["Door-to-door service – Get picked up at the airport and dropped off at your hotel or chalet.", "Luxury & spacious vehicles – Choose from premium sedans, minivans, and 4x4 SUVs.", "Experienced drivers – Professionals trained for winter driving conditions.", "Ski equipment transport included – No extra charge for your skis, snowboards, or luggage.", "Flexible scheduling – Transfers available 24/7 to match your flight schedule.", "Safe & reliable travel – Avoid public transport delays and multiple stops."] },
    { type: "titre2", texte: "Airports Near Andermatt & Transfer Times" },
    { type: "paragraphe", texte: "We offer private and shared ski transfers from the nearest airports to Andermatt:" },
    { type: "paragraphe", texte: "✅ Zurich Airport (ZRH) → Andermatt – 1h45✅ Milan Malpensa Airport (MXP) → Andermatt – 2h30✅ Geneva Airport (GVA) → Andermatt – 3h30✅ Lugano Airport (LUG) → Andermatt – 2h✅ Bern Airport (BRN) → Andermatt – 2h15" },
    { type: "paragraphe", texte: "Our Zurich to Andermatt ski transfers are the most popular option, offering the fastest and most convenient way to reach the resort." },
    { type: "titre3", texte: "Top Ski Resorts in Austria for Private & Shared Transfers" },
    { type: "titre2", texte: "Frequently asked questions Andermatt Ski Transfer" },
    { type: "liste", items: ["Choose your airport – Select Zurich, Milan, Geneva, or other nearby airports.", "Pick your transfer type – Private or shared depending on your budget and group size.", "Enter your travel details – Specify your pick-up and drop-off locations, flight time, and number of passengers.", "Confirm and book online – Secure your ski transfer with instant confirmation.", "Meet your driver at the airport – Travel comfortably to Andermatt without stress."] },
    { type: "paragraphe", texte: "Booking in advance ensures the best prices and availability, especially during peak ski season." },
    { type: "titre3", texte: "Private vs. Shared Andermatt Ski Transfers" },
    { type: "paragraphe", texte: "Choosing between private and shared ski transfers depends on your preferences and budget:" },
    { type: "liste", items: ["Private Ski Transfers:Exclusive vehicle for you and your group.", "Direct transfer with no additional stops.", "More flexibility in pick-up and drop-off times.", "Best for families, groups, and travelers who prioritize convenience.", "Shared Ski Transfers:A more affordable option, sharing the ride with other skiers.", "May involve multiple stops at different accommodations.", "Ideal for budget-conscious travelers."] },
    { type: "paragraphe", texte: "Whichever option you choose, our Andermatt ski transfers guarantee a safe, reliable, and comfortable ride to the resort." },
  ],

  faq: [
    { question: "Why Choose Our Andermatt Ski Transfers?", reponse: "Choosing our Andermatt ski transfers means enjoying a hassle-free and comfortable journey from the airport to your ski destination. Whether you're traveling alone, with family, or in a group, our service ensures a smooth and efficient transfer." },
    { question: "How to Book Your Andermatt Ski Transfer?", reponse: "Booking your ski transfer to Andermatt is quick and simple:" },
    { question: "What is the best airport for Andermatt ski transfers?", reponse: "The closest major airport is Zurich Airport (ZRH), with a transfer time of 1h45. Milan Malpensa (MXP) is another good option, with a transfer time of 2h30." },
    { question: "How much does a ski transfer to Andermatt cost?", reponse: "Prices vary based on airport, transfer type (private or shared), and number of passengers. Private transfers are priced higher for exclusive service, while shared transfers offer a more affordable option." },
    { question: "Are ski equipment and luggage included in the transfer?", reponse: "Yes, all our Andermatt ski transfers include ski equipment transport at no extra cost." },
    { question: "Are child seats available for families?", reponse: "Yes, child seats are available upon request and included for free." },
    { question: "Can I book a last-minute transfer?", reponse: "Yes, but we recommend booking in advance to secure the best availability and prices." },
  ],
};
