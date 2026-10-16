import Link from "next/link";

import { routes } from "@/config/navigation";
import type { Genre, MediaType } from "@/types/content";

interface GenreChipsProps {
  mediaType: MediaType;
  genres: Genre[];
  activeGenreId?: number;
}

const chipBase = "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ring-1 ring-inset";
const chipIdle = "bg-white/5 text-zinc-300 ring-white/10 hover:bg-white/10 hover:text-white";
const chipActive = "bg-white text-black ring-white";

export default function GenreChips({ mediaType, genres, activeGenreId }: GenreChipsProps) {
  return (
    <nav aria-label="Filtrar por género" className="scrollbar-none -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      <Link
        href={routes.catalog(mediaType)}
        aria-current={!activeGenreId ? "page" : undefined}
        className={`${chipBase} ${!activeGenreId ? chipActive : chipIdle}`}
      >
        Todos
      </Link>
      {genres.map((genre) => {
        const active = genre.id === activeGenreId;
        return (
          <Link
            key={genre.id}
            href={routes.catalog(mediaType, { genre: genre.id })}
            aria-current={active ? "page" : undefined}
            className={`${chipBase} ${active ? chipActive : chipIdle}`}
          >
            {genre.name}
          </Link>
        );
      })}
    </nav>
  );
}
