import type { Metadata } from "next";
import PageGestion from "@/components/reservation/PageGestion";
import { CHEMIN_GESTION } from "@/lib/reservation/gestion";
import { TEXTES_GESTION } from "@/lib/reservation/textes";
import { pageMetadata } from "@/lib/seo";

/**
 * `/manage-booking/` — la page du lien signé envoyé avec la confirmation.
 *
 * Elle lit `ref` et `j` dans l'URL : la référence seule ne prouve rien, le jeton
 * si. Tout le reste — vérification, lecture de la base, formulaire — vit dans
 * `PageGestion`, partagé par les quatre langues.
 *
 * `force-dynamic` : la page rend une réservation précise, à un instant précis.
 * Servie depuis un cache, elle montrerait la course d'un autre visiteur.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: TEXTES_GESTION.en.titre,
  description: TEXTES_GESTION.en.metaDescription,
  path: CHEMIN_GESTION.en,
  lang: "en",
  noindex: true,
});

export default async function PageManageBooking({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <PageGestion
      lang="en"
      reference={typeof params.ref === "string" ? params.ref : null}
      jeton={typeof params.j === "string" ? params.j : null}
    />
  );
}
