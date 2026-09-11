/**
 * Où revenir après la connexion au back-office.
 *
 * L'e-mail « à valider » mène à la fiche d'un client ; si la session a
 * expiré, la connexion s'intercale — et doit ramener sur cette fiche, pas sur
 * la liste, sans quoi l'exploitant qui clique depuis son téléphone devrait
 * retrouver la course à la main.
 *
 * Mais une adresse de retour prise dans l'URL est la porte classique d'une
 * redirection ouverte : `?suite=https://site-piege.example` ferait passer un
 * faux écran de connexion pour le nôtre. On n'accepte donc qu'un chemin
 * **à l'intérieur du back-office**, jamais une adresse complète.
 */
export const ACCUEIL_ADMIN = "/gestion-ventes-tarifs-seo/";

export function suiteSure(suite: unknown): string {
  if (typeof suite !== "string") return ACCUEIL_ADMIN;
  if (!suite.startsWith(ACCUEIL_ADMIN)) return ACCUEIL_ADMIN;
  // `//hote` et `\hote` sont lus comme des adresses d'un autre site par certains navigateurs.
  if (suite.includes("//") || suite.includes("\\")) return ACCUEIL_ADMIN;
  return suite;
}
