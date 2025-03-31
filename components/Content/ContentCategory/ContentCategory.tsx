import Image from "next/image";
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
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={200}
              height={300}
              className="w-full h-auto rounded-md object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-40 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
