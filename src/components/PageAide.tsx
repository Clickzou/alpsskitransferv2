import Link from "next/link";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import { AppelAction, CarteLien, EnTeteSection, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { ENTREPRISE } from "@/data/site";
import type { PageFonctionnelle } from "@/lib/pages";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * `/general-questions/` — la FAQ.
 *
 * Une page de questions se consulte : on y arrive avec une question précise, on
 * cherche la sienne, on repart. D'où l'accordéon plutôt qu'un long texte, et
 * d'où les trois orientations de fin — la plupart de ceux qui ne trouvent pas
 * leur réponse ici cherchent en réalité l'une de ces trois pages.
 *
 * Le balisage `FAQPage` est ce qui rend la page éligible aux questions-réponses
 * affichées directement dans les résultats de recherche. Il exige que les
 * réponses soient dans le HTML, ce que fait `Faq` avec des `<details>` natifs :
 * lisibles sans JavaScript, donc indexables.
 */
export default function PageAide({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: page.h1, chemin },
  ];

  /** Ce que cherchent ceux qui ne trouvent pas leur réponse dans la liste. */
  const orientations = [
    {
      href: "/lost-luggage/",
      titre: "Lost luggage",
      texte:
        "Lost an item or a bag? Report it quickly and we start the search with your driver and the resort straight away.",
      action: "Report an item",
    },
    {
      href: "/inquiry/",
      titre: "Groups and special requests",
      texte:
        "A group of more than eight, several pick-up points, an agency booking or oversized equipment: we quote these by hand.",
      action: "Send an inquiry",
    },
    {
      href: "/ticketing-conditions/",
      titre: "Conditions of sale",
      texte:
        "Cancellation, changes, luggage allowance and liability — the terms that apply to your booking, in full.",
      action: "Read the conditions",
    },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur image={{ nom: "faq", alt: "Traveller checking their transfer details" }}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>
          <p className="mt-6 text-sm text-glacier-300">
            Still stuck?{" "}
            <a
              href={`mailto:${ENTREPRISE.email}`}
              className="font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              {ENTREPRISE.email}
            </a>{" "}
            ·{" "}
            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="font-medium text-white underline underline-offset-4 hover:text-alpes-300"
            >
              {ENTREPRISE.telephoneAffiche}
            </a>
          </p>
        </HeroInterieur>

        <Faq items={page.faq} titre="Everything we are asked most" surtitre="Questions" />

        {/* --------------------------------------------------- où aller ensuite */}
        <Section fond="blanc">
          <EnTeteSection
            surtitre="Not answered here?"
            titre="Where to go next"
            chapo="Three cases that need more than a paragraph — each has its own page."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3" data-anime-decale>
            {orientations.map((orientation) => (
              <li key={orientation.href}>
                <CarteLien {...orientation} />
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm text-alpine-700">
            Anything else:{" "}
            <Link href="/contact/" className="font-semibold text-marque underline underline-offset-2">
              write to us
            </Link>
            . We answer our own emails.
          </p>
        </Section>

        <AppelAction titre="Book your airport ski transfer" />
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
          faqSchema(page.faq),
        )}
      />
    </>
  );
}
