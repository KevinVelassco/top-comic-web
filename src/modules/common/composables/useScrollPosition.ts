import { onMounted, type Ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

interface Props {
  toRoute: string;
  fromRoutes: string[];
  elementRef: Ref<HTMLDivElement | null>;
}

export const useScrollPosition = ({ elementRef, toRoute, fromRoutes }: Props) => {
  const route = useRoute();
  const itemName = `${toRoute}-scroll-position`;

  onMounted(() => {
    const fromRoute = route.meta.fromRoute?.name?.toString() || '';

    if (!fromRoutes.includes(fromRoute)) {
      localStorage.removeItem(itemName);
    }

    const savedPosition = localStorage.getItem(itemName);

    if (savedPosition && elementRef.value) {
      elementRef.value.scrollTop = parseInt(savedPosition);
    } else if (elementRef.value) {
      elementRef.value.scrollTop = 0;
    }

    localStorage.removeItem(itemName);
  });

  onBeforeRouteLeave((to, from, next) => {
    const routeName = to.name?.toString() || '';

    if (fromRoutes.includes(routeName) && elementRef.value) {
      localStorage.setItem(itemName, elementRef.value.scrollTop.toString());
    }

    next();
  });
};
