import IndexBlogIntl from "@/components/intl/IndexBlogIntl";
import { metadataIndexBlog } from "@/lib/intl/routes";

export const metadata = metadataIndexBlog("fr");

export default function BlogFR() {
  return <IndexBlogIntl lang="fr" />;
}
