import type { Article } from "./types";

/**
 * Chambéry : l'aéroport de la Tarentaise, et quand ses vols du samedi valent le coup.
 *
 * Toutes les distances et durées viennent de `src/data/distances.ts` (routage
 * OpenStreetMap, temps sans trafic). Le fonctionnement de l'aéroport — programme
 * d'hiver concentré le week-end, charters et low-cost du Royaume-Uni et d'Europe
 * du Nord, petit terminal à une sortie — vient de `src/lib/airports/contenus.ts`
 * et de la page Val Thorens. Si la table des distances est recalculée, relire les
 * chiffres : ils sont écrits en dur ici.
 */
export const chamberyAirportSkiTransfers: Article = {
  slug: "chambery-airport-ski-resorts-saturday-flights",
  titre: "Chambéry airport: when the Saturday flights make sense",
  metaTitre: "Chambéry Airport Ski Transfers: Resorts and Fallbacks",
  metaDescription:
    "Which resorts Chambéry airport is closest to, how its weekend winter flights work, and when Lyon or Geneva is the better choice. Real drive times.",
  chapo:
    "Chambéry is the airport most skiers bound for the Three Valleys should look at first, and the one that most often has no flight on their dates. Here is what it is closest to, measured on the road network, how a weekend-only winter airport shapes your week, and when Lyon or Geneva is simply the better answer.",
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",
  visuel: { nom: "blog-chambery-airport-ski-resorts", alt: "A plane descending over an Alpine lake between snowy mountains" },

  aRetenir: [
    "Chambéry Savoie is the closest airport to the Three Valleys: Méribel is 103 km away (about 1 h 21 without traffic), Courchevel 110 km (1 h 28), Val Thorens 122 km (1 h 40).",
    "For the Tarentaise, a Chambéry arrival saves just over an hour each way against Geneva and about 50 minutes against Lyon, on clear-road times.",
    "Chambéry’s winter timetable is concentrated at weekends, built around charter and low-cost flights from the UK and northern Europe; midweek it often has no flight at all.",
    "When Chambéry does not fly your dates, Lyon is the better fallback for the Tarentaise (Val Thorens 2 h 33) and Geneva for the northern resorts (Chamonix 1 h 25).",
    "On a February Saturday, add 45 minutes to an hour to any Tarentaise transfer, whichever airport you land at.",
  ],

  stationsLiees: [
    "meribel",
    "courchevel",
    "val-thorens",
    "les-menuires",
    "la-plagne",
    "les-arcs",
    "tignes",
    "val-disere",
    "megeve",
    "la-clusaz",
    "le-grand-bornand",
    "alpe-dhuez",
    "chamonix",
  ],

  trajetsLies: [
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
    { airport: "chambery-savoie-airport", resort: "meribel" },
    { airport: "chambery-savoie-airport", resort: "courchevel" },
    { airport: "chambery-savoie-airport", resort: "val-disere" },
    { airport: "chambery-savoie-airport", resort: "megeve" },
    { airport: "chambery-savoie-airport", resort: "la-clusaz" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "val-thorens" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Chambéry Savoie Mont-Blanc is the closest airport to the Tarentaise and the Three Valleys, and for a Saturday-to-Saturday week it is usually the best arrival in the French Alps. Méribel is 103 km away, about 1 h 21 on a clear road; Courchevel 110 km (1 h 28); Val Thorens and Les Menuires 1 h 40; La Plagne and Les Arcs just over 1 h 40; Tignes 2 h 03 and Val d’Isère 2 h 10. That is about fifty minutes less than from Lyon and just over an hour less than from Geneva, each way. The catch is the timetable. Chambéry’s winter traffic is built around weekend charter and low-cost flights from the UK and northern Europe, and midweek it often has nothing at all. If your dates match a Chambéry flight, take it. If they do not, compare Lyon for the Tarentaise and Geneva for the northern resorts before you book anything else.",
    },
    {
      type: "paragraphe",
      texte:
        "Every figure in this article comes from the road network rather than from a straight line on a map, and every one is a clear-road time — the time a driver holds on a quiet weekday. Saturdays are a separate subject, and they have their own section below, because Chambéry is a Saturday airport and the Tarentaise is a Saturday valley.",
    },

    { type: "titre2", texte: "Where Chambéry airport is, and why the position matters" },
    {
      type: "paragraphe",
      texte:
        "The airport sits at the southern end of the Lac du Bourget, a few kilometres north of Chambéry itself, on the motorway that links Lyon, Annecy and Geneva to the Savoie valleys. That position is the whole of its advantage. From the terminal, the motorway runs east to Albertville, where the Tarentaise begins, and the valley road carries on to Moûtiers — the junction at the bottom of the Three Valleys — and then Bourg-Saint-Maurice for Les Arcs, Tignes and Val d’Isère.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva and Lyon both have to reach that same motorway before they can start up the same valley, which is why the gap between them and Chambéry is almost identical for every Tarentaise resort. It is not a question of one resort being better placed than another: it is a fixed head start of roughly an hour over Geneva and fifty minutes over Lyon, and it applies to the whole valley.",
    },
    {
      type: "paragraphe",
      texte:
        "The airport is small. There is one terminal and one exit, and your driver waits there with your name. On a busy Saturday the baggage hall can take a while to empty, which is worth knowing when you plan the afternoon: one hour of waiting time is included in every transfer we run, and the flight is tracked, so a late landing moves the pick-up rather than eating into that hour.",
    },

    { type: "titre2", texte: "Which ski resorts is Chambéry airport closest to?" },
    {
      type: "paragraphe",
      texte:
        "The honest answer is: more than people expect. Chambéry is the Tarentaise airport, but it sits close enough to the Aravis and the Val d’Arly that it matches Geneva for several northern resorts too. Here are the drive times from Chambéry, shortest first, for the resorts where it is a serious option.",
    },
    {
      type: "liste",
      items: [
        "La Clusaz and Le Grand-Bornand — 83 km, about 1 h 11.",
        "Chamrousse — 89 km, about 1 h 17.",
        "Megève — 94 km, about 1 h 18.",
        "Méribel — 103 km, about 1 h 21.",
        "Courchevel — 110 km, about 1 h 28.",
        "Saint-Gervais — 104 km, about 1 h 29.",
        "Les Menuires — 114 km, about 1 h 40.",
        "Val Thorens — 122 km, about 1 h 40.",
        "Chamonix — 140 km, about 1 h 40.",
        "La Plagne — 121 km, about 1 h 41.",
        "Les Arcs — 122 km, about 1 h 43.",
        "Alpe d’Huez — 131 km, about 1 h 55.",
        "Tignes — 142 km, about 2 h 03.",
        "Val d’Isère — 144 km, about 2 h 10.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Two things stand out. The first is how compact the Tarentaise block is: from Méribel to Les Arcs, six of the biggest ski areas in France sit between 1 h 21 and 1 h 43 from one small airport. The second is that the last stretch, not the motorway, decides the order. Les Menuires is closer than Val Thorens in kilometres and takes the same time, because both share the climb from Moûtiers; Courchevel is further than Méribel and only seven minutes slower.",
    },

    { type: "titre2", texte: "How much time does Chambéry save over Geneva, Lyon and Grenoble?" },
    {
      type: "paragraphe",
      texte:
        "For the Tarentaise, the comparison is almost mechanical. Below are the clear-road times from the four airports that realistically serve the valley — Chambéry, Grenoble, Lyon and Geneva, in that order.",
    },
    {
      type: "liste",
      items: [
        "Méribel — 1 h 21 from Chambéry, 2 h 07 from Grenoble, 2 h 13 from Lyon, 2 h 25 from Geneva.",
        "Courchevel — 1 h 28, 2 h 14, 2 h 21, 2 h 32.",
        "Les Menuires — 1 h 40, 2 h 25, 2 h 32, 2 h 43.",
        "Val Thorens — 1 h 40, 2 h 26, 2 h 33, 2 h 44.",
        "La Plagne — 1 h 41, 2 h 26, 2 h 33, 2 h 44.",
        "Les Arcs — 1 h 43, 2 h 29, 2 h 36, 2 h 47.",
        "Tignes — 2 h 03, 2 h 49, 2 h 56, 3 h 07.",
        "Val d’Isère — 2 h 10, 2 h 56, 3 h 02, 3 h 14.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Read down the columns and the pattern is the same on every line: Grenoble is about 45 minutes behind Chambéry, Lyon about 50, Geneva about an hour and four minutes. Over a return trip, that is more than two hours in a vehicle saved by choosing Chambéry over Geneva — the better part of an afternoon on the snow on arrival day, and a later start to the journey home.",
    },
    {
      type: "paragraphe",
      texte:
        "The line that surprises people is Grenoble. It is slightly quicker than Lyon to every resort in the Three Valleys and the Tarentaise, and it runs the same kind of weekend winter programme as Chambéry, often at lower fares than Geneva. If Chambéry is full on your Saturday, check Grenoble before assuming the big airports are the only alternative.",
    },

    { type: "titre2", texte: "How does a weekend-only winter airport actually work?" },
    {
      type: "paragraphe",
      texte:
        "Chambéry is a seasonal airport. Its winter traffic is built around the ski season and concentrated at weekends, with charter and low-cost flights from the UK and northern Europe feeding the resorts of the Savoie. A large part of that traffic fits into a handful of Saturday rotations: aircraft land, the week’s skiers leave, the next week’s arrive, and the aircraft go home.",
    },
    {
      type: "paragraphe",
      texte:
        "That model has direct consequences for how you plan the trip.",
    },
    {
      type: "liste",
      items: [
        "The flight sets the shape of your week. A Chambéry holiday is almost always Saturday to Saturday, or at best a weekend to a weekend. If you want five nights from a Wednesday, the airport is unlikely to help.",
        "Accommodation usually matches. Many chalets and residences in the Tarentaise change over on Saturdays for exactly this reason, so a Chambéry flight and a Saturday check-in tend to fit together naturally.",
        "Availability comes in blocks. Seats are sold on a small number of flights rather than spread across the week, so the popular weeks — Christmas, New Year, the February holidays — fill early.",
        "Changes are harder. If your flight is cancelled or you need to move your dates, the next Chambéry flight on your route may be a week away. Lyon and Geneva, which fly every day, become the practical fallback.",
        "The airport is at its busiest when you use it. Saturday is the day the terminal, the baggage hall and the valley roads all work at full capacity at the same time.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "None of this is a reason to avoid Chambéry. It is a reason to decide the airport first and the dates second, rather than the other way round. If you are free to travel on a Saturday and a flight exists from your city, Chambéry will get you to the Tarentaise faster than anything else. If your dates are fixed midweek, it will probably not be on the list.",
    },

    { type: "titre2", texte: "The Saturday traffic: what a Chambéry arrival really takes" },
    {
      type: "paragraphe",
      texte:
        "Every time quoted above is a clear-road time, and Saturday in February is not a clear road. The whole of the Tarentaise changes over on the same morning, and the valley between Albertville and Moûtiers — the stretch every Three Valleys transfer uses, whichever airport it comes from — slows badly. On those days, add 45 minutes to an hour.",
    },
    {
      type: "paragraphe",
      texte:
        "The important point is that the delay applies to everyone. A Saturday transfer from Chambéry to Val Thorens that takes 1 h 40 on a quiet day may take closer to 2 h 40; the same transfer from Geneva, 2 h 44 on a quiet day, can approach 3 h 45. The traffic does not erase Chambéry’s advantage — it lands on top of both journeys, and the hour saved on the motorway is still an hour saved.",
    },
    {
      type: "paragraphe",
      texte:
        "The return is the mirror image. The Saturday that brings the new week up the valley takes the previous week down it, and a morning flight home from Chambéry means sharing the road with every other departing guest. When you give us your return flight, we set the pick-up in resort from it with that in mind; if you are asked to leave earlier than feels necessary, that is the reason.",
    },
    {
      type: "paragraphe",
      texte:
        "Winter conditions are the other variable. Winter tyres or chains are legally required in Savoie from 1 November to 31 March, and our vehicles carry both. Snowfall on the climbs from Moûtiers or Bourg-Saint-Maurice slows every vehicle on the road, with or without chains, and it is the one factor no choice of airport can remove.",
    },

    { type: "titre2", texte: "Is Chambéry also worth it for Megève, the Aravis or Chamonix?" },
    {
      type: "paragraphe",
      texte:
        "More often than its reputation suggests. Geneva is the natural airport for the northern French Alps, but Chambéry reaches several of those resorts in almost exactly the same time, by a different road — south of Annecy and up the Val d’Arly rather than along the Arve valley.",
    },
    {
      type: "liste",
      items: [
        "Megève — 1 h 18 from Chambéry, 1 h 22 from Geneva. Chambéry is marginally quicker.",
        "La Clusaz — 1 h 11 from Chambéry, 1 h 12 from Geneva. A tie.",
        "Le Grand-Bornand — 1 h 11 from Chambéry, 1 h 10 from Geneva. A tie.",
        "Saint-Gervais — 1 h 29 from Chambéry, 1 h 16 from Geneva.",
        "Chamonix — 1 h 40 from Chambéry, 1 h 25 from Geneva.",
        "Les Gets — 1 h 34 from Chambéry, 1 h 19 from Geneva.",
        "Morzine — 1 h 44 from Chambéry, 1 h 29 from Geneva.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For Megève and the Aravis, then, the choice between the two airports is purely a matter of flights and fares: the drive is the same. For Chamonix and the Portes du Soleil, Chambéry costs about a quarter of an hour more each way. That is a small price if the Saturday charter from your city lands at a better hour or for a lower fare than the Geneva flights — and a real one if you are travelling with young children who have already been up since dawn.",
    },

    { type: "titre2", texte: "What about the Oisans and the Italian side?" },
    {
      type: "paragraphe",
      texte:
        "Chambéry is not the airport for the Oisans, but it is not far off. Alpe d’Huez is 1 h 55 away and Les Deux Alpes 1 h 59, against 1 h 38 and 1 h 42 from Grenoble, and 2 h 10 and 2 h 14 from Lyon. If a Chambéry flight suits you far better than anything into Grenoble, the extra seventeen minutes are easy to accept; otherwise Grenoble is the natural choice for those two resorts.",
    },
    {
      type: "paragraphe",
      texte:
        "There is also a less obvious use. Chambéry lies at the start of the motorway that climbs the Maurienne to the Fréjus tunnel, and from there the Italian resorts of the Susa valley are within reach: Sauze d’Oulx is 142 km and about 1 h 53 away. Tunnel and motorway tolls are included in the price we quote. For a group already flying into Chambéry for the Savoie, it is a route worth knowing about.",
    },
    {
      type: "paragraphe",
      texte:
        "What Chambéry does not suit is the far south. Serre Chevalier is 2 h 51 away over the Col du Lautaret, and Turin, through the Fréjus, is the better airport for it.",
    },

    { type: "titre2", texte: "When is Lyon the better fallback?" },
    {
      type: "paragraphe",
      texte:
        "Lyon Saint-Exupéry is the airport that flies all year: the widest choice of airlines in the region, midweek flights as a matter of course, and a motorway that runs to Albertville without a detour. When Chambéry has no flight on your dates, Lyon is usually the first alternative to check for the Tarentaise.",
    },
    {
      type: "liste",
      items: [
        "Midweek arrivals. If you land on a Tuesday or a Thursday, Chambéry will very rarely be an option; Lyon will.",
        "The Three Valleys and the Tarentaise. Lyon is about eleven minutes quicker than Geneva to every resort in the valley — 2 h 13 against 2 h 25 to Méribel, 2 h 33 against 2 h 44 to Val Thorens.",
        "The Oisans. Lyon reaches Alpe d’Huez in 2 h 10, against three hours from Geneva.",
        "Price-driven February trips. When Geneva fares climb in the school holidays, Lyon is frequently the cheaper arrival.",
        "Mixed parties. The airport has its own high-speed rail station, which is useful when part of the group arrives from Paris by train.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The cost of Lyon is fifty minutes more in the vehicle than from Chambéry for a Tarentaise resort, each way. On a quiet midweek arrival, with no Saturday queue in the valley, a Lyon transfer to Méribel can take about the same time as a Saturday transfer from Chambéry. That is worth weighing honestly: the fastest airport on paper is not always the fastest journey on the day.",
    },

    { type: "titre2", texte: "When is Geneva the better fallback?" },
    {
      type: "paragraphe",
      texte:
        "Geneva flies every day of the week from most European cities, and for the northern French Alps it is simply the right airport. If your resort is Chamonix, Les Gets, Morzine, Samoëns or Flaine, Geneva saves around a quarter of an hour on Chambéry and flies on whatever day you choose.",
    },
    {
      type: "paragraphe",
      texte:
        "For the Tarentaise, Geneva is the fallback of last resort rather than first. It is the slowest of the four airports to every resort in the valley — 2 h 25 to Méribel, 2 h 44 to Val Thorens, 3 h 07 to Tignes — and on a Saturday its transfers join the same Albertville-to-Moûtiers queue after a longer run to reach it. It makes sense when it is the only airport with a direct flight from your city, when the fare difference is large, or when your party is already combining a Tarentaise week with a few days somewhere nearer Geneva.",
    },
    {
      type: "paragraphe",
      texte:
        "A private transfer is priced per vehicle rather than per seat, so the drive is only part of the calculation. A family or a group of six pays for one vehicle whichever airport it uses, and a longer transfer costs more than a shorter one. The sensible sum is the whole one — flights for everyone, plus one transfer each way — and the price of each transfer is shown before you book, so the comparison can be done before anything is paid.",
    },

    { type: "titre2", texte: "Choosing in thirty seconds" },
    {
      type: "liste",
      items: [
        "Three Valleys or Tarentaise, Saturday to Saturday, and a flight exists from your city: Chambéry, without hesitation.",
        "Same resorts, Chambéry full or too expensive on your Saturday: check Grenoble next, then Lyon.",
        "Same resorts, midweek dates: Lyon first, Geneva if the flights demand it.",
        "Megève, La Clusaz or Le Grand-Bornand: Chambéry or Geneva, whichever flight suits — the drive is the same.",
        "Chamonix, Les Gets, Morzine, Flaine, Samoëns: Geneva, unless a Chambéry Saturday flight is clearly better for your party.",
        "Alpe d’Huez and Les Deux Alpes: Grenoble, with Chambéry a close second.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever airport you settle on, book the transfer when you book the flight. On the February Saturdays, when Chambéry is at its busiest, the vehicles run out before the beds do — and giving us the flight number at booking is what lets your driver follow the aircraft rather than the timetable.",
    },
  ],

  faq: [
    {
      question: "Which ski resorts are closest to Chambéry airport?",
      reponse:
        "La Clusaz and Le Grand-Bornand (83 km, about 1 h 11), Megève (1 h 18) and Méribel (103 km, 1 h 21), then Courchevel (1 h 28), Les Menuires and Val Thorens (1 h 40), La Plagne and Les Arcs (just over 1 h 40). Times are without traffic.",
    },
    {
      question: "Does Chambéry airport have flights midweek in winter?",
      reponse:
        "Very few. Its winter timetable is concentrated at weekends, with charter and low-cost flights from the UK and northern Europe. For a midweek arrival, Lyon and Geneva, which fly every day, are the alternatives.",
    },
    {
      question: "Is Chambéry or Geneva better for Val Thorens?",
      reponse:
        "Chambéry, on drive time: 122 km and about 1 h 40, against 161 km and 2 h 44 from Geneva. Geneva makes sense only when Chambéry has no suitable flight on your dates.",
    },
    {
      question: "Is Lyon quicker than Geneva for the Three Valleys?",
      reponse:
        "Yes, by about eleven minutes to every resort in the valley: 2 h 13 against 2 h 25 to Méribel, 2 h 33 against 2 h 44 to Val Thorens, on clear roads. Lyon also flies all year and midweek.",
    },
    {
      question: "How much longer does a Saturday transfer from Chambéry take?",
      reponse:
        "Allow 45 minutes to an hour more in February, when the whole Tarentaise changes over and the valley between Albertville and Moûtiers slows. The same delay applies to transfers from Geneva and Lyon.",
    },
    {
      question: "What happens if my Chambéry flight lands late?",
      reponse:
        "Your driver tracks the flight and the pick-up moves with it, at no extra cost. One hour of waiting is included, counted from the actual landing time.",
    },
  ],
};
