import { ref, watch, type Ref } from 'vue';

export const useDebouncedSearch = (searchValue?: Ref<string>, delay = 300) => {
  const debouncedSearch = ref(searchValue?.value);
  let debounceTimeout: ReturnType<typeof setTimeout>;

  watch(
    () => searchValue?.value,
    (newValue) => {
      // 1. Reinicia el temporizador si el usuario sigue escribiendo.
      clearTimeout(debounceTimeout);

      //if (!newValue?.trim()) {
      if (!newValue?.trim()) {
        debouncedSearch.value = '';
      } else {
        // 2. Crea un nuevo temporizador.
        debounceTimeout = setTimeout(() => {
          // 3. Si el usuario deja de escribir, asigna el valor después del retraso.
          debouncedSearch.value = newValue;
        }, delay);
      }
    },
  );

  /*  watch(
    () => searchValue?.value,
    (newValue, oldValue) => {
      if (newValue?.trim()) {
        // 3. Si el usuario deja de escribir, asigna el valor después del retraso.
        debouncedSearch.value = newValue;
      } else {
        if (oldValue?.trim() !== '') {
          console.log(1, oldValue);
          debouncedSearch.value = '';
        }
      }
    },
  ); */

  return { debouncedSearch };
};
