import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * L'état de configuration de cet environnement — sans jamais dire les valeurs.
 *
 * ## Pourquoi cette route existe
 *
 * Les variables d'environnement de Vercel sont marquées « Secret » : une fois
 * enregistrées, l'interface ne les relit plus. Quand le moteur refuse une
 * réservation avec « booking is not open yet », impossible de savoir laquelle
 * des onze clés manque — on remplace tout à l'aveugle, ce qui casse ce qui
 * marchait. Cette sonde répond exactement à la question posée : quelles
 * variables le processus voit-il réellement, ici, maintenant.
 *
 * C'est un outil de mise en ligne, pas de développement : il sert le jour où
 * l'on bascule les clés de test vers les clés réelles, et à chaque fois qu'un
 * environnement se comporte autrement qu'un autre.
 *
 * ## Ce qu'elle ne renvoie jamais
 *
 * Aucune valeur. Pour chaque variable : présente ou non, sa longueur, et pour
 * les clés à préfixe conventionnel (`sk_test_`, `re_`, `whsec_`) ce seul
 * préfixe — qui dit si l'on est en test ou en réel sans rien livrer. La
 * longueur et le préfixe ne permettent pas de reconstituer une clé ; ils
 * suffisent à repérer une valeur tronquée au copier-coller, qui est la panne la
 * plus fréquente.
 *
 * ## Définie et vide n'est pas absente
 *
 * Les deux se ressemblent — `process.env.X` est faux dans les deux cas — et se
 * réparent autrement : une variable absente s'ajoute, une variable vide doit
 * d'abord être supprimée, sans quoi Vercel refuse l'ajout au motif qu'elle
 * existe déjà. C'est exactement la boucle où l'on tourne le 10 septembre 2026,
 * et la raison pour laquelle la sonde distingue les deux états.
 *
 * ## Pourquoi elle est fermée
 *
 * La carte des services d'un site est un renseignement en soi : savoir que
 * Stripe est en test et Resend absent aide qui cherche une faille. La sonde
 * exige donc `SECRET_GESTION` en en-tête, comparé en temps constant, et se tait
 * autrement — 404, pas 401 : une route qui répond « non autorisé » confirme
 * qu'elle existe.
 *
 * GET /api/diagnostic/  ·  en-tête `x-diagnostic: <SECRET_GESTION>`
 */
export const dynamic = "force-dynamic";

/** Variables lues par le moteur, et ce que chacune ouvre. */
const ATTENDUES: { nom: string; role: string; prefixe?: boolean }[] = [
  { nom: "NEXT_PUBLIC_SUPABASE_URL", role: "base de données" },
  { nom: "NEXT_PUBLIC_SUPABASE_ANON_KEY", role: "connexion au back-office", prefixe: true },
  { nom: "SUPABASE_SERVICE_ROLE_KEY", role: "écriture des réservations", prefixe: true },
  { nom: "STRIPE_SECRET_KEY", role: "création des paiements", prefixe: true },
  { nom: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", role: "affichage du paiement", prefixe: true },
  { nom: "STRIPE_WEBHOOK_SECRET", role: "passage au statut payée", prefixe: true },
  { nom: "RESEND_API_KEY", role: "envoi des e-mails", prefixe: true },
  { nom: "EMAIL_EXPEDITEUR", role: "expéditeur des e-mails" },
  { nom: "EMAIL_EXPLOITANT", role: "destinataires de l'avis de course" },
  { nom: "SECRET_GESTION", role: "liens « gérer ma réservation »" },
  { nom: "BAREME_VALIDE", role: "autorisation d'encaisser" },
  { nom: "NEXT_PUBLIC_MOTEUR_RESERVATION", role: "moteur interne ou repli WooCommerce" },
  { nom: "NEXT_PUBLIC_INDEXATION", role: "ouverture aux moteurs de recherche" },
];

/** Le préfixe conventionnel d'une clé — `sk_test_`, `re_`… — ou rien. */
function prefixeDe(valeur: string): string | null {
  const marque = valeur.match(/^(sk_test|sk_live|pk_test|pk_live|whsec|re|sb_publishable|sb_secret)_/);
  return marque ? `${marque[1]}_…` : null;
}

function autorise(requete: Request): boolean {
  const attendu = process.env.SECRET_GESTION?.trim();
  const fourni = requete.headers.get("x-diagnostic")?.trim();
  if (!attendu || !fourni) return false;

  const a = Buffer.from(attendu, "utf8");
  const b = Buffer.from(fourni, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(requete: Request) {
  if (!autorise(requete)) {
    return NextResponse.json({ erreur: "Not found." }, { status: 404 });
  }

  const variables = ATTENDUES.map(({ nom, role, prefixe }) => {
    const valeur = process.env[nom];
    const definie = nom in process.env;
    return {
      nom,
      role,
      // Trois états, pas deux : le remède n'est pas le même pour chacun.
      etat: !definie ? "absente" : valeur ? "renseignée" : "définie mais vide",
      longueur: valeur?.length ?? 0,
      prefixe: valeur && prefixe ? prefixeDe(valeur) : undefined,
    };
  });

  return NextResponse.json({
    environnement: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    deploiement: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    aCorriger: variables.filter((v) => v.etat !== "renseignée").map((v) => `${v.nom} (${v.etat})`),
    variables,
  });
}
