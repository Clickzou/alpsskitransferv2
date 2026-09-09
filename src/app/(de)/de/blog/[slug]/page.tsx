import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleIntl from "@/components/intl/ArticleIntl";
import { articleParSlugTraduit, metadataArticle, paramsArticles } from "@/lib/intl/routes";

/** Seuls les articles réellement traduits ont une page. */
export const dynamicParams = false;

export function generateStaticParams() {
  return paramsArticles("de");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metadataArticle("de", slug);
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlugTraduit("de", slug);
  if (!article) notFound();
  return <ArticleIntl lang="de" article={article} />;
}
