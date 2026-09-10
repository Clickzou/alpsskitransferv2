import type { PageFonctionnelle } from "./types";

/**
 * Repris de /terms-conditions-alps-ski-transfers/ (WordPress, 736 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 */
export const termsConditionsAlpsSkiTransfers: PageFonctionnelle = {
  slug: "terms-conditions-alps-ski-transfers",
  metaTitre: "Terms & Conditions – Alps Ski Transfers",
  metaDescription:
    "The terms that apply to every Alps Ski Transfers booking: service, payment, changes, cancellations and liability.",
  h1: "Terms & Conditions – Alps Ski Transfers",
  chapo: "Welcome to Alps Ski Transfers. These Terms & Conditions govern the use of our website https://alpsskitransfers.com/ and our ski transfer services. By booking a private ski transfer with us, you agree to these terms. Please read them carefully.",

  contenu: [
    { type: "titre2", texte: "1. Introduction" },
    { type: "titre2", texte: "2. Booking & Payment" },
    { type: "titre3", texte: "2.1 Booking Process" },
    { type: "liste", items: ["All ski resort transfers must be booked online through our website.", "Upon completion of the booking, you will receive a confirmation email with your transfer details.", "It is the customer's responsibility to verify all details, including pick-up time, destination, and flight details."] },
    { type: "titre3", texte: "2.2 Payment Terms" },
    { type: "liste", items: ["Full payment is required at the time of booking.", "Payments can be made using credit/debit cards or other accepted payment methods.", "Prices are quoted in EUR (€) and include all applicable taxes."] },
    { type: "titre3", texte: "2.3 Changes & Amendments" },
    { type: "liste", items: ["Any changes to a booking must be requested at least 48 hours before the transfer date.", "Changes are subject to availability and additional charges if applicable."] },
    { type: "titre2", texte: "3. Cancellation & Refund Policy" },
    { type: "titre3", texte: "3.1 Cancellation by the Customer" },
    { type: "liste", items: ["More than 7 days before travel: Full refund minus a processing fee.", "Between 48 hours and 7 days: 50% refund.", "Less than 48 hours before travel: No refund."] },
    { type: "titre3", texte: "3.2 Cancellation by Alps Ski Transfers" },
    { type: "liste", items: ["We reserve the right to cancel or reschedule a transfer due to unforeseen circumstances (e.g., extreme weather, road closures).", "In such cases, customers will be offered an alternative transfer or a full refund."] },
    { type: "titre2", texte: "4. Luggage & Equipment Policy" },
    { type: "titre3", texte: "4.1 Standard Luggage Allowance" },
    { type: "liste", items: ["Each passenger is allowed one standard suitcase and one piece of hand luggage.", "Extra luggage must be declared at the time of booking."] },
    { type: "titre3", texte: "4.2 Ski Equipment & Special Items" },
    { type: "liste", items: ["Ski and snowboard equipment is transported free of charge, but must be declared in advance.", "Oversized luggage, bikes, or additional sports equipment may incur extra fees."] },
    { type: "titre2", texte: "5. Child Seats & Passenger Safety" },
    { type: "titre3", texte: "5.1 Child Seats" },
    { type: "liste", items: ["Child seats are available upon request at no extra charge.", "It is the responsibility of the customer to request child seats during booking."] },
    { type: "titre3", texte: "5.2 Passenger Conduct" },
    { type: "liste", items: ["Passengers must wear seat belts at all times.", "Smoking and alcohol consumption are strictly prohibited in all vehicles.", "Unruly behavior that endangers the driver or other passengers will result in the immediate termination of the transfer without a refund."] },
    { type: "titre2", texte: "6. Delays & Waiting Time" },
    { type: "titre3", texte: "6.1 Flight delays" },
    {
      type: "paragraphe",
      texte:
        "We track your flight. If it lands late, the pick-up moves with it and the delay itself costs you nothing: the included hour of waiting is counted from the actual landing time, not from the time you booked.",
    },
    { type: "titre3", texte: "6.2 Waiting time" },
    {
      type: "liste",
      items: [
        "One hour of waiting is included: from the actual landing time when the flight is delayed, from the booked pick-up time otherwise.",
        "Beyond that hour, waiting is charged at €25 per quarter of an hour started, or €100 an hour.",
        "Beyond that hour it applies whatever the reason: a slow baggage hall, a passport queue, or a passenger late to the meeting point.",
        "If you want to change the pick-up time yourself, tell us at least 24 hours ahead: the driver can then rearrange the day, and no charge applies.",
        "Your driver will not leave without telling you: we call the number given at booking before any decision.",
      ],
    },
    { type: "titre2", texte: "7. Liability & Force Majeure" },
    { type: "titre3", texte: "7.1 Service Liability" },
    { type: "liste", items: ["Alps Ski Transfers is not responsible for delays due to weather conditions, traffic, strikes, or unforeseen events.", "We will make every effort to transport passengers on time but cannot guarantee exact arrival times."] },
    { type: "titre3", texte: "7.2 Force Majeure" },
    { type: "liste", items: ["In cases of natural disasters, extreme weather, or road closures, transfers may be delayed or canceled.", "Customers will be informed as soon as possible and offered alternative options."] },
    { type: "titre2", texte: "8. Complaints & Customer Service" },
    { type: "titre3", texte: "8.1 Filing a Complaint" },
    { type: "liste", items: ["Any complaints regarding the service must be submitted within 7 days of travel.", "Complaints should be sent via email to [customer support email], including booking details and issue description."] },
    { type: "titre3", texte: "8.2 Resolution Process" },
    { type: "liste", items: ["Our customer service team will review complaints within 5 business days.", "If a refund or compensation is applicable, it will be processed within 10 business days."] },
    { type: "titre2", texte: "9. Privacy & Data Protection" },
    { type: "titre3", texte: "9.1 Data Collection" },
    { type: "liste", items: ["We collect customer information only for booking and service purposes.", "Payment details are processed through secure, encrypted payment gateways."] },
    { type: "titre3", texte: "9.2 Data Usage" },
    { type: "liste", items: ["Customer data will never be shared with third parties, except as required for transfer logistics.", "By booking a transfer, you consent to receiving booking confirmations, service updates, and promotional offers."] },
    { type: "titre2", texte: "10. Governing Law & Jurisdiction" },
    { type: "paragraphe", texte: "These Terms & Conditions are governed by the laws of France. Any disputes shall be settled in the competent courts of France." },
    { type: "titre2", texte: "11. Contact Information" },
    { type: "paragraphe", texte: "For any inquiries, modifications, or complaints, contact us at:" },
    { type: "paragraphe", texte: "📧 Email: customerservice@alpsskitransfers.com📞 Phone: +33 7 69 78 91 89🌍 Website: https://alpsskitransfers.com/" },
    { type: "paragraphe", texte: "By booking a transfer with Alps Ski Transfers, you agree to these Terms & Conditions." },
  ],

  faq: [

  ],
};
