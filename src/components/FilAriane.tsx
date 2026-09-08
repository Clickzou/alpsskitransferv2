import Link from "next/link";

/**
 * Fil d'Ariane. Le dernier élément est la page courante : il ne se lie pas.
 *
 * La variante `clair` sert dans le bandeau photographique des pages du silo, où
 * le fil d'Ariane est posé sur le voile bleu nuit.
 */
export default function FilAriane({
  elements,
  clair = false,
}: {
  elements: { nom: string; chemin: string }[];
  clair?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm ${clair ? "text-glacier-300" : "text-alpine-600"}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {elements.map((element, i) => {
          const dernier = i === elements.length - 1;
          return (
            <li key={element.chemin} className="flex items-center gap-1">
              {dernier ? (
                <span aria-current="page" className={clair ? "text-white" : undefined}>
                  {element.nom}
                </span>
              ) : (
                <>
                  <Link
                    href={element.chemin}
                    className={clair ? "hover:text-white" : "hover:text-marque"}
                  >
                    {element.nom}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
