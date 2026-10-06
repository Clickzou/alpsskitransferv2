import { redirect } from "next/navigation";

/**
 * Ancien onglet « Stats SEO » : les statistiques SEO et la visibilité IA vivent
 * désormais dans le tableau de bord Clickzou (règle de JC du 05/10/2026). Les
 * favoris et anciens liens sont renvoyés vers son onglet Statistiques.
 */
export default function AncienneStatsSeo() {
  redirect("https://clickzou.fr/espace-client/dashboard/stats/");
}
