import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contenu from "@/components/Contenu";
import Sommaire from "@/components/Sommaire";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import { AppelAction, CarteLien, EnTeteSection, HeroInterieur, Section } from "@/components/gabarit/Sections";
import Faq from "@/components/Faq";
import { airportParSlug } from "@/lib/airports";
import { articleParSlug, articlesLies, articlesPublies, articlesVoisins } from "@/lib/articles";
import { cheminTrajet } from "@/lib/intl/liens";
import { transferParSlugs } from "@/lib/transfers";
import { lienTunnel } from "@/lib/reservation/config";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { articleSchema, faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { alternativesArticle } from "@/lib/intl/liens";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return articlesPublies().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitre,
    description: article.metaDescription,
    path: `/blog/${article.slug}/`,
    lang: "en",
    alternatives: alternativesArticle(article, "en"),
    // Le visuel de tête sert aussi d'aperçu social, faute d'une image dédiée.
    image: article.image?.src ?? (article.visuel ? `/images/${article.visuel.nom}.avif` : undefined),
  });
}

/** « 8 September 2026 » — la forme longue, lisible sans effort. */
function dateLongue(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * `/blog/{slug}/` — un article.
 *
 * Le blog ne travaille que s'il ramène vers les pages qui vendent : la section
 * « Transfers mentioned » n'est donc pas un ajout décoratif mais la raison d'être
 * éditoriale de l'article, et elle est mise en cartes plutôt qu'en liste de
 * liens. Le bandeau reprend celui du reste du site — un article qui ressemble à
 * une page perdue n'inspire pas confiance sur un achat à trois cents euros.
 */
export default async function PageArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleParSlug(slug);
  if (!article) notFound();

  const chemin = `/blog/${article.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Blog", chemin: "/blog/" },
    { nom: article.titre, chemin },
  ];

  const stations = (article.stationsLiees ?? [])
    .map((slugStation) => resortParSlug(slugStation))
    .filter((station): station is NonNullable<typeof station> => Boolean(station));

  // Seuls les trajets qui ont une page : un lien vers une page inexistante serait une 404.
  const trajets = (article.trajetsLies ?? []).flatMap(({ airport, resort }) => {
    const station = resortParSlug(resort);
    const aeroport = airportParSlug(airport);
    if (!station || !aeroport || !transferParSlugs(airport, resort)) return [];
    const chemin = cheminTrajet(station, airport, "en");
    return chemin ? [{ chemin, titre: `${aeroport.name} to ${station.name}` }] : [];
  });
  const lies = articlesLies(article);
  const voisins = articlesVoisins(article.slug);

  return (
    <>
      <Header
        lang="en"
        alternatives={alternativesArticle(article, "en")}
      />
      <main id="contenu">
        <HeroInterieur image={article.visuel}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {article.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{article.chapo}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 text-xs text-glacier-300">
            <time dateTime={article.datePublication}>{dateLongue(article.datePublication)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.auteur}</span>
            {article.dateModification ? (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {dateLongue(article.dateModification)}</span>
              </>
            ) : null}
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              {/*
                « Key facts » en tête : le passage qu'un moteur de réponse extrait
                et cite. Chaque point se comprend seul.
              */}
              {article.aRetenir?.length ? (
                <aside className="mb-8 rounded border-l-4 border-alpes bg-glacier-50 px-5 py-4">
                  <p className="font-display text-lg text-alpine">Key facts</p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-alpine-700">
                    {article.aRetenir.map((fait) => (
                      <li key={fait}>{fait}</li>
                    ))}
                  </ul>
                </aside>
              ) : null}
              <Sommaire blocs={article.contenu} />
              <Contenu blocs={article.contenu} />
            </div>

            {/* La colonne d'appoint : le prix reste à portée pendant la lecture. */}
            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Planning this trip?</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  Fixed price per vehicle, flight tracking, and a driver waiting for you even if
                  your flight is late.
                </p>
                <Link
                  href={lienTunnel()}
                  className="mt-4 inline-block rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
                >
                  Get a price
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        {/* Le maillage sortant vers les pages qui convertissent. */}
        {stations.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre="Transfers mentioned"
              titre="Resorts covered in this guide"
              chapo="Each one has its own page, with the drive time from every airport that serves it."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
              {stations.map((station) => (
                <li key={station.slug}>
                  <CarteLien
                    href={`/${SLUG_PAYS[station.country]}/${station.slug}/`}
                    titre={station.name}
                    action="See transfers"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Les trajets servis : le maillage vers les pages qui vendent, et le plus précis. */}
        {trajets.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre="Routes in this guide"
              titre="Book the transfers this guide covers"
              chapo="Each route has its own page: distance, drive time, and a fixed price per vehicle."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((t) => (
                <li key={t.chemin}>
                  <CarteLien href={t.chemin} titre={t.titre} action="See this route" />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {article.faq?.length ? <Faq items={article.faq} titre="Frequently asked questions" /> : null}

        {/* Page précédente, page suivante : tout le blog se parcourt de proche en proche. */}
        {voisins.precedent && voisins.suivant ? (
          <nav aria-label="More guides" className="border-t border-glacier-200 bg-white">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2">
              <Link
                href={`/blog/${voisins.precedent.slug}/`}
                rel="prev"
                className="group rounded border border-glacier-200 p-5 transition hover:border-alpes/50 hover:bg-glacier-50"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-alpine-600">← Previous guide</span>
                <span className="mt-1 block font-display text-lg text-alpine group-hover:text-alpes">
                  {voisins.precedent.titre}
                </span>
              </Link>
              <Link
                href={`/blog/${voisins.suivant.slug}/`}
                rel="next"
                className="group rounded border border-glacier-200 p-5 text-right transition hover:border-alpes/50 hover:bg-glacier-50"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-alpine-600">Next guide →</span>
                <span className="mt-1 block font-display text-lg text-alpine group-hover:text-alpes">
                  {voisins.suivant.titre}
                </span>
              </Link>
            </div>
          </nav>
        ) : null}

        {lies.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection surtitre="Keep reading" titre="Related guides" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lies.map((a) => (
                <li key={a.slug}>
                  <CarteLien href={`/blog/${a.slug}/`} titre={a.titre} action="Read" />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <AppelAction titre="Book your airport ski transfer" />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(article.faq ?? []),
          articleSchema({
            titre: article.titre,
            description: article.metaDescription,
            path: chemin,
            datePublication: article.datePublication,
            dateModification: article.dateModification,
            image:
              article.image?.src ??
              (article.visuel ? `/images/${article.visuel.nom}.avif` : undefined),
          }),
        )}
      />
    </>
  );
}
