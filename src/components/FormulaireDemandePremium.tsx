"use client";

import { useState } from "react";
import { ENTREPRISE } from "@/data/site";
import { CLES_DEMANDE, type LibellesFormulaire } from "@/data/page-premium";
import type { Lang } from "@/lib/i18n";

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

/**
 * Formulaire des demandes sur mesure, dans les quatre langues.
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
 * **La nature part en clé, pas en libellé.** Le visiteur choisit « Hochzeit » ou
 * « Matrimonio », le serveur reçoit `wedding` et l'exploitant lit « Mariage » :
 * il reçoit le même vocabulaire quelle que soit la langue du demandeur, et
 * l'objet de l'e-mail reste triable. La langue, elle, est transmise à part —
 * c'est elle qui dit dans quelle langue répondre.
 *
 * Comme le contact, il **ne stocke rien** : la demande part par e-mail à
 * l'exploitant, et c'est tout.
 */
export default function FormulaireDemandePremium({
  lang,
  champs,
}: {
  lang: Lang;
  champs: LibellesFormulaire;
}) {
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
        body: JSON.stringify({ ...donnees, langue: lang }),
      });
      const resultat = await reponse.json();

      if (resultat.ok) {
        setEtat("envoye");
        formulaire.reset();
        return;
      }

      setEtat("erreur");
      setMessage(resultat.erreur === "champs-invalides" ? champs.erreurChamps : null);
    } catch {
      setEtat("erreur");
      setMessage(null);
    }
  }

  if (etat === "envoye") {
    return (
      <div className="rounded-xl border border-alpes/30 bg-alpes-50 p-6">
        <p className="font-display text-lg text-alpine">{champs.succes.titre}</p>
        <p className="mt-2 text-sm leading-relaxed text-alpine-700">{champs.succes.texte}</p>
        <button
          type="button"
          onClick={() => setEtat("saisie")}
          className="mt-4 text-sm font-semibold text-marque hover:underline"
        >
          {champs.succes.relancer}
        </button>
      </div>
    );
  }

  const champ =
    "mt-1 w-full min-w-0 rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";
  const facultatif = <span className="normal-case text-alpine-600">{champs.facultatif}</span>;

  return (
    <form onSubmit={envoyer} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-nom">
            {champs.nom}
          </label>
          <input id="premium-nom" name="nom" required maxLength={120} className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-email">
            {champs.email}
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
            {champs.telephone} {facultatif}
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
            {champs.societe} {facultatif}
          </label>
          <input id="premium-societe" name="societe" maxLength={160} className={champ} />
        </div>
      </div>

      <div>
        <label className={etiquette} htmlFor="premium-type">
          {champs.type}
        </label>
        <select id="premium-type" name="type" className={champ} defaultValue={CLES_DEMANDE[0]}>
          {CLES_DEMANDE.map((cle) => (
            <option key={cle} value={cle}>
              {champs.types[cle]}
            </option>
          ))}
        </select>
      </div>

      {/*
        Les dates sont en `type="date"` mais **jamais obligatoires** : beaucoup de
        demandes arrivent avec un mois, pas un jour. Le champ libre du bas sert
        alors de réponse.
      */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-debut">
            {champs.du} {facultatif}
          </label>
          <input id="premium-debut" name="debut" type="date" className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-fin">
            {champs.au} {facultatif}
          </label>
          <input id="premium-fin" name="fin" type="date" className={champ} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-depart">
            {champs.arrivee} {facultatif}
          </label>
          <input
            id="premium-depart"
            name="depart"
            maxLength={160}
            className={champ}
            placeholder={champs.placeholders.arrivee}
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="premium-destination">
            {champs.destination} {facultatif}
          </label>
          <input
            id="premium-destination"
            name="destination"
            maxLength={160}
            className={champ}
            placeholder={champs.placeholders.destination}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="premium-passagers">
            {champs.passagers} {facultatif}
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
            {champs.budget} {facultatif}
          </label>
          <input
            id="premium-budget"
            name="budget"
            maxLength={80}
            className={champ}
            placeholder={champs.placeholders.budget}
          />
        </div>
      </div>

      <div>
        <label className={etiquette} htmlFor="premium-details">
          {champs.details}
        </label>
        <textarea
          id="premium-details"
          name="details"
          required
          rows={6}
          maxLength={5000}
          className={champ}
          placeholder={champs.placeholders.details}
        />
      </div>

      {/*
        Piège à robots : invisible à l'écran et retiré du parcours clavier et des
        lecteurs d'écran. Un formulaire où ce champ est rempli est ignoré côté
        serveur.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="premium-website">{champs.piege}</label>
        <input id="premium-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {etat === "erreur" ? (
        <p className="rounded border border-marque/30 bg-marque/5 px-4 py-3 text-sm text-alpine-700">
          {message ?? (
            <>
              {champs.erreurGenerale.avant}
              <a
                className="font-semibold text-marque underline"
                href={`mailto:${ENTREPRISE.email}`}
              >
                {ENTREPRISE.email}
              </a>
              {champs.erreurGenerale.entre}
              {ENTREPRISE.telephoneAffiche}
              {champs.erreurGenerale.apres}
            </>
          )}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
      >
        {etat === "envoi" ? champs.envoiEnCours : champs.envoyer}
      </button>

      <p className="text-xs leading-relaxed text-alpine-600">
        {champs.mentionBas} {ENTREPRISE.raisonSociale}.
      </p>
    </form>
  );
}
