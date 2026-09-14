import Link from "next/link";
import { redirect } from "next/navigation";
import { euros, heure } from "@/lib/admin/affichage";
import { utilisateurCourant } from "@/lib/admin/session";
import { compteService } from "@/lib/google/acces";
import { proprieteAnalytics, proprieteSearchConsole, statsSeo } from "@/lib/google/stats-seo";
import { indexationOuverte } from "@/lib/indexation";
import { lire } from "@/lib/reservation/supabase";
import Entete from "../Entete";

/**
 * L'onglet Stats SEO — demande de JC, 14 septembre 2026.
 *
 * Trois questions, dans l'ordre où on se les pose : Google montre-t-il le site
 * (Search Console) ? les visiteurs restent-ils (Analytics) ? est-ce que ça vend
 * (les réservations du site, lues en base) ? La troisième est la seule qui ne
 * dépend d'aucun branchement, et c'est elle qui tranche.
 *
 * Tant que Google n'est pas branché, l'écran dit quoi faire, pas « erreur ».
 */
export const dynamic = "force-dynamic";

const ICI = "/gestion-ventes-tarifs-seo/seo/";

const entier = (n: number) => new Intl.NumberFormat("fr-FR").format(Math.round(n));
const pourcent = (n: number, decimales = 1) =>
  `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: decimales }).format(n * 100)} %`;
const date = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });

function Evolution({ avant, apres, inverse = false }: { avant: number; apres: number; inverse?: boolean }) {
  if (!avant) return null;
  const ecart = (apres - avant) / avant;
  const bon = inverse ? ecart < 0 : ecart > 0;
  if (Math.abs(ecart) < 0.005) return <span className="text-xs text-alpine-600">stable</span>;
  return (
    <span className={`text-xs font-semibold ${bon ? "text-succes-700" : "text-danger-700"}`}>
      {ecart > 0 ? "+" : "−"}
      {pourcent(Math.abs(ecart), 0)} vs 28 jours d’avant
    </span>
  );
}

function Tuile({ libelle, valeur, children }: { libelle: string; valeur: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-glacier-200 bg-glacier-50 p-4">
      <p className="text-xs uppercase tracking-wide text-alpine-600">{libelle}</p>
      <p className="mt-1 font-display text-2xl tabular-nums text-alpine">{valeur}</p>
      <div className="mt-1 min-h-4">{children}</div>
    </div>
  );
}

const CARTE = "mt-6 rounded-xl border border-glacier-200 bg-white p-5 shadow-carte";
const TH = "py-2 pr-3 text-left text-xs font-medium uppercase tracking-wide text-alpine-600";
const TD = "py-1.5 pr-3 tabular-nums";

/** Une URL complète devient un chemin : la colonne reste lisible. */
const chemin = (url: string) => url.replace(/^https?:\/\/[^/]+/, "") || "/";

interface VenteSite {
  montant: number | string;
  langue: string | null;
}

export default async function PageSeo({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const { actualiser } = await searchParams;
  const depuis = new Date(Date.now() - 28 * 24 * 3600 * 1000).toISOString();
  const [stats, ventes] = await Promise.all([
    statsSeo(actualiser === "1"),
    lire<VenteSite>("reservations", {
      colonnes: "montant,langue",
      filtres: [
        { colonne: "statut", operateur: "eq", valeur: "payee" },
        { colonne: "source", operateur: "eq", valeur: "site" },
        { colonne: "paye_le", operateur: "gte", valeur: depuis },
      ],
      limite: 1000,
    }),
  ]);
  const { gsc, ga } = stats;
  const compte = compteService();

  const parLangue = ["en", "fr", "de", "it"].map((l) => {
    const lignes = ventes.filter((v) => (v.langue ?? "en") === l);
    return { langue: l.toUpperCase(), nombre: lignes.length, total: lignes.reduce((s, v) => s + Number(v.montant), 0) };
  });
  const totalVentes = ventes.reduce((s, v) => s + Number(v.montant), 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Entete email={utilisateur.email} actif="seo" />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-alpine">Stats SEO</h1>
          <p className="mt-1 text-sm text-alpine-600">
            Les 28 derniers jours. Chiffres mis à jour le {heure(new Date(stats.a))}.
          </p>
        </div>
        <Link href={`${ICI}?actualiser=1`} className="rounded border border-glacier-300 px-3 py-1.5 text-sm font-semibold text-alpine-700 hover:bg-glacier-50">
          Actualiser
        </Link>
      </div>

      {!indexationOuverte() ? (
        <p className="mt-4 rounded border border-attention-300 bg-attention-50 px-4 py-3 text-sm leading-relaxed text-attention-700">
          Le nouveau site est encore fermé aux moteurs de recherche (préproduction). Les chiffres Google
          ci-dessous sont ceux de l’ancien site WordPress, tant que le domaine n’a pas basculé.
        </p>
      ) : null}

      {/* ----------------------------------------------------- ventes */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Ce que le site a vendu</h2>
        <p className="mt-1 text-sm text-alpine-600">
          Réservations payées en ligne sur 28 jours — hors téléphone. C’est le chiffre qui dit si le
          référencement rapporte.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Tuile libelle="Toutes langues" valeur={euros(totalVentes)}>
            <span className="text-xs text-alpine-600">
              {ventes.length} réservation{ventes.length > 1 ? "s" : ""}
            </span>
          </Tuile>
          {parLangue.map((l) => (
            <Tuile key={l.langue} libelle={`Site ${l.langue}`} valeur={euros(l.total)}>
              <span className="text-xs text-alpine-600">
                {l.nombre} réservation{l.nombre > 1 ? "s" : ""}
              </span>
            </Tuile>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ Search Console */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Google Search Console — la visibilité dans Google</h2>
        {gsc.ok ? (
          <>
            <p className="mt-1 text-sm text-alpine-600">
              Du {date(gsc.donnees.periode.debut)} au {date(gsc.donnees.periode.fin)} (Google a trois jours de
              retard) · propriété {proprieteSearchConsole()}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Tuile libelle="Clics depuis Google" valeur={entier(gsc.donnees.total.clics)}>
                <Evolution avant={gsc.donnees.precedent.clics} apres={gsc.donnees.total.clics} />
              </Tuile>
              <Tuile libelle="Affichages dans Google" valeur={entier(gsc.donnees.total.impressions)}>
                <Evolution avant={gsc.donnees.precedent.impressions} apres={gsc.donnees.total.impressions} />
              </Tuile>
              <Tuile libelle="Taux de clic" valeur={pourcent(gsc.donnees.total.ctr)}>
                <Evolution avant={gsc.donnees.precedent.ctr} apres={gsc.donnees.total.ctr} />
              </Tuile>
              <Tuile libelle="Position moyenne" valeur={gsc.donnees.total.position.toFixed(1).replace(".", ",")}>
                <Evolution avant={gsc.donnees.precedent.position} apres={gsc.donnees.total.position} inverse />
              </Tuile>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="overflow-x-auto">
                <h3 className="text-sm font-semibold text-alpine">Ce que les gens tapent</h3>
                <table className="mt-2 w-full min-w-[26rem] text-sm">
                  <thead>
                    <tr className="border-b border-glacier-200">
                      <th className={TH}>Recherche</th>
                      <th className={`${TH} text-right`}>Clics</th>
                      <th className={`${TH} text-right`}>Affichages</th>
                      <th className={`${TH} text-right`}>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gsc.donnees.requetes.map((r) => (
                      <tr key={r.cle} className="border-b border-glacier-100">
                        <td className="py-1.5 pr-3 text-alpine">{r.cle}</td>
                        <td className={`${TD} text-right`}>{entier(r.clics)}</td>
                        <td className={`${TD} text-right`}>{entier(r.impressions)}</td>
                        <td className={`${TD} text-right`}>{r.position.toFixed(1).replace(".", ",")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto">
                <h3 className="text-sm font-semibold text-alpine">Les pages qui sortent</h3>
                <table className="mt-2 w-full min-w-[26rem] text-sm">
                  <thead>
                    <tr className="border-b border-glacier-200">
                      <th className={TH}>Page</th>
                      <th className={`${TH} text-right`}>Clics</th>
                      <th className={`${TH} text-right`}>Affichages</th>
                      <th className={`${TH} text-right`}>Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gsc.donnees.pages.map((p) => (
                      <tr key={p.cle} className="border-b border-glacier-100">
                        <td className="max-w-[16rem] truncate py-1.5 pr-3 text-alpine" title={p.cle}>
                          {chemin(p.cle)}
                        </td>
                        <td className={`${TD} text-right`}>{entier(p.clics)}</td>
                        <td className={`${TD} text-right`}>{entier(p.impressions)}</td>
                        <td className={`${TD} text-right`}>{p.position.toFixed(1).replace(".", ",")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="mt-6 text-sm font-semibold text-alpine">D’où viennent les clics</h3>
            <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-alpine-700">
              {gsc.donnees.pays.map((p) => (
                <span key={p.cle}>
                  <span className="uppercase">{p.cle}</span> · {entier(p.clics)} clics
                </span>
              ))}
            </p>
          </>
        ) : (
          <p className="mt-3 rounded border border-attention-300 bg-attention-50 px-4 py-3 text-sm text-attention-700">
            {gsc.raison}
          </p>
        )}
      </section>

      {/* ----------------------------------------------------- Analytics */}
      <section className={CARTE}>
        <h2 className="font-display text-lg text-alpine">Google Analytics — ce que font les visiteurs</h2>
        {ga.ok ? (
          <>
            <p className="mt-1 text-sm text-alpine-600">
              Du {date(ga.donnees.periode.debut)} au {date(ga.donnees.periode.fin)} · propriété {proprieteAnalytics()}.
              Moins de visites que de clics Google est normal : refus de cookies, bloqueurs.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Tuile libelle="Visites" valeur={entier(ga.donnees.total.sessions)}>
                <Evolution avant={ga.donnees.precedent.sessions} apres={ga.donnees.total.sessions} />
              </Tuile>
              <Tuile libelle="Visiteurs" valeur={entier(ga.donnees.total.utilisateurs)}>
                <Evolution avant={ga.donnees.precedent.utilisateurs} apres={ga.donnees.total.utilisateurs} />
              </Tuile>
              <Tuile libelle="Visites engagées" valeur={pourcent(ga.donnees.total.engagement, 0)} />
              <Tuile libelle="Conversions" valeur={entier(ga.donnees.total.conversions)}>
                <Evolution avant={ga.donnees.precedent.conversions} apres={ga.donnees.total.conversions} />
              </Tuile>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="overflow-x-auto">
                <h3 className="text-sm font-semibold text-alpine">Par canal</h3>
                <table className="mt-2 w-full min-w-[20rem] text-sm">
                  <thead>
                    <tr className="border-b border-glacier-200">
                      <th className={TH}>Canal</th>
                      <th className={`${TH} text-right`}>Visites</th>
                      <th className={`${TH} text-right`}>Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ga.donnees.canaux.map((c) => (
                      <tr key={c.nom} className="border-b border-glacier-100">
                        <td className="py-1.5 pr-3 text-alpine">{c.nom}</td>
                        <td className={`${TD} text-right`}>{entier(c.sessions)}</td>
                        <td className={`${TD} text-right`}>{entier(c.conversions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="mt-6 text-sm font-semibold text-alpine">Par pays</h3>
                <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-alpine-700">
                  {ga.donnees.pays.map((p) => (
                    <span key={p.nom}>
                      {p.nom} · {entier(p.sessions)}
                    </span>
                  ))}
                </p>
              </div>
              <div className="overflow-x-auto">
                <h3 className="text-sm font-semibold text-alpine">Pages d’arrivée</h3>
                <table className="mt-2 w-full min-w-[26rem] text-sm">
                  <thead>
                    <tr className="border-b border-glacier-200">
                      <th className={TH}>Page</th>
                      <th className={`${TH} text-right`}>Visites</th>
                      <th className={`${TH} text-right`}>Engagées</th>
                      <th className={`${TH} text-right`}>Conv.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ga.donnees.pagesEntree.map((p) => (
                      <tr key={p.page} className="border-b border-glacier-100">
                        <td className="max-w-[16rem] truncate py-1.5 pr-3 text-alpine" title={p.page}>
                          {p.page || "(inconnue)"}
                        </td>
                        <td className={`${TD} text-right`}>{entier(p.sessions)}</td>
                        <td className={`${TD} text-right`}>{pourcent(p.engagement, 0)}</td>
                        <td className={`${TD} text-right`}>{entier(p.conversions)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-3 rounded border border-attention-300 bg-attention-50 px-4 py-3 text-sm text-attention-700">
            {ga.raison}
          </p>
        )}
        <p className="mt-4 text-xs text-alpine-600">
          À savoir : le nouveau site n’envoie pas encore de données à Analytics — la balise se pose avec le
          bandeau de consentement aux cookies, avant la bascule.
        </p>
      </section>

      {/* ------------------------------------------------- branchement */}
      {!gsc.ok || !ga.ok ? (
        <section className={CARTE}>
          <h2 className="font-display text-lg text-alpine">Brancher Google (Clickzou)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-alpine-700">
            <li>
              Compte de service :{" "}
              {compte ? (
                <strong className="break-all text-alpine">{compte.client_email}</strong>
              ) : (
                <>
                  poser <code>GSC_CREDENTIALS_B64</code> (le JSON du compte de service Clickzou, en base64) sur
                  Vercel
                </>
              )}
              .
            </li>
            <li>
              Search Console → propriété alpsskitransfers.com → Paramètres → Utilisateurs : ajouter ce compte en
              « Restreint ». Si la propriété n’est pas de type domaine, poser <code>GSC_SITE_URL</code> avec son
              adresse exacte (actuellement : {proprieteSearchConsole()}).
            </li>
            <li>
              Analytics → Administration → Gestion des accès à la propriété : ajouter ce compte en « Lecteur », puis
              poser <code>GA_PROPERTY_ID</code> (le numéro de la propriété, 9 à 10 chiffres) sur Vercel.
            </li>
            <li>Redéployer, puis « Actualiser » ici.</li>
          </ol>
        </section>
      ) : null}
    </main>
  );
}
