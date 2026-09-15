import { utilisateurCourant } from "@/lib/admin/session";
import { GUIDE_ASSISTANT } from "@/lib/admin/guide-assistant";

/**
 * L'assistant du back-office — demande de JC, 15 septembre 2026.
 *
 * L'exploitant pose une question sur le tableau de bord ; Claude y répond à
 * partir du mode d'emploi (`lib/admin/guide-assistant.ts`), mis en cache. La
 * réponse arrive au fil de l'eau, en texte brut.
 *
 * ## Les choix
 *
 * - **REST, sans SDK** : comme Stripe, Supabase et Resend dans ce projet, qui
 *   tient à ses trois dépendances de production. Un appel, un flux d'événements.
 * - **Réservé aux comptes du back-office** : sans session, 404 — l'adresse est
 *   dans un dépôt public, et chaque question coûte.
 * - **Aucune donnée client** n'est envoyée : l'assistant explique l'écran, il
 *   ne lit pas les réservations. Seuls partent la conversation et le nom de la
 *   page ouverte.
 * - **Plafond** de 60 questions par heure et par compte : de quoi travailler, pas
 *   de quoi vider le budget par une boucle.
 * - **Repli automatique** (`fallbacks: "default"`) : si le modèle décline une
 *   question, un autre modèle la reprend dans le même appel.
 *
 * Sans `ANTHROPIC_API_KEY`, il répond qu'il n'est pas branché.
 */

export const dynamic = "force-dynamic";

const MODELE = "claude-opus-5";
const MAX_MESSAGES = 30;
const MAX_CARACTERES = 4000;
const PAR_HEURE = 60;

const compteurs = new Map<string, number[]>();

function autorise(email: string): boolean {
  const maintenant = Date.now();
  const recents = (compteurs.get(email) ?? []).filter((t) => maintenant - t < 3_600_000);
  if (recents.length >= PAR_HEURE) {
    compteurs.set(email, recents);
    return false;
  }
  compteurs.set(email, [...recents, maintenant]);
  return true;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function lireMessages(corps: unknown): Message[] | null {
  const brut = (corps as { messages?: unknown })?.messages;
  if (!Array.isArray(brut) || brut.length === 0) return null;
  const messages = brut
    .slice(-MAX_MESSAGES)
    .filter(
      (m): m is Message =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== "",
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CARACTERES) }));
  // La conversation commence par l'utilisateur et finit par lui.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

function texte(contenu: string, statut = 200): Response {
  return new Response(contenu, { status: statut, headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

export async function POST(requete: Request) {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) return new Response("Not found.", { status: 404 });

  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return texte("Question illisible.", 400);
  }
  const messages = lireMessages(corps);
  if (!messages) return texte("Posez votre question.", 400);

  const cle = process.env.ANTHROPIC_API_KEY?.trim();
  if (!cle) {
    return texte("L’assistant n’est pas encore branché. Prévenez Clickzou (jc@clickzou.fr).", 503);
  }
  if (!autorise(utilisateur.email)) {
    return texte("Beaucoup de questions en une heure : l’assistant fait une pause. Réessayez un peu plus tard.", 429);
  }

  // La page ouverte voyage avec la dernière question, jamais dans le prompt système : le cache reste intact.
  const page = String((corps as { page?: unknown }).page ?? "").slice(0, 60);
  const derniere = messages[messages.length - 1];
  derniere.content = `[Page ouverte : ${page || "inconnue"}]\n${derniere.content}`;

  let reponse: Response;
  try {
    reponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": cle,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "server-side-fallback-2026-07-01",
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 8000,
        stream: true,
        fallbacks: "default",
        // Des questions d'utilisation : un effort moyen suffit, et répond plus vite.
        output_config: { effort: "medium" },
        system: [{ type: "text", text: GUIDE_ASSISTANT, cache_control: { type: "ephemeral" } }],
        messages,
      }),
      cache: "no-store",
    });
  } catch (erreur) {
    console.error("[assistant] Claude injoignable", erreur);
    return texte("L’assistant ne répond pas pour le moment. Réessayez dans un instant.", 502);
  }

  if (!reponse.ok || !reponse.body) {
    console.error("[assistant] requête refusée", reponse.status, await reponse.text().catch(() => ""));
    return texte(
      reponse.status === 429 || reponse.status === 529
        ? "L’assistant est très sollicité. Réessayez dans une minute."
        : "L’assistant ne répond pas pour le moment. Réessayez dans un instant.",
      502,
    );
  }

  /*
    Le flux d'événements de Claude devient du texte brut : seuls les morceaux
    de réponse passent. Un refus en cours de route se dit en une phrase plutôt
    que de laisser une réponse coupée sans explication.
  */
  const lecteur = reponse.body.getReader();
  const decodeur = new TextDecoder();
  const encodeur = new TextEncoder();
  const flux = new ReadableStream<Uint8Array>({
    async start(controleur) {
      let tampon = "";
      try {
        for (;;) {
          const { done, value } = await lecteur.read();
          if (done) break;
          tampon += decodeur.decode(value, { stream: true });
          let fin: number;
          while ((fin = tampon.indexOf("\n\n")) !== -1) {
            const evenement = tampon.slice(0, fin);
            tampon = tampon.slice(fin + 2);
            const ligne = evenement.split("\n").find((l) => l.startsWith("data:"));
            if (!ligne) continue;
            let donnees: {
              type?: string;
              delta?: { type?: string; text?: string; stop_reason?: string };
              error?: { message?: string };
            };
            try {
              donnees = JSON.parse(ligne.slice(5).trim());
            } catch {
              continue;
            }
            if (donnees.type === "content_block_delta" && donnees.delta?.type === "text_delta" && donnees.delta.text) {
              controleur.enqueue(encodeur.encode(donnees.delta.text));
            } else if (donnees.type === "message_delta" && donnees.delta?.stop_reason === "refusal") {
              controleur.enqueue(encodeur.encode("\n\nJe ne peux pas répondre à cette question. Demandez à Clickzou."));
            } else if (donnees.type === "message_delta" && donnees.delta?.stop_reason === "max_tokens") {
              controleur.enqueue(encodeur.encode("\n\n(Réponse coupée : posez une question plus précise.)"));
            } else if (donnees.type === "error") {
              console.error("[assistant] erreur en cours de réponse", donnees.error?.message);
              controleur.enqueue(encodeur.encode("\n\nLa réponse s’est interrompue. Réessayez."));
            }
          }
        }
      } catch (erreur) {
        console.error("[assistant] flux interrompu", erreur);
        controleur.enqueue(encodeur.encode("\n\nLa réponse s’est interrompue. Réessayez."));
      } finally {
        controleur.close();
      }
    },
    cancel() {
      void lecteur.cancel();
    },
  });

  return new Response(flux, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
