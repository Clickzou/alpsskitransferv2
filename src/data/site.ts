/**
 * Identité du site et de l'entreprise.
 *
 * À COMPLÉTER AVEC LE CLIENT — l'audit a relevé que l'`Organization` du site
 * actuel n'a ni adresse ni téléphone, et que la fiche Google porte une adresse
 * (arrêt de bus londonien) différente de celle du site. Tant que l'entité qui
 * opère réellement les transferts n'est pas tranchée, ces valeurs ne doivent pas
 * partir en production : elles alimentent les données structurées.
 */
export const SITE = {
  nom: "Alps Ski Transfers",
  url: "https://www.alpsskitransfers.com",
  defaultLocale: "en-GB",
} as const;

export const ENTREPRISE = {
  raisonSociale: "Alps Ski Transfers",
  telephone: "", // TODO client
  email: "", // TODO client
  adresse: {
    rue: "275 New North Road", // affichée sur le site actuel — à confirmer
    ville: "London",
    codePostal: "N1 7AA",
    pays: "GB",
  },
  /** Zones réellement desservies — sert `areaServed` du schéma TaxiService. */
  zonesDesservies: ["France", "Switzerland", "Austria", "Italy"],
} as const;
