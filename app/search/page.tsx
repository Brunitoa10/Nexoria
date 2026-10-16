import { Search, SearchX } from "lucide-react";
import type { Metadata } from "next";

import ContentGrid from "@/components/catalog/ContentGrid";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import Pagination from "@/components/ui/Pagination";
import { routes } from "@/config/navigation";
import { formatCount, parsePositiveInt } from "@/lib/format";
import { searchContent } from "@/lib/tmdb";

type SearchParams = Record<string, string | string[] | undefined>;

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

const getQuery = (params: SearchParams) => {
  const raw = Array.isArray(params.q) ? params.q[0] : params.q;
  return (raw ?? "").trim().slice(0, 100);
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const q = getQuery(await searchParams);
  return { title: q ? `Resultados para “${q}”` : "Buscar", robots: { index: false } };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getQuery(params);
  const page = parsePositiveInt(params.page, 1);

  if (!query) {
    return (
      <PageShell>
        <PageHeader title="Buscar" />
        <EmptyState
          icon={Search}
          title="¿Qué querés ver?"
          description="Usá el buscador de arriba para encontrar películas y series por título."
        />
      </PageShell>
    );
  }

  const result = await searchContent(query, page);

  return (
    <PageShell>
      <PageHeader
        title={`Resultados para “${query}”`}
        subtitle={result.items.length > 0 ? `${formatCount(result.totalResults)} resultados` : undefined}
      />
      {result.items.length > 0 ? (
        <>
          <ContentGrid items={result.items} label={`Resultados para ${query}`} />
          <Pagination page={result.page} totalPages={result.totalPages} hrefFor={(p) => routes.search(query, p)} />
        </>
      ) : (
        <EmptyState
          icon={SearchX}
          title="Sin resultados"
          description={`No encontramos películas ni series que coincidan con “${query}”. Revisá la ortografía o probá con otro título.`}
        />
      )}
    </PageShell>
  );
}
