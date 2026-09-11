import type { PageFonctionnelle } from "./types";

/**
 * Repris de /ticketing-conditions/ (WordPress, 371 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * Corrigé à la main le 11 septembre 2026, sur décision de JC — le texte
 * contredisait le site et les conditions générales :
 * - modification : 48 h annoncées, alors que le lien « gérer ma réservation »
 *   permet de demander un nouvel horaire jusqu'à 24 h avant chaque prise en
 *   charge, appliqué une fois validé par l'exploitant ;
 * - attente : 140 € de l'heure, contre 100 € dans les conditions générales ;
 * - un « ticket » à présenter, que le moteur n'émet pas : c'est la référence ;
 * - la reprise avait glissé le texte de « Booking Confirmation » dans le chapeau
 *   et titré deux sections « Cancellation Policy ».
 * La politique d'annulation — plus de 24 h : remboursement, moins les frais —
 * est celle-ci, et les conditions générales ont été alignées sur elle.
 */
export const ticketingConditions: PageFonctionnelle = {
  slug: "ticketing-conditions",
  metaTitre: "Ticketing conditions",
  metaDescription:
    "Ticketing conditions for Alps Ski Transfers: what your booking covers, how to change it, and the refund rules.",
  h1: "Ticketing conditions",
  chapo: "What your booking covers, how to change it, and what happens if you cancel.",

  contenu: [
    { type: "titre2", texte: "Booking Confirmation" },
    { type: "paragraphe", texte: "All transfers must be booked in advance through our website or customer service. A booking is confirmed only once full payment has been received and you have received the confirmation email with your booking reference." },
    { type: "titre2", texte: "Booking Validity" },
    { type: "paragraphe", texte: "Your booking is valid only for the specific date, time and route booked. A change of vehicle, route or number of passengers changes the price: it is subject to availability and may incur additional fees." },
    { type: "titre2", texte: "Modification Policy" },
    { type: "paragraphe", texte: "You can ask for a new pick-up time, up to 24 hours before each pick-up, from the “Manage my booking” link in your confirmation email. The new time applies once we have confirmed it by email; until then, your booking stands as booked. Your flight number can be corrected there directly. Within 24 hours, send us a message from the same page, or call us: changes are subject to availability and cannot be guaranteed." },
    { type: "titre2", texte: "Cancellation Policy" },
    { type: "paragraphe", texte: "Cancellations made more than 24 hours before the scheduled transfer are eligible for a full refund, minus any applicable transaction fees. Cancellations made within 24 hours of the scheduled transfer are not refunded." },
    { type: "titre2", texte: "Waiting time" },
    { type: "paragraphe", texte: "Your driver is waiting for you at the airport. One hour of waiting is included; beyond that, waiting is charged €25 per quarter of an hour started, or €100 an hour." },
    { type: "titre2", texte: "Passenger Information" },
    { type: "paragraphe", texte: "It is your responsibility to ensure that all passenger details (names, contact information, number of passengers, child seats required) are accurate at the time of booking. Incorrect information may result in refused boarding or service delays." },
    { type: "titre2", texte: "Proof of Booking" },
    { type: "paragraphe", texte: "Please have your booking reference or confirmation email ready — on your phone is fine — when you meet your driver. Failure to provide proof of booking may result in denied service." },
    { type: "titre2", texte: "Non-Transferable" },
    { type: "paragraphe", texte: "Bookings are non-transferable to other passengers without prior authorisation from Alps Ski Transfers." },
    { type: "titre2", texte: "Delays and Service Changes" },
    { type: "paragraphe", texte: "While we strive for punctuality, adverse weather, traffic conditions, or operational requirements may lead to delays or schedule changes. We are not liable for indirect costs arising from such delays." },
    { type: "titre2", texte: "No-Shows" },
    { type: "paragraphe", texte: "Failure to appear at the agreed pick-up point at the scheduled time may be treated as a no-show. No-shows are non-refundable." },
    { type: "titre2", texte: "Contact Us" },
    { type: "paragraphe", texte: "For any questions about your booking, modifications, or cancellations, please contact our customer service team promptly. We’re here to help make your journey smooth and stress-free." },
    { type: "titre3", texte: "General questions" },
    { type: "paragraphe", texte: "Have questions about our services? Find all the details about routes, vehicles, schedules, and booking conditions to plan your transfer with complete confidence." },
    { type: "titre3", texte: "Lost luggage" },
    { type: "paragraphe", texte: "Lost an item or luggage? Report it quickly to our team to start the search with your driver or destination staff. We'll help recover your belongings as soon as possible." },
  ],

  faq: [

  ],
};
