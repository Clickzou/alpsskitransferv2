import type { Article } from "./types";

/**
 * Retard de vol : ce qui arrive au transfert.
 *
 * **Aucun engagement nouveau n'est pris ici.** Chaque promesse est reprise d'un
 * texte déjà publié par le site :
 *  · suivi du vol et heure d'attente décomptée de l'atterrissage réel —
 *    `src/lib/pages/terms-conditions-alps-ski-transfers.ts` (§ 6) et
 *    `TEXTES_ATTENTE` dans `src/lib/reservation/textes.ts` ;
 *  · appel avant toute décision du chauffeur — mêmes conditions, § 6.2 ;
 *  · modification de l'heure et du numéro de vol à plus de 24 h —
 *    `TEXTES_GESTION` et `ticketing-conditions.ts` ;
 *  · annulation et force majeure — conditions générales, § 3 et § 7 ;
 *  · déroutement : `CONTENUS_AEROPORTS["innsbruck-airport"]` ;
 *  · groupes sur plusieurs vols — `src/data/page-groupes.ts`.
 *
 * Le tarif de l'attente au-delà de l'heure comprise n'est volontairement pas
 * chiffré : il vit dans les conditions, et un montant recopié dans un article
 * est un montant qui finira par différer.
 */
export const flightDelayedSkiTransfer: Article = {
  slug: "flight-delayed-ski-transfer-what-happens",
  titre: "What happens to your ski transfer if your flight is delayed",
  metaTitre: "Flight Delayed? What Happens to Your Ski Transfer",
  metaDescription:
    "Flight tracking, waiting time, cancelled and rebooked flights, diversions and late-night landings: what happens to your ski transfer, and what to do.",
  chapo:
    "Winter flights into the Alps run late more often than summer ones: weather at both ends, de-icing queues, the occasional diversion. Here is exactly what happens to a private ski transfer when your flight does not land on time — what is automatic, what needs a message from you, and the few situations where acting quickly makes all the difference.",
  datePublication: "2026-09-15",
  auteur: "Alps Ski Transfers",
  visuel: { nom: "blog-flight-delayed-ski-transfer", alt: "Snow falling on an airport apron at dusk while an aircraft is de-iced" },

  aRetenir: [
    "A delayed flight costs nothing extra: the flight is tracked by its number and the pick-up moves to the actual landing time.",
    "One hour of waiting is included in every transfer, counted from the actual landing time when the flight is late, and from the booked pick-up time otherwise.",
    "Beyond that included hour, waiting is charged by the quarter-hour whatever the cause — a slow baggage hall or a passport queue included — and the driver calls the number given at booking before any decision.",
    "A rebooked flight can be entered from the “Manage my booking” link up to 24 hours before pick-up; within 24 hours, write or call so the operator can rearrange the journey.",
    "Landing at a different airport makes it a different journey: tell us as soon as you know. A change of route is subject to availability and, where the new journey is longer, to an additional charge.",
  ],

  stationsLiees: ["chamonix", "val-thorens", "meribel", "courchevel", "avoriaz", "zermatt", "selva-val-gardena"],

  trajetsLies: [
    { airport: "geneva-airport", resort: "chamonix" },
    { airport: "geneva-airport", resort: "val-thorens" },
    { airport: "lyon-airport", resort: "meribel" },
    { airport: "chambery-savoie-airport", resort: "courchevel" },
    { airport: "geneva-airport", resort: "avoriaz" },
    { airport: "zurich-airport", resort: "zermatt" },
    { airport: "innsbruck-airport", resort: "selva-val-gardena" },
  ],

  contenu: [
    {
      type: "paragraphe",
      texte:
        "If your flight is delayed, your transfer waits for it, and you do not need to do anything. We track the flight by the number you give at booking, and the pick-up moves to your actual landing time at no extra cost: a flight that lands three hours late is met by the same driver, at the same price. One hour of waiting is included in every transfer, and when the flight is late that hour starts from the real landing time, not from the time you booked. What does need a message from you is anything the tracking cannot see: a cancelled flight and a new one the next day, a diversion to a different airport, or a long wait at baggage reclaim once you are on the ground. Tell us early, by the “Manage my booking” link or by phone: the earlier we know, the easier the transfer is to rearrange. The rest of this article goes through each case in detail.",
    },
    {
      type: "paragraphe",
      texte:
        "Nothing here is a special promise made for an article. It is how the service works, and each point is set out in our terms and ticketing conditions; this is simply the version you can read in five minutes at a departure gate.",
    },

    { type: "titre2", texte: "How does flight tracking work, and what does it need from you?" },
    {
      type: "paragraphe",
      texte:
        "Flight tracking means that your driver follows the aircraft rather than the timetable. The flight number you enter when you book is the key: with it, the driver can see a late departure, a long taxi, a holding pattern or an early arrival, and set off for the airport accordingly. Without it, there is nothing to follow, and the driver can only work to the pick-up time on your booking.",
    },
    {
      type: "liste",
      items: [
        "Give the flight number at booking, in the format printed on your boarding pass — two letters or a letter and a digit, then the number.",
        "If you entered it wrongly, or your airline changes it, correct it from the “Manage my booking” link in your confirmation email. A corrected flight number takes effect straight away.",
        "Check which flight is the last one. On a connecting journey, the number that matters is the flight that lands at the Alpine airport, not the first leg from home.",
        "Keep the phone number you gave at booking switched on and reachable when you land. Tracking tells us when the aircraft touches down; only you can tell us when you are through the doors.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "The practical result is that a delay is invisible to you. You do not need to message the driver from the gate to say you are running late, and you do not need to worry that a transfer booked for two o’clock will have left by the time a three-hour delay lands you at five. The driver meets you in the arrivals hall with your name, whatever time you actually land.",
    },

    { type: "titre2", texte: "How much waiting time is included?" },
    {
      type: "paragraphe",
      texte:
        "One hour of waiting is included in every transfer. The rule for when that hour starts is the part worth reading carefully, because it is what makes a long flight delay free.",
    },
    {
      type: "liste",
      items: [
        "If your flight is delayed, the hour starts from the actual landing time. The delay itself is not your doing, and it costs you nothing however long it is.",
        "If your flight is on time, the hour starts from the pick-up time on your booking.",
        "Beyond that included hour, waiting is charged by the quarter-hour started, at the rate set out in our terms and ticketing conditions.",
        "That charge applies whatever the reason for the extra wait: a slow baggage hall, a passport queue, or a passenger late to the meeting point.",
        "Your driver will not leave without telling you. We call the number given at booking before any decision is taken.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "An hour after landing is comfortable at most Alpine airports on most days. It gets tighter on a February Saturday, when the charter flights arrive in waves and baggage halls fill faster than they empty — at Geneva, and at small terminals like Chambéry where everyone comes through a single exit. It is also tighter for travellers from outside the Schengen area, who have passport control to clear before baggage reclaim.",
    },

    { type: "titre2", texte: "What counts as a delay, and what does not?" },
    {
      type: "paragraphe",
      texte:
        "The distinction is simple once you see it: anything that happens before the wheels touch the runway is covered by tracking and costs nothing; anything that happens after landing counts towards the included hour.",
    },
    {
      type: "liste",
      items: [
        "A late departure, a long holding pattern, a slot delay, de-icing at the departure airport: the flight is late, the hour starts when it lands.",
        "A long wait for a stand or for the aircraft doors to open: it happens after touchdown, so it comes out of the hour — but it is rarely more than a few minutes.",
        "Baggage reclaim, passport control, a queue at the ski-bag counter: these count towards the hour.",
        "Reporting a missing suitcase at the lost-luggage desk: this counts towards the hour, and it can take a while on a busy day.",
        "Stopping for coffee or a cash machine before coming out: this counts too, and it is the one you control.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If something after landing is going to take longer than expected — the belt has stopped, a bag has not come out, the passport hall is full — send a message or call as soon as you know. It does not change the rule, but it lets the driver plan rather than guess, and it is always better than silence. For a missing bag, report it to the airline’s desk before leaving the baggage hall, since that is usually the only place the claim can be started.",
    },

    { type: "titre2", texte: "My flight was cancelled and I have been rebooked. What now?" },
    {
      type: "paragraphe",
      texte:
        "A cancellation is the one case tracking cannot handle on its own: the flight on your booking no longer exists, and the new one may be hours or a day later. What you do depends on how far away the pick-up is.",
    },
    {
      type: "titre3",
      texte: "More than 24 hours before the pick-up",
    },
    {
      type: "paragraphe",
      texte:
        "Open the “Manage my booking” link in your confirmation email. From there you can ask for a new pick-up time at the airport, and for your return, and enter the new flight number. The flight number is updated immediately; the new pick-up time applies once the operator has confirmed it by email, and until then your booking stands as it was. The vehicle, the route and the number of passengers cannot be changed from that page, because each of them changes the price — those go through us directly.",
    },
    {
      type: "titre3",
      texte: "Less than 24 hours before the pick-up",
    },
    {
      type: "paragraphe",
      texte:
        "At that notice the change is not made from the website, because your driver’s day is already built around the original journey. Use the same page to write what has happened — a new landing time, a cancelled flight — and the operator has it straight away. Calling is faster. Changes this close to the pick-up are subject to availability and cannot be guaranteed, which is exactly why a message sent the moment the airline rebooks you is worth more than one sent from the new departure gate.",
    },
    {
      type: "paragraphe",
      texte:
        "One point in the ticketing conditions is worth knowing before you decide what to ask for. A cancellation made more than 24 hours before the scheduled transfer is refunded in full, minus any transaction fees; a cancellation made within 24 hours is not refunded. If your airline moves you to a flight the next day, asking for the transfer to be moved is usually the better request than cancelling it.",
    },

    { type: "titre2", texte: "What if my flight lands at a different airport?" },
    {
      type: "paragraphe",
      texte:
        "Diversions happen in the Alps more than elsewhere. Innsbruck is the clearest example: its approach runs between mountains, the airport closes more often than most for wind or poor visibility, and flights are sent on to Munich or Salzburg. Fog, snow clearance or a runway closure can do the same at other airports. Airlines also sometimes rebook a cancelled passenger into a neighbouring airport rather than the original one.",
    },
    {
      type: "paragraphe",
      texte:
        "A different airport is a different journey, and tracking alone does not solve it: the driver is at the airport on your booking, and you are somewhere else. Tell us as soon as you know where you will actually land. We work to rearrange the transfer from that airport rather than leaving you there. As our terms say for any change of route, it is subject to availability, and to an additional charge where one applies — a longer drive from a more distant airport is a longer journey.",
    },
    {
      type: "paragraphe",
      texte:
        "The difference can be large. For Chamonix, Geneva is 1 h 25 away on a clear road, and Lyon 2 h 30. For Méribel, Chambéry is 1 h 21 away and Lyon 2 h 13. For Val Thorens, the drive is 2 h 44 from Geneva against 1 h 40 from Chambéry. A diversion adds time to your arrival as well as to the driver’s day, and the sooner we hear about it, the more options there are.",
    },
    {
      type: "liste",
      items: [
        "If you are told on board where you are diverting to, send a message as soon as you have signal after landing.",
        "Ask the airline whether it is putting on a coach back to the original airport. If it is, the simplest arrangement is often to keep the transfer there and move the time.",
        "If you are staying at the new airport, tell us which terminal and which exit you will use.",
        "Keep your booking reference to hand: it is the quickest way for us to find your journey.",
      ],
    },

    { type: "titre2", texte: "Arriving late at night: what changes?" },
    {
      type: "paragraphe",
      texte:
        "For the transfer itself, very little. The flight is tracked at midnight as it is at midday, and the driver is waiting in the arrivals hall whatever time you land. What changes after dark is everything at the other end of the journey, and that is worth thinking about before you fly rather than on the motorway.",
    },
    {
      type: "liste",
      items: [
        "Your accommodation. Tell the chalet, hotel or agency your expected arrival time, and update it if the flight is late: many residences close their reception in the evening and leave keys in a safe with a code.",
        "The address. Give us the exact address, not only the name of the resort. At night, with luggage and tired children, the difference between two villages of the same resort matters more than at any other time.",
        "The car-free resorts. Where the road stops before the village, the last stage has a timetable. Avoriaz ends at the car park, where the final leg is by sledge or snowcat — book it with your accommodation for a late arrival. Zermatt ends at Täsch, where the shuttle train runs into the evening: check the last one if your flight is late.",
        "The road. Clear-road times assume a clear road. A late landing after a day of snowfall may mean a slower climb; our vehicles carry winter tyres and chains, but they do not make the snow go away.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "If you know in advance that your flight lands very late, or arrives the night before your check-in, say so when you book. Unusual timings — a late-night landing, a flight that arrives the day before check-in — are among the things you can ask for, and they are much easier to organise ahead of time than to improvise on the evening.",
    },

    { type: "titre2", texte: "What if my flight home is delayed?" },
    {
      type: "paragraphe",
      texte:
        "The return journey works the other way round. The pick-up in resort is set from your flight’s departure time, with a margin for the road down and for check-in. Tracking cannot move it for you, because a delay announced at the airport is no use to a driver who needs to collect you from a chalet two hours earlier.",
    },
    {
      type: "liste",
      items: [
        "If your airline announces a new departure time more than 24 hours ahead, ask for a new pick-up time from “Manage my booking”.",
        "If the delay is announced on the day, think twice before asking to leave later. Airlines often recover time, and a delayed flight can be brought forward again; arriving early at the airport is a nuisance, missing a flight is not.",
        "If your flight home is cancelled outright, call us: your booking and the next available flight decide what is possible.",
        "On a Saturday, the road down the valley is as busy as the road up. The margin in the pick-up time is there for a reason.",
      ],
    },

    { type: "titre2", texte: "Travelling as a group on several flights?" },
    {
      type: "paragraphe",
      texte:
        "Large parties rarely land together. A family arrives from London, friends from Amsterdam, a couple from Dublin, all heading for the same chalet on the same afternoon. For group bookings, each vehicle is matched to its own flight, so a delay on one arrival does not hold up the others: the passengers who landed on time leave on time, and the vehicle waiting for the late flight follows it.",
    },
    {
      type: "paragraphe",
      texte:
        "Above eight passengers, a party travels in several vehicles anyway — the largest vehicle in our range, the Standard Transporter, takes eight — and a group request can coordinate pick-ups from more than one airport or terminal to a single drop-off. If one of your flights is known to be tight, tell us when you enquire.",
    },

    { type: "titre2", texte: "When the road, not the flight, is the problem" },
    {
      type: "paragraphe",
      texte:
        "Occasionally the delay is on the ground. Heavy snowfall, an avalanche-control closure on a resort access road or a closed pass can hold up a transfer however well the flight has behaved. Val Thorens closes its access road briefly for avalanche control after heavy snow; the Col du Lautaret towards Serre Chevalier closes for a few hours at a time. These closures are rare, announced, and temporary.",
    },
    {
      type: "paragraphe",
      texte:
        "Our terms are plain about what happens then. In extreme weather or when a road is closed, a transfer may be delayed or rescheduled; you are told as soon as possible and offered an alternative transfer or a full refund. Our drivers pick the route on the day from the real state of the roads, and the vehicles carry winter tyres and chains, as the law requires in Savoie and Haute-Savoie from 1 November to 31 March.",
    },

    { type: "titre2", texte: "A checklist before you fly" },
    {
      type: "liste",
      items: [
        "Your flight number is on the booking, and it is the number of the flight that lands in the Alps.",
        "The phone number on the booking is the one you will have with you, switched on, with roaming enabled.",
        "Your confirmation email is saved offline, with the “Manage my booking” link and our phone number: +33 7 69 78 91 89.",
        "Your accommodation knows your arrival time and how you will get the keys if it is late.",
        "If you are staying in a car-free resort, you know the last train, cable car or sledge.",
        "If your flight is cancelled or diverted, you message us first and queue at the airline desk second — the transfer can be rearranged while you wait.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Most delays never need any of this. The flight is late, the driver knows, and you walk out into the arrivals hall to find your name on a sign. The list is for the other days — the ones where a two-minute message sent early saves an hour at the other end.",
    },
  ],

  faq: [
    {
      question: "Will my driver wait if my flight is delayed?",
      reponse:
        "Yes. We track your flight number and move the pick-up to your actual landing time, at no extra cost. One hour of waiting is included, counted from the actual landing.",
    },
    {
      question: "Do I pay extra if my flight is several hours late?",
      reponse:
        "No. The delay itself costs nothing, however long. Waiting is only charged beyond the included hour after landing, for example if baggage reclaim or passport control takes a very long time.",
    },
    {
      question: "My flight was cancelled and moved to the next day. What should I do?",
      reponse:
        "More than 24 hours before pick-up, request a new time and enter the new flight number from the “Manage my booking” link. Within 24 hours, write from that page or call us: changes are subject to availability.",
    },
    {
      question: "What happens if my flight is diverted to another airport?",
      reponse:
        "Tell us as soon as you know where you will land, and we work to rearrange the transfer from there. A change of route is subject to availability, and to an additional charge if the new journey is longer.",
    },
    {
      question: "Will the driver leave if we take a long time to come out?",
      reponse:
        "Not without contacting you. Beyond the included hour, waiting is charged by the quarter-hour, and we call the phone number given at booking before any decision is taken.",
    },
    {
      question: "Does flight tracking work for late-night arrivals?",
      reponse:
        "Yes. The flight is tracked whatever the hour, and your driver waits in the arrivals hall. Tell your accommodation your arrival time too, as many receptions close in the evening.",
    },
  ],
};
