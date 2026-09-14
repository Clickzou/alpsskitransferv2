"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { apercuGrille, type LigneApercu } from "@/lib/tarification/apercu";
import { validerGrille } from "@/lib/tarification/grille";
import { grilleActive, grilleParId, publierGrille } from "@/lib/tarification/grilles-publiees";

/**
 * Les actions de l'onglet Tarifs : voir, publier, revenir en arrière.
 *
 * La grille arrive du navigateur en entier et se revalide ici à chaque geste :
 * l'aperçu comme la publication passent par `validerGrille`, si bien qu'on ne
 * publie jamais autre chose que ce qu'on a pu voir.
 */

const ICI = "/gestion-ventes-tarifs-seo/tarifs/";

export type ReponseApercu = { erreurs: string[] } | { lignes: LigneApercu[] };

export async function actionApercuGrille(brut: unknown): Promise<ReponseApercu> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const valide = validerGrille(brut);
  if (!valide.ok) return { erreurs: valide.erreurs };
  return { lignes: apercuGrille(await grilleActive(), valide.grille) };
}

export async function actionPublierGrille(
  brut: unknown,
  note: string,
): Promise<{ erreurs: string[] } | { ok: true }> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const valide = validerGrille(brut);
  if (!valide.ok) return { erreurs: valide.erreurs };
  const publiee = await publierGrille(
    valide.grille,
    utilisateur.email,
    note.replace(/\s+/g, " ").trim().slice(0, 200) || null,
  );
  if (!publiee) {
    return {
      erreurs: [
        "La publication n’a pas pu être enregistrée : la table des tarifs n’existe peut-être pas encore. Prévenez Clickzou.",
      ],
    };
  }
  revalidatePath(ICI);
  return { ok: true };
}

/** « Revenir à cette version » : son contenu est republié, l'historique ne perd rien. */
export async function actionRevenirGrille(donnees: FormData): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const id = Number(donnees.get("id"));
  const ancienne = Number.isInteger(id) ? await grilleParId(id) : null;
  const valide = ancienne ? validerGrille(ancienne.contenu) : null;
  if (!ancienne || !valide?.ok) redirect(`${ICI}?fait=version-introuvable`);

  const publiee = await publierGrille(
    valide.grille,
    utilisateur.email,
    `Retour à la version n° ${ancienne.id} du ${new Date(ancienne.publie_le).toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" })}`,
  );
  redirect(`${ICI}?fait=${publiee ? "version-restauree" : "echec"}`);
}
