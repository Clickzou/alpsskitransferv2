"use client";

import { useState } from "react";
import RecapCourse, { quandLisible } from "@/components/reservation/RecapCourse";
import { ENTREPRISE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import type { CourseGestion } from "@/lib/reservation/dossier";
import { PREAVIS_HEURES } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { saisieAlpes } from "@/lib/temps";

/**
 * « Gérer ma réservation » — l'heure de prise en charge, et rien d'autre.
 *
 * ## Ce que le formulaire change, et ce qu'il ne change pas
 *
 * L'heure et le numéro de vol. Le véhicule, le trajet et le nombre de passagers
 * changent le prix : les laisser modifier après un paiement reviendrait à
 * encaisser un montant pour une course différente. La page le dit plutôt que de
 * laisser chercher le bouton qui n'existe pas.
 *
 * ## Les deux modes, et pourquoi le serveur tranche
 *
 * Au-delà de vingt-quatre heures, la modification s'enregistre et l'exploitant
 * est prévenu. En deçà, la page présente un message à transmettre et le numéro
 * de téléphone : la journée du chauffeur est déjà construite autour de cette
 * course, un déplacement se négocie.
 *
 * Le mode affiché ici vient du serveur, qui l'a calculé en relisant la base — et
 * `/api/gestion` le recalcule avant d'écrire. La page ne décide de rien : elle
 * ne fait qu'éviter de proposer ce qui sera refusé. C'est aussi pourquoi une
 * réponse `signalement` sur un formulaire ouvert est prévue : entre l'affichage
 * et l'envoi, la barre des vingt-quatre heures peut avoir été franchie.
 */
export default function Gestion({
  course,
  jeton,
  langue,
  tardif,
  lienContact,
}: {
  course: CourseGestion;
  jeton: string;
  langue: Lang;
  /** Vrai quand le départ est à moins de 24 heures : on signale, on ne modifie plus. */
  tardif: boolean;
  lienContact: string;
}) {
  const mots = TEXTES_GESTION[langue];

  const [quand, setQuand] = useState(() => saisieAlpes(new Date(course.aller)));
  const [vol, setVol] = useState(course.vol ?? "");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [echec, setEchec] = useState<string | null>(null);
  const [resultat, setResultat] = useState<
    { mode: "modifie"; aller: string } | { mode: "signalement"; transmis: boolean } | null
  >(null);

  /*
    Le plancher du sélecteur natif : vingt-quatre heures à partir de maintenant,
    à l'heure des Alpes. C'est une politesse, pas une sécurité — le serveur
    applique la même règle avant d'écrire, et c'est lui qui fait foi.
  */
  const [plancher] = useState(() =>
    saisieAlpes(new Date(Date.now() + PREAVIS_HEURES * 3600 * 1000)),
  );

  /** La course telle qu'elle est maintenant : le récapitulatif suit la modification. */
  const courseAffichee: CourseGestion =
    resultat?.mode === "modifie"
      ? { ...course, aller: resultat.aller, vol: vol.trim() || null }
      : course;

  const MESSAGES: Record<string, string> = {
    "lien-invalide": mots.erreurLien,
    "reservation-introuvable": mots.introuvableTexte,
    "reservation-annulee": mots.annuleeTexte,
    "date-illisible": mots.erreurDate,
    "nouvelle-date-trop-proche": mots.erreurTropProche,
    "enregistrement-impossible": mots.erreurEnregistrement,
  };

  async function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    setEnvoi(true);
    setEchec(null);

    try {
      const reponse = await fetch("/api/gestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: course.reference,
          jeton,
          aller: quand,
          vol: vol.trim(),
          message: message.trim() || undefined,
        }),
      });
      const donnees = await reponse.json();

      if (!donnees.ok) {
        setEchec(MESSAGES[donnees.erreur] ?? mots.erreurEnregistrement);
        setEnvoi(false);
        return;
      }

      setResultat(
        donnees.mode === "modifie"
          ? { mode: "modifie", aller: donnees.aller }
          : { mode: "signalement", transmis: Boolean(donnees.transmis) },
      );
    } catch {
      setEchec(mots.erreurReseau);
    }
    setEnvoi(false);
  }

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem]">
      <div className="space-y-6">
        <RecapCourse course={courseAffichee} langue={langue} mots={mots} />

        <p className="max-w-prose text-sm leading-relaxed text-alpine-600">
          {mots.autreChangement}{" "}
          <a className="text-marque underline underline-offset-4" href={lienContact}>
            {mots.ecrire}
          </a>
          .
        </p>
      </div>

      <aside className="lg:sticky lg:top-6 lg:h-fit">
        {resultat?.mode === "modifie" ? (
          <div className="rounded-xl border border-alpes/30 bg-alpes-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.faitTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-700">
              {mots.faitTexte(quandLisible(resultat.aller, langue))}
            </p>
          </div>
        ) : resultat?.mode === "signalement" ? (
          <div className="rounded-xl border border-or/40 bg-or-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.transmisTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-700">
              {resultat.transmis ? mots.transmisTexte : mots.nonTransmisTexte}
            </p>
            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="mt-4 inline-block rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
            >
              {mots.appeler} · {ENTREPRISE.telephoneAffiche}
            </a>
          </div>
        ) : tardif ? (
          /*
            Moins de vingt-quatre heures. Le formulaire n'est pas retiré — un vol
            annulé la veille au soir est exactement le moment où le client doit
            pouvoir prévenir — mais il ne modifie plus : il transmet.
          */
          <form onSubmit={envoyer} className="rounded-xl border border-or/40 bg-or-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.tardifTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-700">{mots.tardifTexte}</p>

            <div className="mt-4">
              <label className={etiquette} htmlFor="gestion-message">
                {mots.votreDemande}
              </label>
              <textarea
                id="gestion-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={champ}
              />
              <p className="mt-1 text-xs text-alpine-600">{mots.votreDemandeIndice}</p>
            </div>

            {echec ? <p className="mt-3 text-xs text-marque">{echec}</p> : null}

            <button
              type="submit"
              disabled={envoi}
              className="mt-4 w-full rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
            >
              {envoi ? mots.enregistrement : mots.envoyer}
            </button>

            <a
              href={`tel:${ENTREPRISE.telephone}`}
              className="mt-3 block text-center text-sm text-alpine-700 underline underline-offset-2 hover:text-marque"
            >
              {mots.appeler} · {ENTREPRISE.telephoneAffiche}
            </a>
          </form>
        ) : (
          <form onSubmit={envoyer} className="rounded-xl border border-glacier-200 bg-glacier-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.modifierTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-600">{mots.modifierTexte}</p>

            <div className="mt-4">
              <label className={etiquette} htmlFor="gestion-quand">
                {mots.nouvelHoraire}
              </label>
              <input
                id="gestion-quand"
                type="datetime-local"
                required
                min={plancher}
                value={quand}
                onChange={(e) => setQuand(e.target.value)}
                className={champ}
              />
              <p className="mt-1 text-xs text-alpine-600">{mots.nouvelHoraireIndice}</p>
            </div>

            <div className="mt-4">
              <label className={etiquette} htmlFor="gestion-vol">
                {mots.numeroVol} <span className="normal-case">{mots.facultatif}</span>
              </label>
              <input
                id="gestion-vol"
                type="text"
                inputMode="text"
                maxLength={20}
                value={vol}
                onChange={(e) => setVol(e.target.value)}
                className={champ}
              />
            </div>

            {echec ? <p className="mt-3 text-xs text-marque">{echec}</p> : null}

            <button
              type="submit"
              disabled={envoi}
              className="mt-4 w-full rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60"
            >
              {envoi ? mots.enregistrement : mots.enregistrer}
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
