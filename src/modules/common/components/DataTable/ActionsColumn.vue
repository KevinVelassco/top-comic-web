<template>
  <div class="flex gap-2">
    <!--  <span class="flex gap-2" @click.prevent="handleClick(actions.eventName, row)"> -->
    <span
      v-for="action in actions"
      :key="action.key"
      :class="action.class"
      @click.prevent="emitAction(action.eventName, record)"
    >
      <EditIcon class="icon" v-if="action.key === 'editRecord'" />
      <DeleteIcon class="icon" v-if="action.key === 'deleteRecord'" />
    </span>
  </div>
</template>

<script setup lang="ts">
import DeleteIcon from '../../icons/DeleteIcon.vue';
import EditIcon from '../../icons/EditIcon.vue';
import { useEventStore } from '../../stores/event.store';
import type { TableAction } from './interfaces';

interface Record {
  id: string | number;
  [key: string]: any;
}

interface Props {
  actions: TableAction[];
  tableId: string;
  record: Record;
}

const props = defineProps<Props>();

const eventStore = useEventStore();

const emitAction = (eventName: string, record: Record) => {
  if (!eventName) return;

  const uniqueEventName = `${props.tableId}-${eventName}`;

  eventStore.emit(uniqueEventName, record);
};
</script>

<style scoped>
.icon {
  @apply cursor-pointer opacity-85 hover:opacity-100 transform transition-transform duration-150 active:scale-95;
}
</style>
