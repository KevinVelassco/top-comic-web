<template>
  <div class="flex items-center justify-end p-3">
    <RouterLink :to="{ name: 'comic', params: { id: comicId } }">
      <CustomButton variant="secondary" class="me-2 !rounded-full !p-1">
        <div class="flex items-center justify-center">
          <HamburgerIcon :size="24" />
        </div>
      </CustomButton>
    </RouterLink>
    <slot name="more-options"></slot>
    <CustomButton
      v-if="scrollUpOptionRequired"
      variant="secondary"
      class="me-2 !rounded-full !p-2"
      @click="handleTopScroll"
    >
      <ArrowUpIcon :size="16" />
    </CustomButton>
    <RouterLink :to="{ name: 'chapter', params: { id: meta.prevId } }">
      <CustomButton variant="secondary" class="me-2 !rounded-full !p-2" :disabled="!meta.prevId">
        <div class="flex items-center justify-center">
          <ArrowLeftIcon :size="16" />
        </div>
      </CustomButton>
    </RouterLink>
    <RouterLink :to="{ name: 'chapter', params: { id: meta.nextId } }">
      <CustomButton variant="secondary" class="!rounded-full !p-2" :disabled="!meta.nextId">
        <div class="flex items-center justify-center">
          <ArrowRightIcon :size="16" />
        </div>
      </CustomButton>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import ArrowLeftIcon from '@/modules/common/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/modules/common/icons/ArrowRightIcon.vue';
import type { Meta } from '../interfaces/chapter.response';
import HamburgerIcon from '@/modules/common/icons/HamburgerIcon.vue';
import ArrowUpIcon from '@/modules/common/icons/ArrowUpIcon.vue';

interface Props {
  comicId: string;
  meta: Meta;
  scrollUpOptionRequired?: Boolean;
}

defineProps<Props>();

const handleTopScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
