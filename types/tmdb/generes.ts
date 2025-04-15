import { TmdbGenre } from "@/types/tmdb/tmbdGeneres";


async function fetchContentGenres(contentType: "movie" | "tv"): Promise<TmdbGenre[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/${contentType}/list?language=es-ES&api_key=${process.env.TMDB_API_KEY}`
  );
  
  if (!res.ok) throw new Error(`Error al obtener géneros de ${contentType}`);

  const data: { genres: TmdbGenre[] } = await res.json();
  return data.genres;
}

export async function fetchMovieGenres(): Promise<TmdbGenre[]> {
  return fetchContentGenres("movie");
}

export async function fetchSerieGenres(): Promise<TmdbGenre[]> {
  return fetchContentGenres("tv");
}
