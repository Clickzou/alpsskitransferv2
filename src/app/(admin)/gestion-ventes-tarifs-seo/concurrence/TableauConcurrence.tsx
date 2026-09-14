"use client";

import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import type { Filtres, LigneComparaison } from "@/lib/concurrence/tableau";
import { actionAligner } from "./actions";

/**
 * Le tableau des écarts, et « être X € moins cher » — demande de JC, 14 septembre 2026.
 *
 * On coche les trajets (ou « tous ceux où l'on est plus cher »), on choisit
 * l'écart, et la colonne « Nouveau prix » montre tout de suite ce qui sera
 * posé. Le serveur refait le calcul au clic : ce que montre cette colonne
 * n'est qu'un aperçu.
 */

const euros = (n: number | null) =>
  n === null
    ? "—"
    : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function Appliquer({ nombre, ecart }: { nombre: number; ecart: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || nombre === 0}
      onClick={(e) => {
        if (!window.confirm(`Poser un prix fixe ${ecart} € sous le concurrent le moins cher sur ${nombre} trajet${nombre > 1 ? "s" : ""} ? La grille est publiée tout de suite ; l’onglet Tarifs permet de revenir en arrière.`)) {
          e.preventDefault();
        }
      }}
      className="rounded bg-marque px-4 py-2 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "Publication…" : `Appliquer à ${nombre} trajet${nombre > 1 ? "s" : ""}`}
    </button>
  );
}

export default function TableauConcurrence({ lignes, filtres }: { lignes: LigneComparaison[]; filtres: Filtres }) {
  const [choisis, setChoisis] = useState<Set<string>>(new Set());
  const [ecart, setEcart] = useState("5");
  const cle = (l: LigneComparaison) => `${l.airport}|${l.resort}`;
  const plusChers = useMemo(() => lignes.filter((l) => l.ecart !== null && l.ecart > 0), [lignes]);
  const ecartNombre = Number(ecart.replace(",", "."));

  const basculer = (k: string) =>
    setChoisis((avant) => {
      const apres = new Set(avant);
      if (apres.has(k)) apres.delete(k);
      else apres.add(k);
      return apres;
    });

  const nouveauPrix = (l: LigneComparaison) =>
    !l.nous || l.meilleur === null || !Number.isFinite(ecartNombre)
      ? null
      : Math.max(1, Math.round(l.meilleur - ecartNombre));

  return (
    <form action={actionAligner}>
      <input type="hidden" name="jour" value={filtres.jour} />
      <input type="hidden" name="passagers" value={filtres.passagers} />
      <input type="hidden" name="gamme" value={filtres.gamme} />
      <input type="hidden" name="ecart" value={ecart} />
      {[...choisis].map((k) => (
        <input key={k} type="hidden" name="trajet" value={k} />
      ))}

      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-3 rounded-t-xl border border-glacier-200 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => setChoisis(new Set(plusChers.map(cle)))}
          className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50"
        >
          Cocher les {plusChers.length} où l’on est plus cher
        </button>
        <button
          type="button"
          onClick={() => setChoisis(new Set(lignes.filter((l) => l.meilleur !== null && l.nous).map(cle)))}
          className="rounded border border-glacier-300 px-3 py-1.5 text-sm text-alpine-700 hover:bg-glacier-50"
        >
          Tout cocher
        </button>
        {choisis.size > 0 ? (
          <button type="button" onClick={() => setChoisis(new Set())} className="text-sm text-alpine-600 underline">
            Tout décocher
          </button>
        ) : null}
        <span className="ml-auto flex flex-wrap items-center gap-2 text-sm text-alpine">
          Être
          <input
            value={ecart}
            onChange={(e) => setEcart(e.target.value)}
            inputMode="decimal"
            aria-label="Écart en euros"
            className="w-16 rounded border border-glacier-300 px-2 py-1.5 text-right text-sm"
          />
          € moins cher que le concurrent le moins cher
          <Appliquer nombre={choisis.size} ecart={ecart} />
        </span>
      </div>

      <div className="overflow-x-auto rounded-b-xl border border-t-0 border-glacier-200 bg-white shadow-carte">
        <table className="w-full min-w-[56rem] text-sm">
          <thead className="bg-glacier-50 text-left text-xs uppercase tracking-wide text-alpine-600">
            <tr>
              <th className="w-10 px-3 py-2" />
              <th className="px-3 py-2 font-medium">Trajet</th>
              <th className="px-3 py-2 text-right font-medium">Nous</th>
              <th className="px-3 py-2 text-right font-medium">alps2alps</th>
              <th className="px-3 py-2 text-right font-medium">Alpy</th>
              <th className="px-3 py-2 text-right font-medium">Écart</th>
              <th className="px-3 py-2 text-right font-medium">Nouveau prix</th>
              <th className="px-3 py-2 text-right font-medium">Tendance 30 j</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => {
              const k = cle(l);
              const coche = choisis.has(k);
              const possible = l.nous !== null && l.meilleur !== null;
              const nouveau = coche ? nouveauPrix(l) : null;
              const pourcent = l.ecart !== null && l.meilleur ? Math.round((l.ecart / l.meilleur) * 100) : null;
              const tendance =
                l.meilleurAvant !== null && l.meilleur !== null ? Math.round(l.meilleur - l.meilleurAvant) : null;
              return (
                <tr key={k} className={`border-t border-glacier-100 ${coche ? "bg-alpes-50/60" : ""}`}>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={coche}
                      disabled={!possible}
                      onChange={() => basculer(k)}
                      aria-label={`Choisir ${l.trajet}`}
                    />
                  </td>
                  <td className="px-3 py-2 text-alpine">
                    {l.trajet}
                    {l.nous ? <span className="block text-xs text-alpine-600">notre {l.nous.categorie}</span> : null}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums">{euros(l.nous?.prix ?? null)}</td>
                  {[l.alps2alps, l.alpy].map((c, i) => (
                    <td key={i} className="px-3 py-2 text-right tabular-nums" title={c.detail ?? undefined}>
                      {c.prix !== null ? (
                        euros(c.prix)
                      ) : (
                        <span className="text-xs text-alpine-500">{c.detail ? "indisponible" : "pas encore relevé"}</span>
                      )}
                    </td>
                  ))}
                  <td
                    className={`px-3 py-2 text-right font-semibold tabular-nums ${
                      l.ecart === null ? "" : l.ecart > 0 ? "text-danger-700" : "text-succes-700"
                    }`}
                  >
                    {l.ecart === null ? "—" : `${l.ecart > 0 ? "+" : "−"}${euros(Math.abs(l.ecart))}`}
                    {pourcent !== null ? <span className="block text-xs font-normal">{pourcent > 0 ? "+" : ""}{pourcent} %</span> : null}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {nouveau !== null ? <strong className="text-alpine">{euros(nouveau)}</strong> : <span className="text-alpine-500">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right text-xs tabular-nums text-alpine-600">
                    {tendance === null ? "—" : tendance === 0 ? "stable" : `concurrents ${tendance > 0 ? "+" : "−"}${euros(Math.abs(tendance))}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </form>
  );
}
