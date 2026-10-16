import { ChevronRight } from "lucide-react";
import Link from "next/link";

import type { ContentSection } from "@/types/content";

import PosterCard from "./PosterCard";
import ScrollRow from "./ScrollRow";

interface ContentRowProps {
  section: ContentSection;
  /** Prioriza la carga de imágenes (solo para la primera fila visible). */
  priority?: boolean;
}

const PRIORITY_COUNT = 6;

export default function ContentRow({ section, priority = false }: ContentRowProps) {
  const { title, items, href } = section;
  if (items.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby={`${section.id}-title`}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id={`${section.id}-title`} className="text-lg font-semibold text-white sm:text-xl">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="inline-flex items-center gap-0.5 text-sm font-medium text-muted transition hover:text-white"
          >
            Ver todo <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>

      <ScrollRow label={title}>
        {items.map((item, index) => (
          <div key={`${item.mediaType}-${item.id}`} role="listitem" className="w-36 shrink-0 snap-start sm:w-44 lg:w-48">
            <PosterCard item={item} priority={priority && index < PRIORITY_COUNT} sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 144px" />
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}
