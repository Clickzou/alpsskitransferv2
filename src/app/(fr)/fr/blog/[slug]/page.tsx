import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contenu from "@/components/Contenu";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { articlesPublies } from "@/lib/articles";
import { resortsFr } from "@/lib/resorts";
import { articleSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Article de blog en français.
 *
 * Seuls les articles réellement traduits ont une page : `generateStaticParams`
 * ne renvoie que ceux qui portent une clé `fr`. Un blog français à moitié traduit
 * vaudrait moins que pas de blog français du tout.
 */
export const dynamicParams = false;

const articlesFr = () => articlesPublies().filter((a) => a.fr);

export function generateStaticParams() {
  return articlesFr().map((a) => ({ slug: a.fr!.slug }));
}

function articleParSlugFr(slug: string) {
  return articlesFr().find((a) => a.fr!.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlugFr(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.fr!.metaTitre,
    description: article.fr!.metaDescription,
    path: `/fr/blog/${article.fr!.slug}/`,
    lang: "fr",
    alternate: { lang: "en", path: `/blog/${article.slug}/` },
    image: article.image?.src,
  });
}

export default async function PageArticleFr({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlugFr(slug);
  if (!article) notFound();

  const fr = article.fr!;
  const chemin = `/fr/blog/${fr.slug}/`;

  // Maillage sortant : seules les stations qui ont une page française.
  const stations = (article.stationsLiees ?? [])
    .map((s) => resortsFr().find((r) => r.slug === s))
    .filter((r) => r != null)
    .slice(0, 8);

  const filAriane = [
    { nom: "Accueil", chemin: "/fr/" },
    { nom: "Blog", chemin: "/fr/blog/" },
    { nom: fr.titre, chemin },
  ];

  return (
    <>
      <Header lang="fr" alternate={{ lang: "en", path: `/blog/${article.slug}/` }} />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {fr.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{fr.chapo}</p>
          <p className="mt-6 text-xs uppercase tracking-widest text-glacier-300">
            {new Date(article.datePublication).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <Contenu blocs={fr.contenu} />
        </Section>

        {stations.length > 0 ? (
          <Section fond="glacier">
            <h2 className="font-display text-2xl text-alpine">Les stations citées</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {stations.map((r) => (
                <li key={r!.slug}>
                  <Link
                    href={`/fr/transferts-ski/${r!.fr!.slug}/`}
                    className="inline-block rounded border border-glacier-200 bg-white px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {r!.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="bg-alpes text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              Réservez votre transfert vers les Alpes
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              Prix fixe par véhicule, skis et sièges enfants compris, suivi du vol.
            </p>
            <BoutonAction href="/booking/" className="mt-6">
              Demander un prix
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang="fr" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          articleSchema({
            titre: fr.titre,
            description: fr.metaDescription,
            path: chemin,
            datePublication: article.datePublication,
            dateModification: article.dateModification,
            image: article.image?.src,
          }),
        )}
      />
    </>
  );
}
