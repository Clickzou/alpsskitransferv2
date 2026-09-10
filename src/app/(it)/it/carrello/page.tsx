import type { Metadata } from "next";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Panier from "@/components/panier/Panier";
import { HeroInterieur, Section } from "@/components/gabarit/Sections";
import { lienTunnelLangue } from "@/lib/intl/navigation";
import { T } from "@/lib/intl/textes";
import { CHEMIN_PANIER, TEXTES_PANIER } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * Le panier de la langue.
 *
 * Même composant, même re-chiffrage côté serveur que `/cart/` : seuls les mots
 * changent. `noindex`, comme son équivalent anglais — une page de panier est
 * vide pour tout le monde sauf pour celui qui l'a remplie.
 */
export const metadata: Metadata = pageMetadata({
  title: TEXTES_PANIER.it.titre,
  description: TEXTES_PANIER.it.metaDescription,
  path: CHEMIN_PANIER.it,
  lang: "it",
  noindex: true,
});

export default function PagePanier() {
  const t = T("it");
  const mots = TEXTES_PANIER.it;

  return (
    <>
      <Header lang="it" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: "/it/" },
              { nom: mots.fil, chemin: CHEMIN_PANIER.it },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            {mots.titre}
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">{mots.chapo}</p>
        </HeroInterieur>

        <Section fond="blanc">
          <Panier langue="it" tunnel={lienTunnelLangue("it")} />
        </Section>
      </main>
      <Footer lang="it" />
    </>
  );
}
