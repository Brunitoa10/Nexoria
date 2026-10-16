import type { Metadata } from "next";

import CatalogView, { type CatalogSearchParams } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "Películas",
  description: "Películas populares, mejor valoradas, próximos estrenos y todos los géneros.",
};

interface MoviesPageProps {
  searchParams: Promise<CatalogSearchParams>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  return <CatalogView mediaType="movie" searchParams={await searchParams} />;
}
