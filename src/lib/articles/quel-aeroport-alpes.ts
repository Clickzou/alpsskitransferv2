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
};
