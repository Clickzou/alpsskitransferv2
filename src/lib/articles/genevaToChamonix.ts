import type { Article } from "./types";

/**
 * Genève → Chamonix : bus, train ou transfert privé — requête cible « how to get
 * to chamonix from geneva ». Sujet R1 de
 * `docs/concurrence/analyse-blogs-concurrents-2026-09-14.md`.
 *
 * Durées de route : `src/data/distances.ts`. Vallée, villages et domaine : pages
 * de station Chamonix, Argentière, Saint-Gervais. Bus et train décrits en termes
 * généraux : aucun horaire, aucun tarif, aucun nom d'opérateur.
 */
export const genevaToChamonix: Article = {
  slug: "how-to-get-to-chamonix-from-geneva",
  titre: "Geneva to Chamonix: bus, train or private transfer",
  metaTitre: "Geneva to Chamonix: Bus, Train or Private Transfer?",
  metaDescription:
    "Geneva airport to Chamonix: 91 km and about 1 h 25 by road. Shuttle bus, train or private transfer compared for luggage, skis and late flights.",
  chapo:
    "Chamonix is one of the shortest transfers in the Alps from Geneva, and one of the most confusing to plan: you land in Switzerland, ski in France, and have a choice of buses, shuttles, trains and private vehicles. Here is how each option really works, what it means with skis and children or on a late flight, and how long the road actually takes — measured on the network, not guessed.",
  visuel: { nom: "blog-geneva-to-chamonix", alt: "People carrier unloading ski bags outside a chalet below glaciated granite peaks" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Geneva Airport to Chamonix is 91 km and about 1 h 25 by road without traffic; Argentière is 100 km (1 h 37) and Saint-Gervais 77 km (1 h 16).",
    "There is no direct train from Geneva to Chamonix: rail journeys change at least once, on the French or the Swiss side of the massif.",
    "The road route is motorway to Le Fayet, then the Chamonix valley road, which stays open through the winter.",
    "On a Saturday morning in February, allow 45 minutes to an hour more: the motorway towards the Mont Blanc valley is at its busiest.",
    "Winter equipment is compulsory in Haute-Savoie from 1 November to 31 March; transfer vehicles carry winter tyres and snow chains all season.",
  ],

  stationsLiees: ["chamonix", "argentiere", "saint-gervais"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "argentiere" },
    { airport: "geneva-airport", resort: "saint-gervais" },
    { airport: "chambery-savoie-airport", resort: "chamonix" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Geneva Airport to Chamonix is 91 km and about 1 h 25 by road without traffic: motorway to Le Fayet, then the valley road up through Les Houches. There are three ways to cover it. A shared shuttle or scheduled coach is the cheapest for one or two people with light luggage, but it runs to its own timetable, may wait for other flights and stops for other passengers. The train is scenic but indirect — there is no direct service, and every rail route involves at least one change, with your luggage. A private transfer takes you from the arrivals hall to your door in one vehicle, at one price per vehicle rather than per seat, and follows your flight if it is late. For families with ski bags, groups and evening arrivals, it is usually the most practical choice. Whichever you pick, add 45 minutes to an hour on a February Saturday.",
    },

    { type: "titre2", texte: "Geneva to Chamonix at a glance: distance, road and border" },
    {
      type: "paragraphe",
      texte:
        "Geneva Airport is in Switzerland and Chamonix is in France, but the distance between them is short: 91 km, about 1 h 25 without traffic. The route leaves Geneva on the motorway towards the Mont Blanc valley and follows it as far as Le Fayet, at the foot of Saint-Gervais. From there, the valley road climbs through Les Houches to Chamonix, and carries on up the valley to Argentière and Le Tour.",
    },
    {
      type: "paragraphe",
      texte:
        "The valley road is a main road, not a mountain pass. It serves the whole Chamonix valley and the Mont Blanc tunnel, and it is cleared and gritted around the clock in season. Snow slows it; it rarely stops it. Most of the time on this transfer is predictable, which is why a morning landing still leaves you half a day on the slopes.",
    },
    {
      type: "paragraphe",
      texte:
        "The border is a formality. Switzerland and France are both in the Schengen area, so there is no routine check, but carry a passport or identity card: spot checks happen, and you will need it for the flight home. Geneva Airport also has a French sector, connected to Ferney-Voltaire, although almost every flight uses the Swiss side. If a transfer is waiting for you, your confirmation says which side to come out on.",
    },

    { type: "titre2", texte: "Option 1: a private transfer, door to door" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is the simplest of the three to describe. Your driver waits in the arrivals hall with your name, whatever time you actually land. The luggage is loaded once, the vehicle leaves when you are ready, and it goes straight to your hotel, chalet or apartment without stopping for anyone else.",
    },
    {
      type: "liste",
      items: [
        "One fixed price for the whole vehicle, tolls and motorway fees included, given before you book — a group of six pays what a couple pays.",
        "Flight tracking: a delayed landing moves the pick-up with it, at no extra cost and with nothing for you to do.",
        "Skis, snowboards and boot bags at no extra charge, in a vehicle sized to the equipment you declare.",
        "Child and booster seats fitted before your driver leaves for the airport.",
        "Winter tyres and snow chains on board all season.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The drawback is obvious: for a single traveller with a backpack, it is more vehicle than you need, and a seat on a shared shuttle will cost less. The advantage grows with every extra person and every extra bag, and it is decisive at night, when the other options thin out.",
    },

    { type: "titre2", texte: "Option 2: a shared shuttle or a scheduled coach" },
    {
      type: "paragraphe",
      texte:
        "Several operators run shared shuttles and coaches between Geneva Airport and Chamonix in winter. The principle is the same across them: you buy a seat rather than a vehicle, and the vehicle is filled with passengers from several flights.",
    },
    {
      type: "paragraphe",
      texte:
        "That has predictable consequences. A shuttle leaves at set times, or when enough passengers have landed, so you may wait at the airport for other flights — including delayed ones. It then drops passengers at several addresses or at central stops in the valley, so the last part of the journey can take longer than the road itself. Luggage allowances vary, and ski bags are sometimes charged as extras or limited in number.",
    },
    {
      type: "paragraphe",
      texte:
        "For one or two people travelling light on a daytime flight, a shared shuttle is a sensible, economical choice. It becomes less attractive as the party grows, because the price is multiplied by the number of seats, and less reliable as the evening goes on. Check the operator’s own conditions on waiting time, luggage and missed departures before you book.",
    },

    { type: "titre2", texte: "Option 3: the train — no direct service" },
    {
      type: "paragraphe",
      texte:
        "There is no direct train from Geneva to Chamonix, although the valley has its own railway. Rail journeys go one of two ways round the Mont Blanc massif. On the French side, regional trains from Geneva run to Saint-Gervais-Le Fayet, where you change onto the mountain line that climbs the valley to Chamonix. On the Swiss side, main-line trains run along Lake Geneva and up the Rhône valley to Martigny, where a mountain line crosses into France through Vallorcine and comes down the valley to Chamonix.",
    },
    {
      type: "paragraphe",
      texte:
        "Either way, the train from the airport means at least one change and often two, since the French-side regional trains start from Geneva’s city stations rather than from the airport. It is a pleasant journey with a small bag and time to spare. With a suitcase, a ski bag and a boot bag per person, every change is a carry along a platform, and the connection times are fixed.",
    },
    {
      type: "paragraphe",
      texte:
        "Timetables and fares change with the season and only the rail operators can give them accurately, so check them before you rely on a connection — especially for an evening arrival, when the last train of the day becomes the deadline.",
    },

    { type: "titre2", texte: "Bus, train or private transfer? Choosing by situation" },
    {
      type: "liste",
      items: [
        "Solo or a couple, light luggage, daytime flight: a shared shuttle, or the train if you enjoy it and have time.",
        "A family with ski bags and children: a private transfer. One loading, no connections, child seats already fitted.",
        "A group of four to eight: a private transfer, priced per vehicle. The more of you there are, the lower the cost per person.",
        "A group of more than eight: several private vehicles, planned to arrive together rather than in scattered order.",
        "A flight landing late in the evening, or at risk of delay: a private transfer, which waits for the actual landing time rather than a timetable.",
        "Bulky kit — splitboards, touring skis, airbag packs: a private transfer, declared at booking so the vehicle has room.",
        "An early departure home: a private transfer, with the pick-up time set from your flight rather than from the first shuttle of the day.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The honest summary: the cheaper options are cheaper per seat, and they cost time, flexibility and effort in return. On a 1 h 25 road journey, the time difference is less about the drive than about the waiting before it and the stops after it.",
    },
    {
      type: "paragraphe",
      texte:
        "A hire car is the fourth option people consider, and it deserves a word. The drive itself is not difficult, but the law is strict: winter equipment is compulsory in Haute-Savoie from 1 November to 31 March, and a car picked up on arrival is often equipped for the motorway rather than for the mountains. Check what the hire company fits on the side of the airport you rent from, and remember that parking in the valley is part of the cost. If the car will sit outside the chalet all week, a transfer usually makes more sense.",
    },

    { type: "titre2", texte: "Chamonix, Argentière or Saint-Gervais: where the drop-off really is" },
    {
      type: "paragraphe",
      texte:
        "“Chamonix” covers a whole valley, and the transfer time depends on where in it you are staying. All three of these have their own route page from Geneva.",
    },
    { type: "titre3", texte: "Saint-Gervais — 77 km, about 1 h 16" },
    {
      type: "paragraphe",
      texte:
        "At the foot of the valley, a few minutes above Le Fayet, and one of the shortest transfers to a Mont Blanc resort. The commune spreads over three levels: Le Fayet at 580 m, with the railway station and the thermal baths; the village at 850 m; and Saint-Nicolas-de-Véroce, higher again on the Megève side. Name yours when you book. Saint-Gervais skis on the Evasion Mont-Blanc area with Megève, not on the Chamonix pass.",
    },
    { type: "titre3", texte: "Chamonix — 91 km, about 1 h 25" },
    {
      type: "paragraphe",
      texte:
        "The town at the foot of Mont Blanc, with over 150 km of pistes across the valley — Brévent-Flégère, Les Grands Montets, Le Tour — and the Vallée Blanche, one of the longest off-piste descents in the world. The town has the shops, the station and the late-night restaurants; accommodation spreads along the valley road on both sides.",
    },
    { type: "titre3", texte: "Argentière — 100 km, about 1 h 37" },
    {
      type: "paragraphe",
      texte:
        "The last village before the Swiss border, at 1,240 m, 8 km up the valley from Chamonix, at the foot of the Grands Montets. Quieter and colder than the town, and the base for many experienced skiers. The same valley road, twelve minutes more.",
    },

    { type: "titre2", texte: "Late arrivals, delays and the Saturday problem" },
    {
      type: "paragraphe",
      texte:
        "Late flights are where the choice of transport matters most. Shared services and trains run to a timetable that ends at some point in the evening, and a delay on a winter evening can push an arrival past it. A private transfer follows the flight number: the pick-up moves to the real landing time, the driver waits in arrivals, and the price quoted does not change.",
    },
    {
      type: "paragraphe",
      texte:
        "Saturday is the other thing to plan around. It is changeover day across the Alps, and on February Saturdays the motorway between Geneva and Le Fayet is at its busiest. Allow 45 minutes to an hour more than the clear-road time on those mornings, in both directions. If your accommodation allows a Sunday or midweek arrival, you gain that time twice.",
    },
    {
      type: "paragraphe",
      texte:
        "On the way home, the pick-up time is set so that you reach the terminal with time in hand on the day you actually travel. Winter equipment is compulsory in Haute-Savoie from 1 November to 31 March, and every vehicle carries both winter tyres and chains, so snowfall on the valley road slows the journey rather than stopping it.",
    },

    { type: "titre2", texte: "Which airport for Chamonix: Geneva, Chambéry or another?" },
    {
      type: "paragraphe",
      texte:
        "Geneva is the natural airport for Chamonix, with flights every day of the week from most European cities and the shortest road of any major airport. Four others come up in planning; all times are without traffic.",
    },
    {
      type: "liste",
      items: [
        "Chambéry Savoie — 140 km, about 1 h 40: only fifteen minutes more than Geneva, with a winter timetable built around Saturday charters from the UK and northern Europe.",
        "Annecy — 92 km, about 1 h 10: quicker than Geneva on paper, but with very thin scheduled winter traffic. Check it, then book Geneva.",
        "Lyon Saint-Exupéry — 217 km, about 2 h 30: year-round flights and a wide choice of airlines, an hour further by road.",
        "Sion — 69 km: close, over the Col des Montets on the Swiss side, but with almost no scheduled flights, and the col can close briefly in heavy snow.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For a Saturday-to-Saturday week with a Chambéry flight from your city, Chambéry is a genuine alternative: the extra quarter of an hour on the road is often repaid by the fare. For anything else, fly Geneva.",
    },

    { type: "titre2", texte: "Vehicles, luggage, groups and booking" },
    {
      type: "paragraphe",
      texte:
        "There are three vehicle categories: the Standard, a Volkswagen Transporter for up to 8 passengers; the Business, a Mercedes V-Class for up to 7; and the Premium, a Mercedes E-Class saloon for up to 4. The category is decided by the group and the luggage, and in winter the boot fills up before the seats do — this is a valley where people arrive with touring kit and airbag packs, so declare everything when you book.",
    },
    {
      type: "paragraphe",
      texte:
        "For groups larger than eight, the party travels in several vehicles planned to arrive together, with one confirmation covering them all. Book as soon as your flights are confirmed: Chamonix and the valley fill from Christmas to the end of March, and the February half-term weeks go first.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Geneva Airport to Chamonix: 91 km, about 1 h 25 by road; Argentière 1 h 37; Saint-Gervais 1 h 16.",
        "Shared shuttle or coach: cheapest per seat, runs to a timetable, stops for other passengers.",
        "Train: no direct service, at least one change, best with light luggage and time to spare.",
        "Private transfer: door to door, one price per vehicle, follows your flight — best for families, groups, ski bags and late arrivals.",
        "Add 45 minutes to an hour on a February Saturday, whatever you choose.",
      ],
    },
  ],

  faq: [
    {
      question: "How long does it take to get from Geneva airport to Chamonix?",
      reponse:
        "About 1 h 25 by road for 91 km without traffic: motorway to Le Fayet, then the Chamonix valley road. Allow 45 minutes to an hour more on a Saturday morning in February.",
    },
    {
      question: "Is there a direct train from Geneva to Chamonix?",
      reponse:
        "No. Rail journeys change at least once: via Saint-Gervais-Le Fayet on the French side, or via Martigny on the Swiss side, then up the valley on the mountain line. Check current timetables with the rail operators before relying on a connection.",
    },
    {
      question: "Is a shuttle bus or a private transfer better from Geneva to Chamonix?",
      reponse:
        "A shared shuttle is cheaper per seat for one or two people with light luggage. A private transfer is priced per vehicle, goes door to door without other passengers and follows your flight, which makes it the practical choice for families, groups, ski bags and late arrivals.",
    },
    {
      question: "Do I need a passport to travel from Geneva airport to Chamonix?",
      reponse:
        "There is no routine border check, as Switzerland and France are both in the Schengen area, but carry a passport or identity card: spot checks happen, and you need it for your flight.",
    },
    {
      question: "What if my flight lands late at Geneva?",
      reponse:
        "With a private transfer, nothing changes: the flight is tracked, the pick-up moves to the actual landing time and the driver waits in arrivals, at no extra cost. Shared shuttles and trains run to a timetable, so check their last departures.",
    },
  ],
};
