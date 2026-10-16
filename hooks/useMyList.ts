"use client";

import { useCallback, useSyncExternalStore } from "react";

import { clearItems, getServerSnapshot, getSnapshot, sameItem, subscribe, toggleItem } from "@/lib/my-list/storage";
import type { ContentItem } from "@/types/content";

/** Estado de "Mi Lista" sincronizado entre componentes y pestañas. */
export function useMyList() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = useCallback(
    (item: Pick<ContentItem, "id" | "mediaType">) => items.some((i) => sameItem(i, item)),
    [items],
  );

  return { items, isSaved, toggle: toggleItem, clear: clearItems };
}
