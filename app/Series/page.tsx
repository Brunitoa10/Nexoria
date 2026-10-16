import type { Metadata } from "next";

import CatalogView, { type CatalogSearchParams } from "@/components/catalog/CatalogView";

export const metadata: Metadata = {
  title: "Series",
  description: "Series populares, mejor valoradas, en emisión y todos los géneros.",
};

interface SeriesPageProps {
  searchParams: Promise<CatalogSearchParams>;
}

export default async function SeriesPage({ searchParams }: SeriesPageProps) {
  return <CatalogView mediaType="tv" searchParams={await searchParams} />;
}
