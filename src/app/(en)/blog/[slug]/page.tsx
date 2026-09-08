import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contenu from "@/components/Contenu";
import JsonLd from "@/components/JsonLd";
import { articleParSlug, articlesPublies } from "@/lib/articles";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { articleSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articlesPublies().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitre,
    description: article.metaDescription,
    path: `/blog/${article.slug}/`,
    lang: "en",
    alternate: article.fr ? { lang: "fr", path: `/fr/blog/${article.fr.slug}/` } : undefined,
    image: article.image?.src,
  });
}

export default async function PageArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();

  const chemin = `/blog/${article.slug}/`;

  return (
    <>
      <Header lang="en" />
      <main id="contenu" className="mx-auto max-w-6xl px-4 py-section">
        <h1 className="font-display text-titre-page text-alpine">{article.titre}</h1>
        <p className="mt-4 max-w-prose text-chapo text-alpine-700">{article.chapo}</p>

        <div className="mt-8" data-anime>
          <Contenu blocs={article.contenu} />
        </div>

        {/* Maillage sortant vers les pages qui convertissent. */}
        {article.stationsLiees && article.stationsLiees.length > 0 ? (
          <section className="mt-12" data-anime>
            <h2 className="font-display text-2xl text-alpine">Transfers mentioned</h2>
            <ul className="mt-4 space-y-2">
              {article.stationsLiees.map((slugStation) => {
                const station = resortParSlug(slugStation);
                if (!station) return null;
                return (
                  <li key={slugStation}>
                    <Link
                      className="underline hover:text-marque"
                      href={`/${SLUG_PAYS[station.country]}/${station.slug}/`}
                    >
                      Transfers to {station.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema([
            { nom: "Home", path: "/" },
            { nom: "Blog", path: "/blog/" },
            { nom: article.titre, path: chemin },
          ]),
          articleSchema({
            titre: article.titre,
            description: article.metaDescription,
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
