"use client";

import { useActionState } from "react";
import { actionConnexion } from "../actions";

/**
 * Le formulaire de connexion.
 *
 * `useActionState` plutôt qu'un `useState` et un `fetch` : le formulaire
 * fonctionne sans JavaScript — la soumission part au serveur, l'action répond,
 * la page se rend. Sur un écran que l'exploitant ouvrira parfois depuis un
 * téléphone en montagne, c'est la différence entre « ça marche » et « ça tourne
 * en rond ».
 */
export default function FormulaireConnexion() {
  const [erreur, action, enCours] = useActionState(actionConnexion, null);

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-semibold uppercase tracking-wide text-alpine-600";

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className={etiquette} htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className={champ}
        />
      </div>

      <div>
        <label className={etiquette} htmlFor="motDePasse">
          Mot de passe
        </label>
        <input
          id="motDePasse"
          name="motDePasse"
          type="password"
          autoComplete="current-password"
          required
          className={champ}
        />
      </div>

      {erreur ? (
        <p role="alert" className="rounded border border-marque/30 bg-marque/5 px-3 py-2 text-sm text-marque">
          {erreur}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
      >
        {enCours ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
