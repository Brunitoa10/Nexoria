"use client";

import { Users } from "lucide-react";
import Link from "next/link";

import Dropdown from "@/components/ui/Dropdown";
import { USER_MENU } from "@/config/navigation";

const itemClassName = "block w-full text-left hover:bg-gray-700 p-2 rounded";

export default function UserMenu() {
  return (
    <Dropdown label="Menú de usuario" widthClassName="w-44" trigger={<Users className="w-6 h-6" />}>
      <ul>
        {USER_MENU.map(({ label, icon, href, danger }) => {
          const className = `${itemClassName} ${danger ? "text-red-500" : ""}`;
          const content = `${icon} ${label}`;

          return (
            <li key={label} role="menuitem">
              {href ? (
                <Link href={href} className={className}>
                  {content}
                </Link>
              ) : (
                <button type="button" className={className}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </Dropdown>
  );
}
