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
  AppelAction,
  Coche,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { PAGE_STATIONS } from "@/data/page-stations";
import { accesStation, duree } from "@/lib/airports/dessertes";
import type { PageFonctionnelle } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
import { LIEUX } from "@/lib/reservation/lieux";
import { RESORTS_MIGRES, SLUG_PAYS } from "@/lib/resorts";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { TRANSFERS } from "@/lib/transfers";

/**
 * `/ski-resort-transfers/` — l'index des destinations, et la cible du lien
 * « All resorts » de la barre de navigation.
 *
 * Sa seule règle : **montrer toutes les stations**. Le WordPress en listait onze
 * sur soixante-huit, deux fois chacune, avec des durées écrites à la main dont
 * plusieurs étaient fausses. Ici la liste vient du registre et les temps de route
 * des itinéraires calculés — une station ajoutée apparaît sans que personne y
 * pense, et aucune durée n'est saisie à la main.
 *
 * La page ne développe aucune destination : elle nomme, elle chiffre, elle
 * renvoie. Le contenu de fond appartient aux pages de station.
 */
export default function PageStations({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Ski resort transfers", chemin },
  ];

  /*
   * Les stations rangées par pays, dans l'ordre des hubs. Chaque entrée porte
   * son aéroport le plus rapide : c'est le repère qui aide à choisir, bien plus
   * qu'une distance à vol d'oiseau.
   */
  const parPays = Object.entries(PAYS)
    .filter(([, pays]) => pays.code !== "DE")
    .map(([silo, pays]) => ({
      silo,
      nom: pays.nom,
      stations: RESORTS_MIGRES.filter((r) => r.country === pays.code)
        .map((station) => ({
          slug: station.slug,
          nom: station.name,
          chemin: `/${SLUG_PAYS[station.country]}/${station.slug}/`,
          acces: accesStation(station.slug),
        }))
        .sort((a, b) => a.nom.localeCompare(b.nom, "en")),
    }))
    .filter((pays) => pays.stations.length > 0);

  const total = parPays.reduce((somme, pays) => somme + pays.stations.length, 0);

  const reperes = [
    { libelle: "Ski resorts", valeur: `${total}` },
    { libelle: "Airport routes", valeur: `${TRANSFERS.length}` },
    { libelle: "Countries", valeur: `${parPays.length}` },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur debordant image={PAGE_STATIONS.heroImage}>
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
          {/*
            Texte à gauche, photo à droite. Les deux colonnes s'étirent à la même
            hauteur — c'est `items-stretch`, le comportement par défaut de la
            grille, qui le fait ; l'image le suit avec `h-full object-cover`,
            donc elle se recadre au lieu de se déformer.
          */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {PAGE_STATIONS.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={PAGE_STATIONS.introImage.nom}
              alt={PAGE_STATIONS.introImage.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {/* -------------------------------------------------- toutes les stations */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre={PAGE_STATIONS.destinations.surtitre}
            titre={PAGE_STATIONS.destinations.titre}
            chapo={PAGE_STATIONS.destinations.chapo}
          />

          <div className="mt-10 space-y-12">
            {parPays.map((pays) => (
              <div key={pays.silo}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-glacier-300 pb-3">
                  <h3 className="font-display text-2xl text-alpine">
                    <Link href={`/${pays.silo}/`} className="hover:text-marque">
                      {pays.nom}
                    </Link>
                  </h3>
                  <p className="text-sm text-alpine-600">
                    {pays.stations.length} resorts —{" "}
                    <Link
                      href={`/${pays.silo}/`}
                      className="underline underline-offset-2 hover:text-marque"
                    >
                      {pays.nom} ski transfers
                    </Link>
                  </p>
                </div>

                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  {pays.stations.map((station) => (
                    <li key={station.slug} className="border-b border-glacier-200">
                      <Link
                        href={station.chemin}
                        className="group flex items-baseline justify-between gap-3 py-2.5 text-sm transition hover:text-marque"
                      >
                        <span className="font-medium text-alpine group-hover:text-marque">
                          {station.nom}
                        </span>
                        {station.acces.aeroport && station.acces.minutes ? (
                          <span className="shrink-0 text-xs tabular-nums text-alpine-600">
                            {station.acces.aeroport} · {duree(station.acces.minutes)}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-alpine-600">
            The time shown is the drive from the fastest airport that has a transfer page for
            that resort, without traffic. Open a resort to see every airport that serves it.
          </p>
        </Section>

        {/* ------------------------------------------------------- la promesse */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre={PAGE_STATIONS.pourquoi.surtitre}
            titre={PAGE_STATIONS.pourquoi.titre}
            chapo={PAGE_STATIONS.pourquoi.chapo}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-anime-decale>
            {PAGE_STATIONS.pourquoi.points.map((point) => (
              <li key={point.titre}>
                <p className="flex items-start gap-3 font-display text-base font-semibold text-alpine">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-alpes-50 text-alpes">
                    <Coche className="h-3.5 w-3.5" />
                  </span>
                  {point.titre}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">{point.texte}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about ski resort transfers"
          surtitre="Good to know"
        />

        <AppelAction titre="Book your transfer to any of these resorts" />
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
