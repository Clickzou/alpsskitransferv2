import IndexBlogIntl from "@/components/intl/IndexBlogIntl";
import { metadataIndexBlog } from "@/lib/intl/routes";

export const metadata = metadataIndexBlog("de");

export default function BlogDE() {
  return <IndexBlogIntl lang="de" />;
}
