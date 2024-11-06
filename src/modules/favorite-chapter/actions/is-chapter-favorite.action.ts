import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteChapter } from '../interfaces/favorite-chapter.response';

interface ChapterFavoriteInpunt {
  chapterId: string;
}

export const isChapterFavoriteAction = async (
  chapterFavoriteInpunt: ChapterFavoriteInpunt,
): Promise<FavoriteChapter | null> => {
  const { chapterId } = chapterFavoriteInpunt;

  const FAVORITE_CHAPTER_QUERY = gql`
    query GetFavoriteChapterByChapter($chapterId: String!) {
      getFavoriteChapterByChapter(chapterId: $chapterId) {
        id
        order
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    chapterId,
  };
  try {
    const { data } = await getClient().query({ query: FAVORITE_CHAPTER_QUERY, variables });

    const favoriteChapter = data.getFavoriteChapterByChapter;

    return favoriteChapter;
  } catch (error) {
    return null;
  }
};
