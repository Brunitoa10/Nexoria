import type { ContentDetail, ContentItem, MediaType } from "@/types/content";

/**
 * Strategy + Adapter: encapsula lo que cambia entre películas y series
 * (endpoints propios y cómo se traduce cada DTO al modelo de dominio).
 *
 * Para soportar un nuevo tipo de contenido se crea una nueva estrategia
 * sin tocar el repositorio ni las páginas (Open/Closed).
 */
export interface MediaStrategy<TDto, TDetailDto> {
  readonly mediaType: MediaType;
  /** Endpoint de "próximamente": movie/upcoming o tv/on_the_air. */
  readonly upcomingEndpoint: string;
  toContentItem(dto: TDto): ContentItem;
  toContentDetail(dto: TDetailDto): ContentDetail;
}
