<template>
  <button
    :type="type"
    :class="[
      'disabled:opacity-70 disabled:cursor-not-allowed font-medium text-center me-2 inline-flex items-center transform transition-transform duration-150',
      props.variant !== undefined ? 'rounded-lg text-sm px-5 py-2.5' : '',
      buttonStyle,
      disabled ? '' : 'active:scale-95',
    ]"
    @click="handleClick"
    :disabled="disabled"
  >
    <LoadingIcon v-if="loading" class="me-2 fill-white" />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LoadingIcon from '../icons/LoadingIcon.vue';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  preventClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
});

const buttonStyle = computed(() => props.variant);

const emit = defineEmits<{ click: [void] }>();

const handleClick = async (event: any) => {
  if (props.disabled) return;
  if (props.loading) return;

  if (props.type === 'submit') return event.stopPropagation();

  emit('click', event);
};
</script>

<style scoped>
.primary {
  @apply text-white bg-blue-600 disabled:hover:bg-blue-600 hover:bg-blue-700;
}

.secondary {
  @apply text-gray-900 bg-white disabled:hover:bg-white hover:bg-gray-200 border border-gray-200;
}

.success {
  @apply text-white bg-green-600 disabled:hover:bg-green-600 hover:bg-green-700;
}

.danger {
  @apply text-white bg-red-600 disabled:hover:bg-red-600 hover:bg-red-700;
}

.warning {
  @apply text-white bg-yellow-500 disabled:bg-yellow-500 hover:bg-yellow-600;
}
</style>
