import type { Article } from "./types";

/**
 * Genève ou Lyon pour les Trois Vallées.
 *
 * Toutes les distances et durées viennent de `src/data/distances.ts` (routage
 * OpenStreetMap, sans trafic). Les faits de station — altitudes, montée depuis
 * Moûtiers, villages de Courchevel — viennent des pages de station. Si la table
 * est recalculée, relire les chiffres : ils sont écrits en dur ici.
 *
 * Le constat qui fait l'article : Lyon est plus rapide que Genève vers les
 * quatre stations, de 11 à 12 minutes, alors qu'il est 39 km plus loin.
 */
export const genevaOrLyonThreeValleys: Article = {
  slug: "geneva-or-lyon-airport-three-valleys",
  titre: "Geneva or Lyon for the Three Valleys: which airport, for which village?",
  metaTitre: "Geneva or Lyon for the Three Valleys? Airport Guide",
  metaDescription:
    "Geneva or Lyon for Val Thorens, Courchevel, Méribel and Les Menuires? Real drive times, the Moûtiers bottleneck, Saturday traffic and how to pick a flight.",
  chapo:
    "Geneva is the airport most people book for the Three Valleys, and Lyon is the one that gets them there sooner. The difference is small on a clear road and disappears on a Saturday, which is why the real decision is about flights rather than kilometres. Here are the measured drive times from both airports to Val Thorens, Les Menuires, Méribel and Courchevel, what happens at Moûtiers, and how to choose.",
  visuel: { nom: "blog-geneva-or-lyon-three-valleys", alt: "Mountain road climbing out of a snowy Alpine valley towards the Three Valleys" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Lyon Saint-Exupéry is 11 to 12 minutes quicker than Geneva to each of the four main Three Valleys resorts on a clear road, although it is 39 km further away from each of them.",
    "Clear-road transfer times from Geneva airport: Méribel 2 h 25, Courchevel 2 h 32, Les Menuires 2 h 43, Val Thorens 2 h 44. From Lyon airport: Méribel 2 h 13, Courchevel 2 h 21, Les Menuires 2 h 32, Val Thorens 2 h 33.",
    "Every road to Val Thorens, Les Menuires, Méribel and Courchevel passes through Moûtiers, so Saturday changeover traffic between Albertville and Moûtiers adds 45 minutes to an hour whichever airport you fly into.",
    "Chambéry Savoie is the closest airport to the Three Valleys — Méribel 1 h 21, Courchevel 1 h 28, Les Menuires and Val Thorens 1 h 40 — but its winter flights are concentrated at weekends.",
    "Geneva’s real advantage for the Three Valleys is its timetable: flights every day of the week from most European cities.",
  ],

  stationsLiees: ["val-thorens", "les-menuires", "meribel", "courchevel"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "val-thorens" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "courchevel" },
    { airport: "lyon-airport", resort: "courchevel" },
    { airport: "geneva-airport", resort: "meribel" },
    { airport: "lyon-airport", resort: "meribel" },
    { airport: "geneva-airport", resort: "les-menuires" },
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "For the Three Valleys, Lyon is the quicker of the two airports on a clear road, even though it is further away. Méribel is 2 h 13 from Lyon against 2 h 25 from Geneva, Courchevel 2 h 21 against 2 h 32, Les Menuires 2 h 32 against 2 h 43, and Val Thorens 2 h 33 against 2 h 44. Lyon wins by eleven or twelve minutes every time, because more of its route is motorway. Geneva’s case is the flight: departures every day of the week from most European cities, and often the one that lands at a sensible hour. Both routes meet at Moûtiers, the bottleneck below all four resorts, so on a February Saturday either airport adds 45 minutes to an hour. Choose the flight that suits your dates; if fares and landing times are equal, take Lyon. And if Chambéry flies on your dates, it saves roughly an hour against Geneva and fifty minutes against Lyon.",
    },

    { type: "titre2", texte: "How long is the transfer from Geneva to the Three Valleys?" },
    {
      type: "paragraphe",
      texte:
        "The drive from Geneva airport crosses the Genevois countryside and joins the motorway towards Albertville, then follows the Tarentaise valley to Moûtiers. From Moûtiers each resort has its own climb. These are the times a driver holds on a clear weekday, measured on the road network rather than estimated:",
    },
    {
      type: "liste",
      items: [
        "Méribel — 142 km, about 2 h 25.",
        "Courchevel — 149 km, about 2 h 32.",
        "Les Menuires — 153 km, about 2 h 43.",
        "Val Thorens — 161 km, about 2 h 44.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Geneva airport has two exits: the Swiss sector, which handles almost every flight, and the French sector on the Ferney-Voltaire side. Your driver waits in arrivals with your name, on the side stated in your confirmation. The flight is tracked, so a late landing moves the pick-up rather than costing you the transfer, and waiting time is included.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva is the busiest gateway to the Alps, and for the northern French resorts — Chamonix, Morzine, Les Gets, the Aravis — it is the obvious choice at around an hour to an hour and a half. The Three Valleys are a different case. They sit much further south, and Geneva reaches them only after two and a half hours or more on the road.",
    },

    { type: "titre2", texte: "How long is the transfer from Lyon to the Three Valleys?" },
    {
      type: "paragraphe",
      texte:
        "Lyon Saint-Exupéry sits east of the city, and the motorway from it runs to Albertville without a detour. From there the route is the same as from Geneva: the Tarentaise valley to Moûtiers, then the climb. The clear-road times are:",
    },
    {
      type: "liste",
      items: [
        "Méribel — 181 km, about 2 h 13.",
        "Courchevel — 188 km, about 2 h 21.",
        "Les Menuires — 192 km, about 2 h 32.",
        "Val Thorens — 200 km, about 2 h 33.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The two terminals at Lyon share one arrivals area, where your driver waits with your name. The airport also has its own high-speed railway station, which is useful when part of a group is coming from Paris by train and the rest by air: everyone meets in the same place and travels up in the same vehicle.",
    },

    { type: "titre2", texte: "Why is Lyon quicker when it is further away?" },
    {
      type: "paragraphe",
      texte:
        "On the map, Geneva looks like the natural airport for Savoie, and in kilometres it is: each of the four resorts is exactly 39 km closer to Geneva than to Lyon. On the road the order reverses. The Lyon route is motorway for most of its length and holds a steady speed all the way to Albertville; the Geneva route spends its first stretch on slower roads before it reaches the same motorway network.",
    },
    {
      type: "liste",
      items: [
        "Méribel: Lyon 2 h 13, Geneva 2 h 25 — Lyon 12 minutes quicker.",
        "Courchevel: Lyon 2 h 21, Geneva 2 h 32 — Lyon 11 minutes quicker.",
        "Les Menuires: Lyon 2 h 32, Geneva 2 h 43 — Lyon 11 minutes quicker.",
        "Val Thorens: Lyon 2 h 33, Geneva 2 h 44 — Lyon 11 minutes quicker.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Eleven minutes is not a reason on its own to change a flight. What it does is remove the assumption that Geneva is the closer option. If the fares and landing times from the two airports are similar, Lyon gives you a slightly shorter transfer on a less crowded approach. If Geneva has the better flight, you lose very little by taking it.",
    },
    {
      type: "paragraphe",
      texte:
        "The comparison matters most in February. That is when Geneva fares tend to climb, and when a quick check of Lyon before booking the flight, rather than after, is most likely to pay.",
    },

    { type: "titre2", texte: "What is the Moûtiers bottleneck?" },
    {
      type: "paragraphe",
      texte:
        "Moûtiers is a small town at 480 m in the bottom of the Tarentaise, and every road to the Three Valleys goes through it. It does not matter whether you land at Geneva, Lyon, Chambéry or Grenoble: the last common stretch is the valley road from Albertville to Moûtiers, and from there the traffic splits between the side valleys that lead up to the resorts.",
    },
    {
      type: "liste",
      items: [
        "Val Thorens and Les Menuires share the Belleville valley road, through Saint-Martin-de-Belleville. Les Menuires, at 1,850 m, is 27 km of hairpins above Moûtiers; Val Thorens, at 2,300 m, is the end of the road, 37 km from Moûtiers.",
        "Méribel, at 1,450 m, has its own valley road climbing to the resort.",
        "Courchevel has its own road too, serving a set of villages named by altitude: Le Praz (1300), Courchevel 1550, Moriond (1650) and Courchevel 1850. The name of the village matters when you book, because they are not the same drop-off.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "This geography explains two things. First, it is why the airport choice makes less difference than people expect: after Albertville, everyone is on the same road. Second, it is why a busy day hits all four resorts at once. When the Albertville–Moûtiers section slows, there is no alternative route into the Three Valleys to take.",
    },
    {
      type: "paragraphe",
      texte:
        "The climbs above Moûtiers are well-maintained mountain roads, cleared and gritted through the season. Winter tyres and chains are legally required in Savoie from 1 November to 31 March, and our vehicles carry both. After heavy snowfall the access road to Val Thorens is occasionally closed for a short time for avalanche control; it is rare, and your driver will know about it before you do.",
    },
    {
      type: "paragraphe",
      texte:
        "Moûtiers is also the nearest railway station to all four resorts, with direct high-speed trains from Paris and London on winter Saturdays. If you arrive by train rather than by air, the transfer starts there and covers only the climb.",
    },

    { type: "titre2", texte: "How much longer does the transfer take on a Saturday?" },
    {
      type: "paragraphe",
      texte:
        "Saturday is changeover day across the Three Valleys. Tens of thousands of people arrive and leave on the same morning, through the same valley, and the Tarentaise slows to a crawl between Albertville and Moûtiers. On a busy February Saturday, plan on 45 minutes to an hour more than the clear-road figures above. For a Geneva transfer to Val Thorens, that means closer to 3 h 45 than 2 h 44.",
    },
    {
      type: "paragraphe",
      texte:
        "Because the queue forms after the Geneva and Lyon routes have merged, the airport you choose does not get you out of it. What changes the Saturday picture is the day itself. A Sunday or midweek arrival saves that hour on the way up and again on the way down, and flights and accommodation are often cheaper on those days too. For a group with flexible dates it is the single biggest time saving available on a Three Valleys trip.",
    },
    {
      type: "liste",
      items: [
        "Arriving on a Saturday: expect the valley to be slow, and do not plan anything in the resort for the first hour after your theoretical arrival time.",
        "Flying home on a Saturday: we set the departure from the resort so you reach the terminal with time in hand, not to the theoretical minimum.",
        "Arriving midweek: the clear-road times above are a realistic guide, weather permitting.",
        "Arriving after fresh snow: the climbs above Moûtiers are the slow part, chains or not, and they slow every vehicle on the road.",
      ],
    },

    { type: "titre2", texte: "Which airport is best for each Three Valleys resort?" },
    {
      type: "paragraphe",
      texte:
        "The order of the airports is the same for all four resorts: Chambéry first, then Grenoble, then Lyon, then Geneva. The gaps are what differ, and so do the practical details at the other end.",
    },
    { type: "titre3", texte: "Val Thorens" },
    {
      type: "paragraphe",
      texte:
        "Chambéry 122 km (1 h 40), Grenoble 188 km (2 h 26), Lyon 200 km (2 h 33), Geneva 161 km (2 h 44), and Turin 260 km (3 h 27) through the Fréjus tunnel. Val Thorens is the highest resort in Europe and the end of the Belleville valley road, so it is always the longest of the four transfers. Much of the resort centre is pedestrian: give us the name of your residence or hotel, not just the resort, so the drop-off is as close as the day’s access allows.",
    },
    { type: "titre3", texte: "Les Menuires" },
    {
      type: "paragraphe",
      texte:
        "Chambéry 114 km (1 h 40), Grenoble 180 km (2 h 25), Lyon 192 km (2 h 32), Geneva 153 km (2 h 43). Les Menuires is on the same road as Val Thorens, lower down, and almost every building is on the snow. Saint-Martin-de-Belleville, below it on the same road, is a common drop-off on the same transfer; say so when you book.",
    },
    { type: "titre3", texte: "Méribel" },
    {
      type: "paragraphe",
      texte:
        "Chambéry 103 km (1 h 21), Grenoble 169 km (2 h 07), Lyon 181 km (2 h 13), Geneva 142 km (2 h 25). Méribel is the quickest of the four to reach from every airport, which makes it the resort where Geneva looks most reasonable: under two and a half hours on a clear day.",
    },
    { type: "titre3", texte: "Courchevel" },
    {
      type: "paragraphe",
      texte:
        "Chambéry 110 km (1 h 28), Grenoble 175 km (2 h 14), Lyon 188 km (2 h 21), Geneva 149 km (2 h 32). The times are to the resort; Le Praz, 1550, Moriond and 1850 are separate villages at different altitudes, so tell us which one you are staying in and the address.",
    },

    { type: "titre2", texte: "Should you choose the airport or the flight?" },
    {
      type: "paragraphe",
      texte:
        "Between Geneva and Lyon the transfer gap is a dozen minutes. Between a morning landing and an evening one, the gap is an afternoon on the snow or a mountain climb in the dark. That is why, for the Three Valleys, the flight should decide the airport and not the other way round.",
    },
    {
      type: "liste",
      items: [
        "Day of the week. Geneva has flights every day from most European cities. Lyon flies all year with the widest choice of airlines in the region. Chambéry and Grenoble concentrate their winter flights on weekends.",
        "Landing time. A flight that lands early enough to reach the resort in daylight is worth more than a shorter transfer that starts at nightfall, particularly with children or after fresh snow.",
        "Fare. In February, Geneva fares tend to climb; compare Lyon before you book.",
        "How the group travels. If some of you come by train, Lyon’s own railway station and Moûtiers are both easy pick-up points.",
        "Group size. A private transfer is priced per vehicle, so the cost of the road is shared: for six people, a slightly longer route from a cheaper airport is often the better overall deal.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "A useful rule of thumb: if Chambéry has no flight on your dates, compare Lyon before you assume Geneva. And whichever you pick, book the transfer when you book the flight rather than the week before.",
    },

    { type: "titre2", texte: "What about Chambéry and Grenoble?" },
    {
      type: "paragraphe",
      texte:
        "Chambéry Savoie is the Tarentaise airport. It is closer than either Geneva or Lyon to every resort in the Three Valleys — Méribel 1 h 21, Courchevel 1 h 28, Les Menuires and Val Thorens 1 h 40 — which saves roughly an hour against Geneva and around fifty minutes against Lyon. The terminal is small with a single exit, and your driver waits there with your name. The limitation is the timetable: its winter programme is built around weekend flights from the UK and northern Europe, and midweek it often has nothing at all.",
    },
    {
      type: "paragraphe",
      texte:
        "Grenoble Alpes-Isère is the airport people forget for the Three Valleys, and it is quicker than both Geneva and Lyon to all four resorts: Méribel 2 h 07, Courchevel 2 h 14, Les Menuires 2 h 25, Val Thorens 2 h 26. Like Chambéry it lives on weekend charters, often at lower fares than Geneva. If you are flying Saturday to Saturday and Chambéry is full or expensive, Grenoble is worth checking before you default to Geneva.",
    },
    {
      type: "paragraphe",
      texte:
        "Turin is the fifth option for Val Thorens, at 3 h 27 through the Fréjus tunnel and down the Maurienne. It is the longest of the transfers, but it can be the cheapest way in from southern Europe.",
    },

    { type: "titre2", texte: "What should you tell us about luggage and skis?" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is your vehicle alone: it leaves when you land, goes straight to your accommodation, and its price is fixed per vehicle before you book, with tolls included. There are three categories. The Standard, a Volkswagen Transporter, takes up to 8 passengers; the Business, a Mercedes V-Class, up to 7; the Premium, a Mercedes E-Class saloon, up to 4.",
    },
    {
      type: "paragraphe",
      texte:
        "In winter the boot fills before the seats do. Eight passengers rarely travel with eight suitcases and eight pairs of skis in a vehicle built for eight, so tell us how many bags and ski or board carriers you are bringing, and anything bulky such as a boot bag each. Ski and snowboard bags travel free, and the count is what decides the category we send.",
    },
    {
      type: "paragraphe",
      texte:
        "Child and booster seats are free and fitted before we leave the airport, as French law requires an approved restraint for every child under 10. On a two-and-a-half-hour transfer ending in a mountain climb from Moûtiers, it is also worth telling the driver if anyone is prone to motion sickness: sitting in the front and a gentler pace through the bends both help.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Méribel — Chambéry 1 h 21, Grenoble 2 h 07, Lyon 2 h 13, Geneva 2 h 25.",
        "Courchevel — Chambéry 1 h 28, Grenoble 2 h 14, Lyon 2 h 21, Geneva 2 h 32.",
        "Les Menuires — Chambéry 1 h 40, Grenoble 2 h 25, Lyon 2 h 32, Geneva 2 h 43.",
        "Val Thorens — Chambéry 1 h 40, Grenoble 2 h 26, Lyon 2 h 33, Geneva 2 h 44.",
        "Geneva or Lyon: take the better flight; if they are equal, Lyon is eleven or twelve minutes quicker.",
        "Saturday: add 45 minutes to an hour whichever airport you choose, because every route goes through Moûtiers.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Book the transfer as soon as the flights are confirmed, and earlier still for the February half-term weeks and the Christmas and New Year Saturdays, when vehicles run out across the whole Tarentaise.",
    },
  ],

  faq: [
    {
      question: "Is Geneva or Lyon closer to Val Thorens?",
      reponse:
        "Geneva is closer in distance, 161 km against 200 km, but Lyon is quicker on the road: about 2 h 33 against 2 h 44 without traffic. Lyon’s route is motorway for more of its length. On a Saturday in high season, add 45 minutes to an hour to either.",
    },
    {
      question: "How long is the transfer from Geneva airport to Courchevel?",
      reponse:
        "About 2 h 32 for 149 km on a clear road. On a February Saturday, when the Tarentaise is busy between Albertville and Moûtiers, allow an hour more. Tell us which Courchevel village you are staying in, as they are separate drop-offs.",
    },
    {
      question: "Which Three Valleys resort is quickest to reach from the airport?",
      reponse:
        "Méribel, from every airport: 1 h 21 from Chambéry, 2 h 07 from Grenoble, 2 h 13 from Lyon and 2 h 25 from Geneva. Val Thorens, at the end of the Belleville valley road, is always the longest of the four.",
    },
    {
      question: "Does every transfer to the Three Valleys go through Moûtiers?",
      reponse:
        "Yes. Whether you land at Geneva, Lyon, Chambéry or Grenoble, the route follows the Tarentaise valley from Albertville to Moûtiers, then climbs to the resort. That shared stretch is why Saturday traffic affects every airport equally.",
    },
    {
      question: "Which airport should I choose for a midweek arrival in the Three Valleys?",
      reponse:
        "Geneva or Lyon. Both have flights through the week, while Chambéry and Grenoble concentrate their winter flights on weekends. Lyon is slightly quicker on the road; Geneva usually has more departures.",
    },
    {
      question: "Can you pick us up at Moûtiers railway station instead of an airport?",
      reponse:
        "Yes. Moûtiers is the nearest station to all four resorts, with direct high-speed trains from Paris and London on winter Saturdays. Give us your train details and we quote the climb to your accommodation.",
    },
  ],
};
