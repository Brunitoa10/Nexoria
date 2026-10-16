"use client";

import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { ROUTES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";
import { useMyList } from "@/hooks/useMyList";
import { useScrolled } from "@/hooks/useScrolled";

import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

function MyListShortcut() {
  const { items } = useMyList();
  return (
    <Link
      href={ROUTES.myList}
      aria-label={`Mi Lista (${items.length})`}
      className="relative hidden h-10 w-10 place-items-center rounded-md text-zinc-300 transition hover:bg-white/10 hover:text-white lg:grid"
    >
      <Bookmark className="h-5 w-5" aria-hidden />
      {items.length > 0 && (
        <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {items.length > 99 ? "99+" : items.length}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const scrolled = useScrolled();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/90 backdrop-blur-lg" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="relative mx-auto flex h-16 max-w-screen-2xl items-center gap-6 px-4 sm:px-6 lg:px-10"
      >
        <Link href={ROUTES.home} aria-label={`${SITE_CONFIG.name} - Inicio`} className="shrink-0">
          <Image src={SITE_CONFIG.logoUrl} alt={SITE_CONFIG.name} width={120} height={40} priority className="h-8 w-auto" />
        </Link>

        <div className="hidden lg:block">
          <NavLinks orientation="horizontal" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Suspense>
            <SearchBox enableShortcut className="hidden w-64 lg:block xl:w-72" />
          </Suspense>
          <MyListShortcut />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
