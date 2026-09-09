import type { Metadata } from "next";
import "../globals.css";
import Animations, { SCRIPT_ANIMATIONS } from "@/components/Animations";
import { PanierProvider } from "@/components/panier/PanierProvider";
import { display, sans } from "../polices";
import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Pas de template de titre : les metaTitre repris de Rank Math sont déjà
  // calibrés à 60 caractères et portent la marque quand elle est utile. Ajouter
  // « | Alps Ski Transfers » les ferait tous dépasser la limite.
  title: {
    default: "Alps Ski Transfers — airport transfers to the Alps",
    template: "%s",
  },
  alternates: { canonical: absoluteUrl("/") },
};

/**
 * Racine anglaise. Le site a deux layouts racines (voir `(fr)/layout.tsx`) :
 * c'est ce qui permet de servir `lang="en-GB"` à la racine et `lang="fr-FR"`
 * sous `/fr/`, plutôt qu'un seul attribut mensonger pour les deux.
 */
export default function RootLayoutEn({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${display.variable}`}
      /* Le script d'animation pose `data-anime-pret` sur cet élément avant le
         premier rendu : React verrait sinon un attribut qu'il n'a pas écrit et
         signalerait une divergence d'hydratation à chaque chargement. */
      suppressHydrationWarning
    >
      <body className="font-sans">
        {/* Avant tout rendu : sans lui, l'apparition au défilement masquerait du
            contenu chez qui n'a pas JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANIMATIONS }} />
        {/*
          Le panier enveloppe tout le silo : la pastille de l'en-tête et la page
          `/cart/` lisent le même état, et il survit à la navigation.
        */}
        <PanierProvider>{children}</PanierProvider>
        <Animations />
      </body>
    </html>
  );
}
