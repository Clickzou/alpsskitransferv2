"use client";

import { useEffect, useRef, useState } from "react";
import { ENTREPRISE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import type { CourseGestion } from "@/lib/reservation/dossier";
import { TEXTES_ADRESSES } from "@/lib/reservation/textes-adresses";

/**
 * « Votre adresse en station » — en tête de la page de gestion.
 *
 * L'adresse se demande après le paiement (décision de JC, 11 septembre 2026) :
 * la page de confirmation et l'e-mail mènent ici, à l'ancre `#adresses`. Tant
 * qu'il manque une adresse, l'encadré est en couleur d'action et dit pourquoi
 * on la demande ; complet, il se fait discret et laisse corriger.
 *
 * Ce que le client peut encore saisir vient du serveur (`adressesOuvertes`),
 * qui applique la même règle avant d'écrire : une adresse manquante se complète
 * jusqu'à la prise en charge, une adresse connue ne se change plus à moins de
 * vingt-quatre heures.
 */
export default function Adresses({
  course,
  jeton,
  langue,
}: {
  course: CourseGestion;
  jeton: string;
  langue: Lang;
}) {
  const mots = TEXTES_ADRESSES[langue];
  const ouvert = course.adressesOuvertes;

  const [adresse, setAdresse] = useState(course.adresse ?? "");
  // « Même adresse » cochée par défaut quand le retour repart de la même station
  // et qu'aucune adresse différente n'a été donnée.
  const [meme, setMeme] = useState(course.memeStation && !course.adresseRetour);
  const [adresseRetour, setAdresseRetour] = useState(course.adresseRetour ?? "");
  const [volRetour, setVolRetour] = useState(course.volRetour ?? "");
  const [envoi, setEnvoi] = useState(false);
  const [echec, setEchec] = useState<string | null>(null);
  const [fait, setFait] = useState(false);
  const [merci, setMerci] = useState(false);

  /*
    Ce qui est enregistré, pour savoir si la saisie a bougé. Le bouton reste gris
    tant que rien ne change, et une saisie non enregistrée le dit à côté de lui :
    la page porte deux formulaires, et celui du bas ne garde pas l'adresse
    (JC, 15 septembre 2026).
  */
  const saisie = JSON.stringify([adresse.trim(), meme, adresseRetour.trim(), volRetour.trim()]);
  const [enregistree, setEnregistree] = useState(saisie);
  const modifiee = saisie !== enregistree;

  const saisissable = ouvert.aller || ouvert.retour;
  const alerte = course.adresseManquante && !fait;

  const boutonFermer = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!merci) return;
    boutonFermer.current?.focus();
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setMerci(false);
    window.addEventListener("keydown", echap);
    return () => window.removeEventListener("keydown", echap);
  }, [merci]);

  async function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    setEnvoi(true);
    setEchec(null);
    try {
      const reponse = await fetch("/api/gestion/adresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: course.reference,
          jeton,
          langue,
          adresse: ouvert.aller ? adresse : undefined,
          memeAdresse: course.memeStation && meme,
          adresseRetour: ouvert.retour && !(course.memeStation && meme) ? adresseRetour : undefined,
          volRetour: ouvert.retour ? volRetour : undefined,
        }),
      });
      const donnees = await reponse.json();
      if (!donnees.ok) {
        setEchec(
          donnees.erreur === "lien-invalide"
            ? mots.lienInvalide
            : String(donnees.erreur).startsWith("adresse")
              ? mots.requise
              : mots.erreur,
        );
      } else {
        setFait(true);
        setEnregistree(saisie);
        setMerci(true);
      }
    } catch {
      setEchec(mots.erreur);
    }
    setEnvoi(false);
  }

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";

  /** Un champ verrouillé : la valeur connue, et le téléphone pour la changer. */
  const Verrouille = ({ valeur }: { valeur: string | null }) => (
    <p className="mt-1 text-sm text-alpine">
      {valeur || "—"}
      <span className="mt-1 block text-xs text-alpine-600">
        {mots.verrouille}{" "}
        <a className="whitespace-nowrap underline" href={`tel:${ENTREPRISE.telephone}`}>
          {ENTREPRISE.telephoneAffiche}
        </a>
      </span>
    </p>
  );

  return (
    <section
      id="adresses"
      className={`scroll-mt-24 rounded-xl border p-5 sm:p-6 ${
        alerte ? "border-marque/40 bg-marque/5" : "border-glacier-200 bg-white"
      }`}
    >
      <h2 className="font-display text-xl text-alpine">{mots.titre}</h2>
      <p className={`mt-2 text-sm leading-relaxed ${alerte ? "text-marque" : "text-alpine-700"}`}>
        {fait ? mots.enregistre : alerte ? mots.manque : mots.complet}
      </p>

      <form onSubmit={envoyer} className="mt-5 grid gap-6 md:grid-cols-2">
        <div>
          <label className={etiquette} htmlFor="adresse-aller">
            {mots.adresseAller(course.stationAller)}
          </label>
          {ouvert.aller ? (
            <>
              <input
                id="adresse-aller"
                type="text"
                required
                maxLength={200}
                autoComplete="street-address"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className={champ}
              />
              <p className="mt-1 text-xs text-alpine-600">{mots.indice}</p>
            </>
          ) : (
            <Verrouille valeur={course.adresse} />
          )}
        </div>

        {course.retour && course.stationRetour ? (
          <div className="space-y-4">
            {course.memeStation && ouvert.retour ? (
              <label className="flex items-center gap-2 text-sm text-alpine">
                <input
                  type="checkbox"
                  checked={meme}
                  onChange={(e) => setMeme(e.target.checked)}
                  className="h-4 w-4 rounded border-glacier-300 text-alpes focus:ring-alpes/40"
                />
                {mots.memeAdresse}
              </label>
            ) : null}

            {course.memeStation && meme ? null : (
              <div>
                <label className={etiquette} htmlFor="adresse-retour">
                  {mots.adresseRetour(course.stationRetour)}
                </label>
                {ouvert.retour ? (
                  <input
                    id="adresse-retour"
                    type="text"
                    required
                    maxLength={200}
                    value={adresseRetour}
                    onChange={(e) => setAdresseRetour(e.target.value)}
                    className={champ}
                  />
                ) : (
                  <Verrouille valeur={course.adresseRetour ?? course.adresse} />
                )}
              </div>
            )}

            {ouvert.retour ? (
              <div>
                <label className={etiquette} htmlFor="vol-retour">
                  {mots.volRetour} <span className="normal-case">{mots.facultatif}</span>
                </label>
                <input
                  id="vol-retour"
                  type="text"
                  maxLength={20}
                  value={volRetour}
                  onChange={(e) => setVolRetour(e.target.value)}
                  className={champ}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {saisissable ? (
          <div className="md:col-span-2">
            {echec ? <p className="mb-3 text-sm text-marque">{echec}</p> : null}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="submit"
                disabled={envoi || !modifiee}
                className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-not-allowed disabled:bg-glacier-300 disabled:text-alpine-600"
              >
                {envoi ? mots.enregistrement : mots.enregistrer}
              </button>
              {modifiee && !envoi ? (
                <p className="text-sm font-semibold text-attention" role="status">
                  {mots.nonEnregistre}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </form>

      {merci ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-alpine-900/60 px-4"
          onClick={() => setMerci(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="merci-titre"
            className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-succes-50 text-2xl text-succes">
              ✓
            </div>
            <h3 id="merci-titre" className="mt-4 font-display text-2xl text-alpine">
              {mots.merciTitre}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-alpine-700">{mots.merciTexte}</p>
            <button
              ref={boutonFermer}
              type="button"
              onClick={() => setMerci(false)}
              className="mt-6 rounded bg-marque px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
            >
              {mots.fermer}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
