export interface IContentItem {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }
  
  export class ContentItem implements IContentItem {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  
    constructor(id: string, title: string, imageUrl: string, description: string) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
    }
  }
  