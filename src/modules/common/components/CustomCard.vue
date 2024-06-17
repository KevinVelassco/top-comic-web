<template>
  <div
    class="w-full mb-5 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <slot name="header">
      <h5 class="mb-8 text-3xl font-bold text-gray-900">{{ title }}</h5>
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
