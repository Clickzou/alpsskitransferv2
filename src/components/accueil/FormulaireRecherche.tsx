"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export interface OptionLieu {
  slug: string;
  nom: string;
  /** Pays du silo, pour construire l'URL de destination. */
  silo: string;
}

export interface Liaison {
  airport: string;
  resort: string;
  /** Chemin de la page de trajet, quand elle existe. */
  chemin: string;
}

/**
 * Recherche de transfert.
 *
 * Le moteur de réservation n'encaisse pas encore — le barème n'est pas validé.
 * En attendant, ce formulaire fait déjà le travail utile : il conduit le visiteur
 * à la page du trajet demandé, ou à défaut à la page de la station, en passant la
 * date et le nombre de passagers en paramètres. Le jour où le moteur ouvre, la
 * même saisie alimentera le devis sans que le visiteur ait à la reprendre.
 */
export default function FormulaireRecherche({
  aeroports,
  stations,
  liaisons,
}: {
  aeroports: OptionLieu[];
  stations: OptionLieu[];
  liaisons: Liaison[];
}) {
  const router = useRouter();
  const [depart, setDepart] = useState(aeroports[0]?.slug ?? "");
  const [arrivee, setArrivee] = useState("");
  const [quand, setQuand] = useState("");
  const [passagers, setPassagers] = useState(2);
  const [allerRetour, setAllerRetour] = useState(false);

  /** Stations réellement desservies depuis l'aéroport choisi, sinon toutes. */
  const destinations = useMemo(() => {
    const desservies = new Set(
      liaisons.filter((l) => l.airport === depart).map((l) => l.resort),
    );
    const connues = stations.filter((s) => desservies.has(s.slug));
    return connues.length > 0 ? connues : stations;
  }, [depart, liaisons, stations]);

  function rechercher(evenement: React.FormEvent) {
    evenement.preventDefault();
    const station = stations.find((s) => s.slug === arrivee);
    if (!station) return;

    const liaison = liaisons.find((l) => l.airport === depart && l.resort === arrivee);
    const parametres = new URLSearchParams({
      from: depart,
      passengers: String(passagers),
      trip: allerRetour ? "return" : "one-way",
    });
    if (quand) parametres.set("when", quand);

    const destination = liaison?.chemin ?? `/${station.silo}/${station.slug}/`;
    router.push(`${destination}?${parametres.toString()}`);
  }

  const etiquette = "block text-xs font-medium uppercase tracking-wide text-glacier-300";
  // `min-w-0` compte autant que `w-full` : un `datetime-local` et un `select`
  // dont les options sont longues ont une largeur intrinsèque supérieure à
  // l'écran, et c'est elle qui faisait déborder la page sur mobile.
  const champ =
    "mt-1 w-full min-w-0 rounded border border-alpine-700 bg-white/95 px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";

  return (
    <form
      onSubmit={rechercher}
      className="rounded-lg bg-alpine/90 p-5 shadow-flottant backdrop-blur-sm sm:p-6"
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

        <div className="min-w-0">
          <label className={etiquette} htmlFor="depart">
            Pick-up location
          </label>
          <select
            id="depart"
            value={depart}
            onChange={(e) => {
              setDepart(e.target.value);
              setArrivee("");
            }}
            className={champ}
          >
            {aeroports.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label className={etiquette} htmlFor="arrivee">
            Drop-off location
          </label>
          <select
            id="arrivee"
            value={arrivee}
            onChange={(e) => setArrivee(e.target.value)}
            className={champ}
            required
          >
            <option value="">Choose a resort</option>
            {destinations.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.nom}
              </option>
            ))}
          </select>
        </div>
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
