import type { Metadata } from "next";
import PageGestion from "@/components/reservation/PageGestion";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * `/fr/gerer-ma-reservation/` — même page, mêmes gardes, les mots du marché.
 *
 * Le lien part dans l'e-mail de confirmation, lui-même écrit dans la langue de
 * la réservation : un client qui a réservé en français ne doit pas atterrir sur
 * un formulaire anglais pour déplacer son heure de prise en charge.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_GESTION.fr.titre,
  description: TEXTES_GESTION.fr.metaDescription,
  path: CHEMIN_GESTION.fr,
  lang: "fr",
  noindex: true,
});

export default async function PageGererMaReservation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PageGestion
      lang="fr"
      reference={typeof params.ref === "string" ? params.ref : null}
      jeton={typeof params.j === "string" ? params.j : null}
    />
  );
}
