"use client";

import { useState } from "react";
import { ENTREPRISE } from "@/data/site";

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

/**
 * Formulaire de contact.
 *
 * Il reste utilisable **sans JavaScript de validation exotique** : les champs
 * portent les attributs natifs (`required`, `type="email"`), et le navigateur
 * fait le premier tri. Le serveur revalide — c'est lui la barrière qui compte.
 *
 * En cas d'échec d'envoi, on **redonne l'adresse e-mail directe** au lieu d'un
 * « une erreur est survenue » : un visiteur qui voulait écrire doit repartir
 * avec un moyen d'écrire, pas avec une impasse.
 */
export default function FormulaireContact() {
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
      const reponse = await fetch("/api/contact/", {
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
        <p className="font-display text-lg text-alpine">Message sent</p>
        <p className="mt-2 text-sm leading-relaxed text-alpine-700">
          Thank you — we have your message and will come back to you, usually the same day. If it
          is urgent, call {ENTREPRISE.telephoneAffiche}.
        </p>
        <button
          type="button"
          onClick={() => setEtat("saisie")}
          className="mt-4 text-sm font-semibold text-marque hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const champ =
    "mt-1 w-full min-w-0 rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";

  return (
    <form onSubmit={envoyer} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="contact-nom">
            Your name
          </label>
          <input id="contact-nom" name="nom" required maxLength={120} className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
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
          <label className={etiquette} htmlFor="contact-telephone">
            Phone <span className="normal-case text-alpine-600">(optional)</span>
          </label>
          <input
            id="contact-telephone"
            name="telephone"
            type="tel"
            maxLength={40}
            className={champ}
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="contact-sujet">
            Subject
          </label>
          <select id="contact-sujet" name="sujet" className={champ} defaultValue="A new booking">
            <option>A new booking</option>
            <option>An existing booking</option>
            <option>A group or an agency</option>
            <option>Lost luggage</option>
            <option>Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label className={etiquette} htmlFor="contact-message">
          Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={champ}
          placeholder="Dates, airport, resort and number of passengers help us answer in one go."
        />
      </div>

      {/*
        Piège à robots : invisible à l'écran et retiré du parcours clavier et des
        lecteurs d'écran. Un formulaire où ce champ est rempli est ignoré côté
        serveur.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {etat === "erreur" ? (
        <p className="rounded border border-marque/30 bg-marque/5 px-4 py-3 text-sm text-alpine-700">
          {message ?? (
            <>
              We could not send your message. Please write to{" "}
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
        {etat === "envoi" ? "Sending…" : "Send your message"}
      </button>

      <p className="text-xs leading-relaxed text-alpine-600">
        We use your details only to answer you. Nothing is stored on this website and nothing is
        shared with third parties.
      </p>
    </form>
  );
}
