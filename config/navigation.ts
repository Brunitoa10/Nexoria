import type { MediaType } from "@/types/content";

/** Rutas centralizadas: si cambia una URL, se cambia solo acá. */
export const ROUTES = {
  home: "/",
  movies: "/Movies",
  series: "/Series",
  myList: "/Profile",
  search: "/search",
} as const;

const CATALOG_ROUTE: Record<MediaType, string> = {
  movie: ROUTES.movies,
  tv: ROUTES.series,
};

export const routes = {
  detail: (mediaType: MediaType, id: string) => `/${mediaType}/${id}`,
  catalog: (mediaType: MediaType, params: { genre?: number; page?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.genre) query.set("genre", String(params.genre));
    if (params.page && params.page > 1) query.set("page", String(params.page));
    const qs = query.toString();
    return qs ? `${CATALOG_ROUTE[mediaType]}?${qs}` : CATALOG_ROUTE[mediaType];
  },
  search: (q: string, page?: number) => {
    const query = new URLSearchParams({ q });
    if (page && page > 1) query.set("page", String(page));
    return `${ROUTES.search}?${query.toString()}`;
  },
};

export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Inicio", href: ROUTES.home },
  { label: "Películas", href: ROUTES.movies },
  { label: "Series", href: ROUTES.series },
  { label: "Mi Lista", href: ROUTES.myList },
];

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Explorar",
    links: [
      { label: "Inicio", href: ROUTES.home },
      { label: "Películas", href: ROUTES.movies },
      { label: "Series", href: ROUTES.series },
      { label: "Mi Lista", href: ROUTES.myList },
    ],
  },
  {
    title: "Películas",
    links: [
      { label: "Acción", href: routes.catalog("movie", { genre: 28 }) },
      { label: "Comedia", href: routes.catalog("movie", { genre: 35 }) },
      { label: "Drama", href: routes.catalog("movie", { genre: 18 }) },
      { label: "Ciencia ficción", href: routes.catalog("movie", { genre: 878 }) },
    ],
  },
  {
    title: "Series",
    links: [
      { label: "Animación", href: routes.catalog("tv", { genre: 16 }) },
      { label: "Crimen", href: routes.catalog("tv", { genre: 80 }) },
      { label: "Documental", href: routes.catalog("tv", { genre: 99 }) },
      { label: "Misterio", href: routes.catalog("tv", { genre: 9648 }) },
    ],
  },
];
