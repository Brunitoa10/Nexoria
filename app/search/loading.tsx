import PageShell from "@/components/ui/PageShell";
import { GridSkeleton } from "@/components/ui/Skeletons";

export default function SearchLoading() {
  return (
    <PageShell>
      <div className="mb-8 h-10 w-72 animate-pulse rounded-lg bg-white/[0.06]" />
      <GridSkeleton />
    </PageShell>
  );
}
