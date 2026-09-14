import type { Article } from "./types";

/**
 * Le samedi, jour de rotation.
 *
 * Les temps de route viennent de `src/data/distances.ts` ; « une heure de plus »
 * et « plus près de 3 h 45 que de 2 h 45 » des pages de station et d'aéroport ;
 * la majoration du samedi et de nuit de `src/lib/tarification/bareme.ts`, dite
 * sans chiffre puisque la grille s'édite depuis le tableau de bord. Le prix
 * reste « fixé à la réservation, sans hausse le jour même »
 * (`src/data/page-transferts-prives.ts`).
 */
export const saturdayChangeoverDayAlps: Article = {
  slug: "saturday-changeover-day-alps-ski-transfer",
  titre: "Saturday changeover day in the Alps: how to plan around the busiest day of the week",
  metaTitre: "Saturday Changeover Day in the Alps: How to Plan Around It",
  metaDescription:
    "Why Saturday is changeover day in the Alps, where the traffic builds, how much time it adds to a ski transfer, when to fly, and why a Saturday costs more.",
  chapo:
    "Most ski weeks in the Alps begin and end on the same day, and for a few hours every winter Saturday the whole mountain moves at once: the people leaving and the people arriving use the same airports, the same valleys and the same climbs. It is the busiest day of the week on every road we drive. Here is why it happens, where the queues form, how much time they add, and what you can do about it — from the flight you choose to the time you leave your chalet.",
  visuel: { nom: "blog-saturday-changeover-day", alt: "Line of vehicles climbing a snowy valley road to a ski resort at dusk" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Saturday is changeover day because most chalets, apartments and package holidays in the Alps run Saturday to Saturday, so departing and arriving guests travel on the same day.",
    "The slowest stretches are predictable: the Tarentaise valley between Albertville and Moûtiers, the A40 towards Chamonix, and the climb from Cluses towards the Portes du Soleil.",
    "On a busy Saturday in high season, allow up to an hour more than the clear-road time: Geneva to Val Thorens, about 2 h 45 on a clear road, is then closer to 3 h 45.",
    "Saturday pick-ups, like late-night and very early ones, are priced above a midweek daytime journey; the price is shown before you book and fixed from that moment, with no surge on the day.",
    "Chambéry puts Courchevel 110 km and about 1 h 30 away and Val Thorens 122 km and about 1 h 40 away, and its winter flights are concentrated at weekends — the shortest drive into the Tarentaise on a Saturday.",
  ],

  stationsLiees: [
    "val-thorens",
    "les-menuires",
    "courchevel",
    "meribel",
    "les-arcs",
    "la-plagne",
    "chamonix",
    "argentiere",
    "les-gets",
  ],

  trajetsLies: [
    { airport: "geneva-airport", resort: "val-thorens" },
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "courchevel" },
    { airport: "chambery-savoie-airport", resort: "courchevel" },
    { airport: "lyon-airport", resort: "meribel" },
    { airport: "geneva-airport", resort: "les-gets" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Why is Saturday so busy in the Alps? Because most ski accommodation — chalets, apartments, residences and package holidays — is let from Saturday to Saturday. The guests leaving and the guests arriving therefore travel on the same day, through the same airports and up and down the same roads. The queues form in predictable places: the Tarentaise valley between Albertville and Moûtiers, the A40 motorway towards Chamonix, and the climb from Cluses towards Les Gets and the Portes du Soleil. On a busy February Saturday, allow up to an hour more than the clear-road time; a Geneva to Val Thorens transfer that takes about 2 h 45 on a clear road is then closer to 3 h 45. If your accommodation allows it, a midweek or Sunday arrival avoids the worst of it. If it does not, choose the airport closest to your resort, book early, give us your flight number, and expect Saturday to be priced above a midweek day.",
    },

    { type: "titre2", texte: "Why Saturday is changeover day" },
    {
      type: "paragraphe",
      texte:
        "The Saturday week is a habit of the ski industry, and it is a practical one. Letting an apartment or a chalet by the week is simplest when every week starts on the same day: the outgoing guests leave in the morning, the accommodation is cleaned and prepared, and the incoming guests arrive later the same day. Tour operators build their packages the same way, and charter flights are scheduled to match, so that one aircraft brings the new group in and takes the previous one home.",
    },
    {
      type: "paragraphe",
      texte:
        "The result is a wave rather than a flow. In a resort where most of the beds change hands on one day, thousands of people need to reach an airport by a certain time while thousands of others need to reach the resort from one. Multiply that by every resort in a valley, and a road that is quiet on a Tuesday is full on a Saturday. The effect is strongest in the large purpose-built resorts, where rental apartments make up a large share of the beds, and in the weeks when the whole of Europe seems to be on holiday at once.",
    },

    { type: "titre2", texte: "Where the traffic builds" },
    {
      type: "paragraphe",
      texte:
        "Saturday traffic is not spread evenly across the Alps. It concentrates wherever many resorts share a single access road, and the worst points are well known.",
    },
    {
      type: "titre3",
      texte: "The Tarentaise: Albertville to Moûtiers, and the climbs above",
    },
    {
      type: "paragraphe",
      texte:
        "The Tarentaise valley is the single access for the Three Valleys — Courchevel, Méribel, Les Menuires and Val Thorens — and, further up, for La Plagne, Les Arcs, Tignes and Val d'Isère. On a Saturday in high season the valley slows to a crawl between Albertville and Moûtiers. Above Moûtiers the queues continue on the resort roads: every route to Val Thorens ends with the same 37 km climb from Moûtiers, and Les Menuires sits 27 km up the same road. When the whole of the Three Valleys changes over on the same morning, those climbs carry traffic in both directions at once.",
    },
    {
      type: "titre3",
      texte: "The A40 towards Chamonix",
    },
    {
      type: "paragraphe",
      texte:
        "The motorway from Geneva towards Le Fayet serves Chamonix, Argentière, Megève, Saint-Gervais and the Mont Blanc tunnel. It is fast on an ordinary day — Chamonix is 91 km and about 1 h 25 from Geneva — and predictably slow on Saturday mornings in February, when 45 minutes more is a sensible allowance.",
    },
    {
      type: "titre3",
      texte: "The climb from Cluses to the Portes du Soleil",
    },
    {
      type: "paragraphe",
      texte:
        "Les Gets is only 69 km and about 1 h 20 from Geneva, but the road from the motorway exit at Cluses climbs through Taninges and over the col des Gets, and it is the road every hire car, coach and transfer uses on a Saturday morning. On a busy Saturday, add 45 minutes to an hour: the queue starts well before the climb.",
    },
    {
      type: "titre3",
      texte: "The airports themselves",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva funnels a large share of the season's arrivals through one day a week. Chambéry and Grenoble, whose winter timetables are built around weekend charters, fill in a rush on Saturdays, and the baggage hall can take a while. Neither is a reason to avoid them; both are a reason to allow time.",
    },
    {
      type: "titre3",
      texte: "Beyond the French Alps",
    },
    {
      type: "paragraphe",
      texte:
        "Changeover day is not only a French phenomenon, although the large purpose-built French resorts show it most clearly. In the Italian and Swiss Alps the season turns on Saturday too: charter rotations follow one another at the regional airports and the valleys fill within a few hours. The routes that cross a border add their own pinch points. The Mont Blanc tunnel, used on the drive from Geneva or Chamonix to Courmayeur and the Aosta valley, queues at weekends, and the tunnels on the routes into Switzerland queue on holiday weekends. Passes are a separate question: they close for a few hours after heavy snowfall whatever the day of the week, and a closure on a Saturday simply lands on a busier road. On these routes, as on the others, your driver picks the way on the day from the real state of the roads rather than from the map.",
    },

    { type: "titre2", texte: "How much time does Saturday add to a transfer?" },
    {
      type: "paragraphe",
      texte:
        "Every drive time we publish is measured on the real route without traffic, because that is the only figure that can be measured honestly. On a Saturday in high season, the rule of thumb across our routes into the Tarentaise and the northern French Alps is up to an hour more. A few examples show what that means in practice.",
    },
    {
      type: "liste",
      items: [
        "Geneva to Val Thorens: 161 km, about 2 h 45 on a clear road — closer to 3 h 45 on a busy February Saturday.",
        "Geneva to Courchevel: 149 km, about 2 h 30 on a clear road, with the same Tarentaise valley to cross.",
        "Chambéry to Val Thorens: 122 km, about 1 h 40 on a clear road — allow an hour more on a Saturday in high season.",
        "Chambéry to Courchevel: 110 km, about 1 h 30 on a clear road.",
        "Lyon to Méribel: 181 km, about 2 h 15 on a clear road, motorway to Albertville and then the valley.",
        "Geneva to Les Gets: 69 km, about 1 h 20 on a clear road — add 45 minutes to an hour on a busy Saturday.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Snow and Saturday add up rather than cancel out. A snowfall on changeover day slows a road that is already at capacity, and chain controls at the foot of a climb hold up every vehicle in the queue. It is the combination, more than either on its own, that produces the long days people remember.",
    },

    { type: "titre2", texte: "Which Saturdays are the busiest?" },
    {
      type: "paragraphe",
      texte:
        "Not every Saturday of the season is the same. A Saturday in early January or late March can feel almost midweek; a Saturday in the middle of February can be the slowest day of the year on the roads above.",
    },
    {
      type: "liste",
      items: [
        "The Saturdays around Christmas and New Year, when families from across Europe travel at the same time.",
        "The February school holidays. France staggers its winter holidays across three zones over several weeks, and other countries' half-term and carnival holidays overlap with them.",
        "The UK February half-term week, which concentrates British arrivals on one or two Saturdays.",
        "Any Saturday that follows a heavy snowfall, when the roads have not yet been fully cleared.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "France's official traffic forecast, Bison Futé, publishes a day-by-day outlook for holiday weekends, including the direction of travel towards and away from the Alps. It is worth a look before you book your flights, not just the day before you travel.",
    },

    { type: "titre2", texte: "Timing your flight around changeover day" },
    {
      type: "paragraphe",
      texte:
        "The single most effective choice is the day you travel. If your accommodation lets you arrive on a Friday, a Sunday or midweek, the drive is usually close to the clear-road time, and a midweek arrival often saves money on the flight as well. Geneva has flights every day of the week, which is what makes that choice possible; Chambéry and Grenoble concentrate their winter flights on weekends and frequently have little or nothing midweek.",
    },
    {
      type: "paragraphe",
      texte:
        "If you are travelling on a Saturday, the airport matters more than usual. For the Tarentaise and the Three Valleys, Chambéry is the closest airport: Courchevel is about 1 h 30 away, Méribel 103 km and about 1 h 20, Val Thorens about 1 h 40. Its weekend charters make it the natural choice for a Saturday-to-Saturday week, and a shorter drive leaves less road for the queues to fill. For the resorts north of Albertville — Chamonix, the Portes du Soleil, the Grand Massif — Geneva remains the airport.",
    },
    {
      type: "liste",
      items: [
        "Prefer a flight that leaves spare time in the day over one that saves an hour on paper: on a Saturday, delays eat into the margin first.",
        "An earlier landing with a longer drive often beats a late landing with a short one.",
        "A very late landing avoids some traffic but means a night-time pick-up, which is priced higher, and an arrival long after the accommodation's reception has closed.",
        "Check what time your accommodation is available: arriving well before it is ready is no quicker than arriving on time.",
      ],
    },

    { type: "titre2", texte: "Leaving the resort on a Saturday: why the pick-up is early" },
    {
      type: "paragraphe",
      texte:
        "The journey home is the Saturday journey that cannot absorb a delay, because the aircraft will not wait. That is why the pick-up time we give for a Saturday return can look early: we set it from your flight time so that you reach the terminal with time in hand rather than at the theoretical minimum, and on a changeover day that margin includes the valley traffic.",
    },
    {
      type: "liste",
      items: [
        "Give us the flight time of your return, not just the date: the pick-up is worked back from it.",
        "Pack the night before and keep ski boots and wet gear in a separate bag.",
        "Ask your accommodation whether you can leave luggage after check-out if your pick-up is later in the day.",
        "If your flight time changes, request a new pick-up time from the link in your confirmation email, up to 24 hours before the pick-up; within 24 hours, contact us directly.",
        "Keep your phone on and the booking reference to hand on the morning of departure.",
      ],
    },

    { type: "titre2", texte: "Why a Saturday transfer costs more" },
    {
      type: "paragraphe",
      texte:
        "Our prices are calculated per vehicle from the distance of the route and the vehicle category, and they take account of when the journey happens. A Saturday pick-up is priced above the same journey midweek, for the same reason that flights and accommodation cost more at the weekend: it is the day demand is at its highest, when every vehicle and every driver is already committed. Pick-ups late at night or very early in the morning carry a supplement too, and prices can also vary with the period of the season.",
    },
    {
      type: "paragraphe",
      texte:
        "What does not happen is a surge on the day. The price is shown as soon as you enter your journey and its date, before you book; it is fixed from the moment you book, tolls are included, and nothing is added on arrival. A delayed flight does not change it either: we track the flight and move the pick-up, and the included hour of waiting counts from the actual landing time.",
    },
    {
      type: "liste",
      items: [
        "Saturday pick-ups cost more than the same route on a midweek day.",
        "Late-night and very early pick-ups carry their own supplement.",
        "The price is per vehicle, so a larger group shares the same figure.",
        "The price you see before booking is the price you pay.",
      ],
    },

    { type: "titre2", texte: "Booking for a Saturday: what makes the difference" },
    {
      type: "paragraphe",
      texte:
        "Saturdays in February are when transfer vehicles run out across the Alps, often before the accommodation does. Booking as soon as your flights are confirmed is the surest way to have the vehicle category you want, especially if you travel with skis and need the extra luggage space.",
    },
    {
      type: "liste",
      items: [
        "Book the transfer when you book the flight, not in the week before.",
        "Give the flight number, so the pick-up follows the actual landing time.",
        "Declare the real luggage — suitcases, ski bags, boot bags, pushchairs — so the vehicle fits the first time.",
        "Give the exact address of the accommodation, not just the resort name.",
        "Travelling as a group, or organising transfers for guests every week? Ask us: agencies and chalet companies can have recurring slots held for changeover Saturdays through the season.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Saturday is not a day to fear; it is a day to plan. The roads are busier and the drive is longer, but the queues are in the same places every week, and a transfer booked early, sized for the luggage and timed from the flight turns changeover day into what it should be — the first afternoon of the holiday.",
    },
  ],

  faq: [
    {
      question: "Why is Saturday changeover day at ski resorts?",
      reponse:
        "Most chalets, apartments and package holidays in the Alps are let from Saturday to Saturday, so departing and arriving guests travel on the same day, through the same airports and on the same roads.",
    },
    {
      question: "How much longer does a ski transfer take on a Saturday?",
      reponse:
        "On a busy Saturday in high season, allow up to an hour more than the clear-road time. Geneva to Val Thorens, about 2 h 45 on a clear road, is then closer to 3 h 45.",
    },
    {
      question: "Where is the traffic worst on changeover day?",
      reponse:
        "In the Tarentaise valley between Albertville and Moûtiers, on the A40 towards Chamonix, and on the climb from Cluses towards Les Gets and the Portes du Soleil.",
    },
    {
      question: "Is a Saturday transfer more expensive?",
      reponse:
        "Yes. Saturday pick-ups are priced above a midweek journey, as are late-night and very early pick-ups. The price is shown before you book and fixed once you book, with nothing added on the day.",
    },
    {
      question: "Which airport is best for a Saturday arrival in the Three Valleys?",
      reponse:
        "Chambéry is the closest: about 1 h 30 to Courchevel and 1 h 40 to Val Thorens on a clear road, with winter flights concentrated at weekends. Geneva and Lyon have more flights but longer drives.",
    },
    {
      question: "Can I avoid the Saturday traffic?",
      reponse:
        "Arriving on a Friday, a Sunday or midweek avoids most of it, if your accommodation allows. Geneva flies every day of the week, which makes a non-Saturday arrival easier to arrange.",
    },
  ],
};
