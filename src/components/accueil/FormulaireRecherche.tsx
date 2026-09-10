"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import type { Lang } from "@/lib/i18n";
import { ANCRE_TUNNEL, CHEMIN_TUNNEL } from "@/lib/reservation/config";
import type { Lieu } from "@/lib/reservation/lieux";
import { ENTREPRISE } from "@/data/site";
import { ouvrirCalendrier } from "@/lib/reservation/calendrier";
import { DELAI_APPEL_HEURES, departImminent } from "@/lib/reservation/gestion";
import { instantAlpes, saisieAlpes } from "@/lib/temps";
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
  const [retourQuand, setRetourQuand] = useState("");
  const [retourAilleurs, setRetourAilleurs] = useState(false);
  const [retourDe, setRetourDe] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [retourVers, setRetourVers] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [retourPassagers, setRetourPassagers] = useState<number | null>(null);

  /* Recalculé à chaque rendu : la valeur dépend de l'heure qu'il est. */
  const imminent = (() => {
    const m = quand.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return false;
    // Le fuseau du visiteur ne décide pas : un Londonien qui réserve pour
    // 13 h veut 13 h à Genève, pas 13 h chez lui.
    return departImminent(instantAlpes(+m[1], +m[2], +m[3], +m[4], +m[5]));
  })();

  /*
    La première heure vendable, à l'heure de l'aéroport.

    Elle borne le sélecteur natif : sans `min`, le champ proposait volontiers
    une heure déjà passée, et le visiteur n'apprenait qu'au bout du parcours
    qu'elle ne se réservait pas.
  */
  const premiereHeure = useMemo(
    () => saisieAlpes(new Date(Date.now() + DELAI_APPEL_HEURES * 3600 * 1000)),
    [],
  );

  function rechercher(evenement: React.FormEvent) {
    evenement.preventDefault();
    // Le bouton est déjà désactivé ; ce garde-fou couvre la soumission au clavier.
    if (imminent) return;
    /*
      Sans date, pas de recherche.

      Le champ était facultatif : on partait vers le tunnel avec un itinéraire
      et pas d'heure, et le tunnel ne pouvait rien chiffrer — le visiteur
      changeait de page pour retrouver un formulaire à finir de remplir.
    */
    if (!quand) return;

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

    /*
      Le retour voyage en entier, ou pas du tout.

      Le formulaire n'envoyait que `trip=return` : le tunnel savait qu'il y
      avait un retour et redemandait tout. Un visiteur qui a déjà donné sa date
      de retour et son point de départ ne doit pas les retaper à l'écran
      suivant — c'est le même reproche que « Voir mon prix » qui ne montrait
      pas de prix.
    */
    if (allerRetour) {
      parametres.set("returnWhen", retourQuand);
      if (retourAilleurs) {
        if (retourDe.slug ?? retourDe.texte) parametres.set("returnFrom", retourDe.slug ?? retourDe.texte);
        if (retourVers.slug ?? retourVers.texte) parametres.set("returnTo", retourVers.slug ?? retourVers.texte);
      }
      if (retourPassagers !== null && retourPassagers !== passagers) {
        parametres.set("returnPassengers", String(retourPassagers));
      }
    }
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
            onClick={ouvrirCalendrier}
            required
            min={premiereHeure}
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

      {/*
        Le retour, déplié à la demande.

        Cocher « Aller-retour » ne faisait rien de visible : le visiteur
        supposait que le retour se réglerait plus tard, et le tunnel le lui
        redemandait entièrement. Un retour n'est pas la copie de l'aller — il
        part souvent d'une autre station, parfois vers un autre aéroport, et le
        groupe n'est pas toujours le même au départ qu'au retour.

        Les lieux ne s'affichent que si le visiteur le demande : les redemander
        d'office alors qu'ils sont presque toujours ceux de l'aller inversé
        ferait payer à tout le monde un cas qui concerne une minorité.
      */}
      {allerRetour ? (
        <fieldset className="mt-5 rounded-xl border border-white/15 bg-white/5 p-4">
          <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-or-300">
            {mots.retourTitre}
          </legend>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="min-w-0">
              <label className={etiquette} htmlFor="retour-quand">
                {mots.retourQuand}
              </label>
              <input
                id="retour-quand"
                type="datetime-local"
                onClick={ouvrirCalendrier}
                required
                /* Le retour ne peut pas précéder l'aller. */
                min={quand || premiereHeure}
                value={retourQuand}
                onChange={(e) => setRetourQuand(e.target.value)}
                className={champ}
              />
            </div>

            <div className="min-w-0">
              <label className={etiquette} htmlFor="retour-passagers">
                {mots.retourPassagers}
              </label>
              <input
                id="retour-passagers"
                type="number"
                min={1}
                max={16}
                value={retourPassagers ?? passagers}
                onChange={(e) => setRetourPassagers(Number(e.target.value))}
                className={`${champ} w-24`}
              />
              <p className="mt-1 text-xs text-glacier-300">{mots.retourPassagersIndice}</p>
            </div>

            <label className="flex items-end gap-2 pb-2 text-sm text-white">
              <input
                type="checkbox"
                checked={retourAilleurs}
                onChange={(e) => setRetourAilleurs(e.target.checked)}
                className="mb-1 accent-alpes"
              />
              {mots.retourAilleurs}
            </label>
          </div>

          {retourAilleurs ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ChampLieu
                id="retour-depart"
                lieux={lieux}
                valeur={retourDe}
                onChange={setRetourDe}
                etiquette={mots.retourDepart}
                placeholder={mots.arriveeIndice}
                langue={langue}
                variante="sombre"
              />
              <ChampLieu
                id="retour-arrivee"
                lieux={lieux}
                valeur={retourVers}
                onChange={setRetourVers}
                etiquette={mots.retourArrivee}
                placeholder={mots.departIndice}
                langue={langue}
                variante="sombre"
              />
            </div>
          ) : null}
        </fieldset>
      ) : null}
    </form>
  );
}
