import type { Article } from "./types";

/**
 * Chaînes et pneus hiver sur la route des Alpes.
 *
 * Les règles juridiques sont formulées avec prudence, sans montant d'amende ni
 * date qu'on ne puisse garantir, et renvoient aux sources officielles. Les temps
 * de route viennent de `src/data/distances.ts` ; les faits de route (montée de
 * Moûtiers, Lautaret, vallée de Täsch) des pages de station ; les engagements de
 * l'entreprise de la FAQ et des conditions générales.
 */
export const snowChainsWinterTyresAlps: Article = {
  slug: "snow-chains-winter-tyres-alps-rules",
  titre: "Snow chains and winter tyres in the Alps: the rules, the roads and your transfer",
  metaTitre: "Snow Chains & Winter Tyres in the Alps: Rules by Country",
  metaDescription:
    "France, Italy and Switzerland handle winter equipment differently. What the rules say, what closes a mountain road, and how snow changes a transfer time.",
  chapo:
    "Winter equipment is the part of an Alpine journey that most travellers only think about when the first flakes hit the windscreen. The rules differ between France, Italy and Switzerland, the roads that close are not always the ones you would expect, and snow changes a drive time far more than distance does. Here is what the law asks for in each country, what actually shuts a mountain road, and what it means for the time you land and the time you reach your door.",
  visuel: { nom: "blog-snow-chains-winter-tyres", alt: "Minibus stopped on a snowy mountain road with snow chains beside the wheel" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "In France, the Loi Montagne II rules require vehicles in designated mountain municipalities to have winter tyres or to carry chains or snow socks, generally from 1 November to 31 March; roadside signs mark where the zone begins and ends.",
    "Italy leaves winter equipment to road authorities and regions: on many Alpine roads the obligation runs from 15 November to 15 April, but the exact dates and roads are set by local ordinance.",
    "Switzerland has no general winter-tyre law, but a driver whose vehicle is unsuitable for the conditions can be held liable, and chains become compulsory wherever a sign requires them.",
    "Every Alps Ski Transfers vehicle carries winter tyres and snow chains all season, and the price is fixed when you book — tolls included, nothing added on arrival.",
    "Snow stretches the last climb most: the road from Moûtiers to Val Thorens is 37 km of hairpins, and the Col du Lautaret, at 2,058 m on the Grenoble to Serre Chevalier route, can close for a few hours in heavy snow or for avalanche control.",
  ],

  stationsLiees: [
    "val-thorens",
    "les-menuires",
    "serre-chevalier",
    "montgenevre",
    "sestriere",
    "zermatt",
    "flaine",
    "les-gets",
  ],

  trajetsLies: [
    { airport: "chambery-savoie-airport", resort: "val-thorens" },
    { airport: "grenoble-isere-airport", resort: "serre-chevalier" },
    { airport: "turin-airport", resort: "serre-chevalier" },
    { airport: "turin-airport", resort: "sestriere" },
    { airport: "geneva-airport", resort: "zermatt" },
    { airport: "geneva-airport", resort: "flaine" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Do you need snow chains or winter tyres to drive to a ski resort in the Alps? In most cases, yes — but the rule depends on the country. In France, the Loi Montagne II rules require vehicles in designated mountain municipalities to have winter tyres or to carry chains or snow socks, generally from 1 November to 31 March. In Italy, road authorities and regions set the obligation by ordinance, commonly from 15 November to 15 April on Alpine roads. Switzerland has no fixed date and no general winter-tyre law, but a driver who is not equipped for the conditions can be held responsible, and chains are compulsory where a sign says so. On a private transfer none of this is your problem: our vehicles carry winter tyres and chains all season, and the driver decides when to fit them. What does remain your concern is time — snow, chain controls and closures lengthen the last climb far more than the motorway below it.",
    },
    {
      type: "paragraphe",
      texte:
        "The rules below are summarised in good faith for travellers, not as legal advice. Dates, signs and designated roads are set by the authorities and can change from one winter to the next, so check the official sources listed at the end before you drive yourself.",
    },

    { type: "titre2", texte: "France: the Loi Montagne II and the 1 November to 31 March period" },
    {
      type: "paragraphe",
      texte:
        "France introduced its winter equipment obligation with the second mountain law, usually called the Loi Montagne II, and applied it for the first time in the winter of 2021–22. It does not cover the whole country. Each prefecture draws up a list of municipalities in the mountain massifs where the rule applies, and signs are placed on the road at the entry to and exit from the zone. In the Alpine departments — Haute-Savoie, Savoie, Isère, the Hautes-Alpes — that list covers the roads that lead to the ski resorts, which is why the rule is usually summed up as applying in Savoie and Haute-Savoie from 1 November to 31 March.",
    },
    {
      type: "paragraphe",
      texte:
        "Within the zone and during that period, a car or a minibus must meet one of two conditions. Either it is fitted with winter tyres, identified by the three-peak mountain snowflake symbol on the sidewall, or it carries removable anti-skid devices — metal chains or approved textile snow socks — able to equip at least two drive wheels. The obligation is to have the equipment, not to use it on a dry road: chains stay in the boot until the road needs them.",
    },
    {
      type: "liste",
      items: [
        "The period generally runs from 1 November to 31 March, whatever the weather on the day.",
        "The zone is defined municipality by municipality, and marked by signs at its boundaries.",
        "Winter tyres or chains on board both satisfy the rule in normal conditions.",
        "In severe conditions the authorities can go further on a given road and require chains to be fitted — a roadside sign or a police check will say so.",
        "The rule applies to French-registered and foreign vehicles alike, hire cars included.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For the transfers we drive, the French rule applies to almost every final climb: the 37 km from Moûtiers to Val Thorens, the 27 km from Moûtiers to Les Menuires, the 20 km of hairpins from Cluses to Flaine, the road from Cluses over the col des Gets, and both approaches to Serre Chevalier.",
    },

    { type: "titre2", texte: "Italy: road-by-road ordinances and the mid-November to mid-April window" },
    {
      type: "paragraphe",
      texte:
        "Italy handles winter equipment differently. The highway code allows whoever manages a road — the national road agency, a motorway operator, a region or a province — to require winter equipment on it by ordinance. In practice, on many Alpine roads that obligation runs from 15 November to 15 April, and it is announced by signs at the start of the stretch concerned. Some authorities set a longer window on their own roads, which is why the only reliable answer for a specific road is the ordinance that covers it.",
    },
    {
      type: "paragraphe",
      texte:
        "As in France, the requirement is to have either winter tyres fitted or chains on board. The roads to the Italian resorts we serve — the Susa valley towards Sestriere and Montgenèvre, the Aosta valley towards Cervinia and Courmayeur — are typical of the roads where the rule applies. From Turin, Sestriere is 107 km and about 1 h 40 on clear roads, and Montgenèvre 105 km and about 1 h 40; both drives end with a climb that is kept open through the season but slows in snow.",
    },
    {
      type: "liste",
      items: [
        "The obligation is set road by road, by the authority that manages each road.",
        "Mid-November to mid-April is the common window, but not a universal one.",
        "Signs mark the stretches where winter equipment is required.",
        "Tunnel approaches and motorways can carry their own requirements in winter.",
      ],
    },

    { type: "titre2", texte: "Switzerland: no fixed date, but full responsibility" },
    {
      type: "paragraphe",
      texte:
        "Switzerland is the country travellers most often get wrong in both directions. There is no general law that requires winter tyres between two dates. That does not mean summer tyres are acceptable in January: Swiss road rules require a vehicle to be fit for the conditions in which it is driven, and a driver who blocks a road or is involved in an accident on unsuitable tyres can be fined and held liable, with consequences for the insurance claim. In practice, vehicles that drive Alpine roads in winter are fitted with winter tyres.",
    },
    {
      type: "paragraphe",
      texte:
        "Chains follow a simpler rule. Where a sign shows that snow chains are compulsory, they must be fitted, whatever tyres the vehicle has. Passes are the usual place for this, and some close altogether for the winter. For Zermatt, the road up the valley from Visp to Täsch is a main road, cleared and gritted through the season, but the authorities close it briefly for avalanche control after heavy snowfall rather than let traffic through. When that happens the train from Visp keeps running, which is one reason the route is more robust than it looks. From Geneva, Täsch is 237 km and a little over three hours on clear roads.",
    },

    { type: "titre2", texte: "Winter tyres, chains and snow socks: what each one actually does" },
    {
      type: "paragraphe",
      texte:
        "The three are often talked about as if they were interchangeable. They are not, and knowing the difference explains why a well-equipped vehicle carries more than one of them.",
    },
    {
      type: "titre3",
      texte: "Winter tyres",
    },
    {
      type: "paragraphe",
      texte:
        "A winter tyre uses a softer rubber compound that stays supple in the cold, and a tread cut with many fine slits that grip packed snow and slush. The benefit starts well before there is snow on the ground: on a cold, wet valley road the winter tyre stops shorter than a summer one. It is the equipment that does the work on the vast majority of winter kilometres, including the motorway from the airport.",
    },
    {
      type: "titre3",
      texte: "Snow chains",
    },
    {
      type: "paragraphe",
      texte:
        "Chains are for deep or compacted snow and for ice on a gradient — the conditions in which even a good winter tyre loses traction on a climb. They are fitted to the drive wheels, they are slow, and they must come off once the road is clear, because driving on tarmac with chains damages both the road and the chains. On a transfer they are typically fitted for the last part of a climb and removed on the way down.",
    },
    {
      type: "titre3",
      texte: "Snow socks",
    },
    {
      type: "paragraphe",
      texte:
        "Textile socks are pulled over the tyre and are much quicker to fit than chains. France accepts approved socks as removable anti-skid devices under its mountain rule. They are an emergency aid rather than a full substitute: they wear quickly on bare patches of road and are not always accepted where a sign specifically requires chains.",
    },

    { type: "titre2", texte: "What actually closes a mountain road" },
    {
      type: "paragraphe",
      texte:
        "Mountain roads to ski resorts are maintained as priority routes: they are ploughed and gritted from early morning through the season, because tens of thousands of people depend on them. Full closures are therefore rare and usually short. When they happen, they have one of a handful of causes.",
    },
    {
      type: "liste",
      items: [
        "Avalanche control. After heavy snowfall, slopes above the road are made safe by triggering controlled slides, and the road is closed while it is done. The Val Thorens access road and the Visp to Täsch valley road are both closed briefly for this from time to time.",
        "Heavy snowfall on a high pass. The Col du Lautaret, at 2,058 m on the route from Grenoble to Serre Chevalier and Montgenèvre, is kept open through the winter but closes for a few hours at a time during heavy snow or avalanche control. The detour is long.",
        "A blocked climb. A single vehicle without equipment stuck across a hairpin can stop everything behind it until it is moved. This is the most common cause of a sudden standstill, and the reason chain controls exist.",
        "Chain controls. Police or road staff at the foot of a climb check that vehicles are equipped and turn back those that are not. They slow the traffic even for the vehicles that pass.",
        "Seasonal closures. Some high passes, particularly in Switzerland, are simply closed for the winter. Routes are planned around them rather than through them.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The Lautaret is the clearest example of why the choice of airport can depend on the weather. From Grenoble, Serre Chevalier is 155 km and about 2 h 55, over the pass. From Turin it is 131 km and about 2 h 45, through the Fréjus tunnel, which removes the pass altogether. In a settled week both routes work; in a stormy one, the Italian approach is often the more reliable.",
    },

    { type: "titre2", texte: "How snow changes a transfer time" },
    {
      type: "paragraphe",
      texte:
        "Every drive time we publish is measured on the real road network, without traffic and on a clear road. That is the only honest baseline, because it is the only one that can be measured. Winter adds to it in ways that are predictable in kind if not in size.",
    },
    {
      type: "paragraphe",
      texte:
        "The motorway section of a transfer barely changes in snow: it is wide, gritted and heavily used. The time is lost on the climb. From Chambéry, Val Thorens is 122 km and about 1 h 40 on a clear road, and the last 37 km — the climb from Moûtiers at 480 m to the resort at 2,300 m — are the part that slows when it snows, chains or not, because every vehicle on the road slows with it. From Geneva, Flaine is 80 km and about 1 h 30, and it is the 20 km from Cluses that decide how long the transfer really takes in a snowfall.",
    },
    {
      type: "liste",
      items: [
        "Light snow on a gritted climb: the drive is slower, but usually only by minutes.",
        "Fresh snow falling during the climb: speeds drop for everyone, and a queue forms behind the slowest vehicle.",
        "Chains required: add the time to stop at a chain bay, fit them, and drive the climb at chain speed.",
        "A temporary closure: the wait depends on the cause, from a short hold to a few hours for a pass.",
        "Snow on a Saturday: the effects add up, because the road is already at its busiest.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "None of these can be predicted to the minute when you book, which is why we do not promise an arrival time on a snowy day and why our terms say so plainly. What we can do is set the pick-up from the actual landing time of your flight, and watch the roads on the day rather than the timetable.",
    },

    { type: "titre2", texte: "Why a professional transfer is equipped — and what that does not change" },
    {
      type: "paragraphe",
      texte:
        "All our vehicles carry winter tyres and snow chains all season, as French law requires in Savoie and Haute-Savoie from 1 November to 31 March, and as the roads require everywhere else we drive. The drivers are trained for mountain roads and fit chains as part of the job, at a chain bay, in the cold, which is precisely the task a visitor in a hire car least wants to learn on the side of a hairpin at night.",
    },
    {
      type: "paragraphe",
      texte:
        "Equipment also changes what happens at a chain control. An equipped vehicle carries on; an unequipped one is turned back. On a busy morning that is the difference between reaching the resort and spending an hour looking for somewhere that sells chains in a size that fits.",
    },
    {
      type: "paragraphe",
      texte:
        "What equipment does not change is the road itself. A closed pass is closed for everyone, and a queue behind a stuck car is a queue for every vehicle in it. Our terms are explicit that weather and road closures can delay a transfer, and that in extreme conditions we may have to reschedule it, in which case you are offered an alternative transfer or a full refund. We would rather say that before you book than after.",
    },
    {
      type: "liste",
      items: [
        "Winter tyres and chains on board all season, in every vehicle category.",
        "Your flight is tracked: a late landing moves the pick-up, and the included hour of waiting counts from the actual landing time.",
        "The price is fixed per vehicle when you book, tolls included, and nothing is added on arrival.",
        "If a closure makes the transfer impossible, you are offered another transfer or a full refund.",
      ],
    },

    { type: "titre2", texte: "Driving yourself? What to check before you collect a hire car" },
    {
      type: "paragraphe",
      texte:
        "Plenty of people drive to the Alps, and plenty of them do it well. If you are hiring a car, a few checks at the rental desk save a great deal of trouble on the climb.",
    },
    {
      type: "liste",
      items: [
        "Ask whether the car has winter tyres, and look for the mountain snowflake symbol on the sidewall rather than taking it on trust.",
        "Ask whether chains or socks are included, whether they fit the tyres on that car, and where they are stored.",
        "Practise fitting them once in the car park, in daylight, before you need them on a slope.",
        "Check whether the rental agreement allows the car to cross into the country you are driving to.",
        "Keep the tank above half and carry water, warm clothing and a charged phone: a two-hour hold on a closed road is cold.",
        "Look at the road forecast for the climb, not just the weather forecast for the resort.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "And be realistic about arrival day. After an early flight, a baggage hall and a motorway, the last climb in falling snow is the most demanding part of the journey, and it comes when everyone in the car is at their most tired.",
    },

    { type: "titre2", texte: "Where to check the rules and the roads before you travel" },
    {
      type: "paragraphe",
      texte:
        "The authorities publish the current rules, the designated roads and the live state of the network. Because dates and zones can change from one season to the next, these are the sources to trust over any summary, including this one.",
    },
    {
      type: "liste",
      items: [
        "France: the French road safety authority, Sécurité routière, explains the winter equipment rule; the prefecture of each department publishes its list of municipalities; Bison Futé publishes traffic forecasts and road conditions.",
        "Italy: ANAS, the motorway operators and the regional authorities publish their winter ordinances; Viabilità Italia coordinates national traffic information.",
        "Switzerland: the Federal Roads Office publishes information on the national roads, and the Touring Club Suisse publishes pass conditions and closures.",
        "Resorts: most resort websites and tourist offices report the state of the access road on the day, including avalanche-control closures.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If you are travelling with us, the short version is simpler. Give us your flight number, give us the exact address of your accommodation, and leave the tyres, the chains and the timing of the climb to the driver.",
    },
  ],

  faq: [
    {
      question: "Are snow chains mandatory in the French Alps?",
      reponse:
        "In designated mountain municipalities, from 1 November to 31 March, vehicles must either have winter tyres or carry chains or snow socks. Chains must actually be fitted where a sign or the authorities require it. Check the prefecture's list and the Sécurité routière guidance for the current season.",
    },
    {
      question: "Do I need winter tyres in Switzerland?",
      reponse:
        "There is no general legal obligation, but a driver whose vehicle is unsuitable for the conditions can be fined and held liable in an accident. Where a sign requires snow chains, they must be fitted regardless of the tyres.",
    },
    {
      question: "When are winter tyres required in Italy?",
      reponse:
        "It depends on the road. Road authorities and regions set the obligation by ordinance, commonly from 15 November to 15 April on Alpine roads, and signs mark the stretches concerned. Winter tyres or chains on board satisfy it.",
    },
    {
      question: "Do your transfer vehicles have winter tyres and chains?",
      reponse:
        "Yes. All our vehicles carry winter tyres and snow chains all season, and our drivers fit the chains when the road requires them. The price is fixed when you book and nothing is added on arrival.",
    },
    {
      question: "What happens if the road to my resort is closed?",
      reponse:
        "Most closures are short, for avalanche control or heavy snow, and the transfer simply waits or takes another route. If conditions make the journey impossible, our terms provide for an alternative transfer or a full refund.",
    },
  ],
};
