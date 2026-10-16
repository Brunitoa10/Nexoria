/**
 * Ejecuta una promesa y, si falla, devuelve un valor por defecto en lugar de romper la página.
 * Útil para secciones independientes: si una fila falla, el resto se sigue mostrando.
 */
export async function withFallback<T>(promise: Promise<T>, fallback: T, context?: string): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error(`[Nexoria] ${context ?? "Sección"} no disponible:`, error);
    return fallback;
  }
}
