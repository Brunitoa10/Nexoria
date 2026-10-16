import Link from "next/link";

import { FOOTER_COLUMNS } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-black/40">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)] lg:px-10">
        <div>
          <p className="text-xl font-bold text-white">{SITE_CONFIG.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{SITE_CONFIG.description}</p>
        </div>

        {FOOTER_COLUMNS.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">{title}</h3>
            <ul className="space-y-2.5">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-zinc-400 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            © {year} {SITE_CONFIG.author}. Todos los derechos reservados.
          </p>
          <p>
            Datos e imágenes provistos por{" "}
            <a href={SITE_CONFIG.tmdbUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
              TMDB
            </a>
            . Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
