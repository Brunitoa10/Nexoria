import type { ContentItem, MediaType, PaginatedContent } from "@/types/content";

import { createCatalogRepository, type CatalogRepository } from "./catalog.repository";
import { tmdbFetch } from "./client";
import { TMDB_CONFIG } from "./config";
import { movieStrategy } from "./strategies/movie.strategy";
import { tvStrategy } from "./strategies/tv.strategy";
import type { TmdbPaginatedResponse, TmdbTrendingResult } from "./types";

/** Registro de catálogos por tipo de contenido (punto único de composición). */
export const catalogs: Record<MediaType, CatalogRepository> = {
  movie: createCatalogRepository(movieStrategy),
  tv: createCatalogRepository(tvStrategy),
};

export function isMediaType(value: string): value is MediaType {
  return value in catalogs;
}

/** Convierte resultados mixtos (trending/search) al modelo de dominio, descartando personas. */
function mapMixedResults(results: TmdbTrendingResult[]): ContentItem[] {
  return results.flatMap((result) => {
    if (result.media_type === "movie") return [movieStrategy.toContentItem(result)];
    if (result.media_type === "tv") return [tvStrategy.toContentItem(result)];
    return [];
  });
}

/** Tendencias de la semana (películas + series). */
export async function getTrendingAll(): Promise<ContentItem[]> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbTrendingResult>>("trending/all/week");
  return mapMixedResults(data.results);
}

/** Búsqueda combinada de películas y series. */
export async function searchContent(query: string, page = 1): Promise<PaginatedContent> {
  const data = await tmdbFetch<TmdbPaginatedResponse<TmdbTrendingResult>>("search/multi", {
    query,
    page: Math.min(Math.max(1, page), TMDB_CONFIG.maxPage),
    include_adult: "false",
  });

  return {
    items: mapMixedResults(data.results),
    page: data.page,
    totalPages: Math.min(data.total_pages, TMDB_CONFIG.maxPage),
    totalResults: data.total_results,
  };
}

export type { CatalogRepository } from "./catalog.repository";
export { TmdbError } from "./client";
