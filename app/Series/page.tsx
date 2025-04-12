import ContentCategory from "@/components/Content/ContentCategory/ContentCategory";
import { ContentItem } from "@/components/Content/ContentItem/ContentItem";
import { fetchPopularSeries } from "@/lib/tmdb/series";
import { TMDBTVShow } from "@/types/tmdb/tmbSeries";

export default async function SeriesPage() {
        const series = await fetchPopularSeries();
      
        const contentItems: ContentItem[] = series.map((show: TMDBTVShow) => ({
          id: show.id,
          title: show.name,
          description: show.overview,
          imageUrl: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        }));
      
        return (
          <div className="px-8 py-6">
            <ContentCategory categoryTitle="Series Populares" contentItems={contentItems} />
          </div>
        );
}