import { type Ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getChapterAction } from '../actions';

interface Props {
  comicId: Ref<string>;
  chapterId: Ref<string>;
}

export const useChapterImagesQuery = (props: Readonly<Props>) => {
  const chapterImagesQuery = useQuery({
    queryKey: ['chapter-images', props.chapterId],
    queryFn: () =>
      getChapterAction({ comicId: props.comicId.value, chapterId: props.chapterId.value }),
  });

  return {
    //Properties
    chapterImagesQuery,
  };
};
