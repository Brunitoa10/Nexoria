import type { ContentItem } from "@/types/content";

/**
 * Persistencia de "Mi Lista" en localStorage (por navegador).
 * Aislada en un módulo para poder reemplazarla por una API/Supabase sin tocar la UI.
 */

const STORAGE_KEY = "nexoria:my-list";
const CHANGE_EVENT = "nexoria:my-list-change";
const EMPTY: ContentItem[] = [];

let cachedRaw: string | null = null;
let cachedItems: ContentItem[] = EMPTY;
/** true si localStorage no está disponible: la lista vive solo en memoria. */
let memoryOnly = false;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Devuelve siempre la misma referencia mientras no cambie el contenido (requisito de useSyncExternalStore). */
export function getSnapshot(): ContentItem[] {
  if (memoryOnly) return cachedItems;
  const raw = readRaw();
  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cachedItems = Array.isArray(parsed) ? (parsed as ContentItem[]) : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }
  return cachedItems;
}

export function getServerSnapshot(): ContentItem[] {
  return EMPTY;
}

export function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function save(items: ContentItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Modo privado / storage bloqueado: la lista solo vive en esta sesión.
    memoryOnly = true;
    cachedItems = items;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export const sameItem = (a: ContentItem, b: Pick<ContentItem, "id" | "mediaType">) =>
  a.id === b.id && a.mediaType === b.mediaType;

export function toggleItem(item: ContentItem): void {
  const items = getSnapshot();
  const exists = items.some((i) => sameItem(i, item));
  save(exists ? items.filter((i) => !sameItem(i, item)) : [item, ...items]);
}

export function clearItems(): void {
  save([]);
}
