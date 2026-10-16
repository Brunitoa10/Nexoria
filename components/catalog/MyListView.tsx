"use client";

import { Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { buttonClass } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import { ROUTES } from "@/config/navigation";
import { useMyList } from "@/hooks/useMyList";
import type { MediaType } from "@/types/content";

import ContentGrid from "./ContentGrid";

type Filter = "all" | MediaType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "movie", label: "Películas" },
  { value: "tv", label: "Series" },
];

export default function MyListView() {
  const { items, clear } = useMyList();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.mediaType === filter)),
    [items, filter],
  );

  const countLabel = items.length === 1 ? "1 título guardado" : `${items.length} títulos guardados`;

  return (
    <>
      <PageHeader
        title="Mi Lista"
        subtitle={items.length > 0 ? countLabel : "Guardá películas y series para verlas más tarde."}
        actions={
          items.length > 0 && (
            <button type="button" onClick={clear} className={buttonClass("ghost")}>
              <Trash2 className="h-4 w-4" aria-hidden /> Vaciar lista
            </button>
          )
        }
      />

      {items.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Tu lista está vacía"
          description="Tocá el botón + en cualquier póster o en la ficha de un título para agregarlo acá."
          action={
            <Link href={ROUTES.home} className={buttonClass("primary")}>
              Explorar catálogo
            </Link>
          }
        />
      ) : (
        <>
          <div role="tablist" aria-label="Filtrar Mi Lista" className="mb-8 inline-flex rounded-lg bg-surface p-1 ring-1 ring-line">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                  filter === value ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {visible.length > 0 ? (
            <ContentGrid items={visible} label="Mi Lista" />
          ) : (
            <p className="text-muted">No tenés títulos de este tipo en tu lista.</p>
          )}
        </>
      )}
    </>
  );
}
