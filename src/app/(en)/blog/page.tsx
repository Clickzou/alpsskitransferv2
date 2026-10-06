import ListeBlog from "@/components/ListeBlog";
import { articlesEnLigne } from "@/lib/articles";
import { alternativesIndexBlog } from "@/lib/intl/liens";
import { pageMetadata } from "@/lib/seo";

/*
  Publication programmée : la page se régénère au plus toutes les heures, pour
  qu'un article daté paraisse à sa date sans redéploiement.
*/
export const revalidate = 3600;

// Une fonction plutôt qu'une constante : les liens hreflang dépendent des
// articles publiés, donc de la date du jour.
export async function generateMetadata() {
  return pageMetadata({
    title: "Alps ski transfer guides and news",
    description:
      "Airport transfer guides, resort access and winter driving conditions in the French, Swiss, Austrian and Italian Alps.",
    path: "/blog/",
    lang: "en",
    alternatives: alternativesIndexBlog(articlesEnLigne(), "en"),
  });
}

/** `/blog/` — la première page de l'index des articles (`ListeBlog`). */
export default function PageBlog() {
  return <ListeBlog page={1} />;
}
