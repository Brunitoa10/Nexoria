"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRowProps {
  children: ReactNode;
  label: string;
}

/** Carrusel horizontal con flechas; en mobile se desliza con el dedo. */
export default function ScrollRow({ children, label }: ScrollRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrowClass =
    "absolute top-0 bottom-8 md:bottom-0 z-10 hidden w-12 items-center justify-center bg-gradient-to-r text-white opacity-0 transition group-hover/row:opacity-100 focus-visible:opacity-100 md:flex";

  return (
    <div className="group/row relative">
      {canPrev && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={`Anterior en ${label}`}
          className={`${arrowClass} left-0 from-ink to-transparent`}
        >
          <ChevronLeft className="h-8 w-8" aria-hidden />
        </button>
      )}

      <div
        ref={trackRef}
        onScroll={updateArrows}
        role="list"
        aria-label={label}
        className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2"
      >
        {children}
      </div>

      {canNext && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={`Siguiente en ${label}`}
          className={`${arrowClass} right-0 from-transparent to-ink`}
        >
          <ChevronRight className="h-8 w-8" aria-hidden />
        </button>
      )}
    </div>
  );
}
