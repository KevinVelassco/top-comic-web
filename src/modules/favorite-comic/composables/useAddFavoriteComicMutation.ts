import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { addFavoriteComicAction } from '../actions';

export const useAddFavoriteComicMutation = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: addFavoriteComicAction,
    onError(error) {
      toast.error(error);
    },
  });

  return mutation;
};
