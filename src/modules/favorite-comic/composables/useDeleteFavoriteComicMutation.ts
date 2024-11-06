import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { deleteFavoriteComicAction } from '../actions';

export const useDeleteFavoriteComicMutation = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteFavoriteComicAction,
    onError(error) {
      toast.error(error);
    },
  });

  return mutation;
};
