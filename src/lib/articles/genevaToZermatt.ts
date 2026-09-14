import type { Article } from "./types";

/**
 * Comment aller à Zermatt depuis Genève — requête cible « how to get to zermatt
 * from geneva » (relevé SERP du 14 septembre 2026 : guides éditoriaux, aucun
 * transporteur classé). Sujet R2 de `docs/concurrence/analyse-blogs-concurrents-2026-09-14.md`.
 *
 * Durées de route : `src/data/distances.ts`, entrée **`tasch`** — c'est là que la
 * route s'arrête. Les pages de trajet affichent l'entrée `zermatt` (237 km, 3 h 07
 * depuis Genève) ; l'article cite les deux et explique l'écart.
 * Le train est décrit en termes généraux : aucun horaire, aucun tarif.
 */
export const genevaToZermatt: Article = {
  slug: "how-to-get-to-zermatt-from-geneva",
  titre: "How to get to Zermatt from Geneva: train, Täsch or private transfer",
  metaTitre: "How to Get to Zermatt from Geneva: Train or Transfer",
  metaDescription:
    "Zermatt is car-free: every road ends at Täsch. Drive times from Geneva, Zurich and Bergamo, the shuttle train, and when the train beats a private transfer.",
  chapo:
    "Zermatt has no road access for visitors, so the question is not only which transport to take from Geneva, but where you change from one to the next. Here is how the three options really work — the train all the way, a private transfer to Täsch and the shuttle train, or a mix — with road times measured on the network and an honest view of when each one is the better trip.",
  visuel: { nom: "blog-geneva-to-zermatt", alt: "Mountain shuttle train waiting at a covered platform with ski bags on luggage trolleys" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Zermatt has been car-free since the 1960s: every road transfer ends at the Täsch Matterhorn Terminal, 5 km down the valley.",
    "The shuttle train from Täsch to Zermatt runs about every twenty minutes and takes 12 minutes; skis and luggage travel at no extra charge.",
    "Geneva Airport to Täsch is 232 km and about 3 h 00 by road without traffic; from Zurich it is 246 km and about 4 h 10, from Bergamo 273 km and 3 h 46.",
    "There is no direct train from Geneva to Zermatt: the rail journey changes onto the mountain railway in the Rhône valley.",
    "Allow roughly three and a quarter to three and a half hours from Geneva arrivals to Zermatt station by transfer and shuttle train, more on a Saturday in high season.",
  ],

  stationsLiees: ["zermatt", "tasch"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "zermatt" },
    { airport: "zurich-airport", resort: "zermatt" },
    { airport: "bergamo-airport", resort: "zermatt" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "You cannot drive into Zermatt: the village has banned combustion cars since the 1960s, and every road journey ends at Täsch, 5 km down the valley, where a shuttle train covers the last stretch in 12 minutes, about every twenty minutes. From Geneva that leaves two real options. The first is the train the whole way, changing onto the mountain railway in the Rhône valley — good value and relaxed if you travel light, harder with ski bags, children or a late landing. The second is a private transfer from the arrivals hall to the Täsch terminal, 232 km and about 3 h 00 without traffic, then the shuttle train. Door to door, that is roughly three and a quarter to three and a half hours to Zermatt station. Geneva is the quickest of the airports with a transfer page for Zermatt: Zurich is 1 h 10 longer by road, Bergamo 46 minutes longer.",
    },

    { type: "titre2", texte: "Can you drive to Zermatt? No — the road stops at Täsch" },
    {
      type: "paragraphe",
      texte:
        "Zermatt sits at 1,608 m at the head of the Mattertal, under the Matterhorn, and it has kept its ban on combustion vehicles since the 1960s. Inside the village, people move on foot, in small electric taxis and in horse-drawn sleighs. Everyone arrives the same way — visitors, residents and hoteliers alike — by train.",
    },
    {
      type: "paragraphe",
      texte:
        "For road traffic, the end of the line is the Täsch Matterhorn Terminal, a covered station with a large car park, luggage trolleys on the platform and tickets sold on the spot. That applies to hire cars and private cars as much as to transfers. The shuttle train leaves about every twenty minutes through the day and reaches Zermatt station, in the middle of the village, in 12 minutes.",
    },
    {
      type: "paragraphe",
      texte:
        "None of this is a problem when you know about it in advance. It becomes one when you discover it at eleven at night, in February, with four suitcases and three ski bags. The rest of this guide is about planning that last change so that it is the easy part of the journey.",
    },

    { type: "titre2", texte: "The three ways from Geneva to Zermatt" },
    {
      type: "liste",
      items: [
        "Train all the way: from Geneva Airport’s own railway station along Lake Geneva and up the Rhône valley, then a change onto the mountain railway that climbs the Mattertal to Zermatt.",
        "Private transfer to Täsch, then the shuttle train: a vehicle from the arrivals hall to the terminal, 232 km and about 3 h 00 without traffic, then 12 minutes by train.",
        "Hire car to Täsch, then the shuttle train: the same road, the same terminal, with the car parked at Täsch for the week.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "All three end on a train, and all three end at Zermatt station. What separates them is what happens between the aircraft door and the platform: how many times you handle your luggage, whether you depend on a timetable, and who deals with the mountain road in winter.",
    },

    { type: "titre2", texte: "By private transfer: Geneva to Täsch, then the shuttle train" },
    {
      type: "paragraphe",
      texte:
        "The road route is simple. From Geneva Airport the motorway runs along Lake Geneva and up the Rhône valley to Visp. There the road turns south into the Mattertal and climbs about 30 km to Täsch. The motorway part is fast and predictable; the valley road at the end is where the time goes, and it does not get faster whatever the traffic below.",
    },
    {
      type: "paragraphe",
      texte:
        "Without traffic, the drive from Geneva Airport to the Täsch terminal is 232 km and about 3 h 00. You will see a slightly higher figure on the route page — 237 km and 3 h 07 — because that is measured to Zermatt itself; the last five kilometres are the train’s, not the road’s.",
    },
    {
      type: "paragraphe",
      texte:
        "Your driver meets you in the arrivals hall, loads the luggage once, and takes you to the terminal. On a Täsch arrival, getting you and your bags to the platform is part of the job: the drop-off is timed against a departure rather than leaving you in a cold car park. From there, the shuttle train takes 12 minutes, and skis and luggage travel with you at no extra charge.",
    },
    {
      type: "paragraphe",
      texte:
        "Add it up and the door-to-door time from Geneva arrivals to Zermatt station is roughly three and a quarter to three and a half hours on a clear day: three hours of road, a few minutes on the platform, twelve minutes of train. At Zermatt station, electric taxis wait for the arrivals, and most hotels will send one to meet the train if you give them its time.",
    },

    { type: "titre2", texte: "By train from Geneva: how it works, and when it is the better choice" },
    {
      type: "paragraphe",
      texte:
        "Swiss railways have a reputation for running on time, and Zermatt is built around them. There is no direct train from Geneva to Zermatt, but the journey is straightforward: Geneva Airport has its own station, main-line trains run along the lake and up the Rhône valley, and at the valley junction you change onto the narrow-gauge mountain railway that climbs the Mattertal, calling at Täsch and ending in the centre of Zermatt.",
    },
    {
      type: "paragraphe",
      texte:
        "For the right traveller, it is an excellent option. If you are one or two people with a suitcase each, landing in the middle of the day, the train is relaxed, scenic and usually the cheaper way to travel. You can read, the views up the Rhône valley are good, and there is no mountain road to think about.",
    },
    {
      type: "paragraphe",
      texte:
        "The train becomes harder work as the luggage grows. Every change means moving everything you brought from one platform to another, and a ski holiday rarely travels light: a suitcase, a ski bag and a boot bag per person is normal. With children, that becomes several trips along a platform with a connection to make. The train also has a last departure. A delayed flight that lands late in the evening can turn a planned rail journey into a night near the airport.",
    },
    {
      type: "paragraphe",
      texte:
        "Check the current timetable and fares with the Swiss railways before you decide: they change with the season, and they are the part of this comparison that only the operator can give you accurately.",
    },

    { type: "titre2", texte: "Train or transfer? An honest comparison" },
    {
      type: "paragraphe",
      texte:
        "There is no single right answer, and anyone who tells you there is has something to sell. The question is what you are carrying, who you are travelling with and when you land.",
    },
    {
      type: "liste",
      items: [
        "One or two people, light luggage, a daytime landing: take the train. It is the simplest option and usually the cheapest.",
        "A family with ski bags and children: a private transfer to Täsch. The luggage is loaded once at the airport and unloaded once at the terminal, and child seats are fitted before your driver leaves for the airport.",
        "A group of five to eight: a private transfer. It is priced per vehicle, not per seat, so the price does not change with the number of passengers.",
        "A late-evening landing or a flight at risk of delay: a private transfer. Your flight is tracked, and a late landing moves the pick-up with it at no extra cost — the only timetable left is the shuttle train, which runs into the evening.",
        "A tight connection on the way home: a private transfer from Täsch, with a train’s margin built in, because a missed connection on the mountain is a missed flight in the valley.",
        "Travelling in summer, or midweek with a small bag: the train, without hesitation.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "A hire car is the weakest of the three for Zermatt. You drive three hours on winter roads, park at Täsch for the week and pay for it, and take the shuttle train anyway. Unless the car is needed for another part of the trip, it adds cost and responsibility without saving time.",
    },

    { type: "titre2", texte: "Geneva, Zurich or Bergamo: which airport for Zermatt?" },
    {
      type: "paragraphe",
      texte:
        "Three airports have a transfer page for Zermatt, and two more are worth knowing about. All drive times below are to the Täsch terminal, without traffic.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 232 km, about 3 h 00" },
    {
      type: "paragraphe",
      texte:
        "The shortest road from a major airport with flights every day of the week from most European cities. The route is motorway along the lake and up the Rhône valley, then the Mattertal. For most travellers from the UK and western Europe, this is the answer.",
    },
    { type: "titre3", texte: "Zurich (ZRH) — 246 km, about 4 h 10" },
    {
      type: "paragraphe",
      texte:
        "Only 14 km further than Geneva, and 1 h 10 longer. The distance is misleading because the direct line from Zurich crosses the Bernese Alps, where the road stops and cars ride a train through the Lötschberg tunnel before reaching the Rhône valley. Zurich is the right airport when the flight is the constraint — a long-haul arrival, or a direct flight that Geneva does not have.",
    },
    { type: "titre3", texte: "Bergamo (BGY) — 273 km, about 3 h 46" },
    {
      type: "paragraphe",
      texte:
        "Northern Italy’s low-cost airport, 46 minutes further than Geneva by road. The route crosses the border into Switzerland; there is nothing for you to arrange, and tolls and motorway fees are included in the price. Worth comparing when the fare difference is large.",
    },
    { type: "titre3", texte: "Milan Malpensa (MXP) and Sion (SIR)" },
    {
      type: "paragraphe",
      texte:
        "Malpensa is 190 km and about 2 h 59 from Täsch, through the Simplon — a similar drive to Geneva. The pass can close for a few hours after heavy snowfall, when the rail shuttle through the tunnel takes over. Sion, in the Rhône valley, is 77 km and about 1 h 10 from Täsch, but carries almost no scheduled flights: in practice it is an airport for private aviation.",
    },

    { type: "titre2", texte: "The Täsch terminal and the last five kilometres" },
    {
      type: "liste",
      items: [
        "The terminal is covered, with luggage trolleys on the platform and a large car park alongside.",
        "Tickets for the shuttle train are bought at the terminal; skis and luggage travel with you at no extra charge.",
        "Trains run about every twenty minutes and take 12 minutes to Zermatt station, in the centre of the village.",
        "At Zermatt, electric taxis wait for the trains, and most hotels will meet a train you have named.",
        "Trains run into the evening; if you are on a late flight, check the last departure before you travel.",
        "Give your transfer company the name of your hotel, not just “Zermatt”: it helps time the drop-off against the right train.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The Mattertal railway is also the fallback if the road has a problem. It runs from Visp in weather that closes roads, and it is the reason the Zermatt route is more robust than it looks on a map.",
    },

    { type: "titre2", texte: "Winter on the Mattertal road, and flying home" },
    {
      type: "paragraphe",
      texte:
        "The valley road from Visp to Täsch is a main Swiss road, cleared and gritted through the season. After heavy snowfall the authorities close it briefly for avalanche control rather than letting traffic through; when that happens, the train from Visp keeps running. Switzerland does not fix a calendar date for winter tyres — the rule is the state of the road — and every vehicle carries winter tyres and snow chains all season.",
    },
    {
      type: "paragraphe",
      texte:
        "Saturday is the other variable. It is changeover day across the Alps, and in February it can add up to an hour to a transfer of this length. A Sunday or midweek arrival avoids it in both directions.",
    },
    {
      type: "paragraphe",
      texte:
        "Coming home, reverse the plan and add margin. Take the shuttle train down to Täsch one departure earlier than the timetable suggests: your driver waits at the terminal, but the flight does not. The pick-up time is set from your flight, allowing for the day you actually travel rather than a clear Tuesday.",
    },

    { type: "titre2", texte: "Vehicles, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle, tolls and motorway fees included, and the vehicle is yours from the arrivals hall to the terminal. There are three categories: the Standard, a Volkswagen Transporter for up to 8 passengers; the Business, a Mercedes V-Class for up to 7; and the Premium, a Mercedes E-Class saloon for up to 4. Above eight passengers, the party travels in several vehicles planned to arrive together.",
    },
    {
      type: "paragraphe",
      texte:
        "Skis, snowboards and boot bags travel at no extra charge. In winter the boot fills before the seats do, so tell us how many ski carriers you have when you book, and the ages of any children so the right seats are fitted. Book as soon as the flights are confirmed: Zermatt fills from Christmas to the spring, and a three-hour transfer ending in a train is not one to arrange at the last minute.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Zermatt is car-free: the road ends at Täsch, and a 12-minute shuttle train runs about every twenty minutes.",
        "Geneva to Täsch by road: 232 km, about 3 h 00. Door to door to Zermatt station: roughly 3 h 15 to 3 h 30.",
        "Zurich is 1 h 10 longer by road, Bergamo 46 minutes longer; Malpensa is similar to Geneva through the Simplon.",
        "Train all the way: best for light luggage and daytime landings. Private transfer to Täsch: best for ski bags, children, groups and late flights.",
        "Coming home, take the shuttle train one departure early.",
      ],
    },
  ],

  faq: [
    {
      question: "Can you drive to Zermatt?",
      reponse:
        "No. Zermatt has been car-free since the 1960s. Every road journey, including private transfers and hire cars, ends at the Täsch Matterhorn Terminal, 5 km down the valley, where the shuttle train takes 12 minutes to the village.",
    },
    {
      question: "How long does it take to get from Geneva to Zermatt?",
      reponse:
        "By road to Täsch, 232 km and about 3 h 00 without traffic, then the 12-minute shuttle train: roughly three and a quarter to three and a half hours from Geneva arrivals to Zermatt station. Allow up to an hour more on a Saturday in February.",
    },
    {
      question: "Is there a direct train from Geneva to Zermatt?",
      reponse:
        "No. Trains from Geneva Airport run along Lake Geneva and up the Rhône valley, where you change onto the mountain railway to Zermatt. Check timetables and fares with the Swiss railways, as they change with the season.",
    },
    {
      question: "Is the train or a private transfer better for Zermatt?",
      reponse:
        "The train suits one or two people with light luggage and a daytime landing. A private transfer to Täsch suits families with ski bags, groups of up to eight and late or delayed flights, because the luggage is handled once and the pick-up follows your flight.",
    },
    {
      question: "Is Zurich or Geneva better for Zermatt?",
      reponse:
        "Geneva, on driving time: 232 km and about 3 h 00 to Täsch, against 246 km and about 4 h 10 from Zurich. Zurich makes sense when it saves a connection or offers a long-haul flight that Geneva does not.",
    },
  ],
};
