import type { Transfer } from "./types";

/**
 * Traductions françaises des pages de trajet.
 *
 * À part des modules de trajet pour la même raison que côté stations :
 * `npm run migrer:trajets` réécrit les fichiers repris du WordPress, et une clé
 * `fr` ajoutée dedans disparaîtrait. `index.ts` fusionne celles-ci.
 *
 * La clé est `{aéroport}|{station}`. Périmètre du 8 septembre 2026 : les départs
 * de Genève et de Lyon vers les dix stations traduites.
 */
export type TraductionTrajet = NonNullable<Transfer["fr"]>;

const inclus = {
  type: "liste" as const,
  items: [
    "Housses à skis et à snowboard, sans supplément.",
    "Sièges enfants et rehausseurs, installés avant le départ.",
    "Suivi du vol et temps d’attente en cas de retard.",
    "Péages d’autoroute.",
    "Dépose à l’adresse exacte de votre logement.",
  ],
};

const faqCommune = [
  {
    question: "Le prix est-il par personne ou par véhicule ?",
    reponse:
      "Par véhicule. Que vous soyez deux ou huit, le prix annoncé est le même — c’est ce qui rend le transfert privé souvent moins cher qu’un achat de places à partir de quatre passagers.",
  },
  {
    question: "Les housses à skis sont-elles comprises ?",
    reponse:
      "Oui, sans supplément. Déclarez-les à la réservation, avec les sacs à chaussures et tout matériel encombrant : le véhicule est choisi en fonction, pas seulement selon le nombre de sièges.",
  },
  {
    question: "Et si mon vol a du retard ?",
    reponse:
      "Votre chauffeur suit le vol et décale la prise en charge à l’heure réelle d’atterrissage. Le temps d’attente est compris et il n’y a aucun supplément.",
  },
];

export const TRADUCTIONS_TRAJETS_FR: Record<string, TraductionTrajet> = {
  "geneva-airport|val-thorens": {
    metaTitre: "Transfert Genève – Val Thorens | 161 km, 2 h 45",
    metaDescription:
      "Transfert privé Genève – Val Thorens : 161 km, environ 2 h 45. Prix fixe par véhicule, skis et sièges enfants compris, suivi du vol.",
    h1: "Transfert Genève – Val Thorens",
    chapo:
      "161 km et environ 2 h 45 de route séparent l’aéroport de Genève de Val Thorens : autoroute jusqu’à Albertville, la Tarentaise jusqu’à Moûtiers, puis 37 km de lacets jusqu’à 2 300 m. C’est la liaison la plus demandée vers la station la plus haute d’Europe, et celle où l’heure d’arrivée compte le plus : un samedi de février, comptez une heure de plus.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "L’autoroute file vers Annecy puis Albertville, avant la remontée de la Tarentaise jusqu’à Moûtiers, à 480 m. De là commence la vraie montagne : 37 km de virages par Saint-Martin-de-Belleville et Les Menuires, pour 1 800 m de dénivelé.",
      },
      { type: "titre2", texte: "Le samedi de rotation" },
      {
        type: "paragraphe",
        texte:
          "Toutes les Trois Vallées changent de locataires le même matin. Entre Albertville et Moûtiers, la circulation se bloque, et la montée suit. Si vos dates le permettent, une arrivée en semaine vous fait gagner une heure à l’aller comme au retour.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Val Thorens ?",
        reponse:
          "Environ 2 h 45 pour 161 km hors trafic, et jusqu’à 3 h 45 un samedi de haute saison.",
      },
      ...faqCommune,
    ],
  },

  "geneva-airport|courchevel": {
    metaTitre: "Transfert Genève – Courchevel | 149 km, 2 h 30",
    metaDescription:
      "Transfert privé Genève – Courchevel 1850, 1650, 1550 et Le Praz : 149 km, environ 2 h 30. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Genève – Courchevel",
    chapo:
      "149 km et environ 2 h 30 séparent Genève de Courchevel : autoroute jusqu’à Albertville, la Tarentaise jusqu’à Moûtiers, puis 20 km de montée vers les quatre villages étagés de 1 300 à 1 850 m. Précisez lequel à la réservation — vingt minutes séparent Le Praz de Courchevel 1850.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Après Albertville, la route remonte la Tarentaise jusqu’à Moûtiers, puis grimpe vers Le Praz (1 300 m), Village (1 550 m), Moriond (1 650 m) et Courchevel (1 850 m). C’est la même route pour tous : seule la fin change.",
      },
      { type: "titre2", texte: "Quand partir" },
      {
        type: "paragraphe",
        texte:
          "Le samedi de haute saison, comptez une heure de plus : la vallée est saturée entre Albertville et Moûtiers. En semaine, les 2 h 30 se tiennent sans difficulté.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Courchevel ?",
        reponse:
          "Environ 2 h 30 pour 149 km hors trafic. Un samedi de février, comptez une heure de plus.",
      },
      {
        question: "Desservez-vous les quatre villages ?",
        reponse:
          "Oui : Le Praz, Village (1550), Moriond (1650) et Courchevel (1850). Donnez l’adresse exacte à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|meribel": {
    metaTitre: "Transfert Genève – Méribel | 142 km, 2 h 25",
    metaDescription:
      "Transfert privé Genève – Méribel, Mottaret et Les Allues : 142 km, environ 2 h 25. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Genève – Méribel",
    chapo:
      "142 km et environ 2 h 25 de route : autoroute jusqu’à Albertville, Tarentaise jusqu’à Moûtiers, puis 18 km de montée dans la vallée des Allues. Méribel Centre, Mottaret, Méribel Village et Les Allues sont desservis sur le même trajet — l’adresse exacte décide des dix dernières minutes.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "La montée depuis Moûtiers est courte comparée à celle de Val Thorens : 18 km jusqu’à Méribel Centre (1 450 m), 6 km de plus pour Mottaret (1 750 m). La route est déneigée et salée en continu.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte:
          "Comme partout dans les Trois Vallées, le samedi matin de février ajoute environ une heure au trajet. Une arrivée en semaine évite l’essentiel de l’attente.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Méribel ?",
        reponse:
          "Environ 2 h 25 pour 142 km hors trafic, une heure de plus un samedi de haute saison.",
      },
      {
        question: "Desservez-vous Mottaret et Les Allues ?",
        reponse: "Oui, sur le même trajet. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|chamonix": {
    metaTitre: "Transfert Genève – Chamonix | 91 km, 1 h 25",
    metaDescription:
      "Transfert privé Genève – Chamonix, Les Houches, Argentière : 91 km, environ 1 h 25. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Genève – Chamonix",
    chapo:
      "91 km et environ 1 h 25 de route : c’est l’un des transferts les plus courts des Alpes vers une grande station. L’autoroute mène au Fayet, puis la vallée de l’Arve monte doucement jusqu’à Chamonix (1 035 m), Les Praz, Argentière et Vallorcine. Pas de col, une route déneigée en continu, et un chauffeur qui suit votre vol.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "L’A40 traverse Annemasse, Bonneville et Sallanches jusqu’au Fayet, puis la route de la vallée passe Les Houches avant Chamonix. Argentière est 8 km plus haut, Vallorcine 12 km encore.",
      },
      { type: "titre2", texte: "Le point de saturation" },
      {
        type: "paragraphe",
        texte:
          "L’A40 est l’artère de toute la vallée du Mont-Blanc : le samedi matin en février, comptez 45 minutes de plus. Le reste de la semaine, 1 h 25 se tient.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Chamonix ?",
        reponse:
          "Environ 1 h 25 pour 91 km hors trafic ; 45 minutes de plus un samedi de février.",
      },
      {
        question: "Desservez-vous Argentière, Les Houches et Vallorcine ?",
        reponse:
          "Oui, toute la vallée sur la même route. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|tignes": {
    metaTitre: "Transfert Genève – Tignes | 182 km, 3 h 05",
    metaDescription:
      "Transfert privé Genève – Tignes, Val Claret et Tignes 1800 : 182 km, environ 3 h 05. Prix fixe par véhicule, skis compris, suivi du vol.",
    h1: "Transfert Genève – Tignes",
    chapo:
      "182 km et environ 3 h 05 : autoroute jusqu’à Albertville, la Tarentaise jusqu’à Bourg-Saint-Maurice, puis 30 km de montée jusqu’à 2 100 m. Val Claret, Le Lac, Le Lavachet et Les Boisses sont desservis sur le même trajet ; la fin du parcours change selon votre quartier.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "La Haute-Tarentaise se remonte jusqu’à Bourg-Saint-Maurice (840 m), d’où la route grimpe 30 km jusqu’au barrage puis à la station. C’est la partie du trajet la plus sensible à la neige fraîche.",
      },
      { type: "titre2", texte: "Le samedi, et la neige" },
      {
        type: "paragraphe",
        texte:
          "Une heure de plus le samedi de haute saison. Après de fortes chutes, l’accès peut fermer brièvement pour déclenchement préventif d’avalanches : votre chauffeur connaît l’état de la route avant votre atterrissage.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Tignes ?",
        reponse:
          "Environ 3 h 05 pour 182 km hors trafic, et une heure de plus un samedi de février.",
      },
      {
        question: "Peut-on desservir Val d’Isère sur le même trajet ?",
        reponse:
          "Oui, c’est la même vallée à quelques kilomètres. Indiquez-le à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|val-disere": {
    metaTitre: "Transfert Genève – Val d’Isère | 183 km, 3 h 15",
    metaDescription:
      "Transfert privé Genève – Val d’Isère, La Daille et Le Fornet : 183 km, environ 3 h 15. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Genève – Val d’Isère",
    chapo:
      "183 km et environ 3 h 15 de route : la Tarentaise jusqu’à Bourg-Saint-Maurice, puis 30 km de montée jusqu’à 1 850 m, par La Daille. C’est un long trajet dont la dernière heure est une route de montagne — d’où des véhicules équipés pneus et chaînes, et un horaire calé sur votre vol réel.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Autoroute jusqu’à Albertville, Tarentaise jusqu’à Bourg-Saint-Maurice, puis la montée finale. Le col de l’Iseran, au-dessus de la station, est fermé tout l’hiver : il n’existe pas d’itinéraire par le sud.",
      },
      { type: "titre2", texte: "Quand partir" },
      {
        type: "paragraphe",
        texte:
          "Le samedi de haute saison ajoute une heure. Au retour, nous calons le départ pour vous laisser de la marge à l’aéroport plutôt que pour optimiser le véhicule.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Val d’Isère ?",
        reponse:
          "Environ 3 h 15 pour 183 km hors trafic, une heure de plus un samedi de février.",
      },
      {
        question: "Desservez-vous La Daille et Le Fornet ?",
        reponse: "Oui, ainsi que le centre. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|la-plagne": {
    metaTitre: "Transfert Genève – La Plagne | 160 km, 2 h 45",
    metaDescription:
      "Transfert privé Genève – La Plagne : 160 km, environ 2 h 45. Les onze villages desservis, prix fixe par véhicule, skis compris.",
    h1: "Transfert Genève – La Plagne",
    chapo:
      "160 km et environ 2 h 45 : autoroute jusqu’à Albertville, Tarentaise jusqu’à Aime ou Bourg-Saint-Maurice selon votre village, puis la montée. La Plagne compte onze villages entre 1 250 et 2 100 m, sur deux routes d’accès différentes : l’adresse exacte n’est pas un détail.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Les stations d’altitude — Plagne Centre, Bellecôte, Belle Plagne, Aime-la-Plagne — se rejoignent par Aime. Montchavin et Les Coches passent par Bourg-Saint-Maurice, Champagny par Moûtiers. Trois routes, une seule vallée.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte:
          "Comptez une heure de plus le samedi matin de février, la Tarentaise étant saturée entre Albertville et Moûtiers.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – La Plagne ?",
        reponse:
          "Environ 2 h 45 pour 160 km hors trafic, une heure de plus un samedi de haute saison.",
      },
      {
        question: "Quels villages desservez-vous ?",
        reponse:
          "Les onze, y compris Montchavin, Les Coches et Champagny — mais par des routes différentes. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|les-arcs": {
    metaTitre: "Transfert Genève – Les Arcs | 161 km, 2 h 45",
    metaDescription:
      "Transfert privé Genève – Les Arcs 1600, 1800, 1950, 2000 : 161 km, environ 2 h 45. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Genève – Les Arcs",
    chapo:
      "161 km et environ 2 h 45 : la Tarentaise jusqu’à Bourg-Saint-Maurice, puis 15 à 25 km de montée selon l’altitude de votre logement — Arc 1600, 1800, 1950 ou 2000. Le transfert va directement à l’adresse : le funiculaire ne sert qu’aux arrivées en train.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Après Bourg-Saint-Maurice, la route monte en lacets vers les quatre niveaux de la station. Peisey-Vallandry, côté Vanoise Express, se rejoint par une autre route de la même vallée.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte:
          "Une heure de plus le samedi de haute saison. En semaine, les 2 h 45 se tiennent.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Les Arcs ?",
        reponse:
          "Environ 2 h 45 pour 161 km hors trafic, une heure de plus un samedi de février.",
      },
      {
        question: "Quelle station des Arcs desservez-vous ?",
        reponse:
          "Les quatre altitudes, ainsi que Peisey-Vallandry et Bourg-Saint-Maurice. Précisez l’adresse.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|les-menuires": {
    metaTitre: "Transfert Genève – Les Menuires | 153 km, 2 h 45",
    metaDescription:
      "Transfert privé Genève – Les Menuires et Saint-Martin-de-Belleville : 153 km, environ 2 h 45. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Genève – Les Menuires",
    chapo:
      "153 km et environ 2 h 45 : autoroute jusqu’à Albertville, Tarentaise jusqu’à Moûtiers, puis 27 km de lacets dans la vallée des Belleville. Les Menuires sont à 1 850 m, 8 km sous Val Thorens et 8 km au-dessus de Saint-Martin — les trois se desservent sur le même trajet.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "La montée depuis Moûtiers (480 m) fait 27 km jusqu’à La Croisette. Reberty, Les Bruyères et Preyerand s’étagent autour : indiquez le quartier exact à la réservation.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte:
          "Une heure de plus le samedi de février, quand toutes les Trois Vallées changent de locataires en même temps.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Les Menuires ?",
        reponse:
          "Environ 2 h 45 pour 153 km hors trafic, une heure de plus un samedi de haute saison.",
      },
      {
        question: "Desservez-vous Saint-Martin et Val Thorens ?",
        reponse:
          "Oui, les deux sont sur la même route. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "lyon-airport|val-thorens": {
    metaTitre: "Transfert Lyon – Val Thorens | 200 km, 2 h 35",
    metaDescription:
      "Transfert privé Lyon – Val Thorens : 200 km, environ 2 h 35 d’autoroute puis la montée depuis Moûtiers. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Lyon – Val Thorens",
    chapo:
      "200 km et environ 2 h 35 : Lyon est plus loin que Genève en kilomètres et plus proche en temps, parce que l’autoroute couvre presque tout le trajet jusqu’à Albertville. Restent la Tarentaise jusqu’à Moûtiers et les 37 km de lacets jusqu’à 2 300 m. Vols toute l’année depuis Lyon, ce qui en fait la solution des arrivées en semaine.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Autoroute jusqu’à Chambéry puis Albertville, remontée de la Tarentaise jusqu’à Moûtiers, et la montée finale par Saint-Martin-de-Belleville et Les Menuires.",
      },
      { type: "titre2", texte: "Pourquoi Lyon plutôt que Genève" },
      {
        type: "paragraphe",
        texte:
          "Lyon offre des vols toute l’année et davantage de compagnies, souvent moins chers en février quand Genève s’envole. Le trajet est un peu plus long sur la carte, mais l’autoroute compense.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – Val Thorens ?",
        reponse:
          "Environ 2 h 35 pour 200 km hors trafic, et une heure de plus un samedi de haute saison.",
      },
      ...faqCommune,
    ],
  },

  "lyon-airport|courchevel": {
    metaTitre: "Transfert Lyon – Courchevel | 188 km, 2 h 20",
    metaDescription:
      "Transfert privé Lyon – Courchevel 1850, 1650, 1550 : 188 km, environ 2 h 20. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Lyon – Courchevel",
    chapo:
      "188 km et environ 2 h 20 : autoroute jusqu’à Albertville, Tarentaise jusqu’à Moûtiers, puis 20 km de montée vers les quatre villages. C’est le trajet le plus rapide vers Courchevel après Chambéry, avec l’avantage de vols toute l’année.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Autoroute par Chambéry et Albertville, puis la Tarentaise. La montée depuis Moûtiers dessert Le Praz, Village, Moriond et Courchevel 1850 sur la même route.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte:
          "Comptez une heure de plus le samedi de haute saison, la vallée étant saturée entre Albertville et Moûtiers.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – Courchevel ?",
        reponse:
          "Environ 2 h 20 pour 188 km hors trafic, une heure de plus un samedi de février.",
      },
      {
        question: "Desservez-vous les quatre villages ?",
        reponse:
          "Oui, du Praz à Courchevel 1850. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "lyon-airport|meribel": {
    metaTitre: "Transfert Lyon – Méribel | 181 km, 2 h 15",
    metaDescription:
      "Transfert privé Lyon – Méribel et Mottaret : 181 km, environ 2 h 15. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Lyon – Méribel",
    chapo:
      "181 km et environ 2 h 15 : c’est l’un des accès les plus rapides aux Trois Vallées depuis un aéroport ouvert toute l’année. Autoroute jusqu’à Albertville, Tarentaise jusqu’à Moûtiers, puis 18 km dans la vallée des Allues jusqu’à Méribel, Mottaret ou Les Allues.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "L’autoroute couvre l’essentiel du parcours ; la montée depuis Moûtiers est courte, 18 km jusqu’au centre et 6 de plus jusqu’à Mottaret.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte: "Une heure de plus le samedi matin en février, comme partout en Tarentaise.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – Méribel ?",
        reponse:
          "Environ 2 h 15 pour 181 km hors trafic, une heure de plus un samedi de haute saison.",
      },
      {
        question: "Desservez-vous Mottaret et Les Allues ?",
        reponse: "Oui, sur le même trajet. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "lyon-airport|la-plagne": {
    metaTitre: "Transfert Lyon – La Plagne | 199 km, 2 h 35",
    metaDescription:
      "Transfert privé Lyon – La Plagne, ses onze villages : 199 km, environ 2 h 35. Prix fixe par véhicule, skis et sièges enfants compris.",
    h1: "Transfert Lyon – La Plagne",
    chapo:
      "199 km et environ 2 h 35, autoroute jusqu’à Albertville puis la Tarentaise. La Plagne compte onze villages sur trois routes d’accès différentes — Aime pour les stations d’altitude, Bourg-Saint-Maurice pour Montchavin et Les Coches, Moûtiers pour Champagny : l’adresse exacte compte.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Après Albertville, la Tarentaise mène à Aime, à Moûtiers ou à Bourg-Saint-Maurice selon votre village, avant la montée finale.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte: "Comptez une heure de plus le samedi matin de février.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – La Plagne ?",
        reponse:
          "Environ 2 h 35 pour 199 km hors trafic, une heure de plus un samedi de haute saison.",
      },
      {
        question: "Quels villages desservez-vous ?",
        reponse:
          "Les onze, par des routes différentes selon le village. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "lyon-airport|val-disere": {
    metaTitre: "Transfert Lyon – Val d’Isère | 222 km, 3 h",
    metaDescription:
      "Transfert privé Lyon – Val d’Isère, La Daille et Le Fornet : 222 km, environ 3 h. Prix fixe par véhicule, skis compris, suivi du vol.",
    h1: "Transfert Lyon – Val d’Isère",
    chapo:
      "222 km et environ 3 h : autoroute jusqu’à Albertville, Haute-Tarentaise jusqu’à Bourg-Saint-Maurice, puis 30 km de montée jusqu’à 1 850 m. Lyon vole toute l’année, ce qui en fait l’alternative naturelle à Chambéry hors week-end.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "L’autoroute couvre les deux premiers tiers ; la dernière heure est une route de montagne, par La Daille. Le col de l’Iseran est fermé tout l’hiver.",
      },
      { type: "titre2", texte: "Le samedi" },
      {
        type: "paragraphe",
        texte: "Une heure de plus le samedi de haute saison, en Tarentaise comme ailleurs.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – Val d’Isère ?",
        reponse:
          "Environ 3 h pour 222 km hors trafic, une heure de plus un samedi de février.",
      },
      {
        question: "Desservez-vous La Daille et Le Fornet ?",
        reponse: "Oui, ainsi que le centre. Précisez l’adresse à la réservation.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "lyon-airport|alpe-dhuez": {
    metaTitre: "Transfert Lyon – Alpe d’Huez | 155 km, 2 h 10",
    metaDescription:
      "Transfert privé Lyon – Alpe d’Huez : 155 km, environ 2 h 10 par Grenoble et les 21 virages. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Lyon – Alpe d’Huez",
    chapo:
      "155 km et environ 2 h 10 : autoroute jusqu’à Grenoble, vallée de la Romanche jusqu’au Bourg-d’Oisans, puis les 21 virages qui montent 1 100 m jusqu’à la station. Grenoble est plus proche (1 h 40) mais vole surtout le week-end : en semaine, Lyon est souvent la meilleure réponse.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Autoroute jusqu’à Grenoble, puis la vallée jusqu’au Bourg-d’Oisans à 720 m. Les 14 derniers kilomètres sont les 21 lacets numérotés, déneigés en priorité.",
      },
      { type: "titre2", texte: "L’hiver sur la montée" },
      {
        type: "paragraphe",
        texte:
          "Les équipements hiver sont obligatoires en Isère du 1ᵉʳ novembre au 31 mars : nos véhicules ont pneus et chaînes. Après de fortes chutes, comptez davantage.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Lyon – Alpe d’Huez ?",
        reponse:
          "Environ 2 h 10 pour 155 km hors trafic, davantage après de fortes chutes de neige.",
      },
      {
        question: "Desservez-vous Vaujany, Oz et Auris ?",
        reponse: "Oui, sur des routes voisines du même domaine. Précisez l’adresse.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },

  "geneva-airport|alpe-dhuez": {
    metaTitre: "Transfert Genève – Alpe d’Huez | 216 km, 3 h",
    metaDescription:
      "Transfert privé Genève – Alpe d’Huez : 216 km, environ 3 h par Grenoble et les 21 virages. Prix fixe par véhicule, skis compris.",
    h1: "Transfert Genève – Alpe d’Huez",
    chapo:
      "216 km et environ 3 h de route : autoroute par Chambéry et Grenoble jusqu’au Bourg-d’Oisans, puis les 21 virages qui montent 1 100 m jusqu’à la station. Lyon (2 h 10) et Grenoble (1 h 40) sont plus proches ; Genève reste utile quand leurs vols ne correspondent pas à vos dates.",
    contenu: [
      { type: "titre2", texte: "L’itinéraire" },
      {
        type: "paragraphe",
        texte:
          "Autoroute jusqu’à Grenoble, puis la vallée de la Romanche jusqu’au Bourg-d’Oisans, à 720 m. Les 14 derniers kilomètres et leurs 21 lacets numérotés sont déneigés en priorité, mais restent une route de montagne.",
      },
      { type: "titre2", texte: "Le mal des transports" },
      {
        type: "paragraphe",
        texte:
          "Les 21 virages sont sensibles pour qui y est sujet : place à l’avant, fenêtre entrouverte, repas léger avant le départ — et prévenez le chauffeur, qui peut ralentir la cadence.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      inclus,
    ],
    faq: [
      {
        question: "Combien de temps dure le trajet Genève – Alpe d’Huez ?",
        reponse:
          "Environ 3 h pour 216 km hors trafic. Depuis Lyon, comptez 2 h 10, et 1 h 40 depuis Grenoble.",
      },
      {
        question: "Desservez-vous Vaujany, Oz et Auris ?",
        reponse:
          "Oui, ils font partie du même domaine, sur des routes voisines. Précisez l’adresse.",
      },
      ...faqCommune.slice(0, 2),
    ],
  },
};
