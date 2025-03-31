import ContentCard from "../ContentCard/ContentCard";
import { ContentItem } from "../ContentItem/ContentItem";

interface ContentCategoryProps {
  categoryTitle: string;
  contentItems: ContentItem[];
}

export default function ContentCategory({ categoryTitle, contentItems }: ContentCategoryProps) {
  return (
    <div className="w-full mb-8">
      <h2 className="text-2xl font-semibold text-white mb-4">{categoryTitle}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {contentItems.map((item) => (
          <div key={item.id} className="relative">
            <ContentCard
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
