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
    fr: {
      slug: "ou-s-arrete-la-voiture-en-station",
      titre: "Où la voiture s’arrête vraiment, station par station",
      metaTitre: "Où s’arrête la voiture en station de ski ?",
      metaDescription:
        "Val Thorens, Belle Plagne, Les Arcs, Avoriaz : où le véhicule vous dépose réellement, ce que deviennent les skis, et comment prévoir les derniers mètres.",
      altVisuel: "Station piétonne des Alpes, atteinte à pied ou en navette",
      chapo:
        "« Dépose devant votre logement » ne veut pas dire la même chose partout. Dans une station piétonne, la voiture s’arrête à un parking et les derniers cent cinquante mètres se font avec les bagages — à pied, en luge à skis ou en chenillette. Voici où c’est le cas dans les stations que nous desservons, et comment on prévoit ces derniers mètres pour qu’ils soient la partie agréable du voyage.",
      stationsLiees: [
        "val-thorens",
        "la-plagne",
        "les-arcs",
        "les-menuires",
        "courchevel",
        "tignes",
      ],
      contenu: [
        {
          type: "paragraphe",
          texte:
            "La question ne se pose presque jamais avant le départ, et toujours à l’arrivée, à dix-neuf heures, avec deux enfants fatigués et quatre paires de skis. Elle mérite deux minutes de lecture.",
        },

        { type: "titre2", texte: "Val Thorens : le centre est piéton" },
        {
          type: "paragraphe",
          texte:
            "La station est accessible en voiture jusqu’à ses parkings, mais son cœur ne l’est pas : les rues centrales sont piétonnes, et la circulation y est réglementée. Concrètement, le véhicule vous dépose au plus près de votre résidence selon l’accès du jour, et les derniers mètres se font à pied. Beaucoup de résidences prêtent des luges à bagages — demandez-le à la réservation de votre logement, pas en arrivant.",
        },
        {
          type: "paragraphe",
          texte:
            "Ajoutez la montée depuis Moûtiers : 37 kilomètres et une heure, souvent la partie la plus lente des 161 km depuis Genève. Un samedi de février, la file d’attente à l’entrée de la station fait partie du trajet.",
        },

        { type: "titre2", texte: "La Plagne : six villages, et deux entièrement piétons" },
        {
          type: "paragraphe",
          texte:
            "Belle Plagne et Plagne Centre sont conçues sans voitures : on entre par un parking couvert et on rejoint son immeuble par des galeries et des passerelles. Plagne 1800, Plagne Villages et Montalbert se conduisent normalement. Sur une même « station », l’arrivée n’a donc rien à voir selon le village — c’est pourquoi nous demandons le nom du village et de la résidence, pas seulement « La Plagne ».",
        },

        { type: "titre2", texte: "Les Arcs : le funiculaire depuis Bourg-Saint-Maurice" },
        {
          type: "paragraphe",
          texte:
            "Arc 1600 est reliée à Bourg-Saint-Maurice par un funiculaire de sept minutes, et c’est parfois le trajet le plus rapide en fin de journée. Les quatre villages — 1600, 1800, 1950 et 2000 — sont accessibles par la route, mais 1950 et 2000 ont des zones piétonnes et des accès qui se ferment en cas de forte neige. Là encore : le numéro du village change tout.",
        },

        { type: "titre2", texte: "Avoriaz : la route s’arrête au parking" },
        {
          type: "paragraphe",
          texte:
            "C’est le cas français le plus net, même si nous n’y publions pas encore de page. Aucune voiture n’entre à Avoriaz : le véhicule s’arrête au parking à l’entrée, et la station se parcourt à pied, en traîneau tiré par des chevaux ou en chenillette. Les hôtels organisent le transport des bagages — prévenez-les de votre heure d’arrivée, c’est la seule chose à faire.",
        },

        { type: "titre2", texte: "Les autres cas à connaître" },
        {
          type: "liste",
          items: [
            "Les Menuires et Courchevel : accessibles en voiture, mais leurs quartiers s’étagent sur plusieurs centaines de mètres de dénivelé. L’adresse compte plus que le nom de la station.",
            "Tignes et Val d’Isère : la route du Val Claret et celle qui monte du barrage peuvent fermer temporairement en cas de risque d’avalanche. C’est rare, c’est annoncé, et cela décale une prise en charge.",
            "Hors de France, les cas radicaux existent : Zermatt s’arrête à Täsch, Wengen à Lauterbrunnen. Nous le disons avant la réservation sur les pages concernées.",
          ],
        },

        { type: "titre2", texte: "Prévoir les derniers mètres" },
        {
          type: "liste",
          items: [
            "Donnez l’adresse complète : village, résidence, rue. Pas seulement la station.",
            "Dites-nous l’étage et l’ascenseur si vous en avez un : cela change le point de dépose.",
            "Demandez à votre logeur s’il prête une luge à bagages — la plupart le font, presque personne ne le sait.",
            "Prévoyez un quart d’heure de plus à l’arrivée dans une station piétonne. C’est le temps que prend la dernière étape, pas un retard.",
          ],
        },

        {
          type: "paragraphe",
          texte:
            "Ce que nous faisons de notre côté : nous disons où la voiture s’arrête avant la réservation, pas à l’arrivée, et nous choisissons le point de dépose le plus proche autorisé le jour même — ce qui dépend de la neige et de l’heure autant que de la carte.",
        },
      ],
    },
    it: {
      slug: "dove-finisce-la-strada",
      titre: "Dove finisce la strada, località per località",
      metaTitre: "Dove finisce la strada nelle località sciistiche",
      metaDescription:
        "Cervinia, Courmayeur, Champoluc, Chamois: dove il veicolo ti lascia davvero, che cosa succede agli sci e come prevedere gli ultimi metri.",
      altVisuel: "Località senza auto, raggiungibile a piedi o in funivia",
      chapo:
        "« Ti lasciamo davanti all’alloggio » non significa la stessa cosa ovunque. In alcune località la strada si ferma a un parcheggio, in altre una valle chiude d’inverno al traffico privato. Ecco dove succede tra le località che serviamo, e come si prevedono gli ultimi metri perché siano la parte piacevole del viaggio.",
      stationsLiees: [
        "cervinia",
        "courmayeur",
        "champoluc",
        "alagna-valsesia",
        "gressoney",
        "selva-val-gardena",
      ],
      contenu: [
        {
          type: "paragraphe",
          texte:
            "La domanda non si pone quasi mai alla partenza, e sempre all’arrivo, alle sette di sera, con due bambini stanchi e quattro paia di sci. Vale due minuti di lettura.",
        },

        { type: "titre2", texte: "Courmayeur: la Val Ferret chiude d’inverno" },
        {
          type: "paragraphe",
          texte:
            "Courmayeur si raggiunge in auto senza problemi, ma la Val Ferret — dove si trovano molti chalet e agriturismi — è chiusa al traffico privato nei mesi invernali. Si arriva fino a Planpincieux o al parcheggio della valle, poi si prosegue con la navetta o a piedi. Se il tuo alloggio è in Val Ferret, dicci il nome esatto: cambia il punto in cui ti lasciamo, non il prezzo.",
        },
        {
          type: "paragraphe",
          texte:
            "Vale la pena ricordare un’altra cosa su Courmayeur: l’aeroporto più rapido non è italiano. Ginevra dista 102 km contro i 158 di Torino — un’ora e mezza contro due.",
        },

        { type: "titre2", texte: "Cervinia: il Breuil è in gran parte pedonale" },
        {
          type: "paragraphe",
          texte:
            "Breuil-Cervinia si raggiunge in auto fino ai parcheggi, ma il centro è pedonale e la circolazione è regolata: gli ultimi metri si fanno a piedi, con i bagagli. La salita da Châtillon aggiunge poi 27 km di tornanti ai 121 km da Torino — è la parte lenta del tragitto, e in caso di nevicata è quella che conta.",
        },

        { type: "titre2", texte: "Monterosa Ski: tre valli, tre strade separate" },
        {
          type: "paragraphe",
          texte:
            "Champoluc, Gressoney e Alagna sono collegate sugli sci ma non sulla strada: passare dall’una all’altra in auto significa ridiscendere in fondovalle e risalire, un’ora e mezza buona. Se prenoti il rientro da una valle diversa da quella di arrivo, diccelo alla prenotazione — è un tragitto diverso, non una variazione.",
        },

        { type: "titre2", texte: "Chamois: il caso limite" },
        {
          type: "paragraphe",
          texte:
            "Non lo serviamo, ma merita di essere conosciuto perché è l’unico comune italiano senza strada di accesso: ci si arriva solo con la funivia da Buisson, o a piedi. Chi ci va prenota il transfer fino a Buisson e prosegue con l’impianto, che ha orari — non è un dettaglio da scoprire alle undici di sera.",
        },

        { type: "titre2", texte: "Gli altri casi da conoscere" },
        {
          type: "liste",
          items: [
            "Selva Val Gardena: raggiungibile in auto, ma il paese si allunga per chilometri lungo la statale. L’indirizzo conta più del nome della località.",
            "Sestriere e Sauze d’Oulx: strade principali, sgomberate tutta la stagione. La salita da Oulx a Sauze è però ripida e stretta in caso di neve.",
            "Fuori dall’Italia, i casi radicali esistono: Zermatt si ferma a Täsch, Wengen a Lauterbrunnen. Lo diciamo prima della prenotazione nelle pagine interessate.",
          ],
        },

        { type: "titre2", texte: "Prevedere gli ultimi metri" },
        {
          type: "liste",
          items: [
            "Dai l’indirizzo completo: frazione, residence, via. Non solo la località.",
            "Se l’alloggio è in una valle chiusa d’inverno, dillo alla prenotazione.",
            "Chiedi al proprietario se presta una slitta portabagagli: molti lo fanno, quasi nessuno lo sa.",
            "Metti in conto un quarto d’ora in più all’arrivo in una località pedonale. È il tempo dell’ultima tappa, non un ritardo.",
          ],
        },

        {
          type: "paragraphe",
          texte:
            "Quello che facciamo noi: diciamo dove finisce la strada prima della prenotazione, non all’arrivo, e scegliamo il punto di discesa più vicino consentito quel giorno — che dipende dalla neve e dall’ora quanto dalla mappa.",
        },
      ],
    },
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
