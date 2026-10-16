"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

interface MobileMenuButtonProps {
  open: boolean;
  onClick: () => void;
  controlsId: string;
}

export function MobileMenuButton({ open, onClick, controlsId }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      aria-controls={controlsId}
      className="text-white p-2 btn-navbar"
    >
      {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
    </button>
  );
}
