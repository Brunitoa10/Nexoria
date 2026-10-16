"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useToggle } from "@/hooks/useToggle";

import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

const PANEL_ID = "mobile-menu";

export default function MobileMenu() {
  const { isOpen, toggle, close } = useToggle();
  const pathname = usePathname();

  // Cierra el menú al cambiar de página.
  useEffect(close, [pathname, close]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        className="grid h-10 w-10 place-items-center rounded-md text-white hover:bg-white/10"
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
      </button>

      <div
        id={PANEL_ID}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-line bg-ink/95 px-4 pb-6 pt-4 shadow-2xl backdrop-blur-lg"
      >
        <Suspense>
          <SearchBox onSearch={close} className="mb-4" />
        </Suspense>
        <NavLinks orientation="vertical" onNavigate={close} />
      </div>
    </div>
  );
}
