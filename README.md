# Nexoria

Catálogo de películas y series hecho con **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**, con datos de la API de [TMDB](https://www.themoviedb.org/).

## Funcionalidades

- **Inicio** con título destacado (hero) y carruseles: tendencias, populares, mejor valoradas y próximos estrenos.
- **Películas / Series**: hero, filas curadas, una fila por género y filtro por género con grilla paginada (`?genre=28&page=2`).
- **Ficha de cada título** (`/movie/[id]`, `/tv/[id]`): sinopsis, puntaje, duración o temporadas, géneros, reparto, títulos similares y tráiler en modal.
- **Búsqueda** de películas y series con paginación (`/search?q=...`). Atajo de teclado: `/`.
- **Mi Lista**: guardá títulos con el botón `+`; se persiste en el navegador y se sincroniza entre pestañas.
- Estados de carga (skeletons), error con reintento y página 404.
- SEO: títulos y descripciones por página, Open Graph en las fichas.
- Accesibilidad: navegación por teclado, `aria-*`, "saltar al contenido", respeta `prefers-reduced-motion`.

## Puesta en marcha

1. Copiá `.env.example` como `.env.local` y completá tu API key:

   ```env
   TMDB_API_KEY=tu_api_key
   ```

2. Instalar y levantar:

   ```bash
   npm install
   npm run dev          # webpack
   npm run dev:turbo    # Turbopack (requiere el binario nativo de SWC)
   ```

## Arquitectura

```
app/                         Rutas (Server Components) + loading / error / not-found
  movie/[id], tv/[id]        Fichas (comparten createDetailPage)
  Movies, Series             Catálogos (comparten CatalogView)
  search, Profile (Mi Lista)
components/
  catalog/                   Hero, ContentRow, ScrollRow, ContentGrid, PosterCard, GenreChips, MyList*
  detail/                    DetailView, CastList, TrailerButton, detail-page (factory)
  layout/                    Navbar, NavLinks, MobileMenu, SearchBox, Footer
  ui/                        Primitivas: button, PageShell, PageHeader, Pagination, EmptyState, Skeletons
config/                      Sitio, rutas y menús (fuente única de URLs)
hooks/                       useMyList, useScrolled, useToggle
lib/
  tmdb/
    client.ts                Único acceso HTTP a TMDB (tipado, cache 1 h, errores)
    config.ts                URLs, idioma, tamaños de imagen
    types.ts                 DTOs de la API (no salen de lib/tmdb)
    mappers.ts               Mapeos comunes (reparto, tráiler, campos base)
    strategies/              Strategy + Adapter por tipo de contenido (movie / tv)
    catalog.repository.ts    Repository genérico parametrizado por estrategia
    index.ts                 Composición: catalogs.movie / catalogs.tv, getTrendingAll, searchContent
  my-list/storage.ts         Persistencia de Mi Lista (reemplazable por una API / Supabase)
  format.ts, async.ts        Helpers puros
types/content.ts             Modelo de dominio que consume la UI
```

### Patrones y principios

- **Strategy + Adapter**: `movieStrategy` / `tvStrategy` encapsulan endpoints y mapeo de cada tipo de contenido.
- **Repository**: `createCatalogRepository(strategy)` expone `getTrending`, `getPopular`, `getTopRated`, `getUpcoming`, `getGenres`, `discover`, `getSectionsByGenre` y `getDetail`.
- **Factory**: `createDetailPage(mediaType)` genera página + metadata para `/movie/[id]` y `/tv/[id]`.
- **SOLID**: responsabilidades separadas (HTTP, mapeo, persistencia, UI); nuevos tipos de contenido sin tocar páginas (OCP); las páginas dependen de `CatalogRepository`, no de TMDB (DIP).
- **Resiliencia**: cada fila se carga con `withFallback`; si una falla, el resto de la página se muestra igual.

## Atribución

Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
