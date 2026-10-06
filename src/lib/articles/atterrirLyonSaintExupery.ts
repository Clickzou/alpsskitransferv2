import type { Article, TraductionArticle } from "./types";

/**
 * « Atterrir à Lyon Saint-Exupéry pour skier » — en FRANÇAIS SEUL, programmé
 * au 27 octobre 2026. Sujet n°2 de l'audit articles d'octobre
 * (`clickzou-v2/docs/audits-articles/2026-10/alps.md`) : deux questions Pulse
 * sur Lyon (Alpe d'Huez, Courchevel), zéro citation sur 22 relevés, et aucun
 * article français ne nourrit les six pages de trajet françaises au départ de
 * Lyon. Pas de version anglaise : elle concurrencerait les articles Three
 * Valleys et Grenoble (`sansVersionAnglaise`).
 *
 * Chiffres : pages de trajet au départ de Lyon.
 *   - Les six qui existent en français (`src/lib/transfers/traductions-fr.ts`) :
 *     Alpe d'Huez, Courchevel, Méribel, Val Thorens, La Plagne, Val d'Isère —
 *     chiffres de la page FRANÇAISE, celle vers laquelle l'article renvoie
 *     (arrondis à cinq minutes, ex. 2 h 35 là où la page anglaise dit 2 h 33).
 *   - Celles qui n'existent qu'en anglais (`lyon-airport-to-*.ts`) : Les Deux
 *     Alpes, Chamrousse, Les Gets, Morzine — chiffres de la page anglaise, et
 *     pas de lien (on ne renvoie pas un lecteur français vers une page anglaise).
 *   - Comparaisons : pages françaises Genève → … et pages anglaises Chambéry
 *     et Grenoble → … (aucune page française au départ de ces deux aéroports).
 * Routes, villages et altitudes : les mêmes pages françaises. Véhicules : page
 * /inquiry/ et FAQ des trajets. Si une page change ses chiffres, relire ceux-ci.
 */
const fr: TraductionArticle = {
  slug: "atterrir-a-lyon-saint-exupery-pour-skier",
  titre: "Atterrir à Lyon Saint-Exupéry pour skier : quelles stations, combien de temps de route",
  metaTitre: "Skier depuis Lyon Saint-Exupéry : stations et temps de route",
  motCle: "transfert lyon alpe d'huez",
  motsClesSecondaires: ["transfert lyon saint-exupéry courchevel"],
  metaDescription:
    "Depuis l’aéroport de Lyon : Alpe d’Huez 2 h 10, Méribel 2 h 15, Courchevel 2 h 20, Val Thorens 2 h 35, Val d’Isère 3 h. Temps de route réels par station.",
  chapo:
    "Depuis Lyon Saint-Exupéry, on rejoint en transfert privé l’Alpe d’Huez en 2 h 10 environ, Méribel en 2 h 15, Courchevel en 2 h 20, Val Thorens et La Plagne en 2 h 35, Val d’Isère en 3 h — hors trafic ; un samedi de février, comptez environ une heure de plus vers la Tarentaise. Lyon n’est le plus proche d’aucune de ces stations, mais c’est l’aéroport qui vole tous les jours de l’année : la bonne réponse dès que vous arrivez en semaine.",
  altVisuel: "Façade vitrée du terminal 1 de l’aéroport Lyon-Saint-Exupéry",
  stationsLiees: ["alpe-dhuez", "courchevel", "meribel", "val-thorens", "la-plagne", "val-disere"],

  aRetenir: [
    "Depuis l’aéroport de Lyon Saint-Exupéry, comptez environ 2 h 10 pour l’Alpe d’Huez (155 km), 2 h 15 pour Méribel (181 km), 2 h 20 pour Courchevel (188 km), 2 h 35 pour Val Thorens (200 km) et La Plagne (199 km), 3 h pour Val d’Isère (222 km), hors trafic.",
    "Pour les Trois Vallées, La Plagne et Val d’Isère, Lyon est 10 à 15 minutes plus rapide que Genève, bien que plus loin de 39 km.",
    "Chambéry reste le plus proche de la Tarentaise et Grenoble de l’Alpe d’Huez, mais ces deux aéroports volent surtout le week-end en hiver ; Lyon vole toute l’année, y compris en semaine.",
    "Un samedi de février, comptez environ une heure de plus vers la Tarentaise, quel que soit l’aéroport d’arrivée.",
    "Le transfert privé se paie par véhicule : jusqu’à 8 passagers et 12 bagages dans le plus grand, housses à skis et péages compris.",
  ],

  trajetsLies: [
    { airport: "lyon-airport", resort: "alpe-dhuez" },
    { airport: "lyon-airport", resort: "meribel" },
    { airport: "lyon-airport", resort: "courchevel" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "lyon-airport", resort: "la-plagne" },
    { airport: "lyon-airport", resort: "val-disere" },
  ],

  lectures: ["which-airport-for-the-french-alps", "booking-a-ski-transfer-what-to-check"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Lyon Saint-Exupéry n’a pas la réputation d’un aéroport de ski. On pense d’abord à Genève, puis à Chambéry ou à Grenoble, plus proches des pistes. Pourtant, Lyon dessert en un peu plus de deux heures l’Alpe d’Huez et les Trois Vallées, en deux heures et demie Val Thorens et La Plagne, et en trois heures Val d’Isère. Ce n’est jamais l’aéroport le plus proche d’une station. C’est souvent celui qui a un vol le jour où vous voulez partir.",
    },
    {
      type: "paragraphe",
      texte:
        "Ce guide donne, station par station, le temps de route réel depuis Lyon, ce qui se passe sur la fin du trajet, et la comparaison honnête avec les autres aéroports. Tous les temps sont mesurés sur le réseau routier et s’entendent hors trafic : c’est ce que tient un chauffeur un jour de semaine calme. Le samedi a sa propre section, plus bas. Pour la vue d’ensemble des cinq aéroports des Alpes françaises, voyez notre guide [Quel aéroport choisir pour les Alpes françaises ?](/fr/blog/quel-aeroport-pour-les-alpes/)",
    },

    { type: "titre2", texte: "Les stations desservies depuis Lyon, et le temps de route" },
    {
      type: "paragraphe",
      texte:
        "Voici les six stations pour lesquelles nous avons une page de trajet en français au départ de Lyon, de la plus proche à la plus éloignée en temps de route.",
    },
    {
      type: "liste",
      items: [
        "[Lyon – Alpe d’Huez](/fr/transferts-ski/alpe-d-huez/lyon/) : 155 km, environ 2 h 10.",
        "[Lyon – Méribel](/fr/transferts-ski/meribel/lyon/) : 181 km, environ 2 h 15.",
        "[Lyon – Courchevel](/fr/transferts-ski/courchevel/lyon/) : 188 km, environ 2 h 20.",
        "[Lyon – La Plagne](/fr/transferts-ski/la-plagne/lyon/) : 199 km, environ 2 h 35.",
        "[Lyon – Val Thorens](/fr/transferts-ski/val-thorens/lyon/) : 200 km, environ 2 h 35.",
        "[Lyon – Val d’Isère](/fr/transferts-ski/val-d-isere/lyon/) : 222 km, environ 3 h.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Nous assurons aussi, au départ de Lyon, Les Deux Alpes (158 km, environ 2 h 14), Chamrousse (126 km, environ 1 h 42), Les Gets (195 km, environ 2 h 23) et Morzine (202 km, environ 2 h 34). Pour ces quatre stations, un autre aéroport est nettement plus proche — Grenoble pour les deux premières, Genève pour les deux dernières — et Lyon ne se justifie que si c’est lui qui a le vol.",
    },
    {
      type: "paragraphe",
      texte:
        "Ce qui frappe, c’est la régularité : de l’Alpe d’Huez à Val Thorens, cinq des plus grands domaines des Alpes françaises tiennent entre 2 h 10 et 2 h 35 depuis le même aéroport. Seul Val d’Isère, tout au bout de la Tarentaise, dépasse nettement.",
    },

    { type: "titre2", texte: "L’Alpe d’Huez : par Grenoble et les 21 virages" },
    {
      type: "paragraphe",
      texte:
        "C’est la station la plus proche de Lyon : 155 km et environ 2 h 10. L’autoroute mène jusqu’à Grenoble, puis la vallée de la Romanche jusqu’au Bourg-d’Oisans, à 720 m. Restent les 14 derniers kilomètres : les 21 lacets numérotés qui montent 1 100 m jusqu’à la station, et qui sont déneigés en priorité.",
    },
    {
      type: "paragraphe",
      texte:
        "Grenoble est plus proche — environ 1 h 40 — mais son programme d’hiver vole surtout le week-end. En semaine, Lyon est souvent la meilleure réponse pour l’Alpe d’Huez ; Genève, à environ 3 h, ne l’est presque jamais. Vaujany, Oz et Auris, sur le même domaine, se rejoignent par des routes voisines : précisez l’adresse exacte à la réservation.",
    },
    {
      type: "paragraphe",
      texte:
        "La montée de l’Alpe d’Huez est en Isère, où les équipements d’hiver sont obligatoires du 1er novembre au 31 mars. Nos véhicules ont pneus hiver et chaînes toute la saison. Après de fortes chutes de neige, la montée prend plus de temps pour tout le monde, chaînes ou pas.",
    },

    { type: "titre2", texte: "Courchevel, Méribel, Val Thorens : les Trois Vallées depuis Lyon" },
    {
      type: "paragraphe",
      texte:
        "Pour les Trois Vallées, l’itinéraire est le même jusqu’à Moûtiers : autoroute par Chambéry jusqu’à Albertville, puis la Tarentaise. C’est à Moûtiers, à 480 m, que les routes se séparent, et que se joue la différence entre les trois stations.",
    },
    {
      type: "liste",
      items: [
        "Méribel, environ 2 h 15 : la montée la plus courte, 18 km dans la vallée des Allues jusqu’au centre, et 6 km de plus jusqu’à Mottaret. Les Allues sont sur le même trajet.",
        "Courchevel, environ 2 h 20 : 20 km de montée depuis Moûtiers, qui desservent Le Praz, Village, Moriond et Courchevel 1850 sur la même route.",
        "Val Thorens, environ 2 h 35 : 37 km de lacets par Saint-Martin-de-Belleville et Les Menuires, pour 1 800 m de dénivelé jusqu’à 2 300 m. C’est la fin de trajet la plus longue des trois.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "À la question « quel transfert prendre de Lyon Saint-Exupéry à Courchevel ? », la réponse tient en trois points : un transfert privé va directement de l’aéroport à l’adresse de votre logement, dans le village où il se trouve ; le prix est fixé par véhicule avant la réservation ; et le chauffeur suit votre vol. Les détails sont sur la page [transfert Lyon – Courchevel](/fr/transferts-ski/courchevel/lyon/).",
    },

    { type: "titre2", texte: "La Plagne et Val d’Isère : la Haute-Tarentaise" },
    {
      type: "paragraphe",
      texte:
        "Au-delà de Moûtiers, la vallée continue vers Aime et Bourg-Saint-Maurice. C’est la route de La Plagne et de Val d’Isère, les deux trajets les plus longs depuis Lyon.",
    },
    {
      type: "paragraphe",
      texte:
        "La Plagne, environ 2 h 35 pour 199 km, n’est pas une destination mais onze villages, desservis par trois routes différentes. Les stations d’altitude se rejoignent par Aime, Montchavin et Les Coches par Bourg-Saint-Maurice, Champagny par Moûtiers. Le temps de route annoncé vaut pour la station ; c’est l’adresse exacte de votre logement qui décide de la fin du parcours.",
    },
    {
      type: "paragraphe",
      texte:
        "Val d’Isère, environ 3 h pour 222 km, est le plus long trajet de ce guide. L’autoroute couvre les deux premiers tiers ; la dernière heure est une route de montagne : la Haute-Tarentaise jusqu’à Bourg-Saint-Maurice, puis 30 km de montée par La Daille jusqu’à 1 850 m. Le col de l’Iseran, au-dessus de la station, est fermé tout l’hiver : il n’existe pas d’autre accès. Le centre, La Daille et Le Fornet sont desservis sur le même trajet.",
    },

    { type: "titre2", texte: "Pourquoi Lyon va plus vite que Genève, alors qu’il est plus loin" },
    {
      type: "paragraphe",
      texte:
        "Sur la carte, Genève paraît plus proche de la Savoie, et en kilomètres il l’est. Sur la route, l’ordre s’inverse pour toutes les stations de la Tarentaise que nous desservons depuis les deux aéroports.",
    },
    {
      type: "liste",
      items: [
        "Méribel : Lyon 181 km et environ 2 h 15, Genève 142 km et environ 2 h 25.",
        "Courchevel : Lyon 188 km et environ 2 h 20, Genève 149 km et environ 2 h 30.",
        "Val Thorens : Lyon 200 km et environ 2 h 35, Genève 161 km et environ 2 h 45.",
        "La Plagne : Lyon 199 km et environ 2 h 35, Genève 160 km et environ 2 h 45.",
        "Val d’Isère : Lyon 222 km et environ 3 h, Genève 183 km et environ 3 h 15.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Lyon est plus loin de 39 km à chaque fois, et pourtant plus rapide d’une dizaine de minutes, un peu plus pour Val d’Isère. L’explication tient au type de route : depuis Lyon, l’autoroute couvre presque tout le trajet jusqu’à Albertville et tient une vitesse régulière ; depuis Genève, le début du parcours se fait sur des routes plus lentes avant de rejoindre le même réseau. À partir d’Albertville, tout le monde emprunte la même vallée.",
    },
    {
      type: "paragraphe",
      texte:
        "Dix minutes ne justifient pas à elles seules de changer de vol. Elles suffisent en revanche à écarter l’idée reçue que Genève serait le choix évident pour la Tarentaise. À vol équivalent, Lyon donne un transfert un peu plus court ; si Genève a le meilleur vol, vous perdez peu en le prenant.",
    },

    { type: "titre2", texte: "Lyon, Chambéry ou Grenoble : quand les petits aéroports gagnent" },
    {
      type: "paragraphe",
      texte:
        "Face à Genève, Lyon gagne. Face à Chambéry et à Grenoble, c’est l’inverse : ces deux aéroports sont nettement plus proches de leurs stations.",
    },
    {
      type: "liste",
      items: [
        "Chambéry, pour la Tarentaise : Méribel en 1 h 21 environ, Courchevel en 1 h 28, Val Thorens en 1 h 40, La Plagne en 1 h 41, Val d’Isère en 2 h 10. Soit près d’une heure de moins que depuis Lyon, dans chaque sens.",
        "Grenoble, pour l’Oisans : l’Alpe d’Huez en 1 h 40 environ, Les Deux Alpes en 1 h 42, Chamrousse en 1 h 11. Une demi-heure de moins que depuis Lyon pour l’Alpe d’Huez.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Le revers est le calendrier. Chambéry et Grenoble sont des aéroports saisonniers dont le programme d’hiver est concentré le week-end, autour de vols charters et à bas prix. Si vous partez du samedi au samedi et qu’un vol existe depuis votre ville, prenez-le : c’est le transfert le plus court. Si ce n’est pas le cas, Lyon est la première alternative à regarder, avant Genève.",
    },

    { type: "titre2", texte: "Arriver en semaine : l’atout de Lyon" },
    {
      type: "paragraphe",
      texte:
        "Lyon Saint-Exupéry est un vrai hub : des vols toute l’année, davantage de compagnies que Chambéry ou Grenoble, et des départs tous les jours de la semaine. C’est ce qui en fait l’aéroport des séjours qui ne commencent pas un samedi.",
    },
    {
      type: "liste",
      items: [
        "Arrivée un mardi ou un jeudi : Chambéry et Grenoble n’ont souvent aucun vol ; Lyon en a.",
        "Vacances de février : quand les tarifs genevois s’envolent, Lyon est fréquemment l’arrivée la moins chère.",
        "Groupes mixtes : l’aéroport a sa propre gare TGV, pratique quand une partie du groupe arrive de Paris en train.",
        "Changement de dates : avec des vols tous les jours, un vol annulé se remplace plus facilement que sur un aéroport qui ne vole que le samedi.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Arriver en semaine a un autre avantage, qui ne dépend pas de l’aéroport : vous évitez la saturation du samedi dans les vallées. Un transfert Lyon – Méribel un mercredi peut prendre à peu près le même temps qu’un transfert Chambéry – Méribel un samedi de février. L’aéroport le plus rapide sur le papier n’est pas toujours le trajet le plus court le jour J.",
    },

    { type: "titre2", texte: "Le samedi et la neige : ce qui allonge le trajet" },
    {
      type: "paragraphe",
      texte:
        "Tous les temps de ce guide sont des temps hors trafic. Le samedi de haute saison, toute la Tarentaise change de locataires le même matin, et la vallée sature entre Albertville et Moûtiers. Comptez environ une heure de plus vers les Trois Vallées, La Plagne et Val d’Isère, quel que soit l’aéroport d’arrivée : le retard s’ajoute à tous les trajets, il ne change pas l’ordre des aéroports.",
    },
    {
      type: "paragraphe",
      texte:
        "Le retour est le miroir de l’aller : le samedi qui monte la nouvelle semaine descend la précédente. Nous calons l’heure de départ en station sur votre vol retour, en tenant compte de ce trafic ; si elle vous paraît matinale, c’est pour vous laisser de la marge à l’aéroport.",
    },
    {
      type: "paragraphe",
      texte:
        "La neige est l’autre variable, surtout sur les montées finales : les lacets de l’Alpe d’Huez, la route de Val Thorens au-dessus de Saint-Martin-de-Belleville, la montée de Val d’Isère depuis Bourg-Saint-Maurice. En Savoie comme en Isère, les équipements d’hiver sont obligatoires du 1er novembre au 31 mars ; nos véhicules ont pneus et chaînes toute la saison, et le chauffeur connaît l’état de la route avant votre atterrissage.",
    },

    { type: "titre2", texte: "Familles, groupes, bagages : préparer le transfert" },
    {
      type: "paragraphe",
      texte:
        "Un transfert privé se paie par véhicule, pas par personne : que vous soyez deux ou huit, le prix est le même. Trois catégories de véhicules sont proposées.",
    },
    {
      type: "liste",
      items: [
        "Standard, un Volkswagen Transporter : jusqu’à 8 passagers et 12 bagages.",
        "Business, un Mercedes Classe V : jusqu’à 7 passagers et 10 bagages.",
        "Premium, une berline Mercedes Classe E : jusqu’à 4 passagers et 5 bagages.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "En hiver, le coffre se remplit avant les sièges : huit skieurs voyagent rarement avec huit valises seulement. Déclarez à la réservation le nombre de bagages, de housses à skis ou à snowboard et de sacs à chaussures : c’est ce compte qui décide du véhicule. Au-delà de huit passagers, le groupe voyage dans plusieurs véhicules, prévus pour arriver ensemble. Pour les agences, conciergeries et entreprises, notre page [agences et professionnels](/fr/agences-et-professionnels/) explique comment obtenir un devis unique pour tout le groupe.",
    },
    {
      type: "paragraphe",
      texte:
        "Avec des enfants, demandez les sièges et rehausseurs à la réservation : ils sont installés avant que le chauffeur ne parte pour l’aéroport, sans supplément. Et pour savoir quoi vérifier avant de payer un transfert, quel qu’en soit le prestataire, notre guide [Réserver un transfert : ce qu’il faut vérifier](/fr/blog/reserver-un-transfert-ski-ce-quil-faut-verifier/) passe les points un par un.",
    },

    { type: "titre2", texte: "Ce que comprend un transfert depuis Lyon" },
    {
      type: "liste",
      items: [
        "Un prix fixe pour tout le véhicule, péages d’autoroute compris, connu avant de réserver.",
        "Le suivi du vol : si l’avion atterrit en retard, la prise en charge se décale, sans supplément.",
        "Une heure d’attente comprise à la prise en charge, comptée à partir de l’atterrissage réel.",
        "Les housses à skis et à snowboard, sans supplément.",
        "Les sièges enfants et rehausseurs, installés avant le départ.",
        "La dépose à l’adresse exacte de votre logement, quel que soit le village.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Les conditions du transfert privé sont détaillées sur notre page [transferts privés vers les Alpes](/fr/transferts-prives/).",
    },

    { type: "titre2", texte: "Depuis Lyon, en résumé" },
    {
      type: "liste",
      items: [
        "Alpe d’Huez, environ 2 h 10 : la station la plus proche de Lyon ; Grenoble est plus rapide le week-end.",
        "Méribel et Courchevel, environ 2 h 15 et 2 h 20 : Lyon en semaine, Chambéry le samedi s’il a un vol.",
        "Val Thorens et La Plagne, environ 2 h 35 : même logique, Lyon une dizaine de minutes devant Genève.",
        "Val d’Isère, environ 3 h : le plus long trajet ; Chambéry, à 2 h 10, l’emporte quand il vole.",
        "Les Gets, Morzine, Les Deux Alpes, Chamrousse : possibles depuis Lyon, mais d’autres aéroports sont nettement plus proches.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Quel que soit l’aéroport retenu, réservez le transfert en même temps que le vol, pas la semaine d’avant : en février, les véhicules manquent avant les lits, et le numéro de vol donné à la réservation permet au chauffeur de suivre l’avion plutôt que l’horaire.",
    },
  ],

  faq: [
    {
      question: "Combien de temps faut-il entre l’aéroport de Lyon et l’Alpe d’Huez ?",
      reponse:
        "Environ 2 h 10 pour 155 km hors trafic, par Grenoble, le Bourg-d’Oisans et les 21 virages. Après de fortes chutes de neige, comptez davantage.",
    },
    {
      question: "Comment aller de Lyon Saint-Exupéry à Courchevel ?",
      reponse:
        "En transfert privé, comptez environ 2 h 20 pour 188 km hors trafic : autoroute jusqu’à Albertville, la Tarentaise jusqu’à Moûtiers, puis 20 km de montée. Le chauffeur vous dépose à l’adresse de votre logement, du Praz à Courchevel 1850.",
    },
    {
      question: "Lyon ou Genève pour les Trois Vallées ?",
      reponse:
        "Lyon est environ 10 minutes plus rapide : Méribel 2 h 15 contre 2 h 25, Courchevel 2 h 20 contre 2 h 30, Val Thorens 2 h 35 contre 2 h 45, hors trafic. Les deux aéroports volent tous les jours : le choix se fait surtout sur le vol et le tarif.",
    },
    {
      question: "Quelles stations de ski sont les plus proches de l’aéroport de Lyon ?",
      reponse:
        "Parmi celles que nous desservons : Chamrousse (environ 1 h 42), l’Alpe d’Huez (2 h 10), Les Deux Alpes (2 h 14), Méribel (2 h 15) et Courchevel (2 h 20). Pour Chamrousse et Les Deux Alpes, Grenoble reste nettement plus proche.",
    },
    {
      question: "Le transfert depuis Lyon est-il plus long le samedi ?",
      reponse:
        "Oui. Un samedi de février, comptez environ une heure de plus vers la Tarentaise, la vallée étant saturée entre Albertville et Moûtiers. Le même retard s’applique depuis Genève ou Chambéry.",
    },
    {
      question: "Le prix du transfert est-il par personne ou par véhicule ?",
      reponse:
        "Par véhicule. Que vous soyez deux ou huit, le prix annoncé est le même, péages et housses à skis compris. Au-delà de huit passagers, le groupe voyage dans plusieurs véhicules.",
    },
  ],
};

/**
 * L'article au registre. Sans version anglaise : les champs « anglais »
 * reprennent la traduction française, et `contenu` reste vide — il n'est
 * jamais rendu en anglais (voir `sansVersionAnglaise` dans `types.ts`).
 */
export const atterrirLyonSaintExupery: Article = {
  slug: fr.slug,
  titre: fr.titre,
  metaTitre: fr.metaTitre,
  metaDescription: fr.metaDescription,
  chapo: fr.chapo,
  datePublication: "2026-10-27",
  auteur: "Alps Ski Transfers",
  visuel: { nom: "aeroport-lyon-airport", alt: "Glass façade of Terminal 1 at Lyon-Saint-Exupéry airport" },
  contenu: [],
  stationsLiees: fr.stationsLiees,
  sansVersionAnglaise: true,
  traductions: { fr },
};
