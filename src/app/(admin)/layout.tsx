import type { Metadata } from "next";
import "../globals.css";
import { display, sans } from "../polices";

/**
 * Racine du back-office.
 *
 * Un groupe de routes à part, avec son propre `<html>` : le back-office n'a ni
 * en-tête de site, ni pied de page, ni panier, ni animation au défilement. Il
 * n'a pas non plus de langue négociable — l'exploitant est francophone, c'est
 * du français, et il n'y aura pas de version italienne d'un écran que trois
 * personnes ouvrent.
 *
 * `noindex, nofollow` en dur, en plus du `Disallow` de `robots.txt` : ces pages
 * ne doivent apparaître nulle part, quel que soit l'état de l'interrupteur
 * d'indexation du site public.
 */
export const metadata: Metadata = {
  title: "Back-office — Alps Ski Transfers",
  robots: { index: false, follow: false },
};

/** Aucune page du back-office n'est mise en cache : elle montre l'état courant. */
export const dynamic = "force-dynamic";

export default function RootLayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-FR" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-glacier-50 font-sans text-alpine">{children}</body>
    </html>
  );
}
