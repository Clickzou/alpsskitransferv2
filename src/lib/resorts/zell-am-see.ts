import type { Resort } from "./types";

/**
 * Repris de /austria-ski-transfers/zell-am-see/ (WordPress, 824 mots) par
 * `npm run migrer:stations`. Contenu d'origine conservé tel quel — c'est le bon
 * contenu du site, il ne se réécrit pas. À relire avant mise en ligne.
 */
export const zellAmSee: Resort = {
  slug: "zell-am-see",
  name: "Zell am See",
  country: "AT",
  status: "migre",

  metaTitre: "Zell am See Ski Transfers | Fast & Reliable Airport Rides",
  metaDescription: "Book your Zell am See ski transfer from Salzburg, Munich or Innsbruck airports. Door-to-door service, no hidden fees, 24/7 support.",
  h1: "Zell am See Ski Transfers – Fast, Reliable & Comfortable Travel",
  chapo: "Planning a ski trip to Zell am See? Our Zell am See Ski Transfers provide a fast, reliable, and hassle-free way to reach this stunning Austrian ski resort. Whether you’re arriving at Salzburg Airport, Munich Airport, or Innsbruck Airport, we ensure a comfortable and direct transfer to your accommodation, eliminating the stress of public transport or waiting for a taxi.",

  airports: ["salzburg-airport", "munich-airport", "innsbruck-airport", "vienna-airport"],

  contenu: [
    { type: "paragraphe", texte: "With our Zell am See ski transfer service, you can enjoy a door-to-door experience, with professional English-speaking drivers and a fleet of modern, well-equipped vehicles. We offer private and shared transfer options, allowing you to choose the best fit for your travel needs and budget. Whether you’re traveling solo, with family, or in a group, our ski transfers guarantee a smooth and scenic journey through the Austrian Alps." },
    { type: "paragraphe", texte: "No matter the time of your arrival, our team tracks your flight to ensure punctual pick-up, even in the event of delays. With fixed pricing, no hidden fees, and flexible booking options, we make reaching Zell am See effortless. Book your ski transfer online today and start your ski holiday stress-free!" },
    { type: "titre2", texte: "Discover Zell am See – A Ski Paradise in Austria" },
    { type: "paragraphe", texte: "Nestled between the majestic peaks of the Austrian Alps and the crystal-clear waters of Lake Zell, Zell am See is one of Austria’s most popular ski destinations. This picturesque resort offers a perfect combination of world-class skiing, breathtaking scenery, and vibrant après-ski culture." },
    { type: "paragraphe", texte: "The Schmittenhöhe ski area, located directly above the town, provides 77 km of perfectly groomed slopes, suitable for all skill levels. With modern ski lifts and a well-connected piste network, skiers can enjoy a variety of runs with spectacular views over Lake Zell. Additionally, the resort connects seamlessly to the Ski Alpin Card area, offering access to 408 km of slopes, including Kaprun and the Kitzsteinhorn Glacier for high-altitude skiing." },
    { type: "paragraphe", texte: "Beyond skiing, Zell am See boasts an exciting range of activities, from snowshoeing and ice skating on the frozen lake to luxurious spa experiences and fine dining in traditional Austrian mountain lodges. Whether you’re an adrenaline seeker or someone looking for a relaxing winter getaway, Zell am See is the perfect choice." },
    { type: "titre3", texte: "Our vehicles" },
    { type: "titre2", texte: "Why Choose Our Zell am See Ski Transfers?" },
    { type: "titre3", texte: "Comfort & Convenience" },
    { type: "liste", items: ["Door-to-door transfers – No waiting, no hassle.", "Reliable pick-up & drop-off at your accommodation.", "Modern, spacious vehicles with plenty of room for luggage and ski equipment."] },
    { type: "titre3", texte: "Private & Shared Options Available" },
    { type: "liste", items: ["Private ski transfers – Exclusive, direct service for the ultimate convenience.", "Shared ski transfers – Cost-effective travel while still enjoying a comfortable ride."] },
    { type: "titre3", texte: "Fixed Prices & No Hidden Fees" },
    { type: "liste", items: ["Transparent pricing with no surprises.", "Competitive rates for both private and shared transfers.", "Book online in advance to secure the best availability and value."] },
    { type: "titre3", texte: "Experienced Drivers & Local Knowledge" },
    { type: "liste", items: ["Professional English-speaking drivers trained for winter conditions.", "Local expertise ensures the fastest and safest routes to Zell am See."] },
    { type: "titre3", texte: "Top Ski Resorts in Austria for Private & Shared Transfers" },
    { type: "titre2", texte: "Frequently asked questions Zell am See Ski Transfer" },
    { type: "titre3", texte: "How to Book Your Zell am See Ski Transfer?" },
    { type: "liste", items: ["Select your airport (Salzburg, Munich, Innsbruck, or Vienna).", "Choose private or shared transfer based on your preference.", "Enter your travel details and confirm pricing.", "Book your ski transfer online and receive instant confirmation.", "Meet your driver at the airport and enjoy a stress-free ride!"] },
    { type: "paragraphe", texte: "Booking your Zell am See ski transfer in advance ensures availability, the best prices, and a smooth journey to your ski resort." },
  ],

  faq: [
    { question: "Which Airports Offer Ski Transfers to Zell am See?", reponse: "We provide Zell am See ski transfers from the main international airports serving the Austrian Alps: ✅ Salzburg Airport (SZG) – 1h30✅ Munich Airport (MUC) – 2h30✅ Innsbruck Airport (INN) – 2h30✅ Vienna Airport (VIE) – 4h30 Our ski transfers ensure a direct, smooth, and efficient journey, so you can arrive refreshed and ready to hit the slopes." },
    { question: "How far is Zell am See from Salzburg Airport?", reponse: "The transfer from Salzburg Airport to Zell am See takes approximately 1 hour and 30 minutes by road." },
    { question: "Do you offer private and shared transfers?", reponse: "Yes! We provide both private transfers for maximum comfort and shared ski transfers for a more budget-friendly option." },
    { question: "Can I bring ski equipment on the transfer?", reponse: "Absolutely! All of our vehicles are equipped to transport ski gear at no extra charge." },
    { question: "What happens if my flight is delayed?", reponse: "We track all flights in real-time and adjust your pickup time accordingly, so your transfer remains stress-free." },
  ],
};
