/**
 * Modelo de dominio de la app.
 * La UI solo conoce estos tipos, nunca la forma cruda de la API (TMDB).
 */

export type MediaType = "movie" | "tv";

export interface ContentItem {
  id: string;
  mediaType: MediaType;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string | null;
  /** Puntaje 0-10 con un decimal. */
  rating: number;
  year: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ContentSection {
  id: string;
  title: string;
  items: ContentItem[];
  /** Si la sección corresponde a un género, su id (para armar el link "Ver todo"). */
  genreId?: number;
  /** Link opcional a "Ver todo". */
  href?: string;
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  profileUrl: string | null;
}

export interface ContentDetail extends ContentItem {
  tagline: string | null;
  genres: Genre[];
  /** "2 h 10 min" para películas, "3 temporadas" para series. */
  durationLabel: string | null;
  voteCount: number;
  trailerKey: string | null;
  cast: CastMember[];
  similar: ContentItem[];
}

export interface PaginatedContent {
  items: ContentItem[];
  page: number;
  totalPages: number;
  totalResults: number;
}
