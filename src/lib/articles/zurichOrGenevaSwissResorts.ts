import type { Article } from "./types";

/**
 * Zurich ou Genève pour les stations suisses.
 *
 * Toutes les distances et durées viennent de `src/data/distances.ts` (routage
 * OpenStreetMap, sans trafic). **Attention** : plusieurs pages de station et
 * le hub de Zurich annoncent encore Zermatt à « 3 h 20 » de Zurich et
 * Crans-Montana à « 3 h 15 » ; la table donne 4 h 17 et 4 h 03. C'est la table
 * qui fait foi ici, comme dans la version allemande de l'article sur les
 * aéroports — les pages en question sont à corriger, pas cet article.
 */
export const zurichOrGenevaSwissResorts: Article = {
  slug: "zurich-or-geneva-airport-swiss-ski-resorts",
  titre: "Zurich or Geneva: which airport for which Swiss ski resort?",
  metaTitre: "Zurich or Geneva for Swiss Ski Resorts? Airport Guide",
  metaDescription:
    "Davos, St. Moritz, Zermatt, Verbier, Crans-Montana or Villars? Real drive times from Zurich and Geneva, and why the answer splits across Switzerland.",
  chapo:
    "Switzerland is small enough that every resort looks close to both of its big airports, and large enough that the wrong choice costs two or three hours each way. The answer splits along a fairly clean line: Geneva for the Valais and the Vaud Alps, Zurich for the Grisons, central Switzerland and most of the Bernese Oberland. Here are the measured drive times from both airports, the exceptions, and the resorts where a third airport is worth a look.",
  visuel: { nom: "blog-zurich-or-geneva-swiss-resorts", alt: "Swiss Alpine valley in winter with a motorway along the valley floor" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Geneva is the quicker airport for the Valais and Vaud ski resorts: Villars-sur-Ollon 1 h 41, Champéry 1 h 44, Verbier 2 h 09, Gstaad 2 h 10 and Crans-Montana 2 h 24 on a clear road.",
    "Zurich is the quicker airport for the Grisons and central Switzerland: Engelberg 1 h 51, Laax 2 h 20, Arosa 2 h 31, Davos 2 h 36 and St. Moritz 3 h 21 on a clear road.",
    "For Zermatt, Geneva is about an hour quicker than Zurich — roughly 3 h 10 against 4 h 15 — and every road transfer ends at Täsch, where a shuttle train covers the last 5 km in 12 minutes.",
    "In the Bernese Oberland, Zurich is 22 minutes quicker than Geneva to Interlaken (2 h 20), Lauterbrunnen (2 h 29) and Grindelwald (2 h 38); Gstaad is the exception, at 2 h 10 from Geneva and 3 h 12 from Zurich.",
    "Choosing the wrong Swiss airport costs hours: Verbier is 3 h 48 from Zurich, and Davos is more than five hours from Geneva.",
  ],

  stationsLiees: [
    "zermatt",
    "verbier",
    "crans-montana",
    "villars-sur-ollon",
    "champery",
    "gstaad",
    "davos",
    "st-moritz",
    "engelberg",
    "laax",
    "arosa",
    "interlaken",
    "grindelwald",
    "lauterbrunnen",
    "wengen",
  ],

  trajetsLies: [
    { airport: "geneva-airport", resort: "zermatt" },
    { airport: "zurich-airport", resort: "zermatt" },
    { airport: "geneva-airport", resort: "verbier" },
    { airport: "geneva-airport", resort: "crans-montana" },
    { airport: "geneva-airport", resort: "villars-sur-ollon" },
    { airport: "zurich-airport", resort: "davos" },
    { airport: "zurich-airport", resort: "st-moritz" },
    { airport: "zurich-airport", resort: "interlaken" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Switzerland splits in two. Geneva is the airport for the Valais and the Vaud Alps: Villars-sur-Ollon is 1 h 41 away on a clear road, Champéry 1 h 44, Verbier 2 h 09, Gstaad 2 h 10, Crans-Montana 2 h 24 and Zermatt about 3 h 10 to the Täsch terminal. Zurich is the airport for the Grisons, central Switzerland and most of the Bernese Oberland: Engelberg is 1 h 51 away, Interlaken 2 h 20, Laax 2 h 20, Arosa 2 h 31, Davos 2 h 36 and St. Moritz 3 h 21. Picking the wrong one is expensive in time: Verbier is 3 h 48 from Zurich, and Davos more than five hours from Geneva. Zermatt surprises most people, because Geneva is about an hour quicker than Zurich. For the Grisons, Milan Malpensa is also worth a look: St. Moritz is 3 h 09 from there, twelve minutes less than from Zurich.",
    },

    { type: "titre2", texte: "Where does the line between Zurich and Geneva fall?" },
    {
      type: "paragraphe",
      texte:
        "Geneva sits at the western tip of the country, on Lake Geneva. Its motorway runs along the lake and then up the Rhône valley, which is the spine of the Valais: every resort in that canton is a side road off the same valley. Zurich sits in the north-east, with motorways fanning out towards Lucerne and central Switzerland, towards Bern and the Oberland, and towards Chur and the Grisons.",
    },
    {
      type: "paragraphe",
      texte:
        "The dividing line runs roughly through the Bernese Oberland. Resorts on the Valais and Vaud side of it are Geneva’s; resorts on the eastern and northern side are Zurich’s. Measured on the road, without traffic, the split looks like this:",
    },
    {
      type: "liste",
      items: [
        "Villars-sur-Ollon — Geneva 1 h 41, Zurich 3 h 19.",
        "Champéry — Geneva 1 h 44, Zurich 3 h 22.",
        "Verbier — Geneva 2 h 09, Zurich 3 h 48.",
        "Gstaad — Geneva 2 h 10, Zurich 3 h 12.",
        "Crans-Montana — Geneva 2 h 24, Zurich 4 h 03.",
        "Zermatt — Geneva 3 h 07, Zurich 4 h 17.",
        "Interlaken — Zurich 2 h 20, Geneva 2 h 42.",
        "Grindelwald — Zurich 2 h 38, Geneva 3 h 00.",
        "Engelberg — Zurich 1 h 51, Geneva 3 h 42.",
        "Davos — Zurich 2 h 36, Geneva 5 h 13.",
        "St. Moritz — Zurich 3 h 21, Geneva 5 h 57.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Two things stand out. On the Geneva side, the gaps are large — one and a half to two hours — so there is rarely a good reason to fly into Zurich for the Valais unless the flight itself leaves you no choice. On the Zurich side, the Oberland is close to a draw, while the Grisons are simply out of reach from Geneva.",
    },

    { type: "titre2", texte: "Which Swiss ski resorts are best reached from Geneva?" },
    {
      type: "paragraphe",
      texte:
        "Geneva is the natural gateway to the resorts strung along the Rhône valley and above Lake Geneva. The pattern of the drive is the same for most of them: a fast, flat motorway for most of the distance, then a mountain road for the last few kilometres, where the time is really spent.",
    },
    {
      type: "liste",
      items: [
        "Villars-sur-Ollon — 123 km, about 1 h 41. Motorway along the lake to Aigle, then a 10 km climb to the village at 1,300 m. One of the shortest transfers to a Swiss resort from an international airport.",
        "Champéry — 128 km, about 1 h 44. Motorway round the lake to Monthey, then 15 km up the Val-d’Illiez to the village at 1,050 m. The Swiss gateway to the Portes du Soleil, with no pass on the approach.",
        "Verbier — 163 km, about 2 h 09. Up the Rhône valley, then the climb to the resort at 1,500 m, in the 4 Vallées area.",
        "Gstaad — 151 km, about 2 h 10. Motorway to Montreux, then the Pays-d’Enhaut road over the Col des Mosses or through Château-d’Œx to the Saanenland, with no motorway for the last hour.",
        "Crans-Montana — 183 km, about 2 h 24. Up the Rhône valley to Sierre, then 15 km of hairpins climbing about 950 m to the resort terrace.",
        "Grimentz — 197 km, about 2 h 33, in the Val d’Anniviers.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Crans-Montana has a useful fallback: a funicular runs from Sierre up to Montana, which is what locals use when the road is at its worst. The road itself is cleared and gritted daily and rarely closes.",
    },
    {
      type: "paragraphe",
      texte:
        "Sion airport, in the Rhône valley itself, is far closer to all of these — Crans-Montana is 28 km away, Verbier 52 km, Zermatt 82 km — but it carries almost no scheduled flights. In practice it is an airport for private aviation, and Geneva is the one to book.",
    },

    { type: "titre2", texte: "Is Zurich or Geneva better for Zermatt?" },
    {
      type: "paragraphe",
      texte:
        "Geneva, by about an hour. Zermatt is 237 km from Geneva and about 3 h 10 by road; from Zurich it is 251 km and about 4 h 15. Fourteen kilometres of difference produce more than an hour of driving, and the reason is the route. From Geneva the motorway follows Lake Geneva and the Rhône valley all the way to Visp, before the last 30 km up the Mattertal. From Zurich the road has to get from the Swiss plateau into the upper Rhône valley, and in winter there is no quick way across the mountains in between.",
    },
    {
      type: "paragraphe",
      texte:
        "Wherever you land, the road stops before the resort. Zermatt has banned combustion vehicles since the 1960s, and every road transfer ends at the Täsch Matterhorn Terminal, 5 km down the valley. The shuttle train leaves about every twenty minutes and takes 12 minutes to Zermatt station, in the middle of the village. The terminal is covered, with luggage trolleys on the platform; skis and luggage travel on the train at no extra cost, and most hotels send an electro-taxi to meet a train you have named.",
    },
    {
      type: "liste",
      items: [
        "Geneva — 237 km, about 3 h 10, plus the 12-minute train.",
        "Milan Malpensa — 195 km, about 3 h 05, through the Simplon, plus the train.",
        "Zurich — 251 km, about 4 h 15, plus the train.",
        "Sion — 82 km, about 1 h 20, but with almost no scheduled flights.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Zurich still makes sense for Zermatt in one situation: a long-haul arrival that would otherwise mean a connection. An extra hour on the road is often better than a second flight and a later landing. Coming home, allow a train more than you think you need at Täsch: your driver waits, the flight does not.",
    },

    { type: "titre2", texte: "Which Swiss ski resorts are best reached from Zurich?" },
    {
      type: "paragraphe",
      texte:
        "Zurich is Switzerland’s main hub, with flights all week and long-haul connections, and a motorway network that puts Engelberg under two hours away and Laax, Arosa and Davos at around two and a half. On a clear road:",
    },
    {
      type: "liste",
      items: [
        "Engelberg — 107 km, about 1 h 51. The shortest transfer from an international airport to a major Swiss resort.",
        "Andermatt — 130 km, about 2 h 07.",
        "Interlaken — 139 km, about 2 h 20.",
        "Laax — 159 km, about 2 h 20.",
        "Lauterbrunnen, for Wengen — 149 km, about 2 h 29.",
        "Arosa — 164 km, about 2 h 31.",
        "Davos — 166 km, about 2 h 36.",
        "Grindelwald — 157 km, about 2 h 38.",
        "St. Moritz — 221 km, about 3 h 21.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "From Geneva, every one of these is at least twenty minutes longer, and most are hours longer: Engelberg is 3 h 42 from Geneva, Laax 4 h 57, Arosa 5 h 08.",
    },

    { type: "titre2", texte: "Which airport is best for Davos and St. Moritz?" },
    {
      type: "paragraphe",
      texte:
        "Zurich, with Milan Malpensa as the alternative worth checking. Davos is 166 km from Zurich and about 2 h 36 by road; St. Moritz is 221 km and about 3 h 21, over the Julier pass. From Geneva the same journeys take 5 h 13 and 5 h 57, which rules it out unless there is truly no other flight.",
    },
    {
      type: "paragraphe",
      texte:
        "Malpensa is the surprise for the Engadine. St. Moritz is 189 km from Malpensa and about 3 h 09, twelve minutes quicker than from Zurich, and Davos is 228 km and about 3 h 18, forty-two minutes slower than from Zurich. Routes from Malpensa into Switzerland cross a pass or a tunnel; passes can close for a few hours after heavy snowfall and the tunnels queue on holiday weekends, so your driver chooses the route on the day from the real state of the roads.",
    },
    {
      type: "paragraphe",
      texte:
        "At more than three hours, the St. Moritz transfer is a long one from either airport. Your driver plans a comfort stop, and it is worth telling us if you are travelling with young children so we can build the journey around them.",
    },

    { type: "titre2", texte: "The Bernese Oberland: Zurich, Geneva or Bern?" },
    {
      type: "paragraphe",
      texte:
        "This is the closest call on the Swiss map. Zurich wins for the Jungfrau resorts, but only by 22 minutes: Interlaken is 2 h 20 from Zurich and 2 h 42 from Geneva, Lauterbrunnen 2 h 29 against 2 h 51, Grindelwald 2 h 38 against 3 h 00. With a gap that small, the better flight should decide. Gstaad, at the western end of the Oberland, goes the other way: 2 h 10 from Geneva, 3 h 12 from Zurich.",
    },
    {
      type: "paragraphe",
      texte:
        "Bern airport is by far the closest to the Oberland — Interlaken is 51 km away, about 46 minutes; Lauterbrunnen 61 km, Grindelwald 69 km — but its timetable is thin and changes with the season. Check that it flies your route before planning around it.",
    },
    {
      type: "paragraphe",
      texte:
        "Wengen has no road at all. Transfers end at Lauterbrunnen station, a few steps from the platform of the cog railway that has climbed to Wengen since 1893, in about fifteen minutes, roughly every half-hour. Give your hotel your train time: most meet arrivals with electric carts or sledges.",
    },

    { type: "titre2", texte: "When does Zurich make sense for Verbier or Crans-Montana?" },
    {
      type: "paragraphe",
      texte:
        "On driving time alone, never: Verbier is 288 km and about 3 h 48 from Zurich, 1 h 39 more than from Geneva; Crans-Montana is 308 km and about 4 h 03, also 1 h 39 more. Villars-sur-Ollon and Champéry are both around 3 h 20 from Zurich, against well under two hours from Geneva.",
    },
    {
      type: "paragraphe",
      texte:
        "It can still be the right airport. Zurich carries more flights on many routes, including long-haul ones, and an earlier landing followed by a longer drive often beats a late landing followed by a short one. The sum to do is the whole day: flight time, connection, landing time and transfer together. If Zurich gets you to the resort before Geneva would, take Zurich and plan for a comfort stop.",
    },

    { type: "titre2", texte: "What changes in winter on Swiss roads?" },
    {
      type: "paragraphe",
      texte:
        "Every time above is a clear-road figure. Three things lengthen a Swiss transfer: snow, chain controls and Saturday. Saturday is changeover day across the Alps and the busiest day on the mountain roads; in February it can add an hour to the journey. A Sunday or midweek arrival avoids most of it.",
    },
    {
      type: "liste",
      items: [
        "Winter equipment: in Switzerland the rule is set by the state of the road rather than by a date. Our vehicles carry winter tyres and chains all season.",
        "Motorway vignette and tolls: included in the price we quote, along with any tunnel tolls on the route.",
        "Valley roads: the Mattertal road to Täsch is occasionally closed for avalanche control after heavy snow; the train from Visp keeps running.",
        "Borders: arriving at Geneva for a Swiss resort, you use the Swiss sector of the airport, which handles almost every flight.",
      ],
    },

    { type: "titre2", texte: "Which vehicle, and what to tell us?" },
    {
      type: "paragraphe",
      texte:
        "Every transfer is private, with a price fixed per vehicle before you book. The Standard category, a Volkswagen Transporter, takes up to 8 passengers; the Business, a Mercedes V-Class, up to 7; the Premium, a Mercedes E-Class saloon, up to 4. On long Swiss transfers the luggage decides the category before the seats do, so tell us how many suitcases and ski or board bags you are bringing. Ski bags travel free, and child and booster seats are included and fitted before departure.",
    },
    {
      type: "paragraphe",
      texte:
        "For car-free resorts, give us the name of your hotel as well as the resort: it is the difference between being dropped at the right station and the wrong one. Your flight is tracked, and a delayed landing moves the pick-up at no extra cost.",
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Villars-sur-Ollon, Champéry, Verbier, Gstaad, Crans-Montana, Grimentz — Geneva, 1 h 41 to 2 h 33.",
        "Zermatt — Geneva, about 3 h 10 to Täsch; Malpensa is similar; Zurich is an hour longer.",
        "Engelberg, Andermatt, Laax, Arosa, Davos — Zurich, 1 h 51 to 2 h 36.",
        "St. Moritz — Zurich (3 h 21) or Milan Malpensa (3 h 09).",
        "Interlaken, Lauterbrunnen, Wengen, Grindelwald — Zurich by 22 minutes; let the flight decide.",
        "Saturday in February — add up to an hour, whichever airport.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever airport you choose, book the transfer when you book the flight. The long Swiss runs are the first to fill for Christmas and the February half-terms.",
    },
  ],

  faq: [
    {
      question: "Is Zurich or Geneva closer to Zermatt?",
      reponse:
        "Geneva is quicker by about an hour: roughly 3 h 10 to the Täsch terminal, against about 4 h 15 from Zurich. Every road transfer ends at Täsch, and the shuttle train covers the last 5 km to Zermatt in 12 minutes.",
    },
    {
      question: "Which airport is best for Verbier?",
      reponse:
        "Geneva. Verbier is 163 km and about 2 h 09 from Geneva airport, against 288 km and 3 h 48 from Zurich. Zurich is only worth it when its flight gets you to the resort earlier overall.",
    },
    {
      question: "Which airport is best for Davos and St. Moritz?",
      reponse:
        "Zurich: Davos is about 2 h 36 away and St. Moritz about 3 h 21. For St. Moritz, Milan Malpensa is a genuine alternative at about 3 h 09. Geneva is more than five hours from both.",
    },
    {
      question: "Can you drive us all the way into Zermatt or Wengen?",
      reponse:
        "No. Both are car-free. Transfers to Zermatt end at the Täsch terminal, with a 12-minute shuttle train; transfers to Wengen end at Lauterbrunnen station, with a cog railway of about fifteen minutes.",
    },
    {
      question: "Is the Swiss motorway vignette included in the transfer price?",
      reponse:
        "Yes. The vignette and all tolls on the route are included in the fixed price quoted before you book, along with ski bags and child seats.",
    },
    {
      question: "Is Sion airport a good option for the Valais resorts?",
      reponse:
        "It is very close — 28 km from Crans-Montana, 52 km from Verbier — but it has almost no scheduled flights. For most travellers, Geneva is the airport to book for the Valais.",
    },
  ],
};
