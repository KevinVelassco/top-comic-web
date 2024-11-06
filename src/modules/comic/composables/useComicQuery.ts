import { useInfiniteQuery } from '@tanstack/vue-query';
import { getComicAction } from '../actions';

interface Props {
  comicId: string;
}

export const useComicQuery = (props: Readonly<Props>) => {
  const comicQuery = useInfiniteQuery({
    queryKey: ['comic', props.comicId],
    queryFn: ({ pageParam }) => getComicAction({ page: pageParam, comicId: props.comicId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.meta.lastPage === lastPage.meta.page) return;
      return pages.length + 1;
    },
  });

  return {
    //Properties
    comicQuery,
  };
};
