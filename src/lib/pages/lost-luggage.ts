import type { PageFonctionnelle } from "./types";

/**
 * Repris de /lost-luggage/ (WordPress, 404 mots) par `npm run migrer:pages`.
 * URL conservée par le plan de migration : ne pas la déplacer.
 *
 * **Doublons retirés le 10 septembre 2026.** La page publiait deux fois la même
 * série de huit paragraphes : le WordPress portait un accordéon, la migration a
 * gardé les réponses et perdu les questions, puis le module s'est retrouvé
 * dupliqué. Aucun texte n'a été réécrit — seules les répétitions exactes sont
 * parties. Les questions, elles, restent à reconstruire avec le client : les
 * versions traduites (`/fr/bagage-perdu/` et ses sœurs) montrent la forme
 * attendue, contenu structuré puis FAQ.
 */
export const lostLuggage: PageFonctionnelle = {
  slug: "lost-luggage",
  visuel: { nom: "aeroport-lyon-airport", alt: "Airport terminal, baggage reclaim" },
  metaTitre: "Lost luggage",
  metaDescription:
    "Luggage delayed or lost on arrival? What to do at the airport, and how we adjust your transfer while you wait for it.",
  h1: "Lost luggage",
  chapo: "Contact us immediately with your booking reference and item description so we can check with the driver.",

  contenu: [
    { type: "paragraphe", texte: "We try to reunite you with lost items as quickly as possible. Timing depends on your location and driver availability." },
    { type: "paragraphe", texte: "Collection from our depot is free. Delivery may include a shipping fee." },
    { type: "paragraphe", texte: "We store items for up to 30 days before disposal or donation." },
    { type: "paragraphe", texte: "We’ll provide updates by email or phone as we locate and arrange return of your item." },
    { type: "paragraphe", texte: "We’ll conduct a thorough search, but cannot guarantee recovery. We’ll keep you informed throughout." },
    { type: "paragraphe", texte: "We’ll do our best to help, but we cannot accept liability for personal belongings left in vehicles." },
    { type: "paragraphe", texte: "Yes, but please notify us in advance and provide their details for security." },
    { type: "paragraphe", texte: "Use our website contact form, email, or call our customer service line for immediate assistance." },
    { type: "paragraphe", texte: "Contact us immediately with your booking reference and item description so we can check with the driver." },
    { type: "titre3", texte: "General questions" },
    { type: "paragraphe", texte: "Have questions about our services? Find all the details about routes, vehicles, schedules, and booking conditions to plan your transfer with complete confidence." },
    { type: "titre3", texte: "Custom inquiry" },
    { type: "paragraphe", texte: "Have a special request? Need a bespoke transfer, custom route, or group transport? Contact us for a tailored quote and enjoy a service designed just for you." },
  ],

  faq: [

  ],
};
