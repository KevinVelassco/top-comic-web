import type { FavoriteChapter } from '@/modules/favorite-chapter/interfaces/favorite-chapter.response';
import type { Comic } from './comics.response';

export interface ComicResponse {
  meta: Meta;
  results: Chapter[];
}

export interface Meta {
  count: number;
  page: number;
  lastPage: number;
  perPage: number;
}

export interface Chapter {
  id: string;
  episodeNumber: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  comic: Comic;
  favoriteChapter: FavoriteChapter;
  images: Images;
}

export interface Images {
  results: Image[];
}

export interface Image {
  id: string;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
