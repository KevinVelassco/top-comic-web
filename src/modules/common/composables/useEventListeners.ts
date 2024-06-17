import { onMounted, onUnmounted } from 'vue';
import { useEventStore } from '../stores/event.store';

interface EventListenerOptions {
  event: string;
  callback: (payload?: any) => Promise<void> | void;
  priority?: number;
  blocking?: boolean;
}

export const useEventListeners = (events: EventListenerOptions[]) => {
  const eventStore = useEventStore();

  onMounted(() => {
    events.forEach(({ event, callback, priority, blocking }) =>
      eventStore.on(event, callback, priority, blocking),
    );
  });

  onUnmounted(() => {
    events.forEach(({ event, callback }) => eventStore.off(event, callback));
  });
};
