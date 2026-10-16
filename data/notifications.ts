/** Datos de ejemplo hasta que exista un backend de notificaciones. */
export interface AppNotification {
  id: string;
  icon: string;
  message: string;
}

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "1", icon: "📢", message: "Nueva actualización disponible" },
  { id: "2", icon: "🔔", message: "Mensaje de un amigo" },
  { id: "3", icon: "🎬", message: "Nueva serie añadida" },
];
