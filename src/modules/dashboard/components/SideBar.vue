<template>
  <aside
    v-if="isOpen"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <button @click="closeSidebar" class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      <h2 class="text-lg font-bold mx-4">
        <RouterLink to="/"> Inicio </RouterLink>
      </h2>
      <p v-if="menu?.length === 0" class="text-sm text-gray-500 mx-4">No hay menú</p>

      <ul v-else class="menu">
        <li v-for="item in menu" :key="item.id">
          <template v-if="item.subMenu">
            <details>
              <summary>
                <RouterLink :to="{ name: item.name }">
                  {{ item.description }}
                </RouterLink>
              </summary>
              <ul>
                <li v-for="subMenu in item.subMenu" :key="subMenu.id">
                  <RouterLink :to="{ name: subMenu.name }">{{ subMenu.description }}</RouterLink>
                </li>
              </ul>
            </details>
          </template>

          <template v-else>
            <RouterLink :to="{ name: item.name }">
              {{ item.description }}
            </RouterLink>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
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
  name: string;
  description: string;
  subMenu?: SubMenu[];
}

const menu = ref<Menu[]>();

onMounted(() => {
  menu.value = [
    {
      id: '1',
      name: 'users',
      description: 'Usuarios',
    },
  ];
});
</script>
