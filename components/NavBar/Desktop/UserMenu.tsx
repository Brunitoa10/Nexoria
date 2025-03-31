"use client";

import { Users } from "lucide-react";
import { useState } from "react";

export default function UserMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
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
  );
}
