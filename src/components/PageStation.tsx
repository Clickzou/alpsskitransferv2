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
import { articlesDeLaStation } from "@/lib/articles";
import { PAYS } from "@/lib/pays";
import { lienReservation } from "@/lib/reservation/config";
import { RESORTS_MIGRES, resortParSlug } from "@/lib/resorts";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { segmentTrajet, transfersDeLaStation } from "@/lib/transfers";
import { visuelStation } from "@/lib/visuels";

/* ------------------------------------------------------------------ station */

/**
 * Page de station — page mère du silo, au design de la home.
 *
 * Le contenu vient tel quel du WordPress ; ce qui est ajouté ici est de la mise
 * en page et du maillage : les trajets vers la station avec leur distance et leur
 * durée, les stations voisines du même pays, les articles qui les citent. C'est
 * la page qui porte l'antériorité du site, et la seule à laquelle les 92 anciennes
 * pages `/destination/` finissent par renvoyer.
 */
export default function PageStation({ silo, slug }: { silo: string; slug: string }) {
  const station = resortParSlug(slug)!;
  const chemin = `/${silo}/${station.slug}/`;
  const pays = PAYS[silo];
  const articles = articlesDeLaStation(station.slug);

  // Les trajets de la station, du plus court au plus long : c'est l'ordre dans
  // lequel un voyageur choisit son aéroport d'arrivée.
  const trajets = transfersDeLaStation(station.slug)
    .map((t) => {
      const aeroport = airportParSlug(t.airport);
      const distance = DISTANCES.find(
        (d) => d.airport === t.airport && d.resort === station.slug,
      );
      return {
        slug: t.airport,
        nom: aeroport?.name ?? t.airport,
        court: (aeroport?.name ?? t.airport).replace(" Airport", ""),
        chemin: `${chemin}${segmentTrajet(t.airport)}/`,
        km: distance?.km ?? null,
        minutes: distance?.minutes ?? null,
      };
    })
    .sort((a, b) => (a.km ?? 9999) - (b.km ?? 9999));

  const plusProche = trajets.find((t) => t.km !== null);

  const voisines = RESORTS_MIGRES.filter(
    (r) => r.country === station.country && r.slug !== station.slug,
  )
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6);

  const repere = (t: (typeof trajets)[number]) =>
    [t.km ? `${t.km} km` : null, duree(t.minutes) || null].filter(Boolean).join(" · ");

  const filAriane = [
    { nom: "Home", chemin: "/" },
    ...(pays ? [{ nom: pays.nom, chemin: `/${silo}/` }] : []),
    { nom: station.name, chemin },
  ];

  return (
    <>
      <Header
        lang="en"
        alternate={
          station.fr ? { lang: "fr", path: `/fr/transferts-ski/${station.fr.slug}/` } : undefined
        }
      />
      <main id="contenu">
        <HeroInterieur image={visuelStation(station.slug, station.name)}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {station.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            {station.chapo}
          </p>

          <Reperes
            items={[
              ...(trajets.length > 0
                ? [{ libelle: "Airport routes", valeur: String(trajets.length) }]
                : []),
              ...(plusProche
                ? [
                    {
                      libelle: `From ${plusProche.court}`,
                      valeur: `${plusProche.km} km`,
                    },
                    ...(plusProche.minutes
                      ? [{ libelle: "Drive time", valeur: duree(plusProche.minutes) }]
                      : []),
                  ]
                : []),
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href={lienReservation({ resort: station.slug })}>Get a price</BoutonAction>
            {trajets.length > 0 ? (
              <a
                href="#routes"
                className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
              >
                See all airport routes
              </a>
            ) : null}
          </div>
        </HeroInterieur>

        <BandeauReassurance />

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={station.contenu} />

            {/* Colonne d'appoint : le choix de l'aéroport, sous les yeux pendant la lecture. */}
            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              {trajets.length > 0 ? (
                <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                  <p className="font-display text-lg text-alpine">
                    Transfers to {station.name}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {trajets.map((t) => (
                      <li key={t.slug} className="flex items-baseline justify-between gap-3">
                        <Link className="text-alpine-700 hover:text-marque" href={t.chemin}>
                          {t.court}
                        </Link>
                        <span className="shrink-0 text-xs tabular-nums text-alpine-600">
                          {repere(t)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded bg-alpine p-5 text-white">
                <p className="font-display text-lg">Ready to book?</p>
                <p className="mt-2 text-sm text-glacier-200">
                  Fixed price per vehicle, flight tracking, and a driver waiting for you
                  even if your flight is late.
                </p>
                <BoutonAction href={lienReservation({ resort: station.slug })} className="mt-4">
                  Book now
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        {trajets.length > 0 ? (
          <Section fond="glacier">
            <div id="routes" className="scroll-mt-6">
              <EnTeteSection
                surtitre="Routes"
                titre={`Airport transfers to ${station.name}`}
                chapo="Distances and drive times are without traffic. Allow more on a Saturday in high season, and in poor weather on mountain roads."
              />
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((t) => (
                <li key={t.slug}>
                  <CarteLien
                    href={t.chemin}
                    titre={`${t.court} → ${station.name}`}
                    meta={repere(t)}
                    texte={`Private transfer from ${t.nom} to ${station.name}.`}
                    action="See this route"
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {voisines.length > 0 && pays ? (
          <Section fond="blanc">
            <EnTeteSection surtitre="Nearby" titre={`Other resorts in ${pays.nom}`} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {voisines.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${silo}/${r.slug}/`}
                    className="inline-block rounded border border-glacier-200 px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${silo}/`}
                  className="inline-block rounded border border-glacier-200 bg-glacier-50 px-4 py-2 text-sm font-medium text-alpine transition hover:border-alpes"
                >
                  All {pays.adjectif} resorts →
                </Link>
              </li>
            </ul>
          </Section>
        ) : null}

        {articles.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection surtitre="Blog" titre={`Reading before you go to ${station.name}`} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <CarteLien href={`/blog/${a.slug}/`} titre={a.titre} action="Read" />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Faq items={station.faq} titre={`Frequently asked questions — ${station.name}`} />

        <AppelAction
          titre={`Book your transfer to ${station.name}`}
          lien={lienReservation({ resort: station.slug })}
        />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(station.faq),
        )}
      />
    </>
  );
}
