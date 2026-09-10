import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import {
  BandeauReassurance,
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import type { NomVisuel } from "@/components/Visuel";
import { SEGMENT_STATIONS, type LangueSecondaire } from "@/lib/i18n";
import { alternativesIndexStations, cheminHubPays, cheminIndexStations } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import { hubsPaysDeLaLangue } from "@/lib/pays-intl";
import { resortsTraduits } from "@/lib/resorts";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation } from "@/lib/transfers";

/**
 * L'index des stations d'une langue — la racine de son silo.
 *
 * La home jouait ce rôle jusqu'au 10 septembre 2026, et le menu traduit
 * pointait donc « Stations » vers l'accueil. Deux fonctions sur une même URL :
 * l'accueil doit convertir, l'index doit distribuer. En les séparant, chaque
 * page fait une chose, et le silo traduit a enfin une tête à laquelle les hubs
 * pays et les pages de station peuvent se rattacher.
 *
 * Le classement est **par pays**, parce que c'est la première question du
 * visiteur — France ou Autriche, pas ordre alphabétique sur 68 noms.
 */
const VISUELS_INDEX_STATIONS: Record<LangueSecondaire, { nom: NomVisuel; alt: string }> = {
  fr: { nom: "stations-index", alt: "Stations des Alpes sous la neige" },
  de: { nom: "stations-index", alt: "Verschneite Skiorte in den Alpen" },
  it: { nom: "stations-index", alt: "Località sciistiche delle Alpi sotto la neve" },
};

export default function IndexStationsIntl({ lang }: { lang: LangueSecondaire }) {
  const t = T(lang);
  const reserver = lienReserver(lang);
  const hubs = hubsPaysDeLaLangue(lang);

  const stations = resortsTraduits(lang).map((station) => {
    const trajets = trajetsTraduitsDeLaStation(station.slug, lang);
    const distances = trajets
      .map((x) => DISTANCES.find((d) => d.airport === x.airport && d.resort === station.slug))
      .filter((d) => d != null)
      .sort((a, b) => a.km - b.km);
    return {
      station,
      nom: station.traductions![lang]!.nom ?? station.name,
      chemin: `/${lang}/${SEGMENT_STATIONS[lang]}/${station.traductions![lang]!.slug}/`,
      trajets,
      plusProche: distances[0],
    };
  });

  /*
    Les pays sont ceux des stations, pas ceux du registre : un pays sans station
    traduite n'a rien à faire dans un index de cette langue. L'ordre suit le
    nombre de stations — le marché principal de la langue en tête.
  */
  const pays = hubs
    .map((hub) => ({
      hub,
      stations: stations
        .filter((s) => s.station.country === hub.code)
        .sort((a, b) => a.nom.localeCompare(b.nom)),
    }))
    .filter((groupe) => groupe.stations.length > 0)
    .sort((a, b) => b.stations.length - a.stations.length);

  // Les stations dont le pays n'a pas de hub traduit : elles existent quand même
  // et doivent être listées, sinon l'index ment sur le périmètre.
  const orphelines = stations
    .filter((s) => !hubs.some((h) => h.code === s.station.country))
    .sort((a, b) => a.nom.localeCompare(b.nom));

  const aeroports = [...new Set(stations.flatMap((s) => s.trajets.map((x) => x.airport)))];

  /*
    Le bandeau porte une photo, comme celui des stations et des hubs : un index
    est une page de choix, et un aplat bleu nu ne donne envie de choisir rien.
  */
  const image = VISUELS_INDEX_STATIONS[lang];

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: t.stations, chemin: cheminIndexStations(lang) },
  ];

  const carte = ({
    nom,
    chemin,
    trajets,
    plusProche,
  }: (typeof stations)[number]) => (
    <CarteLien
      href={chemin}
      titre={nom}
      meta={plusProche ? `${plusProche.km} km` : undefined}
      texte={
        trajets.length > 0
          ? t.trajetsDepuis(
              trajets.length,
              trajets.map((x) => SEGMENTS_AEROPORT[lang][x.airport].nom).join(" · "),
            )
          : undefined
      }
      action={t.voirLesTransferts}
    />
  );

  return (
    <>
      <Header lang={lang} alternatives={alternativesIndexStations(lang)} />
      <main id="contenu">
        <HeroInterieur image={image}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {t.index.stationsTitre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{t.index.stationsChapo}</p>

          <Reperes
            items={[
              { libelle: t.stations, valeur: String(stations.length) },
              { libelle: t.hub.aeroports, valeur: String(aeroports.length) },
              { libelle: t.hub.pays, valeur: String(pays.length + (orphelines.length > 0 ? 1 : 0)) },
            ]}
          />

          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <BandeauReassurance langue={lang} />

        {pays.length > 1 ? (
          <Section fond="glacier">
            <EnTeteSection surtitre={t.hub.pays} titre={t.index.parPays} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {pays.map(({ hub, stations: liste }) => (
                <li key={hub.slug}>
                  <Link
                    href={cheminHubPays(lang, hub.slug)}
                    className="inline-block rounded border border-glacier-200 bg-white px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {hub.nom}
                    <span className="ml-2 text-xs text-alpine-600">{liste.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {pays.map(({ hub, stations: liste }, rang) => (
          <Section key={hub.slug} fond={rang % 2 === 0 ? "blanc" : "glacier"}>
            <EnTeteSection
              surtitre={t.stations}
              titre={t.hub.stationsDuPays(hub.nom)}
              chapo={t.hub.stationsChapo}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liste.map((entree) => (
                <li key={entree.station.slug}>{carte(entree)}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={cheminHubPays(lang, hub.slug)}
                className="text-sm font-semibold text-marque hover:underline"
              >
                {hub.h1} →
              </Link>
            </div>
          </Section>
        ))}

        {orphelines.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection surtitre={t.stations} titre={t.index.stationsTitre} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orphelines.map((entree) => (
                <li key={entree.station.slug}>{carte(entree)}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{t.reservezAlpes}</h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">{t.inclusCourt}</p>
            <BoutonAction sur="sombre" href={reserver} className="mt-6">
              {t.reserver}
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
        )}
      />
    </>
  );
}
