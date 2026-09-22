import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageConversionIntl from "@/components/intl/PageConversionIntl";
import PagePremium from "@/components/PagePremium";
import { PAGES_PREMIUM, SLUGS_PREMIUM } from "@/data/page-premium-intl";
import { alternativesPageIntl } from "@/lib/intl/liens";
import { metadataPage, paramsPages } from "@/lib/intl/routes";
import { pageIntlParSlug } from "@/lib/pages/intl";

/** Le segment `[page]` ne sert que les pages du registre — rien d'autre. */
export const dynamicParams = false;

export function generateStaticParams() {
  return paramsPages("it");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return metadataPage("it", page);
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const contenu = pageIntlParSlug("it", page);
  if (!contenu) notFound();

  /*
    Les demandes sur mesure ont leur propre gabarit — celui de la page anglaise,
    avec son formulaire — là où les autres pages de conversion se contentent du
    gabarit générique. Le contenu vient de `data/page-premium-intl.ts` et non du
    registre, dont l'entrée ne porte ici que les métadonnées, le H1 et la FAQ.
  */
  if (page === SLUGS_PREMIUM.it) {
    return (
      <PagePremium
        lang="it"
        chemin={`/it/${page}/`}
        h1={contenu.h1}
        chapo={contenu.chapo}
        faq={contenu.faq}
        contenu={PAGES_PREMIUM.it}
        alternatives={alternativesPageIntl("it", contenu.equivalentEn)}
      />
    );
  }

  return <PageConversionIntl lang="it" page={contenu} />;
}
