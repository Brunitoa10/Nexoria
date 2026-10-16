"use client";

import { BellRing } from "lucide-react";

import Dropdown from "@/components/ui/Dropdown";
import type { AppNotification } from "@/data/notifications";

interface NotificationMenuProps {
  notifications: AppNotification[];
}

export default function NotificationMenu({ notifications }: NotificationMenuProps) {
  const count = notifications.length;

  return (
    <Dropdown
      label={`Notificaciones (${count})`}
      widthClassName="w-64"
      trigger={
        <>
          <BellRing className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </>
      }
    >
      {count === 0 ? (
        <p className="text-gray-400">No tenés notificaciones</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(({ id, icon, message }) => (
            <li key={id} role="menuitem" className="text-gray-300">
              {icon} {message}
            </li>
          ))}
        </ul>
      )}
    </Dropdown>
  );
}
