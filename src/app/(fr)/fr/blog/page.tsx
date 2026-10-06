import IndexBlogIntl from "@/components/intl/IndexBlogIntl";
import { metadataIndexBlog } from "@/lib/intl/routes";

/*
  Publication programmée : la page se régénère au plus toutes les heures, pour
  qu'un article daté paraisse à sa date sans redéploiement.
*/
export const revalidate = 3600;

// Une fonction plutôt qu'une constante : les liens hreflang dépendent des
// articles publiés, donc de la date du jour.
export async function generateMetadata() {
  return metadataIndexBlog("fr");
}

export default function BlogFR() {
  return <IndexBlogIntl lang="fr" />;
}
