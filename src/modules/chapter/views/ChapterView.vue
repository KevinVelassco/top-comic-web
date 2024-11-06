<template>
  <div class="-mt-16 -mx-2 relative">
    <div class="w-full h-full flex items-center justify-center" v-if="isLoading">
      <LoadingIcon :size="35" />
    </div>
    <div v-else class="w-full h-full flex flex-col justify-center items-center">
      <div class="pb-5">
        <h2 class="text-white text-xl font-medium text-center">
          {{ title.mainTitle }}
        </h2>
        <h3 class="text-white text-lg text-opacity-50 font-medium text-center">
          {{ title.subtitle }}
        </h3>
      </div>

      <section v-if="chapterImages && chapterImages.results.length > 0">
        <ChapterPagination :meta="chapterImages.meta" :comic-id="comicId">
          <template #more-options>
            <CustomButton
              variant="secondary"
              class="me-2 !rounded-full !p-1"
              @click="toggleFavoriteChapter"
            >
              <HeartIcon
                :size="24"
                :class="[favoriteChapter?.id ? 'fill-red-600' : 'fill-zinc-400']"
              />
            </CustomButton>
          </template>
        </ChapterPagination>

        <article v-for="image in chapterImages.results" :key="image.id">
          <!-- <img
            :key="image.id"
            draggable="false"
            loading="lazy"
            style="width: 720px"
            :src="image.url"
          /> -->
          <img
            :key="image.id"
            draggable="false"
            loading="lazy"
            style="width: 720px"
            src="https://pack-yak.intomanga.com/images/manga/One-Piece/chapter/1/page/8/93f946e3-9c41-4720-8fc4-90645b427611"
          />
        </article>
        <!--  <ChapterPagination
          :meta="chapter.meta"
          :comic-id="comicId"
          :scroll-up-option-required="true"
        /> -->

        <div class="fixed bottom-12 right-1">
          <div class="flex items-center h-12">
            <div>
              <ChapterPagination
                v-if="showOptions"
                :meta="chapterImages.meta"
                :comic-id="comicId"
                :scroll-up-option-required="true"
              >
                <template #more-options>
                  <CustomButton
                    variant="secondary"
                    class="me-2 !rounded-full !p-1"
                    @click="toggleFavoriteChapter"
                  >
                    <HeartIcon
                      :size="24"
                      :class="[favoriteChapter?.id ? 'fill-red-600' : 'fill-zinc-400']"
                    />
                  </CustomButton>
                </template>
              </ChapterPagination>
            </div>
            <div>
              <CustomButton
                variant="danger"
                class="!rounded-full !p-1 me-1"
                @click="showOptions = !showOptions"
              >
                <ArrowLeftIcon v-if="!showOptions" :size="16" class="fill-white stroke-gray-200" />
                <ArrowRightIcon
                  v-if="showOptions"
                  :size="16"
                  class="fill-gray-200 stroke-gray-200"
                />
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
      <div v-else class="flex justify-center">
        <p class="text-white font-bold text-xl">Capítulo sin contenido</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoadingIcon from '@/modules/common/icons/LoadingIcon.vue';
import { useRoute } from 'vue-router';
import { useChapterImagesQuery } from '../composables/useChapterImagesQuery';
import ChapterPagination from '../components/ChapterPagination.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useEventStore } from '@/modules/common/stores/event.store';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import ArrowLeftIcon from '@/modules/common/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/modules/common/icons/ArrowRightIcon.vue';
import HeartIcon from '@/modules/common/icons/HeartIcon.vue';
import { useisChapterFavoriteQuery } from '@/modules/favorite-chapter/composables/useIsChapterFavoriteQuery';
import { useAddFavoriteChapterMutation } from '@/modules/favorite-chapter/composables/useAddFavoriteChapterMutation';
import { useDeleteFavoriteChapterMutation } from '@/modules/favorite-chapter/composables/useDeleteFavoriteChapterMutation';
import { useChapterQuery } from '../composables/useChapterQuery';

const eventStore = useEventStore();
const route = useRoute();
const showOptions = ref(false);

const comicId = ref(String(route.params.id)?.split('-')[0]);
const chapterId = ref(String(route.params.id)?.split('-')[1]);

const title = computed(() => {
  const mainTitle = chapter.value?.comic.name;
  const [text, value] = chapter.value?.description?.split(' ') ?? [];

  return {
    mainTitle,
    subtitle: `${text} ${Number(value)}`,
  };
});

const {
  chapterImagesQuery: { data: chapterImages, isLoading },
} = useChapterImagesQuery({ comicId, chapterId });

const {
  chapterQuery: { data: chapter },
} = useChapterQuery({ chapterId });

const {
  isChapterFavoriteQuery: { data: favoriteChapter, refetch: refetchIsChapterFavoriteQuery },
} = useisChapterFavoriteQuery({ chapterId: chapterId });

const addFavoriteChapterMutation = useAddFavoriteChapterMutation();
const deleteFavoriteChapterMutation = useDeleteFavoriteChapterMutation();

const toggleFavoriteChapter = () => {
  const favoriteChapterId = favoriteChapter.value?.id;

  if (favoriteChapterId) {
    deleteFavoriteChapterMutation.mutateAsync({ favoriteChapterId }).then(() => {
      refetchIsChapterFavoriteQuery();
    });

    return;
  }

  const favoriteComicId = chapter.value?.comic?.favoriteComic?.id;

  if (favoriteComicId) {
    addFavoriteChapterMutation
      .mutateAsync({ favoriteComicId, chapterId: chapterId.value })
      .then(() => {
        refetchIsChapterFavoriteQuery();
      });
  }
};

/* const { isAtBottom } = useScrollEnd();

watch(isAtBottom, (value) => {
  if (value) {
    showOptions.value = true;
  }
}); */

watch(
  () => route.params.id,
  (newId) => {
    comicId.value = String(newId)?.split('-')[0];
    chapterId.value = String(newId)?.split('-')[1];

    showOptions.value = false;

    window.scrollTo(0, 0);
  },
);

onMounted(() => {
  eventStore.emit('nav-bar-fixed', false);
});

onUnmounted(() => {
  eventStore.emit('nav-bar-fixed', true);
});
</script>
