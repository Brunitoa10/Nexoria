import PageShell from "@/components/ui/PageShell";
import { RowSkeleton } from "@/components/ui/Skeletons";

const pulse = "animate-pulse rounded-lg bg-white/[0.06]";

export default function DetailSkeleton() {
  return (
    <PageShell className="pt-28 sm:pt-36">
      <div className="flex flex-col gap-8 md:flex-row md:items-end">
        <div className={`${pulse} mx-auto aspect-[2/3] w-48 sm:w-60 md:mx-0 lg:w-72`} />
        <div className="flex-1 space-y-4">
          <div className={`${pulse} h-4 w-40`} />
          <div className={`${pulse} h-12 w-3/4 max-w-xl`} />
          <div className={`${pulse} h-8 w-64`} />
          <div className={`${pulse} h-24 w-full max-w-2xl`} />
          <div className="flex gap-3">
            <div className={`${pulse} h-12 w-40`} />
            <div className={`${pulse} h-12 w-36`} />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <RowSkeleton />
      </div>
    </PageShell>
  );
}
