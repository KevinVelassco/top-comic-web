import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { FavoriteComic } from '../interfaces/favorite-comic.response';

interface ComicFavoriteInpunt {
  comicId: string;
}

export const isComicFavoriteAction = async (
  comicFavoriteInpunt: ComicFavoriteInpunt,
): Promise<FavoriteComic | null> => {
  const { comicId } = comicFavoriteInpunt;

  const FAVORITE_COMIC_QUERY = gql`
    query GetFavoriteComicByComic($comicId: String!) {
      getFavoriteComicByComic(comicId: $comicId) {
        id
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    comicId,
  };
  try {
    const { data } = await getClient().query({ query: FAVORITE_COMIC_QUERY, variables });

    const favoriteComic = data.getFavoriteComicByComic;

    return favoriteComic;
  } catch (error) {
    return null;
  }
};
