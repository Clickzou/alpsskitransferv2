import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
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
import { ENTREPRISE } from "@/data/site";
import { PAGE_GROUPES } from "@/data/page-groupes";
import type { PageFonctionnelle } from "@/lib/pages";
import { CHEMIN_PAGE_RESERVATION } from "@/lib/reservation/config";
import { CAPACITE } from "@/lib/reservation/devis";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * `/inquiry/` — groupes et professionnels.
 *
 * Le seul gabarit du silo **sans formulaire de recherche** dans son bandeau, et
 * c'est délibéré : le tunnel ne sait pas chiffrer un convoi de trois véhicules
 * au départ de deux aéroports. Lui proposer ici reviendrait à envoyer le
 * visiteur vers un outil qui va le refuser. L'appel à l'action est donc un
 * contact direct — e-mail et téléphone, tous deux visibles.
 */
export default function PageGroupes({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Group ski transfers", chemin },
  ];

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur image={PAGE_GROUPES.heroImage}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <Reperes
            items={[
              { libelle: "Per vehicle", valeur: `Up to ${CAPACITE.standard} passengers` },
              { libelle: "Larger parties", valeur: "Several vehicles, one arrival" },
              { libelle: "Quote", valeur: "Within a working day" },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={`mailto:${ENTREPRISE.email}`}>Send your request</BoutonAction>
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
          {/*
            Texte à gauche, photo à droite. Le texte est centré sur la hauteur
            de l'image (`items-center`) : la colonne de texte est plus courte,
            et la caler en haut laissait un vide sous elle qui déséquilibrait la
            section.
          */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_GROUPES.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={PAGE_GROUPES.introImage.nom}
              alt={PAGE_GROUPES.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* ------------------------------------------------------- pour qui */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_GROUPES.pourQui.surtitre}
            titre={PAGE_GROUPES.pourQui.titre}
            chapo={PAGE_GROUPES.pourQui.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2" data-anime-decale>
            {PAGE_GROUPES.pourQui.points.map((point) => (
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

        {/* --------------------------------------------------- ce qu'on arrange */}
        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <EnTeteSection
              surtitre={PAGE_GROUPES.arranger.surtitre}
              titre={PAGE_GROUPES.arranger.titre}
              chapo={PAGE_GROUPES.arranger.chapo}
            />
            <ul className="space-y-3">
              {PAGE_GROUPES.arranger.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-alpine-700">
                  <Coche className="mt-1 h-4 w-4 shrink-0 text-alpes" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ------------------------------------------------- comment ça marche */}
        <section className="bg-alpine text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2" data-anime>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {PAGE_GROUPES.fonctionnement.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {PAGE_GROUPES.fonctionnement.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {PAGE_GROUPES.fonctionnement.chapo}
              </p>
              <BoutonAction href={`mailto:${ENTREPRISE.email}`} className="mt-6">
                Request a quote
              </BoutonAction>
            </div>
            <ol className="space-y-4">
              {PAGE_GROUPES.fonctionnement.etapes.map((etape, i) => (
                <li key={etape.titre} className="flex gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{i + 1}.</span>
                  <span>
                    <span className="font-semibold">{etape.titre}</span> — {etape.texte}
                  </span>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/90">
                {PAGE_GROUPES.fonctionnement.conclusion}{" "}
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

        <Faq
          items={page.faq}
          titre="Frequently asked questions about group ski transfers"
          surtitre="Good to know"
        />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(page.faq),
        )}
      />
    </>
  );
}
