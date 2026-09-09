import type { Metadata } from "next";
import TunnelIntl, { TEXTES_PAGE } from "@/components/intl/TunnelIntl";
import { lienReserver } from "@/lib/intl/textes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_PAGE.it.metaTitre,
  description: TEXTES_PAGE.it.metaDescription,
  path: lienReserver("it"),
  lang: "it",
  noindex: true,
});

export default async function PageReservationIT({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <TunnelIntl lang="it" params={await searchParams} />;
}
