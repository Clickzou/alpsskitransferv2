import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { utilisateurCourant } from "@/lib/admin/session";
import { suiteSure } from "@/lib/admin/suite";
import FormulaireConnexion from "./FormulaireConnexion";

/**
 * La connexion au back-office.
 *
 * Déjà connecté : on ne montre pas un formulaire à qui n'en a pas besoin.
 *
 * `suite` ramène là où l'on allait — la fiche d'un client, depuis le lien de
 * l'e-mail « à valider ». Il ne peut désigner qu'une page du back-office
 * (`lib/admin/suite.ts`) : une adresse de retour prise dans l'URL est sinon la
 * porte d'une redirection vers un faux écran de connexion.
 */
export default async function PageConnexion({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { suite: brute } = await searchParams;
  const suite = suiteSure(brute);
  if (await utilisateurCourant()) redirect(suite);

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
            Les réservations, les demandes des clients et la grille tarifaire.
          </p>

          <div className="mt-6">
            {configure ? (
              <FormulaireConnexion suite={suite} />
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
