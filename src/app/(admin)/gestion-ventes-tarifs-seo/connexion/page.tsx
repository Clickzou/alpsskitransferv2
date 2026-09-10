import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { utilisateurCourant } from "@/lib/admin/session";
import FormulaireConnexion from "./FormulaireConnexion";

/** Déjà connecté : on ne montre pas un formulaire à qui n'en a pas besoin. */
export default async function PageConnexion() {
  if (await utilisateurCourant()) redirect("/gestion-ventes-tarifs-seo/");

  const configure = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo lang="fr" />
        </div>

        <div className="rounded-xl border border-glacier-200 bg-white p-6 shadow-carte">
          <h1 className="font-display text-xl text-alpine">Back-office</h1>
          <p className="mt-1 text-sm text-alpine-600">
            Les courses à venir et la grille tarifaire.
          </p>

          <div className="mt-6">
            {configure ? (
              <FormulaireConnexion />
            ) : (
              /*
                Sans Supabase, il n'y a pas d'authentification possible — et un
                formulaire qui refuserait tout le monde sans dire pourquoi ferait
                perdre du temps à celui qui installe l'environnement.
              */
              <p className="rounded border border-or/40 bg-or-50 px-3 py-2 text-sm leading-relaxed text-alpine-700">
                Supabase n’est pas configuré sur cet environnement. Renseignez
                <code className="mx-1 rounded bg-white px-1 text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
                et
                <code className="mx-1 rounded bg-white px-1 text-xs">
                  NEXT_PUBLIC_SUPABASE_ANON_KEY
                </code>
                pour ouvrir le back-office.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
