import type { RouteRecordRaw } from 'vue-router';
import ComicsView from '../views/ComicsView.vue';

export const comicRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'comics',
    component: ComicsView,
  },
  {
    path: 'comic/:id',
    name: 'comic',
    component: () => import('@/modules/comic/views/ComicView.vue'),
  },
];
