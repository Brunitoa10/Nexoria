import { SearchX } from "lucide-react";
import Link from "next/link";

import { buttonClass } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import Pagination from "@/components/ui/Pagination";
import { routes } from "@/config/navigation";
import { withFallback } from "@/lib/async";
import { formatCount, parsePositiveInt } from "@/lib/format";
import { catalogs } from "@/lib/tmdb";
import type { ContentSection, MediaType } from "@/types/content";

import ContentGrid from "./ContentGrid";
import ContentRow from "./ContentRow";
import GenreChips from "./GenreChips";
import Hero from "./Hero";

export type CatalogSearchParams = Record<string, string | string[] | undefined>;

interface CatalogViewProps {
  mediaType: MediaType;
  searchParams: CatalogSearchParams;
}

const COPY: Record<MediaType, { title: string; plural: string; upcoming: string }> = {
  movie: { title: "Películas", plural: "películas", upcoming: "Próximos estrenos" },
  tv: { title: "Series", plural: "series", upcoming: "En emisión" },
};

/**
 * Vista compartida por /Movies y /Series (antes eran dos páginas con lógica duplicada).
 * - Sin género: hero + filas curadas + una fila por género.
 * - Con ?genre=: grilla paginada del género elegido.
 */
export default async function CatalogView({ mediaType, searchParams }: CatalogViewProps) {
  const catalog = catalogs[mediaType];
  const copy = COPY[mediaType];
  const genreId = parsePositiveInt(searchParams.genre, 0) || undefined;
  const page = parsePositiveInt(searchParams.page, 1);

  const genres = await withFallback(catalog.getGenres(), [], "Géneros");

  if (genreId) {
    const genre = genres.find((g) => g.id === genreId);
    const result = await catalog.discover({ genreId, page });

    return (
      <PageShell>
        <PageHeader
          title={genre ? `${copy.title} de ${genre.name}` : copy.title}
          subtitle={`${formatCount(result.totalResults)} ${copy.plural} · página ${result.page} de ${result.totalPages}`}
        />
        <GenreChips mediaType={mediaType} genres={genres} activeGenreId={genreId} />
        {result.items.length > 0 ? (
          <>
            <ContentGrid items={result.items} label={genre?.name ?? copy.title} />
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              hrefFor={(p) => routes.catalog(mediaType, { genre: genreId, page: p })}
            />
          </>
        ) : (
          <EmptyState
            icon={SearchX}
            title="No encontramos títulos"
            description="Probá con otro género o volvé al catálogo completo."
            action={
              <Link href={routes.catalog(mediaType)} className={buttonClass("secondary")}>
                Ver todo
              </Link>
            }
          />
        )}
      </PageShell>
    );
  }

  const [trending, popular, topRated, upcoming, genreSections] = await Promise.all([
    withFallback(catalog.getTrending(), [], "Tendencias"),
    withFallback(catalog.getPopular(), [], "Populares"),
    withFallback(catalog.getTopRated(), [], "Mejor valoradas"),
    withFallback(catalog.getUpcoming(), [], copy.upcoming),
    withFallback(catalog.getSectionsByGenre(), [], "Secciones por género"),
  ]);

  const featured = trending.find((item) => item.backdropUrl) ?? popular[0];

  const sections: ContentSection[] = [
    { id: `${mediaType}-trending`, title: "Tendencias de la semana", items: trending },
    { id: `${mediaType}-popular`, title: `${copy.title} populares`, items: popular },
    { id: `${mediaType}-top`, title: "Mejor valoradas", items: topRated },
    { id: `${mediaType}-upcoming`, title: copy.upcoming, items: upcoming },
    ...genreSections.map((section) => ({
      ...section,
      href: section.genreId ? routes.catalog(mediaType, { genre: section.genreId }) : undefined,
    })),
  ];

  if (!featured && sections.every((s) => s.items.length === 0)) {
    // Todas las fuentes fallaron: el error boundary muestra la pantalla de reintento.
    throw new Error(`No se pudo cargar el catálogo de ${copy.plural}`);
  }

  return (
    <>
      {featured && <Hero item={featured} eyebrow={`${copy.title} · En tendencia`} />}
      <PageShell offsetNav={!featured} className={featured ? "relative z-10 -mt-12" : ""}>
        {!featured && <PageHeader title={copy.title} />}
        {genres.length > 0 && <GenreChips mediaType={mediaType} genres={genres} />}
        {sections.map((section, index) => (
          <ContentRow key={section.id} section={section} priority={index === 0} />
        ))}
      </PageShell>
    </>
  );
}
