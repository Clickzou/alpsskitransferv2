import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleIntl from "@/components/intl/ArticleIntl";
import { articleParSlugTraduit, metadataArticle, paramsArticles } from "@/lib/intl/routes";

/**
 * Seuls les articles réellement traduits — et publiés — ont une page.
 *
 * Publication programmée (6 octobre 2026) : un article qui paraît après le
 * build est rendu à la première visite (`dynamicParams`) ; un slug inconnu ou
 * pas encore publié répond 404 (`articleParSlugTraduit` ne lit que les articles
 * publiés). Régénération au plus toutes les heures.
 */
export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return paramsArticles("fr");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metadataArticle("fr", slug);
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlugTraduit("fr", slug);
  if (!article) notFound();
  return <ArticleIntl lang="fr" article={article} />;
}
