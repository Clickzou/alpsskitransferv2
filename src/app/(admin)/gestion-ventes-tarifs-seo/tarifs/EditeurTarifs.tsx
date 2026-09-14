"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import Visuel, { type NomVisuel } from "@/components/Visuel";
import type { LigneApercu } from "@/lib/tarification/apercu";
import type { CategorieVehicule } from "@/lib/tarification/bareme";
import type { Creneau, Grille } from "@/lib/tarification/grille";
import { actionApercuGrille, actionPublierGrille } from "./actions";

/**
 * L'éditeur de la grille.
 *
 * Les valeurs se tapent à la française — « 1,18 » — et restent du texte tant
 * qu'on les saisit : c'est le serveur qui les relit (`validerGrille`), à
 * l'aperçu comme à la publication. « Publier » ne s'allume qu'une fois l'aperçu
 * vu **pour la saisie exacte** qu'on publie : toucher un champ après l'aperçu
 * le rend périmé, et il faut le revoir.
 *
 * Aucun import de valeur depuis `lib/tarification/grille` : il embarque le
 * registre des stations, et ce composant part dans le navigateur.
 */

type Texte = string;
interface Brouillon {
  bareme: {
    priseEnCharge: Record<CategorieVehicule, Texte>;
    tauxKm: Record<CategorieVehicule, Texte>;
    majorations: { samedi: Texte; dimanche: Texte; nuit: Texte };
    plageNuit: { debut: Texte; fin: Texte };
    remiseAllerRetour: Texte;
  };
  coefficients: Record<string, Texte>;
  prixFixes: { airport: string; resort: string; prix: Record<CategorieVehicule, Record<Creneau, Texte>> }[];
  saisons: { nom: string; debut: string; fin: string; majoration: Texte }[];
}

const CATEGORIES: { cle: CategorieVehicule; nom: string }[] = [
  { cle: "standard", nom: "Standard" },
  { cle: "business", nom: "Business" },
  { cle: "premium", nom: "Premium" },
];

/** Les quatre moments d'un prix fixe — recopiés de `grille.ts`, qui ne part pas dans le navigateur. */
const CRENEAUX: { cle: Creneau; nom: string }[] = [
  { cle: "semaineJour", nom: "Semaine, jour" },
  { cle: "semaineNuit", nom: "Semaine, nuit" },
  { cle: "weekendJour", nom: "Week-end, jour" },
  { cle: "weekendNuit", nom: "Week-end, nuit" },
];

const momentsVides = (): Record<Creneau, Texte> => ({
  semaineJour: "",
  semaineNuit: "",
  weekendJour: "",
  weekendNuit: "",
});

/** Ce que la page sait d'un véhicule : son modèle, sa photo, et ce qu'il emporte. */
export interface FicheVehicule {
  cle: CategorieVehicule;
  modele: string;
  image: NomVisuel;
  places: number;
  bagages: number;
}

const t = (n: number | undefined) => (n === undefined ? "" : String(n).replace(".", ","));
const parVehicule = (valeurs: Partial<Record<CategorieVehicule, number>>) =>
  ({ standard: t(valeurs.standard), business: t(valeurs.business), premium: t(valeurs.premium) });

const moments = (valeurs: Partial<Record<Creneau, number>> | undefined) =>
  Object.fromEntries(Object.entries(valeurs ?? {}).map(([k, v]) => [k, t(v)])) as Partial<Record<Creneau, Texte>>;

function versBrouillon(g: Grille, stations: { slug: string }[]): Brouillon {
  return {
    bareme: {
      priseEnCharge: parVehicule(g.bareme.priseEnCharge),
      tauxKm: parVehicule(g.bareme.tauxKm),
      majorations: {
        samedi: t(g.bareme.majorations.samedi),
        dimanche: t(g.bareme.majorations.dimanche),
        nuit: t(g.bareme.majorations.nuit),
      },
      plageNuit: { debut: t(g.bareme.plageNuit.debut), fin: t(g.bareme.plageNuit.fin) },
      remiseAllerRetour: t(g.bareme.remiseAllerRetour),
    },
    coefficients: Object.fromEntries(stations.map((s) => [s.slug, t(g.coefficients[s.slug] ?? 1)])),
    prixFixes: g.prixFixes.map((p) => ({
      airport: p.airport,
      resort: p.resort,
      prix: {
        standard: { ...momentsVides(), ...moments(p.prix.standard) },
        business: { ...momentsVides(), ...moments(p.prix.business) },
        premium: { ...momentsVides(), ...moments(p.prix.premium) },
      },
    })),
    saisons: g.saisons.map((s) => ({ ...s, majoration: t(s.majoration) })),
  };
}

const CHAMP =
  "w-full min-w-0 rounded border border-glacier-300 bg-white px-2 py-1.5 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
const ETIQUETTE = "block text-xs font-medium uppercase tracking-wide text-alpine-600";
const CARTE = "mt-6 rounded-xl border border-glacier-200 bg-white p-5 shadow-carte";
const BOUTON_SECONDAIRE =
  "rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50";

export default function EditeurTarifs({
  grille,
  stations,
  aeroports,
  vehicules,
}: {
  grille: Grille;
  stations: { slug: string; nom: string }[];
  aeroports: { slug: string; nom: string }[];
  vehicules: FicheVehicule[];
}) {
  const router = useRouter();
  const initial = useMemo(() => versBrouillon(grille, stations), [grille, stations]);
  const [brouillon, setBrouillon] = useState<Brouillon>(initial);
  const [filtre, setFiltre] = useState("");
  const [apercu, setApercu] = useState<{ pour: string; lignes: LigneApercu[] } | null>(null);
  const [erreurs, setErreurs] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [enCours, demarrer] = useTransition();

  const empreinte = JSON.stringify(brouillon);
  const modifie = empreinte !== JSON.stringify(initial);
  const apercuAJour = apercu !== null && apercu.pour === empreinte;

  /** Modifie une valeur du brouillon ; l'aperçu, lui, devient périmé tout seul. */
  function changer(modifier: (b: Brouillon) => void) {
    setBrouillon((precedent) => {
      const copie = JSON.parse(JSON.stringify(precedent)) as Brouillon;
      modifier(copie);
      return copie;
    });
    setMessage(null);
  }

  function voirApercu() {
    const pour = empreinte;
    demarrer(async () => {
      const reponse = await actionApercuGrille(JSON.parse(pour));
      if ("erreurs" in reponse) {
        setErreurs(reponse.erreurs);
        setApercu(null);
      } else {
        setErreurs([]);
        setApercu({ pour, lignes: reponse.lignes });
      }
    });
  }

  function publier() {
    if (!apercuAJour) return;
    if (!window.confirm("Publier ces tarifs ? Ils feront les prix de toutes les nouvelles réservations, sur le site et au téléphone.")) {
      return;
    }
    demarrer(async () => {
      const reponse = await actionPublierGrille(JSON.parse(empreinte), note);
      if ("erreurs" in reponse) {
        setErreurs(reponse.erreurs);
        return;
      }
      setErreurs([]);
      setApercu(null);
      setNote("");
      setMessage("Tarifs publiés. Ils s’appliquent aux nouvelles réservations d’ici une demi-minute.");
      router.refresh();
    });
  }

  const nombreChamp = (valeur: string, onChange: (v: string) => void, libelle: string, suffixe?: string) => (
    <span className="flex items-center gap-1">
      <input
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        inputMode="decimal"
        aria-label={libelle}
        className={CHAMP}
      />
      {suffixe ? <span className="shrink-0 text-xs text-alpine-600">{suffixe}</span> : null}
    </span>
  );

  const stationsVisibles = stations.filter((s) =>
    s.nom.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(
      filtre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""),
    ),
  );
  const coefficientsModifies = stations.filter((s) => {
    const v = Number(brouillon.coefficients[s.slug]?.replace(",", "."));
    return Number.isFinite(v) && v !== 1;
  }).length;

  return (
    <>
      {/* ------------------------------------------------ règles générales */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Règles générales</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-alpine-600">
                <th className="py-1 pr-3 font-medium">Véhicule</th>
                <th className="py-1 pr-3 font-medium">Passagers</th>
                <th className="py-1 pr-3 font-medium">Prise en charge</th>
                <th className="py-1 font-medium">Prix au kilomètre</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((c) => {
                const fiche = vehicules.find((v) => v.cle === c.cle);
                return (
                <tr key={c.cle} className="border-t border-glacier-100">
                  <td className="py-2 pr-3">
                    <span className="flex items-center gap-3">
                      {fiche ? (
                        // La voiture entière, jamais recadrée — comme dans le tunnel.
                        <span className="relative block h-14 w-24 shrink-0 overflow-hidden rounded bg-white">
                          <Visuel
                            nom={fiche.image}
                            alt={fiche.modele}
                            sizes="6rem"
                            className="absolute inset-0 h-full w-full object-contain"
                          />
                        </span>
                      ) : null}
                      <span>
                        <span className="block font-semibold text-alpine">{c.nom}</span>
                        {fiche ? <span className="block text-xs text-alpine-600">{fiche.modele}</span> : null}
                      </span>
                    </span>
                  </td>
                  <td className="py-2 pr-3 text-alpine">
                    {fiche ? (
                      <>
                        <span className="block font-semibold">{fiche.places} places</span>
                        <span className="block text-xs text-alpine-600">{fiche.bagages} bagages max.</span>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-1.5 pr-3">
                    {nombreChamp(
                      brouillon.bareme.priseEnCharge[c.cle],
                      (v) => changer((b) => void (b.bareme.priseEnCharge[c.cle] = v)),
                      `Prise en charge ${c.nom}`,
                      "€",
                    )}
                  </td>
                  <td className="py-1.5">
                    {nombreChamp(
                      brouillon.bareme.tauxKm[c.cle],
                      (v) => changer((b) => void (b.bareme.tauxKm[c.cle] = v)),
                      `Prix au kilomètre ${c.nom}`,
                      "€/km",
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className={ETIQUETTE}>
            Majoration du samedi
            {nombreChamp(brouillon.bareme.majorations.samedi, (v) => changer((b) => void (b.bareme.majorations.samedi = v)), "Majoration du samedi", "%")}
          </label>
          <label className={ETIQUETTE}>
            Majoration du dimanche
            {nombreChamp(brouillon.bareme.majorations.dimanche, (v) => changer((b) => void (b.bareme.majorations.dimanche = v)), "Majoration du dimanche", "%")}
          </label>
          <label className={ETIQUETTE}>
            Majoration de nuit
            {nombreChamp(brouillon.bareme.majorations.nuit, (v) => changer((b) => void (b.bareme.majorations.nuit = v)), "Majoration de nuit", "%")}
          </label>
          <label className={ETIQUETTE}>
            La nuit commence à
            {nombreChamp(brouillon.bareme.plageNuit.debut, (v) => changer((b) => void (b.bareme.plageNuit.debut = v)), "Début de la nuit", "h")}
          </label>
          <label className={ETIQUETTE}>
            La nuit finit à
            {nombreChamp(brouillon.bareme.plageNuit.fin, (v) => changer((b) => void (b.bareme.plageNuit.fin = v)), "Fin de la nuit", "h")}
          </label>
          <label className={ETIQUETTE}>
            Remise sur le retour d’un aller-retour
            {nombreChamp(brouillon.bareme.remiseAllerRetour, (v) => changer((b) => void (b.bareme.remiseAllerRetour = v)), "Remise aller-retour", "%")}
          </label>
        </div>
      </section>

      {/* ------------------------------------------------------- saisons */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Périodes de saison</h2>
        <p className="mt-1 text-sm text-alpine-600">
          Une majoration (ou une baisse, avec un nombre négatif) sur les départs entre deux dates incluses —
          vacances scolaires, Noël, basse saison. Elle s’ajoute à celles du jour et de la nuit.
        </p>
        <div className="mt-4 space-y-2">
          {brouillon.saisons.map((s, i) => (
            <div key={i} className="grid items-end gap-2 sm:grid-cols-[1fr_10rem_10rem_7rem_auto]">
              <label className={ETIQUETTE}>
                Nom
                <input value={s.nom} maxLength={60} onChange={(e) => changer((b) => void (b.saisons[i].nom = e.target.value))} placeholder="ex. Vacances de février" className={CHAMP} />
              </label>
              <label className={ETIQUETTE}>
                Du
                <input type="date" value={s.debut} onChange={(e) => changer((b) => void (b.saisons[i].debut = e.target.value))} className={CHAMP} />
              </label>
              <label className={ETIQUETTE}>
                Au
                <input type="date" value={s.fin} onChange={(e) => changer((b) => void (b.saisons[i].fin = e.target.value))} className={CHAMP} />
              </label>
              <label className={ETIQUETTE}>
                Majoration
                {nombreChamp(s.majoration, (v) => changer((b) => void (b.saisons[i].majoration = v)), "Majoration de la période", "%")}
              </label>
              <button type="button" onClick={() => changer((b) => void b.saisons.splice(i, 1))} className={BOUTON_SECONDAIRE}>
                Retirer
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => changer((b) => void b.saisons.push({ nom: "", debut: "", fin: "", majoration: "" }))}
          className={`mt-3 ${BOUTON_SECONDAIRE}`}
        >
          + Ajouter une période
        </button>
      </section>

      {/* ------------------------------------------------- coefficients */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Coefficients par station</h2>
        <p className="mt-1 text-sm text-alpine-600">
          1 = prix normal ; 1,20 = 20 % plus cher ; 0,90 = 10 % moins cher. {coefficientsModifies} station
          {coefficientsModifies > 1 ? "s ont" : " a"} un coefficient différent de 1.
        </p>
        <input
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
          placeholder="Chercher une station"
          aria-label="Chercher une station"
          className={`mt-3 max-w-xs ${CHAMP}`}
        />
        <div className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {stationsVisibles.map((s) => (
            <label key={s.slug} className="grid grid-cols-[1fr_5.5rem] items-center gap-2 text-sm text-alpine">
              <span className="truncate">{s.nom}</span>
              <input
                value={brouillon.coefficients[s.slug] ?? "1"}
                onChange={(e) => changer((b) => void (b.coefficients[s.slug] = e.target.value))}
                inputMode="decimal"
                aria-label={`Coefficient de ${s.nom}`}
                className={CHAMP}
              />
            </label>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- prix fixes */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Prix fixes par trajet</h2>
        <p className="mt-1 text-sm leading-relaxed text-alpine-600">
          Un prix convenu remplace le calcul pour ce trajet et ce véhicule. Une case remplie est le prix de ce
          moment, majorations du week-end et de la nuit comprises. Une case vide part du prix « Semaine, jour »
          et y ajoute les majorations du barème. Un véhicule sans prix « Semaine, jour » suit le calcul. La
          majoration de saison s’ajoute dans tous les cas.
        </p>
        <div className="mt-4 space-y-4">
          {brouillon.prixFixes.map((p, i) => (
            <div key={i} className="rounded-lg border border-glacier-200 p-3">
            <div className="grid items-end gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <label className={ETIQUETTE}>
                Aéroport
                <select value={p.airport} onChange={(e) => changer((b) => void (b.prixFixes[i].airport = e.target.value))} className={CHAMP}>
                  <option value="">— choisir —</option>
                  {aeroports.map((a) => (
                    <option key={a.slug} value={a.slug}>
                      {a.nom}
                    </option>
                  ))}
                </select>
              </label>
              <label className={ETIQUETTE}>
                Station
                <select value={p.resort} onChange={(e) => changer((b) => void (b.prixFixes[i].resort = e.target.value))} className={CHAMP}>
                  <option value="">— choisir —</option>
                  {stations.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.nom}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => changer((b) => void b.prixFixes.splice(i, 1))} className={BOUTON_SECONDAIRE}>
                Retirer
              </button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-alpine-600">
                    <th className="py-1 pr-3 font-medium">Véhicule</th>
                    {CRENEAUX.map((m) => (
                      <th key={m.cle} className="py-1 pr-3 font-medium">
                        {m.nom}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATEGORIES.map((c) => (
                    <tr key={c.cle}>
                      <td className="py-1 pr-3 font-semibold text-alpine">{c.nom}</td>
                      {CRENEAUX.map((m) => (
                        <td key={m.cle} className="py-1 pr-3">
                          {nombreChamp(
                            p.prix[c.cle][m.cle],
                            (v) => changer((b) => void (b.prixFixes[i].prix[c.cle][m.cle] = v)),
                            `Prix ${c.nom}, ${m.nom}`,
                            "€",
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            changer(
              (b) =>
                void b.prixFixes.push({
                  airport: "",
                  resort: "",
                  prix: { standard: momentsVides(), business: momentsVides(), premium: momentsVides() },
                }),
            )
          }
          className={`mt-3 ${BOUTON_SECONDAIRE}`}
        >
          + Ajouter un prix fixe
        </button>
      </section>

      {/* ------------------------------------------- aperçu et publication */}
      <section className={`${CARTE} border-2 border-alpes/30`}>
        <h2 className="font-display text-lg text-alpine">Voir, puis publier</h2>
        <p className="mt-1 text-sm text-alpine-600">
          {modifie
            ? "Vous avez modifié la grille. Voyez l’effet sur des trajets types avant de publier."
            : "Aucune modification pour le moment."}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={voirApercu} disabled={enCours} className={`${BOUTON_SECONDAIRE} disabled:opacity-60`}>
            {enCours && !apercuAJour ? "Calcul…" : "Voir l’aperçu avant → après"}
          </button>
          {modifie ? (
            <button
              type="button"
              onClick={() => {
                setBrouillon(initial);
                setApercu(null);
                setErreurs([]);
              }}
              className={BOUTON_SECONDAIRE}
            >
              Annuler mes modifications
            </button>
          ) : null}
        </div>

        {erreurs.length > 0 ? (
          <ul role="alert" className="mt-4 list-disc space-y-1 rounded border border-danger-300 bg-danger-50 py-3 pl-8 pr-4 text-sm text-danger-700">
            {erreurs.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        ) : null}

        {apercu && !apercuAJour ? (
          <p className="mt-4 text-sm text-attention-700">La grille a changé depuis l’aperçu : revoyez-le avant de publier.</p>
        ) : null}

        {apercuAJour && apercu ? (
          <>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-sm">
                <thead>
                  <tr className="border-b border-glacier-200 text-left text-xs uppercase tracking-wide text-alpine-600">
                    <th className="py-2 pr-3 font-medium">Trajet (2 passagers)</th>
                    <th className="py-2 pr-3 font-medium">Départ</th>
                    {CATEGORIES.map((c) => (
                      <th key={c.cle} className="py-2 pr-3 text-right font-medium">
                        {c.nom}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apercu.lignes.map((l, i) => (
                    <tr key={i} className="border-b border-glacier-100">
                      <td className="py-1.5 pr-3 text-alpine">{l.trajet}</td>
                      <td className="py-1.5 pr-3 text-alpine-600">{l.cas}</td>
                      {CATEGORIES.map((c) => {
                        const { avant, apres } = l.prix[c.cle];
                        const change = avant !== apres;
                        return (
                          <td key={c.cle} className="whitespace-nowrap py-1.5 pr-3 text-right tabular-nums">
                            {avant === null && apres === null ? (
                              "—"
                            ) : change ? (
                              <>
                                <span className="text-alpine-600 line-through">{avant ?? "—"} €</span>{" "}
                                <strong className={apres !== null && avant !== null && apres > avant ? "text-danger-700" : "text-succes-700"}>
                                  {apres ?? "—"} €
                                </strong>
                              </>
                            ) : (
                              <span className="text-alpine-700">{apres} €</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <label className={`${ETIQUETTE} min-w-[16rem] flex-1`}>
                Ce qui change, en une phrase (facultatif)
                <input value={note} maxLength={200} onChange={(e) => setNote(e.target.value)} placeholder="ex. Hausse de 5 % pour l’hiver" className={CHAMP} />
              </label>
              <button
                type="button"
                onClick={publier}
                disabled={enCours || !modifie}
                className="rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {enCours ? "Publication…" : "Publier ces tarifs"}
              </button>
            </div>
          </>
        ) : null}

        {message ? (
          <p role="status" className="mt-4 rounded border border-succes-300 bg-succes-50 px-4 py-3 text-sm text-succes-700">
            {message}
          </p>
        ) : null}
      </section>
    </>
  );
}
