import { SITE } from "@/data/site";

/**
 * `/openapi.json` — la description du devis public (`/api/prix/`), pour les
 * assistants et les outils qui lisent ce format. Annoncée dans `/llms.txt`.
 */
export const revalidate = 86400;

export function GET() {
  const parametre = (name: string, description: string, required = false, schema: Record<string, unknown> = { type: "string" }) => ({
    name,
    in: "query",
    required,
    description,
    schema,
  });

  return Response.json({
    openapi: "3.1.0",
    info: {
      title: `${SITE.nom} — transfer price`,
      version: "1.0.0",
      description:
        "Exact price of a private transfer in the Alps for a date and a group, per vehicle, with a pre-filled booking link. Prices are fixed per vehicle and include tolls, ski bags, child seats, flight tracking and one hour of waiting. Limited to 30 requests per hour per connection.",
    },
    servers: [{ url: SITE.url }],
    paths: {
      "/api/prix/": {
        get: {
          operationId: "getTransferQuote",
          summary: "Price of a private ski transfer",
          parameters: [
            parametre("from", "Pick-up place: airport (\"Geneva Airport\"), ski resort (\"Val Thorens\") or full address.", true),
            parametre("to", "Drop-off place: ski resort, airport or full address.", true),
            parametre("date", "Pick-up date, YYYY-MM-DD.", true),
            parametre("time", "Pick-up time, HH:mm, local Alps time (default 10:00)."),
            parametre("passengers", "People, children included (1–8).", false, { type: "integer", minimum: 1, maximum: 8 }),
            parametre("bags", "Suitcases (default 2).", false, { type: "integer", minimum: 0 }),
            parametre("ski_bags", "Ski or snowboard bags (default 0).", false, { type: "integer", minimum: 0 }),
            parametre("return_date", "Optional return date, YYYY-MM-DD."),
            parametre("return_time", "Optional return time, HH:mm."),
          ],
          responses: {
            "200": { description: "Prices per vehicle, each with a bookingUrl." },
            "422": { description: "No instant price for this journey; bookingUrl leads to the booking page." },
            "429": { description: "Too many requests from this connection." },
          },
        },
      },
    },
  });
}
