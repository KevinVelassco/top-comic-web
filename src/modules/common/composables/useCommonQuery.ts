import { computed, ref, watchEffect } from 'vue';
import { useQuery, useQueryClient, type QueryKey, type QueryFunction } from '@tanstack/vue-query';

interface Props {
  //queryKey: QueryKey;
  queryKey: string;
  queryFn: QueryFunction;
  hasPrefetchQuery?: boolean;
}

export const usePaginateQuery = (props: Props) => {
  const queryClient = useQueryClient();

  const page = ref<number>(1);

  const { queryKey, queryFn, hasPrefetchQuery = false } = props;

  const query = useQuery({
    queryKey: [queryKey, { page: page }],
    queryFn,
  });

  const nextPage = () => {
    //if (query.data.value?['results']['length'] === 0) return;
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
    if (!hasPrefetchQuery) return;

    queryClient.prefetchQuery({
      queryKey: [queryKey, { page: page }],
      queryFn,
    });
  });

  return {
    //Properties
    query,
    //Getter
    page: computed(() => page.value),
    //Methods
    nextPage,
    prevPage,
    setInitialPage,
  };
};
