import { NextResponse } from "next/server";
import { airportParSlug } from "@/lib/airports";
import { adresseModifiable, adressePropre } from "@/lib/reservation/adresses-station";
import { origineSite } from "@/lib/reservation/config";
import { cheminFiche } from "@/lib/reservation/demandes";
import { envoyer } from "@/lib/reservation/email";
import { jetonValide } from "@/lib/reservation/gestion";
import { inserer, lire, mettreAJour } from "@/lib/reservation/supabase";
import { resortParSlug } from "@/lib/resorts";
import { FUSEAU_ALPES } from "@/lib/temps";

/**
 * Les adresses en station, et le vol retour, donnés après le paiement.
 *
 * Décision de JC, 11 septembre 2026 : l'adresse est obligatoire, mais elle se
 * demande après l'achat, pour ne pas alourdir le tunnel. Le client la donne
 * depuis son lien de gestion ; elle s'applique tout de suite — elle ne change
 * ni l'heure ni le prix, il n'y a rien à valider.
 *
 * Chaque trajet a la sienne. Une adresse manquante se complète jusqu'à la
 * prise en charge ; une adresse connue ne se change plus à moins de
 * vingt-quatre heures (`adresseModifiable`). Au retour, `null` veut dire « la
 * même qu'à l'aller » — seulement quand le client repart de la même station.
 *
 * L'exploitant voit les adresses manquantes en rouge dans le back-office : il
 * n'est prévenu par e-mail que lorsqu'une adresse arrive pour une course de
 * moins de 48 heures, la seule qu'il a peut-être déjà préparée sans elle.
 *
 * POST /api/gestion/adresses
 */
export const dynamic = "force-dynamic";

const LANGUES = ["en", "fr", "de", "it"];

interface Ligne {
  reference: string;
  statut: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  retour_resort: string | null;
  adresse: string | null;
  adresse_retour: string | null;
  vol_retour: string | null;
}

function refus(erreur: string, statut: number) {
  return NextResponse.json({ erreur }, { status: statut });
}

export async function POST(requete: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = (await requete.json()) as Record<string, unknown>;
  } catch {
    return refus("requete-illisible", 400);
  }

  const reference = typeof corps.reference === "string" ? corps.reference : "";
  const jeton = typeof corps.jeton === "string" ? corps.jeton : "";
  const langue = LANGUES.includes(String(corps.langue)) ? String(corps.langue) : "en";

  if (!reference || !jetonValide(reference, jeton)) return refus("lien-invalide", 403);

  const [r] = await lire<Ligne>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!r) return refus("reservation-introuvable", 404);
  if (r.statut === "annulee") return refus("reservation-annulee", 409);

  const aller = new Date(r.aller);
  const retour = r.retour ? new Date(r.retour) : null;
  const memeStation = !r.retour_resort || r.retour_resort === r.resort;

  const changements: Record<string, string | null> = {};
  const historique: { champ: string; ancien: string | null; nouveau: string | null }[] = [];

  // L'aller : la dépose en station.
  const actuelleAller = adressePropre(r.adresse);
  if (adresseModifiable(aller, actuelleAller)) {
    const adresse = adressePropre(corps.adresse);
    if (!adresse && !actuelleAller) return refus("adresse-requise", 400);
    if (adresse && adresse !== actuelleAller) {
      changements.adresse = adresse;
      historique.push({ champ: "adresse", ancien: actuelleAller, nouveau: adresse });
    }
  }

  // Le retour : la prise en charge en station, et le vol du départ.
  const actuelleRetour = adressePropre(r.adresse_retour);
  const effectiveRetour = actuelleRetour ?? (memeStation ? actuelleAller : null);
  if (retour && adresseModifiable(retour, effectiveRetour)) {
    if (memeStation && corps.memeAdresse === true) {
      if (actuelleRetour !== null) {
        changements.adresse_retour = null;
        historique.push({
          champ: "adresse_retour",
          ancien: actuelleRetour,
          nouveau: "même adresse qu’à l’aller",
        });
      }
    } else {
      const adresseRetour = adressePropre(corps.adresseRetour);
      if (!adresseRetour && !actuelleRetour) return refus("adresse-retour-requise", 400);
      if (adresseRetour && adresseRetour !== actuelleRetour) {
        changements.adresse_retour = adresseRetour;
        historique.push({ champ: "adresse_retour", ancien: actuelleRetour, nouveau: adresseRetour });
      }
    }

    if (typeof corps.volRetour === "string") {
      const volRetour = corps.volRetour.trim().slice(0, 20) || null;
      if (volRetour !== (r.vol_retour || null)) {
        changements.vol_retour = volRetour;
        historique.push({ champ: "vol_retour", ancien: r.vol_retour || null, nouveau: volRetour });
      }
    }
  }

  const reponse = () =>
    NextResponse.json({
      ok: true,
      adresse: "adresse" in changements ? changements.adresse : actuelleAller,
      adresseRetour: "adresse_retour" in changements ? changements.adresse_retour : actuelleRetour,
      volRetour: "vol_retour" in changements ? changements.vol_retour : r.vol_retour || null,
    });

  if (historique.length === 0) return reponse();

  const ok = await mettreAJour(
    "reservations",
    { colonne: "reference", valeur: reference },
    changements,
  );
  if (!ok) return refus("enregistrement-impossible", 500);

  await Promise.all(
    historique.map((ligne) =>
      inserer("modifications", {
        reference,
        statut: "appliquee",
        langue,
        source: "client",
        ...ligne,
      }),
    ),
  );

  /*
    Une course de moins de 48 heures est peut-être déjà préparée sans adresse :
    c'est la seule que l'exploitant doit apprendre par e-mail. Les autres, il
    les voit passer du rouge au normal dans le back-office.
  */
  const proche = (d: Date | null) => d !== null && d.getTime() - Date.now() < 48 * 3600 * 1000;
  const urgent =
    ("adresse" in changements && proche(aller)) ||
    (("adresse_retour" in changements || "vol_retour" in changements) && proche(retour));
  const exploitant = process.env.EMAIL_EXPLOITANT;

  if (urgent && exploitant) {
    const quand = (d: Date) =>
      d.toLocaleString("fr-FR", {
        timeZone: FUSEAU_ALPES,
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    const trajet = `${airportParSlug(r.airport)?.name ?? r.airport} → ${
      resortParSlug(r.resort)?.name ?? r.resort
    }`;
    const libelles: Record<string, string> = {
      adresse: "Adresse à l’aller",
      adresse_retour: "Adresse au retour",
      vol_retour: "Vol retour",
    };

    await envoyer({
      destinataire: exploitant,
      sujet: `ADRESSE REÇUE — course dans moins de 48 h · ${quand(aller)} · ${trajet}`,
      texte: [
        "Le client a complété sa réservation depuis son lien de gestion.",
        "",
        ...historique.map((l) => `${libelles[l.champ] ?? l.champ} : ${l.nouveau ?? "—"}`),
        "",
        `Prise en charge : ${quand(aller)}`,
        ...(retour ? [`Retour          : ${quand(retour)}`] : []),
        `Référence       : ${reference}`,
        "",
        "Fiche du client :",
        `${origineSite(requete)}${cheminFiche(reference)}`,
      ].join("\n"),
    });
  }

  return reponse();
}
