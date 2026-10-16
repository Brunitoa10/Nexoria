import PageShell from "@/components/ui/PageShell";
import { HeroSkeleton, RowSkeleton } from "@/components/ui/Skeletons";

/** Se muestra automáticamente mientras las páginas cargan datos de TMDB. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando contenido">
      <HeroSkeleton />
      <PageShell offsetNav={false} className="-mt-12">
        <RowSkeleton />
        <RowSkeleton />
      </PageShell>
    </div>
  );
}
