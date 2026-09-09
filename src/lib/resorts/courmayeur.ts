import type { Resort } from "./types";

/**
 * Repris de /italy-ski-transfers/courmayeur-ski-transfers/ (WordPress, 855 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const courmayeur: Resort = {
  slug: "courmayeur",
  name: "Courmayeur",
  country: "IT",
  status: "migre",

  metaTitre: "Courmayeur Ski Transfers | Book Your Ride Now!",
  metaDescription: "Fast & reliable Courmayeur ski transfers. Book now for a stress-free ride from Geneva, Milan, or Turin airport to your ski resort!",
  h1: "Courmayeur Ski Transfers – Fast, Reliable & Comfortable",
  chapo: "Looking for a Courmayeur ski transfer that ensures a stress-free, direct, and comfortable journey to one of Italy’s most prestigious ski destinations? Our private ski transfers provide door-to-door service from major airports, including Geneva Airport, Milan Airport, Turin Airport, Lyon Airport, and Chambéry Airport, directly to Courmayeur ski resort. Whether you’re arriving for a quick ski weekend or an extended stay, we ensure a safe, reliable, and seamless transfer experience.",

  airports: ["geneva-airport", "milan-linate-airport", "milan-malpensa-airport", "turin-airport", "lyon-airport", "chambery-savoie-airport", "grenoble-isere-airport"],

  contenu: [
    { type: "paragraphe", texte: "With our Courmayeur ski transfers, you can avoid the inconvenience of public transport or rental cars and travel in a comfortable, well-equipped vehicle suited to snowy mountain roads. Our professional drivers monitor flight arrivals and road conditions to guarantee timely service, ensuring you reach your accommodation in Courmayeur without delay. We offer the best prices, flexibility, and direct service to match your needs. Book your Courmayeur ski transfer online today and start your ski holiday with ease!" },
    { type: "titre2", texte: "Discover Courmayeur – A Jewel of the Italian Alps" },
    { type: "paragraphe", texte: "Nestled at the foot of Mont Blanc, Courmayeur ski resort is one of Italy’s most exclusive and charming ski destinations. Renowned for its stunning alpine scenery, high-quality pistes, and traditional Italian hospitality, Courmayeur attracts skiers from around the world looking for a mix of excellent skiing, fine dining, and breathtaking landscapes." },
    { type: "paragraphe", texte: "With over 100 km of skiable terrain, the resort offers a mix of challenging runs, off-piste adventures, and family-friendly slopes. The Monte Bianco Skyway cable car provides access to spectacular panoramic views, while expert skiers can take on the Vallée Blanche route, leading into Chamonix, France. Après-ski lovers will enjoy Courmayeur’s lively village, featuring authentic Italian restaurants, boutique shopping, and vibrant nightlife." },
    { type: "paragraphe", texte: "Whether you're a seasoned skier or visiting for the first time, Courmayeur delivers an unforgettable winter experience. And with our Courmayeur ski transfers, getting there has never been easier!" },
    { type: "titre3", texte: "Our vehicles" },
    { type: "liste", items: ["Door-to-door transfers from airports and train stations directly to your accommodation.", "Flexible options – Choose between private transfers to match your budget.", "Experienced drivers – Trained for winter conditions, ensuring a safe and smooth journey.", "Flight tracking & real-time adjustments – No stress if your flight is delayed.", "Plenty of space for ski equipment and luggage at no extra cost."] },
    { type: "titre3", texte: "Top Ski Resorts in Italy for Private Transfers" },
    { type: "titre2", texte: "FAQ about Courmayeur Ski Transfers" },
    { type: "liste", items: ["Direct, non-stop journey to your accommodation.", "Exclusive vehicle for you and your group.", "Luxury vehicles available for a premium experience.", "More affordable option, great for solo travelers or small groups.", "Comfortable, spacious vehicles with multiple drop-offs.", "Reliable scheduling to match flight arrivals and departures."] },
    { type: "paragraphe", texte: "Both options guarantee a smooth, efficient, and safe journey to Courmayeur." },
    { type: "liste", items: ["Enter your travel details – Select your airport, date, and drop-off location.", "Choose the vehicle category that fits your group.", "Confirm your booking and receive an instant confirmation.", "Meet your driver at the airport and enjoy a hassle-free ride."] },
    { type: "paragraphe", texte: "For the best availability and prices, we recommend booking your Courmayeur ski transfer online in advance." },
    { type: "titre3", texte: "Is there a difference between private transfers?" },
    { type: "liste", items: ["Private transfers offer direct, exclusive service with no stops.", "The price is per vehicle rather than per seat, so it does not change with the number of passengers."] },
    { type: "paragraphe", texte: "Both options provide a safe and comfortable ride to Courmayeur." },
  ],

  faq: [
    { question: "Why Choose Our Courmayeur Ski Transfers?", reponse: "We offer private Courchevel ski transfers, allowing you to choose the option that best fits your needs: Choosing a Courmayeur ski transfer means comfort, reliability, and efficiency. We offer:" },
    { question: "Which Airports Offer Courmayeur Ski Transfers?", reponse: "We provide Courmayeur ski transfers from the nearest major airports, ensuring a quick and comfortable journey to the resort: ✅ Geneva Airport (GVA) – 1h45✅ Milan Malpensa Airport (MXP) – 2h✅ Milan Linate Airport (LIN) – 2h15✅ Turin Airport (TRN) – 1h30✅ Chambéry Airport (CMF) – 2h30✅ Lyon Airport (LYS) – 3h✅ Grenoble Airport (GNB) – 3h30 Wherever you land, our Courmayeur ski transfer service ensures a direct, comfortable ride to your accommodation." },
    { question: "Courmayeur Ski Resort Transfer Options ?", reponse: "We offer private transfers in three vehicle categories, catering to different travel needs:" },
    { question: "How to Book Your Courmayeur Ski Transfer?", reponse: "Booking your Courmayeur ski transfer is simple:" },
    { question: "Can I bring my ski equipment?", reponse: "Yes! Ski equipment transport is included in all our Courmayeur ski transfers, with no extra fees." },
    { question: "Are child seats available?", reponse: "Absolutely! Child seats are available at no additional cost – just let us know in advance." },
    { question: "What happens if my flight is delayed?", reponse: "We offer flight tracking and adjust pick-up times to accommodate delays at no extra charge." },
  ],
};
