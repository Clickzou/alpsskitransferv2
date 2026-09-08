import Link from "next/link";
import Contenu from "@/components/Contenu";
import Faq from "@/components/Faq";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import {
  AppelAction,
  BoutonAction,
  HeroInterieur,
  Section,
} from "@/components/gabarit/Sections";
import type { PageFonctionnelle } from "@/lib/pages";
import { lienReservation } from "@/lib/reservation/config";
import { filArianeSchema, faqSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * Rendu d'une page fonctionnelle reprise du WordPress : contact, conditions, aide.
 *
 * Bandeau sobre, sans photo : ces pages se lisent, elles ne se vendent pas. Elles
 * gardent en revanche le bleu nuit et la typographie du reste du site — c'est ce
 * qui fait tenir l'ensemble. Les pages du tunnel de commande, en `noindex`, ne
 * reçoivent pas l'appel à l'action de fin : le visiteur y est déjà.
 */
/** Les quelques pages vers lesquelles il vaut toujours la peine de renvoyer. */
const LIENS_UTILES = [
  { texte: "Book your transfer", chemin: "/book-ski-transfer-tickets/" },
  { texte: "Help & frequently asked questions", chemin: "/general-questions/" },
  { texte: "Ski resorts we serve", chemin: "/ski-resort-transfers/" },
  { texte: "Contact us", chemin: "/contact/" },
];

export default function PageContenu({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: page.h1, chemin },
  ];

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane clair elements={filAriane} />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {page.h1}
          </h1>
          {page.chapo ? (
            <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
              {page.chapo}
            </p>
          ) : null}
        </HeroInterieur>

        <Section fond="blanc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <Contenu blocs={page.contenu} />

            {/* Une page d'aide qui ne mène nulle part fait revenir le visiteur en arrière. */}
            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="rounded border border-glacier-200 bg-glacier-50 p-5">
                <p className="font-display text-lg text-alpine">Useful links</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {LIENS_UTILES.filter((lien) => lien.chemin !== chemin).map((lien) => (
                    <li key={lien.chemin}>
                      <Link className="text-alpine-700 hover:text-marque" href={lien.chemin}>
                        {lien.texte}
                      </Link>
                    </li>
                  ))}
                </ul>
                <BoutonAction href={lienReservation()} className="mt-4">
                  Book now
                </BoutonAction>
              </div>
            </aside>
          </div>
        </Section>

        <Faq items={page.faq} titre="Frequently asked questions" />

        {page.noindex ? null : <AppelAction titre="Book your airport ski transfer" />}
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
