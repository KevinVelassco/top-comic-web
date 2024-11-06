import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteComic } from '../interfaces/favorite-comic.response';
import { getMessageFromGraphqlError } from '@/modules/common/helpers';

export interface DeleteFavoriteComicInput {
  favoriteComicId: string;
}

export const deleteFavoriteComicAction = async (
  deleteFavoriteComicInput: DeleteFavoriteComicInput,
): Promise<FavoriteComic> => {
  const { favoriteComicId } = deleteFavoriteComicInput;

  const mutation = gql`
    mutation DeleteFavoriteComic($deleteFavoriteComicInput: DeleteFavoriteComicInput!) {
      deleteFavoriteComic(deleteFavoriteComicInput: $deleteFavoriteComicInput) {
        id
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    deleteFavoriteComicInput: {
      id: favoriteComicId,
    },
  };
  try {
    const { data } = await getClient().mutate({ mutation, variables });

    const favoriteComic = data.deleteFavoriteComic;

    return favoriteComic;
  } catch (error) {
    throw getMessageFromGraphqlError(error);
  }
};
