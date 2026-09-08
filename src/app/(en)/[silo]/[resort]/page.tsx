import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HubAeroport from "@/components/HubAeroport";
import PageStation from "@/components/PageStation";
import { AIRPORTS, airportParSlug } from "@/lib/airports";
import { dessertes } from "@/lib/airports/dessertes";
import { RESORTS_MIGRES, SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { pageMetadata } from "@/lib/seo";

/**
 * Ce segment sert deux pages qui vivent au même niveau du silo :
 *
 *  · la **page de station** — `/france-ski-transfers/val-thorens/`, page mère ;
 *  · le **hub d'aéroport** — `/switzerland-ski-transfers/geneva-airport/`, qui
 *    reprend les 31 anciennes pages `/destination/{pays}/{aéroport}/`.
 *
 * Next n'accepte qu'un segment dynamique par niveau : les deux se résolvent donc
 * ici, chacun avec son rendu. `dynamicParams = false` — seuls les slugs des deux
 * registres existent, aucune page fantôme.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...RESORTS_MIGRES.map((r) => ({
      silo: SLUG_PAYS[r.country],
      resort: r.slug,
    })),
    ...AIRPORTS.map((a) => ({
      silo: SLUG_PAYS[a.country],
      resort: a.slug,
    })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string; resort: string }>;
}): Promise<Metadata> {
  const { silo, resort } = await params;

  const station = resortParSlug(resort);
  if (station) {
    return pageMetadata({
      title: station.metaTitre,
      description: station.metaDescription,
      path: `/${silo}/${station.slug}/`,
      lang: "en",
      alternate: station.fr
        ? { lang: "fr", path: `/fr/transferts-ski/${station.fr.slug}/` }
        : undefined,
    });
  }

  const aeroport = airportParSlug(resort);
  if (aeroport) {
    const nombre = dessertes(aeroport.slug).length;
    return pageMetadata({
      title: `${aeroport.name} Ski Transfers`,
      description: `Private ski transfers from ${aeroport.name} to ${nombre} Alpine resorts. Fixed price per vehicle, flight tracking, winter-equipped vehicles.`,
      path: `/${silo}/${aeroport.slug}/`,
      lang: "en",
    });
  }

  return {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ silo: string; resort: string }>;
}) {
  const { silo, resort } = await params;

  const station = resortParSlug(resort);
  if (station) {
    if (SLUG_PAYS[station.country] !== silo) notFound();
    return <PageStation silo={silo} slug={station.slug} />;
  }

  const aeroport = airportParSlug(resort);
  if (aeroport && SLUG_PAYS[aeroport.country] === silo) {
    return <HubAeroport silo={silo} slug={aeroport.slug} />;
  }

  notFound();
}
