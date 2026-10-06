import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VueArticle from "@/components/VueArticle";
import { articleParSlug, articlesPublies } from "@/lib/articles";
import { alternativesArticle } from "@/lib/intl/liens";
import { pageMetadata } from "@/lib/seo";

/*
  Publication programmée (6 octobre 2026) : un article daté dans le futur n'a
  pas de page tant que sa date n'est pas atteinte à Paris. Les slugs connus au
  build sont pré-rendus ; un article qui paraît ensuite est rendu à la première
  visite (`dynamicParams`), et chaque page se régénère au plus toutes les heures
  — l'article paraît à sa date sans redéploiement. Un slug inconnu ou pas encore
  publié répond 404 (`articleParSlug` ne lit que les articles publiés).
*/
export const dynamicParams = true;
export const revalidate = 3600;

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
    alternatives: alternativesArticle(article, "en"),
    // Le visuel de tête sert aussi d'aperçu social, faute d'une image dédiée.
    image: article.image?.src ?? (article.visuel ? `/images/${article.visuel.nom}.avif` : undefined),
  });
}

/** `/blog/{slug}/` — un article. Le rendu vit dans `VueArticle`, partagé avec l'aperçu. */
export default async function PageArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();
  return <VueArticle article={article} />;
}
