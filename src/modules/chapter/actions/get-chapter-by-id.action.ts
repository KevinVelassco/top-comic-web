import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import { getMessageFromGraphqlError } from '@/modules/common/helpers';
import type { Chapter } from '@/modules/comic/interfaces/comic.response';

interface GetChapterByIdInput {
  chapterId: string;
}

export const getChapterByIdAction = async (
  getChapterByIdInput?: GetChapterByIdInput,
): Promise<Chapter> => {
  const { chapterId } = getChapterByIdInput ?? {};

  const CHAPTER_QUERY = gql`
    query GetOneChapter($chapterId: String!) {
      getOneChapter(chapterId: $chapterId) {
        id
        episodeNumber
        description
        createdAt
        updatedAt
        comic {
          name
          favoriteComic {
            id
          }
        }
      }
    }
  `;

  const variables = {
    chapterId,
  };

  try {
    const { data } = await getClient().query({ query: CHAPTER_QUERY, variables });

    const chapter = data.getOneChapter;

    return chapter;
  } catch (error) {
    throw getMessageFromGraphqlError(error);
  }
};
