"use client";

import { useEffect, useMemo, useState } from "react";
import ChampLieu, { type ValeurLieu } from "@/components/reservation/ChampLieu";
import Visuel, { type NomVisuel } from "@/components/Visuel";
import { usePanier } from "@/components/panier/PanierProvider";
import { DEVISES, convertir, type CodeDevise } from "@/lib/reservation/devises";
import type { Lieu } from "@/lib/reservation/lieux";
import { ENTREPRISE } from "@/data/site";
import { ouvrirCalendrier } from "@/lib/reservation/calendrier";
import { DELAI_APPEL_HEURES, departImminent } from "@/lib/reservation/gestion";
import { FUSEAU_ALPES, instantAlpes, saisieAlpes } from "@/lib/temps";
import {
  TEXTES,
  TEXTES_ATTENTE,
  TEXTES_IMMINENT,
  type LangueTunnel,
  type TextesTunnel,
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
    retourKm: number | null;
    retourDuree: string;
    passagers: number;
    passagersRetour: number | null;
  };
  options: OptionVehicule[];
  /** Les véhicules possibles au retour. Vide sur un aller simple. */
  optionsRetour: OptionVehicule[];
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
  retourQuand,
  retourDepart,
  retourArrivee,
  retourPassagersInitial,
  langue = "en",
}: {
  lieux: Lieu[];
  depart?: string;
  arrivee?: string;
  quand?: string;
  passagersInitial?: number;
  /* Le retour tel que l'accueil l'a rempli — voir `FormulaireRecherche`. */
  retourQuand?: string;
  retourDepart?: string;
  retourArrivee?: string;
  retourPassagersInitial?: number;
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
  /* L'aller-retour est déjà décidé si l'accueil a transmis une date de retour. */
  const [allerRetour, setAllerRetour] = useState(Boolean(retourQuand));
  const [returnWhen, setReturnWhen] = useState(retourQuand ?? "");
  const [retourAilleurs, setRetourAilleurs] = useState(Boolean(retourDepart || retourArrivee));
  const [retourDe, setRetourDe] = useState<ValeurLieu>(lieuDe(retourDepart));
  const [retourVers, setRetourVers] = useState<ValeurLieu>(lieuDe(retourArrivee));
  const [passengers, setPassengers] = useState(passagersInitial ?? 2);
  /* `null` = le groupe ne change pas ; le retour suit alors l'aller. */
  const [retourPassagers, setRetourPassagers] = useState<number | null>(
    retourPassagersInitial ?? null,
  );
  const [bags, setBags] = useState(2);
  const [skis, setSkis] = useState(2);
  const [devise, setDevise] = useState<CodeDevise>("EUR");

  const [devis, setDevis] = useState<Devis | null>(null);
  const { ajouter } = usePanier();
  /** Retour d'ajout, par catégorie : « ajouté », « déjà là », « panier plein ». */
  const [ajout, setAjout] = useState<{ categorie: string; etat: string } | null>(null);
  const [choix, setChoix] = useState<OptionVehicule | null>(null);
  /* Le véhicule du retour. `null` sur un aller simple, ou tant qu'il manque. */
  const [choixRetour, setChoixRetour] = useState<OptionVehicule | null>(null);
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
    setChoixRetour(null);
    setSurMesure(null);
  }, [de, vers, when, returnWhen, allerRetour, retourDe, retourVers, passengers, retourPassagers, bags, skis]);

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
      returnPassengers: allerRetour && retourPassagers !== null ? retourPassagers : undefined,
      bags,
      skis,
    }),
    [de, vers, when, allerRetour, returnWhen, retourAilleurs, retourDe, retourVers, passengers, retourPassagers, bags, skis],
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
    const retourComplet = !retourQuand || Boolean(retourQuand);
    const chiffrable = Boolean(lieuDe(depart).slug && lieuDe(arrivee).slug && quand && retourComplet);
    if (chiffrable) void chercherPrix(true).finally(() => setPrixAttendu(false));
    else setPrixAttendu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* La première heure vendable, à l'heure de l'aéroport — comme à l'accueil. */
  const premiereHeure = useMemo(
    () => saisieAlpes(new Date(Date.now() + DELAI_APPEL_HEURES * 3600 * 1000)),
    [],
  );

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
          /* Le véhicule du retour, quand il diffère : le serveur recalcule les
             deux sens et n'en croit aucun sur parole. */
          vehicleReturn: choixRetour?.categorie,
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
  /*
    Le prix s'écrit comme on l'écrit dans la langue.

    Le symbole était collé devant le nombre et le nombre formaté en anglais dans
    les quatre langues : « €515 » sur une page française, où l'on écrit
    « 515 € ». `Intl` connaît la place du symbole, le séparateur de milliers et
    l'espace insécable de chaque langue — mieux vaut la lui demander que la
    coder. Les montants restent entiers : on ne vend pas de demi-euro.
  */
  /*
    Un aller-retour, du point de vue du prix.

    `devis.trajet.allerRetour` dit ce que le visiteur a demandé ; ce booléen dit
    ce que le devis a effectivement chiffré des deux côtés. Les deux ne
    coïncident pas quand aucun véhicule ne convient au retour, et proposer alors
    une liste vide serait pire que ne rien proposer.
  */
  const allerRetourChiffre = Boolean(devis?.trajet.allerRetour && devis.optionsRetour.length > 0);

  /** Met une course chiffrée dans la liste du visiteur — la porte du panier. */
  const ajouterAuPanier = (option: OptionVehicule) => {
    if (!devis) return;
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
  };

  const prix = (montantEuros: number) => {
    const { montant } = convertir(montantEuros, devise);
    return new Intl.NumberFormat(LOCALE[langue], {
      style: "currency",
      currency: devise,
      maximumFractionDigits: 0,
    }).format(montant);
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
                onClick={ouvrirCalendrier}
                className={CHAMP}
                min={premiereHeure}
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
                <div className="flex flex-wrap gap-4">
                  <div className="max-w-xs flex-1">
                    <label className={ETIQUETTE} htmlFor="returnWhen">
                      {t.retourQuand}
                    </label>
                    <input
                      id="returnWhen"
                      type="datetime-local"
                      onClick={ouvrirCalendrier}
                      className={CHAMP}
                      min={when || premiereHeure}
                      value={returnWhen}
                      onChange={(e) => setReturnWhen(e.target.value)}
                      required
                    />
                  </div>

                  {/*
                    Le groupe du retour. Le prix est par véhicule, donc repartir
                    à deux quand on est venu à quatre ne le change pas — mais le
                    chauffeur prépare sa journée avec, et la capacité retenue est
                    celle du trajet le plus chargé.
                  */}
                  <div className="w-28">
                    <label className={ETIQUETTE} htmlFor="returnPassengers">
                      {t.retourPassagers}
                    </label>
                    <input
                      id="returnPassengers"
                      type="number"
                      min={1}
                      max={16}
                      className={CHAMP}
                      value={retourPassagers ?? passengers}
                      onChange={(e) => setRetourPassagers(Number(e.target.value))}
                    />
                  </div>
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
          {/*
            Le récapitulatif dit la course entière, aller **et** retour.

            Il ne montrait que l'aller et se terminait par « One-way » quel que
            soit le trajet : un visiteur qui avait saisi une autre station de
            départ au retour, et un groupe différent, ne les revoyait plus nulle
            part avant la page de paiement. Ce qu'on lui demande de vérifier
            avant de choisir un véhicule, c'est justement ce qu'il a saisi.
          */}
          <Recapitulatif
            libelleModifier={t.modifier}
            onModifier={() => setEtape("trajet")}
            pied={t.recapBagages(bags, skis)}
            trajets={[
              {
                sens: allerRetourChiffre ? t.aller : null,
                lieux: `${devis.trajet.aeroport} → ${devis.trajet.station}`,
                details: [
                  quandLisible(when, langue),
                  devis.trajet.km ? `${devis.trajet.km} km` : null,
                  devis.trajet.duree || null,
                  t.recapPassagers(passengers),
                ],
              },
              allerRetourChiffre
                ? {
                    sens: t.retour,
                    lieux: `${devis.trajet.retourDepart ?? devis.trajet.station} → ${
                      devis.trajet.retourArrivee ?? devis.trajet.aeroport
                    }`,
                    details: [
                      quandLisible(returnWhen, langue),
                      devis.trajet.retourKm ? `${devis.trajet.retourKm} km` : null,
                      devis.trajet.retourDuree || null,
                      t.recapPassagers(retourPassagers ?? passengers),
                    ],
                  }
                : null,
            ]}
          />

          <h2 className="mt-8 font-display text-2xl text-alpine">
            {allerRetourChiffre ? t.titreVehiculeDeuxSens : t.titreVehicule}
          </h2>
          <p className="mt-1 text-sm text-alpine-600">
            {allerRetourChiffre ? t.sousTitreVehiculeDeuxSens : t.sousTitreVehicule}
          </p>

          {/*
            Un aller-retour se choisit sens par sens.

            Le tunnel n'offrait qu'une liste, pour un véhicule unique qui servait
            les deux trajets : la capacité retenue était celle du groupe le plus
            nombreux, et arriver à deux pour repartir à six faisait payer un huit
            places sur les deux trajets, dont l'un à vide. Chaque sens a
            maintenant sa liste, filtrée sur son propre effectif.

            Sur un aller simple, le clic conclut l'étape comme avant : y ajouter
            un bouton de confirmation coûterait un clic à tout le monde pour un
            cas qui n'a rien à confirmer.
          */}
          <ListeVehicules
            titre={allerRetourChiffre ? t.vehiculeAller : null}
            options={devis.options}
            choisi={choix}
            libelleChoisi={t.choisi}
            allerRetour={false}
            textes={t}
            prix={prix}
            /* Le panier sert à composer plusieurs courses. Pendant un
               aller-retour, on est déjà en train d'en composer une : la porte du
               panier n'y ajouterait qu'un lien de plus entre chaque carte. */
            surAjout={allerRetourChiffre ? undefined : ajouterAuPanier}
            ajout={ajout}
            onChoisir={(option) => {
              setChoix(option);
              if (!allerRetourChiffre) {
                setEtape("details");
                return;
              }
              /*
                Le retour se présélectionne sur la même catégorie quand elle
                existe : c'est le cas courant, et le visiteur n'a plus qu'à le
                confirmer ou en changer.
              */
              setChoixRetour(
                devis.optionsRetour.find((o) => o.categorie === option.categorie) ?? choixRetour,
              );
            }}
          />

          {allerRetourChiffre ? (
            <>
              <ListeVehicules
                titre={t.vehiculeRetour}
                options={devis.optionsRetour}
                choisi={choixRetour}
                libelleChoisi={t.choisi}
                allerRetour={false}
                textes={t}
                prix={prix}
                onChoisir={setChoixRetour}
              />

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded border border-glacier-200 bg-glacier-50 p-4">
                <p className="text-sm text-alpine-700">
                  {choix && choixRetour ? (
                    <>
                      <span className="block text-xs uppercase tracking-wide text-alpine-600">
                        {t.totalDeuxSens}
                      </span>
                      <span className="font-display text-2xl text-alpine">
                        {prix(choix.total + choixRetour.total)}
                      </span>
                    </>
                  ) : (
                    t.choisirRetour
                  )}
                </p>
                <button
                  type="button"
                  disabled={!choix || !choixRetour}
                  onClick={() => setEtape("details")}
                  className="rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-50"
                >
                  {t.continuerVehicule}
                </button>
              </div>
            </>
          ) : null}

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
            /* Le même récapitulatif qu'à l'étape précédente : la dernière
               chose qu'on relit avant de payer doit être la course entière. */
            <Recapitulatif
              libelleModifier={t.modifier}
              onModifier={() => setEtape("vehicule")}
              pied={`${t.recapBagages(bags, skis)} · ${prix(
                choix.total + (choixRetour?.total ?? 0),
              )}`}
              trajets={[
                {
                  sens: allerRetourChiffre ? t.aller : null,
                  lieux: `${devis.trajet.aeroport} → ${devis.trajet.station}`,
                  /* Le véhicule figure dans le bloc de son sens : c'est là qu'il
                     se vérifie, maintenant qu'il peut différer d'un sens à
                     l'autre. */
                  details: [
                    quandLisible(when, langue),
                    t.recapPassagers(passengers),
                    choix.nom,
                  ],
                },
                allerRetourChiffre
                  ? {
                      sens: t.retour,
                      lieux: `${devis.trajet.retourDepart ?? devis.trajet.station} → ${
                        devis.trajet.retourArrivee ?? devis.trajet.aeroport
                      }`,
                      details: [
                        quandLisible(returnWhen, langue),
                        t.recapPassagers(retourPassagers ?? passengers),
                        choixRetour?.nom ?? null,
                      ],
                    }
                  : null,
              ]}
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
          </div>

          {/*
            Ce qui ne concerne pas tout le monde ne s'impose pas à tout le monde.

            Les sièges enfants et la note libre servent une minorité de courses,
            et allongeaient un écran que le visiteur atteint carte en main. Ils
            restent à un clic, dans un `details` natif : pas de script, ouvrable
            au clavier, et la recherche du navigateur trouve leur contenu même
            replié. Aucun champ obligatoire n'y entre — on ne cache pas ce qu'il
            faut remplir.
          */}
          <details className="rounded border border-glacier-200 bg-glacier-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-medium text-alpine-700">
              {t.precisions}
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
          </details>

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
          <div className="rounded border border-or/40 bg-or-50 px-4 py-3 text-xs leading-relaxed text-alpine-700">
            {/*
              Le résumé porte le chiffre, pas seulement la promesse : « une heure
              comprise » sans le tarif au-delà serait la moitié rassurante d'une
              règle qui coûte de l'argent. Ce qui peut s'ajouter au prix reste
              donc visible sans rien ouvrir ; c'est le détail — le vol retardé,
              le préavis de 24 heures — qui attend le clic.
            */}
            <p>{TEXTES_ATTENTE[langue].resume}</p>
            <details className="mt-1">
              <summary className="cursor-pointer font-medium underline">
                {t.detailAttente}
              </summary>
              <p className="mt-2">{TEXTES_ATTENTE[langue].long}</p>
            </details>
          </div>

          <button
            type="submit"
            disabled={enCours}
            className="w-full rounded bg-marque px-6 py-3 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:opacity-60 sm:w-auto"
          >
            {enCours
              ? t.envoiEnCours
              : devis?.encaissable && choix
                ? t.payer(prix(choix.total + (choixRetour?.total ?? 0)))
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

/**
 * La photo de chaque catégorie, celle de la home.
 *
 * Le tunnel montrait trois lignes de texte : un nom, un modèle, un nombre de
 * places. On choisit une voiture sur ce qu'elle est, et « Volkswagen Transporter
 * (T5/T6, Combi or Shuttle type) » ne dit rien à qui ne connaît pas les
 * références. Ce sont les visuels déjà préparés pour la home — aucune image de
 * plus à produire, et le même véhicule d'un bout à l'autre du site.
 */
const VISUEL_VEHICULE: Record<"standard" | "business" | "premium", NomVisuel> = {
  standard: "vehicule-standard",
  business: "vehicule-business",
  premium: "vehicule-premium",
};

/** Les langues du tunnel, dans la forme attendue par `Intl`. */
const LOCALE: Record<LangueTunnel, string> = {
  en: "en-GB",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
};

/**
 * Une saisie `YYYY-MM-DDTHH:mm` telle qu'on la relit.
 *
 * L'heure affichée est celle qui a été tapée : c'est l'heure de l'aéroport, pas
 * celle du navigateur. On formate donc l'instant construit par `instantAlpes`
 * dans le fuseau du service — le passer à `Intl` sans fuseau explicite rendrait
 * « 10:00 » à Chambéry et « 09:00 » à Londres pour la même course.
 */
function quandLisible(valeur: string, langue: LangueTunnel): string | null {
  const m = valeur?.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!m) return null;
  const date = instantAlpes(+m[1], +m[2], +m[3], +m[4], +m[5]);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(LOCALE[langue], {
    timeZone: FUSEAU_ALPES,
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Une liste de véhicules, pour un sens.
 *
 * Elle sert l'aller et le retour, qui ont chacun leur effectif et donc leur
 * propre jeu de catégories possibles. Dupliquer le balisage pour le second sens
 * aurait garanti que les deux divergent au premier correctif — c'est la règle
 * du tunnel, celle qui a déjà évité deux calculs de prix.
 *
 * Le lien du panier n'est proposé qu'à l'aller : mettre de côté « le retour
 * seul » d'un aller-retour en cours de réservation ne veut rien dire.
 */
function ListeVehicules({
  titre,
  options,
  choisi,
  libelleChoisi,
  textes,
  prix,
  onChoisir,
  surAjout,
  ajout,
  allerRetour,
}: {
  titre: string | null;
  options: OptionVehicule[];
  choisi: OptionVehicule | null;
  libelleChoisi: string;
  textes: TextesTunnel;
  prix: (montant: number) => string;
  onChoisir: (option: OptionVehicule) => void;
  surAjout?: (option: OptionVehicule) => void;
  ajout?: { categorie: string; etat: string } | null;
  allerRetour: boolean;
}) {
  return (
    <section className="mt-4">
      {titre ? (
        <h3 className="text-xs font-semibold uppercase tracking-wide text-alpine-600">{titre}</h3>
      ) : null}
      <ul className="mt-2 space-y-3">
        {options.map((option) => {
          const actif = choisi?.categorie === option.categorie;
          return (
            <li key={option.categorie}>
              <button
                type="button"
                aria-pressed={actif}
                onClick={() => onChoisir(option)}
                className={`flex w-full flex-col gap-0 overflow-hidden rounded border bg-white text-left transition hover:shadow-carte sm:flex-row sm:items-stretch ${
                  actif ? "border-alpes ring-2 ring-alpes/30" : "border-glacier-200 hover:border-alpes"
                }`}
              >
                {/*
                  La photo du véhicule ouvre la carte.

                  Les trois visuels n'ont pas le même cadrage — 640×333, 640×302,
                  604×236 — d'où le cadre à proportions imposées : trois cartes de
                  hauteurs différentes se liraient comme trois offres de nature
                  différente. Mais le véhicule y est **contenu**, pas recadré :
                  ces photos sont cadrées au plus juste, si bien qu'un
                  `object-cover` dans un cadre étroit leur coupait le capot et le
                  hayon. On montre une voiture entière ou rien.
                */}
                <span className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden bg-white sm:aspect-auto sm:w-44">
                  <Visuel
                    nom={VISUEL_VEHICULE[option.categorie]}
                    alt={option.modele}
                    sizes="(min-width: 640px) 11rem, 100vw"
                    className="absolute inset-0 h-full w-full object-contain p-2"
                  />
                </span>

                <span className="flex flex-1 items-center justify-between gap-4 p-4">
                  <span>
                    <span className="font-display text-lg text-alpine">{option.nom}</span>
                    {actif ? (
                      <span className="ml-2 rounded-full bg-alpes-50 px-2 py-0.5 text-xs font-semibold text-alpes-700">
                        {libelleChoisi}
                      </span>
                    ) : null}
                    <span className="block text-xs text-alpine-600">{option.modele}</span>
                    <span className="block text-xs text-alpine-600">
                      {textes.jusqua} {option.capacite} · {option.capaciteBagages} {textes.pieces}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="font-display text-2xl text-alpine">{prix(option.total)}</span>
                    <span className="block text-xs text-alpine-600">
                      {allerRetour ? textes.parVehiculeAllerRetour : textes.parVehicule}
                    </span>
                    {option.remiseAllerRetour > 0 ? (
                      <span className="block text-xs text-alpes-700">
                        {textes.remiseRetour} −{prix(option.remiseAllerRetour)}
                      </span>
                    ) : null}
                  </span>
                </span>
              </button>

              {/*
                Ajouter plutôt que réserver : un séjour se compose souvent d'un
                aller et d'un retour, parfois de deux véhicules.

                Le libellé disait « Add to my transfers », en anglais dans les
                quatre langues et souligné comme l'action principale, alors qu'il
                n'est que la porte du panier : on comprenait mal qu'il suffit de
                cliquer la carte pour continuer. Il dit maintenant à quoi il sert,
                dans la langue de la page, et reste discret.

                La condition porte sur le **prix calculé**, pas sur `encaissable` :
                ce dernier reste faux tant que le client n'a pas validé le barème,
                ce qui rendait le panier inatteignable.
              */}
              {surAjout && option.total > 0 ? (
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => surAjout(option)}
                    className="text-xs text-alpine-600 underline underline-offset-2 hover:text-marque"
                  >
                    {textes.ajouterListe}
                  </button>
                  {ajout?.categorie === option.categorie ? (
                    <span className="text-xs text-alpine-600">
                      {ajout.etat === "ajoute"
                        ? textes.ajoutFait
                        : ajout.etat === "deja-present"
                          ? textes.ajoutDeja
                          : textes.ajoutPlein}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Recapitulatif({
  trajets,
  pied,
  onModifier,
  libelleModifier,
}: {
  /** Un bloc par sens. Le retour est absent sur un aller simple. */
  trajets: ({ sens: string | null; lieux: string; details: (string | null)[] } | null)[];
  /** Ce qui vaut pour la course entière — les bagages voyagent dans les deux sens. */
  pied: string;
  onModifier: () => void;
  libelleModifier: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded border border-glacier-200 bg-glacier-50 p-4">
      <div className="min-w-0 space-y-3">
        {trajets.filter((bloc) => bloc !== null).map((bloc) => (
          <div key={bloc.lieux + (bloc.sens ?? "")}>
            {bloc.sens ? (
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-alpine-600">
                {bloc.sens}
              </p>
            ) : null}
            <p className="font-display text-base text-alpine">{bloc.lieux}</p>
            <p className="mt-0.5 text-xs text-alpine-600">
              {bloc.details.filter(Boolean).join(" · ")}
            </p>
          </div>
        ))}
        <p className="text-xs text-alpine-600">{pied}</p>
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
