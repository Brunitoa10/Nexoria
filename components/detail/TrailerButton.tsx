"use client";

import { Play, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { buttonClass } from "@/components/ui/button";
import { useToggle } from "@/hooks/useToggle";

interface TrailerButtonProps {
  videoKey: string;
  title: string;
}

/** Botón que abre el tráiler de YouTube en un modal (sin cookies de seguimiento). */
export default function TrailerButton({ videoKey, title }: TrailerButtonProps) {
  const { isOpen, open, close } = useToggle();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <>
      <button type="button" onClick={open} className={buttonClass("primary", "lg")}>
        <Play className="h-5 w-5 fill-current" aria-hidden />
        Ver tráiler
      </button>

      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Tráiler de ${title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Cerrar tráiler"
                className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
              <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0`}
                  title={`Tráiler de ${title}`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>,
          // Portal: el modal se monta en <body> para quedar por encima de todo (navbar, carruseles).
          document.body,
        )}
    </>
  );
}
