import { useQuery } from '@tanstack/vue-query';
import { isChapterFavoriteAction } from '../actions';
import type { Ref } from 'vue';

interface Props {
  chapterId: Ref<string>;
}

export const useisChapterFavoriteQuery = (props: Readonly<Props>) => {
  const isChapterFavoriteQuery = useQuery({
    queryKey: ['is_chapter_favorite', props.chapterId],
    queryFn: () => isChapterFavoriteAction({ chapterId: props.chapterId.value }),
  });

  return {
    //Properties
    isChapterFavoriteQuery,
  };
};
