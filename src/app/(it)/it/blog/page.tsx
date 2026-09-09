import IndexBlogIntl from "@/components/intl/IndexBlogIntl";
import { metadataIndexBlog } from "@/lib/intl/routes";

export const metadata = metadataIndexBlog("it");

export default function BlogIT() {
  return <IndexBlogIntl lang="it" />;
}
