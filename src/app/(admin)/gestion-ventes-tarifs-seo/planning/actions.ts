"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { inserer, lire, mettreAJour } from "@/lib/reservation/supabase";

/**
 * Inscrire le chauffeur et la note d'un trajet — l'onglet Planning.
 *
 * Un trajet par envoi, l'aller ou le retour. Seul ce qui change est écrit, et
 * entre dans l'historique de la fiche : le jour où deux chauffeurs se
 * présentent, on sait qui a inscrit qui.
 *
 * Le retour se fait vers la page d'où venait le formulaire, sur la même vue et
 * la même date — mais seulement à l'intérieur du planning : une adresse de
 * retour prise dans le formulaire ne doit pas pouvoir envoyer ailleurs.
 */

const PLANNING = "/gestion-ventes-tarifs-seo/planning/";

function texte(donnees: FormData, cle: string, taille: number): string | null {
  const v = String(donnees.get(cle) ?? "").replace(/\s+/g, " ").trim().slice(0, taille);
  return v || null;
}

export async function actionPlanning(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/gestion-ventes-tarifs-seo/connexion/");

  const brut = String(donnees.get("retour") ?? "");
  const retour = brut.startsWith(PLANNING) && !brut.includes("//") ? brut.split("#")[0] : PLANNING;
  const reference = String(donnees.get("reference") ?? "");
  const sens = donnees.get("sens") === "retour" ? "retour" : "aller";
  /*
    Pas d'ancre dans l'adresse de retour : avec un « # », le navigateur restait
    sur la page déjà affichée, la carte ouverte et « Sans chauffeur », alors que
    l'enregistrement était fait (test de JC, 15 septembre 2026).
  */
  const sansFait = retour.replace(/([?&])fait=[^&]*&?/, "$1").replace(/[?&]$/, "");
  const avec = (fait: string) => `${sansFait}${sansFait.includes("?") ? "&" : "?"}fait=${fait}`;

  if (!/^AST-[0-9A-Z]{6,8}$/.test(reference)) redirect(avec("introuvable"));

  const colChauffeur = sens === "retour" ? "chauffeur_retour" : "chauffeur";
  const colNote = sens === "retour" ? "note_planning_retour" : "note_planning";
  const chauffeur = texte(donnees, "chauffeur", 60);
  const note = String(donnees.get("note") ?? "").trim().slice(0, 500) || null;

  const [ligne] = await lire<Record<string, string | null>>("reservations", {
    colonnes: `reference,${colChauffeur},${colNote}`,
    filtres: [{ colonne: "reference", operateur: "eq", valeur: reference }],
    limite: 1,
  });
  // Sans ligne lisible : la réservation n'existe pas, ou les colonnes non plus.
  if (!ligne) redirect(avec("migration"));

  const changements: Record<string, string | null> = {};
  if ((ligne[colChauffeur] ?? null) !== chauffeur) changements[colChauffeur] = chauffeur;
  if ((ligne[colNote] ?? null) !== note) changements[colNote] = note;
  if (Object.keys(changements).length === 0) redirect(avec("inchange"));

  const ecrit = await mettreAJour("reservations", { colonne: "reference", valeur: reference }, changements);
  if (!ecrit) redirect(avec("echec"));

  for (const [champ, nouveau] of Object.entries(changements)) {
    await inserer("modifications", {
      reference,
      champ,
      ancien: ligne[champ] ?? null,
      nouveau: nouveau ? `${nouveau} — par ${utilisateur.email}` : `effacé par ${utilisateur.email}`,
      statut: "appliquee",
      source: "exploitant",
    });
  }

  // La page et la fiche relisent la base : sans cela, le routeur ressert l'ancienne version.
  revalidatePath("/gestion-ventes-tarifs-seo", "layout");
  redirect(avec("enregistre"));
}
