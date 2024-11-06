<template>
  <div class="flex h-16 justify-center items-center">
    <p
      class="text-center text-gray-200 hover:text-white text-sm p-1"
      style="
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      "
    >
      {{ comic.name }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { Comic } from '../interfaces/comics.response';

interface Props {
  comic: Comic;
}

defineProps<Props>();
</script>
