"use client";

import { motion, type Variants } from "framer-motion";

import NavLinks from "../NavLinks";

const menuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

interface MobileMenuListProps {
  id: string;
  open: boolean;
  onNavigate: () => void;
}

export function MobileMenuList({ id, open, onNavigate }: MobileMenuListProps) {
  return (
    <motion.div
      id={id}
      variants={menuVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-hidden={!open}
      className={`absolute top-16 left-0 w-full bg-gray-900 z-50 rounded-md shadow-lg overflow-hidden ${
        open ? "p-4" : "pointer-events-none"
      }`}
    >
      <NavLinks direction="column" onNavigate={onNavigate} />
    </motion.div>
  );
}
