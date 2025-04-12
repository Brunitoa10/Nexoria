import { fetchFromTMDB } from "./client";

export async function fetchPopularSeries() {
  const data = await fetchFromTMDB("tv/popular");
  return data.results;
}

export async function fetchTopRatedSeries() {
  const data = await fetchFromTMDB("tv/top_rated");
  return data.results;
}
