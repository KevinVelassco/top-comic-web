<template>
  <div class="w-full mb-5 bg-white border border-gray-200 rounded-lg shadow">
    <slot name="header">
      <h5 v-if="title?.trim()" class="mb-8 text-xl font-bold text-gray-900">{{ title }}</h5>
    </slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();
</script>
