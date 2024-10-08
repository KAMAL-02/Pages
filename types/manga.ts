export interface Manga {
    id: string,
    title: string;
    thumb: string;
    genres: string[];
    summary: string;
    type?: string;
    total_chapter?: number;
    nsfw?: boolean;
    status?: string;
    authors?: string[];
  }
  