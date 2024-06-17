<template>
  <NavBar @toggle-sidebar="toggleSidebar" />

  <div class="p-5">
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
