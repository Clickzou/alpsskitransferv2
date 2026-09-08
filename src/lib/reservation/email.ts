/**
 * E-mails transactionnels, en REST.
 *
 * Deux messages seulement : la confirmation au client et l'avis à l'exploitant.
 * Resend expose une API HTTP simple ; là encore, pas de SDK pour deux appels.
 *
 * Sans clé, `envoyer` renvoie `false` sans lever : l'appelant sait alors que la
 * demande n'a pas été notifiée et le dit au visiteur, plutôt que de laisser
 * croire à une confirmation qui n'est jamais partie.
 */

export function emailConfigure(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_EXPEDITEUR);
}

export interface Message {
  destinataire: string;
  sujet: string;
  texte: string;
}

export async function envoyer(message: Message): Promise<boolean> {
  if (!emailConfigure()) return false;

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.EMAIL_EXPEDITEUR,
        to: [message.destinataire],
        subject: message.sujet,
        text: message.texte,
      }),
      cache: "no-store",
    });
    if (!reponse.ok) {
      console.error("[email] envoi refusé", await reponse.text());
      return false;
    }
    return true;
  } catch (erreur) {
    console.error("[email] envoi impossible", erreur);
    return false;
  }
}
