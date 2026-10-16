import Image from "next/image";
import Link from "next/link";

import RatingBadge from "@/components/ui/RatingBadge";
import { routes } from "@/config/navigation";
import type { ContentItem } from "@/types/content";

import MyListButton from "./MyListButton";

interface PosterCardProps {
  item: ContentItem;
  /** Carga prioritaria para los primeros pósters visibles. */
  priority?: boolean;
  sizes?: string;
}

const MEDIA_LABEL = { movie: "Película", tv: "Serie" } as const;

export default function PosterCard({
  item,
  priority = false,
  sizes = "(min-width: 1280px) 16vw, (min-width: 768px) 22vw, 45vw",
}: PosterCardProps) {
  const { title, posterUrl, year, rating, mediaType, id } = item;

  return (
    <article className="group relative">
      <Link
        href={routes.detail(mediaType, id)}
        className="block overflow-hidden rounded-lg bg-surface ring-1 ring-line transition duration-300 group-hover:-translate-y-1 group-hover:ring-white/30 group-hover:shadow-2xl group-hover:shadow-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <div className="relative aspect-[2/3]">
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-3 pb-3 pt-12 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
            <p className="line-clamp-2 text-sm font-semibold text-white">{title}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-300">
              <RatingBadge rating={rating} />
              {year && <span>{year}</span>}
              <span className="text-zinc-500">·</span>
              <span>{MEDIA_LABEL[mediaType]}</span>
            </div>
          </div>
        </div>
      </Link>

      <MyListButton
        item={item}
        className="absolute right-2 top-2 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100 aria-pressed:opacity-100"
      />

      {/* Título visible siempre debajo del póster (mobile no tiene hover). */}
      <p className="mt-2 truncate text-sm text-zinc-300 md:hidden">{title}</p>
    </article>
  );
}
