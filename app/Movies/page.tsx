import ContentCategory from "@/components/Content/ContentCategory/ContentCategory";
import { ContentItem } from "@/components/Content/ContentItem/ContentItem";

import { fetchMovieGenres } from "@/types/tmdb/generes";
import { fetchMoviesByGenre } from "@/types/tmdb/strategies/fetch-by-genre.strategy";
import { TmdbGenre } from "@/types/tmdb/tmbdGeneres";
import { TMDBMovie } from "@/types/tmdb/tmbMovie";

export default async function MoviesPage() {
  const genres: TmdbGenre[] = await fetchMovieGenres();

  const sections = await Promise.all(
    genres.map(async (genre) => {
      const movies: TMDBMovie[] = await fetchMoviesByGenre(genre.id);

      const contentItems: ContentItem[] = movies.map((movie) => ({
        id: movie.id.toString(), // Conversión de número a string
        title: movie.title,
        description: movie.overview,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));

      return {
        genreTitle: genre.name,
        contentItems,
      };
    })
  );

  return (
    <div className="px-8 py-6 space-y-10">
      {sections.map(({ genreTitle, contentItems }) => (
        <ContentCategory
          key={genreTitle}
          categoryTitle={genreTitle}
          contentItems={contentItems}
        />
      ))}
    </div>
  );
}