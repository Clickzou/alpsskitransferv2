import { redirect } from "next/navigation";
import { utilisateurCourant } from "@/lib/admin/session";
import { LIEUX } from "@/lib/reservation/lieux";
import { facturesActives } from "@/lib/reservation/stripe";
import Entete from "../Entete";
import FormulaireTelephone from "./FormulaireTelephone";

/**
 * « Nouvelle réservation » — celle qu'on prend au téléphone.
 *
 * Demande de JC, 11 septembre 2026 : la plupart des réservations arrivent
 * encore par téléphone. Les listes d'aéroports et de stations sont celles du
 * moteur de recherche du site (`LIEUX`), réduites au slug et au nom : on ne
 * propose que ce que la grille sait chiffrer.
 */
export const dynamic = "force-dynamic";

const ICI = "/gestion-ventes-tarifs-seo/nouvelle/";

export default async function PageNouvelle() {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) {
    redirect(`/gestion-ventes-tarifs-seo/connexion/?suite=${encodeURIComponent(ICI)}`);
  }

  const parNom = (a: { nom: string }, b: { nom: string }) => a.nom.localeCompare(b.nom, "fr");
  const liste = (type: "aeroport" | "station") =>
    LIEUX.filter((l) => l.type === type && l.slug)
      .map((l) => ({ slug: l.slug as string, nom: l.nom }))
      .sort(parNom);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Entete email={utilisateur.email} actif="reservations" />

      <h1 className="mt-8 font-display text-2xl text-alpine">Nouvelle réservation — prise au téléphone</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-alpine-600">
        Les mêmes champs, les mêmes contrôles et le même prix que sur le site. Le client
        reçoit un e-mail dans sa langue, avec le moyen de payer et son lien pour donner son
        adresse.{" "}
        {facturesActives()
          ? "La facture part avec l’e-mail."
          : "La facturation automatique n’est pas encore allumée : le client reçoit un lien de paiement par carte, ou l’IBAN pour un virement, sans facture."}
      </p>

      <FormulaireTelephone
        aeroports={liste("aeroport")}
        stations={liste("station")}
        ibanConfigure={Boolean(process.env.IBAN_VIREMENT?.trim())}
      />
    </main>
  );
}
