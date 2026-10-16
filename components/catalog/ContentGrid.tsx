import type { ContentItem } from "@/types/content";

import PosterCard from "./PosterCard";

interface ContentGridProps {
  items: ContentItem[];
  label: string;
}

export default function ContentGrid({ items, label }: ContentGridProps) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item, index) => (
        <li key={`${item.mediaType}-${item.id}`}>
          <PosterCard item={item} priority={index < 6} />
        </li>
      ))}
    </ul>
  );
}
