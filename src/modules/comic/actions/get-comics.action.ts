import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { ComicsResponse } from '../interfaces/comics.response';

interface GetComicsInpunt {
  page?: number;
  limit?: number;
  q?: string;
  //filters?: Record<string, any>;
}

export const getComicsAction = async (
  getComicsInpunt?: GetComicsInpunt,
): Promise<ComicsResponse> => {
  const { page = 1, limit = 30, q } = getComicsInpunt ?? {};

  const offset = (page - 1) * limit;

  const COMICS_QUERY = gql`
    query GetAllComics($limit: Int, $offset: Int, $q: String, $chaptersLimit: Int) {
      getAllComics(limit: $limit, offset: $offset, q: $q) {
        count
        results {
          id
          name
          coverImageUrl
          hasChapters
          createdAt
          updatedAt
          chapters(limit: $chaptersLimit) {
            results {
              description
            }
          }
        }
      }
    }
  `;

  const variables = {
    limit,
    offset,
    q,
    chaptersLimit: 1,
  };

  try {
    const { data } = await getClient().query({ query: COMICS_QUERY, variables });

    const { count, results } = data.getAllComics;

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
    throw new Error('Error getting comics');
  }
};
