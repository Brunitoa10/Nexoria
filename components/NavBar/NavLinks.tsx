"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MAIN_NAV } from "@/config/navigation";

interface NavLinksProps {
  direction: "row" | "column";
  onNavigate?: () => void;
}

/**
 * Lista de links compartida por el menú desktop y el mobile
 * (antes estaba duplicada en DesktopMenuList y MobileMenuList).
 */
export default function NavLinks({ direction, onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <Stack direction={direction} spacing={2} justifyContent="center">
      {MAIN_NAV.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Button
            key={href}
            component={Link}
            href={href}
            variant={isActive ? "contained" : "outlined"}
            color="primary"
            className="btn-navbar"
            aria-current={isActive ? "page" : undefined}
            onClick={onNavigate}
          >
            {label}
          </Button>
        );
      })}
    </Stack>
  );
}
