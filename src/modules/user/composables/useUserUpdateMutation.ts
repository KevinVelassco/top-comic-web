import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { updateUserAction } from '../actions';
import { useEventStore } from '@/modules/common/stores/event.store';
import { useToast } from 'vue-toastification';

export const useUserUpdateMutation = (page: number) => {
  const queryClient = useQueryClient();
  const eventStore = useEventStore();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: updateUserAction,
    onSuccess: () => {
      eventStore.emit('user-end-updating');
      toast.info('Usuario actualizado.');

      queryClient.invalidateQueries({
        queryKey: ['users', { page }],
      });
    },
  });

  return mutation;
};
