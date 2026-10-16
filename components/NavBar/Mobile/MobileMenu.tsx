"use client";

import { useToggle } from "@/hooks/useToggle";

import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenuList } from "./MobileMenuList";

const MENU_ID = "mobile-menu";

export default function MobileMenu() {
  const { isOpen, toggle, close } = useToggle();

  return (
    <div className="lg:hidden">
      <MobileMenuButton open={isOpen} onClick={toggle} controlsId={MENU_ID} />
      <MobileMenuList id={MENU_ID} open={isOpen} onNavigate={close} />
    </div>
  );
}
