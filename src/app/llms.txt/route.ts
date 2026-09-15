import { ENTREPRISE, SITE } from "@/data/site";
import { airportParSlug } from "@/lib/airports";
import { devisReservation } from "@/lib/reservation/devis";
import { resortParSlug, SLUG_PAYS } from "@/lib/resorts";
import { dateDuJour } from "@/lib/concurrence/comparaison";
import { grilleActive } from "@/lib/tarification/grilles-publiees";
import { segmentTrajet, TRANSFERS } from "@/lib/transfers";

/**
 * `/llms.txt` — le résumé du service, écrit pour les assistants (ChatGPT,
 * Perplexity, Claude…), avec la grille « à partir de » de chaque trajet.
 * Demande de JC, 15 septembre 2026 : qu'un assistant interrogé sur « le prix
 * d'un transfert Genève – Alpe d'Huez » puisse citer le site, et le bon prix.
 *
 * Tout est calculé à la demande avec la grille publiée — le même prix que le
 * title, la FAQ et les données structurées des pages de trajet —, et remis en
 * cache une heure : un tarif changé dans l'onglet Tarifs y paraît dans l'heure.
 *
 * Convention llms.txt : un titre, un résumé en citation, puis des sections de
 * liens en Markdown.
 */
export const revalidate = 3600;

export async function GET() {
  const grille = await grilleActive();
  const mercredi = dateDuJour("mercredi");

  const lignes = TRANSFERS.flatMap((t) => {
    const station = resortParSlug(t.resort);
    const aeroport = airportParSlug(t.airport);
    if (!station || !aeroport) return [];
    const devis = devisReservation(
      { airport: t.airport, resort: t.resort, categorie: "standard", passagers: 1, aller: mercredi },
      grille,
    );
    if (!devis.ok) return [];
    const url = `${SITE.url}/${SLUG_PAYS[station.country]}/${station.slug}/${segmentTrajet(t.airport)}/`;
    return [{ tri: `${aeroport.name} ${station.name}`, texte: `- [${aeroport.name} to ${station.name}](${url}): from €${devis.devis.total} per vehicle` }];
  }).sort((a, b) => a.tri.localeCompare(b.tri, "en"));

  const texte = `# ${SITE.nom}

> Private airport transfers to the ski resorts of the French, Swiss and Italian Alps, operated by NM Transports 73 (sole trader, Chambéry, France). Fixed prices per vehicle, not per person, booked and paid online.

## Key facts

- Service: private door-to-door transfers between airports (Geneva, Lyon, Chambéry, Grenoble, Turin, Milan, Zurich and others) and ski resorts, in both directions, and to or from any address.
- Prices: fixed per vehicle and shown before payment. Tolls, ski and snowboard bags, child seats, flight tracking and one hour of waiting are included.
- Vehicles: Standard (Volkswagen Transporter, up to 8 passengers), Business (Mercedes V-Class, up to 7), Premium (Mercedes E-Class, up to 4).
- Surcharges: weekend, night-time (22:00–06:00) and peak-season departures cost more; the booking page gives the exact price for a date.
- The "from" prices below are for a Standard vehicle on a weekday in the daytime, computed from the current price list.
- Booking: ${SITE.url}/book-ski-transfer-tickets/ (also in French: ${SITE.url}/fr/reserver/, German: ${SITE.url}/de/buchen/, Italian: ${SITE.url}/it/prenota/).
- Contact: ${ENTREPRISE.telephoneAffiche} · ${ENTREPRISE.email}

## Transfer prices (from, per vehicle)

${lignes.map((l) => l.texte).join("\n")}

## Main pages

- [Ski resort transfers](${SITE.url}/ski-resort-transfers/): all resorts served
- [Airport ski transfers](${SITE.url}/airport-ski-transfers/): all airports served
- [Book a transfer](${SITE.url}/book-ski-transfer-tickets/): exact price for your date, vehicle and group
`;

  return new Response(texte, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
