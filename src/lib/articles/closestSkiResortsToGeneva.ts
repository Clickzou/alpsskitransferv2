import type { Article } from "./types";

/**
 * Les stations les plus proches de l'aéroport de Genève, classées au temps de route.
 *
 * Classement et chiffres : `src/data/distances.ts` (routage OpenStreetMap, temps
 * sans trafic). Caractère des stations : les pages rédigées de
 * `src/lib/resorts/` (altitudes, domaines, routes d'accès) — Le Grand-Bornand,
 * La Clusaz, Les Carroz, Samoëns, Flaine, Les Gets, Saint-Gervais, Megève,
 * Argentière, Champéry. Si la table est recalculée, l'ordre peut changer :
 * relire la liste.
 */
export const closestSkiResortsToGeneva: Article = {
  slug: "closest-ski-resorts-to-geneva-airport",
  titre: "The closest ski resorts to Geneva airport, ranked by drive time",
  metaTitre: "Closest Ski Resorts to Geneva Airport, by Drive Time",
  metaDescription:
    "Le Grand-Bornand, Les Carroz, La Clusaz, Samoëns, Les Gets, Megève, Chamonix: the ski resorts nearest Geneva airport, ranked by real drive time.",
  chapo:
    "Fifteen ski resorts lie within two hours of Geneva airport on a clear road, and the order is not the one most people expect. Here they are ranked by measured drive time rather than by distance on a map, with what sets each apart for a week or a weekend — and the Saturday caveat that reshuffles the list.",
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",
  visuel: { nom: "blog-closest-ski-resorts-to-geneva", alt: "Valley motorway leading from the lowlands towards snowy Alpine peaks" },

  aRetenir: [
    "The closest ski resorts to Geneva airport by drive time are Le Grand-Bornand and Les Carroz (about 1 h 10), La Clusaz (1 h 12), Saint-Gervais (1 h 16) and Samoëns (1 h 17), on clear roads.",
    "Les Gets is 69 km and about 1 h 19 from Geneva, Megève 79 km and 1 h 22, Chamonix 91 km and 1 h 25, Flaine and Morzine about 1 h 29.",
    "Distance is a poor guide: Avoriaz is 89 km from Geneva but takes about 1 h 45 because of the climb from Morzine, while Chamonix, 91 km away, takes 1 h 25.",
    "Fifteen ski resorts served from Geneva are within two hours without traffic, including Courmayeur in Italy (1 h 36) and Villars-sur-Ollon and Champéry in Switzerland (1 h 41 and 1 h 44).",
    "On a February Saturday, add 45 minutes to an hour on the A40 towards Cluses and Chamonix; valley approaches such as Samoëns and La Clusaz are usually affected less.",
  ],

  stationsLiees: [
    "le-grand-bornand",
    "les-carroz-grand-massif",
    "la-clusaz",
    "saint-gervais",
    "samoens",
    "les-gets",
    "megeve",
    "chamonix",
    "flaine",
    "morzine",
    "courmayeur",
    "argentiere",
    "villars-sur-ollon",
    "champery",
    "avoriaz",
  ],

  trajetsLies: [
    { airport: "geneva-airport", resort: "le-grand-bornand" },
    { airport: "geneva-airport", resort: "la-clusaz" },
    { airport: "geneva-airport", resort: "les-carroz-grand-massif" },
    { airport: "geneva-airport", resort: "samoens" },
    { airport: "geneva-airport", resort: "les-gets" },
    { airport: "geneva-airport", resort: "megeve" },
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "flaine" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "The closest ski resorts to Geneva airport, by drive time on a clear road, are Le Grand-Bornand and Les Carroz, both about 1 h 10 away, followed by La Clusaz (1 h 12), Saint-Gervais (1 h 16) and Samoëns (1 h 17). Les Gets comes next at 1 h 19, then Megève (1 h 22), Chamonix (1 h 25), and Flaine and Morzine, both about 1 h 29. Fifteen ski resorts we serve from Geneva are within two hours, including Courmayeur on the Italian side of Mont Blanc and Villars-sur-Ollon and Champéry in Switzerland. The order is not the order of distance: Avoriaz is 89 km away but takes 1 h 45, while Chamonix, 91 km away, takes 1 h 25, because what decides a transfer is how much of it is motorway and how steep the last stretch is. For a short transfer with a large ski area behind it, Les Gets, Samoëns and Les Carroz are the strongest candidates; for high, serious terrain, Chamonix.",
    },
    {
      type: "paragraphe",
      texte:
        "All the times below come from the road network, measured from the airport to the centre of each resort. They are the times a driver holds on a quiet weekday. Saturdays in February are different, and they have their own section at the end.",
    },

    { type: "titre2", texte: "Which ski resorts are within two hours of Geneva airport?" },
    {
      type: "paragraphe",
      texte:
        "Here is the full ranking, shortest drive first, for the resorts we serve from Geneva. Where two resorts share a time, the nearer one in kilometres is listed first.",
    },
    {
      type: "liste",
      items: [
        "Le Grand-Bornand, France — 56 km, about 1 h 10.",
        "Les Carroz, France — 65 km, about 1 h 10.",
        "La Clusaz, France — 59 km, about 1 h 12.",
        "Saint-Gervais, France — 77 km, about 1 h 16.",
        "Samoëns, France — 67 km, about 1 h 17.",
        "Les Gets, France — 69 km, about 1 h 19.",
        "Megève, France — 79 km, about 1 h 22.",
        "Chamonix, France — 91 km, about 1 h 25.",
        "Morzine, France — 77 km, about 1 h 29.",
        "Flaine, France — 80 km, about 1 h 29.",
        "Courmayeur, Italy — 102 km, about 1 h 36.",
        "Argentière, France — 100 km, about 1 h 37.",
        "Villars-sur-Ollon, Switzerland — 123 km, about 1 h 41.",
        "Champéry, Switzerland — 128 km, about 1 h 44.",
        "Avoriaz, France — 89 km, about 1 h 45.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "One more destination in our list is inside two hours, but it is not a ski resort at all. Annecy, 54 km and 54 minutes from the airport, is a lakeside town — but it is where many Aravis holidays start, and La Clusaz and Le Grand-Bornand are about forty minutes beyond it. Just outside the two-hour line come Verbier (2 h 09) and Gstaad (2 h 10) in Switzerland.",
    },

    { type: "titre2", texte: "Why distance and drive time do not line up" },
    {
      type: "paragraphe",
      texte:
        "Put the list in order of kilometres and it looks quite different. Le Grand-Bornand and La Clusaz stay near the top, but Morzine and Saint-Gervais, both 77 km away, finish thirteen minutes apart, and Avoriaz, closer than Chamonix, falls to the bottom. Three things explain it.",
    },
    {
      type: "liste",
      items: [
        "The share of motorway. Chamonix and Saint-Gervais sit at the end of the A40, which runs almost all the way from Geneva; the last stretch is a valley road with no col. That is why Chamonix, at 91 km, is quicker than Morzine and Flaine, both more than ten kilometres nearer.",
        "The last climb. Flaine is reached by 20 km of hairpins from Cluses, rising from 480 m to 1,600 m. Avoriaz is reached by the road up from Morzine to 1,800 m. Both are short in distance and slow in time.",
        "The valley roads. La Clusaz, Le Grand-Bornand and Samoëns are reached by valley roads that climb gently, with no pass. They are not motorway-fast, but they do not slow to a crawl on a hairpin either.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The same logic explains why the times hold up differently in bad weather. A valley approach is slowed by snow; a long climb can be slowed a great deal more. If you are choosing between two resorts on a similar drive time and travelling in the heart of winter, the one without a climb at the end is usually the more predictable arrival.",
    },

    { type: "titre2", texte: "Le Grand-Bornand and La Clusaz: the Aravis, just over an hour away" },
    {
      type: "paragraphe",
      texte:
        "The Aravis resorts are the nearest serious skiing to Geneva. The route runs by motorway towards Annecy, then along valley roads to Saint-Jean-de-Sixt, where the road splits for the two villages, 12 km apart.",
    },
    {
      type: "paragraphe",
      texte:
        "La Clusaz, at 1,100 m, is a Savoyard village with five linked ski sectors rising directly from it — Beauregard, l’Étale, l’Aiguille, la Balme and Manigod — around 125 km of piste and skiing to 2,600 m. La Balme is the steep, north-facing end of the mountain, and the reason strong skiers keep returning. Le Grand-Bornand is quieter: a farming village at 950 m, with its ski-in ski-out side at Le Chinaillon, 6 km and 350 m higher, around 90 km of piste and skiing to 2,100 m.",
    },
    {
      type: "paragraphe",
      texte:
        "They suit families, mixed-ability groups and anyone who wants a real village rather than a purpose-built station. At Le Grand-Bornand, give the exact address when you book: the village and Le Chinaillon are a ten-minute drive apart, and at eleven at night that matters.",
    },

    { type: "titre2", texte: "Les Carroz, Samoëns and Flaine: the Grand Massif" },
    {
      type: "paragraphe",
      texte:
        "Three of the top ten share one lift system. The Grand Massif links Les Carroz, Samoëns, Morillon, Sixt and Flaine, around 265 km of piste in total, and the three resorts in this list reach it in very different ways — which is exactly what their drive times show.",
    },
    {
      type: "liste",
      items: [
        "Les Carroz — 1 h 10. The first Grand Massif village on the climb from Cluses, at 1,140 m, with only about 8 km of hairpins after the motorway. A south-facing plateau, a village square with cafés, and the Kédeuze gondola straight into the ski area.",
        "Samoëns — 1 h 17. A historic village at 720 m in the Giffre valley, reached without a col or a long climb. The Grand Massif Express gondola lifts you from the edge of the village to Samoëns 1600 and the pistes above, which run up to 2,500 m. One of the more reliable arrivals in bad weather.",
        "Flaine — 1 h 29. A purpose-built 1960s resort at 1,600 m, designed by Marcel Breuer, in a north-west-facing bowl that holds snow when lower resorts are patchy. Ski-in ski-out by design, and reached by the full 20 km climb from Cluses through Les Carroz.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The choice is really about where you want to sleep. Flaine gives you snow at the door and nothing else to do; Samoëns gives you a village with a life of its own and a gondola ride to the snow; Les Carroz sits in between, on the same lift pass, and is the shortest of the three transfers.",
    },

    { type: "titre2", texte: "Les Gets, Morzine and Avoriaz: the Portes du Soleil" },
    {
      type: "paragraphe",
      texte:
        "The Portes du Soleil is the big lift-linked circuit of the Chablais: twelve resorts on one pass either side of the Franco-Swiss border. Three of its French resorts and one Swiss one are within two hours of Geneva, and they could hardly be more different on arrival.",
    },
    {
      type: "liste",
      items: [
        "Les Gets — 69 km, 1 h 19. A village at 1,172 m on the col between the Arve valley and the Vallée d’Aulps, skiing to 2,002 m on the Chavannes and Mont Chéry sides, lift-linked to Morzine. The first proper ski resort you meet out of Geneva.",
        "Morzine — 77 km, 1 h 29. A valley town on the far side of the same col, lower and tree-lined, lift-linked to Les Gets and Avoriaz, known for its après-ski and its family-friendly, lower-altitude runs.",
        "Champéry — 128 km, 1 h 44. The Swiss end of the circuit, at 1,050 m at the head of the Val-d’Illiez, reached from the Rhône motorway at Monthey by a valley road with no high pass.",
        "Avoriaz — 89 km, 1 h 45. A car-free resort at 1,800 m, ski-in ski-out, above Morzine. The road ends at the car park at the edge of the resort, and the last leg to your accommodation is by sledge or snowcat.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For a week of mileage on one lift pass with a short transfer, Les Gets is hard to beat. For altitude and snow-sure slopes from the door, Avoriaz — but plan the last stretch, and book the sledge or snowcat with your accommodation if you land late.",
    },

    { type: "titre2", texte: "Saint-Gervais, Megève and Chamonix: the Mont Blanc side" },
    {
      type: "paragraphe",
      texte:
        "The A40 from Geneva ends under Mont Blanc, and three very different resorts sit at the end of it.",
    },
    {
      type: "liste",
      items: [
        "Saint-Gervais — 77 km, 1 h 16. A spa town at 850 m, motorway almost to the door. The Bettex gondola links it into the Evasion Mont-Blanc area, around 400 km of mostly tree-lined piste shared with Megève, Combloux, La Giettaz and Les Contamines. Name your level when you book: Le Fayet, the village and Saint-Nicolas-de-Véroce are three different arrivals.",
        "Megève — 79 km, 1 h 22. A medieval village at 1,113 m on a plateau facing Mont Blanc, on the same Evasion Mont-Blanc pass. Nothing on the road climbs above 1,150 m, so the approach stays clear when higher resorts are digging out. Skiing built for long days among the trees rather than for altitude.",
        "Chamonix — 91 km, 1 h 25. A mountain town under the highest summit in western Europe, with over 150 km of piste spread across separate sectors of the valley and some of the most demanding terrain in the Alps, from the Grands Montets to the Vallée Blanche.",
        "Argentière — 100 km, 1 h 37. The last village in the Chamonix valley before the Swiss border, at 1,240 m, at the foot of the Grands Montets, which rise to 3,275 m. Where strong skiers stay when they come to Chamonix.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Chamonix is the outlier in this ranking. It is not the closest, and it is not the easiest place for a first week on skis. But at 1 h 25, it is one of the quickest routes from an international airport to genuinely high, glaciated terrain in the Alps — which is why so many people accept the extra few minutes over Les Gets.",
    },

    { type: "titre2", texte: "Across the borders: Courmayeur, Villars and Champéry" },
    {
      type: "paragraphe",
      texte:
        "Geneva sits on a border, and three of the resorts within two hours of it are outside France. Courmayeur, in Italy’s Aosta valley, is 102 km and about 1 h 36 away through the Mont Blanc tunnel — quicker than from Turin, the nearest Italian airport. The tunnel toll, like every toll on the route, is included in the price we quote.",
    },
    {
      type: "paragraphe",
      texte:
        "On the Swiss side, the Rhône motorway runs along Lake Geneva towards the Valais, and the Vaud and Chablais resorts come off it. Villars-sur-Ollon is 123 km and about 1 h 41 away; Champéry, the Swiss gateway to the Portes du Soleil, 128 km and 1 h 44. Verbier, at 2 h 09, is just beyond the two-hour line. None of these crossings needs anything from you beyond an identity document: France, Switzerland and Italy are all in the Schengen area.",
    },

    { type: "titre2", texte: "Which of these resorts suits which trip?" },
    {
      type: "liste",
      items: [
        "The shortest possible transfer with a large ski area: Les Carroz (1 h 10, Grand Massif) or Les Gets (1 h 19, Portes du Soleil).",
        "A first ski holiday, or a family with young children: La Clusaz, Le Grand-Bornand or Megève — real villages, gentle approaches, plenty of easy terrain.",
        "Snow at the door, whatever the season: Flaine (1,600 m) or Avoriaz (1,800 m), accepting a slower last climb.",
        "Strong skiers and off-piste: Chamonix or Argentière.",
        "A village with a life beyond skiing: Samoëns, Saint-Gervais or Megève.",
        "A long weekend: anything in the first eight lines of the ranking, where a morning landing still leaves an afternoon on the snow.",
        "The most reliable arrival in heavy snow: the valley approaches — Samoëns, La Clusaz, Le Grand-Bornand, Megève.",
      ],
    },

    { type: "titre2", texte: "How Saturday changes the ranking" },
    {
      type: "paragraphe",
      texte:
        "Every figure in this article is a clear-road time. On a Saturday in February the whole of the northern French Alps changes over on the same morning, and the A40 between Geneva, Cluses and Sallanches — the road that serves the Grand Massif, the Portes du Soleil and the Mont Blanc valley — slows badly. On those days, add 45 minutes to an hour to the times for Les Gets, Morzine, Avoriaz, Flaine, Megève and Chamonix.",
    },
    {
      type: "paragraphe",
      texte:
        "The valley approaches suffer less. For Samoëns, allow an extra 30 to 45 minutes; for La Clusaz and Le Grand-Bornand, where the queue builds on the last 15 km, about half an hour. On a busy Saturday, then, the Aravis can move clearly ahead of the Chablais and the Mont Blanc valley, even though the clear-road times are close.",
    },
    {
      type: "paragraphe",
      texte:
        "If your dates can move, a midweek arrival saves that time in both directions, and the flights are usually cheaper as well. Winter tyres or chains are legally required in Haute-Savoie from 1 November to 31 March, and our vehicles carry both, whatever day you travel.",
    },

    { type: "titre2", texte: "The resorts that are not close to Geneva, whatever you read" },
    {
      type: "paragraphe",
      texte:
        "Geneva is often described as the airport for the French Alps as a whole. For the Tarentaise it is not the nearest. Méribel is 2 h 25 from Geneva, Courchevel 2 h 32, Val Thorens and La Plagne 2 h 44, Tignes 3 h 07 and Val d’Isère 3 h 14, all without traffic. Every one of them is about an hour closer to Chambéry, and roughly eleven minutes closer to Lyon. If your resort is in the Three Valleys, the Geneva ranking above is not the list to use.",
    },
    {
      type: "paragraphe",
      texte:
        "For everything north of Albertville, though, Geneva is the right airport: it flies every day of the week from most European cities, and fifteen ski resorts are within an hour and three quarters of its arrivals hall. Book the transfer when you book the flight — on the February Saturdays, the vehicles run out before the beds do.",
    },
  ],

  faq: [
    {
      question: "What is the closest ski resort to Geneva airport?",
      reponse:
        "By drive time, Le Grand-Bornand (56 km) and Les Carroz (65 km), both about 1 h 10 without traffic. La Clusaz follows at 1 h 12 and Saint-Gervais at 1 h 16.",
    },
    {
      question: "How long is the transfer from Geneva to Chamonix?",
      reponse:
        "About 1 h 25 for 91 km on a clear road, almost all of it motorway. On a Saturday in February, allow 45 minutes to an hour more for traffic on the A40.",
    },
    {
      question: "Is Les Gets or Morzine closer to Geneva?",
      reponse:
        "Les Gets: 69 km and about 1 h 19, against 77 km and 1 h 29 for Morzine, which lies on the far side of the same col. The two are lift-linked in the Portes du Soleil.",
    },
    {
      question: "Why does Avoriaz take longer than Chamonix from Geneva?",
      reponse:
        "Avoriaz is 89 km away but ends with the climb from Morzine to 1,800 m, so it takes about 1 h 45. Chamonix, 91 km away, is reached almost entirely by motorway in about 1 h 25.",
    },
    {
      question: "Which ski resorts near Geneva are best in bad weather?",
      reponse:
        "Those reached by valley roads without a long climb: Samoëns, La Clusaz, Le Grand-Bornand and Megève. Snow slows these approaches but rarely stops them.",
    },
    {
      question: "Is Geneva the best airport for Val Thorens or Courchevel?",
      reponse:
        "No. Val Thorens is 2 h 44 from Geneva against 1 h 40 from Chambéry, and Courchevel 2 h 32 against 1 h 28. Geneva makes sense only when the flights demand it.",
    },
  ],
};
