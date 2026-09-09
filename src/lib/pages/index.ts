import { airportSkiTransfers } from "./airport-ski-transfers";
import { bookSkiTransferTickets } from "./book-ski-transfer-tickets";
import { contact } from "./contact";
import { cookiePolicyUk } from "./cookie-policy-uk";
import { findYourStop } from "./find-your-stop";
import { generalQuestions } from "./general-questions";
import { help } from "./help";
import { inquiry } from "./inquiry";
import { legalNotice } from "./legal-notice";
import { lostLuggage } from "./lost-luggage";
import { privacy } from "./privacy";
import { privateAirportTransfersToAlpsSkiResort } from "./private-airport-transfers-to-alps-ski-resort";
import { skiResortTransfers } from "./ski-resort-transfers";
import { termsConditionsAlpsSkiTransfers } from "./terms-conditions-alps-ski-transfers";
import { thanksForYourInquiry } from "./thanks-for-your-inquiry";
import { ticketingConditions } from "./ticketing-conditions";
import type { PageFonctionnelle } from "./types";

export type { PageFonctionnelle } from "./types";

/**
 * Les pages fonctionnelles conservées, reprises du WordPress par
 * `npm run migrer:pages`. Leur URL est réputée conservée par le plan de
 * migration : la déplacer créerait une 404 que rien ne rattrape.
 */
export const PAGES: PageFonctionnelle[] = [
  airportSkiTransfers,
  bookSkiTransferTickets,
  contact,
  cookiePolicyUk,
  findYourStop,
  generalQuestions,
  help,
  inquiry,
  legalNotice,
  lostLuggage,
  privacy,
  privateAirportTransfersToAlpsSkiResort,
  skiResortTransfers,
  termsConditionsAlpsSkiTransfers,
  thanksForYourInquiry,
  ticketingConditions,
];

export function pageParSlug(slug: string) {
  return PAGES.find((p) => p.slug === slug);
}
