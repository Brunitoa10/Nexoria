const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("TMDB_API_KEY no está definida en el entorno");
}

export async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.searchParams.set("api_key", API_KEY as string);
  url.searchParams.set("language", "es-ES");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Error al obtener datos de TMDB: ${res.statusText}`);
  }

  return res.json();
}
