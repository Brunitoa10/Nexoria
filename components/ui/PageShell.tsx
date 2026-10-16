import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  /** Deja espacio para la navbar fija (false cuando la página arranca con un hero). */
  offsetNav?: boolean;
  className?: string;
}

/** Contenedor con márgenes y ancho máximo consistentes en todas las páginas. */
export default function PageShell({ children, offsetNav = true, className = "" }: PageShellProps) {
  return (
    <div className={`mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 pb-16 ${offsetNav ? "pt-24" : ""} ${className}`}>
      {children}
    </div>
  );
}
