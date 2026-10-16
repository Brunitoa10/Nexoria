import { formatRuntime } from "@/lib/format";

import { limitSimilar, mapBaseItem, mapCast, pickTrailerKey } from "../mappers";
import type { TmdbMovie, TmdbMovieDetail } from "../types";
import type { MediaStrategy } from "./media.strategy";

const toContentItem = (movie: TmdbMovie) =>
  mapBaseItem("movie", { ...movie, title: movie.title, date: movie.release_date });

export const movieStrategy: MediaStrategy<TmdbMovie, TmdbMovieDetail> = {
  mediaType: "movie",
  upcomingEndpoint: "movie/upcoming",
  toContentItem,
  toContentDetail: (movie) => ({
    ...toContentItem(movie),
    tagline: movie.tagline || null,
    genres: movie.genres ?? [],
    durationLabel: formatRuntime(movie.runtime),
    voteCount: movie.vote_count ?? 0,
    trailerKey: pickTrailerKey(movie.videos?.results),
    cast: mapCast(movie.credits?.cast),
    similar: limitSimilar(movie.similar?.results).map(toContentItem),
  }),
};
