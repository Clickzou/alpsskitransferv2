import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { BoutonAction, HeroInterieur, Reperes, Section } from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import { SLUG_PAYS, resortsFr } from "@/lib/resorts";
import {
  SEGMENTS_FR,
  airportDepuisSegmentFr,
  segmentTrajet,
  transferParSlugs,
  trajetsFr,
} from "@/lib/transfers";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/**
 * Page de trajet française — page fille, sous la page de station française.
 *
 * `/fr/transferts-ski/val-thorens/geneve/`. Le segment est court et lisible :
 * contrairement au silo anglais, il n'y a aucune antériorité d'URL à préserver
 * de ce côté.
 *
 * Une page n'est générée que si le trajet **et** sa station portent tous deux une
 * traduction complète — pas de page à moitié française.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return trajetsFr().flatMap((trajet) => {
    const station = resortsFr().find((r) => r.slug === trajet.resort);
    if (!station) return [];
    return [{ station: station.fr!.slug, aeroport: SEGMENTS_FR[trajet.airport].segment }];
  });
}

async function resoudre(params: Promise<{ station: string; aeroport: string }>) {
  const { station: slugStation, aeroport: segment } = await params;
  const station = resortsFr().find((r) => r.fr!.slug === slugStation);
  const airport = airportDepuisSegmentFr(segment);
  if (!station || !airport) return null;
  const trajet = transferParSlugs(airport, station.slug);
  if (!trajet?.fr) return null;
  return {
    station,
    trajet,
    airport,
    aeroport: SEGMENTS_FR[airport],
    chemin: `/fr/transferts-ski/${station.fr!.slug}/${segment}/`,
    cheminEn: `/${SLUG_PAYS[station.country]}/${station.slug}/${segmentTrajet(airport)}/`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ station: string; aeroport: string }>;
}): Promise<Metadata> {
  const donnees = await resoudre(params);
  if (!donnees) return {};
  return pageMetadata({
    title: donnees.trajet.fr!.metaTitre,
    description: donnees.trajet.fr!.metaDescription,
    path: donnees.chemin,
    lang: "fr",
    alternate: { lang: "en", path: donnees.cheminEn },
  });
}

export default async function PageTrajetFr({
  params,
}: {
  params: Promise<{ station: string; aeroport: string }>;
}) {
  const donnees = await resoudre(params);
  if (!donnees) notFound();
  const { station, trajet, airport, aeroport, chemin, cheminEn } = donnees;
  const fr = trajet.fr!;
  const cheminStation = `/fr/transferts-ski/${station.fr!.slug}/`;
  const distance = DISTANCES.find((d) => d.airport === airport && d.resort === station.slug);

  const filAriane = [
    { nom: "Accueil", chemin: "/fr/" },
    { nom: station.name, chemin: cheminStation },
    { nom: aeroport.nom, chemin },
  ];

  return (
    <>
      <Header lang="fr" alternate={{ lang: "en", path: cheminEn }} />
      <main id="contenu">
        <HeroInterieur
          image={{ nom: "route-alpine", alt: "Route de montagne enneigée au coucher du soleil" }}
        >
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {fr.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{fr.chapo}</p>

          <Reperes
            items={[
              ...(distance?.km ? [{ libelle: "Distance", valeur: `${distance.km} km` }] : []),
              ...(distance?.minutes
                ? [{ libelle: "Temps de route", valeur: duree(distance.minutes) }]
                : []),
              { libelle: "Prix", valeur: "Fixe, par véhicule" },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction href="/booking/">Demander un prix</BoutonAction>
            <Link
              href={cheminStation}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              Tous les transferts vers {station.name}
            </Link>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={fr.contenu} />

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Votre trajet</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">Départ</dt>
                    <dd className="text-right font-medium text-alpine">
                      Aéroport de {aeroport.nom}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">Arrivée</dt>
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
                      <dt className="text-alpine-600">Temps de route</dt>
                      <dd className="tabular-nums text-alpine">{duree(distance.minutes)}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="rounded bg-alpine p-5 text-white">
                <p className="font-display text-lg">Prêt à réserver ?</p>
                <p className="mt-2 text-sm text-glacier-200">
                  Prix fixe par véhicule, suivi du vol, skis et sièges enfants compris.
                </p>
                <BoutonAction href="/booking/" className="mt-4">
                  Réserver
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        <Faq items={fr.faq} titre={`Questions fréquentes — ${aeroport.nom} ${station.name}`} surtitre="Aide" />

        <section className="bg-alpes text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              Réservez votre transfert {aeroport.nom} → {station.name}
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              Devis immédiat, confirmation par e-mail, chauffeur à l&apos;arrivée.
            </p>
            <BoutonAction href="/booking/" className="mt-6">
              Réserver
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang="fr" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(fr.faq),
        )}
      />
    </>
  );
}
