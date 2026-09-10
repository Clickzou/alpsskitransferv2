/**
 * Identité du site et de l'entreprise.
 *
 * L'audit avait relevé deux défauts : l'`Organization` du site actuel n'a ni
 * adresse ni téléphone, et l'adresse affichée — 275 New North Road, Londres —
 * ne correspond ni à la fiche Google ni au lieu d'exploitation.
 *
 * **Tout est tranché depuis le 9 septembre 2026.** Le préalable juridique qui
 * bloquait ce dossier — quelle entité opère réellement les transferts — a sa
 * réponse : une entreprise individuelle immatriculée à Chambéry, dont l'activité
 * déclarée est le transport de voyageurs par taxi et la location de voiture avec
 * chauffeur. C'est exactement ce que le site vend, et c'est ce qui rend légitime
 * le balisage `TaxiService` / `LocalBusiness` : il ne se contente plus d'être le
 * type le mieux adapté au propos, il décrit l'activité déclarée.
 *
 * Deux conséquences à ne pas perdre de vue :
 *  · **la fiche Google doit porter les mêmes adresse, téléphone et nom** — une
 *    divergence entre le site et la fiche est le signal qui coûte le plus cher
 *    en référencement local, et la fiche actuelle pointe encore Londres ;
 *  · **les mentions légales restent à publier.** Un site édité par une
 *    entreprise française doit donner l'identité de son éditeur : nom, adresse,
 *    contact, numéro d'immatriculation. Les données sont ici, la page ne l'est
 *    pas encore.
 */
export const SITE = {
  nom: "Alps Ski Transfers",
  url: "https://www.alpsskitransfers.com",
  defaultLocale: "en-GB",
} as const;

export const ENTREPRISE = {
  /** Le nom sous lequel le public connaît l'activité — le `name` du schéma. */
  raisonSociale: "Alps Ski Transfers",

  /**
   * Format international sans espaces : c'est celui qu'attend `schema.org`, et
   * celui qui fait fonctionner un lien `tel:` sur tous les téléphones.
   */
  telephone: "+33769789189",
  /** Le même numéro, lisible. C'est lui qui s'affiche. */
  telephoneAffiche: "+33 7 69 78 91 89",
  email: "contact@alpsskitransfers.com",

  adresse: {
    rue: "317 rue de la Bionne",
    ville: "Chambéry",
    codePostal: "73000",
    pays: "FR",
    /** Région, pour le `LocalBusiness` : c'est le massif desservi. */
    region: "Savoie",
  },

  /**
   * L'entité qui opère réellement les transferts.
   *
   * « Alps Ski Transfers » est une marque, pas une personne morale : c'est cette
   * entreprise individuelle qui contracte avec le client, encaisse et transporte.
   * La distinction n'est pas cosmétique — elle détermine ce qui doit figurer dans
   * les mentions légales, dans les conditions de vente et sur les factures du
   * futur moteur de réservation.
   */
  entite: {
    /** L'entrepreneur individuel : l'entreprise porte son nom. */
    nom: "Nassim Matmati",
    /** Le nom commercial déclaré. */
    enseigne: "NM Transports 73",
    forme: "Entreprise individuelle (micro-entreprise)",
    /** SIREN à neuf chiffres, sans espaces. */
    siren: "889065165",
    /** Immatriculation, au format ISO — sert `foundingDate`. */
    creation: "2020-09-17",
    activite:
      "Transports de voyageurs par taxis et location de voiture avec chauffeur (VTC)",

    /*
     * Les identifiants réglementaires.
     *
     * Ils vivaient en dur dans le texte anglais des mentions légales. Depuis que
     * la page existe aussi en français, en allemand et en italien, un numéro de
     * licence recopié quatre fois est un numéro qui finira par différer d'une
     * langue à l'autre — sur une mention légale, c'est la faute la plus bête et
     * la plus coûteuse. Une seule source, quatre lectures.
     */
    siret: "889 065 165 00017",
    tva: "FR87 889 065 165",
    /** Inscription au registre national des exploitants de VTC. */
    evtc: "EVTC073240010",
    /** Licence de transport intérieur de personnes, registre 73 - Savoie. */
    lti: {
      numero: "2026 84 0000542",
      /** Format ISO — la page les met en forme selon sa langue. */
      debut: "2026-02-27",
      fin: "2036-02-26",
      gestionnaire: "Nassim Matmati",
    },
  },

  /** Zones réellement desservies — sert `areaServed` du schéma TaxiService. */
  zonesDesservies: ["France", "Switzerland", "Austria", "Italy"],
} as const;
