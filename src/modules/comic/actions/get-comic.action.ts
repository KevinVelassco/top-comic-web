import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { ComicResponse } from '../interfaces/comic.response';
import { sleep } from '@/modules/common/helpers';

interface GetComicInpunt {
  page?: number;
  limit?: number;
  comicId?: string;
}

export const getComicAction = async (GetComicInpunt?: GetComicInpunt): Promise<ComicResponse> => {
  await sleep(1.5);

  const { page = 1, limit = 30, comicId } = GetComicInpunt ?? {};
  const offset = (page - 1) * limit;

  const CHAPTERS_QUERY = gql`
    query GetAllChapters(
      $comicId: String!
      $limit: Int
      $offset: Int
      $imagesLimit: Int
      $imagesOffset: Int
    ) {
      getAllChapters(comicId: $comicId, limit: $limit, offset: $offset) {
        count
        results {
          id
          episodeNumber
          description
          createdAt
          updatedAt
          comic {
            id
            name
          }
          favoriteChapter {
            id
            order
            createdAt
            updatedAt
          }
          images(limit: $imagesLimit, offset: $imagesOffset) {
            results {
              id
              url
              order
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  `;

  const variables = {
    limit,
    offset,
    comicId,
    imagesLimit: 3,
    imagesOffset: 2,
  };
  try {
    const { data } = await getClient().query({ query: CHAPTERS_QUERY, variables });

    const { count, results } = data.getAllChapters;

    return {
      meta: {
        count,
        page,
        lastPage: Math.ceil(count / limit),
        perPage: limit,
      },
      results,
    };
  } catch (error) {
    throw new Error('Error getting chapters');
  }
};
