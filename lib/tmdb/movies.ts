import { fetchFromTMDB } from "./client";

export async function fetchPopularMovies() {
  const data = await fetchFromTMDB("movie/popular");
  return data.results;
}

export async function fetchTopRatedMovies() {
  const data = await fetchFromTMDB("movie/top_rated");
  return data.results;
}
