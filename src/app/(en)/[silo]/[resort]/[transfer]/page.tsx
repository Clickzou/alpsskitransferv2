import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTrajet from "@/components/PageTrajet";
import { airportParSlug } from "@/lib/airports";
import { SLUG_PAYS, resortParSlug } from "@/lib/resorts";
import { TRANSFERS, airportDepuisSegment, segmentTrajet, transferParSlugs } from "@/lib/transfers";
import { pageMetadata } from "@/lib/seo";

/**
 * Page de trajet — page fille, sous sa station.
 *
 * Une seule URL par trajet. Les anciennes formes
 * (`/airport-ski-transfers/{pays}/{trajet}/` et `/destination/{pays}/{aéroport}/`)
 * arrivent ici en 301 via `data/redirections.ts`. Le rendu vit dans
 * `components/PageTrajet` — cette route ne fait que résoudre les segments.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return TRANSFERS.flatMap((t) => {
    const station = resortParSlug(t.resort);
    if (!station) return [];
    return [
      {
        silo: SLUG_PAYS[station.country],
        resort: station.slug,
        transfer: segmentTrajet(t.airport),
      },
    ];
  });
}

async function resoudre(params: Promise<{ silo: string; resort: string; transfer: string }>) {
  const { silo, resort, transfer } = await params;
  const slugAeroport = airportDepuisSegment(transfer);
  const station = resortParSlug(resort);
  if (!slugAeroport || !station || SLUG_PAYS[station.country] !== silo) return null;
  const trajet = transferParSlugs(slugAeroport, resort);
  const aeroport = airportParSlug(slugAeroport);
  if (!trajet || !aeroport) return null;
  return { silo, resort, airport: slugAeroport, trajet, chemin: `/${silo}/${resort}/${transfer}/` };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ silo: string; resort: string; transfer: string }>;
}): Promise<Metadata> {
  const donnees = await resoudre(params);
  if (!donnees) return {};
  return pageMetadata({
    title: donnees.trajet.metaTitre,
    description: donnees.trajet.metaDescription,
    path: donnees.chemin,
    lang: "en",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ silo: string; resort: string; transfer: string }>;
}) {
  const donnees = await resoudre(params);
  if (!donnees) notFound();
  return (
    <PageTrajet silo={donnees.silo} resort={donnees.resort} airport={donnees.airport} />
  );
}
