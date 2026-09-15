"use client";

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

/**
 * « Une question ? » — l'assistant du tableau de bord, en bas à droite de
 * chaque écran (demande de JC, 15 septembre 2026).
 *
 * La conversation vit dans l'onglet (`sessionStorage`) : elle survit au
 * passage d'une page à l'autre, pas à la fermeture du navigateur. Rien n'est
 * gardé ailleurs. La réponse s'affiche au fil de l'eau.
 */

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STOCKAGE = "assistant-back-office";

const SUGGESTIONS = [
  "Comment faire un avoir ?",
  "Comment changer les tarifs ?",
  "Comment annuler une course ?",
  "Comment inscrire un chauffeur ?",
];

/** Le nom de la page ouverte, pour que l'assistant sache où l'on est. */
function nomDePage(chemin: string): string {
  if (chemin.includes("/reservations/")) return "Fiche du client";
  if (chemin.includes("/nouvelle")) return "Nouvelle réservation (téléphone)";
  if (chemin.includes("/planning")) return "Planning";
  if (chemin.includes("/tarifs")) return "Tarifs";
  if (chemin.includes("/concurrence")) return "Concurrence";
  if (chemin.includes("/factures")) return "Factures";
  if (chemin.includes("/seo")) return "Stats SEO";
  return "Réservations";
}

/** Le gras (**…**) et les listes, sans jamais injecter de HTML. */
function Rendu({ texte }: { texte: string }) {
  return (
    <>
      {texte.split("\n").map((ligne, i) => {
        const puce = /^\s*([-•*]|\d+\.)\s+/.test(ligne);
        const morceaux = ligne.replace(/^\s*[-•*]\s+/, "• ").split(/(\*\*[^*]+\*\*)/g);
        const contenu = morceaux.map((m, j) =>
          m.startsWith("**") && m.endsWith("**") ? (
            <strong key={j}>{m.slice(2, -2)}</strong>
          ) : (
            <Fragment key={j}>{m.replace(/^#+\s*/, "")}</Fragment>
          ),
        );
        if (!ligne.trim()) return <div key={i} className="h-2" />;
        return (
          <p key={i} className={`${puce ? "pl-3" : ""} ${/^#+\s/.test(ligne) ? "font-semibold" : ""}`}>
            {contenu}
          </p>
        );
      })}
    </>
  );
}

export default function Assistant() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [saisie, setSaisie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const bas = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const garde = sessionStorage.getItem(STOCKAGE);
      if (garde) setMessages(JSON.parse(garde) as Message[]);
    } catch {
      /* navigation privée ou stockage bloqué : la conversation repart de zéro */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STOCKAGE, JSON.stringify(messages.slice(-30)));
    } catch {
      /* idem */
    }
    bas.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => {
    if (ouvert) champ.current?.focus();
  }, [ouvert]);

  async function demander(question: string) {
    const propre = question.trim();
    if (!propre || enCours) return;
    const conversation: Message[] = [...messages, { role: "user", content: propre }];
    setMessages([...conversation, { role: "assistant", content: "" }]);
    setSaisie("");
    setEnCours(true);

    const ecrire = (texte: string) =>
      setMessages((liste) => {
        const copie = [...liste];
        copie[copie.length - 1] = { role: "assistant", content: texte };
        return copie;
      });

    try {
      const reponse = await fetch("/gestion-ventes-tarifs-seo/assistant/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation, page: nomDePage(chemin ?? "") }),
      });
      if (!reponse.body) {
        ecrire(await reponse.text());
        return;
      }
      const lecteur = reponse.body.getReader();
      const decodeur = new TextDecoder();
      let texte = "";
      for (;;) {
        const { done, value } = await lecteur.read();
        if (done) break;
        texte += decodeur.decode(value, { stream: true });
        ecrire(texte);
      }
      if (!texte.trim()) ecrire("Pas de réponse. Réessayez.");
    } catch {
      ecrire("La connexion a été perdue. Réessayez.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <>
      {!ouvert ? (
        <button
          type="button"
          onClick={() => setOuvert(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-alpine px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-alpine-800"
        >
          <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-or text-alpine">
            ?
          </span>
          Une question ?
        </button>
      ) : (
        <section
          aria-label="Assistant du tableau de bord"
          className="fixed inset-x-3 bottom-3 z-40 flex h-[75vh] max-h-[40rem] flex-col overflow-hidden rounded-xl border border-glacier-200 bg-white shadow-2xl sm:inset-x-auto sm:right-5 sm:w-[26rem]"
        >
          <header className="flex items-center justify-between gap-3 bg-alpine px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Assistant du tableau de bord</p>
              <p className="text-xs text-glacier-300">Comment faire, où trouver, que veut dire…</p>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  disabled={enCours}
                  className="rounded px-2 py-1 text-xs text-glacier-200 hover:bg-alpine-700 disabled:opacity-50"
                >
                  Effacer
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer l’assistant"
                className="rounded px-2 py-1 text-lg leading-none hover:bg-alpine-700"
              >
                ×
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-glacier-50 px-3 py-3 text-sm leading-relaxed" aria-live="polite">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-alpine-700">
                  Bonjour ! Posez-moi une question sur le tableau de bord : un bouton, une étape, un message que
                  vous ne comprenez pas.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void demander(s)}
                      className="rounded-full border border-glacier-300 bg-white px-3 py-1 text-xs text-alpine-700 hover:border-marque hover:text-marque"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-marque px-3 py-2 text-white"
                        : "max-w-[92%] rounded-2xl rounded-bl-sm border border-glacier-200 bg-white px-3 py-2 text-alpine"
                    }
                  >
                    {m.role === "assistant" ? (
                      m.content ? (
                        <Rendu texte={m.content} />
                      ) : (
                        <span className="text-alpine-600">…</span>
                      )
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={bas} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void demander(saisie);
            }}
            className="flex items-end gap-2 border-t border-glacier-200 bg-white p-2"
          >
            <textarea
              ref={champ}
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void demander(saisie);
                }
              }}
              rows={2}
              maxLength={2000}
              placeholder="Votre question…"
              className="flex-1 resize-none rounded border border-glacier-300 px-2 py-1.5 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40"
            />
            <button
              type="submit"
              disabled={enCours || !saisie.trim()}
              className="rounded bg-marque px-3 py-2 text-sm font-semibold text-white transition hover:bg-marque-600 disabled:cursor-not-allowed disabled:bg-glacier-300"
            >
              {enCours ? "…" : "Envoyer"}
            </button>
          </form>
        </section>
      )}
    </>
  );
}
