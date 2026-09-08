import type { Metadata } from "next";
import "../globals.css";
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
    <html lang="fr-FR" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
