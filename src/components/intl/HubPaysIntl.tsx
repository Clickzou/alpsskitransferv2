import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Visuel from "@/components/Visuel";
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
import { duree } from "@/lib/airports/dessertes";
import { SEGMENT_STATIONS, type LangueSecondaire } from "@/lib/i18n";
import { alternativesHubPays, cheminIndexStations, cheminTrajet } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import type { HubPaysIntl as Hub } from "@/lib/pays-intl";
import { hubsPaysDeLaLangue } from "@/lib/pays-intl";
import { resortsTraduits } from "@/lib/resorts";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation } from "@/lib/transfers";

/**
 * Un hub pays dans une langue traduite.
 *
 * Il tient le même rôle que son équivalent anglais — distribuer le maillage vers
 * les stations et montrer d'un coup ce que le site couvre dans un pays — mais
 * sur le périmètre de la langue, qui est plus étroit : sept stations
 * autrichiennes en allemand, deux stations françaises en italien. Une liste
 * courte et vraie vaut mieux qu'une liste longue dont les trois quarts mènent à
 * une page anglaise.
 *
 * Tout est dérivé : le jour où une station perd sa traduction, elle disparaît de
 * son hub, et le hub disparaît lui-même s'il n'en reste aucune.
 */
export default function HubPaysIntl({ lang, hub }: { lang: LangueSecondaire; hub: Hub }) {
  const t = T(lang);
  const reserver = lienReserver(lang);

  const stations = resortsTraduits(lang)
    .filter((r) => r.country === hub.code)
    .map((station) => {
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
    })
    .sort((a, b) => a.nom.localeCompare(b.nom));

  /*
    Les liaisons sont triées par distance, pas par ordre alphabétique : la plus
    courte est la plus vendue, et c'est celle qu'un visiteur qui hésite encore
    sur son aéroport doit voir en premier.
  */
  const liaisons = stations
    .flatMap(({ station, nom, trajets }) =>
      trajets.flatMap((x) => {
        const chemin = cheminTrajet(station, x.airport, lang);
        if (!chemin) return [];
        const distance = DISTANCES.find(
          (d) => d.airport === x.airport && d.resort === station.slug,
        );
        return [
          {
            cle: `${x.airport}-${station.slug}`,
            titre: `${SEGMENTS_AEROPORT[lang][x.airport].nom} → ${nom}`,
            chemin,
            distance,
          },
        ];
      }),
    )
    .sort((a, b) => (a.distance?.km ?? Infinity) - (b.distance?.km ?? Infinity));

  // Les aéroports d'où part au moins une liaison de ce pays.
  const aeroports = [...new Set(stations.flatMap(({ trajets }) => trajets.map((x) => x.airport)))];

  const autres = hubsPaysDeLaLangue(lang).filter((x) => x.slug !== hub.slug);

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: t.stations, chemin: cheminIndexStations(lang) },
    { nom: hub.nom, chemin: `/${lang}/${SEGMENT_STATIONS[lang]}/${hub.slug}/` },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesHubPays(lang, hub)} />
      <main id="contenu">
        <HeroInterieur image={hub.visuel}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">{hub.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{hub.chapo}</p>

          <Reperes
            items={[
              { libelle: t.stations, valeur: String(stations.length) },
              { libelle: t.hub.aeroports, valeur: String(aeroports.length) },
              ...(liaisons.length > 0
                ? [{ libelle: t.hub.liaisonsCourt, valeur: String(liaisons.length) }]
                : []),
            ]}
          />

          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <BandeauReassurance langue={lang} />

        <Section fond="blanc">
          {/* Texte à gauche, photo du pays à droite, centrés l'un sur l'autre. */}
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
            <div className="max-w-prose space-y-4 leading-relaxed text-alpine-700">
              {hub.intro.map((paragraphe) => (
                <p key={paragraphe.slice(0, 40)}>{paragraphe}</p>
              ))}
            </div>
            <Visuel
              nom={hub.visuel.nom}
              alt={hub.visuel.alt}
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="h-full min-h-[14rem] w-full rounded-xl object-cover shadow-carte"
            />
          </div>
        </Section>

        {stations.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre={t.stations}
              titre={t.hub.stationsDuPays(hub.nom)}
              chapo={t.hub.stationsChapo}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map(({ station, nom, chemin, trajets, plusProche }) => (
                <li key={station.slug}>
                  <CarteLien
                    href={chemin}
                    titre={nom}
                    meta={plusProche ? `${plusProche.km} km` : undefined}
                    texte={
                      trajets.length > 0
                        ? t.trajetsDepuis(
                            trajets.length,
                            trajets
                              .map((x) => SEGMENTS_AEROPORT[lang][x.airport].nom)
                              .join(" · "),
                          )
                        : undefined
                    }
                    action={t.voirLesTransferts}
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {liaisons.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre={t.trajets}
              titre={t.hub.liaisons}
              chapo={t.hub.liaisonsChapo}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liaisons.map((x) => (
                <li key={x.cle}>
                  <CarteLien
                    href={x.chemin}
                    titre={x.titre}
                    meta={
                      x.distance
                        ? [`${x.distance.km} km`, duree(x.distance.minutes)]
                            .filter(Boolean)
                            .join(" · ")
                        : undefined
                    }
                    action={t.voirCeTrajet}
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {autres.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection surtitre={t.hub.ailleurs} titre={t.hub.autresPays} />
            <ul className="mt-6 flex flex-wrap gap-2">
              {autres.map((autre) => (
                <li key={autre.slug}>
                  <Link
                    href={`/${lang}/${SEGMENT_STATIONS[lang]}/${autre.slug}/`}
                    className="inline-block rounded border border-glacier-200 bg-white px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {autre.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{t.hub.reserverDans(hub.nom)}</h2>
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
