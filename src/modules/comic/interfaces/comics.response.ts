import type { FavoriteComic } from '@/modules/favorite-comic/interfaces/favorite-comic.response';
import type { Chapter } from './comic.response';

export interface ComicsResponse {
  meta: Meta;
  results: Comic[];
}

export interface Meta {
  count: number;
  page: number;
  lastPage: number;
  perPage: number;
}

export interface Comic {
  id: string;
  name: string;
  coverImageUrl: string;
  hasChapters: boolean;
  createdAt: Date;
  updatedAt: Date;
  chapters: chapters;
  favoriteComic: FavoriteComic;
}

interface chapters {
  count: number;
  results: Chapter[];
}
