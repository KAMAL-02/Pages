export interface ChapterImage {
    id: string;
    chapter: string;
    manga: string;
    index: number;
    link: string;
  }
  
  export interface ChapterResponse {
    data: ChapterImage[];
  }
  