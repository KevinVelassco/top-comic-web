import { useMutation } from '@tanstack/vue-query';
import { createUserAction } from '../actions';
import { useEventStore } from '@/modules/common/stores/event.store';
import { useToast } from 'vue-toastification';

export const useUserMutation = () => {
  const eventStore = useEventStore();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: createUserAction,
    onSuccess: () => {
      eventStore.emit('user-end-creating', { accept: true });
      toast.info('Usuario registrado.');
    },
  });

  return mutation;
};
