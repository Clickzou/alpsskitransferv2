import Link from "next/link";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
import { alternativesTrajet, cheminStation, cheminTrajet } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import type { Resort } from "@/lib/resorts";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation, type Transfer } from "@/lib/transfers";

/**
 * Page de trajet traduite — page fille, sous sa station.
 *
 * Elle porte trois maillages obligatoires : vers sa page mère, vers les autres
 * aéroports qui desservent la station **dans cette langue**, et vers le tunnel.
 * Le deuxième est celui qui travaille : c'est la question que se pose le
 * visiteur qui n'a pas encore acheté son billet d'avion.
 */
export default function TrajetIntl({
  lang,
  resort,
  trajet,
}: {
  lang: LangueSecondaire;
  resort: Resort;
  trajet: Transfer;
}) {
  const t = T(lang);
  const traduction = trajet.traductions![lang]!;
  const aeroport = SEGMENTS_AEROPORT[lang][trajet.airport];
  const chemin = cheminTrajet(resort, trajet.airport, lang)!;
  const lienStation = cheminStation(resort, lang)!;
  const reserver = lienReserver(lang);

  const distance = DISTANCES.find(
    (d) => d.airport === trajet.airport && d.resort === resort.slug,
  );

  // Les autres aéroports qui desservent la station dans cette langue, du plus
  // proche au plus loin.
  const autres = trajetsTraduitsDeLaStation(resort.slug, lang)
    .filter((x) => x.airport !== trajet.airport)
    .map((x) => {
      const d = DISTANCES.find((y) => y.airport === x.airport && y.resort === resort.slug);
      return {
        slug: x.airport,
        nom: SEGMENTS_AEROPORT[lang][x.airport].nom,
        chemin: cheminTrajet(resort, x.airport, lang)!,
        km: d?.km ?? null,
        minutes: d?.minutes ?? null,
      };
    })
    .sort((a, b) => (a.km ?? 9999) - (b.km ?? 9999));

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: resort.name, chemin: lienStation },
    { nom: aeroport.nom, chemin },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesTrajet(trajet, resort, lang)} />
      <main id="contenu">
        <HeroInterieur
          image={{ nom: "route-alpine", alt: ALT_ROUTE[lang] }}
        >
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {traduction.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{traduction.chapo}</p>

          <Reperes
            items={[
              ...(distance?.km ? [{ libelle: t.distance, valeur: `${distance.km} km` }] : []),
              ...(distance?.minutes
                ? [{ libelle: t.tempsDeRoute, valeur: duree(distance.minutes) }]
                : []),
              { libelle: t.prix, valeur: t.prixFixe },
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
            <Link
              href={lienStation}
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              {t.tousLesTransfertsVers(resort.name)}
            </Link>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={traduction.contenu} />

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">{t.votreTrajet}</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">{t.depart}</dt>
                    <dd className="text-right font-medium text-alpine">
                      {t.aeroportDe(aeroport.nom)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-alpine-600">{t.arrivee}</dt>
                    <dd className="text-right font-medium text-alpine">{resort.name}</dd>
                  </div>
                  {distance?.km ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-alpine-600">{t.distance}</dt>
                      <dd className="tabular-nums text-alpine">{distance.km} km</dd>
                    </div>
                  ) : null}
                  {distance?.minutes ? (
                    <div className="flex justify-between gap-3">
                      <dt className="text-alpine-600">{t.tempsDeRoute}</dt>
                      <dd className="tabular-nums text-alpine">{duree(distance.minutes)}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div className="rounded bg-alpine p-5 text-white">
                <p className="font-display text-lg">{t.pretAReserver}</p>
                <p className="mt-2 text-sm text-glacier-200">{t.pretAReserverTexte}</p>
                <BoutonAction sur="sombre" href={reserver} className="mt-4">
                  {t.reserver}
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        {autres.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre={t.trajets}
              titre={t.transfertsVers(resort.name)}
              chapo={t.mesureNote}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((x) => (
                <li key={x.slug}>
                  <CarteLien
                    href={x.chemin}
                    titre={`${x.nom} → ${resort.name}`}
                    meta={[x.km ? `${x.km} km` : null, duree(x.minutes) || null]
                      .filter(Boolean)
                      .join(" · ")}
                    action={t.voirCeTrajet}
                  />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Faq
          items={traduction.faq}
          titre={t.faqTrajet(aeroport.nom, resort.name)}
          surtitre={t.aide}
        />

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">
              {t.reservezTrajet(aeroport.nom, resort.name)}
            </h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">{t.devisImmediatChauffeur}</p>
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
          faqSchema(traduction.faq),
        )}
      />
    </>
  );
}

/** L'illustration de la route, décrite dans la langue de la page. */
const ALT_ROUTE: Record<LangueSecondaire, string> = {
  fr: "Route de montagne enneigée au coucher du soleil",
  de: "Verschneite Bergstraße im Abendlicht",
  it: "Strada di montagna innevata al tramonto",
};
