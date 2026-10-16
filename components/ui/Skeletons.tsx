const pulse = "animate-pulse rounded-lg bg-white/[0.06]";

export function PosterSkeleton() {
  return <div className={`${pulse} aspect-[2/3] w-full`} />;
}

export function RowSkeleton({ count = 7 }: { count?: number }) {
  return (
    <div className="mb-10">
      <div className={`${pulse} mb-4 h-6 w-48`} />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="w-36 shrink-0 sm:w-44">
            <PosterSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }, (_, i) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] min-h-[480px] w-full animate-pulse bg-white/[0.04]">
      <div className="absolute bottom-16 left-4 space-y-4 sm:left-10">
        <div className={`${pulse} h-12 w-80`} />
        <div className={`${pulse} h-4 w-96 max-w-[80vw]`} />
        <div className={`${pulse} h-4 w-72`} />
      </div>
    </div>
  );
}
