import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Sonde Alpy — pourquoi le relevé lancé depuis Vercel ne lit aucun prix, alors
 * que la même recherche faite depuis un poste en lit (15 septembre 2026).
 *
 * Refait une recherche Alpy pas à pas, depuis le serveur, et rend ce qu'Alpy
 * a répondu à chaque étape : statuts, redirections, cookies reçus, titre et
 * repères de la page finale (cartes d'offres, captcha, pare-feu). Aucune donnée
 * n'est écrite. Fermée comme la sonde des variables : `x-diagnostic` =
 * `SECRET_GESTION`, sinon 404.
 *
 * GET /api/diagnostic/alpy/?date=2026-10-07
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const NAVIGATEUR =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function autorise(requete: Request): boolean {
  const attendu = process.env.SECRET_GESTION?.trim();
  const fourni = requete.headers.get("x-diagnostic")?.trim();
  if (!attendu || !fourni) return false;
  const a = Buffer.from(attendu);
  const b = Buffer.from(fourni);
  return a.length === b.length && timingSafeEqual(a, b);
}

function reperes(html: string) {
  return {
    longueur: html.length,
    titre: html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null,
    cartesOffres: (html.match(/class="transfer-card"/g) ?? []).length,
    formulaire: /getScheduleAction/.test(html),
    captcha: /captcha|recaptcha|hcaptcha|turnstile/i.test(html),
    parefeu: /cloudflare|cf-ray|attention required|access denied|forbidden|blocked/i.test(html),
    imperva: /incapsula|_Incapsula_Resource|Request unsuccessful|incident id/i.test(html),
    extrait: html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 600),
  };
}

export async function GET(requete: Request) {
  if (!autorise(requete)) return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  const date = new URL(requete.url).searchParams.get("date") ?? "2026-10-07";
  const jar = new Map<string, string>();
  const etapes: Record<string, unknown>[] = [];
  const garder = (r: Response) => {
    for (const brut of r.headers.getSetCookie?.() ?? []) {
      const [paire] = brut.split(";");
      const i = paire.indexOf("=");
      if (i > 0) jar.set(paire.slice(0, i).trim(), paire.slice(i + 1).trim());
    }
  };
  const cookie = () => [...jar].map(([k, v]) => `${k}=${v}`).join("; ");

  try {
    const accueil = await fetch("https://www.alpytransfers.com/", {
      headers: { "User-Agent": NAVIGATEUR, "Accept-Language": "en" },
      cache: "no-store",
    });
    garder(accueil);
    const htmlAccueil = await accueil.text();
    const action = htmlAccueil
      .match(/<form[\s\S]*?<\/form>/i)?.[0]
      ?.match(/action="([^"]+getScheduleAction[^"]*)"/)?.[1]
      ?.replace(/&amp;/g, "&");
    etapes.push({ etape: "accueil", statut: accueil.status, cookies: [...jar.keys()], action: Boolean(action), ...reperes(htmlAccueil) });
    if (!action) return NextResponse.json({ etapes });

    const corps = new URLSearchParams({
      privated: "true",
      journeyType: "privated",
      journeyTypeRadio: "privated",
      originId: "1",
      isOriginAirport: "true",
      destinationId: "0",
      isDestinationAirport: "false",
      outwardDate: date.split("-").reverse().join("/"),
      outwardDateHidden: date.split("-").reverse().join("/"),
      passengers: "4",
      adults: "4",
      kids: "0",
    });
    // Les identifiants de lieux réels viennent du registre : on les prend dans la requête si fournis.
    const params = new URL(requete.url).searchParams;
    if (params.get("origine")) corps.set("originId", params.get("origine")!);
    if (params.get("destination")) corps.set("destinationId", params.get("destination")!);

    let r = await fetch(action, {
      method: "POST",
      headers: { "User-Agent": NAVIGATEUR, "Content-Type": "application/x-www-form-urlencoded", Cookie: cookie() },
      body: corps,
      redirect: "manual",
      cache: "no-store",
    });
    garder(r);
    etapes.push({ etape: "recherche", statut: r.status, location: r.headers.get("location") });
    for (let sauts = 0; sauts < 4 && r.status >= 300 && r.status < 400; sauts += 1) {
      const suite = new URL(r.headers.get("location") ?? "/", "https://www.alpytransfers.com/");
      r = await fetch(suite, { headers: { "User-Agent": NAVIGATEUR, Cookie: cookie() }, redirect: "manual", cache: "no-store" });
      garder(r);
      etapes.push({ etape: `redirection ${sauts + 1}`, url: suite.pathname + suite.search.slice(0, 120), statut: r.status, location: r.headers.get("location") });
    }
    etapes.push({ etape: "page finale", ...reperes(await r.text()) });

    /*
      Série : `n` recherches d'affilée, dans la même session (ou une session neuve à
      chaque fois avec `nouvelle=1`), espacées de `pause` secondes — le rythme du relevé.
    */
    const n = Math.min(20, Number(params.get("n") ?? "0") || 0);
    const pause = Math.min(15, Number(params.get("pause") ?? "6") || 6) * 1000;
    const nouvelle = params.get("nouvelle") === "1";
    const serie: Record<string, unknown>[] = [];
    let actionCourante = action;
    for (let i = 0; i < n; i += 1) {
      await new Promise((ok) => setTimeout(ok, pause));
      if (nouvelle) {
        jar.clear();
        const a = await fetch("https://www.alpytransfers.com/", { headers: { "User-Agent": NAVIGATEUR, "Accept-Language": "en" }, cache: "no-store" });
        garder(a);
        actionCourante = (await a.text()).match(/<form[\s\S]*?<\/form>/i)?.[0]?.match(/action="([^"]+getScheduleAction[^"]*)"/)?.[1]?.replace(/&amp;/g, "&") ?? actionCourante;
      }
      let q = await fetch(actionCourante, {
        method: "POST",
        headers: { "User-Agent": NAVIGATEUR, "Content-Type": "application/x-www-form-urlencoded", Cookie: cookie() },
        body: corps,
        redirect: "manual",
        cache: "no-store",
      });
      garder(q);
      const statuts = [q.status];
      for (let sauts = 0; sauts < 4 && q.status >= 300 && q.status < 400; sauts += 1) {
        const suite = new URL(q.headers.get("location") ?? "/", "https://www.alpytransfers.com/");
        q = await fetch(suite, { headers: { "User-Agent": NAVIGATEUR, Cookie: cookie() }, redirect: "manual", cache: "no-store" });
        garder(q);
        statuts.push(q.status);
      }
      const html = await q.text();
      const { extrait, ...court } = reperes(html);
      serie.push({ i: i + 1, statuts, ...court, extrait: court.cartesOffres ? undefined : extrait.slice(0, 200) });
    }
    if (n) etapes.push({ etape: "série", nouvelle, pause: pause / 1000, serie });
    return NextResponse.json({ region: process.env.VERCEL_REGION ?? null, etapes });
  } catch (erreur) {
    return NextResponse.json({ etapes, erreur: erreur instanceof Error ? erreur.message : String(erreur) });
  }
}
