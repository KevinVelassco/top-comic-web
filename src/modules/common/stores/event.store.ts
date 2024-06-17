import { defineStore } from 'pinia';
import { ref } from 'vue';

type EventCallback = (payload?: any) => Promise<void> | void;

interface Event {
  callbacks: { callback: EventCallback; priority: number; blocking: boolean }[];
}

export const useEventStore = defineStore('event', () => {
  const events = ref<Record<string, Event>>({});

  const emit = async (event: string, payload?: any): Promise<void> => {
    if (!events.value[event]) return;

    const eventCallbacks = events.value[event].callbacks;

    if (!eventCallbacks) return;

    for (const { callback, blocking } of eventCallbacks) {
      try {
        if (blocking) {
          const executor = payload !== undefined ? callback(payload) : callback();
          if (executor instanceof Promise) await executor;
        } else {
          payload !== undefined ? callback(payload) : callback();
        }
      } catch (error) {
        console.error(`Error in callback for event ${event}`);
      }
    }
  };

  const on = (
    event: string,
    callback: EventCallback,
    priority: number = 0,
    blocking: boolean = false,
  ): void => {
    if (!events.value[event]) {
      events.value[event] = { callbacks: [] };
    }

    const eventCallbacks = events.value[event].callbacks;

    eventCallbacks.push({ callback, priority, blocking });

    const nonPrioritizedEvents = eventCallbacks.filter((event) => event.priority <= 0);

    const prioritizedEvents = [...eventCallbacks.filter((event) => event.priority > 0)].sort(
      (a, b) => a.priority - b.priority,
    );

    const sortedEvents = [...prioritizedEvents, ...nonPrioritizedEvents];

    events.value[event].callbacks = sortedEvents;
  };

  const off = (event: string, callback?: EventCallback): void => {
    if (!events.value[event]) return;

    const eventCallbacks = events.value[event].callbacks;

    if (!eventCallbacks) return;

    if (!callback) {
      delete events.value[event];
      return;
    }

    events.value[event].callbacks = eventCallbacks.filter((cb) => cb.callback !== callback);

    if (events.value[event].callbacks.length === 0) {
      delete events.value[event];
    }
  };

  return { events, emit, on, off }; // eliminar events
});
