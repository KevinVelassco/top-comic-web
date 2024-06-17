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
