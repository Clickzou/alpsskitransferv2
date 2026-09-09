import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { emailConfigure, envoyer } from "@/lib/reservation/email";
import { devisReservation } from "@/lib/reservation/devis";
import { creerSessionCheckout, stripeConfigure, type LigneCheckout } from "@/lib/reservation/stripe";
import { MAX_LIGNES } from "@/lib/reservation/panier";
import { resortParSlug } from "@/lib/resorts";
import type { CategorieVehicule } from "@/lib/tarification/bareme";

/**
 * Paiement d'un panier — plusieurs courses en une seule transaction.
 *
 * Le panier vit dans le navigateur du visiteur : **rien de ce qu'il envoie
 * n'est cru sur parole**. Chaque ligne est rechiffrée ici par la même fonction
 * que le devis et que la réservation à l'unité ; le total encaissé est la somme
 * de ces calculs, jamais celle affichée à l'écran. C'est la règle qui empêche
 * qu'un panier modifié dans la console décide du prix.
 *
 * Deux issues, comme pour une réservation simple :
 *  · barème validé et Stripe configuré → une session Checkout, une ligne par
 *    course, le client voit le détail avant de payer ;
 *  · sinon → la demande part par e-mail et rien n'est encaissé.
 *
 * POST /api/panier
 *   { lignes: [{ from, to, when, passengers, categorie, bags?, skis? }], nom, email, telephone? }
 */
export const dynamic = "force-dynamic";

interface LigneEntrante {
  from: string;
  to: string;
  when: string;
  passengers: number;
  categorie: CategorieVehicule;
  bags?: number;
  skis?: number;
}

const CATEGORIES: CategorieVehicule[] = ["standard", "business", "premium"];

/** Nom lisible d'un lieu, pour la page de paiement et l'e-mail. */
function libelle(slug: string): string {
  return airportParSlug(slug)?.name ?? resortParSlug(slug)?.name ?? slug;
}

function heure(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

export async function POST(requete: Request) {
  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ ok: false, erreur: "Requête illisible." }, { status: 400 });
  }

  const entree = corps as Record<string, unknown>;
  const brutes = Array.isArray(entree.lignes) ? (entree.lignes as LigneEntrante[]) : [];
  const email = typeof entree.email === "string" ? entree.email.trim() : "";
  const nom = typeof entree.nom === "string" ? entree.nom.trim() : "";
  const telephone = typeof entree.telephone === "string" ? entree.telephone.trim() : "";

  if (brutes.length === 0) {
    return NextResponse.json({ ok: false, erreur: "panier-vide" }, { status: 422 });
  }
  if (brutes.length > MAX_LIGNES) {
    return NextResponse.json({ ok: false, erreur: "panier-trop-grand" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || nom.length < 2) {
    return NextResponse.json({ ok: false, erreur: "coordonnees-invalides" }, { status: 422 });
  }

  /*
   * Le rechiffrage. Une ligne qu'on ne sait pas chiffrer — lieu saisi
   * librement, distance inconnue — ne bloque pas les autres : elle est mise de
   * côté et signalée, et le client choisit de payer le reste ou de tout
   * envoyer en devis.
   */
  const chiffrees: { ligne: LigneEntrante; total: number; encaissable: boolean }[] = [];
  const refusees: { ligne: LigneEntrante; motif: string }[] = [];

  for (const ligne of brutes) {
    const categorie = CATEGORIES.includes(ligne.categorie) ? ligne.categorie : "standard";
    const depart = new Date(ligne.when);
    if (Number.isNaN(depart.getTime())) {
      refusees.push({ ligne, motif: "date-invalide" });
      continue;
    }

    const resultat = devisReservation({
      airport: ligne.from,
      resort: ligne.to,
      aller: depart,
      passagers: Number(ligne.passengers) || 1,
      categorie,
      bagages: Number(ligne.bags) || 0,
      skis: Number(ligne.skis) || 0,
    });

    if (!resultat.ok) {
      refusees.push({ ligne, motif: resultat.echec.raison });
      continue;
    }
    chiffrees.push({
      ligne: { ...ligne, categorie },
      total: resultat.devis.total,
      encaissable: resultat.devis.encaissable,
    });
  }

  const total = chiffrees.reduce((somme, c) => somme + c.total, 0);
  const encaissable = chiffrees.length > 0 && chiffrees.every((c) => c.encaissable);
  const reference = `AST-${randomUUID().slice(0, 8).toUpperCase()}`;

  const recapitulatif = chiffrees
    .map(
      (c) =>
        `· ${libelle(c.ligne.from)} → ${libelle(c.ligne.to)} — ${heure(c.ligne.when)} — ` +
        `${c.ligne.categorie}, ${c.ligne.passengers} passenger(s) — €${c.total}`,
    )
    .join("\n");

  /* --- Le paiement, quand tout est chiffrable et que Stripe est armé -------- */

  if (encaissable && refusees.length === 0 && stripeConfigure()) {
    const lignes: LigneCheckout[] = chiffrees.map((c) => ({
      intitule: `${libelle(c.ligne.from)} → ${libelle(c.ligne.to)}`,
      description: `${heure(c.ligne.when)} · ${c.ligne.categorie} · ${c.ligne.passengers} passenger(s)`,
      montant: c.total,
    }));

    const session = await creerSessionCheckout({
      reference,
      lignes,
      email,
      urlSucces: `${SITE.url}/booking/confirmed/?ref=${reference}`,
      urlAnnulation: `${SITE.url}/cart/`,
      metadonnees: { courses: String(chiffrees.length), nom },
    });

    if (session) {
      return NextResponse.json({ ok: true, reference, total, paiement: session.url });
    }
  }

  /* --- Sinon : la demande part par e-mail, rien n'est encaissé -------------- */

  const destinataire = process.env.EMAIL_EXPLOITANT;
  const notifie =
    emailConfigure() && destinataire
      ? await envoyer({
          destinataire,
          sujet: `[Panier ${reference}] ${chiffrees.length} transfer(s) — ${nom}`,
          texte: [
            `De : ${nom} <${email}>`,
            telephone ? `Téléphone : ${telephone}` : null,
            "",
            recapitulatif || "(aucune course chiffrable)",
            "",
            `Total calculé : €${total}`,
            refusees.length > 0
              ? `\nÀ chiffrer à la main : ${refusees.map((r) => `${r.ligne.from} → ${r.ligne.to} (${r.motif})`).join(", ")}`
              : null,
          ]
            .filter(Boolean)
            .join("\n"),
        })
      : false;

  return NextResponse.json({
    ok: true,
    reference,
    total,
    paiement: null,
    /*
     * `notifie` dit la vérité sur ce qui s'est passé : sans clé e-mail, la
     * demande n'a été transmise à personne, et l'interface doit alors donner
     * l'adresse de contact plutôt qu'une confirmation qui n'existe pas.
     */
    notifie,
    aChiffrerAlaMain: refusees.length,
  });
}
