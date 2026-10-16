import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { SITE_CONFIG } from "@/config/site";
import { catalogs } from "@/lib/tmdb";
import type { MediaType } from "@/types/content";

import DetailView from "./DetailView";

/**
 * Factory de páginas de detalle: /movie/[id] y /tv/[id] comparten todo
 * excepto el tipo de contenido.
 */

export interface DetailPageProps {
  params: Promise<{ id: string }>;
}

// cache(): generateMetadata y la página piden el mismo detalle una sola vez por request.
const getDetail = cache((mediaType: MediaType, id: string) => catalogs[mediaType].getDetail(id));

export function createDetailPage(mediaType: MediaType) {
  async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const detail = await getDetail(mediaType, id);
    if (!detail) return { title: "No encontrado" };

    const description = detail.overview.slice(0, 160) || SITE_CONFIG.description;
    return {
      title: detail.year ? `${detail.title} (${detail.year})` : detail.title,
      description,
      openGraph: {
        title: detail.title,
        description,
        images: detail.backdropUrl ? [detail.backdropUrl] : [detail.posterUrl],
      },
    };
  }

  async function Page({ params }: DetailPageProps) {
    const { id } = await params;
    const detail = await getDetail(mediaType, id);
    if (!detail) notFound();
    return <DetailView detail={detail} />;
  }

  return { generateMetadata, Page };
}
