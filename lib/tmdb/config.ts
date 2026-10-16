/**
 * Configuración centralizada de TMDB.
 */
export const TMDB_CONFIG = {
  /** Se puede sobreescribir con TMDB_API_BASE_URL (proxy, mock local, etc.). */
  apiBaseUrl: process.env.TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3",
  imageBaseUrl: "https://image.tmdb.org/t/p",
  language: "es-ES",
  /** Idiomas aceptados para videos: si no hay tráiler en español, usa el de inglés. */
  videoLanguages: "es,en,null",
  /** Segundos que Next.js cachea cada respuesta antes de revalidar. */
  revalidateSeconds: 60 * 60,
  /** TMDB no permite pedir más allá de la página 500. */
  maxPage: 500,
} as const;

export const IMAGE_SIZES = {
  poster: "w342",
  posterLarge: "w500",
  backdrop: "w1280",
  profile: "w185",
} as const;

type ImageSize = (typeof IMAGE_SIZES)[keyof typeof IMAGE_SIZES];

export const FALLBACK_POSTER_URL = "/images/no-poster.svg";

export function buildImageUrl(path: string | null | undefined, size: ImageSize): string | null {
  return path ? `${TMDB_CONFIG.imageBaseUrl}/${size}${path}` : null;
}

export function buildPosterUrl(path: string | null | undefined): string {
  return buildImageUrl(path, IMAGE_SIZES.poster) ?? FALLBACK_POSTER_URL;
}
