import type { Resort } from "./types";

/**
 * Zermatt — rédigée à la main ; trois pages de trajet attendaient cette page mère.
 *
 * Point de service décisif : la station est **interdite aux voitures**. Le
 * transfert s'arrête à Täsch, 5 km avant, d'où le train navette monte toutes les
 * vingt minutes. Le dire clairement vaut mieux qu'un client qui l'apprend à
 * l'arrivée.
 */
export const zermatt: Resort = {
  slug: "zermatt",
  name: "Zermatt",
  country: "CH",
  status: "migre",

  metaTitre: "Zermatt Ski Transfers | Airport to Täsch and Zermatt",
  metaDescription:
    "Private transfers to Zermatt via Täsch from Geneva, Zurich, Milan and Sion. Car-free resort: we drive to Täsch, the shuttle train takes 12 minutes.",
  h1: "Zermatt Ski Transfers – Private Airport Transfers to Täsch and Zermatt",
  chapo:
    "Zermatt is car-free, so every road transfer ends at Täsch, 5 km down the valley, where the shuttle train runs to the resort in 12 minutes. Geneva is 237 km from Täsch, about 3 hours 10 minutes; Zurich 250 km and around 3 h 20; Milan Malpensa 195 km and 3 h 05 through the Simplon; Sion, in the Rhône valley below, only 82 km and 1 h 20. We drive to the Täsch terminal, help you onto the train with your luggage and skis, and can arrange a resort electro-taxi at the other end. The price is fixed per vehicle and quoted before you book, ski bags included, and your driver tracks your flight.",

  airports: ["geneva-airport", "zurich-airport", "milan-malpensa-airport", "bergamo-airport"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Zermatt sits at 1,608 m at the head of the Mattertal, under the one mountain everybody recognises. It has banned combustion cars since the 1960s: the village runs on small electric vehicles and horse-drawn sleighs, and everyone — visitor, resident, hotelier — arrives the same way, by train from Täsch.",
    },
    {
      type: "paragraphe",
      texte:
        "That single fact shapes the whole journey, and it is the part most transfer sites gloss over. Your driver takes you to the Täsch Matterhorn Terminal, a covered station with trolleys and a car park; the shuttle leaves every twenty minutes through the day and takes twelve minutes to Zermatt station, in the middle of the village. Most hotels send an electro-taxi to meet it if you tell them your arrival time.",
    },

    { type: "titre2", texte: "Which airport for Zermatt?" },
    { type: "titre3", texte: "Geneva (GVA) — 237 km to Täsch, about 3 h 10" },
    {
      type: "paragraphe",
      texte:
        "The most used route: motorway along Lake Geneva and up the Rhône valley to Visp, then 30 km up the Mattertal. Flights all week from most European cities.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — about 250 km, 3 h 20" },
    {
      type: "paragraphe",
      texte:
        "Switzerland’s main hub, with long-haul connections. The road runs through Bern and over to the Rhône valley; the drive is marginally longer than from Geneva but the flight choice is wider.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) — 195 km, about 3 h 05" },
    {
      type: "paragraphe",
      texte:
        "The shortest of the three international routes, through the Simplon pass or the Simplon rail tunnel depending on conditions. Often the cheapest flights, and a genuinely scenic drive.",
    },
    { type: "titre3", texte: "Sion (SIR) — 82 km, about 1 h 20" },
    {
      type: "paragraphe",
      texte:
        "The valley airport, an hour and twenty from Täsch, but with almost no scheduled service — relevant for private aviation only.",
    },

    { type: "titre2", texte: "How the last five kilometres work" },
    {
      type: "liste",
      items: [
        "Your driver drops you at the Täsch Matterhorn Terminal, under cover, with luggage trolleys at the platform.",
        "The shuttle train runs about every twenty minutes and takes 12 minutes to Zermatt.",
        "Tickets are bought at the terminal; skis and luggage travel with you at no extra cost.",
        "At Zermatt station, electro-taxis wait for the arrivals — most hotels send one if you give them your train time.",
        "Coming home, allow a train and a margin: your driver waits at Täsch, and we set the departure so you are not running for the flight.",
      ],
    },

    { type: "titre2", texte: "Zermatt at a glance" },
    {
      type: "liste",
      items: [
        "Village at 1,608 m, skiing to 3,883 m at the Matterhorn Glacier Paradise — the highest lift-served point in Europe.",
        "Around 360 km of piste, linked over the border with Cervinia and Valtournenche on the Italian side.",
        "Summer glacier skiing above 3,000 m, and one of the longest seasons in the Alps.",
        "Car-free since the 1960s: electric vehicles, sleighs, and the shuttle train from Täsch.",
        "Cervinia is a lift ride away, not a drive: crossing on skis takes a morning, crossing by road takes four hours.",
      ],
    },

    { type: "titre2", texte: "Winter on the Mattertal road" },
    {
      type: "paragraphe",
      texte:
        "The valley road from Visp to Täsch is a main Swiss road, cleared and gritted through the season, and the Swiss authorities close it briefly for avalanche control after heavy snowfall rather than letting traffic through. When that happens, the train from Visp keeps running — one of the reasons this route is more robust than it looks. Our vehicles carry winter tyres and chains.",
    },

    { type: "titre2", texte: "Skis, luggage, children — and when to book" },
    {
      type: "paragraphe",
      texte:
        "Ski and board bags travel free, and the vehicle is sized to the equipment you declare. Child and booster seats are included and fitted before departure. On a three-hour transfer ending in a train, book early: Zermatt fills from Christmas through to the spring glacier season, and the vehicles that make this run are not the ones doing four French rotations a day.",
    },
  ],

  faq: [
    {
      question: "Can you drive us all the way into Zermatt?",
      reponse:
        "No — nobody can. Zermatt has been car-free since the 1960s. Every road transfer ends at the Täsch Matterhorn Terminal, 5 km down the valley, and the shuttle train covers the last stretch in 12 minutes, about every twenty minutes.",
    },
    {
      question: "How long is the transfer from Geneva to Zermatt?",
      reponse:
        "About 3 hours 10 minutes by road to Täsch for 237 km, plus the 12-minute shuttle train. Allow extra on a Saturday in high season.",
    },
    {
      question: "Which airport is best for Zermatt?",
      reponse:
        "Geneva for the widest European choice (3 h 10), Zurich for long-haul (about 3 h 20), Milan Malpensa for the shortest drive and often the cheapest fare (3 h 05, through the Simplon).",
    },
    {
      question: "What happens with our luggage and skis at Täsch?",
      reponse:
        "The terminal is covered and has luggage trolleys on the platform. Your driver helps you unload and get to the platform; skis and bags travel with you on the train at no extra cost.",
    },
    {
      question: "How do we get from Zermatt station to our hotel?",
      reponse:
        "By electro-taxi or hotel shuttle — they wait for the trains. Tell your hotel which train you are on and they will usually meet it.",
    },
    {
      question: "What if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. Waiting time is included, and the shuttle train runs late into the evening.",
    },
  ],
};
