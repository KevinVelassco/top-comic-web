import type { Chapter } from '@/modules/comic/interfaces/comic.response';

export interface ChapterResponse {
  meta: Meta;
  results: Images[];
}

export interface Meta {
  count: number;
  prevId: string;
  nextId: string;
}

interface Images {
  id: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  chapter: Chapter;
}
