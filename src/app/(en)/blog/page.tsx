import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesPublies } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Alps ski transfer guides and news",
  description:
    "Airport transfer guides, resort access and winter driving conditions in the French, Swiss, Austrian and Italian Alps.",
  path: "/blog/",
  lang: "en",
});

export default function PageBlog() {
  const articles = articlesPublies();

  return (
    <>
      <Header lang="en" />
      <main id="contenu" className="mx-auto max-w-6xl px-4 py-section">
        <h1 className="font-display text-titre-page text-alpine">Blog</h1>
        {articles.length === 0 ? (
          <p className="mt-6 max-w-prose text-alpine-700">
            [Aucun article publie — les 3 articles de demarrage prevus au devis
            arrivent avant la mise en ligne.]
          </p>
        ) : (
          <ul className="mt-8 space-y-6">
            {articles.map((a) => (
              <li key={a.slug}>
                <h2 className="font-display text-xl">
                  <Link className="hover:text-marque" href={`/blog/${a.slug}/`}>
                    {a.titre}
                  </Link>
                </h2>
                <p className="mt-1 max-w-prose text-alpine-700">{a.chapo}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer lang="en" />
    </>
  );
}
