import Image from "next/image";
import Link from "next/link";

import ContentRow from "@/components/catalog/ContentRow";
import MyListButton from "@/components/catalog/MyListButton";
import PageShell from "@/components/ui/PageShell";
import RatingBadge from "@/components/ui/RatingBadge";
import { routes } from "@/config/navigation";
import { formatCount } from "@/lib/format";
import type { ContentDetail } from "@/types/content";

import CastList from "./CastList";
import TrailerButton from "./TrailerButton";

interface DetailViewProps {
  detail: ContentDetail;
}

const MEDIA_LABEL = { movie: "Película", tv: "Serie" } as const;

export default function DetailView({ detail }: DetailViewProps) {
  const { title, tagline, overview, posterUrl, backdropUrl, year, rating, voteCount, durationLabel, genres, mediaType } =
    detail;

  const facts = [year, durationLabel, MEDIA_LABEL[mediaType]].filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden" aria-label={title}>
        {backdropUrl && (
          <Image src={backdropUrl} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-top opacity-60" />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/60 to-transparent" />

        <PageShell className="pt-28 sm:pt-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end">
            <div className="relative mx-auto aspect-[2/3] w-48 shrink-0 overflow-hidden rounded-xl shadow-2xl shadow-black/70 ring-1 ring-white/15 sm:w-60 md:mx-0 lg:w-72">
              <Image src={posterUrl} alt={`Póster de ${title}`} fill priority sizes="288px" className="object-cover" />
            </div>

            <div className="max-w-3xl">
              <p className="mb-2 text-sm text-muted">{facts.join(" · ")}</p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{title}</h1>
              {tagline && <p className="mt-2 text-lg italic text-zinc-300">“{tagline}”</p>}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm">
                  <RatingBadge rating={rating} className="text-white" />
                  <span className="text-muted">/ 10</span>
                  {voteCount > 0 && <span className="text-muted">· {formatCount(voteCount)} votos</span>}
                </span>
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={routes.catalog(mediaType, { genre: genre.id })}
                    className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-300 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 hover:text-white"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                {overview || "Todavía no hay una sinopsis disponible en español para este título."}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {detail.trailerKey && <TrailerButton videoKey={detail.trailerKey} title={title} />}
                <MyListButton item={detail} variant="full" />
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <PageShell offsetNav={false}>
        <CastList cast={detail.cast} />
        <ContentRow
          section={{ id: `${mediaType}-${detail.id}-similar`, title: "Títulos similares", items: detail.similar }}
        />
      </PageShell>
    </>
  );
}
