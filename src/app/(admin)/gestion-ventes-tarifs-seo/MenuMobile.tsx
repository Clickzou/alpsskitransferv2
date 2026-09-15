"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Le menu du back-office sur téléphone — demande de JC, 15 septembre 2026 :
 * « le tableau de bord en responsive, avec un menu responsive ».
 *
 * Sous 768 px, les six onglets ne tenaient plus sur une ligne et défilaient de
 * côté sans que rien ne le signale ; l'e-mail et « Se déconnecter » poussaient
 * le logo. Un bouton « Menu » ouvre la liste des onglets en grand, avec le
 * compte en bas. Il se referme au choix d'un onglet, à la touche Échap, ou en
 * touchant le fond.
 */
export default function MenuMobile({
  onglets,
  actif,
  email,
  children,
}: {
  onglets: { cle: string; nom: string; href: string }[];
  actif: string;
  email: string;
  /** Le bouton de déconnexion, rendu côté serveur. */
  children: React.ReactNode;
}) {
  const [ouvert, setOuvert] = useState(false);
  const courant = onglets.find((o) => o.cle === actif);

  useEffect(() => {
    if (!ouvert) return;
    const fermer = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", fermer);
    // La page ne défile pas sous le menu ouvert.
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fermer);
      document.body.style.overflow = avant;
    };
  }, [ouvert]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-expanded={ouvert}
        aria-controls="menu-back-office"
        className="flex items-center gap-2 rounded border border-glacier-300 bg-white px-3 py-2 text-sm font-semibold text-alpine"
      >
        <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
          <span className="h-0.5 rounded bg-alpine" />
          <span className="h-0.5 rounded bg-alpine" />
          <span className="h-0.5 rounded bg-alpine" />
        </span>
        {courant?.nom ?? "Menu"}
      </button>

      {ouvert ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOuvert(false)}
            className="absolute inset-0 h-full w-full bg-alpine/40"
          />
          <nav
            id="menu-back-office"
            aria-label="Back-office"
            className="absolute inset-y-0 right-0 flex w-[85%] max-w-xs flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-glacier-200 px-4 py-3">
              <span className="font-display text-lg text-alpine">Menu</span>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer le menu"
                className="rounded px-2 py-1 text-2xl leading-none text-alpine hover:bg-glacier-50"
              >
                ×
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto py-2">
              {onglets.map((o) => (
                <li key={o.cle}>
                  <Link
                    href={o.href}
                    onClick={() => setOuvert(false)}
                    aria-current={o.cle === actif ? "page" : undefined}
                    className={`block border-l-4 px-4 py-3 text-base ${
                      o.cle === actif
                        ? "border-marque bg-marque/5 font-semibold text-alpine"
                        : "border-transparent text-alpine-700 hover:bg-glacier-50"
                    }`}
                  >
                    {o.nom}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-glacier-200 px-4 py-4 text-sm">
              <p className="break-all text-alpine-600">{email}</p>
              {children}
              <p className="text-xs text-alpine-600">
                Tableau de bord créé par{" "}
                <a href="https://clickzou.fr/" className="font-semibold text-alpine underline underline-offset-2">
                  Clickzou
                </a>
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
