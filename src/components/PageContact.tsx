import Link from "next/link";
import Contenu from "@/components/Contenu";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import FormulaireContact from "@/components/FormulaireContact";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import { EnTeteSection, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { ENTREPRISE } from "@/data/site";
import type { PageFonctionnelle } from "@/lib/pages";
import { CHEMIN_TUNNEL } from "@/lib/reservation/config";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * `/contact/` — écrire, appeler, ou réserver directement.
 *
 * La page du WordPress ne contenait **aucun texte** : une extension y posait un
 * formulaire, et rien d'autre. Elle a maintenant les deux — un formulaire qui
 * fonctionne, et ce qu'il faut savoir avant d'écrire.
 *
 * L'ordre compte : la première chose qu'on lit est que, pour un transfert
 * standard, le formulaire de réservation donne un prix tout de suite. Une
 * demande par e-mail à laquelle il faut répondre coûte du temps aux deux
 * parties, et le visiteur attend sa réponse au lieu de réserver.
 */
export default function PageContact({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: page.h1, chemin },
  ];

  const { adresse, entite } = ENTREPRISE;

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <HeroInterieur image={page.visuel}>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{page.chapo}</p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div>
              <EnTeteSection
                surtitre="Write to us"
                titre="Send us a message"
                chapo="Dates, airport, resort and number of passengers in one message, and we answer in one go."
              />
              <div className="mt-8">
                <FormulaireContact />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
              {/* Réserver plutôt qu'écrire : plus rapide pour un trajet standard. */}
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Just need a price?</p>
                <p className="mt-2 text-sm leading-relaxed text-alpine-600">
                  For a standard airport transfer, the booking form gives you a fixed price
                  straight away — faster than waiting for a reply.
                </p>
                <Link
                  href={CHEMIN_TUNNEL}
                  className="mt-4 inline-block rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
                >
                  Get a price
                </Link>
              </div>

              <div className="rounded border border-glacier-200 p-5">
                <p className="font-display text-lg text-alpine">Reach us directly</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      className="text-alpine-700 hover:text-marque"
                      href={`mailto:${ENTREPRISE.email}`}
                    >
                      {ENTREPRISE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-alpine-700 hover:text-marque"
                      href={`tel:${ENTREPRISE.telephone}`}
                    >
                      {ENTREPRISE.telephoneAffiche}
                    </a>
                  </li>
                </ul>

                <address className="mt-4 space-y-1 border-t border-glacier-200 pt-4 text-sm not-italic text-alpine-600">
                  <p className="font-medium text-alpine">{entite.enseigne}</p>
                  <p>{adresse.rue}</p>
                  <p>
                    {adresse.codePostal} {adresse.ville}, France
                  </p>
                </address>
              </div>
            </aside>
          </div>
        </Section>

        {/* Ce qu'il vaut mieux savoir avant d'écrire, repris du contenu de la page. */}
        {page.contenu.length > 0 ? (
          <Section fond="glacier">
            <Contenu blocs={page.contenu} />
          </Section>
        ) : null}
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
