/**
 * `/inquiry/` — la page des groupes et des professionnels.
 *
 * ## Le mot-clé change, et c'est le point important
 *
 * La page reprise du WordPress visait **« special inquiry ski transfer »** :
 * l'expression figurait dans le title, le H1, les sept questions de la FAQ et la
 * quasi-totalité des paragraphes. Or personne ne la cherche — c'est du jargon
 * interne, le nom du formulaire de demande, promu mot-clé par accident. Une page
 * optimisée sur une requête à volume nul est une page qui ne travaille pas.
 *
 * **Mot-clé propriétaire : « group ski transfers ».** C'est ce que la page sert
 * réellement : les partis de plus de huit personnes, qui ne tiennent pas dans un
 * véhicule et ne passent donc pas par le tunnel standard, et les professionnels
 * qui réservent pour d'autres — agences, conciergeries, chalets, entreprises.
 *
 * Requêtes secondaires portées par les H2 : « ski transfers for large groups »,
 * « corporate ski transfer », « ski transfers for travel agents », « minibus
 * transfer to ski resort ».
 *
 * Elle ne concurrence aucune autre page du silo :
 *  · `/private-airport-transfers-to-alps-ski-resort/` porte le service privé ;
 *  · `/book-ski-transfer-tickets/` porte la réservation ;
 *  · **ici**, ce qui ne rentre pas dans un véhicule ni dans un formulaire.
 *
 * L'URL `/inquiry/` ne bouge pas : elle est au plan de migration. Seul le propos
 * change — et il devient enfin le sien.
 *
 * ## L'axe qui manquait
 *
 * Le plan SEO identifie un marché B2B — « agences, conciergeries, tour-opérateurs,
 * séminaires, un marché qui remplit les véhicules en semaine ». Le site n'avait
 * aucune page pour l'accueillir. C'est elle.
 */

export const PAGE_GROUPES = {
  motCle: "group ski transfers",

  heroImage: {
    nom: "aeroport-geneve",
    alt: "Group arriving in an airport terminal at the start of a ski trip",
  },

  /** Illustration de l'introduction, à droite du texte. */
  introImage: {
    nom: "route-hiver",
    alt: "Winter-tyred vehicle on a snow-covered road to an Alpine resort",
  },

  intro: [
    "A vehicle carries up to eight passengers. Beyond that, a transfer becomes a convoy — several vehicles leaving together, arriving together, and quoted as one journey rather than as separate bookings. That is what this page is for.",
    "It is also for the people who book on behalf of others: travel agencies, chalet companies, concierges and companies organising a trip. Tell us the numbers, the dates and the pick-up points, and you get one contact, one quote and one confirmation covering the whole party.",
  ],

  pourQui: {
    surtitre: "Who it is for",
    titre: "When a standard booking is not enough",
    chapo:
      "Some journeys do not fit a booking form. These are the ones we quote by hand, and they are often the ones that matter most.",
    points: [
      {
        titre: "Groups over eight",
        texte:
          "A ski club, a family reunion, a stag weekend. Above eight passengers the party travels in several vehicles — we plan them to arrive together rather than in scattered order.",
      },
      {
        titre: "Travel agencies and tour operators",
        texte:
          "One quote for a whole season if you want it, one invoice, and a named contact rather than a booking form. We can hold recurring slots for changeover Saturdays.",
      },
      {
        titre: "Chalet companies and concierges",
        texte:
          "Guests arriving from different airports on different flights, all needing to reach the same chalet on the same afternoon. We coordinate the arrivals around your check-in.",
      },
      {
        titre: "Corporate trips and seminars",
        texte:
          "Company trips fill vehicles midweek, when the roads are clear and the resorts are quiet. We quote them per journey and invoice the company directly.",
      },
    ],
  },

  arranger: {
    surtitre: "What we arrange",
    titre: "What you can ask for",
    chapo:
      "Nothing here is a surcharge. It is simply easier to organise in advance than to improvise at the airport.",
    points: [
      "Several vehicles departing together, with a single arrival time at the resort.",
      "Pick-ups from more than one airport or terminal, coordinated to a single drop-off.",
      "Journeys that are not airport runs: TGV stations, city centres, resort-to-resort transfers.",
      "Unusual timings — a pre-dawn departure, a late-night landing, a flight that arrives the day before check-in.",
      "Child and booster seats in quantity, fitted before departure.",
      "Oversized equipment: boards, boot bags, race gear, a bike in summer.",
      "Invoicing to a company or an agency rather than to each traveller.",
    ],
  },

  fonctionnement: {
    surtitre: "How it works",
    titre: "From your request to the quote",
    chapo:
      "No online form can price a convoy sensibly, so we do it by hand. It rarely takes more than a working day.",
    etapes: [
      {
        titre: "Send us the outline",
        texte:
          "Numbers, dates, airports and resort. The rough version is enough to start — the details can follow.",
      },
      {
        titre: "We build the quote",
        texte:
          "One price for the whole party, with the vehicles it takes and the timings that make them arrive together.",
      },
      {
        titre: "You confirm once",
        texte:
          "One confirmation covers every vehicle. Passenger names and flight numbers can come later.",
      },
      {
        titre: "We track every flight",
        texte:
          "Each vehicle is matched to its flight. A delay on one arrival does not disrupt the others.",
      },
    ],
    conclusion:
      "For a single vehicle and a standard airport run, the booking form is quicker — it gives you a price straight away.",
  },
} as const;
