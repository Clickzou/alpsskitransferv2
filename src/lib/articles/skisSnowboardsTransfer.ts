import type { Article } from "./types";

/**
 * Voyager avec skis et snowboards.
 *
 * Les capacités viennent de `src/lib/reservation/devis.ts` (`CAPACITE`,
 * `CAPACITE_BAGAGES`), les modèles de véhicule de `src/data/accueil.ts`, les
 * champs du formulaire de `src/lib/reservation/textes.ts`, les règles de
 * bagages des conditions générales. Le côté compagnie aérienne reste général :
 * les franchises changent d'une compagnie et d'une saison à l'autre.
 */
export const skisSnowboardsTransfer: Article = {
  slug: "skis-snowboards-ski-transfer-luggage",
  titre: "Travelling to the Alps with skis and snowboards: bags, boots and what fits in the vehicle",
  metaTitre: "Skis & Snowboards on a Ski Transfer: What Fits Where",
  metaDescription:
    "How many ski bags fit in each transfer vehicle, what counts as luggage, what airlines usually ask, and what to declare when you book your transfer.",
  chapo:
    "On a ski holiday the luggage decides the vehicle before the passengers do. Six people fit easily into a minibus; six people with six suitcases, six ski bags and six boot bags are a different calculation. Here is how much each of our vehicles actually carries, what counts as a piece of luggage, what airlines generally ask of skiers and snowboarders, and what to tell us when you book so that everything travels in the boot and nothing on your knees.",
  visuel: { nom: "blog-skis-snowboards-transfer", alt: "Van boot loaded with ski bags, a snowboard bag and suitcases in a snowy village" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Skis, snowboards and boot bags travel at no extra charge on our transfers, but they must be declared when you book.",
    "The booking form counts suitcases and ski bags together: a Standard Volkswagen Transporter takes up to 8 passengers and 12 pieces, a Business Mercedes V-Class up to 7 passengers and 10 pieces, and a Premium Mercedes E-Class up to 4 passengers and 5 pieces.",
    "Hand luggage is not counted in those figures; suitcases, holdalls and ski or board bags are.",
    "Our terms allow each passenger one standard suitcase and one piece of hand luggage; anything beyond that must be declared at booking, and oversized items such as bikes may be charged.",
    "One hour of waiting is included from your actual landing time, which usually covers a slow oversize-baggage belt; beyond that hour, waiting is charged whatever the reason.",
  ],

  stationsLiees: ["chamonix", "meribel", "val-thorens", "verbier", "davos", "la-plagne"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "meribel" },
    { airport: "geneva-airport", resort: "la-plagne" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "verbier" },
    { airport: "zurich-airport", resort: "davos" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "Can you take skis and snowboards on a private ski transfer? Yes — on our transfers skis, snowboards and boot bags travel at no extra charge, provided they are declared when you book. The declaration matters more than the price, because in winter the boot fills up before the seats do. Our booking form asks for two figures, bags and ski bags, and counts them together. A Standard Volkswagen Transporter takes up to 8 passengers and 12 pieces of luggage; a Business Mercedes V-Class up to 7 passengers and 10 pieces; a Premium Mercedes E-Class up to 4 passengers and 5 pieces. Hand luggage is not part of the count. A family of four with four suitcases and four ski bags therefore needs a Standard or a Business vehicle, not the saloon. Give us the real numbers, including boot bags and pushchairs, and the form only offers the vehicles that can carry the lot.",
    },

    { type: "titre2", texte: "Do skis and snowboards cost extra on a transfer?" },
    {
      type: "paragraphe",
      texte:
        "Not with us. Our terms state that ski and snowboard equipment is transported free of charge, and the price you see when you book is per vehicle, with tolls included and nothing added on arrival. That is not universal across the industry: some operators add a charge per ski bag, and others size the vehicle on seats alone, which is how a group ends up holding equipment across their laps for two hours.",
    },
    {
      type: "paragraphe",
      texte:
        "Free does not mean undeclared. The same terms set a standard allowance of one suitcase and one piece of hand luggage per passenger, ask for extra luggage to be declared at the time of booking, and note that oversized luggage, bikes or additional sports equipment may incur extra fees. In practice, a normal ski holiday load — a suitcase and a ski or board bag each — is exactly what the vehicles are chosen for. It is the undeclared extras that cause the trouble: the third ski bag, the second boot bag, the travel cot nobody mentioned.",
    },

    { type: "titre2", texte: "How many ski bags fit in each vehicle?" },
    {
      type: "paragraphe",
      texte:
        "Each vehicle category has two limits, one for people and one for luggage, and the second is usually the one that decides. The booking form currently works to the following figures, where a piece is a suitcase, a holdall or a ski or board bag.",
    },
    {
      type: "liste",
      items: [
        "Standard — Volkswagen Transporter (T5/T6, Combi or Shuttle type): up to 8 passengers and 12 pieces of luggage.",
        "Business — Mercedes V-Class (or Vito Tourer): up to 7 passengers and 10 pieces of luggage.",
        "Premium — Mercedes E-Class saloon: up to 4 passengers and 5 pieces of luggage.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "When you enter your journey, vehicles that cannot seat your group or carry its luggage are simply not shown, and the form tells you why. A few worked examples make the limits concrete.",
    },
    {
      type: "liste",
      items: [
        "A couple with two suitcases and two ski bags: 4 pieces. Every category fits, including the Premium saloon.",
        "A family of four with four suitcases and three ski bags: 7 pieces. Standard or Business; the saloon's 5 pieces are not enough.",
        "Six friends with six suitcases and six board bags: 12 pieces. The Standard Transporter carries exactly that; the Business V-Class, at 10 pieces, does not.",
        "Eight people with eight suitcases and eight ski bags: 16 pieces. That is more than one vehicle takes, so the group travels in two vehicles — ask us for a group quote and we plan them to arrive together.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If you book a return, the luggage count applies in both directions: you take the same skis home. The two journeys can use different vehicles if the group changes size, but each one has to carry the luggage.",
    },
    {
      type: "paragraphe",
      texte:
        "It is also worth remembering why the saloon has such a low figure. The Premium Mercedes E-Class is a comfortable car for up to four people, but a saloon boot is shaped for suitcases, not for long bags, and ski bags are the least forgiving shape there is. For a couple or a business traveller with one ski bag it is ideal; for four skiers with a full load it is not the right tool, however comfortable the seats. The price being per vehicle, the sensible choice is usually the vehicle whose boot fits the skis, not the one whose seats fit the people.",
    },

    { type: "titre2", texte: "What counts as a piece of luggage" },
    {
      type: "paragraphe",
      texte:
        "The simplest rule is to count everything that goes in the boot, and nothing that stays on your lap. The booking form excludes hand luggage from its count; everything else is a piece.",
    },
    {
      type: "liste",
      items: [
        "Suitcases and large holdalls: one piece each, whatever their size.",
        "Ski bags and snowboard bags: one piece each. A double ski bag holding two pairs is still one bag — enter it once.",
        "Boot bags that travel separately from the ski bag: our advice is to count them as bags, because they take boot space like any other bag.",
        "Pushchairs, travel cots and child carriers: count them, and mention them in the note, since their shape matters as much as their number.",
        "Splitboards, long touring skis, sledges and anything unusually long or heavy: declare them in the note so we can check the fit.",
        "Small backpacks, handbags and camera bags carried on board the plane: hand luggage, not counted.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "When in doubt, round up. A vehicle chosen for one bag too many costs nothing extra on a per-vehicle price; a vehicle chosen for one bag too few is a problem that only appears at the kerb.",
    },

    { type: "titre2", texte: "Ski bags, board bags and boot bags: packing for the road as well as the plane" },
    {
      type: "paragraphe",
      texte:
        "Equipment that survives an aircraft hold survives a minibus without difficulty, but a few choices make the whole journey easier — at the check-in desk, on the baggage belt, and at the chalet door.",
    },
    {
      type: "titre3",
      texte: "Ski bags",
    },
    {
      type: "paragraphe",
      texte:
        "A padded bag protects edges and bindings from the handling that luggage receives between the aircraft and the belt, and a bag with wheels is far easier to move through an arrivals hall with children in tow. Double bags are efficient, but they are long and heavy: check your airline's weight limit before filling one with two pairs, poles and a helmet.",
    },
    {
      type: "titre3",
      texte: "Snowboard bags",
    },
    {
      type: "paragraphe",
      texte:
        "Board bags are shorter than ski bags and often roomier, which tempts people to pack clothing in with the board. That is usually fine for the vehicle; it is the airline's weight and content rules that set the limit.",
    },
    {
      type: "titre3",
      texte: "Boots",
    },
    {
      type: "paragraphe",
      texte:
        "Ski boots are the one piece of equipment that is hard to replace on the spot if a bag goes astray, which is why many skiers carry them in the cabin. If yours travel in a separate boot bag in the hold, remember that it is a piece of luggage on the transfer as well.",
    },
    {
      type: "liste",
      items: [
        "Put a name and a mobile number on the outside of every bag, and inside it as well.",
        "Take a photograph of the bags and of the baggage tags before check-in.",
        "Keep poles inside the ski bag rather than strapped to the outside.",
        "Leave a little room: wet gear on the way home takes more space than dry gear on the way out.",
      ],
    },

    { type: "titre2", texte: "The airline side: sports equipment allowances in general terms" },
    {
      type: "paragraphe",
      texte:
        "Airlines set their own rules for skis and snowboards, and they change from one airline, fare and season to the next, so the only reliable source is your airline's own baggage page for your booking. That said, the broad pattern is consistent enough to plan around.",
    },
    {
      type: "liste",
      items: [
        "Skis and snowboards are usually treated as sports equipment rather than ordinary checked baggage, sometimes within the allowance and often for a fee per direction.",
        "Adding sports equipment online in advance is generally simpler, and often cheaper, than paying at the airport.",
        "Airlines publish weight and length limits for ski and board bags; exceeding them can mean an extra charge or a refusal.",
        "Some airlines allow boots and a helmet inside the ski bag; others count a separate boot bag as another item.",
        "At check-in, skis are often dropped at an oversize baggage counter rather than on the normal belt.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "On arrival, the same logic applies in reverse. At most airports skis and boards come out at a separate oversize belt or counter, and they are frequently the last items delivered after a busy winter flight.",
    },

    { type: "titre2", texte: "Arrival day: the oversize belt, the wait and the drive" },
    {
      type: "paragraphe",
      texte:
        "We track your flight, so a late landing moves your pick-up with it. One hour of waiting is included, counted from the actual landing time when the flight is delayed and from the booked pick-up time otherwise. On a normal day that hour comfortably covers passport control, the main belt and the oversize belt. Beyond it, our terms charge waiting time whatever the reason, including a slow baggage hall, and the driver calls the number you gave at booking before any decision is taken.",
    },
    {
      type: "paragraphe",
      texte:
        "Your driver meets you in the arrivals hall with a name sign and helps load the vehicle. Before the boot closes, take out anything you will want on the drive — water, a coat for the children, medication, a phone charger — because on a mountain road nobody wants to stop and unload a ski bag to reach it.",
    },
    {
      type: "paragraphe",
      texte:
        "The drives themselves vary a great deal. From Geneva, Chamonix is 91 km and about 1 h 25 on clear roads, Verbier 163 km and about 2 h 10, Méribel 142 km and about 2 h 25, and La Plagne 160 km and about 2 h 45. From Lyon, Val Thorens is 200 km and about 2 h 35; from Zurich, Davos is 166 km and about 2 h 35. On the longer runs, a properly loaded boot is what keeps the cabin comfortable.",
    },

    { type: "titre2", texte: "If your skis do not arrive" },
    {
      type: "paragraphe",
      texte:
        "Delayed ski bags are not rare in February. If yours are missing, report it at your airline's baggage desk before you leave the arrivals area and keep the reference: the airline is responsible for tracing the bag and, in most cases, for delivering it to your accommodation once it is found. Give them the full address of the chalet or residence, not just the resort name.",
    },
    {
      type: "paragraphe",
      texte:
        "Tell your driver as soon as you know, because a baggage report takes time and the included hour of waiting keeps running. Once the report is made there is no reason to wait for the bag: you travel to the resort with what you have, and many resorts have rental shops that can tide you over until the bag arrives.",
    },
    {
      type: "paragraphe",
      texte:
        "The reverse also happens — a glove, a pole or a helmet left in the vehicle. Contact us with your booking reference and a description as soon as you notice; we check with the driver, and items found are kept for up to 30 days.",
    },

    { type: "titre2", texte: "Bringing your own equipment or renting in the resort" },
    {
      type: "paragraphe",
      texte:
        "The choice is personal, and both work. Bringing your own equipment means skis you know, boots that fit and no queue at the rental shop on the first morning. Renting means lighter luggage, no airline sports fee, and — on the transfer side — a smaller load that can open up a smaller vehicle category.",
    },
    {
      type: "liste",
      items: [
        "Boots are the item most worth bringing: a good fit is hard to find in a rental shop on a busy Saturday.",
        "Skis and boards are the easiest item to rent, and rental lets you change skis if the snow changes.",
        "Children outgrow equipment quickly, which is one reason many families rent for them and bring their own for the adults.",
        "If you rent, remember to update the ski bag count when you book; it can change which vehicles the form offers.",
      ],
    },

    { type: "titre2", texte: "What to declare when you book" },
    {
      type: "paragraphe",
      texte:
        "The booking form is built around what the driver needs to know before leaving for the airport. Filling it in accurately takes a minute and is what guarantees that the vehicle you are sent carries everyone and everything.",
    },
    {
      type: "liste",
      items: [
        "Passengers: everyone travelling, children included.",
        "Bags: suitcases and holdalls, plus boot bags that travel separately — not hand luggage.",
        "Ski bags: every ski or board bag, counted once each.",
        "The note: anything long, heavy or oddly shaped — a splitboard, a pushchair, a travel cot, a sledge.",
        "Children's ages, so the right seats are fitted before departure.",
        "The exact address of your accommodation, so you are dropped at the right door with the bags.",
        "For a return with a different group, the number of people on the return journey.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If the numbers change after booking — a friend joins, a bag is added — tell us. A change of passengers or vehicle changes the booking, so it goes through us rather than the self-service link; it is far easier to adjust a week before than at the kerb. Declared properly, skis and boards are the least complicated part of the journey: they go in first and come out last, at your door.",
    },
  ],

  faq: [
    {
      question: "Do you charge extra for ski bags?",
      reponse:
        "No. Skis, snowboards and boot bags are carried at no extra charge, but they must be declared when you book so we send a vehicle with room for them. Oversized items such as bikes may be charged.",
    },
    {
      question: "How many ski bags fit in a minibus transfer?",
      reponse:
        "Our Standard Volkswagen Transporter takes up to 8 passengers and 12 pieces of luggage, suitcases and ski bags combined. The Business V-Class takes 7 passengers and 10 pieces, the Premium saloon 4 passengers and 5 pieces.",
    },
    {
      question: "Does hand luggage count towards the luggage limit?",
      reponse:
        "No. The booking form counts suitcases, holdalls and ski or board bags. Small cabin bags that stay with you are not part of the count.",
    },
    {
      question: "What if our group has more luggage than one vehicle can take?",
      reponse:
        "The form will not offer a vehicle that cannot carry it. Ask us for a group quote: the party can travel in two vehicles planned to arrive together.",
    },
    {
      question: "Will the driver wait if our skis are slow to come off the plane?",
      reponse:
        "One hour of waiting is included, counted from the actual landing time if the flight is delayed. That normally covers the oversize belt. Beyond the hour, waiting is charged whatever the cause.",
    },
  ],
};
