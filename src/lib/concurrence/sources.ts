/**
 * La lecture des prix chez les deux concurrents. Chaque fonction rend les
 * offres d'un trajet pour un groupe et une date, **par véhicule et en euros**,
 * ou la raison pour laquelle elle n'a rien pu lire.
 *
 * Aucune ne lève : une nuit où un concurrent ne répond pas ne doit pas priver
 * l'onglet des prix de l'autre.
 */

export interface Offre {
  /** Le libellé du concurrent — « Standard XL minivan », « Premium Private Transfer ». */
  nom: string;
  /** Prix du véhicule pour le groupe, en euros. */
  prix: number;
  premium: boolean;
}

export type Lecture = { ok: true; offres: Offre[] } | { ok: false; raison: string };

const DELAI_MS = 20_000;

/*
  Le franc suisse, figé : Alpy affiche ses trajets suisses en CHF. Un écart de
  quelques centimes sur le taux ne change pas la lecture — plus cher ou moins
  cher de 30 € —, et un taux vivant ajouterait un service de plus qui peut
  tomber. Relevé le 14 septembre 2026.
*/
const EUROS_PAR_DEVISE: Record<string, number> = { EUR: 1, "€": 1, CHF: 1.07, GBP: 1.19, "£": 1.19 };

/* ------------------------------------------------------------- alps2alps */

interface VehiculeAlps2alps {
  type?: string;
  name?: string;
  price?: number;
  max_passengers?: number;
}

/** alps2alps — leur API publique : un appel rend tous les véhicules qui tiennent le groupe. */
export async function lireAlps2alps(
  depart: string,
  arrivee: string,
  date: string,
  passagers: number,
): Promise<Lecture> {
  const url = new URL("https://booking.alps2alps.com/api/public/v1/transfer-options");
  url.search = new URLSearchParams({
    from: depart,
    to: arrivee,
    date,
    time: "10:00",
    adults: String(passagers),
    currency: "EUR",
  }).toString();
  try {
    const reponse = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "alpsskitransfers.com price monitor" },
      signal: AbortSignal.timeout(DELAI_MS),
      cache: "no-store",
    });
    if (reponse.status === 429) return { ok: false, raison: "alps2alps limite les demandes (429)" };
    if (!reponse.ok) return { ok: false, raison: `alps2alps a répondu ${reponse.status}` };
    const j = (await reponse.json()) as { currency?: string; outbound?: { vehicles?: VehiculeAlps2alps[] } };
    const taux = EUROS_PAR_DEVISE[j.currency ?? "EUR"] ?? 1;
    const offres = (j.outbound?.vehicles ?? [])
      .filter((v) => typeof v.price === "number" && (v.max_passengers ?? 99) >= passagers)
      .map((v) => {
        const nom = v.type ?? v.name ?? "véhicule";
        return { nom, prix: Math.round(v.price! * taux * 100) / 100, premium: /premium|luxury|business|executive|vip/i.test(nom) };
      });
    return offres.length ? { ok: true, offres } : { ok: false, raison: "alps2alps ne propose pas ce trajet à cette date" };
  } catch (erreur) {
    return { ok: false, raison: `alps2alps injoignable : ${erreur instanceof Error ? erreur.message : erreur}` };
  }
}

/* ------------------------------------------------------------------- Alpy */

const NAVIGATEUR =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

/** Les cookies d'une réponse, recollés à ceux qu'on a déjà. */
function cookies(existants: Map<string, string>, reponse: Response) {
  for (const brut of reponse.headers.getSetCookie?.() ?? []) {
    const [paire] = brut.split(";");
    const i = paire.indexOf("=");
    if (i > 0) existants.set(paire.slice(0, i).trim(), paire.slice(i + 1).trim());
  }
}

const enTete = (jar: Map<string, string>) => [...jar].map(([k, v]) => `${k}=${v}`).join("; ");

/**
 * Une session Alpy : leur formulaire porte un jeton lié aux cookies de la
 * visite. On ouvre la page d'accueil une fois, puis on réutilise la session
 * pour les recherches d'un même lot.
 */
export interface SessionAlpy {
  action: string;
  jar: Map<string, string>;
}

export async function ouvrirSessionAlpy(): Promise<SessionAlpy | null> {
  try {
    const jar = new Map<string, string>();
    const reponse = await fetch("https://www.alpytransfers.com/", {
      headers: { "User-Agent": NAVIGATEUR, "Accept-Language": "en" },
      signal: AbortSignal.timeout(DELAI_MS),
      cache: "no-store",
    });
    cookies(jar, reponse);
    const html = await reponse.text();
    const formulaire = html.match(/<form[\s\S]*?<\/form>/i)?.[0] ?? "";
    const action = formulaire.match(/action="([^"]+getScheduleAction[^"]*)"/)?.[1]?.replace(/&amp;/g, "&");
    return action ? { action, jar } : null;
  } catch {
    return null;
  }
}

/** « 2026-12-16 » → « 16/12/2026 », le format que lit leur formulaire. */
const dateAlpy = (iso: string) => iso.split("-").reverse().join("/");

export async function lireAlpy(
  session: SessionAlpy,
  depart: string,
  arrivee: string,
  departAeroport: boolean,
  date: string,
  passagers: number,
): Promise<Lecture> {
  const corps = new URLSearchParams({
    privated: "true",
    journeyType: "privated",
    journeyTypeRadio: "privated",
    originId: depart,
    isOriginAirport: String(departAeroport),
    destinationId: arrivee,
    isDestinationAirport: "false",
    outwardDate: dateAlpy(date),
    outwardDateHidden: dateAlpy(date),
    passengers: String(passagers),
    adults: String(passagers),
    kids: "0",
  });
  try {
    // Le formulaire répond par une redirection vers la page des offres : on la suit à la main, cookies compris.
    let reponse = await fetch(session.action, {
      method: "POST",
      headers: {
        "User-Agent": NAVIGATEUR,
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: enTete(session.jar),
      },
      body: corps,
      redirect: "manual",
      signal: AbortSignal.timeout(DELAI_MS),
      cache: "no-store",
    });
    cookies(session.jar, reponse);
    for (let sauts = 0; sauts < 4 && reponse.status >= 300 && reponse.status < 400; sauts += 1) {
      const suite = new URL(reponse.headers.get("location") ?? "/", "https://www.alpytransfers.com/");
      reponse = await fetch(suite, {
        headers: { "User-Agent": NAVIGATEUR, Cookie: enTete(session.jar) },
        redirect: "manual",
        signal: AbortSignal.timeout(DELAI_MS),
        cache: "no-store",
      });
      cookies(session.jar, reponse);
    }
    if (!reponse.ok) return { ok: false, raison: `Alpy a répondu ${reponse.status}` };
    return lireOffresAlpy(await reponse.text(), passagers);
  } catch (erreur) {
    return { ok: false, raison: `Alpy injoignable : ${erreur instanceof Error ? erreur.message : erreur}` };
  }
}

/**
 * Les offres d'une page de résultats Alpy. Chaque carte porte
 * `data-is-premium`, puis le prix **par passager** en `data-amount` et sa
 * devise en `data-currency` : le prix du véhicule est ce montant fois le groupe.
 */
export function lireOffresAlpy(html: string, passagers: number): Lecture {
  const cartes = html.split(/<div class="transfer-card" /).slice(1);
  const offres: Offre[] = [];
  for (const carte of cartes) {
    const premium = /^data-is-premium="true"/.test(carte);
    // La devise s'écrit « CHF » sur les trajets suisses, « € » sur les français.
    const montant = carte.match(/data-amount="([\d.]+)"\s+data-currency="([^"]{1,3})"/);
    if (!montant) continue;
    const taux = EUROS_PAR_DEVISE[montant[2]];
    if (!taux) continue;
    offres.push({
      nom: premium ? "Premium Private Transfer" : "Private Transfer",
      prix: Math.round(Number(montant[1]) * passagers * taux * 100) / 100,
      premium,
    });
  }
  if (offres.length) return { ok: true, offres };
  if (/transfer-card/.test(html)) {
    return { ok: false, raison: "Alpy : page de résultats illisible — leur site a peut-être changé" };
  }
  /*
    Une page sans offre n'est pas forcément un trajet non desservi. Le
    15 septembre 2026, pendant une demi-heure, Alpy a renvoyé des pages vides
    pour des trajets qu'il avait chiffrés la veille et qu'il rechiffrait vingt
    minutes plus tard : son anti-robot (Imperva) filtrait. Seule la page de
    résultats (« Choose your private transfer ») dit vraiment « rien à cette
    date » ; toute autre page est un blocage, qui se réessaie.
  */
  const titre = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "sans titre";
  return /choose your private transfer/i.test(html)
    ? { ok: false, raison: "Alpy ne propose pas ce trajet à cette date" }
    : { ok: false, raison: `${ALPY_PAGE_INATTENDUE} (« ${titre.slice(0, 60)} »)` };
}

export const ALPY_PAGE_INATTENDUE = "Alpy a renvoyé une page inattendue";

/** Les échecs d'Alpy qui valent la peine d'un second essai, avec une session neuve. */
export function alpyAReessayer(lecture: Lecture): boolean {
  return !lecture.ok && /page inattendue|répondu 403|injoignable/.test(lecture.raison);
}
