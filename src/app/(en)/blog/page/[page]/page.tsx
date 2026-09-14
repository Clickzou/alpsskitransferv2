import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ListeBlog, { nombrePagesBlog } from "@/components/ListeBlog";
import { pageMetadata } from "@/lib/seo";

/**
 * `/blog/page/{n}/` — les pages suivantes de l'index du blog.
 *
 * La page 1 reste `/blog/` : `/blog/page/1/` n'existe pas, pour ne pas servir
 * deux fois le même contenu. Chaque page porte son numéro dans le title et la
 * description — des pages de liste identiques seraient des doublons.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, nombrePagesBlog() - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  return pageMetadata({
    title: `Alps ski transfer guides — page ${page}`,
    description: `Page ${page} of our airport transfer guides: which airport to fly into, resort access, luggage, families and winter roads in the Alps.`,
    path: `/blog/page/${page}/`,
    lang: "en",
  });
}

export default async function PageBlogSuivante({ params }: { params: Promise<{ page: string }> }) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2 || n > nombrePagesBlog()) notFound();
  return <ListeBlog page={n} />;
}
