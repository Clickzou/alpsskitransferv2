import type { Article } from "./types";

/**
 * Transfert en famille : enfants, sièges auto, et une longue journée.
 *
 * Les champs à renseigner viennent du tunnel (`src/lib/reservation/textes.ts`,
 * `enfants.ts`) ; les engagements — sièges gratuits posés avant le départ du
 * chauffeur, heure d'attente, suivi du vol — de la FAQ et des conditions
 * générales ; les temps de route de `src/data/distances.ts`. Les règles sur les
 * sièges enfants sont données au niveau du principe, sans détail d'homologation.
 */
export const familySkiTransfersChildren: Article = {
  slug: "family-ski-transfers-children-car-seats",
  titre: "Family ski transfers: children, car seats and getting through a long travel day",
  metaTitre: "Family Ski Transfers: Children, Car Seats & Travel Day",
  metaDescription:
    "What to declare for children on a ski transfer, which car seats the law expects, how to plan naps and meals, and which vehicle fits a family.",
  chapo:
    "A ski holiday with children starts with the longest day of the week: an early alarm, an airport, a flight, a baggage hall and a mountain road, all before anyone has seen snow. The transfer is the part of that day you can plan most precisely. Here is what to tell us about your children when you book, what the rules on car seats expect, how to fit naps and meals around the drive, and how to choose a vehicle that carries the family and everything a family brings.",
  visuel: { nom: "blog-family-ski-transfers", alt: "People carrier outside a chalet with a pushchair, children’s skis and suitcases" },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",

  aRetenir: [
    "Child and booster seats are free on our transfers and fitted before the driver leaves for the airport — provided the number of children and their ages are given at booking.",
    "Children count as passengers: the Standard Volkswagen Transporter takes up to 8 people, the Business Mercedes V-Class up to 7 and the Premium Mercedes E-Class up to 4, children and babies included.",
    "As a rule, France requires an approved child restraint for children under 10, Switzerland for children under 12 and shorter than 150 cm, and Italy for children shorter than 150 cm.",
    "Luggage usually decides a family's vehicle before the seats do: suitcases, ski bags and pushchairs are counted together, up to 12 pieces in the Standard vehicle, 10 in the Business and 5 in the Premium.",
    "Some of the shortest family transfers in the Alps start at Geneva: Samoëns is 67 km and about 1 h 15, Les Gets 69 km and about 1 h 20, Morzine 77 km and about 1 h 30 on clear roads.",
  ],

  stationsLiees: [
    "les-gets",
    "morzine",
    "samoens",
    "avoriaz",
    "la-plagne",
    "les-deux-alpes",
    "alpe-dhuez",
    "val-thorens",
  ],

  trajetsLies: [
    { airport: "geneva-airport", resort: "les-gets" },
    { airport: "geneva-airport", resort: "morzine" },
    { airport: "geneva-airport", resort: "samoens" },
    { airport: "chambery-savoie-airport", resort: "la-plagne" },
    { airport: "grenoble-isere-airport", resort: "les-deux-alpes" },
    { airport: "grenoble-isere-airport", resort: "alpe-dhuez" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "What do you need to arrange for children on a ski transfer? Three things, all at the moment you book. First, count the children as passengers: the number of people is everyone travelling, babies included, and it decides which vehicles can carry the family. Second, give the number of children and their ages in the booking form, so that the right child and booster seats are fitted before your driver leaves for the airport — they are included at no extra charge. Third, declare the real luggage: suitcases, ski bags and the pushchair, because on a family trip the boot usually fills before the seats do. After that, the most useful decision is the route. A short drive changes the whole day: from Geneva, Samoëns is about 1 h 15, Les Gets about 1 h 20 and Morzine about 1 h 30 on clear roads; from Grenoble, Alpe d'Huez and Les Deux Alpes are both about 1 h 40.",
    },

    { type: "titre2", texte: "What to tell us about your children when you book" },
    {
      type: "paragraphe",
      texte:
        "The booking form asks for the details in the order the driver needs them. The first screen asks how many people are travelling, children included, together with the number of bags and ski bags. That figure is used to show only the vehicles that can seat the family and carry its luggage.",
    },
    {
      type: "paragraphe",
      texte:
        "The details screen then asks how many children are travelling and their ages. The ages field is free text, so write it the way that is clearest — 3 and 7, or 18 months and 4 years. Ages matter because they decide which seat is loaded into the vehicle, and a seat is fitted before the driver sets off, not improvised at the kerb. If a child is particularly tall or small for their age, say so in the note: the right seat depends on size as much as on birthdays.",
    },
    {
      type: "liste",
      items: [
        "Number of passengers: everyone, including babies and children.",
        "Number of children, and on a return, the number on the return journey if it is different.",
        "Children's ages, in the dedicated field.",
        "Anything about a child's size, a seat you are bringing yourself, or a pushchair, in the note.",
        "The mobile number you will actually have switched on when you land.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Our terms put the responsibility for requesting child seats on the person booking, and the ticketing conditions ask for passenger details, including child seats, to be accurate at booking. It is a short list, and it is the difference between a seat that fits and a delay in the car park.",
    },

    { type: "titre2", texte: "Car seats: what the rules expect and what we fit" },
    {
      type: "paragraphe",
      texte:
        "Every country on our routes requires children to travel in a restraint suited to their size, though the thresholds differ. As a rule, France requires an approved child restraint for children under 10; Switzerland for children under 12 who are shorter than 150 cm; Italy for children shorter than 150 cm. A transfer from Geneva to a French resort crosses from one set of rules into another within an hour, so the simplest approach is the one we take: the seat is chosen for the child, not for the border.",
    },
    {
      type: "paragraphe",
      texte:
        "In broad terms there are three stages of seat. Babies travel in a rear-facing infant carrier; toddlers and young children in a seat with its own harness; older children on a booster that positions the vehicle's adult seat belt correctly across the shoulder and hips. Moving to the next stage is decided by the child's weight and height and by the seat manufacturer's limits, which is why the ages you give us matter.",
    },
    {
      type: "liste",
      items: [
        "Child and booster seats are available at no extra charge.",
        "They are fitted before your driver leaves for the airport, based on the ages given at booking.",
        "Every passenger, adult or child, must wear a seat belt throughout the journey.",
        "If you prefer to bring your own seat, mention it in the note so that the driver knows what to expect.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The official road-safety authorities of each country publish the current rules and the approved seat standards. If you are driving yourself at any point during the holiday, they are worth reading before you collect a hire car.",
    },

    { type: "titre2", texte: "Choosing the airport and the drive with children in mind" },
    {
      type: "paragraphe",
      texte:
        "For adults, a long transfer is an inconvenience. For a three-year-old, the difference between an hour and a quarter and three hours is the difference between a nap and a meltdown. When you are choosing a resort and an airport, the drive time deserves as much weight as the flight time.",
    },
    {
      type: "liste",
      items: [
        "Geneva to Samoëns: 67 km, about 1 h 15 on clear roads.",
        "Geneva to Les Gets: 69 km, about 1 h 20.",
        "Geneva to Morzine: 77 km, about 1 h 30.",
        "Chambéry to La Plagne: 121 km, about 1 h 40.",
        "Grenoble to Alpe d'Huez: 106 km, about 1 h 40.",
        "Grenoble to Les Deux Alpes: 110 km, about 1 h 40.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "These are clear-road times, measured on the real route. Snow, chain controls and Saturday changeover traffic add to them, and in high season a Saturday can add up to an hour. Remember too that the shortest drive is not always the best day: Chambéry and Grenoble concentrate their winter flights on weekends, while Geneva flies every day. An earlier landing with a longer drive often beats a late landing with a short one — especially when the late landing means arriving at the chalet after the children's bedtime.",
    },

    { type: "titre2", texte: "Planning the day around naps, meals and the climb" },
    {
      type: "paragraphe",
      texte:
        "The transfer is the last stage of the travel day, and the one that happens when everyone is most tired. A little planning makes it the calm part rather than the difficult one.",
    },
    {
      type: "titre3",
      texte: "Meals",
    },
    {
      type: "paragraphe",
      texte:
        "Eat before the drive rather than during it. Airports are the last easy place to find a proper meal on arrival day, and a child who has eaten lightly before a mountain road travels better than one working through a bag of sweets on the hairpins. Keep water and simple snacks in the cabin, not in a suitcase at the bottom of the boot.",
    },
    {
      type: "titre3",
      texte: "Naps",
    },
    {
      type: "paragraphe",
      texte:
        "Many young children sleep well on the motorway section, which is steady and quiet. If a flight time lets you choose, landing so that the drive falls over a usual nap is often the easiest arrangement for everyone. The climb at the end is less restful, which is one more reason to prefer a short transfer with very small children.",
    },
    {
      type: "titre3",
      texte: "Motion sickness",
    },
    {
      type: "paragraphe",
      texte:
        "The climbs to high resorts are the part to prepare for. The road to Val Thorens, for example, climbs 37 km of hairpins from Moûtiers. Eating lightly beforehand and keeping a window slightly open both help, and so does telling the driver, who can slow the pace through the bends. Keep a bag, wipes and a change of clothes within reach — they are rarely needed, and very welcome when they are.",
    },
    {
      type: "liste",
      items: [
        "A bottle of water per child and one for the adults.",
        "Snacks that do not crumble or melt.",
        "A light layer for each child: vehicles are warm, resorts are not.",
        "Wipes, a spare set of clothes and a bag for accidents.",
        "Headphones and a charged device for the longer runs.",
        "Any medication, in the cabin rather than the boot.",
      ],
    },

    { type: "titre2", texte: "Luggage for a family: the load that decides the vehicle" },
    {
      type: "paragraphe",
      texte:
        "Families travel with more than adults do, and not only because there are more of them. Pushchairs, travel cots, children's ski bags and an extra bag of just-in-case clothing all go in the boot. The booking form counts bags and ski bags together, excluding hand luggage, and each vehicle has a limit in pieces as well as in people.",
    },
    {
      type: "liste",
      items: [
        "Standard — Volkswagen Transporter: up to 8 passengers and 12 pieces of luggage.",
        "Business — Mercedes V-Class: up to 7 passengers and 10 pieces of luggage.",
        "Premium — Mercedes E-Class saloon: up to 4 passengers and 5 pieces of luggage.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Take a family of five — two adults, three children — with four suitcases, three ski bags and a pushchair. That is eight pieces, which the Standard and the Business vehicles both carry and the saloon does not, even before the saloon's limit of four passengers comes into play. In practice, a family with ski equipment almost always travels in the Standard or the Business vehicle.",
    },
    {
      type: "liste",
      items: [
        "Count the pushchair and the travel cot as pieces, and describe them in the note.",
        "Children's skis can often share an adult's ski bag — count the bag, not the pairs.",
        "Boot bags that travel separately are best counted as bags.",
        "Skis, snowboards and boot bags are carried at no extra charge, but must be declared.",
        "If in doubt, round up: the price is per vehicle, so one bag too many costs nothing.",
      ],
    },

    { type: "titre2", texte: "Standard, Business or Premium: choosing the vehicle for a family" },
    {
      type: "paragraphe",
      texte:
        "Because the price is per vehicle rather than per seat, children do not change what you pay; the vehicle category does. The choice therefore comes down to space and comfort.",
    },
    {
      type: "paragraphe",
      texte:
        "The Standard Volkswagen Transporter is the practical choice for larger families and for two families travelling together: eight seats and the most luggage space of the three. The Business Mercedes V-Class takes up to seven people with more comfort and a little less luggage room, which suits a family of four to six with a normal ski load. The Premium Mercedes E-Class saloon is built for up to four people with light luggage; it rarely suits a family with skis.",
    },
    {
      type: "paragraphe",
      texte:
        "The form does part of the choosing for you: vehicles that cannot seat your group or carry its luggage are not shown. If you are travelling with more people than one vehicle takes — two families sharing a chalet, for instance — ask us for a group quote and the party travels in more than one vehicle, arriving together.",
    },

    { type: "titre2", texte: "Landing with children: the arrivals hall and the waiting hour" },
    {
      type: "paragraphe",
      texte:
        "We track your flight, so a delay moves your pick-up automatically and does not change the price. Your driver waits in the arrivals hall with a name sign and helps with the luggage. One hour of waiting is included, counted from the actual landing time if the flight is late and from the booked pick-up time otherwise.",
    },
    {
      type: "paragraphe",
      texte:
        "With children, that hour goes on things that do not happen on an adults' trip: a nappy change, a toilet stop after the flight, a pushchair delivered at the aircraft door or at the oversize belt, a bag of ski boots that comes out last. It usually covers all of them. Beyond the hour, waiting is charged whatever the reason, and the driver calls the mobile number given at booking before any decision is taken — so keep that phone switched on as soon as you land.",
    },

    { type: "titre2", texte: "At the resort: the last few metres" },
    {
      type: "paragraphe",
      texte:
        "Give the exact address of your accommodation in the booking — the chalet, the hotel or the residence — and not just the resort name. With children, it matters more than usual, because the last few metres are where a family's luggage becomes a problem.",
    },
    {
      type: "liste",
      items: [
        "Avoriaz is car-free: the road ends at the car park at the entrance, and the rest of the way is by horse-drawn sledge, snowcat taxi or on foot. Book that last stage with your accommodation, particularly for a late arrival.",
        "La Plagne is several villages, and some — Belle Plagne and Plagne Centre — are designed around pedestrian galleries. The village name changes the drop-off entirely.",
        "Val Thorens has a largely pedestrian centre, so the vehicle stops as close as access allows on the day and the final stretch is on foot.",
        "Morzine, Les Gets and Samoëns are road-served villages where a door-to-door drop-off is the norm.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Many residences lend luggage sledges for the last stretch in pedestrian resorts. It is worth asking your accommodation before you travel rather than on arrival.",
    },

    { type: "titre2", texte: "The journey home" },
    {
      type: "paragraphe",
      texte:
        "The return is booked with the outbound journey, and it is often the harder of the two: tired children, wet gear, and a flight that will not wait. Give us your flight time and we set the pick-up so that you reach the terminal with time in hand rather than at the theoretical minimum.",
    },
    {
      type: "liste",
      items: [
        "If the group is different on the way home, enter the number of people and children for the return: the two journeys can use different vehicles.",
        "Pack the children's travel bag the night before, with the same water, snacks and spare clothes as on the way out.",
        "If your flight time changes, you can ask for a new pick-up time from the link in your confirmation email up to 24 hours before the pick-up; within 24 hours, contact us.",
        "Leave ski boots and wet gloves in a separate bag, so the suitcases stay dry and the boot closes.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "None of this is complicated. Families who give us the ages, the luggage and the address at booking tend to have the uneventful transfer everyone hopes for — which, at the end of a long travel day, is exactly the point.",
    },
  ],

  faq: [
    {
      question: "Are child seats included on your ski transfers?",
      reponse:
        "Yes, at no extra charge. Give the number of children and their ages when you book, and the right child or booster seats are fitted before your driver leaves for the airport.",
    },
    {
      question: "Do babies and children count as passengers?",
      reponse:
        "Yes. The number of passengers is everyone travelling, children and babies included. It decides which vehicles can carry your family: up to 8 in the Standard, 7 in the Business and 4 in the Premium.",
    },
    {
      question: "Do children pay less on a private transfer?",
      reponse:
        "The price is per vehicle rather than per seat, so children do not change it. What changes the price is the vehicle category, the route and the date and time of the journey.",
    },
    {
      question: "Which vehicle suits a family with skis?",
      reponse:
        "Usually the Standard Volkswagen Transporter or the Business Mercedes V-Class. They carry 12 and 10 pieces of luggage respectively, suitcases and ski bags combined; the Premium saloon takes only 5.",
    },
    {
      question: "Can we bring a pushchair on the transfer?",
      reponse:
        "Yes. Count it as a piece of luggage and mention it in the note when you book, so we send a vehicle with room for it alongside the suitcases and ski bags.",
    },
  ],
};
