import type { ContentItem } from "@/types/content";

import ContentCard from "../ContentCard/ContentCard";

interface ContentCategoryProps {
  title: string;
  items: ContentItem[];
}

export default function ContentCategory({ title, items }: ContentCategoryProps) {
  if (items.length === 0) return null;

  return (
    <section className="w-full mb-8" aria-label={title}>
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <li key={`${item.mediaType}-${item.id}`}>
            <ContentCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
