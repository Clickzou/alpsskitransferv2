"use client";

import { useState } from "react";
import { ENTREPRISE } from "@/data/site";
import { TYPES_DEMANDE } from "@/data/page-premium";

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

/**
 * Formulaire des demandes sur mesure — `/luxury-ski-transfers/`.
 *
 * Il ne ressemble pas au formulaire de contact, et c'est le point : une demande
 * de mise à disposition ou d'événement se chiffre sur des éléments précis — la
 * nature de la prestation, les dates, les points, le nombre de personnes — que
 * le champ libre du contact obtient rarement du premier coup. Chaque aller-retour
 * de questions coûte une journée sur un dossier qui se décide vite.
 *
 * **Un seul champ obligatoire de plus que le contact** : la nature de la demande.
 * Tout le reste est facultatif, y compris les dates. Un formulaire premium qui
 * refuse d'envoyer parce qu'une date n'est pas encore arrêtée perd exactement le
 * client qu'il vise — celui dont le programme n'est pas fixé.
 *
 * Comme le contact, il **ne stocke rien** : la demande part par e-mail à
 * l'exploitant, et c'est tout.
 */
export default function FormulaireDemandePremium() {
  const [etat, setEtat] = useState<Etat>("saisie");
  const [message, setMessage] = useState<string | null>(null);

  async function envoyer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const formulaire = evenement.currentTarget;
    const donnees = Object.fromEntries(new FormData(formulaire));

    setEtat("envoi");
    setMessage(null);

    try {
      // Slash final : `trailingSlash: true` redirige sinon, et une redirection
      // sur un POST est un aller-retour de plus pour rien.
      const reponse = await fetch("/api/demande-premium/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });
      const resultat = await reponse.json();

      if (resultat.ok) {
        setEtat("envoye");
        formulaire.reset();
        return;
      }

      setEtat("erreur");
      setMessage(
        resultat.erreur === "champs-invalides"
          ? "Please check the fields marked as required."
          : null,
      );
    } catch {
      setEtat("erreur");
      setMessage(null);
    }
  }

  if (etat === "envoye") {
    return (
      <div className="rounded-xl border border-alpes/30 bg-alpes-50 p-6">
        <p className="font-display text-lg text-alpine">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-alpine-700">
          Thank you. We read every request personally and come back in writing — within 24 hours,
          usually the same day. If the dates are close, call {ENTREPRISE.telephoneAffiche} and we
          will start on it straight away.
        </p>
        <button
          type="button"
          onClick={() => setEtat("saisie")}
          className="mt-4 text-sm font-semibold text-marque hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  const champ =
    "mt-1 w-full min-w-0 rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";
  const facultatif = <span className="normal-case text-alpine-600">(optional)</span>;

  return (
    <form onSubmit={envoyer} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-nom">
            Your name
          </label>
          <input id="premium-nom" name="nom" required maxLength={120} className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-email">
            Email
          </label>
          <input
            id="premium-email"
            name="email"
            type="email"
            required
            maxLength={200}
            className={champ}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-telephone">
            Phone {facultatif}
          </label>
          <input
            id="premium-telephone"
            name="telephone"
            type="tel"
            maxLength={40}
            className={champ}
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-societe">
            Company, brand or agency {facultatif}
          </label>
          <input id="premium-societe" name="societe" maxLength={160} className={champ} />
        </div>
      </div>

      <div>
        <label className={etiquette} htmlFor="premium-type">
          What do you need
        </label>
        <select id="premium-type" name="type" className={champ} defaultValue={TYPES_DEMANDE[0]}>
          {TYPES_DEMANDE.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      {/*
        Les dates sont en `type="date"` mais **jamais obligatoires** : beaucoup de
        demandes arrivent avec un mois, pas un jour. Le champ « flexible » du
        détail sert alors de réponse.
      */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-debut">
            From {facultatif}
          </label>
          <input id="premium-debut" name="debut" type="date" className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-fin">
            To {facultatif}
          </label>
          <input id="premium-fin" name="fin" type="date" className={champ} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-depart">
            Arriving at {facultatif}
          </label>
          <input
            id="premium-depart"
            name="depart"
            maxLength={160}
            className={champ}
            placeholder="Geneva, Chambéry, a private terminal…"
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-destination">
            Going to {facultatif}
          </label>
          <input
            id="premium-destination"
            name="destination"
            maxLength={160}
            className={champ}
            placeholder="Courchevel, Megève, a chalet address…"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-passagers">
            Passengers {facultatif}
          </label>
          <input
            id="premium-passagers"
            name="passagers"
            type="number"
            min={1}
            max={500}
            className={champ}
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-budget">
            Budget in mind {facultatif}
          </label>
          <input
            id="premium-budget"
            name="budget"
            maxLength={80}
            className={champ}
            placeholder="A range is enough"
          />
        </div>
      </div>

      <div>
        <label className={etiquette} htmlFor="premium-details">
          What the stay looks like
        </label>
        <textarea
          id="premium-details"
          name="details"
          required
          rows={6}
          maxLength={5000}
          className={champ}
          placeholder="The programme as you see it: arrivals, the hours you want a car available, an event and its schedule, anything that has to be discreet."
        />
      </div>

      {/*
        Piège à robots : invisible à l'écran et retiré du parcours clavier et des
        lecteurs d'écran. Un formulaire où ce champ est rempli est ignoré côté
        serveur.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="premium-website">Leave this field empty</label>
        <input id="premium-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {etat === "erreur" ? (
        <p className="rounded border border-marque/30 bg-marque/5 px-4 py-3 text-sm text-alpine-700">
          {message ?? (
            <>
              We could not send your request. Please write to{" "}
              <a
                className="font-semibold text-marque underline"
                href={`mailto:${ENTREPRISE.email}`}
              >
                {ENTREPRISE.email}
              </a>{" "}
              or call {ENTREPRISE.telephoneAffiche}.
            </>
          )}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
      >
        {etat === "envoi" ? "Sending…" : "Send your request"}
      </button>

      <p className="text-xs leading-relaxed text-alpine-600">
        We use your details only to answer you. Nothing is stored on this website and nothing is
        shared with third parties. Flights are chartered with licensed operators; road transport is
        operated by {ENTREPRISE.raisonSociale}.
      </p>
    </form>
  );
}
