import { ENTREPRISE, SITE } from "@/data/site";
import type { PageFonctionnelle } from "./types";

/**
 * Mentions légales — **page neuve**, créée le 9 septembre 2026.
 *
 * Elle n'existait pas : le WordPress n'en publiait aucune, alors que l'article
 * 6-III de la LCEN impose à tout éditeur professionnel établi en France de dire
 * qui il est. Maintenant que l'exploitant est identifié — entreprise
 * individuelle immatriculée à Chambéry — l'obligation est claire et les données
 * sont disponibles.
 *
 * Les valeurs sont **lues dans `data/site.ts`** plutôt que recopiées : une
 * mention légale qui diverge de ce que le reste du site affiche est pire que pas
 * de mention du tout, et c'est exactement ce qui arrivait à l'adresse
 * londonienne.
 *
 * **À FAIRE RELIRE PAR LE CLIENT avant mise en ligne**, et à compléter sur les
 * points marqués `[À REMPLACER]` — le contrôle de prebuild les signale tant
 * qu'ils sont là.
 *
 * La **licence de transport** a été relevée le 9 septembre 2026 dans le registre
 * national des entreprises de transport routier de personnes tenu par le
 * ministère de la Transition écologique (fichier départemental 73 - Savoie,
 * rafraîchi le 21/07/2026) : LTI n° 2026 84 0000542, valable jusqu'au
 * 26/02/2036, gestionnaire de transport Nassim Matmati.
 *
 * Le **numéro EVTC** et le **numéro de TVA** ont été fournis par le client le
 * 10 septembre 2026. Ce sont deux identifiants distincts de la LTI : l'EVTC
 * atteste l'inscription au registre des exploitants de VTC, la LTI couvre le
 * transport routier de personnes, et l'entreprise exerce les deux activités.
 *
 * L'existence d'un numéro de TVA intracommunautaire indique que l'entreprise est
 * **assujettie** : la mention « TVA non applicable, article 293 B du CGI » ne
 * s'applique donc pas, et les prix affichés doivent être cohérents avec ce
 * régime — un point à vérifier avec le client sur la grille tarifaire.
 */

const { adresse, entite } = ENTREPRISE;
const adressePostale = `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}, France`;
const siret = `SIREN ${entite.siren.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3")}`;

export const legalNotice: PageFonctionnelle = {
  slug: "legal-notice",
  metaTitre: "Legal notice | Alps Ski Transfers",
  metaDescription: "Publisher, hosting and legal information for the Alps Ski Transfers website.",
  h1: "Legal notice",
  chapo:
    "Information required under article 6-III of the French Act of 21 June 2004 on confidence in the digital economy (LCEN).",
  /*
   * Servie et suivie, mais hors index : une page de mentions légales n'a aucune
   * requête à capter, et elle diluerait le silo. Les liens qu'elle porte restent
   * suivis — d'où `noindex` et non `noindex, nofollow`.
   */
  noindex: true,

  contenu: [
    { type: "titre2", texte: "Website publisher" },
    {
      type: "paragraphe",
      texte: `This website is published by ${entite.nom}, trading as ${entite.enseigne}, a sole trader (${entite.forme}) registered in France on ${entite.creation}.`,
    },
    {
      type: "liste",
      items: [
        `Registered address: ${adressePostale}`,
        `Registration: ${siret}`,
        `Business activity: ${entite.activite}`,
        `Telephone: ${ENTREPRISE.telephoneAffiche}`,
        `Email: ${ENTREPRISE.email}`,
        "Private hire (VTC) registration: EVTC073240010, entered in the French national register of private hire operators.",
        "Passenger transport licence: LTI (French domestic passenger transport licence) no. 2026 84 0000542, valid from 27 February 2026 to 26 February 2036, entered in the national register of road passenger transport operators for Savoie. Transport manager: Nassim Matmati.",
        "SIRET: 889 065 165 00017",
        "VAT number: FR87 889 065 165",
      ],
    },
    {
      type: "paragraphe",
      texte: `“Alps Ski Transfers” is a trading name. The transport services offered on this website are operated by ${entite.nom} under the details set out above.`,
    },

    { type: "titre2", texte: "Publication director" },
    {
      type: "paragraphe",
      texte: `${entite.nom}, in their capacity as owner of the business.`,
    },

    { type: "titre2", texte: "Hosting" },
    {
      type: "paragraphe",
      texte:
        "The website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, United States — vercel.com.",
    },

    { type: "titre2", texte: "Intellectual property" },
    {
      type: "paragraphe",
      texte: `The structure, text, images and graphic design of ${SITE.url} are protected by copyright. Reproduction or reuse, in whole or in part, on any medium, requires the prior written consent of the publisher. Photographs of resorts and vehicles remain the property of their respective authors.`,
    },

    { type: "titre2", texte: "Personal data" },
    {
      type: "paragraphe",
      texte:
        "Personal data collected through this website is processed in accordance with the General Data Protection Regulation (EU 2016/679) and the French Data Protection Act. You have a right of access, rectification, erasure, restriction, portability and objection, which you may exercise at the email address above. Details of the data collected and the purposes of processing are set out in our privacy policy, and the cookies used are listed in our cookie policy.",
    },
    {
      type: "paragraphe",
      texte:
        "If you consider that your rights have not been respected, you may lodge a complaint with the CNIL, the French data protection authority — cnil.fr.",
    },

    { type: "titre2", texte: "Terms of sale" },
    {
      type: "paragraphe",
      texte:
        "Transfers booked through this website are governed by our ticketing conditions and by our terms and conditions, which set out prices, cancellation, luggage and liability.",
    },

    { type: "titre2", texte: "Dispute resolution" },
    {
      type: "paragraphe",
      texte:
        "In the event of a dispute, please contact us first at the email address above. If no agreement is reached, consumers resident in the European Union may refer the matter to a consumer mediator, and may use the European Commission's online dispute resolution platform. [À REMPLACER — nom, adresse postale et site du médiateur de la consommation auquel l'entreprise a adhéré. Ce doit être un ORGANISME TIERS AGRÉÉ par la CECMC (CM2C, MEDICYS, AME Conso, SAS Médiation Solution…), et jamais le dirigeant ni un proche de l'entreprise : l'indépendance est la condition même de la médiation. L'adhésion est obligatoire, article L.612-1 du Code de la consommation, pour tout professionnel qui vend à des consommateurs.]",
    },
  ],

  faq: [],
};
