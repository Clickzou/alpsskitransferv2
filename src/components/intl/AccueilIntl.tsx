import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilAriane from "@/components/FilAriane";
import JsonLd from "@/components/JsonLd";
import {
  BoutonAction,
  CarteLien,
  EnTeteSection,
  HeroInterieur,
  Reperes,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import type { LangueSecondaire } from "@/lib/i18n";
import { ACCUEIL } from "@/lib/intl/accueil";
import { alternativesAccueil, cheminStation, cheminTrajet } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import { resortsTraduits } from "@/lib/resorts";
import { grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation } from "@/lib/transfers";

/**
 * L'accueil d'une langue autre que l'anglais.
 *
 * Un seul composant pour le français, l'allemand et l'italien : le gabarit est
 * le même, seuls le texte et le périmètre changent. Le trio de pages
 * `(fr)`, `(de)` et `(it)` n'existe que parce que Next impose un segment
 * statique par langue — il ne doit pas devenir trois copies du même code.
 *
 * Les listes de stations et de trajets sont **dérivées** des registres : une
 * station qui perd sa traduction disparaît de l'accueil le jour même, sans
 * qu'un lien mort survive dans une liste écrite à la main.
 */
export default function AccueilIntl({ lang }: { lang: LangueSecondaire }) {
  const t = T(lang);
  const contenu = ACCUEIL[lang];
  const reserver = lienReserver(lang);

  const stations = resortsTraduits(lang)
    .map((station) => {
      const trajets = trajetsTraduitsDeLaStation(station.slug, lang);
      const distances = trajets
        .map((x) => DISTANCES.find((d) => d.airport === x.airport && d.resort === station.slug))
        .filter((d) => d != null)
        .sort((a, b) => a.km - b.km);
      return { station, trajets, plusProche: distances[0] };
    })
    .sort((a, b) => a.station.name.localeCompare(b.station.name));

  const trajets = stations.flatMap(({ station, trajets: liste }) =>
    liste.flatMap((x) => {
      const chemin = cheminTrajet(station, x.airport, lang);
      if (!chemin) return [];
      return [
        {
          cle: `${x.airport}-${station.slug}`,
          titre: `${SEGMENTS_AEROPORT[lang][x.airport].nom} → ${station.name}`,
          chemin,
          distance: DISTANCES.find(
            (d) => d.airport === x.airport && d.resort === station.slug,
          ),
        },
      ];
    }),
  );

  return (
    <>
      <Header lang={lang} alternatives={alternativesAccueil(lang)} />
      <main id="contenu">
        <HeroInterieur image={contenu.visuel}>
          <FilAriane clair elements={[{ nom: t.accueil, chemin: `/${lang}/` }]} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {contenu.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{contenu.chapo}</p>

          <Reperes items={contenu.reperes} />

          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            {contenu.sections.map((section) => (
              <div key={section.titre} className="space-y-4">
                <h2 className="pt-4 font-display text-2xl text-alpine first:pt-0">
                  {section.titre}
                </h2>
                {section.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {stations.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre={contenu.listeStations.surtitre}
              titre={contenu.listeStations.titre}
              chapo={contenu.listeStations.chapo}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stations.map(({ station, trajets: liste, plusProche }) => (
                <li key={station.slug}>
                  <CarteLien
                    href={cheminStation(station, lang)!}
                    titre={station.name}
                    meta={plusProche ? `${plusProche.km} km` : undefined}
                    texte={
                      liste.length > 0
                        ? t.trajetsDepuis(
                            liste.length,
                            liste
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

        {trajets.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection
              surtitre={contenu.listeTrajets.surtitre}
              titre={contenu.listeTrajets.titre}
              chapo={contenu.listeTrajets.chapo}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((x) => (
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

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{contenu.appel.titre}</h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">
              {contenu.appel.texte}{" "}
              <Link className="underline" href={contenu.appel.lienContact.chemin}>
                {contenu.appel.lienContact.texte}
              </Link>
              .
            </p>
            <BoutonAction sur="sombre" href={reserver} className="mt-6">
              {t.reserver}
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <JsonLd data={grapheJsonLd(organisationSchema())} />
    </>
  );
}
