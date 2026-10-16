"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { ROUTES, routes } from "@/config/navigation";

interface SearchBoxProps {
  /** Se llama después de buscar (ej. para cerrar el menú mobile). */
  onSearch?: () => void;
  /** Habilita el atajo de teclado "/" (solo en una instancia, la de desktop). */
  enableShortcut?: boolean;
  className?: string;
}

export default function SearchBox({ onSearch, enableShortcut = false, className = "" }: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = pathname === ROUTES.search ? (searchParams.get("q") ?? "") : "";
  const [query, setQuery] = useState(currentQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mantiene el input sincronizado al navegar (ej. botón atrás).
  useEffect(() => setQuery(currentQuery), [currentQuery]);

  // Atajo "/" para enfocar la búsqueda.
  useEffect(() => {
    if (!enableShortcut) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enableShortcut]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(routes.search(q));
    inputRef.current?.blur();
    onSearch?.();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar películas y series"
        placeholder={enableShortcut ? "Buscar títulos  ( / )" : "Buscar títulos…"}
        autoComplete="off"
        className="h-10 w-full rounded-md bg-white/10 pl-9 pr-9 text-sm text-white placeholder:text-zinc-400 ring-1 ring-inset ring-white/10 transition focus:bg-black/60 focus:outline-none focus:ring-white/40 [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded text-zinc-400 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      )}
    </form>
  );
}
