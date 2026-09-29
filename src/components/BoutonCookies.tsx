"use client";

import type { Lang } from "@/lib/i18n";
import { MESURE_ACTIVE, OUVRIR_BANDEAU } from "./MesureAudience";

const LIBELLE: Record<Lang, string> = {
  en: "Cookie settings",
  fr: "Gérer les cookies",
  de: "Cookie-Einstellungen",
  it: "Gestisci i cookie",
};

/**
 * Rouvre le bandeau de consentement : retirer son accord doit être aussi simple
 * que le donner. Absent tant que la mesure d'audience n'est pas active — un
 * réglage qui ne règle rien n'a rien à faire dans le pied de page.
 */
export default function BoutonCookies({ lang }: { lang: Lang }) {
  if (!MESURE_ACTIVE) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OUVRIR_BANDEAU))}
      className="underline hover:text-white"
    >
      {LIBELLE[lang]}
    </button>
  );
}
