import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonClass } from "@/components/ui/button";
import RatingBadge from "@/components/ui/RatingBadge";
import { routes } from "@/config/navigation";
import type { ContentItem } from "@/types/content";

import MyListButton from "./MyListButton";

interface HeroProps {
  item: ContentItem;
  /** Texto chico arriba del título, ej. "Tendencia de la semana". */
  eyebrow?: string;
}

const MEDIA_LABEL = { movie: "Película", tv: "Serie" } as const;

export default function Hero({ item, eyebrow }: HeroProps) {
  const backdrop = item.backdropUrl ?? item.posterUrl;

  return (
    <section className="relative isolate h-[78vh] min-h-[520px] max-h-[860px] w-full overflow-hidden" aria-label="Destacado">
      <Image src={backdrop} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-top" />
      {/* Degradados para legibilidad del texto y transición al fondo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      <div className="mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-4 pb-20 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          )}
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
            <RatingBadge rating={item.rating} className="text-white" />
            {item.year && <span>{item.year}</span>}
            <span className="rounded border border-white/25 px-1.5 py-0.5 text-xs uppercase tracking-wide">
              {MEDIA_LABEL[item.mediaType]}
            </span>
          </div>

          {item.overview && (
            <p className="mt-4 line-clamp-3 max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">{item.overview}</p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={routes.detail(item.mediaType, item.id)} className={buttonClass("primary", "lg")}>
              <Info className="h-5 w-5" aria-hidden />
              Ver detalles
            </Link>
            <MyListButton item={item} variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
