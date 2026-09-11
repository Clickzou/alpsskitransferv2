"use client";

import { useState } from "react";
import RecapCourse from "@/components/reservation/RecapCourse";
import { ENTREPRISE } from "@/data/site";
import type { Lang } from "@/lib/i18n";
import type { CourseGestion } from "@/lib/reservation/dossier";
import { PREAVIS_HEURES } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { saisieAlpes } from "@/lib/temps";

/**
 * « Gérer ma réservation » — demander une autre heure, corriger son vol.
 *
 * ## Une heure se demande, elle ne se modifie pas
 *
 * Décision de JC, 11 septembre 2026. Le client propose une heure, à l'aller ou
 * au retour ; l'exploitant la valide ou la refuse depuis la fiche du client, et
 * la réponse part par e-mail. D'ici là, l'heure d'origine tient, et la page le
 * dit : l'heure demandée s'affiche sous l'heure retenue, jamais à sa place.
 *
 * Le numéro de vol s'applique tout de suite. Le véhicule, le trajet et le
 * nombre de passagers changent le prix : ils passent par l'exploitant, et la
 * page le dit plutôt que de laisser chercher le bouton qui n'existe pas.
 *
 * ## Chaque sens a son propre préavis
 *
 * Au-delà de vingt-quatre heures, un sens se demande en ligne. En deçà, il est
 * verrouillé et la page renvoie au téléphone. Les deux se jugent séparément :
 * le client déjà en station, dont l'aller est fait, doit pouvoir demander à
 * décaler son retour. Quand plus aucun sens n'est ouvert, la page présente un
 * message à transmettre.
 *
 * Le mode affiché ici vient du serveur, qui l'a calculé en relisant la base — et
 * `/api/gestion` le recalcule avant d'écrire. La page ne décide de rien : elle
 * ne fait qu'éviter de proposer ce qui sera refusé.
 */
export default function Gestion({
  course,
  jeton,
  langue,
  tardif,
  modifiable,
  lienContact,
}: {
  course: CourseGestion;
  jeton: string;
  langue: Lang;
  /** Vrai quand aucun sens n'est à plus de 24 heures : on signale, on ne demande plus. */
  tardif: boolean;
  /** Ce que le client peut encore demander en ligne, sens par sens. */
  modifiable: { aller: boolean; retour: boolean };
  lienContact: string;
}) {
  const mots = TEXTES_GESTION[langue];
  const allerOuvert = modifiable.aller;
  const retourOuvert = Boolean(course.retour) && modifiable.retour;

  /*
    Les champs partent de la demande en attente quand il y en a une : un client
    qui revient ajuster son retour ne doit pas, sans le voir, retirer ce qu'il
    avait demandé pour l'aller — une nouvelle demande remplace l'ancienne.
  */
  const [quand, setQuand] = useState(() =>
    saisieAlpes(new Date(course.demande?.aller ?? course.aller)),
  );
  const [quandRetour, setQuandRetour] = useState(() => {
    const depart = course.demande?.retour ?? course.retour;
    return depart ? saisieAlpes(new Date(depart)) : "";
  });
  const [vol, setVol] = useState(course.vol ?? "");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [echec, setEchec] = useState<string | null>(null);
  const [resultat, setResultat] = useState<
    | {
        mode: "demande" | "modifie";
        vol: string | null;
        demande: { aller: string | null; retour: string | null } | null;
      }
    | { mode: "signalement"; transmis: boolean }
    | null
  >(null);

  /*
    Le plancher du sélecteur natif : vingt-quatre heures à partir de maintenant,
    à l'heure des Alpes. C'est une politesse, pas une sécurité — le serveur
    applique la même règle avant d'écrire, et c'est lui qui fait foi.
  */
  const [plancher] = useState(() =>
    saisieAlpes(new Date(Date.now() + PREAVIS_HEURES * 3600 * 1000)),
  );
  /* Le retour ne précède pas l'aller : le sélecteur le dit avant le serveur. */
  const allerRetenu = allerOuvert ? quand : saisieAlpes(new Date(course.aller));
  const plancherRetour = allerRetenu > plancher ? allerRetenu : plancher;

  /** La course telle qu'elle est maintenant : le récapitulatif suit la réponse. */
  const courseAffichee: CourseGestion =
    resultat && resultat.mode !== "signalement"
      ? { ...course, vol: resultat.vol, demande: resultat.demande ?? course.demande }
      : course;

  const MESSAGES: Record<string, string> = {
    "lien-invalide": mots.erreurLien,
    "reservation-introuvable": mots.introuvableTexte,
    "reservation-annulee": mots.annuleeTexte,
    "date-illisible": mots.erreurDate,
    "nouvelle-date-trop-proche": mots.erreurTropProche,
    "retour-avant-aller": mots.erreurRetourAvantAller,
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
          langue,
          // Seuls les sens ouverts partent : un champ absent laisse l'heure en place.
          aller: tardif || allerOuvert ? quand : undefined,
          retour: retourOuvert ? quandRetour : undefined,
          vol: allerOuvert ? vol.trim() : undefined,
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
        donnees.mode === "signalement"
          ? { mode: "signalement", transmis: Boolean(donnees.transmis) }
          : {
              mode: donnees.mode === "demande" ? "demande" : "modifie",
              vol: donnees.vol ?? null,
              demande: donnees.demande ?? null,
            },
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
        {resultat?.mode === "demande" ? (
          <div className="rounded-xl border border-or/40 bg-or-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.demandeTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-700">{mots.demandeTexte}</p>
          </div>
        ) : resultat?.mode === "modifie" ? (
          <div className="rounded-xl border border-alpes/30 bg-alpes-50 p-5">
            <p className="font-display text-lg text-alpine">{mots.faitTitre}</p>
            <p className="mt-2 text-sm leading-relaxed text-alpine-700">{mots.faitTexte}</p>
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
            Moins de vingt-quatre heures sur les deux sens. Le formulaire n'est
            pas retiré — un vol annulé la veille au soir est exactement le moment
            où le client doit pouvoir prévenir — mais il ne demande plus : il
            transmet.
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

            {course.demande ? (
              <p className="mt-4 rounded border border-or/40 bg-or-50 p-3 text-xs leading-relaxed text-alpine-700">
                {mots.demandeRemplace}
              </p>
            ) : null}

            {allerOuvert ? (
              <>
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
              </>
            ) : (
              /*
                L'aller est trop proche, ou déjà fait : il n'est plus proposé, et
                la page dit pourquoi — sans quoi le client chercherait le champ.
              */
              <p className="mt-4 rounded border border-or/40 bg-or-50 p-3 text-xs leading-relaxed text-alpine-700">
                {mots.allerVerrouille}{" "}
                <a
                  href={`tel:${ENTREPRISE.telephone}`}
                  className="whitespace-nowrap underline underline-offset-2 hover:text-marque"
                >
                  {ENTREPRISE.telephoneAffiche}
                </a>
              </p>
            )}

            {retourOuvert ? (
              <div className="mt-4">
                <label className={etiquette} htmlFor="gestion-retour">
                  {mots.nouvelHoraireRetour}
                </label>
                <input
                  id="gestion-retour"
                  type="datetime-local"
                  required
                  min={plancherRetour}
                  value={quandRetour}
                  onChange={(e) => setQuandRetour(e.target.value)}
                  className={champ}
                />
                <p className="mt-1 text-xs text-alpine-600">{mots.nouvelHoraireRetourIndice}</p>
              </div>
            ) : null}

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
