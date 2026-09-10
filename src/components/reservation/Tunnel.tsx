"use client";

import { useEffect, useMemo, useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import { usePanier } from "@/components/panier/PanierProvider";
import { DEVISES, convertir, type CodeDevise } from "@/lib/reservation/devises";
import type { Lieu } from "@/lib/reservation/lieux";
import { ENTREPRISE } from "@/data/site";
import { departImminent } from "@/lib/reservation/gestion";
import { instantAlpes } from "@/lib/temps";
import {
  TEXTES,
  TEXTES_ATTENTE,
  TEXTES_IMMINENT,
  type LangueTunnel,
} from "@/lib/reservation/textes";

/**
 * Le tunnel de réservation.
 *
 * Trois étapes : le trajet, le prix par véhicule, les détails. Le prix n'est
 * jamais calculé ici — il est demandé à `/api/devis`, qui seul connaît la table
 * des distances et le barème. Le navigateur envoie un trajet, pas un montant.
 *
 * Ce que le formulaire sait faire, et que le tunnel du concurrent fait aussi :
 * chercher un lieu au clavier, accepter une adresse libre, inverser le trajet,
 * déclarer bagages et skis avant le devis, et repartir d'un autre point que
 * celui de l'arrivée. Ce qu'il fait en plus : dire honnêtement quand il ne sait
 * pas chiffrer, au lieu d'afficher un prix approximatif.
 */

interface Ligne {
  sens: "aller" | "retour";
  km: number;
  total: number;
  majorations: string[];
}

interface OptionVehicule {
  categorie: "standard" | "business" | "premium";
  nom: string;
  modele: string;
  capacite: number;
  capaciteBagages: number;
  total: number;
  devise: string;
  remiseAllerRetour: number;
  lignes: Ligne[];
  encaissable: boolean;
}

interface Devis {
  trajet: {
    aeroport: string;
    station: string;
    km: number | null;
    duree: string;
    allerRetour: boolean;
    retourAilleurs: boolean;
    retourDepart: string | null;
    retourArrivee: string | null;
  };
  options: OptionVehicule[];
  encaissable: boolean;
}

type Etape = "trajet" | "vehicule" | "details" | "envoye";

const CHAMP =
  "mt-1 w-full min-w-0 rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/30";
const ETIQUETTE = "block text-xs font-semibold uppercase tracking-wide text-alpine-600";

/**
 * L'adresse telle que l'exploitant la lira, et telle que le chauffeur la
 * saisira dans son GPS : la voie, puis le code postal et la commune.
 *
 * Un lieu du registre garde son seul nom — « Geneva Airport » n'a pas de code
 * postal utile, et en ajouter un brouillerait la lecture.
 */
function adresseEntiere(valeur: ValeurLieu): string {
  if (valeur.slug) return valeur.texte;
  const commune = [valeur.codePostal, valeur.ville]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(" ");
  return commune && !valeur.texte.includes(commune)
    ? `${valeur.texte}, ${commune}`
    : valeur.texte;
}

export default function Tunnel({
  lieux,
  depart,
  arrivee,
  quand,
  passagersInitial,
  langue = "en",
}: {
  lieux: Lieu[];
  depart?: string;
  arrivee?: string;
  quand?: string;
  passagersInitial?: number;
  langue?: LangueTunnel;
}) {
  const t = TEXTES[langue];
  /*
   * Un paramètre d'URL est soit un slug du registre, soit une adresse tapée sur
   * la home. Ne reconnaître que le slug faisait perdre l'adresse en chemin : le
   * visiteur arrivait sur un tunnel vide après l'avoir déjà saisie une fois.
   */
  const lieuDe = (valeur?: string): ValeurLieu => {
    if (!valeur) return { slug: null, texte: "" };
    const trouve = lieux.find((l) => l.slug === valeur);
    return trouve ? { slug: trouve.slug, texte: trouve.nom } : { slug: null, texte: valeur };
  };

  const [etape, setEtape] = useState<Etape>("trajet");
  /*
    Vrai le temps que le prix demandé depuis l'accueil revienne. Sans lui,
    l'écran montrerait le formulaire une fraction de seconde avant de basculer
    sur les véhicules — un clignotement qui donne l'impression d'un faux départ.
  */
  const [prixAttendu, setPrixAttendu] = useState(() =>
    Boolean(depart && arrivee && quand && lieux.some((l) => l.slug === depart) &&
      lieux.some((l) => l.slug === arrivee)),
  );
  const [de, setDe] = useState<ValeurLieu>(lieuDe(depart));
  const [vers, setVers] = useState<ValeurLieu>(lieuDe(arrivee));
  const [when, setWhen] = useState(quand ?? "");

  /*
    Recalculé à chaque rendu plutôt que mémorisé : la valeur dépend de l'heure
    qu'il est, et une réservation ouverte une heure dans un onglet doit finir
    par afficher l'avertissement.
  */
  const imminent = (() => {
    const m = when.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    if (!m) return false;
    // Le fuseau du visiteur ne décide pas : un Londonien qui réserve pour
    // 13 h veut 13 h à Genève, pas 13 h chez lui.
    return departImminent(instantAlpes(+m[1], +m[2], +m[3], +m[4], +m[5]));
  })();
  const [allerRetour, setAllerRetour] = useState(false);
  const [returnWhen, setReturnWhen] = useState("");
  const [retourAilleurs, setRetourAilleurs] = useState(false);
  const [retourDe, setRetourDe] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [retourVers, setRetourVers] = useState<ValeurLieu>({ slug: null, texte: "" });
  const [passengers, setPassengers] = useState(passagersInitial ?? 2);
  const [bags, setBags] = useState(2);
  const [skis, setSkis] = useState(2);
  const [devise, setDevise] = useState<CodeDevise>("EUR");

  const [devis, setDevis] = useState<Devis | null>(null);
  const { ajouter } = usePanier();
  /** Retour d'ajout, par catégorie : « ajouté », « déjà là », « panier plein ». */
  const [ajout, setAjout] = useState<{ categorie: string; etat: string } | null>(null);
  const [choix, setChoix] = useState<OptionVehicule | null>(null);
  const [surMesure, setSurMesure] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const [client, setClient] = useState({
    nom: "",
    email: "",
    telephone: "",
    vol: "",
    adresse: "",
    enfants: "",
    message: "",
  });
  const [reference, setReference] = useState<string | null>(null);

  // Changer la demande invalide le prix affiché : on ne garde jamais à l'écran un
  // devis qui ne correspond plus à la saisie.
  useEffect(() => {
    setDevis(null);
    setChoix(null);
    setSurMesure(null);
  }, [de, vers, when, returnWhen, allerRetour, retourDe, retourVers, passengers, bags, skis]);

  const corpsDemande = useMemo(
    () => ({
      from: de.slug,
      to: vers.slug,
      fromText: adresseEntiere(de),
      toText: adresseEntiere(vers),
      when,
      returnWhen: allerRetour ? returnWhen : undefined,
      returnFrom: allerRetour && retourAilleurs ? retourDe.slug : undefined,
      returnTo: allerRetour && retourAilleurs ? retourVers.slug : undefined,
      returnFromText: adresseEntiere(retourDe),
      returnToText: adresseEntiere(retourVers),
      passengers,
      bags,
      skis,
    }),
    [de, vers, when, allerRetour, returnWhen, retourAilleurs, retourDe, retourVers, passengers, bags, skis],
  );

  /*
    « Voir mon prix » sur l'accueil doit montrer un prix.

    Le tunnel s'ouvrait invariablement sur son étape « Trajet », si bien que le
    visiteur qui venait de saisir départ, arrivée, date et nombre de personnes
    retrouvait le même formulaire, prérempli, sans le prix qu'il avait demandé —
    et devait cliquer une seconde fois sur un bouton qu'il croyait avoir déjà
    actionné. La demande arrivant complète par l'URL, elle est chiffrée tout de
    suite et l'écran s'ouvre sur les véhicules et leurs tarifs.

    Une seule fois, au montage : les dépendances sont volontairement absentes,
    la suite du parcours appartient au visiteur.
  */
  useEffect(() => {
    const chiffrable = Boolean(lieuDe(depart).slug && lieuDe(arrivee).slug && quand);
    if (chiffrable) void chercherPrix(true).finally(() => setPrixAttendu(false));
    else setPrixAttendu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function inverser() {
    setDe(vers);
    setVers(de);
  }

  /**
   * Demande le prix.
   *
   * `automatique` distingue les deux façons d'arriver ici. Au clic, le visiteur
   * a demandé un résultat et on l'y emmène, même si ce résultat est « ce trajet
   * se chiffre à la main ». Au chargement, il n'a rien demandé de plus que ce
   * qu'il a déjà rempli sur l'accueil : une liaison que nous ne savons pas
   * chiffrer le laisse alors sur le formulaire, où le champ dit lui-même ce
   * qu'il manque — le projeter d'office sur un écran de devis serait le
   * cueillir avec un problème qu'il n'a pas encore vu.
   */
  async function chercherPrix(automatique = false) {
    setErreur(null);
    setSurMesure(null);
    setEnCours(true);
    try {
      const reponse = await fetch("/api/devis/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpsDemande),
      });
      const donnees = await reponse.json();
      if (!reponse.ok) {
        if (!automatique) setErreur(donnees.erreur ?? t.erreurPrix);
        return;
      }
      if (donnees.devisSurMesure) {
        if (automatique) return;
        setSurMesure(donnees.message ?? "We will quote this journey by email.");
        setEtape("details");
        return;
      }
      setDevis(donnees);
      setEtape("vehicule");
    } catch {
      if (!automatique) setErreur(t.erreurReseau);
    } finally {
      setEnCours(false);
    }
  }

  async function demanderDevis(evenement: React.FormEvent) {
    evenement.preventDefault();
    await chercherPrix();
  }

  async function envoyer(evenement: React.FormEvent) {
    evenement.preventDefault();
    if (imminent) return;
    setErreur(null);
    setEnCours(true);
    try {
      const reponse = await fetch("/api/reservation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...corpsDemande,
          vehicle: choix?.categorie,
          // La langue voyage avec la demande : elle décide de la page de retour
          // après paiement et de la langue de l'e-mail de confirmation.
          langue,
          client: { ...client, skis },
        }),
      });
      const donnees = await reponse.json();
      if (!reponse.ok) {
        setErreur(donnees.erreur ?? t.erreurEnvoi);
        return;
      }
      if (donnees.paiement) {
        window.location.href = donnees.paiement;
        return;
      }
      setReference(donnees.reference ?? null);
      setEtape("envoye");
    } catch {
      setErreur(t.erreurReseau);
    } finally {
      setEnCours(false);
    }
  }

  /** Prix affiché : converti pour l'affichage, facturé en euros. */
  const prix = (montantEuros: number) => {
    const { montant, symbole } = convertir(montantEuros, devise);
    return `${symbole}${montant.toLocaleString("en-GB")}`;
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Fil etape={etape} libelles={t.etapes} />
        {prixAttendu ? (
          <p
            role="status"
            className="mt-4 rounded border border-glacier-200 bg-glacier-50 px-4 py-3 text-sm text-alpine-700"
          >
            {t.calculEnCours}
          </p>
        ) : null}
        <label className="flex items-center gap-2 text-xs text-alpine-600">
          <span className="uppercase tracking-wide">{t.devise}</span>
          <select
            className="rounded border border-glacier-300 bg-white px-2 py-1 text-sm text-alpine"
            value={devise}
            onChange={(e) => setDevise(e.target.value as CodeDevise)}
            aria-label="Display currency"
          >
            {Object.keys(DEVISES).map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      {erreur ? (
        <p
          role="alert"
          className="mt-6 rounded border border-marque/30 bg-marque/5 px-4 py-3 text-sm text-alpine"
        >
          {erreur}{" "}
          <a className="font-medium text-marque underline" href="/contact/">
            {t.demandeDevis}
          </a>
          .
        </p>
      ) : null}

      {/* ---------------------------------------------------------- 1. trajet */}
      {etape === "trajet" ? (
        <form onSubmit={demanderDevis} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <ChampLieu
              id="from"
              lieux={lieux}
              valeur={de}
              onChange={setDe}
              etiquette={t.de}
              placeholder={t.deIndice}
              requis
              langue={langue}
            />
            <button
              type="button"
              onClick={inverser}
              title={t.inverser}
              aria-label={t.inverser}
              className="mb-1 hidden h-9 w-9 shrink-0 items-center justify-center rounded border border-glacier-300 text-alpine-600 transition hover:border-alpes hover:text-alpes sm:flex"
            >
              ⇄
            </button>
            <ChampLieu
              id="to"
              lieux={lieux}
              valeur={vers}
              onChange={setVers}
              etiquette={t.vers}
              placeholder={t.versIndice}
              requis
              langue={langue}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="min-w-0 sm:col-span-2">
              <label className={ETIQUETTE} htmlFor="when">
                {t.arrivee}
              </label>
              <input
                id="when"
                type="datetime-local"
                className={CHAMP}
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                required
              />

              {/*
                Départ à moins d'une heure : on le dit ici, sous le champ qui vient de
                le produire, et non trois étapes plus loin. Le numéro est
                cliquable — sur un téléphone, c'est un appel, pas une note.
              */}
              {imminent ? (
                <div
                  role="status"
                  className="mt-2 rounded border border-or/50 bg-or-50 px-3 py-2 text-xs leading-relaxed text-alpine-700"
                >
                  <strong className="block text-sm text-alpine">
                    {TEXTES_IMMINENT[langue].titre}
                  </strong>
                  <span className="mt-1 block">{TEXTES_IMMINENT[langue].texte}</span>
                  <a
                    className="mt-1 inline-block font-semibold text-marque underline"
                    href={`tel:${ENTREPRISE.telephone}`}
                  >
                    {ENTREPRISE.telephoneAffiche}
                  </a>
                </div>
              ) : null}
            </div>
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="passengers">
                {t.passagers}
              </label>
              <input
                id="passengers"
                type="number"
                min={1}
                max={8}
                className={CHAMP}
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0">
                <label className={ETIQUETTE} htmlFor="bags">
                  {t.bagages}
                </label>
                <input
                  id="bags"
                  type="number"
                  min={0}
                  max={16}
                  className={CHAMP}
                  value={bags}
                  onChange={(e) => setBags(Number(e.target.value))}
                />
              </div>
              <div className="min-w-0">
                <label className={ETIQUETTE} htmlFor="skis">
                  {t.housses}
                </label>
                <input
                  id="skis"
                  type="number"
                  min={0}
                  max={16}
                  className={CHAMP}
                  value={skis}
                  onChange={(e) => setSkis(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-alpine-600">
            {t.noteBagages}
          </p>

          <fieldset className="rounded border border-glacier-200 bg-glacier-50 p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-alpine-600">
              {t.retour}
            </legend>
            <label className="flex items-center gap-2 text-sm text-alpine-700">
              <input
                type="checkbox"
                className="accent-alpes"
                checked={allerRetour}
                onChange={(e) => setAllerRetour(e.target.checked)}
              />
              {t.retourCase}
            </label>

            {allerRetour ? (
              <div className="mt-3 space-y-3">
                <div className="max-w-xs">
                  <label className={ETIQUETTE} htmlFor="returnWhen">
                    {t.retourQuand}
                  </label>
                  <input
                    id="returnWhen"
                    type="datetime-local"
                    className={CHAMP}
                    value={returnWhen}
                    onChange={(e) => setReturnWhen(e.target.value)}
                    required
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-alpine-700">
                  <input
                    type="checkbox"
                    className="accent-alpes"
                    checked={retourAilleurs}
                    onChange={(e) => setRetourAilleurs(e.target.checked)}
                  />
                  {t.retourAilleurs}
                </label>

                {retourAilleurs ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ChampLieu
                      id="returnFrom"
                      lieux={lieux}
                      valeur={retourDe}
                      onChange={setRetourDe}
                      etiquette={t.retourDe}
                      placeholder={vers.texte || t.vers}
                      langue={langue}
                    />
                    <ChampLieu
                      id="returnTo"
                      lieux={lieux}
                      valeur={retourVers}
                      onChange={setRetourVers}
                      etiquette={t.retourVers}
                      placeholder={de.texte || t.de}
                      langue={langue}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </fieldset>

          <button
            type="submit"
            disabled={enCours || imminent}
            className="w-full rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60 sm:w-auto"
          >
            {enCours ? t.calculEnCours : t.voirPrix}
          </button>
        </form>
      ) : null}

      {/* --------------------------------------------------------- 2. véhicule */}
      {etape === "vehicule" && devis ? (
        <div className="mt-6">
          <Recapitulatif
            trajet={`${devis.trajet.aeroport} → ${devis.trajet.station}`}
            details={[
              devis.trajet.km ? `${devis.trajet.km} km` : null,
              devis.trajet.duree || null,
              `${passengers} passenger${passengers > 1 ? "s" : ""}`,
              `${bags} bag${bags > 1 ? "s" : ""}, ${skis} ski bag${skis > 1 ? "s" : ""}`,
              devis.trajet.allerRetour ? "Return journey" : "One-way",
            ]}
            onModifier={() => setEtape("trajet")}
            libelleModifier={t.modifier}
          />

          {devis.trajet.retourAilleurs ? (
            <p className="mt-3 text-sm text-alpine-700">
              Return: {devis.trajet.retourDepart} → {devis.trajet.retourArrivee}
            </p>
          ) : null}

          <ul className="mt-6 space-y-3">
            {devis.options.map((option) => (
              <li key={option.categorie}>
                <button
                  type="button"
                  onClick={() => {
                    setChoix(option);
                    setEtape("details");
                  }}
                  className="flex w-full items-center justify-between gap-4 rounded border border-glacier-200 bg-white p-4 text-left transition hover:border-alpes hover:shadow-carte"
                >
                  <span>
                    <span className="font-display text-lg text-alpine">{option.nom}</span>
                    <span className="block text-xs text-alpine-600">{option.modele}</span>
                    <span className="block text-xs text-alpine-600">
                      {t.jusqua} {option.capacite} · {option.capaciteBagages} {t.pieces}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="font-display text-2xl text-alpine">
                      {prix(option.total)}
                    </span>
                    <span className="block text-xs text-alpine-600">
                      {devis.trajet.allerRetour ? t.parVehiculeAllerRetour : t.parVehicule}
                    </span>
                    {option.remiseAllerRetour > 0 ? (
                      <span className="block text-xs text-alpes-700">
                        {t.remiseRetour} −{prix(option.remiseAllerRetour)}
                      </span>
                    ) : null}
                  </span>
                </button>

                {/*
                  Ajouter plutôt que réserver : un séjour se compose souvent d'un
                  aller et d'un retour, parfois de deux véhicules.
                  La condition porte sur le **prix calculé**, pas sur
                  `encaissable` : ce dernier reste faux tant que le client n'a pas
                  validé le barème, ce qui rendait le panier inatteignable. Une
                  course chiffrée se met dans la liste ; que le paiement en ligne
                  soit ouvert ou non se tranche au moment de payer, et
                  `/api/panier` sait faire les deux.
                */}
                {option.total > 0 ? (
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const etat = ajouter({
                          from: de.slug ?? de.texte,
                          to: vers.slug ?? vers.texte,
                          when,
                          passengers,
                          categorie: option.categorie,
                          bags,
                          skis,
                          libelleDepart: devis.trajet.aeroport,
                          libelleArrivee: devis.trajet.station,
                          prixIndicatif: option.total,
                        });
                        setAjout({ categorie: option.categorie, etat });
                      }}
                      className="text-xs font-semibold text-marque underline underline-offset-2 hover:text-marque-600"
                    >
                      Add to my transfers
                    </button>
                    {ajout?.categorie === option.categorie ? (
                      <span className="text-xs text-alpine-600">
                        {ajout.etat === "ajoute"
                          ? "Added — see your list in the menu."
                          : ajout.etat === "deja-present"
                            ? "Already in your list."
                            : "Your list is full."}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-alpine-600">
            {t.noteInclus}
            {devise !== "EUR" ? t.noteDevise(devise) : ""}
          </p>
        </div>
      ) : null}

      {/* ---------------------------------------------------------- 3. détails */}
      {etape === "details" && (choix || surMesure) ? (
        <form onSubmit={envoyer} className="mt-6 space-y-5">
          {surMesure ? (
            <p className="rounded border border-glacier-200 bg-glacier-50 px-4 py-3 text-sm text-alpine-700">
              {surMesure}
            </p>
          ) : devis && choix ? (
            <Recapitulatif
              trajet={`${devis.trajet.aeroport} → ${devis.trajet.station}`}
              details={[
                choix.nom,
                `${passengers} passenger${passengers > 1 ? "s" : ""}`,
                devis.trajet.allerRetour ? "Return journey" : "One-way",
                prix(choix.total),
              ]}
              onModifier={() => setEtape("vehicule")}
              libelleModifier={t.modifier}
            />
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="nom">
                {t.nom}
              </label>
              <input
                id="nom"
                className={CHAMP}
                value={client.nom}
                onChange={(e) => setClient({ ...client, nom: e.target.value })}
                required
              />
            </div>
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="email">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                className={CHAMP}
                value={client.email}
                onChange={(e) => setClient({ ...client, email: e.target.value })}
                required
              />
            </div>
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="telephone">
                {t.telephone}
              </label>
              <input
                id="telephone"
                type="tel"
                className={CHAMP}
                value={client.telephone}
                onChange={(e) => setClient({ ...client, telephone: e.target.value })}
                required
              />
            </div>
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="vol">
                {t.vol}
              </label>
              <input
                id="vol"
                className={CHAMP}
                placeholder="e.g. EZY1234"
                value={client.vol}
                onChange={(e) => setClient({ ...client, vol: e.target.value })}
              />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label className={ETIQUETTE} htmlFor="adresse">
                {t.adresse}
              </label>
              <input
                id="adresse"
                className={CHAMP}
                placeholder={t.adresseIndice}
                value={client.adresse}
                onChange={(e) => setClient({ ...client, adresse: e.target.value })}
                required
              />
            </div>
            <div className="min-w-0">
              <label className={ETIQUETTE} htmlFor="enfants">
                {t.enfants}
              </label>
              <input
                id="enfants"
                className={CHAMP}
                placeholder={t.enfantsIndice}
                value={client.enfants}
                onChange={(e) => setClient({ ...client, enfants: e.target.value })}
              />
            </div>
            <div className="min-w-0 sm:col-span-2">
              <label className={ETIQUETTE} htmlFor="message">
                {t.message}
              </label>
              <textarea
                id="message"
                rows={3}
                className={CHAMP}
                value={client.message}
                onChange={(e) => setClient({ ...client, message: e.target.value })}
              />
            </div>
          </div>

          {devis?.encaissable ? null : (
            <p className="rounded border border-glacier-200 bg-glacier-50 px-4 py-3 text-sm text-alpine-700">
              {t.sansPaiement}
            </p>
          )}

          {/*
            La règle d'attente, juste au-dessus du bouton qui débite.

            C'est le seul endroit du parcours où elle doit figurer sans faute :
            un client qui accepte un prix a le droit de savoir ce qui peut s'y
            ajouter, et l'écrire ici plutôt que dans les conditions générales
            évite la conversation de trop, au comptoir, à minuit.
          */}
          <p className="rounded border border-or/40 bg-or-50 px-4 py-3 text-xs leading-relaxed text-alpine-700">
            {TEXTES_ATTENTE[langue].long}
          </p>

          <button
            type="submit"
            disabled={enCours}
            className="w-full rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60 sm:w-auto"
          >
            {enCours
              ? t.envoiEnCours
              : devis?.encaissable && choix
                ? t.payer(prix(choix.total))
                : t.demander}
          </button>
        </form>
      ) : null}

      {/* ------------------------------------------------------------ 4. envoyé */}
      {etape === "envoye" ? (
        <div className="mt-6 rounded border border-alpes-300 bg-alpes-50 p-6">
          <h2 className="font-display text-xl text-alpine">{t.recuTitre}</h2>
          <p className="mt-2 text-sm leading-relaxed text-alpine-700">
            {t.recuTexte(de.texte, vers.texte)}
          </p>
          {reference ? (
            <p className="mt-3 text-sm text-alpine-700">
              {t.reference} : <strong className="tabular-nums">{reference}</strong>
            </p>
          ) : null}
          <a
            href="/"
            className="mt-5 inline-block rounded bg-marque px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            {t.retourSite}
          </a>
        </div>
      ) : null}
    </div>
  );
}

/** Fil des étapes — le visiteur doit savoir combien il en reste. */
function Fil({ etape, libelles }: { etape: Etape; libelles: readonly string[] }) {
  const etapes: { cle: Etape; texte: string }[] = [
    { cle: "trajet", texte: libelles[0] },
    { cle: "vehicule", texte: libelles[1] },
    { cle: "details", texte: libelles[2] },
  ];
  const rang = etapes.findIndex((e) => e.cle === etape);

  return (
    <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {etapes.map((e, i) => {
        const atteinte = etape === "envoye" || i <= rang;
        return (
          <li key={e.cle} className={atteinte ? "font-semibold text-alpine" : "text-alpine-600"}>
            <span className={atteinte ? "text-alpes" : ""}>{i + 1}.</span> {e.texte}
          </li>
        );
      })}
    </ol>
  );
}

function Recapitulatif({
  trajet,
  details,
  onModifier,
  libelleModifier,
}: {
  trajet: string;
  details: (string | null)[];
  onModifier: () => void;
  libelleModifier: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded border border-glacier-200 bg-glacier-50 p-4">
      <div>
        <p className="font-display text-base text-alpine">{trajet}</p>
        <p className="mt-1 text-xs text-alpine-600">{details.filter(Boolean).join(" · ")}</p>
      </div>
      <button
        type="button"
        onClick={onModifier}
        className="text-sm font-medium text-marque underline underline-offset-4"
      >
        {libelleModifier}
      </button>
    </div>
  );
}
