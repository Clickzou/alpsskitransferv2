import type { Metadata } from "next";
import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { T } from "@/lib/intl/textes";
import { cheminConfirmation } from "@/lib/reservation/config";
import { pageMetadata } from "@/lib/seo";

/**
 * Retour de paiement.
 *
 * Cette page **ne confirme rien par elle-même** : elle s'atteint en tapant
 * l'URL. La réservation n'est marquée payée que par le webhook signé de Stripe.
 * D'où le ton : le paiement vient de Stripe, la page ne fait que l'annoncer et
 * donner la référence.
 *
 * Elle n'existait qu'en anglais : un client francophone payait sur un site
 * français et atterrissait sur une page anglaise, juste après avoir donné sa
 * carte. La langue voyage désormais du tunnel jusqu'ici, et jusqu'à l'e-mail.
 */
export const metadata: Metadata = pageMetadata({
  title: "Réservation confirmée",
  description: "Votre transfert vers les Alpes est réservé.",
  path: cheminConfirmation("fr"),
  lang: "fr",
  noindex: true,
});

export default async function PageConfirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reference = typeof params.ref === "string" ? params.ref : null;
  const t = T("fr");

  return (
    <>
      <Header lang="fr" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: t.accueil, chemin: "/fr/" },
              { nom: "Réservation confirmée", chemin: cheminConfirmation("fr") },
            ]}
          />
          <h1 className="mt-4 font-display text-titre-page">Votre transfert est réservé</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Merci — votre paiement est passé, et une confirmation part vers votre boîte mail.
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            {reference ? (
              <p className="rounded border border-alpes-300 bg-alpes-50 px-4 py-3">
                Votre référence : <strong className="tabular-nums">{reference}</strong> — citez-la dans tout message au sujet de ce trajet.
              </p>
            ) : null}

            <p>Votre chauffeur suit votre vol et sait quand vous atterrissez. Il vous attend à la sortie des bagages avec votre nom, une heure d’attente comprise.</p>

            <p>
              Si quelque chose change — un autre vol, un passager de plus, une autre adresse en station —{" "}
              <Link className="underline" href="/fr/contact/">
                dites-le-nous
              </Link>le plus tôt possible.
            </p>

            <div className="pt-2">
              <BoutonAction href="/fr/">Retour au site</BoutonAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer lang="fr" />
    </>
  );
}
