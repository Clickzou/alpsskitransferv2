import Link from "next/link";

/**
 * La pagination du blog — demande de JC, 15 septembre 2026.
 *
 * Des liens ordinaires, pas un bouton « charger plus » : un robot ne clique
 * pas, il suit des `href`. Chaque page a son adresse (`/blog/page/2/`), et
 * `rel="prev"` / `rel="next"` disent l'ordre à qui sait le lire.
 */
const cheminPage = (n: number) => (n === 1 ? "/blog/" : `/blog/page/${n}/`);

export default function Pagination({ page, pages }: { page: number; pages: number }) {
  if (pages <= 1) return null;
  const lien = "rounded border border-glacier-300 px-3 py-1.5 text-sm text-alpine-700 hover:bg-white";
  return (
    <nav aria-label="Blog pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={cheminPage(page - 1)} rel="prev" className={lien}>
          ← Previous page
        </Link>
      ) : null}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
        n === page ? (
          <span key={n} aria-current="page" className="rounded bg-alpine px-3 py-1.5 text-sm font-semibold text-white">
            {n}
          </span>
        ) : (
          <Link key={n} href={cheminPage(n)} className={lien}>
            {n}
          </Link>
        ),
      )}
      {page < pages ? (
        <Link href={cheminPage(page + 1)} rel="next" className={lien}>
          Next page →
        </Link>
      ) : null}
    </nav>
  );
}
