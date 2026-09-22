import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import FormulaireDemandePremium from "@/components/FormulaireDemandePremium";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import {
  BoutonAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { ANCRE_FORMULAIRE, PAGE_PREMIUM } from "@/data/page-premium";
import { ENTREPRISE } from "@/data/site";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import type { PageFonctionnelle } from "@/lib/pages";
import { CHEMIN_PAGE_RESERVATION } from "@/lib/reservation/config";
import {
  filArianeSchema,
  faqSchema,
  grapheJsonLd,
  organisationSchema,
  serviceCatalogueSchema,
} from "@/lib/schema";

/**
 * `/luxury-ski-transfers/` — demandes sur mesure.
 *
 * Comme `/inquiry/`, le bandeau **ne porte pas le formulaire de recherche** : le
 * tunnel ne sait pas chiffrer une mise à disposition de six jours ni un vol
 * affrété, et l'y envoyer serait l'envoyer vers un refus. Mais contrairement à
 * `/inquiry/`, l'appel à l'action n'est pas un `mailto:` : il descend vers le
 * formulaire de la page. Un client qui demande une mise à disposition ouvre
 * rarement son logiciel de courrier pour écrire quatre lignes de dates — il
 * remplit ce qu'on lui présente, à condition que ce soit court et à sa place.
 *
 * Le téléphone reste visible à côté, sans concurrencer le bouton : sur ce type
 * de demande, une part des visiteurs appelle, et ceux-là décident vite.
 */
export default function PagePremium({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Luxury ski transfers", chemin },
  ];
  const ancre = `#${ANCRE_FORMULAIRE}`;

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur image={PAGE_PREMIUM.heroImage}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <Reperes items={[...PAGE_PREMIUM.reperes]} />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={ancre}>Send your request</BoutonAction>
            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              or call {ENTREPRISE.telephoneAffiche}
            </a>
          </div>
        </HeroInterieur>

        {/* ---------------------------------------------------- introduction */}
        <Section fond="blanc">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_PREMIUM.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
              {/*
                Le renvoi vers les groupes est ici, en fin d'introduction, et pas
                dans le pied : les deux pages se ressemblent de loin, et un
                visiteur qui cherchait un convoi de minibus doit pouvoir partir
                avant d'avoir lu une page de mise à disposition.
              */}
              <p className="text-sm text-alpine-600">
                Travelling as a large party rather than a private one?{" "}
                <Link href="/inquiry/" className="font-semibold text-marque hover:underline">
                  Group ski transfers
                </Link>{" "}
                covers several vehicles quoted as one journey.
              </p>
            </div>
            <Visuel
              nom={PAGE_PREMIUM.introImage.nom}
              alt={PAGE_PREMIUM.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* ------------------------------------------------------ prestations */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_PREMIUM.prestations.surtitre}
            titre={PAGE_PREMIUM.prestations.titre}
            chapo={PAGE_PREMIUM.prestations.chapo}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2" data-anime-decale>
            {PAGE_PREMIUM.prestations.cartes.map((carte) => (
              <article
                key={carte.titre}
                className="flex flex-col rounded-xl border border-glacier-200 bg-white p-6 shadow-carte"
              >
                <h2 className="font-display text-titre-carte text-alpine">{carte.titre}</h2>
                <p className="mt-3 text-sm leading-relaxed text-alpine-600">{carte.texte}</p>
                <ul className="mt-5 space-y-2 border-t border-glacier-200 pt-5">
                  {carte.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-alpine-700"
                    >
                      <Coche className="mt-0.5 h-4 w-4 shrink-0 text-alpes" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------------- pour qui */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={PAGE_PREMIUM.occasions.surtitre}
            titre={PAGE_PREMIUM.occasions.titre}
            chapo={PAGE_PREMIUM.occasions.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
            {PAGE_PREMIUM.occasions.points.map((point) => (
              <li
                key={point.titre}
                className="rounded border border-glacier-200 bg-white p-5 shadow-carte"
              >
                <p className="font-display text-base font-semibold text-alpine">{point.titre}</p>
                <p className="mt-3 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------------- discrétion */}
        <Section fond="nuit">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {PAGE_PREMIUM.discretion.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {PAGE_PREMIUM.discretion.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {PAGE_PREMIUM.discretion.chapo}
              </p>
            </div>
            <ul className="space-y-3">
              {PAGE_PREMIUM.discretion.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/90">
                  <Coche className="mt-1 h-4 w-4 shrink-0 text-alpes-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* -------------------------------------------------- comment ça marche */}
        <section className="bg-alpine text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2" data-anime>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {PAGE_PREMIUM.fonctionnement.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {PAGE_PREMIUM.fonctionnement.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {PAGE_PREMIUM.fonctionnement.chapo}
              </p>
              <BoutonAction href={ancre} className="mt-6">
                Start your request
              </BoutonAction>
            </div>
            <ol className="space-y-4">
              {PAGE_PREMIUM.fonctionnement.etapes.map((etape, i) => (
                <li key={etape.titre} className="flex gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{i + 1}.</span>
                  <span>
                    <span className="font-semibold">{etape.titre}</span> — {etape.texte}
                  </span>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/90">
                {PAGE_PREMIUM.fonctionnement.conclusion}{" "}
                <Link
                  href={CHEMIN_PAGE_RESERVATION}
                  className="underline underline-offset-2 hover:text-white"
                >
                  Book ski transfer tickets
                </Link>
                .
              </li>
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- formulaire */}
        <Section fond="glacier" id={ANCRE_FORMULAIRE}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div>
              <EnTeteSection
                surtitre={PAGE_PREMIUM.formulaire.surtitre}
                titre={PAGE_PREMIUM.formulaire.titre}
                chapo={PAGE_PREMIUM.formulaire.chapo}
              />
              <div className="mt-8 rounded-xl border border-glacier-200 bg-white p-6 shadow-carte">
                <FormulaireDemandePremium />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              {/* Une part de cette clientèle appelle. Le numéro doit être lisible. */}
              <div className="rounded border border-glacier-200 bg-white p-5">
                <p className="font-display text-lg text-alpine">Prefer to talk it through?</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  Complex programmes are often quicker to describe out loud than to type. Call and
                  we will take the outline down for you.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      className="font-semibold text-alpine-700 hover:text-marque"
                      href={`tel:${ENTREPRISE.telephone}`}
                    >
                      {ENTREPRISE.telephoneAffiche}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-alpine-700 hover:text-marque"
                      href={`mailto:${ENTREPRISE.email}`}
                    >
                      {ENTREPRISE.email}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Le raccourci pour ceux qui n'ont besoin que d'un trajet. */}
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Just one airport run?</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  A single vehicle from an airport to a resort is priced instantly by the booking
                  form — no request, no waiting.
                </p>
                <Link
                  href={CHEMIN_PAGE_RESERVATION}
                  className="mt-4 inline-block rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
                >
                  Get a price
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about luxury ski transfers"
          surtitre="Good to know"
        />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          /*
            Les quatre prestations déclarées une par une. Sans ce nœud, un moteur
            de réponse interrogé sur « helicopter transfer to Courchevel » doit
            déduire de la prose que le service existe ; avec lui, il le lit.
          */
          serviceCatalogueSchema({
            id: "demandes-sur-mesure",
            chemin,
            nom: "Luxury and bespoke ski transfers",
            description: page.chapo,
            prestations: PAGE_PREMIUM.prestations.cartes.map((carte) => ({
              titre: carte.titre,
              texte: carte.texte,
            })),
          }),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(page.faq),
        )}
      />
    </>
  );
}
