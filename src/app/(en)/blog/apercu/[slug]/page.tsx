import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VueArticle from "@/components/VueArticle";
import { ARTICLES, dateAtteinte } from "@/lib/articles";
import { apercuValide } from "@/lib/articles/apercu";

/**
 * `/blog/apercu/{slug}/?sig=…` — aperçu d'un article programmé, pour la
 * relecture par le client depuis son tableau de bord Clickzou (onglet
 * « Articles programmés »). Voir `src/lib/articles/apercu.ts`.
 *
 * Jamais indexable, par quatre verrous qui se complètent :
 *   - lien signé : sans signature valide → 404, rien ne fuit, pas même le titre ;
 *   - balise robots noindex/nofollow ici ;
 *   - en-tête X-Robots-Tag et Referrer-Policy no-referrer (next.config.ts) —
 *     la signature ne part pas dans l'en-tête Referer des liens sortants ;
 *   - absent du sitemap, et pas de JSON-LD ni de canonical.
 *
 * Seule page publique qui lit `ARTICLES` directement : c'est son rôle de
 * montrer ce qui n'est pas encore publié. Les brouillons restent exclus.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Article preview",
  // Le layout pose par défaut le canonical de l'accueil : on l'annule ici.
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function ApercuArticle({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sig?: string | string[] }>;
}) {
  const { slug } = await params;
  const { sig } = await searchParams;
  const article = ARTICLES.find((a) => a.slug === slug && !a.brouillon);
  if (!article || !apercuValide(article.slug, typeof sig === "string" ? sig : undefined)) notFound();

  // Déjà en ligne : l'aperçu n'a plus lieu d'être, on renvoie vers la vraie page.
  if (dateAtteinte(article)) redirect(`/blog/${article.slug}/`);

  return <VueArticle article={article} apercu />;
}
