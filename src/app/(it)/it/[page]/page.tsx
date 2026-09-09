import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageConversionIntl from "@/components/intl/PageConversionIntl";
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
  return <PageConversionIntl lang="it" page={contenu} />;
}
