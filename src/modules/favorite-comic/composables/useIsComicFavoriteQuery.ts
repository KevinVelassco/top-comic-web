import { useQuery } from '@tanstack/vue-query';
import { isComicFavoriteAction } from '../actions';

interface Props {
  comicId: string;
}

export const useisComicFavoriteQuery = (props: Readonly<Props>) => {
  const isComicFavoriteQuery = useQuery({
    queryKey: ['is_comic_favorite', props.comicId],
    queryFn: () => isComicFavoriteAction({ comicId: props.comicId }),
  });

  return {
    //Properties
    isComicFavoriteQuery,
  };
};
