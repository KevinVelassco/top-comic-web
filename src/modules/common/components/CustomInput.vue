<template>
  <div>
    <label :for="id" v-if="label?.trim()" class="block mb-1.5 text-gray-900">{{ label }}</label>

    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'appearance-none border rounded-md w-full py-2 px-3 text-gray-900 focus:outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500',
        { 'border-red-600 border-2': error },
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      @keypress.enter="handleEnterKeyPress"
    />
    <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
      <ExclamationIcon />
      <span>{{ capitalizedError }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import ExclamationIcon from '../icons/ExclamationIcon.vue';

interface Props {
  id?: string;
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number' | 'password';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
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
