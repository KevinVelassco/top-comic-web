import type { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw = {
  path: '/users',
  name: 'users',
  component: () => import('@/modules/user/views/UserView.vue'),
};
