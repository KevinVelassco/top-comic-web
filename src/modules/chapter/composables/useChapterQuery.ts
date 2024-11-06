import { useQuery } from '@tanstack/vue-query';
import { getChapterByIdAction } from '../actions';
import type { Ref } from 'vue';

interface Props {
  chapterId: Ref<string>;
}

export const useChapterQuery = (props: Readonly<Props>) => {
  const chapterQuery = useQuery({
    queryKey: ['chapter', props.chapterId],
    queryFn: () => getChapterByIdAction({ chapterId: props.chapterId.value }),
  });

  return {
    //Properties
    chapterQuery,
  };
};
