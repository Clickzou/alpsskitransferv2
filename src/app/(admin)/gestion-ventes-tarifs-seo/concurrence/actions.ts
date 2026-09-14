"use server";

import { after } from "next/server";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { CRENEAU_DU_JOUR, prixSous } from "@/lib/concurrence/comparaison";
import { CODES_LIEUX, TRAJETS_PAR_DEFAUT } from "@/lib/concurrence/lieux";
import { releverLot, trajetsSuivis } from "@/lib/concurrence/releve";
import { tableauConcurrence, type Filtres } from "@/lib/concurrence/tableau";
import { ecrireLignes, lire, supprimer } from "@/lib/reservation/supabase";
import { validerGrille, type Grille } from "@/lib/tarification/grille";
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

const retour = (filtres: Filtres, fait: string, detail?: string): never =>
  redirect(
    `${ICI}?jour=${filtres.jour}&passagers=${filtres.passagers}&gamme=${filtres.gamme}&fait=${fait}${
      detail ? `&detail=${encodeURIComponent(detail)}` : ""
    }`,
  );

/**
 * « Être X € moins cher » sur les trajets cochés — demande de JC, 14 septembre 2026.
 *
 * Tout se recalcule ici, rien n'est pris du navigateur que les trajets, l'écart
 * et les filtres : le prix du concurrent le moins cher vient du dernier relevé,
 * notre véhicule de la grille en vigueur. Chaque trajet reçoit un prix fixe pour
 * ce véhicule et ce moment — le mercredi en « semaine, jour », le samedi en
 * « week-end, jour » —, et le tout se publie en une seule version de la grille,
 * que l'onglet Tarifs permet d'annuler en un clic.
 */
export async function actionAligner(donnees: FormData): Promise<void> {
  const utilisateur = await exigerSession();
  const filtres: Filtres = {
    jour: donnees.get("jour") === "samedi" ? "samedi" : "mercredi",
    passagers: donnees.get("passagers") === "2" ? 2 : donnees.get("passagers") === "8" ? 8 : 4,
    gamme: donnees.get("gamme") === "premium" ? "premium" : "standard",
  };
  const ecart = Number(String(donnees.get("ecart") ?? "").replace(",", "."));
  if (!Number.isFinite(ecart) || ecart < 0 || ecart > 500) return retour(filtres, "ecart-illisible");
  const choisis = new Set(donnees.getAll("trajet").map(String));
  if (choisis.size === 0) return retour(filtres, "rien-choisi");

  const grille = await grilleActive();
  const { lignes } = await tableauConcurrence(grille, filtres);
  const nouvelle: Grille = JSON.parse(JSON.stringify(grille));
  const creneau = CRENEAU_DU_JOUR[filtres.jour];
  let alignes = 0;

  for (const l of lignes) {
    if (!choisis.has(`${l.airport}|${l.resort}`) || !l.nous) continue;
    const prix = prixSous([l.alps2alps.prix, l.alpy.prix], ecart);
    if (prix === null) continue;
    let fixe = nouvelle.prixFixes.find((p) => p.airport === l.airport && p.resort === l.resort);
    if (!fixe) {
      fixe = { airport: l.airport, resort: l.resort, prix: {} };
      nouvelle.prixFixes.push(fixe);
    }
    fixe.prix[l.nous.categorie] = { ...(fixe.prix[l.nous.categorie] ?? {}), [creneau]: prix };
    alignes += 1;
  }
  if (alignes === 0) return retour(filtres, "rien-a-aligner");

  const valide = validerGrille(nouvelle);
  if (!valide.ok) return retour(filtres, "grille-refusee", valide.erreurs[0]);
  const note = `Concurrence : ${alignes} trajet${alignes > 1 ? "s" : ""} à ${ecart} € sous le moins cher (${filtres.jour}, ${filtres.passagers} passagers, ${filtres.gamme})`;
  const publiee = await publierGrille(valide.grille, utilisateur.email, note);
  return retour(filtres, publiee ? "aligne" : "echec", String(alignes));
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
