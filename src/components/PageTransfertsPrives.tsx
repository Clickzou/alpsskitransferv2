import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import FormulaireRecherche from "@/components/accueil/FormulaireRecherche";
import {
  BoutonAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { VEHICULES } from "@/data/accueil";
import { PAGE_TRANSFERTS_PRIVES } from "@/data/page-transferts-prives";
import { airportParSlug } from "@/lib/airports";
import { dessertes, duree } from "@/lib/airports/dessertes";
import type { PageFonctionnelle } from "@/lib/pages";
import { CHEMIN_PAGE_RESERVATION, lienTunnel } from "@/lib/reservation/config";
import { CAPACITE, CAPACITE_BAGAGES } from "@/lib/reservation/devis";
import { LIEUX } from "@/lib/reservation/lieux";
import { SLUG_PAYS } from "@/lib/resorts";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import type { CategorieVehicule } from "@/lib/tarification/bareme";

/**
 * `/private-airport-transfers-to-alps-ski-resort/` — la page de service.
 *
 * Elle répond à « qu'est-ce que j'achète, et combien de temps dure la route ? ».
 * Sa section utile est donc le tableau des temps de trajet par aéroport : c'est
 * la seule page du site qui met les dix portes d'entrée côte à côte, et c'est
 * elle qui distribue le maillage vers les hubs d'aéroport et les pages de trajet.
 *
 * Les durées ne sont pas rédigées : elles sortent des itinéraires calculés, à un
 * seul endroit. Le texte du WordPress en annonçait plusieurs de fausses, et une
 * durée fausse sur une page de service se retrouve en réclamation.
 */
export default function PageTransfertsPrives({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Private airport ski transfers", chemin },
  ];

  /*
   * Chaque départ est résolu sur les registres : le hub de l'aéroport, puis pour
   * chaque station sa distance, sa durée et le meilleur lien disponible — la
   * page de trajet quand elle existe, la page de station sinon. Une station sans
   * distance calculée est écartée plutôt qu'affichée sans chiffre.
   */
  const departs = PAGE_TRANSFERTS_PRIVES.aeroports.selection
    .map((depart) => {
      const aeroport = airportParSlug(depart.airport);
      if (!aeroport) return null;
      const toutes = dessertes(depart.airport);
      const lignes = depart.resorts
        .map((resort) => toutes.find((d) => d.resort === resort))
        .filter((d): d is NonNullable<typeof d> => Boolean(d))
        .sort((a, b) => (a.minutes ?? 0) - (b.minutes ?? 0));
      if (lignes.length === 0) return null;
      return {
        slug: aeroport.slug,
        nom: aeroport.name,
        iata: aeroport.iata,
        texte: depart.texte,
        hub: `/${SLUG_PAYS[aeroport.country]}/${aeroport.slug}/`,
        lignes,
      };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null);

  const reperes = [
    { libelle: "Airports served", valeur: `${departs.length}+` },
    { libelle: "Passengers", valeur: "Up to 8 per vehicle" },
    { libelle: "Waiting time", valeur: "None" },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur debordant image={PAGE_TRANSFERTS_PRIVES.heroImage}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <div className="relative z-20 mt-8">
            <FormulaireRecherche lieux={LIEUX} />
          </div>

          <div className="relative z-0">
            <Reperes items={reperes} />
          </div>
        </HeroInterieur>

        {/* ---------------------------------------------------- introduction */}
        <Section fond="blanc">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_TRANSFERTS_PRIVES.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={PAGE_TRANSFERTS_PRIVES.introImage.nom}
              alt={PAGE_TRANSFERTS_PRIVES.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* ------------------------------------------------------ pourquoi privé */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_TRANSFERTS_PRIVES.pourquoi.surtitre}
            titre={PAGE_TRANSFERTS_PRIVES.pourquoi.titre}
            chapo={PAGE_TRANSFERTS_PRIVES.pourquoi.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2" data-anime-decale>
            {PAGE_TRANSFERTS_PRIVES.pourquoi.points.map((point) => (
              <li
                key={point.titre}
                className="rounded border border-glacier-200 bg-white p-5 shadow-carte"
              >
                <p className="flex items-start gap-3 font-display text-base font-semibold text-alpine">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-alpes-50 text-alpes">
                    <Coche className="h-3.5 w-3.5" />
                  </span>
                  {point.titre}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------------------------------------------------- véhicules */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={PAGE_TRANSFERTS_PRIVES.vehicules.surtitre}
            titre={PAGE_TRANSFERTS_PRIVES.vehicules.titre}
            chapo={PAGE_TRANSFERTS_PRIVES.vehicules.chapo}
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-3" data-anime-decale>
            {VEHICULES.categories.map((vehicule) => {
              /*
               * La capacité en bagages vient du moteur de réservation, pas d'un
               * texte : c'est elle qui décide de la catégorie en hiver, et c'est
               * ce que cette page apporte de plus que la liste de la home.
               */
              const categorie = vehicule.nom.toLowerCase() as CategorieVehicule;
              return (
                <article
                  key={vehicule.nom}
                  className="group flex flex-col overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-carte transition duration-300 hover:-translate-y-1.5 hover:border-glacier-300 hover:shadow-flottant"
                >
                  <div className="relative flex aspect-[16/10] items-center justify-center px-6 pb-8 pt-6">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-6 left-1/2 h-4 w-3/5 -translate-x-1/2 rounded-[50%] bg-alpine/25 blur-md transition-all duration-500 group-hover:h-3 group-hover:w-2/3 group-hover:bg-alpine/20"
                    />
                    <Visuel
                      nom={vehicule.image.nom}
                      alt={vehicule.image.alt}
                      sizes="(min-width: 640px) 32vw, 90vw"
                      className="relative h-full w-full object-contain transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-glacier-200 p-6">
                    <h3 className="font-display text-titre-carte text-alpine">{vehicule.nom}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-alpine-600">
                      {vehicule.modele}
                    </p>
                    <dl className="mt-5 space-y-2 border-t border-glacier-100 pt-4 text-sm">
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-alpine-600">Passengers</dt>
                        <dd className="font-semibold tabular-nums text-alpine">
                          up to {CAPACITE[categorie]}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-alpine-600">Bags and ski carriers</dt>
                        <dd className="font-semibold tabular-nums text-alpine">
                          up to {CAPACITE_BAGAGES[categorie]}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* ------------------------------------------ temps de trajet par aéroport */}
        <section className="bg-alpine-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-section" data-anime>
            <EnTeteSection
              clair
              surtitre={PAGE_TRANSFERTS_PRIVES.aeroports.surtitre}
              titre={PAGE_TRANSFERTS_PRIVES.aeroports.titre}
              chapo={PAGE_TRANSFERTS_PRIVES.aeroports.chapo}
            />

            <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
              {departs.map((depart) => (
                <div key={depart.slug}>
                  <h3 className="font-display text-titre-carte">
                    <Link href={depart.hub} className="transition hover:text-alpes-300">
                      {depart.nom}
                    </Link>{" "}
                    <span className="text-sm font-normal text-glacier-400">({depart.iata})</span>
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-glacier-300">
                    {depart.texte}
                  </p>

                  <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                    {depart.lignes.map((ligne) => (
                      <li key={ligne.resort}>
                        <Link
                          href={ligne.cheminTrajet ?? ligne.cheminStation}
                          className="group flex items-baseline justify-between gap-4 py-2.5 text-sm transition hover:text-alpes-300"
                        >
                          <span className="group-hover:underline">{ligne.nom}</span>
                          <span className="shrink-0 tabular-nums text-glacier-400">
                            {ligne.km} km
                            {ligne.minutes ? ` · ${duree(ligne.minutes)}` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- sur demande */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={PAGE_TRANSFERTS_PRIVES.surDemande.surtitre}
            titre={PAGE_TRANSFERTS_PRIVES.surDemande.titre}
            chapo={PAGE_TRANSFERTS_PRIVES.surDemande.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-anime-decale>
            {PAGE_TRANSFERTS_PRIVES.surDemande.points.map((point) => (
              <li key={point.titre} className="border-t-2 border-alpes pt-4">
                <p className="font-display text-base font-semibold text-alpine">{point.titre}</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------------------------------------------- comment réserver */}
        <section className="bg-alpine text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2" data-anime>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {PAGE_TRANSFERTS_PRIVES.etapes.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {PAGE_TRANSFERTS_PRIVES.etapes.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {PAGE_TRANSFERTS_PRIVES.etapes.chapo}
              </p>
              <BoutonAction sur="sombre" href={lienTunnel()} className="mt-6">
                Get your price
              </BoutonAction>
            </div>
            <ol className="space-y-4">
              {PAGE_TRANSFERTS_PRIVES.etapes.etapes.map((etape, i) => (
                <li key={etape.titre} className="flex gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{i + 1}.</span>
                  <span>
                    <span className="font-semibold">{etape.titre}</span> — {etape.texte}
                  </span>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/90">
                {PAGE_TRANSFERTS_PRIVES.etapes.conclusion}{" "}
                <Link href="/inquiry/" className="underline underline-offset-2 hover:text-white">
                  Send a special inquiry
                </Link>
                .
              </li>
            </ol>
          </div>
        </section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about private airport ski transfers"
          surtitre="Good to know"
        />

        {/* Le lien éditorial vers la page de réservation, en ancre exacte. */}
        <Section fond="glacier" className="text-center">
          <p className="text-sm text-alpine-700">
            Ready to go?{" "}
            <Link
              href={CHEMIN_PAGE_RESERVATION}
              className="font-semibold text-marque underline underline-offset-2"
            >
              Book ski transfer tickets
            </Link>{" "}
            in a few minutes, or{" "}
            <Link href="/ski-resort-transfers/" className="underline underline-offset-2">
              browse the resorts we serve
            </Link>
            .
          </p>
        </Section>
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
