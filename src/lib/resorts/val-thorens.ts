import type { Resort } from "./types";

/**
 * Val Thorens — **rédigée à la main**, et non reprise du WordPress.
 *
 * L'URL `/france-ski-transfers/val-thorens-2/` de l'ancien site porte
 * intégralement le contenu de Courchevel (Trois Vallées, Courchevel 1850, 1650,
 * Le Praz — vérifié dans le texte) : la station la plus recherchée des Alpes
 * françaises n'avait donc aucune page. Elle part en 301 vers Courchevel, et cette
 * page-ci est écrite depuis zéro.
 *
 * Les distances et les durées viennent de `src/data/distances.ts`, calculées sur
 * le réseau routier réel — pas des « environ 2 h » de l'ancien site. Aucun prix
 * n'est annoncé tant que le barème n'est pas validé par le client : le devis se
 * fait au formulaire.
 */
export const valThorens: Resort = {
  slug: "val-thorens",
  name: "Val Thorens",
  country: "FR",
  status: "migre",

  metaTitre: "Val Thorens Ski Transfers | Private Airport Transfers",
  metaDescription:
    "Private transfers to Val Thorens from Geneva, Chambéry, Lyon, Grenoble and Turin. Fixed price per vehicle, flight tracking, skis and boards included.",
  h1: "Val Thorens Ski Transfers – Private Airport Transfers to Europe’s Highest Resort",
  chapo:
    "Val Thorens sits at 2,300 m at the top of the Belleville valley, and every road to it ends with the same 37 km climb from Moûtiers. Five airports serve the resort: Chambéry is the closest at 122 km (1 h 40), Geneva the best connected at 161 km (2 h 45), Grenoble at 188 km (2 h 26), Lyon at 200 km (2 h 33) and Turin at 260 km (3 h 27). We drive all five, door to door, in vehicles equipped for mountain roads in winter. The price is fixed per vehicle and quoted before you book, skis and boards included, and your driver tracks your flight — so a delayed landing does not cost you your transfer. Saturday is changeover day across the Three Valleys: allow more time, and book early.",

  airports: [
    "chambery-savoie-airport",
    "geneva-airport",
    "grenoble-isere-airport",
    "lyon-airport",
    "turin-airport",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Val Thorens is the highest ski resort in Europe, and the last stop on a road that climbs steadily for the final 37 km. That geography is the whole story of getting there: the flight matters less than the drive, and the drive is a mountain road in winter. This page tells you which airport to fly into, how long the transfer actually takes, and what to expect on the day.",
    },

    { type: "titre2", texte: "Which airport should you fly into for Val Thorens?" },
    {
      type: "paragraphe",
      texte:
        "Five airports make sense for Val Thorens. The right one depends less on distance than on what you can fly to, and at what time of day — an extra 40 minutes in the vehicle costs less than a night in a hotel near the airport.",
    },
    { type: "titre3", texte: "Chambéry Savoie (CMF) — 122 km, 1 h 40" },
    {
      type: "paragraphe",
      texte:
        "The closest airport to the resort, and the shortest transfer of the five. Its winter timetable is built around the ski season and concentrated on weekends, with charter and low-cost flights from the UK and northern Europe. If your dates match a Chambéry flight, take it: you are in Val Thorens in well under two hours.",
    },
    { type: "titre3", texte: "Geneva (GVA) — 161 km, 2 h 45" },
    {
      type: "paragraphe",
      texte:
        "The busiest gateway to the Alps and the one most of our Val Thorens passengers use. Flights run all week from most European cities, which is what makes it worth the extra hour of driving: you can land mid-morning on a Friday rather than waiting for the Saturday charter. The route follows the motorway to Albertville, then the Tarentaise valley to Moûtiers.",
    },
    { type: "titre3", texte: "Grenoble Alpes-Isère (GNB) — 188 km, 2 h 26" },
    {
      type: "paragraphe",
      texte:
        "A ski-season airport like Chambéry, with a similar weekend-heavy schedule and often lower fares. The drive is longer in kilometres than from Chambéry but largely motorway, which keeps the time down.",
    },
    { type: "titre3", texte: "Lyon Saint-Exupéry (LYS) — 200 km, 2 h 33" },
    {
      type: "paragraphe",
      texte:
        "The useful alternative to Geneva: year-round flights, a wider choice of airlines, and a straightforward motorway run to Albertville. Worth comparing whenever Geneva fares spike in February.",
    },
    { type: "titre3", texte: "Turin (TRN) — 260 km, 3 h 27" },
    {
      type: "paragraphe",
      texte:
        "The Italian option, through the Fréjus tunnel and down the Maurienne. It is the longest of the five transfers, but it can be the cheapest way in from southern Europe, and the road is a good one.",
    },
    {
      type: "paragraphe",
      texte:
        "Distances and drive times above are measured on the real road network, without traffic. They are the times a driver holds on a clear weekday, not a best case.",
    },

    { type: "titre2", texte: "How long the transfer really takes in winter" },
    {
      type: "paragraphe",
      texte:
        "Saturday is changeover day across the Three Valleys. Tens of thousands of people arrive and leave on the same morning, through the same valley, and the Tarentaise slows to a crawl between Albertville and Moûtiers. On a busy February Saturday, plan on an hour more than the figures above — for a Geneva transfer, that means closer to 3 h 45 than 2 h 45.",
    },
    {
      type: "paragraphe",
      texte:
        "Two other things stretch the journey. Snowfall on the climb from Moûtiers slows every vehicle on the road, chains or not. And the resort closes its access road briefly for avalanche control after heavy snow, which is rare but real. Our drivers watch both, and your pick-up time is set from your flight, not from a timetable.",
    },
    {
      type: "paragraphe",
      texte:
        "Flying out, the same logic applies in reverse: we set the departure from the resort so that you reach the terminal with time to spare on a Saturday, not so that the vehicle looks efficient.",
    },

    { type: "titre2", texte: "The last 37 km — the climb from Moûtiers" },
    {
      type: "paragraphe",
      texte:
        "Every route to Val Thorens converges at Moûtiers, in the bottom of the valley at 480 m. From there the road climbs to 2,300 m in 37 km of hairpins, through Saint-Martin-de-Belleville and Les Menuires. It is a well-maintained road, cleared and gritted through the season, but it is a mountain road: winter tyres and chains are legally required in this part of Savoie from 1 November to 31 March, and our vehicles carry both.",
    },
    {
      type: "paragraphe",
      texte:
        "Moûtiers is also the closest railway station, with direct high-speed trains from Paris and London on winter Saturdays. If you are arriving by train rather than by air, tell us when you enquire — the same climb, from the same starting point.",
    },
    {
      type: "paragraphe",
      texte:
        "If anyone in the party is prone to motion sickness, the climb is the part to prepare for. Sitting in the front, keeping the window slightly open and eating lightly before the drive all help; so does telling the driver, who can slow the pace through the hairpins.",
    },

    { type: "titre2", texte: "Val Thorens at a glance" },
    {
      type: "liste",
      items: [
        "Resort altitude 2,300 m — the highest in Europe, with skiing up to 3,230 m on the Cime Caron and the Péclet glacier.",
        "Part of Les 3 Vallées, the largest linked ski area in the world, with lifts through to Les Menuires, Méribel, Courchevel and Orelle.",
        "One of the longest seasons in the Alps: late November to early May, snow-sure by altitude rather than by cannon.",
        "A pedestrian resort — vehicles drop you at your accommodation, then park in the covered car parks; almost everything else is walked or skied.",
        "Sixty kilometres of piste within Val Thorens itself, and a lift network built for high-altitude skiing above the treeline.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The altitude that guarantees the snow is also what makes the transfer worth planning properly. There is no quick way down the valley if you miss a flight, and no train that goes higher than Moûtiers.",
    },

    { type: "titre2", texte: "Skis, boards, luggage and children" },
    {
      type: "paragraphe",
      texte:
        "Ski and snowboard bags travel free on every transfer — they are not an extra, and they are not an afterthought in the vehicle choice. Tell us how many bags you are bringing when you book, along with any bulky items such as a boot bag per person or a splitboard, and we send a vehicle that takes the lot without anyone holding a pair of skis on their knees for two hours.",
    },
    {
      type: "paragraphe",
      texte:
        "Child seats and booster seats are available at no extra charge; tell us the ages and we fit them before we leave the airport. French law requires an approved restraint for every child under 10, and a mountain road is not the place to improvise one.",
    },

    { type: "titre2", texte: "Private or shared — which to book for Val Thorens" },
    {
      type: "paragraphe",
      texte:
        "A private transfer is your vehicle alone: it leaves when you land, goes straight to your accommodation, and its price is per vehicle rather than per person. For a family or a group of four or more it is usually the cheaper option as well as the faster one, and it is the only sensible choice for a late arrival with children.",
    },
    {
      type: "paragraphe",
      texte:
        "A shared transfer costs less per seat and suits couples and solo travellers on flexible timings. It waits for other passengers on the same flight window and may stop in Les Menuires or Saint-Martin on the way up, which adds time to the climb. Both are quoted before you book, with the price fixed and no surcharge on arrival.",
    },

    { type: "titre2", texte: "When to book your Val Thorens transfer" },
    {
      type: "paragraphe",
      texte:
        "Book as soon as your flights are confirmed, and earlier still for the school holidays. The February half-term weeks and the Christmas and New Year Saturdays are when vehicles run out across the whole Tarentaise — not just ours — and a transfer booked in November costs less than the same transfer booked in December.",
    },
    {
      type: "paragraphe",
      texte:
        "Booking takes a few minutes: choose your airport and dates, tell us how many passengers and how much ski equipment, and you receive a fixed price and a confirmation by email. Your driver meets you in arrivals with your name, and follows your flight in case it lands late.",
    },
  ],

  faq: [
    {
      question: "How long does the transfer from Geneva to Val Thorens take?",
      reponse:
        "About 2 hours 45 minutes for the 161 km, without traffic. On a Saturday in high season, allow an hour more: the whole Three Valleys changes over on the same morning and the Tarentaise valley is slow between Albertville and Moûtiers.",
    },
    {
      question: "Which airport is closest to Val Thorens?",
      reponse:
        "Chambéry Savoie, 122 km away and about 1 hour 40 minutes by road. Its winter schedule is concentrated at weekends, so Geneva (161 km, 2 h 45) is often the more practical choice for midweek arrivals, with Grenoble, Lyon and Turin as alternatives.",
    },
    {
      question: "Are skis and snowboards included in the price?",
      reponse:
        "Yes. Ski and board bags travel free, and we size the vehicle to the equipment you declare when booking. Tell us about anything bulky — a splitboard, a boot bag per person, a pushchair — so the vehicle we send has room for it.",
    },
    {
      question: "What happens if my flight is delayed?",
      reponse:
        "Your driver tracks the flight and adjusts the pick-up to the actual landing time. There is nothing to do and nothing extra to pay: a delayed flight does not cost you your transfer.",
    },
    {
      question: "Do you provide child seats?",
      reponse:
        "Yes, at no extra charge. Give us the ages of the children when you book and the seats are fitted before we leave the airport, as French law requires for every child under 10.",
    },
    {
      question: "Can you pick us up at Moûtiers railway station?",
      reponse:
        "Moûtiers is the closest station to Val Thorens, 37 km below the resort, and it is served by direct high-speed trains from Paris and London on winter Saturdays. Tell us your train and we will quote the transfer up to the resort.",
    },
    {
      question: "Is the road to Val Thorens difficult in winter?",
      reponse:
        "It is a well-maintained mountain road that climbs from 480 m at Moûtiers to 2,300 m in 37 km of hairpins. Winter tyres and chains are legally required in Savoie from 1 November to 31 March, and our vehicles carry both. After heavy snow the access road can close briefly for avalanche control, which your driver will know about before you do.",
    },
  ],
};
