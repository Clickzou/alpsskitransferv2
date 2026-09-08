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
 * Aucun champ n'est émis tant qu'il est vide : un `telephone: ""` dans le balisage
 * est pire que son absence. Voir les TODO de `data/site.ts`.
 */

export function organisationSchema() {
  const base: Record<string, unknown> = {
    "@type": "TaxiService",
    "@id": `${SITE.url}/#organisation`,
    name: ENTREPRISE.raisonSociale,
    url: `${SITE.url}/`,
    areaServed: ENTREPRISE.zonesDesservies.map((pays) => ({ "@type": "Country", name: pays })),
    provider: {
      "@type": "LocalBusiness",
      name: ENTREPRISE.raisonSociale,
      url: `${SITE.url}/`,
    },
  };
  if (ENTREPRISE.telephone) base.telephone = ENTREPRISE.telephone;
  if (ENTREPRISE.email) base.email = ENTREPRISE.email;
  return base;
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
