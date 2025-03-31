import { ContentItem } from "@/components/Content/ContentItem/ContentItem";


export class ContentItemFactory {
  static createContent(id: string, title: string, imageUrl: string): ContentItem {
    return new ContentItem(id, title, imageUrl);
  }
}
