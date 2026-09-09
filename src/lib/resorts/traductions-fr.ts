import type { TraductionStation } from "./types";

/**
 * Traductions françaises des pages de station.
 *
 * Elles vivent **à part** des modules de station pour la même raison que
 * `rediges.ts` : `npm run migrer:stations` réécrit intégralement les fichiers
 * repris du WordPress, et une clé `fr` ajoutée dedans disparaîtrait à la
 * migration suivante. Ici, elle survit — et `index.ts` la fusionne.
 *
 * Périmètre arrêté le 8 septembre 2026 : les 10 stations les plus recherchées
 * côté francophone, et leurs trajets au départ de Genève et de Lyon. Le français
 * n'est pas un miroir de l'anglais ; il est écrit, pas traduit mot à mot.
 */
export const TRADUCTIONS_FR: Record<string, TraductionStation> = {
  "val-thorens": {
    slug: "val-thorens",
    metaTitre: "Transfert Val Thorens | Genève, Lyon, Chambéry",
    metaDescription:
      "Transfert privé vers Val Thorens depuis Genève (161 km), Chambéry, Lyon et Grenoble. Prix fixe par véhicule, skis inclus, suivi des vols.",
    h1: "Transferts vers Val Thorens — la station la plus haute d'Europe",
    chapo:
      "Val Thorens se trouve à 2 300 m, tout en haut de la vallée des Belleville, et toutes les routes qui y mènent finissent par la même montée : 37 km depuis Moûtiers. Chambéry est l'aéroport le plus proche (122 km, 1 h 40), Genève le mieux desservi (161 km, 2 h 45), devant Grenoble (188 km, 2 h 25), Lyon (200 km, 2 h 35) et Turin (260 km, 3 h 30). Nous assurons ces cinq liaisons en porte-à-porte, en véhicules équipés pour la montagne, à un prix fixé par véhicule et annoncé avant la réservation — housses à skis et sièges enfants compris.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Val Thorens est la station la plus haute d'Europe, et la dernière avant le bout de la route. Cette géographie résume le trajet : le vol compte moins que la montée, et la montée est une route de montagne en hiver.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 122 km, 1 h 40. Le plus proche, mais un programme de vols concentré sur les week-ends.",
          "Genève — 161 km, 2 h 45. Des vols tous les jours depuis toute l'Europe : c'est ce qui compense l'heure de route supplémentaire.",
          "Grenoble — 188 km, 2 h 25. Vols charters le week-end, tarifs souvent plus bas.",
          "Lyon — 200 km, 2 h 35. Vols toute l'année et le plus large choix de compagnies.",
          "Turin — 260 km, 3 h 30. L'option italienne, par le tunnel du Fréjus.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Ces temps sont mesurés sur le réseau routier réel, hors trafic. Ce sont ceux qu'un chauffeur tient un jour de semaine dégagé, pas un meilleur cas théorique.",
      },
      { type: "titre2", texte: "Le samedi, tout change" },
      {
        type: "paragraphe",
        texte:
          "Le samedi est le jour de rotation des Trois Vallées : des dizaines de milliers de personnes arrivent et repartent le même matin, par la même vallée. Entre Albertville et Moûtiers, la Tarentaise sature. Comptez une heure de plus qu'annoncé un samedi de février — pour Genève, cela fait 3 h 45 plutôt que 2 h 45.",
      },
      { type: "titre2", texte: "Les 37 derniers kilomètres" },
      {
        type: "paragraphe",
        texte:
          "Toutes les routes convergent à Moûtiers, à 480 m. De là, la route monte à 2 300 m en 37 km de lacets, par Saint-Martin-de-Belleville et Les Menuires. Elle est déneigée et salée toute la saison, mais les équipements hiver y sont obligatoires du 1ᵉʳ novembre au 31 mars : nos véhicules ont pneus et chaînes à bord.",
      },
      {
        type: "paragraphe",
        texte:
          "Moûtiers est aussi la gare la plus proche, à 37 km en contrebas, avec des TGV directs depuis Paris le samedi en hiver. Si vous arrivez en train, dites-le : c'est la même montée, depuis le même point de départ.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Les housses à skis et à snowboard, sans supplément.",
          "Les sièges enfants et rehausseurs, installés avant le départ.",
          "Le suivi du vol et le temps d'attente en cas de retard.",
          "Les péages d'autoroute.",
          "La dépose à l'adresse exacte de votre logement, en station.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Val Thorens ?",
        reponse:
          "Environ 2 h 45 pour 161 km, hors trafic. Un samedi de haute saison, comptez une heure de plus : toutes les Trois Vallées changent de locataires le même matin.",
      },
      {
        question: "Quel est l'aéroport le plus proche de Val Thorens ?",
        reponse:
          "Chambéry, à 122 km et environ 1 h 40 de route. Ses vols d'hiver sont surtout programmés le week-end, ce qui rend Genève (161 km, 2 h 45) plus pratique en semaine.",
      },
      {
        question: "Les skis sont-ils compris dans le prix ?",
        reponse:
          "Oui. Les housses à skis et à snowboard voyagent gratuitement, et le véhicule est dimensionné selon le matériel que vous déclarez à la réservation.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Votre chauffeur suit le vol et décale la prise en charge à l'heure réelle d'atterrissage. Rien à faire, rien à payer en plus.",
      },
      {
        question: "Pouvez-vous nous prendre à la gare de Moûtiers ?",
        reponse:
          "Moûtiers est la gare la plus proche, à 37 km en contrebas de la station, desservie par des TGV directs le samedi. Indiquez-nous votre train et nous chiffrons la montée.",
      },
    ],
  },

  chamonix: {
    slug: "chamonix",
    metaTitre: "Transfert Chamonix | Genève, 91 km, 1 h 25",
    metaDescription:
      "Transfert privé vers Chamonix depuis Genève (91 km, 1 h 25), Chambéry, Lyon et Grenoble. Prix fixe par véhicule, skis et sièges enfants inclus.",
    h1: "Transferts vers Chamonix — au pied du mont Blanc",
    chapo:
      "Chamonix est à 91 km de Genève, soit environ 1 h 25 de route, ce qui en fait l’une des grandes stations les plus rapides d’accès depuis un aéroport international. Chambéry est à 140 km (1 h 40), Lyon à 217 km (2 h 30) et Grenoble à 219 km (2 h 30). L’itinéraire suit l’autoroute jusqu’au Fayet puis la vallée de l’Arve — pas de col, une route déneigée en continu. Prix fixe par véhicule annoncé avant la réservation, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La vallée de Chamonix s’étire sur une vingtaine de kilomètres, des Houches à Vallorcine, et l’adresse compte : Les Houches, Chamonix centre, Les Praz, Argentière et Le Tour sont autant de points de dépose différents, reliés par la même route.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Genève — 91 km, 1 h 25. Des vols tous les jours depuis toute l’Europe : c’est l’accès naturel.",
          "Chambéry Savoie — 140 km, 1 h 40. Vols surtout le week-end, souvent moins chers.",
          "Lyon — 217 km, 2 h 30. Vols toute l’année et le plus large choix de compagnies.",
          "Grenoble — 219 km, 2 h 30. Charters d’hiver le week-end.",
        ],
      },
      { type: "titre2", texte: "La vallée, du bas vers le haut" },
      {
        type: "liste",
        items: [
          "Les Houches (1 000 m) — la première station en montant, la plus familiale.",
          "Chamonix (1 035 m) — la ville, les commerces, l’Aiguille du Midi.",
          "Les Praz et Argentière — plus haut, plus calmes, au pied des Grands Montets.",
          "Le Tour et Vallorcine — le fond de vallée, ensoleillé, près de la frontière suisse.",
        ],
      },
      { type: "titre2", texte: "L’hiver sur la route" },
      {
        type: "paragraphe",
        texte:
          "La route de la vallée dessert 13 000 habitants et le tunnel du Mont-Blanc : elle est déneigée et salée en continu. La neige ralentit ce trajet, elle ne le bloque presque jamais. Les équipements hiver sont obligatoires en Haute-Savoie du 1ᵉʳ novembre au 31 mars et nos véhicules les embarquent.",
      },
      {
        type: "paragraphe",
        texte:
          "Le vrai point de saturation est l’A40 entre Genève et Le Fayet, le samedi matin en février. Comptez 45 minutes de plus ces jours-là.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis, snowboards et matériel de randonnée, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente en cas de retard.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, des Houches à Vallorcine.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Chamonix ?",
        reponse:
          "Environ 1 h 25 pour 91 km, hors trafic. Comptez 45 minutes de plus un samedi de février, quand l’A40 est saturée.",
      },
      {
        question: "Desservez-vous Argentière, Les Houches et Vallorcine ?",
        reponse:
          "Oui, toute la vallée, sur la même route. Précisez l’adresse à la réservation : vingt kilomètres séparent les deux extrémités.",
      },
      {
        question: "Peut-on rejoindre Courmayeur depuis Chamonix ?",
        reponse:
          "Oui, par le tunnel du Mont-Blanc, une vingtaine de minutes depuis Chamonix. Le péage du tunnel est compris dans le prix annoncé.",
      },
      {
        question: "Les skis sont-ils compris ?",
        reponse:
          "Oui, sans supplément. Déclarez aussi le matériel de randonnée ou de freeride : le véhicule est choisi en fonction.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge à l’heure réelle d’atterrissage ; le temps d’attente est compris.",
      },
    ],
  },

  tignes: {
    slug: "tignes",
    metaTitre: "Transfert Tignes | Chambéry, Genève, Lyon",
    metaDescription:
      "Transfert privé vers Tignes depuis Chambéry (142 km, 2 h), Genève, Lyon et Grenoble. Prix fixe par véhicule, skis inclus, suivi des vols.",
    h1: "Transferts vers Tignes — l’Espace Killy, ski garanti",
    chapo:
      "Tignes est à 142 km de Chambéry (2 h), 182 km de Genève (3 h 05), 221 km de Lyon (2 h 55) et 208 km de Grenoble (2 h 50). La station se répartit entre Le Lac, Val Claret, Le Lavachet et Les Boisses, entre 1 550 et 2 300 m, au bout de la Haute-Tarentaise. La montée depuis Bourg-Saint-Maurice — 30 km de lacets — est la partie du trajet qui décide de l’horaire en hiver. Prix fixe par véhicule, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Tignes partage avec Val d’Isère l’Espace Killy, et son altitude — 2 100 m pour Val Claret, un glacier à 3 456 m — lui donne l’une des plus longues saisons des Alpes. C’est aussi ce qui rend la fin du trajet exigeante : on monte de 800 m en trente kilomètres depuis Bourg-Saint-Maurice.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 142 km, 2 h. Le plus proche ; vols concentrés le week-end.",
          "Genève — 182 km, 3 h 05. Des vols tous les jours, la solution des arrivées en semaine.",
          "Lyon — 221 km, 2 h 55. Plus loin en kilomètres, souvent moins en temps : autoroute presque partout.",
          "Grenoble — 208 km, 2 h 50. Charters d’hiver.",
        ],
      },
      { type: "titre2", texte: "Quel quartier de Tignes ?" },
      {
        type: "paragraphe",
        texte:
          "Val Claret (2 100 m) est le plus haut et le plus proche des remontées du glacier. Tignes le Lac est le centre. Le Lavachet est juste en dessous, et Les Boisses — Tignes 1800 — en contrebas du barrage. Indiquez l’adresse : ce sont des kilomètres de route en plus, sur la fin.",
      },
      { type: "titre2", texte: "L’hiver, et le samedi" },
      {
        type: "paragraphe",
        texte:
          "La route est déneigée et salée en continu, et les équipements hiver sont obligatoires du 1ᵉʳ novembre au 31 mars — pneus et chaînes sont à bord. La Tarentaise sature le samedi matin de haute saison : comptez une heure de plus. Après de fortes chutes, l’accès peut fermer brièvement pour déclenchement préventif d’avalanches.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, à Val Claret comme au Lavachet.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Tignes ?",
        reponse:
          "Environ 3 h 05 pour 182 km hors trafic. Depuis Chambéry, comptez 2 h pour 142 km. Un samedi de février, ajoutez une heure.",
      },
      {
        question: "Desservez-vous Val Claret et Tignes 1800 ?",
        reponse:
          "Oui, ainsi que Le Lac, Le Lavachet et Les Boisses. Précisez l’adresse : la station s’étage sur plusieurs kilomètres.",
      },
      {
        question: "Peut-on aller à Val d’Isère sur le même trajet ?",
        reponse:
          "Oui, c’est la même vallée, à quelques kilomètres. Dites-le à la réservation et le trajet est chiffré comme un seul transfert.",
      },
      {
        question: "Les sièges enfants sont-ils fournis ?",
        reponse:
          "Oui, sans supplément et installés avant le départ, comme la loi française l’impose jusqu’à 10 ans.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge ; le temps d’attente est compris.",
      },
    ],
  },

  "val-disere": {
    slug: "val-d-isere",
    metaTitre: "Transfert Val d’Isère | Chambéry, Genève, Lyon",
    metaDescription:
      "Transfert privé vers Val d’Isère depuis Chambéry (144 km, 2 h 10), Genève, Lyon et Grenoble. Prix fixe par véhicule, skis inclus.",
    h1: "Transferts vers Val d’Isère — au bout de la Haute-Tarentaise",
    chapo:
      "Val d’Isère est à 144 km de Chambéry (2 h 10), 183 km de Genève (3 h 15), 222 km de Lyon (3 h) et 210 km de Grenoble (2 h 55). La station est au bout de la vallée, à 1 850 m, après 30 km de montée depuis Bourg-Saint-Maurice. C’est un trajet long, et la dernière heure est une route de montagne : prix fixe par véhicule annoncé avant la réservation, véhicules équipés hiver, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Val d’Isère est un village-rue au fond de la Haute-Tarentaise, relié à Tignes par l’Espace Killy. La route s’y termine — le col de l’Iseran, au-dessus, est fermé tout l’hiver — ce qui veut dire qu’on y monte et qu’on en redescend par le même chemin.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 144 km, 2 h 10. Le plus rapide ; vols surtout le week-end.",
          "Genève — 183 km, 3 h 15. Des vols tous les jours depuis toute l’Europe.",
          "Lyon — 222 km, 3 h. Vols toute l’année, autoroute jusqu’à Albertville.",
          "Grenoble — 210 km, 2 h 55. Charters d’hiver le week-end.",
        ],
      },
      { type: "titre2", texte: "La montée, et le col fermé" },
      {
        type: "paragraphe",
        texte:
          "Depuis Bourg-Saint-Maurice, la route monte 30 km jusqu’à 1 850 m, par La Daille. Elle est déneigée en continu et les équipements hiver sont obligatoires du 1ᵉʳ novembre au 31 mars. Le col de l’Iseran, qui relie l’été à la Maurienne, est fermé de l’automne au printemps : il n’existe aucun raccourci par le sud.",
      },
      { type: "titre2", texte: "Val d’Isère, La Daille, Le Fornet" },
      {
        type: "paragraphe",
        texte:
          "La Daille, à l’entrée, est au pied du funiculaire. Le centre concentre les commerces. Le Fornet, à 2 km au-dessus, est le hameau le plus calme et le départ du secteur du Glacier. Donnez-nous l’adresse exacte à la réservation.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente en cas de retard.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, de La Daille au Fornet.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Val d’Isère ?",
        reponse:
          "Environ 3 h 15 pour 183 km hors trafic ; 2 h 10 depuis Chambéry. Comptez une heure de plus un samedi de haute saison.",
      },
      {
        question: "Le col de l’Iseran est-il ouvert en hiver ?",
        reponse:
          "Non, il ferme de l’automne au printemps. L’accès se fait uniquement par Bourg-Saint-Maurice, quelle que soit la provenance.",
      },
      {
        question: "Desservez-vous La Daille et Le Fornet ?",
        reponse:
          "Oui, ainsi que le centre. Précisez l’adresse : quelques kilomètres séparent les trois.",
      },
      {
        question: "Les skis sont-ils compris ?",
        reponse:
          "Oui, sans supplément. Déclarez-les à la réservation pour que le véhicule ait la place.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge à l’atterrissage réel.",
      },
    ],
  },

  courchevel: {
    slug: "courchevel",
    metaTitre: "Transfert Courchevel | Genève, Lyon, Chambéry",
    metaDescription:
      "Transfert privé vers Courchevel 1850, 1650 et 1550 depuis Genève (149 km), Chambéry, Lyon et Grenoble. Prix fixe par véhicule, skis inclus.",
    h1: "Transferts vers Courchevel — les quatre villages des Trois Vallées",
    chapo:
      "Courchevel est à 149 km de Genève, soit environ 2 h 30 de route, et à 110 km de Chambéry (1 h 30). Lyon est à 188 km (2 h 20) et Grenoble à 175 km (2 h 15). La station se répartit sur quatre villages étagés entre 1 300 et 1 850 m, reliés par une seule route qui monte depuis Moûtiers : l'adresse exacte compte donc autant que la station. Nous assurons ces liaisons en porte-à-porte, à prix fixe par véhicule, skis et sièges enfants compris, avec suivi du vol.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Courchevel n'est pas une station mais quatre villages sur la même montagne : Le Praz à 1 300 m, Village à 1 550 m, Moriond à 1 650 m et Courchevel à 1 850 m. Une seule route les dessert, en 20 km depuis Moûtiers, et vingt minutes séparent le premier du dernier.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 110 km, 1 h 30. Le plus court, vols surtout le week-end.",
          "Genève — 149 km, 2 h 30. Des vols tous les jours, la solution des arrivées en semaine.",
          "Grenoble — 175 km, 2 h 15. Charters d’hiver, tarifs souvent plus bas.",
          "Lyon — 188 km, 2 h 20. Le plus large choix de compagnies, toute l’année.",
        ],
      },
      { type: "titre2", texte: "Quel village ?" },
      {
        type: "paragraphe",
        texte:
          "Dites-nous lequel à la réservation. Courchevel 1850 est la station haute, celle des palaces et de l'altiport. Moriond (1650) est plus familiale et mieux exposée au soleil. Village (1550) et Le Praz (1300) sont moins chers, boisés, et à quelques minutes de télécabine du reste du domaine.",
      },
      { type: "titre2", texte: "L'hiver sur la route" },
      {
        type: "paragraphe",
        texte:
          "La montée depuis Moûtiers est déneigée et salée en continu, mais les équipements hiver sont obligatoires en Savoie du 1ᵉʳ novembre au 31 mars : nos véhicules ont pneus et chaînes. Le point de saturation n'est pas la montagne mais la vallée, le samedi matin en février, entre Albertville et Moûtiers. Comptez une heure de plus ces jours-là.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d'attente en cas de retard.",
          "Péages d'autoroute.",
          "Dépose à l'adresse exacte, dans les quatre villages.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Courchevel ?",
        reponse:
          "Environ 2 h 30 pour 149 km hors trafic, et jusqu'à une heure de plus un samedi de février.",
      },
      {
        question: "Quel village de Courchevel desservez-vous ?",
        reponse:
          "Les quatre : Le Praz (1300), Village (1550), Moriond (1650) et Courchevel (1850). Indiquez l'adresse exacte à la réservation.",
      },
      {
        question: "Chambéry est-il vraiment plus rapide que Genève ?",
        reponse:
          "Oui : 110 km et environ 1 h 30, contre 149 km et 2 h 30. Mais Chambéry vole surtout le week-end, ce qui règle souvent la question à la place du kilométrage.",
      },
      {
        question: "Les sièges enfants sont-ils fournis ?",
        reponse:
          "Oui, sans supplément et installés avant le départ. La loi française impose un dispositif homologué jusqu'à 10 ans.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et ajuste la prise en charge à l'atterrissage réel ; le temps d'attente est compris.",
      },
    ],
  },

  "la-plagne": {
    slug: "la-plagne",
    metaTitre: "Transfert La Plagne | Chambéry, Genève, Lyon",
    metaDescription:
      "Transfert privé vers La Plagne depuis Chambéry (121 km, 1 h 40), Genève, Lyon et Grenoble. Prix fixe par véhicule, skis et sièges enfants inclus.",
    h1: "Transferts vers La Plagne — les onze villages de Paradiski",
    chapo:
      "La Plagne est à 121 km de Chambéry (1 h 40), 160 km de Genève (2 h 45), 199 km de Lyon (2 h 35) et 187 km de Grenoble (2 h 25). La station compte onze villages entre 1 250 et 2 100 m, du bas de la vallée à Aime-la-Plagne : l’adresse exacte change la fin du trajet de vingt minutes. Prix fixe par véhicule annoncé avant la réservation, skis et sièges enfants compris, véhicules équipés hiver et vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "La Plagne est reliée aux Arcs par le Vanoise Express, ce qui forme Paradiski et ses 425 km de pistes. Mais pour arriver, ce qui compte est la géographie de la station : onze villages, deux vallées d’accès, et une route qui monte depuis Aime ou depuis Bourg-Saint-Maurice selon votre logement.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 121 km, 1 h 40. Le plus proche ; vols surtout le week-end.",
          "Genève — 160 km, 2 h 45. Des vols tous les jours, la solution des arrivées en semaine.",
          "Lyon — 199 km, 2 h 35. Vols toute l’année, autoroute presque partout.",
          "Grenoble — 187 km, 2 h 25. Charters d’hiver.",
        ],
      },
      { type: "titre2", texte: "Quel village ?" },
      {
        type: "paragraphe",
        texte:
          "Plagne Centre, Plagne Villages, Plagne Soleil, Plagne Bellecôte, Belle Plagne et Aime-la-Plagne sont les stations d’altitude, entre 1 970 et 2 100 m. Montchavin, Les Coches, Champagny-en-Vanoise, Montalbert et Plagne 1800 sont plus bas, plus boisés, et souvent moins chers. Ils ne se rejoignent pas par la même route : dites-nous lequel.",
      },
      { type: "titre2", texte: "L’hiver, et le samedi" },
      {
        type: "paragraphe",
        texte:
          "Les routes d’accès sont déneigées et salées en continu, avec équipements hiver obligatoires du 1ᵉʳ novembre au 31 mars — pneus et chaînes sont à bord. Le samedi de haute saison, la Tarentaise sature entre Albertville et Moûtiers : comptez une heure de plus.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente en cas de retard.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, dans les onze villages.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – La Plagne ?",
        reponse:
          "Environ 2 h 45 pour 160 km hors trafic, et 1 h 40 depuis Chambéry. Un samedi de février, comptez une heure de plus.",
      },
      {
        question: "Quels villages de La Plagne desservez-vous ?",
        reponse:
          "Tous : les stations d’altitude comme Belle Plagne ou Plagne Centre, et les villages plus bas comme Montchavin, Les Coches ou Champagny. Précisez l’adresse, les routes d’accès diffèrent.",
      },
      {
        question: "Peut-on rejoindre Les Arcs depuis La Plagne ?",
        reponse:
          "Sur les skis, oui : le Vanoise Express relie les deux domaines en quatre minutes. Par la route, il faut redescendre en vallée — comptez une heure.",
      },
      {
        question: "Les skis sont-ils compris ?",
        reponse:
          "Oui, sans supplément. Déclarez-les à la réservation pour que le véhicule ait la place.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge ; le temps d’attente est compris.",
      },
    ],
  },

  "les-arcs": {
    slug: "les-arcs",
    metaTitre: "Transfert Les Arcs | Chambéry, Genève, Lyon",
    metaDescription:
      "Transfert privé vers Les Arcs 1600, 1800, 1950 et 2000 depuis Chambéry (122 km, 1 h 45), Genève et Lyon. Prix fixe par véhicule, skis inclus.",
    h1: "Transferts vers Les Arcs — Bourg-Saint-Maurice et les quatre altitudes",
    chapo:
      "Les Arcs sont à 122 km de Chambéry (1 h 45), 161 km de Genève (2 h 45), 200 km de Lyon (2 h 35) et 187 km de Grenoble (2 h 30). La station se lit par altitude : Arc 1600, 1800, 1950 et 2000, au-dessus de Bourg-Saint-Maurice. Le funiculaire monte de la gare à Arc 1600 en sept minutes, mais votre transfert va directement à l’adresse. Prix fixe par véhicule, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Les Arcs forment avec La Plagne le domaine Paradiski, 425 km de pistes reliées par le Vanoise Express. La station elle-même est construite en balcons sur la vallée, chaque niveau ayant son caractère et sa route.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 122 km, 1 h 45. Le plus proche ; programme concentré le week-end.",
          "Genève — 161 km, 2 h 45. Des vols tous les jours depuis toute l’Europe.",
          "Lyon — 200 km, 2 h 35. Vols toute l’année et large choix de compagnies.",
          "Grenoble — 187 km, 2 h 30. Charters d’hiver le week-end.",
        ],
      },
      { type: "titre2", texte: "Quelle altitude ?" },
      {
        type: "liste",
        items: [
          "Arc 1600 — la plus ancienne, boisée, au sommet du funiculaire.",
          "Arc 1800 — la plus animée, commerces et restaurants.",
          "Arc 1950 — un village récent, construit en pierre et bois, ski aux pieds.",
          "Arc 2000 — le plus haut, au pied de l’Aiguille Rouge.",
          "Peisey-Vallandry — l’accès au Vanoise Express, côté forêt.",
        ],
      },
      { type: "titre2", texte: "L’hiver sur la route" },
      {
        type: "paragraphe",
        texte:
          "Depuis Bourg-Saint-Maurice, la montée fait 15 à 25 km selon le niveau, en lacets déneigés et salés quotidiennement. Équipements hiver obligatoires du 1ᵉʳ novembre au 31 mars : pneus et chaînes sont à bord. Le samedi de haute saison, ajoutez une heure pour la Tarentaise.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, d’Arc 1600 à Arc 2000.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Les Arcs ?",
        reponse:
          "Environ 2 h 45 pour 161 km hors trafic, 1 h 45 depuis Chambéry. Comptez une heure de plus un samedi de février.",
      },
      {
        question: "Quelle station des Arcs desservez-vous ?",
        reponse:
          "Les quatre — 1600, 1800, 1950 et 2000 — ainsi que Peisey-Vallandry et Bourg-Saint-Maurice. Précisez l’adresse à la réservation.",
      },
      {
        question: "Faut-il prendre le funiculaire depuis Bourg-Saint-Maurice ?",
        reponse:
          "Non : votre transfert monte par la route jusqu’à votre logement. Le funiculaire est utile si vous arrivez en train.",
      },
      {
        question: "Les sièges enfants sont-ils fournis ?",
        reponse:
          "Oui, sans supplément et installés avant le départ, comme la loi française l’impose jusqu’à 10 ans.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge ; le temps d’attente est compris.",
      },
    ],
  },

  "alpe-dhuez": {
    slug: "alpe-d-huez",
    metaTitre: "Transfert Alpe d’Huez | Grenoble, Lyon, Chambéry",
    metaDescription:
      "Transfert privé vers l’Alpe d’Huez depuis Grenoble (106 km, 1 h 40), Lyon, Chambéry et Genève. Prix fixe par véhicule, skis inclus.",
    h1: "Transferts vers l’Alpe d’Huez — l’Oisans et ses 21 virages",
    chapo:
      "L’Alpe d’Huez est à 106 km de Grenoble (1 h 40), 131 km de Chambéry (1 h 55), 155 km de Lyon (2 h 10) et 216 km de Genève (3 h). La station est à 1 860 m, au-dessus des 21 virages numérotés que le Tour de France a rendus célèbres — et qui sont, en hiver, la partie du trajet à laquelle il faut penser. Prix fixe par véhicule, véhicules équipés hiver, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "L’Alpe d’Huez est la grande station de l’Oisans : 250 km de pistes, un domaine qui monte au Pic Blanc à 3 330 m, et la Sarenne, la plus longue piste noire des Alpes avec ses 16 km. Elle est aussi l’une des plus ensoleillées de France, ce qui lui a valu son surnom d’île au soleil.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Grenoble Alpes-Isère — 106 km, 1 h 40. Le plus proche ; charters d’hiver le week-end.",
          "Chambéry Savoie — 131 km, 1 h 55. Même profil de vols, week-ends surtout.",
          "Lyon — 155 km, 2 h 10. Vols toute l’année : souvent la meilleure option en semaine.",
          "Genève — 216 km, 3 h. Le plus grand choix européen, au prix d’une heure de plus.",
        ],
      },
      { type: "titre2", texte: "Les 21 virages en hiver" },
      {
        type: "paragraphe",
        texte:
          "Depuis Le Bourg-d’Oisans, la montée fait 14 km et 1 100 m de dénivelé, en 21 lacets numérotés. La route est déneigée et salée en priorité, mais c’est une vraie route de montagne : les équipements hiver sont obligatoires en Isère du 1ᵉʳ novembre au 31 mars, et nos véhicules les embarquent.",
      },
      {
        type: "paragraphe",
        texte:
          "Si quelqu’un est sujet au mal des transports, c’est le moment du trajet à préparer : place à l’avant, fenêtre entrouverte, repas léger avant — et dites-le au chauffeur, qui peut ralentir la cadence dans les virages.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente en cas de retard.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, à l’Alpe d’Huez comme à Vaujany, Oz ou Auris.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Grenoble – Alpe d’Huez ?",
        reponse:
          "Environ 1 h 40 pour 106 km, dont 14 km et 21 virages de montée depuis Le Bourg-d’Oisans. Comptez davantage après de fortes chutes de neige.",
      },
      {
        question: "Lyon ou Grenoble ?",
        reponse:
          "Grenoble est plus proche (1 h 40 contre 2 h 10), mais Lyon vole toute l’année alors que Grenoble concentre ses vols d’hiver sur le week-end.",
      },
      {
        question: "Desservez-vous Vaujany, Oz-en-Oisans et Auris ?",
        reponse:
          "Oui, ils font partie du même domaine et sont sur des routes voisines. Précisez l’adresse à la réservation.",
      },
      {
        question: "Les skis sont-ils compris ?",
        reponse:
          "Oui, sans supplément. Déclarez-les pour que le véhicule envoyé ait la place.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge à l’atterrissage réel ; le temps d’attente est compris.",
      },
    ],
  },

  "les-menuires": {
    slug: "les-menuires",
    metaTitre: "Transfert Les Menuires | Chambéry, Genève, Lyon",
    metaDescription:
      "Transfert privé vers Les Menuires depuis Chambéry (114 km, 1 h 40), Genève, Lyon et Grenoble. Prix fixe par véhicule, skis inclus.",
    h1: "Transferts vers Les Menuires — la vallée des Belleville",
    chapo:
      "Les Menuires sont à 114 km de Chambéry (1 h 40), 153 km de Genève (2 h 45), 192 km de Lyon (2 h 30) et 180 km de Grenoble (2 h 25). La station est à 1 850 m dans la vallée des Belleville, sur la même route que Val Thorens, 8 km plus bas. Tous les itinéraires finissent par la montée depuis Moûtiers : 27 km de lacets. Prix fixe par véhicule, véhicules équipés hiver, skis et sièges enfants compris, vol suivi.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Les Menuires donnent accès aux Trois Vallées — le même forfait que Courchevel, Méribel et Val Thorens — à des tarifs d’hébergement qui n’ont jamais prétendu les égaler. La station est construite à flanc de pente : presque tous les bâtiments sont sur la neige.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 114 km, 1 h 40. Le plus court ; vols surtout le week-end.",
          "Genève — 153 km, 2 h 45. Des vols tous les jours : la solution des arrivées en semaine.",
          "Lyon — 192 km, 2 h 30. Vols toute l’année, autoroute jusqu’à Albertville.",
          "Grenoble — 180 km, 2 h 25. Charters d’hiver.",
        ],
      },
      { type: "titre2", texte: "Quel quartier ?" },
      {
        type: "paragraphe",
        texte:
          "La Croisette est le front de neige principal. Reberty 1850 et 2000, Les Bruyères et Preyerand s’étagent autour. Saint-Martin-de-Belleville, 8 km plus bas, est le village traditionnel relié au même domaine. Donnez-nous l’adresse exacte à la réservation.",
      },
      { type: "titre2", texte: "L’hiver, et le samedi" },
      {
        type: "paragraphe",
        texte:
          "La montée depuis Moûtiers est déneigée et salée en continu, avec équipements hiver obligatoires du 1ᵉʳ novembre au 31 mars. Le samedi de haute saison, toutes les Trois Vallées changent de locataires le même matin : comptez une heure de plus entre Albertville et Moûtiers.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol et temps d’attente.",
          "Péages d’autoroute.",
          "Dépose à l’adresse exacte, de Saint-Martin à Val Thorens.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Les Menuires ?",
        reponse:
          "Environ 2 h 45 pour 153 km hors trafic, et 1 h 40 depuis Chambéry. Un samedi de février, comptez une heure de plus.",
      },
      {
        question: "Desservez-vous Saint-Martin-de-Belleville et Val Thorens ?",
        reponse:
          "Oui, les deux sont sur la même route, 8 km en dessous et 8 km au-dessus. Précisez l’adresse à la réservation.",
      },
      {
        question: "Chambéry ou Genève ?",
        reponse:
          "Chambéry est nettement plus proche, mais vole surtout le week-end. Genève propose des vols tous les jours : le choix se fait sur le programme aérien, pas sur les kilomètres.",
      },
      {
        question: "Les skis sont-ils compris ?",
        reponse:
          "Oui, sans supplément, et le véhicule est dimensionné selon le matériel déclaré.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge ; le temps d’attente est compris.",
      },
    ],
  },

  meribel: {
    slug: "meribel",
    metaTitre: "Transfert Méribel | Genève, Chambéry, Lyon",
    metaDescription:
      "Transfert privé vers Méribel depuis Chambéry (103 km, 1 h 20), Genève, Lyon et Grenoble. Prix fixe par véhicule, skis et sièges enfants inclus.",
    h1: "Transferts vers Méribel — au centre des Trois Vallées",
    chapo:
      "Méribel est à 103 km de Chambéry (1 h 20), 142 km de Genève (2 h 25), 181 km de Lyon (2 h 15) et 169 km de Grenoble (2 h 05). La station s'étire sur la vallée des Allues, de Méribel Village à Mottaret, avec 18 km de route depuis Moûtiers. Nous assurons ces quatre liaisons en porte-à-porte, à prix fixe par véhicule, skis et sièges enfants compris, avec suivi du vol et véhicules équipés pour l'hiver.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Méribel occupe le centre géographique des Trois Vallées : d'ici, Courchevel est à un télésiège d'un côté, Val Thorens et Les Menuires de l'autre. C'est ce qui explique le prix des lits et la fréquentation de la vallée des Allues.",
      },
      { type: "titre2", texte: "Quel aéroport choisir ?" },
      {
        type: "liste",
        items: [
          "Chambéry Savoie — 103 km, 1 h 20. Le plus proche, vols concentrés le week-end.",
          "Genève — 142 km, 2 h 25. Des vols tous les jours, toutes destinations européennes.",
          "Grenoble — 169 km, 2 h 05. Charters d’hiver.",
          "Lyon — 181 km, 2 h 15. Vols toute l’année, large choix de compagnies.",
        ],
      },
      { type: "titre2", texte: "Où exactement ?" },
      {
        type: "paragraphe",
        texte:
          "Méribel Centre (1 450 m) concentre les commerces et les remontées. Mottaret (1 750 m), 6 km plus haut, est le vrai ski aux pieds. Méribel Village et Les Allues, en contrebas, sont plus calmes et moins chers. Donnez-nous l'adresse : ce sont vingt minutes de route qui les séparent.",
      },
      { type: "titre2", texte: "L'hiver, et le samedi" },
      {
        type: "paragraphe",
        texte:
          "La montée depuis Moûtiers est traitée en continu, et les équipements hiver sont obligatoires du 1ᵉʳ novembre au 31 mars — pneus et chaînes sont à bord. Le samedi de haute saison, la Tarentaise sature entre Albertville et Moûtiers : comptez une heure de plus.",
      },
      { type: "titre2", texte: "Ce qui est compris" },
      {
        type: "liste",
        items: [
          "Housses à skis et snowboards, sans supplément.",
          "Sièges enfants et rehausseurs, installés avant le départ.",
          "Suivi du vol, temps d'attente compris.",
          "Péages d'autoroute.",
          "Dépose à l'adresse exacte, de Les Allues à Mottaret.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de temps dure le transfert Genève – Méribel ?",
        reponse:
          "Environ 2 h 25 pour 142 km hors trafic. Un samedi de février, comptez une heure de plus.",
      },
      {
        question: "Desservez-vous Mottaret et Les Allues ?",
        reponse:
          "Oui, ainsi que Méribel Village : ce sont les mêmes 18 km depuis Moûtiers, avec une fin de trajet différente. Précisez l'adresse à la réservation.",
      },
      {
        question: "Chambéry ou Genève ?",
        reponse:
          "Chambéry est à 1 h 20 contre 2 h 25 depuis Genève, mais son programme d'hiver est surtout le samedi. En semaine, Genève est souvent la seule option.",
      },
      {
        question: "Les housses à skis coûtent-elles un supplément ?",
        reponse:
          "Non. Déclarez-les simplement à la réservation pour que le véhicule envoyé ait la place.",
      },
      {
        question: "Et si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge ; le temps d'attente est compris.",
      },
    ],
  },
};
