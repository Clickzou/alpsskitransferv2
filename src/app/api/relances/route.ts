import { NextResponse } from "next/server";
import { airportParSlug } from "@/lib/airports";
import { LOCALES, type Lang } from "@/lib/i18n";
import { origineSite } from "@/lib/reservation/config";
import { cheminFiche } from "@/lib/reservation/demandes";
import { envoyer } from "@/lib/reservation/email";
import { lienGestion } from "@/lib/reservation/gestion";
import {
  aRappeler,
  aSignaler,
  prochainePrise,
  type LigneRelance,
} from "@/lib/reservation/relances";
import { inserer, lire } from "@/lib/reservation/supabase";
import { TEXTES_ADRESSES } from "@/lib/reservation/textes-adresses";
import { resortParSlug } from "@/lib/resorts";
import { FUSEAU_ALPES, formaterAlpes } from "@/lib/temps";

/**
 * La relance du matin — tâche planifiée Vercel (`vercel.json`), chaque jour.
 *
 * Deux envois, sur les courses payées des quatre prochains jours auxquelles il
 * manque une adresse (`lib/reservation/relances.ts`) :
 *
 * - au client, un rappel dans sa langue trois jours avant sa prochaine prise
 *   en charge, avec son lien — une seule fois par réservation : le rappel est
 *   noté dans l'historique, et la tâche le relit avant d'écrire ;
 * - à l'exploitant, un récapitulatif des courses des 48 prochaines heures
 *   encore sans adresse, avec le lien vers chaque fiche — pour qu'il appelle.
 *
 * ## Fermée
 *
 * Vercel appelle la tâche avec `Authorization: Bearer <CRON_SECRET>`. Sans ce
 * secret, ou sans la variable, elle répond 404 : sinon n'importe qui pourrait
 * faire partir des e-mails à tous les clients.
 *
 * GET /api/relances
 */
export const dynamic = "force-dynamic";

const LANGUES: Lang[] = ["en", "fr", "de", "it"];

export async function GET(requete: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || requete.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  }

  const maintenant = new Date();
  const debut = maintenant.toISOString();
  const fin = new Date(maintenant.getTime() + 96 * 3600 * 1000).toISOString();

  const lignes = await lire<LigneRelance>("reservations", {
    colonnes:
      "reference,statut,airport,resort,aller,retour,retour_resort,adresse,adresse_retour,client_nom,client_email,client_telephone,langue",
    filtres: [{ colonne: "statut", operateur: "eq", valeur: "payee" }],
    parametres: {
      or: `(and(aller.gte."${debut}",aller.lte."${fin}"),and(retour.gte."${debut}",retour.lte."${fin}"))`,
    },
    tri: { colonne: "aller", croissant: true },
    limite: 500,
  });

  const trajet = (l: LigneRelance) =>
    `${airportParSlug(l.airport)?.name ?? l.airport} → ${resortParSlug(l.resort)?.name ?? l.resort}`;
  const origine = origineSite(requete);

  // Les rappels au client — une seule fois par réservation.
  const aRelancer = lignes.filter((l) => aRappeler(l, maintenant));
  const deja = aRelancer.length
    ? await lire<{ reference: string }>("modifications", {
        colonnes: "reference",
        filtres: [
          { colonne: "champ", operateur: "eq", valeur: "relance" },
          {
            colonne: "reference",
            operateur: "in",
            valeur: `(${aRelancer.map((l) => l.reference).join(",")})`,
          },
        ],
      })
    : [];
  const dejaRelancees = new Set(deja.map((d) => d.reference));

  let rappels = 0;
  for (const l of aRelancer) {
    if (dejaRelancees.has(l.reference)) continue;
    const langue = LANGUES.includes(l.langue as Lang) ? (l.langue as Lang) : "en";
    const lien = lienGestion(origine, l.reference, langue);
    const prise = prochainePrise(l, maintenant);
    if (!lien || !prise) continue;

    const mots = TEXTES_ADRESSES[langue];
    const envoye = await envoyer({
      destinataire: l.client_email,
      sujet: mots.relanceSujet(l.reference),
      texte: mots.relanceCorps({
        trajet: trajet(l),
        quand: formaterAlpes(prise, LOCALES[langue], {
          weekday: "long",
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        }),
        lien: `${lien}#adresses`,
      }),
    });
    if (!envoye) continue;

    rappels += 1;
    await inserer("modifications", {
      reference: l.reference,
      champ: "relance",
      ancien: null,
      nouveau: "rappel d’adresse envoyé au client",
      statut: "transmise",
      langue,
      source: "exploitant",
    });
  }

  // Le récapitulatif de l'exploitant — seulement s'il y a quelque chose à faire.
  const aAppeler = lignes.filter((l) => aSignaler(l, maintenant));
  const exploitant = process.env.EMAIL_EXPLOITANT;
  if (aAppeler.length > 0 && exploitant) {
    const quand = (d: Date) =>
      d.toLocaleString("fr-FR", {
        timeZone: FUSEAU_ALPES,
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });

    await envoyer({
      destinataire: exploitant,
      sujet: `ADRESSES MANQUANTES — ${aAppeler.length} course${aAppeler.length > 1 ? "s" : ""} dans les 48 h`,
      texte: [
        "Ces courses payées partent dans moins de 48 heures, et le client n’a pas donné",
        "toutes ses adresses. À appeler :",
        "",
        ...aAppeler.flatMap((l) => {
          const prise = prochainePrise(l, maintenant);
          return [
            `• ${prise ? quand(prise) : "?"} · ${trajet(l)}`,
            `  ${l.client_nom} · ${l.client_telephone} · ${l.reference}`,
            `  ${origine}${cheminFiche(l.reference)}`,
            "",
          ];
        }),
      ].join("\n"),
    });
  }

  return NextResponse.json({ ok: true, rappels, aAppeler: aAppeler.length });
}
