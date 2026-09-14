import ListeBlog from "@/components/ListeBlog";
import { articlesPublies } from "@/lib/articles";
import { alternativesIndexBlog } from "@/lib/intl/liens";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alps ski transfer guides and news",
  description:
    "Airport transfer guides, resort access and winter driving conditions in the French, Swiss, Austrian and Italian Alps.",
  path: "/blog/",
  lang: "en",
  alternatives: alternativesIndexBlog(articlesPublies(), "en"),
});

/** `/blog/` — la première page de l'index des articles (`ListeBlog`). */
export default function PageBlog() {
  return <ListeBlog page={1} />;
}
