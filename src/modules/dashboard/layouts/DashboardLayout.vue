<template>
  <NavBar @toggle-sidebar="toggleSidebar" />

  <div class="p-2 sm:p-5 pt-20 sm:pt-20 h-screen min-h-screen bg-stone-950">
    <RouterView />
  </div>

  <SideBar :is-open="isSidebarOpen" @close="closeSidebar" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = true;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>
