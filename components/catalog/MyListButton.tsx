"use client";

import { Check, Plus } from "lucide-react";

import { buttonClass } from "@/components/ui/button";
import { useMyList } from "@/hooks/useMyList";
import type { ContentItem } from "@/types/content";

interface MyListButtonProps {
  item: ContentItem;
  /** "icon": botón redondo sobre el póster. "full": botón con texto (hero / detalle). */
  variant?: "icon" | "full";
  className?: string;
}

/** Guarda solo los campos del listado (no el detalle completo) para no inflar localStorage. */
const toListItem = ({ id, mediaType, title, overview, posterUrl, backdropUrl, rating, year }: ContentItem): ContentItem => ({
  id,
  mediaType,
  title,
  overview,
  posterUrl,
  backdropUrl,
  rating,
  year,
});

export default function MyListButton({ item, variant = "icon", className = "" }: MyListButtonProps) {
  const { isSaved, toggle } = useMyList();
  const saved = isSaved(item);
  const label = saved ? `Quitar ${item.title} de Mi Lista` : `Agregar ${item.title} a Mi Lista`;
  const Icon = saved ? Check : Plus;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(toListItem(item))}
        aria-pressed={saved}
        aria-label={label}
        className={buttonClass("secondary", "lg", className)}
      >
        <Icon className="h-5 w-5" aria-hidden />
        {saved ? "En Mi Lista" : "Mi Lista"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(toListItem(item))}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? "Quitar de Mi Lista" : "Agregar a Mi Lista"}
      className={`grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/30 backdrop-blur transition ${
        saved ? "bg-white text-black" : "bg-black/60 text-white hover:bg-black/80"
      } ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </button>
  );
}
