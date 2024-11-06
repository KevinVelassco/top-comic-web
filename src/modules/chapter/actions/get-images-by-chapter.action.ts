import { getClient } from '@/api/comicGraphql';
import gql from 'graphql-tag';
import type { ChapterResponse } from '../interfaces/chapter.response';
import { sleep } from '@/modules/common/helpers';

interface GetChapterInput {
  comicId: string;
  chapterId: string;
}

export const getChapterAction = async (
  getChapterInput?: GetChapterInput,
): Promise<ChapterResponse> => {
  const { comicId, chapterId } = getChapterInput ?? {};
  await sleep(2);

  const IMAGES_QUERY = gql`
    query GetAllImagesByChapter($comicId: String!, $chapterId: String!) {
      getAllImagesByChapter(comicId: $comicId, chapterId: $chapterId) {
        count
        prevId
        nextId
        results {
          id
          url
          order
          createdAt
          updatedAt
        }
      }
    }
  `;

  const variables = {
    comicId,
    chapterId,
  };
  try {
    const { data } = await getClient().query({ query: IMAGES_QUERY, variables });

    const { count, prevId, nextId, results } = data.getAllImagesByChapter;

    return {
      meta: {
        count,
        prevId,
        nextId,
      },
      results,
    };
  } catch (error) {
    throw new Error('Error getting images');
  }
};
