<template>
  <nav
    :class="[
      fixedActivated ? 'fixed' : '',
      'bg-stone-950 w-full z-20 top-0 start-0 border-b border-stone-800',
    ]"
  >
    <div class="grid grid-cols-2 p-2">
      <div class="flex justify-start items-center">
        <CustomButton
          @click="toggleSidebar"
          class="bg-gray-300 hover:bg-gray-200 rounded-full p-1.5"
        >
          <HamburgerIcon />
        </CustomButton>
        <RouterLink :to="{ name: 'comics', state: { isInitialLink: true } }">
          <p class="text-2xl italic text-red-600 font-extrabold ml-3">Manhwas</p>
        </RouterLink>
      </div>
      <div class="flex justify-end items-center">
        <CustomDropdown position="right" :size="14">
          <template #trigger="{ toggle }">
            <CustomButton @click="toggle" class="bg-gray-300 hover:bg-gray-200 rounded-full p-1.5">
              <SettingIcon />
            </CustomButton>
          </template>
          <template #content>
            <ul
              class="text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  class="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Ajustes</a
                >
              </li>
              <li class="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <button class="flex rounded-lg px-4 items-center w-full" @click="logout">
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </template>
        </CustomDropdown>

        <!-- <div
          v-if="setting"
          class="fixed top-12 end-5 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Ajustes</a
              >
            </li>
            <li class="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <button class="flex px-4 items-center w-full" @click="logout">Cerrar sesión</button>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </nav>

  <!--   <div class="navbar bg-base-100">
    <div class="flex-none">
      <button @click="toggleSidebar" class="btn btn-square btn-ghost">
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
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">daisyUI</a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <button class="btn btn-square btn-ghost">
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
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Perfil
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Ajustes</a></li>
          <li><button @click="logout">Cerrar sesión</button></li>
        </ul>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import CustomButton from '@/modules/common/components/CustomButton.vue';
import CustomDropdown from '@/modules/common/components/CustomDropdown.vue';
import { useEventListeners } from '@/modules/common/composables/useEventListeners';
import HamburgerIcon from '@/modules/common/icons/HamburgerIcon.vue';
import SettingIcon from '@/modules/common/icons/SettingIcon.vue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const fixedActivated = ref<boolean>(true);

const emit = defineEmits<{
  'toggle-sidebar': [void];
}>();

const toggleSidebar = () => {
  emit('toggle-sidebar');
};

const logout = () => {
  authStore.logout();
  router.replace({ name: 'login' });
};

useEventListeners([
  {
    event: 'nav-bar-fixed',
    callback: (isActive: boolean) => {
      fixedActivated.value = isActive;
    },
  },
]);
</script>
