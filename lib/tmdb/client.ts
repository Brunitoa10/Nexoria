import "server-only";

import { TMDB_CONFIG } from "./config";

export class TmdbError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly endpoint?: string,
  ) {
    super(message);
    this.name = "TmdbError";
  }

  get isNotFound(): boolean {
    return this.status === 404;
  }
}

export type QueryParams = Record<string, string | number | undefined>;

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new TmdbError("TMDB_API_KEY no está definida en el entorno (.env.local)");
  }
  return apiKey;
}

function buildUrl(endpoint: string, params: QueryParams): URL {
  const url = new URL(`${TMDB_CONFIG.apiBaseUrl}/${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", TMDB_CONFIG.language);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }
  return url;
}

/**
 * Único punto de acceso HTTP a TMDB (Single Responsibility).
 * Genérico y tipado: quien lo llama indica qué forma espera recibir.
 */
export async function tmdbFetch<T>(endpoint: string, params: QueryParams = {}): Promise<T> {
  const res = await fetch(buildUrl(endpoint, params), {
    next: { revalidate: TMDB_CONFIG.revalidateSeconds },
  });

  if (!res.ok) {
    throw new TmdbError(`TMDB respondió ${res.status} ${res.statusText}`, res.status, endpoint);
  }

  return res.json() as Promise<T>;
}
