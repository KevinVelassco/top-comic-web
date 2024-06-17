import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteUserAction } from '../actions';
import { useEventStore } from '@/modules/common/stores/event.store';
import { useToast } from 'vue-toastification';

export const useUserDeleteMutation = (page: number) => {
  const queryClient = useQueryClient();
  const eventStore = useEventStore();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      eventStore.emit('user-end-deleting', { accept: true });
      toast.info('Usuario eliminado.');

      queryClient.invalidateQueries({
        queryKey: ['users', { page }],
      });
    },
  });

  return mutation;
};
