import { computed, ref, watch, watchEffect, type Ref } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getComicsAction } from '../actions';
import { useRoute, useRouter } from 'vue-router';
import { useDebouncedSearch } from '@/modules/common/composables/useDebouncedSearch ';

interface Props {
  search?: Ref<string>;
  filters?: Record<string, any>;
}

interface QueryKey {
  page: number;
  q?: string | undefined;
}

interface QueryFn {
  page: number;
  q?: string;
}

export const useComicsQuery = (props?: Readonly<Props>) => {
  const queryClient = useQueryClient();

  const route = useRoute();
  const router = useRouter();
  const page = ref(Number(route.query.page || 1));

  const { debouncedSearch } = useDebouncedSearch(props?.search, 400);

  const getQueryKey = (isPrefetchQuery: boolean = false): QueryKey => {
    const key: QueryKey = isPrefetchQuery ? { page: page.value + 1 } : { page: page.value };

    if (debouncedSearch.value && debouncedSearch.value.trim().length > 0) {
      key.q = debouncedSearch.value;
    }

    return key;
  };

  const getQueryFn = (isPrefetchQuery: boolean = false): QueryFn => {
    const fn: QueryFn = isPrefetchQuery ? { page: page.value + 1 } : { page: page.value };

    if (debouncedSearch.value && debouncedSearch.value.trim().length > 0) {
      fn.q = debouncedSearch.value;
    }

    return fn;
  };

  const queryKey = computed<QueryKey>(() => getQueryKey());
  const queryFn = computed<QueryFn>(() => getQueryFn());

  const comicsQuery = useQuery({
    queryKey: ['comics', queryKey],
    queryFn: () => getComicsAction(queryFn.value),
    retry: 1,
  });

  const queryKeyPrefetch = computed<QueryKey>(() => getQueryKey(true));
  const queryFnPrefetch = computed<QueryFn>(() => getQueryFn(true));

  watchEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['comics', queryKeyPrefetch.value],
      queryFn: () => getComicsAction(queryFnPrefetch.value),
      retry: 1,
    });
  });

  const nextPage = () => {
    if (comicsQuery.data.value?.results.length === 0) return;

    router.push({ query: { page: page.value + 1 } });
  };

  const prevPage = () => {
    if (page.value <= 1) return;

    router.push({ query: { page: page.value - 1 } });
  };

  watch(
    () => props?.search?.value,
    () => {
      if (page.value === 1) return;
      router.push({ query: { page: 1 } });
    },
  );

  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage || 1);
    },
  );

  return {
    //Properties
    comicsQuery: comicsQuery,
    //Getter
    page: computed(() => page.value),
    //Methods
    nextPage,
    prevPage,
  };
};
