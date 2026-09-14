import { appelGoogle, compteService } from "./acces";

/**
 * Les chiffres de l'onglet Stats SEO — Search Console et Analytics 4.
 *
 * Demande de JC, 14 septembre 2026. Deux sources qui ne mesurent pas la même
 * chose, et l'écran le dit : Search Console compte ce qui se passe **dans
 * Google** (combien de fois le site s'affiche, combien de clics), Analytics ce
 * qui se passe **sur le site** après le clic. Des visites Analytics inférieures
 * aux clics Search Console sont normales : refus de cookies, bloqueurs.
 *
 * Chaque source se dégrade seule : une propriété inaccessible renvoie sa raison,
 * l'autre s'affiche quand même.
 */

const PORTEE_GSC = "https://www.googleapis.com/auth/webmasters.readonly";
const PORTEE_GA = "https://www.googleapis.com/auth/analytics.readonly";

/** `sc-domain:alpsskitransfers.com` pour une propriété de domaine, l'URL sinon. */
export function proprieteSearchConsole(): string {
  return process.env.GSC_SITE_URL?.trim() || "sc-domain:alpsskitransfers.com";
}

export function proprieteAnalytics(): string | null {
  return process.env.GA_PROPERTY_ID?.trim() || null;
}

export interface Periode {
  debut: string;
  fin: string;
}

export interface LigneGsc {
  cle: string;
  clics: number;
  impressions: number;
  ctr: number;
  position: number;
}

export type Disponible<T> = { ok: true; donnees: T } | { ok: false; raison: string };

export interface StatsSearchConsole {
  periode: Periode;
  total: Omit<LigneGsc, "cle">;
  precedent: Omit<LigneGsc, "cle">;
  requetes: LigneGsc[];
  pages: LigneGsc[];
  pays: LigneGsc[];
}

export interface StatsAnalytics {
  periode: Periode;
  total: { sessions: number; utilisateurs: number; engagement: number; conversions: number };
  precedent: { sessions: number; utilisateurs: number; conversions: number };
  canaux: { nom: string; sessions: number; conversions: number }[];
  pagesEntree: { page: string; sessions: number; engagement: number; conversions: number }[];
  pays: { nom: string; sessions: number }[];
}

const JOUR = 24 * 3600 * 1000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** 28 jours, et les 28 d'avant. Search Console a trois jours de retard : on s'arrête avant. */
function periodes(retardJours: number): { courante: Periode; precedente: Periode } {
  const fin = new Date(Date.now() - retardJours * JOUR);
  const debut = new Date(fin.getTime() - 27 * JOUR);
  const finPrec = new Date(debut.getTime() - JOUR);
  const debutPrec = new Date(finPrec.getTime() - 27 * JOUR);
  return {
    courante: { debut: iso(debut), fin: iso(fin) },
    precedente: { debut: iso(debutPrec), fin: iso(finPrec) },
  };
}

function raisonLisible(erreur: unknown, service: string): string {
  const message = erreur instanceof Error ? erreur.message : String(erreur);
  if (/permission|not have|forbidden|insufficient|403/i.test(message)) {
    const email = compteService()?.client_email ?? "le compte de service";
    return `Accès refusé par ${service} : ajoutez ${email} comme utilisateur de la propriété (lecture seule suffit).`;
  }
  return `${service} ne répond pas : ${message}`;
}

/* --------------------------------------------------------- Search Console */

interface ReponseGsc {
  rows?: { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }[];
}

async function requeteGsc(periode: Periode, dimensions: string[], limite: number): Promise<LigneGsc[]> {
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    proprieteSearchConsole(),
  )}/searchAnalytics/query`;
  const r = await appelGoogle<ReponseGsc>(url, PORTEE_GSC, {
    startDate: periode.debut,
    endDate: periode.fin,
    dimensions,
    rowLimit: limite,
    type: "web",
  });
  return (r.rows ?? []).map((l) => ({
    cle: l.keys?.[0] ?? "",
    clics: l.clicks,
    impressions: l.impressions,
    ctr: l.ctr,
    position: l.position,
  }));
}

function totalDe(lignes: LigneGsc[]): Omit<LigneGsc, "cle"> {
  const clics = lignes.reduce((s, l) => s + l.clics, 0);
  const impressions = lignes.reduce((s, l) => s + l.impressions, 0);
  return {
    clics,
    impressions,
    ctr: impressions ? clics / impressions : 0,
    // La position moyenne se pondère par les impressions, comme dans Search Console.
    position: impressions ? lignes.reduce((s, l) => s + l.position * l.impressions, 0) / impressions : 0,
  };
}

export async function statsSearchConsole(): Promise<Disponible<StatsSearchConsole>> {
  if (!compteService()) return { ok: false, raison: "Identifiants Google non renseignés." };
  const { courante, precedente } = periodes(3);
  try {
    const [jours, joursPrec, requetes, pages, pays] = await Promise.all([
      requeteGsc(courante, ["date"], 40),
      requeteGsc(precedente, ["date"], 40),
      requeteGsc(courante, ["query"], 25),
      requeteGsc(courante, ["page"], 25),
      requeteGsc(courante, ["country"], 10),
    ]);
    return {
      ok: true,
      donnees: {
        periode: courante,
        total: totalDe(jours),
        precedent: totalDe(joursPrec),
        requetes,
        pages,
        pays,
      },
    };
  } catch (erreur) {
    return { ok: false, raison: raisonLisible(erreur, "Search Console") };
  }
}

/* -------------------------------------------------------------- Analytics */

interface ReponseGa {
  rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[];
}

const val = (ligne: NonNullable<ReponseGa["rows"]>[number] | undefined, i: number) =>
  Number(ligne?.metricValues?.[i]?.value ?? 0);
const dim = (ligne: NonNullable<ReponseGa["rows"]>[number] | undefined, i: number) =>
  ligne?.dimensionValues?.[i]?.value ?? "";

export async function statsAnalytics(): Promise<Disponible<StatsAnalytics>> {
  const propriete = proprieteAnalytics();
  if (!compteService() || !propriete) {
    return { ok: false, raison: "Identifiants Google ou numéro de propriété Analytics non renseignés." };
  }
  const { courante, precedente } = periodes(1);
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propriete)}:runReport`;
  const rapport = (corps: unknown) => appelGoogle<ReponseGa>(url, PORTEE_GA, corps);
  const plage = { startDate: courante.debut, endDate: courante.fin };

  try {
    const [totaux, canaux, pages, pays] = await Promise.all([
      rapport({
        dateRanges: [plage, { startDate: precedente.debut, endDate: precedente.fin }],
        metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "engagementRate" }, { name: "keyEvents" }],
      }),
      rapport({
        dateRanges: [plage],
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "keyEvents" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
      rapport({
        dateRanges: [plage],
        dimensions: [{ name: "landingPage" }],
        metrics: [{ name: "sessions" }, { name: "engagementRate" }, { name: "keyEvents" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 20,
      }),
      rapport({
        dateRanges: [plage],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      }),
    ]);

    // Deux plages : Analytics ajoute une dimension « dateRange » à chaque ligne.
    const lignes = totaux.rows ?? [];
    const courant = lignes.find((l) => dim(l, 0) === "date_range_0") ?? lignes[0];
    const avant = lignes.find((l) => dim(l, 0) === "date_range_1") ?? lignes[1];

    return {
      ok: true,
      donnees: {
        periode: courante,
        total: {
          sessions: val(courant, 0),
          utilisateurs: val(courant, 1),
          engagement: val(courant, 2),
          conversions: val(courant, 3),
        },
        precedent: { sessions: val(avant, 0), utilisateurs: val(avant, 1), conversions: val(avant, 3) },
        canaux: (canaux.rows ?? []).map((l) => ({ nom: dim(l, 0), sessions: val(l, 0), conversions: val(l, 1) })),
        pagesEntree: (pages.rows ?? []).map((l) => ({
          page: dim(l, 0),
          sessions: val(l, 0),
          engagement: val(l, 1),
          conversions: val(l, 2),
        })),
        pays: (pays.rows ?? []).map((l) => ({ nom: dim(l, 0), sessions: val(l, 0) })),
      },
    };
  } catch (erreur) {
    return { ok: false, raison: raisonLisible(erreur, "Analytics") };
  }
}

/* ------------------------------------------------------------------ cache */

/*
  Une heure en mémoire : les deux API ont des quotas, et leurs chiffres ne
  bougent qu'une fois par jour. « Actualiser » repasse outre.
*/
const DUREE_CACHE_MS = 60 * 60 * 1000;
let cache: { a: number; gsc: Disponible<StatsSearchConsole>; ga: Disponible<StatsAnalytics> } | null = null;

export async function statsSeo(actualiser = false) {
  if (!actualiser && cache && Date.now() - cache.a < DUREE_CACHE_MS) return cache;
  const [gsc, ga] = await Promise.all([statsSearchConsole(), statsAnalytics()]);
  cache = { a: Date.now(), gsc, ga };
  return cache;
}
