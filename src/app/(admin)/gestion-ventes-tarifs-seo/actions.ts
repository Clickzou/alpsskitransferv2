"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ENTREPRISE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { connexion, deconnexion, utilisateurCourant } from "@/lib/admin/session";
import { suiteSure } from "@/lib/admin/suite";
import { LOCALES, type Lang } from "@/lib/i18n";
import { origineSite } from "@/lib/reservation/config";
import { cheminFiche, demandesEnAttente, STATUT_ATTENTE } from "@/lib/reservation/demandes";
import { envoyer } from "@/lib/reservation/email";
import { lienGestion } from "@/lib/reservation/gestion";
import { lire, mettreAJour } from "@/lib/reservation/supabase";
import { textesDecision } from "@/lib/reservation/textes-decision";
import { resortParSlug } from "@/lib/resorts";
import { formaterAlpes } from "@/lib/temps";

/**
 * Les actions du back-office : entrer, sortir, et trancher une demande.
 *
 * Elles vivent dans un fichier `"use server"` séparé plutôt que dans la page,
 * parce qu'elles sont appelées depuis plusieurs écrans et qu'une action de
 * serveur exportée depuis un composant client ne compile pas.
 */

export async function actionConnexion(
  _etat: string | null,
  donnees: FormData,
): Promise<string | null> {
  const email = String(donnees.get("email") ?? "").trim();
  const motDePasse = String(donnees.get("motDePasse") ?? "");

  if (!email || !motDePasse) return "Renseignez votre e-mail et votre mot de passe.";

  const erreur = await connexion(email, motDePasse);
  if (erreur) return erreur;

  // Retour là où l'on allait — la fiche d'un client, depuis l'e-mail « à valider ».
  redirect(suiteSure(donnees.get("suite")));
}

export async function actionDeconnexion(): Promise<void> {
  await deconnexion();
  redirect("/gestion-ventes-tarifs-seo/connexion/");
}

/** L'exploitant valide la nouvelle heure : elle s'applique, et le client en est averti. */
export async function actionValider(donnees: FormData): Promise<void> {
  await trancher(donnees, "acceptee");
}

/** L'exploitant refuse : l'heure d'origine tient, et le client en est averti. */
export async function actionRefuser(donnees: FormData): Promise<void> {
  await trancher(donnees, "refusee");
}

interface Reservation {
  reference: string;
  airport: string;
  resort: string;
  aller: string;
  retour: string | null;
  client_email: string;
}

/**
 * Tranche une demande de changement d'horaire.
 *
 * Tout se revérifie ici, au moment du clic, et rien n'est pris du formulaire
 * sauf la référence et le lot : les heures viennent de la base. La demande
 * doit être **encore** en attente — déjà traitée, ou remplacée par une plus
 * récente du client, elle ne se valide plus. Et une heure validée doit tenir
 * debout : pas dans le passé, pas un retour avant l'aller.
 */
async function trancher(donnees: FormData, decision: "acceptee" | "refusee"): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const reference = String(donnees.get("reference") ?? "");
  const lot = String(donnees.get("lot") ?? "");
  const retourFiche = (fait: string): never => redirect(`${cheminFiche(reference)}?fait=${fait}`);

  if (!reference || !lot) return retourFiche("perimee");

  const lignes = (await demandesEnAttente(reference)).filter((l) => l.lot === lot);
  if (lignes.length === 0) return retourFiche("perimee");

  const [reservation] = await lire<Reservation>("reservations", {
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  if (!reservation) return retourFiche("perimee");

  const nouvelAller = lignes.find((l) => l.champ === "aller")?.nouveau ?? null;
  const nouveauRetour = lignes.find((l) => l.champ === "retour")?.nouveau ?? null;

  // Les heures qui tiendront après la décision : les demandées si l'on valide, les d'origine sinon.
  const aller = new Date(
    decision === "acceptee" && nouvelAller ? nouvelAller : reservation.aller,
  );
  const retourIso =
    decision === "acceptee" && nouveauRetour ? nouveauRetour : reservation.retour;
  const retour = retourIso ? new Date(retourIso) : null;

  if (decision === "acceptee") {
    const maintenant = Date.now();
    if (
      (nouvelAller && new Date(nouvelAller).getTime() <= maintenant) ||
      (nouveauRetour && new Date(nouveauRetour).getTime() <= maintenant)
    ) {
      return retourFiche("passee");
    }
    if (retour && retour.getTime() <= aller.getTime()) return retourFiche("incoherente");

    const champs: Record<string, string> = {};
    if (nouvelAller) champs.aller = nouvelAller;
    if (nouveauRetour) champs.retour = nouveauRetour;
    const ok = await mettreAJour(
      "reservations",
      { colonne: "reference", valeur: reference },
      champs,
    );
    if (!ok) return retourFiche("echec");
  }

  await mettreAJour(
    "modifications",
    [
      { colonne: "reference", valeur: reference },
      { colonne: "lot", valeur: lot },
      { colonne: "statut", valeur: STATUT_ATTENTE },
    ],
    { statut: decision, traite_le: new Date().toISOString(), traite_par: utilisateur.email },
  );

  /*
    La réponse au client, dans la langue de sa demande.

    L'origine sert à fabriquer son lien de gestion : `origineSite` ignore
    l'hôte de la requête en production — il se falsifie — et ne s'en sert
    qu'en développement, où le lien doit mener au serveur local.
  */
  const langue = lignes[0].langue ?? "en";
  const mots = textesDecision(langue);
  const locale = LOCALES[langue as Lang] ?? LOCALES.en;
  const lisible = (d: Date) =>
    formaterAlpes(d, locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  const entetes = await headers();
  const origine = origineSite(
    new Request(`${entetes.get("x-forwarded-proto") ?? "http"}://${entetes.get("host") ?? "localhost"}`),
  );

  const details = {
    reference,
    trajet: `${airportParSlug(reservation.airport)?.name ?? reservation.airport} → ${
      resortParSlug(reservation.resort)?.name ?? reservation.resort
    }`,
    aller: lisible(aller),
    retour: retour ? lisible(retour) : null,
    lien: lienGestion(origine, reference, langue),
    telephone: ENTREPRISE.telephoneAffiche,
  };

  const envoye = await envoyer({
    destinataire: reservation.client_email,
    sujet:
      decision === "acceptee" ? mots.sujetValidee(reference) : mots.sujetRefusee(reference),
    texte: decision === "acceptee" ? mots.corpsValidee(details) : mots.corpsRefusee(details),
  });

  const fait = decision === "acceptee" ? "valide" : "refuse";
  return retourFiche(envoye ? fait : `${fait}-sans-email`);
}
