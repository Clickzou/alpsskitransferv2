import type { Metadata } from "next";
import "../globals.css";
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
    <html lang="en-GB" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
