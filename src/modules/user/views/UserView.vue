<template>
  <CustomCard>
    <template #header>
      <div class="mb-8 grid grid-cols-2">
        <div>
          <h5 class="text-3xl font-bold text-gray-900">Usuarios</h5>
        </div>
        <div class="flex justify-end">
          <CustomButton
            class="bg-blue-600 hover:bg-blue-700 rounded-full p-2.5"
            @click="showCreatingModal = true"
          >
            <AddIcon class="fill-white" />
          </CustomButton>
        </div>
      </div>
    </template>

    <DataTable
      id="user"
      :headers="headers"
      :actions="actions"
      :items="data?.results"
      :meta="data?.meta"
      :search="search"
      :loading="isLoading"
      :pagination="{ loading: isFetching }"
      link="link-products-user"
      @handle-page-prev="prevPage"
      @handle-page-next="nextPage"
    />
  </CustomCard>

  <CustomModal :open="showCreatingModal">
    <template #header>
      <h3 class="font-bold text-xl">Creación</h3>
    </template>

    <template #body>
      <CreateUser />
    </template>
  </CustomModal>

  <CustomModal :open="showUpdatingModal">
    <template #header>
      <h3 class="font-bold text-xl">Actualización</h3>
    </template>

    <template #body>
      <UpdateUser :initial-data="currentUser" :page="page" />
    </template>
  </CustomModal>

  <CustomModal :open="showDeletingModel">
    <template #body>
      <DeleteUser :user="currentUser" :page="page" />
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/modules/common/components/DataTable/DataTable.vue';
import type { TableAction, TableHeader } from '@/modules/common/components/DataTable/interfaces';
import CustomModal from '@/modules/common/components/CustomModal/custom-modal.vue';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { useEventListeners } from '@/modules/common/composables/useEventListeners';
import CustomCard from '@/modules/common/components/CustomCard.vue';
import AddIcon from '@/modules/common/icons/addIcon.vue';
import { useUserQuery } from '../composables/useUserQuery';
import CreateUser from '../components/CreateUser.vue';
import UpdateUser from '../components/UpdateUser.vue';
import DeleteUser from '../components/DeleteUser.vue';

const showCreatingModal = ref(false);
const showUpdatingModal = ref(false);
const showDeletingModel = ref(false);

const currentUser = ref();
const search = ref('');

const headers = ref<TableHeader[]>([
  { key: 'id', visible: false },
  { key: 'name', title: 'Nombre', size: 10, visible: true },
  { key: 'lastName', title: 'Apellido', visible: true },
  { key: 'email', title: 'Email', visible: true },
]);

const actions = ref<TableAction[]>([
  {
    key: 'editRecord',
    description: 'Editar',
    class: 'text-primary',
    eventName: 'init-updating',
  },
  {
    key: 'deleteRecord',
    description: 'Eliminar',
    class: 'text-primary',
    eventName: 'init-deleting',
  },
]);

const {
  usersQuery: { data, isLoading, isFetching, refetch },
  setInitialPage,
  prevPage,
  nextPage,
  page,
} = useUserQuery();

const initUpdating = (record: any) => {
  currentUser.value = record;
  showUpdatingModal.value = true;
};

const endUpdating = () => {
  showUpdatingModal.value = false;
  currentUser.value = null;
};

const endCreating = (payload: any) => {
  if (payload?.accept) {
    setInitialPage();
    refetch();
  }

  showCreatingModal.value = false;
};

const initDeleting = (record: any) => {
  console.log(record);
  currentUser.value = record;
  showDeletingModel.value = true;
};

const endDeleting = () => {
  showDeletingModel.value = false;
};

useEventListeners([
  { event: 'user-end-creating', callback: endCreating },

  { event: 'user-init-updating', callback: initUpdating },
  { event: 'user-end-updating', callback: endUpdating },

  { event: 'user-init-deleting', callback: initDeleting },
  { event: 'user-end-deleting', callback: endDeleting },
]);
</script>
