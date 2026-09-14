import Link from "next/link";
import { redirect } from "next/navigation";
import { heure } from "@/lib/admin/affichage";
import {
  facturesDuMois,
  libelleMois,
  moisCourant,
  moisValide,
  moisVoisin,
} from "@/lib/admin/factures";
import { remboursementsDuMois } from "@/lib/admin/remboursements";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { facturesActives } from "@/lib/reservation/stripe";
import Entete from "../Entete";

/**
 * L'onglet « Factures » — demande de JC, 11 septembre 2026.
 *
 * Le mois en cours par défaut, les autres par les flèches. Chaque facture mène
 * à son PDF et à la fiche de sa course ; le total du mois écarte les factures
 * annulées, comme le fera le comptable. L'export CSV est celui que l'exploitant
 * transmet chaque mois — « l'export mensuel fait l'affaire ».
 *
 * Les factures sont lues chez Stripe, qui les émet (`lib/admin/factures.ts`).
 */
export const dynamic = "force-dynamic";

const ICI = "/gestion-ventes-tarifs-seo/factures/";

function euros(montant: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(montant);
}

export default async function PageFactures({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) {
    redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);
  }

  const { mois: brut } = await searchParams;
  const mois = moisValide(brut) ?? moisCourant();
  const [factures, remboursements] = await Promise.all([facturesDuMois(mois), remboursementsDuMois(mois)]);
  const totalRembourse = remboursements.reduce((s, r) => s + r.montant, 0);
  const comptees = (factures ?? []).filter((f) => f.statut !== "Annulée");
  const totaux = comptees.reduce(
    (t, f) => ({ ht: t.ht + f.ht, tva: t.tva + f.tva, ttc: t.ttc + f.ttc }),
    { ht: 0, tva: 0, ttc: 0 },
  );
  const fleche =
    "rounded border border-glacier-300 px-3 py-1.5 text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Entete email={utilisateur.email} actif="factures" />
      <h1 className="sr-only">Factures</h1>

      {!facturesActives() ? (
        /*
          L'interrupteur est éteint tant que l'exploitant n'a pas validé la
          dénomination, la numérotation et la TVA : l'onglet le dit plutôt que
          de laisser croire qu'aucune course n'a été facturée par oubli.
        */
        <p className="mt-8 rounded border border-or/40 bg-or-50 px-4 py-3 text-sm leading-relaxed text-alpine-700">
          La facturation automatique est prête mais pas encore allumée : elle attend les
          derniers réglages du compte Stripe (dénomination, numérotation à partir de 199,
          numéro de TVA). Les factures apparaîtront ici dès l’activation.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`${ICI}?mois=${moisVoisin(mois, -1)}`} className={fleche} aria-label="Mois précédent">
            ←
          </Link>
          <h2 className="min-w-44 text-center font-display text-lg capitalize text-alpine">
            {libelleMois(mois)}
          </h2>
          <Link href={`${ICI}?mois=${moisVoisin(mois, 1)}`} className={fleche} aria-label="Mois suivant">
            →
          </Link>
        </div>

        {factures && (factures.length > 0 || remboursements.length > 0) ? (
          <a
            href={`${ICI}export/?mois=${mois}`}
            className="rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            Exporter le mois (CSV)
          </a>
        ) : null}
      </div>

      <div className="mt-3 overflow-x-auto rounded-xl border border-glacier-200 bg-white shadow-carte">
        {factures === null ? (
          <p className="px-4 py-8 text-center text-sm text-alpine-600">
            Stripe n’est pas configuré ou ne répond pas sur cet environnement.
          </p>
        ) : factures.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-alpine-600">
            Aucune facture émise en {libelleMois(mois)}.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-glacier-50 text-left text-xs uppercase tracking-wide text-alpine-600">
              <tr>
                <th className="px-4 py-2 font-medium">Numéro</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Client</th>
                <th className="px-4 py-2 font-medium">Course</th>
                <th className="px-4 py-2 text-right font-medium">HT</th>
                <th className="px-4 py-2 text-right font-medium">TVA</th>
                <th className="px-4 py-2 text-right font-medium">TTC</th>
                <th className="px-4 py-2 font-medium">Statut</th>
                <th className="px-4 py-2 font-medium">PDF</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((f) => (
                <tr key={f.id} className="border-t border-glacier-200 align-top">
                  <td className="px-4 py-3 font-mono text-xs">{f.numero}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{heure(f.date)}</td>
                  <td className="px-4 py-3">
                    {f.client || "—"}
                    <span className="block text-xs text-alpine-600">{f.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    {f.reference ? (
                      <Link href={cheminFiche(f.reference)} className="font-mono text-xs underline">
                        {f.reference}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{euros(f.ht)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{euros(f.tva)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium tabular-nums">
                    {euros(f.ttc)}
                  </td>
                  <td className="px-4 py-3">{f.statut}</td>
                  <td className="px-4 py-3">
                    {f.pdf ? (
                      <a href={f.pdf} className="text-marque underline underline-offset-2">
                        PDF
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-glacier-300 font-semibold">
                <td className="px-4 py-3" colSpan={4}>
                  Total du mois{comptees.length !== factures.length ? " (hors factures annulées)" : ""}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{euros(totaux.ht)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{euros(totaux.tva)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{euros(totaux.ttc)}</td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        )}
      </div>

      {/* Les remboursements du mois — cartes et virements, lus en base ; l'export les déduit. */}
      <section className="mt-8">
        <h2 className="font-display text-lg text-alpine">
          Remboursements de {libelleMois(mois)}{" "}
          <span className="text-sm font-normal text-alpine-600">({remboursements.length})</span>
        </h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-glacier-200 bg-white shadow-carte">
          {remboursements.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-alpine-600">Aucun remboursement ce mois-ci.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-glacier-50 text-left text-xs uppercase tracking-wide text-alpine-600">
                <tr>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Course</th>
                  <th className="px-4 py-2 font-medium">Moyen</th>
                  <th className="px-4 py-2 text-right font-medium">Montant TTC</th>
                </tr>
              </thead>
              <tbody>
                {remboursements.map((r, i) => (
                  <tr key={i} className="border-t border-glacier-200">
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums">{heure(r.le)}</td>
                    <td className="px-4 py-3">
                      <Link href={cheminFiche(r.reference)} className="font-mono text-xs underline">
                        {r.reference}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{r.moyen === "carte" ? "Carte (Stripe)" : "Virement"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-danger-700">
                      −{euros(r.montant)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-glacier-300 font-semibold">
                  <td className="px-4 py-3" colSpan={3}>
                    Total remboursé
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-danger-700">
                    −{euros(totalRembourse)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}
