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
import { duree } from "@/lib/airports/dessertes";
import type { NomVisuel } from "@/components/Visuel";
import { type LangueSecondaire } from "@/lib/i18n";
import { alternativesIndexAeroports, cheminIndexAeroports, cheminTrajet } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import { resortsTraduits } from "@/lib/resorts";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation } from "@/lib/transfers";

/**
 * L'index des aéroports d'une langue.
 *
 * Le pendant traduit de `/airport-ski-transfers/`, à une différence près : il
 * n'y a **pas de hub d'aéroport traduit**, donc chaque aéroport n'a pas sa page
 * mais sa section, et les liens mènent directement aux pages de trajet. Un
 * index qui renverrait vers 34 hubs anglais serait une sortie de langue
 * déguisée en maillage.
 *
 * L'ordre suit le nombre de liaisons : l'aéroport principal du marché arrive en
 * premier — Innsbruck en allemand, Turin en italien, Genève en français — ce qui
 * se trouve être aussi ce que le visiteur cherche le plus souvent.
 */
/*
  L'image suit le marché de la langue : le premier aéroport de chacun. Genève
  pour le français, Zurich pour l'allemand depuis que le périmètre est suisse,
  Turin pour l'italien.
*/
const VISUELS_INDEX_AEROPORTS: Record<LangueSecondaire, { nom: NomVisuel; alt: string }> = {
  fr: {
    nom: "aeroport-geneva-airport",
    alt: "Terminal de l’aéroport de Genève, première porte d’entrée des Alpes",
  },
  de: {
    nom: "aeroport-zurich-airport",
    alt: "Flughafen Zürich, Tor zu den Schweizer Alpen",
  },
  it: {
    nom: "aeroport-turin-airport",
    alt: "Aeroporto di Torino, porta d’accesso alle Alpi occidentali",
  },
};

export default function IndexAeroportsIntl({ lang }: { lang: LangueSecondaire }) {
  const t = T(lang);
  const reserver = lienReserver(lang);

  const stations = resortsTraduits(lang);

  const aeroports = Object.entries(SEGMENTS_AEROPORT[lang])
    .map(([slug, segment]) => {
      const liaisons = stations
        .flatMap((station) => {
          const trajet = trajetsTraduitsDeLaStation(station.slug, lang).find(
            (x) => x.airport === slug,
          );
          if (!trajet) return [];
          const chemin = cheminTrajet(station, slug, lang);
          if (!chemin) return [];
          return [
            {
              cle: `${slug}-${station.slug}`,
              nom: station.traductions![lang]!.nom ?? station.name,
              chemin,
              distance: DISTANCES.find(
                (d) => d.airport === slug && d.resort === station.slug,
              ),
            },
          ];
        })
        .sort((a, b) => (a.distance?.km ?? Infinity) - (b.distance?.km ?? Infinity));
      return { slug, nom: segment.nom, liaisons };
    })
    // Un aéroport sans liaison rédigée dans cette langue n'a rien à montrer.
    .filter((a) => a.liaisons.length > 0)
    .sort((a, b) => b.liaisons.length - a.liaisons.length);

  const total = aeroports.reduce((somme, a) => somme + a.liaisons.length, 0);

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: t.hub.aeroports, chemin: cheminIndexAeroports(lang) },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesIndexAeroports(lang)} />
      <main id="contenu">
        <HeroInterieur image={VISUELS_INDEX_AEROPORTS[lang]}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {t.index.aeroportsTitre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{t.index.aeroportsChapo}</p>

          <Reperes
            items={[
              { libelle: t.hub.aeroports, valeur: String(aeroports.length) },
              { libelle: t.hub.liaisonsCourt, valeur: String(total) },
              { libelle: t.stations, valeur: String(stations.length) },
            ]}
          />

          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <BandeauReassurance langue={lang} />

        {aeroports.map((aeroport, rang) => (
          <Section key={aeroport.slug} fond={rang % 2 === 0 ? "blanc" : "glacier"}>
            <EnTeteSection
              surtitre={t.index.depuisCetAeroport}
              titre={t.aeroportDe(aeroport.nom)}
              chapo={
                aeroport.liaisons[0]?.distance
                  ? t.index.plusProche(
                      aeroport.liaisons[0].nom,
                      aeroport.liaisons[0].distance!.km,
                    )
                  : undefined
              }
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {aeroport.liaisons.map((liaison) => (
                <li key={liaison.cle}>
                  <CarteLien
                    href={liaison.chemin}
                    titre={`${aeroport.nom} → ${liaison.nom}`}
                    meta={
                      liaison.distance
                        ? [`${liaison.distance.km} km`, duree(liaison.distance.minutes)]
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
        ))}

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
