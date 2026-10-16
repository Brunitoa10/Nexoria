import type { ContentDetail, ContentItem, ContentSection, Genre, MediaType, PaginatedContent } from "@/types/content";

import { tmdbFetch, TmdbError, type QueryParams } from "./client";
import { TMDB_CONFIG } from "./config";
import type { MediaStrategy } from "./strategies/media.strategy";
import type { TmdbGenreListResponse, TmdbPaginatedResponse } from "./types";

export interface DiscoverOptions {
  genreId?: number;
  page?: number;
}

/**
 * Contrato que consumen las páginas. Depender de esta interfaz (y no de TMDB)
 * permite cambiar de proveedor o mockear en tests (Dependency Inversion).
 */
export interface CatalogRepository {
  readonly mediaType: MediaType;
  getTrending(): Promise<ContentItem[]>;
  getPopular(): Promise<ContentItem[]>;
  getTopRated(): Promise<ContentItem[]>;
  getUpcoming(): Promise<ContentItem[]>;
  getGenres(): Promise<Genre[]>;
  discover(options?: DiscoverOptions): Promise<PaginatedContent>;
  getSectionsByGenre(): Promise<ContentSection[]>;
  /** Devuelve null si el título no existe. */
  getDetail(id: string): Promise<ContentDetail | null>;
}

const clampPage = (page = 1) => Math.min(Math.max(1, page), TMDB_CONFIG.maxPage);

/**
 * Repository genérico: la misma lógica sirve para películas y series;
 * lo específico de cada una lo aporta la estrategia inyectada.
 */
export function createCatalogRepository<TDto, TDetailDto>(
  strategy: MediaStrategy<TDto, TDetailDto>,
): CatalogRepository {
  const { mediaType } = strategy;

  const fetchPage = async (endpoint: string, params: QueryParams = {}): Promise<PaginatedContent> => {
    const data = await tmdbFetch<TmdbPaginatedResponse<TDto>>(endpoint, params);
    return {
      items: data.results.map(strategy.toContentItem),
      page: data.page,
      totalPages: Math.min(data.total_pages, TMDB_CONFIG.maxPage),
      totalResults: data.total_results,
    };
  };

  const fetchList = async (endpoint: string, params?: QueryParams) => (await fetchPage(endpoint, params)).items;

  const getGenres = async (): Promise<Genre[]> => {
    const data = await tmdbFetch<TmdbGenreListResponse>(`genre/${mediaType}/list`);
    return data.genres;
  };

  const discover = ({ genreId, page }: DiscoverOptions = {}) =>
    fetchPage(`discover/${mediaType}`, {
      with_genres: genreId,
      page: clampPage(page),
      sort_by: "popularity.desc",
      "vote_count.gte": 50,
    });

  return {
    mediaType,
    getTrending: () => fetchList(`trending/${mediaType}/week`),
    getPopular: () => fetchList(`${mediaType}/popular`),
    getTopRated: () => fetchList(`${mediaType}/top_rated`),
    getUpcoming: () => fetchList(strategy.upcomingEndpoint),
    getGenres,
    discover,

    async getSectionsByGenre() {
      const genres = await getGenres();

      // allSettled: si falla un género, el resto de la página se sigue mostrando.
      const results = await Promise.allSettled(
        genres.map(async (genre): Promise<ContentSection> => ({
          id: `${mediaType}-genre-${genre.id}`,
          title: genre.name,
          genreId: genre.id,
          items: (await discover({ genreId: genre.id })).items,
        })),
      );

      return results
        .filter((r): r is PromiseFulfilledResult<ContentSection> => r.status === "fulfilled")
        .map((r) => r.value)
        .filter((section) => section.items.length > 0);
    },

    async getDetail(id) {
      if (!/^\d+$/.test(id)) return null;
      try {
        const dto = await tmdbFetch<TDetailDto>(`${mediaType}/${id}`, {
          append_to_response: "credits,videos,similar",
          include_video_language: TMDB_CONFIG.videoLanguages,
        });
        return strategy.toContentDetail(dto);
      } catch (error) {
        if (error instanceof TmdbError && error.isNotFound) return null;
        throw error;
      }
    },
  };
}
