import type { Article } from "./types";

/**
 * Transfert privé, train ou voiture de location — article de comparaison.
 *
 * Aucun horaire, aucun tarif de train ni de location : ils changent chaque
 * saison et ne sont pas vérifiables depuis le dépôt. L'article s'en tient à ce
 * qui l'est — les gares de vallée existent, la dernière montée se fait sur route,
 * l'équipement hiver est obligatoire en Savoie et Haute-Savoie du 1er novembre au
 * 31 mars (repris des pages de station).
 *
 * Durées et distances : `src/data/distances.ts`. Montée depuis Moûtiers :
 * `lib/resorts/val-thorens.ts` et `les-menuires.ts`. Täsch et Avoriaz :
 * `articles/stations-sans-voitures.ts`.
 */
export const transferTrainOrRentalCarAlps: Article = {
  slug: "private-transfer-train-or-rental-car-to-the-alps",
  titre: "Private transfer, train or rental car: the best way to reach the Alps",
  metaTitre: "Transfer, Train or Rental Car to the Alps: How to Choose",
  metaDescription:
    "Door-to-door time, skis and luggage, winter tyres, resort parking and group costs: an honest comparison of transfer, train and hire car to the Alps.",
  chapo:
    "Once you have landed, or once you have decided not to fly, there are three realistic ways to cover the last hundred kilometres to a ski resort: a private transfer, the train, or a hire car. Each is the right answer for some trips. The difference lies less in the headline price than in what happens between the arrivals hall and your front door — the changes, the climb, the chains, the car park — and that is what this comparison sets out.",
  visuel: { nom: "blog-transfer-train-or-rental-car", alt: "Alpine valley with a mountain road and a regional train crossing the valley floor" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "No mainline train climbs to the high Tarentaise resorts: Moûtiers is the closest station to Val Thorens, 37 km of hairpins below the resort, so a train arrival still ends with a road transfer.",
    "Winter tyres or snow chains are legally required in Savoie and Haute-Savoie from 1 November to 31 March, and a hire car is not always supplied with them.",
    "Some resorts cannot be driven into at all: road access to Zermatt ends at Täsch, and the road to Avoriaz ends at a car park below the village.",
    "A private transfer is priced per vehicle, so up to eight passengers share one price, whereas train tickets are paid per person and a large group may need more than one hire car.",
    "On clear roads, Chambéry airport to Val Thorens is 122 km and about 1 h 40, and Geneva airport to Chamonix 91 km and about 1 h 25 — the road time a transfer, and a hire car, starts from.",
  ],

  stationsLiees: ["val-thorens", "les-menuires", "les-arcs", "la-plagne", "chamonix", "zermatt", "tasch", "avoriaz"],

  trajetsLies: [
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "les-arcs" },
    { airport: "lyon-airport", resort: "la-plagne" },
    { airport: "geneva-airport", resort: "zermatt" },
    { airport: "geneva-airport", resort: "avoriaz" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "For most ski trips with luggage, children or a group, a private transfer is the quickest and least tiring way from the airport to your door, because it removes the changes that the train imposes and the winter driving, equipment and parking that a hire car brings. The train makes sense when you are travelling light, when you live near a direct service to a valley station, or when your resort sits close to a station — but it rarely reaches the resort itself, so you still need a bus, a taxi or a transfer for the last climb. A hire car makes sense when you want to move between resorts during your stay, and when you are comfortable driving mountain hairpins in snow, fitting chains and finding parking in a resort that may not want your car. Compare door-to-door time and total cost for your whole party, not the price of a single ticket or a day's rental.",
    },

    { type: "titre2", texte: "Door-to-door time: what each option really takes" },
    {
      type: "paragraphe",
      texte:
        "The honest way to compare the three is to count from the moment you collect your bags to the moment you open the door of your accommodation. Road distance is only one part of that.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer is the simplest sum: the road time, plus whatever the day adds. On clear roads, Geneva airport to Chamonix is 91 km and about 1 h 25, Chambéry to Val Thorens 122 km and about 1 h 40, Geneva to Les Arcs 161 km and about 2 h 47. Your driver is waiting in the arrivals hall, the flight is tracked, and there is no queue and no change of vehicle between the terminal and your address.",
    },
    {
      type: "paragraphe",
      texte:
        "A hire car starts from the same road time and adds everything around it: the queue at the rental desk on a busy Saturday, the walk to the car park, loading skis into a car chosen for its price rather than its boot, finding the accommodation in the dark, and any stop to fit chains on the climb. None of those is long on its own. Together they are regularly the difference between arriving for dinner and arriving after it.",
    },
    {
      type: "paragraphe",
      texte:
        "The train adds connections. From an airport, you typically travel into a city station, change to a service towards the valley, then take a bus, taxi or transfer up to the resort. Each change carries a wait and a luggage handover, and the timetable of the last leg decides whether a delayed flight costs you twenty minutes or an evening.",
    },
    {
      type: "paragraphe",
      texte:
        "All three are slowed by the same thing: Saturday. On a February changeover day the Tarentaise slows between Albertville and Moûtiers and the A40 towards Chamonix is heavy, and the resort pages advise allowing up to an hour more on those mornings. Trains are fuller, rental desks are busier, and roads are slower for everyone.",
    },

    { type: "titre2", texte: "Taking the train to a ski resort" },
    {
      type: "paragraphe",
      texte:
        "Rail in the Alps is good, and for some resorts it is part of the landscape. It is worth understanding where it stops, because very few ski resorts have a station of their own at altitude.",
    },
    {
      type: "liste",
      items: [
        "Tarentaise: the line up the valley serves Albertville, Moûtiers, Aime and Bourg-Saint-Maurice. Moûtiers is the station for the Three Valleys; Bourg-Saint-Maurice is the one for Les Arcs, Tignes and Val d'Isère. From both, the resorts are a road climb away — Val Thorens is 37 km of hairpins above Moûtiers.",
        "Chamonix valley: mainline trains stop at Saint-Gervais-Le Fayet, where a regional line continues up the valley to Chamonix.",
        "Zermatt: the Swiss rail network reaches Zermatt itself, and road travellers change to the shuttle train at Täsch.",
        "Upper Susa valley: Oulx is the nearest station to Sauze d'Oulx, a short drive below the resort.",
        "Airports: Geneva and Lyon Saint-Exupéry both have railway stations, so a train journey can start at the terminal — usually with at least one change before the valley.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "What that means in practice is that a train arrival is often a train plus a transfer. Once you reach the valley station, the options for the climb are a local bus, a taxi or a pre-booked transfer. Buses run to a timetable and to central stops; taxis at a small station on a winter Saturday are finite. If you are arriving by rail, we collect from railway stations as well as airports: give us your train when you enquire and we quote the road leg from the station to your accommodation.",
    },
    {
      type: "paragraphe",
      texte:
        "The train is at its best when you live on or near a direct service to the valley, you travel light, and your arrival does not depend on a flight that may be late. It is at its weakest with children, several ski bags and a change of station in a city.",
    },

    { type: "titre2", texte: "Hiring a car: what the daily rate leaves out" },
    {
      type: "paragraphe",
      texte:
        "A hire car looks like the flexible option, and for some trips it genuinely is: if you plan to ski a different resort every day, or to combine skiing with a tour of the region, nothing else gives the same freedom. For a week in one resort, it helps to list what the rental quote does not show.",
    },
    {
      type: "liste",
      items: [
        "Winter equipment: in Savoie and Haute-Savoie, winter tyres or chains are legally required from 1 November to 31 March, and Italy applies a similar rule on Alpine roads from mid-November to mid-April. Ask whether the car comes with winter tyres or chains, and whether they are included or charged as an option.",
        "Ski carriage: a compact hire car will not take four people with skis, boots and suitcases. A roof box or a larger category changes the price.",
        "Cross-border driving: Geneva airport is in Switzerland and many of the resorts it serves are in France. Swiss motorways require a vignette, and hire companies set their own rules for taking a car across a border or returning it elsewhere.",
        "Fuel and tolls: French motorways are tolled, and the mountain climbs use more fuel than the distance suggests.",
        "Parking: at the resort, and sometimes at the airport on the way back while you return the car.",
        "The car's week: in most resorts you will not use it between arrival and departure, and it may spend the week under snow.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "None of these rules the hire car out. They simply belong in the comparison, alongside the fact that the driver in your party is working for the whole journey rather than looking at the mountains.",
    },

    { type: "titre2", texte: "Winter driving on mountain roads" },
    {
      type: "paragraphe",
      texte:
        "The motorway section of an Alpine journey is ordinary driving. The last part is not. Val Thorens is reached by 37 km of hairpins from Moûtiers, climbing from 480 m in the valley to 2,300 m. Flaine is 20 km of hairpins above Cluses. These roads are cleared and gritted through the season, but they are mountain roads, they get snow, and they are driven by every coach, hire car and delivery lorry heading for the same resort on the same morning.",
    },
    {
      type: "paragraphe",
      texte:
        "Three situations catch out drivers who are new to them. The first is a chain control, when the authorities require chains on a section of road and you have to fit them at the roadside, in the cold, in a queue. The second is arriving after dark: in midwinter it is dark by late afternoon, and a hairpin road in falling snow is a different drive at night. The third is fatigue — a driver who got up before dawn for an early flight is starting the hardest part of the day's driving at its end.",
    },
    {
      type: "paragraphe",
      texte:
        "A transfer driver runs these roads all winter, in a vehicle that carries winter tyres and snow chains all season. That is not a guarantee against snow, which slows every vehicle on the road, but it takes the decision and the chains out of your hands.",
    },

    { type: "titre2", texte: "Parking in a ski resort" },
    {
      type: "paragraphe",
      texte:
        "Parking is the part of the hire-car plan most often discovered on arrival. Resorts are built for skiers on foot, and cars are something they manage rather than welcome.",
    },
    {
      type: "liste",
      items: [
        "Car-free resorts: road access to Zermatt ends at the Täsch terminal, 5 km down the valley, where cars stay for the week. The road to Avoriaz ends at a car park below the village.",
        "Paid car parks: in many resorts, parking near the centre or the lifts is paid, and covered spaces often need booking in advance.",
        "Accommodation: an apartment or chalet may have one space or none. Check before you arrive with two cars.",
        "Snow: an outdoor space means clearing the car, and sometimes digging it out, before you can leave.",
        "Departure day: returning the car at the airport adds a margin to a journey that already needs one on a Saturday.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "A transfer ends at your door and has nowhere to park for the week, which is rather the point. For car-free resorts it ends where the road does — our Zermatt transfers stop at Täsch, and the shuttle train covers the last twelve minutes.",
    },

    { type: "titre2", texte: "Skis, boots and luggage" },
    {
      type: "paragraphe",
      texte:
        "Ski equipment decides the comparison more often than price does. A ski holiday means at least one large bag per person, plus skis or a board, plus boots — and children's kit on top.",
    },
    {
      type: "paragraphe",
      texte:
        "On a train, all of that is carried by hand: along the platform, up into the carriage, into the luggage racks if there is room, and off again at every change. It is manageable for two adults with light bags. It is hard work for a family, and harder still when a connection is short.",
    },
    {
      type: "paragraphe",
      texte:
        "In a hire car, the constraint is the boot. The car category that fits four people rarely fits four people's skis, and a roof box needs fitting and costs extra.",
    },
    {
      type: "paragraphe",
      texte:
        "In a private transfer, you declare your luggage when you book and the vehicle is chosen for it. Skis, snowboards and boot bags are carried at no extra charge, and the driver loads them at the airport and unloads them at your address.",
    },

    { type: "titre2", texte: "Families and groups: how the cost adds up" },
    {
      type: "paragraphe",
      texte:
        "The three options are priced on three different units, which is why a quick comparison so often misleads.",
    },
    {
      type: "liste",
      items: [
        "Train: per person, each way. The total grows with every traveller, and the road leg from the valley station is extra.",
        "Hire car: per car, plus fuel, tolls, winter equipment, ski carriage and parking. Above five people with luggage, it often means two cars and two drivers.",
        "Private transfer: per vehicle, tolls included. Our Standard Volkswagen Transporter takes up to eight passengers and the price does not change with the number on board; above eight, the party travels in several vehicles, quoted as one journey.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For a solo traveller with a rail pass and one bag, the train is hard to beat on cost. For a family of five with skis, the per-vehicle price of a transfer, set against five train tickets plus a taxi, or a large hire car plus its extras, is often closer than expected — and the journey is simpler. Do the sum for your own party, both ways, with everything included.",
    },

    { type: "titre2", texte: "Mixing the options" },
    {
      type: "paragraphe",
      texte:
        "The three are not exclusive. Some combinations work well and are worth considering:",
    },
    {
      type: "liste",
      items: [
        "Train to the valley, transfer up: rail to Moûtiers or Bourg-Saint-Maurice, and a pre-booked vehicle for the climb, so the luggage handover happens once.",
        "Transfer in, hire car for a day: arrive by transfer and rent a car locally for the one day you want to explore, instead of paying for a week of parking.",
        "Different routes out and back: a transfer can take you from one airport and bring you back to another, which helps when your flights do not match.",
      ],
    },

    { type: "titre2", texte: "Which option fits which trip" },
    {
      type: "liste",
      items: [
        "A family or a group with skis, staying in one resort for the week: a private transfer.",
        "A couple travelling light, living near a direct train to the valley: the train, with the last leg booked in advance.",
        "Experienced winter drivers planning to ski several resorts: a hire car, with winter tyres confirmed in writing and parking arranged.",
        "A late or early flight: a private transfer, because the flight is tracked and there is no last train or closed rental desk to worry about.",
        "A car-free resort such as Zermatt or Avoriaz: a transfer or the train, since the car stays at the bottom anyway.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever you choose, book it when you book the flight or the train. In February, vehicles, rental cars and seats on popular trains all run out before the accommodation does.",
    },
  ],

  faq: [
    {
      question: "Can you take a train directly to a ski resort in the French Alps?",
      reponse:
        "Rarely to the resort itself. Mainline trains stop in the valleys — Moûtiers for the Three Valleys, Bourg-Saint-Maurice for Les Arcs, Tignes and Val d'Isère, Saint-Gervais-Le Fayet for the Chamonix valley. From there a bus, taxi or transfer covers the climb; Val Thorens, for example, is 37 km of hairpins above Moûtiers.",
    },
    {
      question: "Do I need snow chains for a hire car in the Alps?",
      reponse:
        "In Savoie and Haute-Savoie, winter tyres or snow chains are legally required from 1 November to 31 March, and Italy has a similar rule on Alpine roads from mid-November to mid-April. Hire cars are not always supplied with them, so ask the rental company in advance and get the answer in writing.",
    },
    {
      question: "Is it cheaper to hire a car or book a ski transfer?",
      reponse:
        "It depends on the size of your party and what you add to the rental rate. A hire car also means fuel, tolls, winter equipment, ski carriage and parking, and a large group may need two cars. A private transfer is priced per vehicle with tolls included, so the more of you there are, the better it compares.",
    },
    {
      question: "Can a transfer pick us up from a railway station?",
      reponse:
        "Yes. We collect from railway stations as well as airports, including valley stations such as Moûtiers. Give us your train and your accommodation address when you enquire, and we quote the road leg from the station to your door.",
    },
    {
      question: "Can I drive to Zermatt or Avoriaz?",
      reponse:
        "Not into the village. Road access to Zermatt ends at the Täsch terminal, 5 km below the resort, where a shuttle train takes about twelve minutes. The road to Avoriaz ends at a car park below the car-free village. Both are reachable by transfer to where the road stops.",
    },
  ],
};
