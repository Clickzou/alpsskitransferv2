import type { Metadata } from "next";
import "../globals.css";
import Animations, { SCRIPT_ANIMATIONS } from "@/components/Animations";
import { PanierProvider } from "@/components/panier/PanierProvider";
import { display, sans } from "../polices";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Pas de template de titre : les metaTitre sont déjà calibrés à 60 caractères
  // et portent la marque quand elle est utile.
  title: {
    default: "Alps Ski Transfers — Flughafentransfer in die Alpen",
    template: "%s",
  },
};

/** Racine de — voir `(en)/layout.tsx`. */
export default function RootLayoutDE({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-DE" className={`${sans.variable} ${display.variable}`}
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
          Le panier enveloppe cette langue comme il enveloppe l'anglais : la
          pastille de l'en-tête et la page du panier lisent le même état. Il y
          manquait — l'icône était masquée hors anglais, et l'ajouter sans le
          fournisseur aurait fait tomber toutes les pages de la langue.
        */}
        <PanierProvider>{children}</PanierProvider>
        <Animations />
      </body>
    </html>
  );
}
