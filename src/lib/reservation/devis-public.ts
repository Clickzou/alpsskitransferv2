import { SITE } from "@/data/site";
import { VEHICULES } from "@/data/accueil";
import { duree } from "@/lib/airports/dessertes";
import { CATEGORIES } from "@/lib/reservation/demande";
import { nomDuLieu, validerEtMesurer } from "@/lib/reservation/demande-mesuree";
import { CAPACITE, devisReservation } from "@/lib/reservation/devis";
import { chercherLieux, LIEUX, lieuParSlug, normaliser } from "@/lib/reservation/lieux";
import { ANCRE_TUNNEL, CHEMIN_TUNNEL } from "@/lib/reservation/config";
import { distanceCalculee } from "@/lib/tarification/distance";
import type { Grille } from "@/lib/tarification/grille";

/**
 * Le devis pour les assistants — demande de JC, 15 septembre 2026 : « que
 * ChatGPT ou Claude puissent demander le prix exact d'un trajet et proposer le
 * lien de réservation pré-rempli ».
 *
 * Deux portes l'appellent : `GET /api/prix/` (lisible par un assistant qui
 * navigue, décrite dans `/openapi.json` et `/llms.txt`) et le serveur MCP
 * `/mcp` (un assistant auquel on a ajouté le connecteur). Les deux passent par
 * ici, et ici tout passe par le calcul unique du prix — `validerEtMesurer` puis
 * `devisReservation` : un assistant cite le prix que le tunnel encaissera.
 *
 * Les lieux arrivent en toutes lettres (« Geneva », « Alpe d'Huez », « Genève »,
 * « Hôtel Pashmina, Val Thorens ») : un nom du registre devient son slug, le
 * reste est traité comme une adresse et se mesure au kilomètre.
 */

export interface DemandePublique {
  from: string;
  to: string;
  /** `YYYY-MM-DD` */
  date: string;
  /** `HH:mm`, 10:00 par défaut. */
  time?: string;
  passengers: number;
  bags?: number;
  skiBags?: number;
  returnDate?: string;
  returnTime?: string;
}

export interface OffrePublique {
  vehicle: string;
  model: string;
  maxPassengers: number;
  price: number;
  currency: "EUR";
  bookingUrl: string;
}

export type DevisPublic =
  | {
      ok: true;
      from: string;
      to: string;
      date: string;
      time: string;
      returnDate: string | null;
      passengers: number;
      distanceKm: number | null;
      driveTime: string | null;
      offers: OffrePublique[];
      priceNote: string;
      included: string[];
    }
  | { ok: false; error: string; bookingUrl: string };

/** Un nom de lieu en toutes lettres → le slug du registre, ou le texte tel quel (une adresse). */
export function resoudreLieu(saisie: string): string {
  const brut = saisie.trim();
  if (lieuParSlug(brut)) return brut;
  const q = normaliser(brut);
  const exact = LIEUX.find((l) => l.slug && (normaliser(l.nom) === q || l.cles.includes(q)));
  if (exact?.slug) return exact.slug;
  // « Geneva » ou « Alpe d Huez » : la meilleure suggestion, si le nom saisi y figure en entier.
  const [premier] = chercherLieux(LIEUX, brut, 1);
  return premier?.slug && premier.cles.some((c) => c.startsWith(q)) ? premier.slug : brut;
}

const deuxChiffres = (n: number) => String(n).padStart(2, "0");

function lienReservation(p: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams();
  for (const [cle, valeur] of Object.entries(p)) if (valeur !== undefined && valeur !== "") params.set(cle, String(valeur));
  return `${SITE.url}${CHEMIN_TUNNEL}?${params}${ANCRE_TUNNEL}`;
}

export async function devisPublic(d: DemandePublique, grille: Grille): Promise<DevisPublic> {
  const heure = /^\d{1,2}:\d{2}$/.test(d.time ?? "") ? d.time! : "10:00";
  const [h, m] = heure.split(":").map(Number);
  const when = `${d.date}T${deuxChiffres(h)}:${deuxChiffres(m)}`;
  const heureRetour = /^\d{1,2}:\d{2}$/.test(d.returnTime ?? "") ? d.returnTime! : "10:00";
  const returnWhen = d.returnDate ? `${d.returnDate}T${heureRetour.padStart(5, "0")}` : undefined;
  const from = resoudreLieu(d.from);
  const to = resoudreLieu(d.to);
  const bags = Math.max(0, Math.floor(d.bags ?? 2));
  const skis = Math.max(0, Math.floor(d.skiBags ?? 0));
  const base = {
    from,
    to,
    when,
    passengers: d.passengers,
    bags,
    skis,
    trip: returnWhen ? "return" : "one-way",
    returnWhen,
  };

  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) {
    return { ok: false, error: "Give the date as YYYY-MM-DD.", bookingUrl: lienReservation(base) };
  }
  if (new Date(`${d.date}T23:59:00Z`).getTime() < Date.now()) {
    return { ok: false, error: "This date is in the past.", bookingUrl: lienReservation(base) };
  }

  const valide = await validerEtMesurer({
    from: lieuParSlug(from) ? from : undefined,
    fromText: lieuParSlug(from) ? undefined : from,
    to: lieuParSlug(to) ? to : undefined,
    toText: lieuParSlug(to) ? undefined : to,
    when,
    returnWhen,
    passengers: d.passengers,
    bags,
    skis,
  });
  if (!valide.ok) return { ok: false, error: valide.message, bookingUrl: lienReservation(base) };
  if (!("demande" in valide)) {
    return {
      ok: false,
      error:
        "This journey has no instant price (a place could not be located). It can be quoted on request through the booking page or by phone.",
      bookingUrl: lienReservation(base),
    };
  }

  const demande = valide.demande;
  const offers: OffrePublique[] = [];
  for (const categorie of CATEGORIES) {
    if (CAPACITE[categorie] < d.passengers) continue;
    const r = devisReservation({ ...demande, categorie, categorieRetour: categorie }, grille);
    if (!r.ok) continue;
    const fiche = VEHICULES.categories.find((v) => v.cle === categorie);
    offers.push({
      vehicle: fiche?.nom ?? categorie,
      model: fiche?.modele ?? "",
      maxPassengers: CAPACITE[categorie],
      price: r.devis.total,
      currency: "EUR",
      bookingUrl: lienReservation({ ...base, vehicle: categorie }),
    });
  }
  if (offers.length === 0) {
    return {
      ok: false,
      error: "No single vehicle takes this group or this luggage: ask for a group quote on the booking page.",
      bookingUrl: lienReservation(base),
    };
  }

  const table = distanceCalculee({ origine: demande.airport, destination: demande.resort });
  const mesure = demande.mesures?.aller ?? null;
  const km = table?.km ?? mesure?.km ?? null;
  const minutes = table?.minutes ?? mesure?.minutes ?? null;

  return {
    ok: true,
    from: nomDuLieu(demande.airport),
    to: nomDuLieu(demande.resort),
    date: d.date,
    time: heure,
    returnDate: d.returnDate ?? null,
    passengers: d.passengers,
    distanceKm: km,
    driveTime: minutes ? duree(minutes) : null,
    offers,
    priceNote: returnWhen
      ? "Prices are per vehicle for the outbound and return journeys together, fixed and shown again before payment."
      : "Prices are per vehicle for this one-way journey, fixed and shown again before payment.",
    included: ["tolls", "ski and snowboard bags", "child seats", "flight tracking", "one hour of waiting"],
  };
}
