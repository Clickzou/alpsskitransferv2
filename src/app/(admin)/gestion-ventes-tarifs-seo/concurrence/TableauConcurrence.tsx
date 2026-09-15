import type { LigneComparaison } from "@/lib/concurrence/tableau";

/**
 * Le tableau des écarts, en lecture seule : pour voir où l'on se situe. La
 * mise à jour des prix, elle, se fait d'un seul bouton pour tous les trajets
 * (revue de JC, 14 septembre 2026 : cocher trajet par trajet, filtre par
 * filtre, devenait une usine à gaz).
 */

const euros = (n: number | null) =>
  n === null
    ? "—"
    : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const date = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });

export default function TableauConcurrence({
  lignes,
  dateCommune,
  libelleTendance = "Tendance 30 j",
}: {
  lignes: LigneComparaison[];
  /** La date du transfert annoncée au-dessus du tableau ; une ligne qui en diffère la redit. */
  dateCommune: string | null;
  /** L'en-tête de la dernière colonne : 30 jours pour le relevé de nuit, le relevé précédent pour la haute saison. */
  libelleTendance?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-glacier-200 bg-white shadow-carte">
      <table className="w-full min-w-[48rem] text-sm">
        <thead className="bg-glacier-50 text-left text-xs uppercase tracking-wide text-alpine-600">
          <tr>
            <th className="px-3 py-2 font-medium">Trajet</th>
            <th className="px-3 py-2 text-right font-medium">Nous</th>
            <th className="px-3 py-2 text-right font-medium">alps2alps</th>
            <th className="px-3 py-2 text-right font-medium">Alpy</th>
            <th className="px-3 py-2 text-right font-medium">Écart</th>
            <th className="px-3 py-2 text-right font-medium">{libelleTendance}</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => {
            const pourcent = l.ecart !== null && l.meilleur ? Math.round((l.ecart / l.meilleur) * 100) : null;
            const tendance =
              l.meilleurAvant !== null && l.meilleur !== null ? Math.round(l.meilleur - l.meilleurAvant) : null;
            return (
              <tr key={`${l.airport}|${l.resort}`} className="border-t border-glacier-100">
                <td className="px-3 py-2 text-alpine">
                  {l.trajet}
                  {l.nous ? <span className="block text-xs text-alpine-600">notre {l.nous.categorie}</span> : null}
                  {l.dateTrajet && l.dateTrajet !== dateCommune ? (
                    <span className="block text-xs text-attention-700">comparé pour le {date(l.dateTrajet)}</span>
                  ) : null}
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums">{euros(l.nous?.prix ?? null)}</td>
                {[l.alps2alps, l.alpy].map((c, i) => (
                  <td key={i} className="px-3 py-2 text-right tabular-nums" title={c.detail ?? undefined}>
                    {c.prix !== null ? (
                      <>
                        {euros(c.prix)}
                        {/* Un prix repris d'un relevé précédent, le concurrent n'ayant pas répondu cette fois. */}
                        {c.detail?.includes("relevé du") ? (
                          <span className="block text-xs text-alpine-500">{c.detail.slice(c.detail.indexOf("relevé du"))}</span>
                        ) : null}
                      </>
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
                  {pourcent !== null ? (
                    <span className="block text-xs font-normal">
                      {pourcent > 0 ? "+" : ""}
                      {pourcent} %
                    </span>
                  ) : null}
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
  );
}
