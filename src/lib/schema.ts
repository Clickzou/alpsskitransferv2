import { ENTREPRISE, SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";
import type { Faq } from "@/lib/resorts/types";

/**
 * Données structurées.
 *
 * Le site actuel se décrit comme un `Article` signé d'une `Person` nommée « JC »,
 * et son `Organization` n'a ni adresse ni téléphone. Pour une activité de
 * transfert, le type juste est `TaxiService` adossé à un `LocalBusiness`, avec
 * zones desservies, téléphone, avis agrégés, prix de départ et fil d'Ariane.
 *
 * L'adresse d'exploitation et le téléphone sont connus depuis le 9 septembre
 * 2026 : ils sont portés par le `LocalBusiness`, qui est le nœud où Google les
 * attend — c'est lui qui rattache l'activité à un lieu, et Chambéry est au cœur
 * de la zone desservie.
 *
 * Aucun champ n'est émis tant qu'il est vide : un `telephone: ""` dans le balisage
 * est pire que son absence. Voir les TODO restants de `data/site.ts`.
 */

export function organisationSchema() {
  const { adresse, entite } = ENTREPRISE;

  const exploitant: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#exploitant`,
    name: ENTREPRISE.raisonSociale,
    url: `${SITE.url}/`,
    address: {
      "@type": "PostalAddress",
      streetAddress: adresse.rue,
      postalCode: adresse.codePostal,
      addressLocality: adresse.ville,
      addressRegion: adresse.region,
      addressCountry: adresse.pays,
    },
    /*
     * « Alps Ski Transfers » est une marque : le `name` la porte, le `legalName`
     * porte l'entité qui contracte. Les deux valent la peine d'être déclarés —
     * c'est ce qui permet à Google de rapprocher le site des registres publics,
     * et de la fiche d'établissement quand elle sera à jour.
     */
    legalName: entite.nom,
    alternateName: entite.enseigne,
    foundingDate: entite.creation,
    /* Le SIREN, identifiant officiel de l'entreprise en France. */
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIREN",
      value: entite.siren,
    },
  };
  if (ENTREPRISE.telephone) exploitant.telephone = ENTREPRISE.telephone;
  if (ENTREPRISE.email) exploitant.email = ENTREPRISE.email;

  const base: Record<string, unknown> = {
    "@type": "TaxiService",
    "@id": `${SITE.url}/#organisation`,
    name: ENTREPRISE.raisonSociale,
    url: `${SITE.url}/`,
    areaServed: ENTREPRISE.zonesDesservies.map((pays) => ({ "@type": "Country", name: pays })),
    provider: exploitant,
  };
  if (ENTREPRISE.telephone) base.telephone = ENTREPRISE.telephone;
  if (ENTREPRISE.email) base.email = ENTREPRISE.email;
  return base;
}

/**
 * Le service, vu depuis une ville.
 *
 * `organisationSchema()` déclare une activité qui dessert quatre pays : c'est
 * vrai, et c'est inutilisable pour une requête locale — « VTC Chambéry » se
 * joue sur un bassin de vie, pas sur un massif. Ce nœud dit la même activité
 * avec une zone à l'échelle où la question se pose, et il pointe le même
 * exploitant : c'est le rattachement à un lieu que Google attend pour rapprocher
 * la page de la fiche d'établissement.
 *
 * Il ne remplace pas le nœud principal, il s'y ajoute — d'où un `@id` distinct.
 * Le nom, l'adresse et le téléphone viennent de `data/site.ts` : **ils doivent
 * être identiques à ceux de la fiche Google**, une divergence site / fiche étant
 * le signal qui coûte le plus cher en référencement local.
 */
export function serviceLocalSchema({
  id,
  chemin,
  nom,
  communes,
  departement,
}: {
  id: string;
  chemin: string;
  nom: string;
  communes: string[];
  departement?: string;
}) {
  const { adresse, entite } = ENTREPRISE;

  const noeud: Record<string, unknown> = {
    "@type": "TaxiService",
    "@id": `${SITE.url}/#${id}`,
    name: nom,
    url: absoluteUrl(chemin),
    areaServed: [
      ...communes.map((commune) => ({
        "@type": "City",
        name: commune,
        address: { "@type": "PostalAddress", addressCountry: adresse.pays },
      })),
      ...(departement
        ? [{ "@type": "AdministrativeArea", name: departement }]
        : []),
    ],
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#exploitant`,
      name: ENTREPRISE.raisonSociale,
      legalName: entite.nom,
      alternateName: entite.enseigne,
      address: {
        "@type": "PostalAddress",
        streetAddress: adresse.rue,
        postalCode: adresse.codePostal,
        addressLocality: adresse.ville,
        addressRegion: adresse.region,
        addressCountry: adresse.pays,
      },
    },
  };
  if (ENTREPRISE.telephone) noeud.telephone = ENTREPRISE.telephone;
  if (ENTREPRISE.email) noeud.email = ENTREPRISE.email;
  return noeud;
}

export function filArianeSchema(elements: { nom: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: elements.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.nom,
      item: absoluteUrl(e.path),
    })),
  };
}

export function faqSchema(faq: Faq[]) {
  if (faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.reponse },
    })),
  };
}

export function articleSchema(a: {
  titre: string;
  description: string;
  path: string;
  datePublication: string;
  dateModification?: string;
  image?: string;
}) {
  return {
    "@type": "BlogPosting",
    headline: a.titre,
    description: a.description,
    mainEntityOfPage: absoluteUrl(a.path),
    datePublished: a.datePublication,
    dateModified: a.dateModification ?? a.datePublication,
    image: a.image ? `${SITE.url}${a.image}` : undefined,
    publisher: { "@id": `${SITE.url}/#organisation` },
  };
}

/** Assemble un graphe unique — un seul bloc JSON-LD par page. */
export function grapheJsonLd(...noeuds: (Record<string, unknown> | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": noeuds.filter(Boolean),
  };
}
