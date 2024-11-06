<template>
  <div>
    <label :for="id" v-if="label?.trim()" class="block mb-1.5 text-gray-900">{{ label }}</label>

    <div class="relative w-full">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'appearance-none border rounded-md w-full py-2 pl-10 pr-3 bg-stone-900 text-gray-200 focus:outline-none border-gray-700 focus:ring-gray-600 focus:border-gray-600',
          { 'border-red-600 border-2': error },
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
        @blur="$emit('blur')"
        @keypress.enter="handleEnterKeyPress"
      />

      <span class="absolute inset-y-0 start-0 flex items-center px-3">
        <SearchIcon />
      </span>

      <span v-if="loading" class="absolute inset-y-0 end-0 flex items-center px-3">
        <LoadingIcon :size="20" />
      </span>
    </div>

    <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
      <ExclamationIcon />
      <span>{{ capitalizedError }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ExclamationIcon from '../icons/ExclamationIcon.vue';
import SearchIcon from '../icons/SearchIcon.vue';
import LoadingIcon from '../icons/LoadingIcon.vue';

interface Props {
  id?: string;
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number' | 'password';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const capitalizedError = computed(() => {
  if (!props.error) return '';

  return props.error?.charAt(0)?.toUpperCase() + props.error?.slice(1);
});

const emit = defineEmits(['update:modelValue', 'blur', 'keypress-enter']);

const handleEnterKeyPress = () => {
  emit('keypress-enter');
};
</script>
