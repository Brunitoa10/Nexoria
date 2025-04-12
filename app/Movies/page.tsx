import ContentCategory from "@/components/Content/ContentCategory/ContentCategory";
import { ContentItem } from "@/components/Content/ContentItem/ContentItem";
import { fetchPopularMovies } from "@/lib/tmdb/movies";
import { TMDBMovie } from "@/types/tmdb/tmbMovie";

export default async function MoviesPage() {
    const movies = await fetchPopularMovies();
  
    const contentItems: ContentItem[] = movies.map((movie: TMDBMovie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
  
    return (
      <div className="px-8 py-6">
        <ContentCategory categoryTitle="Películas Populares" contentItems={contentItems} />
      </div>
    );
}