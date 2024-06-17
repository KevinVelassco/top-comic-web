import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import HomeView from '@/modules/dashboard/views/HomeView.vue';
import { authRoutes } from '@/modules/auth/routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { userRoutes } from '@/modules/user/routes';

declare module 'vue-router' {
  interface RouteMeta {
    isPublic?: boolean;
    requiresUnauthenticated?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },

        userRoutes,
      ],
    },

    authRoutes,
  ],
});

function requiresAuth(route: RouteLocationNormalized) {
  return !route.meta.isPublic;
}

function requiresUnauthenticated(route: RouteLocationNormalized) {
  return route.meta.requiresUnauthenticated;
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();

  if (requiresAuth(to) && !authStore.isAuthenticated) {
    if (to.name !== 'login') return next({ name: 'login' });
  } else if (requiresUnauthenticated(to) && authStore.isAuthenticated) {
    if (to.name !== 'dashboard') return next({ name: 'dashboard' });
  }

  next();
});

export default router;
