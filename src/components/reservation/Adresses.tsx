"use client";

import { useState } from "react";
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

  const saisissable = ouvert.aller || ouvert.retour;
  const alerte = course.adresseManquante && !fait;

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
            <button
              type="submit"
              disabled={envoi}
              className="rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
            >
              {envoi ? mots.enregistrement : mots.enregistrer}
            </button>
          </div>
        ) : null}
      </form>
    </section>
  );
}
