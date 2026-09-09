import Link from "next/link";
import Contenu from "@/components/Contenu";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Sommaire from "@/components/Sommaire";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { TITRE_SOMMAIRE, dateLongue } from "./blog-commun";
import type { Article } from "@/lib/articles/types";
import type { LangueSecondaire } from "@/lib/i18n";
import { alternativesArticle, cheminStation } from "@/lib/intl/liens";
import { T, lienReserver } from "@/lib/intl/textes";
import { resortsTraduits } from "@/lib/resorts";
import { articleSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

export default function ArticleIntl({ lang, article }: { lang: LangueSecondaire; article: Article }) {
  const t = T(lang);
  const traduction = article.traductions![lang]!;
  const chemin = `/${lang}/blog/${traduction.slug}/`;

  // Maillage sortant : seules les stations qui ont une page dans cette langue.
  const stations = (article.stationsLiees ?? [])
    .map((s) => resortsTraduits(lang).find((r) => r.slug === s))
    .filter((r) => r != null)
    .slice(0, 8);

  const filAriane = [
    { nom: t.accueil, chemin: `/${lang}/` },
    { nom: "Blog", chemin: `/${lang}/blog/` },
    { nom: traduction.titre, chemin },
  ];

  return (
    <>
      <Header lang={lang} alternatives={alternativesArticle(article, lang)} />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {traduction.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{traduction.chapo}</p>
          <p className="mt-6 text-xs uppercase tracking-widest text-glacier-300">
            {dateLongue(article.datePublication, lang)}
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div>
            <Sommaire blocs={traduction.contenu} titre={TITRE_SOMMAIRE[lang]} />
            <Contenu blocs={traduction.contenu} />
          </div>
        </Section>

        {stations.length > 0 ? (
          <Section fond="glacier">
            <h2 className="font-display text-2xl text-alpine">{t.stationsCitees}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {stations.map((r) => (
                <li key={r!.slug}>
                  <Link
                    href={cheminStation(r!, lang)!}
                    className="inline-block rounded border border-glacier-200 bg-white px-4 py-2 text-sm text-alpine-700 transition hover:border-alpes hover:text-marque"
                  >
                    {r!.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <section className="bg-alpine text-white">
          <div className="mx-auto max-w-6xl px-4 py-section">
            <h2 className="font-display text-titre-section">{t.reservezAlpes}</h2>
            <p className="mt-3 max-w-prose text-sm text-white/90">{t.inclusCourt}</p>
            <BoutonAction sur="sombre" href={lienReserver(lang)} className="mt-6">
              {t.demanderPrix}
            </BoutonAction>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          articleSchema({
            titre: traduction.titre,
            description: traduction.metaDescription,
            path: chemin,
            datePublication: article.datePublication,
            dateModification: article.dateModification,
            image: article.image?.src,
          }),
        )}
      />
    </>
  );
}
