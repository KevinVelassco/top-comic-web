import { computed, ref, watch, watchEffect, type Ref } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getUsersAction } from '../actions';

/* interface Props {
  search?: Ref<string>;
  filters?: Record<string, any>;
  pagination?: boolean;
} */

interface Props {
  pagination?: boolean;
  search?: Ref<string>;
  filters?: Record<string, any>;
}

interface QueryKey {
  page?: Ref<number>;
  q?: Ref<string>;
  filters?: Record<string, any>;
}

interface QueryFn {
  page?: number;
  q?: string;
  filters?: Record<string, any>;
}

export const useUserQuery = (props?: Readonly<Props>) => {
  const queryClient = useQueryClient();

  const page = ref<number>(1);
  const filters = ref(props?.filters);
  const q = ref<string>();

  watch(filters, () => {
    console.log('watch ---');
    q.value = filters.value?.['Nombre'];
    console.log(filters.value, filters.value?.['Nombre']);
  });

  /* const key = Object.entries(props ?? {}).reduce((acc, [key, value]) => {
    return {
      [key]: value,
      ...acc,
    };
  }, {});

  const fn = Object.entries(props ?? {}).reduce((acc, [key, value]) => {
    return {
      [key]: value.value,
      ...acc,
    };
  }, {}); */

  /*   let key = {};
  let fn = {};

  if (props) {
    const hasPagination = props.pagination ?? true;

    if (hasPagination) {
      key = {
        page: page,
      };

      fn = {
        page: page.value,
      };
    }
  }

  if (props && props['search']) {
    key = {
      ...key,
      q: props['search'],
    };

    fn = {
      ...fn,
      q: props['search'].value,
    };
  }

  if (props && props['filters']) {
    key = {
      ...key,
      filters: props['filters'],
    };

    fn = {
      ...fn,
      filters: props['filters'].value,
    };
  } */

  //console.log(props && props['search']);
  //console.log(key, fn);

  /* const usersQuery = useQuery({
    queryKey: ['users', { page: page, q: props?.search }],
    queryFn: () => getUsersAction({ page: page.value, q: props?.search?.value }),
  }); */

  /*  watch(
    () => props?.search?.value,
    () => {
      console.log('watch --- props?.search');
      if (props && props.search && props.search.value.trim().length > 0) {
        console.log('if');
        key.q = props.search;
      }
    },
  ); */

  const queryKey = computed<QueryKey>(() => {
    console.log('entro');
    const key: QueryKey = {};
    if (props) {
      const hasPagination = props.pagination ?? true;
      if (hasPagination) key.page = page;
    }

    //if (props && props.search && props.search.value.trim().length > 0) {
    if (props && props.search) {
      key.q = props.search;
    }

    if (props && props.filters) {
      key.filters = props.filters;
    }

    return key;
  });

  const queryFn = computed<QueryFn>(() => {
    const fn: QueryFn = {};
    if (props) {
      const hasPagination = props.pagination ?? true;
      if (hasPagination) fn.page = page.value;
    }

    if (props && props.search && props.search.value.trim().length > 0) {
      fn.q = props.search.value;
    }

    if (props && props.filters) {
      fn.filters = props.filters.value;
    }

    return fn;
  });

  console.log(queryKey.value);
  console.log(queryFn.value);

  const usersQuery = useQuery({
    queryKey: ['users', queryKey.value],
    queryFn: () => getUsersAction(queryFn.value),
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
      queryFn: () => getUsersAction({ page: page.value + 1 }),
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
