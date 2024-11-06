import { useRoute } from 'vue-router';
import { local } from '../helpers/storage.helper';

interface Props {
  toRoute: string;
  fromRoutes: string[];
}

export const usePageMetadata = <T>({
  toRoute,
  fromRoutes,
}: Props): {
  getData: () => T | null;
  setData: (data: T) => void;
} => {
  const route = useRoute();

  const itemName = `${toRoute}-metadata`;

  const fromRoute = route.meta.fromRoute?.name?.toString() || '';

  if (!fromRoutes.includes(fromRoute)) {
    local.removeItem(itemName);
  }

  const setData = (data: T) => {
    local.setItem<T>(itemName, data);
  };

  const getData = (): T | null => {
    return local.getItem<T>(itemName);
  };

  return {
    getData,
    setData,
  };
};
