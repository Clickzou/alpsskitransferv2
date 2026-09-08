import type { Article } from "./types";

/**
 * Article 2 des trois de démarrage.
 *
 * Sujet choisi parce qu'il traite la question que les sites de transfert évitent :
 * la moitié de ces stations ne se rejoignent pas en voiture, et le voyageur
 * l'apprend souvent à l'arrivée. Le dire à l'avance est un service.
 */
export const stationsSansVoitures: Article = {
  slug: "car-free-ski-resorts-how-you-actually-get-there",
  titre: "Car-free ski resorts: how you actually get there",
  metaTitre: "Car-Free Ski Resorts: How You Actually Get There",
  metaDescription:
    "Zermatt, Wengen, Mürren, Avoriaz, Saas-Fee: where the road stops, what happens to your luggage, and how to time the last stretch of the journey.",
  chapo:
    "Some of the best resorts in the Alps cannot be reached by car, and the transfer companies that drive you there are not always keen to mention it. Here is where the road actually stops for each of them, what happens to your skis and your suitcases at that point, and how to plan the last twenty minutes so they are the pleasant part of the journey rather than the moment it goes wrong.",
  datePublication: "2026-09-08",
  auteur: "Alps Ski Transfers",

  stationsLiees: ["zermatt", "wengen", "lauterbrunnen", "avoriaz", "tasch", "morzine"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "A car-free resort is not a marketing line. In Zermatt, Wengen and Mürren there is no road at all: the villages were built before cars and never connected. In Avoriaz there is a road, but it ends at a car park below the village. In each case the last stage of your journey is a train, a cable car or a horse-drawn sledge — and it has a timetable.",
    },
    {
      type: "paragraphe",
      texte:
        "None of this is a problem when you know about it. It becomes one at eleven at night, in February, with four suitcases, three ski bags and a child who has been travelling since six in the morning.",
    },

    { type: "titre2", texte: "Zermatt: the road stops at Täsch" },
    {
      type: "paragraphe",
      texte:
        "Zermatt banned combustion vehicles in the 1960s and has kept the ban since. Every road transfer — ours included — ends at the Täsch Matterhorn Terminal, 5 km down the valley, where the shuttle train leaves for the resort about every twenty minutes and takes twelve.",
    },
    {
      type: "liste",
      items: [
        "The terminal is covered, with luggage trolleys on the platform and a large car park.",
        "Tickets are bought at the terminal; skis and luggage travel with you at no extra charge.",
        "Zermatt station is in the middle of the village, and most hotels will send an electro-taxi to meet a train you have named.",
        "Trains run into the evening — check the last one if you are on a late flight.",
        "Coming home, allow a train more than you think you need: your driver waits at Täsch, but the flight does not.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The drive to Täsch is 237 km and about 3 h 10 from Geneva, 195 km and 3 h 05 from Milan Malpensa, and 82 km and 1 h 20 from Sion. Add the twelve-minute train to all of them.",
    },

    { type: "titre2", texte: "Wengen: a cog railway up a cliff" },
    {
      type: "paragraphe",
      texte:
        "Wengen sits on a shelf above the Lauterbrunnen valley and has never had a road. The Wengernalpbahn has climbed to it since 1893, in about fifteen minutes, roughly every half-hour. Road transfers end at Lauterbrunnen station, in the village, a few steps from the platform.",
    },
    {
      type: "paragraphe",
      texte:
        "Lauterbrunnen is 226 km and about 2 h 50 from Geneva, 149 km and 2 h 30 from Zurich, and 61 km and 55 minutes from Bern. Hotels in Wengen meet the trains with electric carts or sledges if you give them your arrival time — which is worth doing, because the village street is not a place to drag a suitcase in snow.",
    },

    { type: "titre2", texte: "Mürren: cable car, or funicular and a train" },
    {
      type: "paragraphe",
      texte:
        "Mürren, on the other side of the same valley, is reached either by the cable car from Stechelberg — 6 km up the valley from Lauterbrunnen — or by the funicular from Lauterbrunnen to Grütschalp and a small train along the cliff. Both take about twenty minutes in total and both run to a timetable.",
    },
    {
      type: "paragraphe",
      texte:
        "Ask your hotel which they recommend; the answer depends on where in the village you are staying, and on which one is running that week. Tell us the answer and we drop you at the right valley station.",
    },

    { type: "titre2", texte: "Avoriaz: the road ends at the car park" },
    {
      type: "paragraphe",
      texte:
        "Avoriaz is different in kind: there is a road up from Morzine, and it is open, but it stops at the multi-storey car parks on the edge of the resort. Inside, transport is by horse-drawn sledge, snowcat taxi or on skis — no cars at all.",
    },
    {
      type: "liste",
      items: [
        "We drive you to the car park entrance, 89 km and about 1 h 45 from Geneva.",
        "From there, a sledge or a snowcat takes you and your luggage to the accommodation.",
        "Book that last leg with your accommodation in advance, particularly for a late arrival.",
        "In heavy snow the access road is occasionally closed for clearance; the alternative is the Prodains cable car from Morzine.",
      ],
    },

    { type: "titre2", texte: "The others worth knowing" },
    {
      type: "liste",
      items: [
        "Saas-Fee, in the Valais: a road up to a car park at the village edge, and electric vehicles inside.",
        "Braunwald, above Linthal: reached only by funicular.",
        "Bettmeralp and Riederalp, on the Aletsch: cable cars from the Rhône valley.",
        "Stoos, above Schwyz: the steepest funicular in the world, and no road.",
        "Chamonix’s Le Tour, Vallorcine and the Aiguille du Midi are all road-served — the Chamonix valley is not car-free, despite what a few booking sites imply.",
      ],
    },

    { type: "titre2", texte: "How to plan the last stretch" },
    {
      type: "paragraphe",
      texte:
        "Three habits make all of this easy. First, tell your transfer company the name of your hotel rather than the name of the resort: it is the difference between being dropped at a station and being dropped at the right station. Second, give your hotel your train or cable car time so they meet you — most will, and it is usually free. Third, on the way home, take the departure before the one that works on paper.",
    },
    {
      type: "paragraphe",
      texte:
        "The trains and cable cars in these places are Swiss or French mountain infrastructure: they run in weather that would close a road, and they run on time. The uncertainty in your journey is the road below them, which is exactly the part we drive.",
    },

    { type: "titre2", texte: "What we do differently on these routes" },
    {
      type: "liste",
      items: [
        "We quote to the station or cable car, and we say so — no one arrives expecting a door.",
        "We time the drop-off against a departure rather than leaving you on a platform in the cold.",
        "We help you and your bags to the platform: on a Täsch or Lauterbrunnen arrival, that is part of the job.",
        "On the way home we build in a train’s margin, because a missed connection on the mountain is a missed flight in the valley.",
        "Ski and board bags travel free at every stage — including on the trains, where they are simply luggage.",
      ],
    },
  ],
};
