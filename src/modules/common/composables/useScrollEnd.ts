/* import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollEnd() {
  const isAtBottom = ref(false);

  const observer = new IntersectionObserver(
    ([entry]) => {
      console.log('entro al observer');
      isAtBottom.value = entry.isIntersecting;
    },
    {
      root: null,
      threshold: 1.0,
    },
  );

  onMounted(() => {
    // Agrega un elemento al final de la página que el IntersectionObserver pueda observar
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-end-sentinel';
    document.body.appendChild(sentinel);
    observer.observe(sentinel);
  });

  onUnmounted(() => {
    observer.disconnect();
    const sentinel = document.getElementById('scroll-end-sentinel');
    if (sentinel) sentinel.remove();
  });

  return { isAtBottom };
} */

/* import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

  export function useScrollEnd(data: any) {
    const isAtBottom = ref(false);
    let observer: any;

    const setupObserver = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          isAtBottom.value = entry.isIntersecting;
        },
        {
          root: null,
          threshold: 1.0,
        },
      );
    };

    const observeSentinel = () => {
      const sentinel = document.getElementById('pruebaaaaaaaaaa');
      if (sentinel) {
        observer.observe(sentinel);
      }
    };

    onMounted(() => {
      const sentinel = document.createElement('div');
      sentinel.id = 'scroll-end-sentinel';
      document.body.appendChild(sentinel);

      setupObserver();
      //observeSentinel();
    });

    onUnmounted(() => {
      observer.disconnect();
      const sentinel = document.getElementById('pruebaaaaaaaaaa');
      if (sentinel) sentinel.remove();
    });

    // Observa los cambios en la data
    watch(data, async (newData) => {
      console.log(newData.results.length);
      if (newData.results && newData.results.length) {
        console.log('nextTick 0');
        await nextTick();
        console.log('nextTick 1');
        observeSentinel();
      }
    });

    return { isAtBottom };
  }
*/

import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export function useScrollEnd() {
  const isAtBottom = ref(false);
  let observer: any;

  const setupObserver = () => {
    observer = new IntersectionObserver(
      ([entry]) => {
        isAtBottom.value = entry.isIntersecting;
      },
      {
        root: null,
        threshold: 1.0,
      },
    );
  };

  const observeSentinel = () => {
    nextTick(() => {
      console.log('nextTick');
      const sentinel = document.getElementById('scroll-end-sentinel');
      if (sentinel) {
        observer.observe(sentinel);
      }
    });
  };

  onMounted(() => {
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-end-sentinel';
    document.body.appendChild(sentinel);

    setupObserver();
    observeSentinel();
  });

  onUnmounted(() => {
    observer.disconnect();
    const sentinel = document.getElementById('scroll-end-sentinel');
    if (sentinel) sentinel.remove();
  });

  return { isAtBottom };
}
