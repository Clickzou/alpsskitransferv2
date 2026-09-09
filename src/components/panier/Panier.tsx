"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePanier } from "@/components/panier/PanierProvider";
import { CHEMIN_TUNNEL } from "@/lib/reservation/config";

/** Ce que le serveur répond pour une ligne : son prix, ou la raison du refus. */
interface Chiffrage {
  id: string;
  total: number | null;
  encaissable: boolean;
  motif?: string;
}

/** « 10/09/2026 17:32 » → « Thu 10 Sep 2026, 17:32 ». */
function quandLisible(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * La page panier.
 *
 * ## Le prix est recalculé, pas relu
 *
 * Le panier vit dans le navigateur : ce qui y est stocké est modifiable par
 * n'importe qui. Le montant affiché ici est donc **redemandé au serveur** ligne
 * par ligne, par la même route que le devis. Le prix mémorisé à l'ajout ne sert
 * qu'à repérer un écart et à le signaler — jamais à encaisser.
 *
 * C'est la règle qui corrige le défaut de l'ancien site, où le prix de la page
 * et celui du paiement pouvaient différer du simple au double.
 */
export default function Panier() {
  const { lignes, retirer, vider, pret } = usePanier();
  const [chiffrages, setChiffrages] = useState<Chiffrage[]>([]);
  const [calcul, setCalcul] = useState(false);
  const [caisse, setCaisse] = useState(false);
  const [envoi, setEnvoi] = useState(false);
  const [resultat, setResultat] = useState<{ reference: string; notifie: boolean } | null>(null);
  const [echec, setEchec] = useState<string | null>(null);

  useEffect(() => {
    if (!pret || lignes.length === 0) {
      setChiffrages([]);
      return;
    }

    let abandonne = false;
    setCalcul(true);

    Promise.all(
      lignes.map(async (ligne): Promise<Chiffrage> => {
        try {
          const reponse = await fetch("/api/devis/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              from: ligne.from,
              to: ligne.to,
              when: ligne.when,
              passengers: ligne.passengers,
              bags: ligne.bags,
              skis: ligne.skis,
            }),
          });
          const donnees = await reponse.json();
          // L'API répond `options`, une par catégorie de véhicule.
          const prix = donnees?.options?.find(
            (v: { categorie: string }) => v.categorie === ligne.categorie,
          );
          return prix
            ? { id: ligne.id, total: prix.total, encaissable: prix.encaissable ?? false }
            : { id: ligne.id, total: null, encaissable: false, motif: "Quote on request" };
        } catch {
          return { id: ligne.id, total: null, encaissable: false, motif: "Price unavailable" };
        }
      }),
    ).then((resultats) => {
      if (abandonne) return;
      setChiffrages(resultats);
      setCalcul(false);
    });

    return () => {
      abandonne = true;
    };
  }, [lignes, pret]);

  async function payer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const donnees = Object.fromEntries(new FormData(evenement.currentTarget));
    setEnvoi(true);
    setEchec(null);

    try {
      const reponse = await fetch("/api/panier/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...donnees,
          lignes: lignes.map(({ from, to, when, passengers, categorie, bags, skis }) => ({
            from,
            to,
            when,
            passengers,
            categorie,
            bags,
            skis,
          })),
        }),
      });
      const donneesReponse = await reponse.json();

      if (!donneesReponse.ok) {
        setEchec(
          donneesReponse.erreur === "coordonnees-invalides"
            ? "Please check your name and email address."
            : "We could not process this list. Please try again.",
        );
        setEnvoi(false);
        return;
      }

      // Stripe prend la main quand le barème est validé et la clé en place.
      if (donneesReponse.paiement) {
        window.location.href = donneesReponse.paiement;
        return;
      }

      setResultat({ reference: donneesReponse.reference, notifie: donneesReponse.notifie });
      vider();
    } catch {
      setEchec("We could not reach our booking system. Please try again in a moment.");
    }
    setEnvoi(false);
  }

  /*
   * Avant la lecture du stockage, on ne sait pas si la liste est vide : rendre
   * « votre liste est vide » puis la remplacer par trois courses ferait
   * clignoter la page. Un cadre neutre tient la place le temps d'un cycle.
   */
  if (!pret) {
    return (
      <div
        className="h-40 animate-pulse rounded-xl border border-glacier-200 bg-glacier-50"
        aria-hidden="true"
      />
    );
  }

  if (resultat) {
    return (
      <div className="rounded-xl border border-alpes/30 bg-alpes-50 p-8">
        <p className="font-display text-lg text-alpine">Request received — {resultat.reference}</p>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-alpine-700">
          {resultat.notifie
            ? "We have your list and will come back to you with a confirmation, usually the same day."
            : "Your list could not be sent automatically. Please email contact@alpsskitransfers.com with the reference above and we will pick it up."}
        </p>
      </div>
    );
  }

  if (lignes.length === 0) {
    return (
      <div className="rounded-xl border border-glacier-200 bg-glacier-50 p-8 text-center">
        <p className="font-display text-lg text-alpine">Your list is empty</p>
        <p className="mx-auto mt-2 max-w-prose text-sm leading-relaxed text-alpine-600">
          Add a transfer and it stays here while you plan the rest of the trip — the outbound and
          the return are paid together.
        </p>
        <Link
          href={CHEMIN_TUNNEL}
          className="mt-5 inline-block rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
        >
          Find a transfer
        </Link>
      </div>
    );
  }

  const chiffrage = (id: string) => chiffrages.find((c) => c.id === id);
  const chiffres = chiffrages.filter((c) => c.total !== null);
  const total = chiffres.reduce((somme, c) => somme + (c.total ?? 0), 0);
  const toutChiffre = chiffres.length === lignes.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
      <ul className="space-y-4">
        {lignes.map((ligne) => {
          const prix = chiffrage(ligne.id);
          return (
            <li
              key={ligne.id}
              className="rounded-xl border border-glacier-200 bg-white p-5 shadow-carte"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-base font-semibold text-alpine">
                    {ligne.libelleDepart} → {ligne.libelleArrivee}
                  </p>
                  <p className="mt-1 text-sm text-alpine-600">{quandLisible(ligne.when)}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-alpine-600">
                    {ligne.categorie} · {ligne.passengers}{" "}
                    {ligne.passengers > 1 ? "passengers" : "passenger"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-display text-lg tabular-nums text-alpine">
                    {calcul && !prix ? (
                      <span className="text-sm text-alpine-600">Checking…</span>
                    ) : prix?.total !== null && prix?.total !== undefined ? (
                      `€${prix.total}`
                    ) : (
                      <span className="text-sm text-alpine-600">{prix?.motif ?? "—"}</span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => retirer(ligne.id)}
                    className="mt-2 text-xs text-alpine-600 underline underline-offset-2 hover:text-marque"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/*
                Le prix mémorisé à l'ajout ne fait pas foi : s'il diffère de
                celui que le serveur vient de rendre, on le dit plutôt que de
                laisser découvrir l'écart au paiement.
              */}
              {prix?.total !== null &&
              prix?.total !== undefined &&
              ligne.prixIndicatif > 0 &&
              prix.total !== ligne.prixIndicatif ? (
                <p className="mt-3 rounded border border-or/40 bg-or-50 px-3 py-2 text-xs text-alpine-700">
                  This price has changed since you added it (was €{ligne.prixIndicatif}). The
                  amount above is the one that applies.
                </p>
              ) : null}
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={vider}
            className="text-xs text-alpine-600 underline underline-offset-2 hover:text-marque"
          >
            Empty the list
          </button>
        </li>
      </ul>

      <aside className="lg:sticky lg:top-6 lg:h-fit">
        <div className="rounded-xl border border-glacier-200 bg-glacier-50 p-5">
          <p className="font-display text-lg text-alpine">Total</p>

          <p className="mt-2 font-display text-3xl tabular-nums text-alpine">
            {calcul ? "…" : `€${total}`}
          </p>
          <p className="mt-1 text-xs text-alpine-600">
            {lignes.length} {lignes.length > 1 ? "transfers" : "transfer"} · tolls and ski carriage
            included
          </p>

          {!toutChiffre && !calcul ? (
            <p className="mt-4 rounded border border-glacier-300 bg-white px-3 py-2 text-xs leading-relaxed text-alpine-700">
              One of these journeys needs a quote by hand. Send it to us and we price the whole
              list together.
            </p>
          ) : null}

          {caisse ? null : (
            <button
              type="button"
              onClick={() => setCaisse(true)}
              className="mt-4 block w-full rounded bg-marque px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-marque-600"
            >
              {toutChiffre ? "Continue to booking" : "Request these transfers"}
            </button>
          )}

          {caisse ? (
            <form onSubmit={payer} className="mt-4 space-y-3 border-t border-glacier-300 pt-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-alpine-600" htmlFor="panier-nom">
                  Your name
                </label>
                <input
                  id="panier-nom"
                  name="nom"
                  required
                  className="mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-alpine-600" htmlFor="panier-email">
                  Email
                </label>
                <input
                  id="panier-email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-alpine-600" htmlFor="panier-tel">
                  Phone <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="panier-tel"
                  name="telephone"
                  type="tel"
                  className="mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
                />
              </div>

              {echec ? <p className="text-xs text-marque">{echec}</p> : null}

              <button
                type="submit"
                disabled={envoi}
                className="w-full rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
              >
                {envoi ? "One moment…" : toutChiffre ? "Pay for these transfers" : "Send the request"}
              </button>
              <p className="text-xs leading-relaxed text-alpine-600">
                The total is recalculated by our system before payment — the figure above is what
                you will be charged.
              </p>
            </form>
          ) : null}

          <Link
            href={CHEMIN_TUNNEL}
            className="mt-3 block text-center text-sm text-alpine-700 underline underline-offset-2 hover:text-marque"
          >
            Add another transfer
          </Link>
        </div>
      </aside>
    </div>
  );
}
