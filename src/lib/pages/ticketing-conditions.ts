import type { PageFonctionnelle } from "./types";

/**
 * Repris de /ticketing-conditions/ (WordPress, 371 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const ticketingConditions: PageFonctionnelle = {
  slug: "ticketing-conditions",
  metaTitre: "Ticketing conditions",
  metaDescription:
    "Ticketing conditions for Alps Ski Transfers: what your booking covers, how to change it, and the refund rules.",
  h1: "Ticketing conditions",
  chapo: "All transfers must be booked in advance through our website or customer service. A booking is confirmed only upon receipt of full payment and confirmation email with your ticket details.",

  contenu: [
    { type: "titre2", texte: "Booking Confirmation" },
    { type: "titre2", texte: "Ticket Validity" },
    { type: "paragraphe", texte: "Your ticket is valid only for the specific date, time, and route booked. Changes are subject to availability and may incur additional fees." },
    { type: "titre2", texte: "Modification Policy" },
    { type: "paragraphe", texte: "You may request to modify your booking up to 48 hours before departure. Changes within 48 hours are subject to approval and availability and may not be guaranteed." },
    { type: "titre2", texte: "Cancellation Policy" },
    { type: "paragraphe", texte: "Cancellations made more than 24 hours before the scheduled transfer are eligible for a full refund, minus any applicable transaction fees. Cancellations within 24 hours you are subject to a no refund." },
    { type: "titre2", texte: "Waiting time" },
    { type: "paragraphe", texte: "Your driver is waiting for you at the airport. 1 hour of free waiting time, then €140 per additional hour of waiting." },
    { type: "titre2", texte: "Cancellation Policy" },
    { type: "paragraphe", texte: "It is your responsibility to ensure that all passenger details (names, contact information, number of passengers, child seats required) are accurate at the time of booking. Incorrect information may result in refused boarding or service delays." },
    { type: "titre2", texte: "Ticket Presentation" },
    { type: "paragraphe", texte: "Please present your digital or printed ticket to the driver before boarding. Failure to provide proof of booking may result in denied service." },
    { type: "titre2", texte: "Non-Transferable" },
    { type: "paragraphe", texte: "Tickets are non-transferable to other passengers without prior authorisation from Alps Ski Transfer." },
    { type: "titre2", texte: "Delays and Service Changes" },
    { type: "paragraphe", texte: "While we strive for punctuality, adverse weather, traffic conditions, or operational requirements may lead to delays or schedule changes. We are not liable for indirect costs arising from such delays." },
    { type: "titre2", texte: "No-Shows" },
    { type: "paragraphe", texte: "Failure to appear at the agreed pick-up point at the scheduled time may be treated as a no-show. No-shows are non-refundable." },
    { type: "titre2", texte: "Contact Us" },
    { type: "paragraphe", texte: "For any questions about your ticket, modifications, or cancellations, please contact our customer service team promptly. We’re here to help make your journey smooth and stress-free." },
    { type: "titre3", texte: "General questions" },
    { type: "paragraphe", texte: "Have questions about our services? Find all the details about routes, vehicles, schedules, and booking conditions to plan your transfer with complete confidence." },
    { type: "titre3", texte: "Lost luggage" },
    { type: "paragraphe", texte: "Lost an item or luggage? Report it quickly to our team to start the search with your driver or destination staff. We'll help recover your belongings as soon as possible." },
  ],

  faq: [

  ],
};
