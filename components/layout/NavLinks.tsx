"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MAIN_NAV, ROUTES } from "@/config/navigation";

interface NavLinksProps {
  orientation: "horizontal" | "vertical";
  onNavigate?: () => void;
}

const isActivePath = (pathname: string, href: string) =>
  href === ROUTES.home ? pathname === href : pathname.toLowerCase().startsWith(href.toLowerCase());

/** Links principales, compartidos por la navbar desktop y el menú mobile. */
export default function NavLinks({ orientation, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <ul className={vertical ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {MAIN_NAV.map(({ label, href }) => {
        const active = isActivePath(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`relative block rounded-md font-medium transition-colors ${
                vertical ? "px-3 py-3 text-lg" : "px-3 py-2 text-sm"
              } ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}
            >
              {label}
              {active && !vertical && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand" aria-hidden />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
