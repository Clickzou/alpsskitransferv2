import Link from "next/link";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { airportParSlug } from "@/lib/airports";
import { CODES_LIEUX, CONCURRENTS } from "@/lib/concurrence/lieux";
import { planAlignement } from "@/lib/concurrence/alignement";
import { trajetsSuivis } from "@/lib/concurrence/releve";
import { avancementSaison, DATES_SAISON, datesAVenir, tableauSaison } from "@/lib/concurrence/saison";
import {
  avancementReleve,
  dernierReleve,
  filtresDe,
  tableauConcurrence,
  VEHICULES_COMPARES,
} from "@/lib/concurrence/tableau";
import { resortParSlug } from "@/lib/resorts";
import { grilleActive } from "@/lib/tarification/grilles-publiees";
import BoutonConfirmation from "../BoutonConfirmation";
import Entete from "../Entete";
import {
  actionAjouterTrajet,
  actionMettreAJourTarifs,
  actionReleverSaison,
  actionReleverTout,
  actionRetirerTrajet,
} from "./actions";
import { BoutonAppliquer, ChampEcart } from "./ChampEcart";
import Rafraichir from "./Rafraichir";
import TableauConcurrence from "./TableauConcurrence";

/**
 * L'onglet Concurrence — demande de JC, 14 septembre 2026.
 *
 * Nos prix face à alps2alps et Alpy Transfers sur les trajets suivis, relevés
 * chaque nuit, à jour, groupe et gamme égaux. Les trajets où l'on est plus
 * cher passent en tête ; on les coche, on choisit « X € moins cher », et un
 * prix fixe se pose dans la grille.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ICI = "/gestion-ventes-tarifs-seo/concurrence/";
const NOM_CONCURRENT = Object.fromEntries(CONCURRENTS.map((c) => [c.cle, c.nom])) as Record<string, string>;

const RETOURS: Record<string, { alerte: boolean; texte: (detail: string) => string }> = {
  "tarifs-mis-a-jour": { alerte: false, texte: (n) => `Tarifs mis à jour : ${n} prix recalés et grille publiée. L’onglet Tarifs permet de revenir à la version précédente.` },
  "rien-a-changer": { alerte: false, texte: () => "Nos tarifs sont déjà à cet écart des concurrents : rien n’a changé." },
  "releve-trop-ancien": { alerte: true, texte: () => "Le dernier relevé a plus de trois jours : relancez un relevé avant de mettre à jour les tarifs." },
  "ecart-illisible": { alerte: true, texte: () => "L’écart n’est pas lisible : écrivez un nombre d’euros, par exemple 5." },
  "grille-refusee": { alerte: true, texte: (d) => `La grille n’a pas été publiée : ${d}` },
  "releve-lance": { alerte: false, texte: () => "Relevé lancé sur tous les trajets. L’avancement s’affiche ci-dessous dans une minute." },
  "saison-lance": { alerte: false, texte: () => "Relevé de haute saison lancé : environ deux heures, en arrière-plan. Vous pouvez quitter la page." },
  "releve-deja-en-cours": { alerte: true, texte: () => "Un relevé tourne déjà : attendez qu’il se termine." },
  "trajet-ajoute": { alerte: false, texte: () => "Trajet ajouté : il sera relevé cette nuit." },
  "trajet-retire": { alerte: false, texte: () => "Trajet retiré de la liste suivie." },
  "trajet-inconnu": { alerte: true, texte: () => "Ce lieu n’est pas connu des concurrents : impossible de le relever." },
  echec: { alerte: true, texte: () => "L’enregistrement a échoué. Réessayez dans un instant." },
};

const lien = (params: Record<string, string>) => `${ICI}?${new URLSearchParams(params)}`;
const dateLisible = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export default async function PageConcurrence({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const params = await searchParams;
  const filtres = filtresDe(params);
  const ecartBrut = Number(String(params.ecart ?? "5").replace(",", "."));
  const ecart = Number.isFinite(ecartBrut) ? ecartBrut : 5;
  const grille = await grilleActive();
  const [{ dernier, ancien, lignes, dateTrajet }, releve, suivis] = await Promise.all([
    tableauConcurrence(grille, filtres),
    dernierReleve(),
    trajetsSuivis(),
  ]);
  const avancement = await avancementReleve(suivis.length);

  // La haute saison : une date fixe choisie, et le véhicule comparé.
  const aVenir = datesAVenir();
  const choixSaison = aVenir.find((d) => d.date === params.saison) ?? aVenir[0] ?? DATES_SAISON[DATES_SAISON.length - 1];
  const vehiculeSaison = VEHICULES_COMPARES.find((v) => v.cle === params.vs)?.cle ?? "standard";
  const [saison, avancementHaute] = await Promise.all([
    tableauSaison(grille, choixSaison.date, vehiculeSaison),
    avancementSaison(suivis.length),
  ]);
  const lienSaison = (date: string, vs: string) =>
    `${lien({ jour: filtres.jour, passagers: String(filtres.passagers), vehicule: filtres.vehicule, saison: date, vs })}#saison`;
  // L'aperçu du bouton : ce que « Mettre à jour » poserait, avec cet écart, sur le dernier relevé.
  const plan = releve ? planAlignement(grille, suivis, releve.lignes, ecart) : null;
  // L'aperçu lisible : par trajet, le prix « semaine, jour » de chaque véhicule, avant → après.
  const propositions = plan
    ? [...plan.changements.map((c) => ({ ...c, raison: null as string | null })), ...plan.ecartes]
    : [];
  const lignesApercu = suivis.map(({ airport, resort }) => {
    const trajet = `${airportParSlug(airport)?.name ?? airport} → ${resortParSlug(resort)?.name ?? resort}`;
    const pour = (categorie: string) =>
      propositions.find(
        (c) => c.airport === airport && c.resort === resort && c.categorie === categorie && c.creneau === "semaineJour",
      ) ?? null;
    return {
      cle: `${airport}|${resort}`,
      trajet,
      sansConcurrent: plan?.sansReference.includes(trajet) ?? false,
      parVehicule: { standard: pour("standard"), business: pour("business"), premium: pour("premium") } as Record<
        string,
        (typeof propositions)[number] | null
      >,
    };
  });
  const standards = lignesApercu.map((l) => l.parVehicule.standard);
  const apercu = {
    lignes: lignesApercu,
    baisses: standards.filter((c) => c && !c.raison && c.avant !== null && c.apres < c.avant).length,
    hausses: standards.filter((c) => c && !c.raison && c.avant !== null && c.apres > c.avant).length,
    sansConcurrent: lignesApercu.filter((l) => l.sansConcurrent).length,
    inchanges: lignesApercu.filter((l) => !l.sansConcurrent && !l.parVehicule.standard).length,
  };
  const retour = typeof params.fait === "string" ? RETOURS[params.fait] : undefined;
  const detail = typeof params.detail === "string" ? params.detail : "";

  const comparees = lignes.filter((l) => l.ecart !== null);
  const moinsChers = comparees.filter((l) => l.ecart! <= 0).length;
  const ecartMoyen = comparees.length ? comparees.reduce((s, l) => s + l.ecart!, 0) / comparees.length : null;
  const nomLieu = (slug: string) => airportParSlug(slug)?.name ?? resortParSlug(slug)?.name ?? slug;
  const aeroports = Object.keys(CODES_LIEUX).filter((s) => s.endsWith("-airport"));
  const stations = Object.keys(CODES_LIEUX).filter((s) => !s.endsWith("-airport"));

  const puce = (actif: boolean) =>
    `rounded-full border px-3 py-1 text-sm ${actif ? "border-alpine bg-alpine text-white" : "border-glacier-300 text-alpine-700 hover:bg-glacier-50"}`;
  const avec = (cle: string, valeur: string) =>
    lien({ jour: filtres.jour, passagers: String(filtres.passagers), vehicule: filtres.vehicule, [cle]: valeur });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Entete email={utilisateur.email} actif="concurrence" />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-alpine">Concurrence</h1>
          <p className="mt-1 text-sm text-alpine-600">
            {dernier
              ? `Prix relevés la nuit du ${dateLisible(dernier)} chez ${CONCURRENTS.map((c) => c.nom).join(" et ")}. Nos prix sont ceux de la grille en vigueur.`
              : "Aucun relevé pour le moment : le premier a lieu cette nuit."}
          </p>
        </div>
        {avancement.enCours ? null : (
          <form action={actionReleverTout}>
            <BoutonConfirmation
              libelle="Relever tous les trajets maintenant"
              enCours="Lancement…"
              confirmer={`Relever les ${avancement.total} trajets maintenant ? Environ ${Math.ceil(avancement.total / 5) * 3} minutes, en arrière-plan : vous pouvez quitter la page.`}
              className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50"
            />
          </form>
        )}
      </div>

      {avancement.enCours ? (
        <div className="mt-4 rounded border border-alpes/40 bg-alpes-50/60 px-4 py-3 text-sm text-alpine">
          <Rafraichir />
          <p className="font-semibold">
            Relevé en cours : {avancement.faits} / {avancement.total} trajets — encore environ{" "}
            {Math.max(1, Math.ceil((avancement.total - avancement.faits) / 5) * 3)} minutes.
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-glacier-200">
            <div
              className="h-full rounded-full bg-alpes transition-all"
              style={{ width: `${Math.round((avancement.faits / Math.max(1, avancement.total)) * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-alpine-600">
            La page se met à jour toute seule. Attendez la fin avant de mettre à jour les tarifs.
          </p>
        </div>
      ) : null}

      {retour ? (
        <p
          role="status"
          className={`mt-4 rounded border px-4 py-3 text-sm ${
            retour.alerte ? "border-attention-300 bg-attention-50 text-attention-700" : "border-succes-300 bg-succes-50 text-succes-700"
          }`}
        >
          {retour.texte(detail)}
        </p>
      ) : null}

      {/* ------------------------------------------ le bouton unique */}
      <section id="apercu" className="mt-5 scroll-mt-6 rounded-xl border-2 border-alpes/30 bg-white p-5 shadow-carte">
        <h2 className="font-display text-lg text-alpine">Mettre à jour tous nos tarifs</h2>
        <ul className="mt-2 max-w-3xl space-y-1 text-sm leading-relaxed text-alpine-700">
          <li>
            <strong className="text-alpine">Si l’on est plus cher</strong> que le concurrent le moins cher : notre
            prix <strong>baisse</strong> jusqu’à l’écart choisi en dessous de lui.
          </li>
          <li>
            <strong className="text-alpine">Si l’on est moins cher</strong> de plus que cet écart : notre prix{" "}
            <strong>remonte</strong> jusqu’à l’écart choisi en dessous de lui — on reste le moins cher, sans
            laisser d’argent sur la table.
          </li>
          <li className="text-alpine-600">
            Pour tous les trajets suivis, tous les véhicules, semaine et week-end (dimanche compris), jour et nuit.
            Référence : un groupe de 4 passagers. La nuit garde le même prix que le jour, sans majoration, comme
            chez les concurrents. Une baisse de plus de moitié ou un prix doublé n’est jamais posé.
          </li>
        </ul>

        {/*
          L'aperçu — revue de JC, 14 septembre 2026 : « 494 prix changeraient »
          ne se lisait pas. Il se lit maintenant trajet par trajet, en semaine
          et de jour, le prix d'aujourd'hui → celui d'après pour chaque
          véhicule ; le week-end et la nuit suivent la même règle.
        */}
        <ChampEcart ecart={ecart} />

        {!plan ? (
          <p className="mt-4 text-sm text-attention-700">
            Pas de relevé récent (moins de trois jours) : lancez « Relever tous les trajets maintenant » ou attendez
            celui de cette nuit.
          </p>
        ) : (
          <>
            {/* Le résumé en premier, en gros — revue de JC, 14 septembre 2026. */}
            <p className="mt-5 text-sm font-semibold text-alpine">
              Si vous appliquez « {ecart} € en dessous du concurrent le moins cher », sur les {apercu.lignes.length}{" "}
              trajets suivis (Standard, en semaine) :
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-succes-300 bg-succes-50 p-4">
                <p className="font-display text-3xl tabular-nums text-succes-700">{apercu.baisses}</p>
                <p className="text-sm text-succes-700">trajets baissent</p>
              </div>
              <div className="rounded-lg border border-danger-300 bg-danger-50 p-4">
                <p className="font-display text-3xl tabular-nums text-danger-700">{apercu.hausses}</p>
                <p className="text-sm text-danger-700">trajets montent</p>
              </div>
              <div className="rounded-lg border border-glacier-200 bg-glacier-50 p-4">
                <p className="font-display text-3xl tabular-nums text-alpine">{apercu.inchanges}</p>
                <p className="text-sm text-alpine-700">déjà au bon prix</p>
              </div>
              <div className="rounded-lg border border-glacier-200 bg-glacier-50 p-4">
                <p className="font-display text-3xl tabular-nums text-alpine-600">{apercu.sansConcurrent}</p>
                <p className="text-sm text-alpine-600">sans prix concurrent, ne bougent pas</p>
              </div>
            </div>
            {plan.ecartes.length ? (
              <p className="mt-2 text-xs text-attention-700">
                {plan.ecartes.length} prix ne seront pas posés : l’écart avec le prix actuel est trop grand (baisse de
                plus de moitié ou prix doublé) — ils sont barrés dans le tableau.
              </p>
            ) : null}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-alpine-700 underline underline-offset-2">
                Voir les nouveaux tarifs
              </summary>
            <div className="mt-3 max-h-[28rem] overflow-auto rounded border border-glacier-200">
              <table className="w-full min-w-[44rem] text-sm">
                <thead className="sticky top-0 bg-glacier-50 text-left text-xs uppercase tracking-wide text-alpine-600">
                  <tr>
                    <th className="px-3 py-2 font-medium">Trajet (semaine, jour)</th>
                    {VEHICULES_COMPARES.map((v) => (
                      <th key={v.cle} className="px-3 py-2 text-right font-medium">
                        {v.nom} : aujourd’hui → après
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {apercu.lignes.map((l) => (
                    <tr key={l.cle} className="border-t border-glacier-100">
                      <td className="px-3 py-1.5 text-alpine">{l.trajet}</td>
                      {VEHICULES_COMPARES.map((v) => {
                        const c = l.parVehicule[v.cle];
                        if (!c) {
                          return (
                            <td key={v.cle} className="px-3 py-1.5 text-right text-xs text-alpine-500">
                              {l.sansConcurrent ? "pas de prix concurrent" : "inchangé"}
                            </td>
                          );
                        }
                        const baisse = c.avant !== null && c.apres < c.avant;
                        return (
                          <td
                            key={v.cle}
                            className="px-3 py-1.5 text-right tabular-nums"
                          >
                            <span className="text-alpine-600">{c.avant ?? "—"} €</span> →{" "}
                            <strong className={c.raison ? "text-attention-700 line-through" : baisse ? "text-succes-700" : "text-danger-700"}>
                              {c.apres} €
                            </strong>
                            {c.reference !== null && c.concurrent ? (
                              <span className="block text-xs text-alpine-600">
                                {NOM_CONCURRENT[c.concurrent]} {Math.round(c.reference)} €
                              </span>
                            ) : null}
                            {c.raison ? <span className="block text-xs text-attention-700">non posé : {c.raison}</span> : null}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-alpine-600">
              En vert, le prix baisse ; en rouge, il monte. Sous chaque prix, le concurrent le moins cher qui sert de
              référence. Le week-end et la nuit suivent la même règle.
            </p>
            </details>
            {/* Le champ d'écart, plus haut, appartient à ce formulaire (attribut `form`). */}
            <form id="appliquer-tarifs" action={actionMettreAJourTarifs} className="mt-4">
              <BoutonAppliquer ecart={ecart} />
            </form>
          </>
        )}
      </section>

      <h2 className="mt-8 font-display text-lg text-alpine">Où l’on se situe</h2>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex gap-2">
          {(["mercredi", "samedi"] as const).map((j) => (
            <Link key={j} href={avec("jour", j)} className={puce(filtres.jour === j)}>
              {j === "mercredi" ? "Mercredi" : "Samedi"}
            </Link>
          ))}
        </span>
        <span className="flex flex-wrap gap-2">
          {VEHICULES_COMPARES.map((v) => (
            <Link
              key={v.cle}
              // Huit passagers n'entrent pas dans un Business ni un Premium : on retombe sur quatre.
              href={lien({
                jour: filtres.jour,
                passagers: v.places < filtres.passagers ? "4" : String(filtres.passagers),
                vehicule: v.cle,
              })}
              className={puce(filtres.vehicule === v.cle)}
            >
              {v.nom} ({v.places} places)
            </Link>
          ))}
        </span>
        <span className="flex gap-2">
          {(filtres.vehicule === "standard" ? (["2", "4", "8"] as const) : (["2", "4"] as const)).map((p) => (
            <Link key={p} href={avec("passagers", p)} className={puce(String(filtres.passagers) === p)}>
              {p} passagers
            </Link>
          ))}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-glacier-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-alpine-600">Trajets comparés</p>
          <p className="mt-1 font-display text-2xl text-alpine">
            {comparees.length} <span className="text-base text-alpine-600">/ {lignes.length}</span>
          </p>
        </div>
        <div className="rounded-lg border border-glacier-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-alpine-600">Où l’on est moins cher</p>
          <p className="mt-1 font-display text-2xl text-alpine">
            {comparees.length ? `${Math.round((moinsChers / comparees.length) * 100)} %` : "—"}
          </p>
        </div>
        <div className="rounded-lg border border-glacier-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-alpine-600">Écart moyen avec le moins cher</p>
          <p className={`mt-1 font-display text-2xl ${ecartMoyen !== null && ecartMoyen > 0 ? "text-danger-700" : "text-succes-700"}`}>
            {ecartMoyen === null ? "—" : `${ecartMoyen > 0 ? "+" : "−"}${Math.abs(Math.round(ecartMoyen))} €`}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-alpine-600">
        Comparaison à 10 h, trois semaines à l’avance, par véhicule. Notre Standard face à leur offre la moins
        chère qui tient le groupe ; nos Business et Premium face à leur haut de gamme (minivan premium chez
        alps2alps, Mercedes chez Alpy)
        {ancien ? ` — tendance comparée au relevé du ${dateLisible(ancien)}` : ""}.{" "}
        <Link href="/gestion-ventes-tarifs-seo/tarifs/" className="underline">
          Voir les tarifs
        </Link>
      </p>

      <p className="mt-4 rounded border border-glacier-200 bg-glacier-50 px-4 py-3 text-sm text-alpine">
        {dateTrajet && dernier ? (
          <>
            <strong>Prix d’un transfert le {dateLisible(dateTrajet)} à 10 h</strong>, pour {filtres.passagers}{" "}
            passagers, notre {VEHICULES_COMPARES.find((v) => v.cle === filtres.vehicule)?.nom} face à leur{" "}
            {filtres.gamme === "standard" ? "offre standard" : "haut de gamme"} — tels que les concurrents
            les affichaient le {dateLisible(dernier)}. Nos prix sont calculés pour cette même date.
          </>
        ) : (
          "Pas encore de prix relevés pour ce jour : le tableau se remplira après le prochain relevé."
        )}
      </p>

      <div className="mt-3">
        <TableauConcurrence lignes={lignes} dateCommune={dateTrajet} />
      </div>

      {/* ------------------------------------------ la haute saison (JC, 15 septembre 2026) */}
      <section id="saison" className="mt-10 scroll-mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-lg text-alpine">Haute saison : les dates qui comptent</h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-alpine-600">
              Les mêmes samedis de vacances relevés tous les 15 jours (le 1er et le 15 du mois), pour 4 passagers :
              on voit les concurrents faire monter leurs prix à l’approche des vacances. Ces prix ne changent pas nos
              tarifs automatiquement.
              {saison.dernier ? ` Dernier relevé : ${dateLisible(saison.dernier)}` : " Pas encore de relevé pour cette date"}
              {saison.precedent ? `, comparé à celui du ${dateLisible(saison.precedent)}.` : "."}
            </p>
          </div>
          {avancementHaute.enCours ? null : (
            <form action={actionReleverSaison}>
              <BoutonConfirmation
                libelle="Relever la haute saison maintenant"
                enCours="Lancement…"
                confirmer={`Relever les ${aVenir.length} dates de haute saison sur les ${avancementHaute.total} trajets ? Environ deux heures, en arrière-plan : vous pouvez quitter la page.`}
                className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50"
              />
            </form>
          )}
        </div>

        {avancementHaute.enCours ? (
          <div className="mt-3 rounded border border-alpes/40 bg-alpes-50/60 px-4 py-3 text-sm text-alpine">
            <p className="font-semibold">
              Relevé de haute saison en cours : {avancementHaute.faits} / {avancementHaute.total} trajets.
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-glacier-200">
              <div
                className="h-full rounded-full bg-alpes"
                style={{ width: `${Math.round((avancementHaute.faits / Math.max(1, avancementHaute.total)) * 100)}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap gap-2">
          {aVenir.map((d) => (
            <Link key={d.date} href={lienSaison(d.date, vehiculeSaison)} className={puce(d.date === choixSaison.date)}>
              <span className="font-semibold">{d.periode}</span> · {d.libelle}
            </Link>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {VEHICULES_COMPARES.map((v) => (
            <Link key={v.cle} href={lienSaison(choixSaison.date, v.cle)} className={puce(vehiculeSaison === v.cle)}>
              {v.nom}
            </Link>
          ))}
        </div>

        <p className="mt-3 text-sm text-alpine">
          <strong>
            {choixSaison.periode} — transfert le {dateLisible(choixSaison.date)} à 10 h
          </strong>
          , 4 passagers, notre {VEHICULES_COMPARES.find((v) => v.cle === vehiculeSaison)?.nom}. La dernière colonne
          dit de combien le moins cher des concurrents a bougé depuis le relevé précédent.
        </p>
        <div className="mt-3">
          <TableauConcurrence
            lignes={saison.lignes}
            dateCommune={choixSaison.date}
            libelleTendance="Depuis le relevé précédent"
          />
        </div>
      </section>

      <section id="trajets" className="mt-8 rounded-xl border border-glacier-200 bg-white p-5 shadow-carte">
        <h2 className="font-display text-lg text-alpine">Trajets suivis ({lignes.length})</h2>
        <form action={actionAjouterTrajet} className="mt-3 flex flex-wrap items-end gap-2">
          <label className="text-xs font-medium uppercase tracking-wide text-alpine-600">
            Aéroport
            <select name="airport" required className="mt-1 block rounded border border-glacier-300 px-2 py-1.5 text-sm normal-case text-alpine">
              {aeroports.map((s) => (
                <option key={s} value={s}>
                  {nomLieu(s)}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-medium uppercase tracking-wide text-alpine-600">
            Station
            <select name="resort" required className="mt-1 block rounded border border-glacier-300 px-2 py-1.5 text-sm normal-case text-alpine">
              {stations.map((s) => (
                <option key={s} value={s}>
                  {nomLieu(s)}
                </option>
              ))}
            </select>
          </label>
          <BoutonConfirmation libelle="+ Ajouter" className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50" />
        </form>
        <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {lignes
            .slice()
            .sort((a, b) => a.trajet.localeCompare(b.trajet, "fr"))
            .map((l) => (
              <li key={`${l.airport}|${l.resort}`} className="flex items-center justify-between gap-2 border-b border-glacier-100 py-1">
                <span className="text-alpine">{l.trajet}</span>
                <form action={actionRetirerTrajet}>
                  <input type="hidden" name="airport" value={l.airport} />
                  <input type="hidden" name="resort" value={l.resort} />
                  <BoutonConfirmation libelle="Retirer" enCours="…" className="text-xs text-alpine-600 underline" />
                </form>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
