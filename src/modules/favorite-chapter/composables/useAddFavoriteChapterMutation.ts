import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';
import { addFavoriteChapterAction } from '../actions';

export const useAddFavoriteChapterMutation = () => {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: addFavoriteChapterAction,
    onError(error) {
      toast.error(error);
    },
  });

  return mutation;
};
