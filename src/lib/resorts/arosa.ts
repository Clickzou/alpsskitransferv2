import type { Resort } from "./types";

/** Arosa — rédigée à la main ; l'arrivée se fait par la route de Chur, 30 km de lacets. */
export const arosa: Resort = {
  slug: "arosa",
  name: "Arosa",
  country: "CH",
  status: "migre",

  metaTitre: "Arosa Ski Transfers | Zurich Airport to Arosa Lenzerheide",
  metaDescription:
    "Private transfers to Arosa from Zurich (164 km, 2 h 30), Friedrichshafen and Milan. 30 km of hairpins from Chur. Fixed price per vehicle.",
  h1: "Arosa Ski Transfers – Private Airport Transfers to Arosa Lenzerheide",
  chapo:
    "Arosa sits at 1,775 m at the end of the Schanfigg valley, reached by 30 km of hairpins from Chur — a road with more than 300 bends, and the reason many visitors take the narrow-gauge railway instead. Zurich is 164 km away, about 2 hours 30 minutes; Friedrichshafen 151 km (2 h); Milan Malpensa 238 km (3 h 25) through the San Bernardino. We drive door to door, with winter tyres and chains on board and drivers who know the road, at a price fixed per vehicle and quoted before you book, ski bags included.",

  airports: ["zurich-airport", "friedrichshafen-airport", "milan-malpensa-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Arosa began as a tuberculosis sanatorium town at the end of the nineteenth century — the altitude and the dry air were the treatment — and became a ski resort when the patients stopped coming. It sits in a bowl at the head of its valley, with two small lakes frozen through the winter and a village that is almost entirely traffic-calmed.",
    },
    {
      type: "paragraphe",
      texte:
        "Since 2013 a cable car has linked it over the Urdenfürggli to Lenzerheide, making one area of 225 km of piste across two valleys — and turning a quiet, self-contained resort into one of the larger ski areas in Graubünden.",
    },

    { type: "titre2", texte: "Which airport for Arosa?" },
    { type: "titre3", texte: "Zurich (ZRH) — 164 km, about 2 h 30" },
    {
      type: "paragraphe",
      texte:
        "The main gateway, with flights all week and long-haul connections. Motorway to Chur, then the climb: about 45 minutes for the last 30 km.",
    },
    { type: "titre3", texte: "Friedrichshafen (FDH) — 151 km, about 2 hours" },
    {
      type: "paragraphe",
      texte:
        "From Lake Constance through Liechtenstein and up the Rhine valley — quicker than Zurich when the flights fit.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 238 km, about 3 h 25" },
    {
      type: "paragraphe",
      texte:
        "Through the San Bernardino from the south. Long, but sometimes much cheaper.",
    },

    { type: "titre2", texte: "The road from Chur, and the alternative" },
    {
      type: "paragraphe",
      texte:
        "The Schanfigg road climbs about 1,200 m in 30 km, on a well-engineered mountain road that is cleared and gritted daily but has a genuine reputation: it is narrow in places, exposed in others, and it is not a drive to improvise in a hire car in the dark. Our drivers do it through the season and our vehicles carry winter tyres and chains.",
    },
    {
      type: "paragraphe",
      texte:
        "The narrow-gauge railway from Chur, which climbs the same valley in an hour, is the local answer to bad weather. If the road is closed for avalanche control, that is where we will put you, with your luggage, and pick you up again at the other end.",
    },

    { type: "titre2", texte: "Arosa at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,775 m, skiing to 2,653 m at the Weisshorn.",
        "225 km of piste on the Arosa Lenzerheide pass since the two valleys were linked in 2013.",
        "A traffic-calmed village: most streets are restricted through the day in winter.",
        "The Arosa Bear Sanctuary, above the village, rehouses bears rescued from captivity — open to visitors in season.",
        "Chur, 30 km below, is the oldest town in Switzerland and the nearest railway hub.",
      ],
    },

    { type: "titre2", texte: "Winter, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. Book early: the road up the Schanfigg limits how many vehicles serve Arosa on a busy Saturday, and they go first.",
    },
  ],

  faq: [
    {
      question: "How long is the transfer from Zurich to Arosa?",
      reponse:
        "About 2 hours 30 minutes for 164 km, of which the last 30 km from Chur take some 45 minutes on a road of more than 300 bends.",
    },
    {
      question: "Is the road to Arosa safe in winter?",
      reponse:
        "It is cleared and gritted daily and used year-round, but it is narrow and exposed in places. Our vehicles carry winter tyres and chains and our drivers run it through the season. If it closes for avalanche control, the narrow-gauge railway from Chur is the alternative.",
    },
    {
      question: "Can we ski across to Lenzerheide?",
      reponse:
        "Yes — the Urdenbahn cable car has linked the two valleys since 2013, giving 225 km of piste on one pass.",
    },
    {
      question: "Are ski bags and child seats included?",
      reponse:
        "Both, at no extra charge. Declare them when booking so the right vehicle and seats are sent.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time; waiting time is included.",
    },
  ],
};
