import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteChapter } from '../interfaces/favorite-chapter.response';
import { getMessageFromGraphqlError } from '@/modules/common/helpers';

export interface AddFavoriteChapterInput {
  favoriteComicId: string;
  chapterId: string;
}

export const addFavoriteChapterAction = async (
  addFavoriteChapterInput: AddFavoriteChapterInput,
): Promise<FavoriteChapter> => {
  const mutation = gql`
    mutation AddFavoriteChapter($addFavoriteChapterInput: AddFavoriteChapterInput!) {
      addFavoriteChapter(addFavoriteChapterInput: $addFavoriteChapterInput) {
        id
        order
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    addFavoriteChapterInput,
  };
  try {
    const { data } = await getClient().mutate({ mutation, variables });

    const favoriteChapter = data.addFavoriteChapter;

    return favoriteChapter;
  } catch (error) {
    throw getMessageFromGraphqlError(error);
  }
};
