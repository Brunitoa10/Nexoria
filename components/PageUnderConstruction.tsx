interface PageUnderConstructionProps {
  title?: string;
  message?: string;
}

export default function PageUnderConstruction({
  title = "Página en Desarrollo",
  message = "¡Estamos trabajando para traerte algo increíble! Vuelve pronto.",
}: PageUnderConstructionProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-6">{message}</p>
      </div>
    </div>
  );
}
