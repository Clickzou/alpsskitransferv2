import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import FormulaireRecherche from "@/components/accueil/FormulaireRecherche";
import { AppelAction, EnTeteSection, HeroInterieur, Reperes, Section } from "@/components/gabarit/Sections";
import { AIRPORTS } from "@/lib/airports";
import { dessertes, duree } from "@/lib/airports/dessertes";
import type { PageFonctionnelle } from "@/lib/pages";
import { PAYS } from "@/lib/pays";
import { LIEUX } from "@/lib/reservation/lieux";
import { SLUG_PAYS } from "@/lib/resorts";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * `/airport-ski-transfers/` — l'index des aéroports.
 *
 * Le pendant de `/ski-resort-transfers/` : celui-ci part du départ plutôt que de
 * l'arrivée. Chaque aéroport y est nommé, situé, chiffré — combien de stations
 * il dessert, laquelle est la plus proche — puis renvoyé vers son hub.
 *
 * La page ne développe aucun aéroport et n'héberge aucun trajet : c'est ce qui
 * la distingue de l'ancienne arborescence dont elle reprend l'URL, et qui
 * republiait sous cette racine des trajets déjà publiés ailleurs.
 */
export default function PageAeroports({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Airport ski transfers", chemin },
  ];

  /*
   * Les aéroports par pays, chacun avec ce qu'il dessert. `dessertes` ne rend
   * que les stations dont la distance est calculée : le compte affiché est donc
   * ce que la page peut réellement montrer, pas une promesse.
   */
  const parPays = Object.entries(PAYS)
    .filter(([, pays]) => pays.code !== "DE")
    .map(([silo, pays]) => ({
      silo,
      nom: pays.nom,
      aeroports: AIRPORTS.filter((a) => a.country === pays.code)
        .map((aeroport) => {
          const servies = dessertes(aeroport.slug);
          const avecPage = servies.filter((d) => d.cheminTrajet !== null);
          return {
            slug: aeroport.slug,
            nom: aeroport.name,
            iata: aeroport.iata,
            chemin: `/${SLUG_PAYS[aeroport.country]}/${aeroport.slug}/`,
            stations: servies.length,
            trajets: avecPage.length,
            plusProche: servies[0] ?? null,
          };
        })
        .sort((a, b) => b.trajets - a.trajets || a.nom.localeCompare(b.nom, "en")),
    }))
    .filter((pays) => pays.aeroports.length > 0);

  const total = parPays.reduce((somme, pays) => somme + pays.aeroports.length, 0);

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur
          debordant
          image={{
            nom: "aeroport-geneva-airport",
            alt: "Arrivals hall of an Alpine gateway airport in winter",
          }}
        >
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-4xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>

          <div className="relative z-20 mt-8">
            <FormulaireRecherche lieux={LIEUX} />
          </div>

          <div className="relative z-0">
            <Reperes
              items={[
                { libelle: "Airports", valeur: `${total}` },
                { libelle: "Countries", valeur: `${parPays.length}` },
                { libelle: "Busiest gateway", valeur: "Geneva" },
              ]}
            />
          </div>
        </HeroInterieur>

        {/* ------------------------------------------------- tous les aéroports */}
        <Section fond="glacier">
          <EnTeteSection
            surtitre="Departures"
            titre="Every airport we drive from"
            chapo="Grouped by country, with the number of resorts each one serves and the closest of them. Follow an airport to see all its routes and drive times."
          />

          <div className="mt-10 space-y-12">
            {parPays.map((pays) => (
              <div key={pays.silo}>
                <h3 className="border-b border-glacier-300 pb-3 font-display text-2xl text-alpine">
                  <Link href={`/${pays.silo}/`} className="hover:text-marque">
                    {pays.nom}
                  </Link>
                </h3>

                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pays.aeroports.map((aeroport) => (
                    <li key={aeroport.slug}>
                      <Link
                        href={aeroport.chemin}
                        className="group flex h-full flex-col rounded border border-glacier-200 bg-white p-4 transition hover:border-alpes hover:shadow-carte"
                      >
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="font-display text-base font-semibold text-alpine group-hover:text-marque">
                            {aeroport.nom}
                          </span>
                          <span className="shrink-0 text-xs text-alpine-600">{aeroport.iata}</span>
                        </span>
                        <span className="mt-2 flex-1 text-sm text-alpine-600">
                          {aeroport.trajets > 0
                            ? `${aeroport.trajets} transfer routes`
                            : `${aeroport.stations} resorts served`}
                        </span>
                        {aeroport.plusProche?.minutes ? (
                          <span className="mt-2 text-xs tabular-nums text-alpine-600">
                            Closest: {aeroport.plusProche.nom} ·{" "}
                            {duree(aeroport.plusProche.minutes)}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Faq
          items={page.faq}
          titre="Frequently asked questions about airport ski transfers"
          surtitre="Good to know"
        />

        <Section fond="blanc" className="text-center">
          <p className="text-sm text-alpine-700">
            Looking for a destination rather than a departure?{" "}
            <Link
              href="/ski-resort-transfers/"
              className="font-semibold text-marque underline underline-offset-2"
            >
              See every ski resort we transfer to
            </Link>
            .
          </p>
        </Section>

        <AppelAction titre="Book your transfer from any of these airports" />
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
