<template>
  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';

const authStore = useAuthStore();
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: rgb(12 10 9 1);
}

::-webkit-scrollbar-thumb {
  background-color: #f1f1f117;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #efefef24;
}
</style>
