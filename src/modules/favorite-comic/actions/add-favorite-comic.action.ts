import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteComic } from '../interfaces/favorite-comic.response';
import { getMessageFromGraphqlError } from '@/modules/common/helpers';

export interface AddFavoriteComicInput {
  comicId: string;
}

export const addFavoriteComicAction = async (
  addFavoriteComicInput: AddFavoriteComicInput,
): Promise<FavoriteComic> => {
  const mutation = gql`
    mutation AddFavoriteComic($addFavoriteComicInput: AddFavoriteComicInput!) {
      addFavoriteComic(addFavoriteComicInput: $addFavoriteComicInput) {
        id
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    addFavoriteComicInput,
  };

  try {
    const { data } = await getClient().mutate({ mutation, variables });

    const favoriteComic = data.addFavoriteComic;

    return favoriteComic;
  } catch (error) {
    throw getMessageFromGraphqlError(error);
  }
};
