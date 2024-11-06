<template>
  <form @keyup.enter="handleSubmit">
    <div v-for="(filter, index) in filters" :key="filter.field" class="w-full">
      <div class="grid grid-cols-7 gap-2 mb-2">
        <div class="col-span-3">
          <div class="flex flex-row gap-1">
            <CustomButton
              @click="deleteFilter(filter.field, index)"
              class="hover:bg-gray-50 rounded-full p-2.5"
            >
              <CloseIcon class="w-5 h-5" />
            </CustomButton>

            <InputCombobox
              v-model="filter.field"
              placeholder="selecciona campo"
              :selected="{ description: 'title' }"
              :items="items"
            />
          </div>
        </div>

        <div class="col-span-4">
          <CustomInput v-model="filter.value" :disabled="filter.field === ''" />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="h-6">
        <span class="flex items-center space-x-1 text-red-600 font-bold text-[15px]" v-if="error">
          <ExclamationIcon />
          <span>{{ error }}</span>
        </span>
      </div>
      <CustomButton
        v-if="filters.length > 0"
        @click="handleSubmit"
        variant="secondary"
        class="me-2 !rounded-3xl !px-2.5"
      >
        <SearchIcon />
      </CustomButton>
    </div>
  </form>

  <div class="grid grid-cols-3 gap-2 mt-4">
    <CustomButton
      @click="addFilter"
      class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >Agregar filtro</CustomButton
    >
    <CustomButton
      @click="addAllFilters"
      class="text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >Agregar todos los filtro</CustomButton
    >
    <CustomButton
      @click="deleteAllFilters"
      class="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >Eliminar todos los filtro</CustomButton
    >
  </div>
</template>

<script setup lang="ts">
import type { TableFilter, TableHeader } from './interfaces';
import CustomInput from '../CustomInput.vue';
import { computed, ref } from 'vue';
import CustomButton from '../CustomButton.vue';
import InputCombobox from '../InputCombobox/inputCombobox.vue';
import ExclamationIcon from '../../icons/ExclamationIcon.vue';
import { sleep } from '../../helpers';
import CloseIcon from '../../icons/CloseIcon.vue';
import SearchIcon from '../../icons/SearchIcon.vue';

interface Props {
  columns: TableHeader[];
}

const props = defineProps<Props>();

const headers = computed(() => props.columns.filter((column) => column.filter));

const items = computed(() => {
  const filtersSet = new Set([...filters.value.map(({ field }) => field)]);

  return headers.value
    .filter(({ title }) => !filtersSet.has(title))
    .map((header) => ({ id: header.key, title: header.title }));
});

const filters = ref<TableFilter[]>([]);
const error = ref('');

const emit = defineEmits<{ filters: [Record<string, any>] }>();

const emitFilters = () => {
  const filter = filters.value.reduce(
    (acc, { field, value }) => {
      if (!field) return acc;
      if (!value) return acc;

      return { ...acc, [field]: value };
    },
    {} as Record<string, any>,
  );

  emit('filters', filter);
};

const handleSubmit = () => {
  emitFilters();
};

const addFilter = async () => {
  if (filters.value.length >= headers.value.length) {
    error.value = 'No hay mas filtros';

    await sleep(2.5);

    error.value = '';
    return;
  }

  filters.value.push({ field: '', value: '' });
};

const addAllFilters = async () => {
  if (filters.value.length >= headers.value.length) {
    error.value = 'No hay mas filtros';

    await sleep(2.5);

    error.value = '';
    return;
  }

  if (filters.value.length === 0) {
    headers.value.forEach((header) => {
      filters.value.push({ field: header.title, value: '' });
    });

    return;
  }

  filters.value = filters.value.filter((filter) => filter.field !== '');

  const filtersSet = new Set([...filters.value.map(({ field }) => field)]);

  headers.value
    .filter(({ title }) => !filtersSet.has(title))
    .forEach((header) => {
      filters.value.push({ field: header.title, value: '' });
    });
};

const deleteFilter = async (field?: string, index?: number) => {
  if (!field) {
    filters.value = filters.value.filter((_, i) => i !== index);
    return;
  }

  filters.value = filters.value.filter((filter) => filter.field !== field);

  emitFilters();
};

const deleteAllFilters = async () => {
  if (filters.value.length === 0) {
    error.value = 'No hay filtros para eliminar';

    await sleep(2.5);

    error.value = '';
    return;
  }

  filters.value = [];

  emitFilters();
};
</script>
