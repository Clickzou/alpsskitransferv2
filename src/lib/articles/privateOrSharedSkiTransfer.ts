import type { Article } from "./types";

/**
 * Private or shared ski transfer — article de comparaison.
 *
 * Point de vigilance : le site ne vend **que du privé** (décision du 9 septembre
 * 2026, voir `data/page-reservation.ts`). L'article le dit d'emblée et décrit le
 * transfert partagé de manière générale, par son fonctionnement — prix à la
 * place, remplissage sur plusieurs vols, arrêts successifs — sans chiffre ni
 * nom de concurrent.
 *
 * Durées et distances : `src/data/distances.ts`. Capacités : `CAPACITE` et
 * `CAPACITE_BAGAGES` dans `lib/reservation/devis.ts`, modèles dans
 * `data/accueil.ts`. Si ces tables changent, relire les chiffres ci-dessous.
 */
export const privateOrSharedSkiTransfer: Article = {
  slug: "private-or-shared-ski-transfer",
  titre: "Private or shared ski transfer: which one fits your trip?",
  metaTitre: "Private or Shared Ski Transfer: Which One Fits Your Trip?",
  metaDescription:
    "Airport waiting, stops at other resorts, skis, children, groups, per-seat or per-vehicle pricing: how to choose a private or a shared ski transfer.",
  chapo:
    "A shared shuttle and a private transfer both get you from the airport to the snow, and on paper the only difference is the price. In practice they are two different journeys: one fills its seats before it leaves, the other leaves when you land. Here is how each one works, what that means for waiting, stops, skis and children, and the group size at which the comparison usually turns.",
  visuel: { nom: "blog-private-or-shared-transfer", alt: "Private people carrier unloading ski bags outside a chalet at dusk" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "A private transfer is priced per vehicle: the price is the same for two passengers or eight, whereas a shared shuttle is priced per seat and multiplies with every traveller.",
    "A shared shuttle fills its seats with passengers from several flights, so its departure time depends on other people's arrivals; a private transfer follows your own flight.",
    "Shared shuttles drop passengers at several resorts or drop-off points in turn; a private transfer drives to one address, with no stops unless you ask for one.",
    "In winter the boot fills up before the seats do: a Volkswagen Transporter seats eight, but a load of suitcases and ski bags for eight people is what decides whether it is the right vehicle.",
    "For a solo traveller on a tight budget a shared seat is usually cheaper; for a family or a group of friends travelling together, the per-vehicle price often narrows or reverses the gap.",
  ],

  stationsLiees: ["chamonix", "morzine", "les-gets", "avoriaz", "val-thorens", "courchevel", "meribel"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "morzine" },
    { airport: "geneva-airport", resort: "avoriaz" },
    { airport: "geneva-airport", resort: "val-thorens" },
    { airport: "chambery-savoie-airport", resort: "courchevel" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Choose a shared transfer if you are travelling alone or as a couple, your budget matters more than your time, and you are happy to wait at the airport for other passengers and to stop at other resorts on the way. Choose a private transfer if you are a family or a group, if you carry a lot of ski equipment, if you land late or at an unusual hour, or if you want the drive time you are quoted to be the drive time you get. The underlying difference is simple: a shared shuttle sells seats and needs to fill them, so its timetable and its route are built around many travellers at once; a private transfer sells a vehicle, so both follow your flight and your address. A shared seat is priced per person, a private vehicle per vehicle — which is why the cheaper option for one traveller is often the more expensive one for five.",
    },
    {
      type: "paragraphe",
      texte:
        "A word on where we stand. Alps Ski Transfers runs private transfers only, so read what follows with that in mind. We have tried to describe honestly the trips for which a shared seat is the sensible choice, because there are plenty of them.",
    },

    { type: "titre2", texte: "What is the difference between a private and a shared ski transfer?" },
    {
      type: "paragraphe",
      texte:
        "A shared transfer, often called a shuttle, is a seat in a minibus or coach that carries passengers who do not know each other. The operator groups travellers landing within the same window of time and heading for the same area, fills the vehicle, and runs a route that serves each of their destinations in turn. Its economics depend on filling seats, and everything else follows from that.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer is a vehicle booked for you alone. It is waiting when you land, it drives from the airport to the address of your chalet, hotel or apartment, and nobody else gets in. You pay for the whole vehicle and the whole journey, whether there are two of you or eight.",
    },
    {
      type: "paragraphe",
      texte:
        "Both use the same roads, the same mountain climbs and the same Saturday traffic. What differs is who decides when the vehicle leaves, where it stops, and how the luggage space is shared.",
    },
    {
      type: "liste",
      items: [
        "Departure time: set by the group's arrivals for a shuttle, by your own flight for a private transfer.",
        "Route: several drop-offs for a shuttle, one address for a private transfer.",
        "Luggage: an allowance per seat on a shuttle, a vehicle chosen for your declared load on a private transfer.",
        "Price: per seat for a shuttle, per vehicle for a private transfer.",
        "Flexibility: fixed departure slots for a shuttle, a stop on the way on request for a private transfer.",
      ],
    },

    { type: "titre2", texte: "How long will you wait at the airport?" },
    {
      type: "paragraphe",
      texte:
        "This is the part of the journey that price comparisons leave out. A shuttle cannot leave the moment you walk into the arrivals hall, because the passengers from the next flight have not landed yet. It is built to collect several flights, so someone always waits: the first passengers wait for the last ones, and if one of those flights is late the whole vehicle waits with it, or leaves without them and puts them on a later departure.",
    },
    {
      type: "paragraphe",
      texte:
        "On a quiet midweek afternoon that wait may be short. On a winter Saturday at Geneva, when a large part of the Alps changes over on the same morning, the arrivals hall is full, flights are delayed by de-icing and weather, and a shuttle schedule has little slack. The time you save by paying less for a seat is time you may spend in the terminal.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer turns the question round. We track your flight number, so a delayed landing simply moves your pick-up time, at no extra cost and with nothing for you to do. Your driver meets you in the arrivals hall at the time you actually land, not at the time you booked, and nobody else's flight decides when you leave the airport.",
    },
    {
      type: "paragraphe",
      texte:
        "The same logic applies on the way home. A shuttle sets a departure from the resort that suits all its passengers' flights, which usually means leaving earlier than your own flight requires. A private transfer is timed to your flight alone — we set the departure so you reach the terminal with time in hand, and on a February Saturday that margin includes the changeover traffic.",
    },

    { type: "titre2", texte: "How many stops before your resort?" },
    {
      type: "paragraphe",
      texte:
        "A shuttle serves several destinations on one run, and the order in which it serves them decides how long your journey takes. If you are the last drop-off, your transfer is the sum of everyone else's.",
    },
    {
      type: "paragraphe",
      texte:
        "Take the Portes du Soleil from Geneva. On clear roads, Les Gets is 69 km and about 1 h 19 from the airport, Morzine 77 km and 1 h 29, Avoriaz 89 km and 1 h 45. They sit on the same road, so a shuttle serving all three is a natural route — but the passenger for Avoriaz rides through two resorts first, with a stop in each while bags come out of the back.",
    },
    {
      type: "paragraphe",
      texte:
        "The Three Valleys show the other case. Every road to Courchevel, Méribel and Val Thorens comes up the Tarentaise to Moûtiers, and there the three resorts split into three separate side valleys. From Chambéry, Méribel is 103 km and 1 h 21, Courchevel 110 km and 1 h 28, Val Thorens 122 km and 1 h 40. A vehicle that serves more than one of them has to climb one valley, come back down to Moûtiers and climb the next. That is not a detour an operator adds by carelessness; it is the geography.",
    },
    {
      type: "paragraphe",
      texte:
        "Then there is the drop-off itself. Within a single resort, a shuttle often uses central points rather than individual addresses, particularly where accommodation is spread over several villages or levels. A private transfer drives to the address you give when you book. Give the full address with its postcode: mountain addresses are the ones satellite navigation gets wrong most often, and a resort like Saint-Gervais or Les Arcs covers several distinct arrivals.",
    },

    { type: "titre2", texte: "Luggage, skis and equipment" },
    {
      type: "paragraphe",
      texte:
        "In winter, the boot fills up before the seats do. A family of four with four suitcases, four pairs of skis and four boot bags carries more volume than a summer group of eight, and that is what decides the vehicle.",
    },
    {
      type: "paragraphe",
      texte:
        "On a shuttle, luggage space is shared between all the passengers, so operators generally set an allowance per seat and treat anything beyond it as extra — a second ski bag, a snowboard, a pushchair. Read those terms before you book, because the vehicle is loaded for everyone and there is no room to negotiate at the kerb.",
    },
    {
      type: "paragraphe",
      texte:
        "On a private transfer, you declare what you are bringing and the vehicle is chosen for it. Our three categories give the orders of magnitude:",
    },
    {
      type: "liste",
      items: [
        "Standard — Volkswagen Transporter, up to 8 passengers. Our booking engine plans it for up to 12 pieces of luggage, suitcases and ski or board bags counted together.",
        "Business — Mercedes V-Class or Vito Tourer, up to 7 passengers and up to 10 pieces.",
        "Premium — Mercedes E-Class saloon, up to 4 passengers and up to 5 pieces.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Skis, snowboards and boot bags are carried at no extra charge. The count you give simply decides which category we send, so declare the unusual items too: a splitboard, an airbag pack, a pushchair, race skis. If the load does not fit one vehicle, it is better to know when you book than at the airport.",
    },

    { type: "titre2", texte: "Per seat or per vehicle: how the price works" },
    {
      type: "paragraphe",
      texte:
        "A shared transfer is sold per seat. The price looks low because it is the price for one person, and it multiplies with every traveller in your party.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer is sold per vehicle. Our price is built from the vehicle category, the road distance to the resort, how hard the resort is to reach, and the day and time of the pick-up — and it does not change with the number of passengers. Two people pay what six pay in the same vehicle. Tolls are included, and nothing is added on arrival.",
    },
    {
      type: "paragraphe",
      texte:
        "That gives a rule of thumb rather than a number. For one traveller, a shared seat is almost always cheaper. For two, the private transfer costs noticeably more. As the party grows, the shuttle total climbs seat by seat while the private price stays where it is, and somewhere between a small family and a full minibus the gap narrows or reverses. Where exactly depends on the route, the date and the operator, so do the sum for your own journey rather than trusting a headline figure.",
    },
    {
      type: "liste",
      items: [
        "Multiply the per-seat price by everyone travelling, children included if they take a seat.",
        "Add any shuttle charges for extra ski bags or oversized equipment.",
        "Check whether both prices include tolls and any night or weekend rate.",
        "Compare the totals, then weigh the difference against the waiting and the stops.",
      ],
    },

    { type: "titre2", texte: "Travelling with children" },
    {
      type: "paragraphe",
      texte:
        "Children change the comparison more than any other factor, and not only because of the arithmetic. French law requires an approved restraint for every child under 10, and the rules in Switzerland and Italy are also based on age or height. On a shuttle, ask in advance whether seats are provided and fitted, and whether they are guaranteed for your departure rather than on request.",
    },
    {
      type: "paragraphe",
      texte:
        "On a private transfer, child and booster seats are provided at no extra charge and fitted before your driver leaves for the airport. Give the ages of your children when you book, not on the day, so the right seats are in the vehicle.",
    },
    {
      type: "paragraphe",
      texte:
        "The rest is about the day itself. A family that has been travelling since dawn feels every stop at another resort and every half-hour in the terminal. A private vehicle leaves when you are ready, and a stop on the way — a supermarket before the resort, a break on a long drive — can be arranged if you ask when you book.",
    },

    { type: "titre2", texte: "Groups of friends, clubs and larger parties" },
    {
      type: "paragraphe",
      texte:
        "For a group, a shared shuttle has a practical drawback on top of the price: there is no guarantee the whole party travels in the same vehicle, or that everyone's luggage does. Split across two departures, a group arrives in instalments.",
    },
    {
      type: "paragraphe",
      texte:
        "A private Standard vehicle takes up to eight passengers. Beyond that, a private transfer becomes a convoy: several vehicles leaving together, arriving together, and quoted as one journey rather than as separate bookings. Groups over eight, and parties arriving on different flights, go through a group request rather than the booking form, because the timings are what need planning.",
    },

    { type: "titre2", texte: "When a shared shuttle is the sensible choice" },
    {
      type: "paragraphe",
      texte:
        "A shared transfer is a reasonable product, and for some trips it is the better one. It tends to fit when most of these are true:",
    },
    {
      type: "liste",
      items: [
        "You are travelling alone or as a couple, and cost is the deciding factor.",
        "You land at a busy time, when shuttles to your area run often and fill quickly.",
        "You are staying in or near the centre of a large resort that sits on the shuttle's route.",
        "You travel light: one bag and one pair of skis each, within the allowance.",
        "Your arrival day has slack, and an extra hour between the terminal and the resort does not cost you anything you care about.",
      ],
    },

    { type: "titre2", texte: "When a private transfer is worth it" },
    {
      type: "paragraphe",
      texte:
        "A private transfer earns its price when the shuttle's constraints cost you more than money. That is usually the case in these situations:",
    },
    {
      type: "liste",
      items: [
        "You are three or more, so the per-vehicle price is shared across the party.",
        "You travel with young children and need seats fitted and a vehicle that leaves when you are ready.",
        "You carry a lot of equipment — several ski bags, boards, boot bags, a pushchair.",
        "Your flight lands late in the evening, early in the morning or on a day when delays are likely.",
        "You are staying at the far end of a shuttle route, such as Avoriaz after Les Gets and Morzine, or in a resort split over several villages.",
        "You want to ski on arrival day: a Geneva–Chamonix transfer is about 1 h 25 on clear roads, and a midday landing can still leave time on the snow.",
      ],
    },

    { type: "titre2", texte: "Questions to ask, whichever you choose" },
    {
      type: "liste",
      items: [
        "Is the price per seat or per vehicle, and does it include tolls?",
        "How much luggage is included, and is there a charge for ski or board bags?",
        "What happens if my flight is delayed — does the vehicle wait, and is waiting charged?",
        "How many drop-offs are on the route, and where is mine in the order?",
        "Will I be dropped at my accommodation address or at a central point?",
        "Are child seats provided, fitted and included in the price?",
        "Does the vehicle carry winter tyres and snow chains?",
        "On the return, what time will I be collected, relative to my flight?",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Our own answers are on every route page: one price per vehicle with tolls included, flight tracking, skis and child seats at no extra charge, winter tyres and chains on board all season, and a driver who takes you to your address. If a shared seat still suits your trip better after those questions, it is the right choice — and if not, the price for your route is a few clicks away.",
    },
  ],

  faq: [
    {
      question: "Is a shared ski transfer cheaper than a private one?",
      reponse:
        "For one person, almost always. A shared seat is priced per person, while a private transfer is priced per vehicle and stays the same whatever the number of passengers. As the group grows the shuttle total rises seat by seat, so for families and groups the difference narrows and can reverse. Multiply the seat price by your party before comparing.",
    },
    {
      question: "How long do shared ski shuttles wait at the airport?",
      reponse:
        "It depends on the operator and the day. A shuttle collects passengers from several flights, so the first arrivals wait for the last, and a late flight delays the whole vehicle or moves its passengers to a later departure. A private transfer follows your own flight and leaves when you land.",
    },
    {
      question: "Does a private transfer stop at other resorts?",
      reponse:
        "No. A private transfer drives from the airport to the address you give, with nobody else on board and no stops at other resorts. If you want a stop on the way, such as a supermarket before the resort, ask when you book and the driver plans for it.",
    },
    {
      question: "How many people fit in a private ski transfer vehicle?",
      reponse:
        "Up to eight in our Standard Volkswagen Transporter, seven in the Business Mercedes V-Class and four in the Premium Mercedes E-Class. Luggage matters as much as seats in winter, so declare your suitcases and ski bags when you book: the count decides the category. Groups over eight travel in several vehicles.",
    },
    {
      question: "Are ski bags and child seats extra on a private transfer?",
      reponse:
        "Not with us. Skis, snowboards and boot bags are carried at no extra charge, and child and booster seats are provided free and fitted before the driver leaves. Give the number of bags and the ages of your children when you book so the right vehicle and seats are sent.",
    },
  ],
};
