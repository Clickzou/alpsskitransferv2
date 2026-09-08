import type { Metadata } from "next";
import "../globals.css";
import Animations, { SCRIPT_ANIMATIONS } from "@/components/Animations";
import { display, sans } from "../polices";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Pas de template de titre : les metaTitre repris de Rank Math sont déjà
  // calibrés à 60 caractères et portent la marque quand elle est utile. Ajouter
  // « | Alps Ski Transfers » les ferait tous dépasser la limite.
  title: {
    default: "Alps Ski Transfers — transferts aéroport vers les Alpes",
    template: "%s",
  },
};

/** Racine française — voir `(en)/layout.tsx`. */
export default function RootLayoutFr({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-FR" className={`${sans.variable} ${display.variable}`}
      /* Le script d'animation pose `data-anime-pret` sur cet élément avant le
         premier rendu : React verrait sinon un attribut qu'il n'a pas écrit et
         signalerait une divergence d'hydratation à chaque chargement. */
      suppressHydrationWarning
    >
      <body className="font-sans">
        {/* Avant tout rendu : sans lui, l'apparition au défilement masquerait du
            contenu chez qui n'a pas JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANIMATIONS }} />
        {children}
        <Animations />
      </body>
    </html>
  );
}
