import type { PageIntl } from "./intl";

/**
 * Les pages de conversion françaises.
 *
 * Périmètre arrêté le 8 septembre 2026, après avoir mesuré ce que traduit
 * alps2alps : sur 1 946 URL, 31 seulement sont françaises, et ce sont **les
 * pages de conversion** — réserver, FAQ, contact, transferts privés, agences.
 * Aucune page de station. Nous suivons la même logique : le francophone qui
 * cherche un transfert cherche un trajet et un prix, pas une présentation de
 * Val Thorens.
 *
 * Les pages juridiques (CGV, conditions de vente, confidentialité) restent en
 * anglais : les traduire sans validation juridique créerait deux versions
 * potentiellement divergentes d'un même engagement. Le pied de page le signale
 * par un `(EN)`.
 */
export const PAGES_FR: PageIntl[] = [
  {
    slug: "comment-reserver",
    metaTitre: "Comment réserver un transfert vers les Alpes",
    metaDescription:
      "Réserver un transfert aéroport vers les Alpes en trois étapes : le trajet, le prix par véhicule, vos coordonnées. Prix fixe, skis compris.",
    h1: "Comment réserver votre transfert",
    chapo:
      "Trois étapes, quelques minutes, et un prix ferme avant tout engagement. Vous indiquez votre trajet et vos dates, vous choisissez un véhicule sur son prix — annoncé par véhicule et non par personne — puis vous laissez vos coordonnées. Nous confirmons par e-mail, et votre chauffeur suit votre vol le jour venu.",
    equivalentEn: "/book-ski-transfer-tickets/",
    contenu: [
      { type: "titre2", texte: "1. Votre trajet" },
      {
        type: "paragraphe",
        texte:
          "Tapez votre aéroport de départ et votre station : le champ cherche parmi 34 aéroports et 68 stations dès les deux premières lettres. Si votre point de départ ou d’arrivée n’est pas dans la liste — une gare, un hôtel, une adresse exacte — écrivez-le simplement : nous chiffrons ces trajets à la main et vous répondons par e-mail.",
      },
      {
        type: "paragraphe",
        texte:
          "Indiquez aussi le nombre de valises et de housses à skis. Ce n’est pas une formalité : le coffre décide du véhicule avant les sièges, et un minibus qui porte huit personnes ne porte pas huit valises et huit paires de skis. En le demandant avant le devis, nous évitons de vous envoyer un véhicule dans lequel le matériel ne rentre pas.",
      },

      { type: "titre2", texte: "2. Le prix, par véhicule" },
      {
        type: "paragraphe",
        texte:
          "Nous affichons un prix par véhicule pour chaque catégorie compatible avec votre groupe et vos bagages. Le montant ne dépend pas du nombre de passagers : à deux comme à huit, c’est le même prix, péages compris. Et le véhicule part quand vous atterrissez.",
      },
      {
        type: "liste",
        items: [
          "Le prix comprend les péages, les tunnels et la vignette suisse le cas échéant.",
          "Les housses à skis et à snowboard voyagent gratuitement.",
          "Les sièges enfants et rehausseurs sont fournis et installés avant le départ.",
          "Le suivi du vol et le temps d’attente sont compris.",
          "Rien ne s’ajoute à l’arrivée : le prix annoncé est le prix payé.",
        ],
      },

      { type: "titre2", texte: "3. Vos coordonnées" },
      {
        type: "paragraphe",
        texte:
          "Nom, e-mail, téléphone mobile, numéro de vol et adresse exacte en station. L’adresse compte : plusieurs stations sont en réalité deux ou trois villages distants de quelques kilomètres, et certaines — Zermatt, Wengen — ne se rejoignent pas en voiture du tout.",
      },
      {
        type: "paragraphe",
        texte:
          "Donnez l’âge des enfants pour que les bons sièges soient à bord, et signalez tout ce qui sort de l’ordinaire : un vol tardif, un animal, un fauteuil roulant, du matériel encombrant.",
      },

      { type: "titre2", texte: "Après la réservation" },
      {
        type: "paragraphe",
        texte:
          "Vous recevez une confirmation par e-mail avec une référence. Le jour du départ, votre chauffeur suit votre vol : s’il a du retard, la prise en charge est décalée sans supplément. Il vous attend en zone d’arrivée avec votre nom.",
      },
      {
        type: "paragraphe",
        texte:
          "Un changement de vol, un passager de plus, une autre adresse ? Prévenez-nous le plus tôt possible : presque tout se règle tant que le véhicule n’est pas parti.",
      },
    ],
    faq: [
      {
        question: "Quand faut-il réserver ?",
        reponse:
          "Dès que vos vols sont confirmés. En février, les véhicules manquent avant les hébergements, surtout pour les arrivées du samedi, et une réservation précoce coûte moins cher.",
      },
      {
        question: "Le prix est-il par personne ou par véhicule ?",
        reponse:
          "Par véhicule. Que vous soyez deux ou huit, le prix annoncé est le même — c’est ce qui rend le transfert privé compétitif à partir de quatre passagers.",
      },
      {
        question: "Puis-je réserver un aller-retour avec un retour différent ?",
        reponse:
          "Oui. Vous pouvez arriver à Genève et repartir de Lyon, ou changer de station en cours de séjour : cochez « mon retour part ou arrive ailleurs » et indiquez les deux points.",
      },
      {
        question: "Et si mon point de départ n’est pas dans la liste ?",
        reponse:
          "Écrivez-le en toutes lettres. Les gares, hôtels et adresses exactes sont chiffrés à la main et confirmés par e-mail, plutôt que d’afficher un prix approximatif.",
      },
    ],
  },

  {
    slug: "transferts-prives",
    metaTitre: "Transfert privé aéroport vers les Alpes | Prix par véhicule",
    metaDescription:
      "Transfert privé depuis Genève, Lyon, Chambéry et Grenoble vers les stations des Alpes. Prix fixe par véhicule, départ à votre atterrissage, skis compris.",
    h1: "Le transfert privé vers les Alpes",
    chapo:
      "Un véhicule pour vous seuls, qui part à l’heure où vous atterrissez vraiment et vous dépose devant votre logement. Le prix est fixé par véhicule et annoncé avant la réservation : à six, vous payez une fois. Les housses à skis, les sièges enfants, les péages et le suivi du vol sont dedans.",
    equivalentEn: "/private-airport-transfers-to-alps-ski-resort/",
    contenu: [
      { type: "titre2", texte: "Ce que veut dire « privé »" },
      {
        type: "paragraphe",
        texte:
          "Le véhicule ne transporte que votre groupe. Il n’attend personne d’autre à l’aéroport, ne dépose personne d’autre en route, et son itinéraire est le plus court entre votre terminal et votre adresse. C’est la différence qui se mesure : sur la montée de la Tarentaise un samedi de février, chaque dépose intermédiaire évitée vaut vingt à trente minutes.",
      },
      {
        type: "liste",
        items: [
          "Départ à votre atterrissage réel : le chauffeur suit le numéro de vol.",
          "Aucun arrêt intermédiaire, aucune fenêtre horaire à respecter.",
          "Prix par véhicule, annoncé avant la réservation et non révisé après.",
          "Sièges enfants et rehausseurs installés avant le départ.",
          "Housses à skis et à snowboard sans supplément.",
          "Dépose à l’adresse exacte de votre logement, en station.",
        ],
      },

      { type: "titre2", texte: "Le prix est par véhicule, pas par personne" },
      {
        type: "paragraphe",
        texte:
          "C’est le point qui change tout au moment de comparer. Un prix par véhicule ne bouge pas selon le nombre de passagers : deux ou huit, c’est le même montant. Quand vous comparez deux devis, vérifiez donc que vous comparez la même unité — un tarif « à partir de » par personne et un prix par véhicule se ressemblent sur une page de résultats et n’ont pas le même total.",
      },
      {
        type: "paragraphe",
        texte:
          "Vérifiez aussi ce que le prix couvre. Chez nous, les péages d’autoroute, les tunnels et la vignette suisse sont compris, le matériel de ski voyage gratuitement, et l’attente en cas de vol retardé n’est pas facturée. Ce sont les trois postes qui, ailleurs, se rajoutent à l’arrivée.",
      },

      { type: "titre2", texte: "Le véhicule est choisi sur vos bagages" },
      {
        type: "paragraphe",
        texte:
          "Le coffre décide avant les sièges. Un minibus homologué pour huit personnes ne transporte pas huit valises et huit paires de skis : c’est pour cela que nous demandons le nombre de valises et de housses avant de chiffrer, et non après. Vous évitez ainsi le cas classique — un véhicule conforme au nombre de passagers dans lequel le matériel ne rentre pas.",
      },

      { type: "titre2", texte: "L’hiver, sur ces routes" },
      {
        type: "paragraphe",
        texte:
          "Nos véhicules sont équipés pneus hiver et chaînes à bord. En Savoie et en Haute-Savoie, les équipements sont obligatoires du 1ᵉʳ novembre au 31 mars sur les communes concernées ; en Suisse, la règle est l’état de la route plutôt que la date ; en Autriche, l’obligation court du 1ᵉʳ novembre au 15 avril. Nos chauffeurs font ces montées toute la saison.",
      },
      {
        type: "paragraphe",
        texte:
          "Si votre vol est dérouté — Innsbruck le fait plus souvent que la moyenne, généralement vers Munich ou Salzbourg — dites-le nous : nous partons de l’aéroport où vous vous posez réellement.",
      },

      { type: "titre2", texte: "Aller-retour, groupes et demandes particulières" },
      {
        type: "paragraphe",
        texte:
          "Le retour se réserve en même temps que l’aller, avec l’heure de décollage : nous calculons l’heure de prise en charge en station à partir d’elle, marge d’hiver comprise. Au-delà de huit passagers, nous coordonnons plusieurs véhicules sur le même horaire. Pour un séminaire, un groupe scolaire ou une prise en charge en gare — Moûtiers, Bourg-Saint-Maurice, Landry — écrivez-nous : ces trajets sont chiffrés à la main.",
      },
    ],
    faq: [
      {
        question: "Le prix est-il par personne ou par véhicule ?",
        reponse:
          "Par véhicule. Que vous soyez deux ou huit, le montant annoncé est celui que vous payez, péages compris.",
      },
      {
        question: "Que se passe-t-il si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit votre numéro de vol et décale la prise en charge à l’heure réelle d’atterrissage. L’attente n’est pas facturée, et il n’y a rien à signaler de votre côté.",
      },
      {
        question: "Les skis et les snowboards sont-ils comptés en supplément ?",
        reponse:
          "Non. Les housses voyagent gratuitement ; nous vous demandons seulement de les déclarer à la réservation pour dimensionner le coffre.",
      },
      {
        question: "Fournissez-vous les sièges enfants ?",
        reponse:
          "Oui, sièges et rehausseurs sont fournis et installés avant le départ, sans supplément. La réglementation française les impose jusqu’à 10 ans.",
      },
      {
        question: "Pouvez-vous nous prendre ailleurs qu’à l’aéroport ?",
        reponse:
          "Oui : gare, hôtel, adresse exacte. Indiquez le point de départ dans le formulaire et nous chiffrons le trajet.",
      },
    ],
  },

  {
    slug: "aide",
    metaTitre: "Aide et questions fréquentes | Transferts Alpes",
    metaDescription:
      "Bagages, sièges enfants, retard de vol, annulation, paiement : les réponses aux questions les plus posées sur les transferts vers les Alpes.",
    h1: "Aide et questions fréquentes",
    chapo:
      "Les questions que l’on nous pose le plus, et leurs réponses. Si la vôtre n’y est pas, écrivez-nous : quelqu’un répond, y compris le samedi de rotation.",
    equivalentEn: "/general-questions/",
    contenu: [
      { type: "titre2", texte: "Avant la réservation" },
      {
        type: "paragraphe",
        texte:
          "Le prix affiché est le prix payé : péages, tunnels, vignette suisse, housses à skis, sièges enfants, suivi du vol et temps d’attente sont compris. Il est annoncé par véhicule, pas par personne, et il ne bouge pas entre le devis et la facture.",
      },
      { type: "titre2", texte: "Le jour du départ" },
      {
        type: "paragraphe",
        texte:
          "Votre chauffeur suit votre vol. S’il est retardé ou dérouté, la prise en charge s’ajuste — prévenez-nous en cas de déroutement sur un autre aéroport, nous réorganisons le trajet plutôt que de vous laisser sur place. Il vous attend en zone d’arrivée avec votre nom.",
      },
      { type: "titre2", texte: "En montagne" },
      {
        type: "paragraphe",
        texte:
          "Nos véhicules portent pneus hiver et chaînes, obligatoires en Savoie et Haute-Savoie du 1ᵉʳ novembre au 31 mars, en Autriche du 1ᵉʳ novembre au 15 avril et en Italie sur les routes alpines de mi-novembre à mi-avril. Après de fortes chutes, une route d’accès peut fermer une heure ou deux pour déclenchement d’avalanches : votre chauffeur le sait avant vous.",
      },
    ],
    faq: [
      {
        question: "Les housses à skis sont-elles facturées ?",
        reponse:
          "Non, elles voyagent gratuitement. Déclarez-les à la réservation, avec les sacs à chaussures et tout matériel encombrant : le véhicule est choisi en fonction.",
      },
      {
        question: "Les sièges enfants sont-ils fournis ?",
        reponse:
          "Oui, sans supplément, et installés avant le départ. La loi française impose un dispositif homologué jusqu’à 10 ans ; donnez-nous les âges à la réservation.",
      },
      {
        question: "Que se passe-t-il si mon vol a du retard ?",
        reponse:
          "Le chauffeur suit le vol et décale la prise en charge à l’heure réelle d’atterrissage. Le temps d’attente est compris et il n’y a pas de supplément.",
      },
      {
        question: "Comment se passe le paiement ?",
        reponse:
          "La confirmation et le règlement se font par e-mail, en euros. Les montants affichés en livres ou en dollars sont indicatifs : la facturation reste en euros.",
      },
      {
        question: "Puis-je annuler ou modifier ?",
        reponse:
          "Prévenez-nous le plus tôt possible : un changement de vol, un passager supplémentaire ou une autre adresse se règlent presque toujours. Les conditions d’annulation détaillées figurent dans nos conditions de vente (en anglais).",
      },
      {
        question: "Desservez-vous les gares ?",
        reponse:
          "Oui, notamment Moûtiers, Bourg-Saint-Maurice et Genève. Ces trajets sont chiffrés à la main : indiquez la gare et votre train, nous vous répondons par e-mail.",
      },
    ],
  },

  {
    slug: "contact",
    metaTitre: "Nous contacter | Transferts vers les Alpes",
    metaDescription:
      "Une question sur un transfert, un groupe, un séminaire ou une réservation en cours ? Écrivez-nous, nous répondons rapidement.",
    h1: "Nous contacter",
    chapo:
      "Pour un devis, une réservation de groupe ou une question sur un transfert déjà réservé, écrivez-nous et nous revenons vers vous rapidement.",
    equivalentEn: "/contact/",
    contenu: [
      { type: "titre2", texte: "Avant de nous écrire" },
      {
        type: "paragraphe",
        texte:
          "S’il s’agit d’un transfert aéroport-station classique, le formulaire de réservation vous donne un prix ferme immédiatement : c’est plus rapide qu’un échange d’e-mails.",
      },
      { type: "titre2", texte: "Groupes, entreprises et demandes particulières" },
      {
        type: "paragraphe",
        texte:
          "Autocars, séminaires, réservations à plusieurs véhicules, points de prise en charge inhabituels ou bagages hors normes sont chiffrés individuellement. Indiquez la date, le trajet et le nombre de passagers.",
      },
      { type: "titre2", texte: "Une réservation en cours" },
      {
        type: "paragraphe",
        texte:
          "Mentionnez votre référence — elle commence par AST — et ce qui change : nouveau vol, passager supplémentaire, autre adresse en station.",
      },
    ],
    faq: [
      {
        question: "Sous quel délai répondez-vous ?",
        reponse:
          "En général dans les heures qui suivent, y compris le week-end en saison. Pour un départ imminent, précisez-le en objet.",
      },
      {
        question: "Travaillez-vous avec les agences et les conciergeries ?",
        reponse:
          "Oui, avec des conditions dédiées et un interlocuteur unique. Voir la page réservée aux professionnels.",
      },
    ],
  },

  {
    slug: "agences-et-professionnels",
    metaTitre: "Agences et conciergeries | Transferts Alpes",
    metaDescription:
      "Transferts pour agences de voyage, conciergeries, hôtels et séminaires : interlocuteur unique, facturation groupée, tarifs dédiés.",
    h1: "Agences, conciergeries et entreprises",
    chapo:
      "Si vous placez des clients dans les Alpes — agence, conciergerie, chalet, hôtel, comité d’entreprise —, vous n’avez pas besoin d’un formulaire mais d’un interlocuteur. Nous travaillons avec des professionnels francophones toute la saison : un contact unique, une facturation groupée, et des véhicules réservés à l’avance sur les samedis tendus.",
    equivalentEn: "/inquiry/",
    contenu: [
      { type: "titre2", texte: "Ce que nous proposons aux professionnels" },
      {
        type: "liste",
        items: [
          "Un interlocuteur unique pour la saison, joignable le samedi de rotation.",
          "Une grille tarifaire dédiée, valable sur l’ensemble des liaisons.",
          "La facturation groupée, mensuelle ou par dossier.",
          "La réservation anticipée de véhicules sur les semaines de vacances scolaires.",
          "Le suivi des vols de vos clients et la gestion des retards sans surcoût.",
        ],
      },
      { type: "titre2", texte: "Les cas que nous traitons le plus" },
      {
        type: "paragraphe",
        texte:
          "Arrivées échelonnées d’un même groupe sur une journée, séminaires avec plusieurs véhicules simultanés, clients de chalets haut de gamme, transferts inter-stations en cours de séjour, et retours vers un autre aéroport que celui de l’arrivée.",
      },
      { type: "titre2", texte: "Nos zones" },
      {
        type: "paragraphe",
        texte:
          "Les Alpes françaises, suisses, italiennes et autrichiennes, depuis 34 aéroports. Les liaisons les plus demandées par nos partenaires francophones partent de Genève, Lyon, Chambéry et Grenoble vers la Tarentaise, les Trois Vallées, le pays du Mont-Blanc et l’Oisans.",
      },
    ],
    faq: [
      {
        question: "Proposez-vous des tarifs dédiés ?",
        reponse:
          "Oui, sur la base d’un volume annuel estimé. Écrivez-nous avec vos destinations habituelles et le nombre de transferts par saison.",
      },
      {
        question: "Peut-on facturer à l’agence plutôt qu’au client final ?",
        reponse:
          "Oui, en facturation groupée mensuelle ou par dossier, selon ce qui vous arrange.",
      },
      {
        question: "Gérez-vous les séminaires et les groupes de plus de huit personnes ?",
        reponse:
          "Oui, avec plusieurs véhicules coordonnés. Ces demandes sont chiffrées individuellement.",
      },
    ],
  },
];
