import Link from "next/link";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Sommaire from "@/components/Sommaire";
import { BoutonAction, CarteLien, EnTeteSection, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { TITRE_SOMMAIRE, dateLongue } from "./blog-commun";
import type { Article } from "@/lib/articles/types";
import type { LangueSecondaire } from "@/lib/i18n";
import { alternativesArticle, cheminArticle, cheminStation, cheminTrajet } from "@/lib/intl/liens";
import { articlesEnLigne } from "@/lib/articles";
import { SEGMENTS_AEROPORT, trajetTraduit, transferParSlugs } from "@/lib/transfers";
import { resortParSlug } from "@/lib/resorts";
import { T, lienReserver } from "@/lib/intl/textes";
import { resortsTraduits } from "@/lib/resorts";
import { articleSchema, faqSchema, filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * Libellés propres aux sections facultatives d'un article traduit (6 octobre
 * 2026) : « À retenir », trajets cités, FAQ, lectures, bandeau d'aperçu. Ils ne
 * s'affichent que si la traduction porte les champs correspondants — les
 * traductions antérieures n'en ont pas, et leur rendu est inchangé.
 */
const LIBELLES: Record<
  LangueSecondaire,
  { aRetenir: string; trajetsTitre: string; faq: string; lectures: string; apercu: (date: string) => string }
> = {
  fr: {
    aRetenir: "À retenir",
    trajetsTitre: "Les trajets de ce guide",
    faq: "Questions fréquentes",
    lectures: "À lire aussi",
    apercu: (date) => `Aperçu — parution prévue le ${date}. Cette page n’est pas encore publique.`,
  },
  de: {
    aRetenir: "Das Wichtigste",
    trajetsTitre: "Die Strecken in diesem Ratgeber",
    faq: "Häufige Fragen",
    lectures: "Weiterlesen",
    apercu: (date) => `Vorschau — Veröffentlichung am ${date}. Diese Seite ist noch nicht öffentlich.`,
  },
  it: {
    aRetenir: "In breve",
    trajetsTitre: "I tragitti di questa guida",
    faq: "Domande frequenti",
    lectures: "Da leggere anche",
    apercu: (date) => `Anteprima — pubblicazione prevista il ${date}. Questa pagina non è ancora pubblica.`,
  },
};

/**
 * Un article traduit. `apercu` : rendu de relecture d'un article programmé
 * (`/blog/apercu/…`) — bandeau, ni JSON-LD ni hreflang.
 */
export default function ArticleIntl({
  lang,
  article,
  apercu = false,
}: {
  lang: LangueSecondaire;
  article: Article;
  apercu?: boolean;
}) {
  const t = T(lang);
  const l = LIBELLES[lang];
  const traduction = article.traductions![lang]!;
  const chemin = `/${lang}/blog/${traduction.slug}/`;

  // Les trajets cités : seulement ceux qui ont une page dans cette langue.
  const trajets = (traduction.trajetsLies ?? []).flatMap(({ airport, resort }) => {
    const station = resortParSlug(resort);
    const trajet = transferParSlugs(airport, resort);
    if (!station || !trajet || !trajetTraduit(trajet, lang)) return [];
    const href = cheminTrajet(station, airport, lang);
    const nom = station.traductions?.[lang]?.nom ?? station.name;
    return href ? [{ href, titre: `${SEGMENTS_AEROPORT[lang][airport].nom} → ${nom}` }] : [];
  });

  // Les lectures : des articles en ligne qui existent dans cette langue.
  const lectures = (traduction.lectures ?? []).flatMap((slug) => {
    const autre = articlesEnLigne().find((a) => a.slug === slug);
    const href = autre ? cheminArticle(autre, lang) : undefined;
    return autre && href ? [{ href, titre: autre.traductions![lang]!.titre }] : [];
  });

  // Maillage sortant : la liste propre à la langue si elle existe, sinon celle
  // de l'article — et dans les deux cas, filtrée sur les stations qui ont
  // réellement une page dans cette langue.
  const stations = (traduction.stationsLiees ?? article.stationsLiees ?? [])
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
      <Header lang={lang} alternatives={apercu ? [] : alternativesArticle(article, lang)} />
      <main id="contenu">
        {apercu ? (
          <p role="status" className="bg-marque px-4 py-2 text-center text-sm font-semibold text-white">
            {l.apercu(dateLongue(article.datePublication, lang))}
          </p>
        ) : null}
        {/*
          Le visuel de tête, comme sur la version anglaise. Il manquait : les
          articles traduits étaient les seules pages du site à ouvrir sur un
          aplat bleu nu, alors que leur équivalent anglais portait une photo.
          L'image est la même — c'est la même montagne — et seul son `alt`
          change de langue.
        */}
        <HeroInterieur
          image={
            article.visuel
              ? {
                  nom: article.visuel.nom,
                  alt: traduction.altVisuel ?? article.visuel.alt,
                }
              : undefined
          }
        >
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
            {traduction.aRetenir?.length ? (
              <aside className="mb-8 max-w-prose rounded border-l-4 border-alpes bg-glacier-50 px-5 py-4">
                <p className="font-display text-lg text-alpine">{l.aRetenir}</p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-alpine-700">
                  {traduction.aRetenir.map((fait) => (
                    <li key={fait}>{fait}</li>
                  ))}
                </ul>
              </aside>
            ) : null}
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

        {trajets.length > 0 ? (
          <Section fond="blanc">
            <EnTeteSection surtitre={t.trajets} titre={l.trajetsTitre} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trajets.map((x) => (
                <li key={x.href}>
                  <CarteLien href={x.href} titre={x.titre} action={t.voirCeTrajet} />
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {traduction.faq?.length ? <Faq items={traduction.faq} titre={l.faq} surtitre={t.aide} /> : null}

        {lectures.length > 0 ? (
          <Section fond="glacier">
            <EnTeteSection surtitre="Blog" titre={l.lectures} />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lectures.map((x) => (
                <li key={x.href}>
                  <CarteLien href={x.href} titre={x.titre} action={t.lireLeGuide} />
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
      {apercu ? null : (
        <JsonLd
          data={grapheJsonLd(
            organisationSchema(),
            filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
            faqSchema(traduction.faq ?? []),
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
      )}
    </>
  );
}
