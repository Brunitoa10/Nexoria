import type { ContentSection } from "@/types/content";

import ContentCategory from "../ContentCategory/ContentCategory";

interface ContentSectionsProps {
  sections: ContentSection[];
  emptyMessage?: string;
}

/** Renderiza una lista de secciones (usado por Home, Películas y Series). */
export default function ContentSections({
  sections,
  emptyMessage = "No hay contenido para mostrar en este momento.",
}: ContentSectionsProps) {
  if (sections.length === 0) {
    return <p className="px-8 py-6 text-gray-400">{emptyMessage}</p>;
  }

  return (
    <div className="px-8 py-6 space-y-10">
      {sections.map((section) => (
        <ContentCategory key={section.id} title={section.title} items={section.items} />
      ))}
    </div>
  );
}
