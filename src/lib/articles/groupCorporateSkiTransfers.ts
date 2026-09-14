import type { Article } from "./types";

/**
 * Transferts de groupes et d'entreprises — article B2B.
 *
 * Il sert la même intention que `/inquiry/` (« group ski transfers ») sans la
 * concurrencer : la page vend la demande de devis, l'article explique comment
 * se dimensionne un convoi. Ce que l'article promet vient de
 * `data/page-groupes.ts` et `data/page-transferts-prives.ts` — véhicules qui
 * partent ensemble, chaque véhicule calé sur son vol, facturation à
 * l'entreprise, sièges enfants en nombre.
 *
 * Capacités : `CAPACITE` et `CAPACITE_BAGAGES` (`lib/reservation/devis.ts`),
 * **encore à confirmer par le client** — si elles changent, refaire les deux
 * exemples chiffrés. Durées : `src/data/distances.ts`.
 */
export const groupCorporateSkiTransfers: Article = {
  slug: "group-and-corporate-ski-transfers",
  titre: "Group and corporate ski transfers: how to move a large party to the Alps",
  metaTitre: "Group & Corporate Ski Transfers: Planning a Convoy",
  metaDescription:
    "Seminars, ski clubs, large families: vehicle capacities, luggage limits, vehicles in convoy and arrivals on different flights, planned as one journey.",
  chapo:
    "Moving twelve, twenty or forty people from an airport to a ski resort is not a larger version of a family transfer. The seats run out, then the boot space runs out before the seats do, then the flights turn out to land three hours apart. This is how a group transfer is actually sized and timed — for company seminars, ski clubs and large families alike — and what to send so that the quote reflects the trip you are really planning.",
  visuel: {
    nom: "aeroport-geneve",
    alt: "Group of travellers arriving in an airport terminal at the start of a ski trip",
  },
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",
  // Brouillon : l’analyse SERP du 14/09/2026 (docs/concurrence/) montre que ce format ne se classe pas face aux pages concernées — gardé, non publié.
  brouillon: true,

  aRetenir: [
    "Our largest vehicle, the Standard Volkswagen Transporter, takes up to 8 passengers; the Business Mercedes V-Class takes 7 and the Premium Mercedes E-Class 4. Above eight, a party travels in several vehicles.",
    "Luggage often decides the number of vehicles before seats do: our booking engine plans a Standard vehicle for up to 12 pieces, suitcases and ski bags counted together, so eight skiers with a suitcase and a ski bag each need more than one vehicle.",
    "A group transfer is quoted as one journey: several vehicles leaving together or matched to different flights, one quote, one confirmation, with passenger names and flight numbers able to follow later.",
    "Each vehicle is matched to its own flight, so a delay on one arrival does not hold up the rest of the group.",
    "Prices are per vehicle, not per person, so the cost of a group transfer depends on the vehicles needed, the route and the pick-up times — not on the head count inside each vehicle.",
  ],

  stationsLiees: ["meribel", "courchevel", "val-thorens", "la-plagne", "alpe-dhuez", "morzine"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "meribel" },
    { airport: "chambery-savoie-airport", resort: "courchevel" },
    { airport: "lyon-airport", resort: "val-thorens" },
    { airport: "geneva-airport", resort: "la-plagne" },
    { airport: "grenoble-isere-airport", resort: "alpe-dhuez" },
    { airport: "geneva-airport", resort: "morzine" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "A group ski transfer works as a convoy: several private vehicles, sized for both passengers and luggage, either leaving the airport together or each matched to a different flight, and quoted as a single journey. Our largest vehicle takes up to eight passengers, so a party of more than eight needs at least two — and often more, because in winter the luggage space runs out before the seats do. The number of vehicles depends on three things: how many people, how much luggage and equipment, and how many different arrival times there are. Company seminars, ski clubs and large families all fit this pattern, with different priorities: invoicing and punctuality for the first, equipment for the second, child seats and flexibility for the third. Send the numbers, the dates, the airports, the flights you know and the accommodation address, and the quote is built around them rather than around a booking form.",
    },

    { type: "titre2", texte: "How many people fit in one vehicle?" },
    {
      type: "paragraphe",
      texte:
        "We run three vehicle categories. Each is priced per vehicle, and each has two limits: passengers and luggage.",
    },
    {
      type: "liste",
      items: [
        "Standard — Volkswagen Transporter: up to 8 passengers, planned for up to 12 pieces of luggage.",
        "Business — Mercedes V-Class or Vito Tourer: up to 7 passengers, planned for up to 10 pieces.",
        "Premium — Mercedes E-Class saloon: up to 4 passengers, planned for up to 5 pieces.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "A piece means a suitcase, a holdall or a ski or board bag; hand luggage aside. These are the figures our booking engine uses to decide whether a load fits, and they are there to avoid the most common failure in this business: a vehicle that seats the party but cannot take its equipment.",
    },
    {
      type: "paragraphe",
      texte:
        "For a group, the practical consequence is that the Standard Transporter does most of the work, the Business category is the choice when comfort matters for a smaller sub-group, and the Premium saloon is useful for two to four people who travel separately from the main party — a management team, grandparents, a group leader arriving on another flight.",
    },

    { type: "titre2", texte: "Luggage decides before seats do" },
    {
      type: "paragraphe",
      texte:
        "On paper, sixteen people fit in two Transporters. In February they rarely do, and the arithmetic explains why.",
    },
    {
      type: "paragraphe",
      texte:
        "Take a party of eight skiers, each with one suitcase and one ski bag. That is sixteen pieces, against twelve for one Standard vehicle. Eight seats, but not eight people's equipment: the load needs a second vehicle, for instance a Standard and a Premium saloon together.",
    },
    {
      type: "paragraphe",
      texte:
        "Scale it up to a club of fourteen with the same kit — fourteen suitcases and fourteen ski bags, twenty-eight pieces. Two Standard vehicles give sixteen seats but twenty-four pieces of space, which is not enough. Two Standard vehicles and a Business give twenty-three seats and thirty-four pieces, which is. The third vehicle is there for the skis, not for the people.",
    },
    {
      type: "paragraphe",
      texte:
        "That is why a group quote starts with a luggage count as well as a head count. Tell us, as precisely as you can:",
    },
    {
      type: "liste",
      items: [
        "Suitcases and holdalls, per person or in total.",
        "Ski bags and snowboard bags, including double bags that hold two pairs.",
        "Boot bags, if they travel separately rather than inside a suitcase.",
        "Anything oversized: race skis, splitboards, touring kit, airbag packs, a pushchair.",
        "Equipment that belongs to the group rather than a person: team kit or event material.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Skis, boards and boot bags are carried at no extra charge. The count only decides the vehicles, and a group that under-declares on the form is the group that finds out at the kerb.",
    },

    { type: "titre2", texte: "Groups over eight: travelling in convoy" },
    {
      type: "paragraphe",
      texte:
        "Above eight passengers, or above what one vehicle's boot holds, the party travels in several vehicles. When everyone lands on the same flight, the simplest plan is a convoy: the vehicles meet the group together in the arrivals hall, load together and leave together, with a single arrival time at the resort.",
    },
    {
      type: "paragraphe",
      texte:
        "Leaving together matters more than it sounds. A group that arrives in instalments spends the first hour at the resort waiting for the rest of its keys, its luggage and its members. With the vehicles departing at the same time on the same route, the party arrives within a few minutes of itself, and the check-in happens once. It also keeps the group's luggage together: when the skis for one sub-group are loaded into another vehicle, it is far better that both vehicles pull up outside the same door at the same moment.",
    },
    {
      type: "paragraphe",
      texte:
        "The road does not change for a convoy. From Geneva, Morzine is 77 km and about 1 h 29 on clear roads, Méribel 142 km and about 2 h 25, La Plagne 160 km and about 2 h 44. From Chambéry, Courchevel is 110 km and about 1 h 28. A Saturday in February adds up to an hour on the Tarentaise and on the climb to the Portes du Soleil, for every vehicle at once — which is one more reason for a group with a choice of dates to travel midweek.",
    },

    { type: "titre2", texte: "Arrivals on different flights" },
    {
      type: "paragraphe",
      texte:
        "Few groups land on a single flight. A seminar draws people from several cities; a ski club books whatever fares it finds; a family reunion comes from three countries. The transfer plan has to absorb that, and there are two ways to do it.",
    },
    {
      type: "liste",
      items: [
        "One vehicle per arrival wave: each vehicle is matched to a flight or to a cluster of flights landing close together, and leaves when its passengers are through. Nobody waits for a flight that lands hours later.",
        "Grouped departures: arrivals close in time are gathered into one departure, with a short wait agreed in advance, to reduce the number of vehicles.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "In both cases we track every flight. Each vehicle is matched to its own flight, so a delay on one arrival moves that vehicle's pick-up and leaves the others untouched. A delayed landing does not change the price.",
    },
    {
      type: "paragraphe",
      texte:
        "Groups can also arrive through different airports. Pick-ups from more than one airport or terminal can be coordinated to a single drop-off. For Méribel, for instance, Chambéry is about 1 h 21 away, Lyon about 2 h 13 and Geneva about 2 h 25 on clear roads; timing each vehicle to its landing lets a party from three airports reach the chalet on the same afternoon.",
    },

    { type: "titre2", texte: "Corporate trips and seminars" },
    {
      type: "paragraphe",
      texte:
        "A company trip has different constraints from a holiday. The participants are often not skiers first, the schedule has a programme attached, and somebody in the office needs one invoice rather than thirty receipts.",
    },
    {
      type: "liste",
      items: [
        "One contact, one quote and one confirmation for the whole party, with passenger names and flight numbers able to follow once travel is booked.",
        "Invoicing to the company or to the agency organising the event, rather than to each traveller.",
        "Journeys that are not airport runs: a high-speed train station, a city centre, a transfer between two resorts.",
        "Unusual timings: a pre-dawn departure for an early flight home, a late-night landing, participants arriving the day before the programme starts.",
        "Midweek travel, which is when seminars usually run and when the roads to the resorts are clear.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "For an event planner, the most useful thing to settle early is the arrival window: the earliest and latest landings the programme can absorb. The vehicles are planned around that window, and the programme can start when the last vehicle arrives rather than when someone guesses it will.",
    },

    { type: "titre2", texte: "Travel agencies, chalet companies and concierges" },
    {
      type: "paragraphe",
      texte:
        "Some groups are not groups at all until they reach the accommodation. A chalet company may have guests arriving from different airports on different flights, all needing to reach the same chalet on the same afternoon; a travel agency may book a dozen separate parties into the same resort on the same Saturday. For the people organising those arrivals, the transfer is one more thing to coordinate, and it helps when it arrives already coordinated.",
    },
    {
      type: "liste",
      items: [
        "Arrivals coordinated around your check-in time rather than around each guest's booking.",
        "A named contact rather than a booking form, and one invoice to the agency or company.",
        "One quote for a whole season if you want it, and recurring slots held for changeover Saturdays.",
        "Guests arriving from more than one airport or terminal, coordinated to a single drop-off.",
        "Passenger names and flight numbers able to follow the confirmation, once your guests have booked their travel.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The earlier the season's pattern is known — which Saturdays, roughly how many guests, which airports — the easier it is to hold vehicles for the busiest mornings, when they are hardest to find.",
    },

    { type: "titre2", texte: "Ski clubs, sports teams and friends' trips" },
    {
      type: "paragraphe",
      texte:
        "Clubs and teams travel with more equipment per person than any other kind of group, and it is rarely standard. Race skis in long bags, several pairs per athlete, boards, touring kit and team equipment all need declaring when you ask for a quote, because they change the vehicle mix more than the head count does.",
    },
    {
      type: "paragraphe",
      texte:
        "Two practical points help. First, give a total piece count rather than a per-person estimate, and say which items are longer than a standard ski bag. Second, if the group leader or coaches travel on a different flight from the athletes, say so — a Premium saloon or a Business vehicle for them is often simpler than holding a minibus at the airport.",
    },
    {
      type: "paragraphe",
      texte:
        "For groups of friends, the classic problem is the late booker: the party grows from eight to eleven a month before departure. Tell us as soon as numbers change. Adding a vehicle is straightforward when it is planned; finding one on a February Saturday morning is not.",
    },

    { type: "titre2", texte: "Large families and multi-generation groups" },
    {
      type: "paragraphe",
      texte:
        "A family of ten is a group transfer with children in it, and the children set the requirements. French law requires an approved restraint for every child under 10, and seats must match the ages and sizes of the children travelling.",
    },
    {
      type: "liste",
      items: [
        "Child and booster seats are provided in quantity at no extra charge, and fitted before the drivers leave for the airport. Give the ages of every child when you ask for a quote.",
        "Pushchairs and cots count as luggage: declare them so the vehicle mix allows for them.",
        "A stop on the way — a supermarket before the resort, a break on a long drive — can be arranged when you book, for one vehicle or for the whole convoy.",
        "Splitting the family by vehicle can make the journey easier: the young children and their parents in one vehicle, the teenagers and the skis in another.",
      ],
    },

    { type: "titre2", texte: "The return journey is planned separately" },
    {
      type: "paragraphe",
      texte:
        "Groups rarely leave the way they arrived. Some people stay on, some leave early, the flights home are spread across the day. Each leg of a transfer is planned and priced on its own terms, with its own date, its own passenger numbers and its own vehicles, so a group that arrives in three vehicles and leaves in two pays for exactly that.",
    },
    {
      type: "paragraphe",
      texte:
        "Departure times are set from each flight, with a margin for the road. On a February Saturday, when the Tarentaise and the valley roads are at their slowest, that margin includes the changeover traffic. For a large group, it is worth agreeing the departure times a few days before the end of the stay, once everyone's flights are confirmed.",
    },

    { type: "titre2", texte: "How a group quote is built" },
    {
      type: "paragraphe",
      texte:
        "Every vehicle is priced on the same basis as a single transfer: the vehicle category, the road distance of the route, how hard the resort is to reach, and the day and time of the pick-up. The price is per vehicle, tolls included, and does not change with the number of people inside it. The group quote is the sum of the vehicles the trip needs, set out as one journey.",
    },
    {
      type: "paragraphe",
      texte:
        "No online form can size a convoy sensibly, so group quotes are prepared by hand. For a single vehicle on a standard airport run, the booking form is quicker and gives a price straight away; for anything larger, send the outline below and the details can follow.",
    },
    {
      type: "liste",
      items: [
        "Number of passengers, with the ages of any children.",
        "Travel dates for the outbound and return journeys.",
        "Arrival and departure airports, and flight numbers or landing times if you have them.",
        "Accommodation address, or addresses if the group is split.",
        "Luggage and equipment count, including anything oversized.",
        "Who is paying: each traveller, the company or an agency.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Book as early as your numbers allow. Vehicles run out before accommodation does in February, and a group needs several of them at the same time on the same morning.",
    },
  ],

  faq: [
    {
      question: "How many people can travel in one ski transfer vehicle?",
      reponse:
        "Up to eight in our Standard Volkswagen Transporter, seven in the Business Mercedes V-Class and four in the Premium Mercedes E-Class. Luggage is the other limit: the Standard vehicle is planned for up to 12 pieces, suitcases and ski bags counted together. Larger parties travel in several vehicles.",
    },
    {
      question: "How do you organise a ski transfer for a group of more than eight?",
      reponse:
        "The group travels in several vehicles, quoted as one journey. If everyone is on the same flight, the vehicles leave together and arrive together. If the group lands on different flights, each vehicle is matched to its own flight. Send the numbers, dates, airports, luggage and address for a quote.",
    },
    {
      question: "What happens if part of the group's flight is delayed?",
      reponse:
        "Each vehicle is matched to its own flight, and we track every flight. A delay moves the pick-up for that vehicle only, so the rest of the group is not held up, and the delay does not change the price.",
    },
    {
      question: "Can a company be invoiced for a corporate ski transfer?",
      reponse:
        "Yes. Corporate trips, seminars and agency bookings can be invoiced to the company or agency rather than to each traveller, with one contact, one quote and one confirmation for the whole party. Passenger names and flight numbers can be sent once travel is booked.",
    },
    {
      question: "Are ski bags and child seats extra for groups?",
      reponse:
        "No. Skis, snowboards and boot bags are carried at no extra charge, and child and booster seats are provided free, in quantity, and fitted before departure. Declaring them matters because they decide how many vehicles the group needs.",
    },
  ],
};
