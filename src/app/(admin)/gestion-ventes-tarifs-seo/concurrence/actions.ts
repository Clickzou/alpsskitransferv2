"use server";

import { after } from "next/server";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { appliquerPlan, planAlignement } from "@/lib/concurrence/alignement";
import { CODES_LIEUX, TRAJETS_PAR_DEFAUT } from "@/lib/concurrence/lieux";
import { releverLot, trajetsSuivis } from "@/lib/concurrence/releve";
import { dernierReleve } from "@/lib/concurrence/tableau";
import { ecrireLignes, lire, supprimer } from "@/lib/reservation/supabase";
import { validerGrille } from "@/lib/tarification/grille";
import { grilleActive, publierGrille } from "@/lib/tarification/grilles-publiees";

/**
 * Les actions de l'onglet Concurrence : s'aligner sous les concurrents,
 * modifier la liste suivie, lancer un relevé.
 */

const ICI = "/gestion-ventes-tarifs-seo/concurrence/";

async function exigerSession() {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);
  return utilisateur;
}

/**
 * « Mettre à jour tous nos tarifs » — demande de JC, 14 septembre 2026.
 *
 * Un seul geste pour tous les trajets suivis, tous les véhicules, en semaine
 * comme le week-end, de jour comme de nuit : chaque prix est recalé à X € sous
 * le concurrent le moins cher, à la hausse comme à la baisse
 * (`planAlignement`). Rien ne vient du navigateur que l'écart : le plan se
 * recalcule ici sur le dernier relevé et la grille en vigueur, puis se publie
 * en une seule version de la grille, que l'onglet Tarifs défait en un clic.
 */
export async function actionMettreAJourTarifs(donnees: FormData): Promise<void> {
  const utilisateur = await exigerSession();
  const ecart = Number(String(donnees.get("ecart") ?? "").replace(",", "."));
  const retour = (fait: string, detail?: string): never =>
    redirect(`${ICI}?ecart=${Number.isFinite(ecart) ? ecart : 5}&fait=${fait}${detail ? `&detail=${encodeURIComponent(detail)}` : ""}`);
  if (!Number.isFinite(ecart) || ecart < -500 || ecart > 500) return retour("ecart-illisible");

  const [grille, trajets, releve] = await Promise.all([grilleActive(), trajetsSuivis(), dernierReleve()]);
  if (!releve) return retour("releve-trop-ancien");
  const plan = planAlignement(grille, trajets, releve.lignes, ecart);
  if (plan.changements.length === 0) return retour("rien-a-changer");

  const valide = validerGrille(appliquerPlan(grille, plan));
  if (!valide.ok) return retour("grille-refusee", valide.erreurs[0]);
  const hausses = plan.changements.filter((c) => c.avant !== null && c.apres > c.avant).length;
  const note = `Concurrence : tarifs recalés à ${ecart} € sous le moins cher (relevé du ${releve.date}) — ${plan.changements.length} prix, dont ${hausses} hausses`;
  const publiee = await publierGrille(valide.grille, utilisateur.email, note);
  return retour(publiee ? "tarifs-mis-a-jour" : "echec", String(plan.changements.length));
}

/** La liste suivie vit en base dès sa première modification : on y recopie la liste par défaut. */
async function listeEnBase(): Promise<{ airport: string; resort: string }[]> {
  const existants = await lire<{ airport: string; resort: string }>("concurrence_trajets", {
    colonnes: "airport,resort",
    limite: 1,
  });
  if (existants.length === 0) {
    await ecrireLignes(
      "concurrence_trajets",
      TRAJETS_PAR_DEFAUT.map(([airport, resort], ordre) => ({ airport, resort, ordre })),
      "airport,resort",
    );
  }
  return trajetsSuivis();
}

export async function actionAjouterTrajet(donnees: FormData): Promise<void> {
  await exigerSession();
  const airport = String(donnees.get("airport") ?? "");
  const resort = String(donnees.get("resort") ?? "");
  if (!CODES_LIEUX[airport] || !CODES_LIEUX[resort]) redirect(`${ICI}?fait=trajet-inconnu`);
  const liste = await listeEnBase();
  const ok = await ecrireLignes("concurrence_trajets", [{ airport, resort, ordre: liste.length }], "airport,resort");
  redirect(`${ICI}?fait=${ok ? "trajet-ajoute" : "echec"}#trajets`);
}

export async function actionRetirerTrajet(donnees: FormData): Promise<void> {
  await exigerSession();
  await listeEnBase();
  const ok = await supprimer("concurrence_trajets", [
    { colonne: "airport", valeur: String(donnees.get("airport") ?? "") },
    { colonne: "resort", valeur: String(donnees.get("resort") ?? "") },
  ]);
  redirect(`${ICI}?fait=${ok ? "trajet-retire" : "echec"}#trajets`);
}

/**
 * « Relever maintenant » : le premier lot de cinq trajets, en arrière-plan —
 * la page répond tout de suite, les prix arrivent en deux à trois minutes. Le
 * reste de la liste attend la nuit : tout relever d'un coup ferait des
 * centaines de demandes en rafale chez les concurrents.
 */
export async function actionReleverMaintenant(): Promise<void> {
  await exigerSession();
  after(async () => {
    await releverLot(0);
  });
  redirect(`${ICI}?fait=releve-lance`);
}
