import Link from "next/link";
import { ACCUEIL_ADMIN } from "@/lib/admin/suite";
import { saisieAlpes } from "@/lib/temps";

/**
 * Chercher un client, ou une période.
 *
 * Un simple formulaire `GET` : la recherche vit dans l'URL, donc elle se garde
 * en favori, se renvoie par message, et marche sans JavaScript — sur le
 * téléphone de l'exploitant en montagne comme au bureau.
 *
 * Les raccourcis répondent à la question du matin : qui je conduis
 * aujourd'hui, demain, cette semaine. Les journées sont celles des Alpes.
 */
export default function Recherche({ q, du, au }: { q: string; du: string; au: string }) {
  const jour = (decalage: number) =>
    saisieAlpes(new Date(Date.now() + decalage * 24 * 3600 * 1000)).slice(0, 10);
  const raccourcis = [
    { nom: "Aujourd’hui", du: jour(0), au: jour(0) },
    { nom: "Demain", du: jour(1), au: jour(1) },
    { nom: "7 prochains jours", du: jour(0), au: jour(7) },
  ];
  const actif = Boolean(q || du || au);

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";

  return (
    <section className="mt-8 rounded-xl border border-glacier-200 bg-white p-4 shadow-carte">
      <form action={ACCUEIL_ADMIN} className="grid gap-3 md:grid-cols-[1fr_10rem_10rem_auto] md:items-end">
        <div>
          <label className={etiquette} htmlFor="recherche-q">
            Rechercher
          </label>
          <input
            id="recherche-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Nom, e-mail, téléphone ou référence"
            className={champ}
          />
        </div>
        <div>
          <label className={etiquette} htmlFor="recherche-du">
            Du
          </label>
          <input id="recherche-du" name="du" type="date" defaultValue={du} className={champ} />
        </div>
        <div>
          <label className={etiquette} htmlFor="recherche-au">
            Au
          </label>
          <input id="recherche-au" name="au" type="date" defaultValue={au} className={champ} />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded bg-marque px-5 py-2 text-sm font-semibold text-white transition hover:bg-marque-600"
          >
            Rechercher
          </button>
          {actif ? (
            <Link href={ACCUEIL_ADMIN} className="text-sm text-alpine-700 underline underline-offset-2">
              Effacer
            </Link>
          ) : null}
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {raccourcis.map((r) => (
          <Link
            key={r.nom}
            href={`${ACCUEIL_ADMIN}?du=${r.du}&au=${r.au}`}
            className={`rounded-full border px-3 py-1 transition ${
              du === r.du && au === r.au && !q
                ? "border-marque bg-marque/5 font-semibold text-marque"
                : "border-glacier-300 text-alpine-700 hover:border-alpine/40"
            }`}
          >
            {r.nom}
          </Link>
        ))}
      </div>
    </section>
  );
}
