"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import type { Lieu } from "@/lib/reservation/lieux";

export interface Liaison {
  airport: string;
  resort: string;
  /** Chemin de la page de trajet, quand elle existe. */
  chemin: string;
}

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
  liaisons,
}: {
  lieux: Lieu[];
  liaisons: Liaison[];
}) {
  const router = useRouter();
  const [de, setDe] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [vers, setVers] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [quand, setQuand] = useState("");
  const [passagers, setPassagers] = useState(2);
  const [allerRetour, setAllerRetour] = useState(false);

  function rechercher(evenement: React.FormEvent) {
    evenement.preventDefault();

    const parametres = new URLSearchParams({
      passengers: String(passagers),
      trip: allerRetour ? "return" : "one-way",
    });
    if (quand) parametres.set("when", quand);

    const liaison =
      de.slug && vers.slug
        ? liaisons.find((l) => l.airport === de.slug && l.resort === vers.slug)
        : undefined;

    if (liaison) {
      parametres.set("from", de.slug as string);
      router.push(`${liaison.chemin}?${parametres.toString()}`);
      return;
    }

    // Pas de page de trajet : le tunnel prend le relais, avec la saisie intacte.
    parametres.set("from", de.slug ?? de.texte);
    parametres.set("to", vers.slug ?? vers.texte);
    router.push(`/booking/?${parametres.toString()}`);
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
      aria-label="Search for a transfer"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="min-w-0">
          <label className={etiquette} htmlFor="quand">
            Departure date and time
          </label>
          <input
            id="quand"
            type="datetime-local"
            value={quand}
            onChange={(e) => setQuand(e.target.value)}
            className={champ}
          />
        </div>

        <ChampLieu
          id="depart"
          lieux={lieux}
          valeur={de}
          onChange={setDe}
          etiquette="Pick-up location"
          placeholder="Airport, resort, or address with postcode"
          variante="sombre"
          requis
        />

        <ChampLieu
          id="arrivee"
          lieux={lieux}
          valeur={vers}
          onChange={setVers}
          etiquette="Drop-off location"
          placeholder="Resort, or address with postcode and town"
          variante="sombre"
          requis
        />
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4 sm:gap-6">
        <div className="min-w-0">
          <label className={etiquette} htmlFor="passagers">
            How many people (including children)
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
          <legend className="sr-only">Trip type</legend>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="trajet"
              checked={allerRetour}
              onChange={() => setAllerRetour(true)}
              className="accent-alpes"
            />
            Return
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="trajet"
              checked={!allerRetour}
              onChange={() => setAllerRetour(false)}
              className="accent-alpes"
            />
            One-way
          </label>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 sm:ml-auto sm:w-auto"
        >
          See this transfer
        </button>
      </div>
    </form>
  );
}
