import ContentSections from "@/components/Content/ContentSections/ContentSections";
import { catalogs } from "@/lib/tmdb";

export default async function Home() {
  // En paralelo (antes se hacían en secuencia y se sumaban los tiempos).
  const [movies, series] = await Promise.all([catalogs.movie.getPopular(), catalogs.tv.getPopular()]);

  return (
    <ContentSections
      sections={[
        { id: "popular-movies", title: "Películas Populares", items: movies },
        { id: "popular-series", title: "Series Populares", items: series },
      ]}
    />
  );
}
