import { fetchFromTMDB } from "./client";

export async function searchMulti(query: string) {
  const data = await fetchFromTMDB("search/multi", { query });
  return data.results;
}
