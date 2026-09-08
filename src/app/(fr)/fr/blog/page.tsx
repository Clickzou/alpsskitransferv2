import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesPublies } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

/** Ne liste que les articles réellement traduits — pas de coquille française. */
export const metadata = pageMetadata({
  title: "Guides et actualités des transferts vers les Alpes",
  description:
    "Guides d'accès aux stations, conditions de route en hiver et conseils de transfert depuis Lyon, Chambéry, Grenoble et Genève.",
  path: "/fr/blog/",
  lang: "fr",
  alternate: { lang: "en", path: "/blog/" },
});

export default function PageBlogFr() {
  const articles = articlesPublies().filter((a) => a.fr);

  return (
    <>
      <Header lang="fr" alternate={{ lang: "en", path: "/blog/" }} />
      <main id="contenu" className="mx-auto max-w-6xl px-4 py-section">
        <h1 className="font-display text-titre-page text-alpine">Blog</h1>
        {articles.length === 0 ? (
          <p className="mt-6 max-w-prose text-alpine-700">
            [Aucun article traduit pour l&apos;instant.]
          </p>
        ) : (
          <ul className="mt-8 space-y-6">
            {articles.map((a) => (
              <li key={a.slug}>
                <h2 className="font-display text-xl">
                  <Link className="hover:text-marque" href={`/fr/blog/${a.fr!.slug}/`}>
                    {a.fr!.titre}
                  </Link>
                </h2>
                <p className="mt-1 max-w-prose text-alpine-700">{a.fr!.chapo}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer lang="fr" />
    </>
  );
}
