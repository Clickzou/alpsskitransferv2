import type { Article } from "./types";

/**
 * Article 1 des trois de démarrage.
 *
 * Les distances et durées citées viennent de `src/data/distances.ts` (routage
 * OpenStreetMap, 2 108 liaisons). Si la table est recalculée, relire les chiffres
 * de cet article : c'est le seul endroit du site où ils sont écrits en dur.
 */
export const quelAeroportAlpes: Article = {
  slug: "which-airport-for-the-french-alps",
  titre: "Which airport should you fly into for the French Alps?",
  metaTitre: "Which Airport for the French Alps? Geneva vs Lyon",
  metaDescription:
    "Geneva, Lyon, Chambéry, Grenoble or Annecy? Real road distances and drive times to 22 Alpine resorts, and how to choose between them.",
  chapo:
    "Geneva is the default answer, and for a good half of the Alps it is the wrong one. This is a comparison of the five airports that serve the French Alps — with the real road distances and drive times to 22 resorts, measured on the road network rather than guessed — and a method for choosing between them that takes thirty seconds.",
  visuel: { nom: "aeroport-geneva-airport", alt: "Geneva airport terminal, the busiest gateway to the Alps" },
  datePublication: "2026-09-08",
  auteur: "Alps Ski Transfers",

  stationsLiees: [
    "chamonix",
    "morzine",
    "les-gets",
    "megeve",
    "flaine",
    "la-clusaz",
    "courchevel",
    "meribel",
    "val-thorens",
    "les-menuires",
    "la-plagne",
    "les-arcs",
    "tignes",
    "val-disere",
    "alpe-dhuez",
    "les-deux-alpes",
    "serre-chevalier",
    "chamrousse",
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Most people book the flight first and think about the transfer afterwards. That is the wrong way round for a ski holiday, because the difference between airports is not twenty minutes — it is up to two hours each way, and it decides whether you ski on your arrival day or spend it in a vehicle.",
    },
    {
      type: "paragraphe",
      texte:
        "Below are the five airports that serve the French Alps, what each is actually good for, and the road times to the resorts. All the distances come from the road network, not from a straight line on a map: they are the times a driver holds on a clear weekday.",
    },

    { type: "titre2", texte: "Geneva (GVA): the default, and rightly so — for the north" },
    {
      type: "paragraphe",
      texte:
        "Geneva is the busiest gateway to the Alps and the one with flights every day of the week from most European cities. That last point matters more than any distance: it is the only airport of the five where you can land on a Wednesday morning without a charter.",
    },
    {
      type: "paragraphe",
      texte:
        "It is unbeatable for the northern resorts. Le Grand-Bornand is 56 km away (1 h 10), La Clusaz 59 km (1 h 12), Samoëns 67 km (1 h 17), Les Gets 69 km (1 h 19), Saint-Gervais 77 km (1 h 16), Morzine 77 km (1 h 29), Megève 79 km (1 h 22), Flaine 80 km (1 h 29), Avoriaz 89 km (1 h 45), Chamonix 91 km (1 h 25). Land at midday and you are on the snow by mid-afternoon.",
    },
    {
      type: "paragraphe",
      texte:
        "It is much less obviously right for the Tarentaise. Val Thorens is 161 km and 2 h 44 from Geneva, Courchevel 149 km and 2 h 32, Tignes 182 km and 3 h 07 — all of them closer to Chambéry. And for the southern Alps it is simply the wrong airport: Serre Chevalier is 247 km and nearly four hours away.",
    },

    { type: "titre2", texte: "Chambéry Savoie (CMF): the Tarentaise airport" },
    {
      type: "paragraphe",
      texte:
        "Chambéry is small, close, and open mainly at weekends: its winter timetable is built around Saturday charters from the UK and northern Europe. If your dates are Saturday to Saturday, it is very often the best choice in this list.",
    },
    {
      type: "paragraphe",
      texte:
        "The numbers speak for themselves in the Three Valleys and the Tarentaise: Méribel 103 km (1 h 21), Courchevel 110 km (1 h 28), Les Menuires 114 km (1 h 40), La Plagne 121 km (1 h 41), Val Thorens 122 km (1 h 40), Les Arcs 122 km (1 h 43), Tignes 142 km (2 h 03), Val d’Isère 144 km (2 h 10). Against Geneva, that is an hour saved each way for most of them.",
    },
    {
      type: "paragraphe",
      texte:
        "The catch is the timetable. If you want to travel midweek, or your flight home is on a Thursday, Chambéry frequently has nothing at all.",
    },

    { type: "titre2", texte: "Grenoble Alpes-Isère (GNB): the southern Alps and the Oisans" },
    {
      type: "paragraphe",
      texte:
        "Grenoble has the same weekend-heavy winter pattern as Chambéry, with charters from the UK, Netherlands and Scandinavia, and it usually undercuts Geneva on fares. It exists for the Oisans and the Southern Alps: Chamrousse 78 km (1 h 11), Alpe d’Huez 106 km (1 h 38), Les Deux Alpes 110 km (1 h 42), Serre Chevalier 155 km (2 h 57).",
    },
    {
      type: "paragraphe",
      texte:
        "For those four resorts, no other airport comes close — Alpe d’Huez from Geneva is 216 km and three hours.",
    },

    { type: "titre2", texte: "Lyon Saint-Exupéry (LYS): the all-week alternative" },
    {
      type: "paragraphe",
      texte:
        "Lyon is the airport people forget. It is a major hub with year-round flights, far more airlines than Chambéry or Grenoble, and a straight motorway run to Albertville that puts the whole Tarentaise within two and a half to three hours. It is rarely the shortest transfer and it is frequently the cheapest arrival, particularly in February when Geneva fares climb.",
    },
    {
      type: "paragraphe",
      texte:
        "Rule of thumb: if Chambéry has no flight on your dates, compare Lyon before you assume Geneva.",
    },

    { type: "titre2", texte: "Annecy (NCY): close, and mostly theoretical" },
    {
      type: "paragraphe",
      texte:
        "On paper Annecy is the winner for a dozen resorts: La Clusaz and Le Grand-Bornand are 34 km away (39 minutes), Samoëns 68 km (1 h 02), Saint-Gervais 78 km (1 hour), Chamonix 92 km (1 h 10) — quicker than Geneva in every case.",
    },
    {
      type: "paragraphe",
      texte:
        "In practice its scheduled winter traffic is very thin. Check it, because when it does fly your dates it is the shortest transfer in the Alps; then book Geneva.",
    },

    { type: "titre2", texte: "The Italian and Swiss options nobody mentions" },
    {
      type: "paragraphe",
      texte:
        "Two more airports are worth knowing about for the border resorts. Turin is the closest airport to Serre Chevalier — 131 km and 2 h 44 through the Fréjus tunnel, against 2 h 57 from Grenoble — and to Montgenèvre, at 105 km. It is also the way to Sestriere and Sauze d’Oulx. Milan Malpensa is the closest big airport to Zermatt, at 195 km through the Simplon.",
    },
    {
      type: "paragraphe",
      texte:
        "For a resort on the frontier, the nearest airport is often in the other country, and the fare difference can be substantial.",
    },

    { type: "titre2", texte: "The Saturday problem" },
    {
      type: "paragraphe",
      texte:
        "Every figure above is a clear-road time. On a Saturday in February, the whole French Alps changes over on the same morning, and the two roads that matter — the A40 towards Chamonix and the Tarentaise between Albertville and Moûtiers — slow to a crawl. Add 45 minutes to an hour on those days, whatever the airport.",
    },
    {
      type: "paragraphe",
      texte:
        "If your dates allow a midweek arrival, you gain that hour twice, and you will also find flights and accommodation cheaper. It is the single biggest saving available on an Alpine trip, and it costs nothing but flexibility.",
    },

    { type: "titre2", texte: "How to choose, in three questions" },
    {
      type: "liste",
      items: [
        "Where are you staying? North of Albertville — Chamonix, the Portes du Soleil, the Grand Massif, the Aravis — fly Geneva. Tarentaise and Three Valleys — fly Chambéry if your dates are Saturday to Saturday, Lyon or Geneva otherwise. Oisans and Southern Alps — fly Grenoble, or Turin for Serre Chevalier and Montgenèvre.",
        "When are you flying? Midweek narrows the list to Geneva and Lyon, and saves an hour of traffic each way.",
        "How many of you are there? A private transfer is priced per vehicle, so a group of six pays once. That often makes the shorter, quieter route from a smaller airport cheaper overall than the crowded one.",
      ],
    },

    { type: "titre2", texte: "The short version" },
    {
      type: "liste",
      items: [
        "Chamonix, Morzine, Les Gets, Flaine, Samoëns, Megève, La Clusaz — Geneva, an hour to an hour and a half.",
        "Courchevel, Méribel, Val Thorens, Les Menuires, La Plagne, Les Arcs — Chambéry at weekends, Lyon or Geneva midweek.",
        "Tignes and Val d’Isère — Chambéry (2 h 03 and 2 h 10), Geneva if the flights demand it.",
        "Alpe d’Huez, Les Deux Alpes, Chamrousse — Grenoble, under two hours.",
        "Serre Chevalier and Montgenèvre — Turin, through the Fréjus tunnel.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Whichever you choose, book the transfer when you book the flight rather than the week before. In February the vehicles run out before the beds do.",
    },
  ],

  /**
   * Version française — adaptée, pas traduite : le lecteur francophone connaît
   * les stations et cherche l'aéroport, pas une présentation des Alpes.
   */
  traductions: {
    fr: {
      slug: "quel-aeroport-pour-les-alpes",
      titre: "Quel aéroport choisir pour les Alpes françaises ?",
      metaTitre: "Quel aéroport pour les Alpes ? Genève, Lyon, Chambéry",
      metaDescription:
        "Genève, Lyon, Chambéry, Grenoble ou Annecy : distances routières réelles et temps de trajet vers 22 stations, et comment choisir en trois questions.",
      chapo:
        "Genève est la réponse par défaut, et pour la moitié des Alpes c’est la mauvaise. Voici les cinq aéroports qui desservent les Alpes françaises, avec les distances et les temps de route réels — mesurés sur le réseau routier, pas estimés — et une méthode pour choisir en trente secondes.",
      contenu: [
        {
          type: "paragraphe",
          texte:
            "On réserve le vol, puis on cherche un transfert. C’est l’ordre inverse de celui qui convient à un séjour au ski : entre deux aéroports, l’écart n’est pas de vingt minutes mais de deux heures dans chaque sens, et il décide si vous skiez le jour de votre arrivée ou si vous le passez en voiture.",
        },

        { type: "titre2", texte: "Genève : le bon choix pour le nord" },
        {
          type: "paragraphe",
          texte:
            "Genève est la première porte des Alpes et le seul de ces aéroports à voler tous les jours depuis la plupart des villes européennes. C’est son vrai avantage : arriver un mercredi sans dépendre d’un charter.",
        },
        {
          type: "paragraphe",
          texte:
            "Il est imbattable au nord : Le Grand-Bornand 56 km (1 h 10), La Clusaz 59 km (1 h 10), Samoëns 67 km (1 h 15), Les Gets 69 km (1 h 20), Saint-Gervais 77 km (1 h 15), Morzine 77 km (1 h 30), Megève 79 km (1 h 20), Flaine 80 km (1 h 30), Chamonix 91 km (1 h 25). Beaucoup moins évident pour la Tarentaise : Val Thorens est à 2 h 45, Courchevel à 2 h 30, Tignes à 3 h — toutes plus proches de Chambéry.",
        },

        { type: "titre2", texte: "Chambéry : l’aéroport de la Tarentaise" },
        {
          type: "paragraphe",
          texte:
            "Petit, proche, et ouvert surtout le week-end : son programme d’hiver tient en quelques rotations du samedi. Quand vos dates correspondent, c’est souvent le meilleur choix de la liste — Méribel 1 h 20, Courchevel 1 h 30, Les Menuires 1 h 40, Val Thorens 1 h 40, Tignes 2 h, Val d’Isère 2 h 10. Soit une heure gagnée dans chaque sens face à Genève.",
        },
        {
          type: "paragraphe",
          texte:
            "L’inconvénient tient en une phrase : en semaine, il n’y a souvent aucun vol.",
        },

        { type: "titre2", texte: "Grenoble : l’Oisans et les Alpes du Sud" },
        {
          type: "paragraphe",
          texte:
            "Même profil que Chambéry — charters du week-end, tarifs souvent inférieurs — et une vocation claire : Chamrousse 1 h 10, Alpe d’Huez 1 h 40, Les Deux Alpes 1 h 40, Serre Chevalier 2 h 55. Pour ces quatre stations, aucun autre aéroport n’approche : l’Alpe d’Huez depuis Genève, c’est 216 km et trois heures.",
        },

        { type: "titre2", texte: "Lyon : celui qu’on oublie" },
        {
          type: "paragraphe",
          texte:
            "Un vrai hub, des vols toute l’année, bien plus de compagnies que Chambéry ou Grenoble, et une autoroute directe jusqu’à Albertville qui met toute la Tarentaise à deux heures et demie. Rarement le trajet le plus court, souvent l’arrivée la moins chère — surtout en février, quand les tarifs genevois s’envolent.",
        },
        {
          type: "paragraphe",
          texte:
            "Règle simple : si Chambéry ne vole pas vos dates, comparez Lyon avant de vous rabattre sur Genève.",
        },

        { type: "titre2", texte: "Annecy : proche, mais théorique" },
        {
          type: "paragraphe",
          texte:
            "Sur le papier, Annecy gagne pour une douzaine de stations : La Clusaz et Le Grand-Bornand à 34 km (39 minutes), Samoëns 68 km (1 h), Saint-Gervais 78 km (1 h), Chamonix 92 km (1 h 10) — mieux que Genève à chaque fois. En pratique, son trafic hivernal régulier est très mince. Vérifiez-le, puis réservez Genève.",
        },

        { type: "titre2", texte: "Les aéroports étrangers dont personne ne parle" },
        {
          type: "paragraphe",
          texte:
            "Turin est l’aéroport le plus proche de Serre Chevalier — 131 km et 2 h 45 par le tunnel du Fréjus, contre 2 h 55 depuis Grenoble — et de Montgenèvre, à 105 km. Milan Malpensa est le grand aéroport le plus proche de Zermatt, à 195 km par le Simplon. Pour une station frontalière, le meilleur aéroport est souvent dans l’autre pays.",
        },

        { type: "titre2", texte: "Le problème du samedi" },
        {
          type: "paragraphe",
          texte:
            "Tous les chiffres ci-dessus sont des temps hors trafic. Le samedi de février, toutes les Alpes changent de locataires le même matin, et les deux axes qui comptent — l’A40 vers Chamonix et la Tarentaise entre Albertville et Moûtiers — se bloquent. Comptez 45 minutes à une heure de plus, quel que soit l’aéroport.",
        },
        {
          type: "paragraphe",
          texte:
            "Si vos dates le permettent, arriver en semaine vous fait gagner cette heure deux fois, et coûte généralement moins cher en vol comme en hébergement. C’est l’économie la plus simple d’un séjour au ski.",
        },

        { type: "titre2", texte: "Choisir en trois questions" },
        {
          type: "liste",
          items: [
            "Où logez-vous ? Au nord d’Albertville — Chamonix, Portes du Soleil, Grand Massif, Aravis — Genève. Tarentaise et Trois Vallées — Chambéry si vous partez un samedi, Lyon ou Genève sinon. Oisans et Alpes du Sud — Grenoble, ou Turin pour Serre Chevalier et Montgenèvre.",
            "Quand partez-vous ? En semaine, la liste se réduit à Genève et Lyon — et vous gagnez une heure de trafic dans chaque sens.",
            "Combien êtes-vous ? Un transfert privé se paie par véhicule : à six, on paie une fois. Le trajet plus court depuis un petit aéroport devient alors souvent moins cher que le trajet encombré depuis le grand.",
          ],
        },

        { type: "titre2", texte: "En résumé" },
        {
          type: "liste",
          items: [
            "Chamonix, Morzine, Les Gets, Flaine, Samoëns, Megève, La Clusaz — Genève, une heure à une heure et demie.",
            "Courchevel, Méribel, Val Thorens, Les Menuires, La Plagne, Les Arcs — Chambéry le week-end, Lyon ou Genève en semaine.",
            "Tignes et Val d’Isère — Chambéry (2 h et 2 h 10), Genève si les vols l’imposent.",
            "Alpe d’Huez, Les Deux Alpes, Chamrousse — Grenoble, moins de deux heures.",
            "Serre Chevalier et Montgenèvre — Turin, par le tunnel du Fréjus.",
          ],
        },
        {
          type: "paragraphe",
          texte:
            "Quel que soit votre choix, réservez le transfert en même temps que le vol, pas la semaine d’avant : en février, les véhicules manquent avant les lits.",
        },
      ],
    },
    /**
     * Version allemande — adaptée, pas traduite.
     *
     * Le lecteur francophone se demande s'il faut atterrir à Genève ou à
     * Chambéry ; le germanophone ne se pose pas cette question. La sienne est
     * Innsbruck contre Munich, et elle se joue sur trois choses que le
     * francophone ignore : le programme d'hiver d'Innsbruck, la fréquence de ses
     * déroutements, et le fait que Friedrichshafen existe.
     */
    de: {
      slug: "welcher-flughafen-fuer-die-alpen",
      titre: "Welcher Flughafen für Tirol, den Arlberg und die Schweiz?",
      metaTitre: "Welcher Flughafen für die Alpen? Innsbruck, Zürich, München",
      metaDescription:
        "Innsbruck, Salzburg, Zürich, München, Friedrichshafen: reale Entfernungen und Fahrzeiten zu 15 Skiorten, und wie Sie in dreißig Sekunden entscheiden.",
      altVisuel: "Flughafenterminal, Tor zu den Alpen",
      chapo:
        "Innsbruck ist die naheliegende Antwort, und für die Hälfte der Ostalpen die falsche. Hier sind die fünf Flughäfen, die Tirol, den Arlberg, das Salzburger Land und die Schweiz erschließen, mit den realen Entfernungen und Fahrzeiten — auf dem Straßennetz gemessen, nicht geschätzt — und eine Methode, um in dreißig Sekunden zu entscheiden.",
      stationsLiees: [
        "ischgl",
        "solden",
        "kitzbuhel",
        "st-anton-am-arlberg",
        "obergurgl",
        "mayrhofen",
        "zell-am-see",
        "zermatt",
        "davos",
        "st-moritz",
      ],
      contenu: [
        {
          type: "paragraphe",
          texte:
            "Zuerst wird der Flug gebucht, dann der Transfer gesucht. Für eine Skiwoche ist das die falsche Reihenfolge: Zwischen zwei Flughäfen liegen nicht zwanzig Minuten, sondern zwei Stunden in jede Richtung — und die entscheiden, ob Sie am Anreisetag noch auf der Piste stehen oder im Auto sitzen.",
        },

        { type: "titre2", texte: "Innsbruck: unschlagbar in Tirol, wetterabhängig" },
        {
          type: "paragraphe",
          texte:
            "Innsbruck liegt mitten im Inntal, und von dort ist fast ganz Tirol in anderthalb Stunden erreichbar: Mayrhofen 75 km (1 h 10), Sölden 84 km (1 h 15), Serfaus 92 km (1 h 15), St. Anton am Arlberg 96 km (1 h 15), Obergurgl 98 km (1 h 30), Ischgl 100 km (1 h 25). Kein anderer Flughafen der Alpen deckt so viele große Skigebiete auf so kurzer Distanz ab.",
        },
        {
          type: "paragraphe",
          texte:
            "Zwei Einschränkungen. Erstens ist das Winterflugprogramm auf Samstage konzentriert — unter der Woche fliegt hier deutlich weniger als in Zürich oder München. Zweitens führt der Anflug durch ein enges Tal: Bei Föhn oder schlechter Sicht wird häufiger als anderswo nach München oder Salzburg umgeleitet. Ein Transferanbieter, der das nicht einplant, lässt Sie an einem Flughafen stehen, an dem niemand auf Sie wartet.",
        },

        { type: "titre2", texte: "Salzburg: das Salzburger Land und die Kitzbüheler Alpen" },
        {
          type: "paragraphe",
          texte:
            "Salzburg hat ein klar umrissenes Einzugsgebiet, und darin ist es die beste Wahl: Kitzbühel 75 km (1 h 20), Zell am See 78 km (1 h 20), Bad Gastein 104 km (2 h 20). Für diese drei kommt kein anderer Flughafen heran — Kitzbühel ab Innsbruck sind 98 km und zwanzig Minuten mehr.",
        },
        {
          type: "paragraphe",
          texte:
            "Weiter westlich kippt das Bild schnell: Sölden liegt ab Salzburg bei 263 km (3 h 10), Ischgl bei 280 km (3 h 25). Beide sind ab Innsbruck in gut einer Stunde erreichbar. Salzburg lohnt sich dort nur, wenn der Flug deutlich besser passt.",
        },

        { type: "titre2", texte: "Zürich: die Schweiz, und der Arlberg von Westen" },
        {
          type: "paragraphe",
          texte:
            "Zürich ist der einzige dieser Flughäfen, der an jedem Wochentag aus ganz Europa angeflogen wird. Das ist sein eigentlicher Vorteil: Sie können mittwochs anreisen, ohne von einem Charter abzuhängen.",
        },
        {
          type: "paragraphe",
          texte:
            "In der Schweiz ist er konkurrenzlos: Engelberg 107 km (1 h 50), Interlaken 139 km (2 h 20), Grindelwald 157 km (2 h 40), Davos 166 km (2 h 35), St. Moritz 221 km (3 h 20), Zermatt 251 km (4 h 15). Und er erschließt den Arlberg von Westen — St. Anton 190 km (2 h 50) —, was besonders für Lech und Zürs zählt: Die Abzweigung bei Alpe Rauz liegt auf dieser Seite des Tunnels.",
        },

        { type: "titre2", texte: "München: der günstige Umweg, der oft keiner ist" },
        {
          type: "paragraphe",
          texte:
            "München ist ein echter Hub mit Flügen das ganze Jahr, und für viele deutsche Gäste ist es der Flughafen mit der kürzesten Gesamtreise — Anfahrt zum Abflughafen eingerechnet. Kitzbühel liegt bei 167 km (2 h), Mayrhofen bei 198 km (2 h 20), Zell am See bei 209 km (2 h 40), Sölden bei 239 km (3 h 10).",
        },
        {
          type: "paragraphe",
          texte:
            "Selten die kürzeste Fahrt, häufig der günstigste Flug — und im Februar, wenn die Tarife nach Innsbruck steigen, oft die vernünftigere Rechnung. Es ist außerdem der Flughafen, an dem Sie landen, wenn Innsbruck umleitet: Ein Transfer ab München ist dann keine Notlösung, sondern eine Strecke, die wir ohnehin fahren.",
        },

        { type: "titre2", texte: "Friedrichshafen: der Flughafen, den kaum jemand kennt" },
        {
          type: "paragraphe",
          texte:
            "Am Bodensee gelegen, klein, und für den Arlberg die schnellste Verbindung überhaupt: St. Anton 129 km (1 h 40), Lech 138 km (2 h 20), Davos 154 km (2 h), Ischgl 167 km (2 h 20). Das schlägt Zürich um eine Stunde und München um fast zwei. Das Winterprogramm ist schmal — aber wenn Ihre Daten passen, gibt es keine bessere Wahl für den Arlberg und die Grisonen.",
        },
        {
          type: "paragraphe",
          texte:
            "Memmingen spielt in derselben Liga, etwas weiter weg: St. Anton 172 km (2 h), Sölden 187 km (2 h 40). Beide lohnen einen Blick, bevor Sie automatisch München buchen.",
        },

        { type: "titre2", texte: "Die Flughäfen im anderen Land" },
        {
          type: "paragraphe",
          texte:
            "Für einen Ort nahe der Grenze liegt der beste Flughafen oft jenseits davon. Selva in der Val Gardena erreichen Sie ab Innsbruck in 120 km (1 h 50) — näher als ab Verona (194 km) und deutlich näher als ab Bergamo (274 km). Umgekehrt ist Mailand Malpensa über den Simplon eine reale Option für das Wallis. Die Grenze kostet nichts: Österreich, die Schweiz und Italien liegen alle im Schengen-Raum.",
        },

        { type: "titre2", texte: "Das Samstagsproblem" },
        {
          type: "paragraphe",
          texte:
            "Alle genannten Zeiten sind ohne Verkehr gemessen. An einem Samstag im Februar wechseln die Alpen am selben Vormittag ihre Gäste, und die Achsen, die zählen — die Inntalautobahn, das Zillertal, die Talstraße ins Paznaun —, stehen. Rechnen Sie 45 Minuten bis eine Stunde zusätzlich ein, unabhängig vom Flughafen.",
        },
        {
          type: "paragraphe",
          texte:
            "Wenn Ihre Daten flexibel sind, ist eine Anreise am Sonntag oder unter der Woche die einfachste Stunde, die Sie sich sparen können — in beide Richtungen.",
        },

        { type: "titre2", texte: "In dreißig Sekunden entscheiden" },
        {
          type: "liste",
          items: [
            "Tirol — Ötztal, Paznaun, Zillertal, Arlberg von Osten: Innsbruck, sofern es an Ihrem Tag fliegt.",
            "Kitzbühel, Zell am See, Bad Gastein: Salzburg, ohne zu zögern.",
            "Arlberg, Lech, Zürs, Graubünden: Friedrichshafen prüfen, dann Zürich.",
            "Schweiz — Wallis, Berner Oberland, Engadin: Zürich, mit Genf als Alternative für Zermatt.",
            "Wenn Innsbruck an Ihrem Tag nicht fliegt: München vergleichen, bevor Sie auf Salzburg ausweichen.",
          ],
        },
        {
          type: "paragraphe",
          texte:
            "Und unabhängig von der Wahl: Buchen Sie den Transfer zusammen mit dem Flug, nicht in der Woche davor. Im Februar sind die Fahrzeuge vor den Betten ausgebucht.",
        },
      ],
    },
    /**
     * Version italienne — adaptée, pas traduite.
     *
     * L'italophone n'a pas la question du francophone. La sienne est Turin
     * contre Milan, et elle se joue sur une chose que les deux autres versions
     * n'ont pas à dire : pour la moitié des stations italiennes, l'aéroport le
     * plus proche impose un tunnel à péage — et ce péage se compare.
     */
    it: {
      slug: "quale-aeroporto-per-le-alpi",
      titre: "Quale aeroporto scegliere per le Alpi italiane?",
      metaTitre: "Quale aeroporto per le Alpi? Torino, Malpensa, Bergamo",
      metaDescription:
        "Torino, Milano Malpensa, Bergamo, Verona o Ginevra: distanze e tempi reali verso 12 località, e come scegliere in trenta secondi.",
      altVisuel: "Terminal aeroportuale, porta d'accesso alle Alpi",
      chapo:
        "Milano è la risposta automatica, e per metà delle Alpi italiane è quella sbagliata. Ecco i cinque aeroporti che servono la Valle d’Aosta, il Piemonte e le Dolomiti, con distanze e tempi di percorrenza reali — misurati sulla rete stradale, non stimati — e un metodo per decidere in trenta secondi.",
      stationsLiees: [
        "cervinia",
        "courmayeur",
        "sestriere",
        "sauze-doulx",
        "champoluc",
        "gressoney",
        "la-thuile",
        "montgenevre",
        "serre-chevalier",
        "alagna-valsesia",
        "selva-val-gardena",
      ],
      contenu: [
        {
          type: "paragraphe",
          texte:
            "Prima si prenota il volo, poi si cerca il transfer. Per una settimana sulla neve è l’ordine sbagliato: tra due aeroporti non ci sono venti minuti di differenza ma due ore per tratta, e sono quelle a decidere se il giorno dell’arrivo lo passi sugli sci o in macchina.",
        },

        { type: "titre2", texte: "Torino: la Valle d’Aosta e tutta la Via Lattea" },
        {
          type: "paragraphe",
          texte:
            "Caselle è l’aeroporto meglio posizionato d’Italia per lo sci, e quasi nessuno fuori dal Piemonte lo sa. Sauze d’Oulx 91 km (1 h 25), Monginevro 105 km (1 h 40), Sestriere 107 km (1 h 40), Gressoney 108 km (1 h 40), Champoluc 109 km (1 h 30), Cervinia 121 km (1 h 40), Serre Chevalier 131 km (2 h 45), Courmayeur 158 km (2 h).",
        },
        {
          type: "paragraphe",
          texte:
            "Un dettaglio che vale la pena sottolineare: per Serre Chevalier e Monginevro, che sono in Francia, Torino è più vicino di Lione e di Grenoble. Chi prenota Lione perché la località è francese paga due ore in più per tratta, e le paga due volte.",
        },

        { type: "titre2", texte: "Milano Malpensa: la Valsesia e i voli intercontinentali" },
        {
          type: "paragraphe",
          texte:
            "Malpensa vince nettamente su una valle sola — Alagna Valsesia, 110 km (1 h 50) — ma è l’aeroporto con l’offerta internazionale più ampia del Nord Italia, ed è per questo che vale la pena confrontarlo. Champoluc è a 169 km (2 h 10), Gressoney a 168 km (2 h 20), Cervinia a 181 km (2 h 20): sessanta chilometri in più rispetto a Torino, cioè circa quaranta minuti.",
        },
        {
          type: "paragraphe",
          texte:
            "La regola pratica: se arrivi dall’estero con un volo diretto su Malpensa, non fare uno scalo per atterrare a Torino. Se hai la scelta, Torino è più vicino a quasi tutto.",
        },

        { type: "titre2", texte: "Bergamo: la Valtellina e i voli low cost" },
        {
          type: "paragraphe",
          texte:
            "Orio al Serio ha un ruolo preciso: Livigno, 175 km (3 h 20), e la Valtellina in generale. Per il resto è lontano — Cervinia 233 km (2 h 55), Courmayeur 270 km (3 h 10) — e conviene solo quando la differenza di tariffa è netta.",
        },
        {
          type: "paragraphe",
          texte:
            "Attenzione a una cosa: da Bergamo verso Livigno si passa dal passo del Foscagno, che d’inverno può chiudere. Non è un motivo per escluderlo, è un motivo per partire con margine.",
        },

        { type: "titre2", texte: "Verona: la porta delle Dolomiti" },
        {
          type: "paragraphe",
          texte:
            "Per le Dolomiti, Verona è l’aeroporto italiano di riferimento: Cortina 170 km (2 h 25), Selva di Val Gardena 194 km (2 h 30). Ed è qui che arriva la sorpresa del confronto — per la Val Gardena, Innsbruck è più vicino: 120 km e 1 h 50, attraverso il Brennero.",
        },
        {
          type: "paragraphe",
          texte:
            "Quaranta minuti di differenza per tratta, e un valico autostradale aperto tutto l’anno. Vale la pena guardare i voli su Innsbruck prima di dare Verona per scontata.",
        },

        { type: "titre2", texte: "Ginevra: solo per Courmayeur e La Thuile" },
        {
          type: "paragraphe",
          texte:
            "Ginevra è l’aeroporto internazionale più vicino all’alta Valle d’Aosta, a patto di passare dal traforo del Monte Bianco: Courmayeur 102 km (1 h 35), La Thuile 133 km (2 h 35). Per Courmayeur batte Torino di quasi mezz’ora.",
        },
        {
          type: "paragraphe",
          texte:
            "Per tutto il resto no: Cervinia da Ginevra sono 197 km (3 h), da Torino 121 km (1 h 40). E il pedaggio del traforo, per un minibus, è una cifra che va confrontata insieme al volo — non scoperta all’arrivo.",
        },

        { type: "titre2", texte: "Trafori, pedaggi e frontiere" },
        {
          type: "paragraphe",
          texte:
            "Sulle strade alpine i pedaggi non sono trascurabili. Il traforo del Monte Bianco e quello del Fréjus costano ciascuno una cifra seria per un minibus, il vignette svizzero è annuale, e le autostrade italiane si pagano al casello. Quando confronti due preventivi, verifica che entrambi li comprendano: uno che li esclude non è un preventivo, è una stima.",
        },
        {
          type: "paragraphe",
          texte:
            "Le frontiere, invece, non costano nulla: Italia, Francia, Svizzera e Austria sono tutte nello spazio Schengen. Porta un documento d’identità e non pensarci più — l’aeroporto «all’estero» spesso è quello giusto.",
        },

        { type: "titre2", texte: "Il problema del sabato" },
        {
          type: "paragraphe",
          texte:
            "Tutti i tempi indicati sono senza traffico. Il sabato di febbraio le Alpi cambiano ospiti nello stesso momento, e gli assi che contano — l’autostrada del Frejus verso la Val di Susa, la salita della Valtournenche, il Brennero — si intasano. Conta da quaranta minuti a un’ora in più, qualunque sia l’aeroporto.",
        },

        { type: "titre2", texte: "Decidere in trenta secondi" },
        {
          type: "liste",
          items: [
            "Via Lattea — Sestriere, Sauze d’Oulx, Monginevro, Serre Chevalier: Torino, senza esitare.",
            "Valle d’Aosta — Cervinia, Champoluc, Gressoney: Torino; Malpensa se il volo internazionale è diretto.",
            "Courmayeur e La Thuile: Ginevra dal traforo, Torino se preferisci restare in Italia.",
            "Alagna Valsesia: Malpensa, è la sola valle in cui vince.",
            "Dolomiti — Val Gardena, Cortina: confronta Innsbruck e Verona prima di scegliere.",
            "Livigno e Valtellina: Bergamo, partendo con margine per il Foscagno.",
          ],
        },
        {
          type: "paragraphe",
          texte:
            "E qualunque sia la scelta, prenota il transfer insieme al volo, non la settimana prima: a febbraio i veicoli finiscono prima dei letti.",
        },
      ],
    },
  },
};
