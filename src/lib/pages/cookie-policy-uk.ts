import { ENTREPRISE } from "@/data/site";
import type { PageFonctionnelle } from "./types";

/**
 * Politique de cookies — **réécrite le 9 septembre 2026**.
 *
 * La page reprise du WordPress faisait **trois mots** : un titre et rien
 * d'autre. Elle annonçait par ailleurs un régime britannique (« UK » jusque dans
 * l'URL) alors que l'éditeur est une entreprise française : c'est le RGPD et
 * l'article 82 de la loi Informatique et Libertés qui s'appliquent, sous le
 * contrôle de la CNIL.
 *
 * **L'URL reste `/cookie-policy-uk/`** : elle est dans le plan de migration, et
 * la déplacer coûterait une redirection pour rien — une page en `noindex` que
 * personne ne recherche. Seul le contenu change.
 *
 * Ce module n'est plus régénéré par `migrer:pages` : il n'y avait rien à
 * reprendre, et une réexécution du script effacerait ce texte.
 *
 * **À FAIRE RELIRE PAR LE CLIENT**, et surtout à confronter à la réalité
 * technique du site le jour de la mise en ligne : ce qui est écrit ici doit
 * décrire les cookies réellement déposés, pas ceux qu'on imagine.
 *
 * **Révisée le 29 septembre 2026** dans les quatre langues : Google Analytics
 * (propriété existante, G-5W2WD3B7VL) est branché derrière un bandeau de
 * consentement — `components/MesureAudience.tsx`. Si ce composant change
 * (durée du choix, cookies, prestataire), ces quatre textes changent avec lui.
 */
export const cookiePolicyUk: PageFonctionnelle = {
  slug: "cookie-policy-uk",
  metaTitre: "Cookie policy | Alps Ski Transfers",
  metaDescription: "Which cookies this website uses, what they are for, and how to control them.",
  h1: "Cookie policy",
  chapo:
    "This page explains which cookies alpsskitransfers.com places on your device, what they are used for, and how you can control them.",
  noindex: true,

  contenu: [
    { type: "titre2", texte: "What a cookie is" },
    {
      type: "paragraphe",
      texte:
        "A cookie is a small text file stored on your device when you visit a website. It lets the site remember your actions and preferences between pages and between visits. Similar technologies — local storage, pixels, tags — serve the same purpose and are covered by this policy.",
    },

    { type: "titre2", texte: "Cookies we use" },
    {
      type: "paragraphe",
      texte:
        "We keep this to the minimum: no advertising, no profiling. The only cookies that need your consent are those used for audience measurement, and they are placed only if you accept them.",
    },
    {
      type: "liste",
      items: [
        "Strictly necessary cookies — used to keep your booking together while you move through the steps, and to keep the payment page secure. Without them the booking process cannot work. These do not require your consent.",
        "Preference storage — if you fill in a search and do not complete it, your entries may be kept in your browser so you do not have to type them again. This stays on your device and is never sent to us.",
        "Payment provider cookies — when you reach the payment page, our payment provider sets its own cookies to detect fraud and secure the transaction. These are necessary to take a payment.",
      ],
    },
    {
      type: "paragraphe",
      texte:
        "Audience measurement (Google Analytics) — only if you accept it in the banner. It counts visits and shows which pages are useful to travellers, through cookies named _ga and _ga_ followed by an identifier, kept for up to thirteen months. The data is processed by Google Ireland Limited and may be transferred to the United States under the EU–US Data Privacy Framework; it is never used for advertising. Until you accept, the Google Analytics script is not even loaded. You can withdraw your consent at any time with the “Cookie settings” link at the bottom of every page, and the cookies are then deleted. We do not use advertising or social media cookies.",
    },

    { type: "titre2", texte: "How long they last" },
    {
      type: "paragraphe",
      texte:
        "Cookies needed for a booking last for the session or for the time needed to complete it. Audience measurement cookies last at most thirteen months. Your choice — to accept or to refuse — is kept for six months, after which we ask again, in line with CNIL guidance.",
    },

    { type: "titre2", texte: "Controlling cookies" },
    {
      type: "paragraphe",
      texte:
        "You can accept or refuse cookies in your browser settings, and delete those already stored. Every major browser — Chrome, Safari, Firefox, Edge — offers this in its privacy settings. Be aware that blocking strictly necessary cookies will prevent a booking from being completed.",
    },

    { type: "titre2", texte: "Your rights" },
    {
      type: "paragraphe",
      texte: `Cookies that read or write information on your device are governed by the General Data Protection Regulation and by article 82 of the French Data Protection Act. You may exercise your rights of access, rectification, erasure and objection by writing to ${ENTREPRISE.email}, and you may lodge a complaint with the CNIL, the French supervisory authority, at cnil.fr.`,
    },
    {
      type: "paragraphe",
      texte:
        "For everything else we do with your personal data — bookings, payments, driver allocation — see our privacy policy.",
    },

    { type: "titre2", texte: "Changes to this policy" },
    {
      type: "paragraphe",
      texte:
        "This policy is updated whenever the cookies used by the website change. Last updated: 29 September 2026.",
    },
  ],

  faq: [],
};
