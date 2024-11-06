<template>
  <div>
    <label :for="id" v-if="label?.trim()" class="block mb-2 text-gray-900">{{ label }}</label>

    <div class="relative w-full">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="true"
        :class="[
          'appearance-none border rounded-md w-full py-2 pl-3 pr-11 text-gray-900  border-gray-300 disabled:bg-white',
          { 'disabled:bg-neutral-50': disabled },
          { 'border-red-600 border-2': error },
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
        @blur="$emit('blur')"
      />

      <CustomButton
        :disabled="!isValidDependency || disabled"
        @click="handleClick"
        class="absolute inset-y-0 end-0 flex items-center px-3"
      >
        <SearchIcon />
      </CustomButton>
    </div>

    <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
      <ExclamationIcon />
      <span>{{ capitalizedError }}</span>
    </span>

    <CustomModal :open="showModal">
      <template #header>
        <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold text-lg">Usuarios</h3>
          <CustomButton
            @click="showModal = false"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8"
          >
            <CloseIcon />
          </CustomButton>
        </div>
      </template>

      <template #body>
        <div class="sm:-m-5 -m-3">
          <DataTable
            id="user"
            :headers="serverOptions.headers"
            :items="data?.results"
            :meta="data?.meta"
            :loading="isLoading"
            :pagination="{ loading: isLoading }"
            :activate-selected-listener="true"
            @selected-listener="selectedItem"
          />
        </div>
      </template>
    </CustomModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import ExclamationIcon from '../../icons/ExclamationIcon.vue';
import CustomButton from '../CustomButton.vue';
import SearchIcon from '../../icons/SearchIcon.vue';
import { useQuery } from '@tanstack/vue-query';
import CustomModal from '../CustomModal/custom-modal.vue';
import type { TableHeader } from '../DataTable/interfaces';
import DataTable from '../DataTable/DataTable.vue';
import CloseIcon from '../../icons/CloseIcon.vue';

interface Selected {
  value: number | string;
  description: number | string;
}

interface ServerOptions {
  queryKey: string[];
  queryFn: () => Promise<any>;
  dependencies?: number[] | string[];
  selected: Selected;
  headers: TableHeader[];
}

interface Props {
  id?: string;
  modelValue?: string | number;
  error?: string;
  type?: 'text' | 'number';
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  serverOptions: ServerOptions;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const activeFetching = ref(false);
const showModal = ref(false);

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

const emit = defineEmits(['update:modelValue', 'blur', 'item']);

const { data, isLoading } = useQuery({
  queryKey: ['inputlistofvalues', ...props.serverOptions.queryKey],
  queryFn: () => !!props.serverOptions.queryFn && props.serverOptions.queryFn(),
  enabled: !!props.serverOptions.queryFn && activeFetching,
});

const handleClick = () => {
  if (!props.serverOptions?.queryFn) return;
  activeFetching.value = true;
  showModal.value = true;
};

const selectedItem = (item: any) => {
  emit('update:modelValue', item[props.serverOptions.selected.value]);
  emit('item', item);
  showModal.value = false;
};
</script>
