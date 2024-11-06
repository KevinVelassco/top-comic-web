<!-- <template>
  <div class="relative inline-block text-left" ref="popover" @click="togglePopover">
    <button
      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
    >
      Options
    </button>

    <div
      v-if="isOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
          >Option 1</a
        >
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
          >Option 2</a
        >
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"
          >Option 3</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    togglePopover(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    closePopover(event) {
      if (this.$refs.popover && !this.$refs.popover.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closePopover);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closePopover);
  },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
 -->
<template>
  <div class="relative" ref="popoverContainer">
    <slot name="trigger" :toggle="togglePopover"></slot>
    <div
      v-if="isOpen"
      :class="[
        'z-50 absolute p-3 mt-1.5 w-full rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5',
        position ? `${position}-0` : 'left-0',
      ]"
      :style="{ ...(size ? { width: `${size}rem` } : {}) }"
      ref="popoverContent"
      @click.stop
    >
      <slot name="content" :close="closePopover"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

interface Props {
  position?: 'left' | 'right';
  size?: number;
}

withDefaults(defineProps<Props>(), {
  position: 'left',
});

const isOpen = ref(false);
const popoverContainer = ref<HTMLElement | null>(null);
const popoverContent = ref<HTMLElement | null>(null);

const togglePopover = (event: MouseEvent) => {
  event.stopPropagation();
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    nextTick(() => {
      adjustPopoverPosition();
    });
  }
};

const closePopover = () => {
  isOpen.value = false;
};

const closePopoverOnClickOutside = (event: MouseEvent) => {
  if (popoverContainer.value && !popoverContainer.value.contains(event.target as Node)) {
    closePopover();
  }
};

const adjustPopoverPosition = () => {
  const button = popoverContainer.value?.querySelector('[slot="trigger"]');
  const popover = popoverContent.value;

  if (button && popover) {
    const buttonRect = button.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    const offset = (buttonRect.width - popoverRect.width) / 2;
    popover.style.left = `${offset}px`;
  }
};

onMounted(() => {
  document.addEventListener('click', closePopoverOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closePopoverOnClickOutside);
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
