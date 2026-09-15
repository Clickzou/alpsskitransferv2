"use client";

import { useFormStatus } from "react-dom";
import { useRef, useState } from "react";

/**
 * L'écart sous le concurrent le moins cher, et le bouton qui l'applique.
 *
 * Revue de JC, 15 septembre 2026 : il a tapé 2 €, et « Appliquer ces nouveaux
 * tarifs » proposait encore 5 € — l'aperçu et le bouton suivaient la valeur
 * affichée, pas la valeur tapée. Deux garde-fous désormais :
 * - la page se recharge seule sur la nouvelle valeur, une seconde après la
 *   saisie, et revient à l'aperçu ;
 * - le champ appartient au formulaire d'application (attribut `form`) : c'est
 *   la valeur tapée qui part, et tant que l'aperçu ne la montre pas, le bouton
 *   refuse d'appliquer.
 */
/** L'`id` du formulaire d'application, repris tel quel dans `page.tsx`. */
const FORMULAIRE_APPLIQUER = "appliquer-tarifs";

const lire = (texte: string) => Number(texte.replace(",", ".").trim());

export function ChampEcart({ ecart }: { ecart: number }) {
  const [valeur, setValeur] = useState(String(ecart));
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = lire(valeur);
  const aJour = valeur.trim() !== "" && n === ecart;

  function recharger(texte: string) {
    const v = lire(texte);
    if (texte.trim() === "" || !Number.isFinite(v) || v === ecart) return;
    const url = new URL(window.location.href);
    url.searchParams.set("ecart", String(v));
    url.searchParams.delete("fait");
    url.searchParams.delete("detail");
    url.hash = "apercu";
    window.location.assign(url.toString());
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-alpine">
      Nos prix à
      <input
        name="ecart"
        form={FORMULAIRE_APPLIQUER}
        value={valeur}
        onChange={(e) => {
          const texte = e.target.value;
          setValeur(texte);
          if (minuterie.current) clearTimeout(minuterie.current);
          minuterie.current = setTimeout(() => recharger(texte), 900);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          e.preventDefault();
          recharger(valeur);
        }}
        inputMode="decimal"
        aria-label="Écart en euros"
        className="w-20 rounded border border-glacier-300 px-2 py-1.5 text-right"
      />
      € en dessous du concurrent le moins cher
      {!aJour && valeur.trim() !== "" && Number.isFinite(n) && (
        <span className="text-xs font-semibold text-marque" aria-live="polite">
          Calcul de l’aperçu à {n} €…
        </span>
      )}
    </div>
  );
}

export function BoutonAppliquer({ ecart }: { ecart: number }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(evenement) => {
        const champ = evenement.currentTarget.form?.elements.namedItem("ecart") as HTMLInputElement | null;
        const tape = lire(champ?.value ?? String(ecart));
        if (!Number.isFinite(tape)) {
          evenement.preventDefault();
          window.alert("L’écart doit être un nombre d’euros, par exemple 2.");
          return;
        }
        if (tape !== ecart) {
          evenement.preventDefault();
          window.alert(`L’aperçu affiche encore ${ecart} €. Attendez qu’il se recalcule à ${tape} €, puis appliquez.`);
          return;
        }
        const question = `Appliquer ces tarifs à ${tape} € sous le concurrent le moins cher, sur tous les trajets et tous les véhicules ? Ils sont publiés tout de suite ; l’onglet Tarifs permet de revenir en arrière.`;
        if (!window.confirm(question)) evenement.preventDefault();
      }}
      className="rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Mise à jour…" : "Appliquer ces nouveaux tarifs"}
    </button>
  );
}
