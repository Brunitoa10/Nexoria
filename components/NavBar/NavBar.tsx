import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

import DesktopMenu from "./Desktop/DesktopMenu";
import MobileMenu from "./Mobile/MobileMenu";

export default function Navbar() {
  return (
    <nav aria-label="Navegación principal" className="relative p-4 flex justify-between items-center">
      <Link href={ROUTES.home} aria-label={`${SITE_CONFIG.name} - Inicio`}>
        <Image src={SITE_CONFIG.logoUrl} alt={SITE_CONFIG.name} width={140} height={80} priority className="block" />
      </Link>
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
