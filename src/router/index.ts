import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';

import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import { authRoutes } from '@/modules/auth/routes';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { userRoutes } from '@/modules/user/routes';
import NotFound404 from '@/modules/common/views/NotFound404.vue';
import { comicRoutes } from '@/modules/comic/routes';
import { chapterRoutes } from '@/modules/chapter/routes';

declare module 'vue-router' {
  interface RouteMeta {
    isPublic?: boolean;
    requiresUnauthenticated?: boolean;
    toRoute?: RouteLocationNormalized;
    fromRoute?: RouteLocationNormalized;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardLayout,
      children: [...comicRoutes, userRoutes, chapterRoutes],
    },

    authRoutes,

    {
      path: '/:pathMatch(.*)*',
      component: NotFound404,
      meta: { isPublic: true },
    },
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

  to.meta.toRoute = to;
  to.meta.fromRoute = from;

  next();
});

export default router;
