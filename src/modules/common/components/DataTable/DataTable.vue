<template>
  <div :id="id" class="flex flex-col">
    <div class="flex justify-end items-center p-3 gap-12">
      <!-- <div class="relative w-full">
        <input
          placeholder="Buscar"
          class="appearance-none border rounded-md w-full py-2 pl-10 pr-3 text-gray-900 border-gray-300 disabled:bg-white"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
          @blur="$emit('blur')"
        />

        <span class="absolute inset-y-0 start-0 flex items-center px-3">
          <SearchIcon />
        </span>
      </div> -->
      <div>
        <CustomDropdown position="right" :size="40">
          <template #trigger="{ toggle }">
            <CustomButton @click="toggle" variant="secondary" class="me-2 !rounded-full !p-1">
              <FilterIcon class="fill-blue-600" />
            </CustomButton>
          </template>
          <template #content>
            <ColumnsFilter :columns="columns" @filters="handleFilters" />
            <!-- <div class="flex justify-end mt-3">
            <CustomButton variant="primary">Buscar</CustomButton>
          </div> -->
          </template>
        </CustomDropdown>
      </div>
    </div>

    <div
      class="overflow-x-auto overflow-y-auto scroll-custom"
      :style="{
        maxHeight: `${rowsNumberForAutoScroll + scrollbarSize.value}px`,
        '--scrollbar-size': `${scrollbarSize}px`,
      }"
    >
      <div
        :style="{
          maxHeight: `${rowsNumberForAutoScroll}px`,
        }"
      >
        <div class="flex items-center justify-center" v-if="loading">
          <LoadingIcon :size="35" />
        </div>
        <template v-else>
          <table :id="id">
            <thead>
              <tr>
                <template v-for="header in columns" :key="header.key">
                  <th
                    v-if="header.visible"
                    :style="{
                      ...(header.size
                        ? {
                            width: `${header.size}rem`,
                            maxWidth: `${header.size}rem`,
                          }
                        : {}),
                    }"
                  >
                    <div
                      class="flex items-center w-full overflow-hidden"
                      :style="{ height: `${rowHeadHeight}px` }"
                    >
                      <div class="truncate">{{ header.title }}</div>
                    </div>
                  </th>
                </template>

                <th
                  v-if="actions && actions.length > 0"
                  class="sticky right-0 bg-gray-50"
                  style="z-index: 20"
                >
                  <div
                    class="flex items-center justify-end w-full overflow-hidden"
                    :style="{ height: `${rowHeadHeight}px` }"
                  >
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item?.id"
                @click="selectedListener(item)"
                :class="{
                  'item cursor-pointer': link || activateSelectedListener,
                  'selected-item': (link || activateSelectedListener) && selectedRow === item.id,
                }"
              >
                <template v-for="header in columns" :key="header.key">
                  <td
                    v-if="header.visible"
                    :style="{
                      ...(header.size
                        ? {
                            width: `${header.size}rem`,
                            maxWidth: `${header.size}rem`,
                          }
                        : {}),
                    }"
                  >
                    <div
                      class="flex items-center w-full overflow-hidden px-4 border-t border-gray-200"
                      :style="{ height: `${rowHeight}px` }"
                    >
                      <div class="truncate">
                        {{ item[header.key] }}
                      </div>
                    </div>
                  </td>
                </template>
                <td v-if="actions && actions.length > 0" class="sticky z-10 right-0 bg-white">
                  <div
                    class="flex items-center justify-end w-full overflow-hidden px-4 border-t border-gray-200"
                    :style="{ height: `${rowHeight}px` }"
                  >
                    <ActionsColumn :actions="actions" :table-id="id" :record="item" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="!items || items?.length === 0"
            class="text-center m-5 font-semibold text-gray-400"
          >
            No hay registros para mostrar
          </div>
        </template>
      </div>
    </div>
    <div
      v-if="items?.length > 0 && pagination !== undefined"
      class="grid grid-cols-2 border-t border-gray-200 py-3 px-5"
    >
      <div class="text-base mt-2 mr-5" v-if="meta">
        <span class="font-semibold">{{ (meta.page - 1) * meta.perPage + 1 }}</span>
        <span class="font-semibold">-</span>
        <span class="font-semibold">
          {{ meta.page === meta.lastPage ? meta.count : meta.page * meta.perPage }}
        </span>
        <span> de </span>
        <span class="font-semibold">{{ meta.count }}</span>
        <span> resultados</span>
      </div>

      <div class="flex items-center justify-end">
        <CustomButton
          variant="secondary"
          class="me-2 !rounded-3xl !px-3.5"
          :disabled="meta?.page === 1 || pagination.loading"
          @click="handlePagePrev"
        >
          <div class="flex items-center justify-center">
            <ArrowLeftIcon class="mt-0.5" />
            <span>Anterior</span>
          </div>
        </CustomButton>
        <CustomButton
          variant="secondary"
          class="!rounded-3xl !px-3.5"
          :disabled="meta?.page === meta?.lastPage || pagination.loading"
          @click="handlePageNext"
        >
          <div class="flex items-center justify-center">
            <span>Siguiente</span>
            <ArrowRightIcon class="mt-0.5" />
          </div>
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import LoadingIcon from '../../icons/LoadingIcon.vue';
import ActionsColumn from './ActionsColumn.vue';
import type { TableAction, TableHeader } from './interfaces';
import { useEventStore } from '../../stores/event.store';
import CustomButton from '../CustomButton.vue';
import ArrowRightIcon from '../../icons/ArrowRightIcon.vue';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon.vue';
import type { TablePaginationOptions } from './interfaces/table-pagination-options';
import ColumnsFilter from './ColumnsFilter.vue';
import CustomDropdown from '../CustomDropdown.vue';
import FilterIcon from '../../icons/FilterIcon.vue';

const eventStore = useEventStore();

interface Metadata {
  count: number;
  page: number;
  lastPage: number;
  perPage: number;
}

interface Props {
  id: string;
  headers: TableHeader[];
  items: any; //TableItems[];
  meta?: Metadata;
  actions?: TableAction[];
  loading: boolean;
  link?: string;
  pagination?: TablePaginationOptions;
  activateSelectedListener?: boolean;
  autoHeightRow?: number;
}

const props = defineProps<Props>();

const rowHeadHeight = ref(45);
const rowHeight = ref(38);
const scrollbarSize = ref(7);

const rowsNumberForAutoScroll = computed(() => {
  const itemsHeight = rowHeight.value * (props.autoHeightRow ?? 10);

  return itemsHeight + rowHeadHeight.value;
});

const emit = defineEmits<{
  handlePagePrev: [void];
  handlePageNext: [void];
  selectedListener: [item: any];
  filters: [any];
}>();

const selectedRow = ref<string | null>(null);

const columns = computed(() => {
  return props.headers.map((header) => ({
    title: header.key,
    align: 'start',
    sortable: false,
    visible: true,
    filter: false,
    size: 25,
    ...header,
  }));
});

const handlePagePrev = () => emit('handlePagePrev');
const handlePageNext = () => emit('handlePageNext');

const selectedListener = (item: any) => {
  if (!item) return;

  emitLink(item);

  if (!props.activateSelectedListener) return;
  if (item.id === selectedRow.value) return;

  selectedRow.value = item.id;
  emit('selectedListener', item);
};

const emitLink = (item: any) => {
  if (!props.link?.trim()) return;
  if (!item) return;
  if (item.id === selectedRow.value) return;

  selectedRow.value = item.id;
  eventStore.emit(props.link, item);
};

const handleFilters = (filters: any) => {
  emit('filters', filters);
};
</script>

<style scoped>
table {
  @apply min-w-full border-collapse;
}

table thead th {
  @apply sticky top-0 z-10 bg-gray-50;
}

table th {
  @apply px-4 py-0 text-start text-sm tracking-wide font-semibold text-gray-800 overflow-hidden;
}

table td {
  @apply p-0 text-sm text-gray-800 overflow-hidden;
}

.item:hover {
  background-color: #f5f8ff;
}

.item:hover td:last-child {
  background-color: #f5f8ff;
}

.selected-item {
  background-color: #eaf0ff;
}

.selected-item td:last-child {
  background-color: #eaf0ff;
}

.scroll-custom::-webkit-scrollbar {
  height: var(--scrollbar-size);
  width: var(--scrollbar-size);
}

.scroll-custom::-webkit-scrollbar-track {
  background: #f9fafb;
}

.scroll-custom::-webkit-scrollbar-thumb {
  background-color: #e7eaef;
  border-radius: 9999px;
}

.scroll-custom::-webkit-scrollbar-thumb:hover {
  background-color: #e0e4ea;
}
</style>
