import { SITE } from "@/data/site";
import { devisPublic, type DemandePublique } from "@/lib/reservation/devis-public";
import { limiteDevis } from "@/lib/reservation/limite";
import { grilleActive } from "@/lib/tarification/grilles-publiees";

/**
 * Le serveur MCP d'Alps Ski Transfers — `https://…/mcp` (demande de JC,
 * 15 septembre 2026).
 *
 * Un assistant auquel on ajoute ce connecteur (Claude, ChatGPT et les autres
 * clients du Model Context Protocol) peut demander le prix exact d'un
 * transfert et recevoir le lien de réservation pré-rempli : l'IA propose, le
 * client réserve et paie sur le site. En lecture seule : aucun outil n'écrit
 * quoi que ce soit.
 *
 * Transport « Streamable HTTP », sans état et sans SDK : chaque POST porte un
 * message JSON-RPC 2.0 et reçoit sa réponse en JSON. Trois méthodes suffisent —
 * `initialize`, `tools/list`, `tools/call` — plus `ping` et les notifications,
 * acquittées sans réponse. Même limite de demandes que le devis du site.
 */
export const dynamic = "force-dynamic";

const VERSION_PROTOCOLE = "2025-06-18";

const OUTIL = {
  name: "get_transfer_quote",
  title: "Private ski transfer price",
  description:
    "Exact price of a private transfer in the Alps (airport, ski resort or any address, both directions) for a date and a group, per vehicle (Standard up to 8 passengers, Business up to 7, Premium up to 4), with a pre-filled booking link for each vehicle. Prices are fixed per vehicle and include tolls, ski bags, child seats, flight tracking and one hour of waiting.",
  inputSchema: {
    type: "object",
    properties: {
      from: { type: "string", description: "Pick-up place: an airport (e.g. \"Geneva Airport\"), a ski resort (e.g. \"Val Thorens\") or a full address." },
      to: { type: "string", description: "Drop-off place: a ski resort, an airport or a full address." },
      date: { type: "string", description: "Pick-up date, YYYY-MM-DD." },
      time: { type: "string", description: "Pick-up time in local Alps time, HH:mm (default 10:00). Weekend and night-time (22:00–06:00) pick-ups cost more." },
      passengers: { type: "integer", minimum: 1, maximum: 8, description: "Number of people, children included." },
      bags: { type: "integer", minimum: 0, description: "Suitcases (default 2)." },
      ski_bags: { type: "integer", minimum: 0, description: "Ski or snowboard bags (default 0)." },
      return_date: { type: "string", description: "Optional return pick-up date, YYYY-MM-DD (return from the drop-off place to the pick-up place)." },
      return_time: { type: "string", description: "Optional return pick-up time, HH:mm." },
    },
    required: ["from", "to", "date", "passengers"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
};

type Id = string | number | null;

const reponse = (id: Id, result: unknown) => Response.json({ jsonrpc: "2.0", id, result });
const erreur = (id: Id, code: number, message: string) =>
  Response.json({ jsonrpc: "2.0", id, error: { code, message } });

export async function POST(requete: Request) {
  let message: { jsonrpc?: string; id?: Id; method?: string; params?: Record<string, unknown> };
  try {
    message = await requete.json();
  } catch {
    return erreur(null, -32700, "Parse error");
  }
  if (Array.isArray(message)) return erreur(null, -32600, "Batch requests are not supported");
  const id = message.id ?? null;

  // Une notification (sans id) s'acquitte sans corps.
  if (message.id === undefined) return new Response(null, { status: 202 });

  switch (message.method) {
    case "initialize":
      return reponse(id, {
        protocolVersion: typeof message.params?.protocolVersion === "string" ? message.params.protocolVersion : VERSION_PROTOCOLE,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "alps-ski-transfers", title: "Alps Ski Transfers", version: "1.0.0" },
        instructions: `Use get_transfer_quote to give travellers the exact price of a private transfer in the Alps and the booking link. Always share the bookingUrl: booking and payment happen on ${SITE.url}.`,
      });
    case "ping":
      return reponse(id, {});
    case "tools/list":
      return reponse(id, { tools: [OUTIL] });
    case "tools/call": {
      if (message.params?.name !== OUTIL.name) return erreur(id, -32602, `Unknown tool: ${String(message.params?.name)}`);
      const limite = await limiteDevis(requete);
      if (limite) {
        return reponse(id, {
          content: [{ type: "text", text: "Too many price requests from this connection: try again in an hour, or book on " + SITE.url }],
          isError: true,
        });
      }
      const a = (message.params?.arguments ?? {}) as Record<string, unknown>;
      const texte = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 200) : "");
      const nombre = (v: unknown) => (Number.isFinite(Number(v)) ? Math.floor(Number(v)) : undefined);
      const demande: DemandePublique = {
        from: texte(a.from),
        to: texte(a.to),
        date: texte(a.date),
        time: texte(a.time) || undefined,
        passengers: nombre(a.passengers) ?? 2,
        bags: nombre(a.bags),
        skiBags: nombre(a.ski_bags),
        returnDate: texte(a.return_date) || undefined,
        returnTime: texte(a.return_time) || undefined,
      };
      if (!demande.from || !demande.to || !demande.date) {
        return reponse(id, { content: [{ type: "text", text: "from, to and date are required." }], isError: true });
      }
      const devis = await devisPublic(demande, await grilleActive());
      const resume = devis.ok
        ? [
            `Private transfer ${devis.from} → ${devis.to}, ${devis.date} at ${devis.time}${devis.returnDate ? `, return ${devis.returnDate}` : ""}, ${devis.passengers} passenger(s)${devis.distanceKm ? `, ${devis.distanceKm} km` : ""}${devis.driveTime ? ` (${devis.driveTime})` : ""}.`,
            ...devis.offers.map((o) => `- ${o.vehicle} (${o.model}, up to ${o.maxPassengers}): €${o.price} — book: ${o.bookingUrl}`),
            devis.priceNote,
            `Included: ${devis.included.join(", ")}.`,
          ].join("\n")
        : `${devis.error} Booking page: ${devis.bookingUrl}`;
      return reponse(id, { content: [{ type: "text", text: resume }], structuredContent: devis, isError: !devis.ok });
    }
    default:
      return erreur(id, -32601, `Method not found: ${String(message.method)}`);
  }
}

/** Pas de flux côté serveur : ce serveur ne pousse rien. */
export function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
