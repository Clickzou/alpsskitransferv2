import Link from "next/link";
import { redirect } from "next/navigation";
import { nouvelleReference } from "@/lib/reservation/telephone";
import { utilisateurCourant } from "@/lib/admin/session";
import { LIEUX } from "@/lib/reservation/lieux";
import { facturesActives } from "@/lib/reservation/stripe";
import Entete from "../Entete";
import FormulaireTelephone from "./FormulaireTelephone";

/**
 * « Nouvelle réservation » — celle qu'on prend au téléphone.
 *
 * Demande de JC, 11 septembre 2026 : la plupart des réservations arrivent
 * encore par téléphone. Les lieux sont ceux du moteur de recherche du site
 * (`LIEUX`) : aéroports et stations au registre, et toute adresse en plus —
 * celle-ci sans prix de grille (voir `actions.ts`).
 */
export const dynamic = "force-dynamic";

const ICI = "/gestion-ventes-tarifs-seo/nouvelle/";

export default async function PageNouvelle() {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) {
    redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);
  }


  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />

      <p className="mt-6 text-sm">
        <Link href="/gestion-ventes-tarifs-seo/" className="text-alpine-700 underline underline-offset-2">
          ← Toutes les réservations
        </Link>
      </p>

      <h1 className="mt-4 font-display text-2xl text-alpine">Nouvelle réservation — prise au téléphone</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-alpine-600">
        Les mêmes champs, les mêmes contrôles et le même prix que sur le site. Le client
        reçoit un e-mail dans sa langue, avec le moyen de payer et son lien pour donner son
        adresse.{" "}
        {facturesActives()
          ? "La facture part avec l’e-mail."
          : "La facturation automatique n’est pas encore allumée : le client reçoit un lien de paiement par carte, ou l’IBAN pour un virement, sans facture."}
      </p>

      <FormulaireTelephone
        lieux={LIEUX}
        ibanConfigure={Boolean(process.env.IBAN_VIREMENT?.trim())}
        reference={nouvelleReference()}
      />
    </main>
  );
}
