import type { Article } from "./types";

/**
 * Article 3 des trois de démarrage.
 *
 * Angle assumé : ce que coûte réellement un transfert et comment ne pas se faire
 * surprendre. C'est le sujet sur lequel le site actuel était le plus faible —
 * 220 € affichés, 377 € facturés — et c'est celui qui rassure avant l'achat.
 */
export const reserverTransfertSki: Article = {
  slug: "booking-a-ski-transfer-what-to-check",
  titre: "Booking a ski transfer: what to check before you pay",
  metaTitre: "Booking a Ski Transfer: What to Check Before You Pay",
  metaDescription:
    "Per vehicle or per person, tolls, ski bags, child seats, flight tracking, cancellation: the eight things that decide what a ski transfer really costs.",
  chapo:
    "A ski transfer is one of the few holiday purchases where the advertised price and the final price routinely differ, and where the cheapest quote is often the most expensive journey. Here are the eight things worth checking before you pay, why each of them matters on a mountain road in February, and the questions that get you a straight answer.",
  datePublication: "2026-09-08",
  auteur: "Alps Ski Transfers",

  stationsLiees: ["val-thorens", "chamonix", "courchevel", "meribel", "morzine", "les-gets"],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Transfers look like a commodity: two points, one vehicle, a price. They are not, and the differences only show up on the day — when the flight is two hours late, when there are more ski bags than the vehicle takes, or when the toll turns out not to be included.",
    },

    { type: "titre2", texte: "1. Per vehicle or per person?" },
    {
      type: "paragraphe",
      texte:
        "This is the first question, and it changes everything. A private transfer is priced per vehicle: four people or eight, the price is the same. A shared transfer is priced per seat and fills the vehicle with other passengers, which means waiting at the airport and stopping on the way.",
    },
    {
      type: "paragraphe",
      texte:
        "For two people, shared is usually cheaper. From four upwards, private frequently wins outright — and it always wins on time. When you compare quotes, make sure you are comparing the same thing: a per-person price and a per-vehicle price look very different on a search page and can end up identical.",
    },

    { type: "titre2", texte: "2. Are the tolls in the price?" },
    {
      type: "paragraphe",
      texte:
        "On Alpine routes the tolls are not trivial. The Mont Blanc tunnel and the Fréjus tunnel each cost a substantial sum for a minibus, the Swiss motorway vignette is an annual charge on the vehicle, and French motorways charge by axle. A quote that excludes them is not a quote, it is an estimate.",
    },
    {
      type: "paragraphe",
      texte:
        "Ask plainly: does this price include the tunnel and all tolls? The answer should be yes and it should be in writing.",
    },

    { type: "titre2", texte: "3. Do ski bags cost extra?" },
    {
      type: "paragraphe",
      texte:
        "Some operators charge per ski bag, others include them, and a few quietly size the vehicle on seats alone — which is how six people with six ski bags and six boot bags end up holding equipment on their knees for two hours.",
    },
    {
      type: "paragraphe",
      texte:
        "Declare exactly what you are bringing: skis, boards, boot bags, a splitboard, a pushchair, an airbag pack. A serious operator uses that to choose the vehicle, not to add a surcharge.",
    },

    { type: "titre2", texte: "4. What happens if the flight is late?" },
    {
      type: "paragraphe",
      texte:
        "Winter flights to Alpine airports are delayed often — weather at both ends, de-icing queues, a diversion to another airport. The question is what the operator does about it.",
    },
    {
      type: "liste",
      items: [
        "Does the driver track the flight, or work to the time you booked?",
        "How much waiting time is included, and what happens after it?",
        "Is there a number that a human answers at eleven at night?",
        "What happens if the flight is diverted to another airport entirely?",
        "Is there a charge for any of the above?",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Flight tracking should be standard and free. If waiting time is charged by the quarter-hour, you are buying a taxi, not a transfer.",
    },

    { type: "titre2", texte: "5. Child seats" },
    {
      type: "paragraphe",
      texte:
        "France, Switzerland, Italy and Austria all require an approved restraint for children — in France, for every child under 10. Seats should be free, fitted before departure and matched to the ages you give at booking. A driver producing a booster cushion for a three-year-old at the kerb is a bad sign, and an illegal one.",
    },

    { type: "titre2", texte: "6. Winter equipment on the vehicle" },
    {
      type: "paragraphe",
      texte:
        "In Savoie and Haute-Savoie, winter tyres or chains are legally required from 1 November to 31 March; Austria applies a similar rule from 1 November to 15 April, and Italy on Alpine roads from mid-November to mid-April. Ask what the vehicle carries. On the climb to Val Thorens or Flaine in fresh snow, this is not a technicality.",
    },

    { type: "titre2", texte: "7. The address, not the resort" },
    {
      type: "paragraphe",
      texte:
        "Give the exact address of your accommodation when you book, not just the resort name. Several resorts are really two or three villages several kilometres apart — Crans and Montana, Flims, Laax and Falera, Recoin and Roche-Béranger at Chamrousse, Le Fayet and Saint-Gervais village. And some resorts cannot be driven into at all: Zermatt, Wengen and Mürren end at a station.",
    },
    {
      type: "paragraphe",
      texte:
        "An operator who asks you for the address before quoting is one who has driven there.",
    },

    { type: "titre2", texte: "8. Cancellation, and what is actually promised" },
    {
      type: "paragraphe",
      texte:
        "Read the cancellation terms before you pay, and check what the confirmation actually says: the vehicle category, the number of passengers, the pick-up time, the address, the price and what it includes. A confirmation that says only « transfer to the Alps » is a dispute waiting to happen.",
    },

    { type: "titre2", texte: "When to book" },
    {
      type: "paragraphe",
      texte:
        "As soon as your flights are confirmed. In February the vehicles run out before the accommodation does, particularly for Saturday arrivals, and early bookings are cheaper. If your dates are flexible, arriving midweek saves an hour of traffic each way on the two roads that matter — the A40 towards Chamonix and the Tarentaise below Moûtiers — and usually saves money on the flight as well.",
    },

    { type: "titre2", texte: "The one-line version" },
    {
      type: "paragraphe",
      texte:
        "Compare per-vehicle prices with tolls, ski bags, child seats and waiting time included, give the exact address, and book when you book the flight. Everything else is detail — but those five things are the difference between a transfer that works and a holiday that starts badly.",
    },
  ],

  fr: {
    slug: "reserver-un-transfert-ski-ce-quil-faut-verifier",
    titre: "Réserver un transfert : ce qu’il faut vérifier avant de payer",
    metaTitre: "Transfert ski : ce qu’il faut vérifier avant de payer",
    metaDescription:
      "Par personne ou par véhicule, péages, housses à skis, sièges enfants, suivi du vol, annulation : les huit points qui décident du prix réel d’un transfert.",
    chapo:
      "Le transfert est l’un des rares achats de vacances où le prix affiché et le prix payé diffèrent régulièrement, et où le devis le moins cher désigne souvent le trajet le plus coûteux. Voici les huit points à vérifier avant de payer, pourquoi chacun compte sur une route de montagne en février, et les questions qui obtiennent une réponse claire.",
    contenu: [
      {
        type: "paragraphe",
        texte:
          "Un transfert a l’air d’être une marchandise : deux points, un véhicule, un prix. Il ne l’est pas, et les différences n’apparaissent que le jour même — quand le vol a deux heures de retard, quand il y a plus de housses à skis que le coffre n’en prend, ou quand le péage du tunnel n’était pas compris.",
      },

      { type: "titre2", texte: "1. Par personne ou par véhicule ?" },
      {
        type: "paragraphe",
        texte:
          "C’est la première question, et elle change tout. Un transfert privé se paie par véhicule : à quatre ou à huit, le prix est le même. Un transfert partagé se paie par siège, et remplit le véhicule d’autres passagers — donc attente à l’aéroport et arrêts en route.",
      },
      {
        type: "paragraphe",
        texte:
          "À deux, le partagé est généralement moins cher. À partir de quatre, le privé gagne souvent sur le prix, et toujours sur le temps. Quand vous comparez deux devis, vérifiez que vous comparez la même chose : un prix par personne et un prix par véhicule n’ont pas la même tête sur une page de résultats et peuvent donner le même total.",
      },

      { type: "titre2", texte: "2. Les péages sont-ils dans le prix ?" },
      {
        type: "paragraphe",
        texte:
          "Sur les routes alpines, les péages ne sont pas anecdotiques. Le tunnel du Mont-Blanc et celui du Fréjus coûtent chacun une somme sérieuse pour un minibus, la vignette suisse est annuelle, et les autoroutes françaises facturent à l’essieu. Un devis qui les exclut n’est pas un devis, c’est une estimation.",
      },
      {
        type: "paragraphe",
        texte:
          "Posez la question franchement : ce prix comprend-il le tunnel et tous les péages ? La réponse doit être oui, et par écrit.",
      },

      { type: "titre2", texte: "3. Les housses à skis sont-elles facturées ?" },
      {
        type: "paragraphe",
        texte:
          "Certains opérateurs facturent la housse, d’autres l’incluent, quelques-uns dimensionnent le véhicule au nombre de sièges seulement — c’est ainsi que six personnes avec six paires de skis et six sacs à chaussures se retrouvent à tenir leur matériel sur les genoux pendant deux heures.",
      },
      {
        type: "paragraphe",
        texte:
          "Déclarez précisément ce que vous emportez : skis, snowboards, sacs à chaussures, splitboard, poussette, sac airbag. Un opérateur sérieux s’en sert pour choisir le véhicule, pas pour ajouter un supplément.",
      },

      { type: "titre2", texte: "4. Que se passe-t-il si le vol a du retard ?" },
      {
        type: "paragraphe",
        texte:
          "Les vols d’hiver vers les aéroports alpins sont souvent retardés : météo aux deux bouts, file de dégivrage, déroutement. La question est de savoir ce que l’opérateur en fait.",
      },
      {
        type: "liste",
        items: [
          "Le chauffeur suit-il le vol, ou travaille-t-il sur l’heure réservée ?",
          "Combien de temps d’attente est compris, et que se passe-t-il ensuite ?",
          "Y a-t-il un numéro auquel quelqu’un répond à onze heures du soir ?",
          "Et si le vol est dérouté sur un autre aéroport ?",
          "Tout cela est-il facturé ?",
        ],
      },
      {
        type: "paragraphe",
        texte:
          "Le suivi du vol devrait être compris et gratuit. Si l’attente se facture au quart d’heure, vous achetez un taxi, pas un transfert.",
      },

      { type: "titre2", texte: "5. Les sièges enfants" },
      {
        type: "paragraphe",
        texte:
          "La France, la Suisse, l’Italie et l’Autriche imposent toutes un dispositif homologué pour les enfants — en France, jusqu’à 10 ans. Les sièges doivent être gratuits, installés avant le départ et adaptés aux âges donnés à la réservation. Un chauffeur qui sort un rehausseur pour un enfant de trois ans au bord du trottoir est un mauvais signe, et une infraction.",
      },

      { type: "titre2", texte: "6. L’équipement hiver du véhicule" },
      {
        type: "paragraphe",
        texte:
          "En Savoie et en Haute-Savoie, pneus hiver ou chaînes sont obligatoires du 1ᵉʳ novembre au 31 mars ; l’Autriche applique une règle voisine du 1ᵉʳ novembre au 15 avril, et l’Italie sur les routes alpines de la mi-novembre à la mi-avril. Demandez ce que le véhicule embarque. Dans la montée de Val Thorens ou de Flaine sur neige fraîche, ce n’est pas un détail administratif.",
      },

      { type: "titre2", texte: "7. L’adresse, pas la station" },
      {
        type: "paragraphe",
        texte:
          "Donnez l’adresse exacte de votre logement, pas seulement le nom de la station. Plusieurs « stations » sont en réalité deux ou trois villages distants de plusieurs kilomètres — Crans et Montana, Recoin et Roche-Béranger à Chamrousse, Le Fayet et le village à Saint-Gervais, les quatre niveaux des Arcs. Et certaines ne se rejoignent pas du tout en voiture : Zermatt, Wengen et Mürren se terminent à une gare.",
      },
      {
        type: "paragraphe",
        texte:
          "Un opérateur qui vous demande l’adresse avant de chiffrer est un opérateur qui y a déjà conduit.",
      },

      { type: "titre2", texte: "8. L’annulation, et ce qui est réellement promis" },
      {
        type: "paragraphe",
        texte:
          "Lisez les conditions d’annulation avant de payer, et vérifiez ce que dit la confirmation : catégorie de véhicule, nombre de passagers, heure de prise en charge, adresse, prix et ce qu’il comprend. Une confirmation qui dit seulement « transfert vers les Alpes » est un litige en préparation.",
      },

      { type: "titre2", texte: "Quand réserver" },
      {
        type: "paragraphe",
        texte:
          "Dès que les vols sont confirmés. En février, les véhicules manquent avant les hébergements, surtout pour les arrivées du samedi, et les réservations précoces coûtent moins cher. Si vos dates sont souples, arriver en semaine économise une heure de trafic dans chaque sens sur les deux axes qui comptent — l’A40 vers Chamonix et la Tarentaise sous Moûtiers — et souvent le prix du billet.",
      },

      { type: "titre2", texte: "En une ligne" },
      {
        type: "paragraphe",
        texte:
          "Comparez des prix par véhicule, péages, skis, sièges enfants et attente compris, donnez l’adresse exacte, et réservez en même temps que le vol. Le reste est du détail — mais ces cinq points font la différence entre un transfert qui fonctionne et des vacances qui commencent mal.",
      },
    ],
  },
};
