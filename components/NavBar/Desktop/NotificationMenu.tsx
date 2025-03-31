"use client";

import { BellRing } from "lucide-react";
import { useState } from "react";

interface NotificationMenuProps {
  notificationsCount: number;
}

export default function NotificationMenu({ notificationsCount }: NotificationMenuProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div
      className="relative cursor-pointer hover:text-red-600 transition"
      onClick={() => setShowNotifications(!showNotifications)}
    >
      <BellRing className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
        {notificationsCount}
      </span>

      {showNotifications && (
        <div className="absolute right-0 mt-3 w-64 bg-gray-800 shadow-lg rounded-md p-3 text-sm">
          <p className="text-gray-300">📢 Nueva actualización disponible</p>
          <p className="text-gray-300 mt-2">🔔 Mensaje de un amigo</p>
          <p className="text-gray-300 mt-2">🎬 Nueva serie añadida</p>
        </div>
      )}
    </div>
  );
}
