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

import { SITE } from "@/data/site";
import { texteEnHtml } from "@/lib/reservation/email-html";

export function emailConfigure(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_EXPEDITEUR);
}

export interface Message {
  /**
   * Un destinataire, ou plusieurs séparés par des virgules.
   *
   * L'avis de réservation part à l'exploitant, et celui-ci n'a pas qu'une
   * adresse : l'officielle du site et celle qu'il relève réellement sur son
   * téléphone. Plutôt que de dupliquer l'envoi chez les cinq appelants,
   * `EMAIL_EXPLOITANT` accepte une liste — « contact@…,nm…@gmail.com » — et le
   * découpage se fait ici, une fois.
   */
  destinataire: string | string[];
  sujet: string;
  texte: string;
}

/**
 * « bookings@… » → « Alps Ski Transfers <bookings@…> ».
 *
 * Sans nom affiché, les messageries montrent la partie avant l'arobase : le
 * client lisait « bookings » dans sa boîte, pas la marque (JC, 15 septembre
 * 2026). Le nom est toujours celui du site : une variable qui en porterait un
 * autre — « bookings <bookings@…> », guillemets compris — n'en garde que
 * l'adresse. C'est ce qui s'est passé en production après une première
 * correction qui respectait le nom déjà posé.
 */
export function expediteur(valeur: string): string {
  const entre = /<([^>]+)>/.exec(valeur);
  const adresse = (entre ? entre[1] : valeur).replace(/["'\s]/g, "");
  return `${SITE.nom} <${adresse}>`;
}

/** « a@x.fr, b@y.fr » → ["a@x.fr", "b@y.fr"]. Les vides sautent. */
function destinataires(valeur: string | string[]): string[] {
  const liste = Array.isArray(valeur) ? valeur : valeur.split(",");
  return liste.map((a) => a.trim()).filter(Boolean);
}

export async function envoyer(message: Message): Promise<boolean> {
  if (!emailConfigure()) return false;

  const to = destinataires(message.destinataire);
  if (to.length === 0) return false;

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: expediteur(process.env.EMAIL_EXPEDITEUR ?? ""),
        to,
        subject: message.sujet,
        text: message.texte,
        html: texteEnHtml(message.texte, message.sujet),
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
