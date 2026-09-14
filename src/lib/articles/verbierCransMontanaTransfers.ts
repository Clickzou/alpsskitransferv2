import type { Article } from "./types";

/**
 * Comment aller à Verbier depuis Genève : train ou transfert — avec Crans-Montana
 * en section. Requête cible « how to get to verbier from geneva » (sujet n° 11 de
 * `docs/concurrence/analyse-blogs-concurrents-2026-09-14.md`).
 *
 * Durées de route : `src/data/distances.ts`, et non les « environ » des pages de
 * station reprises du WordPress — la page Crans-Montana annonce Zurich à 3 h 15,
 * la table et la page de trajet disent 4 h 03. C'est la table qui fait foi.
 * Le train est décrit en termes généraux : aucun horaire, aucun tarif.
 */
export const verbierCransMontanaTransfers: Article = {
  slug: "how-to-get-to-verbier-from-geneva",
  titre: "How to get to Verbier from Geneva: train or transfer",
  metaTitre: "How to Get to Verbier from Geneva: Train or Transfer",
  metaDescription:
    "Geneva to Verbier is 163 km, about 2 h 09 by road. No direct train: how the rail route works, when a transfer is worth it, and Crans-Montana too.",
  chapo:
    "Verbier is one of the easier big resorts to reach from Geneva — one motorway, one valley, one climb — and still a journey worth planning, because the train and the road end in different places. Here is how each option works, when the train is the better trip and when a transfer is, and how the same questions apply to Crans-Montana, with road times measured on the network rather than guessed.",
  visuel: { nom: "blog-geneva-to-verbier", alt: "Hairpin road climbing to a sunny terrace of chalets with a gondola above" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Geneva Airport to Verbier is 163 km and about 2 h 09 by road without traffic: motorway along Lake Geneva and up the Rhône valley to Martigny, then the Val de Bagnes.",
    "There is no direct train from Geneva to Verbier: the rail route changes in the Rhône valley for Le Châble, where a gondola climbs to the resort.",
    "From Zurich, Verbier is 288 km and about 3 h 48 by road — 1 h 39 more than from Geneva.",
    "Crans-Montana is 183 km and about 2 h 24 from Geneva, including a 15 km climb of about 950 m from Sierre; from Zurich it is 308 km and 4 h 03.",
    "Sion airport is 52 km from Verbier and 28 km from Crans-Montana, but carries almost no scheduled flights.",
  ],

  stationsLiees: ["verbier", "crans-montana"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "verbier" },
    { airport: "zurich-airport", resort: "verbier" },
    { airport: "geneva-airport", resort: "crans-montana" },
    { airport: "zurich-airport", resort: "crans-montana" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "By road, Geneva Airport to Verbier is 163 km and about 2 h 09 without traffic: motorway along Lake Geneva and up the Rhône valley to Martigny, then the Val de Bagnes to Le Châble and the climb to the resort. There is no direct train. Rail travellers change in the Rhône valley onto the line to Le Châble, then take the gondola up to Verbier — a good option for one or two people with light luggage and a daytime flight. A private transfer goes from the arrivals hall to your chalet door in one vehicle, priced per vehicle rather than per seat, and follows your flight if it is late: with ski bags, children, a group or an evening landing, it is usually worth it. Zurich adds 1 h 39 by road. Crans-Montana works the same way — 183 km and 2 h 24 from Geneva by road, or the train to Sierre and the funicular up.",
    },

    { type: "titre2", texte: "Geneva to Verbier at a glance" },
    {
      type: "paragraphe",
      texte:
        "Verbier sits at 1,500 m on a sunny balcony above the Val de Bagnes, with skiing up to 3,330 m on Mont Fort. It is the best-known resort of the 4 Vallées, a ski area of over 400 km of runs, famous for its off-piste and freeride terrain, its chalets and its après-ski.",
    },
    {
      type: "paragraphe",
      texte:
        "Getting there is a matter of one valley. The Valais is the upper Rhône valley, a long, flat-bottomed trench running east from Lake Geneva, with motorway, railway and towns along its floor. The ski resorts sit above it, on terraces or at the head of side valleys, and each is reached by one road that leaves the valley and climbs. For Verbier, the turn is at Martigny, where the Rhône valley bends north and the road to the Great St Bernard heads south.",
    },
    {
      type: "paragraphe",
      texte:
        "Both the road and the railway follow that route as far as the Val de Bagnes. Where they differ is at the end: the road climbs all the way to the village, while the railway stops at Le Châble, in the valley bottom, and hands over to a gondola.",
    },

    { type: "titre2", texte: "By private transfer: the road via Martigny and Le Châble" },
    {
      type: "paragraphe",
      texte:
        "From Geneva Airport, the motorway runs along the lake and up the Rhône valley to Martigny. The road then turns towards the Great St Bernard, leaves it at Sembrancher for the Val de Bagnes, reaches Le Châble, and climbs the last stretch in hairpins to Verbier. Without traffic, the whole transfer is 163 km and about 2 h 09.",
    },
    {
      type: "paragraphe",
      texte:
        "Most of the kilometres are motorway, and the time on that part is predictable. The climb at the end is where the time is really spent, and it does not get faster whatever the traffic below. Your driver meets you in the arrivals hall with your name, loads the luggage once, and drops you at your chalet or hotel door — not at a station or a car park.",
    },
    {
      type: "liste",
      items: [
        "One fixed price for the whole vehicle, tolls and motorway fees included, given before you book.",
        "Flight tracking: a delayed landing moves the pick-up, at no extra cost and with nothing for you to do.",
        "Skis, snowboards and boot bags at no extra charge, in a vehicle sized to the equipment you declare.",
        "Child and booster seats fitted before your driver leaves for the airport.",
        "Winter tyres and snow chains on board all season.",
      ],
    },

    { type: "titre2", texte: "By train: Geneva to Le Châble, then the gondola" },
    {
      type: "paragraphe",
      texte:
        "Is there a direct train to Verbier? No — Verbier has no railway station. The rail route is nonetheless one of the more straightforward in the Alps. Geneva Airport has its own station; main-line trains run along Lake Geneva and up the Rhône valley to Martigny; there you change onto the regional line that runs up the Val de Bagnes to Le Châble, the end of the line. From Le Châble, the gondola lifts you and your luggage to Verbier.",
    },
    {
      type: "paragraphe",
      texte:
        "For the right traveller, it is a very good way to arrive. One or two people with a suitcase each, landing in the middle of the day, will find it relaxed and usually cheaper than a private vehicle. Swiss trains have a reputation for running on time, and the views up the Rhône valley are part of the trip.",
    },
    {
      type: "paragraphe",
      texte:
        "The difficulties are practical and grow with the luggage. There are at least two changes — train to train at Martigny, train to gondola at Le Châble — and every change means moving everything you brought. A ski holiday rarely travels light: a suitcase, a ski bag and a boot bag per person is normal, and with children that turns each change into several trips. At the top, the gondola arrives at its own station, and you still need to reach your accommodation in the village.",
    },
    {
      type: "paragraphe",
      texte:
        "The last train and the last gondola of the day are the other constraint. A flight delayed into the evening can leave you with a connection that no longer exists. Timetables and fares change with the season, and only the operators can give them accurately — check them before relying on a rail plan.",
    },

    { type: "titre2", texte: "Train or transfer? Is a transfer worth it with skis?" },
    {
      type: "paragraphe",
      texte:
        "There is no single right answer. The question is what you carry, who travels with you and when you land.",
    },
    {
      type: "liste",
      items: [
        "One or two people, light luggage, a daytime flight: the train. It is simple, scenic and usually the cheaper option.",
        "A family with ski bags and children: a private transfer. The luggage is handled once at each end, there are no connections, and the child seats are already fitted.",
        "A group of four to eight: a private transfer. It is priced per vehicle, so the price does not change with the number of passengers.",
        "More than eight: several vehicles, planned to arrive together rather than in scattered order.",
        "A late or delay-prone flight: a private transfer, which follows the actual landing time instead of the last connection.",
        "Bulky kit — touring skis, splitboards, airbag packs: a private transfer, declared at booking so the vehicle has room.",
        "A short stay with a small bag, midweek: the train, without hesitation.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Is a transfer worth it with skis? With one pair and one bag, not necessarily: the train takes skis without difficulty. With a family’s worth of equipment, the answer is usually yes, because what a transfer saves is less the time on the move than the handling of luggage at every change, and the dependence on the last departure.",
    },
    {
      type: "paragraphe",
      texte:
        "Think about the journey home as well. By train, the same changes come in reverse — gondola, Le Châble, Martigny — with a flight at the end rather than a chalet, and a missed connection in the valley becomes a missed flight. Rail travellers do well to take the departure before the one that works on paper. By transfer, the pick-up is set from the flight time, and the vehicle leaves from your door.",
    },

    { type: "titre2", texte: "Crans-Montana: the same trip, a different climb" },
    {
      type: "paragraphe",
      texte:
        "Crans-Montana is the other big Valais resort people fly into Geneva for, and it follows the same logic further up the valley. Crans and Montana are two villages that grew into one resort on a south-facing shelf at 1,500 m, about 1,000 m above the Rhône, looking across at the Matterhorn, the Weisshorn and the Dent Blanche. The skiing climbs to the Plaine Morte glacier at 3,000 m, with around 140 km of mostly sunny piste, and the resort hosts a Ladies’ World Cup downhill most seasons.",
    },
    {
      type: "paragraphe",
      texte:
        "It is also a resort with a town’s services — banks, clinics and shops open all year — which matters for families and longer stays, and it is further up the Rhône valley than Verbier, so every route to it is a little longer.",
    },
    { type: "titre3", texte: "By road: 183 km and about 2 h 24 from Geneva" },
    {
      type: "paragraphe",
      texte:
        "The transfer follows the motorway along the lake and up the Rhône valley past Martigny and Sion to Sierre, then climbs 15 km of hairpins, gaining about 950 m, to the terrace. It is a well-maintained cantonal road, cleared and gritted daily, and heavy snow slows it more often than it closes it. Crans and Montana are a couple of kilometres apart on the same terrace, so give the exact address when you book. From Zurich the transfer is 308 km and about 4 h 03.",
    },
    { type: "titre3", texte: "By train: Sierre, then the funicular" },
    {
      type: "paragraphe",
      texte:
        "There is no direct train to Crans-Montana either. Main-line trains from Geneva run up the Rhône valley to Sierre, and a funicular climbs from Sierre to Montana — the same funicular locals use when the road is at its worst. The comparison with a transfer is the same as for Verbier: easy with light luggage, harder with ski bags, children and late flights.",
    },

    { type: "titre2", texte: "Which airport for Verbier and Crans-Montana?" },
    {
      type: "paragraphe",
      texte:
        "Geneva is the answer for almost everyone. The alternatives are worth knowing for particular flights; all times are by road without traffic.",
    },
    {
      type: "liste",
      items: [
        "Geneva — Verbier 163 km, 2 h 09; Crans-Montana 183 km, 2 h 24. Flights every day of the week from most European cities.",
        "Zurich — Verbier 288 km, 3 h 48; Crans-Montana 308 km, 4 h 03. The main Swiss hub, with long-haul connections.",
        "Sion — Verbier 52 km, 48 minutes; Crans-Montana 28 km, 34 minutes. In the valley itself, but with almost no scheduled flights: an airport for private aviation.",
        "Bern — Verbier 163 km, 2 h 10; Crans-Montana 184 km, 2 h 25. Much the same as Geneva, with a thin, seasonal timetable.",
        "Milan Malpensa — Crans-Montana 206 km, 3 h 12, through the Simplon; Verbier 251 km, 3 h 30. The pass can close for a few hours after heavy snow, when the rail shuttle through the tunnel takes over.",
        "Turin — Verbier 191 km, 2 h 51, up the Aosta valley and through the Great St Bernard tunnel. An option for Verbier only.",
      ],
    },

    { type: "titre2", texte: "Geneva or Zurich for Verbier? The real difference" },
    {
      type: "paragraphe",
      texte:
        "The comparison is unusually tidy. From Zurich, both resorts are 1 h 39 further by road than from Geneva: 3 h 48 against 2 h 09 for Verbier, 4 h 03 against 2 h 24 for Crans-Montana. The extra time is identical because it is the same stretch of motorway across the country to the eastern end of Lake Geneva; after that, the routes are the same.",
    },
    {
      type: "paragraphe",
      texte:
        "So the question is not which resort you are going to but what an hour and forty minutes each way is worth against your flights. For a family on a week’s holiday, it is the difference between arriving for dinner and arriving for bed. For a traveller from outside Europe, where a direct flight into Zurich saves a connection and several hours of waiting, the longer drive is often the better trip.",
    },

    { type: "titre2", texte: "Winter driving in the Valais, Saturdays and flying home" },
    {
      type: "paragraphe",
      texte:
        "The Rhône valley motorway is flat and well kept, and the climbs to Verbier and Crans-Montana are cleared and gritted daily through the season. Fresh snow slows every vehicle on the hairpins; closures are rare. Switzerland does not set a calendar date for winter tyres — the rule is the state of the road — and every vehicle carries winter tyres and snow chains all season.",
    },
    {
      type: "paragraphe",
      texte:
        "Saturday is changeover day across the Alps and the busiest of the week on every mountain road; in February it can add up to an hour to these transfers. A Sunday or midweek arrival avoids it in both directions. On the way home, the pick-up time is set from your flight so that you reach the terminal with time in hand on the day you actually travel.",
    },

    { type: "titre2", texte: "Vehicles, luggage and booking" },
    {
      type: "paragraphe",
      texte:
        "There are three vehicle categories: the Standard, a Volkswagen Transporter for up to 8 passengers; the Business, a Mercedes V-Class for up to 7; and the Premium, a Mercedes E-Class saloon for up to 4. The category is decided by the group and the luggage, and in winter the boot fills up before the seats do, so tell us how many ski carriers you have and the ages of any children when you book.",
    },
    {
      type: "paragraphe",
      texte:
        "Book as soon as the flights are confirmed: the Valais fills for Christmas and the February half-terms, and the longer transfers from Geneva and Zurich are taken first.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Geneva to Verbier by road: 163 km, about 2 h 09, door to door. Crans-Montana: 183 km, about 2 h 24.",
        "No direct train to either: Verbier by train to Le Châble and the gondola; Crans-Montana by train to Sierre and the funicular.",
        "Train: best for light luggage and daytime flights. Private transfer: best for ski bags, families, groups and late landings.",
        "Zurich adds 1 h 39 by road to both resorts; Sion is closest but has almost no scheduled flights.",
        "Add up to an hour on a February Saturday, whichever way you travel.",
      ],
    },
  ],

  faq: [
    {
      question: "Is there a direct train to Verbier?",
      reponse:
        "No. Verbier has no railway station. From Geneva, trains run up the Rhône valley to Martigny, where you change for Le Châble; a gondola then climbs to Verbier. Check current timetables and fares with the operators before you travel.",
    },
    {
      question: "How long is Geneva to Verbier by car?",
      reponse:
        "About 2 h 09 for 163 km without traffic, from Geneva Airport to the resort: motorway to Martigny, then the Val de Bagnes and the climb from Le Châble. On a Saturday in February, allow up to an hour more.",
    },
    {
      question: "Is a transfer to Verbier worth it with skis?",
      reponse:
        "With one pair of skis and light luggage, the train works well. With a family’s ski bags, children or a late flight, a private transfer usually is worth it: the luggage is handled once, there are no connections, and the pick-up follows your flight.",
    },
    {
      question: "How long is the transfer from Geneva to Crans-Montana?",
      reponse:
        "About 2 h 24 for 183 km without traffic, including the 15 km climb from Sierre. By train, the route goes to Sierre, where a funicular climbs to Montana.",
    },
    {
      question: "Should I fly to Geneva or Zurich for Verbier?",
      reponse:
        "Geneva whenever it flies your dates: 2 h 09 by road against 3 h 48 from Zurich. Zurich can be the better trip when it saves a connection or offers a long-haul flight Geneva does not have.",
    },
  ],
};
