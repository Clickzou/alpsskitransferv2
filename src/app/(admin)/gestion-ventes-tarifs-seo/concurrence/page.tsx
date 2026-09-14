import Link from "next/link";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { airportParSlug } from "@/lib/airports";
import { CODES_LIEUX, CONCURRENTS } from "@/lib/concurrence/lieux";
import { planAlignement } from "@/lib/concurrence/alignement";
import { trajetsSuivis } from "@/lib/concurrence/releve";
import { avancementReleve, dernierReleve, filtresDe, tableauConcurrence } from "@/lib/concurrence/tableau";
import Rafraichir from "./Rafraichir";
import type { Creneau } from "@/lib/tarification/grille";
import { resortParSlug } from "@/lib/resorts";
import { grilleActive } from "@/lib/tarification/grilles-publiees";
import BoutonConfirmation from "../BoutonConfirmation";
import Entete from "../Entete";
import { actionAjouterTrajet, actionMettreAJourTarifs, actionReleverTout, actionRetirerTrajet } from "./actions";

const MOMENTS: Record<Creneau, string> = {
  semaineJour: "semaine, jour",
  semaineNuit: "semaine, nuit",
  weekendJour: "week-end, jour",
  weekendNuit: "week-end, nuit",
};
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

const RETOURS: Record<string, { alerte: boolean; texte: (detail: string) => string }> = {
  "tarifs-mis-a-jour": { alerte: false, texte: (n) => `Tarifs mis à jour : ${n} prix recalés et grille publiée. L’onglet Tarifs permet de revenir à la version précédente.` },
  "rien-a-changer": { alerte: false, texte: () => "Nos tarifs sont déjà à cet écart des concurrents : rien n’a changé." },
  "releve-trop-ancien": { alerte: true, texte: () => "Le dernier relevé a plus de trois jours : relancez un relevé avant de mettre à jour les tarifs." },
  "ecart-illisible": { alerte: true, texte: () => "L’écart n’est pas lisible : écrivez un nombre d’euros, par exemple 5." },
  "grille-refusee": { alerte: true, texte: (d) => `La grille n’a pas été publiée : ${d}` },
  "releve-lance": { alerte: false, texte: () => "Relevé lancé sur tous les trajets. L’avancement s’affiche ci-dessous dans une minute." },
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
  // L'aperçu du bouton : ce que « Mettre à jour » poserait, avec cet écart, sur le dernier relevé.
  const plan = releve ? planAlignement(grille, suivis, releve.lignes, ecart) : null;
  const baisses = plan?.changements.filter((c) => c.avant !== null && c.apres < c.avant) ?? [];
  const hausses = plan?.changements.filter((c) => c.avant !== null && c.apres > c.avant) ?? [];
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
    lien({ jour: filtres.jour, passagers: String(filtres.passagers), gamme: filtres.gamme, [cle]: valeur });

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
      <section className="mt-5 rounded-xl border-2 border-alpes/30 bg-white p-5 shadow-carte">
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

        <form method="get" action={ICI} className="mt-4 flex flex-wrap items-center gap-2 text-sm text-alpine">
          Nos prix à
          <input
            name="ecart"
            defaultValue={String(ecart)}
            inputMode="decimal"
            aria-label="Écart en euros"
            className="w-20 rounded border border-glacier-300 px-2 py-1.5 text-right"
          />
          € en dessous du concurrent le moins cher
          <button type="submit" className="rounded border border-glacier-300 px-3 py-1.5 font-semibold text-alpine-700 hover:bg-glacier-50">
            Voir l’effet
          </button>
        </form>

        {!plan ? (
          <p className="mt-4 text-sm text-attention-700">
            Pas de relevé récent (moins de trois jours) : lancez « Relever maintenant » ou attendez celui de cette nuit.
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm text-alpine">
              Avec {ecart} € : <strong>{plan.changements.length} prix</strong> changeraient —{" "}
              <span className="text-succes-700">{baisses.length} baisses</span>,{" "}
              <span className="text-danger-700">{hausses.length} hausses</span>
              {plan.ecartes.length ? `, ${plan.ecartes.length} écartés par un garde-fou` : ""}
              {plan.sansReference.length ? `, ${plan.sansReference.length} trajets sans prix concurrent laissés tels quels` : ""}.
            </p>
            {plan.changements.length > 0 ? (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-alpine-700 underline">Voir le détail des prix</summary>
                <div className="mt-2 max-h-96 overflow-auto rounded border border-glacier-200">
                  <table className="w-full min-w-[40rem] text-xs">
                    <thead className="sticky top-0 bg-glacier-50 text-left uppercase tracking-wide text-alpine-600">
                      <tr>
                        <th className="px-2 py-1.5 font-medium">Trajet</th>
                        <th className="px-2 py-1.5 font-medium">Véhicule</th>
                        <th className="px-2 py-1.5 font-medium">Moment</th>
                        <th className="px-2 py-1.5 text-right font-medium">Concurrent</th>
                        <th className="px-2 py-1.5 text-right font-medium">Avant → après</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ...plan.changements.map((c) => ({ ...c, raison: null as string | null })),
                        ...plan.ecartes,
                      ].map((c, i) => (
                        <tr key={i} className={`border-t border-glacier-100 ${c.raison ? "bg-attention-50" : ""}`}>
                          <td className="px-2 py-1">{c.trajet}</td>
                          <td className="px-2 py-1">{c.categorie}</td>
                          <td className="px-2 py-1">{MOMENTS[c.creneau]}</td>
                          <td className="px-2 py-1 text-right tabular-nums">{c.reference !== null ? `${Math.round(c.reference)} €` : "—"}</td>
                          <td className="px-2 py-1 text-right tabular-nums">
                            {c.avant ?? "—"} € → <strong>{c.apres} €</strong>
                            {c.raison ? <span className="block text-attention-700">non posé : {c.raison}</span> : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ) : null}
            <form action={actionMettreAJourTarifs} className="mt-4">
              <input type="hidden" name="ecart" value={String(ecart)} />
              <BoutonConfirmation
                libelle={`Mettre à jour nos tarifs (${plan.changements.length} prix)`}
                enCours="Mise à jour…"
                confirmer={`Recaler ${plan.changements.length} prix à ${ecart} € sous le concurrent le moins cher ? La grille est publiée tout de suite ; l’onglet Tarifs permet de revenir en arrière.`}
                className="rounded bg-marque px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-marque-600"
              />
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
        <span className="flex gap-2">
          {(["2", "4", "8"] as const).map((p) => (
            <Link key={p} href={avec("passagers", p)} className={puce(String(filtres.passagers) === p)}>
              {p} passagers
            </Link>
          ))}
        </span>
        <span className="flex gap-2">
          {(["standard", "premium"] as const).map((g) => (
            <Link key={g} href={avec("gamme", g)} className={puce(filtres.gamme === g)}>
              {g === "standard" ? "Standard" : "Premium"}
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
        Comparaison à 10 h, trois semaines à l’avance, par véhicule. « Standard » : l’offre la moins chère qui
        tient le groupe ; « Premium » : leur haut de gamme, face à nos Business et Premium
        {ancien ? ` — tendance comparée au relevé du ${dateLisible(ancien)}` : ""}.{" "}
        <Link href="/gestion-ventes-tarifs-seo/tarifs/" className="underline">
          Voir les tarifs
        </Link>
      </p>

      <p className="mt-4 rounded border border-glacier-200 bg-glacier-50 px-4 py-3 text-sm text-alpine">
        {dateTrajet && dernier ? (
          <>
            <strong>Prix d’un transfert le {dateLisible(dateTrajet)} à 10 h</strong>, pour {filtres.passagers}{" "}
            passagers, en gamme {filtres.gamme === "standard" ? "standard" : "premium"} — tels que les concurrents
            les affichaient le {dateLisible(dernier)}. Nos prix sont calculés pour cette même date.
          </>
        ) : (
          "Pas encore de prix relevés pour ce jour : le tableau se remplira après le prochain relevé."
        )}
      </p>

      <div className="mt-3">
        <TableauConcurrence lignes={lignes} dateCommune={dateTrajet} />
      </div>

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
