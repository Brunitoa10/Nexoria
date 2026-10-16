import { formatSeasons } from "@/lib/format";

import { limitSimilar, mapBaseItem, mapCast, pickTrailerKey } from "../mappers";
import type { TmdbTvDetail, TmdbTvShow } from "../types";
import type { MediaStrategy } from "./media.strategy";

const toContentItem = (show: TmdbTvShow) =>
  mapBaseItem("tv", { ...show, title: show.name, date: show.first_air_date });

export const tvStrategy: MediaStrategy<TmdbTvShow, TmdbTvDetail> = {
  mediaType: "tv",
  upcomingEndpoint: "tv/on_the_air",
  toContentItem,
  toContentDetail: (show) => ({
    ...toContentItem(show),
    tagline: show.tagline || null,
    genres: show.genres ?? [],
    durationLabel: formatSeasons(show.number_of_seasons),
    voteCount: show.vote_count ?? 0,
    trailerKey: pickTrailerKey(show.videos?.results),
    cast: mapCast(show.credits?.cast),
    similar: limitSimilar(show.similar?.results).map(toContentItem),
  }),
};
