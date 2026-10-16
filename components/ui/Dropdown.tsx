"use client";

import { useRef, type ReactNode } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useToggle } from "@/hooks/useToggle";

interface DropdownProps {
  /** Contenido del botón disparador (ícono, avatar, etc.). */
  trigger: ReactNode;
  /** Texto accesible del botón. */
  label: string;
  /** Ancho del panel (clase Tailwind). */
  widthClassName?: string;
  children: ReactNode;
}

/**
 * Componente reutilizable para cualquier menú desplegable.
 * Antes UserMenu y NotificationMenu duplicaban esta lógica (y usaban <div onClick>,
 * que no es accesible por teclado).
 */
export default function Dropdown({ trigger, label, widthClassName = "w-48", children }: DropdownProps) {
  const { isOpen, toggle, close } = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, close, isOpen);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="relative flex items-center hover:text-red-600 transition"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          role="menu"
          className={`absolute right-0 mt-3 z-50 bg-gray-800 shadow-lg rounded-md p-3 text-sm ${widthClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
