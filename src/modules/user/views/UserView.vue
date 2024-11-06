<template>
  <CustomCard>
    <template #header>
      <div class="p-5 grid grid-cols-2">
        <div>
          <h5 class="text-xl font-bold text-gray-900">Usuarios</h5>
        </div>
        <div class="flex justify-end">
          <CustomButton
            class="bg-blue-600 hover:bg-blue-700 rounded-full p-1.5"
            @click="showCreatingModal = true"
          >
            <AddIcon class="fill-white" />
          </CustomButton>
        </div>
      </div>
    </template>

    <InputSearch v-model="search" placeholder="Buscar" class="p-2" />

    <DataTable
      id="user"
      :headers="headers"
      :actions="actions"
      :items="data?.results"
      :meta="data?.meta"
      :auto-height-row="10"
      :loading="isLoading"
      :pagination="{ loading: isFetching }"
      link="link-products-user"
      @handle-page-prev="prevPage"
      @handle-page-next="nextPage"
      @filters="handleFilters"
    />

    <hr />
    link: {{ link }}
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

  <!--  <CustomSelect
    v-model="selected"
    :options="[
      { value: 1, description: 'pera' },
      { value: 2, description: 'manzana' },
    ]"
    :query-fn="getUsersAction"
    query-key="selectUser"
  />

  <CustomSelect
    v-model="selected"
    :query-fn="getUsersAction"
    :disabled="false"
    :server-options="{
      queryKey: 'selectUser',
      queryFn: () => getUsersAction(),
      options: { value: 'id', description: 'name' },
      dependencies: [depenUser],
    }"
  />

  option: {{ selected }} -->
  <CustomCard title="Lista de valores" class="p-5">
    <InputListOfValues
      :disabled="false"
      v-model="selected"
      @item="item = $event"
      :server-options="{
        queryKey: ['user'],
        queryFn: () => getUsersAction({ limit: 5 }),
        dependencies: [depenUser],
        selected: { value: 'name', description: 'email' },
        headers: [
          { key: 'id', visible: false },
          { key: 'name', title: 'Nombre', visible: true },
          { key: 'lastName', title: 'Apellido', visible: true },
          { key: 'email', title: 'Email', visible: true },
        ],
      }"
    />

    <br />
    option: {{ selected }}
    <br />
    item:
    <pre>{{ JSON.stringify(item, null, 2) }}</pre>

    <hr />
    <br />

    <InputCombobox
      placeholder="selecciona usuario"
      v-model="comboboxValue"
      class="w-96"
      :selected="{ description: 'name' }"
      :items="data?.results"
    />
  </CustomCard>

  <div class="p-8">
    <CustomDropdown>
      <template #trigger="{ toggle }">
        <button
          @click="toggle"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          Options
        </button>
      </template>
      <template #content>
        <CustomInput label="name" />
      </template>
    </CustomDropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/modules/common/components/DataTable/DataTable.vue';
import type { TableAction, TableHeader } from '@/modules/common/components/DataTable/interfaces';
import CustomModal from '@/modules/common/components/CustomModal/custom-modal.vue';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import { useEventListeners } from '@/modules/common/composables/useEventListeners';
import CustomCard from '@/modules/common/components/CustomCard.vue';
import AddIcon from '@/modules/common/icons/AddIcon.vue';
import { useUserQuery } from '../composables/useUserQuery';
import CreateUser from '../components/CreateUser.vue';
import UpdateUser from '../components/UpdateUser.vue';
import DeleteUser from '../components/DeleteUser.vue';
import CustomSelect from '@/modules/common/components/CustomSelect.vue';
import { getUsersAction } from '../actions';
import InputListOfValues from '@/modules/common/components/InputListOfValues/InputListOfValues.vue';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomDropdown from '@/modules/common/components/CustomDropdown.vue';
import InputCombobox from '@/modules/common/components/InputCombobox/inputCombobox.vue';
import InputSearch from '@/modules/common/components/InputSearch.vue';

const showCreatingModal = ref(false);
const showUpdatingModal = ref(false);
const showDeletingModel = ref(false);

const currentUser = ref();
const search = ref('');
const selected = ref();
const comboboxValue = ref();
const depenUser = ref(1);
const item = ref();
const link = ref();
const filters = ref();

/* watch(filters, () => {
  console.log('watch');
  console.log(filters.value);
}); */

const handleFilters = (item: Record<string, any>) => {
  console.log('paso ');
  filters.value = item;
};

const headers = ref<TableHeader[]>([
  { key: 'id', visible: false },
  { key: 'name', title: 'Nombre', filter: true },
  { key: 'lastName', title: 'Apellido', filter: true },
  { key: 'email', title: 'Email', filter: true },
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
} = useUserQuery({ search, filters: filters });

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

  {
    event: 'link-products-user',
    callback: (item) => {
      link.value = item.name;
    },
  },
]);
</script>
