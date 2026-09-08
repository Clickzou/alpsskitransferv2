import type { Metadata } from "next";
import Link from "next/link";
import FilAriane from "@/components/FilAriane";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { BoutonAction, HeroInterieur, Section } from "@/components/gabarit/Sections";
import { pageMetadata } from "@/lib/seo";

/**
 * Retour de paiement.
 *
 * Cette page **ne confirme rien par elle-même** : elle s'atteint en tapant l'URL.
 * La réservation n'est marquée payée que par le webhook signé de Stripe. D'où le
 * ton : « nous avons votre paiement » vient de Stripe, la page ne fait que
 * l'annoncer et donner la référence.
 */
export const metadata: Metadata = pageMetadata({
  title: "Booking confirmed",
  description: "Your airport ski transfer is booked.",
  path: "/booking/confirmed/",
  lang: "en",
  noindex: true,
});

export default async function PageConfirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const reference = typeof params.ref === "string" ? params.ref : null;

  return (
    <>
      <Header lang="en" />
      <main id="contenu">
        <HeroInterieur>
          <FilAriane
            clair
            elements={[
              { nom: "Home", chemin: "/" },
              { nom: "Booking confirmed", chemin: "/booking/confirmed/" },
            ]}
          />
          <h1 className="mt-4 font-display text-titre-page">Your transfer is booked</h1>
          <p className="mt-4 max-w-2xl text-chapo text-glacier-200">
            Thank you — your payment has gone through and a confirmation is on its way
            to your inbox.
          </p>
        </HeroInterieur>

        <Section fond="blanc">
          <div className="max-w-prose space-y-4 text-alpine-700">
            {reference ? (
              <p className="rounded border border-alpes-300 bg-alpes-50 px-4 py-3">
                Your reference: <strong className="tabular-nums">{reference}</strong> — quote
                it in any message about this journey.
              </p>
            ) : null}
            <p>
              Your driver tracks your flight, so a delay costs you nothing. They will
              meet you in arrivals with your name, and waiting time is included.
            </p>
            <p>
              If anything changes — a new flight, an extra passenger, a different
              address in resort —{" "}
              <Link className="text-marque underline underline-offset-4" href="/contact/">
                tell us
              </Link>{" "}
              as early as you can.
            </p>
            <BoutonAction href="/">Back to the site</BoutonAction>
          </div>
        </Section>
      </main>
      <Footer lang="en" />
    </>
  );
}
