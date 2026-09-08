/**
 * Contenu de la page d'accueil.
 *
 * Textes repris **mot pour mot** de la home WordPress (page 811, 1 726 mots) :
 * ils sont rédigés, positionnés et déjà indexés. La refonte change la mise en
 * page, pas le propos.
 */

export const HERO = {
  accroche: "Need a ride ?",
  titre: "Alps Ski Transfers – Private Airport Transfers to Alpine Resorts",
  image: {
    nom: "hero-alps-ski-transfers",
    alt: "Skieurs dans la poudreuse au-dessus d'une station des Alpes",
  },
} as const;

/** Les trois promesses affichées sous le formulaire de recherche. */
export const REASSURANCES = [
  {
    titre: "Guaranteed rates",
    texte:
      "Enjoy guaranteed rates on all our ski transfers, ensuring transparent pricing with no hidden fees.",
  },
  {
    titre: "Regular sanitisation",
    texte:
      "We ensure regular sanitisation of all our vehicles, providing a safe and hygienic travel experience for every passenger.",
  },
  {
    titre: "Contactless ride",
    texte:
      "Enjoy a contactless ride with our secure, hassle-free service, ensuring safety and convenience from airport to ski resort.",
  },
] as const;

export const PRESENTATION = {
  titre: "Need a transfer ? You've come to the right place",
  image: {
    nom: "route-alpine",
    alt: "Village alpin enneigé et route de montagne en lacets au crépuscule",
  },
  paragraphes: [
    "Looking for the best Alps ski transfers? If you need a private transfer our airport transfer service provides fast, safe, and reliable ski transfers from Geneva Airport, Lyon Airport, Grenoble Airport, and Chambéry Airport, to top ski resorts like Tignes Val, Val Thorens, Chamonix, Morzine, Avoriaz, La Plagne, and Les Deux Alpes.",
    "Our transfer services are designed for winter sports enthusiasts and summer travelers looking for a hassle-free experience. You can book ski transfers online in just a few steps with our simple booking process, secure your seats, and choose from a range of options. We specialise in door-to-door transfers, ensuring a comfortable, professional, and tailored service with experienced drivers and English-speaking staff.",
    "Whether you are heading for a luxury ski resort or looking for the cheapest transfer option, our alpine fleet is at your service. Book now to enjoy a stress-free start to your skiing holiday in the French Alps.",
  ],
} as const;

export const VEHICULES = {
  surtitre: "Our vehicles",
  titre: "Door to Door Service : Safe travel experience with a peace of mind",
  categories: [
    {
      nom: "Standard",
      modele: "Volkswagen Transporter (T5/T6, Combi or Shuttle type)",
      capacite: "Up to 8 passengers",
      image: { nom: "vehicule-standard", alt: "Volkswagen Transporter noir" },
    },
    {
      nom: "Business",
      modele: "Mercedes V-Class (or Vito Tourer)",
      capacite: "Up to 7 passengers",
      image: { nom: "vehicule-business", alt: "Mercedes Classe V noire" },
    },
    {
      nom: "Premium",
      modele: "Mercedes E-Class Sedan",
      capacite: "Up to 4 passengers",
      image: { nom: "vehicule-premium", alt: "Mercedes Classe E berline noire" },
    },
  ],
} as const;

export const AVANTAGES = {
  surtitre: "Exclusive benefits",
  titre: "Reasons to plan your trip with us",
  points: [
    "Upfront pricing with no hidden fees or surge pricing",
    "Professionally trained, knowledgeable and safe drivers",
    "Easy, secure online booking available 24/7",
    "Late model, comfortable and well-maintained vehicles",
  ],
} as const;

export const STATIONS_PHARES = {
  surtitre: "Transfers",
  titre: "Hassle-Free Transfers to the Best Ski Resorts in the Alps",
  image: { nom: "station-alpes", alt: "Station de ski des Alpes sous la neige" },
  chapo:
    "Choosing the right ski transfer is crucial for a smooth journey to your ski resort. At Alps Ski Transfers, we offer private airport transfers to popular ski resorts.",
  /*
   * `slugs` liste les stations réellement citées par la ligne : le nom affiché
   * en couvre parfois deux (« Morzine & Avoriaz »), et chacune a sa page. Le
   * texte reste celui de la home WordPress, seul le lien est ajouté.
   */
  stations: [
    {
      nom: "Chamonix",
      slugs: ["chamonix"],
      texte: "A legendary destination for extreme winter sports and mountaineering.",
    },
    {
      nom: "Val Thorens",
      slugs: ["val-thorens"],
      texte: "The highest ski resort in Europe, known for guaranteed snow.",
    },
    {
      nom: "Tignes Val & Val d'Isère",
      slugs: ["tignes", "val-disere"],
      texte: "A top ski resort with exceptional slopes.",
    },
    {
      nom: "Morzine & Avoriaz",
      slugs: ["morzine", "avoriaz"],
      texte: "Family-friendly ski resorts in the French Alps.",
    },
    {
      nom: "La Plagne",
      slugs: ["la-plagne"],
      texte: "A popular ski resort offering diverse slopes for all skill levels.",
    },
  ],
  conclusion:
    "No matter where you land or where you're headed, we provide transfers from any airport to any ski resort or hotel, ensuring seamless, door-to-door service with maximum comfort and flexibility.",
} as const;

export const DEPARTS = {
  titre: "Wherever you land, we've got your ski transfer covered !",
  cartes: [
    {
      titre: "Ski transfers from Lyon, Grenoble & Chambéry Airports",
      image: { nom: "aeroport-lyon-grenoble-chambery", alt: "Terminal de l'aéroport de Lyon" },
      texte:
        "Our airport ski transfers also operate from Lyon Airport, Grenoble Airport, and Chambéry Airport, providing reliable ski transfers to Val Thorens, Tignes Val and La Plagne, hassle-free booking with real-time availability, and professional drivers ensuring safe mountain travel.",
      lien: { texte: "French airports", chemin: "/france-ski-transfers/" },
    },
    {
      titre: "Private transfers from Geneva – Affordable & Reliable",
      image: { nom: "aeroport-geneve", alt: "Aéroport de Genève" },
      texte:
        "For those looking for affordable ski transfers, our private transfers from Geneva are the perfect choice: the lowest price guaranteed for budget-conscious travelers, regular departures and estimated departure times to match flights, and comfortable, insured minibuses with dedicated space for luggage and ski equipment.",
      lien: { texte: "Transfers from Geneva", chemin: "/switzerland-ski-transfers/geneva-airport/" },
    },
    {
      titre: "Private transfers from Paris, Milan, Turin, Zurich, Salzburg",
      image: { nom: "aeroport-paris-milan-turin", alt: "Avion à l'approche au-dessus de Paris" },
      texte:
        "Traveling from Paris, Milan, Turin, Zurich, or Salzburg? Alps Ski Transfers offers private transfers to top French Alps ski resorts: door-to-door service, flexible schedule and premium comfort, with modern vehicles with space for luggage and ski equipment.",
      lien: { texte: "All airports", chemin: "/italy-ski-transfers/" },
    },
  ],
} as const;

export const ETAPES = {
  titre: "Booking Process – How to Book Ski Transfers?",
  chapo: "Our booking process is simple and easy",
  etapes: [
    {
      titre: "Get an instant quote",
      texte: "Use our online booking tool for a competitive rate.",
    },
    {
      titre: "Confirm your booking",
      texte: "Receive an immediate confirmation with all details.",
    },
    {
      titre: "Meet your driver",
      texte: "Enjoy a hassle-free airport transfer with an English-speaking driver.",
    },
  ],
  conclusion: "Our customer service is available 24/7 to assist with any request.",
} as const;

export const POURQUOI = {
  titre: "Why Choose Alps Ski Transfers?",
  chapo:
    "We aim to provide the most convenient, reliable, and tailored ski transfers in the French Alps. Our transfer services include:",
  points: [
    "Fast & safe travel with experienced drivers",
    "Luxury private airport transfers with alpine fleet vehicles",
    "Private transfers from Geneva with affordable rates",
    "Door-to-door service for maximum comfort and flexibility",
    "English-speaking professional staff to assist you",
  ],
  conclusion:
    "With Alps Ski Transfers, your journey to the ski resort will be seamless and stress-free.",
} as const;

/**
 * Témoignages déjà publiés sur la home actuelle, repris tels quels.
 *
 * À vérifier avant mise en ligne : l'audit relève que le site n'affiche aucune
 * preuve sociale vérifiable, quand alps2alps en affiche 2 340 sur Trustpilot. Des
 * avis non rattachés à une plateforme valent moins qu'un flux Trustpilot ou Google,
 * et le client doit pouvoir les justifier.
 */
export const AVIS = {
  surtitre: "Customer reviews — what our clients say",
  titre: "Real passenger satisfaction",
  avis: [
    {
      texte:
        "Flawless service! Our private transfer from Geneva Airport to Val Thorens was seamless. The driver was punctual, professional, and friendly. Our luggage and ski equipment fit perfectly in the spacious vehicle. Highly recommend!",
      auteur: "Jason Lee",
      ville: "London",
    },
    {
      texte:
        "We booked a private transfer from Geneva Airport to Chamonix, and everything went smoothly. The estimated departure time matched our flight schedule, and the ride was comfortable. Best value for money ski transfer!",
      auteur: "Anna Ritch",
      ville: "Manchester",
    },
    {
      texte:
        "Great experience! Our private airport transfer from Lyon Airport to Tignes Val was fast, reliable, and hassle-free. The driver was English-speaking, and we appreciated the door-to-door service. Will book again next season!",
      auteur: "Bob Dillon",
      ville: "Uxbridge",
    },
    {
      texte:
        "Finding an affordable ski transfer from Milan to the French Alps was a challenge, but Alps Ski Transfers made it easy and stress-free. Our private minibus was spacious, the ride was smooth, and the driver was fantastic!",
      auteur: "George F.",
      ville: "Liverpool",
    },
  ],
} as const;

export const FAQ_ACCUEIL = {
  surtitre: "Help",
  titre: "Frequently asked questions Alps Ski Transfers",
  image: { nom: "faq", alt: "Skieur au soleil couchant" },
  questions: [
    {
      question: "What are the best ski transfer options?",
      reponse:
        "Choosing the right ski transfer depends on your budget and preferences. We offer private transfers from Geneva, Paris, Milan, Turin, Zurich, Salzburg, Lyon, Grenoble and Chambéry Airports — a door-to-door private transfer for maximum comfort — reliable ski transfers with insured vehicles and experienced drivers, and affordable ski transfers with competitive rates to top resorts.",
    },
    {
      question: "How to book ski transfers?",
      reponse:
        "Our booking process is easy and takes just a few steps: get a quote by entering your details on our online booking system, receive an instant confirmation email with your journey details, then meet your driver at the agreed pick-up point.",
    },
    {
      question: "What airports offer ski transfers?",
      reponse:
        "We provide airport ski transfers from all major hubs serving the Alps: Geneva Airport, the busiest gateway to the top resorts, Lyon, Grenoble and Chambéry for the French Alps, and Paris, Milan, Turin, Zurich and Salzburg for longer approaches.",
    },
    {
      question: "What ski resorts are popular for transfers?",
      reponse:
        "Val Thorens, Europe's highest ski resort, offering great snow reliability. Tignes Val and Val d'Isère, a paradise for advanced skiers. Chamonix, Morzine, Avoriaz and La Plagne complete the most requested destinations.",
    },
    {
      question: "What is the cost of ski transfers?",
      reponse:
        "The price of a ski transfer depends on the distance, the vehicle type and the number of passengers. We provide affordable options for private transfers, discounted group bookings and early reservation offers.",
    },
    {
      question: "How reliable are ski transfer services?",
      reponse:
        "Insured vehicles and professional drivers trained for mountain roads, hassle-free booking, and flight tracking so your driver is there when you land — even if your flight is delayed.",
    },
    {
      question: "What are the options for ski transfers?",
      reponse:
        "Private transfers chosen on your budget and flexibility, and a door-to-door service that picks you up and drops you off exactly where you need to be.",
    },
  ],
} as const;
