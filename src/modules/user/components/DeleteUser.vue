<template>
  <div class="p-4 md:p-5 text-center">
    <svg
      class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
      ¿Estás seguro de que deseas eliminar este usuario?
    </h3>

    <CustomButton variant="secondary" class="me-2" @click="eventStore.emit('user-end-deleting')"
      >Cancelar</CustomButton
    >
    <CustomButton variant="danger" :loading="userDeleteMutation.isPending.value" @click="onDelete"
      >Eliminar</CustomButton
    >
  </div>

  <CustomErrorMessage :error="userDeleteMutation.error.value" />
</template>

<script setup lang="ts">
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { useEventStore } from '@/modules/common/stores/event.store';
import type { User } from '@/modules/auth/interfaces';
import { useUserDeleteMutation } from '../composables/useUserDeleteMutation';
import CustomErrorMessage from '@/modules/common/components/CustomErrorMessage.vue';

interface Props {
  user: User;
  page: number;
}

const props = defineProps<Props>();

const eventStore = useEventStore();
const userDeleteMutation = useUserDeleteMutation(props.page);

const onDelete = async () => {
  const { authUid } = props.user ?? {};

  if (!authUid) return;

  userDeleteMutation.mutate(authUid);
};
</script>
