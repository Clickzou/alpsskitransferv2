"use server";

import { redirect } from "next/navigation";
import { connexion, deconnexion } from "@/lib/admin/session";

/**
 * Les deux actions du back-office : entrer, sortir.
 *
 * Elles vivent dans un fichier `"use server"` séparé plutôt que dans la page,
 * parce qu'elles sont appelées depuis deux écrans différents et qu'une action
 * de serveur exportée depuis un composant client ne compile pas.
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

  redirect("/gestion-ventes-tarifs-seo/");
}

export async function actionDeconnexion(): Promise<void> {
  await deconnexion();
  redirect("/gestion-ventes-tarifs-seo/connexion/");
}
