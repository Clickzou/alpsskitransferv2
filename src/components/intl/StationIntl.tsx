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
  Section,
} from "@/components/gabarit/Sections";
import { DISTANCES } from "@/data/distances";
import { duree } from "@/lib/airports/dessertes";
import type { LangueSecondaire } from "@/lib/i18n";
import { alternativesStation, cheminStation, cheminTrajet } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import type { Resort } from "@/lib/resorts";
import { faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";
import { SEGMENTS_AEROPORT, trajetsTraduitsDeLaStation } from "@/lib/transfers";
import { visuelStation } from "@/lib/visuels";

/**
 * Page de station traduite — page mère du silo, dans sa langue.
 *
 * Même gabarit que le silo anglais, moins les blocs dont le texte n'existe qu'en
 * anglais : afficher la réassurance et les étapes de réservation anglaises sur
 * une page allemande reproduirait exactement le défaut que ce projet corrige.
 */
export default function StationIntl({
  lang,
  resort,
}: {
  lang: LangueSecondaire;
  resort: Resort;
}) {
  const t = T(lang);
  const traduction = resort.traductions![lang]!;
  const chemin = cheminStation(resort, lang)!;
  const trajets = trajetsTraduitsDeLaStation(resort.slug, lang);
  const reserver = lienReserver(lang);

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: resort.name, chemin },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesStation(resort, lang)} />
      <main id="contenu">
        <HeroInterieur image={visuelStation(resort.slug, resort.name, lang)}>
          <FilAriane clair elements={filAriane} />

          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {traduction.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{traduction.chapo}</p>

          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={traduction.contenu} />

            <aside className="lg:sticky lg:top-6 lg:h-fit">
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

        {trajets.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection
              surtitre={t.trajets}
              titre={t.transfertsVers(resort.name)}
              chapo={t.mesureNote}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((x) => {
                const d = DISTANCES.find(
                  (y) => y.airport === x.airport && y.resort === resort.slug,
                );
                return (
                  <li key={x.airport}>
                    <CarteLien
                      href={cheminTrajet(resort, x.airport, lang)!}
                      titre={`${SEGMENTS_AEROPORT[lang][x.airport].nom} → ${resort.name}`}
                      meta={
                        d ? [`${d.km} km`, duree(d.minutes)].filter(Boolean).join(" · ") : undefined
                      }
                      action={t.voirCeTrajet}
                    />
                  </li>
                );
              })}
            </ul>
          </Section>
        ) : null}

        <Faq items={traduction.faq} titre={t.faqStation(resort.name)} surtitre={t.aide} />

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{t.reservezVers(resort.name)}</h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">{t.devisImmediat}</p>
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
