import { ENTREPRISE, SITE } from "@/data/site";
import type { PageIntl } from "./intl";

const { adresse, entite } = ENTREPRISE;
const adressePostale = `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}, France`;
const sirenLisible = `SIREN ${entite.siren.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;


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
    visuel: { nom: "popular-alps-ski-transfer", alt: "Minibus de transfert sur une route de montagne enneigée" },
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
          "Le suivi du vol est compris, ainsi qu’une heure d’attente à la prise en charge.",
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
    visuel: { nom: "transfert-prive", alt: "Véhicule privé devant un chalet en station" },
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
    visuel: { nom: "faq", alt: "Skieur au coucher du soleil sur les hauteurs d’une station" },
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
    visuel: { nom: "route-alpine", alt: "Village alpin enneigé et route de montagne au crépuscule" },
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
    visuel: { nom: "transfert-prive-detail", alt: "Intérieur d’un minibus de transfert, sièges et coffre à skis" },
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
          "Les Alpes françaises, suisses et italiennes, depuis 34 aéroports. Les liaisons les plus demandées par nos partenaires francophones partent de Genève, Lyon, Chambéry et Grenoble vers la Tarentaise, les Trois Vallées, le pays du Mont-Blanc et l’Oisans.",
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

  {
    slug: "assistance",
    visuel: { nom: "route-hiver", alt: "Pneus hiver sur une route enneigée vers une station de ski" },
    metaTitre: "Assistance — joindre votre chauffeur, vol retardé, imprévu",
    metaDescription:
      "Vol retardé, chauffeur introuvable, changement d’adresse en station : comment nous joindre et ce que nous faisons dans chaque cas.",
    h1: "Assistance pendant votre voyage",
    chapo:
      "Un transfert se passe presque toujours sans qu’on ait à nous appeler. Presque : voici quoi faire dans les quatre cas où ça arrive, et le numéro à composer.",
    equivalentEn: "/help/",
    contenu: [
      { type: "titre2", texte: "Votre vol a du retard" },
      {
        type: "paragraphe",
        texte:
          "Ne faites rien. Votre chauffeur suit le numéro de vol que vous avez indiqué à la réservation : la prise en charge se décale toute seule, sans supplément et sans que vous ayez à prévenir. C’est la raison pour laquelle nous demandons ce numéro, et la seule.",
      },
      {
        type: "paragraphe",
        texte:
          "Si votre vol est dérouté sur un autre aéroport — cela arrive à Innsbruck plus qu’ailleurs, et à Chambéry par vent du sud — appelez-nous : nous partons de l’aéroport où vous avez réellement atterri, sans nouvelle réservation.",
      },

      { type: "titre2", texte: "Vous ne trouvez pas votre chauffeur" },
      {
        type: "paragraphe",
        texte:
          "Le point de rendez-vous figure dans votre e-mail de confirmation : c’est la sortie des bagages, panneau à votre nom, sauf indication contraire. Attendez cinq minutes à cet endroit précis avant d’appeler — un chauffeur qui gare le véhicule n’est pas un chauffeur absent.",
      },
      {
        type: "liste",
        items: [
          "Restez au point indiqué : c’est là que le chauffeur vous cherche.",
          "Gardez votre téléphone allumé et le son actif, y compris en itinérance.",
          "Appelez le numéro de la confirmation, pas celui du standard : il sonne directement chez le régulateur de garde.",
        ],
      },

      { type: "titre2", texte: "Votre adresse en station a changé" },
      {
        type: "paragraphe",
        texte:
          "Écrivez-nous dès que vous le savez, avec votre référence de réservation. Une adresse différente dans la même station ne change pas le prix. Une station différente, si : nous vous envoyons alors le nouveau montant avant de modifier quoi que ce soit.",
      },

      { type: "titre2", texte: "Vous avez oublié quelque chose dans le véhicule" },
      {
        type: "paragraphe",
        texte:
          "C’est la page bagage perdu : nous vérifions auprès du chauffeur le jour même, et nous conservons les objets trente jours.",
      },
    ],
    faq: [
      {
        question: "Faut-il prévenir en cas de retard de vol ?",
        reponse:
          "Non. Le vol est suivi et la prise en charge se décale automatiquement, sans supplément. Prévenez-nous seulement si votre vol est dérouté vers un autre aéroport ou annulé.",
      },
      {
        question: "Combien de temps le chauffeur attend-il ?",
        reponse:
          "Le temps d’attente est compris dans le prix : une heure après l’atterrissage réel pour un vol international, quarante-cinq minutes pour un vol intérieur. Au-delà, nous vous appelons avant toute décision.",
      },
      {
        question: "Comment vous joindre le jour du transfert ?",
        reponse:
          "Le numéro figure dans l’e-mail de confirmation et sonne chez le régulateur de garde, pas au standard. Par écrit, contact@alpsskitransfers.com reste le canal qui laisse une trace.",
      },
      {
        question: "Puis-je changer l’heure de ma prise en charge ?",
        reponse:
          "Oui, tant que le véhicule n’est pas parti. Écrivez-nous avec votre référence : nous confirmons le nouveau créneau par e-mail, et le prix ne change pas si le trajet reste le même.",
      },
    ],
  },
  {
    slug: "bagage-perdu",
    visuel: { nom: "aeroport-lyon-airport", alt: "Terminal de l’aéroport de Lyon-Saint-Exupéry" },
    metaTitre: "Bagage ou objet oublié — que faire",
    metaDescription:
      "Objet oublié dans le véhicule ou bagage retardé par la compagnie : ce que nous faisons, dans quels délais, et ce que nous ne pouvons pas garantir.",
    h1: "Bagage retardé, objet oublié",
    chapo:
      "Deux situations différentes, deux réponses différentes : un bagage que la compagnie n’a pas livré, et un objet resté dans le véhicule. Voici ce que nous faisons dans chaque cas.",
    equivalentEn: "/lost-luggage/",
    contenu: [
      { type: "titre2", texte: "La compagnie n’a pas livré votre bagage" },
      {
        type: "paragraphe",
        texte:
          "Déclarez-le au comptoir des bagages avant de quitter l’aéroport : sans le formulaire de déclaration, la compagnie ne livrera rien. Le chauffeur vous attend pendant cette démarche, elle fait partie de l’arrivée.",
      },
      {
        type: "paragraphe",
        texte:
          "Faites livrer le bagage à votre adresse en station, pas à l’aéroport. Redescendre le chercher coûte une demi-journée, et la compagnie livre en station comme ailleurs.",
      },

      { type: "titre2", texte: "Vous avez oublié un objet dans le véhicule" },
      {
        type: "paragraphe",
        texte:
          "Écrivez-nous le plus tôt possible avec votre référence de réservation et la description de l’objet : nous interrogeons le chauffeur dans la journée. Un véhicule qui a fait trois courses depuis n’est pas un véhicule où l’on retrouve tout, et l’heure compte.",
      },
      {
        type: "liste",
        items: [
          "Nous conservons les objets retrouvés trente jours.",
          "Le retrait à notre dépôt est gratuit.",
          "L’expédition est possible, à vos frais, avec suivi.",
          "Nous vous tenons informé par e-mail à chaque étape de la recherche.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Nous cherchons sérieusement, mais nous ne pouvons pas garantir de retrouver un objet, et nous n’assumons pas la responsabilité des effets personnels laissés dans un véhicule. C’est le cadre, il vaut mieux le dire avant qu’après.",
      },
    ],
    faq: [
      {
        question: "Le chauffeur attend-il pendant la déclaration de bagage ?",
        reponse:
          "Oui. Le une heure d’attente comprise dans le prix couvre cette démarche : prévenez simplement le chauffeur en le rejoignant, il patiente au point de rendez-vous.",
      },
      {
        question: "Combien de temps gardez-vous un objet retrouvé ?",
        reponse:
          "Trente jours. Passé ce délai, les objets non réclamés sont donnés ou détruits selon leur nature.",
      },
      {
        question: "Pouvez-vous m’expédier l’objet en station ?",
        reponse:
          "Oui, avec suivi, à vos frais. Le retrait au dépôt reste gratuit si vous repassez par la vallée.",
      },
      {
        question: "Quelqu’un d’autre peut-il récupérer mon objet ?",
        reponse:
          "Oui, à condition de nous prévenir à l’avance et de nous donner son nom : nous ne remettons pas un objet à quelqu’un que vous n’avez pas annoncé.",
      },
    ],
  },

  {
    slug: "mentions-legales",
    metaTitre: "Mentions légales | Alps Ski Transfers",
    metaDescription:
      "Éditeur, hébergeur et informations légales du site alpsskitransfers.com.",
    h1: "Mentions légales",
    chapo:
      "Informations exigées par l’article 6-III de la loi du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).",
    equivalentEn: "/legal-notice/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Éditeur du site" },
      {
        type: "paragraphe",
        texte: `Ce site est édité par ${entite.nom}, exerçant sous l’enseigne ${entite.enseigne}, ${entite.forme.toLowerCase()} immatriculée en France le 17 septembre 2020.`,
      },
      {
        type: "liste",
        items: [
          `Adresse du siège : ${adressePostale}`,
          `Immatriculation : ${sirenLisible}`,
          `Activité déclarée : ${entite.activite}`,
          `Téléphone : ${ENTREPRISE.telephoneAffiche}`,
          `Courriel : ${ENTREPRISE.email}`,
          `Inscription au registre des exploitants de VTC : ${entite.evtc}`,
          `Licence de transport intérieur de personnes (LTI) n° ${entite.lti.numero}, valable du 27 février 2026 au 26 février 2036, inscrite au registre national des entreprises de transport routier de personnes pour la Savoie. Gestionnaire de transport : ${entite.lti.gestionnaire}.`,
          `SIRET : ${entite.siret}`,
          `TVA intracommunautaire : ${entite.tva}`,
        ],
      },
      {
        type: "paragraphe",
        texte: `« Alps Ski Transfers » est un nom commercial. Les prestations de transport proposées sur ce site sont assurées par ${entite.nom} dans les conditions indiquées ci-dessus.`,
      },

      { type: "titre2", texte: "Directeur de la publication" },
      {
        type: "paragraphe",
        texte: `${entite.nom}, en sa qualité de titulaire de l’entreprise.`,
      },

      { type: "titre2", texte: "Hébergement" },
      {
        type: "paragraphe",
        texte:
          "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
      },

      { type: "titre2", texte: "Propriété intellectuelle" },
      {
        type: "paragraphe",
        texte: `La structure, les textes, les images et la charte graphique de ${SITE.url} sont protégés par le droit d’auteur. Toute reproduction ou réutilisation, totale ou partielle, sur quelque support que ce soit, requiert l’accord écrit préalable de l’éditeur. Les photographies de stations et de véhicules restent la propriété de leurs auteurs.`,
      },

      { type: "titre2", texte: "Données personnelles" },
      {
        type: "paragraphe",
        texte:
          "Les données personnelles collectées sur ce site sont traitées conformément au règlement général sur la protection des données (UE 2016/679) et à la loi Informatique et Libertés. Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, que vous pouvez exercer à l’adresse électronique ci-dessus. Le détail des données collectées et des finalités figure dans notre politique de confidentialité, et les cookies utilisés sont listés dans notre politique de cookies.",
      },
      {
        type: "paragraphe",
        texte:
          "Si vous estimez que vos droits n’ont pas été respectés, vous pouvez saisir la CNIL, autorité française de protection des données — cnil.fr.",
      },

      { type: "titre2", texte: "Conditions de vente" },
      {
        type: "paragraphe",
        texte:
          "Les transferts réservés sur ce site sont régis par nos conditions de billetterie et nos conditions générales, qui précisent les prix, l’annulation, les bagages et la responsabilité. Ces documents sont pour l’instant publiés en anglais.",
      },

      { type: "titre2", texte: "Règlement des litiges" },
      {
        type: "paragraphe",
        texte:
          "En cas de litige, contactez-nous d’abord à l’adresse électronique ci-dessus. À défaut d’accord, tout consommateur résidant dans l’Union européenne peut saisir un médiateur de la consommation et recourir à la plateforme de règlement en ligne des litiges de la Commission européenne. [À REMPLACER — nom, adresse postale et site du médiateur de la consommation auquel l’entreprise a adhéré : un organisme tiers agréé par la CECMC, jamais le dirigeant ni un proche. L’adhésion est obligatoire, article L.612-1 du Code de la consommation.]",
      },
    ],
    faq: [],
  },
  {
    slug: "politique-cookies",
    metaTitre: "Politique de cookies | Alps Ski Transfers",
    metaDescription:
      "Les cookies déposés par alpsskitransfers.com, à quoi ils servent et comment les contrôler.",
    h1: "Politique de cookies",
    chapo:
      "Cette page indique quels cookies alpsskitransfers.com dépose sur votre appareil, à quoi ils servent et comment les contrôler.",
    equivalentEn: "/cookie-policy-uk/",
    noindex: true,
    contenu: [
      { type: "titre2", texte: "Ce qu’est un cookie" },
      {
        type: "paragraphe",
        texte:
          "Un cookie est un petit fichier texte enregistré sur votre appareil lorsque vous consultez un site. Il permet au site de retenir vos actions et vos préférences d’une page à l’autre et d’une visite à l’autre. Les technologies équivalentes — stockage local, pixels, balises — servent le même objet et relèvent de la même politique.",
      },

      { type: "titre2", texte: "Les cookies que nous utilisons" },
      {
        type: "paragraphe",
        texte:
          "Nous en utilisons le moins possible. Le site est constitué de pages statiques et n’exécute aucun script publicitaire ni de profilage : lire ces pages ne demande aucun consentement.",
      },
      {
        type: "liste",
        items: [
          "Cookies strictement nécessaires — ils conservent votre réservation d’une étape à l’autre et sécurisent la page de paiement. Sans eux, la réservation ne peut aboutir. Ils ne requièrent pas votre consentement.",
          "Mémorisation de votre saisie — si vous commencez une recherche sans la terminer, vos entrées peuvent rester dans votre navigateur pour éviter de les retaper. Elles restent sur votre appareil et ne nous sont jamais transmises.",
          "Cookies du prestataire de paiement — sur la page de paiement, notre prestataire dépose ses propres cookies pour détecter la fraude et sécuriser la transaction. Ils sont nécessaires à l’encaissement.",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Nous n’utilisons aujourd’hui aucun cookie de mesure d’audience, de publicité ou de réseau social. Si cela devait changer, cette page serait mise à jour et votre consentement recueilli avant tout dépôt — un consentement aussi simple à refuser qu’à donner, et retirable à tout moment.",
      },

      { type: "titre2", texte: "Leur durée de vie" },
      {
        type: "paragraphe",
        texte:
          "Les cookies nécessaires à une réservation durent le temps de la session ou celui de la réservation. Si un cookie soumis à consentement devait être introduit, sa durée n’excéderait pas treize mois, et le consentement serait redemandé à l’échéance, conformément aux recommandations de la CNIL.",
      },

      { type: "titre2", texte: "Les contrôler" },
      {
        type: "paragraphe",
        texte:
          "Vous pouvez accepter ou refuser les cookies dans les réglages de votre navigateur, et supprimer ceux déjà enregistrés. Chrome, Safari, Firefox et Edge proposent tous ce réglage dans leurs paramètres de confidentialité. Attention : bloquer les cookies strictement nécessaires empêche d’aller au bout d’une réservation.",
      },

      { type: "titre2", texte: "Vos droits" },
      {
        type: "paragraphe",
        texte: `Les cookies qui lisent ou écrivent des informations sur votre appareil relèvent du RGPD et de l’article 82 de la loi Informatique et Libertés. Vous pouvez exercer vos droits d’accès, de rectification, d’effacement et d’opposition en écrivant à ${ENTREPRISE.email}, et introduire une réclamation auprès de la CNIL, autorité de contrôle française, sur cnil.fr.`,
      },
      {
        type: "paragraphe",
        texte:
          "Pour tout le reste de ce que nous faisons de vos données — réservations, paiements, affectation des chauffeurs — voyez notre politique de confidentialité.",
      },

      { type: "titre2", texte: "Modifications" },
      {
        type: "paragraphe",
        texte:
          "Cette politique est mise à jour chaque fois que les cookies du site changent. [À REMPLACER — dater la mise en ligne, puis chaque révision.]",
      },
    ],
    faq: [],
  },

  /*
   * Page locale — créée le 10 septembre 2026, à la demande du client.
   *
   * Elle existe parce que « VTC Chambéry » n'a rien à faire sur la home : c'est
   * une requête **locale**, à laquelle Google répond d'abord par le pack local,
   * et la home française est la tête d'un silo qui vise le transfert vers les
   * stations. Deux intentions sur une page n'en servent aucune.
   *
   * **Cette page ne suffira pas seule.** Sur une requête locale, le classement
   * se joue d'abord sur la fiche Google Business Profile, qui pointe encore
   * l'adresse londonienne. La page l'appuie — mêmes nom, adresse et téléphone
   * que `data/site.ts`, balisage `TaxiService` sur le bassin chambérien — elle
   * ne la remplace pas.
   *
   * Pas d'`equivalentEn` : il n'y a pas de version anglaise, donc pas de
   * `hreflang`. Un francophone de Savoie n'a pas d'équivalent anglais à trouver.
   *
   * Le contenu se tient à ce que l'entreprise sait faire et peut prouver — son
   * activité déclarée est bien « transport de voyageurs par taxi et VTC ». Trois
   * prestations restent à confirmer avec l'exploitant avant d'être ajoutées :
   * la mise à disposition à l'heure, les comptes entreprise, et le transport
   * assis professionnalisé (conventionnement CPAM). Elles ne sont pas écrites
   * ici tant que la réponse n'est pas venue : annoncer une prestation qu'on
   * n'assure pas est le plus court chemin vers un avis négatif.
   */
  {
    slug: "vtc-chambery",
    visuel: { nom: "aeroport-chambery-savoie-airport", alt: "Aéroport de Chambéry-Savoie, au bord du lac du Bourget" },
    metaTitre: "VTC Chambéry — chauffeur privé, aéroports et gares",
    metaDescription:
      "VTC à Chambéry : aéroports de Lyon, Genève, Grenoble et Chambéry-Savoie, gare, stations de Savoie. Prix fixé à la réservation, péages compris.",
    h1: "VTC à Chambéry",
    chapo:
      "Chauffeur privé basé à Chambéry, pour les liaisons vers les aéroports et les gares comme pour les trajets en Savoie. Le prix est annoncé avant la course, par véhicule, péages compris.",
    zoneLocale: {
      id: "vtc-chambery",
      nom: "VTC et transport de personnes à Chambéry",
      communes: [
        "Chambéry",
        "Aix-les-Bains",
        "La Motte-Servolex",
        "Saint-Alban-Leysse",
        "Challes-les-Eaux",
        "Le Bourget-du-Lac",
        "Montmélian",
        "La Ravoire",
      ],
      departement: "Savoie",
    },
    contenu: [
      { type: "titre2", texte: "Une entreprise de Chambéry, pas une plateforme" },
      {
        type: "paragraphe",
        texte: `Le siège est au ${ENTREPRISE.adresse.rue}, à ${ENTREPRISE.adresse.ville}. C’est ${entite.nom}, sous l’enseigne ${entite.enseigne}, qui conduit : pas d’intermédiaire, pas de chauffeur affecté au dernier moment par un algorithme. Vous réservez auprès de l’entreprise qui vient vous chercher, et le numéro que vous appelez le jour même est le sien.`,
      },
      {
        type: "paragraphe",
        texte:
          "L’activité déclarée est le transport de voyageurs par taxi et la location de voiture avec chauffeur. L’entreprise est inscrite au registre des exploitants de VTC et titulaire d’une licence de transport intérieur de personnes — les numéros sont publiés dans nos mentions légales, et vous pouvez les vérifier.",
      },

      { type: "titre2", texte: "Les aéroports, depuis Chambéry" },
      {
        type: "paragraphe",
        texte:
          "C’est la course que nous faisons le plus souvent, et celle où un chauffeur privé se justifie le mieux : un vol tôt le matin, une valise, et aucune envie de laisser une voiture une semaine sur un parking. Le véhicule vient à votre adresse, le prix est fixé d’avance, et pour un retour votre vol est suivi — un retard décale la prise en charge sans supplément.",
      },
      {
        type: "liste",
        items: [
          "Aéroport de Chambéry-Savoie (Viviers-du-Lac) — une vingtaine de kilomètres, moins d’une demi-heure.",
          "Lyon-Saint-Exupéry — environ 100 km par l’A43, une heure hors trafic.",
          "Genève-Cointrin — environ 100 km, une heure et quart, vignette suisse comprise dans le prix.",
          "Grenoble-Alpes-Isère — environ 80 km, une heure.",
          "Annecy, Turin, Milan Malpensa pour les vols que ces quatre-là n’ont pas.",
        ],
      },

      { type: "titre2", texte: "La gare de Chambéry-Challes-les-Eaux" },
      {
        type: "paragraphe",
        texte:
          "La gare est au centre-ville, à cinq minutes de la plupart des adresses chambériennes, et c’est précisément pourquoi on la sous-estime : avec des skis, une poussette ou trois valises, cinq minutes à pied deviennent un problème. Nous assurons les liaisons gare, dans les deux sens, aux horaires des TGV comme à ceux des premiers TER.",
      },

      { type: "titre2", texte: "Les stations, depuis Chambéry" },
      {
        type: "paragraphe",
        texte:
          "Chambéry est la porte de la Tarentaise et de la Maurienne : Courchevel, Méribel, Val Thorens, Les Menuires, La Plagne, Les Arcs, Tignes et Val d’Isère sont toutes à moins de deux heures de route, et Val Thorens à peine plus quand la montée depuis Moûtiers est chargée. C’est le cœur de notre activité l’hiver, avec des véhicules équipés — pneus hiver et chaînes à bord — comme la loi Montagne l’impose du 1ᵉʳ novembre au 31 mars.",
      },
      {
        type: "paragraphe",
        texte:
          "Nous conduisons aussi hors saison : un col, un lac, un rendez-vous à Annecy ou à Lyon se conduisent aussi bien en juillet qu’en février.",
      },

      { type: "titre2", texte: "La zone que nous desservons" },
      {
        type: "paragraphe",
        texte:
          "Chambéry et son agglomération d’abord — Aix-les-Bains, La Motte-Servolex, Saint-Alban-Leysse, La Ravoire, Challes-les-Eaux, Le Bourget-du-Lac, Montmélian — puis la Savoie entière, l’avant-pays savoyard et la cluse de Chambéry. Au-delà, les longues distances vers Lyon, Genève, Grenoble et les stations restent notre quotidien.",
      },

      { type: "titre2", texte: "Le prix, et comment on réserve" },
      {
        type: "paragraphe",
        texte:
          "Le prix est annoncé par véhicule et fixé à la réservation : il ne dépend ni du nombre de passagers, ni du trafic, ni de l’heure à laquelle vous commandez. Pas de majoration de pointe. Les péages et, le cas échéant, la vignette suisse sont dedans.",
      },
      {
        type: "paragraphe",
        texte:
          "Réservez en ligne pour les liaisons aéroport et station — le trajet est chiffré immédiatement. Pour une course locale ou une demande particulière, écrivez-nous ou appelez : nous répondons avec un prix ferme, par écrit.",
      },
    ],
    faq: [
      {
        question: "Quelle différence entre un VTC et un taxi ?",
        reponse:
          "Un VTC se réserve à l’avance et son prix est fixé au moment de la réservation ; un taxi peut être hélé ou pris à une station, et son prix suit le compteur. Notre entreprise exerce les deux activités, et sur une course réservée le prix est toujours annoncé avant le départ.",
      },
      {
        question: "Combien coûte un transfert de Chambéry à Lyon-Saint-Exupéry ?",
        reponse:
          "Le tarif dépend du véhicule et de l’horaire ; il vous est communiqué avant toute réservation, péages compris, et il ne bouge plus ensuite. Demandez-le en ligne ou par téléphone : la réponse est immédiate et ferme.",
      },
      {
        question: "Prenez-vous les skis et les bagages volumineux ?",
        reponse:
          "Oui, les housses à skis et à snowboard voyagent gratuitement. Indiquez-les à la réservation : c’est le coffre qui décide du véhicule avant le nombre de sièges, et un minibus qui porte huit personnes ne porte pas huit valises et huit paires de skis.",
      },
      {
        question: "Faut-il réserver longtemps à l’avance ?",
        reponse:
          "Pour un vol tôt le matin ou un samedi de haute saison, réservez dès que vous avez vos horaires : ce sont les créneaux qui se remplissent en premier. Le reste du temps, nous prenons volontiers une course pour le lendemain, selon les disponibilités.",
      },
      {
        question: "Les sièges enfants sont-ils fournis ?",
        reponse:
          "Oui, sièges et rehausseurs sont fournis et installés avant le départ, comme la loi française l’exige jusqu’à 10 ans. Précisez l’âge des enfants à la réservation pour que le bon siège soit à bord.",
      },
    ],
  },
];
