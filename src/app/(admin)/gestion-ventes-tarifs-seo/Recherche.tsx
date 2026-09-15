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
 *
 * Le tri — demande de JC, 15 septembre 2026 : voir les dernières ventes en
 * tête, par date d'achat, et pas seulement par prise en charge. Il vit lui
 * aussi dans l'URL (`tri=achat`), et la recherche le garde.
 */
export default function Recherche({
  q,
  du,
  au,
  tri,
}: {
  q: string;
  du: string;
  au: string;
  tri: "prise" | "achat";
}) {
  /*
    Les jours se comptent sur le calendrier des Alpes, pas en tranches de
    24 heures : la nuit du changement d'heure, « demain » tombait sinon sur
    le surlendemain. Et « 7 prochains jours » va d'aujourd'hui à J+6.
  */
  const aujourdHui = saisieAlpes(new Date()).slice(0, 10);
  const jour = (decalage: number) => {
    const [annee, mois, date] = aujourdHui.split("-").map(Number);
    return new Date(Date.UTC(annee, mois - 1, date + decalage)).toISOString().slice(0, 10);
  };
  const raccourcis = [
    { nom: "Aujourd’hui", du: jour(0), au: jour(0) },
    { nom: "Demain", du: jour(1), au: jour(1) },
    { nom: "7 prochains jours", du: jour(0), au: jour(6) },
  ];
  const actif = Boolean(q || du || au);
  const suffixeTri = tri === "achat" ? "&tri=achat" : "";
  /** L'URL courante avec l'autre tri : la recherche en cours est gardée. */
  const avecTri = (valeur: "prise" | "achat") => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (du) p.set("du", du);
    if (au) p.set("au", au);
    if (valeur === "achat") p.set("tri", "achat");
    const chaine = p.toString();
    return chaine ? `${ACCUEIL_ADMIN}?${chaine}` : ACCUEIL_ADMIN;
  };

  const champ =
    "mt-1 w-full rounded border border-glacier-300 bg-white px-3 py-2 text-sm text-alpine focus:border-alpes focus:outline-none focus:ring-2 focus:ring-alpes/40";
  const etiquette = "block text-xs font-medium uppercase tracking-wide text-alpine-600";

  return (
    <section className="mt-8 rounded-xl border border-glacier-200 bg-white p-4 shadow-carte">
      <form action={ACCUEIL_ADMIN} className="grid gap-3 md:grid-cols-[1fr_10rem_10rem_auto] md:items-end">
        {tri === "achat" ? <input type="hidden" name="tri" value="achat" /> : null}
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
            <Link
              href={tri === "achat" ? `${ACCUEIL_ADMIN}?tri=achat` : ACCUEIL_ADMIN}
              className="text-sm text-alpine-700 underline underline-offset-2"
            >
              Effacer
            </Link>
          ) : null}
        </div>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {raccourcis.map((r) => (
          <Link
            key={r.nom}
            href={`${ACCUEIL_ADMIN}?du=${r.du}&au=${r.au}${suffixeTri}`}
            className={`rounded-full border px-3 py-1 transition ${
              du === r.du && au === r.au && !q
                ? "border-marque bg-marque/5 font-semibold text-marque"
                : "border-glacier-300 text-alpine-700 hover:border-alpine/40"
            }`}
          >
            {r.nom}
          </Link>
        ))}

        <span className="ml-auto flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-alpine-600">Trier par</span>
          {([
            ["prise", "Prise en charge"],
            ["achat", "Date d’achat"],
          ] as const).map(([valeur, nom]) => (
            <Link
              key={valeur}
              href={avecTri(valeur)}
              aria-current={tri === valeur ? "true" : undefined}
              className={`rounded-full border px-3 py-1 transition ${
                tri === valeur
                  ? "border-marque bg-marque/5 font-semibold text-marque"
                  : "border-glacier-300 text-alpine-700 hover:border-alpine/40"
              }`}
            >
              {nom}
            </Link>
          ))}
        </span>
      </div>
    </section>
  );
}
