<template>
  <div class="grid grid-cols-2">
    <div class="text-base mt-2 mr-5 text-gray-200" v-if="meta">
      <span class="font-semibold">{{ (meta.page - 1) * meta.perPage + 1 }}</span>
      <span class="font-semibold">-</span>
      <span class="font-semibold">
        {{ meta.page === meta.lastPage ? meta.count : meta.page * meta.perPage }}
      </span>
      <span> de </span>
      <span class="font-semibold">{{ meta.count }}</span>
      <span> resultados</span>
    </div>

    <div class="flex items-center justify-end">
      <CustomButton
        variant="secondary"
        class="me-2 !rounded-3xl !px-3.5"
        :disabled="meta?.page === 1 || loading"
        @click="handlePagePrev"
      >
        <div class="flex items-center justify-center">
          <ArrowLeftIcon class="mt-0.5" />
          <span>Anterior</span>
        </div>
      </CustomButton>
      <CustomButton
        variant="secondary"
        class="!rounded-3xl !px-3.5"
        :disabled="meta?.page === meta?.lastPage || loading"
        @click="handlePageNext"
      >
        <div class="flex items-center justify-center">
          <span>Siguiente</span>
          <ArrowRightIcon class="mt-0.5" />
        </div>
      </CustomButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '../icons/ArrowRightIcon.vue';
import CustomButton from './CustomButton.vue';

interface Metadata {
  count: number;
  page: number;
  lastPage: number;
  perPage: number;
}

interface Props {
  meta: Metadata;
  loading: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  handlePagePrev: [void];
  handlePageNext: [void];
}>();

const handlePagePrev = () => emit('handlePagePrev');
const handlePageNext = () => emit('handlePageNext');
</script>
