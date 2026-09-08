import type { Metadata } from "next";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tunnel from "@/components/reservation/Tunnel";
import { BandeauReassurance, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { moteurInterne } from "@/lib/reservation/config";
import { LIEUX } from "@/lib/reservation/lieux";
import { pageMetadata } from "@/lib/seo";

/**
 * Le tunnel de réservation en français.
 *
 * Même composant, même calcul, mêmes garde-fous que la version anglaise : seuls
 * les libellés changent. C'est la page que l'analyse du concurrent désigne comme
 * la plus rentable à traduire — le francophone qui arrive ici cherche un prix,
 * pas une présentation.
 *
 * `noindex` comme son équivalent anglais : une page de tunnel n'a rien à faire
 * dans l'index.
 */
export const metadata: Metadata = pageMetadata({
  title: "Réserver un transfert vers les Alpes",
  description:
    "Réservez un transfert privé vers les stations des Alpes : prix fixe par véhicule, suivi du vol, housses à skis et sièges enfants compris.",
  path: "/fr/reserver/",
  lang: "fr",
  noindex: true,
});

export default async function PageReservationFr({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const texte = (cle: string) => {
    const valeur = params[cle];
    return typeof valeur === "string" ? valeur : undefined;
  };

  const lieux = LIEUX.map((l) => ({
    slug: l.slug,
    nom: l.nom,
    type: l.type,
    detail: l.detail,
    cles: l.cles,
  }));

  const passagers = Number(texte("passengers"));

  return (
    <>
      <Header lang="fr" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: "Accueil", chemin: "/fr/" },
              { nom: "Réserver", chemin: "/fr/reserver/" },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Réservez votre transfert
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Un prix par véhicule, annoncé avant tout engagement. Housses à skis, sièges
            enfants, péages, suivi du vol et temps d&apos;attente compris.
          </p>
          {moteurInterne() ? null : (
            <p className="mt-4 max-w-2xl rounded border border-white/20 bg-white/10 px-4 py-3 text-sm text-glacier-200">
              Aperçu : la réservation en ligne est en cours de finalisation. Envoyez-nous
              votre trajet par ce formulaire, nous confirmons par e-mail.
            </p>
          )}
        </HeroInterieur>

        <BandeauReassurance langue="fr" />

        <Section fond="blanc">
          <Tunnel
            langue="fr"
            lieux={lieux}
            depart={texte("from")}
            arrivee={texte("to")}
            quand={texte("when")}
            passagersInitial={Number.isInteger(passagers) && passagers > 0 ? passagers : undefined}
          />
        </Section>
      </main>
      <Footer lang="fr" />
    </>
  );
}
