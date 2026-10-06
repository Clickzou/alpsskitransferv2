import type { Article } from "./types";

/**
 * Tignes, Val d'Isère, La Plagne, Les Arcs : quel aéroport — programmé au
 * 20 octobre 2026. Sujet n°1 de l'audit articles d'octobre
 * (`clickzou-v2/docs/audits-articles/2026-10/alps.md`) : la Tarentaise fait
 * 5 350 impressions et 3 clics sur 90 jours, et « closest airport to tignes
 * france » est la requête la plus nette ; aucun article ne couvrait ces
 * quatre stations.
 *
 * Chiffres : UNIQUEMENT les pages de trajet du site (`src/lib/transfers/*.ts`),
 * soit douze trajets — Tignes depuis Genève et Grenoble ; Val d'Isère depuis
 * Chambéry, Lyon et Genève ; La Plagne depuis Chambéry, Grenoble, Lyon et
 * Genève ; Les Arcs depuis Chambéry, Grenoble et Genève. Un trajet sans page
 * (Chambéry ou Lyon → Tignes, Lyon → Les Arcs) n'est pas chiffré : il renvoie
 * à la demande spéciale, comme le dit déjà la page /airport-ski-transfers/.
 * Villages, altitudes et routes d'accès : pages de trajet françaises
 * (`src/lib/transfers/traductions-fr.ts`). Véhicules : page /inquiry/ et FAQ
 * des trajets. Si une page de trajet change ses chiffres, relire ceux-ci.
 *
 * Angle distinct de l'article Chambéry (qui part de l'aéroport) et de l'article
 * Trois Vallées : ici on part des quatre stations de Haute-Tarentaise, au-delà
 * de Moûtiers, et de la question du groupe de huit (question Pulse).
 */
export const closestAirportTarentaise: Article = {
  slug: "closest-airport-tignes-val-disere-la-plagne-les-arcs",
  titre: "Closest airport to Tignes, Val d’Isère, La Plagne and Les Arcs: Geneva, Lyon or Chambéry?",
  metaTitre: "Closest Airport to Tignes, Val d’Isère, La Plagne, Les Arcs",
  motCle: "closest airport to tignes france",
  motsClesSecondaires: ["nearest airport to tignes", "airport for la plagne"],
  metaDescription:
    "Chambéry, Grenoble, Lyon or Geneva for Tignes, Val d’Isère, La Plagne and Les Arcs: drive times measured route by route, and which flights fit.",
  chapo:
    "For La Plagne, Les Arcs and Val d’Isère, Chambéry is the closest airport by drive time — 1 h 41, 1 h 43 and 2 h 10 — and Geneva the slowest, about an hour further each way. For Tignes, of the two airports we run it from, Grenoble is quicker than Geneva: 2 h 49 against 3 h 07. Which one you land at usually comes down to the day you fly, because Chambéry and Grenoble fly mostly at weekends while Lyon and Geneva fly every day.",
  datePublication: "2026-10-20",
  auteur: "Alps Ski Transfers",
  visuel: {
    nom: "station-tignes",
    alt: "Tignes in winter: chalets and apartment blocks beside a snow-lined stream, below sunlit peaks",
  },

  aRetenir: [
    "Chambéry is the closest airport by road to La Plagne (121 km, about 1 h 41 without traffic), Les Arcs (122 km, 1 h 43) and Val d’Isère (144 km, 2 h 10).",
    "Geneva is the slowest of the airports serving these resorts despite being closer in kilometres than Lyon or Grenoble: 2 h 44 to La Plagne, 2 h 47 to Les Arcs, 3 h 07 to Tignes and 3 h 14 to Val d’Isère.",
    "For Tignes, Grenoble is 18 minutes quicker than Geneva: 208 km and about 2 h 49, against 182 km and 3 h 07.",
    "Landing at Chambéry rather than Geneva saves about an hour each way to La Plagne, Les Arcs or Val d’Isère — just over two hours in the vehicle over a return trip.",
    "The largest standard vehicle takes up to eight passengers and twelve pieces of luggage; above eight, the party travels in several vehicles quoted as one journey.",
  ],

  stationsLiees: ["tignes", "val-disere", "la-plagne", "les-arcs"],

  trajetsLies: [
    { airport: "chambery-savoie-airport", resort: "la-plagne" },
    { airport: "chambery-savoie-airport", resort: "les-arcs" },
    { airport: "chambery-savoie-airport", resort: "val-disere" },
    { airport: "grenoble-isere-airport", resort: "tignes" },
    { airport: "grenoble-isere-airport", resort: "la-plagne" },
    { airport: "grenoble-isere-airport", resort: "les-arcs" },
    { airport: "lyon-airport", resort: "la-plagne" },
    { airport: "lyon-airport", resort: "val-disere" },
    { airport: "geneva-airport", resort: "tignes" },
    { airport: "geneva-airport", resort: "val-disere" },
    { airport: "geneva-airport", resort: "la-plagne" },
    { airport: "geneva-airport", resort: "les-arcs" },
  ],

  lectures: ["which-airport-for-the-french-alps", "chambery-airport-ski-resorts-saturday-flights"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Tignes, Val d’Isère, La Plagne and Les Arcs sit at the top of the Tarentaise valley in Savoie, and four airports realistically serve them: Chambéry, Grenoble, Lyon and Geneva. Measured on the road network, the order is the same almost everywhere. Chambéry is the closest — 1 h 41 to La Plagne, 1 h 43 to Les Arcs, 2 h 10 to Val d’Isère. Grenoble and Lyon come next, at around two and a half hours to La Plagne. Geneva comes last, between 2 h 44 and 3 h 14, even though it is the airport most people think of first.",
    },
    {
      type: "paragraphe",
      texte:
        "That is the drive. The flight is the other half of the decision, and it often settles it: Chambéry and Grenoble run a winter programme concentrated at weekends, while Lyon and Geneva fly every day. This guide sets out the drive times route by route, explains what changes between the four resorts, and ends with a short way to choose. For the wider picture across the whole of the French Alps, our guide to [which airport to fly into for the French Alps](/blog/which-airport-for-the-french-alps/) covers every region.",
    },
    {
      type: "paragraphe",
      texte:
        "Every time below is a clear-road time — what a driver holds on a quiet weekday — taken from the pages of the routes we run. Saturdays in February are a different matter, and they have their own section further down.",
    },

    { type: "titre2", texte: "Drive times from each airport, resort by resort" },
    {
      type: "paragraphe",
      texte:
        "Here are the twelve routes we run to these four resorts, grouped by resort and listed from the shortest drive to the longest. Each one has its own page with the full details of the journey.",
    },
    {
      type: "liste",
      items: [
        "La Plagne — Chambéry 121 km, about 1 h 41; Grenoble 187 km, 2 h 26; Lyon 199 km, 2 h 33; Geneva 160 km, 2 h 44.",
        "Les Arcs — Chambéry 122 km, about 1 h 43; Grenoble 187 km, 2 h 29; Geneva 161 km, 2 h 47.",
        "Val d’Isère — Chambéry 144 km, about 2 h 10; Lyon 222 km, 3 h 02; Geneva 183 km, 3 h 14.",
        "Tignes — Grenoble 208 km, about 2 h 49; Geneva 182 km, 3 h 07.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Two patterns run through the list. The first is the size of Chambéry’s lead: about 45 minutes over Grenoble, 52 minutes over Lyon and a little over an hour over Geneva, whichever of these resorts you compare. The second is that kilometres are a poor guide. Geneva is closer on the map than Lyon or Grenoble to every one of these resorts, and the slowest of them all on the road.",
    },

    { type: "titre2", texte: "Tignes: two airports, and Grenoble is the quicker one" },
    {
      type: "paragraphe",
      texte:
        "We run Tignes transfers from two airports. From [Grenoble to Tignes](/france-ski-transfers/tignes/grenoble-isere-airport-transfers/) it is 208 km and about 2 h 49; from [Geneva to Tignes](/france-ski-transfers/tignes/geneva-airport-transfers/) it is 182 km and about 3 h 07. Grenoble is 26 km longer and still 18 minutes quicker.",
    },
    {
      type: "paragraphe",
      texte:
        "The last part is the same from both. The road follows the Tarentaise up to Bourg-Saint-Maurice, at 840 m, then climbs about 30 km past the dam to the resort at around 2,100 m. Tignes is several villages rather than one — Val Claret, Le Lac, Le Lavachet, Les Boisses — all served on the same transfer, with the final few minutes depending on where you are staying. Give us the exact address when you book and the driver goes straight to the door.",
    },
    {
      type: "paragraphe",
      texte:
        "Chambéry and Lyon to Tignes are not among the routes we run regularly, so we do not quote a time for them here. As with any route that is not on our list, you can send a special inquiry and we will look at it by hand. For reference, Val d’Isère — a few kilometres away in the same valley — is on our list from Chambéry, at 2 h 10.",
    },
    {
      type: "paragraphe",
      texte:
        "Between Grenoble and Geneva, the choice for Tignes usually comes down to the flight rather than the 18 minutes. Grenoble flies mainly at weekends in winter; Geneva flies every day. If you are travelling Saturday to Saturday and a Grenoble flight exists from your city, it is the shorter journey. If you arrive midweek, Geneva is likely to be the only one of the two with a flight.",
    },

    { type: "titre2", texte: "Val d’Isère: Chambéry first, then Lyon, then Geneva" },
    {
      type: "paragraphe",
      texte:
        "Val d’Isère is the furthest of the four resorts from every airport, and the one where the choice of airport makes the biggest difference in absolute terms. From [Chambéry to Val d’Isère](/france-ski-transfers/val-disere/chambery-savoie-airport-transfers/) it is 144 km and about 2 h 10. From [Lyon to Val d’Isère](/france-ski-transfers/val-disere/lyon-airport-transfers/) it is 222 km and about 3 h 02. From [Geneva to Val d’Isère](/france-ski-transfers/val-disere/geneva-airport-transfers/) it is 183 km and about 3 h 14.",
    },
    {
      type: "paragraphe",
      texte:
        "The gap between Chambéry and Geneva is 1 h 04 each way. Over a return trip, that is more than two hours spent in a vehicle — the difference between skiing on the afternoon you arrive and not. Lyon sits in between: 52 minutes behind Chambéry, but still 12 minutes ahead of Geneva despite being 39 km further away.",
    },
    {
      type: "paragraphe",
      texte:
        "There is only one way in during the winter. The Col de l’Iseran, above the resort, is closed for the whole season, so every transfer arrives from Bourg-Saint-Maurice and climbs the last 30 km to about 1,850 m, through La Daille. We serve the centre, La Daille and Le Fornet on the same route; again, the address you give us decides the final stretch.",
    },

    { type: "titre2", texte: "La Plagne: four airports, and the village decides the road" },
    {
      type: "paragraphe",
      texte:
        "La Plagne is the only one of the four resorts we run from all four airports. From [Chambéry to La Plagne](/france-ski-transfers/la-plagne/chambery-savoie-airport-transfers/) it is 121 km and about 1 h 41; from Grenoble 187 km and 2 h 26; from [Lyon to La Plagne](/france-ski-transfers/la-plagne/lyon-airport-transfers/) 199 km and 2 h 33; from [Geneva to La Plagne](/france-ski-transfers/la-plagne/geneva-airport-transfers/) 160 km and 2 h 44.",
    },
    {
      type: "paragraphe",
      texte:
        "What makes La Plagne different is that it is not one destination. It has eleven villages between about 1,250 m and 2,100 m, reached by three different roads from the same valley. The high-altitude villages — Plagne Centre, Bellecôte, Belle Plagne, Aime-la-Plagne — are reached from Aime. Montchavin and Les Coches are reached from the Bourg-Saint-Maurice side, and Champagny from Moûtiers.",
    },
    {
      type: "paragraphe",
      texte:
        "For your transfer, this means two things. First, the times above are to the resort; the road you take after the valley depends on your village, so the exact address matters more here than anywhere else in the Tarentaise. Second, if your party is split between two villages, tell us when you book: it is the same vehicle and the same journey, but the driver needs to plan the order of the drops.",
    },

    { type: "titre2", texte: "Les Arcs: four altitudes, one road up from Bourg-Saint-Maurice" },
    {
      type: "paragraphe",
      texte:
        "Les Arcs is almost level with La Plagne on drive time. From [Chambéry to Les Arcs](/france-ski-transfers/les-arcs/chambery-savoie-airport-transfers/) it is 122 km and about 1 h 43; from [Grenoble to Les Arcs](/france-ski-transfers/les-arcs/grenoble-isere-airport-transfers/) 187 km and 2 h 29; from [Geneva to Les Arcs](/france-ski-transfers/les-arcs/geneva-airport-transfers/) 161 km and 2 h 47.",
    },
    {
      type: "paragraphe",
      texte:
        "The resort is built on four levels — Arc 1600, 1800, 1950 and 2000 — all reached by the road that climbs in hairpins from Bourg-Saint-Maurice, between 15 and 25 km depending on the level. The funicular from Bourg-Saint-Maurice is for travellers arriving by train; a transfer goes directly to your accommodation, so there is no change of vehicle and no carrying skis between the two. Peisey-Vallandry, on the Vanoise Express side of the ski area, is reached by a different road from the same valley and is served too.",
    },
    {
      type: "paragraphe",
      texte:
        "Lyon to Les Arcs is not one of our regular routes, so it is not in the list above. If Lyon is the only airport that works for your dates, a special inquiry is the way to ask for it.",
    },

    { type: "titre2", texte: "Why the nearest airport on the map is the slowest on the road" },
    {
      type: "paragraphe",
      texte:
        "The figures above contain an apparent contradiction. Geneva is closer in kilometres than Lyon or Grenoble to every one of these resorts — 160 km to La Plagne against 187 km from Grenoble and 199 km from Lyon — and yet it is slower to all of them.",
    },
    {
      type: "liste",
      items: [
        "La Plagne: Geneva is 27 km shorter than Grenoble and 18 minutes slower; 39 km shorter than Lyon and 11 minutes slower.",
        "Les Arcs: Geneva is 26 km shorter than Grenoble and 18 minutes slower.",
        "Val d’Isère: Geneva is 39 km shorter than Lyon and 12 minutes slower.",
        "Tignes: Geneva is 26 km shorter than Grenoble and 18 minutes slower.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The reason is the type of road rather than the distance. The Lyon route is motorway for most of its length and holds a steady speed all the way to Albertville, where the Tarentaise begins; the Geneva route spends its first stretch on slower roads before it reaches the same motorway network. Once at Albertville, every airport shares the same road — Moûtiers, then Bourg-Saint-Maurice, then the climb — so the difference is made entirely before the mountains begin. This is also why the gaps between the airports are so stable from one resort to the next.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva has one more particularity: you land in Switzerland and finish in France. There is nothing for you to arrange — the vehicle carries what each country requires in winter — and the border itself rarely costs more than a few minutes.",
    },

    { type: "titre2", texte: "Which of these airports flies on your dates?" },
    {
      type: "paragraphe",
      texte:
        "Drive time decides the order on paper; the timetable decides what is actually available. The four airports work in two very different ways in winter.",
    },
    {
      type: "liste",
      items: [
        "Chambéry: the closest to the upper Tarentaise, with a winter programme concentrated at weekends and built around charter and low-cost flights from the UK and northern Europe. Midweek, there is often no flight at all.",
        "Grenoble: the same weekend profile as Chambéry, and the quicker of our two Tignes airports.",
        "Lyon: flies all year and every day, with the widest choice of airlines in the region. The natural alternative to Chambéry for a midweek arrival.",
        "Geneva: flies every day of the week from most European cities. The longest drive to these resorts, and often the only airport with a direct flight from a given city.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The practical rule follows. If you travel Saturday to Saturday, look at Chambéry first, then Grenoble. If your dates fall midweek, compare Lyon and Geneva — Lyon is the shorter drive to La Plagne and Val d’Isère. Our guide to [Chambéry airport and its Saturday flights](/blog/chambery-airport-ski-resorts-saturday-flights/) explains in more detail how a weekend-only winter airport shapes a ski week.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle, and a longer transfer costs more than a shorter one. The sensible comparison is the whole cost — flights for everyone, plus one transfer each way — and the price of each transfer is shown before you book, so the sum can be done before anything is paid.",
    },

    { type: "titre2", texte: "Eight people, skis and boots: one vehicle or two?" },
    {
      type: "paragraphe",
      texte:
        "Can a party of eight travel together, skis included, on a three-hour run to Tignes or Val d’Isère? The answer depends on the luggage more than the seats. Here are the three vehicle categories we run.",
    },
    {
      type: "liste",
      items: [
        "Standard, a Volkswagen Transporter: up to 8 passengers and 12 pieces of luggage.",
        "Business, a Mercedes V-Class: up to 7 passengers and 10 pieces of luggage.",
        "Premium, a Mercedes E-Class saloon: up to 4 passengers and 5 pieces of luggage.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Eight skiers rarely travel with eight bags and nothing else. Each usually has a suitcase, a ski or board carrier and a boot bag, and in winter the boot fills before the seats do. So tell us how many bags and ski or board carriers you have when you book: the count is what decides the vehicle, and it is far better settled before the day than at the kerb.",
    },
    {
      type: "paragraphe",
      texte:
        "Above eight passengers, the party travels in several vehicles, planned to arrive together and quoted as one journey. For a group of more than eight, or for an agency or chalet company booking on behalf of guests, use our [group transfers page](/inquiry/): you send the numbers, the dates and the pick-up points, and you get a single quote for the whole party.",
    },

    { type: "titre2", texte: "Saturdays, snow and the last 30 kilometres" },
    {
      type: "paragraphe",
      texte:
        "Every resort in this guide changes over on the same Saturdays, and the whole Tarentaise uses one valley road. In the busiest weeks of February, a Saturday transfer can take 45 minutes to an hour longer than the clear-road times above, from whichever airport you arrive. The delay lands on top of every journey, so it does not change the order of the airports; it does change the day. A Chambéry arrival to La Plagne that takes 1 h 41 midweek can approach 2 h 40 on a February Saturday — and a Geneva arrival to Val d’Isère, 3 h 14 midweek, can pass four hours. Our guide to [Saturday changeover day](/blog/saturday-changeover-day-alps-ski-transfer/) covers how to plan around it.",
    },
    {
      type: "paragraphe",
      texte:
        "Snow is the other variable, and it matters most on the final climbs. The climb from Bourg-Saint-Maurice is the part of the journey most sensitive to fresh snowfall, and after heavy falls the access to Tignes can close for short periods for preventive avalanche work. Your driver checks the state of the road before you land and plans around it.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter tyres or chains are compulsory in Savoie from 1 November to 31 March, and our vehicles carry both all season. The rules, and what they mean for a transfer, are set out in our guide to [snow chains and winter tyres in the Alps](/blog/snow-chains-winter-tyres-alps-rules/).",
    },

    { type: "titre2", texte: "What every transfer to these resorts includes" },
    {
      type: "liste",
      items: [
        "One fixed price for the whole vehicle, tolls and motorway fees included; it does not change with the number of passengers.",
        "Flight tracking: if your flight lands late, the pick-up moves with it, at no extra cost.",
        "One hour of waiting time at pick-up, counted from the actual landing time.",
        "Skis, snowboards and boot bags carried at no extra charge.",
        "Child and booster seats on request, fitted before the driver leaves for the airport.",
        "Drop-off at the exact address of your accommodation, whichever village it is in.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "On the return, we set the pick-up time in resort from your flight home, with the Saturday traffic in mind. If the time we suggest feels early, that is the reason: from Val d’Isère or Tignes, the valley road is the one part of the journey nobody can shorten.",
    },

    { type: "titre2", texte: "Which airport for which resort: the summary" },
    {
      type: "liste",
      items: [
        "La Plagne — Chambéry (1 h 41) on a weekend; Lyon (2 h 33) or Geneva (2 h 44) midweek; Grenoble (2 h 26) if Chambéry is full.",
        "Les Arcs — Chambéry (1 h 43) on a weekend; Grenoble (2 h 29) as the weekend alternative; Geneva (2 h 47) midweek.",
        "Val d’Isère — Chambéry (2 h 10) on a weekend; Lyon (3 h 02) or Geneva (3 h 14) midweek.",
        "Tignes — Grenoble (2 h 49) on a weekend; Geneva (3 h 07) midweek.",
        "More than eight people — several vehicles, one quote, planned to arrive together.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever airport you settle on, book the transfer when you book the flight. On the February Saturdays the vehicles run out before the beds do, and giving us the flight number at booking is what lets your driver follow the aircraft rather than the timetable.",
    },
  ],

  faq: [
    {
      question: "What is the closest airport to Tignes?",
      reponse:
        "Of the airports we run Tignes transfers from, Grenoble is the quickest: 208 km and about 2 h 49 without traffic, against 182 km and 3 h 07 from Geneva. Grenoble flies mainly at weekends in winter; Geneva flies every day.",
    },
    {
      question: "Which airport is nearest to Val d’Isère?",
      reponse:
        "Chambéry: 144 km and about 2 h 10 without traffic. Lyon is 222 km and 3 h 02, Geneva 183 km and 3 h 14. Chambéry flies mostly at weekends, so for a midweek arrival Lyon is the shorter alternative.",
    },
    {
      question: "What is the best airport for La Plagne?",
      reponse:
        "By drive time, Chambéry: 121 km and about 1 h 41. Grenoble takes 2 h 26, Lyon 2 h 33 and Geneva 2 h 44. The best choice also depends on which airport has a flight on your dates, and on your village, since La Plagne’s eleven villages are reached by three different roads.",
    },
    {
      question: "How long is the transfer from Geneva to Les Arcs?",
      reponse:
        "About 2 h 47 for 161 km on clear roads. On a February Saturday, allow 45 minutes to an hour more. From Chambéry, the same resort is 1 h 43 away.",
    },
    {
      question: "Can eight people with skis travel in one vehicle from Geneva to Tignes?",
      reponse:
        "Up to eight passengers fit in our Standard vehicle, with room for twelve pieces of luggage. Eight skiers with suitcases, ski carriers and boot bags often need more space than that, so tell us your luggage count when you book; above eight passengers, the party travels in several vehicles quoted as one journey.",
    },
    {
      question: "Is Lyon or Geneva better for Val d’Isère?",
      reponse:
        "Lyon is 12 minutes quicker on clear roads — 3 h 02 against 3 h 14 — even though it is 39 km further away. Both fly every day, so the choice usually comes down to the flight and the fare.",
    },
  ],
};
