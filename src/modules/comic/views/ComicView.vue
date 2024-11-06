<template>
  <div class="flex h-full items-center justify-center" v-if="isLoading">
    <LoadingIcon :size="35" />
  </div>
  <div v-else class="h-[calc(100vh-100px)] flex flex-col">
    <div class="h-[5%] flex flex-col items-center justify-center" v-if="comic.results.length > 0">
      <h2 class="text-white text-xl font-medium text-center -mt-5">
        {{ comic.results[0]?.comic?.name }}
      </h2>
    </div>
    <div ref="chaptersRef" class="h-[90%] overflow-y-auto">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-full sm:w-11/12 md:w-[640px]">
          <div v-if="comic.results.length > 0" class="flex items-center justify-end p-1">
            <CustomButton
              variant="secondary"
              class="me-2 !rounded-full !p-1"
              @click="toggleFavoriteComic"
            >
              <HeartIcon
                :size="24"
                :class="[comicFavorite?.id ? 'fill-red-600' : 'fill-zinc-400']"
              />
            </CustomButton>
          </div>
          <section v-if="comic.results.length > 0">
            <article v-for="chapter in comic.results" :key="chapter.id">
              <RouterLink
                :to="{ name: 'chapter', params: { id: `${chapter.comic.id}-${chapter.id}` } }"
                @click="setData({ chapterId: chapter.id })"
              >
                <ChapterCard
                  :chapter="chapter"
                  :storage-chapter-id="storageChapterId"
                  :handleFavorite="handleFavoriteChapter"
                  :selected-favorite-chapter="selectedFavoriteChapters[chapter.id]"
                  :loading="isFetching"
                />
              </RouterLink>
            </article>
          </section>
          <div v-else class="flex justify-center">
            <p class="text-white font-bold text-xl">Comic sin contenido</p>
          </div>
        </div>
      </div>
      <div class="my-3 flex items-center justify-center" v-if="loadMoreActive && isFetching">
        <LoadingIcon :size="35" />
      </div>
    </div>
    <div class="h-[5%] flex justify-center items-center" v-if="comic.results.length > 0">
      <CustomButton
        variant="secondary"
        class="!rounded-3xl !px-3.5"
        :loading="isFetching"
        :disabled="isFetching || comic.meta.page === comic.meta.lastPage"
        @click="loadMoreChapters"
      >
        <div class="flex items-center justify-center">
          <span>Cargar más</span>
        </div>
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/modules/common/icons/LoadingIcon.vue';
import { useComicQuery } from '../composables/useComicQuery';
import { RouterLink, useRoute } from 'vue-router';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { computed, ref, watch } from 'vue';
import type { ComicResponse } from '../interfaces/comic.response';
import { useScrollPosition } from '@/modules/common/composables/useScrollPosition';
import { usePageMetadata } from '@/modules/common/composables/usePageMetadata';
import ChapterCard from '@/modules/comic/components/ChapterCard.vue';
import HeartIcon from '@/modules/common/icons/HeartIcon.vue';
import { useisComicFavoriteQuery } from '@/modules/favorite-comic/composables/useIsComicFavoriteQuery';
import { useAddFavoriteComicMutation } from '@/modules/favorite-comic/composables/useAddFavoriteComicMutation';
import { useDeleteFavoriteComicMutation } from '@/modules/favorite-comic/composables/useDeleteFavoriteComicMutation';
import { useAddFavoriteChapterMutation } from '@/modules/favorite-chapter/composables/useAddFavoriteChapterMutation';
import { useDeleteFavoriteChapterMutation } from '@/modules/favorite-chapter/composables/useDeleteFavoriteChapterMutation';
import { useToast } from 'vue-toastification';

const route = useRoute();
const chaptersRef = ref<HTMLDivElement | null>(null);
const loadMoreActive = ref(false);
const comicId = String(route.params.id);
const selectedFavoriteChapters = ref<Record<string, boolean>>({});

const comic = computed<ComicResponse>(() => {
  const info = data.value?.pages?.flatMap((page) => page.meta) ?? [];
  const results = data.value?.pages?.flatMap((page) => page.results) ?? [];

  const meta = info?.slice(-1)[0] ?? {};

  return {
    meta,
    results,
  };
});

const toast = useToast();

const {
  comicQuery: { data, isLoading, isFetching, fetchNextPage, refetch: refetchComicQuery },
} = useComicQuery({ comicId });

const {
  isComicFavoriteQuery: { data: comicFavorite, refetch: refetchIsComicFavoriteQuery },
} = useisComicFavoriteQuery({ comicId: String(route.params.id) });

const addFavoriteComicMutation = useAddFavoriteComicMutation();
const deleteFavoriteComicMutation = useDeleteFavoriteComicMutation();
const addFavoriteChapterMutation = useAddFavoriteChapterMutation();
const deleteFavoriteChapterMutation = useDeleteFavoriteChapterMutation();

const { setData, getData } = usePageMetadata<{ chapterId: string }>({
  toRoute: 'comic',
  fromRoutes: ['chapter'],
});

const { chapterId: storageChapterId = '' } = getData() ?? {};

const loadMoreChapters = async () => {
  loadMoreActive.value = true;

  setTimeout(() => {
    chaptersRef.value?.scrollTo({
      top: chaptersRef.value.scrollHeight,
      behavior: 'smooth',
    });
  }, 100);

  fetchNextPage();
};

const toggleFavoriteComic = () => {
  const favoriteComicId = comicFavorite.value?.id;

  if (favoriteComicId) {
    deleteFavoriteComicMutation.mutateAsync({ favoriteComicId }).then(() => {
      refetchIsComicFavoriteQuery().then(() => {
        selectedFavoriteChapters.value = {};
        refetchComicQuery();
      });
    });
  } else {
    addFavoriteComicMutation.mutateAsync({ comicId }).then(() => {
      refetchIsComicFavoriteQuery();
    });
  }
};

const handleFavoriteChapter = (chapterId: string, favoriteChapterId: string) => {
  if (favoriteChapterId) {
    deleteFavoriteChapterMutation.mutateAsync({ favoriteChapterId }).then(() => {
      selectedFavoriteChapters.value[chapterId] = false;
      refetchComicQuery();
    });

    return;
  }

  const favoriteComicId = comicFavorite.value?.id;

  if (favoriteComicId) {
    addFavoriteChapterMutation.mutateAsync({ favoriteComicId, chapterId }).then(() => {
      selectedFavoriteChapters.value[chapterId] = true;
      refetchComicQuery();
    });

    return;
  }

  toast.warning('Para marcar el capítulo, primero necesitas agregar el cómic a tus favoritos.');
};

watch(
  () => isFetching.value,
  () => {
    if (!isFetching.value) loadMoreActive.value = false;
  },
);

useScrollPosition({ elementRef: chaptersRef, toRoute: 'comic', fromRoutes: ['chapter'] });
</script>
