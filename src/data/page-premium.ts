/**
 * `/luxury-ski-transfers-alps/` et ses traductions — la page des demandes sur mesure.
 *
 * ## Ce qu'elle capte, et que rien ne captait
 *
 * Le site sait vendre un trajet : un aéroport, une station, un prix. Il ne
 * savait rien faire d'autre. Or une part de la demande alpine ne tient pas dans
 * un point A et un point B — une voiture et un chauffeur retenus à la semaine,
 * un dernier tronçon en hélicoptère le samedi de rotation, une arrivée en jet
 * privé à Chambéry, un mariage dont les invités atterrissent sur deux jours, un
 * séminaire de marque qui déplace trente personnes entre un hôtel et un chalet.
 * Ces demandes arrivent déjà par téléphone ; elles n'avaient pas de page, donc
 * pas de visibilité, et aucune trace écrite de ce que l'entreprise sait faire.
 *
 * **Mot-clé propriétaire : « luxury ski transfers Alps ».** Le massif est dans
 * le mot-clé, dans le slug et dans le H1 : « luxury ski transfers » seul est une
 * requête mondiale que se disputent les Rocheuses, les Dolomites et Hokkaido,
 * et sur laquelle une entreprise de Chambéry n'a rien à gagner. Requêtes
 * secondaires
 * portées par les H2 : « chauffeur at disposal ski resort », « helicopter
 * transfer Courchevel », « private jet transfer Geneva ski », « wedding
 * transport Alps », « VIP ski transfer ».
 *
 * ## Le partage des rôles avec les autres pages de conversion
 *
 *  · `/book-ski-transfer-tickets/` — réserver un trajet standard, prix immédiat ;
 *  · `/private-airport-transfers-to-alps-ski-resort/` — le service privé et les
 *    temps de route, milieu de tunnel ;
 *  · `/inquiry/` — **le nombre** : plus de huit passagers, agences, entreprises ;
 *  · **ici** — **la nature** de la demande : mise à disposition, air, événement.
 *
 * La frontière avec `/inquiry/` est celle-là et pas une autre : un autocar
 * d'école de ski est un groupe, pas du premium ; deux passagers avec un
 * chauffeur retenu six jours sont du premium, pas un groupe. Chaque page
 * renvoie vers l'autre plutôt que de se disputer la requête.
 *
 * ## Une limite tenue par la rédaction
 *
 * NM Transports 73 est transporteur de voyageurs par taxi et VTC. **Elle
 * n'exploite ni hélicoptère ni avion**, et la page ne le laisse jamais croire :
 * les vols sont affrétés auprès d'opérateurs agréés, ce qui est écrit noir sur
 * blanc dans la carte, dans la FAQ et dans la mention sous le formulaire. Une
 * page premium qui promet un appareil qu'elle n'a pas se fait rattraper au
 * premier devis — et la route, la coordination et le sol restent, eux,
 * entièrement du ressort de l'exploitant. **Cette réserve doit survivre à toute
 * traduction** : elle figure dans les quatre langues, au même endroit.
 *
 * ## Pourquoi les libellés d'interface vivent ici
 *
 * La page existe dans les quatre langues (22 septembre 2026), avec le même
 * gabarit et le même formulaire. Tout ce qui s'affiche est donc porté par ce
 * type — jusqu'aux mots des boutons et aux messages du formulaire. Le composant
 * ne contient plus une seule chaîne en anglais : c'est la seule façon qu'une
 * traduction ne laisse pas derrière elle un « Send your request » sur une page
 * allemande, défaut typique des gabarits à moitié traduits.
 */

import type { NomVisuel } from "@/components/Visuel";

/**
 * Les natures de demande, **par clé stable**.
 *
 * Le formulaire affiche le libellé de la langue du visiteur et envoie la clé ;
 * la route de réception traduit la clé en français pour l'exploitant, qui reçoit
 * ainsi le même vocabulaire quelle que soit la langue du demandeur. Envoyer le
 * libellé affiché aurait fait arriver « Hochzeit » ou « Matrimonio » dans l'objet
 * d'un e-mail lu en français, et rendu tout tri impossible.
 */
export const CLES_DEMANDE = [
  "disposal",
  "helicopter",
  "jet",
  "wedding",
  "event",
  "production",
  "other",
] as const;

export type CleDemande = (typeof CLES_DEMANDE)[number];

/** Ce que l'exploitant lit dans l'objet de l'e-mail, toujours en français. */
export const LIBELLES_EXPLOITANT: Record<CleDemande, string> = {
  disposal: "Mise à disposition",
  helicopter: "Hélicoptère",
  jet: "Jet privé",
  wedding: "Mariage",
  event: "Événement de marque ou d'entreprise",
  production: "Tournage ou shooting",
  other: "Autre demande",
};

/** L'ancre du formulaire : les appels à l'action de la page y descendent. */
export const ANCRE_FORMULAIRE = "request";

/** Un texte coupé par un lien, pour éviter toute balise dans les contenus. */
export interface PhraseAvecLien {
  avant: string;
  lien: string;
  apres: string;
  chemin: string;
}

export interface LibellesFormulaire {
  nom: string;
  email: string;
  telephone: string;
  societe: string;
  type: string;
  du: string;
  au: string;
  arrivee: string;
  destination: string;
  passagers: string;
  budget: string;
  details: string;
  /** « (facultatif) », apposé aux étiquettes qui ne sont pas obligatoires. */
  facultatif: string;
  placeholders: { arrivee: string; destination: string; budget: string; details: string };
  types: Record<CleDemande, string>;
  envoyer: string;
  envoiEnCours: string;
  succes: { titre: string; texte: string; relancer: string };
  erreurChamps: string;
  /** Message d'échec, coupé autour de l'adresse e-mail et du téléphone. */
  erreurGenerale: { avant: string; entre: string; apres: string };
  mentionBas: string;
  /** Le piège à robots, invisible mais annoncé aux outils qui le liraient. */
  piege: string;
}

export interface ContenuPremium {
  motCle: string;
  /** Libellé du fil d'Ariane, plus court que le H1. */
  filAriane: string;
  /** Nom du service dans les données structurées. */
  nomService: string;
  heroImage: { nom: NomVisuel; alt: string };
  introImage: { nom: NomVisuel; alt: string };
  reperes: readonly { libelle: string; valeur: string }[];
  intro: readonly string[];
  renvoiGroupes: PhraseAvecLien;
  actions: { envoyer: string; appeler: string; commencer: string };
  prestations: {
    surtitre: string;
    titre: string;
    chapo: string;
    cartes: readonly {
      titre: string;
      texte: string;
      points: readonly string[];
      /*
        Chaque prestation a sa photo. Les quatre cartes portaient jusque-là du
        texte seul, et la page au panier moyen le plus élevé du site était la
        seule à ne rien montrer — un hélicoptère et un jet privé se vendent
        d'abord par l'image.

        Générées avec fal.ai (`scripts/visuels-premium.json`), elles ne
        prétendent montrer aucune station réelle et ne portent ni
        immatriculation ni nom d'opérateur : une image qui annoncerait un
        appareil précis engagerait sur un appareil que l'exploitant n'a pas.
      */
      image: { nom: NomVisuel; alt: string };
    }[];
  };
  occasions: {
    surtitre: string;
    titre: string;
    chapo: string;
    points: readonly { titre: string; texte: string }[];
  };
  discretion: {
    surtitre: string;
    titre: string;
    chapo: string;
    points: readonly string[];
  };
  fonctionnement: {
    surtitre: string;
    titre: string;
    chapo: string;
    etapes: readonly { titre: string; texte: string }[];
    /** La conclusion se termine sur le lien vers le tunnel de réservation. */
    conclusion: { avant: string; lien: string };
  };
  formulaire: { surtitre: string; titre: string; chapo: string };
  encartTelephone: { titre: string; texte: string };
  encartReservation: { titre: string; texte: string; bouton: string };
  faq: { surtitre: string; titre: string };
  champs: LibellesFormulaire;
}

export const PAGE_PREMIUM: ContenuPremium = {
  motCle: "luxury ski transfers Alps",
  filAriane: "Luxury ski transfers in the Alps",
  nomService: "Luxury and bespoke ski transfers in the Alps",

  heroImage: {
    nom: "vehicule-premium",
    alt: "Premium saloon waiting at the foot of an Alpine resort",
  },

  introImage: {
    nom: "premium-helicoptere",
    alt: "Private helicopter on a snow-covered mountain helipad at dusk, a saloon car waiting alongside",
  },

  reperes: [
    { libelle: "By the hour or the week", valeur: "Car and driver held for you" },
    { libelle: "Air legs", valeur: "Helicopter and private jet" },
    { libelle: "Written proposal", valeur: "Within 24 hours" },
  ],

  intro: [
    "Some journeys are not a transfer. A car and a driver held for a week, an arrival by private jet at Chambéry, the last leg to Courchevel by helicopter on a Saturday when the road is full, a wedding whose guests land across two days — none of that fits a booking form, and none of it should be priced by one.",
    "This page is for those requests. You describe what the stay actually looks like; we come back with a written proposal — the vehicles, the timings, the operators for anything that flies, and one price. Nothing is charged, and nothing is committed, until you have read it.",
  ],

  renvoiGroupes: {
    avant: "Travelling as a large party rather than a private one? ",
    lien: "Group ski transfers",
    apres: " covers several vehicles quoted as one journey.",
    chemin: "/inquiry/",
  },

  actions: {
    envoyer: "Send your request",
    appeler: "or call",
    commencer: "Start your request",
  },

  prestations: {
    surtitre: "What we arrange",
    titre: "Four requests that come back every winter",
    chapo:
      "Each of them shares the same starting point: a schedule rather than a journey, and one person answering for all of it.",
    cartes: [
      {
        titre: "Chauffeur at your disposal",
        texte:
          "The vehicle does not leave after the airport run — it stays with you. Half a day, a full day, or the length of the stay: the driver is yours, and so are the hours. It is what most guests want in resort and what almost nobody sells online, because a booking form has nowhere to put “wherever we decide at six”.",
        points: [
          "Half-day, full day, or the whole stay",
          "The same driver throughout, so nothing is explained twice",
          "Waiting time is part of the price, not an extra on top",
          "Restaurants, ski lifts, spas, the school run to the slopes",
        ],
        image: {
          nom: "premium-chauffeur",
          alt: "Chauffeur holding open the rear door of a saloon car outside a lit alpine chalet",
        },
      },
      {
        titre: "Helicopter transfers",
        texte:
          "On changeover Saturdays the valley roads decide the arrival time, not the distance. An air leg takes that out of the equation: Geneva to a resort altiport is measured in minutes rather than hours. We arrange the flight with licensed operators and drive both ends of it — the run to the apron, and the run from the pad to the door.",
        points: [
          "Geneva, Annecy, Sion and Chambéry as departure points",
          "Courchevel altiport, Megève, Zermatt and the resort helipads",
          "Flown by licensed operators; the ground legs are ours",
          "Weather is the one thing nobody controls — a road plan comes with every quote",
        ],
        image: {
          nom: "premium-helicoptere-vol",
          alt: "Helicopter in flight above snow-covered alpine summits on a clear winter morning",
        },
      },
      {
        titre: "Private jet arrivals",
        texte:
          "Geneva, Chambéry, Annecy and Sion all take business aviation, and each has its own handling arrangements. We meet the aircraft where the operator allows it and at the FBO door where it does not, with the wait already priced in: a jet lands when it lands, and a driver who is not there is worse than useless.",
        points: [
          "Met at the FBO, or on the apron where handling permits",
          "Luggage and ski equipment moved without a second trip",
          "Crew transfers and repositioning runs handled the same evening",
          "Slot changes cost nothing — tell us, and the driver moves",
        ],
        image: {
          nom: "premium-jet",
          alt: "Private jet on a snowy apron at dawn, a premium minivan waiting at the foot of the airstairs",
        },
      },
      {
        titre: "Weddings, brand events and productions",
        texte:
          "A mountain wedding is fifty arrivals at three airports over two days, then one departure window on the Sunday. A brand event is a fleet that must be in the right place while nobody notices it is there. A shoot is crew, kit and a call sheet that moves. All three are the same job: a timetable, not a booking.",
        points: [
          "One coordinator for the whole event, named and reachable",
          "Guest shuttles across several airports and arrival days",
          "Vehicles held on site between movements",
          "One invoice to the company, the agency or the production",
        ],
        image: {
          nom: "premium-evenement",
          alt: "Three black premium vehicles lined up outside a lit alpine event venue on a winter evening",
        },
      },
    ],
  },

  occasions: {
    surtitre: "Who it is for",
    titre: "The people who ask us for this",
    chapo:
      "Rarely the traveller alone. Usually someone arranging it on their behalf, and answerable for it going right.",
    points: [
      {
        titre: "Luxury brands and maisons",
        texte:
          "Winter events, client hospitality, press days and product launches. The requirement is almost never the car — it is that thirty movements happen on time and that none of them becomes a story.",
      },
      {
        titre: "Hotels, chalets and concierges",
        texte:
          "Five-star hotels, chalet operators and concierge desks who need a supplier that answers on a Saturday. One contact, one account, and drivers who already know where the service entrance is.",
      },
      {
        titre: "Weddings in the mountains",
        texte:
          "Guests landing at Geneva, Lyon and Chambéry across two days, a shuttle between the ceremony and the reception, and a departure window on the Sunday morning that nobody wants to think about on the day.",
      },
      {
        titre: "Film, photo and advertising production",
        texte:
          "Crew, talent and kit, on a call sheet that changes. Vehicles stay with the production rather than returning empty, and the invoice goes where the budget sits.",
      },
      {
        titre: "Families travelling with staff",
        texte:
          "A nanny, an instructor, a second vehicle for the luggage and the equipment. Child seats fitted before you arrive, and the same driver for the week so that the routine settles.",
      },
      {
        titre: "Personal offices and assistants",
        texte:
          "You send the itinerary, we send back what it costs and who is driving. Changes go through one person, at any hour of the stay, without a booking reference being read out.",
      },
    ],
  },

  discretion: {
    surtitre: "Discretion",
    titre: "What premium actually means here",
    chapo:
      "Not a badge on a car. A set of habits that make a journey unremarkable — which is the whole point.",
    points: [
      "No name on a placard when you would rather there were none — a flight number is enough to find each other.",
      "A non-disclosure agreement signed before the quote if your event requires it, yours or ours.",
      "Nothing about a journey is published: no photographs, no names, no “recently driven” posts.",
      "Drivers briefed on the itinerary before the day, so the schedule is never discussed in front of guests.",
      "Invoicing to the entity that pays — company, agency, production or family office — with a single reference.",
      "One number for the whole stay, answered by someone who already knows your file.",
    ],
  },

  fonctionnement: {
    surtitre: "How it works",
    titre: "From an outline to a driver at the door",
    chapo:
      "A bespoke request cannot be priced by a form, so it is not. It is read, costed and written back to you.",
    etapes: [
      {
        titre: "Send the outline",
        texte:
          "Dates, airports, resort, how many people, and what you want the stay to look like. The rough version is enough to start.",
      },
      {
        titre: "We come back in writing",
        texte:
          "Within 24 hours, usually the same day: the vehicles, the hours held, the operator for any air leg, and one price with nothing left to discover.",
      },
      {
        titre: "You confirm once",
        texte:
          "One confirmation covers the whole programme. Passenger names, flight numbers and timings can follow later.",
      },
      {
        titre: "One coordinator throughout",
        texte:
          "A name and a number, reachable for the length of the stay. Changes go to that person, not to a form.",
      },
    ],
    conclusion: {
      avant:
        "If what you need is one vehicle from an airport to a resort, the booking form is quicker and gives you a fixed price straight away — no request needed:",
      lien: "Book ski transfer tickets",
    },
  },

  formulaire: {
    surtitre: "Your request",
    titre: "Tell us what the stay looks like",
    chapo:
      "The more it reads like a schedule and the less like a booking, the more useful the answer. Nothing here commits you to anything.",
  },

  encartTelephone: {
    titre: "Prefer to talk it through?",
    texte:
      "Complex programmes are often quicker to describe out loud than to type. Call and we will take the outline down for you.",
  },

  encartReservation: {
    titre: "Just one airport run?",
    texte:
      "A single vehicle from an airport to a resort is priced instantly by the booking form — no request, no waiting.",
    bouton: "Get a price",
  },

  faq: {
    surtitre: "Good to know",
    titre: "Frequently asked questions about luxury ski transfers",
  },

  champs: {
    nom: "Your name",
    email: "Email",
    telephone: "Phone",
    societe: "Company, brand or agency",
    type: "What do you need",
    du: "From",
    au: "To",
    arrivee: "Arriving at",
    destination: "Going to",
    passagers: "Passengers",
    budget: "Budget in mind",
    details: "What the stay looks like",
    facultatif: "(optional)",
    placeholders: {
      arrivee: "Geneva, Chambéry, a private terminal…",
      destination: "Courchevel, Megève, a chalet address…",
      budget: "A range is enough",
      details:
        "The programme as you see it: arrivals, the hours you want a car available, an event and its schedule, anything that has to be discreet.",
    },
    types: {
      disposal: "Chauffeur at your disposal",
      helicopter: "Helicopter transfer",
      jet: "Private jet arrival",
      wedding: "Wedding",
      event: "Brand or corporate event",
      production: "Film or photo production",
      other: "Something else",
    },
    envoyer: "Send your request",
    envoiEnCours: "Sending…",
    succes: {
      titre: "Request received",
      texte:
        "Thank you. We read every request personally and come back in writing — within 24 hours, usually the same day. If the dates are close, call us and we will start on it straight away.",
      relancer: "Send another request",
    },
    erreurChamps: "Please check the fields marked as required.",
    erreurGenerale: {
      avant: "We could not send your request. Please write to ",
      entre: " or call ",
      apres: ".",
    },
    mentionBas:
      "We use your details only to answer you. Nothing is stored on this website and nothing is shared with third parties. Flights are chartered with licensed operators; road transport is operated by",
    piege: "Leave this field empty",
  },
};
