<template>
  <div :id="id" class="overflow-x-auto">
    <div class="flex items-center justify-center" v-if="loading">
      <LoadingIcon :size="35" />
    </div>
    <template v-else>
      <table :id="id" class="table table-sm">
        <thead>
          <tr>
            <template v-for="header in columns" :key="header.key">
              <th v-if="header.visible">
                {{ header.title }}
              </th>
            </template>

            <th v-if="actions && actions.length > 0">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item?.id"
            @click="emitLink(item)"
            :class="{
              'hover:bg-gray-100 cursor-pointer': link,
              'bg-gray-200': selectedRow === item.id,
            }"
          >
            <template v-for="header in columns" :key="header.key">
              <td v-if="header.visible">{{ item[header.key] }}</td>
            </template>
            <td>
              <template v-if="actions && actions.length > 0">
                <ActionsColumn :actions="actions" :table-id="id" :record="item" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="items?.length === 0" class="text-center mt-5 font-semibold">
        No hay registros para mostrar
      </div>
    </template>
    <div v-if="pagination !== undefined" class="flex justify-end mt-10">
      <div class="text-base font-semibold mt-2 mr-5" v-if="meta">
        {{ (meta.page - 1) * meta.perPage + 1 }}-{{
          meta.page === meta.lastPage ? meta.count : meta.page * meta.perPage
        }}
        de {{ meta.count }}
      </div>

      <CustomButton
        variant="primary"
        :disabled="meta?.page === 1 || pagination.loading"
        @click="handlePagePrev"
      >
        <ArrowLeftIcon />
        Anteriores
      </CustomButton>
      <CustomButton
        variant="primary"
        :disabled="meta?.page === meta?.lastPage || pagination.loading"
        @click="handlePageNext"
      >
        Siguientes
        <ArrowRightIcon />
      </CustomButton>
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
  search?: string; // v-model
  actions?: TableAction[];
  loading: boolean;
  link?: string;
  pagination?: TablePaginationOptions;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  handlePagePrev: [void];
  handlePageNext: [void];
}>();

const selectedRow = ref<string | null>(null);

const columns = computed(() => {
  return props.headers.map((header) => ({
    title: header.key,
    align: 'start',
    sortable: false,
    visible: true,
    ...header,
  }));
});

const handlePagePrev = () => emit('handlePagePrev');
const handlePageNext = () => emit('handlePageNext');

const emitLink = (item: any) => {
  if (!props.link?.trim()) return;
  if (!item) return;
  if (item.id === selectedRow.value) return;

  selectedRow.value = item.id;
  eventStore.emit(props.link, item);
};
</script>
