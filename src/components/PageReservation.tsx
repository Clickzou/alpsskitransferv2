import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
import { Suspense } from "react";
import TunnelAutonome from "@/components/reservation/TunnelAutonome";
import {
  BoutonAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { VEHICULES } from "@/data/accueil";
import { PAGE_RESERVATION } from "@/data/page-reservation";
import { airportParSlug } from "@/lib/airports";
import { dessertes, duree } from "@/lib/airports/dessertes";
import type { PageFonctionnelle } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
import { lienTunnel } from "@/lib/reservation/config";
import { LIEUX } from "@/lib/reservation/lieux";
import { RESORTS_MIGRES } from "@/lib/resorts";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { TRANSFERS } from "@/lib/transfers";

/**
 * `/book-ski-transfer-tickets/` — la page de conversion du silo anglais.
 *
 * Elle a son gabarit à elle, comme la home, parce qu'elle a un travail à faire
 * que le gabarit générique des pages fonctionnelles ne fait pas : convaincre,
 * puis envoyer au tunnel. Le contenu éditorial vit dans `data/page-reservation.ts`
 * — hors de portée de `migrer:pages`, qui réécrit les modules de `lib/pages/`.
 *
 * Le plan de titres suit l'intention « book ski transfer tickets » : d'abord les
 * liaisons demandées, puis le véhicule, puis ce que le billet comprend, puis
 * comment on réserve, puis les questions. Aucun développement de station ni de
 * trajet — la page renvoie en ancre exacte et laisse la page mère travailler.
 */
export default function PageReservation({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Book ski transfer tickets", chemin },
  ];

  /*
   * Les liaisons mises en avant, résolues sur les registres : une paire sans
   * page de trajet est écartée plutôt que liée dans le vide. Distance et durée
   * viennent des 2 108 itinéraires calculés — ce sont les seuls chiffres de la
   * page, et ils sont mesurés.
   */
  const routes = PAGE_RESERVATION.routes.selection
    .map(({ airport, resort }) => {
      const aeroport = airportParSlug(airport);
      const desserte = dessertes(airport).find((d) => d.resort === resort);
      if (!aeroport || !desserte?.cheminTrajet) return null;
      return {
        cle: `${airport}|${resort}`,
        aeroport: aeroport.name,
        station: desserte.nom,
        chemin: desserte.cheminTrajet,
        km: desserte.km,
        minutes: desserte.minutes,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const reperes = [
    { libelle: "Ski resorts served", valeur: `${RESORTS_MIGRES.length}` },
    { libelle: "Routes with their own page", valeur: `${TRANSFERS.length}` },
    { libelle: "Price", valeur: "Fixed per vehicle" },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur
          debordant
          image={{
            nom: "route-alpine",
            alt: "Snowy mountain road leading to an Alpine ski resort",
          }}
        >
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <Reperes items={reperes} />

          {/*
            Le bandeau ne porte plus le formulaire de recherche : le tunnel
            complet est juste en dessous, sur cette même page. Deux formulaires
            l'un au-dessus de l'autre obligeraient à saisir deux fois.
          */}
          <BoutonAction sur="sombre" href="#reserver" className="mt-8">
            Book your transfer
          </BoutonAction>
        </HeroInterieur>

        {/* ------------------------------------------------------- le tunnel */}
        <Section fond="blanc" id="reserver">
          <EnTeteSection
            surtitre="Book online"
            titre="Get your price and book"
            chapo="Enter your journey to see the price for your vehicle, then confirm. Tolls, ski carriage and flight tracking are included."
          />
          <div className="mt-8">
            <Suspense fallback={null}>
              <TunnelAutonome lieux={LIEUX} />
            </Suspense>
          </div>
        </Section>

        {/* ---------------------------------------------------- introduction */}
        <Section fond="glacier">
          {/*
            Texte à gauche, photo à droite. La colonne de texte garde sa mesure
            de lecture (`max-w-prose`) : c'est la photo qui prend le reste, pas
            les lignes qui s'allongent.
          */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_RESERVATION.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={PAGE_RESERVATION.introImage.nom}
              alt={PAGE_RESERVATION.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* ------------------------------------------- liaisons mises en avant */}
        <section className="bg-alpine-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-section" data-anime>
            <EnTeteSection
              clair
              surtitre={PAGE_RESERVATION.routes.surtitre}
              titre={PAGE_RESERVATION.routes.titre}
              chapo={PAGE_RESERVATION.routes.chapo}
            />

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <li key={route.cle}>
                  <Link
                    href={route.chemin}
                    className="group flex h-full flex-col rounded border border-white/15 p-4 transition hover:border-alpes hover:bg-white/5"
                  >
                    <span className="font-display text-base font-semibold group-hover:text-alpes-300">
                      {route.aeroport} → {route.station}
                    </span>
                    {route.km ? (
                      <span className="mt-2 text-xs tabular-nums text-glacier-400">
                        {route.km} km
                        {route.minutes ? ` · ${duree(route.minutes)}` : ""}
                      </span>
                    ) : null}
                    <span className="mt-3 text-sm font-medium text-alpes-300 group-hover:underline">
                      See this transfer →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Le maillage montant : les têtes de silo, en ancre exacte. */}
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-or-300">
                {PAGE_RESERVATION.silo.titre}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {Object.entries(PAYS)
                  .filter(([, pays]) => pays.code !== "DE")
                  .map(([slug, pays]) => (
                    <li key={slug}>
                      <Link href={`/${slug}/`} className="transition hover:text-alpes-300">
                        {pays.nom} ski transfers
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href={PAGE_RESERVATION.silo.lien.chemin}
                    className="transition hover:text-alpes-300"
                  >
                    {PAGE_RESERVATION.silo.lien.texte}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- véhicules */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={PAGE_RESERVATION.vehicules.surtitre}
            titre={PAGE_RESERVATION.vehicules.titre}
            chapo={PAGE_RESERVATION.vehicules.chapo}
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-3" data-anime-decale>
            {VEHICULES.categories.map((vehicule) => (
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
                  <p className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-alpes-50 px-3 py-1.5 text-sm font-semibold text-alpes-700">
                    <Coche className="h-3.5 w-3.5" />
                    {vehicule.capacite}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------- ce que le billet comprend */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_RESERVATION.inclus.surtitre}
            titre={PAGE_RESERVATION.inclus.titre}
            chapo={PAGE_RESERVATION.inclus.chapo}
          />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-anime-decale>
            {PAGE_RESERVATION.inclus.points.map((point) => (
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

        {/* ------------------------------------------------ comment on réserve */}
        <section className="bg-alpine text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-section lg:grid-cols-2" data-anime>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {PAGE_RESERVATION.etapes.surtitre}
              </p>
              <h2 className="mt-3 font-display text-titre-section">
                {PAGE_RESERVATION.etapes.titre}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {PAGE_RESERVATION.etapes.chapo}
              </p>
              <BoutonAction sur="sombre" href={lienTunnel()} className="mt-6">
                Book now
              </BoutonAction>
            </div>
            <ol className="space-y-4">
              {PAGE_RESERVATION.etapes.etapes.map((etape, i) => (
                <li key={etape.titre} className="flex gap-3 text-sm">
                  <span className="font-semibold tabular-nums">{i + 1}.</span>
                  <span>
                    <span className="font-semibold">{etape.titre}</span> — {etape.texte}
                  </span>
                </li>
              ))}
              <li className="pt-2 text-sm text-white/90">
                {PAGE_RESERVATION.etapes.conclusion}
              </li>
            </ol>
          </div>
        </section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about booking ski transfers"
          surtitre="Booking"
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
