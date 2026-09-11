import type { Metadata } from "next";
import PageGestion from "@/components/reservation/PageGestion";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * `/it/gestisci-prenotazione/` — même page, mêmes gardes, les mots du marché.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_GESTION.it.titre,
  description: TEXTES_GESTION.it.metaDescription,
  path: CHEMIN_GESTION.it,
  lang: "it",
  noindex: true,
});

export default async function PageGestisciPrenotazione({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PageGestion
      lang="it"
      reference={typeof params.ref === "string" ? params.ref : null}
      jeton={typeof params.j === "string" ? params.j : null}
    />
  );
}
