import { cookies } from "next/headers";
import { emailAutorise } from "@/lib/admin/acces";

/**
 * L'authentification du back-office, sur Supabase Auth, en REST.
 *
 * ## Pourquoi pas le SDK
 *
 * Le site tient sur trois dépendances de production — next, react, react-dom —
 * et `@supabase/ssr` en ajouterait deux de plus, chargées sur **toutes** les
 * pages du site public alors qu'elles ne servent qu'à trois écrans réservés à
 * l'exploitant. L'API d'authentification de Supabase est du HTTP : un `POST`
 * pour ouvrir la session, un `GET` pour la vérifier. Une centaine de lignes,
 * et le paquet du visiteur ne bouge pas d'un octet.
 *
 * ## Comment la session tient
 *
 * Le jeton d'accès vit dans un cookie `httpOnly`, `secure`, `sameSite: lax` :
 * le navigateur ne peut pas le lire, donc un script injecté ne peut pas le
 * voler. Sa durée suit celle du jeton Supabase — une heure — et le jeton de
 * rafraîchissement, dans un second cookie, permet de la prolonger sans
 * redemander le mot de passe.
 *
 * ## Comment la session est vérifiée
 *
 * Par un appel à `/auth/v1/user`, pas par une vérification locale de signature.
 * C'est un aller-retour réseau par chargement de page — sans importance pour un
 * back-office consulté quelques fois par jour — et cela reste juste quel que
 * soit l'algorithme de signature du projet : Supabase migre les nouveaux
 * projets vers des clés asymétriques, et une vérification HS256 écrite en dur
 * aurait cessé de fonctionner sans prévenir.
 *
 * ## Ce que cette session ne fait pas
 *
 * Elle n'ouvre aucun droit dans la base. Les politiques RLS restent fermées et
 * le site lit les réservations avec sa clé de service, depuis le serveur. La
 * session dit **qui** consulte le back-office, elle n'est pas la clé du coffre.
 */

const COOKIE_ACCES = "ast_admin";
const COOKIE_RAFRAICHISSEMENT = "ast_admin_r";

export interface Utilisateur {
  id: string;
  email: string;
}

function configure(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function urlAuth(chemin: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/${chemin}`;
}

/** L'en-tête que Supabase exige sur toute requête, session ou non. */
function cle(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
}

async function poserCookies(acces: string, rafraichissement: string, duree: number) {
  const boite = await cookies();
  const commun = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  boite.set(COOKIE_ACCES, acces, { ...commun, maxAge: duree });
  // Le jeton de rafraîchissement vit plus longtemps que l'accès : c'est lui qui
  // évite de redemander le mot de passe toutes les heures.
  boite.set(COOKIE_RAFRAICHISSEMENT, rafraichissement, { ...commun, maxAge: 60 * 60 * 24 * 30 });
}

/**
 * Ouvre une session. Renvoie `null` en cas de succès, un message sinon —
 * volontairement le même message pour un e-mail inconnu et un mot de passe
 * faux : dire lequel des deux est en cause revient à confirmer l'existence
 * d'un compte à qui le demande.
 */
export async function connexion(email: string, motDePasse: string): Promise<string | null> {
  if (!configure()) return "L’authentification n’est pas configurée sur cet environnement.";

  try {
    const reponse = await fetch(`${urlAuth("token")}?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: cle() },
      body: JSON.stringify({ email, password: motDePasse }),
      cache: "no-store",
    });

    if (!reponse.ok) return "Identifiants incorrects.";

    const donnees = (await reponse.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
    };
    if (!donnees.access_token || !donnees.refresh_token) return "Identifiants incorrects.";
    // Un compte Supabase n'est pas un droit d'entrée : seule la liste en donne un.
    // Même message que pour un mot de passe faux, pour ne rien apprendre à qui essaie.
    if (!emailAutorise(email)) return "Identifiants incorrects.";

    await poserCookies(donnees.access_token, donnees.refresh_token, donnees.expires_in ?? 3600);
    return null;
  } catch (erreur) {
    console.error("[admin] connexion impossible", erreur);
    return "Connexion impossible pour le moment.";
  }
}

/** Ferme la session, ici et chez Supabase. */
export async function deconnexion(): Promise<void> {
  const boite = await cookies();
  const acces = boite.get(COOKIE_ACCES)?.value;

  if (acces && configure()) {
    try {
      await fetch(urlAuth("logout"), {
        method: "POST",
        headers: { apikey: cle(), Authorization: `Bearer ${acces}` },
        cache: "no-store",
      });
    } catch {
      // Le cookie part de toute façon : une déconnexion locale vaut mieux
      // qu'une session laissée ouverte parce que le réseau a échoué.
    }
  }

  boite.delete(COOKIE_ACCES);
  boite.delete(COOKIE_RAFRAICHISSEMENT);
}

/** Échange le jeton de rafraîchissement contre un nouvel accès. */
async function rafraichir(): Promise<Utilisateur | null> {
  const boite = await cookies();
  const jeton = boite.get(COOKIE_RAFRAICHISSEMENT)?.value;
  if (!jeton) return null;

  try {
    const reponse = await fetch(`${urlAuth("token")}?grant_type=refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: cle() },
      body: JSON.stringify({ refresh_token: jeton }),
      cache: "no-store",
    });
    if (!reponse.ok) return null;

    const donnees = (await reponse.json()) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      user?: { id: string; email: string };
    };
    if (!donnees.access_token || !donnees.refresh_token || !donnees.user) return null;
    if (!emailAutorise(donnees.user.email)) return null;

    await poserCookies(donnees.access_token, donnees.refresh_token, donnees.expires_in ?? 3600);
    return { id: donnees.user.id, email: donnees.user.email };
  } catch {
    return null;
  }
}

/**
 * L'utilisateur connecté, ou `null`.
 *
 * Deux tentatives : le jeton d'accès, puis le rafraîchissement s'il a expiré.
 * C'est ce qui fait qu'une session ouverte le matin tient toute la journée sans
 * redemander le mot de passe.
 */
export async function utilisateurCourant(): Promise<Utilisateur | null> {
  if (!configure()) return null;

  const boite = await cookies();
  const acces = boite.get(COOKIE_ACCES)?.value;

  if (acces) {
    try {
      const reponse = await fetch(urlAuth("user"), {
        headers: { apikey: cle(), Authorization: `Bearer ${acces}` },
        cache: "no-store",
      });
      if (reponse.ok) {
        const donnees = (await reponse.json()) as { id: string; email: string };
        // Revérifiée à chaque page : retirer une adresse de la liste ferme sa session aussitôt.
        return emailAutorise(donnees.email) ? { id: donnees.id, email: donnees.email } : null;
      }
    } catch (erreur) {
      console.error("[admin] vérification de session impossible", erreur);
      return null;
    }
  }

  return rafraichir();
}
