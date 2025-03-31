export interface IContentItem {
    id: string;
    title: string;
    imageUrl: string;
  }
  
  export class ContentItem implements IContentItem {
    id: string;
    title: string;
    imageUrl: string;
  
    constructor(id: string, title: string, imageUrl: string) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
    }
  }
  