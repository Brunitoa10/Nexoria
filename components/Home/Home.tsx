import ContentCategory from "@/components/Content/ContentCategory/ContentCategory";

import { fetchPopularMovies } from "@/lib/tmdb/movies";
import { TMDBMovie } from "@/types/tmdb/tmbMovie";
import { ContentItem } from "../Content/ContentItem/ContentItem";
import { fetchPopularSeries } from "@/lib/tmdb/series";
import { TMDBTVShow } from "@/types/tmdb/tmbSeries";


export default async function MoviesPage() {
  const movies: TMDBMovie[] = await fetchPopularMovies();
  const series: TMDBTVShow[] = await fetchPopularSeries();
 
  const contentItems: ContentItem[] = movies.map((movie) => ({
    id: movie.id.toString(),
    title: movie.title,
    description: movie.overview,
    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));
  const contentItemsSerie: ContentItem[] = series.map((serie) => ({
    id: serie.id.toString(),
    title: serie.name,
    description: serie.overview,
    imageUrl: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
  }));

  return (
    <div className="px-8 py-6">
      <ContentCategory categoryTitle="Películas Populares" contentItems={contentItems} />
      <ContentCategory categoryTitle="Series Populares" contentItems={contentItemsSerie} />
    </div>
  );
}
