"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import type { Lang } from "@/lib/i18n";
import { ANCRE_TUNNEL, CHEMIN_TUNNEL } from "@/lib/reservation/config";
import type { Lieu } from "@/lib/reservation/lieux";
import { ENTREPRISE } from "@/data/site";
import { departImminent } from "@/lib/reservation/gestion";
import { instantAlpes } from "@/lib/temps";
import { TEXTES_IMMINENT, TEXTES_RECHERCHE } from "@/lib/reservation/textes";

/**
 * Recherche de transfert.
 *
 * Deux champs de saisie libre, pas deux menus déroulants. Un menu impose de
 * choisir dans une liste de 68 stations, et surtout il rend impossible ce que le
 * visiteur veut réellement faire : donner l'adresse de son chalet ou de son
 * hôtel. Le champ accepte donc tout — un aéroport, une station, une adresse — et
 * suggère au fur et à mesure, le registre d'abord, un géocodeur ensuite.
 *
 * Trois issues, selon ce qui a été saisi :
 *
 * 1. Aéroport et station connus, page de trajet existante → cette page.
 * 2. Station connue sans page de trajet → la page de la station.
 * 3. Une adresse libre d'un côté ou de l'autre → le tunnel de réservation, qui
 *    sait demander un devis. Aucune de ces trois issues n'affiche un prix
 *    inventé, et la saisie est toujours transmise : le visiteur ne la refait pas.
 */
export default function FormulaireRecherche({
  lieux,
  langue = "en",
  tunnel = CHEMIN_TUNNEL,
}: {
  lieux: Lieu[];
  langue?: Lang;
  /**
   * Le tunnel de la langue — `/fr/reserver/`, `/de/buchen/`, `/it/prenota/`.
   *
   * Il est passé par le parent, qui est un composant serveur : le calculer ici
   * embarquerait le registre des articles et la navigation des quatre langues
   * dans le paquet du navigateur, pour un seul chemin. Une recherche lancée en
   * allemand doit finir dans le tunnel allemand — l'envoyer au tunnel anglais
   * ferait perdre la langue au moment précis où le visiteur s'engage.
   */
  tunnel?: string;
}) {
  const mots = TEXTES_RECHERCHE[langue];
  const alerte = TEXTES_IMMINENT[langue];
  const router = useRouter();
  const [de, setDe] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [vers, setVers] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [quand, setQuand] = useState("");
  const [passagers, setPassagers] = useState(2);
  const [allerRetour, setAllerRetour] = useState(false);

  /* Recalculé à chaque rendu : la valeur dépend de l'heure qu'il est. */
  const imminent = (() => {
    const m = quand.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return false;
    // Le fuseau du visiteur ne décide pas : un Londonien qui réserve pour
    // 13 h veut 13 h à Genève, pas 13 h chez lui.
    return departImminent(instantAlpes(+m[1], +m[2], +m[3], +m[4], +m[5]));
  })();

  function rechercher(evenement: React.FormEvent) {
    evenement.preventDefault();
    // Le bouton est déjà désactivé ; ce garde-fou couvre la soumission au clavier.
    if (imminent) return;

    const parametres = new URLSearchParams({
      passengers: String(passagers),
      trip: allerRetour ? "return" : "one-way",
    });
    if (quand) parametres.set("when", quand);

    /*
     * Toujours le tunnel, jamais la page de trajet.
     *
     * Ce formulaire envoyait vers la page éditoriale du trajet quand elle
     * existait : le visiteur qui venait de saisir son itinéraire et sa date
     * atterrissait sur un article à lire, et devait ressaisir la même chose
     * pour obtenir un prix. Une réservation commencée doit se terminer là où
     * elle a commencé — décision du client, 9 septembre 2026.
     *
     * Les pages de trajet gardent tout leur rôle : elles captent la requête
     * « Geneva to Val Thorens » dans les moteurs et renvoient elles-mêmes vers
     * le tunnel. Ce sont des portes d'entrée, pas des étapes de commande.
     */
    parametres.set("from", de.slug ?? de.texte);
    parametres.set("to", vers.slug ?? vers.texte);
    router.push(`${tunnel}?${parametres.toString()}${ANCRE_TUNNEL}`);
  }

  const etiquette = "block text-xs font-medium uppercase tracking-wide text-glacier-300";
  // `min-w-0` compte autant que `w-full` : un `datetime-local` a une largeur
  // intrinsèque supérieure à l'écran, et c'est elle qui faisait déborder la page.
  const champ =
    "mt-1 w-full min-w-0 rounded border border-alpine-700 bg-white/95 px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";

  return (
    <form
      onSubmit={rechercher}
      className="rounded-2xl bg-alpine/90 p-5 shadow-flottant backdrop-blur-sm sm:p-6"
      aria-label={mots.titreAccessible}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="min-w-0">
          <label className={etiquette} htmlFor="quand">
            {mots.quand}
          </label>
          <input
            id="quand"
            type="datetime-local"
            value={quand}
            onChange={(e) => setQuand(e.target.value)}
            className={champ}
          />

          {/*
            Départ très proche : l'avertissement paraît ici aussi, sous le champ
            qui vient de le produire. Le dire seulement dans le tunnel, trois
            écrans plus loin, laisserait le visiteur bâtir toute sa recherche
            avant d'apprendre qu'elle demande un appel.
          */}
          {imminent ? (
            <div
              role="status"
              className="mt-2 rounded border border-or/60 bg-or-50 px-3 py-2 text-xs leading-relaxed text-alpine-700"
            >
              <strong className="block text-sm text-alpine">{alerte.titre}</strong>
              <span className="mt-1 block">{alerte.texte}</span>
              <a
                className="mt-1 inline-block font-semibold text-marque underline"
                href={`tel:${ENTREPRISE.telephone}`}
              >
                {ENTREPRISE.telephoneAffiche}
              </a>
            </div>
          ) : null}
        </div>

        <ChampLieu
          id="depart"
          lieux={lieux}
          valeur={de}
          onChange={setDe}
          etiquette={mots.depart}
          placeholder={mots.departIndice}
          langue={langue}
          variante="sombre"
          requis
        />

        <ChampLieu
          id="arrivee"
          lieux={lieux}
          valeur={vers}
          onChange={setVers}
          etiquette={mots.arrivee}
          placeholder={mots.arriveeIndice}
          langue={langue}
          variante="sombre"
          requis
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4 sm:gap-6">
        <div className="min-w-0">
          <label className={etiquette} htmlFor="passagers">
            {mots.passagers}
          </label>
          <input
            id="passagers"
            type="number"
            min={1}
            max={16}
            value={passagers}
            onChange={(e) => setPassagers(Number(e.target.value))}
            className={`${champ} w-24`}
          />
        </div>

        <fieldset className="flex items-center gap-4 pb-2 text-sm text-white">
          <legend className="sr-only">{mots.typeTrajet}</legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="trajet"
              checked={allerRetour}
              onChange={() => setAllerRetour(true)}
              className="accent-alpes"
            />
            {mots.allerRetour}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="trajet"
              checked={!allerRetour}
              onChange={() => setAllerRetour(false)}
              className="accent-alpes"
            />
            {mots.allerSimple}
          </label>
        </fieldset>

        <button
          type="submit"
          disabled={imminent}
          className="w-full rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto sm:w-auto"
        >
          {mots.action}
        </button>
      </div>
    </form>
  );
}
