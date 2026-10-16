/**
 * DTOs: forma exacta en la que responde la API de TMDB.
 * Solo se usan dentro de lib/tmdb; hacia afuera se exponen modelos de dominio (types/content.ts).
 */

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbGenreListResponse {
  genres: TmdbGenre[];
}

interface TmdbMediaBase {
  id: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TmdbMovie extends TmdbMediaBase {
  title: string;
  release_date?: string;
}

export interface TmdbTvShow extends TmdbMediaBase {
  name: string;
  first_air_date?: string;
}

export interface TmdbVideo {
  key: string;
  site: string;
  type: string;
  official: boolean;
  iso_639_1: string;
}

export interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface TmdbDetailExtras<TSimilar> {
  genres: TmdbGenre[];
  tagline?: string;
  credits?: { cast: TmdbCastMember[] };
  videos?: { results: TmdbVideo[] };
  similar?: TmdbPaginatedResponse<TSimilar>;
}

export interface TmdbMovieDetail extends TmdbMovie, TmdbDetailExtras<TmdbMovie> {
  runtime: number | null;
}

export interface TmdbTvDetail extends TmdbTvShow, TmdbDetailExtras<TmdbTvShow> {
  number_of_seasons: number;
  episode_run_time: number[];
}

export type TmdbTrendingResult =
  | (TmdbMovie & { media_type: "movie" })
  | (TmdbTvShow & { media_type: "tv" })
  | { media_type: "person"; id: number };
