import Link from "next/link";
import { redirect } from "next/navigation";
import { coursesDeLaPeriode } from "@/lib/admin/courses";
import {
  aujourdhui,
  jourLisible,
  jourValide,
  parJour,
  periode,
  trajetsDe,
  type Trajet,
  type Vue,
} from "@/lib/admin/planning";
import { utilisateurCourant } from "@/lib/admin/session";
import { cheminFiche } from "@/lib/reservation/demandes";
import { lire, supabaseConfigure } from "@/lib/reservation/supabase";
import Entete from "../Entete";
import { actionPlanning } from "./actions";

/**
 * L'onglet Planning — demande de JC, 15 septembre 2026.
 *
 * Trois vues, comme un agenda : le jour pour préparer la tournée, la semaine
 * pour répartir les chauffeurs, le mois pour voir venir. Chaque trajet porte
 * son chauffeur et une note interne, qui se saisissent sur place : ouvrir la
 * carte, écrire, enregistrer. Un trajet sans chauffeur se voit en orange.
 *
 * Tout vit dans l'URL (`vue`, `jour`, `chauffeur`) : la semaine prochaine se
 * garde en favori et s'envoie à un chauffeur par message.
 */

export const dynamic = "force-dynamic";

const BASE = "/gestion-ventes-tarifs-seo/planning/";
const SANS = "__sans__";

const MESSAGES: Record<string, { texte: string; ton: "ok" | "erreur" }> = {
  enregistre: { texte: "Enregistré.", ton: "ok" },
  inchange: { texte: "Rien n’avait changé.", ton: "ok" },
  echec: { texte: "L’enregistrement a échoué — réessayez, ou prévenez Clickzou.", ton: "erreur" },
  introuvable: { texte: "Réservation introuvable.", ton: "erreur" },
  migration: {
    texte:
      "Le planning ne peut pas encore enregistrer : la migration docs/supabase-migration-planning.sql reste à passer dans Supabase.",
    ton: "erreur",
  },
};

function url(params: { vue: Vue; jour: string; chauffeur?: string | null }): string {
  const p = new URLSearchParams({ vue: params.vue, jour: params.jour });
  if (params.chauffeur) p.set("chauffeur", params.chauffeur);
  return `${BASE}?${p}`;
}

/** Les noms déjà inscrits, sur toute la base : c'est la liste que la saisie propose. */
async function chauffeursInscrits(): Promise<{ noms: string[]; migrationFaite: boolean }> {
  const lignes = await lire<{ chauffeur: string | null; chauffeur_retour: string | null }>("reservations", {
    colonnes: "chauffeur,chauffeur_retour",
    parametres: { or: "(chauffeur.not.is.null,chauffeur_retour.not.is.null)" },
    limite: 1000,
  });
  // Une lecture refusée rend une liste vide : on vérifie que la colonne existe vraiment.
  const sonde = lignes.length
    ? true
    : (await lire<{ chauffeur: string | null }>("reservations", { colonnes: "chauffeur", limite: 1 })).length > 0 ||
      (await lire<{ reference: string }>("reservations", { colonnes: "reference", limite: 1 })).length === 0;
  const noms = new Map<string, string>();
  for (const l of lignes) {
    for (const n of [l.chauffeur, l.chauffeur_retour]) if (n?.trim()) noms.set(n.trim().toLowerCase(), n.trim());
  }
  return { noms: [...noms.values()].sort((a, b) => a.localeCompare(b, "fr")), migrationFaite: sonde };
}

function Pastille({ t }: { t: Trajet }) {
  return t.chauffeur ? (
    <span className="inline-block max-w-full truncate rounded-full bg-succes-50 px-2 py-0.5 text-xs font-semibold text-succes-700">
      {t.chauffeur}
    </span>
  ) : (
    <span className="inline-block rounded-full bg-attention-50 px-2 py-0.5 text-xs font-semibold text-attention-700">
      Sans chauffeur
    </span>
  );
}

/** Un trajet, et sous lui le formulaire du chauffeur et de la note. */
function CarteTrajet({ t, retour, large = false }: { t: Trajet; retour: string; large?: boolean }) {
  /*
    Dans la vue Jour, les cartes s'ouvrent d'office : on y arrive depuis le
    mois en cliquant un trajet, pour le préparer — le formulaire doit être là
    (JC, 15 septembre 2026). Dans la semaine, sept colonnes ouvertes seraient
    illisibles : elles restent repliées.
  */
  return (
    <details id={t.cle} open={large} className="group scroll-mt-24 rounded-lg border border-glacier-200 bg-white text-sm shadow-sm open:ring-2 open:ring-marque/30">
      <summary className="cursor-pointer list-none space-y-1 p-2.5 hover:bg-glacier-50 [&::-webkit-details-marker]:hidden">
        <p className="flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="font-semibold tabular-nums text-alpine">{t.heure}</span>
          <span className="text-[11px] uppercase tracking-wide text-alpine-600">{t.sens}</span>
        </p>
        <p className={`font-medium leading-snug text-alpine ${large ? "" : "break-words"}`}>{t.trajet}</p>
        <p className="text-xs leading-snug text-alpine-600">
          {t.client} · {t.passagers} pers. · {t.vehicule}
        </p>
        <Pastille t={t} />
        {t.note ? <p className="whitespace-pre-line text-xs italic leading-snug text-alpine-700">{t.note}</p> : null}
      </summary>

      <div className="space-y-2 border-t border-glacier-200 p-2.5">
        <dl className="space-y-1 text-xs text-alpine-700">
          <div>
            <dt className="inline text-alpine-600">Adresse : </dt>
            <dd className={`inline ${t.adresseManquante ? "font-semibold text-danger" : ""}`}>{t.adresse}</dd>
          </div>
          <div>
            <dt className="inline text-alpine-600">Vol : </dt>
            <dd className="inline">{t.vol}</dd>
          </div>
          <div>
            <dt className="inline text-alpine-600">Client : </dt>
            <dd className="inline">
              <a href={`tel:${t.telephone}`} className="underline underline-offset-2">
                {t.telephone}
              </a>
            </dd>
          </div>
        </dl>

        <form action={actionPlanning} className="space-y-2">
          <input type="hidden" name="reference" value={t.reference} />
          <input type="hidden" name="sens" value={t.sens} />
          <input type="hidden" name="retour" value={retour} />
          <label className="block text-xs font-medium uppercase tracking-wide text-alpine-600">
            Chauffeur
            <input
              name="chauffeur"
              defaultValue={t.chauffeur ?? ""}
              list="chauffeurs-connus"
              maxLength={60}
              autoComplete="off"
              className="mt-1 w-full rounded border border-glacier-300 bg-white px-2 py-1.5 text-sm normal-case tracking-normal text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
            />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wide text-alpine-600">
            Note
            <textarea
              name="note"
              defaultValue={t.note ?? ""}
              rows={2}
              maxLength={500}
              className="mt-1 w-full rounded border border-glacier-300 bg-white px-2 py-1.5 text-sm normal-case tracking-normal text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="submit"
              className="rounded bg-marque px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-marque-600"
            >
              Enregistrer
            </button>
            <Link href={cheminFiche(t.reference)} className="text-xs text-alpine-700 underline underline-offset-2">
              Fiche {t.reference}
            </Link>
          </div>
        </form>
      </div>
    </details>
  );
}

export default async function PagePlanning({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const params = await searchParams;
  const vue: Vue = params.vue === "jour" || params.vue === "mois" ? params.vue : "semaine";
  const jour = jourValide(params.jour);
  const filtre = typeof params.chauffeur === "string" && params.chauffeur ? params.chauffeur : null;
  const message = typeof params.fait === "string" ? MESSAGES[params.fait] : undefined;

  const p = periode(vue, jour);
  const [courses, { noms, migrationFaite }] = await Promise.all([
    coursesDeLaPeriode(p.debut, p.fin),
    chauffeursInscrits(),
  ]);
  const tous = trajetsDe(courses, p.debut, p.fin);
  const trajets = !filtre
    ? tous
    : tous.filter((t) => (filtre === SANS ? !t.chauffeur : t.chauffeur?.toLowerCase() === filtre.toLowerCase()));
  const jours = parJour(trajets);
  const sansChauffeur = tous.filter((t) => !t.chauffeur).length;
  const ici = url({ vue, jour, chauffeur: filtre });
  const auj = aujourdhui();

  const puce = (actif: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition ${
      actif ? "border-marque bg-marque/5 font-semibold text-marque" : "border-glacier-300 text-alpine-700 hover:border-alpine/40"
    }`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Entete email={utilisateur.email} actif="planning" />
      <h1 className="sr-only">Planning</h1>

      <datalist id="chauffeurs-connus">
        {noms.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      {!supabaseConfigure() || !migrationFaite ? (
        <p className="mt-6 rounded border border-attention-300 bg-attention-50 px-4 py-3 text-sm leading-relaxed text-attention-700">
          {MESSAGES.migration.texte}
        </p>
      ) : null}
      {message ? (
        <p
          role="status"
          className={`mt-6 rounded border px-4 py-3 text-sm ${
            message.ton === "ok"
              ? "border-succes-300 bg-succes-50 text-succes-700"
              : "border-danger-300 bg-danger-50 text-danger-700"
          }`}
        >
          {message.texte}
        </p>
      ) : null}

      {/* La barre : la vue, la période, et qui conduit. */}
      <section className="mt-6 space-y-4 rounded-xl border border-glacier-200 bg-white p-4 shadow-carte">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={url({ vue, jour: p.precedent, chauffeur: filtre })} aria-label="Période précédente" className="rounded border border-glacier-300 px-3 py-1.5 text-alpine hover:bg-glacier-50">
              ←
            </Link>
            <Link href={url({ vue, jour: auj, chauffeur: filtre })} className="rounded border border-glacier-300 px-3 py-1.5 text-sm text-alpine hover:bg-glacier-50">
              Aujourd’hui
            </Link>
            <Link href={url({ vue, jour: p.suivant, chauffeur: filtre })} aria-label="Période suivante" className="rounded border border-glacier-300 px-3 py-1.5 text-alpine hover:bg-glacier-50">
              →
            </Link>
            <h2 className="ml-2 font-display text-xl text-alpine">{p.titre}</h2>
          </div>
          <div className="flex gap-2">
            {(["jour", "semaine", "mois"] as const).map((v) => (
              <Link key={v} href={url({ vue: v, jour, chauffeur: filtre })} aria-current={v === vue ? "page" : undefined} className={puce(v === vue)}>
                {v === "jour" ? "Jour" : v === "semaine" ? "Semaine" : "Mois"}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-alpine-600">Chauffeur</span>
          <Link href={url({ vue, jour })} className={puce(!filtre)}>
            Tous
          </Link>
          <Link href={url({ vue, jour, chauffeur: SANS })} className={puce(filtre === SANS)}>
            Sans chauffeur
          </Link>
          {noms.map((n) => (
            <Link key={n} href={url({ vue, jour, chauffeur: n })} className={puce(filtre?.toLowerCase() === n.toLowerCase())}>
              {n}
            </Link>
          ))}
          <span className="ml-auto text-sm text-alpine-600">
            {tous.length} trajet{tous.length > 1 ? "s" : ""}
            {sansChauffeur > 0 ? (
              <strong className="text-attention-700"> · {sansChauffeur} sans chauffeur</strong>
            ) : null}
          </span>
        </div>
      </section>

      {vue === "mois" ? (
        <section className="mt-6 overflow-x-auto">
          <div className="grid min-w-[56rem] grid-cols-7 overflow-hidden rounded-xl border border-glacier-200 bg-glacier-200 [gap:1px]">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((j) => (
              <div key={j} className="bg-glacier-50 px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-alpine-600">
                {j}
              </div>
            ))}
            {p.jours.map((j) => {
              const liste = jours.get(j) ?? [];
              const horsMois = j.slice(0, 7) !== jour.slice(0, 7);
              return (
                <div key={j} className={`min-h-[7.5rem] p-1.5 ${horsMois ? "bg-glacier-50" : "bg-white"}`}>
                  <Link
                    href={url({ vue: "jour", jour: j, chauffeur: filtre })}
                    className={`inline-block rounded px-1 text-xs font-semibold ${
                      j === auj ? "bg-marque text-white" : horsMois ? "text-alpine-600/60" : "text-alpine"
                    }`}
                  >
                    {Number(j.slice(8))}
                  </Link>
                  <ul className="mt-1 space-y-1">
                    {liste.map((t) => (
                      <li key={t.cle}>
                        <Link
                          href={`${url({ vue: "jour", jour: j, chauffeur: filtre })}#${t.cle}`}
                          className={`block truncate rounded px-1 py-0.5 text-[11px] leading-tight ${
                            t.chauffeur ? "bg-succes-50 text-succes-700" : "bg-attention-50 text-attention-700"
                          }`}
                          title={`${t.heure} ${t.trajet} — ${t.chauffeur ?? "sans chauffeur"}`}
                        >
                          <span className="font-semibold tabular-nums">{t.heure}</span> {t.trajet}
                          {t.chauffeur ? ` · ${t.chauffeur}` : ""}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      ) : vue === "semaine" ? (
        <section className="mt-6 grid gap-3 lg:grid-cols-7">
          {p.jours.map((j) => {
            const liste = jours.get(j) ?? [];
            return (
              <div key={j} className={`rounded-xl border p-2 ${j === auj ? "border-marque/50 bg-marque/5" : "border-glacier-200 bg-glacier-50"}`}>
                <Link href={url({ vue: "jour", jour: j, chauffeur: filtre })} className="block px-1 pb-2 text-sm font-semibold capitalize text-alpine hover:underline">
                  {jourLisible(j)}
                </Link>
                {liste.length === 0 ? (
                  <p className="px-1 pb-1 text-xs text-alpine-600">—</p>
                ) : (
                  <div className="space-y-2">
                    {liste.map((t) => (
                      <CarteTrajet key={t.cle} t={t} retour={ici} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ) : (
        <section className="mt-6">
          {trajets.length === 0 ? (
            <p className="rounded-xl border border-glacier-200 bg-white px-4 py-8 text-center text-sm text-alpine-600">
              Aucun trajet ce jour-là.
            </p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {trajets.map((t) => (
                <CarteTrajet key={t.cle} t={t} retour={ici} large />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
