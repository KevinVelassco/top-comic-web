<template>
  <div class="h-[calc(100vh-100px)] flex flex-col">
    <div class="h-[5%]">
      <section>
        <InputSearch placeholder="Buscar" v-model="search" :loading="isFetching" />
      </section>
    </div>
    <div ref="comicsRef" class="h-[88%] overflow-y-auto">
      <div class="w-full h-full flex items-center justify-center" v-if="isLoading">
        <LoadingIcon :size="35" />
      </div>
      <div v-else class="w-full h-full flex justify-center">
        <div class="w-full sm:w-11/12 md:w-[640px]">
          <section class="grid grid-cols-3 sm:grid-cols-5 gap-1 md:gap-1.5">
            <article v-for="comic in comics?.results" :key="comic.id" class="pb-2">
              <RouterLink
                :to="{ name: 'comic', params: { id: comic.id } }"
                @click="setData({ comicId: comic.id, search })"
              >
                <ComicCard :comic="comic" :storage-comic-id="storageComicId" />
              </RouterLink>

              <RouterLink :to="{ name: 'comic', params: { id: comic.id } }">
                <ComicCardFooter :comic="comic" />
              </RouterLink>
            </article>
          </section>
        </div>
      </div>
    </div>
    <div class="h-[7%] flex justify-center items-center">
      <ButtonPagination
        v-if="comics?.results && comics.results.length > 0"
        :meta="comics.meta"
        :loading="isFetching"
        @handle-page-prev="prevPage"
        @handle-page-next="nextPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import InputSearch from '@/modules/common/components/InputSearch.vue';
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue';
import LoadingIcon from '@/modules/common/icons/LoadingIcon.vue';
import { RouterLink } from 'vue-router';
import { useComicsQuery } from '../composables/useComicsQuery';
import { useScrollPosition } from '@/modules/common/composables/useScrollPosition';
import { onMounted, ref } from 'vue';
import { usePageMetadata } from '@/modules/common/composables/usePageMetadata';
import ComicCard from '../components/ComicCard.vue';
import ComicCardFooter from '../components/ComicCardFooter.vue';

interface pageData {
  comicId: string;
  search: string;
}

const { setData, getData } = usePageMetadata<pageData>({
  toRoute: 'comics',
  fromRoutes: ['comic', 'chapter'],
});

const { search: storageSearch = '', comicId: storageComicId = '' } = getData() ?? {};

const search = ref(storageSearch);
const comicsRef = ref<HTMLDivElement | null>(null);

const {
  comicsQuery: { data: comics, isLoading, isFetching },
  prevPage,
  nextPage,
} = useComicsQuery({ search });

useScrollPosition({ elementRef: comicsRef, toRoute: 'comics', fromRoutes: ['comic', 'chapter'] });

onMounted(() => {
  if (history.state?.isInitialLink && comicsRef.value) {
    comicsRef.value.scrollTop = 0;
    history.state.isInitialLink = false;
  }
});
</script>
