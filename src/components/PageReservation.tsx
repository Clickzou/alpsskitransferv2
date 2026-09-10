import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { alternativesPageFonctionnelleEn } from "@/lib/intl/liens";
import JsonLd from "@/components/JsonLd";
import { Suspense } from "react";
import TunnelAutonome from "@/components/reservation/TunnelAutonome";
import { Section } from "@/components/gabarit/Sections";
import type { PageFonctionnelle } from "@/lib/pages";
import { LIEUX } from "@/lib/reservation/lieux";
import { filArianeSchema, grapheJsonLd, organisationSchema } from "@/lib/schema";

/**
 * `/book-ski-transfer-tickets/` — le formulaire de réservation, et rien d'autre.
 *
 * La page a été vidée de son éditorial le 10 septembre 2026, à la demande du
 * client : bandeau, chiffres clés, texte repris du WordPress, « ce que le billet
 * comprend » et FAQ. Il ne reste que le tunnel.
 *
 * **Ce que cela coûte, et c'est assumé** : cette URL portait le mot-clé « book
 * ski transfer tickets » et l'antériorité du WordPress sur cette intention. Sans
 * texte, elle ne se positionnera plus — le trafic de réservation devra venir des
 * pages de station et de trajet, qui renvoient toutes ici. Les 301 des anciennes
 * URL de réservation continuent d'y aboutir, sur une page qui répond, ce qui
 * était l'essentiel.
 *
 * Le H1 est celui du tunnel : une page sans H1 est cassée pour un lecteur
 * d'écran comme pour un moteur, et « Get your price and book » dit exactement ce
 * qu'on y fait. Le fil d'Ariane et les données structurées restent : ils coûtent
 * zéro mot et gardent la page rattachée au site.
 */
export default function PageReservation({ page }: { page: PageFonctionnelle }) {
  const chemin = `/${page.slug}/`;
  const filAriane = [
    { nom: "Home", chemin: "/" },
    { nom: "Book ski transfer tickets", chemin },
  ];

  return (
    <>
      <Header lang="en" alternatives={alternativesPageFonctionnelleEn(page.slug)} />
      <main id="contenu">
        <Section fond="blanc" id="reserver">
          {/* Le titre et le formulaire dans la même colonne : le tunnel se
              centre sur 48rem, et un titre pleine largeur au-dessus laissait
              l'un à gauche et l'autre au milieu. */}
          <div className="mx-auto max-w-3xl">
            <FilAriane elements={filAriane} />
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-or-700">
              Book online
            </p>
            <h1 className="mt-3 font-display text-titre-page text-alpine">
              Get your price and book
            </h1>
            <p className="mt-3 text-chapo text-alpine-700">
              Enter your journey to see the price for your vehicle, then confirm. Tolls, ski
              carriage and flight tracking are included.
            </p>

            <div className="mt-8">
              <Suspense fallback={null}>
                <TunnelAutonome lieux={LIEUX} />
              </Suspense>
            </div>
          </div>
        </Section>
      </main>
      <Footer lang="en" />
      <JsonLd
        data={grapheJsonLd(
          organisationSchema(),
          filArianeSchema(filAriane.map((e) => ({ nom: e.nom, path: e.chemin }))),
        )}
      />
    </>
  );
}
