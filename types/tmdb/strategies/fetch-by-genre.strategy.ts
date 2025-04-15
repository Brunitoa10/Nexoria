import { TMDBMovie } from "../tmbMovie";
import { TMDBTVShow } from "../tmbSeries";


const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

export interface FetchByGenreStrategy<T> {
  fetchByGenre(genreId: number): Promise<T[]>;
}

export async function fetchMoviesByGenre(genreId: number): Promise<TMDBMovie[]> {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=es-ES&api_key=${process.env.TMDB_API_KEY}`);
    if (!res.ok) throw new Error("Error al obtener películas por género");
    const data: { results: TMDBMovie[] } = await res.json();
    return data.results;
  }

export class FetchSeriesByGenre implements FetchByGenreStrategy<TMDBTVShow> {
  async fetchByGenre(genreId: number): Promise<TMDBTVShow[]> {
    const res = await fetch(`${API_BASE_URL}/discover/tv?with_genres=${genreId}&language=es-ES&api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Error al obtener series");
    const data: { results: TMDBTVShow[] } = await res.json();
    return data.results;
  }
}
