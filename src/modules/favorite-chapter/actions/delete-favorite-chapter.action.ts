import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteChapter } from '../interfaces/favorite-chapter.response';
import { getMessageFromGraphqlError } from '@/modules/common/helpers';

export interface DeleteFavoriteChapterInput {
  favoriteChapterId: string;
}

export const deleteFavoriteChapterAction = async (
  deleteFavoriteChapterInput: DeleteFavoriteChapterInput,
): Promise<FavoriteChapter> => {
  const { favoriteChapterId } = deleteFavoriteChapterInput;

  const mutation = gql`
    mutation DeleteFavoriteChapter($deleteFavoriteChapterInput: DeleteFavoriteChapterInput!) {
      deleteFavoriteChapter(deleteFavoriteChapterInput: $deleteFavoriteChapterInput) {
        id
        order
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    deleteFavoriteChapterInput: {
      id: favoriteChapterId,
    },
  };
  try {
    const { data } = await getClient().mutate({ mutation, variables });

    const favoriteChapter = data.deleteFavoriteChapter;

    return favoriteChapter;
  } catch (error) {
    throw getMessageFromGraphqlError(error);
  }
};
