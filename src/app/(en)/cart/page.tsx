import type { Metadata } from "next";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Panier from "@/components/panier/Panier";
import { HeroInterieur, Section } from "@/components/gabarit/Sections";
import { pageMetadata } from "@/lib/seo";

/**
 * `/cart/` — la liste des transferts retenus.
 *
 * L'URL est celle du panier WooCommerce, que le proxy sort déjà de l'index
 * (`CHEMINS_NOINDEX`) : la reprendre évite une adresse de plus à faire connaître
 * et hérite de l'exclusion. Le `noindex` est donc posé deux fois — ici pour les
 * robots qui lisent la page, et par l'en-tête HTTP du proxy pour les autres.
 *
 * Une page de panier n'a rien à faire dans un moteur de recherche : elle est
 * vide pour tout le monde sauf pour celui qui l'a remplie. C'était l'un des
 * constats de l'audit — le WordPress laissait panier et commande en
 * `index, follow`.
 */
export const metadata: Metadata = pageMetadata({
  title: "Your transfers",
  description: "The transfers you have selected, ready to book together.",
  path: "/cart/",
  lang: "en",
  noindex: true,
});

export default function PageCart() {
  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: "Home", chemin: "/" },
              { nom: "Your transfers", chemin: "/cart/" },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Your transfers
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Outbound, return, a second vehicle for the rest of the group — book them together and
            pay once. Prices are checked against our system each time you open this page.
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <Panier />
        </Section>
      </main>
      <Footer lang="en" />
    </>
  );
}
