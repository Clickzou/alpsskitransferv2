import Link from "next/link";
import Logo from "@/components/Logo";
import { actionDeconnexion } from "./actions";

/**
 * L'en-tête du back-office, et ses onglets.
 *
 * Les réservations et les tarifs sont deux métiers : le suivi des clients se
 * consulte tous les jours, la grille se retouche quelques fois par saison.
 * Demande de JC, 11 septembre 2026 : deux onglets distincts. Celui des tarifs
 * s'ajoutera à cette liste quand son écran existera — pas avant : un onglet
 * qui mène à une page vide est une promesse non tenue.
 */
const ONGLETS = [
  { cle: "reservations", nom: "Réservations", href: "/gestion-ventes-tarifs-seo/" },
  { cle: "factures", nom: "Factures", href: "/gestion-ventes-tarifs-seo/factures/" },
];

export default function Entete({
  email,
  actif = "reservations",
}: {
  email: string;
  actif?: string;
}) {
  return (
    <header className="border-b border-glacier-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Logo lang="fr" />

        <div className="flex items-center gap-4 text-sm">
          <span className="text-alpine-600">{email}</span>
          <form action={actionDeconnexion}>
            <button
              type="submit"
              className="rounded border border-glacier-300 px-3 py-1.5 text-alpine-700 transition hover:border-alpine/40 hover:bg-glacier-50"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </div>

      <nav aria-label="Back-office" className="mt-6 flex gap-6 text-sm">
        {ONGLETS.map((onglet) => (
          <Link
            key={onglet.cle}
            href={onglet.href}
            aria-current={onglet.cle === actif ? "page" : undefined}
            className={
              onglet.cle === actif
                ? "-mb-px border-b-2 border-marque pb-3 font-semibold text-alpine"
                : "pb-3 text-alpine-600 hover:text-alpine"
            }
          >
            {onglet.nom}
          </Link>
        ))}
      </nav>
    </header>
  );
}
