import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { deleteFavoriteChapterAction } from '../actions';

export const useDeleteFavoriteChapterMutation = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteFavoriteChapterAction,
    onError(error) {
      toast.error(error);
    },
  });

  return mutation;
};
