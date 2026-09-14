import Link from "next/link";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { airportParSlug } from "@/lib/airports";
import { CODES_LIEUX, CONCURRENTS } from "@/lib/concurrence/lieux";
import { filtresDe, tableauConcurrence } from "@/lib/concurrence/tableau";
import { resortParSlug } from "@/lib/resorts";
import { grilleActive } from "@/lib/tarification/grilles-publiees";
import BoutonConfirmation from "../BoutonConfirmation";
import Entete from "../Entete";
import { actionAjouterTrajet, actionReleverMaintenant, actionRetirerTrajet } from "./actions";
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
  aligne: { alerte: false, texte: (n) => `Prix fixes posés sur ${n} trajet(s) et grille publiée. L’onglet Tarifs permet de revenir à la version précédente.` },
  "rien-choisi": { alerte: true, texte: () => "Cochez au moins un trajet." },
  "rien-a-aligner": { alerte: true, texte: () => "Aucun des trajets cochés n’a de prix concurrent relevé : rien n’a changé." },
  "ecart-illisible": { alerte: true, texte: () => "L’écart n’est pas lisible : écrivez un nombre d’euros, par exemple 5." },
  "grille-refusee": { alerte: true, texte: (d) => `La grille n’a pas été publiée : ${d}` },
  "releve-lance": { alerte: false, texte: () => "Relevé lancé sur les cinq premiers trajets : rechargez la page dans trois minutes. Le reste se relève cette nuit." },
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
  const { dernier, ancien, lignes } = await tableauConcurrence(await grilleActive(), filtres);
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
        <form action={actionReleverMaintenant}>
          <BoutonConfirmation
            libelle="Relever maintenant (5 trajets)"
            enCours="Lancement…"
            className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50"
          />
        </form>
      </div>

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

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
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
        tient le groupe ; « Premium » : leur haut de gamme, face à nos Business et Premium. Un prix appliqué est un
        prix fixe pour ce véhicule, le {filtres.jour === "mercredi" ? "mercredi (« semaine, jour »)" : "samedi (« week-end, jour »)"}, valable pour tous les groupes
        {ancien ? ` — tendance comparée au relevé du ${dateLisible(ancien)}` : ""}.{" "}
        <Link href="/gestion-ventes-tarifs-seo/tarifs/" className="underline">
          Voir les tarifs
        </Link>
      </p>

      <div className="mt-4">
        <TableauConcurrence lignes={lignes} filtres={filtres} />
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
