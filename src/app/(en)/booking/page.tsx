import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Tunnel from "@/components/reservation/Tunnel";
import { BandeauReassurance, HeroInterieur, Section } from "@/components/gabarit/Sections";
import FilAriane from "@/components/FilAriane";
import { LIEUX } from "@/lib/reservation/lieux";
import { moteurInterne } from "@/lib/reservation/config";
import { pageMetadata } from "@/lib/seo";

/**
 * Le tunnel de réservation.
 *
 * `noindex` : c'est une page de tunnel, elle n'a rien à faire dans l'index — le
 * site actuel laisse au contraire panier, commande, connexion et choix du
 * véhicule en `index, follow`. La page éditoriale qui vend la réservation reste
 * `/book-ski-transfer-tickets/`, elle, indexée.
 */
export const metadata: Metadata = pageMetadata({
  title: "Book your airport ski transfer",
  description:
    "Book a private airport transfer to the Alps: fixed price per vehicle, flight tracking, ski bags and child seats included.",
  path: "/booking/",
  lang: "en",
  noindex: true,
});

export default async function PageReservation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const texte = (cle: string) => {
    const valeur = params[cle];
    return typeof valeur === "string" ? valeur : undefined;
  };

  // Le catalogue part au navigateur sous sa forme reduite : slug, nom, type et
  // cles de recherche. Le contenu des 68 pages de station reste sur le serveur.
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
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: "Home", chemin: "/" },
              { nom: "Book a transfer", chemin: "/booking/" },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-balance font-display text-titre-page">
            Book your airport ski transfer
          </h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            One price per vehicle, quoted before you commit. Ski and board bags,
            child seats, flight tracking and waiting time are all included.
          </p>
          {moteurInterne() ? null : (
            <p className="mt-4 max-w-2xl rounded border border-white/20 bg-white/10 px-4 py-3 text-sm text-glacier-200">
              Preview: online booking is still being finalised. Send your journey
              through this form and we will confirm by email.
            </p>
          )}
        </HeroInterieur>

        <BandeauReassurance />

        <Section fond="blanc">
          <Tunnel
            lieux={lieux}
            depart={texte("from")}
            arrivee={texte("to")}
            quand={texte("when")}
            passagersInitial={Number.isInteger(passagers) && passagers > 0 ? passagers : undefined}
          />
        </Section>
      </main>
      <Footer lang="en" />
    </>
  );
}
