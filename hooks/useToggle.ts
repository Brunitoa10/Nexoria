"use client";

import { useCallback, useState } from "react";

/** Hook genérico para cualquier estado abierto/cerrado (menús, dropdowns, cards). */
export function useToggle(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close };
}
