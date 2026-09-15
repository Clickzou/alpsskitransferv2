"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

/**
 * L'écart sous le concurrent le moins cher — l'aperçu se recalcule dès qu'on
 * le change.
 *
 * Revue de JC, 15 septembre 2026 : il a tapé 2 € sans cliquer « Recalculer
 * l'aperçu », et « Appliquer ces nouveaux tarifs » proposait encore 5 € —
 * l'aperçu et le bouton suivaient l'ancienne valeur. Désormais la page se
 * recharge seule, sans remonter en haut, une demi-seconde après la saisie.
 */
export default function ChampEcart({ ecart }: { ecart: number }) {
  const router = useRouter();
  const chemin = usePathname();
  const params = useSearchParams();
  const [valeur, setValeur] = useState(String(ecart));
  const [enCours, demarrer] = useTransition();
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setValeur(String(ecart)), [ecart]);

  function recalculer(texte: string) {
    const n = Number(texte.replace(",", "."));
    if (texte.trim() === "" || !Number.isFinite(n) || n === ecart) return;
    const suivants = new URLSearchParams(params.toString());
    suivants.set("ecart", String(n));
    demarrer(() => router.replace(`${chemin}?${suivants}`, { scroll: false }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        recalculer(valeur);
      }}
      className="mt-4 flex flex-wrap items-center gap-2 text-sm text-alpine"
    >
      Nos prix à
      <input
        name="ecart"
        value={valeur}
        onChange={(e) => {
          setValeur(e.target.value);
          if (minuterie.current) clearTimeout(minuterie.current);
          const texte = e.target.value;
          minuterie.current = setTimeout(() => recalculer(texte), 500);
        }}
        inputMode="decimal"
        aria-label="Écart en euros"
        className="w-20 rounded border border-glacier-300 px-2 py-1.5 text-right"
      />
      € en dessous du concurrent le moins cher
      <span className="text-xs text-alpine-600" aria-live="polite">
        {enCours ? "Calcul de l’aperçu…" : ""}
      </span>
    </form>
  );
}
