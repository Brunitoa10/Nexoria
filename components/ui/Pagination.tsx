import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  hrefFor: (page: number) => string;
}

const itemClass =
  "inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-md px-3 text-sm font-semibold transition-colors";

/** Devuelve las páginas a mostrar con "…" en los saltos: 1 … 4 5 [6] 7 8 … 40 */
function getPageWindow(page: number, total: number): (number | "gap")[] {
  const pages = new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? (["gap", p] as const) : [p]));
}

export default function Pagination({ page, totalPages, hrefFor }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav aria-label="Paginación" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {hasPrev ? (
        <Link href={hrefFor(page - 1)} className={`${itemClass} text-zinc-300 hover:bg-white/10`} rel="prev">
          <ChevronLeft className="h-4 w-4" aria-hidden /> Anterior
        </Link>
      ) : (
        <span className={`${itemClass} text-zinc-600`}>
          <ChevronLeft className="h-4 w-4" aria-hidden /> Anterior
        </span>
      )}

      {getPageWindow(page, totalPages).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-zinc-600">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${itemClass} ${p === page ? "bg-brand text-white" : "text-zinc-300 hover:bg-white/10"}`}
          >
            {p}
          </Link>
        ),
      )}

      {hasNext ? (
        <Link href={hrefFor(page + 1)} className={`${itemClass} text-zinc-300 hover:bg-white/10`} rel="next">
          Siguiente <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : (
        <span className={`${itemClass} text-zinc-600`}>
          Siguiente <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      )}
    </nav>
  );
}
