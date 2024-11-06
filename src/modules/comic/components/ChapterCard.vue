<template>
  <hr class="border border-red-800 my-2" />
  <div
    :class="[
      'relative h-[90px] rounded-sm shadow-sm',
      chapter.id === storageChapterId ? 'border border-stone-600' : '',
    ]"
  >
    <div class="grid grid-cols-3 gap-1.5">
      <img
        v-for="image in chapter.images.results"
        :key="image.id"
        loading="lazy"
        draggable="false"
        class="w-full h-[90px] object-cover rounded-sm"
        src="https://www.todofondos.net/wp-content/uploads/1920x1080-One-Piece-Luffy-Wallpaper.-Wallpaper-Studio-10.jpg"
      />
      <!--  <img
        v-for="image in chapter.images.results"
        :key="image.id"
        loading="lazy"
        draggable="false"
        class="w-full h-[90px] object-cover rounded-sm"
        :src="image.url"
      /> -->
    </div>

    <div
      class="absolute h-7 w-24 bg-red-600 bg-opacity-95 rounded-sm p-1 flex items-center justify-center"
      style="z-index: 10; top: 5px; right: 5px"
    >
      <p class="text-white text-sm">{{ descriptionChapter(chapter.description) }}</p>
    </div>

    <div
      v-if="handleFavorite !== undefined"
      class="absolute"
      style="z-index: 10; bottom: -5px; right: 1px"
    >
      <CustomButton
        :disabled="loading"
        class="!rounded-none !p-1 !opacity-100"
        @click="toggleFavoriteChapter($event)"
      >
        <HeartIcon :size="25" :class="[isFavorite ? 'fill-red-600' : 'fill-zinc-300']" />
      </CustomButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Chapter } from '@/modules/comic/interfaces/comic.response';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import HeartIcon from '@/modules/common/icons/HeartIcon.vue';
import { computed } from 'vue';

interface Props {
  chapter: Chapter;
  storageChapterId?: string;
  handleFavorite?: (chapterId: string, favoriteChapterId: string) => void;
  selectedFavoriteChapter?: boolean | undefined;
  loading?: boolean;
}

const props = defineProps<Props>();

const descriptionChapter = (description: string) => {
  const [text, value] = description.split(' ') ?? [];
  return `${text} ${Number(value)}`;
};

const isFavorite = computed(() => {
  if (props.selectedFavoriteChapter !== undefined) {
    return props.selectedFavoriteChapter;
  }

  return props.chapter.favoriteChapter?.id;
});

const toggleFavoriteChapter = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  if (props.handleFavorite === undefined) return;

  const { id, favoriteChapter } = props.chapter;

  props.handleFavorite(id, favoriteChapter?.id);
};
</script>
