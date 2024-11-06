<template>
  <div
    :class="[
      'relative h-40 rounded-sm shadow-sm',
      comic.id === storageComicId ? 'border border-stone-600' : '',
    ]"
  >
    <img
      draggable="false"
      class="w-full h-full object-cover rounded-sm"
      data-src="//twattraction.akamaized.net/www_v1/imgComic/co_thumb14/x2/902_1536139696.2285.jpg"
      src="//twattraction.akamaized.net/www_v1/imgComic/co_thumb14/x2/902_1536139696.2285.jpg"
    />

    <div
      class="absolute h-7 w-16 bg-red-600 bg-opacity-95 rounded-sm p-1 flex items-center justify-center"
      style="z-index: 10; top: 5px; right: 5px"
    >
      <p class="text-white text-sm">Manhwa</p>
    </div>

    <div
      class="absolute h-8 w-24 bg-black bg-opacity-70 rounded-sm p-1 flex items-center justify-center"
      style="z-index: 10; bottom: 5px; left: 5px"
    >
      <p class="text-white text-sm">{{ description }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { Comic } from '../interfaces/comics.response';

interface Props {
  comic: Comic;
  storageComicId?: string;
}

const props = defineProps<Props>();

const description = computed(() => {
  const description = props.comic.chapters?.results[0]?.description;

  if (!description || description?.length === 0) return 'Sin Capítulo';

  const [text, value] = props.comic.chapters?.results[0]?.description?.split(' ') ?? [];

  return `${text} ${Number(value)}`;
});
</script>
