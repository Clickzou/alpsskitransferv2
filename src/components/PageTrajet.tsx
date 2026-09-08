import Link from "next/link";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import {
  AppelAction,
  BandeauReassurance,
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { airportParSlug } from "@/lib/airports";
import { duree } from "@/lib/airports/dessertes";
import { PAYS } from "@/lib/pays";
import { lienReservation } from "@/lib/reservation/config";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { segmentTrajet, transferParSlugs, transfersDeLaStation } from "@/lib/transfers";

/* ------------------------------------------------------------------ trajet */

/**
 * Page de trajet — page fille, sous sa station.
 *
 * Une seule URL par trajet : les anciennes formes `/airport-ski-transfers/…` et
 * `/destination/…` y arrivent en 301. Le maillage remontant vers la page mère est
 * obligatoire, et les autres aéroports qui desservent la station sont proposés
 * ici — c'est la question que se pose le visiteur qui n'a pas encore son billet
 * d'avion.
 */
export default function PageTrajet({
  silo,
  resort,
  airport,
}: {
  silo: string;
  resort: string;
  airport: string;
}) {
  const station = resortParSlug(resort)!;
  const trajet = transferParSlugs(airport, resort)!;
  const aeroport = airportParSlug(airport)!;
  const pays = PAYS[silo];

  const cheminStation = `/${silo}/${station.slug}/`;
  const chemin = `${cheminStation}${segmentTrajet(airport)}/`;
  const court = aeroport.name.replace(" Airport", "");

  const distance = DISTANCES.find((d) => d.airport === airport && d.resort === resort);

  // Les autres aéroports qui desservent la station, du plus proche au plus loin.
  const autres = transfersDeLaStation(station.slug)
    .filter((t) => t.airport !== airport)
    .map((t) => {
      const a = airportParSlug(t.airport);
      const d = DISTANCES.find((x) => x.airport === t.airport && x.resort === station.slug);
      return {
        slug: t.airport,
        nom: a?.name ?? t.airport,
        court: (a?.name ?? t.airport).replace(" Airport", ""),
        chemin: `${cheminStation}${segmentTrajet(t.airport)}/`,
        km: d?.km ?? null,
        minutes: d?.minutes ?? null,
      };
    })
    .sort((a, b) => (a.km ?? 9999) - (b.km ?? 9999));

  const filAriane = [
    { nom: "Home", chemin: "/" },
    ...(pays ? [{ nom: pays.nom, chemin: `/${silo}/` }] : []),
    { nom: station.name, chemin: cheminStation },
    { nom: aeroport.name, chemin },
  ];

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur
          image={{ nom: "route-alpine", alt: "Route de montagne enneigée au coucher du soleil" }}
        >
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {trajet.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            {trajet.chapo}
          </p>

          <Reperes
            items={[
              ...(distance?.km ? [{ libelle: "Distance", valeur: `${distance.km} km` }] : []),
              ...(distance?.minutes
                ? [{ libelle: "Drive time", valeur: duree(distance.minutes) }]
                : []),
              { libelle: "Price", valeur: "Fixed, per vehicle" },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={lienReservation({ airport, resort })}>Get a price</BoutonAction>
            <Link
              href={cheminStation}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              All transfers to {station.name}
            </Link>
          </div>
        </HeroInterieur>

        <BandeauReassurance />

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={trajet.contenu} />

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Your journey</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">From</dt>
                    <dd className="text-right font-medium text-alpine">{aeroport.name}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">To</dt>
                    <dd className="text-right font-medium text-alpine">{station.name}</dd>
                  </div>
                  {distance?.km ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-alpine-600">Distance</dt>
                      <dd className="tabular-nums text-alpine">{distance.km} km</dd>
                    </div>
                  ) : null}
                  {distance?.minutes ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-alpine-600">Drive time</dt>
                      <dd className="tabular-nums text-alpine">{duree(distance.minutes)}</dd>
                    </div>
                  ) : null}
                </dl>
                <Link
                  href={`/${SLUG_PAYS[aeroport.country]}/${aeroport.slug}/`}
                  className="mt-4 inline-block text-sm font-medium text-marque underline underline-offset-4"
                >
                  All resorts from {court}
                </Link>
              </div>

              <div className="rounded bg-alpine p-5 text-white">
                <p className="font-display text-lg">Ready to book?</p>
                <p className="mt-2 text-sm text-glacier-200">
                  One price per vehicle, flight tracking, and a driver waiting for you even
                  if your flight is late.
                </p>
                <BoutonAction href={lienReservation({ airport, resort })} className="mt-4">
                  Book now
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        {autres.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre="Other routes"
              titre={`Other airports serving ${station.name}`}
              chapo={`Not flying into ${court}? These airports also serve ${station.name}.`}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((t) => (
                <li key={t.slug}>
                  <CarteLien
                    href={t.chemin}
                    titre={`${t.court} → ${station.name}`}
                    meta={[t.km ? `${t.km} km` : null, duree(t.minutes) || null]
                      .filter(Boolean)
                      .join(" · ")}
                    action="See this route"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Faq items={trajet.faq} titre={`Frequently asked questions — ${court} to ${station.name}`} />

        <AppelAction
          titre={`Book your transfer from ${aeroport.name} to ${station.name}`}
          lien={lienReservation({ airport, resort })}
        />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(trajet.faq),
        )}
      />
    </>
  );
}
