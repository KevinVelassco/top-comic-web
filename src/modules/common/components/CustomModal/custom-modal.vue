<template>
  <div
    v-if="open"
    class="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="relative sm:p-4 p-2 w-full max-w-xl max-h-full">
      <div class="relative sm:p-5 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="mb-5">
          <slot name="header"></slot>
        </div>

        <slot name="body"></slot>

        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  open: boolean;
}

defineProps<Props>();

const emits = defineEmits<{
  close: [void];
}>();

const close = () => {
  emits('close');
};
</script>
