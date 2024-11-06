<template>
  <div>
    <label :for="id" v-if="label?.trim()" class="block mb-2 text-gray-900">{{ label }}</label>

    <select
      v-if="serverOptions === undefined"
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'appearance-none border rounded-md w-full py-2 px-3 text-gray-900 focus:outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500',
        { 'border-red-600 border-2': error },
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.description }}
      </option>
    </select>

    <select
      v-else
      :id="id"
      :value="modelValue"
      :class="[
        'disabled:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
        { 'border-red-600 border-2': error },
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
      @change="handleChange"
      @click="handleClick"
      :disabled="!isValidDependency || disabled"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option v-if="isLoading" disabled>Cargando...</option>
      <option
        v-for="option in data?.results"
        :key="option[serverOptions.options.value]"
        :value="option[serverOptions.options.value]"
      >
        {{ option[serverOptions.options.description] }}
      </option>
    </select>

    <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
      <ExclamationIcon />
      <span>{{ capitalizedError }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import ExclamationIcon from '../icons/ExclamationIcon.vue';
import { useQuery } from '@tanstack/vue-query';

interface Options {
  value: string | number;
  description: string | number;
}

interface ServerOptions {
  queryKey: string;
  queryFn: () => Promise<any>;
  options: Options;
  dependencies?: number[] | string[];
}

interface Props {
  id?: string;
  options?: Options[];
  modelValue?: string | number;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  serverOptions?: ServerOptions;
}

const props = defineProps<Props>();

const activeFetching = ref(false);

const capitalizedError = computed(() => {
  if (!props.error) return '';

  return props.error?.charAt(0)?.toUpperCase() + props.error?.slice(1);
});

const isValidDependency = computed(() => {
  const dependencies = props.serverOptions?.dependencies;

  if (!dependencies) return true;

  const isValid = !dependencies.some((dependency) => dependency === undefined);

  return isValid;
});

defineEmits(['update:modelValue', 'blur']);

const handleChange = () => {
  const item = data.value.results.find((item: any) => item.id === Number(props.modelValue ?? 0));
};

const { data, isLoading } = useQuery({
  queryKey: [props.serverOptions?.queryKey],
  queryFn: () => !!props.serverOptions?.queryFn && props.serverOptions?.queryFn(),
  enabled: !!props.serverOptions?.queryFn && activeFetching,
});

const handleClick = () => {
  if (!props.serverOptions?.queryFn) return;
  activeFetching.value = true;
};
</script>
