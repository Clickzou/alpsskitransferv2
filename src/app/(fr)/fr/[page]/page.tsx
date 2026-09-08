import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { PAGES_FR, pageFrParSlug } from "@/lib/pages/fr";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Les pages de conversion françaises : comment réserver, privé ou partagé,
 * aide, contact, professionnels.
 *
 * Le segment `[page]` sert ces cinq pages et rien d'autre — `dynamicParams`
 * reste faux. Elles portent un `hreflang` seulement quand une page anglaise
 * équivalente existe vraiment.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES_FR.map((p) => ({ page: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const contenu = pageFrParSlug(page);
  if (!contenu) return {};
  return pageMetadata({
    title: contenu.metaTitre,
    description: contenu.metaDescription,
    path: `/fr/${contenu.slug}/`,
    lang: "fr",
    alternate: contenu.equivalentEn
      ? { lang: "en", path: contenu.equivalentEn }
      : undefined,
  });
}

export default async function PageFrancaise({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const contenu = pageFrParSlug(page);
  if (!contenu) notFound();

  const chemin = `/fr/${contenu.slug}/`;
  const filAriane = [
    { nom: "Accueil", chemin: "/fr/" },
    { nom: contenu.h1, chemin },
  ];

  return (
    <>
      <Header
        lang="fr"
        alternate={
          contenu.equivalentEn ? { lang: "en", path: contenu.equivalentEn } : undefined
        }
      />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {contenu.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            {contenu.chapo}
          </p>
          <div className="mt-8">
            <BoutonAction href="/fr/reserver/">Demander un prix</BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <Contenu blocs={contenu.contenu} />
        </Section>

        <Faq items={contenu.faq} titre="Questions fréquentes" surtitre="Aide" />

        <section className="bg-alpes text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              Réservez votre transfert vers les Alpes
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              Prix fixe par véhicule, skis et sièges enfants compris, suivi du vol.
            </p>
            <BoutonAction href="/fr/reserver/" className="mt-6">
              Réserver
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang="fr" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(contenu.faq),
        )}
      />
    </>
  );
}
