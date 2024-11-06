<template>
  <aside
    v-if="isOpen"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-black">
      <div class="grid grid-cols-1 mb-5">
        <div class="flex justify-end">
          <CustomButton
            @click="closeSidebar"
            class="bg-gray-300 hover:bg-gray-200 rounded-full p-1.5"
          >
            <CloseIcon />
          </CustomButton>
        </div>
      </div>

      <p v-if="menu?.length === 0" class="text-sm text-gray-500 mx-4">No hay menú</p>

      <ul v-else class="space-y-2 font-normal">
        <li v-for="item in menu" :key="item.id">
          <template v-if="item.subMenu">
            <!-- <details>
              <summary>
                {{ item.description }}
              </summary>
              <ul>
                <li v-for="subMenu in item.subMenu" :key="subMenu.id">
                  <RouterLink :to="{ name: subMenu.name }">{{ subMenu.description }}</RouterLink>
                </li>
              </ul>
            </details> -->

            <button
              class="flex items-center w-full p-2 text-base text-gray-200 transition duration-75 rounded-lg group hover:bg-white hover:bg-opacity-10"
              @click="item.open = !item.open"
            >
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"
                >{{ item.description }}
              </span>
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul v-if="item.open" class="py-2 space-y-2">
              <li v-for="subMenu in item.subMenu" :key="subMenu.id">
                <RouterLink
                  :to="{ name: subMenu.name }"
                  class="flex items-center w-full p-2 text-gray-200 transition duration-75 rounded-lg pl-11 group hover:bg-white hover:bg-opacity-10"
                  >{{ subMenu.description }}</RouterLink
                >
              </li>
            </ul>
          </template>

          <template v-else>
            <RouterLink
              :to="{ name: item.name }"
              class="flex items-center p-2 text-gray-200 transition duration-75 rounded-lg hover:bg-white hover:bg-opacity-10 group"
            >
              <span class="ms-3">{{ item.description }}</span>
            </RouterLink>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import CustomButton from '@/modules/common/components/CustomButton.vue';
import CloseIcon from '@/modules/common/icons/CloseIcon.vue';
import { onMounted, ref } from 'vue';

interface Props {
  isOpen?: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  close: [void];
}>();

const closeSidebar = () => {
  emit('close');
};

interface SubMenu {
  id: string;
  name: string;
  description: string;
}

interface Menu {
  id: string;
  name?: string;
  description: string;
  subMenu?: SubMenu[];
  open?: boolean;
}

const menu = ref<Menu[]>();

onMounted(() => {
  menu.value = [
    {
      id: '1',
      name: 'comics',
      description: 'Inicio',
    },
    {
      id: '2',
      description: 'Usuarios',
      open: false,
      subMenu: [
        {
          id: '1',
          name: 'users',
          description: 'Usuarios',
        },
      ],
    },
  ];
});
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-white bg-opacity-10;
}
</style>
