import Link from "next/link";
import Logo from "@/components/Logo";
import { actionDeconnexion } from "./actions";

/**
 * L'en-tête du back-office, et ses onglets.
 *
 * Les réservations et les tarifs sont deux métiers : le suivi des clients se
 * consulte tous les jours, la grille se retouche quelques fois par saison.
 * Demande de JC, 11 septembre 2026 : des onglets distincts. Un onglet ne
 * s'ajoute qu'avec son écran : un onglet qui mène à une page vide est une
 * promesse non tenue.
 */
const ONGLETS = [
  { cle: "reservations", nom: "Réservations", href: "/gestion-ventes-tarifs-seo/" },
  { cle: "planning", nom: "Planning", href: "/gestion-ventes-tarifs-seo/planning/" },
  { cle: "tarifs", nom: "Tarifs", href: "/gestion-ventes-tarifs-seo/tarifs/" },
  { cle: "concurrence", nom: "Concurrence", href: "/gestion-ventes-tarifs-seo/concurrence/" },
  { cle: "factures", nom: "Factures", href: "/gestion-ventes-tarifs-seo/factures/" },
  { cle: "seo", nom: "Stats SEO", href: "/gestion-ventes-tarifs-seo/seo/" },
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
      {/* Trois colonnes sur ordinateur, pour que la mention reste au centre quelle que soit la largeur de l'e-mail. */}
      <div className="flex flex-wrap items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Logo lang="fr" />

        <p className="order-last w-full text-center text-sm text-alpine-600 md:order-none md:w-auto">
          Tableau de bord créé par{" "}
          <a
            href="https://clickzou.fr/"
            className="font-semibold text-alpine underline underline-offset-2 hover:text-marque"
          >
            Clickzou
          </a>
        </p>

        <div className="flex items-center gap-4 text-sm md:justify-self-end">
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

      <nav aria-label="Back-office" className="mt-6 flex gap-5 overflow-x-auto whitespace-nowrap text-sm">
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
