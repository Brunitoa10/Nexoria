import type { CastMember, ContentItem, MediaType } from "@/types/content";
import { toYear } from "@/lib/format";

import { buildImageUrl, buildPosterUrl, IMAGE_SIZES } from "./config";
import type { TmdbCastMember, TmdbVideo } from "./types";

const MAX_CAST = 12;
const MAX_SIMILAR = 12;

interface BaseFields {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  date?: string;
}

/** Mapeo común a películas y series: las estrategias solo resuelven los campos que difieren. */
export function mapBaseItem(mediaType: MediaType, dto: BaseFields): ContentItem {
  return {
    id: String(dto.id),
    mediaType,
    title: dto.title,
    overview: dto.overview ?? "",
    posterUrl: buildPosterUrl(dto.poster_path),
    backdropUrl: buildImageUrl(dto.backdrop_path, IMAGE_SIZES.backdrop),
    rating: Math.round((dto.vote_average ?? 0) * 10) / 10,
    year: toYear(dto.date),
  };
}

export function mapCast(cast: TmdbCastMember[] = []): CastMember[] {
  return [...cast]
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_CAST)
    .map((member) => ({
      id: String(member.id),
      name: member.name,
      character: member.character,
      profileUrl: buildImageUrl(member.profile_path, IMAGE_SIZES.profile),
    }));
}

/** Elige el mejor video: tráiler oficial en español > tráiler oficial > tráiler > teaser. */
export function pickTrailerKey(videos: TmdbVideo[] = []): string | null {
  const youtube = videos.filter((v) => v.site === "YouTube");
  const score = (v: TmdbVideo) =>
    (v.type === "Trailer" ? 4 : v.type === "Teaser" ? 1 : 0) + (v.official ? 2 : 0) + (v.iso_639_1 === "es" ? 1 : 0);

  const best = youtube.filter((v) => score(v) > 0).sort((a, b) => score(b) - score(a))[0];
  return best?.key ?? null;
}

export function limitSimilar<T>(items: T[] = []): T[] {
  return items.slice(0, MAX_SIMILAR);
}
