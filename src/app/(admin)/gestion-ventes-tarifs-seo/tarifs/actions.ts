"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { apercuGrille, type LigneApercu } from "@/lib/tarification/apercu";
import { GRILLE_DEFAUT, validerGrille } from "@/lib/tarification/grille";
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
  revalidatePath(ICI);
  redirect(`${ICI}?fait=${publiee ? "version-restauree" : "echec"}`);
}

/**
 * « Revenir aux tarifs d'origine » — demande de JC, 15 septembre 2026 : « si
 * jamais il y a trop de modifs et que l'on est perdu ». Le bouton « Revenir à
 * cette version » n'existe qu'à partir de deux publications ; celui-ci sert
 * aussi quand il n'y en a qu'une.
 *
 * Les tarifs d'origine sont ceux du code (`GRILLE_DEFAUT`), republiés comme une
 * version de plus : l'historique garde tout ce qui précède, on peut donc
 * revenir aussi sur ce retour.
 */
export async function actionTarifsOrigine(): Promise<void> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);

  const publiee = await publierGrille(GRILLE_DEFAUT, utilisateur.email, "Retour aux tarifs d'origine");
  revalidatePath(ICI);
  redirect(`${ICI}?fait=${publiee ? "origine-restauree" : "echec"}`);
}
