import type { Article } from "./types";

/**
 * Grenoble pour l'Alpe d'Huez, Les Deux Alpes et Chamrousse, comparé à Lyon,
 * Chambéry et Genève.
 *
 * Distances et durées : `src/data/distances.ts` (routage OpenStreetMap, sans
 * trafic). Les faits de station — altitudes, lacets, Lautaret, trois centres de
 * Chamrousse — viennent des pages de station et des hubs d'aéroport. Si la
 * table est recalculée, relire les chiffres.
 */
export const grenobleAirportSkiResorts: Article = {
  slug: "grenoble-airport-ski-transfers-alpe-dhuez-les-deux-alpes",
  titre: "Grenoble airport for Alpe d’Huez, Les Deux Alpes and Chamrousse",
  metaTitre: "Grenoble Airport to Alpe d’Huez and Les Deux Alpes",
  metaDescription:
    "Grenoble, Lyon, Chambéry or Geneva for Alpe d’Huez, Les Deux Alpes and Chamrousse? Real drive times, the Oisans climbs, and how to choose your flight.",
  chapo:
    "Grenoble Alpes-Isère is a small airport with one clear purpose in winter: it is the closest to the Oisans and to Chamrousse. It is also the one with the thinnest midweek timetable, which is why so many skiers bound for Alpe d’Huez and Les Deux Alpes end up flying into Lyon or Geneva instead. Here are the measured drive times from all four airports, what each extra half-hour or hour buys you, and how to decide.",
  visuel: { nom: "blog-grenoble-airport-ski-resorts", alt: "Hairpin bends climbing a snowy mountainside in winter sunshine" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Grenoble Alpes-Isère is the closest airport to Chamrousse (78 km, about 1 h 11), Alpe d’Huez (106 km, 1 h 38) and Les Deux Alpes (110 km, 1 h 42).",
    "Lyon Saint-Exupéry adds about half an hour to each of these transfers — Chamrousse 1 h 42, Alpe d’Huez 2 h 10, Les Deux Alpes 2 h 14 — but has flights all week, all year.",
    "From Geneva airport, Alpe d’Huez is 216 km and about 3 h 00, and Les Deux Alpes 220 km and 3 h 04: some 1 h 20 more than from Grenoble.",
    "Chambéry Savoie is the second-closest airport to the Oisans and Chamrousse: 1 h 17 to Chamrousse, 1 h 55 to Alpe d’Huez and 1 h 59 to Les Deux Alpes.",
    "Grenoble’s winter timetable is built on weekend charters, often cheaper than Geneva fares, so it suits Saturday-to-Saturday ski weeks best.",
  ],

  stationsLiees: ["alpe-dhuez", "les-deux-alpes", "chamrousse", "serre-chevalier", "montgenevre"],

  trajetsLies: [
    { airport: "grenoble-isere-airport", resort: "alpe-dhuez" },
    { airport: "grenoble-isere-airport", resort: "les-deux-alpes" },
    { airport: "grenoble-isere-airport", resort: "chamrousse" },
    { airport: "lyon-airport", resort: "alpe-dhuez" },
    { airport: "lyon-airport", resort: "les-deux-alpes" },
    { airport: "lyon-airport", resort: "chamrousse" },
    { airport: "geneva-airport", resort: "alpe-dhuez" },
    { airport: "geneva-airport", resort: "les-deux-alpes" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Grenoble Alpes-Isère is the closest airport to the Oisans and to Chamrousse. Chamrousse is 78 km away, about 1 h 11 on a clear road; Alpe d’Huez 106 km (1 h 38); Les Deux Alpes 110 km (1 h 42). Lyon Saint-Exupéry adds about half an hour to each — 1 h 42, 2 h 10 and 2 h 14 — and Geneva adds well over an hour: Chamrousse is 2 h 22 from there, Alpe d’Huez 3 h 00 and Les Deux Alpes 3 h 04. Chambéry sits in between, at 1 h 17, 1 h 55 and 1 h 59. The catch with Grenoble is its timetable: like Chambéry, it lives mainly on weekend charters in winter. So the practical rule is simple. If Grenoble has a flight on your dates, take it. If it does not, Lyon, with flights all week and all year, is the next best, and Geneva is worth it only when its flight is clearly the better one.",
    },

    { type: "titre2", texte: "What does Grenoble airport serve in winter?" },
    {
      type: "paragraphe",
      texte:
        "Grenoble Alpes-Isère is a one-terminal airport whose winter traffic is built around weekend charters from the UK, the Netherlands and Scandinavia. Its fares usually undercut Geneva’s, and its position makes it the natural gateway to the resorts south and east of Grenoble. On a clear road:",
    },
    {
      type: "liste",
      items: [
        "Chamrousse — 78 km, about 1 h 11. Grenoble’s own mountain, on the Belledonne range.",
        "Alpe d’Huez — 106 km, about 1 h 38.",
        "Les Deux Alpes — 110 km, about 1 h 42.",
        "Montgenèvre — 170 km, about 2 h 40, over the Col du Lautaret.",
        "Serre Chevalier — 155 km, about 2 h 57, over the Col du Lautaret.",
        "The Three Valleys, further north — Méribel 2 h 07, Courchevel 2 h 14, Val Thorens 2 h 26.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Arriving is simple: one terminal, one exit, and your driver waits there with your name. On charter Saturdays the airport fills in a rush, which is why your flight is tracked and waiting time is included.",
    },

    { type: "titre2", texte: "How long is the transfer from Grenoble to Alpe d’Huez and Les Deux Alpes?" },
    {
      type: "paragraphe",
      texte:
        "Alpe d’Huez and Les Deux Alpes are neighbours in the Oisans, reached by the same valley road east of Grenoble, and the two transfers are within four minutes of each other: 106 km and about 1 h 38 to Alpe d’Huez, 110 km and about 1 h 42 to Les Deux Alpes. The first part of the drive is quick. The last part — the climb to the resort — is where the time is spent, and that section does not get faster whatever the traffic below.",
    },
    { type: "titre3", texte: "Alpe d’Huez" },
    {
      type: "paragraphe",
      texte:
        "The resort sits at 1,860 m above Le Bourg-d’Oisans, and the road up to it is the one cyclists know: 21 hairpins climbing from the valley floor. It is a well-maintained road cleared through the season, but in fresh snow every vehicle on it slows down. Alpe d’Huez is part of a ski area of around 250 km of piste, with the Sarenne, one of the longest runs in the world at over 16 km.",
    },
    { type: "titre3", texte: "Les Deux Alpes" },
    {
      type: "paragraphe",
      texte:
        "The resort sits at 1,650 m, with skiing up to 3,600 m on the Mont-de-Lans glacier and over 200 km of piste. Its road leaves the same valley further up and climbs to the resort. Because the two resorts are so close in transfer time, a group split between them — or planning a day in the other resort — has the same choice of airport either way.",
    },

    { type: "titre2", texte: "How long is the transfer from Grenoble airport to Chamrousse?" },
    {
      type: "paragraphe",
      texte:
        "About 1 h 11 for 78 km, the shortest transfer of the three. The drive runs to Grenoble and then climbs about 1,400 m in 30 km, through Uriage-les-Bains and a long series of forest hairpins, to the resort on a shoulder of the Belledonne. It is a well-maintained departmental road, cleared and gritted daily, but a genuine mountain climb, and slow in fresh snow.",
    },
    {
      type: "paragraphe",
      texte:
        "Chamrousse held the alpine events of the 1968 Grenoble Winter Olympics, and it is laid out in three centres: Recoin at 1,650 m, Roche-Béranger at 1,750 m and Le Bachat between them. They share one lift pass but not one drop-off point, so give us the exact address when you book. The ski area itself is compact, around 90 km of piste topping out at 2,250 m at the Croix de Chamrousse, with views across Grenoble to the Vercors and the Chartreuse — small beside the Oisans giants, and the reason a short break works so well here.",
    },
    {
      type: "paragraphe",
      texte:
        "Its traffic pattern is different from the big Oisans resorts. Because it is the city’s local mountain, the pinch is on Saturday and Sunday mornings with day visitors from Grenoble, rather than a single weekly changeover, and the resort is noticeably quieter midweek. Chambéry is almost as quick as Grenoble for Chamrousse — 89 km and 1 h 17, only six minutes more — which gives you two weekend airports to compare instead of one.",
    },

    { type: "titre2", texte: "Grenoble or Lyon: which is better for the Oisans?" },
    {
      type: "paragraphe",
      texte:
        "Grenoble is closer to all three resorts by roughly half an hour. Lyon has the better timetable. The difference in road time is consistent:",
    },
    {
      type: "liste",
      items: [
        "Chamrousse — Grenoble 1 h 11, Lyon 1 h 42 (126 km).",
        "Alpe d’Huez — Grenoble 1 h 38, Lyon 2 h 10 (155 km).",
        "Les Deux Alpes — Grenoble 1 h 42, Lyon 2 h 14 (158 km).",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Lyon Saint-Exupéry flies all year, with the widest choice of airlines in the region and flights through the week. For a Wednesday arrival, a Thursday flight home or a week that does not run Saturday to Saturday, it is usually the practical answer, and half an hour is a small price for it. Lyon also has its own high-speed railway station, and its two terminals share one arrivals area where your driver waits with your name.",
    },
    {
      type: "paragraphe",
      texte:
        "If both airports fly your dates, compare the landing times before the fares. A Grenoble flight that lands late in the evening puts you on the 21 hairpins in the dark; a Lyon flight that lands at lunchtime has you in the resort for the afternoon. The half-hour on the road matters less than the hour of the day.",
    },

    { type: "titre2", texte: "Is Geneva a sensible airport for Alpe d’Huez and Les Deux Alpes?" },
    {
      type: "paragraphe",
      texte:
        "Only when its flight is decisive. Alpe d’Huez is 216 km and about 3 h 00 from Geneva, Les Deux Alpes 220 km and about 3 h 04, and Chamrousse 174 km and about 2 h 22. That is some 1 h 20 more than from Grenoble for the two Oisans resorts, and around fifty minutes more than from Lyon.",
    },
    {
      type: "paragraphe",
      texte:
        "Geneva’s strength is its schedule: flights every day of the week from most European cities. If it offers the only direct flight from your home airport, or lands several hours earlier than the alternatives, it can still be the better day overall. Otherwise, for the Oisans, Geneva is the long way round. It is the right airport for Chamonix, the Portes du Soleil and the Aravis, which are an hour or so away, and the wrong one for resorts this far south.",
    },
    {
      type: "paragraphe",
      texte:
        "A Geneva transfer to the Oisans crosses the border from Switzerland into France. There is nothing for you to arrange: our vehicles carry what each country requires in winter, and the crossing rarely costs more than a few minutes. Carry identification all the same.",
    },

    { type: "titre2", texte: "What about Chambéry?" },
    {
      type: "paragraphe",
      texte:
        "Chambéry Savoie is the second-closest airport to all three resorts: Chamrousse 89 km (1 h 17), Alpe d’Huez 131 km (1 h 55), Les Deux Alpes 135 km (1 h 59). Like Grenoble, it concentrates its winter flights on weekends, so it is not a midweek solution. What it offers is a second set of Saturday charters. If Grenoble has no seat on your flight, or a fare that has climbed, Chambéry is seventeen minutes further from the Oisans and six minutes further from Chamrousse, and still well ahead of Lyon and Geneva.",
    },

    { type: "titre2", texte: "What are the Oisans roads like in winter?" },
    {
      type: "paragraphe",
      texte:
        "Every time in this article is a clear-road figure, and three things lengthen it: snow, chain controls and Saturday. Winter tyres and chains are legally required in Isère from 1 November to 31 March, and our vehicles carry both all season.",
    },
    {
      type: "liste",
      items: [
        "Saturday is changeover day across the Alps, and in February it can add an hour to the transfer, whichever airport you fly into.",
        "Fresh snow slows the climbs — the 21 hairpins to Alpe d’Huez, the road up to Les Deux Alpes, the 30 km from the valley to Chamrousse — more than anything on the motorway.",
        "Chamrousse’s busy mornings are Saturday and Sunday, with day visitors from Grenoble.",
        "Flying home, we set the departure from the resort so you reach the terminal with time in hand, not to the theoretical minimum.",
      ],
    },

    { type: "titre2", texte: "Can you fly into Grenoble for Serre Chevalier or Montgenèvre?" },
    {
      type: "paragraphe",
      texte:
        "You can, but Turin is usually quicker. From Grenoble the road to both resorts crosses the Col du Lautaret at 2,058 m: Serre Chevalier is 155 km and about 2 h 57, Montgenèvre 170 km and about 2 h 40. The Lautaret is kept open through the winter, but it closes for a few hours at a time for heavy snow or avalanche control, and the detour is long.",
    },
    {
      type: "paragraphe",
      texte:
        "Turin avoids the pass altogether: Serre Chevalier is about 2 h 45 from there and Montgenèvre about 1 h 40. Lyon is slower still for Serre Chevalier, at 3 h 29. If your dates match a Grenoble charter and not a Turin flight, Grenoble remains a reasonable choice, but allow for the Lautaret on a snowy day.",
    },

    { type: "titre2", texte: "How do you choose between the four airports?" },
    {
      type: "paragraphe",
      texte:
        "For the Oisans and Chamrousse the order of the airports never changes: Grenoble, then Chambéry, then Lyon, then Geneva. What changes is whether the closest one flies on your dates. Three questions settle it in a minute.",
    },
    {
      type: "liste",
      items: [
        "Are you travelling Saturday to Saturday? Then check Grenoble first, and Chambéry second. Both run weekend charters, and either puts you in Alpe d’Huez or Les Deux Alpes in under two hours.",
        "Are you arriving or leaving midweek? Then the weekend airports are unlikely to help, and Lyon is the answer: flights all week, about half an hour more on the road than Grenoble.",
        "Does one flight land much earlier than the others? A morning landing at Lyon or even Geneva can beat an evening landing at Grenoble, because the climb to the resort is easier in daylight and you gain the afternoon.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Group size matters too. A private transfer is priced per vehicle, not per seat, so a family of five or a group of eight shares the cost of the road. For them, the choice is rarely about the transfer price and almost always about the flights: which airport has seats for everyone, at a sensible hour, on the right day.",
    },
    {
      type: "paragraphe",
      texte:
        "If you are travelling in February, compare Lyon with Geneva before you book anything. Geneva fares tend to climb in that month, and for the Oisans Lyon is both nearer and quicker.",
    },

    { type: "titre3", texte: "And which vehicle?" },
    {
      type: "paragraphe",
      texte:
        "Every transfer is private, with a price fixed per vehicle before you book and tolls included. The Standard, a Volkswagen Transporter, takes up to 8 passengers; the Business, a Mercedes V-Class, up to 7; the Premium, a Mercedes E-Class saloon, up to 4. In winter the boot fills before the seats do, so tell us how many suitcases and ski or board bags you have. Ski bags travel free, and so do child and booster seats, fitted before departure as French law requires for every child under 10.",
    },
    {
      type: "paragraphe",
      texte:
        "If anyone in the group is prone to motion sickness, the hairpins to Alpe d’Huez and Chamrousse are the part to prepare for: a seat in the front, a window slightly open and a word to the driver about the pace all help.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Chamrousse — Grenoble 1 h 11, Chambéry 1 h 17, Lyon 1 h 42, Geneva 2 h 22.",
        "Alpe d’Huez — Grenoble 1 h 38, Chambéry 1 h 55, Lyon 2 h 10, Geneva 3 h 00.",
        "Les Deux Alpes — Grenoble 1 h 42, Chambéry 1 h 59, Lyon 2 h 14, Geneva 3 h 04.",
        "Saturday to Saturday — Grenoble, or Chambéry if Grenoble is full.",
        "Midweek — Lyon, about half an hour further.",
        "Serre Chevalier and Montgenèvre — Turin, unless only Grenoble fits your dates.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever airport you pick, book the transfer when you book the flight. Grenoble and Chambéry sell their winter capacity on the same Saturdays as everyone else, and in February the vehicles run out before the beds do.",
    },
  ],

  faq: [
    {
      question: "Which airport is closest to Alpe d’Huez?",
      reponse:
        "Grenoble Alpes-Isère, at 106 km and about 1 h 38 without traffic. Chambéry is next at 1 h 55, then Lyon at 2 h 10 and Geneva at about 3 hours.",
    },
    {
      question: "Grenoble or Lyon for Les Deux Alpes?",
      reponse:
        "Grenoble is closer, about 1 h 42 against 2 h 14 from Lyon. Grenoble flies mainly weekend charters in winter, while Lyon has flights all week, so Lyon is usually the answer for a midweek arrival.",
    },
    {
      question: "Does Grenoble airport have midweek flights in winter?",
      reponse:
        "Very few: its winter timetable is concentrated on weekend charters from the UK, the Netherlands and Scandinavia. For a midweek arrival in the Oisans, Lyon is the usual alternative.",
    },
    {
      question: "How long is the transfer from Geneva to Alpe d’Huez?",
      reponse:
        "About 3 hours for 216 km on a clear road, and up to an hour more on a Saturday in February. That is roughly 1 h 20 longer than from Grenoble and fifty minutes longer than from Lyon.",
    },
    {
      question: "How long does it take to get to Chamrousse from Grenoble airport?",
      reponse:
        "About 1 h 11 for 78 km, including a climb of some 30 km from the valley through Uriage-les-Bains. Allow more after fresh snow, and give us the address, as Recoin, Le Bachat and Roche-Béranger are separate centres.",
    },
    {
      question: "Is the Col du Lautaret open in winter?",
      reponse:
        "It is kept open, but it can close for a few hours during heavy snowfall or avalanche control. It is on the road from Grenoble to Serre Chevalier and Montgenèvre, which is why Turin is often the more dependable airport for those two resorts.",
    },
  ],
};
