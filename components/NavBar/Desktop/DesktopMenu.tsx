"use client";

import { Search } from "@mui/icons-material";
import { BellRing, Users } from "lucide-react";
import { useState } from "react";
import { DesktopMenuList } from "./DesktopMenuList";

export default function DesktopMenu() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="hidden lg:flex items-center gap-6 bg-black px-6 py-3 text-white relative">
      <DesktopMenuList/>
      {/* 🔎 Barra de Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-red-500"
        />
      </div>

      {/* 🔔 Notificaciones */}
      <div
        className="relative cursor-pointer hover:text-red-600 transition"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <BellRing className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
          3
        </span>

        {/* 🔽 Menú desplegable de notificaciones */}
        {showNotifications && (
          <div className="absolute right-0 mt-3 w-64 bg-gray-800 shadow-lg rounded-md p-3 text-sm">
            <p className="text-gray-300">📢 Nueva actualización disponible</p>
            <p className="text-gray-300 mt-2">🔔 Mensaje de un amigo</p>
            <p className="text-gray-300 mt-2">🎬 Nueva serie añadida</p>
          </div>
        )}
      </div>

      {/* 👤 Menú de Usuario */}
      <div
        className="relative cursor-pointer hover:text-red-600 transition"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <Users className="w-6 h-6" />

        {/* 🔽 Menú desplegable de usuario */}
        {showUserMenu && (
          <div className="absolute right-0 mt-3 w-40 bg-gray-800 shadow-lg rounded-md p-3 text-sm">
            <p className="hover:bg-gray-700 p-2 rounded cursor-pointer">📄 Mi Perfil</p>
            <p className="hover:bg-gray-700 p-2 rounded cursor-pointer">⚙️ Configuración</p>
            <p className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-500">🚪 Cerrar Sesión</p>
          </div>
        )}
      </div>
    </div>
  );
}
