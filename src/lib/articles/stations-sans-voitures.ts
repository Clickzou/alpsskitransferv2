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
  visuel: { nom: "station-avoriaz", alt: "Avoriaz, a car-free resort reached on foot from the drop-off" },
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
  /**
   * Version allemande — le sujet est encore plus à sa place ici qu'en anglais :
   * Zermatt, Wengen, Mürren, Saas-Fee, Bettmeralp, Braunwald et Stoos sont
   * toutes en Suisse alémanique. C'est le lecteur germanophone qui connaît le
   * mieux ces endroits, et c'est donc à lui qu'il faut donner des horaires
   * plutôt que des généralités.
   */
  traductions: {
    de: {
      slug: "autofreie-skiorte",
      titre: "Autofreie Skiorte: wie Sie wirklich hinkommen",
      metaTitre: "Autofreie Skiorte: wie Sie wirklich hinkommen",
      metaDescription:
        "Zermatt, Wengen, Mürren, Saas-Fee, Bettmeralp: wo die Straße endet, was mit dem Gepäck passiert, und wie Sie die letzte Etappe planen.",
      altVisuel: "Autofreier Skiort, erreichbar nur zu Fuß oder mit der Bahn",
      chapo:
        "Einige der schönsten Orte der Alpen sind mit dem Auto nicht erreichbar, und die Transferanbieter, die Sie dorthin fahren, sagen das nicht immer gern. Hier steht, wo die Straße bei jedem von ihnen tatsächlich endet, was an diesem Punkt mit Ski und Koffern passiert, und wie Sie die letzten zwanzig Minuten so planen, dass sie der angenehme Teil der Reise werden und nicht der Moment, in dem es kippt.",
      stationsLiees: ["zermatt", "davos", "st-moritz"],
      contenu: [
        {
          type: "paragraphe",
          texte:
            "Autofrei ist bei diesen Orten keine Marketingzeile. In Zermatt, Wengen und Mürren gibt es überhaupt keine Straße: Die Dörfer entstanden vor dem Auto und wurden nie angebunden. In Saas-Fee führt eine Straße hinauf, endet aber am Parkhaus vor dem Ort. In jedem Fall ist die letzte Etappe eine Bahn, eine Seilbahn oder ein Elektrofahrzeug — und sie hat einen Fahrplan.",
        },
        {
          type: "paragraphe",
          texte:
            "Nichts davon ist ein Problem, wenn man es vorher weiß. Es wird eines um elf Uhr abends, im Februar, mit vier Koffern, drei Skisäcken und einem Kind, das seit sechs Uhr früh unterwegs ist.",
        },

        { type: "titre2", texte: "Zermatt: die Straße endet in Täsch" },
        {
          type: "paragraphe",
          texte:
            "Zermatt hat Verbrennungsfahrzeuge in den 1960er-Jahren verboten und hält daran fest. Jeder Straßentransfer — unserer eingeschlossen — endet am Matterhorn Terminal in Täsch, 5 km talauswärts. Der Shuttlezug fährt tagsüber etwa alle zwanzig Minuten und braucht zwölf.",
        },
        {
          type: "liste",
          items: [
            "Das Terminal ist überdacht, mit Gepäckwagen am Bahnsteig und einem großen Parkhaus.",
            "Tickets kauft man vor Ort; Ski und Gepäck fahren ohne Aufpreis mit.",
            "Der Bahnhof Zermatt liegt mitten im Dorf, und die meisten Hotels schicken ein Elektrotaxi zu einem Zug, den Sie ihnen genannt haben.",
            "Die Züge fahren bis in den Abend — prüfen Sie den letzten, wenn Sie spät landen.",
            "Auf dem Rückweg planen Sie einen Zug mehr ein, als die Rechnung ergibt: Ihr Fahrer wartet in Täsch, der Flug nicht.",
          ],
        },
        {
          type: "paragraphe",
          texte:
            "Nach Täsch sind es 251 km und rund 4 h 15 ab Zürich, 237 km und rund 3 h 10 ab Genf, und 195 km und rund 3 h ab Mailand Malpensa. Die zwölf Minuten Bahn kommen überall obendrauf.",
        },

        { type: "titre2", texte: "Wengen: eine Zahnradbahn die Wand hinauf" },
        {
          type: "paragraphe",
          texte:
            "Wengen liegt auf einer Terrasse über dem Lauterbrunnental und hatte nie eine Straße. Die Wengernalpbahn fährt seit 1893 hinauf, in rund fünfzehn Minuten, etwa halbstündlich. Straßentransfers enden am Bahnhof Lauterbrunnen, mitten im Dorf, wenige Schritte vom Bahnsteig.",
        },
        {
          type: "paragraphe",
          texte:
            "Lauterbrunnen liegt 149 km und rund 2 h 30 von Zürich, 226 km und rund 2 h 50 von Genf. Die Hotels in Wengen holen ihre Gäste mit Elektrowagen oder Schlitten am Zug ab, wenn Sie die Ankunftszeit durchgeben — was sich lohnt, denn die Dorfstraße ist kein Ort, an dem man einen Koffer durch den Schnee zieht.",
        },

        { type: "titre2", texte: "Mürren: Seilbahn oder Standseilbahn und Bergbahn" },
        {
          type: "paragraphe",
          texte:
            "Mürren, auf der anderen Seite desselben Tals, erreicht man entweder mit der Seilbahn ab Stechelberg — 6 km talaufwärts von Lauterbrunnen — oder mit der Standseilbahn nach Grütschalp und der kleinen Bahn entlang der Felskante. Beides dauert insgesamt rund zwanzig Minuten, und beides fährt nach Fahrplan.",
        },
        {
          type: "paragraphe",
          texte:
            "Fragen Sie Ihr Hotel, welche Variante es empfiehlt: Die Antwort hängt davon ab, wo im Dorf Sie wohnen und welche der beiden in dieser Woche fährt. Sagen Sie uns die Antwort, und wir setzen Sie an der richtigen Talstation ab.",
        },

        { type: "titre2", texte: "Saas-Fee: die Straße endet am Parkhaus" },
        {
          type: "paragraphe",
          texte:
            "Saas-Fee ist ein anderer Fall: Es gibt eine Straße hinauf, sie ist offen, aber sie endet an den Parkhäusern am Ortsrand. Im Dorf selbst fahren nur Elektrofahrzeuge. Wir bringen Sie bis zum Parkhaus; von dort holt Sie ein Elektrotaxi des Hotels ab, wenn Sie es angekündigt haben.",
        },
        {
          type: "paragraphe",
          texte:
            "Diese letzte Etappe im Voraus zu buchen ist bei später Ankunft kein Luxus. Um elf Uhr abends steht am Parkhaus niemand, der spontan einspringt.",
        },

        { type: "titre2", texte: "Die anderen, die man kennen sollte" },
        {
          type: "liste",
          items: [
            "Bettmeralp und Riederalp am Aletschgletscher: Seilbahnen aus dem Rhonetal, kein Autozugang.",
            "Braunwald über Linthal: nur mit der Standseilbahn erreichbar.",
            "Stoos über Schwyz: die steilste Standseilbahn der Welt, und keine Straße.",
            "Rigi: Zahnradbahnen ab Vitznau und Arth-Goldau.",
            "Avoriaz in Frankreich: Straße bis zum Parkhaus, im Ort Pferdeschlitten und Pistenraupen-Taxis.",
            "Nicht autofrei, entgegen mancher Buchungsseite: Grindelwald, Davos, St. Moritz und das ganze Chamonixtal sind mit dem Fahrzeug erreichbar.",
          ],
        },

        { type: "titre2", texte: "Wie Sie die letzte Etappe planen" },
        {
          type: "paragraphe",
          texte:
            "Drei Gewohnheiten machen das alles einfach. Erstens: Nennen Sie Ihrem Transferanbieter den Namen des Hotels und nicht den des Orts — das ist der Unterschied zwischen dem richtigen und dem falschen Bahnhof. Zweitens: Geben Sie Ihrem Hotel die Zeit Ihres Zugs oder Ihrer Seilbahn durch, damit man Sie abholt; die meisten tun das, meist kostenlos. Drittens: Nehmen Sie auf dem Rückweg die Abfahrt vor derjenigen, die auf dem Papier passt.",
        },
        {
          type: "paragraphe",
          texte:
            "Die Bahnen und Seilbahnen an diesen Orten sind Schweizer Bergverkehr: Sie fahren bei Wetter, das eine Straße sperren würde, und sie fahren pünktlich. Die Unsicherheit Ihrer Reise liegt in der Straße darunter — und genau die fahren wir.",
        },

        { type: "titre2", texte: "Was wir auf diesen Strecken anders machen" },
        {
          type: "liste",
          items: [
            "Wir nennen den Preis bis zum Bahnhof oder zur Seilbahn und sagen das vorher — niemand steht überrascht vor einer Schranke.",
            "Wir stimmen die Ankunft auf eine Abfahrt ab, statt Sie auf einem kalten Bahnsteig warten zu lassen.",
            "Wir helfen Ihnen mit dem Gepäck bis zum Bahnsteig: In Täsch oder Lauterbrunnen gehört das zur Fahrt.",
            "Auf dem Rückweg rechnen wir einen Zug Reserve ein, denn ein verpasster Anschluss am Berg ist ein verpasster Flug im Tal.",
            "Ski- und Snowboardtaschen fahren auf jeder Etappe kostenlos mit — auch in den Bahnen, wo sie schlicht Gepäck sind.",
          ],
        },
      ],
    },
  },
};
