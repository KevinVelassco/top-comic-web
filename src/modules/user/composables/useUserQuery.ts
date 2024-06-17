import { computed, ref, watchEffect } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getUsersAction } from '../actions';

export const useUserQuery = () => {
  const queryClient = useQueryClient();

  const page = ref<number>(1);

  const usersQuery = useQuery({
    queryKey: ['users', { page: page }],
    queryFn: () => getUsersAction(page.value),
  });

  const nextPage = () => {
    if (usersQuery.data.value?.results.length === 0) return;
    page.value = page.value + 1;
  };

  const prevPage = () => {
    if (page.value <= 1) return;
    page.value = page.value - 1;
  };

  const setInitialPage = () => {
    page.value = 1;
  };

  watchEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['users', { page: page.value + 1 }],
      queryFn: () => getUsersAction(page.value + 1),
    });
  });

  return {
    //Properties
    usersQuery,
    //Getter
    page: computed(() => page.value),
    //Methods
    nextPage,
    prevPage,
    setInitialPage,
  };
};
