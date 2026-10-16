/** Helpers de formato puros (sin dependencias), fáciles de testear. */

export function formatRating(rating: number): string {
  return rating > 0 ? rating.toFixed(1) : "—";
}

export function formatRuntime(minutes: number | null | undefined): string | null {
  if (!minutes || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export function formatSeasons(count: number | null | undefined): string | null {
  if (!count || count <= 0) return null;
  return count === 1 ? "1 temporada" : `${count} temporadas`;
}

export function toYear(date: string | null | undefined): string | null {
  return date && date.length >= 4 ? date.slice(0, 4) : null;
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("es-AR", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

/** Convierte un query param en entero positivo, o devuelve el valor por defecto. */
export function parsePositiveInt(value: string | string[] | undefined, fallback: number): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
