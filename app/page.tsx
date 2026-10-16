import ContentRow from "@/components/catalog/ContentRow";
import Hero from "@/components/catalog/Hero";
import PageShell from "@/components/ui/PageShell";
import { routes } from "@/config/navigation";
import { withFallback } from "@/lib/async";
import { catalogs, getTrendingAll } from "@/lib/tmdb";
import type { ContentSection } from "@/types/content";

export default async function HomePage() {
  // Todas las filas en paralelo; si una falla, el resto se muestra igual.
  const [trending, popularMovies, popularSeries, topMovies, topSeries, upcoming] = await Promise.all([
    withFallback(getTrendingAll(), [], "Tendencias"),
    withFallback(catalogs.movie.getPopular(), [], "Películas populares"),
    withFallback(catalogs.tv.getPopular(), [], "Series populares"),
    withFallback(catalogs.movie.getTopRated(), [], "Películas mejor valoradas"),
    withFallback(catalogs.tv.getTopRated(), [], "Series mejor valoradas"),
    withFallback(catalogs.movie.getUpcoming(), [], "Próximos estrenos"),
  ]);

  const featured = trending.find((item) => item.backdropUrl);

  const sections: ContentSection[] = [
    { id: "trending", title: "Tendencias de la semana", items: trending },
    { id: "popular-movies", title: "Películas populares", items: popularMovies, href: routes.catalog("movie") },
    { id: "popular-series", title: "Series populares", items: popularSeries, href: routes.catalog("tv") },
    { id: "top-movies", title: "Películas mejor valoradas", items: topMovies },
    { id: "top-series", title: "Series mejor valoradas", items: topSeries },
    { id: "upcoming", title: "Próximos estrenos", items: upcoming },
  ];

  if (!featured && sections.every((s) => s.items.length === 0)) {
    throw new Error("No se pudo cargar el contenido de inicio");
  }

  return (
    <>
      {featured && <Hero item={featured} eyebrow="Destacado de la semana" />}
      <PageShell offsetNav={!featured} className={featured ? "relative z-10 -mt-12" : ""}>
        {sections.map((section, index) => (
          <ContentRow key={section.id} section={section} priority={index === 0} />
        ))}
      </PageShell>
    </>
  );
}
