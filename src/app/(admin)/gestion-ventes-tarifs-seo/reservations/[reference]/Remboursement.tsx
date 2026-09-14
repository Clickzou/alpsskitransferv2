"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { actionRembourser } from "../../actions";

/**
 * « Rembourser le client » — sur la fiche, jamais dans la liste : un appui de
 * travers sur un téléphone ne doit pas rendre de l'argent.
 *
 * Le montant proposé suit les conditions de vente (`suggestionRemboursement`),
 * et l'exploitant le force s'il le veut. La confirmation redit le montant, le
 * moyen et l'annulation avant d'envoyer.
 */

const CHAMP =
  "w-32 rounded border border-glacier-300 bg-white px-2 py-1.5 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";

const euros = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n);

function Envoyer({ libelle, question }: { libelle: string; question: () => string | null }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        const q = question();
        if (!q || !window.confirm(q)) e.preventDefault();
      }}
      className="rounded bg-danger px-4 py-2 text-sm font-semibold text-white transition hover:bg-danger-700 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Remboursement…" : libelle}
    </button>
  );
}

export default function Remboursement({
  reference,
  disponible,
  suggestion,
  moyen,
  annulee,
}: {
  reference: string;
  /** Ce qui reste à rendre, en euros. */
  disponible: number;
  suggestion: { montant: number; motif: string };
  moyen: "carte" | "virement";
  annulee: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [mode, setMode] = useState<"total" | "montant">("montant");
  const [montant, setMontant] = useState(String(suggestion.montant).replace(".", ","));
  const [annuler, setAnnuler] = useState(false);

  if (disponible <= 0) return <p className="mt-3 text-sm text-alpine-600">Tout a été remboursé.</p>;

  if (!ouvert) {
    return (
      <button
        type="button"
        onClick={() => setOuvert(true)}
        className="mt-3 rounded border border-danger-300 px-4 py-2 text-sm font-semibold text-danger-700 transition hover:bg-danger-50"
      >
        Rembourser le client
      </button>
    );
  }

  const valeur = mode === "total" ? String(disponible) : montant;

  return (
    <form action={actionRembourser} className="mt-3 space-y-3 rounded-lg border border-danger-300 bg-danger-50/40 p-4">
      <input type="hidden" name="reference" value={reference} />
      <input type="hidden" name="montant" value={valeur} />

      <fieldset className="space-y-2 text-sm text-alpine">
        <legend className="text-xs font-medium uppercase tracking-wide text-alpine-600">Montant à rembourser</legend>
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode === "total"} onChange={() => setMode("total")} />
          La totalité — {euros(disponible)}
        </label>
        <label className="flex flex-wrap items-center gap-2">
          <input type="radio" checked={mode === "montant"} onChange={() => setMode("montant")} />
          Un montant :
          <input
            value={montant}
            onChange={(e) => {
              setMontant(e.target.value);
              setMode("montant");
            }}
            inputMode="decimal"
            aria-label="Montant à rembourser"
            className={CHAMP}
          />
          €
        </label>
      </fieldset>
      <p className="text-xs leading-relaxed text-alpine-600">
        Proposé : {euros(suggestion.montant)}. {suggestion.motif}
      </p>

      {!annulee ? (
        <label className="flex items-center gap-2 text-sm text-alpine">
          <input type="checkbox" name="annuler" checked={annuler} onChange={(e) => setAnnuler(e.target.checked)} />
          Annuler aussi la course
        </label>
      ) : null}

      <p className="text-xs text-alpine-600">
        {moyen === "carte"
          ? "Stripe rend l’argent sur la carte du client. Le client reçoit un e-mail dans sa langue."
          : "Payée par virement : Stripe ne peut pas la rembourser. Faites le virement depuis votre banque, puis notez-le ici — le client reçoit un e-mail dans sa langue."}
      </p>

      <div className="flex flex-wrap gap-2">
        <Envoyer
          libelle={moyen === "carte" ? "Rembourser" : "Noter le remboursement par virement"}
          question={() => {
            const n = Number(valeur.replace(/\s/g, "").replace(",", "."));
            if (!Number.isFinite(n) || n <= 0) {
              window.alert("Écrivez un montant en euros, par exemple 250 ou 250,50.");
              return null;
            }
            return `${moyen === "carte" ? "Rembourser" : "Noter un remboursement de"} ${euros(n)} ${
              moyen === "carte" ? "sur la carte du client" : "fait par virement"
            }${annuler ? ", et annuler la course" : ""} ? Le client en sera prévenu par e-mail.`;
          }}
        />
        <button
          type="button"
          onClick={() => setOuvert(false)}
          className="rounded border border-glacier-300 px-4 py-2 text-sm font-semibold text-alpine-700 hover:bg-glacier-50"
        >
          Fermer
        </button>
      </div>
    </form>
  );
}
