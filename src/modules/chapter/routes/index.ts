import type { RouteRecordRaw } from 'vue-router';

export const chapterRoutes: RouteRecordRaw = {
  path: 'chapter/:id',
  name: 'chapter',
  component: () => import('@/modules/chapter/views/ChapterView.vue'),
};
