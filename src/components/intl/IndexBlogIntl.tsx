import Link from "next/link";
import { notFound } from "next/navigation";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Visuel from "@/components/Visuel";
import {
  BoutonAction,
  EnTeteSection,
  HeroInterieur,
  Section,
} from "@/components/gabarit/Sections";
import { articlesDeLaLangue, dateLongue, minutesLecture } from "./blog-commun";
import { articlesPublies } from "@/lib/articles";
import type { LangueSecondaire } from "@/lib/i18n";
import { ACCUEIL } from "@/lib/intl/accueil";
import { alternativesIndexBlog } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";

/**
 * `/xx/blog/` — l'index des articles d'une langue.
 *
 * Le premier article est mis en avant sur toute la largeur, comme sur l'index
 * anglais : avec deux ou trois articles, une grille de cartes identiques donne
 * une page vide et sans hiérarchie.
 */
export default function IndexBlogIntl({ lang }: { lang: LangueSecondaire }) {
  const t = T(lang);
  const articles = articlesDeLaLangue(lang);
  /*
    Pas d'article traduit, pas d'index. Une page de titre suivie d'un appel à
    l'action n'est pas un blog : c'est la coquille vide que ce projet corrige
    partout ailleurs, et elle n'a pas plus sa place ici.
  */
  if (articles.length === 0) notFound();
  const [aLaUne, ...suivants] = articles;

  return (
    <>
      <Header
        lang={lang}
        alternatives={alternativesIndexBlog(articlesPublies(), lang)}
      />
      <main id="contenu">
        <HeroInterieur image={ACCUEIL[lang].visuel}>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: `/${lang}/` },
              { nom: "Blog", chemin: `/${lang}/blog/` },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {t.blogTitre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{t.blogChapo}</p>
        </HeroInterieur>

        {aLaUne ? (
          <>
            <Section fond="blanc">
              <article className="grid items-center gap-10 lg:grid-cols-2" data-anime>
                {aLaUne.visuel ? (
                  <Link
                    href={`/${lang}/blog/${aLaUne.traductions![lang]!.slug}/`}
                    className="group overflow-hidden rounded-xl"
                  >
                    <Visuel
                      nom={aLaUne.visuel.nom}
                      alt={aLaUne.traductions![lang]!.altVisuel ?? aLaUne.visuel.alt}
                      priority
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="aspect-[16/10] w-full rounded-xl object-cover shadow-carte transition duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                ) : null}

                <div>
                  <h2 className="font-display text-titre-section text-alpine">
                    <Link
                      className="hover:text-marque"
                      href={`/${lang}/blog/${aLaUne.traductions![lang]!.slug}/`}
                    >
                      {aLaUne.traductions![lang]!.titre}
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-prose leading-relaxed text-alpine-700">
                    {aLaUne.traductions![lang]!.chapo}
                  </p>
                  <p className="mt-5 flex flex-wrap items-center gap-x-3 text-xs text-alpine-600">
                    <time dateTime={aLaUne.datePublication}>
                      {dateLongue(aLaUne.datePublication, lang)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{t.minutesLecture(minutesLecture(aLaUne.traductions![lang]!.contenu))}</span>
                  </p>
                  <Link
                    href={`/${lang}/blog/${aLaUne.traductions![lang]!.slug}/`}
                    className="mt-5 inline-block text-sm font-semibold text-marque hover:underline"
                  >
                    {t.lireLeGuide}
                  </Link>
                </div>
              </article>
            </Section>

            {suivants.length > 0 ? (
              <Section fond="glacier">
                <EnTeteSection surtitre="Blog" titre={t.aLire} />
                <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
                  {suivants.map((article) => {
                    const traduction = article.traductions![lang]!;
                    return (
                      <li key={article.slug}>
                        <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte transition duration-300 hover:-translate-y-1 hover:shadow-flottant">
                          {article.visuel ? (
                            <Visuel
                              nom={article.visuel.nom}
                              alt={traduction.altVisuel ?? article.visuel.alt}
                              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                              className="aspect-[16/10] w-full object-cover"
                            />
                          ) : null}
                          <div className="flex flex-1 flex-col p-5">
                            <h3 className="font-display text-titre-carte text-alpine">
                              <Link
                                className="hover:text-marque"
                                href={`/${lang}/blog/${traduction.slug}/`}
                              >
                                {traduction.titre}
                              </Link>
                            </h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-alpine-600">
                              {traduction.chapo}
                            </p>
                            <p className="mt-4 flex flex-wrap items-center gap-x-3 text-xs text-alpine-600">
                              <time dateTime={article.datePublication}>
                                {dateLongue(article.datePublication, lang)}
                              </time>
                              <span aria-hidden="true">·</span>
                              <span>{t.minutesLecture(minutesLecture(traduction.contenu))}</span>
                            </p>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </Section>
            ) : null}
          </>
        ) : null}

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{t.reservezAlpes}</h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">{t.inclusCourt}</p>
            <BoutonAction sur="sombre" href={lienReserver(lang)} className="mt-6">
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
