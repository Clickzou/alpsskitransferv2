import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import type { LangueSecondaire } from "@/lib/i18n";
import { alternativesPageIntl } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import type { PageIntl } from "@/lib/pages/intl";
import {
  faqSchema,
  filArianeSchema,
  grapheJsonLd,
  organisationSchema,
  serviceLocalSchema,
} from "@/lib/schema";

/**
 * Une page de conversion traduite : comment réserver, transfert privé, aide,
 * contact, agences.
 *
 * Ce sont les pages qui transforment, et ce sont donc les premières à traduire —
 * bien avant le catalogue. Le `hreflang` n'est posé que si `equivalentEn` existe.
 */
export default function PageConversionIntl({
  lang,
  page,
}: {
  lang: LangueSecondaire;
  page: PageIntl;
}) {
  const t = T(lang);
  const chemin = `/${lang}/${page.slug}/`;
  const reserver = lienReserver(lang);

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: page.h1, chemin },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesPageIntl(lang, page.equivalentEn)} />
      <main id="contenu">
        <HeroInterieur image={page.visuel}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>
          <div className="mt-8">
            <BoutonAction sur="sombre" href={reserver}>
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </HeroInterieur>

        <Section fond="blanc">
          <Contenu blocs={page.contenu} />
        </Section>

        <Faq items={page.faq} titre={t.questionsFrequentes} surtitre={t.aide} />

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
          // Une page locale porte en plus son service à l'échelle de son bassin.
          page.zoneLocale ? serviceLocalSchema({ ...page.zoneLocale, chemin }) : null,
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(page.faq),
        )}
      />
    </>
  );
}
