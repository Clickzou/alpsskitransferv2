import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/accueil/Hero";
import { Avis, Vehicules } from "@/components/accueil/Sections";
import {
  BandeauImageTexte,
  BandeauReassurance,
  BoutonAction,
  CarteLien,
  EnTeteSection,
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import { avisDuSite } from "@/lib/avis";
import type { LangueSecondaire } from "@/lib/i18n";
import { ACCUEIL } from "@/lib/intl/accueil";
import {
  alternativesAccueil,
  cheminHubPays,
  cheminIndexAeroports,
  cheminStation,
  cheminTrajet,
} from "@/lib/intl/liens";
import { lienTunnelLangue } from "@/lib/intl/navigation";
import { hubsPaysDeLaLangue } from "@/lib/pays-intl";
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
 * **C'est une home, pas une page de silo.** Elle a donc, depuis le 10 septembre
 * 2026, la structure de la home anglaise : le bandeau avec son formulaire de
 * recherche, les trois promesses, les véhicules, les avis. Elle empruntait
 * jusque-là le gabarit des pages intérieures — fil d'Ariane compris, qui
 * pointait vers la page elle-même — et n'offrait aucun moyen de commencer une
 * réservation avant le pied de page.
 *
 * Le formulaire envoie vers le tunnel **de la langue** : une recherche lancée en
 * italien finit sur `/it/prenota/`, pas sur le tunnel anglais.
 *
 * Les listes de stations et de trajets sont **dérivées** des registres : une
 * station qui perd sa traduction disparaît de l'accueil le jour même, sans
 * qu'un lien mort survive dans une liste écrite à la main.
 */
export default async function AccueilIntl({ lang }: { lang: LangueSecondaire }) {
  const t = T(lang);
  const contenu = ACCUEIL[lang];
  const reserver = lienReserver(lang);
  const avis = await avisDuSite();

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
          titre: `${SEGMENTS_AEROPORT[lang][x.airport].nom} → ${station.traductions![lang]!.nom ?? station.name}`,
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
        <Hero
          langue={lang}
          titre={contenu.h1}
          image={contenu.visuel}
          reperes={contenu.reperes}
          tunnel={lienTunnelLangue(lang)}
        />

        <BandeauReassurance niveau="h2" langue={lang} />

        {/*
          Le même bandeau que la home anglaise : photo à fond perdu sur la
          moitié gauche, texte sur le bleu nuit à droite. Les trois langues
          traduites affichaient ce propos en prose sur fond blanc — le même
          contenu, mais qui se lisait comme une page de documentation au milieu
          d'une page de vente.

          Le chapô ouvre le bandeau plutôt que le hero : sur une home, le hero
          appartient au formulaire, et quatre lignes de plus au-dessus de lui
          repousseraient la recherche sous la ligne de flottaison.
        */}
        <BandeauImageTexte image={contenu.visuelPresentation}>
          <h2 className="font-display text-titre-section">{contenu.sections[0].titre}</h2>
          <p className="mt-5 text-chapo leading-relaxed text-white">{contenu.chapo}</p>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-glacier-300">
            {contenu.sections[0].paragraphes.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          {contenu.sections.slice(1).map((section) => (
            <div key={section.titre} className="mt-8">
              <h3 className="font-display text-xl text-white">{section.titre}</h3>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-glacier-300">
                {section.paragraphes.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          {/*
            Les pastilles du bas mènent aux hubs pays de la langue et à l'index
            des aéroports : c'est le maillage que porte la version anglaise avec
            ses quatre aéroports de départ, transposé au périmètre de la langue.
          */}
          <nav aria-label={t.hub.pays} className="mt-7 flex flex-wrap gap-2">
            {hubsPaysDeLaLangue(lang).map((hub) => (
              <Link
                key={hub.slug}
                href={cheminHubPays(lang, hub.slug)}
                className="rounded-full border border-white/20 px-4 py-1.5 text-sm transition hover:border-alpes hover:bg-alpes hover:text-white"
              >
                {hub.nom}
              </Link>
            ))}
            <Link
              href={cheminIndexAeroports(lang)}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm transition hover:border-alpes hover:bg-alpes hover:text-white"
            >
              {t.hub.aeroports}
            </Link>
          </nav>
        </BandeauImageTexte>

        <Vehicules textes={contenu.vehicules} />

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
                    titre={station.traductions![lang]!.nom ?? station.name}
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

        {/*
          Les témoignages restent dans la langue où ils ont été écrits — voir
          `AvisTraduits`. Seul l'intitulé de la section change de langue : on ne
          réécrit pas les propos d'un client pour les faire parler allemand.
        */}
        <Avis bloc={avis} textes={contenu.avis} />

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
