"use client";

import { RefreshCw, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { buttonClass } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import PageShell from "@/components/ui/PageShell";
import { ROUTES } from "@/config/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Error boundary: si TMDB falla, se muestra esto en vez de romper toda la app. */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell className="pt-32">
      <EmptyState
        icon={WifiOff}
        title="No pudimos cargar el contenido"
        description="El servicio de catálogo no respondió. Revisá tu conexión y volvé a intentar."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className={buttonClass("primary")}>
              <RefreshCw className="h-4 w-4" aria-hidden /> Reintentar
            </button>
            <Link href={ROUTES.home} className={buttonClass("secondary")}>
              Ir al inicio
            </Link>
          </div>
        }
      />
    </PageShell>
  );
}
