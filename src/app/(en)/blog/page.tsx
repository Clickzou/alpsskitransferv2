import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Visuel from "@/components/Visuel";
import {
  AppelAction,
  EnTeteSection,
  HeroInterieur,
  Section,
} from "@/components/gabarit/Sections";
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

/** « 8 September 2026 » — la forme longue, lisible sans effort. */
function dateLongue(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Estimation du temps de lecture, à 200 mots par minute.
 *
 * Ce n'est pas de la décoration : sur une liste d'articles longs, savoir qu'un
 * guide demande huit minutes plutôt que deux décide de l'ouvrir maintenant ou
 * de le garder pour plus tard.
 */
function minutesLecture(article: { chapo: string; contenu: { type: string }[] }) {
  const mots = (article.contenu as { texte?: string; items?: string[] }[])
    .flatMap((bloc) => bloc.items ?? [bloc.texte ?? ""])
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(mots / 200));
}

/**
 * `/blog/` — l'index des articles.
 *
 * Le blog est la brique qui maille vers les stations et les trajets, et le site
 * n'en avait aucun : `/blog/` et `/news/` étaient en 404 alors que les six
 * concurrents relevés en ont tous un. L'index doit donc donner envie d'entrer,
 * et pas seulement lister des titres.
 *
 * Le premier article est mis en avant sur toute la largeur : avec trois articles
 * au lancement, une grille de trois cartes identiques donnerait une page vide et
 * sans hiérarchie.
 */
export default function PageBlog() {
  const articles = articlesPublies();
  const [aLaUne, ...suivants] = articles;

  return (
    <>
      <Header lang="en" alternatives={alternativesIndexBlog(articlesPublies(), "en")} />
      <main id="contenu">
        <HeroInterieur image={{ nom: "route-alpine", alt: "Mountain road to an Alpine resort" }}>
          <h1 className="max-w-3xl text-balance font-display text-titre-page">
            Ski transfer guides
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Which airport to fly into, how car-free resorts actually work, what to check before
            you pay. Written from the road rather than from a brochure.
          </p>
        </HeroInterieur>

        {articles.length === 0 ? (
          <Section fond="blanc">
            <p className="max-w-prose text-alpine-700">
              [Aucun article publié — les 3 articles de démarrage prévus au devis arrivent avant
              la mise en ligne.]
            </p>
          </Section>
        ) : (
          <>
            {/* ------------------------------------------------------ à la une */}
            <Section fond="blanc">
              <article className="grid items-center gap-10 lg:grid-cols-2" data-anime>
                {aLaUne.visuel ? (
                  <Link href={`/blog/${aLaUne.slug}/`} className="group overflow-hidden rounded-xl">
                    <Visuel
                      nom={aLaUne.visuel.nom}
                      alt={aLaUne.visuel.alt}
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="aspect-[16/10] w-full rounded-xl object-cover shadow-carte transition duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                ) : null}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-or-700">
                    Latest guide
                  </p>
                  <h2 className="mt-3 font-display text-titre-section text-alpine">
                    <Link className="hover:text-marque" href={`/blog/${aLaUne.slug}/`}>
                      {aLaUne.titre}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-prose leading-relaxed text-alpine-700">
                    {aLaUne.chapo}
                  </p>
                  <p className="mt-5 flex flex-wrap items-center gap-x-3 text-xs text-alpine-600">
                    <time dateTime={aLaUne.datePublication}>
                      {dateLongue(aLaUne.datePublication)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{minutesLecture(aLaUne)} min read</span>
                  </p>
                  <Link
                    href={`/blog/${aLaUne.slug}/`}
                    className="mt-5 inline-block text-sm font-semibold text-marque hover:underline"
                  >
                    Read the guide →
                  </Link>
                </div>
              </article>
            </Section>

            {/* -------------------------------------------------- les suivants */}
            {suivants.length > 0 ? (
              <Section fond="glacier">
                <EnTeteSection surtitre="More" titre="Other guides" />
                <ul
                  className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                  data-anime-decale
                >
                  {suivants.map((article) => (
                    <li key={article.slug}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte transition duration-300 hover:-translate-y-1 hover:shadow-flottant">
                        {article.visuel ? (
                          <Visuel
                            nom={article.visuel.nom}
                            alt={article.visuel.alt}
                            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                            className="aspect-[16/10] w-full object-cover"
                          />
                        ) : null}
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-display text-titre-carte text-alpine">
                            <Link className="hover:text-marque" href={`/blog/${article.slug}/`}>
                              {article.titre}
                            </Link>
                          </h3>
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-alpine-600">
                            {article.chapo}
                          </p>
                          <p className="mt-4 flex flex-wrap items-center gap-x-3 text-xs text-alpine-600">
                            <time dateTime={article.datePublication}>
                              {dateLongue(article.datePublication)}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span>{minutesLecture(article)} min read</span>
                          </p>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
          </>
        )}

        <AppelAction titre="Book your airport ski transfer" />
      </main>
      <Footer lang="en" />
    </>
  );
}
