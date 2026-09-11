import type { Metadata } from "next";
import PageGestion from "@/components/reservation/PageGestion";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * `/de/buchung-verwalten/` — même page, mêmes gardes, les mots du marché.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_GESTION.de.titre,
  description: TEXTES_GESTION.de.metaDescription,
  path: CHEMIN_GESTION.de,
  lang: "de",
  noindex: true,
});

export default async function PageBuchungVerwalten({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PageGestion
      lang="de"
      reference={typeof params.ref === "string" ? params.ref : null}
      jeton={typeof params.j === "string" ? params.j : null}
    />
  );
}
