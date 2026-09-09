import { NextResponse } from "next/server";
import { ENTREPRISE } from "@/data/site";
import { emailConfigure, envoyer } from "@/lib/reservation/email";

/**
 * Formulaire de contact.
 *
 * Trois principes, tirés de ce que le WordPress faisait mal :
 *
 * 1. **On ne ment pas sur l'envoi.** Sans clé Resend configurée, la route
 *    répond qu'elle n'a pas pu transmettre le message et redonne l'adresse
 *    e-mail directe, plutôt que d'afficher une confirmation qui n'existe pas.
 * 2. **On valide côté serveur.** Un navigateur peut ignorer `required` ; la
 *    route reste la seule barrière qui compte.
 * 3. **On ne stocke rien.** Le message part par e-mail et rien d'autre : pas de
 *    base à sécuriser, pas de données personnelles conservées sans raison — ce
 *    que la politique de confidentialité peut alors affirmer sans réserve.
 *
 * POST /api/contact  { nom, email, sujet?, message, telephone? }
 */
export const dynamic = "force-dynamic";

/** Longueurs maximales : au-delà, c'est un robot ou une erreur de copier-coller. */
const LIMITES = { nom: 120, email: 200, sujet: 200, telephone: 40, message: 5000 };

function texte(valeur: unknown, max: number): string {
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

/** Validation volontairement permissive : refuser une adresse valide est pire. */
function emailPlausible(valeur: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur);
}

export async function POST(requete: Request) {
  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ ok: false, erreur: "Requête illisible." }, { status: 400 });
  }

  const entree = corps as Record<string, unknown>;

  /*
   * Piège à robots : un champ que personne ne voit et que seuls les
   * remplisseurs automatiques renseignent. On répond `ok` sans rien envoyer —
   * un robot qui reçoit une erreur recommence, un robot qui croit avoir réussi
   * passe au site suivant.
   */
  if (texte(entree.website, 100)) return NextResponse.json({ ok: true });

  const nom = texte(entree.nom, LIMITES.nom);
  const email = texte(entree.email, LIMITES.email);
  const sujet = texte(entree.sujet, LIMITES.sujet) || "Website enquiry";
  const telephone = texte(entree.telephone, LIMITES.telephone);
  const message = texte(entree.message, LIMITES.message);

  const manquants: string[] = [];
  if (nom.length < 2) manquants.push("nom");
  if (!emailPlausible(email)) manquants.push("email");
  if (message.length < 10) manquants.push("message");
  if (manquants.length > 0) {
    return NextResponse.json({ ok: false, erreur: "champs-invalides", manquants }, { status: 422 });
  }

  const destinataire = process.env.EMAIL_EXPLOITANT || ENTREPRISE.email;
  if (!emailConfigure() || !destinataire) {
    return NextResponse.json(
      { ok: false, erreur: "envoi-indisponible", email: ENTREPRISE.email },
      { status: 503 },
    );
  }

  const envoye = await envoyer({
    destinataire,
    sujet: `[Site] ${sujet} — ${nom}`,
    texte: [
      `De : ${nom} <${email}>`,
      telephone ? `Téléphone : ${telephone}` : null,
      `Sujet : ${sujet}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (!envoye) {
    return NextResponse.json(
      { ok: false, erreur: "envoi-echoue", email: ENTREPRISE.email },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
