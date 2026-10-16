import { UserRound } from "lucide-react";
import Image from "next/image";

import ScrollRow from "@/components/catalog/ScrollRow";
import type { CastMember } from "@/types/content";

interface CastListProps {
  cast: CastMember[];
}

export default function CastList({ cast }: CastListProps) {
  if (cast.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="cast-title">
      <h2 id="cast-title" className="mb-3 text-lg font-semibold text-white sm:text-xl">
        Reparto principal
      </h2>
      <ScrollRow label="Reparto">
        {cast.map((member) => (
          <div key={member.id} role="listitem" className="w-28 shrink-0 snap-start text-center sm:w-32">
            <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-full bg-surface-2 ring-1 ring-line sm:w-28">
              {member.profileUrl ? (
                <Image src={member.profileUrl} alt={member.name} fill sizes="112px" className="object-cover" />
              ) : (
                <UserRound className="absolute inset-0 m-auto h-10 w-10 text-zinc-600" aria-hidden />
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-sm font-medium text-white">{member.name}</p>
            {member.character && <p className="line-clamp-2 text-xs text-muted">{member.character}</p>}
          </div>
        ))}
      </ScrollRow>
    </section>
  );
}
